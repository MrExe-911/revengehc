import { useState } from "react";
import { User } from "lucide-react";

// Avatar kepala player Minecraft, diambil dari minotar.net (gratis, tanpa API key).
// Format: https://minotar.net/helm/{username}/{size}.png
// - Kalau username valid & pernah main Minecraft, otomatis tampil skin asli.
// - Kalau username tidak dikenali, minotar.net otomatis fallback ke skin Steve
//   (bukan error), jadi tetap terlihat rapi.
// - Kalau request ke minotar.net sendiri gagal (jaringan bermasalah), komponen
//   ini fallback ke ikon generik supaya tidak muncul gambar rusak/patah.
//
// CATATAN Bedrock/Geyser: username yang diawali tanda titik (mis. ".mc_yanzz6132")
// menandakan player Bedrock (konvensi plugin Geyser) — bukan bagian dari username
// Java aslinya. Titik di depan itu HARUS dibuang dulu sebelum dipakai ke minotar.net,
// kalau tidak, minotar.net tidak akan menemukan skin apapun. Contoh:
// ".mc_yanzz6132" -> https://minotar.net/helm/mc_yanzz6132/128.png
export default function PlayerHead({ username, size = 40, className = "", rounded = "rounded-lg" }) {
  const [failed, setFailed] = useState(false);
  const px = `${size}px`;
  const javaUsername = username ? username.replace(/^\.+/, "") : "";

  if (!javaUsername || failed) {
    return (
      <span
        style={{ width: px, height: px }}
        className={`grid place-items-center ${rounded} bg-white/5 text-slate-500 shrink-0 ${className}`}
      >
        <User className="w-1/2 h-1/2" />
      </span>
    );
  }

  return (
    <img
      src={`https://minotar.net/helm/${encodeURIComponent(javaUsername)}/${size}.png`}
      alt={`Kepala Minecraft ${username}`}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ width: px, height: px }}
      className={`${rounded} shrink-0 object-cover ${className}`}
    />
  );
}
