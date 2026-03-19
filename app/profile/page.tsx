"use client";
import { useStore } from '../state/useStore';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { currentUser, logout } = useStore();
  const router = useRouter();

  if (!currentUser) {
    return <div className="p-10 text-center text-white">Loading...</div>;
  }

  return (
    <div className="bg-black min-h-screen text-white p-4 pb-24">
      <Navbar />
      
      <div className="max-w-md mx-auto mt-20 space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-2xl font-black text-black">
            {currentUser.name[0]}
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">{currentUser.name}</h2>
            <p className="text-xs text-gray-500 font-bold">{currentUser.phone}</p>
          </div>
        </div>

        {/* DETAILS CARD */}
        <div className="bg-neutral-900 border border-white/5 rounded-[2rem] p-6 space-y-4">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Full Name</p>
            <p className="text-sm font-bold">{currentUser.name}</p>
          </div>

          <div className="h-[1px] bg-white/5 w-full"></div>

          <div className="space-y-1">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Delivery Address</p>
            <p className="text-sm font-bold text-gray-300">
              {currentUser.address || "No address added yet"}
            </p>
            <p className="text-xs text-cyan-500 italic">{currentUser.landmark}</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-neutral-800 p-4 rounded-2xl text-[10px] font-black uppercase active:scale-95 transition-all">
            Edit Profile
          </button>
          <button 
            onClick={() => { logout(); router.push('/'); }}
            className="bg-red-500/10 text-red-500 border border-red-500/20 p-4 rounded-2xl text-[10px] font-black uppercase active:scale-95 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}