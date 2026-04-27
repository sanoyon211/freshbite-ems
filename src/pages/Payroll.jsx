// src/pages/Payroll.jsx — Light theme + responsive
import { useState } from "react";
import { Download, CheckCircle, Wallet } from "lucide-react";
import { getInitials, deptColor, deptBg, formatBDT } from "../utils/helpers";

const MONTHS = ["January 2024","February 2024","March 2024","April 2024"];
const INITIAL_PAID = new Set(["FB-001","FB-002","FB-003","FB-007","FB-008"]);

export default function Payroll({ employees, addToast }) {
  const [selMonth, setSelMonth] = useState("April 2024");
  const [paid,     setPaid]     = useState(INITIAL_PAID);

  const total      = employees.reduce((s,e) => s + e.salary + (e.bonus||0) - (e.deduction||0), 0);
  const paidAmt    = employees.filter(e => paid.has(e.id)).reduce((s,e) => s + e.salary + (e.bonus||0) - (e.deduction||0), 0);
  const pendingAmt = total - paidAmt;

  const payOne = (emp) => { setPaid(s => new Set([...s,emp.id])); addToast(`Payment processed for ${emp.name}.`, "success"); };
  const payAll = () => { setPaid(new Set(employees.map(e=>e.id))); addToast("All salaries marked as paid!", "success"); };

  const summaryCards = [
    { label:"Total Payroll", value:formatBDT(total),      color:"text-slate-800",   bg:"bg-white",         border:"border-slate-200",  icon:"💰" },
    { label:"Paid",          value:formatBDT(paidAmt),    color:"text-emerald-600", bg:"bg-emerald-50",    border:"border-emerald-200", icon:"✅" },
    { label:"Pending",       value:formatBDT(pendingAmt), color:"text-amber-600",   bg:"bg-amber-50",      border:"border-amber-200",   icon:"⏳" },
    { label:"Employees",     value:String(employees.length),color:"text-blue-600",  bg:"bg-blue-50",       border:"border-blue-200",    icon:"👥" },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3">
        <select value={selMonth} onChange={e => setSelMonth(e.target.value)}
          className="bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-600 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer transition-all"
          style={{fontFamily:"'Poppins',sans-serif"}}>
          {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <button onClick={() => addToast("Payroll report exported.", "success")}
          className="ml-auto flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 text-sm rounded-xl transition-colors shadow-sm"
          style={{fontFamily:"'Poppins',sans-serif"}}>
          <Download size={14} /> Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {summaryCards.map(s => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-4 sm:p-5 shadow-sm`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-500 text-xs font-medium" style={{fontFamily:"'Poppins',sans-serif"}}>{s.label}</p>
              <span className="text-lg">{s.icon}</span>
            </div>
            <p className={`font-bold text-lg sm:text-xl ${s.color}`} style={{fontFamily:"'Poppins',sans-serif"}}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-200 bg-slate-50/50">
          <div>
            <h3 className="text-slate-800 font-semibold text-sm" style={{fontFamily:"'Poppins',sans-serif"}}>Salary Breakdown — {selMonth}</h3>
            <p className="text-slate-400 text-xs mt-0.5">{employees.length} employees total</p>
          </div>
          <button onClick={payAll}
            className="flex items-center gap-2 text-xs px-4 py-2 rounded-xl font-semibold transition-colors bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100"
            style={{fontFamily:"'Poppins',sans-serif"}}>
            <CheckCircle size={14} /> Pay All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Employee","Department","Basic Salary","Bonus","Deduction","Net Pay","Status","Action"].map(h => (
                  <th key={h} className="text-left px-4 py-3.5 text-slate-500 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap"
                    style={{fontFamily:"'Poppins',sans-serif"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map(emp => {
                const net    = emp.salary + (emp.bonus||0) - (emp.deduction||0);
                const isPaid = paid.has(emp.id);
                return (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                    {/* Employee */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 border"
                          style={{background:deptBg(emp.dept), color:deptColor(emp.dept), borderColor:`${deptColor(emp.dept)}30`, fontFamily:"'Poppins',sans-serif"}}>
                          {getInitials(emp.name)}
                        </div>
                        <div>
                          <p className="text-slate-700 text-sm font-semibold" style={{fontFamily:"'Poppins',sans-serif"}}>{emp.name}</p>
                          <p className="text-slate-400 text-[10px] hidden sm:block">{emp.id}</p>
                        </div>
                      </div>
                    </td>
                    {/* Dept */}
                    <td className="px-4 py-3.5">
                      <span className="text-[10px] px-2.5 py-1 rounded-lg font-semibold"
                        style={{background:deptBg(emp.dept), color:deptColor(emp.dept)}}>{emp.dept}</span>
                    </td>
                    {/* Numbers */}
                    <td className="px-4 py-3.5 text-slate-600 text-sm font-medium whitespace-nowrap" style={{fontFamily:"'Poppins',sans-serif"}}>
                      {formatBDT(emp.salary)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-emerald-600 text-sm font-semibold bg-emerald-50 px-2 py-0.5 rounded-lg">
                        +{formatBDT(emp.bonus||0)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-red-500 text-sm font-semibold bg-red-50 px-2 py-0.5 rounded-lg">
                        -{formatBDT(emp.deduction||0)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-slate-800 text-sm font-bold" style={{fontFamily:"'Poppins',sans-serif"}}>
                        {formatBDT(net)}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold border ${
                        isPaid
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-amber-50 text-amber-600 border-amber-200"
                      }`}>{isPaid ? "Paid" : "Pending"}</span>
                    </td>
                    {/* Action */}
                    <td className="px-4 py-3.5">
                      {isPaid ? (
                        <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <CheckCircle size={13} className="text-emerald-500" /> Done
                        </span>
                      ) : (
                        <button onClick={() => payOne(emp)}
                          className="text-xs px-3 py-1.5 rounded-xl font-semibold transition-all hover:scale-105 whitespace-nowrap bg-orange-500 text-white shadow-sm shadow-orange-500/25 hover:bg-orange-600"
                          style={{fontFamily:"'Poppins',sans-serif"}}>
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer total */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-slate-200 bg-slate-50/50">
          <p className="text-slate-500 text-xs" style={{fontFamily:"'Poppins',sans-serif"}}>
            {employees.filter(e=>paid.has(e.id)).length} of {employees.length} paid
          </p>
          <p className="text-slate-700 text-sm font-bold" style={{fontFamily:"'Poppins',sans-serif"}}>
            Total Net: <span className="text-orange-600">{formatBDT(total)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
