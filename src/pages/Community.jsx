import { Users, Hash, Youtube, Instagram, Music2, ArrowRight, CalendarX } from "lucide-react";
import { serverConfig, events, uiText } from "@/lib/serverConfig";
import { useDiscordStats } from "@/hooks/useDiscordStats";
import DiscordIcon from "@/components/DiscordIcon";
import EventCard from "@/components/cards/EventCard";
import Section, { SectionHeading } from "@/components/Section";

export default function Community() {
  const { online, members, loading, isLive, error } = useDiscordStats();

  return (
    <div className="max-w-7xl mx-auto section-pad py-12 lg:py-16">
      <SectionHeading kicker={uiText.community.kicker} title={uiText.community.title} subtitle={uiText.community.subtitle} />

      {/* Discord hero card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-3xl glass-strong p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-10 w-56 h-56 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
            <span className="grid place-items-center w-14 h-14 rounded-2xl bg-accent text-white mb-4"><DiscordIcon className="w-7 h-7" /></span>
            <h2 className="pixel text-3xl font-bold text-white">{uiText.community.discordTitle}</h2>
            <p className="text-muted-foreground mt-2 max-w-md">{uiText.community.discordSubtitle}</p>
            <div className="flex flex-wrap items-center gap-6 mt-6">
              <div>
                <p className={`mono text-2xl font-bold text-primary transition-opacity ${loading ? "opacity-50" : "opacity-100"}`}>
                  {loading ? "…" : error ? "N/A" : online.toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" /> Online Members</p>
              </div>
              <div>
                <p className={`mono text-2xl font-bold text-white transition-opacity ${loading ? "opacity-50" : "opacity-100"}`}>
                  {loading ? "…" : error ? "N/A" : members.toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Hash className="w-3 h-3" /> Member Count</p>
              </div>
              {isLive && (
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" /> Live
                </span>
              )}
              {!loading && error && (
                <span className="flex items-center gap-1.5 text-[11px] text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Data tidak tersedia
                </span>
              )}
            </div>
            <a href={serverConfig.discordUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-bold text-white bg-accent hover:shadow-[0_0_24px_hsl(var(--accent))]">
              Join Discord <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="rounded-3xl glass p-6">
          <h3 className="pixel text-lg font-bold text-white mb-4">{uiText.community.followUs}</h3>
          {[
            { icon: Youtube, label: "YouTube", href: serverConfig.youtubeUrl, color: "#FF0000" },
            { icon: Music2, label: "TikTok", href: serverConfig.tiktokUrl, color: "#00F2FF" },
            { icon: Instagram, label: "Instagram", href: serverConfig.instagramUrl, color: "#EC4899" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl glass mb-2 hover:border-white/20 transition-colors">
              <span className="grid place-items-center w-10 h-10 rounded-xl text-white" style={{ background: `${s.color}22`, color: s.color }}><s.icon className="w-5 h-5" /></span>
              <span className="font-semibold text-white">{s.label}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
            </a>
          ))}
        </div>
      </div>

      {/* Events */}
      <Section kicker={uiText.community.eventsKicker} title={uiText.community.eventsTitle} subtitle={uiText.community.eventsSubtitle}>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-3 py-16 rounded-3xl glass">
            <span className="grid place-items-center w-14 h-14 rounded-2xl bg-accent/10 text-accent"><CalendarX className="w-7 h-7" /></span>
            <p className="text-white font-semibold">Belum ada event saat ini</p>
            <p className="text-sm text-muted-foreground max-w-sm">Pantau terus halaman ini atau Discord kami — event seru akan segera diumumkan.</p>
          </div>
        )}
      </Section>
    </div>
  );
}