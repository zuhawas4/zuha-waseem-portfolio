import { Mail } from "lucide-react";
import { site } from "@/data/content";

/** Simple brand icons (lucide no longer ships social brand marks). */
function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.586 2 12.253c0 4.53 2.865 8.367 6.839 9.72.5.094.683-.222.683-.493 0-.243-.009-.887-.014-1.74-2.782.617-3.369-1.37-3.369-1.37-.455-1.178-1.11-1.492-1.11-1.492-.908-.635.069-.622.069-.622 1.003.072 1.531 1.05 1.531 1.05.892 1.56 2.341 1.11 2.91.849.091-.66.35-1.11.636-1.366-2.22-.258-4.555-1.137-4.555-5.062 0-1.118.39-2.033 1.029-2.75-.103-.258-.446-1.296.098-2.701 0 0 .84-.274 2.75 1.05A9.35 9.35 0 0 1 12 6.844a9.35 9.35 0 0 1 2.504.344c1.909-1.324 2.748-1.05 2.748-1.05.546 1.405.202 2.443.1 2.701.64.717 1.028 1.632 1.028 2.75 0 3.935-2.339 4.801-4.566 5.054.359.316.679.94.679 1.895 0 1.367-.012 2.47-.012 2.806 0 .273.18.592.688.492C19.138 20.616 22 16.78 22 12.253 22 6.586 17.523 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.119 20.452H3.554V9h3.565v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink text-sage-light">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-12 sm:flex-row sm:items-center sm:px-8">
        <div>
          <p className="font-display text-2xl text-white">{site.name}</p>
          <p className="mt-1 text-sm text-sage-muted">{site.title}</p>
        </div>

        <ul className="flex items-center gap-3" aria-label="Social links">
          <li>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-sage-light transition-colors hover:border-sage-muted hover:text-white"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
          </li>
          <li>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-sage-light transition-colors hover:border-sage-muted hover:text-white"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-sage-light transition-colors hover:border-sage-muted hover:text-white"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-4 text-sm text-sage-muted sm:px-8">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
