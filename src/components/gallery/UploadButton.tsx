import React, { useRef, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { CloudUpload } from 'lucide-react';

interface UploadButtonProps {
  onUpload: (file: File) => void;
}

export function UploadButton({ onUpload }: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onUpload(files[0]);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleButtonClick}
        className="group bg-brand-coral text-white flex items-center gap-3 px-8 py-4 rounded-[1.25rem] font-bold text-sm uppercase tracking-widest shadow-xl shadow-brand-coral/20 transition-all w-fit"
      >
        <CloudUpload size={22} className="group-hover:-translate-y-1 transition-transform" />
        上传照片
      </motion.button>
    </>
  );
}
