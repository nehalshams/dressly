# Dressly — Build Plan

A fullstack **multi-vendor marketplace** for women's clothing, where multiple outlets register and sell their own products. Supports **stitched (ready-to-wear)** and **unstitched** clothes, with an optional **made-to-measure stitching service** at extra price.

Stack: **Next.js** (frontend) + **Node.js** (separate backend API).

> Scope note: this document covers architecture, data model, and features only. UI/visual design is tracked separately.

---

## 1. Requirements Summary

Core ecommerce, plus clothing-specific concerns that drive the architecture:

| Requirement | Why it matters |
|---|---|
| Product variants | Size × color × fit is the core data model; each combo has its own SKU/stock/price. |
| Stitched vs unstitched | Two product types with different buying flows. |
| Stitching service | Unstitched items can be stitched for an extra price, with custom measurements. |
| Inventory accuracy | Decrement stock at payment confirmation, never at add-to-cart. |
| Rich imagery | Multiple images per variant, CDN delivery. |
| Size guides & measurements | Returns are driven by sizing; structured size charts + measurement profiles. |
| Wishlist | High engagement in fashion; supports re-marketing. |
| Discounts / promo codes | Seasonal sales, first-order discounts. |
| Multi-vendor (outlets) | Outlets register, list products, manage their own inventory/orders/tailoring; platform takes commission. |

**Decided:**
- **Multi-vendor marketplace** — outlets self-register (subject to admin approval) and sell their own products. Each product belongs to one outlet.
- **Single region / local market focus** — one currency, local tax rules; no international/multi-currency for now.
- **Guest checkout enabled, keyed by phone number** — no account required to buy; phone number is the mandatory contact/identifier for guest orders.
- **Unstitched items are sold as fixed sets** (e.g. 3-piece suit) — cart quantity is a normal integer count of sets, no by-the-meter logic.
- **Stitching styles are free-text** — the customer describes the cut/style in their own words (custom tailor instructions) rather than picking from a fixed style catalog.
- **Standard sizes (S/M/L) prefill default measurements, fully editable** — selecting a size populates a default measurement chart, and the user can override any individual field (shoulder, arm length, waist, etc.).
- **Coupons apply to the entire order** — both product/fabric price and stitching charges are discountable.
- **Commission is per-outlet** — each outlet has its own commission rate (`Outlet.commissionRate`), set at onboarding/negotiation; no single platform-wide rate.
- **Onboarding is manual admin approval** — outlets register, sit in `PENDING`, and a platform admin reviews and approves before they can list/sell.
- **Each outlet ships its own orders** — no centralized fulfillment; shipping/tracking is owned per `OutletOrder`.
- **Stitching is per-outlet** — each outlet tailors its own items via its own tailoring queue; no platform-run tailoring service.
- **Platform also sells directly** — Dressly runs its own first-party "house" outlet alongside registered outlets. Modeled as a normal `Outlet` flagged `isHouse = true` (commission 0%, no external payout) so products, orders, and tailoring all flow through the same uniform model.

**All business decisions resolved.** Scope assumptions: **multi-vendor marketplace + first-party house outlet**, **Stripe Connect for split payments + payouts**, **single region / one currency**, **each outlet handles its own fulfillment and tailoring**, **per-outlet commission**, **manual outlet approval**, **guest checkout keyed by phone**.

---

## 2. Architecture

- **Frontend:** Next.js (App Router), SSR/SSG for product pages (SEO + speed), React Server Components, TypeScript.
- **Backend:** Separate Node.js API. **NestJS** recommended for structure/scalability (use Express only if speed-to-first-version is the priority).
- **Database:** PostgreSQL with Prisma ORM (relational fits variants, orders, inventory).
- **Auth & roles:** JWT + refresh tokens. Three roles: **customer**, **vendor (outlet)**, **platform admin**. Guest checkout requires no account (phone-number keyed).
- **Multi-tenancy:** single shared database with an `outletId` foreign key scoping vendor-owned data (products, inventory, orders, payouts). Every vendor query is filtered by `outletId`.
- **Payments:** **Stripe Connect** — buyers pay once; funds are split across the outlets in the order, platform retains commission, remainder is paid out to each outlet's connected account.
- **Media:** Cloudinary or S3 + CloudFront.
- **Search/filter:** Postgres queries first; add Algolia/Meilisearch later if needed.
- **Language:** TypeScript everywhere, with a shared types package to keep the API contract in sync.

