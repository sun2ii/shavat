/*
  The copied state, expressed as a neon halo on the heading that was pressed.
  Both layers use currentColor, so the glow inherits whatever color the copied
  state sets. The tight layer reads as the filament, the wide one as the bloom.
*/
export const COPY_GLOW = '[text-shadow:0_0_7px_currentColor,0_0_20px_currentColor]';

/*
  Resting counterpart. Not `none` — CSS cannot interpolate a shadow list from
  `none`, and mismatched layer counts interpolate inconsistently, so the glow
  would pop instead of fade. Same two layers, same radii, transparent.
*/
export const COPY_GLOW_OFF = '[text-shadow:0_0_7px_transparent,0_0_20px_transparent]';

/** Color and shadow move together; every copy target animates the same way. */
export const COPY_TRANSITION =
  '[transition:color_250ms_ease,text-shadow_700ms_ease-in-out]';

/** How long a heading stays lit after a successful copy. */
export const COPY_FLASH_MS = 1600;
