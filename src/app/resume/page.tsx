import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { FileDown } from "lucide-react";

const experienceEntries = [
  {
    role: "Software Engineer",
    company: "Keylent Inc",
    location: "Delaware",
    period: "Dec 2025 - Current",
    client: "Barclaycard US",
    bullets: [
      "Working on a financial transaction monitoring platform for payment activity, tracks system health, and provides observability across backend services using logs, metrics, traces, and alerts.",
      "Designed dashboards to monitor real time transaction volume, latency, error rates, fraud-rule triggers, and service reliability of Kafka messages for a banking/payment system.",
      "Helped onboard application and infrastructure data into Splunk by using Cribl to transform, filter, and route log streams through custom observability pipelines.",
    ],
    stack:
      "Grafana, Splunk, Prometheus, Cribl, Python structured logging, JSON logs, Oracle, SQL Server",
  },
  {
    role: "Software Engineering Intern",
    company: "Keylent Inc",
    location: "Delaware",
    period: "May 2025 - Aug 2025",
    bullets: [
      "Automated manual tasks using playbooks to schedule updates and execute scripts in parallel across server clusters, improving efficiency and reducing downtime.",
      "Supported blue/green deployment workflows while reducing human error in operational procedures.",
      "Created Splunk reports and Grafana dashboards that improved observability for systems supporting critical business functions.",
    ],
    stack: "Grafana, Splunk, Python, SQL Server",
  },
  {
    role: "Research Assistant",
    company: "Penn State University",
    location: "",
    period: "May 2024 - May 2025",
    bullets: [
      "Worked on graph structures research in the Penn State College of Science with emphasis on edge connectivity of simple connected graphs.",
      "Developed Python tooling with Pandas DataFrames to test conjectures and analyze vertex-edge relationships during the research process.",
      "Built a real-time telemetry monitoring platform spanning embedded sensors, microcontroller transmission, backend APIs, and dashboard visualization.",
      "Implemented live monitoring for sensor trends, device freshness, sequence tracking, and abnormal condition alerting.",
    ],
    stack: "NumPy, Python, Pandas, NetworkX, Supabase, TypeScript, FastAPI",
  },
];

const coreSkills = [
  "Python",
  "Java",
  "SQL Server",
  "Oracle RDBMS",
  "MongoDB",
  "Node.js",
  "ReactJS",
  "Spring Boot",
  "Pandas",
  "NumPy",
  "Grafana",
  "Splunk",
  "Prometheus",
  "AppDynamics",
  "Cribl",
  "Azure",
  "AWS",
  "Google Cloud",
];

const supportingSkills = [
  "HTML5",
  "CSS",
  "Angular JS",
  "JavaFX Scene Builder",
  "Agile methodologies",
  "Word / Excel / PowerPoint / Visio",
];

export default function ResumePage() {
  return (
    <Container>
      <div className="space-y-12">
        <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <PageHeader
            eyebrow="RESUME // CURRENT VERSION"
            title="Up to Date Resume"
          />

          <a
            href="/Jay-Palla-Resume-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:bg-card-hover hover:text-foreground"
          >
            <FileDown
              size={18}
              className="transition-transform duration-200 group-hover:translate-y-0.5"
            />
            Download as PDF
          </a>
        </section>

        <section className="rounded-3xl border border-border bg-[#f8fafc] p-8 text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:p-10">
          <header className="border-b border-slate-300 pb-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-4xl font-semibold tracking-tight">
                  Jay Palla
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  Software Engineer focused on software development,
                  observability, backend systems, and reliable delivery.
                </p>
              </div>

              <div className="space-y-2 text-sm text-slate-600 lg:text-right">
                <p>jaypalla22@gmail.com</p>
                <p>linkedin.com/in/jaypalla</p>
                <p>github.com/TigerShock4982</p>
                <p>No sponsorship required</p>
              </div>
            </div>
          </header>

          <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-10">
              <section>
                <h3 className="border-b border-slate-300 pb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Summary
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Software Engineer with software development and observability
                  internship experience supporting monitoring, logging,
                  alerting, and system reliability initiatives.
                  Experienced with Python, SQL, Linux, and dashboarding tools
                  like Splunk and Grafana to investigate incidents, create
                  custom observability pipelines with Cribl, analyze performance
                  metrics, and improve visibility into application health.
                  Strong computer engineering foundation with practical backend
                  development experience and a growing focus on cloud
                  infrastructure, data systems, and reliable software delivery.
                </p>
              </section>

              <section>
                <h3 className="border-b border-slate-300 pb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Experience
                </h3>

                <div className="mt-5 space-y-8">
                  {experienceEntries.map((entry) => (
                    <article key={`${entry.role}-${entry.period}`}>
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h4 className="text-lg font-semibold">
                            {entry.role}, {entry.company}
                            {entry.location ? `, ${entry.location}` : ""}
                          </h4>
                          {entry.client && (
                            <p className="mt-1 text-sm text-slate-600">
                              Client: {entry.client}
                            </p>
                          )}
                        </div>

                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
                          {entry.period}
                        </p>
                      </div>

                      <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                        {entry.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-[0.72rem] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        <span className="font-medium text-slate-800">
                          Tech stack:
                        </span>{" "}
                        {entry.stack}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-10">
              <section>
                <h3 className="border-b border-slate-300 pb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Core Skills
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {coreSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="border-b border-slate-300 pb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Supporting Skills
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {supportingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="border-b border-slate-300 pb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Education
                </h3>
                <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
                  <p className="font-medium">
                    Penn State University, University Park
                  </p>
                  <p>B.S Computer Engineering</p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
