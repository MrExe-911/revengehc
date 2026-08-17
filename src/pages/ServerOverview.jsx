import { Link } from "react-router-dom";
import { Server, Wifi, Cpu, Monitor, Users, Plus, Check } from "lucide-react";
import { serverConfig, events, uiText } from "@/lib/serverConfig";
import CopyIPButton from "@/components/CopyIPButton";
import EventCard from "@/components/cards/EventCard";
import Section, { SectionHeading } from "@/components/Section";
import { useServerStatus } from "@/hooks/useServerStatus";

const features = [
  "Survival", "Economy", "Jobs", "Land Claim", "Custom Enchants", "PvP",
  "Events", "Quests", "Crates", "Player Shops", "Auction House", "Ranks",
];

const steps = [
  { n: 1, title: "Launch Minecraft", desc: "Buka launcher dan jalankan Minecraft Java atau Bedrock." },
  { n: 2, title: "Select Multiplayer", desc: "Pilih menu Multiplayer dari main menu." },
  { n: 3, title: "Add Server", desc: "Klik 'Add Server' lalu isi nama server sesukamu." },
  { n: 4, title: "Masukkan IP", desc: "Tempel IP server sesuai edisimu, save, dan klik Join." },
];

export default function ServerOverview() {
  const t = uiText.server;
  const { online, players, maxPlayers, loading, error, isLive } = useServerStatus();
  const hasPlayerData = !loading && !error && players != null;
  const fillPct = hasPlayerData && maxPlayers ? Math.min(100, Math.round((players / maxPlayers) * 100)) : 0;

  const statusValue = loading ? "CHECKING…" : error ? "UNKNOWN" : online === false ? "OFFLINE" : "ONLINE";
  const statusColor = loading ? "#94A3B8" : error ? "#F59E0B" : online === false ? "#EF4444" : "#10B981";
  const playersValue = loading ? "…" : error ? "N/A" : `${players.toLocaleString()} / ${(maxPlayers ?? "?").toLocaleString?.() ?? maxPlayers ?? "?"}`;

  const stats = [
    { icon: Server, label: "Server Status", value: statusValue, color: statusColor },
    { icon: Wifi, label: "Java IP", value: `${serverConfig.javaIp}:${serverConfig.javaPort}`, color: "#00F2FF", mono: true },
    { icon: Wifi, label: "Bedrock IP", value: `${serverConfig.bedrockIp}:${serverConfig.bedrockPort}`, color: "#8B5CF6", mono: true },
    { icon: Monitor, label: "Version", value: serverConfig.version, color: "#F59E0B" },
    { icon: Cpu, label: "Platform", value: serverConfig.edition, color: "#EC4899" },
    { icon: Users, label: "Players", value: playersValue, color: "#10B981" },
  ];

  return (
    <div className="max-w-7xl mx-auto section-pad py-12 lg:py-16">
      <SectionHeading kicker={t.kicker} title={t.title} subtitle={t.subtitle} align="left" />

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl glass p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
              <s.icon className="w-4 h-4 shrink-0" /> {s.label}
              {s.label === "Server Status" && isLive && <span className="text-[9px] text-emerald-400/70">• Live</span>}
            </div>
            <p className={`font-bold break-all ${s.mono ? "mono text-sm sm:text-base" : "pixel text-lg"}`} style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Player progress */}
      <div className="rounded-2xl glass p-6 mt-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">Player Capacity</span>
          <span className="text-sm font-semibold text-white">
            {loading ? "Checking…" : error ? "Status tidak tersedia" : `${players.toLocaleString()} / ${maxPlayers ? maxPlayers.toLocaleString() : "?"} (${fillPct}%)`}
          </span>
        </div>
        <div className="h-3 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all" style={{ width: `${fillPct}%` }} />
        </div>
      </div>

      {/* Features */}
      <Section kicker={t.featuresKicker} title={t.featuresTitle} subtitle={t.featuresSubtitle} className="!py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-2.5 rounded-xl glass px-4 py-3.5 hover:border-primary/30 transition-colors">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm text-slate-200">{f}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* How to Join */}
      <Section kicker={t.joinKicker} title={t.joinTitle} subtitle={t.joinSubtitle} className="!py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative rounded-2xl glass p-6">
              <span className="pixel text-3xl font-bold text-primary/40">0{s.n}</span>
              <h3 className="pixel text-lg font-bold text-white mt-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{s.desc}</p>
              {i < steps.length - 1 && <Plus className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-stretch sm:items-center gap-3 sm:flex-row sm:justify-center sm:gap-4 sm:flex-wrap">
          <CopyIPButton
            value={`${serverConfig.javaIp}:${serverConfig.javaPort}`}
            label={t.copyJavaIp}
            toastMessage="IP Java disalin! Tempel di kolom Server Address."
            className="flex items-center justify-center gap-2 w-full sm:w-[220px] whitespace-nowrap px-6 py-3 rounded-xl font-bold text-[#050A19] bg-primary hover:shadow-[0_0_24px_hsl(var(--primary))]"
          />
          <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full sm:w-auto">
            <CopyIPButton
              value={serverConfig.bedrockIp}
              label="Copy Bedrock IP"
              toastMessage="IP Bedrock disalin! Tempel di kolom Server Address."
              className="flex items-center justify-center gap-2 w-full sm:min-w-[180px] whitespace-nowrap px-5 py-3 rounded-xl font-bold text-white bg-accent hover:shadow-[0_0_24px_hsl(var(--accent))] transition-shadow"
            />
            <CopyIPButton
              value={String(serverConfig.bedrockPort)}
              label="Copy Port"
              toastMessage="Port Bedrock disalin! Tempel di kolom Port."
              className="flex items-center justify-center gap-2 w-full sm:min-w-[140px] whitespace-nowrap px-5 py-3 rounded-xl font-bold text-white bg-accent/70 hover:bg-accent/90 hover:shadow-[0_0_24px_hsl(var(--accent))] transition-all"
            />
          </div>
          <Link to="/store" className="px-6 py-3 rounded-xl font-semibold text-white glass-strong text-center">{t.browseRanks}</Link>
        </div>
      </Section>

      {/* Events */}
      {events.length > 0 && (
        <Section kicker={t.eventsKicker} title={t.eventsTitle} subtitle={t.eventsSubtitle} className="!py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/community" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white glass-strong hover:text-primary transition-colors">
              Lihat Semua Event
            </Link>
          </div>
        </Section>
      )}
    </div>
  );
}
