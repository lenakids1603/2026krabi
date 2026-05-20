import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ITINERARY } from '../data/itinerary';
import { ItineraryDay } from '../components/itinerary/ItineraryDay';
import { cn } from '../lib/utils';
import { ChevronRight } from 'lucide-react';

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

  const filteredItinerary = selectedDay === 'all'
    ? ITINERARY
    : ITINERARY.filter(day => day.day === selectedDay);

  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-12 text-left">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2 text-left"
      >
        <h2 className="font-heading font-black text-3xl text-primary tracking-tight">团建行程列表</h2>
        <p className="text-on-surface-variant font-medium text-sm leading-relaxed">
          Krabi & Koh Lanta Excellence Trip
        </p>
      </motion.div>

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
        <div className="flex gap-2.5 overflow-x-auto pb-2 snap-x scrollbar-none scroll-smooth">
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

          {CALENDAR_CARDS.map(card => (
            <button
              key={card.day}
              onClick={() => setSelectedDay(card.day)}
              className={cn(
                "snap-center shrink-0 w-[114px] p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300",
                selectedDay === card.day
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20 scale-102"
                  : "bg-white border-outline-variant/20 text-on-surface hover:bg-surface-container-high hover:border-outline-variant"
              )}
            >
              <div className="space-y-0.5">
                <div className="flex justify-between items-baseline gap-1">
                  <span className={cn(
                    "text-xs font-black tracking-tight",
                    selectedDay === card.day ? "text-white" : "text-primary"
                  )}>
                    {card.date}
                  </span>
                  <span className={cn(
                    "text-[8px] font-bold opacity-60",
                    selectedDay === card.day ? "text-white/80" : "text-on-surface-variant"
                  )}>
                    {card.weekday}
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
          ))}
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
