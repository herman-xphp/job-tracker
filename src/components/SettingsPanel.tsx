import { useRef, type ChangeEvent } from 'react';
import { Download, Upload } from 'lucide-react';
import type { Job } from '../types';
import { btnSecondary, btnDanger } from '../styles';

interface SettingsPanelProps {
  jobs: Job[];
  setJobs: (updater: Job[] | ((prev: Job[]) => Job[])) => void;
  showToast: (msg: string) => void;
  onResetConfirm: () => void;
}

export default function SettingsPanel({ jobs, setJobs, showToast, onResetConfirm }: SettingsPanelProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleExport() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(jobs));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = 'job-tracker-backup.json';
    a.click();
  }

  function handleImport(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse((ev.target as FileReader).result as string) as unknown;
        if (!Array.isArray(imported)) {
          showToast('File format invalid. Expected a JSON array.');
          return;
        }
        const valid = imported.every(
          (item: unknown) => item && typeof item === 'object' && 'company' in item && 'position' in item
        );
        if (!valid) {
          showToast('Invalid data: each entry must have company and position fields.');
          return;
        }
        setJobs(imported as Job[]);
        showToast(`Successfully imported ${(imported as Job[]).length} applications!`);
      } catch {
        showToast('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <div className="animate-fade-in">
      <div className="glass-card p-8">
        <h3 className="text-lg font-bold mb-2">Data Management</h3>
        <p className="text-text-muted">Backup, restore, or reset your application data.</p>
        <div className="flex gap-4 flex-wrap mt-4">
          <button className={btnSecondary} onClick={handleExport}>
            <Download size={16} className="inline align-middle mr-2" aria-hidden="true" />
            Export JSON Backup
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            aria-label="Import JSON backup file"
          />
          <button className={btnSecondary} onClick={() => fileInputRef.current?.click()}>
            <Upload size={16} className="inline align-middle mr-2" aria-hidden="true" />
            Import JSON Backup
          </button>
          <button className={btnDanger} onClick={onResetConfirm}>
            Delete All Data
          </button>
        </div>
      </div>
    </div>
  );
}