### Surfaces
- **Storefront** — customer-facing (Next.js).
- **Vendor dashboard** — outlets manage products, inventory, orders, tailoring queue, payouts.
- **Platform admin** — approve outlets, manage commission, oversee all orders/disputes.

### Project structure
```
/frontend   (Next.js — storefront + vendor dashboard + admin)
/backend    (Node API + Prisma)
/shared     (TypeScript types shared across both)
```

---

## 3. Data Model

### Core entities
```
Outlet ─< Product >─ Category
Outlet ─< OutletOrder (sub-order) >─ Order
Outlet ─< Payout
User ─< Order ─< OrderItem >─ ProductVariant >─ Product
Order ─< OutletOrder ─< OrderItem        (order split per outlet)
User ─< Address
User ─< WishlistItem >─ Product
User ─< MeasurementProfile
Product ─< ProductImage
Product ─< ProductVariant
Cart ─< CartItem >─ ProductVariant       (cart may span multiple outlets)
Coupon, Review, Payment, StitchingOption
```

### Multi-vendor entities
```
Outlet
  name, slug, description, logo
  isHouse           true for Dressly's own first-party outlet (commission 0%, no payout)
  status            PENDING | APPROVED | SUSPENDED
  stripeAccountId   Stripe Connect connected account (null for house outlet)
  commissionRate    per-outlet rate, set at onboarding/negotiation
  contact, address

Order                (the buyer's single checkout)
  userId            nullable (guest)
  guestPhone        required for guest orders
  guestEmail        optional
  status, totals, couponId
  paymentId

OutletOrder          (one per outlet in the order — fulfillment unit)
  orderId, outletId
  status            independent per outlet (see §4)
  subtotal, commissionAmount, payoutAmount
  → owns the OrderItems for that outlet

Payout
  outletId, amount, status, stripeTransferId, period
```

### Key fields for stitched / unstitched + stitching
```
Product
  outletId          owning outlet (every product belongs to one outlet)
  type              STITCHED | UNSTITCHED
  stitchingAvailable boolean        (unstitched only)

ProductVariant
  size              optional (null for unstitched)
  color, sku, stock, price          (stock is per outlet, owned by the outlet)

StitchingOption        (priced add-ons, NOT styles — styles are free-text)
  name              e.g. With lining, Piping, Express turnaround
  priceExtra
  applicableCategories

SizeChart              (admin-defined defaults that prefill measurements)
  size              S | M | L | ...
  category          optional, for category-specific charts
  bust, waist, hips, shoulder, sleeveLength,
  shirtLength, trouserLength, ...  (default values per size)

MeasurementProfile (per user, reusable)
  label
  bust, waist, hips, shoulder, sleeveLength,
  shirtLength, trouserLength, ...  + notes

OrderItem
  outletOrderId         the per-outlet sub-order it belongs to
  productVariantId
  stitchingRequested    boolean   (false = unstitched as-is)
  stitchingStyleNotes   free-text custom style/cut instructions
  stitchingOptionIds    selected priced add-ons (lining, express, ...)
  measurementsSnapshot  custom values captured at purchase time
  stitchingPrice        base stitching fee + add-ons, added to line total
  isMadeToOrder         boolean

Order
  status   extended enum (see §4)
```

### Design rules
- **Product → ProductVariant split** is the foundation; get it right first (most expensive to refactor later).
- **Measurements are snapshotted onto OrderItem** at purchase — later edits to a saved profile must not corrupt past orders.
- **Free-text style notes are also snapshotted** onto the OrderItem at purchase.
- **Line total** = fabric/product price + base stitching fee + selected add-on prices.
- **Base stitching fee** comes from the product (or its category) since style is free-text and not individually priced.
- **Coupons discount the full line total** (product + stitching), applied at the order level.
- **Size selection prefills measurements**, which are then user-editable per field before being snapshotted onto the OrderItem.
- **Inventory decrement** at payment confirmation, not add-to-cart.
- **Unstitched = fixed sets**, so cart quantity is a plain integer count — no length/meter handling.
- **One checkout, split into per-outlet sub-orders** — a cart spanning multiple outlets produces one `Order` and multiple `OutletOrder`s; each outlet fulfills and is tracked independently.
- **Commission is computed per OutletOrder** at payment time; payout = subtotal − commission, settled via Stripe Connect.
- **Guest orders are keyed by phone number** (mandatory); a later sign-up with the same phone can claim past guest orders.

