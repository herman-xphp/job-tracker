import { memo } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Job } from '../types';
import { iconBtn, pillStyles } from '../styles';

interface JobRowProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

function JobRow({ job, onEdit, onDelete }: JobRowProps) {
  return (
    <div className="glass-card grid grid-cols-[2fr_1fr_1fr_100px] items-center px-6 py-4 min-w-[700px]">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-white/10 to-white/5 border border-glass-border rounded-xl flex items-center justify-center font-bold text-lg shrink-0" aria-hidden="true">
          {job.company?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <div>
          <div className="font-bold text-base mb-0.5">{job.position || 'Unknown Position'}</div>
          <div className="text-sm text-text-muted">
            {job.link ? (
              <a className="text-text-muted" href={job.link} target="_blank" rel="noopener noreferrer">
                {job.company || 'Unknown Company'}
              </a>
            ) : (
              job.company || 'Unknown Company'
            )}
          </div>
        </div>
      </div>
      <div className="text-text-muted text-sm">{job.date}</div>
      <div>
        <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide inline-block ${pillStyles[job.status]}`}>
          {job.status}
        </span>
      </div>
      <div className="flex gap-2 justify-end">
        <button className={iconBtn} onClick={() => onEdit(job)} aria-label={`Edit ${job.company} application`}>
          <Pencil size={14} aria-hidden="true" />
        </button>
        <button className={`${iconBtn} text-danger`} onClick={() => onDelete(job.id)} aria-label={`Delete ${job.company} application`}>
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default memo(JobRow);
