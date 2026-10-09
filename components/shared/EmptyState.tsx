type EmptyStateProps = { title: string; description: string };

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
      <p className="text-[14px] font-medium text-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-[13px] text-muted-dim">{description}</p>
    </div>
  );
}
