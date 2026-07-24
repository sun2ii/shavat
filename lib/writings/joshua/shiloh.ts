import { DivisionMemorial } from '@/lib/types';

/**
 * Content for the Shiloh memorial (Joshua 18–21).
 *
 * Israel has received the land. At Shiloh the nation
 * establishes God's dwelling at its center and orders
 * its inheritance, justice, and worship around Him.
 */
export const SHILOH: DivisionMemorial = {
  bookSlug: 'joshua',
  bookName: 'Joshua',
  divisionId: 'shiloh',
  eyebrow: 'Joshua 18–21',
  title: 'Shiloh',
  intro: [
    'The conquest has largely ended. Israel now gathers at Shiloh, where the Tent of Meeting is established among the people. The center of the nation is no longer the battlefield but the presence of God.',
    'These chapters reveal that possessing the land was never the final goal. God was forming a people whose worship, justice, and daily life would all be ordered around Him.',
  ],
  memorialIntro: {
    heading: 'Memorial Stones',
    body: [
      'Joshua slows the story once more. Land is surveyed, inheritances are completed, cities of refuge are established, and the Levites receive their portion.',
      'The following stones preserve what Joshua 18–21 teaches about building a nation whose center is the Lord.',
    ],
  },
  chapters: [
    {
      chapter: 18,
      anchor: 'initiative',
      theme: 'Initiative',
      story:
        'The whole assembly gathered at Shiloh and set up the Tent of Meeting. Seven tribes had still not taken possession of their inheritance, so Joshua sent men to survey the land before casting lots before the Lord.',
      tension:
        'How long will God’s people delay what God has already given?',
      revelation:
        'God had already given the inheritance, yet His people still had to step forward and possess it. Faith eventually moves. Delay is not the same as dependence.',
      memorialStones: [
        'God’s presence belongs at the center.',
        'Faith eventually takes possession.',
        'Delay should never replace obedience.',
        'Survey what God has entrusted.',
        'The inheritance belongs to the Lord before it belongs to us.',
        'Take possession of what God has already given.',
      ],
      quote:
        'How long will you wait before you begin to take possession of the land?',
    },
    {
      chapter: 19,
      anchor: 'contentment',
      theme: 'Contentment',
      story:
        'The remaining tribes received their inheritance by lot before the Lord. Only after every tribe had received its portion did Joshua receive his own inheritance.',
      tension:
        'What does faithful leadership look like after victory?',
      revelation:
        'Joshua sought the good of the people before his own reward. Leadership serves first and receives later, trusting God to provide what has been promised.',
      memorialStones: [
        'Faithful leaders serve before they receive.',
        'Every tribe has a place in God’s purpose.',
        'Contentment trusts God’s portion.',
        'Leadership is measured by sacrifice.',
        'The last inheritance belongs to Joshua.',
        'God remembers those who faithfully serve Him.',
      ],
      quote:
        'When they had finished dividing the land... they gave Joshua his inheritance.',
    },
    {
      chapter: 20,
      anchor: 'justice',
      theme: 'Justice',
      story:
        'The Lord established cities of refuge where anyone who caused accidental death could flee until receiving a fair hearing before the congregation.',
      tension:
        'How should justice reflect the character of God?',
      revelation:
        'Justice protects both the innocent and the community. God’s law refuses vengeance while also refusing lawlessness. Mercy and righteousness meet together.',
      memorialStones: [
        'Justice belongs to the Lord.',
        'Mercy protects the innocent.',
        'Every person deserves a fair hearing.',
        'God restrains revenge.',
        'Justice preserves community.',
        'Refuge reflects God’s compassion.',
      ],
      quote:
        'Designate the cities of refuge.',
    },
    {
      chapter: 21,
      anchor: 'faithfulness',
      theme: 'Faithfulness',
      story:
        'The Levites received cities throughout Israel, and the chapter concludes by declaring that every promise the Lord had made to Israel had been fulfilled.',
      tension:
        'Can God be trusted to keep every promise He has spoken?',
      revelation:
        'The Levites received the Lord as their inheritance, reminding Israel that God Himself is the greatest portion. The book pauses to declare that not one of the Lord’s promises failed.',
      memorialStones: [
        'The Lord Himself is the greatest inheritance.',
        'God keeps every promise He makes.',
        'Worship belongs throughout the land.',
        'Faithfulness extends across generations.',
        'The covenant rests upon God’s character.',
        'Not one promise failed.',
      ],
      quote:
        'Not one of all the Lord’s good promises to Israel failed; every one was fulfilled.',
    },
  ],
  synthesis: {
    eyebrow: 'The Movement',
    heading: 'How the Nation Was Ordered',
    opening: [
      'Joshua 18–21 is not merely the completion of Israel’s inheritance. It is the establishment of a nation ordered around the presence, justice, and faithfulness of God.',
      'Each chapter answers a different question.',
    ],
    steps: [
      {
        question:
          'How should God’s people respond after receiving His promises?',
        theme: 'Initiative',
      },
      {
        question:
          'How should leaders steward their position?',
        theme: 'Contentment',
      },
      {
        question:
          'How should God’s people practice justice?',
        theme: 'Justice',
      },
      {
        question:
          'What ultimately guarantees Israel’s future?',
        theme: 'Faithfulness',
      },
    ],
    closing: [
      'Shiloh became the heart of Israel because the presence of God stood at its center. The land was divided, justice was established, worship was distributed throughout the nation, and every promise of the Lord proved true.',
      'God was not only giving Israel a homeland. He was establishing a kingdom whose life would revolve around His presence and whose confidence would rest upon His faithfulness.',
    ],
  },
  canon: {
    title: 'The Shiloh Canon',
    principles: [
      'Keep God’s presence at the center.',
      'Take possession of what God has already given.',
      'Serve others before seeking your own reward.',
      'Practice justice with mercy.',
      'Trust every promise the Lord has spoken.',
    ],
  },
};
