import { Boxes } from "lucide-react";
import { serverConfig } from "@/lib/serverConfig";

// Kalau serverConfig.logoUrl diisi, tampilkan gambar logo asli.
// Kalau kosong, fallback ke ikon kotak gradient bawaan.
export default function Logo({ size = 9 }) {
  const px = `${size * 4}px`;
  if (serverConfig.logoUrl) {
    return (
      <img
        src={serverConfig.logoUrl}
        alt={`${serverConfig.name} logo`}
        style={{ width: px, height: px }}
        className="rounded-lg object-cover shrink-0"
      />
    );
  }
  return (
    <span
      style={{ width: px, height: px }}
      className="grid place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-[#050A19] shrink-0 group-hover:scale-105 transition-transform"
    >
      <Boxes className="w-5 h-5" strokeWidth={2.5} />
    </span>
  );
}
