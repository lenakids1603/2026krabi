import { useState } from 'react';
import { motion } from 'motion/react';
import { Sun, CloudRain, Cloud, CloudLightning, Droplets, Wind, Eye, Waves, CheckCircle2, AlertTriangle, Droplet, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { WEATHER_HEADER_BG } from '@/src/assets/localImages';

export default function Weather() {
  const [activeIndex, setActiveIndex] = useState(0); // 0 = Krabi, 1 = Koh Lanta

  // Data for Krabi
  const krabiData = {
    temp: "31°",
    condition: "晴朗",
    range: "最高 33° / 最低 27°",
    status: "适宜游玩 (绿旗)",
    stats: [
      { icon: <Sun size={20} />, label: "紫外线指数", value: "9 (极高)", sub: "需涂抹防晒", progress: 90 },
      { icon: <Droplets size={20} />, label: "湿度", value: "72%", sub: "体感较潮湿" },
      { icon: <Wind size={20} />, label: "风速", value: "12 km/h", sub: "东南偏南风" },
      { icon: <Eye size={20} />, label: "能见度", value: "15 km", sub: "晴空万里" }
    ],
    tide: {
      location: "Krabi Pier",
      current: "2.1m",
      currentLeft: "25%",
      path: "M0,80 Q50,20 100,60 T200,80 T300,30 T400,60",
      cx: "100",
      cy: "60",
      points: [
        { type: "低潮", time: "04:12", val: "1.2m" },
        { type: "高潮", time: "10:45", val: "3.4m", active: true },
        { type: "低潮", time: "17:20", val: "0.8m" },
        { type: "高潮", time: "23:55", val: "2.9m" }
      ],
      tip: "“10:00 - 15:00 期间海水平静且水位理想，是最佳的浮潜和跳岛时间。”"
    },
    forecast: [
      { day: "明天", icon: <Sun className="text-yellow-400" size={24} />, min: 26, max: 32 },
      { day: "周三", icon: <CloudRain className="text-blue-300" size={24} />, min: 25, max: 29 },
      { day: "周四", icon: <Sun className="text-yellow-400" size={24} />, min: 27, max: 33 },
      { day: "周五", icon: <Cloud className="text-white/60" size={24} />, min: 26, max: 31 },
      { day: "周六", icon: <CloudLightning className="text-blue-400" size={24} />, min: 24, max: 28 }
    ],
    safety: [
      { icon: <CheckCircle2 className="text-green-400" />, text: "目前海域悬挂“绿旗”，适宜所有水上活动。" },
      { icon: <AlertTriangle className="text-orange-400" />, text: "紫外线极强，户外请每 2 小时补涂防晒霜。" },
      { icon: <Droplet className="text-blue-400" />, text: "体感温度较高，请注意补充水分，预防中暑。" }
    ]
  };

  // Data for Koh Lanta
  const lantaData = {
    temp: "30°",
    condition: "晴间多云 / 椰风徐徐",
    range: "最高 32° / 最低 26°",
    status: "极佳浮潜 (蓝旗)",
    stats: [
      { icon: <Sun size={20} />, label: "紫外线指数", value: "10 (极高)", sub: "防晒至关重要", progress: 100 },
      { icon: <Droplets size={20} />, label: "湿度", value: "75%", sub: "凉爽海风拂面" },
      { icon: <Wind size={20} />, label: "风速", value: "18 km/h", sub: "西-西南偏西风" },
      { icon: <Eye size={20} />, label: "能见度", value: "18 km", sub: "极佳海水清透度" }
    ],
    tide: {
      location: "Saladan Pier, Lanta",
      current: "1.8m",
      currentLeft: "37.5%",
      path: "M0,60 Q50,90 150,60 T250,30 T350,50 T400,40",
      cx: "150",
      cy: "60",
      points: [
        { type: "低潮", time: "05:30", val: "0.9m" },
        { type: "高潮", time: "11:55", val: "3.2m", active: true },
        { type: "低潮", time: "18:15", val: "0.6m" },
        { type: "高潮", time: "00:40", val: "2.7m" }
      ],
      tip: "“11:00 - 16:00 期间，兰塔四周（如Rok岛、红石紫石）水域平静，适合深浅斑斓海底世界。”"
    },
    forecast: [
      { day: "明天", icon: <Sun className="text-yellow-400" size={24} />, min: 25, max: 31 },
      { day: "周三", icon: <Cloud className="text-white/60" size={24} />, min: 26, max: 30 },
      { day: "周四", icon: <Sun className="text-yellow-400" size={24} />, min: 26, max: 32 },
      { day: "周五", icon: <Sun className="text-yellow-400" size={24} />, min: 27, max: 33 },
      { day: "周六", icon: <CloudRain className="text-blue-300" size={24} />, min: 25, max: 29 }
    ],
    safety: [
      { icon: <CheckCircle2 className="text-emerald-400" />, text: "沙滩状况优良，水流清缓，适宜浮潜跳岛。" },
      { icon: <AlertTriangle className="text-orange-400" />, text: "注意外海离岸流，进行浮潜等水上项目必须穿着救生衣。" },
      { icon: <Droplet className="text-blue-400" />, text: "海岛日照强烈多风，游玩时请常备充足饮用水防虚脱。" }
    ]
  };

  return (
    <div className="space-y-6 pb-12 overflow-x-hidden relative">
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
              "px-6 py-2 rounded-full text-sm font-bold transition-all relative z-10",
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
              "px-6 py-2 rounded-full text-sm font-bold transition-all relative z-10",
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
      <div className="relative w-full">
        {/* Left/Right Click Nav Arrows on margins for desktop usability */}
        <div className="absolute inset-y-12 left-2 right-2 pointer-events-none z-20 hidden sm:flex justify-between items-center h-48">
          <button
            onClick={() => setActiveIndex(0)}
            disabled={activeIndex === 0}
            className={cn(
              "w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center pointer-events-auto transition-all",
              activeIndex === 0 ? "opacity-0 cursor-default" : "opacity-100 hover:bg-black/50 active:scale-90"
            )}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setActiveIndex(1)}
            disabled={activeIndex === 1}
            className={cn(
              "w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center pointer-events-auto transition-all",
              activeIndex === 1 ? "opacity-0 cursor-default" : "opacity-100 hover:bg-black/50 active:scale-90"
            )}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <motion.div
          animate={{ x: activeIndex === 0 ? "0%" : "-50%" }}
          transition={{ type: "spring", damping: 24, stiffness: 140 }}
          className="flex w-[200%] select-none"
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
              
              <h1 className="text-[100px] font-thin leading-none my-2 drop-shadow-2xl">{krabiData.temp}</h1>
              <p className="font-heading font-bold text-2xl opacity-90 drop-shadow-lg">{krabiData.condition}</p>
              <p className="font-sans font-bold text-sm mt-1 opacity-85 tracking-wide uppercase drop-shadow-sm">{krabiData.range}</p>
              
              <div className="mt-6 flex items-center gap-3 apple-glass px-6 py-2.5 rounded-full border border-white/20 shadow-xl">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
                <span className="font-sans font-bold text-[11px] uppercase tracking-[0.15em]">{krabiData.status}</span>
              </div>
            </header>

            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {krabiData.stats.map((stat, idx) => (
                <StatCard key={idx} icon={stat.icon} label={stat.label} value={stat.value} sub={stat.sub} progress={stat.progress} />
              ))}
            </section>

            {/* Tide */}
            <TideCard tide={krabiData.tide} />

            {/* 5-Day Forecast */}
            <ForecastCard forecast={krabiData.forecast} />

            {/* Safety Tips */}
            <SafetyCard safety={krabiData.safety} />
          </div>

          {/* Koh Lanta Page */}
          <div className="w-[50%] flex-shrink-0 px-4 space-y-8">
            <header className="flex flex-col items-center text-center text-white py-4 relative">
              <span className="font-sans font-bold text-xs uppercase tracking-[0.2em] opacity-60 mb-2">当前城市</span>
              <h2 className="font-heading font-extrabold text-3xl tracking-wide uppercase drop-shadow-lg mb-2">兰塔 / Koh Lanta</h2>
              
              <h1 className="text-[100px] font-thin leading-none my-2 drop-shadow-2xl">{lantaData.temp}</h1>
              <p className="font-heading font-bold text-2xl opacity-90 drop-shadow-lg">{lantaData.condition}</p>
              <p className="font-sans font-bold text-sm mt-1 opacity-85 tracking-wide uppercase drop-shadow-sm">{lantaData.range}</p>
              
              <div className="mt-6 flex items-center gap-3 apple-glass px-6 py-2.5 rounded-full border border-white/20 shadow-xl">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
                <span className="font-sans font-bold text-[11px] uppercase tracking-[0.15em]">{lantaData.status}</span>
              </div>
            </header>

            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {lantaData.stats.map((stat, idx) => (
                <StatCard key={idx} icon={stat.icon} label={stat.label} value={stat.value} sub={stat.sub} progress={stat.progress} />
              ))}
            </section>

            {/* Tide */}
            <TideCard tide={lantaData.tide} />

            {/* 5-Day Forecast */}
            <ForecastCard forecast={lantaData.forecast} />

            {/* Safety Tips */}
            <SafetyCard safety={lantaData.safety} />
          </div>
        </motion.div>
      </div>

      {/* Bottom Dots Indicator */}
      <div className="flex justify-center gap-1.5 pt-4">
        <button
          onClick={() => setActiveIndex(0)}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            activeIndex === 0 ? "bg-white w-5" : "bg-white/40 hover:bg-white/60"
          )}
          title="甲米"
        />
        <button
          onClick={() => setActiveIndex(1)}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
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

