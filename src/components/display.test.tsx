import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Job } from '../types';
import StatsRow from './StatsRow';
import JobCard from './JobCard';
import JobRow from './JobRow';
import KanbanBoard from './KanbanBoard';
import ListView from './ListView';

describe('StatsRow', () => {
  it('should render total and status counts', () => {
    const summary = { Applied: 3, Interview: 1, Offer: 0, Rejected: 2, 'No Response': 1 } as const;
    render(<StatsRow summary={summary} totalJobs={7} />);
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getAllByText('1')).toHaveLength(2);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});

describe('JobCard', () => {
  const job: Job = { id: '1', company: 'Google', position: 'SWE', date: '2025-01-01', status: 'Applied' };

  it('should render company and position', () => {
    render(<JobCard job={job} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('SWE')).toBeInTheDocument();
  });

  it('should show fallback for missing fields', () => {
    render(<JobCard job={{ id: '2', company: '', position: '', date: '', status: 'Applied' }} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Unknown Company')).toBeInTheDocument();
    expect(screen.getByText('Unknown Position')).toBeInTheDocument();
  });

  it('should call onEdit with job', async () => {
    const onEdit = vi.fn();
    render(<JobCard job={job} onEdit={onEdit} onDelete={() => {}} />);
    await userEvent.click(screen.getByLabelText(/edit/i));
    expect(onEdit).toHaveBeenCalledWith(job);
  });

  it('should call onDelete with id', async () => {
    const onDelete = vi.fn();
    render(<JobCard job={job} onEdit={() => {}} onDelete={onDelete} />);
    await userEvent.click(screen.getByLabelText(/delete/i));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});

describe('JobRow', () => {
  const job: Job = { id: '1', company: 'Meta', position: 'PM', date: '2025-03-15', status: 'Interview' };

  it('should render with status pill', () => {
    render(<JobRow job={job} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Interview')).toBeInTheDocument();
  });

  it('should render company link when link exists', () => {
    const jobWithLink: Job = { ...job, link: 'https://example.com' };
    render(<JobRow job={jobWithLink} onEdit={() => {}} onDelete={() => {}} />);
    const link = screen.getByText('Meta');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });
});

describe('KanbanBoard', () => {
  const jobs: Job[] = [
    { id: '1', company: 'A', position: 'Dev', date: '2025-01-01', status: 'Applied' },
    { id: '2', company: 'B', position: 'QA', date: '2025-01-02', status: 'Applied' },
    { id: '3', company: 'C', position: 'PM', date: '2025-01-03', status: 'Offer' },
  ];

  it('should render all 5 columns', () => {
    render(<KanbanBoard jobs={jobs} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Applied')).toBeInTheDocument();
    expect(screen.getByText('Interview')).toBeInTheDocument();
    expect(screen.getByText('Offer')).toBeInTheDocument();
    expect(screen.getByText('Rejected')).toBeInTheDocument();
    expect(screen.getByText('No Response')).toBeInTheDocument();
  });
});

describe('ListView', () => {
  const jobs: Job[] = [
    { id: '1', company: 'X', position: 'Dev', date: '2025-01-01', status: 'Applied' },
  ];

  it('should render column headers', () => {
    render(<ListView jobs={jobs} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Application Date')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
});
