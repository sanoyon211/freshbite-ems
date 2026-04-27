// src/components/EmployeeCard.jsx — Light theme
import { getInitials, deptColor, deptBg } from "../utils/helpers";

export default function EmployeeCard({ employee, onClick }) {
  const { name, role, dept, status } = employee;
  return (
    <div onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200 group">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 border"
        style={{ background: deptBg(dept), color: deptColor(dept), borderColor: `${deptColor(dept)}30` }}>
        {getInitials(name)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-slate-700 text-sm font-semibold truncate" style={{fontFamily:"'Poppins',sans-serif"}}>{name}</p>
        <p className="text-slate-400 text-xs truncate">{role}</p>
      </div>
      <span className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold shrink-0 ${
        status === "Active"
          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
          : "bg-red-50 text-red-500 border border-red-200"
      }`}>{status}</span>
      <span className="text-[10px] px-2.5 py-1 rounded-lg font-medium shrink-0 hidden lg:block"
        style={{ background: deptBg(dept), color: deptColor(dept) }}>{dept}</span>
    </div>
  );
}
