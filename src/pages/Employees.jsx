// src/pages/Employees.jsx — Light theme + responsive
import { useState } from "react";
import { Search, Plus, Eye, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { EmployeeModal, ConfirmModal } from "../components/Modal";
import { DEPT_OPTIONS } from "../data/dummyData";
import { getInitials, deptColor, deptBg, formatBDT } from "../utils/helpers";

const PER_PAGE = 6;

export default function Employees({ employees, setEmployees, setPage, setSelectedEmp, addToast }) {
  const [search,       setSearch]       = useState("");
  const [deptFilter,   setDeptFilter]   = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [curPage,      setCurPage]      = useState(1);
  const [showModal,    setShowModal]    = useState(false);
  const [editEmp,      setEditEmp]      = useState(null);
  const [confirmDel,   setConfirmDel]   = useState(null);

  const filtered = employees.filter(e => {
    const q = search.toLowerCase();
    return (e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q) || e.role.toLowerCase().includes(q))
      && (deptFilter === "All" || e.dept === deptFilter)
      && (statusFilter === "All" || e.status === statusFilter);
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((curPage - 1) * PER_PAGE, curPage * PER_PAGE);

  const handleSave = (emp) => {
    if (editEmp) { setEmployees(es => es.map(e => e.id === emp.id ? emp : e)); addToast(`${emp.name} updated.`, "success"); }
    else { setEmployees(es => [...es, emp]); addToast(`${emp.name} added.`, "success"); }
    setShowModal(false); setEditEmp(null);
  };
  const handleDelete = (id) => {
    const emp = employees.find(e => e.id === id);
    setEmployees(es => es.filter(e => e.id !== id));
    addToast(`${emp?.name} removed.`, "error");
    setConfirmDel(null);
  };

  const selectCls = "bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-600 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 cursor-pointer transition-all";

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-400 transition-all">
          <Search size={15} className="text-slate-400 shrink-0" />
          <input value={search} onChange={e => { setSearch(e.target.value); setCurPage(1); }}
            placeholder="Search by name, ID or role..."
            className="bg-transparent text-slate-700 text-sm outline-none placeholder:text-slate-400 w-full" style={{fontFamily:"'Poppins',sans-serif"}} />
        </div>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <select value={deptFilter} onChange={e => { setDeptFilter(e.target.value); setCurPage(1); }} className={selectCls} style={{fontFamily:"'Poppins',sans-serif"}}>
            <option value="All">All Depts</option>
            {DEPT_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurPage(1); }} className={selectCls} style={{fontFamily:"'Poppins',sans-serif"}}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button onClick={() => { setEditEmp(null); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2.5 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-md shadow-orange-500/20 whitespace-nowrap"
            style={{background:"linear-gradient(135deg,#f97316,#ea580c)", fontFamily:"'Poppins',sans-serif"}}>
            <Plus size={16} /> Add Employee
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="bg-slate-100 border border-slate-200 text-slate-500 rounded-lg px-2.5 py-1">Total: {filtered.length}</span>
        <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg px-2.5 py-1">Active: {filtered.filter(e => e.status === "Active").length}</span>
        <span className="bg-red-50 border border-red-200 text-red-500 rounded-lg px-2.5 py-1">Inactive: {filtered.filter(e => e.status === "Inactive").length}</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Employee","ID","Department","Role","Join Date","Salary","Status","Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3.5 text-slate-500 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap" style={{fontFamily:"'Poppins',sans-serif"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paged.length === 0
                ? <tr><td colSpan={8} className="text-center py-16 text-slate-400 text-sm" style={{fontFamily:"'Poppins',sans-serif"}}>No employees found</td></tr>
                : paged.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 border"
                          style={{background:deptBg(emp.dept), color:deptColor(emp.dept), borderColor:`${deptColor(emp.dept)}30`}}>
                          {getInitials(emp.name)}
                        </div>
                        <div>
                          <p className="text-slate-700 text-sm font-semibold" style={{fontFamily:"'Poppins',sans-serif"}}>{emp.name}</p>
                          <p className="text-slate-400 text-[10px] hidden sm:block">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5"><span className="text-slate-500 text-[11px] font-mono bg-slate-100 px-2 py-1 rounded-lg">{emp.id}</span></td>
                    <td className="px-4 py-3.5"><span className="text-[10px] px-2.5 py-1 rounded-lg font-semibold" style={{background:deptBg(emp.dept), color:deptColor(emp.dept)}}>{emp.dept}</span></td>
                    <td className="px-4 py-3.5 text-slate-600 text-sm whitespace-nowrap hidden md:table-cell" style={{fontFamily:"'Poppins',sans-serif"}}>{emp.role}</td>
                    <td className="px-4 py-3.5 text-slate-400 text-xs whitespace-nowrap hidden lg:table-cell">{emp.joinDate}</td>
                    <td className="px-4 py-3.5 text-slate-700 text-sm font-semibold whitespace-nowrap hidden md:table-cell" style={{fontFamily:"'Poppins',sans-serif"}}>{formatBDT(emp.salary)}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold border ${
                        emp.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-500 border-red-200"
                      }`}>{emp.status}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        {[
                          {icon:Eye,   bg:"bg-blue-50",   bc:"border-blue-200",  color:"text-blue-600",   action:()=>{setSelectedEmp(emp);setPage("profile");}},
                          {icon:Edit2, bg:"bg-orange-50", bc:"border-orange-200",color:"text-orange-600", action:()=>{setEditEmp(emp);setShowModal(true);}},
                          {icon:Trash2,bg:"bg-red-50",    bc:"border-red-200",   color:"text-red-500",    action:()=>setConfirmDel(emp.id)},
                        ].map((b,i) => (
                          <button key={i} onClick={b.action}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all hover:scale-110 ${b.bg} ${b.bc}`}>
                            <b.icon size={13} className={b.color} />
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50/50">
            <p className="text-slate-400 text-xs" style={{fontFamily:"'Poppins',sans-serif"}}>Page {curPage} of {totalPages} — {filtered.length} results</p>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setCurPage(p => Math.max(1,p-1))} disabled={curPage===1}
                className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center transition-colors">
                <ChevronLeft size={14} />
              </button>
              {Array.from({length:totalPages},(_,i)=>i+1).map(n => (
                <button key={n} onClick={() => setCurPage(n)}
                  className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all ${
                    n === curPage ? "bg-orange-500 text-white shadow-md shadow-orange-500/25" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-100"
                  }`} style={{fontFamily:"'Poppins',sans-serif"}}>
                  {n}
                </button>
              ))}
              <button onClick={() => setCurPage(p => Math.min(totalPages,p+1))} disabled={curPage===totalPages}
                className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && <EmployeeModal employee={editEmp} onSave={handleSave} onClose={() => { setShowModal(false); setEditEmp(null); }} addToast={addToast} />}
      {confirmDel && <ConfirmModal message="Are you sure you want to permanently delete this employee?" onConfirm={() => handleDelete(confirmDel)} onClose={() => setConfirmDel(null)} />}
    </div>
  );
}
