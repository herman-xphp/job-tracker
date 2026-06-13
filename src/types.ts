import { STATUS_OPTIONS } from './constants';

export type JobStatus = (typeof STATUS_OPTIONS)[number];

export interface Job {
  id: string;
  company: string;
  position: string;
  date: string;
  status: JobStatus;
  link?: string;
  followUp?: string;
  notes?: string;
}

export interface JobFormData {
  company: string;
  position: string;
  date: string;
  status: JobStatus;
  link: string;
  followUp: string;
  notes: string;
}

export interface ConfirmAction {
  title: string;
  message: string;
  onConfirm: () => void;
}

export type SortOption =
  | 'date-desc'
  | 'date-asc'
  | 'company-asc'
  | 'company-desc'
  | 'position-asc';

export type TabName = 'dashboard' | 'settings';
export type ViewMode = 'list' | 'board';
export type StatusSummary = Record<JobStatus, number>;
