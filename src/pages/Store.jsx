import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  ranks, moneyPackages, keys, storeCategories, sortOptions, uiText,
} from "@/lib/serverConfig";
import Icon from "@/components/Icon";
import RankCard from "@/components/store/RankCard";
import KeyCard from "@/components/store/KeyCard";
import MoneyCard from "@/components/store/MoneyCard";
import { SectionHeading } from "@/components/Section";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

function sortList(list, sort) {
  switch (sort) {
    case "price-asc": return [...list].sort((a, b) => a.price - b.price);
    case "price-desc": return [...list].sort((a, b) => b.price - a.price);
    case "discount": return [...list].sort((a, b) => (b.discount || 0) - (a.discount || 0));
    default: return list;
  }
}

function filterByQuery(list, query) {
  if (!query.trim()) return list;
  return list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
}

export default function Store() {
  const [activeCat, setActiveCat] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const t = uiText.store;

  const filteredRanks = useMemo(() => sortList(filterByQuery(ranks, query), sort), [query, sort]);
  const filteredMoney = useMemo(() => sortList(filterByQuery(moneyPackages, query), sort), [query, sort]);
  const filteredKeys = useMemo(() => sortList(filterByQuery(keys, query), sort), [query, sort]);

  const isEmpty =
    (activeCat === "all" && filteredRanks.length === 0 && filteredMoney.length === 0 && filteredKeys.length === 0) ||
    (activeCat === "ranks" && filteredRanks.length === 0) ||
    (activeCat === "money" && filteredMoney.length === 0) ||
    (activeCat === "keys" && filteredKeys.length === 0);

  return (
    <div className="max-w-7xl mx-auto section-pad py-12 lg:py-16">
      <SectionHeading kicker={t.kicker} title={t.title} subtitle={t.subtitle} align="left" />

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mt-6">
        {storeCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCat(c.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCat === c.id ? "bg-primary text-[#050A19]" : "glass text-slate-300 hover:text-white"
            }`}
          >
            <Icon name={c.icon} className="w-3.5 h-3.5" /> {c.label}
          </button>
        ))}
      </div>

      {/* Search + sort */}
      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full glass rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="glass rounded-xl border-none h-auto py-3 px-4 text-sm text-white sm:w-56 focus:ring-primary/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#0F172A] border-white/10 text-white z-[70]">
            {sortOptions.map((o) => (
              <SelectItem key={o.id} value={o.id} className="focus:bg-primary/20 focus:text-white">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {isEmpty ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="pixel text-xl text-white mb-2">{t.emptyTitle}</p>
          <p>{t.emptyDesc}</p>
        </div>
      ) : (
        <div className="mt-8 space-y-12">
          {(activeCat === "all" || activeCat === "ranks") && filteredRanks.length > 0 && (
            <div>
              {activeCat === "all" && (
                <div className="flex items-center gap-3 mb-5">
                  <Icon name="Crown" className="w-4 h-4 text-primary" />
                  <h3 className="pixel text-sm uppercase tracking-[0.2em] text-primary">{t.sectionRanks}</h3>
                  <span className="flex-1 h-px bg-white/10" />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRanks.map((r) => <RankCard key={r.id} rank={r} />)}
              </div>
            </div>
          )}

          {(activeCat === "all" || activeCat === "money") && filteredMoney.length > 0 && (
            <div>
              {activeCat === "all" && (
                <div className="flex items-center gap-3 mb-5">
                  <Icon name="Coins" className="w-4 h-4 text-primary" />
                  <h3 className="pixel text-sm uppercase tracking-[0.2em] text-primary">{t.sectionMoney}</h3>
                  <span className="flex-1 h-px bg-white/10" />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMoney.map((m) => <MoneyCard key={m.id} pkg={m} />)}
              </div>
            </div>
          )}

          {(activeCat === "all" || activeCat === "keys") && filteredKeys.length > 0 && (
            <div>
              {activeCat === "all" && (
                <div className="flex items-center gap-3 mb-5">
                  <Icon name="Key" className="w-4 h-4 text-primary" />
                  <h3 className="pixel text-sm uppercase tracking-[0.2em] text-primary">{t.sectionKeys}</h3>
                  <span className="flex-1 h-px bg-white/10" />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredKeys.map((k) => <KeyCard key={k.id} item={k} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
