---
name: CivicLens
colors:
  surface: '#0c0f0f'
  surface-dim: '#0c0f0f'
  surface-bright: '#272d2e'
  surface-container-lowest: '#000000'
  surface-container-low: '#101414'
  surface-container: '#161a1b'
  surface-container-high: '#1b2121'
  surface-container-highest: '#212727'
  on-surface: '#e1e7e6'
  on-surface-variant: '#a6acac'
  inverse-surface: '#f8faf9'
  inverse-on-surface: '#535655'
  outline: '#707777'
  outline-variant: '#434949'
  surface-tint: '#7bdfff'
  primary: '#7bdfff'
  primary-dim: '#08c6ef'
  on-primary: '#004e60'
  primary-container: '#32d4fe'
  on-primary-container: '#004554'
  inverse-primary: '#00687f'
  secondary: '#e6b4ff'
  secondary-dim: '#ce79ff'
  on-secondary: '#670098'
  secondary-container: '#3f0060'
  on-secondary-container: '#d282ff'
  tertiary: '#fdf8ff'
  tertiary-dim: '#e3dee6'
  on-tertiary: '#605e65'
  tertiary-container: '#eee9f1'
  on-tertiary-container: '#58565c'
  error: '#ff716c'
  error-dim: '#c94947'
  on-error: '#490006'
  error-container: '#8a1a1e'
  on-error-container: '#ff9993'
  primary-fixed: '#32d4fe'
  primary-fixed-dim: '#08c6ef'
  on-primary-fixed: '#002f3a'
  on-primary-fixed-variant: '#004e60'
  secondary-fixed: '#f5d9ff'
  secondary-fixed-dim: '#eec7ff'
  on-secondary-fixed: '#660096'
  on-secondary-fixed-variant: '#8c1ac9'
  tertiary-fixed: '#f1ecf4'
  tertiary-fixed-dim: '#e3dee6'
  on-tertiary-fixed: '#47454c'
  on-tertiary-fixed-variant: '#646168'
  background: '#0c0f0f'
  on-background: '#e1e7e6'
  surface-variant: '#212727'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 0.75rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-sm: 1rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an intelligent, forward-looking civic technology aesthetic with an expressive color variant. It bridges analytical rigor with citizen trust, transforming complex municipal telemetry and public governance data into transparent, actionable intelligence.

The visual style blends sleek modern SaaS precision with subtle glassmorphism and deep spatial dimensionality. The interface prioritizes clarity, situational awareness, and institutional stability, avoiding bureaucratic stagnation in favor of high-performance public transparency.

## Colors

The palette is engineered around dark atmospheric spatial awareness with dual-mode adaptability:

- **Primary Canvas & Neutrals:** Deep space slate-navy hierarchy (`#0c1323` base canvas, `#434646` neutral) providing low eye-fatigue for prolonged monitoring.
- **Primary & Secondary Accents:** High-potency expressive electric cyan (`#12c8f1`) paired with vibrant purple-violet (`#a83fe4`) and soft tertiary tones (`#f2edf5`) for active telemetry, key interactions, and focus rings.
- **Civic Status System:**
  - *Resolved / Stable:* Emerald Green (`#10B981` / background tint `rgba(16, 185, 129, 0.12)`)
  - *Under Review / Warning:* Signal Amber (`#F59E0B` / background tint `rgba(245, 158, 11, 0.12)`)
  - *Urgent / Critical:* Crimson Red (`#EF4444` / background tint `rgba(239, 68, 68, 0.15)`)
- **Data Tints:** Translucent stroke borders use `rgba(255, 255, 255, 0.08)` to maintain boundary discipline without visual clutter.

## Typography

The type scale combines the modern geometric energy of **Plus Jakarta Sans** for structural headers with the neutral, hyper-legible rendering of **Inter** for data grids, body copy, and operational status chips.

All numerical figures in tables and real-time metric counters must enforce tabular lining figures (`font-feature-settings: 'tnum' on, 'cv05' on`) to eliminate jitter during continuous data streams. Letter spacing is slightly tightened on headlines (`-0.02em`) for commanding poise and relaxed on sub-12px status badges (`+0.04em`) to safeguard rapid scannability.

