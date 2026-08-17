import { Link } from "react-router-dom";
import { Youtube, Instagram, Music2, Heart } from "lucide-react";
import { serverConfig, footerLinks, uiText } from "@/lib/serverConfig";
import Logo from "@/components/Logo";
import DiscordIcon from "@/components/DiscordIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function Footer() {
  const cols = [
    { title: "Server", links: footerLinks.server },
    { title: "Community", links: footerLinks.community },
    { title: "Store", links: footerLinks.store },
    { title: "Support", links: footerLinks.support },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10 glass-strong">
      <div className="max-w-7xl mx-auto section-pad py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <Logo size={9} />
              <span className="pixel text-lg font-bold text-white">{serverConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">{serverConfig.subtext}</p>
            <div className="flex items-center gap-2 mt-5">
              {[
                { icon: DiscordIcon, href: serverConfig.discordUrl },
                ...(serverConfig.whatsappGroupUrl ? [{ icon: WhatsAppIcon, href: serverConfig.whatsappGroupUrl }] : []),
                { icon: Youtube, href: serverConfig.youtubeUrl },
                { icon: Instagram, href: serverConfig.instagramUrl },
                { icon: Music2, href: serverConfig.tiktokUrl },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="grid place-items-center w-9 h-9 rounded-lg glass text-slate-300 hover:text-primary hover:border-primary/40 transition-colors">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="pixel text-sm font-semibold text-white mb-4 tracking-wide">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© 2026 {serverConfig.name}. {uiText.footer.rights}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            {uiText.footer.disclaimer} <Heart className="w-3 h-3 text-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
}