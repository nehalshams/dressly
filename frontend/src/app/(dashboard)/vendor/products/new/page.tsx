import type { Metadata } from "next";
import { ProductForm } from "@/components/dashboard/product-form";

export const metadata: Metadata = {
  title: "Add product — Vendor Dashboard",
};

export default function NewProductPage() {
  return <ProductForm />;
}
