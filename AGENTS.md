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
