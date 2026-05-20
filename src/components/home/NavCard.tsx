import { ReactNode } from 'react';

interface NavCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  className?: string;
  isBordered?: boolean;
}

export function NavCard({ icon, title, subtitle, className = "bg-white", isBordered }: NavCardProps) {
  return (
    <div className={`p-6 rounded-3xl shadow-sm border border-outline-variant/20 flex flex-col hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 cursor-pointer group ${className} ${isBordered ? 'border-primary/40 bg-primary/5' : ''}`}>
      <div className="text-primary mb-4 p-2 bg-primary/5 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h4 className="font-heading font-bold text-base text-on-surface mb-2 truncate">{title}</h4>
      <p className="text-on-surface-variant text-[10px] font-medium leading-relaxed opacity-80">{subtitle}</p>
    </div>
  );
}
