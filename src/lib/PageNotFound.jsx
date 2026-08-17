import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#050A19]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="pixel text-7xl font-bold text-primary text-glow">404</h1>
          <div className="h-0.5 w-16 bg-white/10 mx-auto" />
        </div>
        <div className="space-y-3">
          <h2 className="pixel text-2xl font-bold text-white">Page Not Found</h2>
          <p className="text-muted-foreground leading-relaxed">
            Halaman <span className="font-medium text-slate-300">"{pageName}"</span> tidak ditemukan.
          </p>
        </div>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#050A19] bg-primary hover:shadow-[0_0_24px_hsl(var(--primary))] transition-shadow"
          >
            <Home className="w-4 h-4" /> Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}
