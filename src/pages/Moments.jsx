import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { moments, momentTeams, uiText } from "@/lib/serverConfig";
import Icon from "@/components/Icon";
import { SectionHeading } from "@/components/Section";

function PhotoGrid({ photos, onSelect, emptyText }) {
  if (photos.length === 0) {
    return <p className="text-sm text-muted-foreground py-6">{emptyText}</p>;
  }
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
      {photos.map((m, i) => (
        <motion.button
          key={m.id}
          type="button"
          onClick={() => onSelect(m)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
          className="group relative block w-full rounded-2xl overflow-hidden glass break-inside-avoid text-left"
        >
          <img src={m.image} alt={m.caption} loading="lazy" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A19]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <p className="text-sm text-white font-medium">{m.caption}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

function TeamProfileCard({ team }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      {team.logo ? (
        <img src={team.logo} alt={team.label} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
      ) : (
        <span className="grid place-items-center w-14 h-14 rounded-2xl bg-primary/15 text-primary shrink-0">
          <Icon name={team.icon} className="w-7 h-7" />
        </span>
      )}
      <h3 className="pixel text-xl sm:text-2xl font-bold text-white">{team.label}</h3>
    </div>
  );
}

export default function Moments() {
  const [preview, setPreview] = useState(null);
  const t = uiText.moments;

  // "All Moments" cuma menampilkan foto umum/komunitas (team: "general") ATAU
  // foto tim yang sengaja ditandai includeInAll: true di serverConfig.js —
  // supaya All Moments tidak penuh oleh foto-foto tim tertentu.
  const allMoments = moments.filter((m) => m.team === "general" || m.includeInAll === true);

  return (
    <div className="max-w-7xl mx-auto section-pad py-12 lg:py-16">
      <SectionHeading kicker={t.kicker} title={t.title} subtitle={t.subtitle} align="left" />

      {/* Quick jump */}
      <div className="flex flex-wrap gap-2 mt-6 mb-12">
        <a href="#moments-all" className="px-4 py-2 rounded-full text-sm font-medium glass text-slate-300 hover:text-white transition-colors">All Moments</a>
        {momentTeams.map((tm) => (
          <a key={tm.id} href={`#moments-${tm.id}`} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium glass text-slate-300 hover:text-white transition-colors">
            <Icon name={tm.icon} className="w-3.5 h-3.5" /> {tm.label}
          </a>
        ))}
      </div>

      {/* All Moments */}
      <section id="moments-all" className="scroll-mt-24 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="LayoutGrid" className="w-4 h-4 text-primary" />
          <h2 className="pixel text-sm uppercase tracking-[0.2em] text-primary">{t.allSectionTitle}</h2>
          <span className="flex-1 h-px bg-white/10" />
        </div>
        <PhotoGrid photos={allMoments} onSelect={setPreview} emptyText={t.emptyText} />
      </section>

      {/* Per-team sections */}
      {momentTeams.map((tm) => (
        <section key={tm.id} id={`moments-${tm.id}`} className="scroll-mt-24 mb-16">
          <TeamProfileCard team={tm} />
          <PhotoGrid photos={moments.filter((m) => m.team === tm.id)} onSelect={setPreview} emptyText={t.emptyText} />
        </section>
      ))}

      {/* Lightbox preview */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-[100] bg-[#050A19]/95 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <button onClick={() => setPreview(null)} className="absolute top-6 right-6 grid place-items-center w-10 h-10 rounded-full glass text-white">
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full rounded-2xl overflow-hidden glass-strong"
            >
              <img src={preview.image} alt={preview.caption} className="w-full max-h-[70vh] object-cover" />
              <p className="p-4 text-center text-slate-200">{preview.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
