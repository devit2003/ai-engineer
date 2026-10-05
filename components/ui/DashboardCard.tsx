type DashboardCardProps = {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon?: React.ReactNode;
  className?: string;
};

export function DashboardCard({ label, value, hint, icon, className = "" }: DashboardCardProps) {
  return (
    <div className={`rounded-lg border border-border bg-surface p-4 ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[12px] text-muted">{label}</span>
        {icon && <span className="text-muted-dim">{icon}</span>}
      </div>
      <div className="text-2xl font-semibold text-foreground">{value}</div>
      {hint && <p className="mt-1 text-[12px] text-muted-dim">{hint}</p>}
    </div>
  );
}
