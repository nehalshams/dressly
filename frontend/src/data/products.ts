import type { StaticImageData } from "next/image";

import catWomen from "@/assets/cat-women.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catEthnic from "@/assets/cat-ethnic.jpg";
import catWestern from "@/assets/cat-western.jpg";
import catFabrics from "@/assets/cat-fabrics.jpg";
import catBoutique from "@/assets/cat-boutique.jpg";

export type ProductType = "STITCHED" | "UNSTITCHED";

/** A stitched product's size × color combination with its own stock. */
export interface ProductVariant {
  size: string;
  color: string;
  stock: number;
}

/** A priced add-on for the made-to-measure stitching service. */
export interface StitchingOption {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  category: string;
  price: number;
  sizes: string[]; // empty for unstitched
  colors: string[];
  outlet: string;
  img: StaticImageData | string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  description?: string;
  /** Stitched only: size × color × stock matrix. */
  variants?: ProductVariant[];
  /** Unstitched only: can be tailored for an extra fee. */
  stitchingAvailable?: boolean;
  /** Unstitched only: base made-to-measure fee. */
  stitchingBaseFee?: number;
  /** Unstitched only: priced stitching add-ons (lining, express, …). */
  stitchingOptions?: StitchingOption[];
}

export const CATEGORIES = [
  "Women's Wear",
  "Ethnic",
  "Western",
  "Kids",
  "Fabrics",
  "Boutique",
] as const;

export const SIZES = ["XS", "S", "M", "L", "XL"] as const;

export const COLORS = [
  { name: "Blush", hex: "#EBA8C3" },
  { name: "Plum", hex: "#6A2E4D" },
  { name: "Beige", hex: "#E4D4C0" },
  { name: "Ivory", hex: "#F5EFE6" },
  { name: "Teal", hex: "#2E8B8B" },
  { name: "Mustard", hex: "#D8A24A" },
  { name: "Black", hex: "#2C2C2A" },
] as const;

export const products: Product[] = [
  {
    id: "anarkali-blush-suit",
    name: "Blush Anarkali Suit",
    type: "STITCHED",
    category: "Ethnic",
    price: 129,
    sizes: ["S", "M", "L"],
    colors: ["Blush", "Ivory"],
    outlet: "Meher Studio",
    img: catEthnic,
    rating: 4.8,
    reviews: 64,
    isNew: true,
  },
  {
    id: "lawn-3piece-set",
    name: "Lawn 3-Piece Suit (Unstitched)",
    type: "UNSTITCHED",
    category: "Ethnic",
    price: 54,
    sizes: [],
    colors: ["Teal", "Mustard"],
    outlet: "Zara Fabrics",
    img: catFabrics,
    rating: 4.6,
    reviews: 38,
    stitchingAvailable: true,
  },
  {
    id: "tailored-blazer",
    name: "Tailored Wool Blazer",
    type: "STITCHED",
    category: "Western",
    price: 149,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Beige"],
    outlet: "Atelier North",
    img: catWestern,
    rating: 4.7,
    reviews: 52,
  },
  {
    id: "kids-festive-frock",
    name: "Kids Festive Frock",
    type: "STITCHED",
    category: "Kids",
    price: 39,
    sizes: ["XS", "S", "M"],
    colors: ["Blush", "Mustard"],
    outlet: "Little Bloom",
    img: catKids,
    rating: 4.9,
    reviews: 81,
    isNew: true,
  },
  {
    id: "embroidered-fabric-set",
    name: "Embroidered Fabric Set (Unstitched)",
    type: "UNSTITCHED",
    category: "Fabrics",
    price: 76,
    sizes: [],
    colors: ["Plum", "Ivory"],
    outlet: "Zara Fabrics",
    img: catFabrics,
    rating: 4.5,
    reviews: 29,
    stitchingAvailable: true,
  },
  {
    id: "linen-midi-dress",
    name: "Linen Midi Dress",
    type: "STITCHED",
    category: "Western",
    price: 89,
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Ivory"],
    outlet: "Dressly House",
    img: catWomen,
    rating: 4.4,
    reviews: 47,
  },
  {
    id: "boutique-silk-saree",
    name: "Boutique Silk Saree",
    type: "STITCHED",
    category: "Boutique",
    price: 210,
    sizes: ["M", "L"],
    colors: ["Plum", "Mustard"],
    outlet: "Meher Studio",
    img: catBoutique,
    rating: 4.9,
    reviews: 95,
  },
  {
    id: "cotton-suit-fabric",
    name: "Cotton Suit Fabric (Unstitched)",
    type: "UNSTITCHED",
    category: "Fabrics",
    price: 32,
    sizes: [],
    colors: ["Teal", "Beige", "Ivory"],
    outlet: "Zara Fabrics",
    img: catFabrics,
    rating: 4.3,
    reviews: 21,
    stitchingAvailable: true,
  },
  {
    id: "festive-lehenga",
    name: "Festive Lehenga Set",
    type: "STITCHED",
    category: "Ethnic",
    price: 245,
    sizes: ["S", "M", "L"],
    colors: ["Blush", "Plum"],
    outlet: "Atelier North",
    img: catEthnic,
    rating: 4.8,
    reviews: 73,
    isNew: true,
  },
  {
    id: "kids-cotton-kurta",
    name: "Kids Cotton Kurta",
    type: "STITCHED",
    category: "Kids",
    price: 28,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Teal"],
    outlet: "Little Bloom",
    img: catKids,
    rating: 4.6,
    reviews: 40,
  },
  {
    id: "western-co-ord-set",
    name: "Western Co-ord Set",
    type: "STITCHED",
    category: "Western",
    price: 98,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Mustard"],
    outlet: "Dressly House",
    img: catWomen,
    rating: 4.5,
    reviews: 33,
  },
  {
    id: "premium-chiffon-fabric",
    name: "Premium Chiffon Fabric (Unstitched)",
    type: "UNSTITCHED",
    category: "Boutique",
    price: 64,
    sizes: [],
    colors: ["Blush", "Ivory", "Plum"],
    outlet: "Meher Studio",
    img: catBoutique,
    rating: 4.7,
    reviews: 26,
    stitchingAvailable: true,
  },
];
