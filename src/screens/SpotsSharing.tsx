import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, Compass, Plus, Navigation, Heart, Share2, ArrowLeft } from 'lucide-react';
import { DEFAULT_SPOTS, Spot } from '../data/spots';
import { cn } from '../lib/utils';

export default function SpotsSharing() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('全部');

  // Load spots from localStorage merged with default spots
  useEffect(() => {
    const saved = localStorage.getItem('lenakids_shared_spots');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Combine keeping defaults unique
        const merged = [...parsed];
        DEFAULT_SPOTS.forEach(defSpot => {
          if (!merged.some(s => s.id === defSpot.id)) {
            merged.push(defSpot);
          }
        });
        setSpots(merged);
      } catch (err) {
        setSpots(DEFAULT_SPOTS);
      }
    } else {
      setSpots(DEFAULT_SPOTS);
    }
  }, []);

  const categories = ['全部', '餐厅', '摄影位', '酒吧', '咖啡馆', '其他'];

  const filteredSpots = spots.filter(spot => {
    if (activeFilter === '全部') return true;
    return spot.category === activeFilter;
  });

  const handleNavigate = (spot: Spot) => {
    // Open real-world Google Maps directions/navigation
    const url = `https://www.google.com/maps/search/?api=1&query=${spot.lat},${spot.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Header Banner */}
      <header className="space-y-3">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="bg-[#FF7E53]/10 text-[#FF7E53] border border-[#FF7E53]/20 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase mb-1 inline-block shadow-sm">
            SHARING HOTSPOTS
          </span>
        </motion.div>
        <h2 className="font-heading font-black text-4xl text-[#00516E] tracking-tight flex items-center gap-2">
          <Compass className="text-[#FF7E53] animate-spin-slow" size={32} />
          打卡点分享
        </h2>
        <p className="text-on-surface-variant max-w-2xl font-medium text-sm leading-relaxed opacity-90">
          伙伴们极力推荐的宝藏餐馆、拍摄机位、落日酒吧，带你打卡别样的甲米之旅。
        </p>
      </header>

      {/* Primary Orange Call-To-Action Button */}
      <div className="flex justify-start">
        <Link
          to="/add-spot"
          className="w-full sm:w-auto px-6 py-4 bg-[#FF7E53] hover:bg-[#E0633B] text-white font-bold rounded-2xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-lg shadow-[#FF7E53]/20 hover:shadow-xl cursor-pointer"
        >
          <Plus size={20} strokeWidth={3} />
          <span>新增打卡点</span>
        </Link>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={cn(
              "px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap",
              activeFilter === cat
                ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-primary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Spots Cards Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpots.length > 0 ? (
          filteredSpots.map((spot, i) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-[2rem] border border-outline-variant/30 overflow-hidden shadow-[0px_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0px_12px_36px_rgba(0,0,0,0.06)] group flex flex-col h-full"
            >
              {/* Cover Image Wrapper */}
              <div className="relative h-56 w-full overflow-hidden bg-surface-container-high shrink-0">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Fallback to high-quality abstract vector gradient if custom file has loading problem
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80`;
                  }}
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Category Pill */}
                <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  {spot.category}
                </span>

                {/* Coords Pin Visual */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#00516E] text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm font-mono">
                  <MapPin size={11} className="text-[#FF7E53]" />
                  {spot.lat.toFixed(4)}°, {spot.lng.toFixed(4)}°
                </div>
              </div>

              {/* Informative Body Section */}
              <div className="p-6 flex flex-col flex-1 text-left space-y-3">
                <div className="space-y-1">
                  <h3 className="font-heading font-black text-xl text-on-surface tracking-tight group-hover:text-primary transition-colors">
                    {spot.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant opacity-70">
                    <span>由 {spot.user || '匿名客'} 分享</span>
                    <span>•</span>
                    <span>{new Date(spot.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-on-surface-variant/90 text-[13px] font-medium leading-relaxed flex-1 line-clamp-3">
                  {spot.description}
                </p>

                {/* Clean Trigger Button: One-click Navigation */}
                <div className="pt-2">
                  <button
                    onClick={() => handleNavigate(spot)}
                    className="w-full py-3 border-2 border-primary/20 hover:border-primary text-primary hover:bg-primary/5 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                  >
                    <Navigation size={15} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    <span>一键导航</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-outline-variant/30 space-y-4">
            <Compass size={48} className="text-[#FF7E53] mx-auto opacity-30 animate-pulse" />
            <div className="space-y-1">
              <p className="font-heading font-bold text-lg text-on-surface">暂无该分类的打卡点</p>
              <p className="text-on-surface-variant text-sm max-w-sm mx-auto opacity-70">
                成为第一个分享的人，推荐心仪的宝藏地带吧！
              </p>
            </div>
            <Link
              to="/add-spot"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/10"
            >
              <Plus size={16} /> 立即创建
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
