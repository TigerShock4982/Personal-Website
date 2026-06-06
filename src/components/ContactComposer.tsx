"use client";

import { useMemo, useState } from "react";

const defaultSubject = "Portfolio Inquiry";

export default function ContactComposer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    const params = new URLSearchParams({
      subject: subject || defaultSubject,
      body,
    });

    return `mailto:jaypalla22@gmail.com?${params.toString()}`;
  }, [email, message, name, subject]);

  return (
    <section className="rounded-2xl border border-border bg-card p-6 md:p-7">
      <div className="border-b border-border pb-5">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
          Draft Message
        </p>
        <p className="mt-3 text-sm leading-7 text-foreground-soft">
          Fill this out to open a prefilled draft in your default email client.
        </p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Prefer browser email? Copy my address from Direct Channels.
        </p>
      </div>

      <div className="mt-6">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Name
            </span>
            <input
              autoComplete="name"
              maxLength={80}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-border bg-card-muted px-4 py-3 text-sm text-foreground"
              placeholder="Your name"
            />
          </label>

          <label className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-border bg-card-muted px-4 py-3 text-sm text-foreground"
              placeholder="you@example.com"
            />
          </label>
        </div>

        <div className="mt-5 space-y-5">
          <label className="block space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Subject
            </span>
            <input
              maxLength={120}
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="w-full rounded-xl border border-border bg-card-muted px-4 py-3 text-sm text-foreground"
            />
          </label>

          <label className="block space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Message
            </span>
            <textarea
              maxLength={5000}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={8}
              className="w-full rounded-xl border border-border bg-card-muted px-4 py-3 text-sm text-foreground"
              placeholder="Write your message here."
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-7 text-muted-foreground">
            Nothing is submitted through this website.
          </p>

          <a
            href={mailtoHref}
            className="rounded-xl border border-accent bg-accent px-5 py-3 text-center text-sm font-medium text-white transition-all hover:brightness-110"
          >
            Open Email Draft
          </a>
        </div>
      </div>
    </section>
  );
}
