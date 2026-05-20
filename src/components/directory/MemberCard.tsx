import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Video, Compass, Headphones, Cpu } from 'lucide-react';
import { TeamMember } from '../../types';
import { cn } from '../../lib/utils';

interface MemberCardProps {
  member: TeamMember;
  index: number;
  key?: any;
}

export function MemberCard({ member, index }: MemberCardProps): React.JSX.Element {
  // Group color and icon mapping
  const getGroupBadge = (group: string) => {
    switch (group) {
      case '直播组':
        return {
          bg: 'bg-[#E76F51]/10 text-[#E76F51] border-[#E76F51]/20',
          icon: <Video size={12} className="text-[#E76F51]" />,
          accentText: 'text-[#E76F51]'
        };
      case '运营组':
        return {
          bg: 'bg-[#2A9D8F]/10 text-[#218276] border-[#2A9D8F]/20',
          icon: <Compass size={12} className="text-[#218276]" />,
          accentText: 'text-[#218276]'
        };
      case '客服组':
        return {
          bg: 'bg-[#457B9D]/10 text-[#2A5270] border-[#457B9D]/20',
          icon: <Headphones size={12} className="text-[#2A5270]" />,
          accentText: 'text-[#2A5270]'
        };
      case '其他':
      default:
        return {
          bg: 'bg-secondary/10 text-secondary border-secondary/20',
          icon: <Cpu size={12} className="text-secondary" />,
          accentText: 'text-secondary'
        };
    }
  };

  const badge = getGroupBadge(member.group);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white p-6 rounded-[2rem] shadow-sm border border-outline-variant/30 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300"
    >
      <div className="flex items-center gap-5 flex-1">
        <div className="relative">
          <img 
            src={member.avatar} 
            alt={member.name} 
            className="w-20 h-20 rounded-full object-cover border-4 border-primary-container/20 group-hover:border-primary-container transition-all bg-surface-container-low" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#2A9D8F] rounded-full border-2 border-white" />
        </div>
        <div className="space-y-1.5 text-left">
          <h3 className="font-heading font-bold text-xl text-on-surface flex items-center gap-2 text-left">
            {member.name} 
            {member.nameEn && (
              <span className="text-sm font-sans font-medium text-on-surface-variant opacity-60 italic">({member.nameEn})</span>
            )}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5", badge.bg)}>
              {badge.icon} {member.group}
            </span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">
              {member.role} {member.roleEn ? `/ ${member.roleEn}` : ''}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:min-w-[340px]">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
          <div className="flex flex-col pl-2 text-left">
            <span className={cn("text-[10px] font-bold uppercase tracking-widest", badge.accentText)}>TH Mobile</span>
            <span className="text-base font-sans font-bold text-on-surface tracking-tight">{member.phoneDisplay}</span>
          </div>
          <div className="flex gap-2">
            <a 
              href={`tel:${member.phoneRaw}`}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-white shadow-lg hover:brightness-110 active:scale-95 transition-all text-sm font-bold"
              title="呼叫 电话"
            >
              <Phone size={20} />
            </a>
            <a 
              href={`sms:${member.phoneRaw}`}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#E76F51] text-white shadow-md hover:brightness-110 active:scale-95 transition-all text-sm font-bold"
              title="发送 短信"
            >
              <MessageSquare size={20} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
