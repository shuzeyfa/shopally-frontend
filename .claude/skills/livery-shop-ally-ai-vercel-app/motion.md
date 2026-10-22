# Motion and Interactions

Snappy: transitions finish within 150ms.

- Default to 150ms transitions (100% of measured ones).
- Ease with cubic-bezier(0.4, 0, 0.2, 1).
- Animate color, background-color, border-color, outline-color; avoid animating layout.
- Respect prefers-reduced-motion.

## Interactions

- **Hover** changes background colour (62% of hover rules), text colour (17% of hover rules), border (7% of hover rules), position or scale (3% of hover rules), underline (3% of hover rules), opacity (3% of hover rules). Things rarely move on hover; they change colour.

## Measurements

- Durations: 150ms (100%)
- Easings: `cubic-bezier(0.4, 0, 0.2, 1)`
- Animated properties: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from

Always respect `prefers-reduced-motion: reduce`.
