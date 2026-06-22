import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Video, Compass, Headphones, Cpu, Shield, Briefcase, Package, Users } from 'lucide-react';
import { TeamMember } from '../../types';
import { cn } from '../../lib/utils';
import { SymbolicAvatar } from './SymbolicAvatar';

interface MemberCardProps {
  member: TeamMember;
  index: number;
  key?: any;
}

export function MemberCard({ member, index }: MemberCardProps): React.JSX.Element {
  // Group color and icon mapping
  const getGroupBadge = (group: string) => {
    switch (group) {
      case 'BOSS':
        return {
          bg: 'bg-[#1C2541]/10 text-[#1C2541] border-[#1C2541]/20',
          icon: <Shield size={12} className="text-[#1C2541]" />,
          accentText: 'text-[#1C2541]'
        };
      case '直播组':
        return {
          bg: 'bg-[#D90429]/10 text-[#D90429] border-[#D90429]/20',
          icon: <Video size={12} className="text-[#D90429]" />,
          accentText: 'text-[#D90429]'
        };
      case '运营':
        return {
          bg: 'bg-[#2A9D8F]/10 text-[#218276] border-[#2A9D8F]/20',
          icon: <Compass size={12} className="text-[#218276]" />,
          accentText: 'text-[#218276]'
        };
      case '客服':
        return {
          bg: 'bg-[#457B9D]/10 text-[#2A5270] border-[#457B9D]/20',
          icon: <Headphones size={12} className="text-[#2A5270]" />,
          accentText: 'text-[#2A5270]'
        };
      case '开发':
        return {
          bg: 'bg-[#0077B6]/10 text-[#0077B6] border-[#0077B6]/20',
          icon: <Cpu size={12} className="text-[#0077B6]" />,
          accentText: 'text-[#0077B6]'
        };
      case '行政':
        return {
          bg: 'bg-[#F77F00]/10 text-[#D62828] border-[#F77F00]/20',
          icon: <Briefcase size={12} className="text-[#D62828]" />,
          accentText: 'text-[#D62828]'
        };
      case '财务':
        return {
          bg: 'bg-[#D4AF37]/10 text-[#AA7C11] border-[#D4AF37]/20',
          icon: <Shield size={12} className="text-[#AA7C11]" />,
          accentText: 'text-[#AA7C11]'
        };
      case '采购':
        return {
          bg: 'bg-[#588157]/10 text-[#344E41] border-[#588157]/20',
          icon: <Package size={12} className="text-[#344E41]" />,
          accentText: 'text-[#344E41]'
        };
      case '亲友团':
        return {
          bg: 'bg-[#F72585]/10 text-[#7209B7] border-[#F72585]/20',
          icon: <Users size={12} className="text-[#7209B7]" />,
          accentText: 'text-[#7209B7]'
        };
      default:
        return {
          bg: 'bg-secondary/10 text-secondary border-secondary/20',
          icon: <Cpu size={12} className="text-secondary" />,
          accentText: 'text-secondary'
        };
    }
  };

  const badge = getGroupBadge(member.group);
  const displayName = member.name;
  const hasPhone = Boolean(member.phoneRaw);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white p-6 rounded-[2rem] shadow-sm border border-outline-variant/30 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300"
    >
      <div className="flex items-center gap-5 flex-1">
        <div className="relative shrink-0">
          <SymbolicAvatar 
            gender={member.gender} 
            group={member.group} 
            name={member.name} 
            className="w-20 h-20 rounded-full border-2 border-primary-container/20 group-hover:border-primary-container hover:scale-105 transition-all duration-300" 
          />
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#2A9D8F] rounded-full border-2 border-white" />
        </div>
        <div className="space-y-1.5 text-left">
          <h3 className="font-heading font-extrabold text-2xl text-on-surface text-left">
            {displayName} 
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5", badge.bg)}>
              {badge.icon} {member.group}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:min-w-[340px]">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
          <div className="flex flex-col pl-2 text-left">
            <span className={cn("text-[10px] font-bold uppercase tracking-widest", badge.accentText)}>TH Mobile</span>
            <span className={cn("text-base font-sans font-bold tracking-tight", hasPhone ? "text-on-surface" : "text-on-surface-variant/50")}>{member.phoneDisplay}</span>
          </div>
          {hasPhone ? (
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
          ) : (
            <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-on-surface-variant/10 text-on-surface-variant/60 border border-outline-variant/30">
              待登记
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
