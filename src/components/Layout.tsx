import { NavItem } from '@/src/types';
import { NAV_ITEMS } from '@/src/constants';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import * as Icons from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-outline-variant/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-surface-container rounded-full text-primary transition-colors">
              <Menu size={24} />
            </button>
            <h1 className="font-heading font-bold text-xl text-primary truncate max-w-[200px] md:max-w-none">
              LENAKIDS 2026 公司团建
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkkvc0ScJw1zr2Q8fqNMGXwIeeecigpm7XXAtWLXtmq-gnjcQS78qToY2RJRiz-gG99OXbyRtoJiH-xHXUiWXEXZ_U1trmdUZmEZaL-Uhk6Z-ikizd99GWAA143j8D3MM_zo0F3_yZiRUFQ4j07iOBSScU-Pqxt72P-gHwiqRp_V4gCQLvEnePT4nnmIUzoFIDg8dpN8hEDou9hhnmt-erBh02GndeuZ3dKIN-1cTDjj0f2XJ4ydaj65lJbJzs4oo9LISYdsOan7g" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-outline-variant/30 px-2 py-3 md:hidden rounded-t-2xl shadow-[0_-4px_20px_rgba(0,119,182,0.1)]">
        <div className="flex justify-around items-center">
          {NAV_ITEMS.map((item) => {
            const IconComponent = (Icons as any)[item.icon.charAt(0).toUpperCase() + item.icon.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())] || Icons.Circle;
            const isActive = location.pathname === item.path;

            return (
              <Link 
                key={item.id}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all duration-300",
                  isActive ? "text-primary" : "text-on-surface-variant hover:text-primary"
                )}
              >
                <div className={cn(
                  "p-2 rounded-full transition-all duration-300",
                  isActive ? "bg-primary/10" : ""
                )}>
                    <IconComponent size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-medium tracking-tight font-sans">
                  {item.label}
                </span>
                {isActive && <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
