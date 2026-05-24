import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sun, CloudRain, Cloud, CloudLightning, Droplets, Wind, Eye, CheckCircle2, AlertTriangle, Droplet, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
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

type WeatherTheme = {
  background: string;
  overlay: string;
  accent: string;
};

type City = 'krabi' | 'lanta';

const WEATHER_THEME: Record<'sunny' | 'cloudy' | 'rainy' | 'night' | 'default', WeatherTheme> = {
  sunny: {
    background: 'radial-gradient(circle at 18% 12%, rgba(253, 224, 71, 0.45), transparent 30%), linear-gradient(135deg, #075985 0%, #0284c7 45%, #f59e0b 100%)',
    overlay: 'linear-gradient(180deg, rgba(8, 47, 73, 0.15), rgba(12, 74, 110, 0.58))',
    accent: '#fde047',
  },
  cloudy: {
    background: 'radial-gradient(circle at 20% 8%, rgba(226, 232, 240, 0.38), transparent 34%), linear-gradient(135deg, #334155 0%, #64748b 48%, #0f766e 100%)',
    overlay: 'linear-gradient(180deg, rgba(15, 23, 42, 0.28), rgba(15, 23, 42, 0.68))',
    accent: '#cbd5e1',
  },
  rainy: {
    background: 'radial-gradient(circle at 80% 8%, rgba(125, 211, 252, 0.22), transparent 30%), linear-gradient(135deg, #0f172a 0%, #1e3a5f 48%, #334155 100%)',
    overlay: 'linear-gradient(180deg, rgba(2, 6, 23, 0.32), rgba(2, 6, 23, 0.78))',
    accent: '#38bdf8',
  },
  night: {
    background: 'radial-gradient(circle at 22% 12%, rgba(168, 85, 247, 0.28), transparent 30%), linear-gradient(135deg, #020617 0%, #172554 52%, #581c87 100%)',
    overlay: 'linear-gradient(180deg, rgba(2, 6, 23, 0.38), rgba(2, 6, 23, 0.82))',
    accent: '#a78bfa',
  },
  default: {
    background: 'radial-gradient(circle at 20% 10%, rgba(125, 211, 252, 0.35), transparent 32%), linear-gradient(135deg, #0c4a6e 0%, #0369a1 48%, #1e3a8a 100%)',
    overlay: 'linear-gradient(180deg, rgba(8, 47, 73, 0.22), rgba(15, 23, 42, 0.68))',
    accent: '#38bdf8',
  },
};

function getBangkokHour(): number {
  try {
    const hour = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Bangkok',
      hour: '2-digit',
      hour12: false,
    }).format(new Date());
    return Number(hour);
  } catch {
    return 12;
  }
}

function getWeatherTheme(weather: WeatherInfo): WeatherTheme {
  const extra = weather as WeatherInfo & { weatherCode?: number; isDay?: boolean };
  const weatherCode = extra.weatherCode;
  const hour = getBangkokHour();
  const isNight = extra.isDay === false || (extra.isDay === undefined && (hour < 6 || hour >= 18));

  if (isNight) {
    return WEATHER_THEME.night;
  }

  if (typeof weatherCode === 'number') {
    if ([95, 96, 99].includes(weatherCode) || (weatherCode >= 51 && weatherCode <= 82)) {
      return WEATHER_THEME.rainy;
    }
    if ([1, 2, 3, 45, 48].includes(weatherCode)) {
      return WEATHER_THEME.cloudy;
    }
    if (weatherCode === 0) {
      return WEATHER_THEME.sunny;
    }
  }

  const icon = weather.forecast?.[0]?.icon;
  if (icon === 'CloudRain' || icon === 'CloudLightning') {
    return WEATHER_THEME.rainy;
  }
  if (icon === 'Cloud') {
    return WEATHER_THEME.cloudy;
  }
  if (icon === 'Sun') {
    return WEATHER_THEME.sunny;
  }

  return WEATHER_THEME.default;
}

function getFallbackTimeString(): string {
  try {
    return new Date().toISOString().slice(0, 16).replace('T', ' ');
  } catch {
    return "2026-05-21 09:00";
  }
}

function getFallbackWeather(city: City): WeatherInfo {
  const base = city === 'krabi' ? MOCK_WEATHER_KRABI : MOCK_WEATHER_LANTA;
  return { ...base, lastUpdated: getFallbackTimeString(), source: 'fallback' };
}

function getFallbackTide(city: City): TideData {
  const base = city === 'krabi' ? MOCK_TIDE_KRABI : MOCK_TIDE_LANTA;
  return { ...base, lastUpdated: getFallbackTimeString(), source: 'fallback' };
}

