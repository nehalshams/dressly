import type { Metadata } from "next";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { vendorStats, recentOrders } from "@/data/vendor";

export const metadata: Metadata = {
  title: "Overview — Vendor Dashboard",
};

export default function VendorOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-plum">Welcome back, Meher Studio</h1>
        <p className="mt-1 text-muted-foreground">Here's how your store is doing this month.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {vendorStats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} />
        ))}
      </div>

      <div className="rounded-2xl border border-border/60 bg-card shadow-soft">
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <h2 className="font-serif text-lg text-plum">Recent orders</h2>
          <a href="/vendor/orders" className="text-sm font-medium text-primary-glow hover:underline">
            View all
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3 font-medium">Order</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Item</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-border/40 last:border-0">
                  <td className="px-6 py-4 font-medium text-plum">{o.id}</td>
                  <td className="px-6 py-4 text-foreground/80">{o.customer}</td>
                  <td className="px-6 py-4 text-foreground/80">{o.item}</td>
                  <td className="px-6 py-4 font-medium">${o.amount}</td>
                  <td className="px-6 py-4"><StatusBadge status={o.status} /></td>
                  <td className="px-6 py-4 text-muted-foreground">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
