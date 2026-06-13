import { memo } from 'react';
import type { Job } from '../types';
import JobRow from './JobRow';

interface ListViewProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

function ListView({ jobs, onEdit, onDelete }: ListViewProps) {
  return (
    <div className="flex flex-col gap-2 animate-fade-in" role="table" aria-label="Job applications list">
      <div className="grid grid-cols-[2fr_1fr_1fr_100px] px-6 pb-2 text-text-muted text-xs font-semibold uppercase tracking-wide" role="row">
        <div role="columnheader">Company &amp; Position</div>
        <div role="columnheader">Application Date</div>
        <div role="columnheader">Status</div>
        <div role="columnheader">Actions</div>
      </div>
      <div className="flex flex-col gap-2 overflow-x-auto [-webkit-overflow-scrolling:touch] pb-4">
        {jobs.map((job) => (
          <JobRow key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export default memo(ListView);
