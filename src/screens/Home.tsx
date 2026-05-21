import { motion } from 'motion/react';
import { Calendar, PlaneTakeoff, Map, Compass, Waves, Camera, Info, ArrowRight, Users, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavCard } from '../components/home/NavCard';
import heroImg from '../assets/images/krabi_hero_retreat_1779245216266.png';
import foodImg from '../assets/images/thai_beach_dinner_1779244685299.png';

export default function Home() {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full h-[65vh] min-h-[500px] rounded-3xl overflow-hidden shadow-2xl"
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
          <h2 className="font-heading font-bold text-4xl text-white mb-3 leading-tight tracking-tight text-left">
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
          <div className="flex-1 md:border-r border-outline-variant pr-0 md:pr-8 w-full block">
            <div className="text-on-surface-variant text-[10px] uppercase font-bold tracking-[0.2em] mb-2 opacity-60 text-left">行程状态</div>
            <div className="flex items-baseline gap-2">
              <span className="text-primary font-heading font-bold text-5xl">Day 1</span>
              <span className="text-on-surface-variant text-sm font-medium">/ 10 Days</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-secondary font-semibold bg-secondary/10 px-3 py-1.5 rounded-full w-fit text-sm">
                <Waves size={16} />
                今日启程：杭州 - 甲米
            </div>
          </div>
          <div className="flex-[2] w-full">
            <div className="text-on-surface-variant text-[10px] uppercase font-bold tracking-[0.2em] mb-4 opacity-60 text-left">下一项活动</div>
            <div className="bg-surface-container-low rounded-2xl p-4 flex items-center justify-between hover:bg-surface-container-high transition-all cursor-pointer group border border-outline-variant/20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-container rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <PlaneTakeoff size={28} />
                </div>
                <div className="text-left">
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
          <div className="text-left space-y-1">
            <h3 className="font-heading font-black text-2xl text-slate-800 tracking-tight">探索行程指南</h3>
            <p className="text-xs text-slate-400 font-medium">全方位工具箱为您在泰国的每分每秒保驾护航</p>
          </div>
          <Link to="/more" className="text-[#0077B6] text-xs font-extrabold flex items-center gap-1 uppercase tracking-widest hover:-translate-x-1 duration-300 transition-transform">
            详情指南 <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Main Hero Card: 团建行程 */}
          <Link to="/itinerary" className="col-span-2 row-span-2 relative rounded-[32px] overflow-hidden group shadow-md hover:shadow-[0px_20px_40px_rgba(0,81,110,0.15)] transition-all duration-500 bg-gradient-to-br from-[#00516E] via-[#0077B6] to-[#1D5E6B] p-8 flex flex-col justify-between hover:-translate-y-1.5 cursor-pointer">
            {/* Ambient Map Grid Backplate */}
            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10 transition-colors duration-500" />
            
            <div className="relative h-full flex flex-col justify-between text-white z-10 text-left">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ring-1 ring-white/20">
                <Calendar size={28} strokeWidth={2} />
              </div>
              
              <div>
                <span className="bg-white/15 backdrop-blur-md text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full mb-3 inline-block uppercase tracking-widest ring-1 ring-white/10">
                  CRUISE MAP · 10 DAYS
                </span>
                <h4 className="font-heading font-black text-3xl mb-2.5 tracking-tight">团建日程安排</h4>
                <p className="text-white/80 text-[11px] leading-relaxed font-semibold max-w-sm">从甲米落日、海边落日晚霞，到兰塔岛最深处的秘密泻湖，在这里探索 10 日完整官方日程。</p>
              </div>
            </div>
            
            {/* Visual Action Indicator */}
            <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-[#00516E] flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-300">
              <ArrowRight size={18} strokeWidth={2.5} />
            </div>
          </Link>

          {/* Bento Sub-Cards with Tailored Themes & Delays */}
          <Link to="/travel-info">
            <NavCard 
              icon={<PlaneTakeoff size={22} />} 
              title="机酒信息" 
              subtitle="航班号、座位与度假村凭证" 
              theme="blue"
              badge="必备"
              badgeType="new"
              delay={0.05}
            />
          </Link>

          <Link to="/attractions">
            <NavCard 
              icon={<Map size={22} />} 
              title="活动安排" 
              subtitle="官方游玩路线与岛屿推荐" 
              theme="teal"
              delay={0.1}
            />
          </Link>

          <Link to="/dining">
            <NavCard 
              icon={<Search size={22} />} 
              title="周边查询" 
              subtitle="精选餐馆、便利店实时导航" 
              theme="indigo"
              delay={0.15}
            />
          </Link>

          <Link to="/weather">
            <NavCard 
              icon={<Waves size={22} />} 
              title="天气和潮汐" 
              subtitle="每日出海安全建议与潮水位" 
              theme="cyan"
              badge="实时"
              badgeType="live"
              delay={0.2}
            />
          </Link>

          <Link to="/gallery">
            <NavCard 
              icon={<Camera size={22} />} 
              title="共享相册" 
              subtitle="团建高清大片、合照轻松传" 
              theme="amber"
              badge="共享中"
              delay={0.25}
            />
          </Link>

          <Link to="/checkin-spots" className="relative group/checkin">
            <NavCard 
              icon={<Compass size={22} />} 
              title="打卡点分享" 
              subtitle="精选落日、摄影位与咖啡馆" 
              theme="coral"
              badge="HOT"
              badgeType="hot"
              isBordered
              delay={0.3}
            />
          </Link>

          <Link to="/directory">
            <NavCard 
              icon={<Users size={22} />} 
              title="临时号码簿" 
              subtitle="领队、随队电话与泰方求助" 
              theme="emerald"
              delay={0.35}
            />
          </Link>

          <Link to="/more">
            <NavCard 
              icon={<Info size={22} />} 
              title="注意事项" 
              subtitle="防晒指南、换汇攻略与签证" 
              theme="slate"
              delay={0.4}
            />
          </Link>
        </div>
      </section>

      {/* Weather/Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-high rounded-3xl p-8 flex items-center justify-between border border-outline-variant/20 shadow-sm relative overflow-hidden group">
            <div className="relative z-10 text-left">
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
            <h4 className="text-white font-heading font-bold text-2xl tracking-tight leading-snug text-left">
                查看甲米当地美食攻略
                <ArrowRight className="inline-block ml-2 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" size={24} />
            </h4>
          </div>
        </div>
      </section>
    </div>
  );
}
