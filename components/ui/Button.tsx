import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  className?: string;
};

const VARIANTS = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "bg-surface-hover text-foreground border border-border hover:border-border-strong",
  ghost: "text-muted hover:text-foreground hover:bg-surface-hover",
};

export function Button({ children, href, variant = "primary", onClick, className = "" }: ButtonProps) {
  const styles = `inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[13px] font-medium transition-colors ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
