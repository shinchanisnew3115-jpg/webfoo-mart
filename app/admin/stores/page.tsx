"use client"

import { useState } from "react"
import { useStore } from "../../state/useStore"
import { LayoutGrid, Plus, Package, Settings, AlertCircle } from "lucide-react"

export default function MasterStoreControl() {
  // Sirf 'stores' liya hai taaki build error na aaye
  const { stores } = useStore();

  return (
    <div className="p-4 md:p-10 bg-black min-h-screen text-white font-sans pb-32">
      <header className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter italic">STORE <span className="text-cyan-500">CONTROL</span></h1>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2">Manage your inventory and outlets</p>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-neutral-900 p-6 rounded-[2rem] border border-white/5">
          <LayoutGrid className="w-5 h-5 text-cyan-500 mb-4" />
          <p className="text-2xl font-black leading-none">{stores.length}</p>
          <p className="text-[9px] text-gray-500 font-bold uppercase mt-2">Active Stores</p>
        </div>
      </div>

      {/* Stores List */}
      <div className="space-y-6">
        {stores.map((store) => (
          <div key={store.id} className="bg-neutral-900 rounded-[2.5rem] border border-white/5 overflow-hidden">
            <div className="p-8 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center text-xl font-bold">
                  {store.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase italic">{store.name}</h3>
                  <p className="text-[10px] text-cyan-500 font-bold tracking-widest uppercase">ID: {store.id}</p>
                </div>
              </div>
              <button className="bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {store.items.map((item) => (
                <div key={item.id} className="bg-black/40 p-5 rounded-[1.5rem] border border-white/5">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm font-black uppercase truncate pr-4">{item.name}</p>
                    {item.isOutOfStock && (
                      <span className="bg-red-500/10 text-red-500 text-[8px] font-black px-2 py-1 rounded-md uppercase">Out of Stock</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-black italic">₹{item.price}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase italic">Disc: {item.discount}%</p>
                  </div>
                </div>
              ))}
              
              <button className="border-2 border-dashed border-white/5 rounded-[1.5rem] p-5 flex items-center justify-center gap-2 text-gray-500 hover:border-cyan-500/50 hover:text-cyan-500 transition-all">
                <Plus className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Add Item</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-8 py-4 rounded-full flex items-center gap-4 shadow-2xl shadow-cyan-500/20 z-50">
        <Plus className="w-5 h-5" />
        <span className="text-xs font-black uppercase tracking-tighter">Register New Store</span>
      </div>
    </div>
  )
}