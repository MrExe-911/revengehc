import { useState } from "react";
import { Users } from "lucide-react";
import PlayerHead from "@/components/PlayerHead";

// Icon tim, 3 tingkat fallback:
// 1. File custom di public/iconteam/{nama-tim}.png (kalau ada) — pakai NAMA ASLI
//    tim (persis sama seperti field "name" di file .yml BetterTeams), BUKAN
//    UUID/id file, supaya lebih gampang dicari & ditaruh filenya secara manual.
// 2. Kepala Minecraft si owner tim, lewat PlayerHead (minotar.net)
// 3. Ikon generik (kalau owner juga tidak diketahui / gagal dimuat)
export default function TeamIcon({ name, owner, size = 48, className = "", rounded = "rounded-xl" }) {
  const [localFailed, setLocalFailed] = useState(false);
  const px = `${size}px`;

  if (name && !localFailed) {
    return (
      <img
        src={`/iconteam/${encodeURIComponent(name)}.png`}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        onError={() => setLocalFailed(true)}
        style={{ width: px, height: px }}
        className={`${rounded} shrink-0 object-cover bg-white/5 ${className}`}
      />
    );
  }

  if (owner) {
    return <PlayerHead username={owner} size={size} className={className} rounded={rounded} />;
  }

  return (
    <span
      style={{ width: px, height: px }}
      className={`grid place-items-center ${rounded} bg-white/5 text-slate-500 shrink-0 ${className}`}
    >
      <Users className="w-1/2 h-1/2" />
    </span>
  );
}