---

## 4. Stitching Flow & Fulfillment

- Unstitched products are sold as **fixed sets**; the product page offers a **"Get it stitched"** toggle.
- On selecting stitching, capture: free-text style/cut instructions + optional priced add-ons (lining, express, ...) + measurements (custom or saved profile reference).
- Measurement entry:
  - **Saved profiles** — enter once, reuse across orders.
  - **Size-based prefill** — picking S/M/L populates a default measurement chart, and the user can edit any individual field (shoulder, arm length, waist, etc.) before saving/ordering.
- **Each outlet runs its own tailoring** — measurements + style notes route to the owning outlet's tailoring queue.
- **Lead time differs:** stitched ships in days; made-to-order takes longer. Show per-item estimated delivery.
- **Status is tracked per `OutletOrder`** (one outlet may have shipped while another is still stitching).
- **Extended status** for made-to-order items:
  `PROCESSING → STITCHING → QUALITY_CHECK → SHIPPED` (ready-to-wear skips straight to shipping).
- **Returns:** custom-stitched line items typically non-returnable — flag accordingly.

---

## 5. Feature Scope (phased)

### Phase 1 — MVP
- Roles & auth: customer, vendor, admin; guest checkout (phone-keyed).
- Outlet onboarding: registration → admin approval → Stripe Connect account link.
- Vendor dashboard (basics): create/manage products, variants, inventory.
- Product catalog: categories, variants, filtering (type, size, color, price, outlet).
- Product type handling: stitched display + unstitched display with stitching add-on (free-text style, base fee) and measurement capture (size prefill + edit).
- Cart spanning multiple outlets (session/localStorage for guests, persisted on login).
- Checkout → Stripe Connect split payment; order split into per-outlet sub-orders.
- Order creation, confirmation, order history; per-outlet status tracking.

### Phase 2 — Commerce essentials
- Platform admin dashboard: approve/suspend outlets, commission settings, all-orders view.
- Vendor dashboard: per-outlet order management + tailoring queue (measurements/style exportable for the tailor).
- Payouts: commission calculation + Stripe Connect transfers, payout history per outlet.
- Saved measurement profiles, priced stitching add-ons.
- Made-to-order status workflow.
- Wishlist.
- Coupons / discounts (whole-order, product + stitching).
- Email/SMS notifications (order confirmation, shipping; SMS matters for phone-keyed guests).
- Reviews & ratings (product and outlet).

### Phase 3 — Growth
- Search (Algolia/Meilisearch).
- Recommendations ("you may also like").
- Outlet storefront pages, outlet-level analytics.
- Analytics, abandoned cart recovery.
- Multi-currency / internationalization (deferred — single region for now).

---

## 6. Build Order

1. Repo + tooling setup (TS, linting, env config, Docker for Postgres).
2. Database schema + Prisma migrations (outlet → product/variant → order/outlet-order → stitching model).
3. Backend: auth & roles → outlet onboarding → products → cart → orders (split) → Stripe Connect payments → stitching/measurements → payouts.
4. Frontend storefront: layout → catalog → product page (stitched + unstitched) → multi-outlet cart → checkout.
5. Vendor dashboard (products, inventory, orders, tailoring queue) + platform admin (approvals, commission, payouts).
6. Phase 2 features.
7. Testing, SEO, deployment (Vercel frontend; Railway/Render/Fly for backend + DB).

---

## 7. Recommendations / Watch-outs

- Use **NestJS** — multi-vendor with roles, split payments, and payouts benefits from the structure.
- **Get the outlet + variant + stitching model right first** — costliest thing to change later.
- **Scope every vendor query by `outletId`** — the core multi-tenancy safety rule; a missing filter leaks one outlet's data to another.
- **Use Stripe Connect from the start** — retrofitting split payments/payouts onto plain Stripe is painful.
- **Split orders into per-outlet sub-orders** so fulfillment, status, and payouts are independent.
- **Don't persist guest carts in the DB** — use localStorage/session, persist on login.
- **Decrement inventory at payment confirmation.**
- **Snapshot measurements + style notes onto orders** to protect order history.
- Resolve the remaining open business decisions in §1 (commission model, onboarding approval, fulfillment ownership) before finalizing payouts/shipping.
