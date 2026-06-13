import { memo } from 'react';
import { STATUS_OPTIONS } from '../constants';
import type { Job } from '../types';
import { dotStyles } from '../styles';
import JobCard from './JobCard';

interface KanbanBoardProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

function KanbanBoard({ jobs, onEdit, onDelete }: KanbanBoardProps) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 animate-fade-in" role="region" aria-label="Kanban board">
      {STATUS_OPTIONS.map((status) => {
        const statusJobs = jobs.filter((j) => j.status === status);
        return (
          <div key={status} className="min-w-[280px] flex-1 flex flex-col gap-4">
            <div className="font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
              <span className={`w-2 h-2 rounded-full inline-block ${dotStyles[status]}`} aria-hidden="true"></span>
              {status}
              <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs">{statusJobs.length}</span>
            </div>
            <div className="flex flex-col gap-3">
              {statusJobs.map((job) => (
                <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(KanbanBoard);
