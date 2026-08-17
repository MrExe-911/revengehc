import { Link } from "react-router-dom";
import { Trophy, Users, ArrowRight } from "lucide-react";
import { formatEventDate } from "@/lib/serverConfig";

export default function EventCard({ event }) {
  return (
    <Link to={`/community/events/${event.id}`} className="group relative flex flex-col rounded-2xl overflow-hidden glass transition-all duration-300 hover:-translate-y-1.5">
      <div className="relative h-44 overflow-hidden">
        <img src={event.image} alt={event.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent" />
        <span className="absolute top-3 left-3 pixel px-3 py-1 rounded-full text-xs font-semibold text-[#050A19] bg-accent">{formatEventDate(event.date)}</span>
        <span className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#050A19]/70 backdrop-blur">
          <Users className="w-3.5 h-3.5 text-accent" /> {event.participants} players
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="pixel text-lg font-bold text-white">{event.title}</h3>
        <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{event.description}</p>
        <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-200"><Trophy className="w-3.5 h-3.5 text-primary" /> {event.prize}</span>
          <span className="flex items-center gap-1.5 text-slate-200"><Users className="w-3.5 h-3.5 text-accent" /> {event.participants} ikut serta</span>
        </div>
        <span className="mt-5 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/10 group-hover:bg-primary group-hover:text-[#050A19] group-hover:border-primary transition-colors">
          View Event <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
