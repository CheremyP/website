<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Artefcl Brand & UI Guidelines

When building or modifying components for this project, strictly adhere to the following "Awwwards-winning" aesthetic and rules:

## 1. Aesthetic & Vibe
- **Style:** Premium, minimalist, brutalist, and heavily monochrome.
- **Colors:**
  - Backgrounds: Pure White (`#FFFFFF`) or Dark Charcoal (`#141516`).
  - Accents: Warm beige/off-white (`#e6e5df`).
  - Secondary/Dimmed Text: `rgba(255, 255, 255, 0.6)` or `#666` (never use pure grays if they clash).
  - **NEVER** use bright primary colors (e.g., bright blue, red) for buttons or backgrounds.

## 2. Layout & Alignment
- **Global Container:** Always enforce strict alignment using `width: 92vw; max-width: 1400px; margin: 0 auto;`.
- **Alignment:** Vertical edges must align perfectly. If using flexbox padding (like `20px` card gaps), use structural offsets (e.g., `position: relative; left: -20px;`) rather than negative margins inside `overflow: hidden` containers to ensure the visual edge aligns with titles.
- **Spacing:** Use large, deliberate whitespace. Avoid cluttered layouts. Give elements room to breathe (e.g., `15vh` padding between major blocks).

## 3. Typography
- Use large, bold, and brutalist scaling for impact headers.
- **Display Text:** Capitalized or entirely lowercase, heavily tightened letter spacing (e.g., `-0.04em` to `-0.06em`), and tight line heights (e.g., `0.72` to `0.8`).
- **Body Text:** Clean sans-serif, readable (`~1.2rem` to `1.8rem`), `1.5` line-height.

## 4. Interactive Elements (CTAs & Buttons)
- Avoid solid colored blocks for buttons. 
- **Preferred Styles:**
  - *High-Contrast Glass:* `background: rgba(255, 255, 255, 0.05)`, `backdrop-filter: blur(10px)`, pure white borders, fading to pure white fill on hover.
  - *Soft Frost Glow:* Expanding milky gradient fills (`rgba(255, 255, 255, 0.15)`) on hover instead of blinding solid colors.
  - *Ghost:* Transparent with thin (`0.3` opacity) borders.
- Provide smooth, elegant transitions (e.g., `transition: color 0.3s ease, border-color 0.4s ease`).

## 5. Motion & Animation
- **Library:** Framer Motion is the only animation library. Do not introduce GSAP, Lottie, Motion One, or hand-rolled rAF loops for visual motion.
- **Easing:** Default to `[0.22, 1, 0.36, 1]` (ease-out, "Awwwards curve") for reveals and scroll-triggered motion. Avoid aggressive ease-in-out curves like `[0.76, 0, 0.24, 1]` for cascading staggers — they read as mechanical because the fast middle phase makes each item appear to shoot then brake.
- **Stagger:** Per-item delays in the `0.05s`–`0.07s` range produce a natural wave. Anything above `0.08s` reads as metronomic; anything below `0.04s` collapses into a slam.
- **Duration:** Reveal animations between `0.8s` and `1.0s`. Hover and micro-interactions between `0.2s` and `0.4s`. Never use sub-`0.15s` durations for visible motion — feels janky.
- **Triggers:** For below-the-fold content, use `whileInView` with `viewport={{ once: true, margin: '-10% 0px -10% 0px' }}` rather than mount-time animation. Mount-time animations fire while the element is invisible and the user sees nothing.
- **Accessibility:** ALWAYS gate motion behind Framer Motion's `useReducedMotion()` hook. When reduced motion is preferred: collapse `initial` to the resting state, set delay and duration to `0`, and skip scroll-linked parallax entirely.
- **Performance:** Apply `will-change: transform, opacity, filter` only on elements actively being animated. Be cautious with `filter: blur()` on full-viewport-width or very large (e.g., `21vw` font-size) elements — it is GPU-expensive and should only run once on reveal, never on continuous scroll.

## 6. Split-Text Reveals
- **Pattern:** Each character is wrapped in an `overflow: hidden` mask `span`, with an inner `motion.span` translating from `y: 110%` → `y: 0%`. The mask creates the "curtain" reveal; the inner element does the actual motion.
- **Mask sizing:** The mask's `line-height` must be `≥ 1` (a full em). If the parent display heading uses a tight brutalist `line-height` (e.g., `0.72`), the mask cannot inherit that — its box would be shorter than the visible glyph and the character will be clipped or never render. When tight display line-height is needed for visual density, set the parent to `line-height: 1`, keep the mask at `line-height: 1`, and compensate for the added vertical room by tightening surrounding padding (e.g., `padding-bottom` on the parent row, `padding-top` on the sibling row).
- **Translate distance:** Use `y: 110%`, not `y: 100%`. The extra `10%` accounts for font-metric variance so the glyph fully clears the mask bottom in all fonts.
- **Vertical alignment:** Prefer `vertical-align: bottom` on the mask spans so glyphs share a consistent baseline at rest and translate cleanly out of view.
- **Accessibility:** Apply `aria-label` with the readable word on the parent element (e.g., the `h1`), and `aria-hidden="true"` on each letter span. Screen readers will read the word once instead of spelling each character.
- **Polish layers:** Use sparingly. Opacity `0 → 1` over the first half of the reveal softens the hard mask edge and reads as more cinematic at large scale. `filter: blur(8px) → blur(0)` adds depth on giant display text but should be reserved for one-shot reveals.

## 7. Stacking & Sticky Sections
- **The Cards pattern:** `components/blocks/cards/` uses `position: sticky` with `z-index: 10` on each card slot to drive the stacking-cards scroll effect. The last sticky card stays pinned until the page scrolls fully past — meaning it will overlap any subsequent section that does not establish its own elevated stacking context.
- **Rule:** Any section rendered immediately after `<Cards>` MUST declare `position: relative; z-index: 20` (or higher). Without it, the white sticky card will overlap the next section's content as the user scrolls in.
- **Preferred direction:** When fixing stacking conflicts, raise the affected (downstream) section's z-index rather than lowering the cards'. Lowering the cards' z-index can break unrelated layering elsewhere on the page. Raising the new section is surgical and low-risk.
- **Overflow + tight line-height gotcha:** An ancestor with `overflow: hidden` will clip inline-block descendants whose box exceeds the ancestor's line box. This is particularly easy to hit with tight display `line-height` (e.g., `0.72`) containing inline-block mask wrappers that need a full `1em` of height to contain their glyph. If a glyph disappears entirely, suspect this interaction first.
