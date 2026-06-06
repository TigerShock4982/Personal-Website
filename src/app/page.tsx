import Container from "@/components/Container";
import HomeInterestCards from "@/components/HomeInterestCards";
import PageHeader from "@/components/PageHeader";

const focusAreas = [
  {
    title: "Systems Programming",
    description:
      "Building low-level software with attention to runtime behavior, tooling, and maintainability.",
  },
  {
    title: "Data Engineering",
    description:
      "Designing pipelines and supporting infrastructure for reliable movement, processing, and inspection of data.",
  },
  {
    title: "Observability",
    description:
      "Improving visibility into systems through logging, tracing, measurement, and operational feedback loops.",
  },
  {
    title: "Technical Documentation",
    description:
      "Translating implementation detail into documentation that supports onboarding, audits, and long-term ownership.",
  },
];

export default function Home() {
  return (
    <Container>
      <div className="space-y-12 md:space-y-16">
        <section>
          <PageHeader
            eyebrow="STATUS: ONLINE // SYSTEM READY"
            title="Engineering systems at the intersection of software, data, and infrastructure."
            description="I'm Jay Palla, a computer engineering student building projects across observability, data pipelines, low-level systems, and technical documentation."
          />
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {focusAreas.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent hover:bg-card-hover"
            >
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                Focus Area
              </p>
              <h2 className="mt-4 text-lg font-medium text-foreground">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </section>

        <section className="border-t border-border pt-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                Biography // Overview
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Building a portfolio that reads like an engineering record, not
                a gallery of disconnected pages.
              </h2>

              <div className="mt-6 space-y-5 text-base leading-8 text-foreground-soft">
                <p>
                  My interests sit close to the places where implementation
                  details start to affect reliability, clarity, and long-term
                  maintainability. That includes how systems are structured, how
                  they are observed, and how they are explained.
                </p>
                <p>
                  The reference direction for this site is useful because it has
                  a stronger editorial hierarchy than the starting app, but the
                  real work here is to translate that into the current Next.js
                  codebase without replacing its architecture.
                </p>
                <p>
                  As the site grows, the goal is for each section to present
                  experience, projects, and supporting material with the same
                  level of structure as the code behind it.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                Personal Interests
              </p>

              <HomeInterestCards />
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
