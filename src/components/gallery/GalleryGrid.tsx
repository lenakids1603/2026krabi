import { motion } from 'motion/react';
import { Heart, MessageCircle, Maximize } from 'lucide-react';
import { GalleryItem } from '../../api/galleryApi';

interface GalleryGridProps {
  photos: GalleryItem[];
  onLike?: (id: string) => void;
  onSelect?: (photo: GalleryItem) => void;
}

export function GalleryGrid({ photos, onLike, onSelect }: GalleryGridProps) {
  return (
    <section className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {photos.map((photo, idx) => (
        <motion.div 
          key={photo.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="relative group rounded-3xl overflow-hidden shadow-lg bg-surface-container-low break-inside-avoid cursor-pointer"
        >
          <img 
            src={photo.url} 
            alt="Gallery" 
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
            referrerPolicy="no-referrer" 
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike?.(photo.id);
                  }}
                  className="flex items-center gap-1.5 hover:scale-110 transition-transform"
                >
                  <Heart size={20} className="fill-brand-coral text-brand-coral" />
                  <span className="text-xs font-bold">{photo.likes}</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <MessageCircle size={20} className="text-white" />
                  <span className="text-xs font-bold">{photo.comments}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(photo);
                  }}
                  className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                >
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
