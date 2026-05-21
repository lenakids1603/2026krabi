import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getItinerary, getThailandTripProgress } from '../services/api';
import { ItineraryDay as ApiItineraryDay, TripProgress } from '../types/api';
import { ItineraryDay } from '../components/itinerary/ItineraryDay';
import { cn } from '../lib/utils';
import { ChevronRight } from 'lucide-react';
import { useDragToScroll } from '../hooks/useDragToScroll';

// ==========================================
// 💡 自定义左右滑动的日历小卡片内容 (您可以自由修改下方文字)
// ==========================================
const CALENDAR_CARDS = [
  { date: '06.28', day: 1, weekday: '周日', title: '准备启程', note: '全员萧山集结红眼起飞' },
  { date: '06.29', day: 2, weekday: '周一', title: '抵达入住', note: '入境并转场落入兰塔酒店' },
  { date: '06.30', day: 3, weekday: '周二', title: '海滩度假', note: '北部椰浪沙滩悠闲品咖' },
  { date: '07.01', day: 4, weekday: '周三', title: '探寻老镇', note: '访古朴老镇与红树艇探' },
  { date: '07.02', day: 5, weekday: '周四', title: '南部秘境', note: '南部灯塔石滩自驾慢行' },
  { date: '07.03', day: 6, weekday: '周五', title: '重聚奥南', note: '专车离岛入住奥南繁街' },
  { date: '07.04', day: 7, weekday: '周六', title: '海面飞梭', note: '长尾渡一品攀岩者圣地' },
  { date: '07.05', day: 8, weekday: '周日', title: '宏岛浮潜', note: '全岛浮潜或者内路雨池' },
  { date: '07.06', day: 9, weekday: '周一', title: '终章休整', note: 'SPA采购感恩晚会' },
  { date: '07.07', day: 10, weekday: '周二', title: '带笑返程', note: '行李收拾专车安全返航' },
];

