import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { getNewsById, news, uiText } from "@/lib/serverConfig";
import NewsCard from "@/components/cards/NewsCard";

export default function NewsDetail() {
  const { id } = useParams();
  const item = getNewsById(id);
  const t = uiText.news;

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto section-pad py-24 text-center">
        <h1 className="pixel text-3xl text-white mb-3">{t.notFoundTitle}</h1>
        <Link to="/news" className="text-primary font-semibold">← {t.back}</Link>
      </div>
    );
  }

  const related = news.filter((n) => n.id !== item.id && n.category === item.category).slice(0, 3);
  const paragraphs = (item.content || item.excerpt).split("\n\n").filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto section-pad py-12 lg:py-16">
      <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
        <Link to="/news" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary shrink-0">
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </Link>
        <span className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#050A19] bg-primary">{item.category}</span>
      </div>

      <h1 className="pixel text-3xl sm:text-4xl font-bold text-white leading-tight">{item.title}</h1>
      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
        <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {item.date}</span>
        <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {item.author}</span>
      </div>

      <div className="relative rounded-3xl overflow-hidden glass mt-8 h-64 sm:h-96">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      </div>

      <div className="mt-8 space-y-4 max-w-2xl">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-slate-200 leading-relaxed">{p}</p>
        ))}
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="pixel text-xl font-bold text-white mb-5">Baca Juga</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((n) => <NewsCard key={n.id} item={n} />)}
          </div>
        </div>
      )}
    </div>
  );
}
