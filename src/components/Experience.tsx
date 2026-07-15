import { timeline } from "@/data/content";

/**
 * Vertical timeline for education and experience.
 */
export default function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-line/70 bg-sage-light/15 py-20 sm:py-28"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-sage-dark">
          Experience & Education
        </p>
        <h2
          id="experience-heading"
          className="mt-3 max-w-xl font-display text-3xl tracking-tight text-ink sm:text-4xl"
        >
          A path built through learning and making
        </h2>

        <ol className="relative mt-14 space-y-10 border-l border-sage-muted/60 pl-8 sm:pl-10">
          {timeline.map((item) => (
            <li key={`${item.title}-${item.period}`} className="relative">
              {/* Timeline node */}
              <span
                className="absolute -left-[2.15rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-sage bg-surface sm:-left-[2.65rem]"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-xl text-ink sm:text-2xl">
                  {item.title}
                </h3>
                <span className="rounded-md bg-sage/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-sage-dark">
                  {item.type}
                </span>
              </div>

              <p className="mt-1 text-sm font-medium text-sage-dark">
                {item.organization} · {item.period}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
