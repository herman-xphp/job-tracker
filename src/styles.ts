import type { JobStatus } from './types';

export const pillStyles: Record<JobStatus, string> = {
  Applied: 'bg-status-applied/15 text-[#60a5fa] border border-status-applied/30',
  Interview: 'bg-status-interview/15 text-[#fbbf24] border border-status-interview/30',
  Offer: 'bg-status-offer/15 text-[#34d399] border border-status-offer/30',
  Rejected: 'bg-status-rejected/15 text-[#f87171] border border-status-rejected/30',
  'No Response': 'bg-status-no-response/15 text-[#94a3b8] border border-status-no-response/30',
};

export const dotStyles: Record<JobStatus | 'total', string> = {
  Applied: 'bg-status-applied shadow-[0_0_8px_var(--color-status-applied)]',
  Interview: 'bg-status-interview shadow-[0_0_8px_var(--color-status-interview)]',
  Offer: 'bg-status-offer shadow-[0_0_8px_var(--color-status-offer)]',
  Rejected: 'bg-status-rejected shadow-[0_0_8px_var(--color-status-rejected)]',
  'No Response': 'bg-status-no-response shadow-[0_0_8px_var(--color-status-no-response)]',
  total: 'bg-status-total shadow-[0_0_8px_var(--color-status-total)]',
};

export const btnBase = 'px-6 py-3 rounded-xl border-none font-semibold font-[inherit] cursor-pointer transition-all duration-200 text-[0.95rem]';
export const btnPrimary = `${btnBase} bg-primary text-white hover:bg-primary-hover hover:-translate-y-0.5`;
export const btnSecondary = `${btnBase} bg-white/10 text-text-main border border-glass-border hover:bg-white/15`;
export const btnDanger = `${btnBase} bg-danger/20 text-[#f87171] border border-danger/30 hover:bg-danger/30`;
export const btnGhost = `${btnBase} bg-transparent text-text-muted hover:text-text-main hover:bg-white/5`;
export const btnGlow = 'shadow-[0_4px_15px_var(--color-accent-glow)]';

export const iconBtn = 'bg-white/5 border border-glass-border text-text-main w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white/10 hover:scale-110';

export const inputBase = 'bg-black/20 border border-glass-border text-text-main px-4 py-3 rounded-xl font-[inherit] text-[0.95rem] transition-all duration-200 focus:outline-none focus:border-primary focus:bg-black/30 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)]';
