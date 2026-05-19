import { motion } from 'motion/react';
import { Sun, CloudRain, Cloud, CloudLightning, Thermometer, Droplets, Wind, Eye, Waves, Navigation, ShieldAlert, CheckCircle2, AlertTriangle, Droplet, Calendar } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Weather() {
  return (
    <div className="space-y-10 pb-12 overflow-x-hidden relative">
      {/* Background with blurred Image */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7oVhIgDGYQXKQ_3yO390Yj50pILzeA7O3IRPWe4Q4YaMbv7M_ObpyqAruo8pVjf_Lbh0qPyrBqnRsV7HWgG_LHdw9kmaiwnnzDFlANCE9FT4G0ClXFAeEuRRMik5WHCqZqeQcjetnbteazX5UXdL9L1cTZ13XwXyR1w6cDAQzT0M7B5p_9crAy1HUv4st1XtjEo3oRwCcBjt_VWkCnIZOzhFkdjM-3al51wsLtTgVioZT8LJnDzu4Zdt_-MMWNL0wB3Craon5x9k" 
            alt="Weather BG" 
            className="w-full h-full object-cover blur-[80px] brightness-75 scale-125"
          />
          <div className="absolute inset-0 bg-blue-900/10" />
      </div>

      <header className="flex flex-col items-center text-center text-white py-12">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading font-bold text-2xl tracking-widest uppercase mb-4 drop-shadow-lg">甲米</motion.p>
        <motion.h2 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="text-[120px] font-thin leading-none my-4 drop-shadow-2xl"
        >
            31°
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-heading font-bold text-3xl opacity-90 drop-shadow-lg">晴朗</motion.p>
        <p className="font-sans font-bold text-lg mt-2 opacity-80 tracking-wide uppercase drop-shadow-md">最高 33° / 最低 27°</p>
        
        <div className="mt-10 flex items-center gap-3 apple-glass-dark px-8 py-3 rounded-full border border-white/20 shadow-2xl">
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
          <span className="font-sans font-bold text-xs uppercase tracking-[0.2em]">适宜游玩 (绿旗)</span>
        </div>
      </header>

      {/* Grid Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Sun size={20} />} label="紫外线指数" value="9 (极高)" sub="需涂抹防晒" progress={90} />
        <StatCard icon={<Droplets size={20} />} label="湿度" value="72%" sub="体感较潮湿" />
        <StatCard icon={<Wind size={20} />} label="风速" value="12 km/h" sub="东南偏南风" />
        <StatCard icon={<Eye size={20} />} label="能见度" value="15 km" sub="晴空万里" />
      </section>

      {/* Tide Section */}
      <section className="apple-glass rounded-[2rem] overflow-hidden text-white shadow-2xl">
        <div className="px-6 py-4 border-b border-white/10 glass-effect bg-white/5 flex items-center justify-between">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest opacity-80 flex items-center gap-3">
                <Waves size={20} className="text-blue-300" /> 潮汐时刻 (Krabi Pier)
            </h3>
        </div>
        <div className="p-8">
            <div className="relative h-48 w-full mb-8 pt-8">
                {/* SVG Graph Placeholder simulation */}
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                    <path d="M0,80 Q50,20 100,60 T200,80 T300,30 T400,60" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="100" cy="60" fill="white" r="6" className="animate-pulse shadow-glow" />
                </svg>
                <div className="absolute top-2 left-[25%] -translate-x-1/2 bg-white text-primary px-4 py-1.5 rounded-full text-[10px] font-bold shadow-2xl tracking-widest">
                    当前 2.1m
                </div>
            </div>
            <div className="grid grid-cols-4 gap-3 text-center">
                <TidePoint type="低潮" time="04:12" val="1.2m" />
                <TidePoint type="高潮" time="10:45" val="3.4m" active />
                <TidePoint type="低潮" time="17:20" val="0.8m" />
                <TidePoint type="高潮" time="23:55" val="2.9m" />
            </div>
            <p className="mt-10 text-[13px] opacity-90 leading-loose italic border-l-4 border-blue-400 pl-6 bg-white/5 p-4 rounded-xl font-medium">
                “10:00 - 15:00 期间海水平静且水位理想，是最佳的浮潜和跳岛时间。”
            </p>
        </div>
      </section>

      {/* 5-Day Forecast */}
      <section className="apple-glass rounded-[2rem] overflow-hidden text-white shadow-2xl">
        <div className="px-6 py-4 border-b border-white/10 glass-effect bg-white/5">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest opacity-80 flex items-center gap-3">
                <Calendar size={20} className="text-yellow-300" /> 未来 5 日预测
            </h3>
        </div>
        <div className="divide-y divide-white/10 font-sans">
            <ForecastRow day="明天" icon={<Sun className="text-yellow-400" size={24} />} min={26} max={32} />
            <ForecastRow day="周三" icon={<CloudRain className="text-blue-300" size={24} />} min={25} max={29} />
            <ForecastRow day="周四" icon={<Sun className="text-yellow-400" size={24} />} min={27} max={33} />
            <ForecastRow day="周五" icon={<Cloud className="text-white/60" size={24} />} min={26} max={31} />
            <ForecastRow day="周六" icon={<CloudLightning className="text-blue-400" size={24} />} min={24} max={28} />
        </div>
      </section>

      {/* Safety Tips */}
      <section className="apple-glass-dark text-white p-8 rounded-[2.5rem] border border-white/20 shadow-2xl space-y-6">
        <h3 className="font-heading font-bold text-2xl tracking-tight leading-none mb-2">安全建议 (Safety Tips)</h3>
        <div className="space-y-6 font-medium text-sm opacity-90">
            <SafetyItem icon={<CheckCircle2 className="text-green-400" />} text="目前海域悬挂“绿旗”，适宜所有水上活动。" />
            <SafetyItem icon={<AlertTriangle className="text-orange-400" />} text="紫外线极强，户外请每 2 小时补涂防晒霜。" />
            <SafetyItem icon={<Droplet className="text-blue-400" />} text="体感温度较高，请注意补充水分，预防中暑。" />
        </div>
        <button className="w-full bg-white text-primary py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-2xl hover:brightness-110 active:scale-95 transition-all">
            查看完整安全指南
        </button>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value, sub, progress }: any) {
  return (
    <div className="apple-glass px-6 py-6 rounded-[2rem] flex flex-col justify-between h-40 text-white shadow-xl hover:bg-white/20 transition-colors">
      <div className="flex items-center gap-2 opacity-60">
        {icon}
        <span className="text-[10px] uppercase font-bold tracking-widest">{label}</span>
      </div>
      <div>
        <p className="font-heading font-bold text-xl mb-1 truncate">{value}</p>
        <p className="text-[10px] opacity-60 font-bold uppercase tracking-wide truncate">{sub}</p>
        {progress !== undefined && (
           <div className="w-full h-1.5 bg-white/20 rounded-full mt-3 overflow-hidden">
             <div className="h-full bg-gradient-to-r from-yellow-400 to-red-500 rounded-full" style={{ width: `${progress}%` }} />
           </div>
        )}
      </div>
    </div>
  );
}

function TidePoint({ type, time, val, active }: any) {
  return (
    <div className={cn(
        "apple-glass-dark p-4 rounded-2xl transition-all duration-500",
        active ? "border border-white/50 bg-white/20 scale-105 shadow-glow" : "opacity-60"
    )}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-1">{type}</p>
        <p className="font-heading font-bold text-base mb-1 tracking-tight">{time}</p>
        <p className="text-[10px] font-bold opacity-60">{val}</p>
    </div>
  );
}

function ForecastRow({ day, icon, min, max }: any) {
    return (
        <div className="flex items-center justify-between p-6">
            <p className="w-16 font-bold text-sm tracking-wide">{day}</p>
            <div className="drop-shadow-lg">{icon}</div>
            <div className="flex items-center gap-4 w-40">
                <span className="text-white/40 font-bold text-sm">{min}°</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden">
                    <div className="absolute left-[20%] right-[30%] h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                </div>
                <span className="font-bold text-base">{max}°</span>
            </div>
        </div>
    );
}

function SafetyItem({ icon, text }: any) {
    return (
        <div className="flex items-start gap-4">
            <div className="p-1 mt-0.5 shrink-0">{icon}</div>
            <p className="leading-relaxed font-bold tracking-tight opacity-90">{text}</p>
        </div>
    );
}
