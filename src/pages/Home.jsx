import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Users, Wifi, Gamepad2, Sparkles, ArrowRight } from "lucide-react";
import {
  serverConfig, ranks, voteSites, uiText,
} from "@/lib/serverConfig";
import CopyIPButton from "@/components/CopyIPButton";
import PlayNowButton from "@/components/PlayNowButton";
import RankCard from "@/components/store/RankCard";
import Section from "@/components/Section";
import { useServerStatus } from "@/hooks/useServerStatus";
import DiscordIcon from "@/components/DiscordIcon";

const whyPlay = [
  { icon: "Trees", title: "Survival", desc: "Dunia survival vanilla+ dengan tweak modern." },
  { icon: "Coins", title: "Economy", desc: "Auction house, player shop & jobs." },
  { icon: "Swords", title: "PvP Arena", desc: "Arena PvP seimbang & turnamen rutin." },
  { icon: "Sparkles", title: "Custom Features", desc: "Enchant, dungeon & quest eksklusif." },
  { icon: "CalendarHeart", title: "Events", desc: "Event mingguan dengan hadiah besar." },
  { icon: "Users", title: "Active Community", desc: "Ribuan pemain aktif setiap hari." },
];

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Home() {
  const t = uiText.hero;
  const { online, players, loading, error, isLive } = useServerStatus();

  const badgeDotColor = loading ? "bg-slate-400" : online === false ? "bg-red-500" : error ? "bg-amber-400" : "bg-emerald-400";
  const badgeText = loading
    ? "Checking server status…"
    : error
    ? "Status tidak tersedia"
    : online === false
    ? "Server Offline"
    : `${t.onlineBadge} • ${players.toLocaleString()} players`;

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center">
        <div className="max-w-7xl mx-auto section-pad w-full pt-10">
          <motion.div initial="hidden" animate="show" variants={fade} className="max-w-3xl">
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] sm:text-xs mb-5 sm:mb-6 ${
              loading ? "text-slate-400" : online === false ? "text-red-400" : error ? "text-amber-400" : "text-emerald-400"
            }`}>
              <span className={`w-2 h-2 rounded-full ${loading ? "" : "animate-pulse-glow"} ${badgeDotColor}`} />
              {badgeText}
              {isLive && <span className="text-[10px] text-emerald-400/70 ml-1">• Live</span>}
            </span>
            <h1 className="pixel text-4xl sm:text-6xl lg:text-8xl font-bold text-white leading-[1.05] text-glow">
              {serverConfig.name}
            </h1>
            <p className="pixel text-lg sm:text-2xl text-primary mt-3">{serverConfig.tagline}</p>
            <p className="text-sm sm:text-lg text-slate-300 mt-4 sm:mt-5 max-w-xl">{serverConfig.subtext}</p>

            <div className="flex flex-wrap items-center gap-3 mt-7 sm:mt-8">
              <PlayNowButton className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-[#050A19] bg-primary hover:shadow-[0_0_30px_hsl(var(--primary))] transition-shadow animate-fade-up" />
              <Link to="/server" className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold text-white glass-strong hover:border-primary/40 transition-colors">
                <Compass className="w-5 h-5" /> {t.exploreServer}
              </Link>
            </div>

            {/* IP pills — Java (gabungan ip:port) & Bedrock (IP dan Port terpisah,
                karena layar "Add Server" Bedrock butuh 2 kolom terpisah).
                Di HP: info IP di atas, tombol salin full-width di bawahnya (tidak mepet/overflow).
                Di layar lebih lebar (sm+): kembali jadi 1 baris ringkas seperti pill. */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8 items-stretch sm:items-start">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 glass rounded-2xl p-3 sm:p-2 sm:pr-2 w-full sm:w-auto sm:shrink-0">
                <div className="flex items-center gap-2 sm:pl-2 min-w-0">
                  <Wifi className="w-4 h-4 text-primary shrink-0" />
                  <div className="leading-tight min-w-0 flex-1">
                    <span className="block text-[10px] uppercase tracking-wide text-muted-foreground">{t.javaLabel}</span>
                    <span className="mono text-xs sm:text-sm text-white break-all sm:whitespace-nowrap">{serverConfig.javaIp}:{serverConfig.javaPort}</span>
                  </div>
                </div>
                <CopyIPButton
                  value={`${serverConfig.javaIp}:${serverConfig.javaPort}`}
                  toastMessage="IP Java disalin! Tempel di kolom Server Address."
                  className="flex items-center justify-center gap-1.5 w-full sm:w-[112px] shrink-0 whitespace-nowrap px-3 py-2.5 sm:py-2 rounded-xl text-sm font-semibold text-[#050A19] bg-primary"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 glass rounded-2xl p-3 sm:p-2 sm:pr-2 w-full sm:w-auto sm:shrink-0">
                <div className="flex items-center gap-2 sm:pl-2 min-w-0">
                  <Wifi className="w-4 h-4 text-accent shrink-0" />
                  <div className="leading-tight min-w-0 flex-1">
                    <span className="block text-[10px] uppercase tracking-wide text-muted-foreground">{t.bedrockLabel}</span>
                    <span className="mono text-xs sm:text-sm text-white break-all sm:whitespace-nowrap">{serverConfig.bedrockIp}:{serverConfig.bedrockPort}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <CopyIPButton
                    value={serverConfig.bedrockIp}
                    label="Copy IP"
                    toastMessage="IP Bedrock disalin! Tempel di kolom Server Address."
                    className="flex items-center justify-center gap-1.5 flex-1 sm:flex-initial sm:min-w-[88px] whitespace-nowrap px-3 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-accent hover:shadow-[0_0_16px_hsl(var(--accent))] transition-shadow"
                  />
                  <CopyIPButton
                    value={String(serverConfig.bedrockPort)}
                    label="Copy Port"
                    toastMessage="Port Bedrock disalin! Tempel di kolom Port."
                    className="flex items-center justify-center gap-1.5 flex-1 sm:flex-initial sm:min-w-[96px] whitespace-nowrap px-3 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-accent/70 hover:bg-accent/90 hover:shadow-[0_0_16px_hsl(var(--accent))] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* quick facts */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-sm text-slate-300">
              <span className="flex items-center gap-1.5"><Gamepad2 className="w-4 h-4 text-primary" /> {t.javaLabel}</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-accent" /> {t.bedrockLabel}</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-primary" /> {t.versionPrefix}{serverConfig.version}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY PLAY */}
      <Section kicker={uiText.whyPlay.kicker} title={uiText.whyPlay.title} subtitle={uiText.whyPlay.subtitle}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyPlay.map((c) => (
            <motion.div key={c.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}
              className="group rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </span>
              <h3 className="pixel text-lg font-bold text-white">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* STORE PREVIEW */}
      <Section kicker={uiText.storePreview.kicker} title={uiText.storePreview.title} subtitle={uiText.storePreview.subtitle}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ranks.slice(0, 3).map((r) => <RankCard key={r.id} rank={r} />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/store" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white glass-strong hover:text-primary transition-colors">
            {uiText.storePreview.cta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      {/* VOTE PREVIEW */}
      <Section kicker={uiText.votePreview.kicker} title={uiText.votePreview.title} subtitle={uiText.votePreview.subtitle}>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-5">
          {voteSites.slice(0, 4).map((v) => (
            <div key={v.id} className="w-full sm:w-[260px] rounded-2xl glass p-5 text-center">
              <h3 className="pixel text-base font-bold text-white">{v.name}</h3>
              <p className="text-xs text-muted-foreground mt-1.5">{v.reward}</p>
              <Link to="/vote" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">{uiText.votePreview.voteNow} <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
          ))}
        </div>
      </Section>

      {/* DISCORD CTA */}
      <Section>
        <div className="max-w-5xl mx-auto rounded-3xl glass-strong p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <span className="grid place-items-center w-16 h-16 rounded-2xl bg-accent text-white mx-auto mb-5">
              <DiscordIcon className="w-8 h-8" />
            </span>
            <h2 className="pixel text-3xl sm:text-4xl font-bold text-white text-glow">{uiText.discordCta.title}</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">{uiText.discordCta.subtitle} {serverConfig.name}.</p>
            <a href={serverConfig.discordUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 mt-7 px-7 py-3.5 rounded-xl font-bold text-white bg-accent hover:shadow-[0_0_30px_hsl(var(--accent))] transition-shadow">
              <DiscordIcon className="w-5 h-5" /> {uiText.discordCta.button}
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
