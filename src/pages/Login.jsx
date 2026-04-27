// src/pages/Login.jsx — Light professional theme
import { useState } from "react";
import { Mail, Lock, ArrowRight, Check } from "lucide-react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Invalid email address";
    if (!password) e.pw = "Password is required";
    else if (password.length < 4) e.pw = "Minimum 4 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-orange-50 to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-4 shadow-xl"
            style={{background:"linear-gradient(135deg,#f97316,#ea580c)", boxShadow:"0 8px 30px rgba(249,115,22,0.35)"}}>
            🍴
          </div>
          <h1 className="text-slate-800 text-2xl font-bold" style={{fontFamily:"'Poppins',sans-serif"}}>FreshBite Foods Ltd.</h1>
          <p className="text-slate-500 text-sm mt-1">Employee Management System</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h2 className="text-slate-800 font-semibold text-lg mb-1" style={{fontFamily:"'Poppins',sans-serif"}}>Welcome back 👋</h2>
          <p className="text-slate-500 text-sm mb-6">Sign in to your account to continue</p>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5" style={{fontFamily:"'Poppins',sans-serif"}}>Email Address</label>
              <div className={`flex items-center gap-2 bg-slate-50 border rounded-xl px-3.5 py-3 transition-all focus-within:ring-2 focus-within:ring-orange-500/20
                ${errors.email ? "border-red-400" : "border-slate-300 focus-within:border-orange-400"}`}>
                <Mail size={15} className="text-slate-400 shrink-0" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@freshbite.bd"
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  className="bg-transparent text-slate-700 text-sm outline-none placeholder:text-slate-400 w-full" style={{fontFamily:"'Poppins',sans-serif"}} />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5" style={{fontFamily:"'Poppins',sans-serif"}}>Password</label>
              <div className={`flex items-center gap-2 bg-slate-50 border rounded-xl px-3.5 py-3 transition-all focus-within:ring-2 focus-within:ring-orange-500/20
                ${errors.pw ? "border-red-400" : "border-slate-300 focus-within:border-orange-400"}`}>
                <Lock size={15} className="text-slate-400 shrink-0" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  className="bg-transparent text-slate-700 text-sm outline-none placeholder:text-slate-400 w-full" style={{fontFamily:"'Poppins',sans-serif"}} />
              </div>
              {errors.pw && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.pw}</p>}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer" onClick={() => setRemember(r => !r)}>
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer
                  ${remember ? "bg-orange-500 border-orange-500" : "border-slate-300 bg-slate-50"}`}>
                  {remember && <Check size={10} className="text-white" />}
                </div>
                <span className="text-slate-500 text-xs">Remember me</span>
              </label>
              <button className="text-orange-500 text-xs hover:text-orange-600 font-medium transition-colors">Forgot password?</button>
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-orange-500/25 disabled:opacity-70 flex items-center justify-center gap-2"
              style={{background:"linear-gradient(135deg,#f97316,#ea580c)", fontFamily:"'Poppins',sans-serif"}}>
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Signing in...</>
                : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </div>

          <div className="mt-5 pt-5 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs">Use any valid email &amp; 4+ char password to demo</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs mt-5">© 2024 FreshBite Foods Ltd. All rights reserved.</p>
      </div>
    </div>
  );
}
