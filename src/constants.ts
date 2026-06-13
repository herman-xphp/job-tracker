export const STATUS_OPTIONS = ['Applied', 'Interview', 'Offer', 'Rejected', 'No Response'] as const;

export const STORAGE_KEY = 'job-tracker-data';

export const MAX_FIELD_LENGTHS: Record<string, number> = {
  company: 100,
  position: 100,
  link: 2048,
  notes: 2000,
  followUp: 1000,
};

export const TOAST_DURATION = 3000;
