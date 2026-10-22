# How it moves, step by step

Every animation and behaviour found on the page, as recipes: what starts it, which element, which property from what to what, for how long, on which curve, in what order. Times are from the moment the trigger happens. Build them one at a time and check each against its film (frames captioned with their time, or with the scroll position).

Measured at 1440 px on shop-ally-ai.vercel.app. Values in `code` are exactly as the browser reported them.

## When the page scrolls

### 1. Classes and attributes the scroll switches

- `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > header.flex.justify-between > nav.hidden.gap-6 > a.transition-colors.cursor-pointer:nth-of-type(1)` classes `+text-[#FFD300] -text-gray-700 -hover:text-[#FFD300]`, 11 ms after the scroll.
- `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.flex.flex-col-reverse:nth-of-type(1) > div.space-y-4:nth-of-type(1)` `opacity` `1` → `0`, 419 ms after the scroll.
- **In the code:** `reference/scripts/13-page-c9e3d94a4979fe55.js` at character 6991 (`transition-colors`: `&t.scrollIntoView({behavior:"smooth"})},className:"transition-colors cursor-pointer ".concat(n?"text-[#FFD300]":"text-gr`).

### 2. `div.min-h-screen > main.scroll-smooth > section.flex.flex-col-reverse > div.space-y-4` follows the scroll

- **What:** it changes `transform` as the page scrolls.
- `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.flex.flex-col-reverse:nth-of-type(1) > div.space-y-4:nth-of-type(1)` `transform`: `none` → `translateY(24px)` over 3 frames, at rest 419 ms after the scroll.
- **How:** derive the values above from the scroll position each frame (a scroll listener or requestAnimationFrame).
- **In the code:** `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`); `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 719 (`flex`: `text-center",children:[(0,l.jsx)("div",{className:"flex justify-center mb-8",children:(0,l.jsx)("div",{className:"w-24 h`).

## Moving scenes (filmed)

### 3. Scripted section: 2 moving parts (transform)

- **Film:** `reference/motion/films/01-scripted-section.jpg` (captions are ms).
- **Element:** `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.flex.flex-col-reverse:nth-of-type(1)` in section `02-section`.
- `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.flex.flex-col-reverse:nth-of-type(1) > div:nth-of-type(2)` `transform` starts 3485 ms after load, 104 changes over 9560 ms (load): `none` → `translateX(90.4795px)`. All samples are in `motion.json` `recorded`.
- `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section#testimonials:nth-of-type(5) > div.overflow-hidden:nth-of-type(2) > div.flex.gap-6` `transform` starts 3485 ms after load, 104 changes over 9560 ms (load): `none` → `translateX(-19.138%)`. All samples are in `motion.json` `recorded`.
- `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > header.flex.justify-between > button.text-black.px-4` `transform` starts 3491 ms after load, 103 changes over 9554 ms (load): `translateY(-0.264773px)` → `translateY(-1.18795px)`. All samples are in `motion.json` `recorded`.
- **In the code:** `reference/scripts/13-page-c9e3d94a4979fe55.js` at character 21772 (`scroll-smooth`: `,"loading"===t)?null:(0,r.jsxs)("main",{className:"scroll-smooth",children:[(0,r.jsx)(m,{}),(0,r.jsx)(x,{}),(0,r.jsx)(b,`); `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`).

### 4. Scripted div: 1 moving part (transform)

- **Film:** `reference/motion/films/02-scripted-features.jpg` (captions are ms).
- **Element:** `main.scroll-smooth > section#features:nth-of-type(2) > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6` in section `03-features`.
- `main.scroll-smooth > section#features:nth-of-type(2) > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6` `transform` starts 3485 ms after load, 104 changes over 9560 ms (load): `none` → `translateX(-11.9612%)`. All samples are in `motion.json` `recorded`.
- **In the code:** `reference/scripts/13-page-c9e3d94a4979fe55.js` at character 10748 (`overflow-hidden`: `hiopian consumers.")}),(0,r.jsx)("div",{className:"overflow-hidden",children:(0,r.jsx)(l.P.div,{className:"flex gap-6",a`); `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`).

