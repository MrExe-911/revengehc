import { Link } from "react-router-dom";
import { Trophy, Gift, Info, Medal, AlertCircle } from "lucide-react";
import { voteSites, voteRewards, serverConfig, uiText } from "@/lib/serverConfig";
import VoteCard from "@/components/cards/VoteCard";
import PlayerHead from "@/components/PlayerHead";
import Section, { SectionHeading } from "@/components/Section";
import { useTopVoters } from "@/hooks/useTopVoters";

const medalColor = { 1: "#F59E0B", 2: "#94A3B8", 3: "#B45309" };

export default function Vote() {
  const t = uiText.vote;
  const { voters, isLive, loading, error } = useTopVoters();

  return (
    <div className="max-w-7xl mx-auto section-pad py-12 lg:py-16">
      <SectionHeading kicker={t.kicker} title={t.title} subtitle={t.subtitle} />

      {/* how it works banner */}
      <div className="rounded-3xl glass-strong p-8 relative overflow-hidden mb-12">
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start gap-5">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-primary/15 text-primary shrink-0"><Info className="w-7 h-7" /></span>
          <div>
            <h2 className="pixel text-xl sm:text-2xl font-bold text-white">{t.howItWorksTitle}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">{t.howItWorksDesc}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              {voteRewards.map((r) => (
                <span key={r.label} className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-sm text-slate-200">
                  <span className="text-primary"><Gift className="w-4 h-4" /></span> {r.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* vote sites */}
      <div className="flex flex-wrap justify-center gap-5">
        {voteSites.map((v) => (
          <div key={v.id} className="w-full sm:w-[280px]"><VoteCard site={v} /></div>
        ))}
      </div>

      {/* Top voters leaderboard */}
      <Section kicker={t.topVoterKicker} title={t.topVoterTitle} subtitle={t.topVoterSubtitle} className="!py-12">
        <div className="max-w-2xl mx-auto rounded-3xl glass-strong p-4 sm:p-6">
          {isLive && voters.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 px-3 pb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" /> Live dari Minecraft-MP
            </div>
          )}

          {loading && (
            <div className="space-y-2 px-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 px-3 py-3.5 rounded-2xl animate-pulse">
                  <span className="w-9 h-9 rounded-xl bg-white/5 shrink-0" />
                  <span className="flex-1 h-4 rounded bg-white/5" />
                  <span className="w-16 h-4 rounded bg-white/5" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center text-center gap-3 py-10 px-4">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400"><AlertCircle className="w-6 h-6" /></span>
              <p className="text-white font-semibold">Data Top Voters belum tersedia</p>
              <p className="text-sm text-muted-foreground max-w-sm">
                Kami tidak menampilkan data contoh — leaderboard ini hanya tampil kalau berhasil terhubung ke Minecraft-MP.
                Coba muat ulang halaman beberapa saat lagi.
              </p>
            </div>
          )}

          {!loading && !error && voters.length === 0 && (
            <div className="flex flex-col items-center text-center gap-2 py-10 px-4">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-primary/10 text-primary"><Trophy className="w-6 h-6" /></span>
              <p className="text-white font-semibold">Belum ada voter bulan ini</p>
              <p className="text-sm text-muted-foreground max-w-sm">Jadilah yang pertama masuk leaderboard dengan vote di situs di atas!</p>
            </div>
          )}

          {!loading && !error && voters.map((v) => (
            <div key={v.rank} className="flex items-center gap-2.5 sm:gap-4 px-2.5 sm:px-3 py-3 sm:py-3.5 rounded-2xl hover:bg-white/5 transition-colors">
              <span
                className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold pixel text-xs sm:text-sm shrink-0"
                style={{
                  background: v.rank <= 3 ? `${medalColor[v.rank]}22` : "rgba(255,255,255,0.05)",
                  color: v.rank <= 3 ? medalColor[v.rank] : "#94A3B8",
                  border: `1px solid ${v.rank <= 3 ? medalColor[v.rank] : "rgba(255,255,255,0.1)"}55`,
                }}
              >
                {v.rank <= 3 ? <Medal className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : v.rank}
              </span>
              <PlayerHead username={v.username} size={34} rounded="rounded-lg" />
              <span title={v.username} className="flex-1 min-w-0 truncate font-semibold text-white mono text-sm sm:text-base">{v.username}</span>
              <span className="shrink-0 whitespace-nowrap text-xs sm:text-sm text-primary font-semibold">{v.votes} votes</span>
            </div>
          ))}
        </div>
      </Section>

      <div className="text-center">
        <Link to={serverConfig.discordUrl} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white glass-strong hover:text-primary">
          <Trophy className="w-4 h-4" /> {t.helpCta}
        </Link>
      </div>
    </div>
  );
}
