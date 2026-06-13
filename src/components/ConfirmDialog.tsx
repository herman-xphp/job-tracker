import Modal from './Modal';
import { btnGhost, btnDanger } from '../styles';

interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmDialog({ isOpen, onConfirm, onCancel, title, message }: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title ?? 'Confirm'}>
      <p className="text-text-muted mb-6">{message}</p>
      <div className="flex justify-end gap-4 mt-4">
        <button type="button" className={btnGhost} onClick={onCancel}>Cancel</button>
        <button type="button" className={btnDanger} onClick={onConfirm}>Confirm</button>
      </div>
    </Modal>
  );
}
