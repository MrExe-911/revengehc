import { roleColors, serverConfig, buildStaffWhatsAppUrl } from "@/lib/serverConfig";
import DiscordIcon from "@/components/DiscordIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import PlayerHead from "@/components/PlayerHead";

export default function StaffCard({ staff }) {
  const roleColor = roleColors[staff.role] || "#94A3B8";

  return (
    <div className="group relative rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1" style={{ borderColor: `${roleColor}33` }}>
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `0 0 0 1px ${roleColor}, 0 14px 44px -16px ${roleColor}88` }} />
      <div className="flex items-start gap-4">
        <PlayerHead username={staff.username} size={64} rounded="rounded-2xl" />
        <div className="flex-1 min-w-0">
          <h3 className="pixel text-lg font-bold text-white truncate">{staff.displayName}</h3>
          <p className="text-xs text-muted-foreground mono truncate">@{staff.username}</p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white" style={{ background: `${roleColor}33`, color: roleColor, border: `1px solid ${roleColor}55` }}>
            {staff.role}
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-4">{staff.bio}</p>
      <div className="flex items-center justify-end gap-2 mt-4">
        <a
          href={buildStaffWhatsAppUrl(staff)}
          target="_blank" rel="noreferrer"
          title={`Chat WhatsApp ${staff.displayName}`}
          className="grid place-items-center w-8 h-8 rounded-lg glass text-slate-300 hover:text-emerald-400 transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4" />
        </a>
        <a
          href={serverConfig.discordUrl}
          target="_blank" rel="noreferrer"
          title={`Discord ${serverConfig.name}`}
          className="grid place-items-center w-8 h-8 rounded-lg glass text-slate-300 hover:text-accent transition-colors"
        >
          <DiscordIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
