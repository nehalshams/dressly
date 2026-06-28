export interface VendorStat {
  label: string;
  value: string;
  delta?: string;
}

export const vendorStats: VendorStat[] = [
  { label: "Revenue (30d)", value: "$4,820", delta: "+12%" },
  { label: "Orders (30d)", value: "86", delta: "+8%" },
  { label: "Pending tailoring", value: "5" },
  { label: "Payout due", value: "$3,210" },
];

export type OrderStatus =
  | "PROCESSING"
  | "STITCHING"
  | "SHIPPED"
  | "DELIVERED";

export interface VendorOrder {
  id: string;
  customer: string;
  item: string;
  amount: number;
  status: OrderStatus;
  date: string;
}

export const recentOrders: VendorOrder[] = [
  { id: "DR-1042", customer: "Ayesha R.", item: "Blush Anarkali Suit", amount: 129, status: "STITCHING", date: "Jun 26" },
  { id: "DR-1041", customer: "Meher S.", item: "Lawn 3-Piece (stitched)", amount: 96, status: "PROCESSING", date: "Jun 26" },
  { id: "DR-1039", customer: "Zara K.", item: "Festive Lehenga Set", amount: 245, status: "SHIPPED", date: "Jun 25" },
  { id: "DR-1036", customer: "Nadia H.", item: "Boutique Silk Saree", amount: 210, status: "DELIVERED", date: "Jun 24" },
  { id: "DR-1033", customer: "Sara M.", item: "Embroidered Fabric Set", amount: 76, status: "DELIVERED", date: "Jun 23" },
];
