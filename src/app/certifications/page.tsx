import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";

const certificationEntries = [
  {
    title: "Technical Certifications",
    issuer: "Credentialed work",
    year: "Exp. Mar 2028",
    summary:
      "This section is prepared to hold formal certifications and supporting context without reducing the page to a simple badge list.",
  },
  {
    title: "Continuous Learning",
    issuer: "Coursework and self-study",
    year: "Exp. Nov 2027",
    summary:
      "A place to document skill development that may not always map cleanly to a formal certification, but still matters to the overall technical profile.",
  },
  {
    title: "Applied Validation",
    issuer: "Portfolio context",
    year: "Exp. Jun 2029",
    summary:
      "Certifications here should be supported by nearby project or experience evidence where possible, so they read as part of a coherent body of work.",
  },
];

export default function CertificationsPage() {
  return (
    <Container>
      <div className="space-y-12 md:space-y-16">
        <section>
          <PageHeader
            eyebrow="CREDENTIALS // CERTIFICATIONS"
            title="Certifications and ongoing learning, presented with context."
            description="This route is structured to support formal credentials and supporting explanation without adding extra layout that the page does not need yet."
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {certificationEntries.map((entry) => (
            <article
              key={entry.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:bg-card-hover hover:shadow-[0_16px_40px_rgba(59,130,246,0.12)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                    {entry.issuer}
                  </p>
                  <h2 className="mt-4 text-xl font-medium text-foreground transition-colors group-hover:text-foreground-soft">
                    {entry.title}
                  </h2>
                </div>

                <span className="shrink-0 whitespace-nowrap rounded-full border border-border bg-card-muted px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-muted">
                  {entry.year}
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-muted-foreground transition-colors group-hover:text-foreground-soft">
                {entry.summary}
              </p>
            </article>
          ))}
        </section>
      </div>
    </Container>
  );
}
