import { motion } from 'motion/react';
import { ITINERARY } from '@/src/constants';
import { 
  MapPin, 
  Clock, 
  PlaneTakeoff, 
  Utensils, 
  Waves, 
  Compass, 
  Hotel, 
  Bike, 
  Navigation,
  Sparkles
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Itinerary() {
  // Helper to render dynamic icons for each day card header
  const getDayIcon = (iconName?: string) => {
    switch (iconName) {
      case 'plane-takeoff':
        return <PlaneTakeoff size={24} />;
      case 'hotel':
        return <Hotel size={24} />;
      case 'waves':
        return <Waves size={24} />;
      case 'compass':
        return <Compass size={24} />;
      case 'utensils':
        return <Utensils size={24} />;
      case 'bike':
        return <Bike size={24} />;
      case 'navigation':
        return <Navigation size={24} />;
      default:
        return <Sparkles size={24} />;
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center md:text-left"
      >
        <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">Lenakids Retreat 2026 </span>
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
                    {getDayIcon(day.icon)}
                  </div>
                </div>

                <div className="space-y-6 border-l-2 border-primary/10 pl-4 ml-1">
                  {day.activities.map((act, actIdx) => (
                    <div key={act.id} className="space-y-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-xs tracking-wide">
                        <Clock size={14} />
                        <span>{act.time}</span>
                      </div>
                      <h4 className="font-bold text-base text-on-surface">{act.title}</h4>
                      <div className="flex items-center gap-2 text-on-surface-variant/80 text-xs">
                        <MapPin size={14} className="text-secondary" />
                        <span className="font-medium underline decoration-sky-300 underline-offset-4">{act.location}</span>
                      </div>
                      {act.description && (
                        <p className="text-xs text-on-surface-variant/70 font-medium leading-relaxed mt-1">
                          {act.description}
                        </p>
                      )}
                      {actIdx < day.activities.length - 1 && (
                        <div className="border-t border-dashed border-outline-variant/30 my-4 pt-2" />
                      )}
                    </div>
                  ))}
                </div>

                {day.image && (
                   <div className="mt-6 rounded-2xl overflow-hidden shadow-inner group">
                      <img src={day.image} alt={day.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
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
      </div>

      <footer className="pt-12 text-center text-on-surface-variant/40 text-[10px] font-bold uppercase tracking-widest leading-loose">
        &copy; 2026 Corporate Retreat Services<br />
        Emergency: +66 (0) 75-123-456<br />
        Help Desk | Privacy Policy
      </footer>
    </div>
  );
}
