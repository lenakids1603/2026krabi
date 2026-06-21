import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Maximize, Trash2, Play } from 'lucide-react';
import { GalleryItem, getUploaderId, getUploaderHash } from '../../api/galleryApi';

interface GalleryGridProps {
  photos: GalleryItem[];
  isAdmin: boolean;
  onSelect?: (photo: GalleryItem) => void;
  onDelete?: (id: string) => void;
}

export function GalleryGrid({ photos, isAdmin, onSelect, onDelete }: GalleryGridProps) {
  const [currentUserHash, setCurrentUserHash] = useState<string>('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Derive local cryptographic uploader hash on mount
  useEffect(() => {
    async function deriveHash() {
      const uId = getUploaderId();
      const hash = await getUploaderHash(uId);
      setCurrentUserHash(hash);
    }
    deriveHash();
  }, []);

  const handleDeleteClick = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    if (confirm('您确定要永久删除这张照片或视频吗？此操作无法撤销。')) {
      setDeletingId(photoId);
      onDelete?.(photoId);
    }
  };

  return (
    <section className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {photos.map((photo, idx) => {
        // Can be deleted if current user owns it or is the designated admin
        const canDelete = isAdmin || (photo.uploader_token_hash && photo.uploader_token_hash === currentUserHash);
        const isVideo = photo.media_type === 'video';

        return (
          <motion.div 
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: Math.min(idx * 0.05, 0.4) }}
            onClick={() => onSelect?.(photo)}
            className="relative group rounded-3xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 bg-white break-inside-avoid cursor-pointer"
          >
            {/* Media thumbnail */}
            <div className="relative overflow-hidden w-full h-auto">
              <img 
                src={photo.thumbnail_url || photo.url} 
                alt={photo.original_name || 'Team moment'} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                referrerPolicy="no-referrer" 
              />

              {/* Video Play Indicator Overlay */}
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-md group-hover:scale-110 group-hover:bg-[#FF7E53] transition-transform duration-300">
                    <Play size={20} className="fill-current ml-0.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick action buttons always visible on hover */}
            <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {canDelete && (
                <button
                  disabled={deletingId === photo.id}
                  onClick={(e) => handleDeleteClick(e, photo.id)}
                  title="删除此文件"
                  className="p-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <Trash2 size={15} className={deletingId === photo.id ? 'animate-pulse' : ''} />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect?.(photo);
                }}
                title="放大查看"
                className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-black hover:bg-white shadow-md hover:scale-110 transition-transform"
              >
                <Maximize size={15} />
              </button>
            </div>

            {/* Lower Info bar on Hover */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
              <p className="text-white/80 text-[10px] font-bold truncate mb-3">
                {photo.original_name || '团建精彩瞬间'}
              </p>
              
              <div className="flex items-center justify-between text-white">
                <span className="text-white/60 text-[9.5px] font-medium">
                  {isVideo ? '视频格式' : '图片格式'}
                </span>
                
                {photo.uploader_token_hash === currentUserHash && (
                  <span className="bg-[#FF7E53]/20 border border-[#FF7E53]/30 text-[#FF7E53] px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase">
                    我的上传
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
