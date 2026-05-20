import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'neutral';
  className?: string;
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase",
      variant === 'primary' && "bg-primary/10 text-primary border border-primary/20",
      variant === 'secondary' && "bg-secondary/10 text-secondary border border-secondary/20",
      variant === 'error' && "bg-error/10 text-error border border-error/20",
      variant === 'success' && "bg-emerald-500/15 text-emerald-600 border border-emerald-500/20",
      variant === 'warning' && "bg-amber-500/15 text-amber-600 border border-amber-500/20",
      variant === 'neutral' && "bg-surface-container text-on-surface-variant border border-outline-variant/30",
      className
    )}>
      {children}
    </span>
  );
}
