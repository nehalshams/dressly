import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ProductsProvider } from "@/lib/products-store";

// NOTE: in production this layout will read the session and redirect anyone who
// isn't a vendor (or platform admin). Mocked for now — no auth yet.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductsProvider>
    <div className="min-h-screen bg-secondary/30">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/60 bg-card/80 px-6 py-4 backdrop-blur">
          <p className="font-serif text-lg text-plum">Vendor Dashboard</p>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">Meher Studio</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-plum font-serif text-sm text-primary-foreground">
              M
            </div>
          </div>
        </header>
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
    </ProductsProvider>
  );
}
