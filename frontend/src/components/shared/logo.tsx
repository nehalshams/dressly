import { Sparkles } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-plum text-primary-foreground shadow-soft">
        <Sparkles className="h-4 w-4" />
      </span>
      <span className="font-serif text-2xl font-medium tracking-tight text-plum">Dressly</span>
    </div>
  );
}
