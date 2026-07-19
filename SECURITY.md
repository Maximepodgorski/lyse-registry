# Security Policy — Lyse Registry

## Reporting vulnerabilities

If you discover a security vulnerability in Lyse Registry, please report it **privately** before disclosing publicly:

- **Email:** contact@getlyse.com (preferred — response guaranteed)
- **GitHub Security Advisories:** https://github.com/lyse-labs/lyse-registry/security/advisories/new (if private vulnerability reporting is enabled on this repo)

We aim to respond within **5 business days**.

## Supported versions

This repo has no versioned releases in the traditional sense — `main` is deployed continuously to `ui.getlyse.com`, and component code is consumed directly from source (see below). Security fixes land on `main` and take effect on the next deploy.

## Security model

| Component | Trust boundary | Notes |
|---|---|---|
| `ui.getlyse.com` (Next.js doc site) | Our infrastructure (Vercel) | Serves component source code and documentation. No user data collected beyond standard web analytics (`@vercel/analytics`). |
| `registry.json` / `public/r/*.json` | Our infrastructure | The shadcn-compatible manifest and per-component JSON payloads served over HTTPS. This is the actual mechanism by which component **source code** is copied into a consumer's project. |
| Installed components (consumer's machine) | The consumer's own codebase | Running `npx shadcn@latest add https://ui.getlyse.com/r/<component>.json` downloads and writes files directly into the consumer's project. **Review the diff before committing**, same as with any copy-paste component library. Lyse Registry does not execute code on your machine beyond what the `shadcn` CLI itself does. |

## Out of scope

- Vulnerabilities in dependencies upstream from this repo (report to those projects — e.g. Next.js, `@base-ui-components/react`, `shadcn`).
- Issues in components already installed into a consumer's project — once copied, that code is the consumer's to maintain and patch.
- Cosmetic/rendering bugs in the doc site that have no security impact (use a regular [issue](https://github.com/lyse-labs/lyse-registry/issues) for those).

## Hall of fame

Credits for responsibly disclosed issues will be listed here.
