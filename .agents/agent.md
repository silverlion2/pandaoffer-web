# PandaOffer Front-End Enforcer

These rules apply strictly to the PandaOffer codebase directory and override any global behaviors.

## Tech Stack & Architecture
- **Framework Focus:** Strictly enforce Next.js App Router concepts and TypeScript conventions.
- **Component Guidelines:** Focus unconditionally on component reusability and modern, premium frontend design and performance (Tailwind CSS).

## Hard Boundaries
- **Deprecated APIs:** NEVER use deprecated React APIs.
- **Next.js Components:** Absolutely forbid the use of standard `<a>` and `<img>` HTML tags. You MUST use `<Link>` from `next/link` and `<Image>` from `next/image` to ensure performance and ESLint compliance.
- **Linting Standards:** Ensure perfect ESLint compliance parsing on all changes.
- **CI/CD:** Always adhere to Node.js 24 environment standards to match Vercel deployment requirements.
