/**
 * Utility to generate client-side JPEG thumbnails to make delivery fast.
 */
export function generateThumbnail(file: File): Promise<string> {
  return new Promise((resolve) => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      resolve('');
      return;
    }

    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const maxDim = 400; // max dimension 400px
            let width = img.width;
            let height = img.height;

            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', 0.8));
              return;
            }
          } catch (err) {
            console.error('Canvas processing error:', err);
          }
          resolve('');
        };
        img.onerror = () => resolve('');
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    } else if (isVideo) {
      try {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        video.playsInline = true;

        const fileURL = URL.createObjectURL(file);
        video.src = fileURL;

        video.onloadeddata = () => {
          // seek forward slightly to fetch an active frame (avoiding initial black frame)
          video.currentTime = 0.5;
        };

        video.onseeked = () => {
          try {
            const canvas = document.createElement('canvas');
            const maxDim = 400;
            let width = video.videoWidth || 400;
            let height = video.videoHeight || 300;

            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', 0.8));
              URL.revokeObjectURL(fileURL);
              return;
            }
          } catch (err) {
            console.error('Video seek canvas draw error:', err);
          }
          URL.revokeObjectURL(fileURL);
          resolve('');
        };

        video.onerror = () => {
          URL.revokeObjectURL(fileURL);
          resolve('');
        };
      } catch (err) {
        console.error('Video canvas loader initialization error:', err);
        resolve('');
      }
    }
  });
}
