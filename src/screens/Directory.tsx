import React from 'react';
import { motion } from 'motion/react';
import { TEAM_MEMBERS } from '../data/teamMembers';
import { EMERGENCY_CONTACTS } from '../data/emergencyContacts';
import { Search, Filter, History, Activity, PhoneCall } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { MemberCard } from '../components/directory/MemberCard';
import { makePhoneCall } from '../lib/phone';

export default function Directory() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'lead' | 'admin' | 'member'>('all');

  const filteredMembers = TEAM_MEMBERS.filter(m => {
    // Math filter type
    if (activeFilter !== 'all' && m.type !== activeFilter) return false;

    // Match search query
    return (
      m.name.toLowerCase().includes(search.toLowerCase()) || 
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.nameEn.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Count helper functions
  const countByType = (type: 'lead' | 'admin' | 'member') => {
    return TEAM_MEMBERS.filter(m => m.type === type).length;
  };

  return (
    <div className="space-y-8 pb-12 text-left">
      <header className="flex items-center justify-between">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading font-bold text-3xl text-primary tracking-tight">团队通讯录</motion.h2>
        <button className="p-3 bg-white shadow-md rounded-2xl text-on-surface-variant hover:text-primary transition-all active:scale-95 border border-outline-variant/30">
            <History size={20} />
        </button>
      </header>

      {/* Search Bar */}
      <div className="relative group text-left">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline-variant group-focus-within:text-primary transition-colors">
          <Search size={22} strokeWidth={2.5} />
        </div>
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索成员、部门或职位..."
          className="w-full h-16 pl-14 pr-6 bg-white border border-outline-variant/50 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-sans font-bold text-sm tracking-tight placeholder:opacity-40 text-left"
        />
        <div className="absolute inset-y-3 right-3">
             <button className="h-full px-4 bg-surface-container rounded-xl text-on-surface-variant hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                <Filter size={18} />
             </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
        <Chip 
          label="全部" 
          active={activeFilter === 'all'} 
          onClick={() => setActiveFilter('all')} 
        />
        <Chip 
          label="领队" 
          active={activeFilter === 'lead'} 
          onClick={() => setActiveFilter('lead')} 
          count={countByType('lead')} 
        />
        <Chip 
          label="行政" 
          active={activeFilter === 'admin'} 
          onClick={() => setActiveFilter('admin')} 
          count={countByType('admin')} 
        />
        <Chip 
          label="成员" 
          active={activeFilter === 'member'} 
          onClick={() => setActiveFilter('member')} 
          count={countByType('member')} 
        />
      </div>

      {/* Member List */}
      <div className="space-y-4">
        {filteredMembers.map((member, idx) => (
          <MemberCard key={member.id} member={member} index={idx} />
        ))}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12 text-on-surface-variant/40 text-sm font-bold">
            无搜索匹配成员
          </div>
        )}
      </div>

      {/* Emergency Section */}
      {EMERGENCY_CONTACTS.map((contact) => (
        <motion.div 
          key={contact.id}
          whileHover={{ scale: 1.02 }}
          className="mt-12 p-6 md:p-8 bg-error-container text-on-error-container rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 shadow-xl border border-error/20"
        >
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-error shadow-2xl relative animate-pulse flex-shrink-0">
              <Activity size={40} strokeWidth={3} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-heading font-bold text-xl mb-1 tracking-tight text-left">{contact.title}</h4>
            <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-3 text-left">{contact.subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center md:items-baseline justify-center md:justify-start gap-2 md:gap-4">
                <button 
                  onClick={() => makePhoneCall(contact.phoneDirect)}
                  className="text-2xl font-sans font-black flex items-center gap-2 whitespace-nowrap hover:underline text-left bg-transparent border-none p-0 cursor-pointer"
                >
                   <PhoneCall size={20} /> {contact.phoneDirect}
                </button>
                {contact.phoneAlt && (
                  <>
                    <span className="text-lg opacity-60 hidden sm:inline">或</span>
                    <button 
                      onClick={() => makePhoneCall(contact.phoneAlt!)}
                      className="text-xl font-bold font-sans whitespace-nowrap hover:underline bg-transparent border-none p-0 cursor-pointer text-left"
                    >
                      {contact.phoneAlt}
                    </button>
                  </>
                )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

interface ChipProps {
  label: string;
  active: boolean;
  count?: number;
  onClick?: () => void;
}

function Chip({ label, active, count, onClick }: ChipProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 shadow-sm flex items-center gap-2 shrink-0 cursor-pointer",
        active ? "bg-primary text-white shadow-primary/20" : "bg-white text-on-surface-variant hover:bg-surface-container border border-outline-variant/30"
      )}
    >
      {label} {count !== undefined && <span className="text-[10px] opacity-60">({count})</span>}
    </button>
  );
}
