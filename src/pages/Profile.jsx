// src/pages/Profile.jsx — Light theme + responsive
import { useState } from "react";
import { ChevronLeft, Hash, Briefcase, Phone, Mail, Calendar, DollarSign, Star, CheckCircle, Edit2 } from "lucide-react";
import { EmployeeModal } from "../components/Modal";
import { getInitials, deptColor, deptBg, formatBDT } from "../utils/helpers";

export default function Profile({ employee, setPage, addToast }) {
  const [showEdit, setShowEdit] = useState(false);
  const [emp, setEmp] = useState(employee);

  if (!emp) return (
    <div className="p-6 text-slate-500 text-sm" style={{fontFamily:"'Poppins',sans-serif"}}>
      No employee selected. <button onClick={() => setPage("employees")} className="text-orange-500 hover:underline">Go back</button>
    </div>
  );

  const net = emp.salary + (emp.bonus||0) - (emp.deduction||0);
  const salaryHistory = [
    {month:"Jan 2024", net, status:"Paid"}, {month:"Feb 2024", net, status:"Paid"},
    {month:"Mar 2024", net, status:"Paid"}, {month:"Apr 2024", net, status:"Pending"},
  ];
  const details = [
    {icon:Hash,       label:"Employee ID",  value:emp.id},
    {icon:Briefcase,  label:"Department",   value:emp.dept},
    {icon:Phone,      label:"Phone",        value:emp.phone},
    {icon:Mail,       label:"Email",        value:emp.email},
    {icon:Calendar,   label:"Join Date",    value:emp.joinDate},
    {icon:DollarSign, label:"Basic Salary", value:formatBDT(emp.salary)},
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      <button onClick={() => setPage("employees")}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors" style={{fontFamily:"'Poppins',sans-serif"}}>
        <ChevronLeft size={16} /> Back to Employees
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-5">
        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col shadow-sm">
          <div className="text-center mb-5">
            <div className="w-20 h-20 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl font-bold border-2"
              style={{background:deptBg(emp.dept), color:deptColor(emp.dept), borderColor:`${deptColor(emp.dept)}30`, fontFamily:"'Poppins',sans-serif"}}>
              {getInitials(emp.name)}
            </div>
            <h2 className="text-slate-800 font-bold text-lg" style={{fontFamily:"'Poppins',sans-serif"}}>{emp.name}</h2>
            <p className="text-slate-500 text-sm">{emp.role}</p>
            <div className="mt-2">
              <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                emp.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-500 border-red-200"
              }`}>{emp.status}</span>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            {details.map(({icon:Icon, label, value}) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <Icon size={13} className="text-slate-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-slate-400 text-[10px] font-medium">{label}</p>
                  <p className="text-slate-700 text-xs font-semibold truncate" style={{fontFamily:"'Poppins',sans-serif"}}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setShowEdit(true)}
            className="mt-5 w-full py-2.5 rounded-xl border border-orange-200 bg-orange-50 text-orange-600 text-sm font-semibold hover:bg-orange-100 flex items-center justify-center gap-2 transition-colors"
            style={{fontFamily:"'Poppins',sans-serif"}}>
            <Edit2 size={14} /> Edit Profile
          </button>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-5">
          {/* Attendance */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
            <h3 className="text-slate-800 font-semibold text-sm mb-4" style={{fontFamily:"'Poppins',sans-serif"}}>Attendance Summary — April 2024</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[{label:"Present",value:"22",color:"text-emerald-600",bg:"bg-emerald-50",border:"border-emerald-200"},
                {label:"Absent",value:"3",color:"text-red-500",bg:"bg-red-50",border:"border-red-200"},
                {label:"Leave",value:"2",color:"text-amber-600",bg:"bg-amber-50",border:"border-amber-200"},
                {label:"Rate",value:"88%",color:"text-blue-600",bg:"bg-blue-50",border:"border-blue-200"}
              ].map(s => (
                <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-3 text-center`}>
                  <p className={`font-bold text-xl ${s.color}`} style={{fontFamily:"'Poppins',sans-serif"}}>{s.value}</p>
                  <p className="text-slate-500 text-[10px] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{width:"88%", background:"linear-gradient(90deg,#f97316,#fb923c)"}} />
            </div>
            <p className="text-slate-400 text-xs mt-1.5">Attendance rate: 88%</p>
          </div>

          {/* Salary History */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
            <h3 className="text-slate-800 font-semibold text-sm mb-4" style={{fontFamily:"'Poppins',sans-serif"}}>Salary History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200">
                    {["Month","Basic","Bonus","Deduction","Net Pay","Status"].map(h => (
                      <th key={h} className="text-left pb-3 text-slate-500 text-[10px] font-semibold uppercase tracking-wider" style={{fontFamily:"'Poppins',sans-serif"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {salaryHistory.map((row,i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 text-slate-700 font-semibold" style={{fontFamily:"'Poppins',sans-serif"}}>{row.month}</td>
                      <td className="py-2.5 text-slate-500">{formatBDT(emp.salary)}</td>
                      <td className="py-2.5 text-emerald-600 font-medium">+{formatBDT(emp.bonus||0)}</td>
                      <td className="py-2.5 text-red-500 font-medium">-{formatBDT(emp.deduction||0)}</td>
                      <td className="py-2.5 text-slate-800 font-bold" style={{fontFamily:"'Poppins',sans-serif"}}>{formatBDT(row.net)}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${
                          row.status === "Paid" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-amber-50 text-amber-600 border-amber-200"
                        }`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
            <h3 className="text-slate-800 font-semibold text-sm mb-3" style={{fontFamily:"'Poppins',sans-serif"}}>Performance Notes</h3>
            <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-orange-50 border border-orange-200 rounded-xl w-fit">
              <Star size={14} className="text-orange-500" />
              <span className="text-orange-600 text-sm font-bold">{emp.perf}</span>
              <span className="text-slate-400 text-xs">— Overall Performance</span>
            </div>
            <div className="space-y-2">
              {["Consistently meets shift targets with high service quality.",
                "Excellent teamwork and communication with all staff members.",
                "Recommended for promotion review in the next quarter."
              ].map((note,i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600 text-xs" style={{fontFamily:"'Poppins',sans-serif"}}>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showEdit && <EmployeeModal employee={emp} onSave={u => {setEmp(u);setShowEdit(false);addToast("Employee updated.","success");}} onClose={() => setShowEdit(false)} addToast={addToast} />}
    </div>
  );
}
