// src/pages/Dashboard.jsx — Light theme + responsive
import { Users, UserCheck, UserX, UserPlus, DollarSign, Calendar, ClipboardList, ChevronRight, Clock, Edit2, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatsCard from "../components/StatsCard";
import EmployeeCard from "../components/EmployeeCard";
import { CHART_DATA, ACTIVITY_FEED, LEAVE_REQUESTS } from "../data/dummyData";

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-xl text-xs" style={{fontFamily:"'Poppins',sans-serif"}}>
      <p className="text-slate-600 font-semibold mb-1">{label}</p>
      {payload.map(p => <p key={p.name} style={{color: p.fill}} className="my-0.5">{p.name}: {p.value}</p>)}
    </div>
  );
};

const ACTIVITY_ICONS = {
  userplus: UserPlus, clock: Clock, dollar: DollarSign, edit: Edit2, checkcircle: CheckCircle,
};
const ACTIVITY_COLORS = {
  userplus: "text-emerald-500 bg-emerald-50", clock: "text-amber-500 bg-amber-50",
  dollar: "text-blue-500 bg-blue-50", edit: "text-red-500 bg-red-50", checkcircle: "text-emerald-500 bg-emerald-50",
};

export default function Dashboard({ employees, setPage, setSelectedEmp }) {
  const activeCount = employees.filter(e => e.status === "Active").length;
  const onLeave = LEAVE_REQUESTS.filter(l => l.status === "Approved").length;
  const newThisMonth = employees.filter(e => new Date(e.joinDate).getMonth() === new Date().getMonth()).length;

  const quickActions = [
    { label:"Add Employee",   icon:UserPlus,    bg:"bg-orange-50",  border:"border-orange-200", color:"text-orange-600", hover:"hover:bg-orange-100", page:"employees"  },
    { label:"Attendance",     icon:Calendar,    bg:"bg-blue-50",    border:"border-blue-200",   color:"text-blue-600",   hover:"hover:bg-blue-100",   page:"attendance" },
    { label:"Run Payroll",    icon:DollarSign,  bg:"bg-emerald-50", border:"border-emerald-200",color:"text-emerald-600",hover:"hover:bg-emerald-100",page:"payroll"    },
    { label:"Leave Requests", icon:ClipboardList,bg:"bg-purple-50", border:"border-purple-200", color:"text-purple-600", hover:"hover:bg-purple-100", page:"leave"      },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard icon={Users}    label="Total Employees" value={employees.length} sub="All departments"  iconColor="#3b82f6" iconBg="rgba(59,130,246,0.1)" />
        <StatsCard icon={UserCheck}label="Present Today"   value={activeCount - 2} sub="Active & on duty"  iconColor="#10b981" iconBg="rgba(16,185,129,0.1)" />
        <StatsCard icon={UserX}    label="On Leave"        value={onLeave}         sub="This week"          iconColor="#f59e0b" iconBg="rgba(245,158,11,0.1)" />
        <StatsCard icon={UserPlus} label="New This Month"  value={newThisMonth||1} sub="New hires"          iconColor="#f97316" iconBg="rgba(249,115,22,0.1)" />
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-5">
        {/* Chart */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-slate-800 font-semibold text-sm" style={{fontFamily:"'Poppins',sans-serif"}}>Attendance Overview</h3>
              <p className="text-slate-400 text-xs">Monthly attendance statistics</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-400">
              {[["#f97316","Present"],["#ef4444","Absent"],["#3b82f6","Leave"]].map(([c,l]) => (
                <span key={l} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{background:c}} />{l}
                </span>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CHART_DATA} barSize={12} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:"#94a3b8", fontSize:11, fontFamily:"Poppins"}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill:"#94a3b8", fontSize:11}} />
              <Tooltip content={<ChartTooltip />} cursor={{fill:"rgba(241,245,249,0.8)"}} />
              <Bar dataKey="present" fill="#f97316" radius={[4,4,0,0]} />
              <Bar dataKey="absent"  fill="#ef4444" radius={[4,4,0,0]} opacity={0.7} />
              <Bar dataKey="leave"   fill="#3b82f6" radius={[4,4,0,0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
          <h3 className="text-slate-800 font-semibold text-sm mb-4" style={{fontFamily:"'Poppins',sans-serif"}}>Recent Activity</h3>
          <div className="space-y-1">
            {ACTIVITY_FEED.map((a, i) => {
              const Icon = ACTIVITY_ICONS[a.icon] || CheckCircle;
              const cls  = ACTIVITY_COLORS[a.icon] || "text-slate-500 bg-slate-100";
              return (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${cls}`}>
                    <Icon size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-600 text-xs leading-snug" style={{fontFamily:"'Poppins',sans-serif"}}>{a.text}</p>
                    <p className="text-slate-400 text-[10px] mt-1">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions + Recent Employees */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-5">
        {/* Quick Actions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
          <h3 className="text-slate-800 font-semibold text-sm mb-4" style={{fontFamily:"'Poppins',sans-serif"}}>Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(q => (
              <button key={q.label} onClick={() => setPage(q.page)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-150 hover:scale-[1.02] hover:shadow-sm ${q.bg} ${q.border} ${q.hover}`}>
                <q.icon size={20} className={q.color} />
                <span className={`text-xs font-semibold ${q.color}`} style={{fontFamily:"'Poppins',sans-serif"}}>{q.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Employees */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-semibold text-sm" style={{fontFamily:"'Poppins',sans-serif"}}>Recent Employees</h3>
            <button onClick={() => setPage("employees")} className="text-orange-500 text-xs hover:text-orange-600 font-medium flex items-center gap-1 transition-colors">
              View all <ChevronRight size={13} />
            </button>
          </div>
          <div className="space-y-1">
            {employees.slice(0, 5).map(emp => (
              <EmployeeCard key={emp.id} employee={emp} onClick={() => { setSelectedEmp(emp); setPage("profile"); }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
