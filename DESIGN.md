# Artefcl Design System

Human-readable reference for the Artefcl marketing site visual language. For agent enforcement rules and implementation gotchas, see [`AGENTS.md`](AGENTS.md).

---

## Brand & aesthetic

**Artefcl** is a cross-industry AI studio. The site reads as **premium, minimalist, and brutalist** — heavily monochrome, editorial, and spacious. Motion is cinematic but restrained. Nothing shouts with bright UI chrome.

- Favor photography and typography over decoration
- Large deliberate whitespace between major blocks
- No bright primary colors (blue, red, etc.) on buttons or backgrounds

---

## Color palette

Marketing blocks use a tight hex palette. shadcn/Tailwind tokens in `app/globals.css` exist for utility components but are secondary on the marketing site.

| Token | Value | Usage |
|---|---|---|
| White | `#FFFFFF` | Page backgrounds, card surfaces, mobile hero |
| Charcoal | `#141516` | Primary text on light backgrounds, dark sections, mobile sheets |
| Warm accent | `#e6e5df` | Subtle warm off-white accents |
| Muted on dark | `rgba(255, 255, 255, 0.6)` | Secondary copy on charcoal |
| Muted on light | `#666` | Secondary copy on white |
| Border (light) | `rgba(20, 21, 22, 0.35)` | Ghost buttons, header CTA |
| Border (dark) | `rgb(134, 134, 134)` | Footer dividers |
| Image shadow | `rgba(20, 21, 22, 0.12)` | Floating hero photos |

**Glass / frost (dark backgrounds):**

```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 1);
```

**Header glass (light):**

```css
background-color: rgba(255, 255, 255, 0.65);
backdrop-filter: blur(16px);
```

---

## Typography

