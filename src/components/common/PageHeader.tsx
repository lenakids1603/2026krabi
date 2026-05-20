import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function PageHeader({ title, subtitle, action, icon }: PageHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <motion.h2 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="font-heading font-bold text-4xl text-on-surface tracking-tight"
          >
            {title}
          </motion.h2>
        </div>
        {subtitle && (
          <p className="text-on-surface-variant font-medium text-sm leading-relaxed max-w-sm opacity-90">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </header>
  );
}
