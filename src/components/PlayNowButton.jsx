import { useEffect, useRef, useState } from "react";
import { Play, ChevronDown, Gamepad2 } from "lucide-react";
import { buildMinecraftDeepLink, uiText } from "@/lib/serverConfig";

// Tombol "Play Now" — saat diklik menampilkan pilihan Java / Bedrock,
// lalu membuka Minecraft dan otomatis menambahkan server via deep link
// minecraft://?addExternalServer=NAMA|ip:port
export default function PlayNowButton({ className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const t = uiText.hero;

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const options = [
    { id: "java", label: t.javaLabel },
    { id: "bedrock", label: t.bedrockLabel },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={className}
      >
        <Play className="w-5 h-5" /> {t.playNow} <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 w-60 rounded-2xl glass-strong p-2 shadow-2xl">
          {options.map((o) => (
            <a
              key={o.id}
              href={buildMinecraftDeepLink(o.id)}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
            >
              <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                <Gamepad2 className="w-4 h-4" />
              </span>
              {o.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
