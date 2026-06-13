import { memo } from 'react';
import { Sparkles, LayoutDashboard, Settings } from 'lucide-react';
import type { TabName } from '../types';

interface SidebarProps {
  currentTab: TabName;
  setCurrentTab: (tab: TabName) => void;
  successRate: number;
}

const navBtnBase = 'bg-transparent border-none flex items-center gap-4 p-4 rounded-xl text-base font-semibold cursor-pointer transition-all duration-200 text-left';

function Sidebar({ currentTab, setCurrentTab, successRate }: SidebarProps) {
  return (
    <aside className="w-[260px] border-r border-glass-border flex flex-col p-8 hidden md:block">
      <div className="flex items-center gap-3 mb-12">
        <div className="bg-gradient-to-br from-primary to-purple-500 w-9 h-9 flex items-center justify-center rounded-[10px] text-lg" aria-hidden="true">
          <Sparkles size={18} />
        </div>
        <h2 className="text-xl font-bold tracking-tight">JobTracker</h2>
      </div>
      <nav className="flex flex-col gap-2 flex-1" aria-label="Main navigation">
        <button
          className={`${navBtnBase} ${currentTab === 'dashboard' ? 'bg-primary/15 text-primary border border-primary/30' : 'text-text-muted hover:bg-white/5 hover:text-text-main'}`}
          onClick={() => setCurrentTab('dashboard')}
          aria-current={currentTab === 'dashboard' ? 'page' : undefined}
        >
          <LayoutDashboard size={20} aria-hidden="true" /> <span>Overview</span>
        </button>
        <button
          className={`${navBtnBase} ${currentTab === 'settings' ? 'bg-primary/15 text-primary border border-primary/30' : 'text-text-muted hover:bg-white/5 hover:text-text-main'}`}
          onClick={() => setCurrentTab('settings')}
          aria-current={currentTab === 'settings' ? 'page' : undefined}
        >
          <Settings size={20} aria-hidden="true" /> <span>Settings</span>
        </button>
      </nav>
      <div className="mt-auto pt-8 border-t border-glass-border">
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-extrabold text-text-main">{successRate}%</span>
          <span className="text-xs text-text-muted uppercase tracking-widest">Success Rate</span>
          <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden" role="progressbar" aria-valuenow={successRate} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-[width] duration-1000" style={{ width: `${successRate}%` }}></div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default memo(Sidebar);
