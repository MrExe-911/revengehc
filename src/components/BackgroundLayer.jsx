import { useLocation } from "react-router-dom";
import { serverConfig, getPageBackground } from "@/lib/serverConfig";

// Fixed full-screen immersive background with dark overlay.
// Background otomatis berbeda per halaman lewat serverConfig.pageBackgrounds
// (fallback ke serverConfig.backgroundImage kalau halaman itu tidak diset khusus).
export default function BackgroundLayer() {
  const { pathname } = useLocation();
  const bg = getPageBackground(pathname);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050A19]">
      <div
        key={bg}
        className="absolute inset-0 bg-cover bg-center animate-fade-up"
        style={{
          backgroundImage: `url("${bg}")`,
          backgroundAttachment: "fixed",
          transform: "scale(1.05)",
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0" style={{ background: serverConfig.overlayColor }} />
      {/* Subtle bottom fade into base color */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A19]/40 via-transparent to-[#050A19]" />
      {/* Pixel dither texture */}
      <div className="absolute inset-0 dither opacity-[0.15] mix-blend-overlay" />
    </div>
  );
}
