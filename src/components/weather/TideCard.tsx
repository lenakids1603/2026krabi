import { Waves } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TidePointData {
  type: string;
  time: string;
  val: string;
  active?: boolean;
}

export interface TideData {
  location: string;
  current: string;
  currentLeft: string;
  path: string;
  cx: string;
  cy: string;
  points: TidePointData[];
  tip: string;
}

interface TideCardProps {
  tide: TideData;
}

export function TideCard({ tide }: TideCardProps) {
  return (
    <section className="apple-glass rounded-[2rem] overflow-hidden text-white shadow-2xl">
      <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <h3 className="font-sans font-bold text-xs uppercase tracking-widest opacity-80 flex items-center gap-3">
          <Waves size={20} className="text-blue-300" /> 潮汐时刻 ({tide.location})
        </h3>
      </div>
      <div className="p-6">
        <div className="relative h-32 w-full mb-6 pt-4">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
            <path d={tide.path} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
            <circle cx={tide.cx} cy={tide.cy} fill="white" r="6" className="animate-pulse shadow-glow" />
          </svg>
          <div 
            className="absolute top-0 bg-white text-primary px-3 py-1 rounded-full text-[10px] font-bold shadow-2xl tracking-widest"
            style={{ left: tide.currentLeft, transform: 'translateX(-50%)' }}
          >
            当前 {tide.current}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          {tide.points.map((pt, idx) => (
            <div key={idx} className={cn(
              "apple-glass-dark py-3 px-2 rounded-xl transition-all duration-500",
              pt.active ? "border border-white/40 bg-white/20 scale-105 shadow-glow" : "opacity-60"
            )}>
              <p className="text-[8px] font-bold uppercase tracking-widest mb-0.5">{pt.type}</p>
              <p className="font-heading font-bold text-sm mb-0.5 tracking-tight">{pt.time}</p>
              <p className="text-[9px] font-bold opacity-60">{pt.val}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs opacity-90 leading-relaxed italic border-l-4 border-sky-400 pl-4 bg-white/5 p-3 rounded-xl font-medium text-left">
          {tide.tip}
        </p>
      </div>
    </section>
  );
}