export default function Itinerary() {
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [itineraryList, setItineraryList] = useState<ApiItineraryDay[]>([]);
  const [tripProgress, setTripProgress] = useState<TripProgress | null>(null);
  const dragScroll = useDragToScroll();

  useEffect(() => {
    getItinerary().then(data => {
      setItineraryList(data);
      const progress = getThailandTripProgress();
      setTripProgress(progress);
      if (progress.status === 'during' && typeof progress.currentDay === 'number') {
        setSelectedDay(progress.currentDay);
      } else {
        setSelectedDay('all');
      }
    });
  }, []);

  const filteredItinerary = selectedDay === 'all'
    ? itineraryList
    : itineraryList.filter(day => day.day === selectedDay);

  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-12 text-left">
      <header className="space-y-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="bg-[#E5EFF1] text-[#1D5E6B] border border-[#1D5E6B]/15 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase mb-1 inline-block shadow-sm">
            TRAVEL ITINERARY
          </span>
        </motion.div>
        <h2 className="font-heading font-black text-4xl text-[#00516E] tracking-tight text-left">团建行程</h2>
        <p className="text-on-surface-variant max-w-2xl font-medium text-sm leading-relaxed opacity-90 text-left">
          甲米 & 兰塔岛 10 天 9 晚公司度夏游玩全纪实。伴随着海浪、落日与椰树，开启令人期待的探索之旅。
        </p>

        {/* Lightweight time/range banners */}
        {tripProgress?.status === 'before' && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3.5 py-2 rounded-2xl font-medium flex items-center gap-2">
            <span>⏳</span>
            <span>2026 团建行程尚未开始（预计 2026-06-28 启程，当前处于出行准备阶段）</span>
          </div>
        )}
        {tripProgress?.status === 'after' && (
          <div className="bg-slate-100 border border-slate-200 text-slate-600 text-xs px-3.5 py-2 rounded-2xl font-medium flex items-center gap-2">
            <span>🎉</span>
            <span>2026 团建行程已于 2026-07-07 圆满落幕，感谢同行！</span>
          </div>
        )}
        {tripProgress?.status === 'during' && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-2 rounded-2xl font-medium flex items-center gap-2">
            <span>🌴</span>
            <span>今日是 2026 团建 <b>第 {tripProgress.currentDay} 天</b>，泰国曼谷时间当前：<b>{tripProgress.formattedDate}</b></span>
          </div>
        )}
      </header>

      {/* Slideable Calendar Cards Section */}
      <div className="space-y-3 bg-slate-50 border border-slate-100 p-4 rounded-3xl">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary/60 uppercase tracking-widest flex items-center gap-1">
              📅 行程专属日历
            </span>
          </div>
          <span className="text-[10px] font-bold text-on-surface-variant/50 flex items-center gap-0.5 animate-pulse">
            左右滑动 <ChevronRight size={10} />
          </span>
        </div>

        {/* Horizontal Scroll Bar */}
        <div 
          ref={dragScroll.ref}
          onMouseDown={dragScroll.onMouseDown}
          style={dragScroll.style}
          className="flex gap-2.5 overflow-x-auto pb-2 snap-x scrollbar-none scroll-smooth"
        >
          {/* "ALL" Day Option */}
          <button
            onClick={() => setSelectedDay('all')}
            className={cn(
              "snap-center shrink-0 w-[100px] p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300",
              selectedDay === 'all'
                ? "bg-primary text-white border-primary shadow-md shadow-primary/20 scale-102"
                : "bg-white border-outline-variant/20 text-on-surface hover:bg-surface-container-high hover:border-outline-variant"
            )}
          >
            <div className="space-y-0.5">
              <div className="flex justify-between items-baseline">
                <span className={cn(
                  "text-xs font-black tracking-tight",
                  selectedDay === 'all' ? "text-white" : "text-primary"
                )}>
                  ALL
                </span>
                <span className={cn(
                  "text-[9px] font-extrabold",
                  selectedDay === 'all' ? "text-white/80" : "text-[#218276] bg-emerald-50 px-1 rounded"
                )}>
                  全
                </span>
              </div>
              <div className={cn(
                "text-[10px] font-black tracking-wide",
                selectedDay === 'all' ? "text-white/90" : "text-secondary"
              )}>
                全部进程
              </div>
            </div>
            
            <div className={cn(
              "text-[8px] font-bold leading-tight mt-1.5 border-t pt-1 line-clamp-2",
              selectedDay === 'all' 
                ? "border-white/10 text-white/75" 
                : "border-outline-variant/10 text-on-surface-variant/70"
            )}>
              查看完整 10 天大行程
            </div>
          </button>

          {CALENDAR_CARDS.map(card => {
            const isToday = card.day === tripProgress?.currentDay;
            return (
              <button
                key={card.day}
                onClick={() => setSelectedDay(card.day)}
                className={cn(
                  "snap-center shrink-0 w-[114px] p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 relative",
                  selectedDay === card.day
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20 scale-102"
                    : isToday
                      ? "bg-amber-50/50 border-amber-300 text-on-surface shadow-sm"
                      : "bg-white border-outline-variant/20 text-on-surface hover:bg-surface-container-high hover:border-outline-variant"
                )}
              >
                <div className="space-y-0.5 w-full">
                  <div className="flex justify-between items-baseline gap-1">
                    <span className={cn(
                      "text-xs font-black tracking-tight",
                      selectedDay === card.day ? "text-white" : "text-primary"
                    )}>
                      {card.date}
                    </span>
                    <span className={cn(
                      "text-[8px] font-bold",
                      selectedDay === card.day 
                        ? "text-white/85 bg-white/20 px-1 rounded-sm" 
                        : isToday
                          ? "bg-red-500 text-white px-1 rounded-sm shadow-sm"
                          : "text-on-surface-variant"
                    )}>
                      {isToday ? "今日" : card.weekday}
                    </span>
                  </div>
                  <div className={cn(
                    "text-[10px] font-extrabold uppercase tracking-widest",
                    selectedDay === card.day ? "text-white/90" : "text-secondary"
                  )}>
                    Day {card.day}
                  </div>
                </div>
                
                <div className={cn(
                  "text-[9px] font-medium leading-tight mt-1.5 border-t pt-1 line-clamp-2 w-full",
                  selectedDay === card.day 
                    ? "border-white/10 text-white/75" 
                    : "border-outline-variant/10 text-on-surface-variant/70"
                )}>
                  {card.note || '点击添加备注'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Line */}
      <div className="relative pl-10 space-y-12">
        {selectedDay === 'all' && (
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-outline-variant opacity-30 shadow-sm" />
        )}

        <AnimatePresence mode="popLayout">
          {filteredItinerary.map((day, idx) => (
            <motion.div
              key={day.day}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ItineraryDay day={day} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredItinerary.length === 0 && (
          <div className="py-8 text-center text-on-surface-variant font-medium text-sm">
            暂无该天行程排班信息，建议查看其它天数安排。
          </div>
        )}
      </div>

      <footer className="pt-12 text-center text-on-surface-variant/40 text-[10px] font-bold uppercase tracking-widest leading-loose">
        &copy; 2026 Corporate Retreat Services<br />
        Emergency: +66 (0) 75-123-456<br />
        Help Desk | Privacy Policy
      </footer>
    </div>
  );
}
