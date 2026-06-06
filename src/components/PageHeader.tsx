type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="max-w-3xl">
      {eyebrow && (
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          {eyebrow}
        </p>
      )}

      <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        {title}
      </h1>

      {description && (
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      )}
    </section>
  );
}