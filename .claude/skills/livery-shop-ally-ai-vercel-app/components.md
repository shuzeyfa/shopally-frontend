# Components

## Recipes

### Card

#ffffff background, #262b32 text, 8px corners, 24px × 24px padding, 16px at weight 400, shadow rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px. Measured 10 on the page.

- States: No visible change was measured on hover or focus.
- Use when: Grouping related content into a scannable block.

### Navigation link

Transparent background, #364153 text, square corners, 0px × 0px padding, 14px at weight 500. Measured 4 on the page.

- States: Hover: text → #ffd300, border → #ffd300
- Use when: Top-level navigation.

### Primary button

#ffd300 background, #000000 text, 4px corners, 8px × 16px padding, 14px at weight 600, shadow rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px. Measured 1 on the page.

- States: No visible change was measured on hover or focus.
- Use when: The single most important action in a view.

### Primary button

#ffd300 background, #000000 text, 4px corners, 12px × 24px padding, 16px at weight 600, shadow rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px. Measured 1 on the page.

- States: No visible change was measured on hover or focus.
- Use when: The single most important action in a view.

### Outline button

Transparent background, #262b32 text, 4px corners, 12px × 24px padding, 16px at weight 600, 1px solid #262b32 border. Measured 1 on the page.

- States: Hover: transform → matrix(1.00001, 0, 0, 1.00001, 0, 0). Focus: outline → 1px auto rgb(16, 16, 16), transform → matrix(1.04005, 0, 0, 1.04005, 0, 0)
- Use when: Secondary actions that sit beside the primary one.

## Measured variants

| Kind | Count | Background | Text | Border | Radius | Padding (y/x px) | Height px | Font | States |
|---|---|---|---|---|---|---|---|---|---|
| card | 10 | #ffffff | #262b32 | none | 8px | 24/24 | 172 | 16px 400 | no change measured |
| nav-link | 4 | transparent | #364153 | none | 0px | 0/0 | 20 | 14px 500 | hover: {"color":"#ffd300","borderColor":"#ffd300"} |
| button | 1 | #ffd300 | #000000 | none | 4px | 8/16 | 36 | 14px 600 | no change measured |
| button | 1 | #ffd300 | #000000 | none | 4px | 12/24 | 50 | 16px 600 | no change measured |
| button | 1 | transparent | #262b32 | 1px solid #262b32 | 4px | 12/24 | 50 | 16px 600 | hover: {"transform":"matrix(1.00001, 0, 0, 1.00001, 0, 0)"}; focus: {"outline":"1px auto rgb(16, 16, 16)","transform":"matrix(1.04005, 0, 0, 1.04005, 0, 0)"} |
