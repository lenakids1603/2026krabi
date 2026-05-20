import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sun, CloudRain, Cloud, CloudLightning, Droplets, Wind, Eye, CheckCircle2, AlertTriangle, Droplet, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { WEATHER_HEADER_BG } from '../assets/localImages';
import { getWeather, WeatherInfo } from '../api/weatherApi';
import { getTides, TideData } from '../api/tideApi';
import { StatCard } from '../components/weather/StatCard';
import { TideCard } from '../components/weather/TideCard';
import { ForecastCard } from '../components/weather/ForecastCard';
import { SafetyCard } from '../components/weather/SafetyCard';

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

  useEffect(() => {
    async function loadData() {
      const kw = await getWeather('krabi');
      const lw = await getWeather('lanta');
      const kt = await getTides('krabi');
      const lt = await getTides('lanta');

      setKrabiWeather(kw);
      setLantaWeather(lw);
      setKrabiTide(kt);
      setLantaTide(lt);
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