### 5. Scripted div: 1 moving part (transform)

- **Film:** `reference/motion/films/03-scripted-testimonials.jpg` (captions are ms).
- **Element:** `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section#testimonials:nth-of-type(5) > div.overflow-hidden:nth-of-type(2) > div.flex.gap-6` in section `06-testimonials`.
- `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section#testimonials:nth-of-type(5) > div.overflow-hidden:nth-of-type(2) > div.flex.gap-6` `transform` starts 3485 ms after load, 104 changes over 9560 ms (load): `none` → `translateX(-19.138%)`. All samples are in `motion.json` `recorded`.
- **In the code:** `reference/scripts/13-page-c9e3d94a4979fe55.js` at character 10748 (`overflow-hidden`: `hiopian consumers.")}),(0,r.jsx)("div",{className:"overflow-hidden",children:(0,r.jsx)(l.P.div,{className:"flex gap-6",a`); `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`).

### 6. Player: video

- **Film:** `reference/motion/films/05-player-demo.jpg` (captions are ms).
- **Element:** `section#demo:nth-of-type(4) > div > div.max-w-5xl.mx-auto > div.relative.w-full:nth-of-type(2) > video.absolute.inset-0` in section `05-demo`.
- **In the code:** `reference/scripts/13-page-c9e3d94a4979fe55.js` at character 14615 (`relative`: `opAlly Demo Video")}),(0,r.jsxs)("div",{className:"relative w-full aspect-video rounded-lg overflow-hidden",children:[!d`); `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 1746 (`w-full`: `0,l.jsx)("button",{onClick:()=>e.back(),className:"w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 p`); `reference/scripts/13-page-c9e3d94a4979fe55.js` at character 20769 (`w-full`: `seRouter)();return(0,r.jsxs)("section",{className:"w-full py-20 px-4 flex flex-col items-center text-center ".concat("bg`).

### 7. The header `header.flex` as you scroll

- **Behaviour:** it stays in place while you scroll.
- **In the code:** `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`); `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 719 (`flex`: `text-center",children:[(0,l.jsx)("div",{className:"flex justify-center mb-8",children:(0,l.jsx)("div",{className:"w-24 h`).

## Hovering (what scripts do; CSS hover rules are in styles.css)

### 8. Hovering `button.border.border-[#262b32]`

- 221 ms: `main.scroll-smooth > section.flex.flex-col-reverse:nth-of-type(1) > div.space-y-4:nth-of-type(1) > div.flex.gap-4 > button.border.px-6:nth-of-type(2)` `transform` `(unset)` → `scale(1.05)` (3 steps)
- 16551 ms: `div.min-h-screen > main.scroll-smooth > header.flex.justify-between > button.text-black.px-4` CSS transition on `transform`, 150 ms, `cubic-bezier(0.4, 0, 0.2, 1)` (transform: translateY(2.27728px) → translateY(3.31351px))
- **Film:** `reference/motion/hovers/01-button-border-border-262.jpg`.
- **In the code:** `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`); `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 719 (`flex`: `text-center",children:[(0,l.jsx)("div",{className:"flex justify-center mb-8",children:(0,l.jsx)("div",{className:"w-24 h`).

### 9. Hovering `div.min-w-[280px].md:min-w-[300px]`

- 81 ms: `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.flex.flex-col-reverse:nth-of-type(1) > div.space-y-4:nth-of-type(1)` `transform` `translateY(19.7408px)` → `translateY(24.753px)` (11 steps)
- 178 ms: `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.flex.flex-col-reverse:nth-of-type(1) > div.space-y-4:nth-of-type(1)` `opacity` `1` → `0.094797` (5 steps)
- 19612 ms: `div.min-h-screen > main.scroll-smooth > header.flex.justify-between > button.text-black.px-4` CSS transition on `transform`, 150 ms, `cubic-bezier(0.4, 0, 0.2, 1)` (transform: translateY(1.8867px) → translateY(3.15048px))
- **Film:** `reference/motion/hovers/02-div-min-w-280px-md-min-w.jpg`.
- **In the code:** `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`); `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 719 (`flex`: `text-center",children:[(0,l.jsx)("div",{className:"flex justify-center mb-8",children:(0,l.jsx)("div",{className:"w-24 h`).

### 10. Hovering `div.flex.flex-col`

- 55 ms: `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.flex.flex-col-reverse:nth-of-type(1) > div.space-y-4:nth-of-type(1)` `transform` `translateY(24.6394px)` → `translateY(24px)` (8 steps)
- 55 ms: `section#features > div.max-w-7xl.mx-auto > h2.text-3xl.font-bold` `transform` `translateY(24.0351px)` → `translateY(24px)` (3 steps)
- 55 ms: `section#features > div.max-w-7xl.mx-auto > p.mb-12.text-lg` `transform` `translateY(24.0351px)` → `translateY(24px)` (3 steps)
- 55 ms: `section#features > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(1)` `transform` `translateY(24.0351px)` → `translateY(24px)` (3 steps)
- 55 ms: `section#features > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(2)` `transform` `translateY(24.0351px)` → `translateY(24px)` (3 steps)
- 55 ms: `section#features > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(3)` `transform` `translateY(24.0351px)` → `translateY(24px)` (3 steps)
- 22186 ms: `section#demo > div > h2.text-2xl.font-bold` script animation (element.animate) on `opacity`, 600 ms, `ease-out` (opacity: 0 → 1)
- 22186 ms: `section#demo > div > p.mb-8.text-gray-600` script animation (element.animate) on `opacity`, 600 ms, `ease-out` (opacity: 0 → 1)
- 22186 ms: `section#demo > div > div.max-w-5xl.mx-auto` script animation (element.animate) on `opacity`, 600 ms, `ease-out` (opacity: 0 → 1)
- 22598 ms: `div.min-h-screen > main.scroll-smooth > header.flex.justify-between > button.text-black.px-4` CSS transition on `transform`, 150 ms, `cubic-bezier(0.4, 0, 0.2, 1)` (transform: translateY(2.5117px) → translateY(3.7625px))
- **Film:** `reference/motion/hovers/03-div-flex-flex-col.jpg`.
- **In the code:** `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`); `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 719 (`flex`: `text-center",children:[(0,l.jsx)("div",{className:"flex justify-center mb-8",children:(0,l.jsx)("div",{className:"w-24 h`).

### 11. Hovering `div.w-16.h-16`

- 38 ms: `section#features > div.max-w-7xl.mx-auto > h2.text-3xl.font-bold` `transform` `translateY(12.6413px)` → `none` (7 steps)
- 38 ms: `section#features > div.max-w-7xl.mx-auto > p.mb-12.text-lg` `transform` `translateY(18.1673px)` → `none` (9 steps)
- 38 ms: `section#features > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(1)` `transform` `translateY(24px)` → `none` (11 steps)
- 108 ms: `section#features > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(2)` `transform` `translateY(24px)` → `none` (11 steps)
- 206 ms: `section#features > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(3)` `transform` `translateY(24px)` → `none` (11 steps)
- 338 ms: `section#features > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(4)` `transform` `translateY(24px)` → `none` (10 steps)
- 25097 ms: `section#features > div.max-w-7xl.mx-auto > h2.text-3xl.font-bold` script animation (element.animate) on `opacity`, 600 ms, `ease-out` (opacity: 0 → 1)
- 25197 ms: `section#features > div.max-w-7xl.mx-auto > p.mb-12.text-lg` script animation (element.animate) on `opacity`, 600 ms after 100 ms, `ease-out` (opacity: 0 → 1)
- 9 × 25297 ms: `div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8` script animation (element.animate) on `opacity`, 600 ms after 200 ms, `ease-out` (opacity: 0 → 1), each starting 100 ms after the one before
- 25508 ms: `div.min-h-screen > main.scroll-smooth > header.flex.justify-between > button.text-black.px-4` CSS transition on `transform`, 150 ms, `cubic-bezier(0.4, 0, 0.2, 1)` (transform: translateY(1.40231px) → translateY(2.59116px))
- **In the code:** `reference/scripts/13-page-c9e3d94a4979fe55.js` at character 10397 (`max-w-7xl`: `,initial:"hidden",whileInView:"visible",className:"max-w-7xl mx-auto text-center",children:[(0,r.jsx)(l.P.h2,{variants:p`); `reference/scripts/13-page-c9e3d94a4979fe55.js` at character 7957 (`text-3xl`: `2 space-y-4",children:[(0,r.jsxs)("h1",{className:"text-3xl md:text-5xl font-bold",children:[t("Shop Smarter in Ethiopia`); `reference/scripts/13-page-c9e3d94a4979fe55.js` at character 13089 (`font-bold`: `.jsxs)("div",{children:[(0,r.jsx)("h4",{className:"font-bold",children:e.name}),(0,r.jsx)("span",{className:"text-xs",ch`).

