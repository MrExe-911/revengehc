import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, User } from "lucide-react";

export default function NewsCard({ item }) {
  return (
    <Link to={`/news/${item.id}`} className="group relative flex flex-col rounded-2xl overflow-hidden glass transition-all duration-300 hover:-translate-y-1.5">
      <div className="relative h-48 overflow-hidden">
        <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#050A19] bg-primary">{item.category}</span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {item.date}</span>
          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {item.author}</span>
        </div>
        <h3 className="pixel text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.excerpt}</p>
        <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
          Read More <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}