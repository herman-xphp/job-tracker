import { memo } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Job } from '../types';
import { iconBtn } from '../styles';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  return (
    <div className="glass-card p-4 relative overflow-hidden">
      <div className="text-sm text-text-muted">{job.company || 'Unknown Company'}</div>
      <div className="font-bold text-base mb-0.5">{job.position || 'Unknown Position'}</div>
      <div className="text-xs text-text-muted mt-2">{job.date}</div>
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-glass-border">
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

export default memo(JobCard);
