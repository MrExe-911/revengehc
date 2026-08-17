import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { rarityConfig, formatRupiah } from "@/lib/serverConfig";
import Icon from "@/components/Icon";

export default function KeyCard({ item }) {
  const r = rarityConfig[item.tier] || rarityConfig.common;
  return (
    <div
      className="group relative flex flex-col rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-2"
      style={{ borderColor: `${r.color}33` }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `0 0 0 1px ${r.color}, 0 16px 50px -14px ${r.glow}` }} />
      <div className="flex items-center justify-between mb-4">
        <span className="grid place-items-center w-14 h-14 rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${r.color}33, ${r.color}11)`, border: `1px solid ${r.color}55` }}>
          <Icon name={item.icon} className="w-7 h-7" />
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: r.color }}>{r.label}</span>
      </div>
      <h3 className="pixel text-xl font-bold text-white">{item.name}</h3>
      <p className="text-sm text-muted-foreground mb-5 line-clamp-2">{item.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-2xl font-bold text-white">{formatRupiah(item.price)}</span>
        <Link to={`/store/product/${item.id}`} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#050A19]" style={{ background: r.color }}>
          Beli <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
