import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Zap, ShieldCheck, BadgeCheck, User, Download } from "lucide-react";
import DiscordIcon from "@/components/DiscordIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import {
  getProductById, rarityConfig, formatRupiah, getRankColor, hexToRgba,
  serverConfig, uiText, buildWhatsAppOrderUrl, buildDiscordOrderUrl,
} from "@/lib/serverConfig";
import Icon from "@/components/Icon";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const t = uiText.productDetail;

  const allowQty = product && (product.category === "money" || product.category === "keys");
  const [qty, setQty] = useState(1);
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("java");
  const [showError, setShowError] = useState(false);
  const isValid = username.trim().length > 0;

  const handleOrderClick = (e) => {
    if (!isValid) {
      e.preventDefault();
      setShowError(true);
    }
  };

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto section-pad py-24 text-center">
        <h1 className="pixel text-3xl text-white mb-3">{t.notFoundTitle}</h1>
        <Link to="/store" className="text-primary font-semibold">← {t.back}</Link>
      </div>
    );
  }

  const isRank = product.type === "rank";
  const tierInfo = rarityConfig[product.tier] || rarityConfig.common;
  const color = isRank ? getRankColor(product) : tierInfo.color;
  const glow = isRank ? hexToRgba(color, 0.5) : tierInfo.glow;
  const categoryLabel = isRank ? product.category : tierInfo.label;

  const unitPrice = product.price;
  const total = unitPrice * (allowQty ? qty : 1);

  const platformLabel = platform === "java" ? t.platformJava : t.platformBedrock;
  const orderText = `Halo ${serverConfig.name}, saya mau order:\n${product.name} x${allowQty ? qty : 1}\nTotal: ${formatRupiah(total)}\nUsername: ${username || "-"}\nPlatform: ${platformLabel}\n(ID Produk: ${product.id})\n\nSaya sudah transfer via QRIS, bukti pembayaran saya lampirkan di chat ini ya 🙏`;

  return (
    <div className="max-w-6xl mx-auto section-pad py-12 lg:py-16">
      <Link to="/store" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4" /> {t.back}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visual */}
        <div className="relative rounded-3xl glass p-8 flex items-center justify-center min-h-[320px]" style={{ borderColor: `${color}33` }}>
          <span className="pointer-events-none absolute inset-0 rounded-3xl" style={{ boxShadow: `inset 0 0 60px ${glow}` }} />
          <span className="grid place-items-center w-32 h-32 rounded-3xl text-white" style={{ background: `linear-gradient(135deg, ${color}, ${color}66)`, boxShadow: `0 0 60px ${glow}` }}>
            <Icon name={product.icon} className="w-16 h-16" />
          </span>
          {product.discount > 0 && (
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-[#050A19] bg-primary">-{product.discount}%</span>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="pixel text-xs tracking-[0.25em] uppercase" style={{ color }}>{categoryLabel}</span>
          <h1 className="pixel text-4xl font-bold text-white mt-1">{product.name}</h1>
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl font-bold text-white">{unitPrice === 0 ? "Gratis" : formatRupiah(unitPrice)}</span>
            {product.oldPrice && <span className="text-lg text-muted-foreground line-through">{formatRupiah(product.oldPrice)}</span>}
          </div>
          {unitPrice === 0 && (
            <p className="text-sm text-emerald-400 mt-1.5">Rank ini otomatis kamu dapatkan saat pertama kali join server — tidak perlu dibeli.</p>
          )}
          <p className="text-muted-foreground mt-4">{product.description}</p>

          {/* Features */}
          {product.features && (
            <div className="mt-5">
              <h3 className="text-sm font-semibold text-white mb-2">{t.includedFeatures}</h3>
              <div className="flex flex-wrap gap-1.5">
                {product.features.map((f) => (
                  <span key={f} className="mono text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-primary">{f}</span>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {product.benefits && (
            <div className="mt-5">
              <h3 className="text-sm font-semibold text-white mb-2">{t.benefits}</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.benefits.map((b) => (
                  <li key={b.label} className="flex items-center gap-2 text-sm text-slate-200">
                    <span className="grid place-items-center w-7 h-7 rounded-lg bg-white/5 shrink-0" style={{ color }}><Icon name={b.icon} className="w-3.5 h-3.5" /></span>
                    {b.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-6 text-xs">
            <div className="rounded-xl glass p-3"><Zap className="w-4 h-4 text-primary mb-1.5" /><p className="text-slate-300">{t.badge1}</p></div>
            <div className="rounded-xl glass p-3"><ShieldCheck className="w-4 h-4 text-primary mb-1.5" /><p className="text-slate-300">{t.badge2}</p></div>
            <div className="rounded-xl glass p-3"><BadgeCheck className="w-4 h-4 text-primary mb-1.5" /><p className="text-slate-300">{t.badge3}</p></div>
          </div>

          {/* Quantity (only for money & keys) + order buttons — disembunyikan untuk rank gratis (mis. Member) */}
          {unitPrice === 0 ? (
            <div className="mt-6 rounded-xl glass p-4 flex items-center gap-3">
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-emerald-400/10 text-emerald-400 shrink-0"><BadgeCheck className="w-5 h-5" /></span>
              <p className="text-sm text-slate-200">Tidak perlu order — rank ini sudah otomatis aktif di akunmu sejak awal bergabung.</p>
            </div>
          ) : (
          <div className="mt-6">
            {allowQty && (
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-muted-foreground">Qty</span>
                <div className="flex items-center glass rounded-xl">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 text-slate-300 hover:text-white"><Minus className="w-4 h-4" /></button>
                  <span className="mono w-10 text-center text-white">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(99, q + 1))} className="p-3 text-slate-300 hover:text-white"><Plus className="w-4 h-4" /></button>
                </div>
                <span className="ml-auto text-lg font-bold text-white">{formatRupiah(total)}</span>
              </div>
            )}

            {/* Username / Platform — wajib diisi sebelum order */}
            <div className="rounded-xl glass p-4 mb-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">{t.usernameLabel} <span className="text-primary">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); if (e.target.value.trim()) setShowError(false); }}
                    placeholder={t.usernamePlaceholder}
                    className={`w-full bg-white/5 border rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none transition-colors ${
                      showError && !isValid ? "border-red-500/70" : "border-white/10 focus:border-primary/50"
                    }`}
                  />
                </div>
                {showError && !isValid && <p className="text-xs text-red-400 mt-1.5">{t.usernameError}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">{t.platformLabel} <span className="text-primary">*</span></label>
                <div className="grid grid-cols-2 gap-2">
                  {[{ id: "java", label: t.platformJava }, { id: "bedrock", label: t.platformBedrock }].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlatform(p.id)}
                      className={`py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                        platform === p.id ? "bg-primary text-[#050A19] border-primary" : "bg-white/5 text-slate-300 border-white/10 hover:text-white"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* QRIS — tampil sebelum tombol order, supaya pembeli bayar dulu baru kirim bukti.
                Otomatis disembunyikan seluruhnya kalau serverConfig.qrisImageUrl dikosongkan. */}
            {serverConfig.qrisImageUrl && (
              <div className="rounded-xl glass p-4 mb-4">
                <h3 className="text-sm font-semibold text-white mb-1">{t.qrisTitle}</h3>
                <p className="text-xs text-muted-foreground mb-3">{t.qrisNote}</p>
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-white p-2 w-full max-w-[260px]">
                    <img src={serverConfig.qrisImageUrl} alt={`QRIS ${serverConfig.qrisMerchantName}`} className="w-full h-auto" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300">{serverConfig.qrisMerchantName}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-sm font-bold text-white">{formatRupiah(total)}</span>
                  </div>
                  <a
                    href={serverConfig.qrisImageUrl}
                    download={`QRIS-${serverConfig.qrisMerchantName.replace(/\s+/g, "-")}.jpg`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/15 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> {t.qrisDownload}
                  </a>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={isValid ? buildWhatsAppOrderUrl(orderText) : undefined}
                onClick={handleOrderClick}
                target="_blank" rel="noreferrer"
                className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-emerald-500 transition-shadow ${isValid ? "hover:shadow-[0_0_24px_rgba(16,185,129,0.5)]" : "opacity-60 cursor-pointer"}`}
              >
                <WhatsAppIcon className="w-5 h-5" /> {t.orderWhatsapp}
              </a>
              <a
                href={isValid ? buildDiscordOrderUrl() : undefined}
                onClick={handleOrderClick}
                target="_blank" rel="noreferrer"
                className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-accent transition-shadow ${isValid ? "hover:shadow-[0_0_24px_hsl(var(--accent))]" : "opacity-60 cursor-pointer"}`}
              >
                <DiscordIcon className="w-5 h-5" /> {t.orderDiscord}
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">{t.orderNote}</p>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
