import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getRankColor, hexToRgba, formatRupiah } from "@/lib/serverConfig";
import Icon from "@/components/Icon";

export default function RankCard({ rank }) {
  const color = getRankColor(rank);
  const glow = hexToRgba(color, 0.5);

  return (
    <div
      className="group relative flex flex-col rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-2"
      style={{ borderColor: `${color}33` }}
    >
      {/* animated rarity border on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 0 0 1px ${color}, 0 18px 60px -12px ${glow}` }}
      />
      {/* discount badge / rank gratis badge */}
      {rank.price === 0 ? (
        <span className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold text-[#050A19] bg-slate-300 shadow-lg">
          GRATIS
        </span>
      ) : rank.discount > 0 && (
        <span className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold text-[#050A19] bg-primary shadow-[0_0_20px_hsl(var(--primary))]">
          -{rank.discount}%
        </span>
      )}

      {/* header */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className="grid place-items-center w-12 h-12 rounded-xl text-white"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
        >
          <Icon name={rank.icon} className="w-6 h-6" />
        </span>
        <div>
          <h3 className="pixel text-2xl font-bold text-white leading-none">{rank.name}</h3>
          <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color }}>{rank.category} Rank</span>
        </div>
      </div>

      {/* price */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-3xl font-bold text-white">{rank.price === 0 ? "Gratis" : formatRupiah(rank.price)}</span>
        {rank.oldPrice && <span className="text-sm text-muted-foreground line-through">{formatRupiah(rank.oldPrice)}</span>}
      </div>
      {rank.price === 0 && <p className="text-xs text-emerald-400 mb-1">Otomatis didapat saat pertama join</p>}
      <p className="text-sm text-muted-foreground mb-5">{rank.description}</p>

      {/* feature tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {rank.features.map((f) => (
          <span key={f} className="mono text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-primary">{f}</span>
        ))}
      </div>

      {/* benefits */}
      <ul className="grid grid-cols-2 gap-2.5 mb-6">
        {rank.benefits.map((b) => (
          <li key={b.label} className="flex items-center gap-2 text-xs text-slate-200">
            <span className="grid place-items-center w-7 h-7 rounded-lg bg-white/5 shrink-0" style={{ color }}>
              <Icon name={b.icon} className="w-3.5 h-3.5" />
            </span>
            {b.label}
          </li>
        ))}
      </ul>

      <Link
        to={`/store/product/${rank.id}`}
        className="mt-auto flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-[#050A19] transition-all duration-300 group-hover:translate-y-0"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
      >
        {rank.price === 0 ? "Lihat Detail" : "Beli Sekarang"} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
