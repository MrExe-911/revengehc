import { ExternalLink } from "lucide-react";
import Icon from "@/components/Icon";
import { voteRewards, uiText } from "@/lib/serverConfig";

export default function VoteCard({ site }) {
  return (
    <div className="relative flex flex-col rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1.5 border-primary/15">
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity" style={{ boxShadow: "0 0 0 1px hsl(var(--primary)), 0 14px 44px -16px rgba(0,242,255,0.5)" }} />
      <div className="flex items-center justify-between mb-4">
        <h3 className="pixel text-xl font-bold text-white">{site.name}</h3>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" /> Ready
        </span>
      </div>
      <div className="space-y-2 mb-5">
        {voteRewards.map((r) => (
          <div key={r.label} className="flex items-center gap-2 text-sm text-slate-200">
            <span className="grid place-items-center w-7 h-7 rounded-lg bg-primary/10 text-primary"><Icon name={r.icon} className="w-3.5 h-3.5" /></span>
            {r.label}
          </div>
        ))}
      </div>
      <a href={site.url} target="_blank" rel="noreferrer"
        className="mt-auto flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-[#050A19] bg-primary hover:shadow-[0_0_24px_hsl(var(--primary))] transition-shadow">
        {uiText.vote.voteSiteCta} <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
