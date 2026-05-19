import { motion } from 'motion/react';
import { ITINERARY } from '@/src/constants';
import { MapPin, Clock, ChevronRight, PlaneTakeoff, Info, Utensils, Waves, Users, Brain } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Itinerary() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center md:text-left"
      >
        <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">Lenakids 2026 </span>
        <h2 className="font-heading font-bold text-3xl text-primary mb-4">团建行程列表</h2>
        <p className="text-on-surface-variant font-medium text-sm leading-relaxed">
          Krabi & Koh Lanta Excellence Trip
        </p>
      </motion.div>

      {/* Progress Line */}
      <div className="relative pl-10 space-y-12">
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-outline-variant opacity-30 shadow-sm" />

        {ITINERARY.map((day, idx) => (
          <motion.div 
            key={day.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className={cn(
              "absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg z-10 transition-all duration-300",
              day.day === 1 ? "bg-primary text-white scale-110 ring-4 ring-primary/20" : "bg-outline-variant text-on-surface-variant"
            )}>
              D{day.day}
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-primary opacity-60 uppercase tracking-widest">{day.date}</span>
                <div className="h-px flex-1 bg-outline-variant/30" />
              </div>

              <div className={cn(
                "rounded-3xl p-6 transition-all duration-300 border",
                day.day === 1 ? "bg-white shadow-xl border-primary/20 scale-[1.02]" : "bg-surface-container-low border-transparent hover:bg-surface-container-high"
              )}>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-heading font-bold text-xl text-on-surface leading-tight max-w-[200px] md:max-w-none">{day.title}</h3>
                  <div className="text-primary hover:scale-110 transition-transform">
                    <PlaneTakeoff size={24} />
                  </div>
                </div>

                <div className="space-y-4">
                  {day.activities.map(act => (
                    <div key={act.id} className="space-y-3">
                      <div className="flex items-start gap-3 text-on-surface-variant">
                        <Clock size={16} className="mt-0.5 text-primary/60" />
                        <span className="text-sm font-bold tracking-tight">{act.time}</span>
                      </div>
                      <div className="flex items-start gap-3 text-on-surface-variant">
                        <MapPin size={16} className="mt-0.5 text-primary/60" />
                        <span className="text-sm font-semibold leading-relaxed underline decoration-sky-300 underline-offset-4">{act.location}</span>
                      </div>
                      {act.description && (
                        <p className="text-sm text-on-surface-variant/80 font-medium leading-relaxed pl-1 border-l-2 border-primary/10">
                          {act.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {day.image && (
                   <div className="mt-6 rounded-2xl overflow-hidden shadow-inner group">
                      <img src={day.image} alt={day.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                   </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {day.tags?.map(tag => (
                    <span key={tag} className="bg-surface-container-highest px-3 py-1 rounded-full text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Future Days Summary (Day 4-10) */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <SummaryCard day="D4 - 07.01" icon={<Users size={20} />} title="兰塔岛跨海乔迁" desc="体验私家轮渡前往兰塔岛，开启海岛深度协作模式。" />
            <SummaryCard day="D5-D7 - 兰塔周期" icon={<Brain size={20} />} title="战略研讨 & 自由探索" desc="上午进行半天战略会议，下午皮划艇或环岛骑行。" />
        </motion.div>
         {/* Day 11 */}
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
             <div className="absolute -left-10 w-8 h-8 rounded-full bg-outline-variant text-on-surface-variant flex items-center justify-center font-bold text-xs shadow-lg z-10">D11</div>
             <div className="rounded-3xl p-6 bg-surface-container-low border border-transparent">
                 <div className="flex justify-between items-start mb-4">
                     <h3 className="font-heading font-bold text-xl">返程准备</h3>
                     <div className="text-primary opacity-60"><PlaneTakeoff size={24} /></div>
                 </div>
                 <div className="flex items-center gap-3 text-on-surface-variant text-sm font-semibold">
                     <Clock size={16} /> 09:00 - 14:00
                 </div>
             </div>
         </motion.div>
      </div>

      <footer className="pt-12 text-center text-on-surface-variant/40 text-[10px] font-bold uppercase tracking-widest leading-loose">
        &copy; 2026 Corporate Retreat Services<br />
        Emergency: +66 (0) 75-123-456<br />
        Help Desk | Privacy Policy
      </footer>
    </div>
  );
}

function SummaryCard({ day, icon, title, desc }: any) {
  return (
    <div className="bg-surface-container-low rounded-3xl p-6 flex flex-col gap-3 group hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent hover:border-primary/10">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest">{day}</span>
        <div className="text-primary/60 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <h4 className="font-heading font-bold text-base">{title}</h4>
      <p className="text-xs text-on-surface-variant leading-relaxed font-medium opacity-80">{desc}</p>
    </div>
  );
}
