import { motion } from 'motion/react';
import { TEAM_MEMBERS } from '@/src/constants';
import { Phone, MessageSquare, Search, Filter, Info, Users, Briefcase, UserCircle, PhoneCall, History, Activity } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

export default function Directory() {
  const [search, setSearch] = useState('');

  const filteredMembers = TEAM_MEMBERS.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.role.toLowerCase().includes(search.toLowerCase()) ||
    m.nameEn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <header className="flex items-center justify-between">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading font-bold text-3xl text-primary tracking-tight">团队通讯录</motion.h2>
        <button className="p-3 bg-white shadow-md rounded-2xl text-on-surface-variant hover:text-primary transition-all active:scale-95 border border-outline-variant/30">
            <History size={20} />
        </button>
      </header>

      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline-variant group-focus-within:text-primary transition-colors">
          <Search size={22} strokeWidth={2.5} />
        </div>
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索成员、部门或职位..."
          className="w-full h-16 pl-14 pr-6 bg-white border border-outline-variant/50 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-sans font-bold text-sm tracking-tight placeholder:opacity-40"
        />
        <div className="absolute inset-y-3 right-3">
             <button className="h-full px-4 bg-surface-container rounded-xl text-on-surface-variant hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                <Filter size={18} />
             </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
        <Chip label="全部" active />
        <Chip label="领队" count={1} />
        <Chip label="行政" count={1} />
        <Chip label="成员" count={1} />
      </div>

      {/* Member List */}
      <div className="space-y-4">
        {filteredMembers.map((member, idx) => (
          <motion.div 
            key={member.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-white p-6 rounded-[2rem] shadow-sm border border-outline-variant/30 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300"
          >
            <div className="flex items-center gap-5 flex-1">
              <div className="relative">
                  <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full object-cover border-4 border-primary-container/20 group-hover:border-primary-container transition-all" />
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-xl text-on-surface flex items-center gap-2">
                    {member.name} 
                    <span className="text-sm font-sans font-medium text-on-surface-variant opacity-60 italic">({member.nameEn})</span>
                </h3>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60 flex items-center gap-2">
                   {member.type === 'lead' ? <Briefcase size={12} className="text-secondary" /> : <Users size={12} />} {member.role} / {member.roleEn}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:min-w-[340px]">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                    <div className="flex flex-col pl-2">
                        <span className={cn("text-[10px] font-bold uppercase tracking-widest", member.type === 'lead' ? 'text-secondary' : 'text-primary')}>TH Destination</span>
                        <span className="text-base font-sans font-bold text-on-surface tracking-tight">{member.phone}</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-white shadow-lg hover:brightness-110 active:scale-90 transition-all">
                            <Phone size={20} />
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container shadow-md hover:brightness-105 active:scale-90 transition-all">
                            <MessageSquare size={20} />
                        </button>
                    </div>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Emergency Section */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="mt-12 p-6 md:p-8 bg-error-container text-on-error-container rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 shadow-xl border border-error/20"
      >
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-error shadow-2xl relative animate-pulse flex-shrink-0">
            <Activity size={40} strokeWidth={3} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="font-heading font-bold text-xl mb-1 tracking-tight">紧急医疗支援 / Emergency Medical</h4>
          <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-3">甲米曼谷医院 (Bangkok Hospital Krabi) - 24小时救援</p>
          <div className="flex flex-col sm:flex-row items-center md:items-baseline justify-center md:justify-start gap-2 md:gap-4">
              <span className="text-2xl font-sans font-black flex items-center gap-2 whitespace-nowrap">
                 <PhoneCall size={20} /> 1719
              </span>
              <span className="text-lg opacity-60 hidden sm:inline">或</span>
              <span className="text-xl font-bold font-sans whitespace-nowrap">+66 75 626 777</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Chip({ label, active, count }: any) {
  return (
    <button className={cn(
      "px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 shadow-sm flex items-center gap-2",
      active ? "bg-primary text-white shadow-primary/20" : "bg-white text-on-surface-variant hover:bg-surface-container border border-outline-variant/30"
    )}>
      {label} {count && <span className="text-[10px] opacity-60">({count})</span>}
    </button>
  );
}
