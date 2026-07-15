import { ExternalLink } from "lucide-react";
import { projects } from "@/data/content";

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.586 2 12.253c0 4.53 2.865 8.367 6.839 9.72.5.094.683-.222.683-.493 0-.243-.009-.887-.014-1.74-2.782.617-3.369-1.37-3.369-1.37-.455-1.178-1.11-1.492-1.11-1.492-.908-.635.069-.622.069-.622 1.003.072 1.531 1.05 1.531 1.05.892 1.56 2.341 1.11 2.91.849.091-.66.35-1.11.636-1.366-2.22-.258-4.555-1.137-4.555-5.062 0-1.118.39-2.033 1.029-2.75-.103-.258-.446-1.296.098-2.701 0 0 .84-.274 2.75 1.05A9.35 9.35 0 0 1 12 6.844a9.35 9.35 0 0 1 2.504.344c1.909-1.324 2.748-1.05 2.748-1.05.546 1.405.202 2.443.1 2.701.64.717 1.028 1.632 1.028 2.75 0 3.935-2.339 4.801-4.566 5.054.359.316.679.94.679 1.895 0 1.367-.012 2.47-.012 2.806 0 .273.18.592.688.492C19.138 20.616 22 16.78 22 12.253 22 6.586 17.523 2 12 2Z" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-line/70 py-20 sm:py-28"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-sage-dark">
          Projects
        </p>
        <h2
          id="projects-heading"
          className="mt-3 max-w-xl font-display text-3xl tracking-tight text-ink sm:text-4xl"
        >
          Selected work and experiments
        </h2>

        {/* Cards are used here as interactive containers for project links */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.title}>
              <article className="group flex h-full flex-col rounded-lg border border-line bg-surface-elevated p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sage-muted hover:shadow-[0_12px_40px_-18px_rgba(90,115,84,0.35)]">
                <h3 className="font-display text-2xl text-ink transition-colors group-hover:text-sage-dark">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft sm:text-base">
                  {project.description}
                </p>

                <ul
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label={`${project.title} tech stack`}
                >
                  {project.tech.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-sage-light/50 px-2.5 py-1 text-xs font-medium text-sage-dark"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-4 border-t border-line pt-4">
                  <a
                    href={project.liveUrl}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage-dark transition-colors hover:text-ink"
                    target={project.liveUrl === "#" ? undefined : "_blank"}
                    rel={
                      project.liveUrl === "#"
                        ? undefined
                        : "noopener noreferrer"
                    }
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    Live
                  </a>
                  <a
                    href={project.githubUrl}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon />
                    GitHub
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
