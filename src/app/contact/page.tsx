import ContactComposer from "@/components/ContactComposer";
import Container from "@/components/Container";
import DirectChannelCards from "@/components/DirectChannelCards";
import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  return (
    <Container>
      <div className="space-y-12 md:space-y-16">
        <section>
          <PageHeader
            eyebrow="COMMUNICATION // CONTACT"
            title="Reach out through direct channels or draft a message here."
            description="This page uses your actual contact details from the current resume source. The form opens a drafted email in the user's mail client instead of pretending there is a backend submission flow."
          />
        </section>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <ContactComposer />

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                Direct Channels
              </p>

              <DirectChannelCards />
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                Contact Note
              </p>
              <p className="mt-4 text-sm leading-7 text-foreground-soft">
                For now, this page is intentionally honest about its behavior.
                It drafts an email instead of simulating a backend contact form
                that does not exist yet.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </Container>
  );
}
