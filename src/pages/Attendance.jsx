// src/pages/Attendance.jsx — Light theme + responsive
import { useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { generateAttendance, SHORT_MONTHS } from "../utils/helpers";

const STATUS_CONFIG = {
  P: { bg:"#dcfce7", text:"#16a34a", border:"#86efac", label:"Present" },
  A: { bg:"#fee2e2", text:"#dc2626", border:"#fca5a5", label:"Absent"  },
  L: { bg:"#fef3c7", text:"#d97706", border:"#fde68a", label:"Leave"   },
};

export default function Attendance({ employees, addToast }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear]   = useState(today.getFullYear());
  const [att, setAtt]     = useState(() => generateAttendance(employees));

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonth = () => { if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); };
  const nextMonth = () => { if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); };

  const toggle = (empId, day) => {
    setAtt(prev => {
      const cur = prev[empId]?.[day] || "P";
      const next = cur==="P"?"A":cur==="A"?"L":"P";
      return {...prev, [empId]:{...prev[empId],[day]:next}};
    });
  };

  const summarise = (empId) => {
    const cells = att[empId] || {};
    return {
      P: Object.values(cells).filter(v=>v==="P").length,
      A: Object.values(cells).filter(v=>v==="A").length,
      L: Object.values(cells).filter(v=>v==="L").length,
    };
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-xl p-1.5">
          <button onClick={prevMonth} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"><ChevronLeft size={14} /></button>
          <span className="text-slate-700 text-sm font-semibold px-2 w-28 text-center" style={{fontFamily:"'Poppins',sans-serif"}}>{SHORT_MONTHS[month]} {year}</span>
          <button onClick={nextMonth} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"><ChevronRight size={14} /></button>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          {Object.entries(STATUS_CONFIG).map(([k,v]) => (
            <span key={k} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded border inline-block" style={{background:v.bg, borderColor:v.border}} />
              {v.label}
            </span>
          ))}
        </div>

        <button onClick={() => addToast("Attendance exported.", "success")}
          className="ml-auto flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 text-sm rounded-xl transition-colors shadow-sm"
          style={{fontFamily:"'Poppins',sans-serif"}}>
          <Download size={14} /> Export
        </button>
      </div>

      <p className="text-slate-400 text-xs" style={{fontFamily:"'Poppins',sans-serif"}}>
        Click any cell to toggle: <span className="text-emerald-600 font-medium">P</span>resent → <span className="text-red-500 font-medium">A</span>bsent → <span className="text-amber-600 font-medium">L</span>eave
      </p>

      {/* Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full" style={{minWidth:900}}>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-4 py-3 text-slate-500 text-[10px] font-semibold uppercase tracking-wider sticky left-0 bg-slate-50 z-10" style={{minWidth:160, fontFamily:"'Poppins',sans-serif"}}>Employee</th>
                {Array.from({length:daysInMonth},(_,i)=>i+1).map(d => (
                  <th key={d} className="text-slate-400 text-[9px] font-semibold text-center" style={{minWidth:28, padding:"10px 1px"}}>{d}</th>
                ))}
                <th className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider px-3" style={{minWidth:90, fontFamily:"'Poppins',sans-serif"}}>Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map(emp => {
                const cells = att[emp.id] || {};
                const {P,A,L} = summarise(emp.id);
                return (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2 sticky left-0 bg-white z-10 border-r border-slate-100">
                      <p className="text-slate-700 text-xs font-semibold" style={{fontFamily:"'Poppins',sans-serif"}}>{emp.name}</p>
                      <p className="text-slate-400 text-[10px]">{emp.dept}</p>
                    </td>
                    {Array.from({length:daysInMonth},(_,i)=>i+1).map(d => {
                      const s = cells[d] || "P";
                      const cfg = STATUS_CONFIG[s];
                      return (
                        <td key={d} className="text-center" style={{padding:"4px 1px"}}>
                          <button onClick={() => toggle(emp.id, d)} title={`${emp.name} — Day ${d}: ${s}`}
                            className="rounded transition-transform hover:scale-110 font-bold text-[8px] border"
                            style={{width:23,height:21,background:cfg.bg,color:cfg.text,borderColor:cfg.border,cursor:"pointer"}}>
                            {s}
                          </button>
                        </td>
                      );
                    })}
                    <td className="px-3 py-2">
                      <div className="flex gap-1 flex-wrap">
                        <span className="text-[9px] px-1.5 py-0.5 rounded-lg font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">{P}P</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-lg font-semibold bg-red-50 text-red-500 border border-red-200">{A}A</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-lg font-semibold bg-amber-50 text-amber-600 border border-amber-200">{L}L</span>
                      </div>
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
