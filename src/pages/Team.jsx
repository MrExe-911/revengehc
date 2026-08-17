import { Info, AlertCircle, Medal, Users, Swords } from "lucide-react";
import { uiText } from "@/lib/serverConfig";
import TeamIcon from "@/components/TeamIcon";
import { SectionHeading } from "@/components/Section";
import { useTeams } from "@/hooks/useTeams";

const medalColor = { 1: "#F59E0B", 2: "#94A3B8", 3: "#B45309" };

export default function Team() {
  const t = uiText.team;
  const { teams, isLive, loading, error } = useTeams();

  return (
    <div className="max-w-5xl mx-auto section-pad py-12 lg:py-16">
      <SectionHeading kicker={t.kicker} title={t.title} subtitle={t.subtitle} />

      {/* Info cara score dihitung */}
      <div className="rounded-3xl glass-strong p-6 sm:p-8 relative overflow-hidden mb-10">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start gap-5">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-primary/15 text-primary shrink-0"><Info className="w-7 h-7" /></span>
          <div>
            <h2 className="pixel text-lg sm:text-xl font-bold text-white">{t.scoreInfoTitle}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">{t.scoreInfoText}</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl glass-strong p-4 sm:p-6">
        {isLive && teams.length > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 px-3 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" /> Live
          </div>
        )}

        {loading && (
          <div className="space-y-2 px-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 px-3 py-3.5 rounded-2xl animate-pulse">
                <span className="w-9 h-9 rounded-xl bg-white/5 shrink-0" />
                <span className="w-12 h-12 rounded-xl bg-white/5 shrink-0" />
                <span className="flex-1 h-4 rounded bg-white/5" />
                <span className="w-16 h-4 rounded bg-white/5" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center text-center gap-3 py-10 px-4">
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400"><AlertCircle className="w-6 h-6" /></span>
            <p className="text-white font-semibold">{t.errorText}</p>
            <p className="text-sm text-muted-foreground max-w-sm">
              Kami tidak menampilkan data contoh — leaderboard ini hanya tampil kalau berhasil terhubung ke panel server.
            </p>
          </div>
        )}

        {!loading && !error && teams.length === 0 && (
          <div className="flex flex-col items-center text-center gap-2 py-10 px-4">
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-primary/10 text-primary"><Swords className="w-6 h-6" /></span>
            <p className="text-white font-semibold">{t.emptyText}</p>
          </div>
        )}

        {!loading && !error && teams.map((team, i) => {
          const rank = i + 1;
          return (
            <div key={team.id} className="flex items-center gap-3 sm:gap-4 px-2.5 sm:px-3 py-3 sm:py-4 rounded-2xl hover:bg-white/5 transition-colors">
              <span
                className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold pixel text-xs sm:text-sm shrink-0"
                style={{
                  background: rank <= 3 ? `${medalColor[rank]}22` : "rgba(255,255,255,0.05)",
                  color: rank <= 3 ? medalColor[rank] : "#94A3B8",
                  border: `1px solid ${rank <= 3 ? medalColor[rank] : "rgba(255,255,255,0.1)"}55`,
                }}
              >
                {rank <= 3 ? <Medal className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : rank}
              </span>

              <TeamIcon name={team.name} owner={team.owner} size={48} />

              <div className="flex-1 min-w-0">
                <p title={team.name} className="truncate font-bold text-white pixel text-sm sm:text-base">{team.name}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-[11px] sm:text-xs text-muted-foreground">
                  <span>{t.ownerLabel}: <span className="text-slate-300 font-medium">{team.owner || t.unknownOwner}</span></span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {team.memberCount} {t.membersLabel}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{t.scoreLabel}</p>
                <p className="mono text-base sm:text-lg font-bold text-primary">{team.score}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
