# SaaS Component Roadmap

> Lyse Registry — composants manquants pour couvrir les besoins SaaS.
> Chaque composant suit le dual-file pattern (`.tsx` + `.css`), consomme les tokens Layer 2/3, et utilise Radix quand applicable.

## Déjà shipped (23)

Button, Badge, Tag, Tooltip, Toast, Menu, Checkbox, Radio, Toggle, Banner-info, Avatar, Dropdown-menu, Select, Input, Textarea, Modal, Spinner, Progress, Action-card, Spotlight-card, Callout-card, Chip, Tabs

---

## Priorités

| Priorité | Signification |
|----------|---------------|
| **P0** | Bloque d'autres composants ou universellement requis |
| **P1** | Commun en SaaS, forte valeur perçue |
| **P2** | Nice to have, usage occasionnel |

## Complexité

| Taille | Estimation |
|--------|-----------|
| **S** | < 1h — simple, peu de variants |
| **M** | 1-3h — variants multiples, states, a11y |
| **L** | 3-8h — composé, logique, animations |

---

## 1. Foundation

Briques de base manquantes. Pré-requis pour les composés.

| # | Composant | Description | Radix | Prio | Taille | Delta vs shadcn |
|---|-----------|-------------|-------|------|--------|-----------------|
| 1 | **Label** | Label accessible lié aux contrôles form | `label` | P0 | S | Token typography intégré, états error/disabled |
| 2 | **Separator** | Divider horizontal/vertical sémantique | `separator` | P0 | S | Variants: subtle/default/strong via border tokens |
| 3 | **Card** | Container générique header/content/footer | — | P0 | S | Shadow tokens, variant outline/elevated/ghost |
| 4 | **Skeleton** | Placeholder loading animé | — | P0 | S | Pulse via tokens, shapes: text/circle/rect/card |
| 5 | **Kbd** | Affichage raccourci clavier | — | P1 | S | Intégré aux tokens typo mono, taille auto |
| 6 | **Scroll Area** | Scrollbar custom cross-browser | `scroll-area` | P1 | M | Thumb stylé tokens, auto-hide, min-thumb-size |
| 7 | **Aspect Ratio** | Container ratio fixe pour media | `aspect-ratio` | P2 | S | — |

## 2. Forms

Composants de saisie manquants. Critique pour tout SaaS.

| # | Composant | Description | Radix | Prio | Taille | Delta vs shadcn |
|---|-----------|-------------|-------|------|--------|-----------------|
| 8 | **Field** | Wrapper label + control + helper/error text | — | P0 | M | Compose avec Label, gère error state token, description slot |
| 9 | **Input Group** | Input avec addon/prefix/suffix/button | — | P0 | M | Slots left/right, variant inline button, icon sizing |
| 10 | **Slider** | Range input simple/double | `slider` | P1 | M | Track + thumb tokens, variant brand/neutral, range mode |
| 11 | **Switch** | Toggle on/off distinct du Toggle button | `switch` | P1 | S | Track color tokens, size sm/md/lg, label intégré |
| 12 | **Combobox** | Input autocomplete + liste déroulante | `popover` + `command` | P1 | L | Search intégré, multi-select, create option, async loading |
| 13 | **Date Picker** | Sélection date/range avec calendar | `popover` | P1 | L | Presets, range mode, locale, tokens calendar |
| 14 | **Input OTP** | Champs code à usage unique | — | P1 | M | Auto-focus, paste support, separator slot, sizes |
| 15 | **File Upload** | Zone drag & drop + click to upload | — | P2 | M | Preview thumbnails, progress intégré, multi-file, validation |
| 16 | **Color Picker** | Sélection couleur avec swatches | `popover` | P2 | L | Swatches, HSL/HEX input, alpha, preset palettes |

## 3. Data Display

Affichage d'information structurée. Cœur du dashboard SaaS.

