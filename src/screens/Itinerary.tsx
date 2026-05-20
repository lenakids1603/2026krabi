import React from 'react';
import { motion } from 'motion/react';
import { ITINERARY } from '../data/itinerary';
import { ItineraryDay } from '../components/itinerary/ItineraryDay';

export default function Itinerary() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center md:text-left"
      >
        <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">Lenakids Retreat 2026 </span>
        <h2 className="font-heading font-bold text-3xl text-primary mb-4 text-left">团建行程列表</h2>
        <p className="text-on-surface-variant font-medium text-sm leading-relaxed text-left">
          Krabi & Koh Lanta Excellence Trip
        </p>
      </motion.div>

      {/* Progress Line */}
      <div className="relative pl-10 space-y-12">
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-outline-variant opacity-30 shadow-sm" />

        {ITINERARY.map((day, idx) => (
          <ItineraryDay key={day.day} day={day} index={idx} />
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
