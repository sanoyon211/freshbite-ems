// src/components/StatsCard.jsx — Light theme
export default function StatsCard({ icon: Icon, label, value, sub, iconColor, iconBg, trend }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-slate-500 text-xs font-medium mb-1.5 truncate" style={{fontFamily:"'Poppins',sans-serif"}}>{label}</p>
          <p className="text-slate-800 text-2xl font-bold" style={{fontFamily:"'Poppins',sans-serif"}}>{value}</p>
          {sub && <p className="text-slate-400 text-xs mt-1.5">{sub}</p>}
        </div>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shrink-0 ml-3" style={{background: iconBg}}>
          <Icon size={20} style={{color: iconColor}} />
        </div>
      </div>
    </div>
  );
}
