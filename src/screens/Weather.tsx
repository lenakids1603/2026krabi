import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sun, CloudRain, Cloud, CloudLightning, Droplets, Wind, Eye, CheckCircle2, AlertTriangle, Droplet, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { WEATHER_HEADER_BG } from '../assets/localImages';
import { getWeather, getTides } from '../services/api';
import { WeatherForecastResponse as WeatherInfo, TideInfo as TideData } from '../types/api';
import { StatCard } from '../components/weather/StatCard';
import { TideCard } from '../components/weather/TideCard';
import { ForecastCard } from '../components/weather/ForecastCard';
import { SafetyCard } from '../components/weather/SafetyCard';
import { MOCK_WEATHER_KRABI, MOCK_WEATHER_LANTA } from '../data/weather';
import { MOCK_TIDE_KRABI, MOCK_TIDE_LANTA } from '../data/tides';

// Utility to resolve string icon names into active Lucide JSX nodes
const resolveWeatherIcon = (name: string, size = 20, customClass?: string) => {
  switch (name) {
    case 'Sun': return <Sun size={size} className={customClass || "text-yellow-400"} />;
    case 'CloudRain': return <CloudRain size={size} className={customClass || "text-sky-300"} />;
    case 'Cloud': return <Cloud size={size} className={customClass || "text-white/60"} />;
    case 'CloudLightning': return <CloudLightning size={size} className={customClass || "text-sky-400"} />;
    case 'Droplets': return <Droplets size={size} className={customClass} />;
    case 'Wind': return <Wind size={size} className={customClass} />;
    case 'Eye': return <Eye size={size} className={customClass} />;
    case 'CheckCircle2': return <CheckCircle2 size={size} className={customClass || "text-green-400"} />;
    case 'AlertTriangle': return <AlertTriangle size={size} className={customClass || "text-orange-400"} />;
    case 'Droplet': return <Droplet size={size} className={customClass || "text-blue-400"} />;
    default: return <Sun size={size} className={customClass} />;
  }
};

