import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Plane, Hotel, Map, Phone, Calendar, ArrowRight, Navigation, MapPin, ExternalLink, ShieldCheck, HeartPulse, Sparkles, Globe } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const CHANGI_IMAGES = [
  "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559599141-3816a0b7da11?q=80&w=2070&auto=format&fit=crop"
];

export default function TravelInfo() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % CHANGI_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-10 pb-12 overflow-x-hidden">
      <header className="space-y-3">
        <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-heading font-bold text-3xl text-primary tracking-tight">航班与酒店信息</motion.h2>
        <p className="text-on-surface-variant font-medium text-sm leading-relaxed max-w-lg opacity-90">请核对您的出行时间并提前在线值机。酒店入住时需出示护照。</p>
      </header>

      {/* Flight Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
          <div className="p-2 bg-tertiary/10 rounded-xl text-tertiary">
            <Plane size={24} className="rotate-45" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-primary tracking-tight">往返航班</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FlightCard 
            type="去程 / Outbound"
            route="杭州 (HGH) — 甲米 (KBV)"
            totalDuration="13h 50m"
            color="border-primary"
            segments={[
              {
                flight: "TR189",
                airline: "酷航 Scoot",
                from: "杭州 HGH (T4)",
                to: "新加坡 SIN (T1)",
                departure: "23:00",
                arrival: "04:05 (+1)",
                date: "06-28",
                duration: "5h 05m"
              },
              {
                layover: "新加坡 (SIN) 中转 6h 55m",
              },
              {
                flight: "TR682",
                airline: "酷航 Scoot",
                from: "新加坡 SIN (T1)",
                to: "甲米 KBV",
                departure: "11:00",
                arrival: "11:50",
                date: "06-29",
                duration: "1h 50m"
              }
            ]}
          />
          <FlightCard 
            type="回程 / Inbound"
            route="甲米 (KBV) — 杭州 (HGH)"
            totalDuration="8h 20m"
            color="border-secondary"
            segments={[
              {
                flight: "TR683",
                airline: "酷航 Scoot",
                from: "甲米 KBV",
                to: "新加坡 SIN (T1)",
                departure: "12:25",
                arrival: "15:30",
                date: "07-06",
                duration: "2h 05m"
              },
              {
                layover: "新加坡 (SIN) 中转 1h 00m",
              },
              {
                flight: "TR188",
                airline: "酷航 Scoot",
                from: "新加坡 SIN (T1)",
                to: "杭州 HGH (T4)",
                departure: "16:30",
                arrival: "21:45",
                date: "07-06",
                duration: "5h 15m"
              }
            ]}
          />
        </div>
      </section>

      {/* Changi Airport Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <Sparkles size={24} />
          </div>
          <h3 className="font-heading font-bold text-2xl text-primary tracking-tight">樟宜机场中转指南</h3>
        </div>
        
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-outline-variant/20 group">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-72 md:h-auto relative overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImgIndex}
                  src={CHANGI_IMAGES[currentImgIndex]} 
                  alt={`Changi Airport ${currentImgIndex}`} 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {CHANGI_IMAGES.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-500",
                      currentImgIndex === idx ? "bg-white w-6" : "bg-white/40"
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center space-y-5">
              <h4 className="font-heading font-bold text-2xl text-on-surface">新加坡樟宜机场 (SIN)</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed font-medium">
                全球最佳机场之一，樟宜机场不仅是中转站，更是一个微缩的生态景观园。
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-bold text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary/20 flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-primary" /></div>
                  星耀樟宜 (Jewel)：绝美瀑布，必打卡地点
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary/20 flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-primary" /></div>
                  免税购物：从大牌到南洋特产应有尽有
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary/20 flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-primary" /></div>
                  放松娱乐：梦幻花园、免费电影院
                </li>
              </ul>
              <div className="pt-6 flex gap-4">
                <a 
                  href="https://www.changiairport.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:brightness-110 transition-all active:scale-95 text-xs uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
                >
                  <Globe size={18} /> 官方网站
                </a>
                <a 
                  href="https://www.changiairport.com/en/maps.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 border-2 border-primary text-primary rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95 shadow-md flex-shrink-0"
                  title="查看机场地图"
                >
                   <Navigation size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
          <div className="p-2 bg-secondary/10 rounded-xl text-secondary">
            <Hotel size={24} />
          </div>
          <h3 className="font-heading font-bold text-2xl text-primary tracking-tight">精选下榻</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <HotelCard 
            title="Krabi Resort & Spa" 
            stay="甲米主岛 2晚" 
            addr="232 Moo 2, Ao Nang, Krabi 81180, Thailand" 
            dates="Jun 28 - Jun 30" 
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuCf5IZhIi22sYCNjiVBPCIC0mTgneWJdI5_2chpp3L0nbvYwVKx0g76EqQteGLnfICQjrMoreIyvTBgaJRuxzuP1lYWjeyHTJNNhvXO0oKwfp4Cp-CDGdnFaWUDyqsbIAmmHI_ac_2t3vqPj8YqppW2fca7eoNLmj61uiC-wcNaY1RTJxhF-y9_2Xj5mm_kZjrskGAwyzTA7KLODh9FGjoiuSYB-ejadwwoDZPwfpSHDcgHzGnPFAB2SV9EfO5MM31iBnPeTu627dI"
            color="bg-primary"
          />
          <HotelCard 
            title="Pimalai Resort & Spa" 
            stay="兰塔岛 3晚" 
            addr="99 Moo 5, Ba Kantiang Bay, Koh Lanta, Krabi 81150" 
            dates="Jun 30 - Jul 03" 
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuC0kCUy6JgVvle4qZZKRxIBNIHBW48Cjal6Fp1gizkA__CKLGGEq5sgWgxGbYt5VYF2GNhC4RsvUcoSGYgdkOrQNMqFEpjeOh5nkV0-R1E0nWGDorwNBRVzM69WSdaUx28haXKMY6JAus1J1P97NuK3sWlqyhDdNOMqSxfCX1eZ7ZAeKCoxMf1Z1iU6g5ADo7LIG3l7VjHBS_E80bzwGC5okls9mrgMZng0n7P5YJbuxenomqXKcFu_D8Xkf7wEwjGVoxBh_1NzX5Y"
            color="bg-secondary"
          />
        </div>
      </section>

    </div>
  );
}

function FlightCard({ type, route, totalDuration, segments, color }: any) {
  return (
    <div className={cn("bg-white p-6 rounded-[2.5rem] shadow-xl border-l-[12px] flex flex-col group hover:shadow-2xl transition-all duration-500", color)}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="bg-surface-container opacity-90 px-4 py-1.5 rounded-full text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border border-outline-variant/30">{type}</span>
          <h4 className="font-heading font-bold text-xl mt-3 tracking-tight group-hover:text-primary transition-colors">{route}</h4>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">总时长</p>
          <p className="text-sm font-bold text-on-surface-variant">{totalDuration}</p>
        </div>
      </div>

      <div className="space-y-6 relative before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-0.5 before:bg-outline-variant/30">
        {segments.map((segment: any, idx: number) => {
          if (segment.layover) {
            return (
              <div key={idx} className="pl-10 relative py-1">
                 <div className="absolute left-[8px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-outline-variant" />
                 <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest flex items-center gap-2">
                   {segment.layover}
                 </p>
              </div>
            );
          }

          return (
            <div key={idx} className="pl-10 relative">
              {/* Dot */}
              <div className={cn("absolute left-[6px] top-0 w-3 h-3 rounded-full border-2 border-white shadow-sm z-10", color.replace('border-', 'bg-'))} />
              
              <div className="flex justify-between items-start">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-primary">{segment.flight}</span>
                    <span className="text-[10px] font-medium text-on-surface-variant/70">{segment.airline}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-lg font-heading font-bold text-on-surface">{segment.departure}</p>
                      <p className="text-[10px] font-bold text-on-surface-variant/60 truncate uppercase">{segment.from}</p>
                    </div>
                    <div>
                      <p className="text-lg font-heading font-bold text-on-surface">{segment.arrival}</p>
                      <p className="text-[10px] font-bold text-on-surface-variant/60 truncate uppercase">{segment.to}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-on-surface-variant/60 mb-2 uppercase tracking-tight"><Calendar size={10} className="inline mr-1" /> {segment.date}</p>
                   <p className="text-[10px] font-bold px-2 py-1 bg-surface-container rounded-lg text-outline">{segment.duration}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HotelCard({ title, stay, addr, dates, img, color }: any) {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500 border border-outline-variant/20 h-full">
      <div className="h-64 relative overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
        <div className="absolute top-6 left-6">
          <span className={cn("text-white px-5 py-2 rounded-2xl font-bold text-xs shadow-2xl backdrop-blur-md uppercase tracking-wider", color)}>
            {stay}
          </span>
        </div>
      </div>
      <div className="p-8 flex-grow flex flex-col">
        <h4 className="font-heading font-bold text-2xl text-on-surface mb-6 tracking-tight">{title}</h4>
        <div className="space-y-4 mb-10 flex-grow">
          <div className="flex items-start gap-4">
             <div className="p-2 bg-surface-container rounded-xl text-primary shadow-inner shrink-0"><MapPin size={20} /></div>
             <p className="font-medium text-sm text-on-surface-variant leading-relaxed opacity-90">{addr}</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="p-2 bg-surface-container rounded-xl text-primary shadow-inner shrink-0"><Calendar size={20} /></div>
             <p className="font-bold text-sm text-on-surface-variant uppercase tracking-widest">{dates}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 bg-primary text-white font-bold py-4 rounded-2xl hover:brightness-110 transition-all active:scale-95 text-xs uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-3">
            <Navigation size={18} /> 查看地图
          </button>
          <button className="w-14 h-14 border-2 border-primary text-primary rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95 shadow-md">
            <Phone size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ label, phone }: any) {
    return (
        <div className="flex items-center justify-between p-6 bg-white rounded-3xl shadow-md border border-outline-variant/30 hover:shadow-lg transition-shadow group">
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">{label}</p>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-heading font-bold text-primary group-hover:text-primary-container transition-colors text-lg tracking-tight">
                    {phone}
                </a>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Phone size={20} />
            </div>
        </div>
    );
}
