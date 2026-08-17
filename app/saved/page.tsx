import SavedContent from './SavedContent';

// Saved — everything the reader made with their own hand: highlights (with
// their notes) and the reading-position bookmark, in one place. v1 reads the
// existing localStorage stores; account-backed sync is the known follow-up
// (see docs + project notes). Authored essays/writings deliberately live in
// the Read world, not here.
export default function SavedPage() {
  return <SavedContent />;
}
