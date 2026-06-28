export function StatCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="font-serif text-3xl text-plum">{value}</span>
        {delta && <span className="mb-1 text-xs font-medium text-green-600">{delta}</span>}
      </div>
    </div>
  );
}
