import {
  Store,
  Scissors,
  Shirt,
  Layers,
  Baby,
  Sparkles,
  Search,
  Wand2,
  PackageCheck,
  HeartHandshake,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { StaticImageData } from "next/image";

import catWomen from "@/assets/cat-women.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catEthnic from "@/assets/cat-ethnic.jpg";
import catWestern from "@/assets/cat-western.jpg";
import catFabrics from "@/assets/cat-fabrics.jpg";
import catBoutique from "@/assets/cat-boutique.jpg";

export interface IconCard {
  icon: LucideIcon;
  title: string;
  desc: string;
  hi: string;
}

export interface Category {
  img: StaticImageData;
  label: string;
  hi: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface TrustBadge {
  label: string;
  hi: string;
}

export const features: IconCard[] = [
  { icon: Store, title: "Shop Local Boutiques", desc: "Discover curated pieces from independent boutiques near you.", hi: "Apne sheher ki trusted fashion shops." },
  { icon: Scissors, title: "Custom Tailoring", desc: "Book skilled tailors and design pieces made to your measurements.", hi: "Apni fitting ke hisaab se silwaye." },
  { icon: Shirt, title: "Ready-made Collections", desc: "Browse the latest stitched apparel ready to wear today.", hi: "Seedha order karein." },
  { icon: Layers, title: "Unstitched Fabrics", desc: "Premium fabrics by the yard, ready for your next creation.", hi: "Kapda pasand karein aur silwaye." },
  { icon: Baby, title: "Kids Fashion", desc: "Adorable, comfortable looks for the little ones in your life.", hi: "Bachchon ke latest fashion." },
  { icon: Sparkles, title: "Smart Recommendations", desc: "Personalized picks tuned to your style, size, and occasion.", hi: "Aapke style ke hisaab se suggestions." },
];

export const steps: IconCard[] = [
  { icon: Search, title: "Explore", desc: "Browse thousands of pieces from boutiques, tailors, and online sellers.", hi: "Nearby shops aur collections dekhiye." },
  { icon: Wand2, title: "Customize", desc: "Pick fabrics, request fittings, or design something uniquely yours.", hi: "Design aur fitting choose kijiye." },
  { icon: PackageCheck, title: "Order", desc: "Check out securely and get it delivered, beautifully packaged.", hi: "Ghar baithe order receive kijiye." },
];

export const why: IconCard[] = [
  { icon: HeartHandshake, title: "Support Local Businesses", desc: "Every order empowers a small boutique or independent tailor.", hi: "Shop karein apne nearby boutiques aur tailors se." },
  { icon: Sparkles, title: "Personalized Fashion", desc: "Style that mirrors who you are, not just what's trending.", hi: "Jo aapko fit aaye, wahi fashion." },
  { icon: ShieldCheck, title: "Quality Assured", desc: "Vetted sellers, verified materials, and easy returns.", hi: "Trusted sellers aur verified stores." },
  { icon: Truck, title: "Seamless Shopping", desc: "One cart, many sellers — a frictionless checkout experience.", hi: "Ek cart, kai sellers — bina jhanjhat." },
];

export const categories: Category[] = [
  { img: catWomen, label: "Women's Wear", hi: "Har occasion ke liye." },
  { img: catKids, label: "Kids Wear", hi: "Comfort aur style dono." },
  { img: catEthnic, label: "Ethnic", hi: "Traditional collection." },
  { img: catWestern, label: "Western", hi: "Modern fashion." },
  { img: catFabrics, label: "Fabrics", hi: "Quality kapde." },
  { img: catBoutique, label: "Boutique Collection", hi: "Local designers ki choice." },
];

export const testimonials: Testimonial[] = [
  { name: "Ayesha R.", role: "Early Tester", quote: "Dressly feels like having a personal stylist and my favourite local boutiques in one app." },
  { name: "Meher S.", role: "Mom of two", quote: "Finally a place where I can shop for my daughters and myself with the same elegant taste." },
  { name: "Zara K.", role: "Fashion Designer", quote: "I love how Dressly champions tailors and small studios. It's beautifully built." },
];

export const trustBadges: TrustBadge[] = [
  { label: "Verified Sellers", hi: "Bharosemand sellers" },
  { label: "Easy Returns", hi: "Aasaan returns" },
  { label: "Secure Payments", hi: "Safe payment" },
  { label: "Fast Delivery", hi: "Jaldi delivery" },
];
