## What

<!-- 1-2 sentences on what changed. -->

## Why

<!-- Link the issue or give the motivation in 1 sentence. -->

Closes #

## Test plan

- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes
- [ ] If a component was added/changed: `registry.json` entry added/updated + `pnpm registry:build` run + `public/r/*.json` committed
- [ ] If a component was added: doc page under `app/components/<name>/` + README table/install script updated
- [ ] Manually verified in `pnpm dev`
