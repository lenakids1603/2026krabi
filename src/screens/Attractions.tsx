import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ATTRACTIONS } from '../data/attractions';
import { Star, Clock, Backpack, ChevronRight, Users, Sparkles, Compass, Map, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function Attractions() {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'unified' | 'suggested'>('all');
  const [regionFilter, setRegionFilter] = useState<'all' | '甲米' | '兰塔'>('all');

  const filteredAttractions = ATTRACTIONS.filter(attr => {
    const matchesCategory = categoryFilter === 'all' || attr.category === categoryFilter;
    const matchesRegion = regionFilter === 'all' || attr.region === regionFilter;
    return matchesCategory && matchesRegion;
  });

  return (
    <div className="space-y-10 pb-12 text-left">
      <header className="space-y-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-3 inline-block border border-secondary/20 shadow-sm">
                Activity Schedule
            </span>
        </motion.div>
        <h2 className="font-heading font-bold text-4xl text-primary tracking-tight text-left">活动安排</h2>
        <p className="text-on-surface-variant max-w-2xl font-medium text-sm leading-relaxed opacity-90 text-left">
            为您精选泰国的团队统一精彩行程与自由行建议游玩项目。请通过下方筛选器快速按活动类别和游玩地区进行划分筛选。
        </p>
      </header>

      {/* Modern Dual Filters Widget */}
      <div className="space-y-6 bg-surface-container-low p-6 md:p-8 rounded-[2rem] border border-outline-variant/30 shadow-sm">
        {/* Row 1: Category Filter */}
        <div className="space-y-3">
          <p className="text-secondary font-bold text-xs uppercase tracking-wider flex items-center gap-2 opacity-80">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> 活动属性分类
          </p>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-2 px-2">
            <button 
              onClick={() => setCategoryFilter('all')}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer flex items-center gap-2 border",
                categoryFilter === 'all' 
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                  : "bg-white border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <Compass size={14} /> 全部活动
            </button>
            <button 
              onClick={() => setCategoryFilter('unified')}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer flex items-center gap-2 border",
                categoryFilter === 'unified' 
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                  : "bg-white border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <Users size={14} /> 统一集体活动
            </button>
            <button 
              onClick={() => setCategoryFilter('suggested')}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer flex items-center gap-2 border",
                categoryFilter === 'suggested' 
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                  : "bg-white border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <Sparkles size={14} /> 建议自主游玩
            </button>
          </div>
        </div>

        {/* Row 2: Region Filter */}
        <div className="space-y-3 border-t border-outline-variant/10 pt-4">
          <p className="text-secondary font-bold text-xs uppercase tracking-wider flex items-center gap-2 opacity-80">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> 甲米 / 兰塔地区
          </p>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-2 px-2">
            <button 
              onClick={() => setRegionFilter('all')}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer flex items-center gap-2 border",
                regionFilter === 'all' 
                  ? "bg-secondary text-white border-secondary shadow-md shadow-secondary/20" 
                  : "bg-white border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <Map size={14} /> 全部地区
            </button>
            <button 
              onClick={() => setRegionFilter('甲米')}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer flex items-center gap-2 border",
                regionFilter === '甲米' 
                  ? "bg-secondary text-white border-secondary shadow-md shadow-secondary/20" 
                  : "bg-white border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <MapPin size={14} /> 甲米地区 (Krabi)
            </button>
            <button 
              onClick={() => setRegionFilter('兰塔')}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer flex items-center gap-2 border",
                regionFilter === '兰塔' 
                  ? "bg-secondary text-white border-secondary shadow-md shadow-secondary/20" 
                  : "bg-white border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <MapPin size={14} /> 兰塔地区 (Lanta)
            </button>
          </div>
        </div>
      </div>

      {/* Activity Grid / List */}
      <AnimatePresence mode="popLayout">
        {filteredAttractions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttractions.map((attr, idx) => (
              <motion.article 
                key={attr.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0px_4px_30px_rgba(0,119,182,0.06)] border border-outline-variant/30 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 w-full overflow-hidden">
                    <img 
                        src={attr.image} 
                        alt={attr.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6 bg-primary/95 text-white px-4 py-2 rounded-2xl text-[10px] font-bold flex items-center gap-2 backdrop-blur-md shadow-xl border border-white/20 uppercase tracking-widest">
                        <Clock size={16} /> {attr.duration}
                    </div>
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 items-center mb-3">
                    {attr.category === 'unified' ? (
                      <span className="bg-brand-coral/10 text-brand-coral border border-brand-coral/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                        统一集体行程
                      </span>
                    ) : (
                      <span className="bg-[#2A9D8F]/10 text-[#218276] border border-[#2A9D8F]/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                        建议自主游玩
                      </span>
                    )}
                    {attr.region && (
                      <span className="bg-[#457B9D]/10 text-[#2A5270] border border-[#457B9D]/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                        <MapPin size={11} /> {attr.region}地区
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-start w-full gap-2 mb-4">
                    <h3 className="font-heading font-bold text-xl text-primary leading-tight tracking-tight group-hover:text-primary-container transition-colors text-left flex-1">
                      {attr.title}
                    </h3>
                    <div className="flex items-center text-[#E9C46A] gap-1 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-200/50 shrink-0">
                      <Star size={18} className="fill-[#E9C46A]" />
                      <span className="font-bold text-on-surface text-base">{attr.rating}</span>
                    </div>
                  </div>

                  <p className="text-on-surface-variant font-medium text-sm leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity text-left">
                    {attr.description}
                  </p>
                  
                  <div className="bg-surface-container-low p-6 rounded-3xl mb-8 border border-outline-variant/20 shadow-inner group-hover:bg-white group-hover:shadow-md transition-all duration-500 text-left">
                    <p className="font-heading font-bold text-xs text-secondary mb-4 flex items-center gap-3 uppercase tracking-widest">
                      <Backpack size={18} /> 必备/出行携带
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
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] p-12 text-center border border-outline-variant/20 shadow-sm"
          >
            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-4 text-on-surface-variant opacity-60">
              <Compass size={32} />
            </div>
            <h3 className="font-heading font-bold text-lg text-primary mb-2">未找到匹配的活动</h3>
            <p className="text-on-surface-variant text-sm max-w-sm mx-auto opacity-75">
              当前筛选组合下暂时没有安排项目，您可以尝试切换不同的“活动类型”或“游玩地区”进行探索。
            </p>
            <button 
              onClick={() => { setCategoryFilter('all'); setRegionFilter('all'); }}
              className="mt-6 px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold rounded-full uppercase tracking-wider transition-all cursor-pointer"
            >
              重置筛选条件
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
