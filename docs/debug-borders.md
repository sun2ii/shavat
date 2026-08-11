# Debug Borders

Visual markers to identify elements that need work.

## Colors

| Border | Element | Meaning |
|--------|---------|---------|
| Red (`2px solid red`) | SVGs (icons/logos) | Manually created, needs real icon |
| Purple (`2px solid purple`) | Links (`href="#"`, `/timeline`, etc.) | Goes nowhere, needs implementation |

## Usage

```tsx
const svgDebugStyle = { border: '2px solid red' };
const linkDebugStyle = { border: '2px solid purple' };

// Apply to SVGs
<svg style={svgDebugStyle}>...</svg>

// Apply to broken links
<a href="#" style={{ ...linkDebugStyle }}>...</a>
<Link href="/timeline" style={{ ...linkDebugStyle }}>...</Link>
```

## When to Remove

Remove debug style when:
- SVG: Replaced with real icon (Lucide, custom asset, etc.)
- Link: Points to working route or external URL