| # | Composant | Description | Radix | Prio | Taille | Delta vs shadcn |
|---|-----------|-------------|-------|------|--------|-----------------|
| 17 | **Table** | Table responsive avec header/body/footer | — | P0 | M | Sticky header, striped variant, sortable header slot, compact/comfortable |
| 18 | **Data Table** | Table avancée (sort, filter, pagination) | — | P1 | L | Basé sur TanStack Table, column resize, row selection, bulk actions bar |
| 19 | **Accordion** | Panneaux empilés expandables | `accordion` | P1 | M | Single/multi mode, icon rotation, variant bordered/ghost |
| 20 | **Collapsible** | Panel expandable simple | `collapsible` | P1 | S | Animate height, trigger slot libre |
| 21 | **Timeline** | Flux chronologique vertical | — | P1 | M | Dot/icon/avatar node, connector line tokens, variant compact/detailed |
| 22 | **Stat Card** | Métrique avec trend et sparkline | — | P1 | M | Value + delta + trend indicator + sparkline slot, variant positive/negative/neutral |
| 23 | **Empty State** | État vide avec illustration + CTA | — | P1 | S | Icon/illustration slot, title, description, action slot |
| 24 | **List / List Item** | Liste structurée avec slots | — | P2 | M | Leading/trailing slots, divider auto, hover/selected states |
| 25 | **Calendar** | Calendrier mensuel grid | — | P2 | L | Day cell slots, range highlight, locale, disabled dates |
| 26 | **Hover Card** | Preview riche au hover | `hover-card` | P2 | M | Delay configurable, arrow, portal |

## 4. Navigation

Se déplacer dans l'app. Pattern SaaS omniprésents.

| # | Composant | Description | Radix | Prio | Taille | Delta vs shadcn |
|---|-----------|-------------|-------|------|--------|-----------------|
| 27 | **Breadcrumb** | Fil d'ariane avec liens hiérarchiques | — | P0 | S | Separator customizable, truncation/ellipsis pour deep paths |
| 28 | **Pagination** | Navigation pages avec prev/next | — | P1 | M | Variant compact (prev/next only) et full (pages), sizes |
| 29 | **Sidebar** | Navigation latérale collapsible | — | P1 | L | Collapsible, groups, icons, badge count, variant rail/full, mobile drawer |
| 30 | **Stepper** | Progression multi-étapes | — | P1 | M | Horizontal/vertical, clickable steps, variant dot/number/icon, error state |
| 31 | **Command** | Palette de commandes (⌘K) | `dialog` | P1 | L | Search + groups + shortcuts, fuzzy match, recent, async results |
| 32 | **Navigation Menu** | Nav links pour header/marketing | `navigation-menu` | P2 | M | Dropdown mega-menu, indicator animé, viewport |
| 33 | **Menubar** | Barre menu desktop-style | `menubar` | P2 | M | Sous-menus, raccourcis, checkbox/radio items |

## 5. Overlays

Contenus superposés. Modaux, sheets, popovers.

| # | Composant | Description | Radix | Prio | Taille | Delta vs shadcn |
|---|-----------|-------------|-------|------|--------|-----------------|
| 34 | **Popover** | Contenu riche dans un portal | `popover` | P0 | M | Arrow, portal, side/align, close on interact outside |
| 35 | **Alert Dialog** | Dialog de confirmation critique | `alert-dialog` | P0 | M | Variant destructive, icon slot, structured actions |
| 36 | **Sheet** | Panel coulissant (drawer lateral) | `dialog` | P1 | M | Side: left/right/top/bottom, sizes sm/md/lg/full |
| 37 | **Drawer** | Bottom sheet mobile-first | — | P1 | M | Vaul-based, snap points, handle, nested support |
| 38 | **Context Menu** | Menu clic droit | `context-menu` | P2 | M | Sub-menus, raccourcis, checkbox/radio items |

## 6. Feedback

Retour utilisateur au-delà du Toast/Spinner existants.

| # | Composant | Description | Radix | Prio | Taille | Delta vs shadcn |
|---|-----------|-------------|-------|------|--------|-----------------|
| 39 | **Alert** | Callout statique info/warning/error/success | — | P0 | S | Icon auto par variant, dismiss optional, token-driven colors |
| 40 | **Toggle Group** | Groupe de toggles single/multi select | `toggle-group` | P1 | M | Variant outline/filled, sizes, ensure≥1 selected option |

## 7. Layout

Structure et espacement.

| # | Composant | Description | Radix | Prio | Taille | Delta vs shadcn |
|---|-----------|-------------|-------|------|--------|-----------------|
| 41 | **Resizable** | Panneaux redimensionnables | — | P2 | M | react-resizable-panels, handle stylé, min/max, persist size |

## 8. SaaS Patterns

Composés opinionated — valeur ajoutée Lyse unique. Non présents dans shadcn.

