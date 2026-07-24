import { BookMemorial } from '@/lib/types';

/**
 * Overview of the Book of Joshua.
 *
 * Joshua records Israel's transition from wandering
 * to dwelling. God fulfills His promise to Abraham by
 * bringing His people into the land, forming them into
 * a covenant nation, and calling them to remain faithful
 * across generations.
 */
export const JOSHUA: BookMemorial = {
  slug: 'joshua',
  title: 'Joshua',
  subtitle: 'The Faithfulness of God',
  scripture: 'Joshua 1–24',

  summary: [
    'The Book of Joshua tells the story of God fulfilling His promise to bring Israel into the land He swore to Abraham, Isaac, and Jacob. Under Joshua\'s leadership, Israel crosses the Jordan, conquers Canaan, receives its inheritance, establishes worship at Shiloh, and renews the covenant before Joshua\'s death.',
    'More than a record of military victories, Joshua is the story of a people learning how to live faithfully with God. Courage, obedience, discernment, stewardship, worship, and covenant faithfulness become the marks of a nation whose confidence rests not in its own strength, but in the Lord who goes before them.',
  ],

  keyVerse: {
    reference: 'Joshua 24:15',
    text: 'Choose this day whom you will serve... But as for me and my household, we will serve the Lord.',
  },

  theme: {
    heading: 'The Central Movement',
    body: [
      'Joshua is the movement from promise to possession.',
      'God does not merely give Israel a land. He forms a people capable of faithfully living within His promises.',
    ],
  },

  divisions: [
    {
      id: 'formation',
      title: 'Formation',
      scripture: 'Joshua 1–5',
      summary:
        'Before Israel conquers the land, God forms His people through courage, faith, consecration, remembrance, and holiness.',
    },
    {
      id: 'first-tests',
      title: 'First Tests',
      scripture: 'Joshua 6–8',
      summary:
        'Israel learns that victory depends upon obedience, covenant faithfulness, and restoration after failure.',
    },
    {
      id: 'possess',
      title: 'Possess',
      scripture: 'Joshua 9–12',
      summary:
        'God teaches Israel to possess the land through discernment, courage, dependence, and remembrance.',
    },
    {
      id: 'inheritance',
      title: 'Inheritance',
      scripture: 'Joshua 13–17',
      summary:
        'The conquered land becomes a stewardship as each tribe receives and faithfully possesses its inheritance.',
    },
    {
      id: 'shiloh',
      title: 'Shiloh',
      scripture: 'Joshua 18–21',
      summary:
        'Israel orders its national life around God\'s presence, justice, worship, and covenant faithfulness.',
    },
    {
      id: 'legacy',
      title: 'Legacy',
      scripture: 'Joshua 22–24',
      summary:
        'Joshua\'s final words call every generation to choose faithfulness and preserve the covenant after receiving God\'s promises.',
    },
  ],

  synthesis: {
    heading: 'The Journey of Joshua',
    opening: [
      'The Book of Joshua answers six questions that every generation of God\'s people must eventually face.',
    ],
    steps: [
      {
        question: 'Who must we become?',
        answer: 'Formation',
      },
      {
        question: 'Will we obey?',
        answer: 'First Tests',
      },
      {
        question: 'How do we possess what God has promised?',
        answer: 'Possess',
      },
      {
        question: 'How do we steward God\'s gifts?',
        answer: 'Inheritance',
      },
      {
        question: 'How do we order our lives around God?',
        answer: 'Shiloh',
      },
      {
        question: 'What legacy will we leave?',
        answer: 'Legacy',
      },
    ],
    closing: [
      'Joshua begins with God commissioning a new leader and ends with that leader calling the nation to choose whom they will serve. Between those two moments, God proves that every promise He makes is trustworthy, and He forms a people capable of living faithfully within those promises.',
    ],
  },

  canon: {
    title: 'The Joshua Canon',
    principles: [
      'Walk courageously because God is with you.',
      'Obey even when you do not yet understand.',
      'Seek the Lord before making decisions.',
      'Steward every gift God entrusts to you.',
      'Keep God\'s presence at the center of your life.',
      'Choose faithfulness every generation.',
    ],
  },
};
