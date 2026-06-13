import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toast from './Toast';
import EmptyState from './EmptyState';
import ConfirmDialog from './ConfirmDialog';

describe('Toast', () => {
  it('should render nothing when no message', () => {
    const { container } = render(<Toast message={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render message with role status', () => {
    render(<Toast message="Saved!" />);
    expect(screen.getByRole('status')).toHaveTextContent('Saved!');
  });
});

describe('EmptyState', () => {
  it('should render heading', () => {
    render(<EmptyState onAdd={() => {}} />);
    expect(screen.getByText('No applications yet')).toBeInTheDocument();
  });

  it('should call onAdd when button clicked', async () => {
    const onAdd = vi.fn();
    render(<EmptyState onAdd={onAdd} />);
    await userEvent.click(screen.getByRole('button', { name: /add now/i }));
    expect(onAdd).toHaveBeenCalledOnce();
  });
});

describe('ConfirmDialog', () => {
  it('should not render when closed', () => {
    const { container } = render(
      <ConfirmDialog isOpen={false} title="Delete" message="Sure?" onConfirm={() => {}} onCancel={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render title and message when open', () => {
    render(
      <ConfirmDialog isOpen={true} title="Delete Item" message="Are you sure?" onConfirm={() => {}} onCancel={() => {}} />
    );
    expect(screen.getByText('Delete Item')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('should call onConfirm when confirm button clicked', async () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog isOpen={true} title="Delete" message="Sure?" onConfirm={onConfirm} onCancel={() => {}} />
    );
    await userEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it('should call onCancel when cancel button clicked', async () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog isOpen={true} title="Delete" message="Sure?" onConfirm={() => {}} onCancel={onCancel} />
    );
    await userEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('should have dialog role and aria-modal', () => {
    render(
      <ConfirmDialog isOpen={true} title="Test" message="msg" onConfirm={() => {}} onCancel={() => {}} />
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });
});
