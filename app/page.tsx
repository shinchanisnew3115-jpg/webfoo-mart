"use client"
import { useStore } from "./state/useStore";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const { stores, currentUser, isLoggedIn } = useStore();

  return (
    <main className="min-h-screen bg-black text-white p-5">
      <header className="mb-8">
        <h1 className="text-2xl font-black">WEBFOO MART</h1>
        <p className="text-xs text-gray-500">
          {isLoggedIn ? `Deliver to: ${currentUser?.address}` : "Please Login"}
        </p>
      </header>

      <section>
        <h2 className="text-lg font-bold mb-4">All Products</h2>
        <div className="grid grid-cols-2 gap-4">
          {stores[0].items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}