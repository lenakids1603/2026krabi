import { motion, AnimatePresence } from 'motion/react';
import { UserCheck, Landmark, Backpack, Coins, ShieldCheck, ChevronDown, Download, AlertTriangle, Info, MapPin } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { NOTES_HEADER_BG } from '@/src/assets/localImages';
import { useDragToScroll } from '../hooks/useDragToScroll';

export default function Notes() {
  const dragScroll = useDragToScroll();
  return (
    <div className="space-y-10 pb-40 text-left">
      <header className="space-y-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="bg-[#E5EFF1] text-[#1D5E6B] border border-[#1D5E6B]/15 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase mb-1 inline-block shadow-sm">
            IMPORTANT MEMO
          </span>
        </motion.div>
        <h2 className="font-heading font-black text-4xl text-[#00516E] tracking-tight">注意事项</h2>
        <p className="text-on-surface-variant font-medium text-sm leading-relaxed max-w-2xl opacity-90">为了确保您的旅程顺利愉快，请仔细阅读以下信息。安全与尊重当地文化是我们的首要任务。</p>
      </header>

      {/* Insurance Summary */}
      <section>
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl border-l-[12px] border-primary flex flex-col group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
        >
          <div className="absolute top-[-20px] right-[-20px] text-primary/5 rotate-12 group-hover:rotate-0 transition-all duration-1000">
             <ShieldCheck size={180} />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-heading font-bold text-2xl text-primary mb-1 tracking-tight">旅行保险摘要</h3>
                <p className="text-on-surface-variant text-xs font-bold opacity-60 tracking-wider">Policy No: CH-RETREAT-2026-8890</p>
              </div>
              <ShieldCheck size={40} className="text-primary-container drop-shadow-xl" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/20 shadow-inner group-hover:bg-primary/5 transition-colors">
                <div className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black opacity-60 mb-2">医疗保额</div>
                <div className="text-3xl font-heading font-bold text-primary tracking-tighter">¥500,000</div>
              </div>
              <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/20 shadow-inner group-hover:bg-primary/5 transition-colors">
                <div className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black opacity-60 mb-2">紧急救援</div>
                <div className="text-3xl font-heading font-bold text-primary tracking-tighter italic">全额承保</div>
              </div>
            </div>
            <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 text-sm uppercase tracking-widest">
              <Download size={20} /> 下载完整保单 (PDF)
            </button>
          </div>
        </motion.div>
      </section>

      {/* Accordion Sections */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Accordion 
            icon={<UserCheck size={24} />} 
            title="签证与入境" 
            color="bg-primary-container"
            defaultOpen
          >
            <ul className="space-y-4 text-sm font-medium leading-relaxed">
              <li className="flex gap-3"><span className="text-primary font-bold">•</span> <strong>免签政策：</strong> 中国公民目前享受泰国免签入境政策，最长停留30天。</li>
              <li className="flex gap-3"><span className="text-primary font-bold">•</span> <strong>护照有效期：</strong> 请确保您的护照在归国之日起至少有 6 个月的有效期。</li>
              <li className="flex gap-3"><span className="text-primary font-bold">•</span> <strong>入境文件：</strong> 请打印并携带往返机票行程单和酒店预订单。</li>
              <li className="flex gap-3"><span className="text-primary font-bold">•</span> <strong>携带现金：</strong> 泰国海关规定，入境游客每人需携带不少于 10,000 泰铢。</li>
            </ul>
          </Accordion>

          <Accordion 
            icon={<Coins size={24} />} 
            title="货币与支付" 
            color="bg-tertiary-container text-white"
          >
            <div className="space-y-4 text-sm font-medium">
                <p className="bg-surface-container-high p-4 rounded-xl border-l-4 border-tertiary">泰国官方货币为泰铢 (THB)。汇率约为 1 CNY ≈ 4.9 THB。</p>
                <ul className="space-y-3">
                    <li className="flex gap-2"><strong>现金：</strong> 兰塔岛部分地区建议提前兑换适量泰铢。</li>
                    <li className="flex gap-2"><strong>支付：</strong> 大部分 7-11 和餐厅支持支付宝/微信。</li>
                </ul>
            </div>
          </Accordion>

          <Accordion 
            icon={<Backpack size={24} />} 
            title="打包清单" 
            color="bg-secondary-container text-on-secondary-container"
          >
            <div className="grid grid-cols-2 gap-6 text-[13px]">
              <div>
                <p className="font-heading font-black text-secondary uppercase tracking-widest mb-3 border-b-2 border-secondary/10 pb-1">必备装备</p>
                <ul className="space-y-2 opacity-80">
                  <li>• 防晒霜 (SPF50+)</li>
                  <li>• 驱蚊喷雾</li>
                  <li>• 防水袋 (出海用)</li>
                  <li>• 遮阳帽 & 墨镜</li>
                </ul>
              </div>
              <div>
                <p className="font-heading font-black text-secondary uppercase tracking-widest mb-3 border-b-2 border-secondary/10 pb-1">电子产品</p>
                <ul className="space-y-2 opacity-80">
                  <li>• 万能转换插头</li>
                  <li>• 移动电源 (10k mAh)</li>
                  <li>• 泰国SIM卡</li>
                </ul>
              </div>
            </div>
          </Accordion>

          <Accordion 
            icon={<Landmark size={24} />} 
            title="当地习俗" 
            color="bg-primary text-white"
          >
            <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-error-container/20 rounded-2xl border border-error/20">
                    <AlertTriangle size={24} className="text-error mt-1 shrink-0" />
                    <p className="text-[13px] font-bold text-on-surface-variant">泰国是一个重视礼仪的国家，请特别注意当地禁忌。</p>
                </div>
                <ul className="list-disc pl-5 space-y-3 text-sm font-medium opacity-90">
                    <li><strong>寺庙着装：</strong> 禁止穿着背心、短裙进入寺庙。</li>
                    <li><strong>头部礼仪：</strong> 请勿随意触摸当地人头部。</li>
                    <li><strong>小费：</strong> 打扫房间可给 20-50 泰铢。</li>
                </ul>
            </div>
          </Accordion>
      </section>

      {/* Visual Break */}
      <section className="h-56 rounded-[2.5rem] overflow-hidden relative group shadow-2xl">
        <img 
            src={NOTES_HEADER_BG} 
            alt="Temple" 
            className="w-full h-full object-cover transition-all duration-[3000ms] group-hover:scale-110" 
            referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-10">
          <p className="text-white font-heading font-bold text-2xl italic tracking-tight leading-relaxed drop-shadow-xl">
             “尊重当地文化，是旅行中最美的风景。”
          </p>
        </div>
      </section>

      {/* Sticky Contacts Footer Replacement (Native Style Overlay) */}
      <section className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-40">
        <div className="bg-white/90 backdrop-blur-3xl border border-outline-variant/30 rounded-3xl p-6 shadow-[0px_8px_40px_rgba(0,119,182,0.15)]">
            <div className="flex items-center gap-2 mb-4 justify-center">
                <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-60">24/7 紧急联系人</span>
            </div>
            <div 
              ref={dragScroll.ref}
              onMouseDown={dragScroll.onMouseDown}
              style={dragScroll.style}
              className="flex gap-4 overflow-x-auto hide-scrollbar"
            >
                <StickyContact name="John Doe" label="领队" phone="+66 81-234-5678" color="bg-error-container text-error" />
                <StickyContact name="Embassy" label="中国驻泰使馆" phone="+66 2245 0015" color="bg-primary-container text-white" />
                <StickyContact name="Medical" label="紧急医疗" phone="1719" color="bg-secondary-container text-secondary" />
            </div>
        </div>
      </section>
    </div>
  );
}

function Accordion({ icon, title, color, children, defaultOpen = false }: any) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="group bg-white rounded-[2rem] shadow-sm border border-outline-variant/30 overflow-hidden hover:shadow-xl transition-all duration-500">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-7 text-left hover:bg-surface-container-low transition-colors"
      >
        <div className="flex items-center gap-5">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300", color)}>
                {icon}
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-on-surface">{title}</span>
        </div>
        <ChevronDown className={cn("text-outline-variant transition-transform duration-500", isOpen ? "rotate-180" : "")} size={24} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden border-t border-outline-variant/20"
            >
                <div className="p-8 text-on-surface-variant">
                    {children}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StickyContact({ name, label, phone, color }: any) {
    return (
        <div className="flex-none bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20 min-w-[220px] flex items-center gap-4 group hover:bg-white transition-all cursor-pointer">
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shadow-inner", color)}>
                <MapPin size={22} />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1 leading-none">{label}</p>
                <p className="font-heading font-bold text-on-surface text-base tracking-tighter leading-snug">{phone}</p>
            </div>
        </div>
    );
}
