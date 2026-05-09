import React from "react";
import { useToast } from "../hooks/useToast";
import type { ToastMessage } from "../contexts/ToastContext";

const styles = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-900",
  error: "bg-red-50 border-red-200 text-red-900",
  info: "bg-slate-50 border-slate-200 text-slate-900",
};

export const ToastList = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm">
      {toasts.map((toast: ToastMessage) => (
        <div
          key={toast.id}
          className={`rounded-3xl border p-4 shadow-2xl shadow-slate-900/5 transition-all ${styles[toast.variant]}`}
          role="status"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm leading-6">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 hover:text-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