export default function Weather() {
  const [activeIndex, setActiveIndex] = useState(0); // 0 = Krabi, 1 = Koh Lanta
  const [krabiWeather, setKrabiWeather] = useState<WeatherInfo | null>(null);
  const [lantaWeather, setLantaWeather] = useState<WeatherInfo | null>(null);
  const [krabiTide, setKrabiTide] = useState<TideData | null>(null);
  const [lantaTide, setLantaTide] = useState<TideData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updateTime, setUpdateTime] = useState<string>('');
  const didMountCityRefresh = useRef(false);

  async function loadCityRealtimeData(city: City, refresh = false) {
    const [weatherResult, tideResult] = await Promise.allSettled([
      getWeather(city, { refresh }),
      getTides(city, { refresh }),
    ]);
    const weather = weatherResult.status === 'fulfilled' ? weatherResult.value : getFallbackWeather(city);
    const tide = tideResult.status === 'fulfilled' ? tideResult.value : getFallbackTide(city);

    if (city === 'krabi') {
      setKrabiWeather(weather);
      setKrabiTide(tide);
    } else {
      setLantaWeather(weather);
      setLantaTide(tide);
    }

    setUpdateTime(weather.lastUpdated || tide.lastUpdated || getFallbackTimeString());
    return { weather, tide };
  }

  useEffect(() => {
    async function loadData() {
      await Promise.all([
        loadCityRealtimeData('krabi'),
        loadCityRealtimeData('lanta'),
      ]);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!didMountCityRefresh.current) {
      didMountCityRefresh.current = true;
      return;
    }

    const city: City = activeIndex === 0 ? 'krabi' : 'lanta';
    refreshRealtimeData(city);
  }, [activeIndex]);

  async function refreshRealtimeData(cityOverride?: City) {
    if (isRefreshing) {
      return;
    }

    const city: City = cityOverride || (activeIndex === 0 ? 'krabi' : 'lanta');
    setIsRefreshing(true);

    try {
      await loadCityRealtimeData(city, true);
    } catch (err) {
      console.error("Failed to refresh realtime weather and tides:", err);
      if (city === 'krabi') {
        setKrabiWeather(getFallbackWeather(city));
        setKrabiTide(getFallbackTide(city));
      } else {
        setLantaWeather(getFallbackWeather(city));
        setLantaTide(getFallbackTide(city));
      }
    } finally {
      setIsRefreshing(false);
    }
  }

  if (!krabiWeather || !lantaWeather || !krabiTide || !lantaTide) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white font-bold bg-gradient-to-br from-sky-950 via-cyan-900 to-blue-950 rounded-[2rem] shadow-2xl">
        加载天气和潮汐数据中...
      </div>
    );
  }

  const activeWeather = activeIndex === 0 ? krabiWeather : lantaWeather;
  const activeTide = activeIndex === 0 ? krabiTide : lantaTide;
  const weatherTheme = getWeatherTheme(activeWeather);
  const displayUpdateTime = activeWeather.lastUpdated || activeTide.lastUpdated || updateTime;

  return (
    <div className="relative z-0 min-h-screen space-y-6 pb-12 overflow-x-hidden text-left text-white">
      {/* Dynamic weather background */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: weatherTheme.background }}>
        <img 
          src={WEATHER_HEADER_BG} 
          alt="Weather BG" 
          className="absolute inset-0 w-full h-full object-cover blur-[80px] brightness-[0.8] opacity-25 mix-blend-overlay scale-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0" style={{ background: weatherTheme.overlay }} />
      </div>

      <header className="relative z-10 space-y-4 px-4 pt-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="bg-white/12 text-white border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase mb-1 inline-block shadow-sm">
            WEATHER & TIDES
          </span>
        </motion.div>
        <h2 className="font-heading font-black text-4xl text-white tracking-tight">天气与潮汐</h2>
        <p className="text-white/85 max-w-2xl font-medium text-sm leading-relaxed">
          实时监测甲米及兰塔岛的海岛天气和海洋潮汐。合理规划赶海、户外出行与浮潜嬉水，时刻保障人身安全。
        </p>

        {/* Update Time & Refresh */}
        <div className="flex flex-col gap-2.5 pt-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {displayUpdateTime && (
              <span className="text-white/70 text-xs font-medium">
                更新时间：{displayUpdateTime} (泰国时间)
              </span>
            )}
            <button
              type="button"
              onClick={() => refreshRealtimeData()}
              disabled={isRefreshing}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3.5 py-1.5 text-[11px] font-extrabold text-white shadow-sm backdrop-blur-md transition-all",
                isRefreshing ? "cursor-wait opacity-70" : "cursor-pointer hover:bg-white/20 active:scale-95"
              )}
            >
              <RefreshCw size={13} className={cn(isRefreshing && "animate-spin")} />
              {isRefreshing ? "正在刷新实时数据..." : "刷新实时数据"}
            </button>
          </div>
          
          <p className="text-white/60 text-[11px] leading-relaxed max-w-xl">
            * 提示：天气、海况与潮汐信息仅供出行参考，请以当地官方通知、酒店前台、船公司和现场情况为准。
          </p>
        </div>
      </header>

      {/* City Switch Tab */}
      <div className="relative z-10 flex justify-center pt-6 px-4">
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
      <div className="relative z-10 w-full text-left">
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
      <div className="relative z-10 flex justify-center gap-1.5 pt-4">
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

      <div className="relative z-10 text-center font-bold text-white/60 text-[11px] uppercase tracking-[0.2em] pointer-events-none select-none">
        ← 左右滑动或点击顶部标签切换两地天气和潮汐 →
      </div>
    </div>
  );
}
