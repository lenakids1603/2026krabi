import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ATTRACTIONS } from '../data/attractions';
import { 
  Star, 
  Clock, 
  Backpack, 
  ChevronRight, 
  Users, 
  Sparkles, 
  Compass, 
  Map, 
  MapPin, 
  X, 
  Activity, 
  CircleDollarSign, 
  AlertTriangle, 
  Navigation,
  CheckCircle2,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Attraction } from '../types';
import { useDragToScroll } from '../hooks/useDragToScroll';

export default function Attractions() {
  const categoryDragScroll = useDragToScroll();
  const regionDragScroll = useDragToScroll();
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'unified' | 'suggested'>('all');
  const [regionFilter, setRegionFilter] = useState<'all' | '甲米' | '兰塔'>('all');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

  const filteredAttractions = ATTRACTIONS.filter(attr => {
    const matchesCategory = categoryFilter === 'all' || attr.category === categoryFilter;
    const matchesRegion = regionFilter === 'all' || attr.region === regionFilter;
    return matchesCategory && matchesRegion;
  });

  return (
    <div className="space-y-10 pb-12 text-left relative">
      <header className="space-y-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="bg-[#E5EFF1] text-[#1D5E6B] border border-[#1D5E6B]/15 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase mb-3 inline-block shadow-sm">
            ACTIVITY SCHEDULE
          </span>
        </motion.div>
        <h2 className="font-heading font-black text-4xl text-[#00516E] tracking-tight text-left">活动安排</h2>
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
          <div 
            ref={categoryDragScroll.ref}
            onMouseDown={categoryDragScroll.onMouseDown}
            style={categoryDragScroll.style}
            className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-2 px-2"
          >
            <button 
              id="filter-category-all"
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
              id="filter-category-unified"
              onClick={() => setCategoryFilter('unified')}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer flex items-center gap-2 border",
                categoryFilter === 'unified' 
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                  : "bg-white border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <Users size={14} /> 统一安排
            </button>
            <button 
              id="filter-category-suggested"
              onClick={() => setCategoryFilter('suggested')}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer flex items-center gap-2 border",
                categoryFilter === 'suggested' 
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                  : "bg-white border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <Sparkles size={14} /> 自主游玩
            </button>
          </div>
        </div>

        {/* Row 2: Region Filter */}
        <div className="space-y-3 border-t border-outline-variant/10 pt-4">
          <p className="text-secondary font-bold text-xs uppercase tracking-wider flex items-center gap-2 opacity-80">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> 甲米 / 兰塔地区
          </p>
          <div 
            ref={regionDragScroll.ref}
            onMouseDown={regionDragScroll.onMouseDown}
            style={regionDragScroll.style}
            className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-2 px-2"
          >
            <button 
              id="filter-region-all"
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
              id="filter-region-krabi"
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
              id="filter-region-lanta"
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
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0px_4px_30px_rgba(0,119,182,0.06)] border border-outline-variant/30 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative h-64 w-full overflow-hidden shrink-0">
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
                <div className="p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2 items-center mb-3">
                      {attr.category === 'unified' ? (
                        <span className="bg-brand-coral/10 text-brand-coral border border-brand-coral/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                          统一安排
                        </span>
                      ) : (
                        <span className="bg-[#2A9D8F]/10 text-[#218276] border border-[#2A9D8F]/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                          自主游玩
                        </span>
                      )}
                      {attr.region && (
                        <span className="bg-[#457B9D]/10 text-[#2A5270] border border-[#457B9D]/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                          <MapPin size={11} /> {attr.region}地区
                        </span>
                      )}
                      {attr.isWater && (
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 border",
                          attr.isWater === '可下水' && "bg-sky-50 text-sky-700 border-sky-200",
                          attr.isWater === '不下水' && "bg-amber-50 text-amber-700 border-amber-200",
                          attr.isWater === '不一定下水' && "bg-slate-50 text-slate-700 border-slate-200"
                        )}>
                          🛶 {attr.isWater}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-start w-full gap-2 mb-4">
                      <h3 className="font-heading font-bold text-xl text-primary leading-tight tracking-tight group-hover:text-primary-container transition-colors text-left flex-1 min-h-[3.5rem]">
                        {attr.title}
                      </h3>
                      <div className="flex items-center text-[#E9C46A] gap-1 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-200/50 shrink-0">
                        <Star size={18} className="fill-[#E9C46A]" />
                        <span className="font-bold text-on-surface text-base">{attr.rating}</span>
                      </div>
                    </div>

                    <p className="text-on-surface-variant font-medium text-sm leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity text-left line-clamp-2">
                      {attr.description}
                    </p>
                    
                    <div className="bg-surface-container-low p-5 rounded-3xl mb-6 border border-outline-variant/20 shadow-inner group-hover:bg-white group-hover:shadow-md transition-all duration-500 text-left">
                      <p className="font-heading font-bold text-xs text-secondary mb-3 flex items-center gap-2.5 uppercase tracking-widest">
                        <Backpack size={16} /> 建议携带/备战
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {attr.packingList.slice(0, 3).map(item => (
                          <span key={item} className="bg-white/80 border border-outline-variant/30 px-3 py-1 rounded-full text-[10px] font-bold text-secondary uppercase tracking-wider shadow-sm transition-colors">
                            {item}
                          </span>
                        ))}
                        {attr.packingList.length > 3 && (
                          <span className="bg-secondary/5 border border-secondary/10 px-3 py-1 rounded-full text-[10px] font-bold text-secondary tracking-wider">
                            +{attr.packingList.length - 3} 更多
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    id={`view-details-${attr.id}`}
                    onClick={() => setSelectedAttraction(attr)}
                    className="w-full bg-brand-coral text-white py-4 rounded-[1.25rem] font-bold text-sm uppercase tracking-[0.2em] hover:brightness-110 transition-all active:scale-[0.98] shadow-lg shadow-brand-coral/20 flex items-center justify-center gap-2 group/btn relative overflow-hidden cursor-pointer mt-auto"
                  >
                    <span className="relative z-10">查看活动详情</span>
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
              id="reset-filters"
              onClick={() => { setCategoryFilter('all'); setRegionFilter('all'); }}
              className="mt-6 px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold rounded-full uppercase tracking-wider transition-all cursor-pointer"
            >
              重置筛选条件
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unified Dynamic Activity Details Modal template */}
      <AnimatePresence>
        {selectedAttraction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
            {/* Dark Overlay backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAttraction(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Body Container */}
            <motion.div 
              id="activity-detail-modal"
              initial={{ opacity: 0, y: '100%', scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-2xl bg-white sm:rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl z-10"
            >
              {/* Header Cover Banner */}
              <div className="relative h-48 sm:h-64 md:h-72 w-full shrink-0">
                <img 
                  src={selectedAttraction.image} 
                  alt={selectedAttraction.title} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Soft Glass Header Elements */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex gap-2">
                  <span className="bg-primary/90 text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 backdrop-blur-md shadow-md border border-white/20 uppercase tracking-wider">
                    <Clock size={12} /> {selectedAttraction.duration}
                  </span>
                  {selectedAttraction.region && (
                    <span className="bg-secondary/90 text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 backdrop-blur-md shadow-md border border-white/20 uppercase tracking-wider">
                      <MapPin size={12} /> {selectedAttraction.region}地区
                    </span>
                  )}
                </div>

                <button 
                  id="close-modal"
                  onClick={() => setSelectedAttraction(null)} 
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-black/45 hover:bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
                  aria-label="关闭详情"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable contents area */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 scrollbar-thin">
                {/* Title & One Sentence Description */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-[#E9C46A] text-[#E9C46A]" />
                    <span className="text-sm font-bold text-on-surface">{selectedAttraction.rating} 评分好评</span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-primary tracking-tight leading-tight">
                    {selectedAttraction.title}
                  </h3>
                  <p className="text-secondary/90 font-medium text-sm leading-relaxed border-l-2 border-brand-coral/60 pl-3 py-0.5">
                    {selectedAttraction.description}
                  </p>
                </div>

                {/* Suitable For & Highlights */}
                <div className="space-y-4 text-left border-t border-outline-variant/10 pt-4">
                  {selectedAttraction.suitableFor && (
                    <div className="space-y-1.5 bg-sky-50/50 hover:bg-sky-50 border border-sky-100/50 rounded-2xl p-4 transition-all duration-300">
                      <h4 className="font-heading font-semibold text-xs uppercase tracking-widest text-sky-800 flex items-center gap-1.5">
                        💡 适合人群
                      </h4>
                      <p className="text-sm font-bold text-sky-900 leading-relaxed">
                        {selectedAttraction.suitableFor}
                      </p>
                    </div>
                  )}

                  {selectedAttraction.highlights && selectedAttraction.highlights.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-heading font-extrabold text-xs uppercase tracking-widest text-secondary flex items-center gap-2">
                        🌟 核心玩乐亮点 / 景点特色
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {selectedAttraction.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-2.5 bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-xs font-bold text-secondary leading-normal shadow-sm">
                            <span className="text-brand-coral font-bold text-sm">✦</span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedAttraction.webPosition && (
                    <div className="space-y-1 bg-primary/5 hover:bg-primary/10 border border-primary/15 rounded-2xl p-3.5 flex items-center gap-2.5 text-left">
                      <span className="text-lg">🎯</span>
                      <div>
                        <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest block">线路网页定位</span>
                        <p className="text-xs font-bold text-primary leading-tight">{selectedAttraction.webPosition}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Requirements 6 & 7: Attendance Status Notice Banner */}
                {selectedAttraction.category === 'unified' ? (
                  <div className="bg-brand-coral/5 border border-brand-coral/20 rounded-2xl p-4 flex items-start gap-3.5 text-left">
                    <div className="p-2 bg-brand-coral/10 text-brand-coral rounded-xl shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-xs text-brand-coral uppercase tracking-wider mb-0.5">
                        统一安排
                      </p>
                      <p className="text-on-surface-variant font-bold text-sm leading-relaxed">
                        公司统一行程安排，全员统一参加。全程提供专属保驾专车、景区行游，员工完全免费参加。
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#2A9D8F]/5 border border-[#2A9D8F]/20 rounded-2xl p-4 flex items-start gap-3.5 text-left">
                    <div className="p-2 bg-[#2A9D8F]/10 text-[#218276] rounded-xl shrink-0">
                      <Info size={20} />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-xs text-[#218276] uppercase tracking-wider mb-0.5">
                        自主游玩
                      </p>
                      <p className="text-on-surface-variant font-bold text-sm leading-relaxed">
                        个人自由活动自选推荐，可自行决定体验。对应车辆或预约结算需由出游人自理。
                      </p>
                    </div>
                  </div>
                )}

                {/* Key Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Item 1: Schedule */}
                  <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10 text-left flex items-start gap-3">
                    <div className="p-2 bg-primary/5 text-primary rounded-xl shrink-0 mt-0.5">
                      <Clock size={16} />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">时间安排</span>
                      <p className="text-sm font-bold text-primary">{selectedAttraction.schedule || '-'}</p>
                    </div>
                  </div>

                  {/* Item 2: Meeting Point */}
                  <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10 text-left flex items-start gap-3">
                    <div className="p-2 bg-primary/5 text-primary rounded-xl shrink-0 mt-0.5">
                      <MapPin size={16} />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">集合地点</span>
                      <p className="text-sm font-bold text-primary">{selectedAttraction.meetingPoint || '-'}</p>
                    </div>
                  </div>

                  {/* Item 3: Physical Effort */}
                  <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10 text-left flex items-start gap-3">
                    <div className="p-2 bg-primary/5 text-primary rounded-xl shrink-0 mt-0.5">
                      <Activity size={16} />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">体力要求</span>
                      <p className="text-sm font-bold text-primary">{selectedAttraction.effort || '轻松'}</p>
                    </div>
                  </div>

                  {/* Item 4: Cost */}
                  <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10 text-left flex items-start gap-3">
                    <div className="p-2 bg-primary/5 text-primary rounded-xl shrink-0 mt-0.5">
                      <CircleDollarSign size={16} />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">费用说明</span>
                      <p className="text-sm font-bold text-primary">{selectedAttraction.cost || '-'}</p>
                    </div>
                  </div>

                  {/* Item 5: Water eligibility */}
                  {selectedAttraction.isWater && (
                    <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10 text-left flex items-start gap-3 col-span-1 sm:col-span-2">
                      <div className="p-2 bg-primary/5 text-primary rounded-xl shrink-0 mt-0.5">
                        <Compass size={16} />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">水上活动要求 / 是否下水</span>
                        <p className="text-sm font-bold text-primary">{selectedAttraction.isWater}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Packing List */}
                <div className="space-y-3 text-left">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-secondary flex items-center gap-2">
                    <Backpack size={16} /> 出行准备物品 / 必备清单
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAttraction.packingList.map(item => (
                      <span key={item} className="bg-secondary/5 text-secondary border border-secondary/10 px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Warnings / Hazards Section */}
                {selectedAttraction.warnings && selectedAttraction.warnings.length > 0 && (
                  <div className="space-y-3 border-t border-outline-variant/10 pt-5 text-left">
                    <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#D62828] flex items-center gap-2">
                      <AlertTriangle size={16} /> 安全事项与出行须知
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedAttraction.warnings.map((warning, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-medium text-on-surface-variant/80 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]/60 shrink-0 mt-1.5" />
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons Footer with Google Maps Trigger */}
              <div className="p-6 bg-surface-container-low border-t border-outline-variant/20 flex flex-col sm:flex-row gap-3">
                {selectedAttraction.mapsUrl && (
                  <a 
                    id="maps-navigation-button"
                    href={selectedAttraction.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/95 transition-all text-center shadow-lg shadow-primary/10"
                  >
                    <Navigation size={16} /> 一键 Google 地图导航
                  </a>
                )}
                <button 
                  id="close-details-footer"
                  onClick={() => setSelectedAttraction(null)}
                  className="w-full sm:w-auto px-6 py-4 bg-outline-variant/10 text-on-surface font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-outline-variant/20 transition-all cursor-pointer"
                >
                  关闭返回
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FilterCardProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterCard({ icon, label, active, onClick }: FilterCardProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shrink-0 cursor-pointer flex items-center gap-2 border",
        active 
          ? "bg-[#2A9D8F] text-white border-[#2A9D8F] shadow-lg shadow-[#2A9D8F]/20 hover:scale-105 active:scale-95" 
          : "bg-white border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low shadow-sm"
      )}
    >
      {icon} {label}
    </button>
  );
}
