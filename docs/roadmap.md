# Component Roadmap

> Lyse Registry — versions et progression du design system.
> Live at [ui.getlyse.com](https://ui.getlyse.com)

---

## v1.0 — Initial (23 composants)

Premier batch. Primitives UI essentielles.

Button, Badge, Tag, Tooltip, Toast, Menu, Checkbox, Radio, Toggle, Banner Info, Avatar, Dropdown Menu, Select, Input, Textarea, Modal, Spinner, Progress, Action Card, Spotlight Card, Callout Card, Chip, Tabs

---

## v1.1 Aube (10 composants) — Shipped

La lumiere apparait. Foundation, overlays, data display, navigation.

Alert, Alert Dialog, Breadcrumb, Card, Field, Popover, Separator, Skeleton, Stepper, Table

**Total shipped : 33 composants**

`Input Group` and `Kbd` were scoped for v1.1 but never shipped — no `.tsx`, no `registry.json` entry, not served at `ui.getlyse.com`. Only a `doc.md` design-notes stub exists for each under `registry/new-york/ui/`.

| Composant | Statut | Note |
|-----------|--------|------|
| Kbd | To do | Design notes only (`doc.md`), no implementation started |
| Input Group | Dropped | Wrong approach (wrapper breaks `Field` a11y) — see `specs/dropped/input-group-spec.md`. Superseded by extending `Input` with addon props. |

---

## v1.2 Nova (7 composants) — En cours

L'etoile s'embrase. Overlays, data display, forms, navigation.

| Composant | Categorie | Taille | Status |
|-----------|-----------|--------|--------|
| Slider | Forms | M | Shipped |
| Sheet | Overlays | M | Shipped |
| Drawer | Overlays | M | To do |
| Collapsible | Data display | S | Shipped |
| Accordion | Data display | M | Shipped |
| Pagination | Navigation | M | Shipped |
| Empty State | Feedback | S | To do |

Only `Drawer` and `Empty State` remain unshipped for v1.2.

**Projet :** v1.2 Nova (tracked in this file — no public project board yet)

---

## v1.3+ — Backlog

Composants identifies, non encore scopes en version.

### P1 — Forte valeur SaaS

| Composant | Categorie |
|-----------|-----------|
| Combobox | Forms |
| Date Picker | Forms |
| Input OTP | Forms |
| Data Table | Data display |
| Timeline | Data display |
| Stat Card | Data display |
| Sidebar | Navigation |
| Command | Navigation |
| Toggle Group | Feedback |
| Scroll Area | Layout |
| User Menu | SaaS pattern |
| Workspace Switcher | SaaS pattern |
| Search Bar | SaaS pattern |
| Pricing Card | SaaS pattern |
| Onboarding Checklist | SaaS pattern |

### P2 — Nice to have

| Composant | Categorie |
|-----------|-----------|
| File Upload | Forms |
| Color Picker | Forms |
| List / List Item | Data display |
| Calendar | Data display |
| Hover Card | Data display |
| Navigation Menu | Navigation |
| Menubar | Navigation |
| Context Menu | Overlays |
| Aspect Ratio | Layout |
| Resizable | Layout |
| Activity Feed | SaaS pattern |
| Usage Meter | SaaS pattern |
| Feature Comparison | SaaS pattern |
| Notification Center | SaaS pattern |
