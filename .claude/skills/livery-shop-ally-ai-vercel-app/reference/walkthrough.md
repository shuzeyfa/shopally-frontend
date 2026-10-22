# Walkthrough: how the page is built and how it moves

One part per top-level section, top to bottom, as measured at 1440 px. Sizes are CSS pixels; colours are as computed. Every file named here is in this folder. How things move and behave (scrolling, page changes, the menu, hovers), step by step, is in `reference/motion/README.md`.

## 01 · header

- **Box:** 1440×69 px, starting 0 px from the top. Background rgb(255, 255, 255), text rgb(17, 24, 39).
- **Layout:** flex row of 3, gap normal, space-between/center.
- **Type:** ui-sans-serif 500 14px/20px · ui-sans-serif 600 14px/20px · ui-sans-serif 700 20px/28px (family weight size/line-height, most text first).
- **Inside:** 1 button, 4 links, 1 picture.
- **Look:** `reference/sections/01-header.jpg` and its anatomy `reference/sections/01-header.anatomy.jpg`.
- **Markup:** `reference/sections/01-header.html`.
- **Pictures:** `reference/assets/images/007-frame.png` (32×32).
- **Motion:**
  - script `element.animate` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > header.flex.justify-between > div.flex.items-center`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
  - script writes `transform` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > header.flex.justify-between > button.text-black.px-4` 103 times over 9554 ms (on load): from `translateY(-0.264773px)` to `translateY(-1.18795px)`
  - scripts add `.text-gray-700`, `.hover:text-[#FFD300]` to 1 element as the page scrolls (first at scrollY 0)
- **Hover:** `.hover\:scale-105:hover` changes scale; `.hover\:text-\[\#FFD300\]:hover` changes color.
- **Control states:** `reference/components/01-nav-link.jpg` (nav-link a.transition-colors.cursor-pointer:nth-of-type(1): rest, hover, focus).
- **Control states:** `reference/components/02-nav-link.jpg` (nav-link a.transition-colors.cursor-pointer:nth-of-type(2): rest, hover, focus).
- **Control states:** `reference/components/03-button.jpg` (button button.text-black.px-4: rest, hover, focus).

## 02 · section

- **Box:** 1440×528 px, starting 69 px from the top. Background rgb(255, 255, 255), text rgb(38, 43, 50).
- **Layout:** flex row of 2, gap normal, space-between/center.
- **Type:** ui-sans-serif 400 16px/24px · ui-sans-serif 400 14px/20px · ui-sans-serif 700 48px/48px · ui-sans-serif 600 16px/24px (family weight size/line-height, most text first).
- **Inside:** 1 heading, 2 paragraphs, 2 buttons, 1 picture.
- **Look:** `reference/sections/02-section.jpg` and its anatomy `reference/sections/02-section.anatomy.jpg`.
- **Markup:** `reference/sections/02-section.html`.
- **Motion:**
  - script `element.animate` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.flex.flex-col-reverse:nth-of-type(1) > div.space-y-4:nth-of-type(1)`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
  - script writes `transform` on `main.scroll-smooth > section.flex.flex-col-reverse:nth-of-type(1) > div.space-y-4:nth-of-type(1) > div.flex.gap-4 > button.text-black.px-6:nth-of-type(1)` 104 times over 9560 ms (on load): from `none` to `translateY(-1.18795px)`
  - script writes `transform` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.flex.flex-col-reverse:nth-of-type(1) > div:nth-of-type(2)` 104 times over 9560 ms (on load): from `none` to `translateX(90.4795px)`
- **Film:** `reference/motion/films/01-scripted-section.jpg` (Scripted section: 2 moving parts (transform); it is `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.flex.flex-col-reverse:nth-of-type(1)` in the markup; frames captioned with ms).
- **Control states:** `reference/components/04-button.jpg` (button button.text-black.px-6:nth-of-type(1): rest, hover, focus).

## 03 · features

