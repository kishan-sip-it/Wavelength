import { useEffect } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { useWizard } from "../context/WizardContext.jsx";

export default function Toast() {
  const { toast, clearToast } = useWizard();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(clearToast, 4000);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;
  const isError = toast.type === "error";

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4">
      <div
        role="alert"
        className={`animate-slide-in pointer-events-auto flex w-full max-w-[340px] items-start gap-2.5 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${
          isError ? "border-red-500/40 bg-red-950/90 text-red-100" : "border-emerald-500/40 bg-emerald-950/90 text-emerald-100"
        }`}
      >
        {isError ? <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />}
        <p className="flex-1 text-sm leading-5">{toast.message}</p>
        <button onClick={clearToast} className="shrink-0 opacity-70 hover:opacity-100">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
