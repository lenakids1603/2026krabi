import { motion } from 'motion/react';
import { RESTAURANTS } from '@/src/constants';
import { Star, MapPin, Search, Utensils, Coffee, Pizza, Navigation, ShoppingCart, Cross, Banknote, Truck, ArrowRight, Heart } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Dining() {
  return (
    <div className="space-y-10 pb-12">
      <header className="space-y-3">
        <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-bold text-3xl text-on-surface"
        >
            餐饮与便利店
        </motion.h2>
        <p className="text-on-surface-variant font-medium text-sm leading-relaxed max-w-lg">
            为您精选克拉比及兰塔岛最地道的海鲜料理与周边生活指南。
        </p>
      </header>

      {/* Filter Chips */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2 -mx-4 px-4">
        <FilterChip icon={<Utensils size={18} />} label="全部" active />
        <FilterChip label="Seafood" />
        <FilterChip label="Street Food" />
        <FilterChip label="Coffee" />
      </div>

      {/* Featured Restaurant */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-8 group relative overflow-hidden rounded-[2rem] bg-white shadow-xl flex flex-col border border-outline-variant/30 hover:shadow-2xl transition-all duration-500"
        >
          <div className="aspect-[16/9] w-full overflow-hidden">
            <img 
                src={RESTAURANTS[0].image} 
                alt="Featured Restaurant" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
          </div>
          <div className="p-8 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 inline-block shadow-md">Top Rated</span>
                <h3 className="font-heading font-bold text-2xl text-on-surface tracking-tight">{RESTAURANTS[0].name}</h3>
              </div>
              <div className="flex items-center text-tertiary font-bold gap-1 bg-tertiary/10 px-3 py-1.5 rounded-2xl">
                <Star size={18} className="fill-tertiary" />
                <span className="text-lg">4.9</span>
              </div>
            </div>
            <p className="text-on-surface-variant font-medium text-sm leading-relaxed opacity-90 line-clamp-2">
                {RESTAURANTS[0].description}
            </p>
            <div className="flex gap-3 flex-wrap pt-2">
              <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                <Heart size={14} className="fill-secondary" /> Team Favorite: 咖喱蟹
              </span>
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold italic tracking-wide">
                #本地特色
              </span>
            </div>
          </div>
        </motion.div>

        {/* Secondary Recommendations */}
        <div className="md:col-span-4 space-y-6">
            <SmallFoodCard 
                img="https://lh3.googleusercontent.com/aida-public/AB6AXuATpXG5ZVS620h2ALK_Q4IoHJBY3XzPnfXZViTfos5jqgf0RQnzhmbncsYjcmXkdZ87Q70SthLTxCXQ7AjVPm8PMRauZhGbOrO1QSRmWDvBDFbgOpjSooiapMr7mQvxQYa5sxn3qqcVAHcY8ocNUso1QCQwSWaJ04rjZtJLGMUgi0TDANyZv0yA_-DRqp2vcpQ8twIW23TGjtON5A6wdzo63S-oammoRBFDcehUDUnQYF4GHP327AkxGcDEPu1gW_o00SGtpWJMFHs"
                title="Krabi Town Night Market"
                dist="1.2km"
                cat="Street Food"
            />
            <SmallFoodCard 
                img="https://lh3.googleusercontent.com/aida-public/AB6AXuAa2LuRwCsq5_toOAnDyrJrHn81ER9dOXGBAnRpamLbXD7RyUDDXQpC4qzMraUV9yipe1vBfwjhQmUcTiRFJjuxGndPW2Tj95WOi8F9Git0r2vqf1ovvJ2DK1yuSRvuU6jHZWGqCO79F9epznA8OezgigKqPiK1Q6CPHO8i6fzzOJbaKO9gbdTr_-3J0zl7_YQFY0jxZsVIXENRLyBLAEfU4g6lGGs4Rvi1XFaWtKqZl2_tC-JGhYSJJEfTto4Hn4lv0F_wiHm-3GQ"
                title="Andaman Coffee Lab"
                dist="450m"
                cat="Best Coffee"
            />
        </div>
      </section>

      {/* Convenience Info */}
      <section className="space-y-6">
        <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
            <h3 className="font-heading font-bold text-2xl text-on-surface flex items-center gap-3">
                <MapPin className="text-primary" size={28} /> 生活便利指南
            </h3>
            <a href="#" className="text-primary text-xs font-bold flex items-center gap-1 uppercase tracking-widest hover:underline transition-all group">
                查看地图 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 relative h-[320px] rounded-[2.5rem] overflow-hidden group shadow-lg border border-outline-variant/30">
                <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3KXiD_QBn4r8EfKWZ6BfWJYnWHfwgPQSawwyGcwTRh_rEtM8AH5Med1oMFrMsPs3yYP6GfKXkxI_EHBlZpQotPLFNP5RrdkBmglzgaLZymK84Egbr-moktXWc4kOCM0Uyv4A8qW06G5UCfKevdSIMNFfexlIlAyihF-7hg6yIDfGNuCt8xOMx6xFAJnboNa-TgPYArHMyXibttdm0Ms61mRjnzQyQRth3koslxqZYNQRAM9MnP1j02M7YG-uviCO4MSBaA1uuYb0" 
                    alt="Map Info" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl flex items-center justify-between border border-white/50">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-brand-coral/10 flex items-center justify-center text-brand-coral">
                            <ShoppingCart size={28} />
                        </div>
                        <div>
                            <p className="font-heading font-bold text-on-surface text-lg">最近的 7-Eleven</p>
                            <p className="text-on-surface-variant text-xs font-bold opacity-60">步行 5 分钟 (400m)</p>
                        </div>
                    </div>
                    <button className="bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95 text-sm uppercase tracking-widest">
                        导航
                    </button>
                </div>
            </div>
            
            <div className="space-y-4">
                <ConvenienceCard icon={<Cross size={20} className="text-primary fill-primary/20" />} title="药店 & 医疗" desc="Krabi Pharmacy (08:00 - 22:00)" note="提供防蚊液、肠胃药等" color="border-primary" />
                <ConvenienceCard icon={<Banknote size={20} className="text-secondary" />} title="ATM & 换汇" desc="SCB Bank ATM (24h)" note="出门右转 200m，支持银联" color="border-secondary" />
                <ConvenienceCard icon={<Truck size={20} className="text-tertiary" />} title="洗衣服务" desc="Lanta Express Wash" note="次日达，50泰铢/公斤" color="border-tertiary" />
            </div>
        </div>
      </section>
    </div>
  );
}

function FilterChip({ icon, label, active }: any) {
  return (
    <button className={cn(
      "flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm active:scale-95 shrink-0 uppercase tracking-widest",
      active ? "bg-primary text-white shadow-primary/20" : "bg-white text-on-surface-variant hover:bg-surface-container border border-outline-variant/30"
    )}>
      {icon} {label}
    </button>
  );
}

function SmallFoodCard({ img, title, dist, cat }: any) {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-outline-variant/30 overflow-hidden group hover:shadow-xl transition-all duration-500 translate-y-0 hover:translate-y-[-8px]">
        <div className="aspect-[4/3] relative overflow-hidden">
            <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute top-4 left-4 glass-effect px-3 py-1.5 rounded-xl text-[10px] text-primary font-bold shadow-lg uppercase tracking-widest border border-white/50">
                {dist}
            </div>
        </div>
        <div className="p-6">
            <h4 className="font-heading font-bold text-base text-on-surface mb-2">{title}</h4>
            <div className="flex gap-2">
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{cat}</span>
            </div>
        </div>
    </div>
  );
}

function ConvenienceCard({ icon, title, desc, note, color }: any) {
  return (
    <div className={cn("bg-surface-container rounded-3xl p-6 border-l-8 transition-all hover:bg-surface-container-high cursor-pointer shadow-sm", color)}>
        <div className="flex items-center gap-3 mb-3">
            {icon}
            <h4 className="font-heading font-bold text-sm text-on-surface uppercase tracking-wide">{title}</h4>
        </div>
        <p className="text-xs font-bold text-on-surface-variant mb-1">{desc}</p>
        <p className="text-[10px] text-on-surface-variant opacity-60 italic font-medium leading-relaxed">{note}</p>
    </div>
  );
}
