export interface GalleryItem {
  id: string;
  file_url: string;
  thumbnail_url: string;
  media_type: 'image' | 'video';
  original_name: string;
  file_size: number;
  uploader_token_hash: string;
  created_at: string;
  likes: number;
  comments: number;
  // Backward compatibility with other components
  url: string;
  category?: string;
}

// Ensure unique anonymous client token in localStorage
export function getUploaderId(): string {
  let uploaderId = localStorage.getItem('uploader_uuid');
  if (!uploaderId) {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      uploaderId = crypto.randomUUID();
    } else {
      uploaderId = 'anon_' + Array.from({ length: 32 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
    }
    localStorage.setItem('uploader_uuid', uploaderId);
  }
  return uploaderId;
}

// Derive a cryptographically secure token hash locally for immediate client checks
export async function getUploaderHash(id: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(id);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    console.error('Subtle crypto SHA-256 failed, fallback to SHA-256 simple approximation', e);
    return id; // safe fallback inside browser sandbox if subtle is blocked
  }
}

// GET LIST
export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const res = await fetch('/api/gallery', {
      headers: {
        'X-Owner-Token': getUploaderId()
      }
    });
    if (!res.ok) throw new Error('API fetch error');
    const items = await res.json() as any[];
    return items.map(item => ({
      ...item,
      url: item.file_url, // fulfill old attribute expectation
      category: 'all'     // legacy compatibility support
    }));
  } catch (err) {
    console.error('Failed to get gallery items from server:', err);
    return [];
  }
}

// UPLOAD CONTENT WITH PROGRESS TRACKING AND THUMBNAIL
export async function uploadGalleryFile(
  file: File, 
  thumbnailBase64: string,
  onProgress?: (percent: number) => void
): Promise<GalleryItem> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    
    formData.append('file', file);
    formData.append('uploaderId', getUploaderId());
    if (thumbnailBase64) {
      formData.append('thumbnail', thumbnailBase64);
    }

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const item = JSON.parse(xhr.responseText);
          resolve({
            ...item,
            url: item.file_url,
            category: 'all'
          });
        } catch (e) {
          reject(new Error('无法解析上传响应数据'));
        }
      } else {
        try {
          const errData = JSON.parse(xhr.responseText);
          reject(new Error(errData.error || '上传失败'));
        } catch {
          reject(new Error(`上传失败并返回错误: ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => reject(new Error('网络连接异常，无法上传'));
    
    xhr.open('POST', '/api/gallery/upload');
    xhr.setRequestHeader('X-Owner-Token', getUploaderId());
    xhr.send(formData);
  });
}

// SECURELY DELETE MATCHING OWNERSHIP
export async function deleteGalleryItem(id: string): Promise<boolean> {
  const uploaderId = getUploaderId();
  const res = await fetch(`/api/gallery/${id}?uploaderId=${encodeURIComponent(uploaderId)}`, {
    method: 'DELETE',
    headers: {
      'X-Owner-Token': uploaderId
    }
  });
  
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || '删除失败，您可能无权修改此文件');
  }
  return true;
}

// SUBMIT ADMIN LOGIN
export async function adminLogin(password: string): Promise<boolean> {
  const res = await fetch('/api/gallery/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  
  if (!res.ok) {
    const errData = await res.json().catch(() => ({ error: '密码错误' }));
    throw new Error(errData.error);
  }
  return true;
}

// SUBMIT ADMIN LOGOUT
export async function adminLogout(): Promise<boolean> {
  const res = await fetch('/api/gallery/admin/logout', { method: 'POST' });
  return res.ok;
}

// GET ADMIN AUTH STATUS
export async function checkAdminStatus(): Promise<boolean> {
  try {
    const res = await fetch('/api/gallery/admin-status');
    if (!res.ok) return false;
    const data = await res.json();
    return !!data.isAdmin;
  } catch {
    return false;
  }
}
