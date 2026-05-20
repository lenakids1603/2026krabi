import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  ShoppingCart, 
  Pill, 
  CreditCard, 
  RefreshCw, 
  Bike, 
  Compass, 
  MapPin, 
  ArrowUpRight 
} from 'lucide-react';
import { cn } from '../lib/utils';

// Define the region type
type Region = 'krabi' | 'lanta';

interface ServiceItem {
  id: string;
  title: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  shadowColor: string;
  queries: {
    krabi: {
      desc: string;
      query: string;
    };
    lanta: {
      desc: string;
      query: string;
    };
  };
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'restaurants',
    title: '特色餐厅',
    icon: Utensils,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    shadowColor: 'hover:shadow-sky-100/50',
    queries: {
      krabi: {
        desc: '寻找奥南海滩周边的海鲜大排档、地道泰餐、绝美海景餐厅及网红咖啡馆。',
        query: 'restaurants near Ao Nang Beach Krabi'
      },
      lanta: {
        desc: '寻找兰塔老镇悬景悬空木质吊脚楼海鲜、西海岸绝美日落落日酒吧与椰林咖啡。',
        query: 'restaurants near Koh Lanta Krabi'
      }
    }
  },
  {
    id: 'convenience',
    title: '便利商店',
    icon: ShoppingCart,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    shadowColor: 'hover:shadow-emerald-100/50',
    queries: {
      krabi: {
        desc: '搜寻奥南主街上最近的 7-Eleven、全家(FamilyMart)或本土连锁便利商店。',
        query: '7-Eleven convenience store near Ao Nang Beach Krabi'
      },
      lanta: {
        desc: '搜寻兰塔岛 Saladan 镇及西海岸主干道的 7-Eleven 等日常物资补给点。',
        query: '7-Eleven convenience store near Koh Lanta Krabi'
      }
    }
  },
  {
    id: 'pharmacy',
    title: '药店药房',
    icon: Pill,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    shadowColor: 'hover:shadow-rose-100/50',
    queries: {
      krabi: {
        desc: '快速定位奥南海滩沿街配药局，备齐防蚊液、肠胃药、晕船药及晒后修复润肤露。',
        query: 'pharmacy near Ao Nang Beach Krabi'
      },
      lanta: {
        desc: '搜寻兰塔岛各沙滩周边的本土药局与诊所，保障海岛浮潜嬉水时的健康。',
        query: 'pharmacy near Koh Lanta Krabi'
      }
    }
  },
  {
    id: 'atm',
    title: 'ATM 取款',
    icon: CreditCard,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    shadowColor: 'hover:shadow-amber-100/50',
    queries: {
      krabi: {
        desc: '查找奥南周边的 24 小时自动柜员机，支持银联(UnionPay)、VISA 或 Master 卡取现。',
        query: 'atm and bank near Ao Nang Beach Krabi'
      },
      lanta: {
        desc: '搜寻兰塔岛主干道的 SCB、KBANK 自动柜员提现点，方便随时兑换纸币。',
        query: 'atm and bank near Koh Lanta Krabi'
      }
    }
  },
  {
    id: 'exchange',
    title: '货币兑换',
    icon: RefreshCw,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    shadowColor: 'hover:shadow-indigo-100/50',
    queries: {
      krabi: {
        desc: '查找奥南海滩沿路汇率优良的绿色/黄色兑换亭、正规银行外币换汇服务点。',
        query: 'currency exchange near Ao Nang Beach Krabi'
      },
      lanta: {
        desc: '查找兰塔岛 Saladan 码头、老镇周边的官方批准多国法定外币兑换网点。',
        query: 'currency exchange near Koh Lanta Krabi'
      }
    }
  },
  {
    id: 'motorbike_rental',
    title: '租摩托车',
    icon: Bike,
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    shadowColor: 'hover:shadow-teal-100/50',
    queries: {
      krabi: {
        desc: '搜寻奥南周边的摩托车和踏板车租赁行，便捷划算地开启本地环游。',
        query: 'motorbike rental scooter near Ao Nang Beach Krabi'
      },
      lanta: {
        desc: '搜寻兰塔岛主干道及 Saladan 镇的优质摩托车租赁，开启海岛御风骑行。',
        query: 'scooter motorbike rental near Koh Lanta Krabi'
      }
    }
  }
];

