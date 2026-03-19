export default function ProductCard({ name, price, category }: { name: string, price: string, category: string }) {
  return (
    <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-4 hover:border-orange-500/50 transition-all group cursor-pointer">
      <div className="w-full h-48 bg-neutral-800 rounded-2xl mb-4 overflow-hidden flex items-center justify-center text-gray-600 font-bold uppercase tracking-widest text-xs">
        Product Image
      </div>
      <div className="px-2">
        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{category}</span>
        <h3 className="text-lg font-bold text-white mt-1 group-hover:text-orange-500 transition-colors">{name}</h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-black text-white">₹{price}</span>
          <button className="bg-white text-black text-xs font-black px-4 py-2 rounded-xl hover:bg-orange-500 transition-colors">
            BUY
          </button>
        </div>
      </div>
    </div>
  );
}