### 12. Hovering `section.w-full.py-20`

- 20 ms: `section#demo > div > h2.text-2xl.font-bold` `transform` `translateY(23.2353px)` → `translateY(24px)`
- 20 ms: `section#demo > div > p.mb-8.text-gray-600` `transform` `translateY(23.2353px)` → `translateY(24px)`
- 20 ms: `section#demo > div > div.max-w-5xl.mx-auto` `transform` `translateY(23.2353px)` → `translateY(24px)`
- 20 ms: `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > footer.px-6.py-10 > div.grid.grid-cols-1 > div:nth-of-type(1)` `transform` `translateY(17.1145px)` → `none` (6 steps)
- 20 ms: `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > footer.px-6.py-10 > div.grid.grid-cols-1 > div:nth-of-type(2)` `transform` `translateY(17.1145px)` → `none` (6 steps)
- 20 ms: `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > footer.px-6.py-10 > div.grid.grid-cols-1 > div:nth-of-type(3)` `transform` `translateY(17.1145px)` → `none` (6 steps)
- 28800 ms: `main.scroll-smooth > footer.px-6.py-10 > div.grid.grid-cols-1 > div` script animation (element.animate) on `opacity`, 600 ms, `ease-out` (opacity: 0 → 1)
- 29281 ms: `div.min-h-screen > main.scroll-smooth > header.flex.justify-between > button.text-black.px-4` CSS transition on `transform`, 150 ms, `cubic-bezier(0.4, 0, 0.2, 1)` (transform: translateY(-2.02138px) → translateY(-3.23704px))
- **In the code:** `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 1359 (`text-2xl`: ` mb-4",children:"404"}),(0,l.jsx)("h2",{className:"text-2xl font-semibold text-gray-800 mb-4",children:"Page Not Found"}`); `reference/scripts/13-page-c9e3d94a4979fe55.js` at character 12478 (`text-2xl`: `t-center mb-8",children:(0,r.jsx)("h2",{className:"text-2xl font-bold",children:t("What Our Users Say")})}),(0,r.jsx)("d`); `reference/scripts/13-page-c9e3d94a4979fe55.js` at character 13089 (`font-bold`: `.jsxs)("div",{children:[(0,r.jsx)("h4",{className:"font-bold",children:e.name}),(0,r.jsx)("span",{className:"text-xs",ch`).

### 13. Hovering `button.bg-[#262b32].text-white`

- 141 ms: `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.w-full.py-20:nth-of-type(6) > button.text-white.px-6` `transform` `(unset)` → `scale(1.05)` (3 steps)
- 30421 ms: `div.min-h-screen > main.scroll-smooth > header.flex.justify-between > button.text-black.px-4` CSS transition on `transform`, 150 ms, `cubic-bezier(0.4, 0, 0.2, 1)` (transform: translateY(1.99035px) → translateY(0.928993px))
- 30421 ms: `div.min-h-screen > main.scroll-smooth > section.w-full.py-20 > button.text-white.px-6` CSS transition on `transform`, 150 ms, `cubic-bezier(0.4, 0, 0.2, 1)` (transform: scale(1) → scale(1.02442))
- **In the code:** `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 1746 (`w-full`: `0,l.jsx)("button",{onClick:()=>e.back(),className:"w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 p`); `reference/scripts/13-page-c9e3d94a4979fe55.js` at character 20769 (`w-full`: `seRouter)();return(0,r.jsxs)("section",{className:"w-full py-20 px-4 flex flex-col items-center text-center ".concat("bg`); `reference/scripts/13-page-c9e3d94a4979fe55.js` at character 12251 (`py-20`: `(0,r.jsxs)("section",{id:"testimonials",className:"py-20 px-6 ".concat(e?"bg-[var(--color-bg-primary)] text-[var(--color`).

## Following the pointer

### 14. `section#features > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(7)` answers to the pointer

- `transform` `translateY(12.3756px)` → `none` over 6 frames, easing 0.449 a frame.
- **In the code:** `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`); `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 719 (`flex`: `text-center",children:[(0,l.jsx)("div",{className:"flex justify-center mb-8",children:(0,l.jsx)("div",{className:"w-24 h`).

### 15. `section#features > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(6)` answers to the pointer

- `transform` `translateY(7.66695px)` → `none` over 5 frames.
- **In the code:** `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`); `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 719 (`flex`: `text-center",children:[(0,l.jsx)("div",{className:"flex justify-center mb-8",children:(0,l.jsx)("div",{className:"w-24 h`).

### 16. `div.min-h-screen:nth-of-type(2) > main.scroll-smooth > section.flex.flex-col-reverse:nth-of-type(1) > div.space-y-4:nth-of-type(1)` answers to the pointer

- `transform` `translateY(5.42348px)` → `none` over 4 frames.
- **In the code:** `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`); `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 719 (`flex`: `text-center",children:[(0,l.jsx)("div",{className:"flex justify-center mb-8",children:(0,l.jsx)("div",{className:"w-24 h`).

### 17. `section#features > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(5)` answers to the pointer

- `transform` `translateY(3.83232px)` → `none` over 3 frames.
- **In the code:** `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`); `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 719 (`flex`: `text-center",children:[(0,l.jsx)("div",{className:"flex justify-center mb-8",children:(0,l.jsx)("div",{className:"w-24 h`).

### 18. `section#features > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(4)` answers to the pointer

- `transform` `translateY(1.12438px)` → `none` over 2 frames.
- **In the code:** `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`); `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 719 (`flex`: `text-center",children:[(0,l.jsx)("div",{className:"flex justify-center mb-8",children:(0,l.jsx)("div",{className:"w-24 h`).

### 19. `section#features > div.max-w-7xl.mx-auto > div.overflow-hidden > div.flex.gap-6 > div.bg-white.p-8:nth-of-type(3)` answers to the pointer

- `opacity` `0.00254501` → `1` over 1 frames.
- **In the code:** `reference/scripts/02-255-01c481785f268126.js` at character 96148 (`flex`: `Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"cent`); `reference/scripts/07-357-06be6d0ed9159344.js` at character 6923 (`flex`: `r-primary)"},children:(0,t.jsxs)("div",{className:"flex items-center justify-center lg:justify-start gap-2",children:[(0`); `reference/scripts/10-not-found-0fba0ee6209fbe3f.js` at character 719 (`flex`: `text-center",children:[(0,l.jsx)("div",{className:"flex justify-center mb-8",children:(0,l.jsx)("div",{className:"w-24 h`).

## The page's own code

The scripts the page ran are in `reference/scripts/` (20 files), so you can read exactly how each effect is made. Don't paste them in whole: rebuild each effect in the project's own code, following the recipe and the source together.
