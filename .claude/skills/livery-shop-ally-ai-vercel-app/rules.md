# shop-ally-ai.vercel.app: design rules

A light interface on a near-white neutral background where an amber accent marks the next step. Type is ui-sans-serif, corners are 8px, and depth comes from soft neutral shadows.

## Principles

### One accent, used sparingly

Reserve the amber accent (#ffd300) for primary actions, links and active states.

_Why:_ It covers only 7% of the measured page, so wherever it appears it reads as the next step.

### Soft, neutral depth

Lift raised elements with the measured shadow (rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px).

_Why:_ Shadows appear on about 25% of elements; they mark what floats above the page and are never tinted.

### Big type, quiet body

Pair 48px headings with 14px body text in ui-sans-serif.

_Why:_ A 3.4× jump between headline and body creates strong hierarchy with few elements.

### A steady rhythm

Space everything on the 8px grid: 8, 16, 24, 32, 40, 48, 64, 80px.

_Why:_ 94% of measured spacing values fall on this grid, which is what makes the layout feel ordered.

### Consistent corners

Use 8px corners as the default radius.

_Why:_ It is the most common measured radius; one radius family is what makes separate components feel like one product.

## Never

- **Never tint shadows with colour.** Every measured shadow is neutral; a coloured glow would read as a different product.
- **Never introduce a second accent colour.** Only one saturated colour (#ffd300) carries weight in the measured palette.
- **Never animate longer than 150ms.** Every measured transition finishes within 150ms; slower motion would feel heavy here.
- **Never set button labels in all capitals.** No measured button uses uppercase text.
- **Never mix in a second display typeface.** Headings and body share ui-sans-serif; a second family would split the voice.
- **Never use spacing off the 8px grid.** 94% of measured spacing sits on it.

## Colour

- Light theme: near-white neutral background (#ffffff).
- Body text #262b32 on the background reads at 14.2:1; secondary text uses #6a7282.
- Accent #ffd300 (amber) with #262b32 text on top of it.
- A dark theme also exists: #090c11 background, #ffffff text; tokens.json lists both.

## Typography

- ui-sans-serif throughout.
- Scale: display 48px, h1 36px, h2 30px, h3 24px, h4 20px, h5 18px, h6 16px.
- Weights in use: 400, 600.

## Shape and depth

- Radii: 4px (16%), 6px (7%), 8px (53%), pill (23%).
- Borders: 1px in #262b32.
- Shadows: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px… | rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -….
