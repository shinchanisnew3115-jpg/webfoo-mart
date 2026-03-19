"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useStore } from "../state/useStore" // Tera purana store

export default function LoginPage() {
  const router = useRouter()
  const { login } = useStore() // useStore ka login function
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Dummy login logic jo useStore se connected hai
    if (formData.email && formData.password) {
      login(formData.email, "User") // Store mein user save hoga
      router.push("/") // Seedha Home Page par bhej dega
    } else {
      alert("Bhai details toh bharo!")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      {/* Logo Section */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-cyan-500 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] mb-4">
          <div className="text-black text-4xl font-bold">✨</div>
        </div>
        <h1 className="text-3xl font-black tracking-tighter">
          WEBFOO<span className="text-green-400">MART</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2 font-medium">Lightning-fast campus delivery</p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-neutral-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-green-400 outline-none transition-all"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-neutral-900 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm focus:border-green-400 outline-none transition-all"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="text-right">
          <button type="button" className="text-xs font-bold text-cyan-400">Forgot password?</button>
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-cyan-500 text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all active:scale-95"
        >
          SIGN IN <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {/* Social Login */}
      <div className="w-full max-w-sm mt-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Or continue with</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-neutral-900 border border-white/5 py-3 rounded-2xl hover:bg-neutral-800 transition-all font-bold text-sm">
            <span>G</span> Google
          </button>
          <button className="flex items-center justify-center gap-2 bg-neutral-900 border border-white/5 py-3 rounded-2xl hover:bg-neutral-800 transition-all font-bold text-sm">
            <span>f</span> Facebook
          </button>
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Don't have an account? <span className="text-cyan-400 font-bold cursor-pointer">Sign up</span>
      </p>
    </div>
  )
}