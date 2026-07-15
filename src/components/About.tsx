import { about } from "@/data/content";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-line/70 py-20 sm:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-sage-dark">
            About
          </p>
          <h2
            id="about-heading"
            className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl"
          >
            Design-minded developer with a CS foundation
          </h2>
        </div>

        <div className="space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