## Layout & Spacing

The layout is governed by an adaptable 12-column responsive fluid grid designed for complex dashboard workflows, regional maps, and public transparency reports.

- **Desktop (1280px+):** 12 columns, 24px (`1.5rem`) gutters, 48px (`3rem`) screen margins. Max content container caps at 1440px with auto margins for centered fidelity.
- **Tablet (768px - 1279px):** 8 columns, 16px (`1rem`) gutters, 24px (`1.5rem`) screen margins. Auxiliary sidebars collapse into persistent drawer triggers.
- **Mobile (<768px):** 4 columns, 12px (`0.75rem`) gutters, 16px (`1rem`) screen margins. Complex metric groups stack vertically into modular cards.
- **Spacing Cadence:** Padding and child offsets follow strict incremental rhythm via the `space-*` tokens.

## Elevation & Depth

Visual hierarchy is maintained via translucent layered glassmorphism combined with subtle directional illumination:

- **Surface 0 (Base Canvas):** Raw background canvas, matte, absorbing backdrops.
- **Surface 1 (Panels & Shell):** Base surface with 80% opacity, `backdrop-filter: blur(16px)`, surrounded by a hairline top-lit border (`1px solid rgba(255, 255, 255, 0.08)`).
- **Surface 2 (Interactive Cards & Popovers):** Elevated cards with 88% opacity, `backdrop-filter: blur(24px)`, emitting an ambient tinted glow using the expressive primary accent color.
- **Modal & Critical Alert Surfaces:** Solid backdrop with explicit highlight rims (`1px solid rgba(18, 200, 241, 0.25)`) and dense drop shadows (`0 24px 64px -12px rgba(0, 0, 0, 0.75)`).

## Shapes

The design uses a refined balance between expansive, curved boundaries and sharp internal precision based on a roundedness level of 2:

- **Large Interactive Cards & Modals:** Built with expressive curvature (`rounded-2xl`) to evoke an ergonomic, consumer-grade finish.
- **Form Fields, Filter Triggers, & Segmented Controls:** Styled with `rounded-lg` for operational sharpness and visual alignment with tabular data.
- **Pill Badges & Status Indicators:** Use fully rounded pill caps (`border-radius: 9999px`) to immediately isolate discrete classification states from rectangular layout structures.

## Components

- **Interactive Cards:** Constructed with semi-translucent surfaces, 1px borders in `rgba(255, 255, 255, 0.08)`, and an inner top highlight. On hover, apply an expressive cyan transition to the border accompanied by a subtle 2px vertical lift.
- **Buttons:**
  - *Primary:* Solid high-contrast gradient (`linear-gradient(135deg, #12c8f1 0%, #a83fe4 100%)`) with contrasting text, crisp radius, and focused cyan halo rings on keyboard navigation.
  - *Secondary / Ghost:* Transparent with a 1px border (`rgba(255, 255, 255, 0.12)`) and light slate text, brightening upon hover to full white with an inner backdrop tint.
- **Status Chips & Badges:** Rounded pill format featuring priority glows. Include a 6px pulsing radial LED dot on the leading edge (Emerald for resolved, Amber for in-progress review, Crimson for critical urgency) surrounded by a matched translucent pill container.
- **Form Controls & Inputs:** Inputs sit on inset backgrounds with 1px border (`rgba(255, 255, 255, 0.14)`). On focus, transition to primary color with a soft diffusion aura (`box-shadow: 0 0 0 3px rgba(18, 200, 241, 0.2)`).
- **Data Lists & Telemetry Tables:** Alternating rows using transparent and subtle container tints. Row hover states brighten uniformly without obscuring high-contrast tabular values.
- **Iconography:** Lucide-style streamlined 24px and 16px icons with uniform stroke widths, adapting contextually to primary or ambient tones.
- **Civic Metric Gauges:** Ring trackers with dynamic gradient strokes set against darkened circular track grooves for instantaneous regional KPI reviews.