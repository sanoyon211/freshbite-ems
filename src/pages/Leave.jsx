// src/pages/Leave.jsx — Light theme + responsive
import { useState } from "react";
import { Check, XCircle, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { LEAVE_REQUESTS } from "../data/dummyData";
import { getInitials, deptColor, deptBg, leaveTypeColor } from "../utils/helpers";

const FILTERS = ["All","Pending","Approved","Rejected"];

const STATUS_CONFIG = {
  Pending:  { bg:"bg-amber-50",   text:"text-amber-600",   border:"border-amber-200",   icon: Clock,         iconCls:"text-amber-500"  },
  Approved: { bg:"bg-emerald-50", text:"text-emerald-600", border:"border-emerald-200", icon: CheckCircle,   iconCls:"text-emerald-500" },
  Rejected: { bg:"bg-red-50",     text:"text-red-500",     border:"border-red-200",     icon: XCircle,       iconCls:"text-red-500"     },
};

const TYPE_CONFIG = {
  Sick:      "bg-blue-50 text-blue-600 border-blue-200",
  Annual:    "bg-purple-50 text-purple-600 border-purple-200",
  Emergency: "bg-red-50 text-red-500 border-red-200",
};

export default function Leave({ addToast }) {
  const [leaves, setLeaves] = useState(LEAVE_REQUESTS);
  const [filter, setFilter] = useState("All");

  const update = (id, status) => {
    setLeaves(ls => ls.map(l => l.id === id ? {...l, status} : l));
    addToast(`Leave request ${status.toLowerCase()}.`, status === "Approved" ? "success" : "error");
  };

  const filtered = filter === "All" ? leaves : leaves.filter(l => l.status === filter);

  const counts = {
    total:    leaves.length,
    pending:  leaves.filter(l => l.status === "Pending").length,
    approved: leaves.filter(l => l.status === "Approved").length,
    rejected: leaves.filter(l => l.status === "Rejected").length,
  };

  const summaryCards = [
    { label:"Total Requests", value:counts.total,    color:"text-slate-800",   bg:"bg-white",       border:"border-slate-200",   icon:Clock        },
    { label:"Pending",        value:counts.pending,  color:"text-amber-600",   bg:"bg-amber-50",    border:"border-amber-200",   icon:Clock        },
    { label:"Approved",       value:counts.approved, color:"text-emerald-600", bg:"bg-emerald-50",  border:"border-emerald-200", icon:CheckCircle  },
    { label:"Rejected",       value:counts.rejected, color:"text-red-500",     bg:"bg-red-50",      border:"border-red-200",     icon:XCircle      },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {summaryCards.map(s => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-4 sm:p-5 shadow-sm`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-500 text-xs font-medium" style={{fontFamily:"'Poppins',sans-serif"}}>{s.label}</p>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.bg} border ${s.border}`}>
                <s.icon size={14} className={s.color} />
              </div>
            </div>
            <p className={`font-bold text-2xl ${s.color}`} style={{fontFamily:"'Poppins',sans-serif"}}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Header + filters */}
        <div className="flex flex-wrap items-center gap-2 px-4 sm:px-5 py-4 border-b border-slate-200 bg-slate-50/50">
          <h3 className="text-slate-800 font-semibold text-sm flex-1" style={{fontFamily:"'Poppins',sans-serif"}}>Leave Requests</h3>
          <div className="flex flex-wrap items-center gap-1.5">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all border ${
                  filter === f
                    ? "bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-500/25"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100 border-transparent"
                }`}
                style={{fontFamily:"'Poppins',sans-serif"}}>{f}</button>
            ))}
          </div>
        </div>

        {/* Mobile cards view */}
        <div className="sm:hidden divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm" style={{fontFamily:"'Poppins',sans-serif"}}>No leave requests found</div>
          ) : filtered.map(l => {
            const ss = STATUS_CONFIG[l.status];
            return (
              <div key={l.id} className="p-4 space-y-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold border shrink-0"
                      style={{background:deptBg(l.dept), color:deptColor(l.dept), borderColor:`${deptColor(l.dept)}30`}}>
                      {getInitials(l.empName)}
                    </div>
                    <div>
                      <p className="text-slate-700 text-sm font-semibold" style={{fontFamily:"'Poppins',sans-serif"}}>{l.empName}</p>
                      <p className="text-slate-400 text-xs">{l.empId} · {l.dept}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold border ${ss.bg} ${ss.text} ${ss.border}`}>{l.status}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] px-2 py-1 rounded-lg font-semibold border ${TYPE_CONFIG[l.type] || "bg-slate-50 text-slate-500 border-slate-200"}`}>{l.type}</span>
                  <span className="text-slate-400 text-xs">{l.from} → {l.to}</span>
                  <span className="text-slate-600 text-xs font-semibold">{l.days} days</span>
                </div>
                <p className="text-slate-500 text-xs">{l.reason}</p>
                {l.status === "Pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => update(l.id,"Approved")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 transition-colors">
                      <Check size={13} /> Approve
                    </button>
                    <button onClick={() => update(l.id,"Rejected")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 transition-colors">
                      <XCircle size={13} /> Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop table view */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["ID","Employee","Dept","Type","Duration","Days","Reason","Status","Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3.5 text-slate-500 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap"
                    style={{fontFamily:"'Poppins',sans-serif"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-14 text-slate-400 text-sm" style={{fontFamily:"'Poppins',sans-serif"}}>No leave requests found</td></tr>
              ) : filtered.map(l => {
                const ss = STATUS_CONFIG[l.status];
                return (
                  <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                    {/* ID */}
                    <td className="px-4 py-3.5">
                      <span className="text-slate-400 text-[10px] font-mono bg-slate-100 px-2 py-1 rounded-lg">{l.id}</span>
                    </td>
                    {/* Employee */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold shrink-0 border"
                          style={{background:deptBg(l.dept), color:deptColor(l.dept), borderColor:`${deptColor(l.dept)}30`, fontFamily:"'Poppins',sans-serif"}}>
                          {getInitials(l.empName)}
                        </div>
                        <div>
                          <p className="text-slate-700 text-sm font-semibold whitespace-nowrap" style={{fontFamily:"'Poppins',sans-serif"}}>{l.empName}</p>
                          <p className="text-slate-400 text-[10px]">{l.empId}</p>
                        </div>
                      </div>
                    </td>
                    {/* Dept */}
                    <td className="px-4 py-3.5">
                      <span className="text-[10px] px-2 py-1 rounded-lg font-semibold"
                        style={{background:deptBg(l.dept), color:deptColor(l.dept)}}>{l.dept}</span>
                    </td>
                    {/* Type */}
                    <td className="px-4 py-3.5">
                      <span className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold border ${TYPE_CONFIG[l.type] || "bg-slate-50 text-slate-500 border-slate-200"}`}>{l.type}</span>
                    </td>
                    {/* Duration */}
                    <td className="px-4 py-3.5 text-slate-400 text-xs whitespace-nowrap">{l.from} → {l.to}</td>
                    {/* Days */}
                    <td className="px-4 py-3.5">
                      <span className="text-slate-700 text-sm font-bold" style={{fontFamily:"'Poppins',sans-serif"}}>{l.days}d</span>
                    </td>
                    {/* Reason */}
                    <td className="px-4 py-3.5 text-slate-500 text-xs" style={{maxWidth:140, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{l.reason}</td>
                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold border ${ss.bg} ${ss.text} ${ss.border}`}>{l.status}</span>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      {l.status === "Pending" ? (
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => update(l.id,"Approved")} title="Approve"
                            className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all hover:scale-110 bg-emerald-50 border-emerald-200">
                            <Check size={13} className="text-emerald-600" />
                          </button>
                          <button onClick={() => update(l.id,"Rejected")} title="Reject"
                            className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all hover:scale-110 bg-red-50 border-red-200">
                            <XCircle size={13} className="text-red-500" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