- **Box:** 1440×536 px, starting 597 px from the top. Background rgb(255, 255, 255), text rgb(38, 43, 50).
- **Layout:** flex row of 12, gap 24px, normal/normal.
- **Type:** ui-sans-serif 400 14px/20px · ui-sans-serif 600 18px/28px · ui-sans-serif 400 18px/28px · ui-sans-serif 400 48px/48px · ui-sans-serif 700 36px/40px (family weight size/line-height, most text first).
- **Inside:** 13 headings, 13 paragraphs.
- **Look:** `reference/sections/03-features.jpg` and its anatomy `reference/sections/03-features.anatomy.jpg`.
- **Markup:** `reference/sections/03-features.html`.
- **Motion:**
  - script `element.animate` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section#features:nth-of-type(2) > div.max-w-7xl.mx-auto > h2.text-3xl.font-bold`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
  - script `element.animate` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section#features:nth-of-type(2) > div.max-w-7xl.mx-auto > p.mb-12.text-lg`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
  - script `element.animate` on `section#features:nth-of-type(2) > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(1)`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
  - script `element.animate` on `section#features:nth-of-type(2) > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(2)`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
  - script `element.animate` on `section#features:nth-of-type(2) > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(3)`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
  - script writes `transform` on `main.scroll-smooth > section#features:nth-of-type(2) > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6` 104 times over 9560 ms (on load): from `none` to `translateX(-11.9612%)`
- **Film:** `reference/motion/films/02-scripted-features.jpg` (Scripted div: 1 moving part (transform); it is `main.scroll-smooth > section#features:nth-of-type(2) > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6` in the markup; frames captioned with ms).

## 04 · how-it-works

- **Box:** 1440×416 px, starting 1253 px from the top. Background rgb(247, 249, 251), text rgb(38, 43, 50).
- **Layout:** grid, 3 columns (266.656px 266.672px 266.656px), gap 48px.
- **Type:** ui-sans-serif 400 14px/20px · ui-sans-serif 400 18px/28px · ui-sans-serif 600 20px/28px · ui-sans-serif 700 36px/40px · ui-sans-serif 400 24px/32px (family weight size/line-height, most text first).
- **Inside:** 4 headings, 4 paragraphs.
- **Look:** `reference/sections/04-how-it-works.jpg` and its anatomy `reference/sections/04-how-it-works.anatomy.jpg`.
- **Markup:** `reference/sections/04-how-it-works.html`.

## 05 · demo

- **Box:** 1440×930 px, starting 1789 px from the top. Background rgb(255, 255, 255), text rgb(38, 43, 50).
- **Layout:** stacked blocks.
- **Type:** ui-sans-serif 400 16px/24px · ui-sans-serif 700 30px/36px · ui-sans-serif 600 30px/36px (family weight size/line-height, most text first).
- **Inside:** 1 heading, 1 paragraph, 1 picture.
- **Look:** `reference/sections/05-demo.jpg` and its anatomy `reference/sections/05-demo.anatomy.jpg`.
- **Markup:** `reference/sections/05-demo.html`.
- **Motion:**
  - script `element.animate` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section#demo:nth-of-type(4) > div > h2.text-2xl.font-bold`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
  - script `element.animate` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section#demo:nth-of-type(4) > div > p.mb-8.text-gray-600`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
  - script `element.animate` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section#demo:nth-of-type(4) > div > div.max-w-5xl.mx-auto`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
- **Film:** `reference/motion/films/05-player-demo.jpg` (Player: video; it is `section#demo:nth-of-type(4) > div > div.max-w-5xl.mx-auto > div.relative.w-full:nth-of-type(2) > video.absolute.inset-0` in the markup; frames captioned with ms).

## 06 · testimonials

