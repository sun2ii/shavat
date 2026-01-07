/**
 * Maps directional movement to arrow symbols
 */
export function getDirectionArrow(direction: string): string {
  switch (direction) {
    case 'downward':
      return '↓';
    case 'mixed':
      return '↕';
    case 'upward':
      return '↑';
    default:
      return '';
  }
}

/**
 * Gets visual color hint for emotional state (subtle, respects design system)
 */
export function getEmotionalStateColor(state: string): string {
  // Negative states
  if (['grief', 'despair', 'anger', 'guilt'].includes(state)) {
    return 'text-red-400/70';
  }
  // Exhaustion/confusion
  if (['exhaustion', 'confusion', 'fear', 'anxiety'].includes(state)) {
    return 'text-yellow-400/70';
  }
  // Positive states
  if (['praise', 'joy', 'gratitude', 'trust'].includes(state)) {
    return 'text-green-400/70';
  }
  // Neutral/wisdom
  return 'text-[rgb(var(--text-secondary))]';
}
