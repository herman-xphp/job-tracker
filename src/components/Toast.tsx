interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null;
  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-bg-dark/90 border border-glass-border backdrop-blur-xl px-8 py-4 rounded-full font-semibold shadow-[0_10px_25px_rgba(0,0,0,0.5)] z-[2000] flex items-center animate-slide-up-toast"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
