import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import { getGalleryItems, uploadGalleryFile, GalleryItem } from '../api/galleryApi';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { UploadButton } from '../components/gallery/UploadButton';

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  // Fetch items on mount
  useEffect(() => {
    async function loadPhotos() {
      const items = await getGalleryItems();
      setPhotos(items);
    }
    loadPhotos();
  }, []);

  // Handle uploading photos
  const handleUpload = async (file: File) => {
    try {
      const newItem = await uploadGalleryFile(file);
      // Put the uploaded image at the beginning of the list
      setPhotos(prev => [newItem, ...prev]);
    } catch (err) {
      console.error('Failed to upload file:', err);
    }
  };

  // Handle adding a mock like to a photo
  const handleLike = (id: string) => {
    setPhotos(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  // Map active Tab description to category keywords
  const getCategoryFromTab = (tab: string): string => {
    switch (tab) {
      case 'Day 1 抵达': return 'itinerary';
      case '海滩派对': return 'party';
      case '跳岛游': return 'beach';
      case '丛林徒步': return 'nature';
      default: return 'all';
    }
  };

  const filteredPhotos = photos.filter(p => {
    if (activeTab === 'all') return true;
    const categoryKeyword = getCategoryFromTab(activeTab);
    return p.category === categoryKeyword || p.category === 'all';
  });

  return (
    <div className="space-y-10 pb-12 text-left">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-heading font-bold text-4xl text-on-surface tracking-tight text-left">共享相册</motion.h2>
          <p className="text-on-surface-variant font-medium text-sm leading-relaxed max-w-sm opacity-90 text-left">记录甲米之行的每一个精彩瞬间</p>
        </div>
        <UploadButton onUpload={handleUpload} />
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
      <GalleryGrid 
        photos={filteredPhotos} 
        onLike={handleLike} 
        onSelect={setSelectedPhoto} 
      />

      {/* Modal Dialog for expanded view */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl"
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 rounded-full p-2 text-white z-10 transition-colors"
              >
                <X size={20} />
              </button>
              <img 
                src={selectedPhoto.url} 
                alt="Expanded view" 
                className="max-h-[80vh] w-auto object-contain mx-auto rounded-2xl" 
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-black/40 text-white font-medium text-sm text-center">
                点赞量: {selectedPhoto.likes} · 评论数: {selectedPhoto.comments}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
        "flex-none px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shrink-0 cursor-pointer",
        active ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/30"
      )}
    >
      {label}
    </button>
  );
}
