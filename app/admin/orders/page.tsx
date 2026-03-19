"use client";
import { useStore } from '../../state/useStore';

export default function OrderLogistics() {
  // CONNECTED TO GLOBAL STORE
  const { orders, updateOrderStatus } = useStore();

  return (
    <div className="p-4 md:p-10 bg-black min-h-screen text-white font-sans pb-32">
      <div className="mb-10 border-b border-cyan-500/20 pb-8">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          LIVE <span className="text-cyan-500">LOGISTICS</span>
        </h1>
        <p className="text-[10px] text-gold-500 font-black tracking-[0.3em] uppercase mt-2">LOCAL DISPATCH CONTROL</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {orders.length === 0 ? (
           <p className="text-gray-500 font-black uppercase text-center py-20 tracking-widest">NO LIVE DISPATCHES</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-neutral-900 border border-white/10 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-black text-cyan-500 bg-cyan-500/10 px-4 py-2 rounded-full uppercase tracking-widest">ORDER ID: {order.id}</span>
                  <p className="text-[10px] text-gray-500 font-black mt-4 uppercase tracking-widest">RECEIVED: {order.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-gold-500 leading-none">₹{order.amount}</p>
                  <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-2 block">TOTAL BILL</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">ITEMS TO PACK:</p>
                  <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
                    <p className="text-sm font-black text-white uppercase">{order.items}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">DELIVERY TO:</p>
                  <div className="bg-black/50 p-5 rounded-2xl border border-cyan-500/10 space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <p className="text-sm font-black text-cyan-400 uppercase">{order.customer}</p>
                      <p className="text-sm text-white font-black">{order.phone}</p>
                    </div>
                    <p className="text-[10px] text-gold-500 font-black uppercase">📍 LANDMARK: {order.landmark}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => updateOrderStatus(order.id, 'PACKED')}
                  className="flex-1 bg-cyan-500 text-black font-black py-4 rounded-2xl text-[11px] uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                >
                  {order.status === 'PACKED' ? 'ALREADY PACKED' : 'MARK PACKED'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}