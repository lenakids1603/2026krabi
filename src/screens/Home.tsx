import { motion } from 'motion/react';
import { Calendar, PlaneTakeoff, MapPin, Utensils, Waves, Camera, Info, Navigation, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '@/src/assets/images/krabi_hero_retreat_1779245216266.png';
import foodImg from '@/src/assets/images/thai_beach_dinner_1779244685299.png';

export default function Home() {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl"
        style={{ height: '420px' }}
      >
        <img 
          src={heroImg} 
          alt="Krabi Hero" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
          <span className="inline-block bg-brand-coral text-white px-4 py-1.5 rounded-full text-xs font-bold mb-4 w-fit shadow-lg uppercase tracking-widest">
            LENAKIDS 公司团建 2026
          </span>
          <h2 className="font-heading font-bold text-4xl text-white mb-3 leading-tight tracking-tight">
            欢迎开启 2026<br />甲米 & 兰塔之旅
          </h2>
          <div className="flex items-center text-white/90 gap-2 text-sm font-medium">
            <Calendar size={18} />
            6月28日 - 7月6日
          </div>
        </div>
      </motion.section>

      {/* Quick Status Widget */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-white rounded-3xl p-6 shadow-[0px_4px_20px_rgba(0,119,182,0.06)] border border-outline-variant/30 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 md:border-r border-outline-variant pr-0 md:pr-8 w-full">
            <div className="text-on-surface-variant text-[10px] uppercase font-bold tracking-[0.2em] mb-2 opacity-60">行程状态</div>
            <div className="flex items-baseline gap-2">
              <span className="text-primary font-heading font-bold text-5xl">Day 1</span>
              <span className="text-on-surface-variant text-sm font-medium">/ 9 Days</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-secondary font-semibold bg-secondary/10 px-3 py-1.5 rounded-full w-fit text-sm">
                <Waves size={16} />
                今日启程：杭州 - 甲米
            </div>
          </div>
          <div className="flex-[2] w-full">
            <div className="text-on-surface-variant text-[10px] uppercase font-bold tracking-[0.2em] mb-4 opacity-60">下一项活动</div>
            <div className="bg-surface-container-low rounded-2xl p-4 flex items-center justify-between hover:bg-surface-container-high transition-all cursor-pointer group border border-outline-variant/20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-container rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <PlaneTakeoff size={28} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-primary">团队集结 & 登机</h4>
                  <p className="text-on-surface-variant text-xs font-medium mt-0.5">23:00 · 萧山国际机场 T4</p>
                </div>
              </div>
              <ArrowRight className="text-outline-variant group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300" size={20} />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Navigation Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-bold text-2xl text-on-surface">探索行程指南</h3>
          <Link to="/more" className="text-primary text-xs font-bold flex items-center gap-1 uppercase tracking-widest hover:underline transition-all">
            查看全部 <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/itinerary" className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group shadow-lg bg-primary-container">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
            <div className="relative h-full p-8 flex flex-col justify-between text-white z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner">
                <Calendar size={32} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-3xl mb-3">团建行程</h4>
                <p className="text-white/80 text-sm leading-relaxed font-medium">从甲米落日到兰塔浮潜，9天完整日程安排</p>
              </div>
            </div>
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <ArrowRight className="text-white" size={28} />
            </div>
          </Link>

          <Link to="/travel-info"><NavCard icon={<PlaneTakeoff size={24} />} title="机酒信息" subtitle="航班号与度假村确认单" /></Link>
          <Link to="/attractions"><NavCard icon={<MapPin size={24} />} title="景点项目" subtitle="必玩项目与避坑指南" /></Link>
          <Link to="/dining"><NavCard icon={<Utensils size={24} />} title="餐饮便利" subtitle="当地美食与 7-11 推荐" /></Link>
          <Link to="/weather"><NavCard icon={<Waves size={24} />} title="天气潮汐" subtitle="实时天气与出海建议" /></Link>
          <Link to="/gallery"><NavCard icon={<Camera size={24} />} title="共享相册" subtitle="上传你的团建瞬间" isBordered /></Link>
          <Link to="/more"><NavCard icon={<Info size={24} />} title="注意事项" subtitle="签证、换汇与防晒" className="bg-tertiary-container/10 text-tertiary border-tertiary-container/30" /></Link>
        </div>
      </section>

      {/* Weather/Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-high rounded-3xl p-8 flex items-center justify-between border border-outline-variant/20 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
                <div className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest mb-1 opacity-60">当前天气 (甲米)</div>
                <div className="text-on-surface font-heading font-bold text-4xl mb-1">31°C</div>
                <div className="text-secondary text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    多云转晴 · 适宜户外
                </div>
            </div>
            <Waves size={56} className="text-tertiary/20 absolute -right-4 -bottom-4 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
        </div>
        <div className="md:col-span-2 relative h-[180px] rounded-3xl overflow-hidden group cursor-pointer shadow-sm border border-outline-variant/20">
          <img 
            src={foodImg} 
            alt="Food" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center px-10 group-hover:bg-black/40 transition-colors duration-500">
            <h4 className="text-white font-heading font-bold text-2xl tracking-tight leading-snug">
                查看甲米当地美食攻略
                <ArrowRight className="inline-block ml-2 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" size={24} />
            </h4>
          </div>
        </div>
      </section>
    </div>
  );
}

function NavCard({ icon, title, subtitle, className = "bg-white", isBordered }: any) {
  return (
    <div className={`p-6 rounded-3xl shadow-sm border border-outline-variant/20 flex flex-col hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 cursor-pointer group ${className} ${isBordered ? 'border-primary/40 bg-primary/5' : ''}`}>
      <div className="text-primary mb-4 p-2 bg-primary/5 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h4 className="font-heading font-bold text-base text-on-surface mb-2 truncate">{title}</h4>
      <p className="text-on-surface-variant text-[10px] font-medium leading-relaxed opacity-80">{subtitle}</p>
    </div>
  );
}
