import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface NavCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  className?: string;
  isBordered?: boolean;
  
  // Custom bento-grade styling options
  badge?: string;
  badgeType?: 'default' | 'hot' | 'new' | 'info' | 'live';
  theme?: 'blue' | 'teal' | 'coral' | 'amber' | 'emerald' | 'indigo' | 'cyan' | 'slate' | 'luxury';
  delay?: number;
}

export function NavCard({ 
  icon, 
  title, 
  subtitle, 
  className = "", 
  isBordered,
  badge,
  badgeType = 'default',
  theme = 'blue',
  delay = 0
}: NavCardProps) {
  
  // Map our themes to specific style blocks
  const themeClasses: Record<string, { card: string; iconContainer: string; iconColor: string }> = {
    blue: {
      card: "bg-white shadow-[0px_2px_12px_rgba(0,119,182,0.03)] border-[#0077B6]/10 hover:border-[#0077B6]/30 hover:shadow-[0px_10px_25px_-5px_rgba(0,119,182,0.08)]",
      iconContainer: "bg-[#0077B6]/8 text-[#0077B6] group-hover:bg-[#0077B6] group-hover:text-white",
      iconColor: "text-[#0077B6]"
    },
    teal: {
      card: "bg-white shadow-[0px_2px_12px_rgba(13,148,136,0.03)] border-teal-600/10 hover:border-teal-600/30 hover:shadow-[0px_10px_25px_-5px_rgba(13,148,136,0.08)]",
      iconContainer: "bg-teal-600/8 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
      iconColor: "text-teal-600"
    },
    coral: {
      card: "bg-[#FF7E53]/5 shadow-[0px_2px_12px_rgba(255,126,83,0.04)] border-[#FF7E53]/15 hover:border-[#FF7E53]/40 hover:shadow-[0px_10px_25px_-5px_rgba(255,126,83,0.12)]",
      iconContainer: "bg-[#FF7E53]/10 text-[#FF7E53] group-hover:bg-[#FF7E53] group-hover:text-white",
      iconColor: "text-[#FF7E53]"
    },
    amber: {
      card: "bg-white shadow-[0px_2px_12px_rgba(217,119,6,0.03)] border-amber-600/10 hover:border-amber-600/30 hover:shadow-[0px_10px_25px_-5px_rgba(217,119,6,0.08)]",
      iconContainer: "bg-amber-600/8 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
      iconColor: "text-amber-600"
    },
    emerald: {
      card: "bg-white shadow-[0px_2px_12px_rgba(5,150,105,0.03)] border-emerald-600/10 hover:border-emerald-600/30 hover:shadow-[0px_10px_25px_-5px_rgba(5,150,105,0.08)]",
      iconContainer: "bg-emerald-600/8 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
      iconColor: "text-emerald-600"
    },
    indigo: {
      card: "bg-white shadow-[0px_2px_12px_rgba(79,70,229,0.03)] border-indigo-600/10 hover:border-indigo-600/30 hover:shadow-[0px_10px_25px_-5px_rgba(79,70,229,0.08)]",
      iconContainer: "bg-indigo-600/8 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
      iconColor: "text-indigo-600"
    },
    cyan: {
      card: "bg-white shadow-[0px_2px_12px_rgba(8,145,178,0.03)] border-cyan-600/10 hover:border-cyan-600/30 hover:shadow-[0px_10px_25px_-5px_rgba(8,145,178,0.08)]",
      iconContainer: "bg-cyan-600/8 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white",
      iconColor: "text-cyan-600"
    },
    slate: {
      card: "bg-[#F8FAFC] shadow-[0px_2px_12px_rgba(71,85,105,0.02)] border-slate-200 hover:border-slate-400 hover:shadow-[0px_10px_25px_-5px_rgba(71,85,105,0.06)]",
      iconContainer: "bg-slate-600/8 text-slate-700 group-hover:bg-slate-800 group-hover:text-white",
      iconColor: "text-slate-700"
    },
    luxury: {
      card: "bg-white shadow-[0px_2px_14px_rgba(180,83,9,0.03)] border-[#B45309]/15 hover:border-[#B45309]/40 hover:shadow-[0px_10px_25px_-5px_rgba(180,83,9,0.08)]",
      iconContainer: "bg-[#B45309]/8 text-[#B45309] group-hover:bg-[#B45309] group-hover:text-white",
      iconColor: "text-[#B45309]"
    }
  };

  const selectedTheme = themeClasses[theme] || themeClasses.blue;

  // Render badge with specific aesthetic highlights
  const renderBadge = () => {
    if (!badge) return null;
    if (badgeType === 'live') {
      return (
        <span className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          {badge}
        </span>
      );
    }
    if (badgeType === 'hot') {
      return (
        <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#FF7E53]/10 text-[#FF7E53] border border-[#FF7E53]/20 tracking-wider">
          {badge}
        </span>
      );
    }
    if (badgeType === 'new') {
      return (
        <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-500/10 text-blue-600 border border-blue-500/15 tracking-wider uppercase">
          {badge}
        </span>
      );
    }
    return (
      <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-600">
        {badge}
      </span>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay }}
      className={`relative p-6 rounded-[24px] border flex flex-col justify-between h-full hover:-translate-y-1 transition-all duration-300 cursor-pointer group ${selectedTheme.card} ${isBordered ? 'ring-2 ring-[#FF7E53]/20 ring-offset-2' : ''} ${className}`}
    >
      {renderBadge()}
      
      <div>
        <div className={`mb-5 p-2.5 rounded-2xl w-fit group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm ${selectedTheme.iconContainer}`}>
          {icon}
        </div>
        <h4 className="font-heading font-black text-base text-slate-800 mb-1.5 leading-snug tracking-tight text-left">
          {title}
        </h4>
        <p className="text-slate-500 text-[10px] font-semibold leading-relaxed opacity-90 text-left">
          {subtitle}
        </p>
      </div>

      {/* Decorative arrow helper at the lower right, reveals subtle interactive motion */}
      <div className="mt-4 flex justify-end">
        <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-xs font-bold text-slate-400 group-hover:text-slate-600 flex items-center gap-0.5">
          进入 →
        </span>
      </div>
    </motion.div>
  );
}
