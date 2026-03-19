"use client";
import { useState } from 'react';
import { useStore } from '../state/useStore';
import Navbar from '../components/Navbar';

export default function Profile() {
  const { currentUser, updateProfile } = useStore();
  const [address, setAddress] = useState(currentUser?.address || "");
  const [landmark, setLandmark] = useState(currentUser?.landmark || "");

  const handleSave = () => {
    updateProfile({ address, landmark });
    alert("Profile Updated! ✅");
  };

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <Navbar />
      <div className="max-w-md mx-auto mt-20 space-y-6">
        <h2 className="text-lg font-black uppercase italic tracking-tighter">My Account</h2>
        
        <div className="bg-neutral-900/50 border border-white/5 p-4 rounded-2xl space-y-3">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Delivery Details</p>
          
          <input 
            value={address} onChange={(e) => setAddress(e.target.value)}
            placeholder="House / Street Name"
            className="w-full bg-black border border-white/10 p-3 rounded-xl text-[11px] font-bold outline-none focus:border-cyan-500 transition-all"
          />
          <input 
            value={landmark} onChange={(e) => setLandmark(e.target.value)}
            placeholder="Landmark (Optional)"
            className="w-full bg-black border border-white/10 p-3 rounded-xl text-[11px] font-bold outline-none focus:border-cyan-500 transition-all"
          />

          <button 
            onClick={handleSave}
            className="w-full bg-white text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 active:bg-cyan-500 transition-all duration-75 shadow-lg"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}