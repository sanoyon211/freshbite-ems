// src/components/Sidebar.jsx — Light theme + Mobile responsive
import { useState } from "react";
import {
  LayoutDashboard, Users, Calendar, DollarSign,
  ClipboardList, Menu, LogOut, Settings, X,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard",  label: "Dashboard",  icon: LayoutDashboard },
  { id: "employees",  label: "Employees",  icon: Users },
  { id: "attendance", label: "Attendance", icon: Calendar },
  { id: "payroll",    label: "Payroll",    icon: DollarSign },
  { id: "leave",      label: "Leave Mgmt", icon: ClipboardList },
];

export default function Sidebar({ page, setPage, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const navigate = (id) => { setPage(id); setMobileOpen(false); };
  const isActive = (id) => page === id || (page === "profile" && id === "employees");

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10 min-h-[64px]">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-lg"
          style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", boxShadow:"0 4px 14px rgba(249,115,22,0.4)" }}>
          🍴
        </div>
        {(!collapsed || isMobile) && (
          <div className="flex-1 overflow-hidden">
            <p className="text-white font-bold text-sm leading-tight whitespace-nowrap">FreshBite</p>
            <p className="text-orange-300 text-[10px] font-medium">Foods Ltd.</p>
          </div>
        )}
        {isMobile ? (
          <button onClick={() => setMobileOpen(false)} className="ml-auto text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        ) : (
          <button onClick={() => setCollapsed(c => !c)} className={`text-white/40 hover:text-white transition-colors ${collapsed ? "mx-auto" : "ml-auto"}`}>
            <Menu size={17} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {(!collapsed || isMobile) && (
          <p className="text-white/30 text-[9px] font-semibold uppercase tracking-widest px-3 mb-3">Main Menu</p>
        )}
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = isActive(id);
          return (
            <button key={id} onClick={() => navigate(id)}
              className={`group relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 border
                ${collapsed && !isMobile ? "justify-center" : ""}
                ${active
                  ? "bg-orange-500 text-white border-orange-400/30 shadow-lg shadow-orange-500/25"
                  : "text-slate-300 hover:text-white hover:bg-white/10 border-transparent"}`}>
              <Icon size={18} className="shrink-0" />
              {(!collapsed || isMobile) && <span className="whitespace-nowrap">{label}</span>}
              {active && (!collapsed || isMobile) && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />}
              {collapsed && !isMobile && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10 transition-opacity">
                  {label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3 border-t border-white/10 space-y-0.5">
        {(!collapsed || isMobile) && (
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/10 w-full transition-colors">
            <Settings size={17} className="shrink-0" />
            <span>Settings</span>
          </button>
        )}
        <button className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full transition-colors ${collapsed && !isMobile ? "justify-center" : ""}`}>
          <LogOut size={17} className="shrink-0" />
          {(!collapsed || isMobile) && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="sidebar-overlay lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-slate-900 z-50 transition-transform duration-300 lg:hidden shadow-2xl
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent isMobile={true} />
      </div>

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col h-screen bg-slate-900 border-r border-slate-700/50 transition-all duration-300 shrink-0 overflow-hidden
        ${collapsed ? "w-[68px]" : "w-[230px]"}`}>
        <SidebarContent isMobile={false} />
      </aside>
    </>
  );
}
