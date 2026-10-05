type Status = "success" | "warning" | "error" | "info" | "neutral";

const STATUS_STYLES: Record<Status, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  error: "bg-error-soft text-error",
  info: "bg-info-soft text-info",
  neutral: "bg-surface-hover text-muted",
};

export function StatusBadge({ status, children }: { status: Status; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLES[status]}`}>
      {children}
    </span>
  );
}
