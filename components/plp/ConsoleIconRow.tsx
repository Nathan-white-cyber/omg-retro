import Link from "next/link";
import { allSystems, type PlatformRoute, type SystemRoute } from "@/lib/plp/catalog";

interface ConsoleIconRowProps {
  platform?: PlatformRoute;
  activeSystemSlug?: string;
  counts: Record<string, number>;
}

function SystemTile({ system, active, count }: { system: SystemRoute; active: boolean; count: number }) {
  return (
    <Link
      href={system.href}
      className={`flex min-w-[128px] flex-col items-center justify-center rounded-card border bg-bg-surface p-3 text-center shadow-card transition duration-normal hover:-translate-y-0.5 hover:border-brand-red ${
        active ? "border-brand-red ring-2 ring-brand-red/25" : "border-border"
      }`}
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-full px-1 font-body text-[11px] font-extrabold uppercase text-white shadow-ctrl-subtle"
        style={{ backgroundColor: system.color }}
      >
        {system.code}
      </span>
      <span className="mt-2 line-clamp-1 text-[12px] font-extrabold uppercase tracking-[0.04em] text-text-primary">
        {system.name}
      </span>
      <span className="mt-1 text-[11px] font-bold text-text-secondary">{count} items</span>
    </Link>
  );
}

export function ConsoleIconRow({ platform, activeSystemSlug, counts }: ConsoleIconRowProps) {
  const systems = platform?.systems ?? allSystems;

  return (
    <section className="border-b border-border bg-bg-dark">
      <div className="mx-auto max-w-[1240px] px-7 py-5">
        <div className="-mx-7 flex gap-3 overflow-x-auto px-7 pb-1">
          {systems.map((system) => (
            <SystemTile
              key={system.href}
              system={system}
              active={system.slug === activeSystemSlug}
              count={counts[system.slug] ?? 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
