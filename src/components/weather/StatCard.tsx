import React, { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  sub: string;
  progress?: number;
  key?: any;
}

export function StatCard({ icon, label, value, sub, progress }: StatCardProps): React.JSX.Element {
  return (
    <div className="apple-glass px-5 py-5 rounded-[2rem] flex flex-col justify-between h-36 text-white shadow-xl hover:bg-white/20 transition-colors">
      <div className="flex items-center gap-2 opacity-60">
        {icon}
        <span className="text-[9px] uppercase font-bold tracking-widest">{label}</span>
      </div>
      <div>
        <p className="font-heading font-extrabold text-lg mb-0.5 truncate">{value}</p>
        <p className="text-[10px] opacity-65 font-semibold tracking-wide truncate">{sub}</p>
        {progress !== undefined && (
          <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-red-500 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}
