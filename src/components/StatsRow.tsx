import { memo } from 'react';
import { dotStyles } from '../styles';
import type { StatusSummary } from '../types';

interface StatsRowProps {
  summary: StatusSummary;
  totalJobs: number;
}

function StatsRow({ summary, totalJobs }: StatsRowProps) {
  const statuses = ['Applied', 'Interview', 'Offer', 'Rejected', 'No Response'] as const;

  return (
    <div className="flex gap-4 mb-8 flex-wrap">
      <div className="glass-card flex-1 min-w-[140px] p-5 flex flex-col gap-2">
        <div className="text-xs font-semibold text-text-muted flex items-center gap-2 uppercase tracking-wide">
          <span className={`w-2 h-2 rounded-full inline-block ${dotStyles.total}`} aria-hidden="true"></span>
          Total
        </div>
        <div className="text-3xl font-extrabold">{totalJobs}</div>
      </div>
      {statuses.map((status) => (
        <div key={status} className="glass-card flex-1 min-w-[140px] p-5 flex flex-col gap-2">
          <div className="text-xs font-semibold text-text-muted flex items-center gap-2 uppercase tracking-wide">
            <span className={`w-2 h-2 rounded-full inline-block ${dotStyles[status]}`} aria-hidden="true"></span>
            {status}
          </div>
          <div className="text-3xl font-extrabold">{summary[status] ?? 0}</div>
        </div>
      ))}
    </div>
  );
}

export default memo(StatsRow);
