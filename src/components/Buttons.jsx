import { Loader2 } from "lucide-react";

export function PrimaryButton({ children, onClick, disabled, loading, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-black shadow-[0_0_0_rgba(139,92,246,0)] transition hover:shadow-[0_0_24px_rgba(139,92,246,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

export function OutlineButton({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-full border border-white/70 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
