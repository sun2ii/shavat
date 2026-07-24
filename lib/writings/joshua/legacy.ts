import { DivisionMemorial } from '@/lib/types';

/**
 * Content for the Legacy memorial (Joshua 22–24).
 *
 * Joshua's final words call Israel to remain faithful after
 * receiving every promise God had made. The question is no
 * longer whether God will keep His covenant, but whether His
 * people will keep theirs.
 */
export const LEGACY: DivisionMemorial = {
  bookSlug: 'joshua',
  bookName: 'Joshua',
  divisionId: 'legacy',
  eyebrow: 'Joshua 22–24',
  title: 'Legacy',
  intro: [
    'The land has been conquered. The inheritance has been divided. Shiloh has been established. The final chapters of Joshua are not about gaining more but about remaining faithful to what has already been received.',
    'Joshua\'s farewell reminds Israel that the greatest threat to their future is no longer the nations around them, but forgetting the God who brought them there.',
  ],
  memorialIntro: {
    heading: 'Memorial Stones',
    body: [
      'Joshua ends the book by raising one final witness. Altars are explained, covenants are renewed, and the people are called to choose whom they will serve.',
      'The following stones preserve what Joshua 22–24 teaches about faithfulness across generations.',
    ],
  },
  chapters: [
    {
      chapter: 22,
      anchor: 'unity',
      theme: 'Unity',
      story:
        'The eastern tribes built a large altar beside the Jordan. The western tribes assumed it was an act of rebellion and prepared for war, but the altar proved to be a witness of their shared covenant with the Lord.',
      tension:
        'Will misunderstanding divide God\'s people?',
      revelation:
        'Faithful people seek understanding before judgment. The altar was not built for sacrifice but for remembrance, preserving unity across the Jordan for future generations.',
      memorialStones: [
        'Seek understanding before accusation.',
        'Unity is worth protecting.',
        'Faithfulness requires honest conversation.',
        'A witness preserves future generations.',
        'Shared worship creates lasting unity.',
        'Peace is strengthened through truth.',
      ],
      quote:
        'It is a witness between us that the Lord is God.',
    },
    {
      chapter: 23,
      anchor: 'perseverance',
      theme: 'Perseverance',
      story:
        'Joshua gathered Israel\'s leaders one final time and reminded them that every victory came from the Lord. He warned them not to cling to the surrounding nations or abandon the covenant.',
      tension:
        'Will God\'s people remain faithful after receiving His blessings?',
      revelation:
        'Success creates new temptations. Israel no longer faced armies but the slow danger of compromise. Covenant faithfulness must continue long after the battles end.',
      memorialStones: [
        'Do not cling to what God delivered you from.',
        'Faithfulness must outlast success.',
        'Blessing never removes dependence.',
        'Remember who fought for you.',
        'Compromise begins gradually.',
        'Hold fast to the Lord.',
      ],
      quote:
        'Hold fast to the Lord your God.',
    },
    {
      chapter: 24,
      anchor: 'choice',
      theme: 'Choice',
      story:
        'Joshua gathered all Israel at Shechem, rehearsed God\'s faithfulness from Abraham onward, renewed the covenant, and challenged the people to choose whom they would serve. A great stone was set up as a witness beneath the oak.',
      tension:
        'How should every generation respond to God\'s covenant?',
      revelation:
        'God\'s faithfulness invites a personal response. Every generation must choose whether to serve the Lord. Joshua\'s final memorial points beyond itself, reminding Israel that witnesses endure even after leaders die.',
      memorialStones: [
        'Remember God\'s story before your own.',
        'Every generation must choose.',
        'Faith cannot be inherited without commitment.',
        'The Lord alone is worthy of worship.',
        'A witness outlives its builder.',
        'Choose this day whom you will serve.',
      ],
      quote:
        'As for me and my household, we will serve the Lord.',
    },
  ],
  synthesis: {
    eyebrow: 'The Movement',
    heading: 'How the Covenant Endures',
    opening: [
      'Joshua 22–24 is not merely Joshua\'s farewell. It is the passing of covenant responsibility from one generation to the next.',
      'Each chapter answers a different question.',
    ],
    steps: [
      {
        question:
          'How should God\'s people preserve unity?',
        theme: 'Unity',
      },
      {
        question:
          'How should God\'s people respond after receiving God\'s blessings?',
        theme: 'Perseverance',
      },
      {
        question:
          'What decision confronts every generation?',
        theme: 'Choice',
      },
    ],
    closing: [
      'Joshua ends where he began: with covenant faithfulness. God had fulfilled every promise He made, but Israel still had to choose whether they would remain faithful to Him.',
      'The final stone at Shechem stands as Joshua\'s lasting testimony. Buildings fall, leaders die, and generations pass away, but every generation must answer the same question: "Whom will you serve?"',
    ],
  },
  canon: {
    title: 'The Legacy Canon',
    principles: [
      'Protect unity through truth.',
      'Hold fast to the Lord after success.',
      'Remember God\'s faithfulness before your own story.',
      'Choose whom you will serve.',
      'Leave behind witnesses that outlive you.',
    ],
  },
};