export default function Dining() {
  const [activeRegion, setActiveRegion] = useState<Region>('krabi');

  const handleOpenMap = (query: string) => {
    const encodedQuery = encodeURIComponent(query);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8 pb-16 text-left">
      {/* Dynamic Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="bg-primary/5 text-primary border border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
            🗺️ LBS 地理信息助手
          </span>
        </div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading font-black text-3xl text-on-surface tracking-tight"
        >
          周边查询
        </motion.h2>
        <p className="text-on-surface-variant font-medium text-sm leading-relaxed max-w-2xl">
          基于 Google Maps 开放导航！一键查找甲米奥南和兰塔岛最便捷的本地公共配套设施。
          请选择您当前所在的区域，即可智能调配对应目的地的检索链接。
        </p>
      </header>

      {/* Modern Region Selector Segment Tabs */}
      <div className="flex justify-center sm:justify-start">
        <div className="bg-slate-100/80 backdrop-blur-md p-1.5 rounded-[1.75rem] border border-outline-variant/20 inline-flex shadow-inner">
          <button
            onClick={() => setActiveRegion('krabi')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-[1.5rem] text-xs font-bold transition-all duration-300",
              activeRegion === 'krabi'
                ? "bg-white text-primary shadow-sm ring-1 ring-slate-200"
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            <MapPin size={14} className={activeRegion === 'krabi' ? "text-primary fill-primary/10" : ""} />
            <span>甲米 (奥南地区)</span>
          </button>
          <button
            onClick={() => setActiveRegion('lanta')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-[1.5rem] text-xs font-bold transition-all duration-300",
              activeRegion === 'lanta'
                ? "bg-white text-primary shadow-sm ring-1 ring-slate-200"
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            <MapPin size={14} className={activeRegion === 'lanta' ? "text-primary fill-primary/10" : ""} />
            <span>兰塔 (全岛范围)</span>
          </button>
        </div>
      </div>

      {/* Grid Menu of Search Services */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4"
      >
        <AnimatePresence mode="popLayout">
          {SERVICES_DATA.map((service, index) => {
            const Icon = service.icon;
            const regionData = service.queries[activeRegion];
            
            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => handleOpenMap(regionData.query)}
                className={cn(
                  "bg-white border border-slate-100 hover:border-primary/20",
                  "rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl",
                  "transition-all duration-300 relative overflow-hidden flex flex-col justify-between",
                  "group cursor-pointer hover:-translate-y-1 select-none",
                  service.shadowColor
                )}
              >
                {/* Background Huge Silhouette Icon */}
                <Icon 
                  size={120} 
                  strokeWidth={0.5} 
                  className={cn(
                    "absolute right-[-14px] bottom-[-14px] rotate-[-12deg] pointer-events-none transition-all duration-500",
                    "opacity-[0.04] group-hover:opacity-[0.07] group-hover:scale-110 group-hover:rotate-0",
                    service.iconColor
                  )} 
                />

                {/* Top Section */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    {/* Icon container */}
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105",
                      service.iconBg,
                      service.iconColor
                    )}>
                      <Icon size={26} strokeWidth={2.2} />
                    </div>

                    {/* Arrow sign */}
                    <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300 shadow-sm">
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Title and description */}
                  <div className="space-y-2 text-left">
                    <h3 className="font-heading font-black text-xl text-on-surface tracking-tight group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-on-surface-variant font-medium text-xs leading-relaxed opacity-85 min-h-[40px]">
                      {regionData.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Trigger Label */}
                <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between text-left">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant/70 group-hover:text-primary transition-colors">
                    <Compass size={14} className="animate-spin-slow text-primary/70 group-hover:text-primary transition-colors" />
                    <span>打开 Google Maps</span>
                  </span>
                  
                  {/* Subtle hover badge indicating the active query location */}
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#218276] bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full shadow-sm max-w-[120px] truncate">
                    📍 {activeRegion === 'krabi' ? '甲米奥南' : '兰塔岛'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Usage Policy Note */}
      <footer className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 mt-12">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl shrink-0 mt-0.5">
            <Compass size={22} className="animate-pulse" />
          </div>
          <div className="space-y-1">
            <p className="font-heading font-extrabold text-sm text-on-surface">使用小技巧</p>
            <p className="text-xs font-bold text-on-surface-variant opacity-75 leading-relaxed">
              因泰国网络通讯及 iFrame 安全限制，本查询会直接拉起您系统自带的 Google Maps 应用程序（移动端）或新标签浏览器查询。体验流畅，实时获取路况与真评实价。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
