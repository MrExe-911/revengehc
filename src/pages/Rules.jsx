import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { rules, uiText } from "@/lib/serverConfig";
import { SectionHeading } from "@/components/Section";

function RuleBlock({ category, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl glass overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="pixel text-lg font-bold text-white">{category}</span>
        <ChevronDown className={`w-5 h-5 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="px-5 pb-5 space-y-2.5 border-t border-white/10 pt-4">
          {items.map((r, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
              <span className="mono text-xs text-primary mt-0.5">●</span> {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Rules() {
  return (
    <div className="max-w-3xl mx-auto section-pad py-12 lg:py-16">
      <SectionHeading kicker={uiText.rules.kicker} title={uiText.rules.title} subtitle={uiText.rules.subtitle} />
      <div className="space-y-3 mt-8">
        {rules.map((g) => <RuleBlock key={g.category} {...g} />)}
      </div>
    </div>
  );
}