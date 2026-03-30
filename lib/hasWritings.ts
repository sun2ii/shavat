export interface Writing {
  book: string;
  chapter: number;
  division: string;
  divisionIndex: number;
  title: string;
  path: string;
}

const WRITINGS: Writing[] = [
  { book: 'john', chapter: 1, division: 'prologue', divisionIndex: 1, title: 'The Love of God in John 1', path: '/writings/john/prologue' },
  { book: 'john', chapter: 2, division: 'discourses', divisionIndex: 1, title: 'Two Powerful Sides of Jesus', path: '/writings/john/discourses-1' },
  { book: 'john', chapter: 3, division: 'discourses', divisionIndex: 2, title: 'The Love of God: Holy, Saving, and Life-Giving', path: '/writings/john/discourses-2' },
  { book: 'john', chapter: 4, division: 'discourses', divisionIndex: 3, title: 'The Love of God Breaks Barriers', path: '/writings/john/discourses-3' },
  { book: 'john', chapter: 5, division: 'discourses', divisionIndex: 4, title: 'The Love of God Gives Life', path: '/writings/john/discourses-4' },
  { book: 'john', chapter: 6, division: 'discourses', divisionIndex: 5, title: 'The Love of God: Come and Be Satisfied', path: '/writings/john/discourses-5' },
  { book: 'john', chapter: 7, division: 'discourses', divisionIndex: 6, title: 'The Love of God Divides', path: '/writings/john/discourses-6' },
  { book: 'john', chapter: 8, division: 'discourses', divisionIndex: 7, title: 'The Love of God: Truth and Mercy Together', path: '/writings/john/discourses-7' },
  { book: 'john', chapter: 9, division: 'discourses', divisionIndex: 8, title: 'The Love of God Opens Eyes', path: '/writings/john/discourses-8' },
  { book: 'john', chapter: 10, division: 'discourses', divisionIndex: 9, title: 'The Love of God: The Good Shepherd', path: '/writings/john/discourses-9' },
  { book: 'john', chapter: 11, division: 'discourses', divisionIndex: 10, title: 'The Love of God: I Am the Resurrection', path: '/writings/john/discourses-10' },
  { book: 'john', chapter: 12, division: 'final-week', divisionIndex: 1, title: 'The Love of God: The Grain of Wheat Must Die', path: '/writings/john/final-week-1' },
  { book: 'john', chapter: 13, division: 'final-week', divisionIndex: 2, title: 'The Love of God: Love One Another', path: '/writings/john/final-week-2' },
  { book: 'john', chapter: 14, division: 'final-week', divisionIndex: 3, title: 'The Love of God: Peace I Leave With You', path: '/writings/john/final-week-3' },
  { book: 'john', chapter: 15, division: 'final-week', divisionIndex: 4, title: 'The Love of God: Abide in Me', path: '/writings/john/final-week-4' },
  { book: 'john', chapter: 16, division: 'final-week', divisionIndex: 5, title: 'The Love of God: I Have Overcome the World', path: '/writings/john/final-week-5' },
  { book: 'john', chapter: 17, division: 'final-week', divisionIndex: 6, title: 'The Love of God: The High Priestly Prayer', path: '/writings/john/final-week-6' },
  { book: 'john', chapter: 18, division: 'passion', divisionIndex: 1, title: 'The Love of God: The Cup the Father Gave Me', path: '/writings/john/passion-1' },
  { book: 'john', chapter: 19, division: 'passion', divisionIndex: 2, title: 'The Love of God: It Is Finished', path: '/writings/john/passion-2' },
  { book: 'john', chapter: 20, division: 'resurrection', divisionIndex: 1, title: 'The Love of God: I Have Seen the Lord', path: '/writings/john/resurrection-1' },
  { book: 'john', chapter: 21, division: 'resurrection', divisionIndex: 2, title: 'The Love of God: Do You Love Me?', path: '/writings/john/resurrection-2' },
  { book: 'hebrews', chapter: 1, division: 'christ-superior-to-all', divisionIndex: 1, title: 'The Supremacy of Christ: God Has Spoken', path: '/writings/hebrews/christ-superior-to-all-1' },
  { book: 'hebrews', chapter: 2, division: 'christ-superior-to-all', divisionIndex: 2, title: 'The Supremacy of Christ: He Became Like Us to Save Us', path: '/writings/hebrews/christ-superior-to-all-2' },
  { book: 'hebrews', chapter: 3, division: 'christ-superior-to-all', divisionIndex: 3, title: 'The Supremacy of Christ: Greater Than Moses', path: '/writings/hebrews/christ-superior-to-all-3' },
  { book: 'hebrews', chapter: 4, division: 'christ-superior-to-all', divisionIndex: 4, title: 'The Supremacy of Christ: Enter His Rest', path: '/writings/hebrews/christ-superior-to-all-4' },
  { book: 'hebrews', chapter: 5, division: 'christs-priesthood', divisionIndex: 1, title: 'The Supremacy of Christ: Our Sympathetic High Priest', path: '/writings/hebrews/christs-priesthood-1' },
  { book: 'hebrews', chapter: 6, division: 'christs-priesthood', divisionIndex: 2, title: 'The Supremacy of Christ: Hope as an Anchor', path: '/writings/hebrews/christs-priesthood-2' },
  { book: 'hebrews', chapter: 7, division: 'christs-priesthood', divisionIndex: 3, title: 'The Supremacy of Christ: A Priest Forever', path: '/writings/hebrews/christs-priesthood-3' },
  { book: 'hebrews', chapter: 8, division: 'faith-and-sacrifice', divisionIndex: 1, title: 'The Supremacy of Christ: Mediator of a Better Covenant', path: '/writings/hebrews/faith-and-sacrifice-1' },
  { book: 'hebrews', chapter: 9, division: 'faith-and-sacrifice', divisionIndex: 2, title: 'The Supremacy of Christ: Once for All', path: '/writings/hebrews/faith-and-sacrifice-2' },
  { book: 'hebrews', chapter: 10, division: 'faith-and-sacrifice', divisionIndex: 3, title: 'The Supremacy of Christ: Draw Near with Confidence', path: '/writings/hebrews/faith-and-sacrifice-3' },
  { book: 'hebrews', chapter: 11, division: 'call-to-persevere', divisionIndex: 1, title: 'The Supremacy of Christ: The Hall of Faith', path: '/writings/hebrews/call-to-persevere-1' },
  { book: 'hebrews', chapter: 12, division: 'call-to-persevere', divisionIndex: 2, title: 'The Supremacy of Christ: Run the Race with Endurance', path: '/writings/hebrews/call-to-persevere-2' },
  { book: 'hebrews', chapter: 13, division: 'call-to-persevere', divisionIndex: 3, title: 'The Supremacy of Christ: Live by Faith', path: '/writings/hebrews/call-to-persevere-3' },
  { book: 'james', chapter: 1, division: 'epistle', divisionIndex: 1, title: 'Faith That Works: Tested and True', path: '/writings/james/epistle-1' },
  { book: 'james', chapter: 2, division: 'epistle', divisionIndex: 2, title: 'Faith That Works: No Favoritism, No Pretense', path: '/writings/james/epistle-2' },
  { book: 'james', chapter: 3, division: 'epistle', divisionIndex: 3, title: 'Faith That Works: Taming the Tongue, Pursuing Wisdom', path: '/writings/james/epistle-3' },
  { book: 'james', chapter: 4, division: 'epistle', divisionIndex: 4, title: 'Faith That Works: Submitting to God, Resisting Pride', path: '/writings/james/epistle-4' },
  { book: 'james', chapter: 5, division: 'epistle', divisionIndex: 5, title: 'Faith That Works: Patient Endurance Until Christ Returns', path: '/writings/james/epistle-5' },
  { book: '1-peter', chapter: 1, division: 'suffering-and-hope', divisionIndex: 1, title: 'Hope in Suffering: Born Again to Living Hope', path: '/writings/1-peter/suffering-and-hope-1' },
  { book: '1-peter', chapter: 2, division: 'suffering-and-hope', divisionIndex: 2, title: 'Hope in Suffering: Living Stones and the Way of Christ', path: '/writings/1-peter/suffering-and-hope-2' },
  { book: '1-peter', chapter: 3, division: 'submission-and-witness', divisionIndex: 1, title: 'Hope in Suffering: Witness Through Submission and Blessing', path: '/writings/1-peter/submission-and-witness-1' },
  { book: '1-peter', chapter: 4, division: 'submission-and-witness', divisionIndex: 2, title: 'Hope in Suffering: Living for God\'s Will', path: '/writings/1-peter/submission-and-witness-2' },
  { book: '1-peter', chapter: 5, division: 'submission-and-witness', divisionIndex: 3, title: 'Hope in Suffering: Humble Yourselves Under God\'s Mighty Hand', path: '/writings/1-peter/submission-and-witness-3' },
  { book: '2-peter', chapter: 1, division: 'epistle', divisionIndex: 1, title: 'Growing in Grace: The Ladder of Christian Virtue', path: '/writings/2-peter/epistle-1' },
  { book: '2-peter', chapter: 2, division: 'epistle', divisionIndex: 2, title: 'Growing in Grace: Exposing False Teachers', path: '/writings/2-peter/epistle-2' },
  { book: '2-peter', chapter: 3, division: 'epistle', divisionIndex: 3, title: 'Growing in Grace: The Day of the Lord', path: '/writings/2-peter/epistle-3' },
  { book: '1-john', chapter: 1, division: 'fellowship-with-god', divisionIndex: 1, title: 'Walk in Light and Love: Fellowship Through Confession', path: '/writings/1-john/fellowship-with-god-1' },
  { book: '1-john', chapter: 2, division: 'fellowship-with-god', divisionIndex: 2, title: 'Walk in Light and Love: Obedience and the Antichrist', path: '/writings/1-john/fellowship-with-god-2' },
  { book: '1-john', chapter: 3, division: 'love-one-another', divisionIndex: 1, title: 'Walk in Light and Love: Children of God', path: '/writings/1-john/love-one-another-1' },
  { book: '1-john', chapter: 4, division: 'love-one-another', divisionIndex: 2, title: 'Walk in Light and Love: God Is Love', path: '/writings/1-john/love-one-another-2' },
  { book: '1-john', chapter: 5, division: 'assurance', divisionIndex: 1, title: 'Walk in Light and Love: Assurance of Eternal Life', path: '/writings/1-john/assurance-1' },
  { book: '2-john', chapter: 1, division: 'epistle', divisionIndex: 1, title: 'Walk in Truth and Love: Guard the Apostolic Teaching', path: '/writings/2-john/epistle-1' },
  { book: '3-john', chapter: 1, division: 'epistle', divisionIndex: 1, title: 'Walk in Truth and Love: Support Faithful Workers', path: '/writings/3-john/epistle-1' },
  { book: 'jude', chapter: 1, division: 'epistle', divisionIndex: 1, title: 'Contend for the Faith: Stand Firm Against False Teaching', path: '/writings/jude/epistle-1' },
  { book: 'romans', chapter: 1, division: 'sin-and-judgment', divisionIndex: 1, title: 'The Righteousness of God: The Power of the Gospel', path: '/writings/romans/sin-and-judgment-1' },
  { book: 'romans', chapter: 2, division: 'sin-and-judgment', divisionIndex: 2, title: 'The Righteousness of God: Impartial Judgment', path: '/writings/romans/sin-and-judgment-2' },
  { book: 'romans', chapter: 3, division: 'sin-and-judgment', divisionIndex: 3, title: 'The Righteousness of God: Justified by Faith', path: '/writings/romans/sin-and-judgment-3' },
  { book: 'romans', chapter: 4, division: 'justification-by-faith', divisionIndex: 1, title: 'The Righteousness of God: Abraham Believed', path: '/writings/romans/justification-by-faith-1' },
  { book: 'romans', chapter: 5, division: 'justification-by-faith', divisionIndex: 2, title: 'The Righteousness of God: Peace with God', path: '/writings/romans/justification-by-faith-2' },
  { book: 'romans', chapter: 6, division: 'sanctification', divisionIndex: 1, title: 'The Righteousness of God: Dead to Sin, Alive to God', path: '/writings/romans/sanctification-1' },
  { book: 'romans', chapter: 7, division: 'sanctification', divisionIndex: 2, title: 'The Righteousness of God: The Struggle with Sin', path: '/writings/romans/sanctification-2' },
  { book: 'romans', chapter: 8, division: 'sanctification', divisionIndex: 3, title: 'The Righteousness of God: Life in the Spirit', path: '/writings/romans/sanctification-3' },
  { book: 'romans', chapter: 9, division: 'israels-place', divisionIndex: 1, title: 'The Righteousness of God: God\'s Sovereign Choice', path: '/writings/romans/israels-place-1' },
  { book: 'romans', chapter: 10, division: 'israels-place', divisionIndex: 2, title: 'The Righteousness of God: Faith Comes by Hearing', path: '/writings/romans/israels-place-2' },
  { book: 'romans', chapter: 11, division: 'israels-place', divisionIndex: 3, title: 'The Righteousness of God: Israel\'s Future Restoration', path: '/writings/romans/israels-place-3' },
  { book: 'romans', chapter: 12, division: 'practical-christian-living', divisionIndex: 1, title: 'The Righteousness of God: Living Sacrifices', path: '/writings/romans/practical-christian-living-1' },
  { book: 'romans', chapter: 13, division: 'practical-christian-living', divisionIndex: 2, title: 'The Righteousness of God: Submit to Authorities, Love Fulfills the Law', path: '/writings/romans/practical-christian-living-2' },
  { book: 'romans', chapter: 14, division: 'practical-christian-living', divisionIndex: 3, title: 'The Righteousness of God: Accept One Another', path: '/writings/romans/practical-christian-living-3' },
  { book: 'romans', chapter: 15, division: 'practical-christian-living', divisionIndex: 4, title: 'The Righteousness of God: Bear with the Weak', path: '/writings/romans/practical-christian-living-4' },
  { book: 'romans', chapter: 16, division: 'practical-christian-living', divisionIndex: 5, title: 'The Righteousness of God: Greetings and Doxology', path: '/writings/romans/practical-christian-living-5' },
];

export function hasWriting(book: string, chapter: number): boolean {
  return WRITINGS.some(
    (w) => w.book === book && w.chapter === chapter
  );
}

export function getWriting(book: string, chapter: number): Writing | undefined {
  return WRITINGS.find(
    (w) => w.book === book && w.chapter === chapter
  );
}

export function getAllWritings(): Writing[] {
  return WRITINGS;
}

export function getWritingByPath(book: string, divisionPath: string): Writing | undefined {
  return WRITINGS.find(
    (w) => w.book === book && w.path === `/writings/${book}/${divisionPath}`
  );
}

export function divisionHasWritings(book: string, chapters: number[]): boolean {
  return chapters.some(chapter => hasWriting(book, chapter));
}

export async function getWritingContent(book: string, chapter: number): Promise<string | null> {
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'lib', 'writings', book, `${book}-${chapter}.md`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading writing:', error);
    return null;
  }
}
