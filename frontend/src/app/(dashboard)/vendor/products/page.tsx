import type { Metadata } from "next";
import { ProductsTable } from "@/components/dashboard/products-table";

export const metadata: Metadata = {
  title: "Products — Vendor Dashboard",
};

export default function VendorProductsPage() {
  return <ProductsTable />;
}
