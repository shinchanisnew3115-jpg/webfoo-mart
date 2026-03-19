"use client";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <main className="bg-black min-h-screen text-white font-sans flex flex-col items-center justify-center px-6 overflow-hidden">
      <Navbar />
      
      <div className="max-w-md w-full text-center space-y-12 pt-20">
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="absolute inset-0 bg-gold-500/20 rounded-full blur-3xl"/>
          <motion.div
            initial={{ rotateY: 180, scale: 0, opacity: 0 }} animate={{ rotateY: 0, scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.8 }} whileHover={{ y: -10 }}
            className="relative z-10 w-28 h-28 bg-black border-4 border-gold-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.4)]"
          >
            <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 opacity-10"></div>
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring", stiffness: 300 }} className="text-6xl text-gold-500 font-black">
              ✓
            </motion.span>
          </motion.div>
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} initial={{ scale: 0, x: 0, y: 0 }} animate={{ scale: [0, 1, 0], x: (i % 2 === 0 ? 60 : -60), y: (i < 3 ? -60 : 60) }} transition={{ delay: 0.6, duration: 0.8 }} className="absolute w-2 h-2 bg-gold-500 rounded-full" />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="space-y-4">
          <h1 className="text-5xl font-black uppercase tracking-tighter">ORDER <span className="text-gold-500">PLACED</span></h1>
          <p className="text-cyan-500 font-black tracking-[0.4em] text-[10px] uppercase">WEBFOO MART • CONFIRMED SUCCESSFULLY</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="bg-neutral-900 border border-white/5 p-10 rounded-[3.5rem] shadow-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-5">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-left">EXPECTED IN</span>
            <span className="text-base font-black text-white">15-20 MINS</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="pt-4">
          <button onClick={() => router.push('/')} className="w-full py-6 bg-gold-500 text-black font-black rounded-[2rem] uppercase text-[12px] tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
            BACK TO HOME
          </button>
        </motion.div>
      </div>
    </main>
  );
}