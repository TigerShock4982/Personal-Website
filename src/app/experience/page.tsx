import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";

const experienceEntries = [
  {
    period: "2026 - Present",
    role: "Portfolio Platform Buildout",
    organization: "Personal Website",
    context: "Independent engineering work",
    summary:
      "Developing this site as a structured record of technical work, design direction, and implementation choices across the broader portfolio.",
    highlights: [
      "Maintaining the site in Next.js App Router without replacing the existing architecture.",
      "Translating reference design direction into reusable layout and content patterns.",
      "Treating content, navigation, and documentation as part of the engineering system rather than decoration.",
    ],
  },
  {
    period: "Current Focus",
    role: "Computer Engineering Student",
    organization: "Academic and project work",
    context: "Software, systems, and infrastructure",
    summary:
      "Building technical depth across systems programming, data workflows, observability, and written technical communication.",
    highlights: [
      "Working across low-level software and operational concerns rather than staying only in UI work.",
      "Using portfolio development as a place to organize academic, technical, and extracurricular material coherently.",
      "Focusing on projects where implementation quality and explanation quality both matter.",
    ],
  },
];

const researchAreas = [
  {
    title: "Observability and operational visibility",
    description:
      "Interest in how systems expose useful runtime information, how that data is interpreted, and how instrumentation supports debugging and long-term maintenance.",
  },
  {
    title: "Data movement and pipeline reliability",
    description:
      "Ongoing attention to how data is ingested, transformed, and checked, especially when architecture decisions affect trust in outputs.",
  },
  {
    title: "Documentation as engineering infrastructure",
    description:
      "Treating documentation as part of system quality: useful for onboarding, handoff, audits, and future changes rather than as a final afterthought.",
  },
];

const workingThemes = [
  "Systems thinking",
  "Reliable implementation",
  "Technical communication",
];

export default function ExperiencePage() {
  return (
    <Container>
      <div className="space-y-12 md:space-y-16">
        <section>
          <PageHeader
            eyebrow="PROFESSIONAL LEDGER // EXPERIENCE"
            title="Experience, context, and current technical direction."
            description="This section combines practical work, ongoing development, and research interests in one place so experience is presented as a connected body of work rather than split across disconnected routes."
          />
        </section>

        <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-6">
            {experienceEntries.map((entry) => (
              <article
                key={`${entry.role}-${entry.period}`}
                className="rounded-2xl border border-border bg-card p-6 md:p-7"
              >
                <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                      {entry.organization}
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                      {entry.role}
                    </h2>
                    <p className="text-sm text-foreground-soft">{entry.context}</p>
                  </div>

                  <div className="rounded-full border border-border bg-card-muted px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                    {entry.period}
                  </div>
                </div>

                <p className="mt-5 text-base leading-8 text-muted-foreground">
                  {entry.summary}
                </p>

                <div className="mt-6 space-y-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                    Key Points
                  </p>

                  <div className="grid gap-3">
                    {entry.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-xl border border-border bg-card-muted px-4 py-4 text-sm leading-7 text-foreground-soft"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-2xl border border-border bg-card p-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
              Working Themes
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {workingThemes.map((theme) => (
                <span
                  key={theme}
                  className="rounded-full border border-border bg-card-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  {theme}
                </span>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Route Note
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground-soft">
                Research content is intentionally included here so the page can
                describe both execution and investigation in one workflow.
              </p>
            </div>
          </aside>
        </section>

        <section className="border-t border-border pt-14">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
              Research // Ongoing Areas
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Areas I want this portfolio to support and document over time.
            </h2>
            <p className="mt-6 text-base leading-8 text-foreground-soft">
              These are not separate from experience. They are the technical
              threads that shape the work I choose, the systems I pay attention
              to, and the material that belongs on this site.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {researchAreas.map((area) => (
              <article
                key={area.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                  Research Area
                </p>
                <h3 className="mt-4 text-lg font-medium text-foreground">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {area.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
