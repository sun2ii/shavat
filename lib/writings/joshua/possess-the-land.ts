import { DivisionMemorial } from '@/lib/types';

/**
 * Content for the Possess the Land memorial (Joshua 9–12).
 *
 * Each chapter follows the pattern the book itself uses:
 * story -> tension -> revelation -> memorial. The stones are meant to read as
 * truths Joshua left behind, not as lessons drawn out afterward.
 */
export const POSSESS_THE_LAND: DivisionMemorial = {
  bookSlug: 'joshua',
  bookName: 'Joshua',
  divisionId: 'possess-the-land',
  eyebrow: 'Joshua 9–12',
  title: 'Possess the Land',
  intro: [
    'Possessing the land required more than winning battles. Israel had to learn how to discern appearances, honor costly commitments, depend on God in the face of overwhelming power, and remember what had been accomplished.',
    'These chapters record the movement from uncertainty to possession. Each chapter leaves behind a principle worth carrying forward.',
  ],
  memorialIntro: {
    heading: 'Memorial Stones',
    body: [
      'Joshua repeatedly stops after significant events to preserve what happened. Stones are raised, covenants are renewed, victories are recorded, and names are written down.',
      'The following stones serve the same purpose: truths drawn from the events of Joshua 9–12 and set down where a later generation can find them.',
    ],
  },
  chapters: [
    {
      chapter: 9,
      anchor: 'discernment',
      theme: 'Discernment',
      story:
        'The Gibeonites disguised themselves as travelers from a distant land — worn sacks, cracked wineskins, dry and crumbling bread — and persuaded Israel to make a covenant with them without seeking the Lord.',
      tension:
        'Can appearances be trusted, or will Israel seek God before making covenant decisions?',
      revelation:
        'Israel’s failure was not a lack of intelligence. The men examined the provisions and reasoned well; they simply did not inquire of the Lord. Discernment requires more than observation, and the covenant they swore in God’s name held even after the deception was uncovered.',
      memorialStones: [
        'Discernment begins where appearances end.',
        'Evidence should inform decisions, but never replace seeking God.',
        'Success often creates new blind spots.',
        'Deception often contains enough truth to appear believable.',
        'Integrity is proven after mistakes, not before them.',
        'A covenant should outlive embarrassment.',
      ],
      quote: 'They did not inquire of the Lord.',
    },
    {
      chapter: 10,
      anchor: 'courage',
      theme: 'Courage',
      story:
        'Five Amorite kings marched against Gibeon for making peace with Israel. Joshua went up from Gilgal through the night and fought for the very people who had deceived him. The Lord threw the enemy into confusion, hurled great stones from heaven, and held back the sun until the work was finished.',
      tension:
        'Will Israel keep a costly covenant, even one obtained by deception?',
      revelation:
        'The Lord fought for Israel on the day Israel kept its word. A covenant sworn in God’s name is not undone by how it was obtained; it is honored because His name is on it. Israel marched all night and God fought from heaven — the deliverance was His, the obedience was theirs.',
      memorialStones: [
        'An oath sworn in the Lord’s name binds even when it was gained by deception.',
        'Covenant obligation outweighs grievance.',
        'Faithfulness is costly before it is vindicated.',
        'The Lord fights for those who keep their word.',
        'God did not remove the consequence; He worked through it.',
        'Heaven threw down more stones than Israel’s swords struck — yet Israel still marched all night.',
      ],
      quote: 'Do not be afraid; do not be discouraged. Be strong and courageous.',
    },
    {
      chapter: 11,
      anchor: 'dependence',
      theme: 'Dependence',
      story:
        'Jabin of Hazor gathered the northern kings — an army as numerous as the sand on the seashore, with very many horses and chariots. The Lord told Joshua not to fear them. Israel fell on them at the waters of Merom, hamstrung their horses, and burned their chariots with fire.',
      tension:
        'Will Israel trust visible strength, or the word of the Lord?',
      revelation:
        'God gave victory over the chariots and then commanded Israel to destroy them. The strength Israel overcame was strength Israel was forbidden to keep, because captured power becomes tomorrow’s confidence. Dependence is preserved by refusing the means the enemy trusted.',
      memorialStones: [
        'The promise came before the battle: do not be afraid of them.',
        'A multitude like the sand of the seashore is still a number; the Lord is not.',
        'God’s people are forbidden the very strength they were given power to defeat.',
        'Captured horses and chariots become tomorrow’s trust, so they were hamstrung and burned.',
        'Joshua made war a long time — dependence is sustained, not momentary.',
        'He left nothing undone of all that the Lord commanded Moses.',
      ],
      quote: 'Joshua left nothing undone of all that the Lord commanded Moses.',
    },
    {
      chapter: 12,
      anchor: 'remembrance',
      theme: 'Remembrance',
      story:
        'Before a single tribe receives its inheritance, the account stops to name the defeated kings — those east of the Jordan struck down under Moses, and those west of it under Joshua. Thirty-one kings in all, each one written down.',
      tension:
        'How should God’s people respond after God fulfills His promises?',
      revelation:
        'The chapter is a list because remembrance is an act of worship. Naming the kings settles who gave the land: it was received, not seized. Moses’ victories are counted beside Joshua’s as one work across two generations, and the record becomes the ground on which the inheritance is divided.',
      memorialStones: [
        'The land was given; the list is the evidence.',
        'A promise fulfilled is written down before it is enjoyed.',
        'Moses’ victories are counted alongside Joshua’s — one work across two generations.',
        'The kings are named so no one may later claim the land was won by Israel’s hand.',
        'What is not remembered returns later as doubt.',
        'Conquest ends in a record, and the record begins the inheritance.',
      ],
      quote: 'Thirty-one kings in all.',
    },
  ],
  synthesis: {
    eyebrow: 'The Movement',
    heading: 'How the Land Was Possessed',
    opening: [
      'Joshua 9–12 is not merely an account of land being conquered. It is an account of a people being made capable of possessing what God had promised them.',
      'Each chapter answers a different question.',
    ],
    steps: [
      {
        question: 'How should God’s people respond when appearances deceive?',
        theme: 'Discernment',
      },
      {
        question: 'How should God’s people respond when faithfulness becomes costly?',
        theme: 'Courage',
      },
      {
        question: 'How should God’s people respond when visible strength overwhelms them?',
        theme: 'Dependence',
      },
      {
        question: 'How should God’s people respond after God fulfills His promises?',
        theme: 'Remembrance',
      },
    ],
    closing: [
      'Possession required more than military success. It required a people who would seek the Lord before deciding, keep an oath that cost them, refuse the strength their enemies trusted, and write down what God had done.',
      'God was not only giving Israel an inheritance. He was forming a people capable of faithfully stewarding it.',
    ],
  },
  canon: {
    title: 'The Possess the Land Canon',
    principles: [
      'Inquire of the Lord before you commit.',
      'Keep the oath that costs you.',
      'Depend on God rather than visible strength.',
      'Finish all that was commanded.',
      'Write down what God has done.',
    ],
  },
};
