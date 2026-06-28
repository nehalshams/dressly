"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { products as seed, type Product } from "@/data/products";

interface ProductsContextValue {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

const STORAGE_KEY = "dressly-vendor-products";

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seed);
  const [hydrated, setHydrated] = useState(false);

  // Load saved products after mount (server + first client render use the seed,
  // avoiding a hydration mismatch).
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setProducts(JSON.parse(raw));
      } catch {
        // ignore corrupt storage
      }
    }
    setHydrated(true);
  }, []);

  // Persist only after hydration so the seed doesn't clobber saved data.
  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products, hydrated]);

  const getProduct = (id: string) => products.find((p) => p.id === id);
  const addProduct = (product: Product) =>
    setProducts((prev) => [product, ...prev]);
  const updateProduct = (product: Product) =>
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
  const removeProduct = (id: string) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <ProductsContext.Provider
      value={{ products, getProduct, addProduct, updateProduct, removeProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return ctx;
}
