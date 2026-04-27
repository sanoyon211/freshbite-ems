// src/components/Modal.jsx — Light theme + responsive
import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { DEPT_OPTIONS } from "../data/dummyData";

function Field({ label, name, type = "text", placeholder, options, value, onChange, error }) {
  const base = "w-full bg-white border rounded-xl px-3.5 py-2.5 text-slate-700 text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500/20";
  return (
    <div>
      <label className="block text-slate-600 text-xs font-semibold mb-1.5" style={{fontFamily:"'Poppins',sans-serif"}}>{label}</label>
      {options
        ? <select value={value} onChange={e => onChange(name, e.target.value)}
            className={`${base} ${error ? "border-red-400 focus:border-red-400" : "border-slate-300 focus:border-orange-400"} cursor-pointer`}
            style={{fontFamily:"'Poppins',sans-serif"}}>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        : <input type={type} value={value} onChange={e => onChange(name, e.target.value)} placeholder={placeholder}
            className={`${base} ${error ? "border-red-400 focus:border-red-400" : "border-slate-300 focus:border-orange-400"}`}
            style={{fontFamily:"'Poppins',sans-serif"}} />
      }
      {error && <p className="text-red-500 text-[10px] mt-1 font-medium">{error}</p>}
    </div>
  );
}

export function EmployeeModal({ employee, onSave, onClose, addToast }) {
  const isEdit = !!employee?.id;
  const [form, setForm] = useState(employee || {
    name:"", id:"", dept:"Kitchen Staff", role:"", phone:"", email:"",
    joinDate:"", salary:"", status:"Active", perf:"Good", bonus:0, deduction:0,
  });
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.id.trim()) e.id = "Required";
    if (!form.role.trim()) e.role = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.joinDate) e.joinDate = "Required";
    if (!form.salary || isNaN(form.salary)) e.salary = "Must be a number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) { addToast("Please fix the errors.", "error"); return; }
    onSave({ ...form, salary: +form.salary, bonus: +(form.bonus || 0), deduction: +(form.deduction || 0) });
  };

  const fields = [
    { label:"Full Name *",           name:"name",      placeholder:"e.g. Rahim Uddin" },
    { label:"Employee ID *",         name:"id",        placeholder:"e.g. FB-010" },
    { label:"Department *",          name:"dept",      options: DEPT_OPTIONS },
    { label:"Position / Role *",     name:"role",      placeholder:"e.g. Head Chef" },
    { label:"Phone *",               name:"phone",     placeholder:"01711-234567" },
    { label:"Email *",               name:"email",     type:"email", placeholder:"name@freshbite.bd" },
    { label:"Join Date *",           name:"joinDate",  type:"date" },
    { label:"Basic Salary (BDT) *",  name:"salary",    type:"number", placeholder:"30000" },
    { label:"Bonus (BDT)",           name:"bonus",     type:"number", placeholder:"2000" },
    { label:"Deduction (BDT)",       name:"deduction", type:"number", placeholder:"500" },
    { label:"Status",                name:"status",    options:["Active","Inactive"] },
    { label:"Performance",           name:"perf",      options:["Excellent","Good","Average","Poor"] },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl animate-modal-in">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10 rounded-t-2xl">
          <div>
            <h2 className="text-slate-800 font-bold text-base" style={{fontFamily:"'Poppins',sans-serif"}}>{isEdit ? "Edit Employee" : "Add New Employee"}</h2>
            <p className="text-slate-400 text-xs mt-0.5">Fill in the employee details below</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors"><X size={18} /></button>
        </div>
        <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map(f => <Field key={f.name} {...f} value={form[f.name]} onChange={set} error={errors[f.name]} />)}
        </div>
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex flex-col sm:flex-row gap-3 justify-end border-t border-slate-100 pt-4">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors w-full sm:w-auto" style={{fontFamily:"'Poppins',sans-serif"}}>Cancel</button>
          <button onClick={handleSave} className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all shadow-md shadow-orange-500/20 w-full sm:w-auto"
            style={{background:"linear-gradient(135deg,#f97316,#ea580c)", fontFamily:"'Poppins',sans-serif"}}>
            {isEdit ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConfirmModal({ message, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-modal-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
            <AlertCircle size={20} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-slate-800 font-semibold text-sm" style={{fontFamily:"'Poppins',sans-serif"}}>Confirm Delete</h3>
            <p className="text-slate-400 text-xs">This action cannot be undone</p>
          </div>
        </div>
        <p className="text-slate-600 text-sm mb-5" style={{fontFamily:"'Poppins',sans-serif"}}>{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-sm transition-colors" style={{fontFamily:"'Poppins',sans-serif"}}>Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors" style={{fontFamily:"'Poppins',sans-serif"}}>Delete</button>
        </div>
      </div>
    </div>
  );
}
