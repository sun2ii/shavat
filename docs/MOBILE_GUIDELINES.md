# Shavat Mobile Guidelines

Standards for every screen, enforced during the 2026-08-17 responsiveness sweep.
Feed this file to any AI session (or human) touching UI. The iOS app is the web
app in a Capacitor shell, so these rules apply to ALL pages — there is no
separate "mobile codebase" beyond `components/native/`.

## Layout

- Design for 390px width first; widen with `sm:` (640) / `md:` (768) / `lg:` (1024).
- Never ship a bare multi-column `grid-cols-N` — always give it a mobile tier
  (`grid-cols-2 sm:grid-cols-3 …`). Same for side-by-side header rows: use
  `flex flex-wrap` or `flex-col sm:flex-row`.
- Any horizontal row of labels/pills/stats gets `flex-wrap` (with `gap-y-*`)
  or deliberate `overflow-x-auto` with hidden scrollbars
  (`[&::-webkit-scrollbar]:hidden [scrollbar-width:none]`) — never silent overflow.
- Fixed heights clip wrapped text on narrow cards: prefer `min-h-*` over `h-*`.
- Viewport units: use `dvh`/`svh`, never `vh` (iOS browser chrome breaks `vh`).

## Touch

- Interactive elements: ≥44px hit area. Keep compact visuals with invisible
  hit-slop (`py-3 -my-3`) or `min-h-[44px]`; restore density on desktop with
  `md:` overrides (`px-4 py-2.5 md:px-3 md:py-1.5`).
- Hover is not an input: every `hover:` affordance needs an `active:` twin or a
  visible control. `title=` tooltips never show on touch — pair with
  `aria-label` and make the info visible some other way.
- Mouse-hover open/close handlers must be gated to mice
  (`onPointerEnter={(e) => e.pointerType === 'mouse' && …}`), and anything
  that opens needs a touch dismissal path (scrim or outside-tap listener).
- Double-click/keyboard-only features need a single-tap equivalent
  (e.g. verse numbers toggle selection on tap).

## Native shell (Capacitor iOS)

- The tab bar is 56px + `env(safe-area-inset-bottom)`; body padding is handled
  globally via `html.native-app` in globals.css. Any `fixed bottom-*` element
  needs a native-aware offset: `[.native-app_&]:bottom-[calc(4.5rem+env(safe-area-inset-bottom))]`.
- Native-only UI lives in `components/native/`, gated by `isNativeApp()`.
  The web bundle must never import `@capacitor/*`.
- Sticky headers: content scrolled into view needs `scroll-mt-16` so it isn't
  hidden underneath.

## Typography

- Floor for informational text: 10px (`text-[8px]`/`text-[9px]` are banned).
- Inputs: ≥16px on mobile (`text-base sm:text-sm`) or iOS auto-zooms the page.
- Large display headings scale down a tier on mobile (`text-4xl sm:text-5xl`).

## Verification

- `npm run typecheck` after UI changes.
- Check at 390px in browser device mode, then confirm in the iOS Simulator or
  on-device (dev server hot-reloads into the app — no rebuild needed).
- Watch for: horizontal page scroll (always a bug), content under the tab bar,
  targets you can't hit with a thumb.
