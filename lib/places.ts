import placesData from './places.json';

// Convert name to URL-safe ID
export function placeNameToId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

// Sort longest-first for greedy matching ("Baal Peor" before "Baal")
const PLACES: string[] = [...placesData].sort((a, b) => b.length - a.length);

// Build name-to-id lookup (case-insensitive)
const NAME_TO_ID: Map<string, string> = new Map(
  placesData.map(name => [name.toLowerCase(), placeNameToId(name)])
);

// Build regex: whole-word, case-insensitive
// Pattern: \b(Baal Peor|Valley of Jezreel|Gilgal|...)\b
const PLACES_REGEX = new RegExp(
  `\\b(${PLACES.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
  'gi'
);

export interface TextSegment {
  text: string;
  isPlace: boolean;
  placeId?: string;
}

export function tokenizePlaces(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let lastIndex = 0;
  let match;

  PLACES_REGEX.lastIndex = 0;
  while ((match = PLACES_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), isPlace: false });
    }
    const placeId = NAME_TO_ID.get(match[0].toLowerCase());
    segments.push({ text: match[0], isPlace: true, placeId });
    lastIndex = PLACES_REGEX.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), isPlace: false });
  }

  return segments.length > 0 ? segments : [{ text, isPlace: false }];
}

export interface Place {
  id: string;
  name: string;
}

export function getAllPlacesSimple(): Place[] {
  return [...placesData]
    .sort((a, b) => a.localeCompare(b))
    .map(name => ({ id: placeNameToId(name), name }));
}

export function getPlaceById(id: string): Place | undefined {
  const place = placesData.find(name => placeNameToId(name) === id);
  return place ? { id, name: place } : undefined;
}
