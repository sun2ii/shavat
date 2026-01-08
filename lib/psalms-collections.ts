import { PsalmsCollection, PsalmsCollectionsMetadata } from './types';
import psalmsCollections from './psalms-collections.json';

const metadata = psalmsCollections as PsalmsCollectionsMetadata;

/**
 * Get all Psalms collections
 */
export function getAllCollections(): PsalmsCollection[] {
  return metadata.collections;
}

/**
 * Get a specific collection by its slug ID
 */
export function getCollectionById(id: string): PsalmsCollection | undefined {
  return metadata.collections.find(collection => collection.id === id);
}

/**
 * Get the collection that contains a specific psalm number
 */
export function getCollectionByPsalm(psalmNumber: number): PsalmsCollection | undefined {
  return metadata.collections.find(collection => collection.psalms.includes(psalmNumber));
}

/**
 * Get the position of a psalm within its collection (1-indexed)
 */
export function getPsalmPositionInCollection(psalmNumber: number): { position: number; total: number } | undefined {
  const collection = getCollectionByPsalm(psalmNumber);
  if (!collection) return undefined;
  const position = collection.psalms.indexOf(psalmNumber) + 1;
  return { position, total: collection.psalms.length };
}

/**
 * Get the first psalm in a collection
 */
export function getFirstPsalm(collectionId: string): number | undefined {
  const collection = getCollectionById(collectionId);
  return collection?.psalms[0];
}

/**
 * Get the last psalm in a collection
 */
export function getLastPsalm(collectionId: string): number | undefined {
  const collection = getCollectionById(collectionId);
  return collection?.psalms[collection.psalms.length - 1];
}

/**
 * Check if a psalm is the first in its collection
 */
export function isFirstPsalmInCollection(psalmNumber: number): boolean {
  const collection = getCollectionByPsalm(psalmNumber);
  return collection?.psalms[0] === psalmNumber;
}

/**
 * Check if a psalm is the last in its collection
 */
export function isLastPsalmInCollection(psalmNumber: number): boolean {
  const collection = getCollectionByPsalm(psalmNumber);
  return collection?.psalms[collection.psalms.length - 1] === psalmNumber;
}
