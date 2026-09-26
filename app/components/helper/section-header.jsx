// Consistent header for every homepage section: mono eyebrow + title + optional lead.
export default function SectionHeader({ index, eyebrow, title, description, id }) {
  return (
    <header className="mb-12 max-w-2xl md:mb-16">
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent">
        <span>{index}</span>
        <span className="h-px w-6 bg-accent-line" aria-hidden="true" />
        <span className="text-ink-muted">{eyebrow}</span>
      </p>
      <h2
        id={id}
        className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-ink-muted">{description}</p>
      )}
    </header>
  );
}
