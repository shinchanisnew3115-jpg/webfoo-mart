import Sidebar from '../components/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden">
      <Sidebar />
      {/* md:ml-72 ensures sidebar space on PC, pt-20 for mobile header */}
      <main className="flex-1 overflow-y-auto md:ml-72 pt-20 md:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}