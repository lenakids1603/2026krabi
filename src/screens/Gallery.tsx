import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, RefreshCw, Film, Image as ImageIcon, CheckCircle, AlertCircle, Trash2, ArrowRight, Download } from 'lucide-react';
import { cn } from '../lib/utils';
import { getGalleryItems, uploadGalleryFile, deleteGalleryItem, checkAdminStatus, GalleryItem } from '../api/galleryApi';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { generateThumbnail } from '../lib/thumbnailHelper';
import { useDragToScroll } from '../hooks/useDragToScroll';
import { Link } from 'react-router-dom';

export default function Gallery() {
  const dragScroll = useDragToScroll();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  
  // Admin credentials
  const [isAdmin, setIsAdmin] = useState(false);

  // Upload progress and states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'generating_thumb' | 'uploading' | 'completed' | 'failed'>('idle');
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Fetch initial setup on mount
  const refreshGallery = async () => {
    try {
      const items = await getGalleryItems();
      setPhotos(items);
      const adminStatus = await checkAdminStatus();
      setIsAdmin(adminStatus);
    } catch (e) {
      console.error('Error refreshing gallery list:', e);
    }
  };

  useEffect(() => {
    refreshGallery();
  }, []);

  // Sync filtration
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredPhotos(photos);
    } else if (activeTab === 'images') {
      setFilteredPhotos(photos.filter(p => p.media_type === 'image'));
    } else if (activeTab === 'videos') {
      setFilteredPhotos(photos.filter(p => !p.media_type || p.media_type === 'video'));
    }
  }, [photos, activeTab]);

  // Handle uploading photos/videos with custom thumbnail generation
  const handleUploadFile = async (file: File) => {
    if (!file) return;

    // Validate size
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      setUploadError('不支持该类型。请上传 JPEG/PNG/WebP 格式图片或 MP4/MOV/WebM 格式视频。');
      setUploadStatus('failed');
      return;
    }

    if (isImage && file.size > 10 * 1024 * 1024) {
      setUploadError('图片文件不能超过 10MB。');
      setUploadStatus('failed');
      return;
    }

    if (isVideo && file.size > 100 * 1024 * 1024) {
      setUploadError('视频文件不能超过 100MB。');
      setUploadStatus('failed');
      return;
    }

    try {
      setIsUploading(true);
      setUploadPercent(0);
      setUploadError('');
      
      // Step 1: Generate high quality compressed local preview thumbnail
      setUploadStatus('generating_thumb');
      const thumbnailBase64 = await generateThumbnail(file);

      // Step 2: Upload raw file & derived preview to the server with dynamic progress tracking
      setUploadStatus('uploading');
      const responseItem = await uploadGalleryFile(file, thumbnailBase64, (percent) => {
        setUploadPercent(percent);
      });

      // Step 3: Conclude successfully
      setPhotos(prev => [responseItem, ...prev]);
      setUploadStatus('completed');
      
      // Reset indicator state after a success delay
      setTimeout(() => {
        setUploadStatus('idle');
        setIsUploading(false);
      }, 2500);

    } catch (err: any) {
      console.error('Upload process failed:', err);
      setUploadError(err.message || '文件上传发生故障，请检查后重试');
      setUploadStatus('failed');
    }
  };

  // Drag and drop event handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleUploadFile(files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUploadFile(files[0]);
      // clear standard value so uploading same file twice is detected
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Delete matching ownership
  const handleDeleteItem = async (itemId: string) => {
    try {
      await deleteGalleryItem(itemId);
      setPhotos(prev => prev.filter(p => p.id !== itemId));
    } catch (err: any) {
      alert(err.message || '删除发生错误');
    }
  };

  // Double-liker
  const handleLike = (id: string) => {
    setPhotos(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  // Download handler with iPhone/WeChat browser fallback options
  const handleDownload = async (photo: GalleryItem) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isWeChat = /MicroMessenger/i.test(navigator.userAgent);

    if (isIOS || isWeChat) {
      window.open(photo.file_url, '_blank');
      alert('【系统提示】\n苹果 iOS / 微信等内置浏览器由于系统底线限制，无法直接下载。\n\n本系统已在新标签页为您打开媒体文件原件：\n请 [长按图片或网页视频] 调出菜单，并选择「保存到相册」或「存储到文件」即可。');
      return;
    }

    try {
      const response = await fetch(photo.file_url);
      if (!response.ok) throw new Error('CORS or Network issue');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = photo.original_name || `lenakids-retreat-${photo.id}.${photo.media_type === 'video' ? 'mp4' : 'jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.warn('Direct BLOB download failed, utilizing fallback window:', err);
      window.open(photo.file_url, '_blank');
      alert('已在新窗口中为您打开媒体原件。若没有自动下载：\n- 手机端：请长按画面选择「保存至相册」\n- 电脑端：请在画面上点击鼠标右键，选择「另外保存图片/视频」');
    }
  };

  return (
    <div className="space-y-10 pb-12 text-left">
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-2">
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex gap-2">
            <span className="bg-[#E5EFF1] text-[#1D5E6B] border border-[#1D5E6B]/15 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase inline-block shadow-sm">
              TEAM GALLERY
            </span>
            {isAdmin && (
              <span className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.05em] inline-block shadow-sm">
                超级管理员
              </span>
            )}
          </motion.div>
          <h2 className="font-heading font-black text-4xl text-[#00516E] tracking-tight text-left">共享相册</h2>
          <p className="text-on-surface-variant max-w-lg font-medium text-sm leading-relaxed opacity-90 text-left">
            记录甲米之行的每一个精彩瞬间。每个人都可以在线共享和管理大家的团建记忆（无需登录，并支持删除您自己上传的内容）。
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-3 self-start sm:self-auto">
          <Link 
            to="/gallery-admin" 
            className="text-xs font-extrabold text-[#0077B6] hover:text-[#00516E] flex items-center gap-1.5 group transition-all"
          >
            管理员控制台登入 <ArrowRight size={14} className="group-hover:translate-x-1 duration-200 transition-transform" />
          </Link>

          <button
            onClick={refreshGallery}
            className="w-fit border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <RefreshCw size={14} /> 刷新相册
          </button>
        </div>
      </header>

      {/* Structured Drag and Drop Workspace Upload Box */}
      <section 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-[32px] p-8 md:p-12 text-center transition-all duration-300 max-w-4xl mx-auto",
          isDragging ? "border-[#FF7E53] bg-[#FF7E53]/5 scale-[1.01]" : "border-slate-200 bg-white hover:border-slate-300 shadow-[0px_10px_40px_rgba(0,0,0,0.02)]",
          isUploading && "pointer-events-none"
        )}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm" 
          className="hidden" 
        />

        <AnimatePresence mode="wait">
          {uploadStatus === 'idle' && (
            <motion.div 
              key="idle-state" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex gap-2">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF7E53] flex items-center justify-center">
                  <ImageIcon size={24} />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Film size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-black text-slate-800 text-lg">拖拽您的照片 & 视频到这里</h3>
                <p className="text-slate-400 text-xs mt-1.5 font-medium">支持极速上传 JPG / JPEG / PNG / WEBP（≤10MB） 或 MP4 / MOV / WEBM（≤100MB）</p>
              </div>
              <button
                onClick={triggerFileInput}
                className="mt-2 bg-[#FF7E53] hover:bg-[#E06B42] text-white px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-md shadow-orange-500/10 cursor-pointer active:scale-95 transition-all"
              >
                选择文件共享
              </button>
            </motion.div>
          )}

          {uploadStatus === 'generating_thumb' && (
            <motion.div 
              key="generating-state" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-4 gap-3 text-slate-600"
            >
              <div className="w-10 h-10 border-4 border-[#00516E]/10 border-t-[#00516E] rounded-full animate-spin" />
              <p className="text-sm font-bold">正在提取媒体首帧并压缩高画质缩略图...</p>
              <p className="text-[10px] text-slate-400 font-medium">采用客户端离线 HTML5 Canvas 流式压缩，不消耗网络流量</p>
            </motion.div>
          )}

          {uploadStatus === 'uploading' && (
            <motion.div 
              key="uploading-state" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="w-full max-w-md mx-auto flex flex-col items-center py-4 gap-4"
            >
              <div className="flex justify-between w-full text-xs font-bold text-slate-600">
                <span>正在上载文件到泰国服务器中...</span>
                <span>{uploadPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#FF7E53] h-full transition-all duration-150" style={{ width: `${uploadPercent}%` }} />
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">请勿关闭浏览器，完成后将立即同步全体成员</p>
            </motion.div>
          )}

          {uploadStatus === 'completed' && (
            <motion.div 
              key="completed-state" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-4 gap-3 text-emerald-600"
            >
              <CheckCircle size={44} className="stroke-current" />
              <p className="text-sm font-black">共享上载成功！</p>
              <p className="text-[10px] text-emerald-700/70 font-bold">您已完成媒体共享，全体成员刷新即可查看最新视频与照片</p>
            </motion.div>
          )}

          {uploadStatus === 'failed' && (
            <motion.div 
              key="failed-state" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-4 gap-4"
            >
              <AlertCircle size={44} className="text-red-500" />
              <div>
                <p className="text-sm font-black text-slate-800">上载遇到麻烦</p>
                <p className="text-xs text-red-500 font-bold max-w-md mt-1.5 leading-relaxed bg-red-50/50 border border-red-100 px-4 py-2.5 rounded-2xl mx-auto">{uploadError}</p>
              </div>
              <button
                onClick={() => setUploadStatus('idle')}
                className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-bold cursor-pointer"
              >
                重新选择上传
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Sort Tab Button Rows */}
      <div className="flex gap-2.5 border-b border-slate-100 pb-3">
        <TabButton label="全体瞬间" active={activeTab === 'all'} onClick={() => setActiveTab('all')} count={photos.length} />
        <TabButton label="精彩照片" active={activeTab === 'images'} onClick={() => setActiveTab('images')} count={photos.filter(p => p.media_type === 'image').length} />
        <TabButton label="高清视频" active={activeTab === 'videos'} onClick={() => setActiveTab('videos')} count={photos.filter(p => p.media_type === 'video').length} />
      </div>

      {/* Render Album items grid */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 border border-slate-100 rounded-[32px] max-w-4xl mx-auto">
          <p className="text-slate-400 font-semibold text-sm">相册当前没有任何分类内容</p>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">快拉上小伙伴点击上方 “选择文件共享” 记录你在泰国的第一个精彩镜头吧！</p>
        </div>
      ) : (
        <GalleryGrid 
          photos={filteredPhotos} 
          isAdmin={isAdmin}
          onLike={handleLike} 
          onSelect={setSelectedPhoto} 
          onDelete={handleDeleteItem}
        />
      )}

      {/* High-Fidelity Responsive Expanded View Modal Dialog */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[85vh] overflow-hidden rounded-[32px] bg-slate-900 border border-slate-800 flex flex-col shadow-2xl"
            >
              {/* Top Bar inside modal */}
              <div className="absolute top-5 right-5 z-20 flex gap-2">
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="bg-black/40 hover:bg-black/60 rounded-full p-3 text-white transition-colors cursor-pointer border border-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Media Renderer (Image vs HTM5 Video Player) */}
              <div className="flex-1 bg-black flex items-center justify-center min-h-0 overflow-hidden relative">
                {selectedPhoto.media_type === 'video' ? (
                  <video 
                    src={selectedPhoto.file_url} 
                    controls 
                    autoPlay 
                    className="max-h-[70vh] max-w-full rounded-2xl shadow-inner outline-none object-contain"
                  />
                ) : (
                  <img 
                    src={selectedPhoto.file_url} 
                    alt={selectedPhoto.original_name || 'Expanded team photo'} 
                    className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-lg" 
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* Lower info block with metrics inside modal */}
              <div className="p-6 bg-slate-950 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-900">
                <div className="text-left space-y-1">
                  <h4 className="text-sm font-bold text-slate-100 max-w-md truncate">
                    {selectedPhoto.original_name || '共享相册佳作'}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-semibold">
                    上载日期：{new Date(selectedPhoto.created_at || Date.now()).toLocaleString('zh-CN')}
                    {selectedPhoto.file_size ? ` · 大小：${(selectedPhoto.file_size / (1024 * 1024)).toFixed(2)} MB` : ''}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-bold self-start sm:self-auto text-slate-300">
                  <button 
                    onClick={() => handleDownload(selectedPhoto)}
                    className="flex items-center gap-2 bg-[#0077B6] hover:bg-[#00516E] text-white px-5 py-3 rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Download size={15} />
                    <span>下载原文件</span>
                  </button>
                </div>
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

function TabButton({ label, active, onClick, count = 0 }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer shrink-0 border",
        active 
          ? "bg-slate-800 text-white border-slate-800 shadow-md font-extrabold" 
          : "bg-white text-slate-500 hover:text-slate-800 border-slate-100 hover:bg-slate-50"
      )}
    >
      <span>{label}</span>
      <span className={cn(
        "text-[10px] font-bold px-1.5 py-0.2 rounded-full",
        active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
      )}>
        {count}
      </span>
    </button>
  );
}