- **Box:** 1440×396 px, starting 2719 px from the top. Background rgb(247, 249, 251), text rgb(38, 43, 50).
- **Layout:** flex row of 10, gap 24px, normal/normal.
- **Type:** ui-sans-serif 400 14px/20px · ui-sans-serif 700 16px/24px · ui-sans-serif 400 12px/16px · ui-sans-serif 700 24px/32px (family weight size/line-height, most text first).
- **Inside:** 11 headings, 10 paragraphs, 10 pictures.
- **Look:** `reference/sections/06-testimonials.jpg` and its anatomy `reference/sections/06-testimonials.anatomy.jpg`.
- **Markup:** `reference/sections/06-testimonials.html`.
- **Motion:**
  - script writes `transform` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section#testimonials:nth-of-type(5) > div.overflow-hidden:nth-of-type(2) > div.flex.gap-6` 104 times over 9560 ms (on load): from `none` to `translateX(-19.138%)`
- **Film:** `reference/motion/films/03-scripted-testimonials.jpg` (Scripted div: 1 moving part (transform); it is `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section#testimonials:nth-of-type(5) > div.overflow-hidden:nth-of-type(2) > div.flex.gap-6` in the markup; frames captioned with ms).
- **Control states:** `reference/components/05-card.jpg` (card div.bg-white.p-6:nth-of-type(1): rest, hover, focus).
- **Control states:** `reference/components/06-card.jpg` (card div.bg-white.p-6:nth-of-type(2): rest, hover, focus).

## 07 · section

- **Box:** 1440×332 px, starting 3115 px from the top. Background rgb(255, 211, 0), text rgb(38, 43, 50).
- **Layout:** stacked blocks.
- **Type:** ui-sans-serif 400 20px/28px · ui-sans-serif 700 48px/48px · ui-sans-serif 600 16px/24px (family weight size/line-height, most text first).
- **Inside:** 1 heading, 1 paragraph, 1 button.
- **Look:** `reference/sections/07-section.jpg` and its anatomy `reference/sections/07-section.anatomy.jpg`.
- **Markup:** `reference/sections/07-section.html`.
- **Motion:**
  - script `element.animate` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.w-full.py-20:nth-of-type(6) > h1.text-3xl.font-bold`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
  - script `element.animate` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.w-full.py-20:nth-of-type(6) > p.text-lg.mb-8`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)

## 08 · footer

- **Box:** 1440×300 px, starting 3447 px from the top. Background rgb(9, 12, 17), text rgb(255, 255, 255).
- **Layout:** grid, 3 columns (405.328px 405.328px 405.344px), gap 32px.
- **Type:** ui-sans-serif 400 14px/20px · ui-sans-serif 400 12px/16px · ui-sans-serif 700 16px/24px · ui-sans-serif 700 18px/28px (family weight size/line-height, most text first).
- **Inside:** 3 headings, 3 paragraphs, 9 links, 2 pictures, 3 drawings.
- **Look:** `reference/sections/08-footer.jpg` and its anatomy `reference/sections/08-footer.anatomy.jpg`.
- **Markup:** `reference/sections/08-footer.html`.
- **Drawings:** `reference/assets/svg/001-icon-footer.svg` (icon, 20×20), `reference/assets/svg/002-icon-footer.svg` (icon, 20×20), `reference/assets/svg/003-icon-footer.svg` (icon, 20×20).
- **Pictures:** `reference/assets/images/007-frame.png` (32×32).
- **Motion:**
  - script `element.animate` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > footer.px-6.py-10 > div.grid.grid-cols-1 > div:nth-of-type(1)`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
  - script `element.animate` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > footer.px-6.py-10 > div.grid.grid-cols-1 > div:nth-of-type(2)`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
  - script `element.animate` on `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > footer.px-6.py-10 > div.grid.grid-cols-1 > div:nth-of-type(3)`: 600 ms ease-out, 2 keyframes (opacity, computedOffset)
- **Hover:** `.hover\:text-\[\#FFD300\]:hover` changes color; `.hover\:opacity-80:hover` changes opacity.
