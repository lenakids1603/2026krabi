import React from 'react';
import { motion } from 'motion/react';
import { ATTRACTIONS } from '../data/attractions';
import { Star, Clock, Backpack, ChevronRight, Waves, Mountain, Landmark } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function Attractions() {
  const [activeTab, setActiveTab] = useState('全部项目');

  return (
    <div className="space-y-10 pb-12 text-left">
      <header className="space-y-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-3 inline-block border border-secondary/20 shadow-sm">
                Destination Highlights
            </span>
        </motion.div>
        <h2 className="font-heading font-bold text-4xl text-primary tracking-tight text-left">景点项目</h2>
        <p className="text-on-surface-variant max-w-2xl font-medium text-sm leading-relaxed opacity-90 text-left">
            精选甲米及兰塔岛最具代表性的户外活动与休闲景点。无论是海上探险还是落日漫步，我们为您准备了详细的参与指南。
        </p>
      </header>

      {/* Filter Chips */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
        <button 
          onClick={() => setActiveTab('全部项目')}
          className={cn(
            "px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shrink-0 cursor-pointer",
            activeTab === '全部项目' ? "bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95" : "bg-white border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low shadow-sm"
          )}
        >
          全部项目
        </button>
        <FilterCard icon={<Waves size={16} />} label="水上运动" active={activeTab === '水上运动'} onClick={() => setActiveTab('水上运动')} />
        <FilterCard icon={<Mountain size={16} />} label="自然景观" active={activeTab === '自然景观'} onClick={() => setActiveTab('自然景观')} />
        <FilterCard icon={<Landmark size={16} />} label="文化体验" active={activeTab === '文化体验'} onClick={() => setActiveTab('文化体验')} />
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ATTRACTIONS.map((attr, idx) => (
          <motion.article 
            key={attr.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0px_4px_30px_rgba(0,119,182,0.06)] border border-outline-variant/30 hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative h-64 w-full overflow-hidden">
                <img 
                    src={attr.image} 
                    alt={attr.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-primary/90 text-white px-4 py-2 rounded-2xl text-[10px] font-bold flex items-center gap-2 backdrop-blur-md shadow-xl border border-white/20 uppercase tracking-widest">
                    <Clock size={16} /> {attr.duration}
                </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-heading font-bold text-xl text-primary leading-tight tracking-tight group-hover:text-primary-container transition-colors text-left">{attr.title}</h3>
                <div className="flex items-center text-[#E9C46A] gap-1 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-200/50">
                  <Star size={18} className="fill-[#E9C46A]" />
                  <span className="font-bold text-on-surface text-base">{attr.rating}</span>
                </div>
              </div>
              <p className="text-on-surface-variant font-medium text-sm leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity text-left">
                {attr.description}
              </p>
              
              <div className="bg-surface-container-low p-6 rounded-3xl mb-8 border border-outline-variant/20 shadow-inner group-hover:bg-white group-hover:shadow-md transition-all duration-500 text-left">
                <p className="font-heading font-bold text-xs text-secondary mb-4 flex items-center gap-3 uppercase tracking-widest">
                  <Backpack size={18} /> 必备清单
                </p>
                <div className="flex flex-wrap gap-2">
                  {attr.packingList.map(item => (
                    <span key={item} className="bg-white/80 border border-outline-variant/30 px-4 py-1.5 rounded-full text-[10px] font-bold text-secondary uppercase tracking-wider shadow-sm group-hover:bg-secondary/5 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="w-full bg-brand-coral text-white py-4 rounded-[1.25rem] font-bold text-sm uppercase tracking-[0.2em] hover:brightness-110 transition-all active:scale-[0.98] shadow-lg shadow-brand-coral/20 flex items-center justify-center gap-2 group/btn relative overflow-hidden cursor-pointer">
                <span className="relative z-10">查看详情</span>
                <ChevronRight size={20} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

interface FilterCardProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}

function FilterCard({ icon, label, active, onClick }: FilterCardProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "border px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer",
        active ? "bg-primary text-white border-primary shadow-primary/20" : "bg-white border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low"
      )}
    >
      {icon} {label}
    </button>
  );
}
