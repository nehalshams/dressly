import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  PROCESSING: "bg-amber-100 text-amber-800",
  STITCHING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-green-100 text-green-800",
  ACTIVE: "bg-green-100 text-green-800",
  DRAFT: "bg-gray-100 text-gray-700",
  OUT_OF_STOCK: "bg-red-100 text-red-800",
};

function label(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-1 text-xs font-medium",
        STYLES[status] ?? "bg-secondary text-foreground"
      )}
    >
      {label(status)}
    </span>
  );
}
