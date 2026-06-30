import { Headset, RefreshCw, Shield, ShieldCheck } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    label: "Pagamento seguro via Pix",
    color: "var(--green-500)",
    bg: "color-mix(in srgb, var(--green-500) 16%, transparent)",
  },
  {
    icon: Shield,
    label: "Garantia de 30 dias",
    color: "var(--gold-400)",
    bg: "color-mix(in srgb, var(--gold-400) 18%, transparent)",
  },
  {
    icon: RefreshCw,
    label: "Equipamento usado revisado",
    color: "var(--orange-400)",
    bg: "var(--orange-50)",
  },
  {
    icon: Headset,
    label: "Suporte especializado",
    color: "#5BA8F0",
    bg: "color-mix(in srgb, var(--blue-500) 20%, transparent)",
  },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-between gap-x-[26px] gap-y-2.5">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-[9px] text-[13.5px] font-semibold text-[var(--t-2)]"
        >
          <span
            className="inline-flex size-[30px] items-center justify-center rounded-[9px]"
            style={{ background: badge.bg, color: badge.color }}
          >
            <badge.icon className="size-[17px]" strokeWidth={2.1} aria-hidden="true" />
          </span>
          {badge.label}
        </div>
      ))}
    </div>
  );
}
