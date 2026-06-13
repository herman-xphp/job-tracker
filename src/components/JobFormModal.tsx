import { useState, type ChangeEvent, type FormEvent } from 'react';
import { STATUS_OPTIONS, MAX_FIELD_LENGTHS } from '../constants';
import type { Job, JobFormData } from '../types';
import { btnPrimary, btnGhost, btnGlow, inputBase } from '../styles';
import Modal from './Modal';

interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: JobFormData) => void;
  editingJob: Job | null;
}

function getDefaultForm(): JobFormData {
  return {
    date: new Date().toISOString().split('T')[0],
    position: '',
    company: '',
    link: '',
    status: 'Applied',
    followUp: '',
    notes: '',
  };
}

const labelClass = 'text-xs font-semibold text-text-muted uppercase tracking-wide';

export default function JobFormModal({ isOpen, onClose, onSave, editingJob }: JobFormModalProps) {
  const [formData, setFormData] = useState<JobFormData>(
    editingJob
      ? { company: editingJob.company, position: editingJob.position, date: editingJob.date, status: editingJob.status, link: editingJob.link ?? '', followUp: editingJob.followUp ?? '', notes: editingJob.notes ?? '' }
      : getDefaultForm()
  );

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const maxLen = MAX_FIELD_LENGTHS[name];
    if (maxLen && value.length > maxLen) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingJob ? 'Edit Application' : 'New Application'}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="form-company" className={labelClass}>Company *</label>
          <input
            id="form-company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            maxLength={MAX_FIELD_LENGTHS.company}
            placeholder="Google, Meta, etc."
            className={inputBase}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="form-position" className={labelClass}>Position / Role *</label>
          <input
            id="form-position"
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            maxLength={MAX_FIELD_LENGTHS.position}
            placeholder="Frontend Engineer"
            className={inputBase}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <div className="flex flex-col gap-1">
            <label htmlFor="form-date" className={labelClass}>Application Date *</label>
            <input
              id="form-date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className={inputBase}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="form-status" className={labelClass}>Status</label>
            <select id="form-status" name="status" value={formData.status} onChange={handleChange} className={inputBase}>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="form-link" className={labelClass}>Job Link (Optional)</label>
          <input
            id="form-link"
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            maxLength={MAX_FIELD_LENGTHS.link}
            placeholder="https://..."
            className={inputBase}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="form-notes" className={labelClass}>
            Additional Notes ({formData.notes.length}/{MAX_FIELD_LENGTHS.notes})
          </label>
          <textarea
            id="form-notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            maxLength={MAX_FIELD_LENGTHS.notes}
            placeholder="Recruitment process notes..."
            className={`${inputBase} min-h-[80px] resize-y`}
          />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button type="button" className={btnGhost} onClick={onClose}>Cancel</button>
          <button type="submit" className={`${btnPrimary} ${btnGlow}`}>Save</button>
        </div>
      </form>
    </Modal>
  );
}
