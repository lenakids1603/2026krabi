import { motion } from 'motion/react';
import { Camera, CloudUpload, Heart, MessageCircle, Filter, Plus, Maximize, User2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

const PHOTOS = [
    { id: '1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-sQqmnJTSTqlpJETw8vzdhJs1-Td6_E4Q5oURsmGJkZ_NdSciryePQyFTHCCkFs6mfLsmJ5PvAR86b6lKx9UDcuWTDx6fbAR5QJ2mCLRnDViZJtwe7xdZjKxeRcIwAazw1pWy9jcx-Ni2RaqKhz1Pet5SnmeTWkbG7iADAp4sJhucKi1BtfxbuxWu4Ds2BnqAXiKYCuhC7cwXg1V09NZHZ-bFYD23c6ULiDRZ0xonKX2MDdq68xCgkGynJY0Aa_0cRy4G9zooK6s', likes: 42, comments: 5, category: 'itinerary' },
    { id: '2', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANm_Bra4tbB_SZ2aceCR7Al7A4f4LafI_w2j8HhUYRd_feWBAF-75bDXuQkVdIKnXzK9iCKFLgD5ImixN2qRzMy8B6iPEwJR1ezKrzaHAo1_qQQWs3G02jGPsJHznVj7kpB78U7co3B2btIGXh0jyR_U6GiqUBXjPhx0F3UMGH0Q3YKXvRYCihrpink1HcDuIQDQjryVEDURTiTNyxRO_pxD-S3essbM5gyD4FX3IM9N3g3TbmBhUCzly-o0vR-b6N4-S4fJAm0IQ', likes: 89, comments: 12, category: 'party' },
    { id: '3', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYCGGHbQnXIsTZftYI6pMG83vWCRn_oGxTfiMcDnE67eSmb6rK7YKgbVaVy7lSx69fLStXQHMyXydu5J8HbcWmHMRYyh3oMdi0EuX14PQix9MKycS-HzXmNL4JxQijdkBOq-DtiDAUVhf23NI7RRvVlJwzeLkAxP7abUj23bepa2-MKExSfgDIij04eNjYNIP3ghjhO6lR7s3sywNg3Fq40HTzgZRNiEnRd0mJi-hNtuObrLgmWM6DJd4Ewug3wT0PlcHa153mcU0', likes: 15, comments: 2, category: 'hotel' },
    { id: '4', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDga07sVsZJ7qSMbQjIZP1X4X9XN1BgKAzVu86WcbF6XAUVS2lv_TTM1bODW_RNUhtxuNoo_E7tscSwazJ44pn0A5P3jO2fqP8gmtLPjubr7RxqK3TK6Ya-_afBntg3E2JZgKr96zZsYUfCF0dh9gnBtrBkX9_jHxIebrILYfGo1NHj-4ypa-mg4WWE2jtCoaHvOBB5IzsaOBeq5CNM4axwNGVPo3Y_kzMfVqswQqNavuzwTegFQZwyZjB7a8IVkwcPe48y0IJe2g4', likes: 56, comments: 8, category: 'beach' },
    { id: '5', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjjhJk-e31D_aGhwYWcWyarM7J9_cSF_2fbrnP6N-n4KAWOV33PclY_pKTttQH3aZ1tfMeQrNozKMssHC4xjCnWd13TVgCmaWHldP6aCPx3FWmCzvZ4C1C9_mnpBj-vNMV7xsvZYHBtouJbx6cctwuUEREVxrzS7DIyJJi1uUTYLgaCCTBobvd0IG1sajv39rQDSSN-KSt7-4K_T1vvF1GTAjgqivp7MiaWr3IPv_DwiMlexVpHSA6iGpZX6oAkfFkGPkEet-G8Cg', likes: 34, comments: 3, category: 'nature' }
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-10 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-heading font-bold text-4xl text-on-surface tracking-tight">共享相册</motion.h2>
          <p className="text-on-surface-variant font-medium text-sm leading-relaxed max-w-sm opacity-90">记录甲米之行的每一个精彩瞬间</p>
        </div>
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-brand-coral text-white flex items-center gap-3 px-8 py-4 rounded-[1.25rem] font-bold text-sm uppercase tracking-widest shadow-xl shadow-brand-coral/20 transition-all w-fit"
        >
          <CloudUpload size={22} className="group-hover:-translate-y-1 transition-transform" />
          上传照片
        </motion.button>
      </header>

      {/* Categories Chips */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
        <TabButton label="全部" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
        <TabButton label="Day 1 抵达" active={activeTab === 'Day 1 抵达'} onClick={() => setActiveTab('Day 1 抵达')} />
        <TabButton label="海滩派对" active={activeTab === '海滩派对'} onClick={() => setActiveTab('海滩派对')} />
        <TabButton label="跳岛游" active={activeTab === '跳岛游'} onClick={() => setActiveTab('跳岛游')} />
        <TabButton label="丛林徒步" active={activeTab === '丛林徒步'} onClick={() => setActiveTab('丛林徒步')} />
      </div>

      {/* Masonry-style Grid */}
      <section className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {PHOTOS.map((photo, idx) => (
          <motion.div 
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="relative group rounded-3xl overflow-hidden shadow-lg bg-surface-container-low break-inside-avoid"
          >
            <img src={photo.url} alt="Gallery" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                    <Heart size={20} className="fill-brand-coral text-brand-coral" />
                    <span className="text-xs font-bold">{photo.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                    <MessageCircle size={20} className="text-white" />
                    <span className="text-xs font-bold">{photo.comments}</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">
                        <Maximize size={16} />
                    </button>
                    <div className="w-8 h-8 rounded-full border-2 border-white/50 overflow-hidden">
                        <User2 size={32} className="text-white/40 -ml-1 -mt-1" />
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      <footer className="pt-20 text-center text-on-surface-variant/40 text-[10px] font-bold uppercase tracking-widest leading-loose">
        记录每一个精彩时刻 · Krabi & Lanta 2026
      </footer>
    </div>
  );
}

function TabButton({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex-none px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shrink-0",
        active ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/30"
      )}
    >
      {label}
    </button>
  );
}
