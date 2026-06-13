import { Rocket } from 'lucide-react';
import { btnPrimary, btnGlow } from '../styles';

interface EmptyStateProps {
  onAdd: () => void;
}

export default function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="glass-card text-center p-8 px-16 flex flex-col items-center justify-center min-h-[300px]">
      <Rocket size={48} className="text-primary mb-4 animate-float-icon" aria-hidden="true" />
      <h3 className="text-xl font-bold">No applications yet</h3>
      <p className="text-text-muted mt-2">
        Start your career journey by adding your first application.
      </p>
      <button className={`${btnPrimary} ${btnGlow} mt-4`} onClick={onAdd}>
        Add Now
      </button>
    </div>
  );
}
