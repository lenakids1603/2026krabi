import { motion } from 'motion/react';
import { Plane, Hotel, Map, Phone, Calendar, ArrowRight, Navigation, MapPin, ExternalLink, ShieldCheck, HeartPulse } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function TravelInfo() {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FlightCard type="去程 / Outbound" flight="CZ3063" date="2026-06-28" from="广州 (CAN)" to="甲米 (KBV)" departure="14:20" arrival="17:00" duration="3h 40m" color="border-primary" />
          <FlightCard type="回程 / Inbound" flight="CZ3064" date="2026-07-08" from="甲米 (KBV)" to="广州 (CAN)" departure="18:10" arrival="23:00" duration="3h 50m" color="border-secondary" />
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

      {/* Emergency Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-tertiary-container/10 p-8 rounded-[2.5rem] border border-tertiary-container/30 shadow-[0px_4px_30px_rgba(255,184,119,0.1)] relative overflow-hidden group"
      >
        <div className="absolute -top-10 -right-10 text-tertiary/10 rotate-12 group-hover:rotate-0 transition-all duration-700">
            <HeartPulse size={200} />
        </div>
        <div className="relative z-10">
            <h3 className="font-heading font-bold text-2xl text-tertiary mb-6 flex items-center gap-3">
                <ShieldCheck size={32} /> 紧急联络方式
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContactItem label="行政部/领队 (Jack)" phone="+86 138-0000-0000" />
                <ContactItem label="当地导游 (Malee)" phone="+66 (0) 75-123-456" />
            </div>
        </div>
      </motion.section>
    </div>
  );
}

function FlightCard({ type, flight, date, from, to, departure, arrival, duration, color }: any) {
  return (
    <div className={cn("bg-white p-8 rounded-[2rem] shadow-xl border-l-[12px] flex flex-col group hover:shadow-2xl transition-all duration-500", color)}>
      <div className="flex justify-between items-start mb-10">
        <div>
          <span className="bg-surface-container opacity-90 px-4 py-1.5 rounded-full text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border border-outline-variant/30">{type}</span>
          <p className="font-heading font-bold text-2xl mt-4 tracking-tight group-hover:text-primary transition-colors">{flight}</p>
        </div>
        <p className="text-on-surface-variant text-sm font-bold opacity-60 flex items-center gap-2">
            <Calendar size={16} /> {date}
        </p>
      </div>
      <div className="flex justify-between items-center relative py-4">
        <div className="text-left z-10">
          <p className="font-heading font-bold text-3xl text-on-surface mb-1">{departure}</p>
          <p className="font-sans font-bold text-xs text-on-surface-variant opacity-60 uppercase tracking-widest">{from}</p>
        </div>
        
        <div className="flex-grow flex flex-col items-center px-6 relative">
          <span className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mb-3 bg-white px-3 relative z-10">{duration}</span>
          <div className="w-full h-0.5 bg-outline-variant/30 absolute top-[2.4rem] left-0" />
          <div className="p-2 bg-white rounded-full relative z-10 border border-outline-variant/30 shadow-md group-hover:scale-125 transition-all duration-500">
             <Plane size={20} className={cn("rotate-90 fill-current", color.replace('border-', 'text-'))} />
          </div>
        </div>
        
        <div className="text-right z-10">
          <p className="font-heading font-bold text-3xl text-on-surface mb-1">{arrival}</p>
          <p className="font-sans font-bold text-xs text-on-surface-variant opacity-60 uppercase tracking-widest">{to}</p>
        </div>
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
