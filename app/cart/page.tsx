"use client";
import { useStore } from '../state/useStore';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, currentUser, isLoggedIn } = useStore();
  const router = useRouter();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-60">
          <div className="w-32 h-32 bg-neutral-900 rounded-full flex items-center justify-center mb-6 border border-white/5 text-4xl">🛒</div>
          <h2 className="text-2xl font-black uppercase tracking-widest">Cart is Empty</h2>
          <Link href="/" className="mt-6 bg-cyan-500 text-black px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pb-32">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-32 px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* ITEMS LIST */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-3xl font-black uppercase tracking-tighter italic mb-6">Your <span className="text-cyan-500">Basket</span></h1>
          {cart.map((item) => (
            <div key={item.id} className="bg-neutral-900 border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between group">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center border border-white/5 font-black text-gold-500">Item</div>
                <div>
                  <h4 className="font-black uppercase text-sm tracking-tight">{item.name}</h4>
                  <p className="text-gold-500 font-black">₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-black p-2 rounded-2xl border border-white/10">
                <button onClick={() => updateCartQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center font-black text-xl hover:text-cyan-500">-</button>
                <span className="font-black w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateCartQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center font-black text-xl hover:text-cyan-500">+</button>
              </div>
            </div>
          ))}
        </div>

        {/* BILLING & ADDRESS SUMMARY */}
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-white/5 p-8 rounded-[3rem] shadow-2xl sticky top-32">
            <h3 className="text-xl font-black uppercase mb-6 border-b border-white/5 pb-4 tracking-tighter">Bill Summary</h3>
            <div className="space-y-3 text-[11px] font-black uppercase tracking-widest">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between text-gray-500"><span>Delivery Fee</span><span>{deliveryFee === 0 ? <span className="text-green-500">FREE</span> : `₹${deliveryFee}`}</span></div>
              <div className="flex justify-between text-white text-lg border-t border-white/5 pt-4 mt-2"><span>Total</span><span className="text-gold-500">₹{total}</span></div>
            </div>

            {/* SAVED ADDRESS PREVIEW */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Delivery To:</p>
              {currentUser?.address ? (
                <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                  <p className="text-[11px] font-bold text-gray-300 italic line-clamp-2">{currentUser.address}</p>
                  <Link href="/profile" className="text-[9px] text-cyan-500 font-black mt-2 inline-block uppercase hover:underline">Change Address</Link>
                </div>
              ) : (
                <Link href="/profile" className="text-[10px] text-gold-500 font-black uppercase border border-gold-500/20 block text-center p-3 rounded-xl hover:bg-gold-500 hover:text-black transition-all">Add Address to Checkout</Link>
              )}
            </div>

            <button 
              onClick={() => currentUser?.address ? router.push('/checkout') : router.push('/profile')}
              className="w-full bg-cyan-500 text-black font-black py-6 rounded-[2rem] mt-8 uppercase tracking-[0.2em] text-[11px] shadow-xl hover:bg-white transition-all active:scale-95"
            >
              {currentUser?.address ? "PROCEED TO PAY" : "COMPLETE PROFILE"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}