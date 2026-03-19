"use client";
import { useState } from 'react';
import { useStore } from '../state/useStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useStore();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser(phone, password)) {
      router.push('/');
    } else {
      alert("Invalid Phone or Password! ❌");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-6">
      <Navbar />
      
      <div className="w-full max-w-md bg-neutral-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden mt-20">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic">Welcome <span className="text-cyan-500">Back</span></h2>
          <p className="text-[9px] font-black text-gray-500 tracking-[0.4em] uppercase mt-2 italic">WebFoo Marketplace Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Phone Number</label>
            <input 
              required type="tel" placeholder="9876543210" 
              value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-black border border-white/10 p-5 rounded-2xl font-black outline-none focus:border-cyan-500 transition-all placeholder:text-gray-800"
            />
          </div>

          <div className="space-y-2 relative">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Password</label>
            <div className="relative">
              <input 
                required 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 p-5 rounded-2xl font-black outline-none focus:border-cyan-500 transition-all placeholder:text-gray-800 pr-14"
              />
              
              {/* PROFESSIONAL SVG EYE BUTTON */}
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-500 transition-colors focus:outline-none p-1"
              >
                {showPassword ? (
                  /* EYE OFF ICON */
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  /* EYE OPEN ICON */
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-cyan-500 text-black p-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white transition-all shadow-xl shadow-cyan-500/10 active:scale-95 mt-4"
          >
            Get Access
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-4 italic">No account?</p>
          <Link href="/register" className="text-white font-black uppercase tracking-widest text-[11px] hover:text-cyan-500 transition-colors border-b border-white/10 pb-1">
            Create Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}