import { motion, AnimatePresence } from 'motion/react';
import { UserCheck, Landmark, Backpack, Coins, ChevronDown, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { NOTES_HEADER_BG } from '@/src/assets/localImages';

export default function Notes() {
  return (
    <div className="space-y-10 pb-20 text-left">
      <header className="space-y-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="bg-[#E5EFF1] text-[#1D5E6B] border border-[#1D5E6B]/15 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase mb-1 inline-block shadow-sm">
            IMPORTANT MEMO
          </span>
        </motion.div>
        <h2 className="font-heading font-black text-4xl text-[#00516E] tracking-tight">注意事项</h2>
        <p className="text-on-surface-variant font-medium text-sm leading-relaxed max-w-2xl opacity-90">为了确保您的旅程顺利愉快，请仔细阅读以下信息。安全与尊重当地文化是我们的首要任务。</p>
      </header>

      {/* 人身安全提醒 */}
      <section>
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-amber-50/40 p-8 rounded-[2.5rem] shadow-xl border-l-[12px] border-[#FF7E53] flex flex-col group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
        >
          <div className="absolute top-[-20px] right-[-20px] text-[#FF7E53]/5 rotate-12 group-hover:rotate-0 transition-all duration-1000 pointer-events-none">
             <AlertTriangle size={180} />
          </div>
          <div className="relative z-10 space-y-5 text-slate-800">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-heading font-bold text-2xl text-[#C13D11] mb-1 tracking-tight flex items-center gap-2">
                  <AlertTriangle className="text-[#FF7E53]" size={26} />
                  人身安全提醒
                </h3>
                <p className="text-on-surface-variant text-xs font-bold opacity-60 tracking-wider">PERSONAL SAFETY REMINDER</p>
              </div>
            </div>
            
            <div className="space-y-4 text-sm leading-relaxed text-slate-700">
              <p className="font-bold text-[#8B2605] bg-[#FF7E53]/10 p-4 rounded-2xl border-l-4 border-[#FF7E53]">
                本次行程以集体出行为主，请大家务必把人身安全放在第一位。外出时尽量结伴同行，不要单独前往偏僻、人少、照明不足或存在安全隐患的区域；女生外出，尤其是夜间外出、打车、去酒吧或前往陌生地点时，必须结伴出行，不建议单独行动。自由活动期间请提前告知同伴自己的去向，并保持手机电量充足、通讯畅通。
              </p>
              <p>
                在当地出行时请严格遵守交通规则，过马路注意左右来车，不随意横穿马路；乘坐车辆时系好安全带，不乘坐无正规资质、无明确价格或感觉不安全的交通工具。如需骑摩托车或电动车，请务必佩戴头盔，注意当地路况和靠左行驶规则，不酒后骑行，不超速，不冒险驾驶。
              </p>
              <p>
                参加海边、出海、浮潜、游泳等活动时，请听从工作人员安排，注意天气、海况和安全提示，不擅自进入深水区、礁石区或禁止游泳区域。饮酒需适量，夜间娱乐后请结伴返回酒店。个人护照、钱包、手机等贵重物品请妥善保管，不随意交给陌生人，也不要轻信陌生人的搭讪、带路、推销或邀约。
              </p>
              <p className="font-medium text-slate-600">
                如遇身体不适、迷路、交通事故、物品遗失、纠纷或其他突发情况，请第一时间联系同行伙伴、负责人或酒店工作人员，不要独自处理危险情况。
              </p>
            </div>
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
