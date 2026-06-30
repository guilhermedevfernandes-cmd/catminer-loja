import { AlertTriangle } from "lucide-react";

type PolicyContentProps = {
  title: string;
  sections: Array<{
    title: string;
    body: string[];
  }>;
};

export function PolicyContent({ title, sections }: PolicyContentProps) {
  return (
    <div className="mx-auto max-w-[860px] px-[var(--gutter)] py-[clamp(32px,5vw,56px)]">
      <span className="eyebrow">Minuta MVP</span>
      <h1 className="mt-2 text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold tracking-[-0.025em] text-white" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h1>
      <p className="mt-4 flex items-start gap-3 rounded-[14px] border border-[color-mix(in_srgb,var(--gold-400)_26%,transparent)] bg-[color-mix(in_srgb,var(--gold-400)_12%,transparent)] p-4 text-sm leading-6 text-gold-300">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>Atenção: esta política é uma minuta operacional e deve ser revisada juridicamente antes da publicação final.</span>
      </p>
      <div className="mt-8 grid gap-5">
        {sections.map((section) => (
          <section key={section.title} className="rounded-[20px] border border-border bg-navy-800 p-6">
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              {section.title}
            </h2>
            <div className="mt-3 grid gap-3 text-sm leading-[1.7] text-[var(--t-3)]">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
