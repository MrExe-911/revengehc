import { useState } from "react";
import { Search, Newspaper } from "lucide-react";
import { news, newsCategories, uiText } from "@/lib/serverConfig";
import NewsCard from "@/components/cards/NewsCard";
import { SectionHeading } from "@/components/Section";

export default function News() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const list = news.filter((n) =>
    (cat === "All" || n.category === cat) && n.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto section-pad py-12 lg:py-16">
      <SectionHeading kicker={uiText.news.kicker} title={uiText.news.title} subtitle={uiText.news.subtitle} />

      {/* filter */}
      <div className="flex flex-col lg:flex-row gap-3 mt-6">
        <div className="flex flex-wrap gap-2">
          {["All", ...newsCategories].map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === c ? "bg-primary text-[#050A19]" : "glass text-slate-300 hover:text-white"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="relative lg:ml-auto lg:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={uiText.news.searchPlaceholder}
            className="w-full glass rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {list.map((n) => <NewsCard key={n.id} item={n} />)}
      </div>
      {list.length === 0 && (
        <div className="flex flex-col items-center text-center gap-3 py-20">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-primary/10 text-primary"><Newspaper className="w-7 h-7" /></span>
          <p className="text-white font-semibold">
            {news.length === 0 ? "Belum ada berita saat ini" : "Tidak ada berita yang cocok"}
          </p>
          <p className="text-sm text-muted-foreground max-w-sm">
            {news.length === 0
              ? "Cek lagi nanti — update, event, dan pengumuman terbaru akan muncul di sini."
              : "Coba ganti kata kunci pencarian atau pilih kategori lain."}
          </p>
        </div>
      )}
    </div>
  );
}