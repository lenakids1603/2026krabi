import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, LogOut, ArrowLeft, Trash2, Image, Video, Eye } from 'lucide-react';
import { getGalleryItems, deleteGalleryItem, adminLogin, adminLogout, checkAdminStatus, GalleryItem } from '../api/galleryApi';

export default function GalleryAdmin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authChecking, setAuthChecking] = useState(true);

  // Check login status on load
  useEffect(() => {
    async function verifyAdmin() {
      try {
        const status = await checkAdminStatus();
        setIsAdmin(status);
        if (status) {
          loadAdminPhotos();
        }
      } catch {
        setIsAdmin(false);
      } finally {
        setAuthChecking(false);
      }
    }
    verifyAdmin();
  }, []);

  async function loadAdminPhotos() {
    const items = await getGalleryItems();
    setPhotos(items);
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('请输入管理员密码');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await adminLogin(password);
      if (success) {
        setIsAdmin(true);
        loadAdminPhotos();
      }
    } catch (err: any) {
      setError(err.message || '密码错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (confirm('确认退出管理员登录吗？')) {
      await adminLogout();
      setIsAdmin(false);
      setPhotos([]);
      setPassword('');
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (confirm('确认要管理员硬删除这件媒体资源吗？此操作将立即从宿主磁盘永久删除。')) {
      try {
        await deleteGalleryItem(itemId);
        // Refresh
        setPhotos(prev => prev.filter(p => p.id !== itemId));
      } catch (err: any) {
        alert(err.message || '删除失败');
      }
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#00516E]/20 border-t-[#00516E] animate-spin" />
          <p className="text-slate-500 text-xs font-semibold">正在验证权限门禁...</p>
        </div>
      </div>
    );
  }

  // Not logged in: Show elegant passcode keybox
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white border border-slate-100 rounded-[32px] p-8 md:p-10 shadow-[0px_20px_50px_rgba(0,0,0,0.03)] text-left"
        >
          <div className="flex justify-between items-center mb-6">
            <Link to="/gallery" className="text-slate-400 hover:text-slate-700 flex items-center gap-1.5 text-xs font-bold transition-colors">
              <ArrowLeft size={16} /> 返回相册
            </Link>
            <Shield size={22} className="text-[#00516E]" />
          </div>

          <header className="mb-8">
            <h2 className="font-heading font-black text-2xl text-slate-800 tracking-tight">管理员登入</h2>
            <p className="text-slate-400 text-xs mt-1.5 font-medium leading-relaxed">请输入由活动筹备委员组提供的管理员密码以执行媒体审计和集中删除权限。</p>
          </header>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">安全锁密码</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入超级管理锁密码"
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl pl-11 pr-4 py-4 text-sm font-semibold text-slate-800 placeholder-slate-400/80 focus:ring-2 focus:ring-[#0077B6]/15 focus:border-[#0077B6] outline-none transition-all"
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold bg-red-50 px-3 py-2 rounded-xl border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00516E] to-[#0077B6] text-white py-4 rounded-2xl font-bold text-sm tracking-wider hover:opacity-95 shadow-lg shadow-[#0077B6]/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                '解锁系统控制台'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Logged in: Render management list
  const imageCount = photos.filter(p => p.media_type === 'image').length;
  const videoCount = photos.filter(p => p.media_type === 'video').length;

  return (
    <div className="space-y-8 pb-12 text-left">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-[10px] tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/15 px-3 py-1 rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            超级管理员：在线
          </div>
          <h2 className="font-heading font-black text-3xl text-slate-800 tracking-tight">相册后台巡检控制台</h2>
          <p className="text-slate-400 text-xs font-medium">查看并强力移除不合规格的共享相片、视频，保障团建相册秩序健康。</p>
        </div>

        <div className="flex gap-3">
          <Link 
            to="/gallery" 
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl text-xs font-bold shadow-sm hover:bg-slate-50 transition-all"
          >
            <Eye size={16} /> 预览前台
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-red-52 hover:bg-red-50 text-red-650 border border-red-500/10 rounded-2xl text-xs font-bold cursor-pointer transition-all"
          >
            <LogOut size={16} /> 登出系统
          </button>
        </div>
      </header>

      {/* Metrics metrics layout */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 p-6 rounded-[24px] shadow-sm flex flex-col justify-between">
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider block mb-1">总计分享资源</span>
          <span className="text-2xl font-black text-slate-800">{photos.length} <span className="text-xs text-slate-400">个</span></span>
        </div>
        <div className="bg-white border border-slate-100 p-6 rounded-[24px] shadow-sm flex flex-col justify-between">
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider block mb-1">图片格式</span>
          <span className="text-2xl font-black text-emerald-600 flex items-center gap-1.5">
            <Image size={20} className="text-emerald-500" />
            {imageCount} <span className="text-xs text-slate-400">张</span>
          </span>
        </div>
        <div className="bg-white border border-slate-100 p-6 rounded-[24px] shadow-sm flex flex-col justify-between">
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider block mb-1">高清视频</span>
          <span className="text-2xl font-black text-blue-600 flex items-center gap-1.5">
            <Video size={20} className="text-blue-550" />
            {videoCount} <span className="text-xs text-slate-400">条</span>
          </span>
        </div>
      </div>

      {/* Database control grids */}
      <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <span className="font-heading font-black text-sm text-slate-700">全体上传日志索引</span>
          <span className="text-[10px] font-bold text-slate-400">提示：管理员可以直接删除任意人的分享内容</span>
        </div>

        {photos.length === 0 ? (
          <div className="p-16 text-center text-slate-400 text-xs font-semibold">
            相册内目前空空如也，前台匿名用户上载后，数据会实时罗列在此。
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/10">
                  <th className="py-4 px-6">媒体缩略图</th>
                  <th className="py-4 px-6">原始文件名/格式</th>
                  <th className="py-4 px-6">大小</th>
                  <th className="py-4 px-6">上传人Token Hash</th>
                  <th className="py-4 px-6">上传时间</th>
                  <th className="py-4 px-6 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {photos.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/40 transition-colors text-xs font-semibold text-slate-700">
                    <td className="py-4 px-6">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
                        <img 
                          src={item.thumbnail_url || item.file_url} 
                          alt="Thumbnail" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 max-w-xs truncate">
                      <div className="font-bold text-slate-800 break-all">{item.original_name}</div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold inline-block mt-1 ${item.media_type === 'video' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {item.media_type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {item.file_size ? (item.file_size / (1024 * 1024)).toFixed(2) + ' MB' : '未知'}
                    </td>
                    <td className="py-4 px-6">
                      <code className="bg-slate-50/80 text-slate-400 text-[9px] px-2 py-1 rounded-md font-mono">
                        {item.uploader_token_hash ? item.uploader_token_hash.substring(0, 16) + '...' : 'seed_fallback'}
                      </code>
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {new Date(item.created_at).toLocaleString('zh-CN')}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all inline-flex items-center justify-center cursor-pointer"
                        title="强制下架"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
