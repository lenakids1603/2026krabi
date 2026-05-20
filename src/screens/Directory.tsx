import React from 'react';
import { motion } from 'motion/react';
import { TEAM_MEMBERS } from '../data/teamMembers';
import { EMERGENCY_CONTACTS } from '../data/emergencyContacts';
import { Search, Filter, Activity, Phone, MessageSquare, Briefcase, MapPin, Shield, Landmark } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { MemberCard } from '../components/directory/MemberCard';
import { useDragToScroll } from '../hooks/useDragToScroll';

export default function Directory() {
  const dragScroll = useDragToScroll();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Filter members based on search and active chip
  const filteredMembers = TEAM_MEMBERS.filter(m => {
    // Match group filter
    if (activeFilter !== 'all' && m.group !== activeFilter) return false;

    // Match search query (姓名, 部门)
    const query = search.toLowerCase().trim();
    if (!query) return true;

    return (
      m.name.toLowerCase().includes(query) || 
      m.group.toLowerCase().includes(query) ||
      (m.nameEn && m.nameEn.toLowerCase().includes(query)) ||
      (m.role && m.role.toLowerCase().includes(query)) ||
      (m.roleEn && m.roleEn.toLowerCase().includes(query))
    );
  });

  // Unique groups custom sorted by headcount descending, with BOSS and 亲友团 at the very end
  const groups = ['直播组', '运营', '客服', '行政', '开发', '财务', '采购', 'BOSS', '亲友团'];

  const countByGroup = (group: string) => {
    return TEAM_MEMBERS.filter(m => m.group === group).length;
  };

  return (
    <div className="space-y-8 pb-12 text-left">
      <header className="space-y-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="bg-[#E5EFF1] text-[#1D5E6B] border border-[#1D5E6B]/15 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase mb-1 inline-block shadow-sm">
            CONTACT DIRECTORY
          </span>
        </motion.div>
        <h2 className="font-heading font-black text-4xl text-[#00516E] tracking-tight text-left">临时泰国号码通讯录</h2>
        <p className="text-on-surface-variant max-w-2xl font-medium text-sm leading-relaxed opacity-90 text-left">
          轻松跨国呼叫随队协调人员 & 24小时突发事件应急求助，一键连接沟通无忧。
        </p>
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
          placeholder="按姓名或部门（如直播组、运营）进行快速搜索..."
          className="w-full h-16 pl-14 pr-6 bg-white border border-outline-variant/50 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-sans font-bold text-sm tracking-tight placeholder:opacity-40 text-left"
        />
        <div className="absolute inset-y-3 right-3">
          <div className="h-full px-4 bg-surface-container rounded-xl text-on-surface-variant flex items-center gap-2">
            <Filter size={18} />
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div 
        ref={dragScroll.ref}
        onMouseDown={dragScroll.onMouseDown}
        style={dragScroll.style}
        className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        <Chip 
          label="全部" 
          active={activeFilter === 'all'} 
          onClick={() => setActiveFilter('all')} 
          count={TEAM_MEMBERS.length}
        />
        {groups.map(g => (
          <Chip 
            key={g}
            label={g} 
            active={activeFilter === g} 
            onClick={() => setActiveFilter(g)} 
            count={countByGroup(g)} 
          />
        ))}
      </div>

      {/* Team Member List */}
      <div className="space-y-4">
        <h3 className="font-heading font-black text-xl text-on-surface pl-2 border-l-4 border-primary">
          团队成员 ({filteredMembers.length})
        </h3>
        {filteredMembers.map((member, idx) => (
          <MemberCard key={member.id} member={member} index={idx} />
        ))}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-[2rem] border border-outline-variant/30 text-on-surface-variant/40 text-sm font-bold shadow-sm">
            无搜索匹配的团队成员
          </div>
        )}
      </div>

      {/* Emergency Section */}
      <section className="mt-14 space-y-6">
        <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 animate-pulse">
            <Activity size={22} className="stroke-[2.5]" />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-bold text-2xl text-on-surface text-left">紧急呼叫与求助通道</h3>
            <p className="text-on-surface-variant text-xs font-bold opacity-60 text-left">安全至上：突发人身安全、财物受损或急性医疗状况时一键直达</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EMERGENCY_CONTACTS.map((contact, idx) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-red-50/40 hover:bg-red-50/70 border border-red-100 rounded-[2rem] p-6 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-4 text-left">
                <div className="p-3.5 bg-red-500/10 rounded-2xl text-red-600 flex-shrink-0">
                  {contact.group === '中国大使馆' && <Landmark size={22} />}
                  {contact.group === '旅游警察' && <Shield size={22} />}
                </div>
                <div className="space-y-1 text-left flex-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-500/10 text-red-600 border border-red-500/20">
                    {contact.group}
                  </span>
                  <h4 className="font-heading font-bold text-[17px] text-[#A62626] leading-tight text-left">
                    {contact.name}
                  </h4>
                  <p className="text-xs font-medium text-on-surface-variant opacity-80 leading-relaxed text-left">
                    {contact.role}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between bg-white/80 hover:bg-white border border-red-100 rounded-2xl p-3 pr-2 transition-all duration-300">
                <div className="flex flex-col pl-2 text-left">
                  <span className="text-[10px] font-bold text-red-600/70 uppercase tracking-widest">EMERGENCY LINE</span>
                  <span className="text-base font-sans font-bold text-[#D90429] tracking-tight">{contact.phoneDisplay}</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${contact.phoneRaw}`}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#D90429] text-white shadow-md hover:bg-[#B3001E] active:scale-95 transition-all"
                    title="紧急呼叫"
                  >
                    <Phone size={18} />
                  </a>
                  <a
                    href={`sms:${contact.phoneRaw}`}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm hover:bg-orange-600 active:scale-95 transition-all"
                    title="发送短信"
                  >
                    <MessageSquare size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

interface ChipProps {
  label: string;
  active: boolean;
  count?: number;
  onClick?: () => void;
  key?: any;
}

function Chip({ label, active, count, onClick }: ChipProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 shadow-sm flex items-center gap-2 shrink-0 cursor-pointer",
        active ? "bg-primary text-white shadow-primary/20 scale-105" : "bg-white text-on-surface-variant hover:bg-surface-container border border-outline-variant/30"
      )}
    >
      {label} {count !== undefined && <span className="text-[10px] opacity-60">({count})</span>}
    </button>
  );
}
