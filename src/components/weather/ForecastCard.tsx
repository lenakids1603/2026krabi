import { Calendar } from 'lucide-react';
import { ReactNode } from 'react';

export interface ForecastItem {
  day: string;
  icon: ReactNode;
  min: number;
  max: number;
}

interface ForecastCardProps {
  forecast: ForecastItem[];
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <section className="apple-glass rounded-[2rem] overflow-hidden text-white shadow-2xl">
      <div className="px-6 py-4 border-b border-white/10 bg-white/5">
        <h3 className="font-sans font-bold text-xs uppercase tracking-widest opacity-80 flex items-center gap-3">
          <Calendar size={20} className="text-yellow-300" /> 未来 5 日预测
        </h3>
      </div>
      <div className="divide-y divide-white/10 font-sans">
        {forecast.map((fc, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 px-6">
            <p className="w-12 font-bold text-sm tracking-wide text-white/95 text-left">{fc.day}</p>
            <div className="drop-shadow-lg shrink-0">{fc.icon}</div>
            <div className="flex items-center gap-3 w-32 justify-end">
              <span className="text-white/40 font-bold text-xs w-8 text-right">{fc.min}°</span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden hidden xs:block">
                <div className="absolute left-[20%] right-[30%] h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
              </div>
              <span className="font-bold text-sm w-8 text-right">{fc.max}°</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
