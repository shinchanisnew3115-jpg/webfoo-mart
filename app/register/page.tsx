"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '../state/useStore';
import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
  const [form, setForm] = useState({ name: '', phone: '', password: '' });
  const { registerUser, users } = useStore();
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || form.phone.length < 10 || form.password.length < 4) {
      return alert("Details sahi se bharo bhai!");
    }
    
    // Check if user already exists
    const exists = users.find(u => u.phone === form.phone);
    if (exists) return alert("Ye phone number pehle se registered hai!");

    registerUser(form);
    alert("Registration Successful! Ab login karo.");
    router.push('/login');
  };

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center p-6">
      <div className="bg-neutral-900 border border-white/5 p-12 rounded-[3.5rem] w-full max-w-md shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-10 flex flex-col items-center">
          <Image src="/logo.png" alt="Logo" width={80} height={80} className="mb-4 rounded-full border border-cyan-500/20" />
          <h1 className="text-3xl font-black uppercase tracking-tighter">CREATE <span className="text-cyan-500 underline decoration-gold-500">ACCOUNT</span></h1>
          <p className="text-[10px] text-gray-500 font-black tracking-[0.3em] uppercase mt-2">Join the WebFoo Network</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <input 
            type="text" placeholder="FULL NAME" 
            onChange={(e) => setForm({...form, name: e.target.value})} 
            className="w-full bg-black border border-white/10 p-5 rounded-2xl font-black outline-none focus:border-cyan-500 uppercase transition-all" 
          />
          <input 
            type="tel" placeholder="10-DIGIT PHONE" maxLength={10} 
            onChange={(e) => setForm({...form, phone: e.target.value})} 
            className="w-full bg-black border border-white/10 p-5 rounded-2xl font-black outline-none focus:border-cyan-500 transition-all" 
          />
          <input 
            type="password" placeholder="CREATE PASSWORD" 
            onChange={(e) => setForm({...form, password: e.target.value})} 
            className="w-full bg-black border border-white/10 p-5 rounded-2xl font-black outline-none focus:border-cyan-500 transition-all" 
          />
          <button type="submit" className="w-full bg-cyan-500 text-black p-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-cyan-500/20 active:scale-95">
            REGISTER NOW
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] font-black text-gray-500 uppercase tracking-widest">
          ALREADY HAVE AN ACCOUNT? <Link href="/login" className="text-gold-500 hover:text-white underline decoration-cyan-500 transition-colors">LOG IN</Link>
        </p>
      </div>
    </div>
  );
}