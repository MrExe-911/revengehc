import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Trophy, Users } from "lucide-react";
import { getEventById, events, uiText, formatEventDate, getEventRegisterLink } from "@/lib/serverConfig";
import EventCard from "@/components/cards/EventCard";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import DiscordIcon from "@/components/DiscordIcon";

export default function EventDetail() {
  const { id } = useParams();
  const event = getEventById(id);
  const t = uiText.community;

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto section-pad py-24 text-center">
        <h1 className="pixel text-3xl text-white mb-3">{t.eventNotFound}</h1>
        <Link to="/community" className="text-primary font-semibold">← {t.eventBack}</Link>
      </div>
    );
  }

  const related = events.filter((e) => e.id !== event.id).slice(0, 2);
  const paragraphs = (event.content || event.description).split("\n\n").filter(Boolean);
  const registerLink = getEventRegisterLink(event);

  return (
    <div className="max-w-4xl mx-auto section-pad py-12 lg:py-16">
      <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
        <Link to="/community" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary shrink-0">
          <ArrowLeft className="w-4 h-4" /> {t.eventBack}
        </Link>
        <span className="pixel shrink-0 px-3 py-1 rounded-full text-xs font-semibold text-[#050A19] bg-accent">{formatEventDate(event.date)}</span>
      </div>

      <h1 className="pixel text-3xl sm:text-4xl font-bold text-white leading-tight">{event.title}</h1>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5">
        <span className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-sm text-slate-200"><Trophy className="w-4 h-4 text-primary" /> {event.prize}</span>
        <span className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-sm text-slate-200"><Users className="w-4 h-4 text-accent" /> {event.participants} pemain ikut serta</span>
      </div>

      <div className="relative rounded-3xl overflow-hidden glass mt-8 h-56 sm:h-96">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
      </div>

      <div className="mt-8 space-y-4 max-w-2xl">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-slate-200 leading-relaxed">{p}</p>
        ))}
      </div>

      <div className="mt-10">
        <a href={registerLink.url} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-accent hover:shadow-[0_0_24px_hsl(var(--accent))] transition-shadow">
          {registerLink.via === "whatsapp" ? <WhatsAppIcon className="w-4 h-4" /> : <DiscordIcon className="w-4 h-4" />}
          {registerLink.label}
        </a>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="pixel text-xl font-bold text-white mb-5">Event Lainnya</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </div>
      )}
    </div>
  );
}
