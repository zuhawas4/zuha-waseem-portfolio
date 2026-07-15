import { ArrowDownRight } from "lucide-react";
import { site } from "@/data/content";

/**
 * Hero — first viewport composition.
 * Brand name is the dominant signal; title + tagline + CTAs support it.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 sm:items-center sm:pb-24 sm:pt-24"
      aria-labelledby="hero-name"
    >
      {/* Full-bleed atmospheric plane */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#dfead9] via-[#eef3ec] to-[#f7f9f6]" />
        <div className="animate-soft-pulse absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-sage/20 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-sage-light/50 blur-3xl" />
        {/* Subtle botanical line motif */}
        <svg
          className="absolute right-0 top-1/4 hidden h-[70%] w-[42%] text-sage/25 lg:block"
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M80 40 C180 120, 220 200, 160 300 C100 400, 260 420, 300 540"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M160 300 C220 280, 280 320, 320 280"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="160" cy="300" r="5" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="animate-fade-up mb-4 text-sm font-medium uppercase tracking-[0.2em] text-sage-dark">
          Portfolio
        </p>

        <h1
          id="hero-name"
          className="animate-fade-up-delay-1 font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {site.name}
        </h1>

        <p className="animate-fade-up-delay-2 mt-5 max-w-xl font-display text-2xl text-sage-dark sm:text-3xl">
          {site.title}
        </p>

        <p className="animate-fade-up-delay-2 mt-4 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
          {site.tagline}
        </p>

        <div className="animate-fade-up-delay-3 mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-sage px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sage-dark"
          >
            View Projects
            <ArrowDownRight size={18} aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-md border border-sage-dark/30 bg-transparent px-6 py-3 text-sm font-semibold text-sage-dark transition-colors hover:border-sage-dark hover:bg-sage-light/40"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
