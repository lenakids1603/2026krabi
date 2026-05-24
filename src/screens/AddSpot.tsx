import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Camera, Info, Check, Plus, Search, HelpCircle, Compass } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { createCheckinSpot } from '../services/api';
import { cn } from '../lib/utils';

// Read Maps Platform key as specified in the GMP skill
const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export default function AddSpot() {
  const navigate = useNavigate();

  // Controlled form states
  const [selectedCategory, setSelectedCategory] = useState<'餐厅' | '摄影位' | '酒吧' | '咖啡馆' | '其他'>('餐厅');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  // Settle coordinates. Default to Phuket: (7.8804° N, 98.3923° E)
  const [lat, setLat] = useState<number>(7.8804);
  const [lng, setLng] = useState<number>(98.3923);
  const [isLocating, setIsLocating] = useState(true);

  // File handling
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: ('餐厅' | '摄影位' | '酒吧' | '咖啡馆' | '其他')[] = ['餐厅', '摄影位', '酒吧', '咖啡馆', '其他'];

  // --- NEW: Browser Geolocation Logic ---
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false); // Fallback to default Phuket coords on error or denial
        },
        { timeout: 10000 }
      );
    } else {
      setIsLocating(false);
    }
  }, []);
  // --- END NEW LOGIC ---

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMapClick = (e: any) => {
    if (e.detail?.latLng) {
      setLat(e.detail.latLng.lat);
      setLng(e.detail.latLng.lng);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let finalImage = imagePreview;
    if (!finalImage) {
      const defaultSceneries: Record<string, string> = {
        '餐厅': 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80',
        '摄影位': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        '酒吧': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
        '咖啡馆': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
        '其他': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
      };
      finalImage = defaultSceneries[selectedCategory];
    }

    await createCheckinSpot({
      name: name.trim(),
      category: selectedCategory,
      description: description.trim() || '随行打卡，风光无限。',
      image_url: finalImage,
      lat,
      lng,
      user: user.trim() || '旅行同伴'
    });

    navigate('/checkin-spots');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 text-left">
      <header className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
        <button
          onClick={() => navigate('/checkin-spots')}
          className="flex items-center gap-1.5 text-sm font-bold text-[#1D5E6B] hover:text-[#00516E] transition-all cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span>返回分享列表</span>
        </button>
        <h2 className="font-heading font-black text-2xl text-[#00516E]">新增打卡点</h2>
        <div className="w-8" />
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="space-y-3">
          <label className="text-sm font-bold text-on-surface-variant flex items-center gap-1.5">
            <MapPin size={16} className="text-[#FF7E53]" />
            <span>设置打卡点定位 (拖动或点击选择)</span>
          </label>

          <div className="relative h-72 md:h-80 w-full rounded-2xl overflow-hidden border border-outline-variant/40 bg-slate-50 shadow-inner group">

            {isLocating ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 gap-3">
                <div className="w-8 h-8 border-4 border-[#FF7E53]/20 border-t-[#FF7E53] rounded-full animate-spin" />
                <p className="text-sm font-bold text-[#00516E]">正在获取您的当前位置...</p>
              </div>
            ) : hasValidKey ? (
              <APIProvider apiKey={API_KEY} version="weekly">
                <Map
                  defaultCenter={{ lat, lng }}
                  defaultZoom={15}
                  mapId="DEMO_MAP_ID"
                  gestureHandling="cooperative"
                  reuseMaps
                  onClick={handleMapClick}
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%' }}
                >
                  <AdvancedMarker position={{ lat, lng }}>
                    <Pin background="#FF7E53" glyphColor="#fff" />
                  </AdvancedMarker>
                </Map>
              </APIProvider>
            ) : (
              <div className="relative w-full h-full bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#38BDF8] flex items-center justify-center cursor-crosshair">
                <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 12 0 C 18 15, 8 30, 20 40 Q 30 50, 40 70 T 80 100 L 100 100 L 100 0 Z" fill="#F0FDFA" />
                  <path d="M 68 62 C 60 70, 70 85, 76 96 C 80 94, 84 80, 80 72 Z" fill="#BBF7D0" />
                  <g stroke="#FFF" strokeWidth="0.1" strokeDasharray="1 3">
                    <line x1="20" y1="0" x2="20" y2="100" />
                    <line x1="40" y1="0" x2="40" y2="100" />
                    <line x1="60" y1="0" x2="60" y2="100" />
                    <line x1="80" y1="0" x2="80" y2="100" />
                    <line x1="0" y1="30" x2="100" y2="30" />
                    <line x1="0" y1="60" x2="100" y2="60" />
                  </g>
                </svg>

                <div className="absolute top-[20%] left-[25%] opacity-55 text-[10px] uppercase font-mono font-bold tracking-widest text-[#0369A1]">Current Region</div>

                <div className="relative z-10 flex flex-col items-center select-none cursor-pointer">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-[#FF7E53]"
                  >
                    <MapPin size={42} fill="#FF7E53" stroke="#FFF" strokeWidth={1.5} className="drop-shadow-lg" />
                  </motion.div>
                  <div className="w-3 h-1 bg-black/20 rounded-full blur-[1px] mt-1 shrink-0" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-3 border border-outline-variant/30 text-left flex items-start gap-2.5 shadow-md">
                  <span className="p-1.5 bg-sky-100 text-[#0284C7] rounded-lg mt-0.5">
                    <Info size={14} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-on-surface">交互式模拟定位盘</p>
                    <p className="text-[10px] text-on-surface-variant leading-relaxed">
                      已自动匹配当前环境坐标。您可以直接在此盘面上点击修改经纬度。
                    </p>
                  </div>
                </div>

                <div className="absolute right-4 top-4 bg-white/95 backdrop-blur-md p-2 rounded-xl flex flex-col gap-2 shadow-md border border-outline-variant/20">
                  <button type="button" onClick={() => setLat(prev => prev + 0.005)} className="p-1.5 rounded bg-surface hover:bg-neutral-100 font-bold font-mono text-xs text-[#00516E]">▲ Y</button>
                  <button type="button" onClick={() => setLat(prev => prev - 0.005)} className="p-1.5 rounded bg-surface hover:bg-neutral-100 font-bold font-mono text-xs text-[#00516E]">▼ Y</button>
                  <button type="button" onClick={() => setLng(prev => prev - 0.005)} className="p-1.5 rounded bg-surface hover:bg-neutral-100 font-bold font-mono text-xs text-[#00516E]">◀ X</button>
                  <button type="button" onClick={() => setLng(prev => prev + 0.005)} className="p-1.5 rounded bg-surface hover:bg-neutral-100 font-bold font-mono text-xs text-[#00516E]">▶ X</button>
                </div>
              </div>
            )}

            <div className="absolute bottom-4 right-4 bg-[#0F172A]/85 backdrop-blur-md text-white text-[10px] font-mono rounded-lg px-3 py-1.5 shadow-md flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{lat.toFixed(6)}° N, {lng.toFixed(6)}° E</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-extrabold text-[#00516E] uppercase tracking-wider block">打卡类型</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer",
                  selectedCategory === cat
                    ? "bg-[#FF7E53]/10 text-[#FF7E53] border-[#FF7E53]/40 shadow-sm font-extrabold"
                    : "bg-white text-on-surface-variant border-neutral-200 hover:bg-neutral-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-extrabold text-[#00516E] flex items-center gap-1">
            <span>名称</span>
            <span className="text-error font-bold text-xs">*</span>
          </label>
          <input
            type="text"
            required
            maxLength={40}
            placeholder="给打卡点起个有趣的名字"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-[#FF7E53] focus:border-[#FF7E53] focus:outline-none text-[13px] font-bold"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-extrabold text-[#00516E] block">简介</label>
          <textarea
            rows={4}
            maxLength={250}
            placeholder="描述一下这里有什么好玩的..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-[#FF7E53] focus:border-[#FF7E53] focus:outline-none text-[13px] font-medium leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-extrabold text-[#00516E] block">照片 (点击上传)</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-neutral-300 rounded-2xl h-44 text-center flex flex-col items-center justify-center cursor-pointer hover:border-[#FF7E53] transition-colors p-4 relative bg-[#FAF9F5]"
          >
            {imagePreview ? (
              <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden p-1.5">
                <img src={imagePreview} className="w-full h-full object-cover rounded-xl" alt="Preview upload"  referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                  <span className="text-white text-xs font-bold bg-[#FF7E53] px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <Camera size={14} /> 重新上传
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-3.5 bg-white shadow-sm border border-neutral-200 rounded-full w-fit mx-auto text-[#FF7E53]">
                  <Camera size={26} />
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">点击上传照片</p>
                  <p className="text-[10px] text-on-surface-variant opacity-70 mt-1">未选择将根据类型自动匹配背景</p>
                </div>
              </div>
            )}
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageSelect} className="hidden" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-extrabold text-[#00516E] block">分享人</label>
          <input
            type="text"
            maxLength={18}
            placeholder="您的名字或昵称"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-[#FF7E53] focus:border-[#FF7E53] focus:outline-none text-[13px] font-bold"
          />
        </div>

        {!hasValidKey && (
          <div className="bg-sky-50 border border-sky-100 text-sky-900 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-left">
            <HelpCircle size={18} className="text-[#0284C7] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-[#00516E]">系统提示：您当前正在使用本地拟真沙盒进行打卡</span>
              <p className="opacity-80">配置 GOOGLE_MAPS_PLATFORM_KEY 以联通真实地图引擎。</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-4 bg-[#FF7E53] hover:bg-[#E0633B] text-white font-black rounded-2xl shadow-lg shadow-[#FF7E53]/25 flex items-center justify-center gap-2 text-sm uppercase tracking-wider transition-all cursor-pointer hover:shadow-xl active:scale-[0.99]"
        >
          <span>提交分享</span>
        </button>
      </form>
    </div>
  );
}