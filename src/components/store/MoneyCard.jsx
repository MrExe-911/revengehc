import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatRupiah } from "@/lib/serverConfig";
import Icon from "@/components/Icon";

export default function MoneyCard({ pkg }) {
  return (
    <div className="group relative flex flex-col rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-2 border-primary/20">
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `0 0 0 1px hsl(var(--primary)), 0 16px 50px -14px rgba(0,242,255,0.45)` }} />
      <div className="flex items-center gap-3 mb-4">
        <span className="grid place-items-center w-12 h-12 rounded-xl text-primary bg-primary/10 border border-primary/30 animate-float">
          <Icon name={pkg.icon} className="w-6 h-6" />
        </span>
        <span className="mono text-2xl font-bold text-white">{pkg.name}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-6">{pkg.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">Harga</span>
          <p className="text-2xl font-bold text-white">{formatRupiah(pkg.price)}</p>
        </div>
        <Link to={`/store/product/${pkg.id}`} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#050A19] bg-primary">
          Beli <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}