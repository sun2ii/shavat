// Book themes - used in library display
export const BOOK_THEMES: Record<string, string> = {
  // Torah (Pentateuch)
  'genesis': 'Beginnings',
  'exodus': 'Redemption and Covenant',
  'leviticus': 'Holiness and Worship',
  'numbers': 'Wilderness Wandering',
  'deuteronomy': 'Remember and Obey',

  // Old Testament - Historical Books
  'joshua': 'Conquering the Promised Land',
  'judges': 'The Cycle of Sin and Deliverance',
  'ruth': 'Redemption and Loyal Love',
  '1-samuel': 'From Judges to Kings',
  '2-samuel': 'The Reign of David',
  '1-kings': 'The Kingdom Divides',
  '2-kings': 'The Kingdom Falls',
  '1-chronicles': 'David\'s Dynasty and Temple Worship',
  '2-chronicles': 'The Temple and the Kings of Judah',
  'ezra': 'Rebuilding the Temple and Renewing the Covenant',
  'nehemiah': 'Rebuilding the Walls and the Community',
  'esther': 'God\'s Hidden Providence',

  // Old Testament - Wisdom & Poetry
  'job': 'The Problem of Suffering',
  'psalms': 'Prayers and Praises of Israel',
  'proverbs': 'The Way of Wisdom',
  'ecclesiastes': 'The Vanity of Life Apart from God',
  'song-of-solomon': 'The Beauty of Covenant Love',

  // Old Testament - Major Prophets
  'isaiah': 'Salvation Through the Suffering Servant',
  'jeremiah': 'The Weeping Prophet and the New Covenant',
  'lamentations': 'Mourning Jerusalem\'s Fall',
  'ezekiel': 'The Glory Departs and Returns',
  'daniel': 'Faithfulness in Exile and God\'s Kingdom',

  // Old Testament - Minor Prophets
  'hosea': 'God\'s Faithful Love for Unfaithful Israel',
  'joel': 'The Day of the Lord',
  'amos': 'Justice and Judgment',
  'obadiah': 'Judgment on Edom',
  'jonah': 'God\'s Mercy to the Nations',
  'micah': 'What Does the Lord Require?',
  'nahum': 'The Fall of Nineveh',
  'habakkuk': 'The Just Shall Live by Faith',
  'zephaniah': 'The Day of the Lord\'s Wrath',
  'haggai': 'Rebuild the Temple',
  'zechariah': 'Visions of Restoration and the Coming King',
  'malachi': 'Return to Me',

  // New Testament - Gospels
  'matthew': 'The King and His Kingdom',
  'mark': 'The Suffering Servant',
  'luke': 'The Savior of All People',
  'john': 'The Word Became Flesh',

  // New Testament - Acts & Epistles
  'acts': 'The Gospel Spreads to the Ends of the Earth',
  'romans': 'The Righteousness of God Revealed',
  '1-corinthians': 'Christ Crucified: Wisdom and Unity',
  '2-corinthians': 'Authentic Apostolic Ministry',
  'galatians': 'The Argument of Law vs Faith',
  'ephesians': 'Unity in Christ',
  'philippians': 'Joy in Christ Despite All Circumstances',
  'colossians': 'The Supremacy and Sufficiency of Christ',
  '1-thessalonians': 'Living to Please God While Awaiting Christ',
  '2-thessalonians': 'Endurance Until the Day of the Lord',
  '1-timothy': 'Sound Doctrine and Faithful Leadership',
  '2-timothy': 'Guard the Gospel and Preach the Word',
  'titus': 'Grace That Teaches Good Works',
  'philemon': 'Reconciliation Through Christ',
  'hebrews': 'The Supremacy of Christ Over All',
  'james': 'Faith That Works',
  '1-peter': 'Hope in Suffering',
  '2-peter': 'Growing in Grace and Knowledge',
  '1-john': 'Walk in Light and Love',
  '2-john': 'Walk in Truth and Love',
  '3-john': 'Walk in Truth and Love',
  'jude': 'Contend for the Faith',
  'revelation': 'The Lamb Reigns and Makes All Things New',
};

export function getBookTheme(bookSlug: string): string | undefined {
  return BOOK_THEMES[bookSlug];
}
