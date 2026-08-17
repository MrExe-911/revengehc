import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { faq, faqCategories, uiText } from "@/lib/serverConfig";
import { SectionHeading } from "@/components/Section";

function QA({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl glass overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
        <span className="font-semibold text-white">{q}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="px-5 pb-5 text-sm text-muted-foreground border-t border-white/10 pt-3">{a}</p>}
    </div>
  );
}

export default function FAQ() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = faq
    .filter((g) => cat === "All" || g.category === cat)
    .map((g) => ({ ...g, items: g.items.filter((i) => i.q.toLowerCase().includes(q.toLowerCase()) || i.a.toLowerCase().includes(q.toLowerCase())) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="max-w-3xl mx-auto section-pad py-12 lg:py-16">
      <SectionHeading kicker={uiText.faq.kicker} title={uiText.faq.title} subtitle={uiText.faq.subtitle} />

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={uiText.faq.searchPlaceholder}
          className="w-full glass rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {["All", ...faqCategories].map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${cat === c ? "bg-primary text-[#050A19]" : "glass text-slate-300 hover:text-white"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((g) => (
          <div key={g.category} className="space-y-3">
            <h3 className="pixel text-sm uppercase tracking-[0.2em] text-primary mt-2">{g.category}</h3>
            {g.items.map((i, idx) => <QA key={idx} {...i} />)}
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center py-16 text-muted-foreground">{uiText.faq.emptyText}</p>}
      </div>
    </div>
  );
}