function StatCard({ icon, label, value, sub, progress }: any) {
  return (
    <div className="apple-glass px-5 py-5 rounded-[2rem] flex flex-col justify-between h-36 text-white shadow-xl hover:bg-white/20 transition-colors">
      <div className="flex items-center gap-2 opacity-60">
        {icon}
        <span className="text-[9px] uppercase font-bold tracking-widest">{label}</span>
      </div>
      <div>
        <p className="font-heading font-extrabold text-lg mb-0.5 truncate">{value}</p>
        <p className="text-[10px] opacity-65 font-semibold tracking-wide truncate">{sub}</p>
        {progress !== undefined && (
          <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-red-500 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}

function TideCard({ tide }: any) {
  return (
    <section className="apple-glass rounded-[2rem] overflow-hidden text-white shadow-2xl">
      <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <h3 className="font-sans font-bold text-xs uppercase tracking-widest opacity-80 flex items-center gap-3">
          <Waves size={20} className="text-blue-300" /> 潮汐时刻 ({tide.location})
        </h3>
      </div>
      <div className="p-6">
        <div className="relative h-32 w-full mb-6 pt-4">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
            <path d={tide.path} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
            <circle cx={tide.cx} cy={tide.cy} fill="white" r="6" className="animate-pulse shadow-glow" />
          </svg>
          <div 
            className="absolute top-0 bg-white text-primary px-3 py-1 rounded-full text-[10px] font-bold shadow-2xl tracking-widest"
            style={{ left: tide.currentLeft, transform: 'translateX(-50%)' }}
          >
            当前 {tide.current}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          {tide.points.map((pt: any, idx: number) => (
            <TidePoint key={idx} type={pt.type} time={pt.time} val={pt.val} active={pt.active} />
          ))}
        </div>
        <p className="mt-6 text-xs opacity-90 leading-relaxed italic border-l-4 border-sky-400 pl-4 bg-white/5 p-3 rounded-xl font-medium">
          {tide.tip}
        </p>
      </div>
    </section>
  );
}

function TidePoint({ type, time, val, active }: any) {
  return (
    <div className={cn(
      "apple-glass-dark py-3 px-2 rounded-xl transition-all duration-500",
      active ? "border border-white/40 bg-white/20 scale-105 shadow-glow" : "opacity-60"
    )}>
      <p className="text-[8px] font-bold uppercase tracking-widest mb-0.5">{type}</p>
      <p className="font-heading font-bold text-sm mb-0.5 tracking-tight">{time}</p>
      <p className="text-[9px] font-bold opacity-60">{val}</p>
    </div>
  );
}

function ForecastCard({ forecast }: any) {
  return (
    <section className="apple-glass rounded-[2rem] overflow-hidden text-white shadow-2xl">
      <div className="px-6 py-4 border-b border-white/10 bg-white/5">
        <h3 className="font-sans font-bold text-xs uppercase tracking-widest opacity-80 flex items-center gap-3">
          <Calendar size={20} className="text-yellow-300" /> 未来 5 日预测
        </h3>
      </div>
      <div className="divide-y divide-white/10 font-sans">
        {forecast.map((fc: any, idx: number) => (
          <ForecastRow key={idx} day={fc.day} icon={fc.icon} min={fc.min} max={fc.max} />
        ))}
      </div>
    </section>
  );
}

function ForecastRow({ day, icon, min, max }: any) {
  return (
    <div className="flex items-center justify-between p-4 px-6">
      <p className="w-12 font-bold text-sm tracking-wide text-white/95">{day}</p>
      <div className="drop-shadow-lg shrink-0">{icon}</div>
      <div className="flex items-center gap-3 w-32 justify-end">
        <span className="text-white/40 font-bold text-xs w-8 text-right">{min}°</span>
        <div className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden hidden xs:block">
          <div className="absolute left-[20%] right-[30%] h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
        </div>
        <span className="font-bold text-sm w-8 text-right">{max}°</span>
      </div>
    </div>
  );
}

function SafetyCard({ safety }: any) {
  return (
    <section className="apple-glass-dark text-white p-6 rounded-[2rem] border border-white/20 shadow-2xl space-y-5">
      <h3 className="font-heading font-extrabold text-xl tracking-tight leading-none">安全建议 (Safety Tips)</h3>
      <div className="space-y-4 font-bold text-xs opacity-90 leading-relaxed">
        {safety.map((item: any, idx: number) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="p-0.5 shrink-0 mt-0.5">{item.icon}</div>
            <p className="tracking-tight">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
