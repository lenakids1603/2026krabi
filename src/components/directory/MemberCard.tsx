import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Users, Phone, MessageSquare } from 'lucide-react';
import { TeamMember } from '../../types';
import { cn } from '../../lib/utils';
import { makePhoneCall } from '../../lib/phone';

interface MemberCardProps {
  member: TeamMember;
  index: number;
  key?: any;
}

export function MemberCard({ member, index }: MemberCardProps): React.JSX.Element {
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
            className="w-20 h-20 rounded-full object-cover border-4 border-primary-container/20 group-hover:border-primary-container transition-all" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
        </div>
        <div className="space-y-1">
          <h3 className="font-heading font-bold text-xl text-on-surface flex items-center gap-2 text-left">
            {member.name} 
            <span className="text-sm font-sans font-medium text-on-surface-variant opacity-60 italic">({member.nameEn})</span>
          </h3>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60 flex items-center gap-2 text-left">
            {member.type === 'lead' ? <Briefcase size={12} className="text-secondary" /> : <Users size={12} />} {member.role} / {member.roleEn}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:min-w-[340px]">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
          <div className="flex flex-col pl-2 text-left">
            <span className={cn("text-[10px] font-bold uppercase tracking-widest", member.type === 'lead' ? 'text-secondary' : 'text-primary')}>TH Destination</span>
            <span className="text-base font-sans font-bold text-on-surface tracking-tight">{member.phone}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => makePhoneCall(member.phone)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-white shadow-lg hover:brightness-110 active:scale-90 transition-all text-sm font-bold"
              title="呼叫"
            >
              <Phone size={20} />
            </button>
            <button 
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container shadow-md hover:brightness-105 active:scale-90 transition-all text-sm font-bold"
              title="短信"
            >
              <MessageSquare size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
