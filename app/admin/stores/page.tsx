"use client";
import { useState } from 'react';
import { useStore } from '@/app/state/useStore';

export default function MasterStoreControl() {
  // Yahan naya 'addItem' function import kiya hai
  const { stores, addStore, addItem, toggleStock, updateValue } = useStore();

  const [showStoreForm, setShowStoreForm] = useState(false);
  const [newStore, setNewStore] = useState({ name: '', logo: '🛒', category: '' });

  // Naya state: Kaunsi dukan mein saaman add kar rahe hain?
  const [activeStoreId, setActiveStoreId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ name: '', price: '', discount: '0' });

  const handleAddStore = () => {
    if (!newStore.name || !newStore.category) return alert("Bhai, Details toh bharo!");
    const storeObj = {
      id: (stores.length + 1).toString(),
      ...newStore,
      items: [] 
    };
    addStore(storeObj); 
    setShowStoreForm(false);
    setNewStore({ name: '', logo: '🛒', category: '' });
  };

  const handleAddItem = (storeId: string) => {
    if (!newItem.name || !newItem.price) return alert("Item ka naam aur price daalo!");
    addItem(storeId, {
      name: newItem.name.toUpperCase(),
      price: Number(newItem.price),
      discount: Number(newItem.discount)
    });
    setActiveStoreId(null);
    setNewItem({ name: '', price: '', discount: '0' }); // Reset
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans p-4 md:p-10 pb-32">
      <div className="max-w-5xl mx-auto space-y-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-10 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              MASTER <span className="text-cyan-500">STORES</span>
            </h1>
            <p className="text-[10px] text-gold-500 font-black tracking-[0.4em] uppercase">SUPER-ADMIN POWER CENTER</p>
          </div>
          
          <button 
            onClick={() => setShowStoreForm(!showStoreForm)}
            className="relative z-[50] bg-gold-600 text-white px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(217,119,6,0.3)] hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
          >
            {showStoreForm ? "CLOSE FORM X" : "+ ADD NEW STORE"}
          </button>
        </div>

        {showStoreForm && (
          <div className="bg-neutral-900 border-2 border-gold-500/50 p-10 rounded-[4rem] space-y-8 shadow-2xl animate-in slide-in-from-top-10 duration-500">
            <h3 className="text-sm font-black uppercase text-gold-500 tracking-[0.3em] border-b border-white/5 pb-4">REGISTER NEW SHOP</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <input 
                type="text" placeholder="SHOP NAME" value={newStore.name} 
                onChange={(e) => setNewStore({...newStore, name: e.target.value.toUpperCase()})}
                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm font-black text-white outline-none focus:border-cyan-500"
              />
              <input 
                type="text" placeholder="CATEGORY" value={newStore.category} 
                onChange={(e) => setNewStore({...newStore, category: e.target.value.toUpperCase()})}
                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm font-black text-white outline-none focus:border-cyan-500"
              />
              <button onClick={handleAddStore} className="w-full bg-cyan-500 text-black font-black py-5 rounded-2xl text-[11px] uppercase tracking-[0.2em] hover:bg-white">
                CONFIRM & CREATE
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-12">
          {stores.map(store => (
             <div key={store.id} className="bg-neutral-900 border border-white/10 rounded-[4rem] p-10 shadow-2xl">
              <div className="flex items-center gap-8 mb-8 pb-8 border-b border-white/5">
                <div className="w-24 h-24 bg-black rounded-[2.5rem] flex items-center justify-center text-5xl border border-white/10">
                  {store.logo}
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-2">{store.name}</h2>
                  <span className="text-[10px] font-black text-cyan-500 bg-cyan-500/10 px-6 py-2 rounded-full uppercase tracking-[0.2em] border border-cyan-500/20">
                    {store.category}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-5 text-[9px] font-black text-gray-500 uppercase tracking-widest px-4">
                  <div className="col-span-2">ITEM NAME</div><div>PRICE (₹)</div><div>OFF (%)</div><div>ACTION</div>
                </div>

                {store.items.length === 0 ? (
                  <p className="text-[10px] text-gray-500 font-black uppercase text-center py-6 tracking-widest">NO ITEMS ADDED YET</p>
                ) : (
                  store.items.map(item => (
                    <div key={item.id} className="grid grid-cols-5 items-center bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-cyan-500/30">
                      <div className="col-span-2 text-sm font-black text-white uppercase">{item.name}</div>
                      <input type="number" value={item.price} onChange={(e) => updateValue(store.id, item.id, 'price', Number(e.target.value))} className="bg-neutral-800 rounded-lg w-20 px-3 py-2 text-sm font-black text-white outline-none"/>
                      <input type="number" value={item.discount} onChange={(e) => updateValue(store.id, item.id, 'discount', Number(e.target.value))} className="bg-neutral-800 rounded-lg w-16 px-3 py-2 text-sm font-black text-gold-500 outline-none"/>
                      <button onClick={() => toggleStock(store.id, item.id)} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${item.isOutOfStock ? 'text-red-500 bg-red-500/10' : 'text-green-500 bg-green-500/10'}`}>
                        {item.isOutOfStock ? 'OUT' : 'IN'}
                      </button>
                    </div>
                  ))
                )}

                {/* ADD NEW ITEM SECTION */}
                <div className="pt-6 border-t border-white/5 mt-6">
                  {activeStoreId === store.id ? (
                    <div className="flex flex-wrap items-center gap-4 bg-black/50 p-6 rounded-3xl border border-cyan-500/30">
                      <input type="text" placeholder="ITEM NAME (E.G. MILK)" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="bg-black border border-white/10 rounded-xl px-4 py-3 text-xs font-black text-white outline-none focus:border-cyan-500 flex-1 min-w-[150px]"/>
                      <input type="number" placeholder="PRICE (₹)" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} className="bg-black border border-white/10 rounded-xl px-4 py-3 text-xs font-black text-white outline-none focus:border-cyan-500 w-28"/>
                      <input type="number" placeholder="DISCOUNT (%)" value={newItem.discount} onChange={(e) => setNewItem({...newItem, discount: e.target.value})} className="bg-black border border-white/10 rounded-xl px-4 py-3 text-xs font-black text-gold-500 outline-none focus:border-gold-500 w-32"/>
                      <button onClick={() => handleAddItem(store.id)} className="bg-cyan-500 text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white">
                        SAVE ITEM
                      </button>
                      <button onClick={() => setActiveStoreId(null)} className="text-gray-500 text-[10px] font-black uppercase px-4 hover:text-white">
                        CANCEL
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setActiveStoreId(store.id)} className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] border border-cyan-500/20 px-6 py-3 rounded-full hover:bg-cyan-500 hover:text-black transition-all">
                      + ADD NEW ITEM
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}