| # | Composant | Description | Base composants | Prio | Taille | Usage SaaS |
|---|-----------|-------------|-----------------|------|--------|------------|
| 42 | **User Menu** | Avatar + dropdown profil/settings/logout | Avatar + Dropdown | P0 | M | Header app, toujours visible |
| 43 | **Workspace Switcher** | Dropdown switch entre workspaces/teams | Select + Avatar | P1 | M | Multi-tenant SaaS |
| 44 | **Search Bar** | Input search global avec raccourci ⌘K | Input + Command | P1 | M | Navigation rapide, search everywhere |
| 45 | **Pricing Card** | Card plan avec features, prix, CTA | Card + Badge + Button | P1 | M | Page pricing, upgrade modal |
| 46 | **Onboarding Checklist** | Checklist étapes setup avec progress | Progress + Collapsible | P1 | M | Activation utilisateur, premier run |
| 47 | **Activity Feed** | Timeline d'événements avec avatar + action | Timeline + Avatar | P2 | M | Dashboard, audit log |
| 48 | **Usage Meter** | Barre usage avec seuils et label quota | Progress + Badge | P2 | S | Billing page, usage limits |
| 49 | **Feature Comparison** | Table comparaison plans | Table + Badge + Tooltip | P2 | M | Page pricing |
| 50 | **Notification Center** | Popover avec liste notifications groupées | Popover + List + Badge | P2 | L | Header app, real-time |

---

## Résumé par priorité

### P0 — Ship first (12 composants)

Foundation pour tout le reste. Bloquent les composés.

```
Label → Separator → Card → Skeleton → Field → Input Group →
Table → Breadcrumb → Popover → Alert Dialog → Alert → User Menu
```

### P1 — Ship next (22 composants)

Couvrent 90% des besoins SaaS courants.

```
Kbd, Scroll Area, Slider, Switch, Combobox, Date Picker, Input OTP,
Data Table, Accordion, Collapsible, Timeline, Stat Card, Empty State,
Pagination, Sidebar, Stepper, Command, Sheet, Drawer, Toggle Group,
Workspace Switcher, Search Bar, Pricing Card, Onboarding Checklist
```

### P2 — Ship when needed (16 composants)

Nice to have, usage spécifique.

```
Aspect Ratio, File Upload, Color Picker, List, Calendar, Hover Card,
Navigation Menu, Menubar, Context Menu, Resizable,
Activity Feed, Usage Meter, Feature Comparison, Notification Center
```

---

## Ordre de batch recommandé

| Batch | Composants | Thème | Dépend de |
|-------|-----------|-------|-----------|
| **B1** | Label, Separator, Card, Skeleton, Alert, Kbd | Foundation | — |
| **B2** | Field, Input Group, Switch, Slider | Forms complete | B1 (Label) |
| **B3** | Popover, Alert Dialog, Sheet | Overlays | — |
| **B4** | Breadcrumb, Pagination, Stepper | Navigation | — |
| **B5** | Table, Accordion, Collapsible, Empty State | Data display | B1 (Card, Skeleton) |
| **B6** | User Menu, Workspace Switcher, Search Bar | SaaS essentials | B3 (Popover), Avatar, Dropdown |
| **B7** | Combobox, Command, Date Picker | Advanced input | B3 (Popover) |
| **B8** | Data Table, Stat Card, Timeline | Dashboard | B5 (Table) |
| **B9** | Sidebar, Drawer, Scroll Area | Layout | B3 (Sheet) |
| **B10** | Remaining P1 + P2 | Polish | B1-B9 |

---

## Design principles — ce qui différencie Lyse de shadcn

1. **Tokens natifs** — Jamais de valeurs brutes. Couleurs, spacing, radius, shadows = CSS vars Layer 2/3.
2. **Dark mode first-class** — Chaque composant a un rendu dark testé, pas un afterthought.
3. **Dual-file pattern** — Structure (TSX/CVA) séparée du theming (CSS). Permet aux utilisateurs de re-skin sans toucher la logique.
4. **Variants opinionated** — Moins de variants que shadcn, mais chacune designée et testée. Pas de "default" générique.
5. **SaaS patterns composés** — Des composants de haut niveau (User Menu, Workspace Switcher) prêts à l'emploi, pas juste des primitives.
6. **Typography system** — Classes composites (`text-content-*`, `text-heading-*`) au lieu de tailles brutes.
7. **Animation tokens** — Transitions cohérentes via `prefers-reduced-motion`, durées/easings partagés.
8. **a11y by default** — Radix quand applicable, focus ring cohérent, aria-labels, keyboard nav.
