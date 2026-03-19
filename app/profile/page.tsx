"use client"

import { useStore } from "../state/useStore"
import Link from "next/link"

export default function ProfilePage() {
  const { currentUser, isLoggedIn } = useStore()

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Bhai, pehle login toh kar lo!</h2>
        <Link href="/login" className="bg-cyan-500 text-black px-6 py-2 rounded-full font-bold">
          Go to Login
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="mb-8">
        <Link href="/" className="text-cyan-500 text-sm font-bold">← Back to Mart</Link>
        <h1 className="text-3xl font-black mt-4">MY PROFILE</h1>
      </header>

      <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 space-y-6">
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Full Name</p>
          <p className="text-lg font-bold">{currentUser?.name || "User Name"}</p>
        </div>

        <div className="h-px bg-white/5" />

        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Delivery Address</p>
          <p className="text-sm text-gray-300">{currentUser?.address || "No address saved"}</p>
        </div>

        <div className="h-px bg-white/5" />

        <button className="w-full bg-white text-black py-3 rounded-xl font-bold text-sm">
          Edit Profile
        </button>
        
        <button className="w-full border border-red-500/50 text-red-500 py-3 rounded-xl font-bold text-sm">
          Logout
        </button>
      </div>
    </div>
  )
}