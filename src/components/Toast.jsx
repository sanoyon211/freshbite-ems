// src/components/Toast.jsx — Light theme
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none max-w-xs w-full px-4 sm:px-0">
      {toasts.map(t => (
        <div key={t.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium animate-slide-in
            ${t.type === "success" ? "bg-white border-emerald-200 text-emerald-700 shadow-emerald-100"
              : t.type === "error" ? "bg-white border-red-200 text-red-600 shadow-red-100"
              : "bg-white border-blue-200 text-blue-600 shadow-blue-100"}`}>
          {t.type === "success" ? <CheckCircle size={16} className="text-emerald-500 shrink-0" />
            : t.type === "error" ? <XCircle size={16} className="text-red-500 shrink-0" />
            : <AlertCircle size={16} className="text-blue-500 shrink-0" />}
          <span className="flex-1 text-slate-700">{t.message}</span>
          <button onClick={() => removeToast(t.id)} className="text-slate-400 hover:text-slate-600 transition-colors ml-1 shrink-0">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
