import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";

const projectEntries = [
  {
    title: "Personal Website",
    category: "Portfolio Infrastructure",
    summary:
      "An ongoing Next.js portfolio build focused on translating reference design intent into a maintainable app-router codebase without replacing the underlying architecture.",
    problem:
      "The starting app had very little structure, while the design reference had much stronger hierarchy and pacing. The challenge is to close that gap without copying implementation or replacing the existing stack.",
    links: [
      { label: "Live Build", href: "/" },
      { label: "GitHub Repo", href: "https://github.com/TigerShock4982" },
    ],
    process:
      "The current approach is phased: establish shared tokens and shell first, then bring each route up to a consistent editorial and technical standard. The emphasis is on reusable structure over one-off styling.",
    outcome:
      "This project is now serving as both the portfolio itself and the system used to document future work. A deeper project detail experience should come later, once at least one completed example exists.",
  },
  {
    title: "Systems and Data Work",
    category: "Technical Project Direction",
    summary:
      "Projects in this section are intended to represent software, observability, and data-oriented work with enough context to explain not just what was built, but why it was built that way.",
    problem:
      "Many project pages show outputs without showing constraints, tradeoffs, or implementation logic. That makes it hard to evaluate engineering quality from the outside.",
    links: [
      { label: "Project Slot", href: "/projects" },
      { label: "Source Placeholder", href: "https://github.com/TigerShock4982" },
    ],
    process:
      "This route is being shaped around future per-project sections for the problem statement, playable demo or repository, process notes, and final takeaways. The present goal is to prepare the content model and page rhythm for that expansion.",
    outcome:
      "The page is now close to the intended direction structurally, but it still needs real finished examples before the deeper experience can be considered complete.",
  },
  {
    title: "Documentation and Technical Writing",
    category: "Supporting Work",
    summary:
      "A place for work where the output is not only code, but also explanation, system framing, and structured communication that supports technical ownership.",
    problem:
      "Documentation work is often treated as separate from implementation, even though it directly affects maintainability, onboarding, and handoff quality.",
    links: [
      { label: "Future Writeups", href: "/projects" },
      { label: "GitHub Profile", href: "https://github.com/TigerShock4982" },
    ],
    process:
      "The long-term plan is to include writeups, excerpts, and process-oriented notes here, especially where the interesting part of the project is the reasoning, not just the final artifact.",
    outcome:
      "This remains a reserved area for future portfolio depth. It should be revisited much later, when there are complete project narratives worth surfacing.",
  },
];

export default function ProjectsPage() {
  return (
    <Container>
      <div className="space-y-12 md:space-y-16">
        <section>
          <PageHeader
            eyebrow="PROJECT INDEX // SELECTED WORK"
            title="Projects framed as systems, decisions, and outcomes."
            description="Each entry is set up to open into the structure you asked for: problem statement, live project or repository access, process notes, and final takeaways. This is an intermediate step that gets close now and leaves room for a richer per-project experience later."
          />
        </section>

        <section className="grid gap-6">
          {projectEntries.map((project) => (
            <details
              key={project.title}
              className="group rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:bg-card-hover hover:shadow-[0_16px_40px_rgba(59,130,246,0.12)]"
            >
              <summary className="cursor-pointer list-none p-6 transition-colors md:p-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                      {project.category}
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-foreground-soft">
                      {project.title}
                    </h2>
                    <p className="text-base leading-8 text-muted-foreground transition-colors group-hover:text-foreground-soft">
                      {project.summary}
                    </p>
                  </div>
                </div>
              </summary>

              <div className="border-t border-border px-6 pb-6 pt-6 md:px-7 md:pb-7">
                <div className="grid gap-6 lg:grid-cols-2">
                  <section className="rounded-xl border border-border bg-card-muted p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                      Problem Statement
                    </p>
                    <p className="mt-3 text-sm leading-7 text-foreground-soft">
                      {project.problem}
                    </p>
                  </section>

                  <section className="rounded-xl border border-border bg-card-muted p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                      Access
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-xl border border-border bg-card-muted p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                      Process Notes
                    </p>
                    <p className="mt-3 text-sm leading-7 text-foreground-soft">
                      {project.process}
                    </p>
                  </section>

                  <section className="rounded-xl border border-border bg-card-muted p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                      Result / Takeaway
                    </p>
                    <p className="mt-3 text-sm leading-7 text-foreground-soft">
                      {project.outcome}
                    </p>
                  </section>
                </div>
              </div>
            </details>
          ))}
        </section>

        <section className="border-t border-border pt-12">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
              Future Note
            </p>
            <p className="mt-4 text-base leading-8 text-foreground-soft">
              Come back to this route much later and consider a deeper project
              architecture with dedicated per-project pages, richer media, live
              embeds where appropriate, and real process excerpts once completed
              examples exist.
            </p>
          </div>
        </section>
      </div>
    </Container>
  );
}
