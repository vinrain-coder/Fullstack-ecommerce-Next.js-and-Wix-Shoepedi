import { cn } from "@/src/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "w-fit bg-primary px-2 py-1 text-xs text-primary-foreground rounded-md rounded-tr-none rounded-bl-none",
        className
      )}
    >
      {children}
    </span>
  );
}
