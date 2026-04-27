// src/components/Navbar.jsx — Light theme + Mobile hamburger
import { useState } from "react";
import { Bell, Search, ChevronDown, X, Menu } from "lucide-react";
import { ACTIVITY_FEED } from "../data/dummyData";

const PAGE_TITLES = {
  dashboard:"Dashboard", employees:"Employees", attendance:"Attendance",
  payroll:"Payroll", leave:"Leave Management", profile:"Employee Profile",
};

export default function Navbar({ page, notifications = 3, onMenuClick }) {
  const [showNotif, setShowNotif] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="h-[60px] bg-white border-b border-slate-200 flex items-center px-4 gap-3 shrink-0 relative z-30 shadow-sm">
      {/* Mobile hamburger */}
      <button onClick={onMenuClick}
        className="lg:hidden w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors shrink-0">
        <Menu size={18} />
      </button>

      {/* Title */}
      <div className="hidden sm:block">
        <h1 className="text-slate-800 font-semibold text-base leading-none" style={{fontFamily:"'Poppins',sans-serif"}}>
          {PAGE_TITLES[page] || "Dashboard"}
        </h1>
        <p className="text-slate-400 text-xs mt-0.5">FreshBite Foods Ltd.</p>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Mobile search toggle */}
        <button onClick={() => setShowSearch(s => !s)}
          className="sm:hidden w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
          <Search size={16} />
        </button>

        {/* Desktop search */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 w-44 md:w-52">
          <Search size={14} className="text-slate-400 shrink-0" />
          <input placeholder="Search..." className="bg-transparent text-slate-700 text-sm outline-none placeholder:text-slate-400 w-full" style={{fontFamily:"'Poppins',sans-serif"}} />
        </div>

        {/* Notification */}
        <div className="relative">
          <button onClick={() => setShowNotif(s => !s)}
            className="relative w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
            <Bell size={16} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] flex items-center justify-center font-bold">
                {notifications}
              </span>
            )}
          </button>
          {showNotif && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)} />
              <div className="absolute right-0 top-11 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 z-50 animate-fade-up">
                <div className="flex items-center justify-between px-2 mb-2">
                  <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">Notifications</p>
                  <button onClick={() => setShowNotif(false)} className="text-slate-300 hover:text-slate-500"><X size={13} /></button>
                </div>
                {ACTIVITY_FEED.slice(0, 3).map((a, i) => (
                  <div key={i} className="px-2 py-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                    <p className="text-slate-600 text-xs leading-snug">{a.text}</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">{a.time}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 rounded-xl px-2 py-1 transition-colors">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md shrink-0"
            style={{background:"linear-gradient(135deg,#f97316,#ea580c)"}}>N</div>
          <div className="hidden md:block">
            <p className="text-slate-700 text-xs font-semibold leading-none" style={{fontFamily:"'Poppins',sans-serif"}}>Nasrin Akter</p>
            <p className="text-slate-400 text-[10px]">Branch Manager</p>
          </div>
          <ChevronDown size={13} className="text-slate-400 hidden md:block" />
        </div>
      </div>

      {/* Mobile search bar (expandable) */}
      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-3 sm:hidden z-50 shadow-lg">
          <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2.5">
            <Search size={15} className="text-slate-400 shrink-0" />
            <input autoFocus placeholder="Search employees, ID..." className="bg-transparent text-slate-700 text-sm outline-none placeholder:text-slate-400 flex-1" />
            <button onClick={() => setShowSearch(false)}><X size={15} className="text-slate-400" /></button>
          </div>
        </div>
      )}
    </header>
  );
}
