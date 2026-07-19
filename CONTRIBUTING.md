# Contributing to Lyse Registry

Thanks for considering a contribution. Lyse Registry is MIT-licensed — by submitting code, you agree to license it under the same terms.

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold it.

Report unacceptable behavior to **contact@getlyse.com**.

## Ways to contribute

- **Report bugs** — see [bug report template](.github/ISSUE_TEMPLATE/bug_report.yml).
- **Request components or features** — see [feature request template](.github/ISSUE_TEMPLATE/feature_request.yml).
- **Improve documentation** — typos, clarity, missing sections, and missing components in the README table are all welcome.
- **Add or refine components** — see "Adding a component" below.

## Development setup

Prerequisites:
- Node.js 20+
- pnpm

```bash
git clone https://github.com/lyse-labs/lyse-registry
cd lyse-registry
pnpm install
pnpm dev
```

The doc site runs at `http://localhost:3000`.

```bash
pnpm build              # Production build
pnpm lint                # ESLint
pnpm registry:build      # Regenerate public/r/*.json from registry.json + source
```

## Project structure

- `registry/new-york/ui/` — component source (`.tsx`, `.css`, `doc.md`).
- `registry.json` — the shadcn-compatible manifest. Every shipped component **must** have an entry here — this is the source of truth `pnpm registry:build` reads from to generate `public/r/*.json`, the files actually served to `npx shadcn add`.
- `app/components/` — the doc site (one route per component).
- `docs/rules/` — written conventions for this repo (registry format, CSS, component patterns, doc pages).

## Adding a component

Follow [`docs/rules/registry.md`](./docs/rules/registry.md) exactly — it's the authoritative, step-by-step process (create files → add the `registry.json` entry → declare dependencies → run `pnpm registry:build` → test install locally). Skipping the `registry.json` step is the single most common mistake: the component will render fine in dev but never reach `public/r/`, so `npx shadcn add` for it will 404 in production.

Also add:
- A doc page under `app/components/<name>/page.tsx` (copy a similar existing component's page as a starting point).
- A row in the README's component table and install script.

## Pull request process

1. Fork and create a branch: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`, or `chore/<topic>`.
2. Make the smallest change that solves the problem.
3. Run `pnpm build` and `pnpm lint` — both must pass.
4. If you added or changed a component, run `pnpm registry:build` and commit the regenerated `public/r/*.json`.
5. Open a PR using [the template](.github/PULL_REQUEST_TEMPLATE.md).

## Commit message convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(accordion): add Accordion component
fix(sheet): correct focus trap on close
docs(readme): document Slider install
chore(deps): bump next to 15.5.9
```

Prefixes: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`, `build`, `perf`.

## Code style

- Strict TypeScript.
- Design tokens only — no hardcoded colors, spacing, or radius values in component CSS (see [`docs/rules/token-usage.md`](./docs/rules/token-usage.md)).
- No emojis in code or comments.

Lint config: `eslint.config.mjs` (flat config, Next.js + TypeScript).

## Questions

- **Security vulnerabilities**: see [SECURITY.md](./SECURITY.md). Never open a public issue for vulnerabilities.

## Recognition

Contributors are listed on the GitHub repo's contributor page.

— The Lyse Labs team
