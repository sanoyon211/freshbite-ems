// src/App.jsx — Root with mobile sidebar state
import { useState, useCallback } from "react";

import Sidebar   from "./components/Sidebar";
import Navbar    from "./components/Navbar";
import Toast     from "./components/Toast";

import Login      from "./pages/Login";
import Dashboard  from "./pages/Dashboard";
import Employees  from "./pages/Employees";
import Profile    from "./pages/Profile";
import Attendance from "./pages/Attendance";
import Payroll    from "./pages/Payroll";
import Leave      from "./pages/Leave";

import { INITIAL_EMPLOYEES } from "./data/dummyData";

export default function App() {
  const [loggedIn,    setLoggedIn]    = useState(false);
  const [page,        setPage]        = useState("dashboard");
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [collapsed,   setCollapsed]   = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [employees,   setEmployees]   = useState(INITIAL_EMPLOYEES);
  const [toasts,      setToasts]      = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts(ts => [...ts, { id, message, type }]);
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 3500);
  }, []);

  const removeToast = useCallback(
    (id) => setToasts(ts => ts.filter(t => t.id !== id)), []
  );

  const navigate = (p) => { setPage(p); if (p !== "profile") setSelectedEmp(null); };

  if (!loggedIn) return (
    <>
      <Login onLogin={() => setLoggedIn(true)} />
      <Toast toasts={toasts} removeToast={removeToast} />
    </>
  );

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden" style={{fontFamily:"'Poppins',sans-serif"}}>
      <Sidebar
        page={page}
        setPage={navigate}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar
          page={page}
          notifications={3}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 overflow-y-auto bg-slate-100">
          {page === "dashboard"  && <Dashboard  employees={employees} setPage={navigate} setSelectedEmp={setSelectedEmp} />}
          {page === "employees"  && <Employees  employees={employees} setEmployees={setEmployees} setPage={navigate} setSelectedEmp={setSelectedEmp} addToast={addToast} />}
          {page === "profile"    && <Profile    employee={selectedEmp} setPage={navigate} addToast={addToast} />}
          {page === "attendance" && <Attendance employees={employees} addToast={addToast} />}
          {page === "payroll"    && <Payroll    employees={employees} addToast={addToast} />}
          {page === "leave"      && <Leave      addToast={addToast} />}
        </main>
      </div>

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