**Typeface:** [Inter](https://fonts.google.com/specimen/Inter) — loaded in `app/layout.tsx` as `--font-sans`.

### Display headings

Large responsive scales via `clamp()`, tight letter-spacing, tight line-heights. Weight varies by section (300–700).

| Context | Size | Tracking | Line-height |
|---|---|---|---|
| Desktop landing title | `clamp(2.5rem, 8vw, 6rem)` | `0.05em` | default |
| Mobile hero headline | `clamp(2.25rem, 11vw, 3.5rem)` | `-0.04em` | `0.85` |
| Stacking cards h2 | `clamp(2rem, 5vw, 80px)` | `-0.05em` | `0.8` |
| Testimonials title | `clamp(2rem, 4vw, 3.5rem)` | — | — |
| Nav / menu links | `clamp(2rem, 10vw, 3.25rem)` | — | — |

### Body text

- Size: `~1.2rem` to `1.8rem` (`clamp(16px, 1.2vw, 18px)` in cards)
- Line-height: `1.4`–`1.5`
- Weight: 400–500 for body; 700 for emphasis

### UI chrome

- Header bar: `12px`, uppercase, weight 400
- Pill buttons: `15px`–`16px`, normal case

---

## Layout

### Global container

Every major content block aligns to:

```css
width: 92vw;
max-width: 1400px;
margin: 0 auto;
```

### Spacing

- Section gaps: `10vh`–`15vh` between major blocks
- Cards section: `margin-top: 10vh`
- Footer: `padding-top: 120px` on body content

### Alignment rule

Vertical edges must align to the 92vw grid. When flex gaps would misalign titles inside `overflow: hidden` parents, use structural offsets (`position: relative; left: -20px`) instead of negative margins.

### Breakpoints

| Breakpoint | Role |
|---|---|
| `1024px` | Works section split — desktop carousel vs touch editorial grid |
| `768px` | Primary mobile/desktop split — hero, header bar, nav, most block layouts |
| `600px` | Desktop hero height adjustment |

---

## Components & patterns

### Sticky header

`components/blocks/header/`

- Sticky top, `z-index: 110`
- Translucent white + blur at rest; transparent when scrolled (desktop)
- Three-column bar: location | logo | CTA
- Desktop nav expands below bar; mobile uses bottom sheet + floating pill buttons
- `data-header-theme` on sections drives adaptive logo/text color (`adaptive`, `light`)

### Mobile bottom sheet

`.mobileSheet` in `components/blocks/header/style.module.scss`

- Fixed to bottom, `62.5dvh` height (`max-height: 65dvh`)
- Charcoal `#141516` background, `28px` top border-radius
- Horizontal padding: `4vw`
- Safe-area aware bottom padding

### Ghost / pill CTA

Used in header and via `components/ui/roundedbutton/`

- Transparent background, `1px` border, `border-radius: 9999px`
- Hover: opacity or milky fill — never solid bright color
- Transitions: `0.3s`–`0.4s` with Awwwards easing

### Glass circle CTA (dark sections)

Footer contact button:

- `180px` circle, frost glass, white border
- Hover softens border, transparent fill

### Split-text reveal

`components/ui/splittext/`

- Per-character `overflow: hidden` mask
- Inner letter translates `y: 110%` → `0`
- Mask `line-height: 1` (never inherit tight display line-height)
- `whileInView` trigger, `0.05s` stagger, `0.9s` duration
- `aria-label` on parent; `aria-hidden` on letter spans

### Stacking cards

`components/blocks/cards/`

- Each card slot: `position: sticky; top: 0; z-index: 10`
- Card: white surface, `80vh` height, `border-top: 1px solid black`
- **Downstream sections after Cards must use `z-index: 20+`** or content gets covered

### Desktop hero

`components/blocks/landing/landing.tsx` + `page.module.scss`

- Full viewport height, white background
- GSAP mouse parallax on three image planes (legacy exception — do not add new GSAP)
- Centered display type + handwriting SVG accents
- Scroll indicator uses `mix-blend-mode: difference` with white text

### Mobile hero

`components/blocks/landing/mobile-landing.tsx`

- Shown at `≤768px` only (`.mobileHero` / `.desktopHero` toggle)
- 12 edge-weighted floating image lanes (desktop + mobile asset sets)
- Framer Motion infinite vertical flow; scroll direction flips drift
- Headline: solid charcoal `#141516` on `z-index: 10` — always readable
- Images: `z-index: 1`, top-only mask fade (`transparent → opaque` over top 14%)
- `useReducedMotion()` → static collage layout

### Studio clip reveal

`components/blocks/studio/studio.tsx`

- Duplicate h2: background (dim) + foreground clipped by scroll-linked `clip-path`
- Right column body copy fades up on `whileInView`

### Works (homepage)

`components/blocks/testimonials/`

Dual layout at `1024px`:

| Viewport | Component | Pattern |
|---|---|---|
| `>1024px` | `works-desktop.tsx` | 3-up auto-carousel with quote overlays |
| `≤1024px` | `works-mobile.tsx` | Editorial image-first grid — 1 col mobile, 2 col tablet |

Touch cards: `aspect-ratio: 4/5` image, logo + client name + sector/year below in charcoal on white. No quotes on touch. Data in `works-data.ts`.

### Works index (`/works`)

`components/blocks/work/`

| Viewport | Pattern |
|---|---|
| `>1024px` | 2-col grid, `4/3` images, hover "View Case" overlay |
| `≤1024px` | Same grid (1 col mobile / 2 col tablet), `4/5` images, no overlay, muted `01` index prefix |

---

## Motion & animation

| Property | Value |
|---|---|
| Library | Framer Motion (all UI motion) |
| Easing | `[0.22, 1, 0.36, 1]` — “Awwwards curve” |
| Reveal duration | `0.8s`–`1.0s` |
| Hover / micro | `0.2s`–`0.4s` |
| Stagger | `0.05s`–`0.07s` per item |
| Scroll viewport | `{ once: true, margin: '-10% 0px -10% 0px' }` |

### Accessibility

Always gate motion with `useReducedMotion()`. When preferred:

- Collapse `initial` to resting state
- Set `duration` and `delay` to `0`
- Skip scroll-linked parallax and continuous drift

### Performance

- `will-change: transform, opacity, filter` only on actively animating elements
- `filter: blur()` only on one-shot reveals — never on continuous scroll or full-viewport text

---

## Imagery

- Monochrome / desaturated photography: tech, AI, craft, industry
- Desktop assets: `components/ui/data.tsx` → `public/landing/`
- Mobile-only assets: `components/ui/mobile-landing-data.ts` → `public/landing/mobile/`
- Floating images: `border-radius: 2px`, soft drop shadow
- Desktop planes use `filter: brightness(0.7)` on outer layer for depth

---

## Do / don't

### Do

- Use the 92vw / 1400px container everywhere
- Keep layouts spacious and edge-aligned
- Use ghost, glass, or pill CTAs
- Animate with Framer Motion + `useReducedMotion()`
- Raise `z-index` on sections after sticky cards

### Don't

- Use bright primary button colors
- Add frosted text boxes on the mobile hero (rejected — hurts legibility)
- Use `mix-blend-mode` for mobile headline contrast (unreliable on WebKit)
- Introduce new animation libraries (GSAP is grandfathered on desktop hero only)
- Use motion durations under `0.15s` for visible transitions
- Put tight `line-height` on split-text mask parents without `line-height: 1` on masks

---

## Related files

| File | Purpose |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Agent rules, gotchas, enforcement |
| [`app/globals.css`](app/globals.css) | Tailwind / shadcn CSS tokens |
| [`app/layout.tsx`](app/layout.tsx) | Inter font, root layout |
| [`components/ui/splittext/`](components/ui/splittext/) | Split-text reveal component |
| [`components/blocks/header/style.module.scss`](components/blocks/header/style.module.scss) | Header, mobile sheet, pills |
| [`components/blocks/landing/`](components/blocks/landing/) | Desktop + mobile heroes |
| [`components/blocks/cards/`](components/blocks/cards/) | Stacking cards section |
