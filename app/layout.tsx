import './globals.css';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';

export const metadata = {
  title: 'WebFoo Mart',
  description: 'Premium Multi-Store Marketplace',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased selection:bg-cyan-500 selection:text-black">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}