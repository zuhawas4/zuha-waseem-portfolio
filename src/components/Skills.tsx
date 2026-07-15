import {
  Code2,
  Layers3,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/data/content";

const categoryIcons: Record<string, LucideIcon> = {
  Languages: Code2,
  Frameworks: Layers3,
  "Tools & Concepts": Wrench,
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-line/70 bg-sage-light/20 py-20 sm:py-28"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-sage-dark">
          Skills
        </p>
        <h2
          id="skills-heading"
          className="mt-3 max-w-xl font-display text-3xl tracking-tight text-ink sm:text-4xl"
        >
          Tools I use to shape the web
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = categoryIcons[group.category] ?? Code2;

            return (
              <div key={group.category}>
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-sage/15 text-sage-dark">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl text-ink">
                    {group.category}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-2" aria-label={group.category}>
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-line bg-surface-elevated px-3 py-1.5 text-sm font-medium text-ink-soft"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
