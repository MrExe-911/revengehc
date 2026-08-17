import { useState } from "react";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import { serverConfig } from "@/lib/serverConfig";

// `value` = teks persis yang mau disalin (paling fleksibel, dipakai kalau perlu
// salin IP saja atau Port saja secara terpisah — misal untuk Bedrock).
// `ip` = shortcut lama, kalau `value` tidak diisi maka pakai ini (fallback ke javaIp).
export default function CopyIPButton({ className = "", label = "Copy IP", value, ip, toastMessage }) {
  const [copied, setCopied] = useState(false);
  const textToCopy = value ?? ip ?? serverConfig.javaIp;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(textToCopy));
    } catch {
      const el = document.createElement("textarea");
      el.value = String(textToCopy);
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    toast.success(toastMessage || "Disalin! Tinggal tempel di Minecraft.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type="button" onClick={handleCopy} className={className} aria-label={`Copy ${label}`}>
      {copied ? <Check className="w-4 h-4 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
      <span>{copied ? "Copied!" : label}</span>
    </button>
  );
}
