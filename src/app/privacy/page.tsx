import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";

const privacySections = [
  {
    title: "Data Handling",
    body: "This portfolio does not currently present itself as a data-heavy application. The contact workflow is intentionally simple and transparent: it opens the visitor's mail client rather than pretending there is a hidden submission backend. I avoid exposing unnecessary personal information, and public contact details are limited to the minimum needed for professional communication.",
  },
  {
    title: "External Links and Documents",
    body: "Some routes link outward to professional profiles or open documents such as the resume PDF. Those links exist to support review of my work and background. If richer document viewing or certificate viewing is added later, it should continue to follow the same principle: deliberate access, clear intent, and no unnecessary exposure of personal or sensitive data.",
  },
  {
    title: "Quality and Compliance Mindset",
    body: "This site exists as a professional portfolio, and I want it to reflect the quality standards attached to the work itself. That includes clarity, accuracy, maintainability, responsible disclosure of information, and awareness of compliance-oriented expectations. Where the portfolio touches observability, backend systems, infrastructure, or process, the presentation should show that standards matter alongside implementation.",
  },
];

export default function PrivacyPage() {
  return (
    <Container>
      <div className="space-y-12 md:space-y-16">
        <section>
          <PageHeader
            eyebrow="PRIVACY // PROFESSIONAL STANDARDS"
            title="Privacy and Professional Standards"
            description="How this portfolio handles public information and compliance-minded presentation."
          />
        </section>

        <section className="grid gap-6">
          {privacySections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-border bg-card p-6 md:p-7"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>
              <p className="mt-4 max-w-4xl text-base leading-8 text-foreground-soft">
                {section.body}
              </p>
            </article>
          ))}
        </section>

        <section className="border-t border-border pt-12">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
              Revision
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Last updated: June 6, 2026. This statement should evolve only when
              the actual behavior of the site changes.
            </p>
          </div>
        </section>
      </div>
    </Container>
  );
}
