import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { navLinks, serverConfig } from "@/lib/serverConfig";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import DiscordIcon from "@/components/DiscordIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";

function DesktopNavItem({ link, active, isChildActive }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const show = () => { clearTimeout(closeTimer.current); setOpen(true); };
  const hide = () => { closeTimer.current = setTimeout(() => setOpen(false), 150); };

  if (!link.dropdown) {
    return (
      <Link
        to={link.path}
        className={`relative px-4 py-2 text-sm font-medium transition-colors ${active ? "text-primary" : "text-slate-300 hover:text-white"}`}
      >
        {link.label}
        {active && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />}
      </Link>
    );
  }

  const highlighted = active || isChildActive;

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${highlighted ? "text-primary" : "text-slate-300 hover:text-white"}`}
      >
        {link.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        {highlighted && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
          >
            <div className="w-64 rounded-2xl glass-strong p-2 shadow-2xl">
              {link.dropdown.map((d) => (
                <Link
                  key={d.path}
                  to={d.path}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Icon name={d.icon} className="w-4 h-4" />
                  </span>
                  {d.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  // Kalau item punya dropdown, pakai isi dropdown-nya saja di menu mobile
  // (dropdown sudah termasuk halaman utamanya) supaya tidak dobel entry.
  const mobileLinks = navLinks.flatMap((l) => (l.dropdown ? l.dropdown : [l]));

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="glass-strong border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
              <Logo size={9} />
              <span className="pixel text-lg font-bold text-white tracking-tight">{serverConfig.name}</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => {
                const active = pathname === l.path;
                const isChildActive = l.dropdown?.some((d) => d.path === pathname);
                return <DesktopNavItem key={l.path} link={l} active={active} isChildActive={isChildActive} />;
              })}
            </nav>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-2">
              {serverConfig.whatsappGroupUrl && (
                <a href={serverConfig.whatsappGroupUrl} target="_blank" rel="noreferrer" title="Join WhatsApp Group"
                  className="grid place-items-center w-9 h-9 rounded-lg glass text-slate-300 hover:text-emerald-400 hover:border-emerald-400/40 transition-colors">
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              )}
              <a href={serverConfig.discordUrl} target="_blank" rel="noreferrer" title="Join Discord"
                className="grid place-items-center w-9 h-9 rounded-lg glass text-slate-300 hover:text-white hover:border-accent/40 transition-colors">
                <DiscordIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setOpen((v) => !v)} className="md:hidden grid place-items-center w-9 h-9 rounded-lg glass text-white" aria-label="Menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 top-16 z-40 bg-[#050A19]/90 backdrop-blur-xl overflow-y-auto"
          >
            <motion.nav className="p-6 flex flex-col gap-1">
              {mobileLinks.map((l, i) => (
                <motion.div key={l.path + l.label} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.03 * i }}>
                  <Link to={l.path} onClick={() => setOpen(false)}
                    className={`block pixel text-lg py-2.5 px-4 rounded-xl ${pathname === l.path ? "text-primary bg-white/5" : "text-slate-200"}`}>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <a href={serverConfig.discordUrl} target="_blank" rel="noreferrer"
                className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-white font-semibold">
                <DiscordIcon className="w-5 h-5" /> Join Discord
              </a>
              {serverConfig.whatsappGroupUrl && (
                <a href={serverConfig.whatsappGroupUrl} target="_blank" rel="noreferrer"
                  className="mt-2.5 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-white font-semibold">
                  <WhatsAppIcon className="w-5 h-5" /> Join WhatsApp Group
                </a>
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
