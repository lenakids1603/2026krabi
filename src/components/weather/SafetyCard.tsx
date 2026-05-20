import { ReactNode } from 'react';

export interface SafetyItem {
  icon: ReactNode;
  text: string;
}

interface SafetyCardProps {
  safety: SafetyItem[];
}

export function SafetyCard({ safety }: SafetyCardProps) {
  return (
    <section className="apple-glass-dark text-white p-6 rounded-[2rem] border border-white/20 shadow-2xl space-y-5">
      <h3 className="font-heading font-extrabold text-xl tracking-tight leading-none text-left">安全建议 (Safety Tips)</h3>
      <div className="space-y-4 font-bold text-xs opacity-90 leading-relaxed text-left font-sans">
        {safety.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="p-0.5 shrink-0 mt-0.5">{item.icon}</div>
            <p className="tracking-tight">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
