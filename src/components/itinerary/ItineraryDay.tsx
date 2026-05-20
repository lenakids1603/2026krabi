import React from 'react';
import { motion } from 'motion/react';
import { DayItinerary } from '../../types';
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
import { cn } from '../../lib/utils';

// Helper to render dynamic icons for each day card header
export const getDayIcon = (iconName?: string) => {
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

interface ItineraryDayProps {
  day: DayItinerary;
  index: number;
  key?: any;
}

export function ItineraryDay({ day, index }: ItineraryDayProps): React.JSX.Element {
  const isHighlighted = day.day === 1;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline Dot */}
      <div className={cn(
        "absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg z-10 transition-all duration-300",
        isHighlighted ? "bg-primary text-white scale-110 ring-4 ring-primary/20" : "bg-outline-variant text-on-surface-variant"
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
          isHighlighted ? "bg-white shadow-xl border-primary/20 scale-[1.02]" : "bg-surface-container-low border-transparent hover:bg-surface-container-high"
        )}>
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-heading font-bold text-xl text-on-surface leading-tight max-w-[200px] md:max-w-none">{day.title}</h3>
            <div className="text-primary hover:scale-110 transition-transform">
              {getDayIcon(day.icon || day.activities[0]?.icon)}
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
                <div className="flex items-center gap-2 text-on-surface-variant/80 text-xs text-left">
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
  );
}