export default function Weather() {
  const [activeIndex, setActiveIndex] = useState(0); // 0 = Krabi, 1 = Koh Lanta
  const [krabiWeather, setKrabiWeather] = useState<WeatherInfo | null>(null);
  const [lantaWeather, setLantaWeather] = useState<WeatherInfo | null>(null);
  const [krabiTide, setKrabiTide] = useState<TideData | null>(null);
  const [lantaTide, setLantaTide] = useState<TideData | null>(null);
  const [isApiError, setIsApiError] = useState(false);
  const [updateTime, setUpdateTime] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      let kw: WeatherInfo | null = null;
      let lw: WeatherInfo | null = null;
      let kt: TideData | null = null;
      let lt: TideData | null = null;
      let apiFailed = false;

      const fallbackTimeString = () => {
        try {
          return new Date().toISOString().slice(0, 16).replace('T', ' ');
        } catch {
          return "2026-05-21 09:00";
        }
      };

      try {
        kw = await getWeather('krabi');
      } catch (err) {
        console.error("Failed to load Krabi weather:", err);
        kw = { ...MOCK_WEATHER_KRABI, lastUpdated: fallbackTimeString(), source: 'mock' };
        apiFailed = true;
      }

      try {
        lw = await getWeather('lanta');
      } catch (err) {
        console.error("Failed to load Lanta weather:", err);
        lw = { ...MOCK_WEATHER_LANTA, lastUpdated: fallbackTimeString(), source: 'mock' };
        apiFailed = true;
      }

      try {
        kt = await getTides('krabi');
      } catch (err) {
        console.error("Failed to load Krabi tides:", err);
        kt = { ...MOCK_TIDE_KRABI, lastUpdated: fallbackTimeString(), source: 'mock' };
        apiFailed = true;
      }

      try {
        lt = await getTides('lanta');
      } catch (err) {
        console.error("Failed to load Lanta tides:", err);
        lt = { ...MOCK_TIDE_LANTA, lastUpdated: fallbackTimeString(), source: 'mock' };
        apiFailed = true;
      }

      setKrabiWeather(kw);
      setLantaWeather(lw);
      setKrabiTide(kt);
      setLantaTide(lt);
      setIsApiError(apiFailed || [kw, lw, kt, lt].some(item => item?.source === 'mock'));
      setUpdateTime(kw?.lastUpdated || fallbackTimeString());
    }
    loadData();
  }, []);

  if (!krabiWeather || !lantaWeather || !krabiTide || !lantaTide) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-white font-bold">
        加载天气和潮汐数据中...
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 overflow-x-hidden relative text-left">
      {/* Background with blurred Image */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <img 
          src={WEATHER_HEADER_BG} 
          alt="Weather BG" 
          className="w-full h-full object-cover blur-[80px] brightness-[0.7] scale-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-sky-950/20" />
      </div>

      <header className="space-y-4 px-4 pt-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="bg-white/12 text-white border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase mb-1 inline-block shadow-sm">
            WEATHER & TIDES
          </span>
        </motion.div>
        <h2 className="font-heading font-black text-4xl text-white tracking-tight">天气与潮汐</h2>
        <p className="text-white/85 max-w-2xl font-medium text-sm leading-relaxed">
          实时监测甲米及兰塔岛的海岛天气和海洋潮汐。合理规划赶海、户外出行与浮潜嬉水，时刻保障人身安全。
        </p>

        {/* Lightweight Status, Data Source & Update Time */}
        <div className="flex flex-col gap-2.5 pt-1">
          {isApiError && (
            <div className="bg-amber-500/15 border border-amber-500/30 backdrop-blur-md text-amber-200 text-xs px-3.5 py-2.5 rounded-2xl font-medium flex items-center gap-2 max-w-2xl shadow-lg">
              <span className="text-base">⚠️</span>
              <span>实时数据加载失败，已自动载入本地安全备份数据。</span>
            </div>
          )}
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="bg-white/10 text-white border border-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              当前为本地预览数据
            </span>
            {updateTime && (
              <span className="text-white/70 text-xs font-medium">
                更新时间：{updateTime} (泰国时间)
              </span>
            )}
          </div>
          
          <p className="text-white/60 text-[11px] leading-relaxed max-w-xl">
            * 提示：本页面当前渲染团队离线备份数据。后续可接入实时 OpenWeather 与 WXTide 潮汐计算通道。
          </p>
        </div>
      </header>

      {/* City Switch Tab */}
      <div className="flex justify-center pt-6 px-4">
        <div className="flex bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20 relative shadow-lg">
          <button
            onClick={() => setActiveIndex(0)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-bold transition-all relative z-10 cursor-pointer",
              activeIndex === 0 ? "text-primary font-extrabold" : "text-white/70 hover:text-white"
            )}
          >
            {activeIndex === 0 && (
              <motion.div
                layoutId="activeWeatherTab"
                className="absolute inset-0 bg-white rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            甲米 (Krabi)
          </button>
          <button
            onClick={() => setActiveIndex(1)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-bold transition-all relative z-10 cursor-pointer",
              activeIndex === 1 ? "text-primary font-extrabold" : "text-white/70 hover:text-white"
            )}
          >
            {activeIndex === 1 && (
              <motion.div
                layoutId="activeWeatherTab"
                className="absolute inset-0 bg-white rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            兰塔 (Koh Lanta)
          </button>
        </div>
      </div>

      {/* Slide Navigation Container */}
      <div className="relative w-full text-left">
        {/* Left/Right Click Nav Arrows on margins for desktop usability */}
        <div className="absolute inset-y-12 left-2 right-2 pointer-events-none z-20 hidden sm:flex justify-between items-center h-48">
          <button
            onClick={() => setActiveIndex(0)}
            disabled={activeIndex === 0}
            className={cn(
              "w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center pointer-events-auto transition-all cursor-pointer",
              activeIndex === 0 ? "opacity-0 cursor-default" : "opacity-100 hover:bg-black/50 active:scale-90"
            )}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setActiveIndex(1)}
            disabled={activeIndex === 1}
            className={cn(
              "w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center pointer-events-auto transition-all cursor-pointer",
              activeIndex === 1 ? "opacity-0 cursor-default" : "opacity-100 hover:bg-black/50 active:scale-90"
            )}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <motion.div
          animate={{ x: activeIndex === 0 ? "0%" : "-50%" }}
          transition={{ type: "spring", damping: 24, stiffness: 140 }}
          className="flex w-[200%] select-none align-start"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(e, info) => {
            const dragThreshold = 55;
            if (info.offset.x < -dragThreshold) {
              setActiveIndex(1);
            } else if (info.offset.x > dragThreshold) {
              setActiveIndex(0);
            }
          }}
        >
          {/* Krabi Page */}
          <div className="w-[50%] flex-shrink-0 px-4 space-y-8">
            <header className="flex flex-col items-center text-center text-white py-4 relative">
              <span className="font-sans font-bold text-xs uppercase tracking-[0.2em] opacity-60 mb-2">当前城市</span>
              <h2 className="font-heading font-extrabold text-3xl tracking-wide uppercase drop-shadow-lg mb-2">甲米 / Krabi</h2>
              
              <h1 className="text-[100px] font-thin leading-none my-2 drop-shadow-2xl">{krabiWeather.temp}</h1>
              <p className="font-heading font-bold text-2xl opacity-90 drop-shadow-lg">{krabiWeather.condition}</p>
              <p className="font-sans font-bold text-sm mt-1 opacity-85 tracking-wide uppercase drop-shadow-sm">{krabiWeather.range}</p>
              
              <div className="mt-6 flex items-center gap-3 apple-glass px-6 py-2.5 rounded-full border border-white/20 shadow-xl">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
                <span className="font-sans font-bold text-[11px] uppercase tracking-[0.15em]">{krabiWeather.status}</span>
              </div>
            </header>

            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {krabiWeather.stats.map((stat, idx) => (
                <StatCard 
                  key={idx} 
                  icon={resolveWeatherIcon(stat.icon, 20)} 
                  label={stat.label} 
                  value={stat.value} 
                  sub={stat.sub} 
                  progress={stat.progress} 
                />
              ))}
            </section>

            {/* Tide */}
            <TideCard tide={krabiTide} />

            {/* 5-Day Forecast */}
            <ForecastCard 
              forecast={krabiWeather.forecast.map(item => ({
                day: item.day,
                icon: resolveWeatherIcon(item.icon, 24),
                min: item.min,
                max: item.max
              }))} 
            />

            {/* Safety Tips */}
            <SafetyCard 
              safety={krabiWeather.safety.map(item => ({
                icon: resolveWeatherIcon(item.icon, 20),
                text: item.text
              }))} 
            />
          </div>

          {/* Koh Lanta Page */}
          <div className="w-[50%] flex-shrink-0 px-4 space-y-8">
            <header className="flex flex-col items-center text-center text-white py-4 relative">
              <span className="font-sans font-bold text-xs uppercase tracking-[0.2em] opacity-60 mb-2">当前城市</span>
              <h2 className="font-heading font-extrabold text-3xl tracking-wide uppercase drop-shadow-lg mb-2">兰塔 / Koh Lanta</h2>
              
              <h1 className="text-[100px] font-thin leading-none my-2 drop-shadow-2xl">{lantaWeather.temp}</h1>
              <p className="font-heading font-bold text-2xl opacity-90 drop-shadow-lg">{lantaWeather.condition}</p>
              <p className="font-sans font-bold text-sm mt-1 opacity-85 tracking-wide uppercase drop-shadow-sm">{lantaWeather.range}</p>
              
              <div className="mt-6 flex items-center gap-3 apple-glass px-6 py-2.5 rounded-full border border-white/20 shadow-xl">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
                <span className="font-sans font-bold text-[11px] uppercase tracking-[0.15em]">{lantaWeather.status}</span>
              </div>
            </header>

            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {lantaWeather.stats.map((stat, idx) => (
                <StatCard 
                  key={idx} 
                  icon={resolveWeatherIcon(stat.icon, 20)} 
                  label={stat.label} 
                  value={stat.value} 
                  sub={stat.sub} 
                  progress={stat.progress} 
                />
              ))}
            </section>

            {/* Tide */}
            <TideCard tide={lantaTide} />

            {/* 5-Day Forecast */}
            <ForecastCard 
              forecast={lantaWeather.forecast.map(item => ({
                day: item.day,
                icon: resolveWeatherIcon(item.icon, 24),
                min: item.min,
                max: item.max
              }))} 
            />

            {/* Safety Tips */}
            <SafetyCard 
              safety={lantaWeather.safety.map(item => ({
                icon: resolveWeatherIcon(item.icon, 20),
                text: item.text
              }))} 
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Dots Indicator */}
      <div className="flex justify-center gap-1.5 pt-4">
        <button
          onClick={() => setActiveIndex(0)}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
            activeIndex === 0 ? "bg-white w-5" : "bg-white/40 hover:bg-white/60"
          )}
          title="甲米"
        />
        <button
          onClick={() => setActiveIndex(1)}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
            activeIndex === 1 ? "bg-white w-5" : "bg-white/40 hover:bg-white/60"
          )}
          title="兰塔"
        />
      </div>

      <div className="text-center font-bold text-white/50 text-[11px] uppercase tracking-[0.2em] pointer-events-none select-none">
        ← 左右滑动或点击顶部标签切换两地天气和潮汐 →
      </div>
    </div>
  );
}
