import { useState, ReactNode } from 'react';
import { NAV_ITEMS } from '../../data/navItems';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-surface">
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white z-[70] shadow-2xl flex flex-col pt-20"
            >
              <div className="absolute top-4 right-4">
                <button onClick={closeMenu} className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="px-6 mb-8">
                <h2 className="font-heading font-bold text-2xl text-primary mb-1">LENAKIDS</h2>
                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-[0.2em]">Retreat 2026</p>
              </div>

              <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                {NAV_ITEMS.map((item) => {
                  const IconComponent = (Icons as any)[item.icon.charAt(0).toUpperCase() + item.icon.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())] || Icons.Circle;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={closeMenu}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group",
                        isActive 
                          ? "bg-primary text-white shadow-lg shadow-primary/20 translate-x-2" 
                          : "text-on-surface-variant hover:bg-surface-container hover:text-primary hover:translate-x-1"
                      )}
                    >
                      <IconComponent size={22} strokeWidth={isActive ? 2.5 : 2} />
                      <span className="font-medium flex-1">{item.label}</span>
                      <ChevronRight size={18} className={cn("opacity-0 transition-opacity", isActive ? "opacity-100" : "group-hover:opacity-40")} />
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-outline-variant/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMenu}
              className="p-2 hover:bg-surface-container rounded-full text-primary transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="font-heading font-bold text-lg md:text-xl text-primary truncate max-w-[240px] xs:max-w-none">
              Lenakids Retreat 2026
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
