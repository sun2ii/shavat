import { BookOrientation } from '@/lib/types';

export const COLOSSIANS: BookOrientation = {
  slug: 'colossians',
  title: 'Colossians',
  subtitle: 'Christ Above All',
  scripture: 'Colossians 1–4',
  summary:
    'Paul\`s letter to a church threatened by false teaching, proclaiming Christ as supreme over all creation and sufficient for all spiritual needs.',
  place: { city: 'Ubud', vibe: 'mysticism, spiritual mixing' },

  sections: [
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Colossians is a letter against syncretism. The church at Colossae was being tempted to add things to Christ: special knowledge, ascetic practices, angel worship, Jewish observances. Paul\`s response is to exalt Christ so high that nothing else is needed. In him "the whole fullness of deity dwells bodily."',
        'The letter contains one of the most exalted christological passages in the New Testament (1:15–20). Christ is the image of the invisible God, the firstborn of all creation, the one in whom all things hold together. He is the head of the body, the beginning, the firstborn from the dead. In everything he is preeminent.',
        'From this high christology flows the practical message: you do not need anything beyond Christ. Do not let anyone disqualify you for not observing festivals or practicing asceticism. Do not be captivated by "philosophy and empty deceit." You have died with Christ and been raised with him. Live accordingly.',
      ],
      figures: [
        {
          art: `  THE THREAT
    │
    ├── FALSE TEACHING AT COLOSSAE
    │     │
    │     ├── "Philosophy" and human tradition
    │     ├── Elemental spirits (stoicheia)
    │     ├── Regulations: "Do not handle, do not taste, do not touch"
    │     ├── Angel worship
    │     ├── Visionary experiences
    │     └── Festival observances (new moons, sabbaths)
    │
    └── PAUL\`S RESPONSE
          │
          ├── Christ is supreme over all
          ├── In him all fullness dwells
          ├── You have been filled in him
          ├── You have died and risen with him
          └── These practices are shadows; the substance is Christ`,
          caption: 'The error and the answer.',
        },
      ],
    },

    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Colossae was a small city in the Lycus Valley of Asia Minor, about 100 miles east of Ephesus. In earlier centuries it had been significant, but by Paul\`s time it had declined, overshadowed by nearby Laodicea and Hierapolis. The church there was founded not by Paul but by Epaphras, who was apparently converted during Paul\`s Ephesian ministry.',
        'Paul writes from prison (Ephesus or Rome) to address a dangerous teaching that has infiltrated the church. The exact nature of "the Colossian heresy" is debated; Paul\`s description suggests a mixture of Jewish elements (sabbaths, new moons, circumcision) and Hellenistic mysticism (visions, angel worship, asceticism). Whatever its precise form, the heresy diminished Christ.',
        'The letter is sent along with Philemon, carried by Tychicus and accompanied by Onesimus (4:7–9). Paul has never visited Colossae but knows of their faith through Epaphras, who is with him in prison. He writes to prevent them from being led astray.',
      ],
      entries: [
        {
          term: 'The Colossian heresy',
          role: 'the threat',
          detail:
            'A teaching that combined Jewish and pagan elements: calendar observances, dietary restrictions, angel veneration, mystical experiences, and harsh treatment of the body. Its proponents claimed superior spiritual knowledge. Paul\`s response is that they are chasing shadows while Christ is the substance.',
        },
        {
          term: 'Elemental spirits',
          role: 'the powers',
          detail:
            'The Greek word stoicheia can mean basic principles, elementary teachings, or spiritual powers. In Colossians, Paul seems to mean spiritual forces that the false teachers claimed to access through special practices. Christ has triumphed over all such powers.',
        },
        {
          term: 'Asceticism',
          role: 'the practice',
          detail:
            '"Do not handle, do not taste, do not touch." The false teachers promoted severe treatment of the body, perhaps to subdue fleshly desires or to prepare for visions. Paul says these have "an appearance of wisdom" but are "of no value in stopping the indulgence of the flesh."',
        },
        {
          term: 'Angel worship',
          role: 'the mysticism',
          detail:
            'Some at Colossae venerated angels and sought visionary experiences. Paul warns against this: no one should disqualify them by insisting on such things. Christ, not angels, is the head from whom the whole body grows.',
        },
      ],
    },

    {
      id: 'characters',
      heading: 'The People',
      body: [
        'Colossians mentions several individuals who connect Paul to this church he has never visited.',
      ],
      entries: [
        {
          term: 'Paul',
          role: 'prisoner and apostle',
          detail:
            'The author, writing from prison. Though he has not visited Colossae, he has heard of their faith and prays for them. He identifies as an apostle of Christ Jesus and as one who suffers for the sake of the church.',
        },
        {
          term: 'Timothy',
          role: 'co-sender',
          detail:
            'Listed with Paul in the greeting as "our brother." His name lends weight to the letter\`s authority.',
        },
        {
          term: 'Epaphras',
          role: 'founder and informant',
          detail:
            'A Colossian who brought the gospel to his city, probably converted during Paul\`s Ephesian ministry. He is now with Paul and has reported on the church\`s faith and the threats it faces. Paul calls him "our beloved fellow servant" and "a faithful minister of Christ."',
        },
        {
          term: 'Tychicus',
          role: 'letter carrier',
          detail:
            'Paul\`s trusted messenger who carries this letter to Colossae. Paul calls him "a beloved brother and faithful minister and fellow servant in the Lord." He will tell them everything about Paul\`s situation.',
        },
        {
          term: 'Onesimus',
          role: 'companion',
          detail:
            'The runaway slave returning to his master Philemon in Colossae. Paul calls him "our faithful and beloved brother, who is one of you." The letters to Colossians and Philemon travel together.',
        },
        {
          term: 'Aristarchus, Mark, Jesus Justus',
          role: 'Jewish co-workers',
          detail:
            'Three Jewish believers with Paul who send greetings. Mark is Barnabas\`s cousin. Paul notes that these are the only Jewish Christians working with him "for the kingdom of God."',
        },
        {
          term: 'Luke, Demas',
          role: 'Gentile co-workers',
          detail:
            'Luke is called "the beloved physician." Demas sends greetings here; in 2 Timothy 4:10, Paul will say Demas deserted him, "in love with this present world."',
        },
        {
          term: 'Nympha',
          role: 'house church host',
          detail:
            'A woman in Laodicea in whose house a church meets. Paul asks that this letter be read in her church too, and that they read the letter from Laodicea.',
        },
        {
          term: 'Archippus',
          role: 'minister',
          detail:
            'Someone in Colossae who has received a ministry from the Lord. Paul says, "See that you fulfill the ministry that you have received in the Lord." He is also mentioned in Philemon.',
        },
      ],
    },

    {
      id: 'places',
      heading: 'The Geography',
      body: [
        'Colossae sat in a cluster of cities in the Lycus Valley, connected to Paul through his Ephesian ministry.',
      ],
      figures: [
        {
          art: `                    EPHESUS
              (Paul\`s base, 3 years)
                        │
              "All who lived in Asia
               heard the word" (Acts 19:10)
                        │
           ┌────────────┼────────────┐
           │            │            │
           ▼            ▼            ▼
       COLOSSAE    LAODICEA    HIERAPOLIS
           │            │            │
           └────────────┼────────────┘
                        │
                  THE LYCUS VALLEY
                        │
              All three churches founded
              during Ephesian period,
              probably by Epaphras`,
          caption: 'The Lycus Valley churches and their connection to Ephesus.',
        },
      ],
      entries: [
        {
          term: 'Colossae',
          detail:
            'A city in the Lycus Valley, about 100 miles east of Ephesus. Once significant for its wool trade, it had declined by Paul\`s time. It was destroyed by an earthquake around AD 60 and never rebuilt.',
        },
        {
          term: 'Laodicea',
          detail:
            'A nearby city, larger and more prosperous than Colossae. Paul mentions a letter to the Laodiceans and asks that the letters be exchanged. This church is also addressed in Revelation 3:14–22.',
        },
        {
          term: 'Hierapolis',
          detail:
            'The third city in the valley, known for its hot springs and pagan temples. Epaphras apparently worked there too, for Paul says he "has worked hard for you and for those in Laodicea and in Hierapolis."',
        },
        {
          term: 'Ephesus',
          detail:
            'The major city of the province of Asia, where Paul spent nearly three years. His influence spread throughout the region during this time; the Lycus Valley churches were probably founded then.',
        },
      ],
    },

    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The letter moves from exalted christology to practical ethics.',
      ],
      figures: [
        {
          art: `   GREETING AND THANKSGIVING (1:1–14)
   ──────────────────────────────
   Faith, love, hope
   Prayer for knowledge and fruitfulness

   THE SUPREMACY OF CHRIST (1:15–23)
   ──────────────────────────────
   THE CHRIST HYMN (1:15–20)
   Image of God, firstborn, all things in him
   Reconciliation through his blood

   PAUL\`S MINISTRY (1:24–2:5)
   ──────────────────────────────
   Suffering for the church
   The mystery revealed: Christ in you

   WARNING AGAINST FALSE TEACHING (2:6–23)
   ──────────────────────────────
   Walk in Christ, rooted in him
   Beware of philosophy and human tradition
   You have died with Christ to the elemental spirits
   Do not let anyone judge you or disqualify you

   THE NEW LIFE IN CHRIST (3:1–4:6)
   ──────────────────────────────
   Seek things above
   Put off the old, put on the new
   Household code: wives/husbands, children/parents, slaves/masters
   Prayer and wise conduct

   CLOSING (4:7–18)
   ──────────────────────────────
   Tychicus and Onesimus
   Greetings from co-workers
   Instructions about Laodicea and Archippus`,
          caption: 'From christology to ethics.',
        },
      ],
    },

    {
      id: 'hymn',
      heading: 'The Christ Hymn',
      body: [
        'Colossians 1:15–20 is one of the highest christological statements in Scripture. Like the Philippians hymn (2:6–11), it may be an early Christian hymn that Paul quotes or adapts.',
      ],
      figures: [
        {
          art: `   CHRIST AND CREATION (1:15–17)
   ──────────────────────────────
   "He is the image of the invisible God"
   "the firstborn of all creation"
   "by him all things were created"
      in heaven and on earth
      visible and invisible
      thrones, dominions, rulers, authorities
   "all things were created through him and for him"
   "he is before all things"
   "in him all things hold together"


   CHRIST AND THE CHURCH (1:18–20)
   ──────────────────────────────
   "He is the head of the body, the church"
   "He is the beginning"
   "the firstborn from the dead"
   "that in everything he might be preeminent"
   "in him all the fullness of God was pleased to dwell"
   "through him to reconcile to himself all things"
      making peace by the blood of his cross`,
          caption: 'Two strophes: creation and redemption.',
        },
      ],
      closing: [
        'This hymn answers the false teaching directly. If Christ is the creator, sustainer, and goal of all things, if all fullness dwells in him, if he has reconciled all things, then nothing else is needed. Angels, elemental spirits, human traditions, and ascetic practices are at best irrelevant, at worst competitors to his supremacy.',
      ],
    },

    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'The Supremacy of Christ',
          definition:
            'Christ is preeminent in creation and redemption, supreme over all powers.',
          appears:
            'The Christ hymn (1:15–20); "In him the whole fullness of deity dwells bodily" (2:9).',
          matters:
            'This is the answer to every addition to Christ. If he is supreme, nothing else is needed.',
        },
        {
          name: 'Fullness in Christ',
          definition:
            'Believers have been filled with all they need in Christ.',
          appears:
            '"You have been filled in him, who is the head of all rule and authority" (2:10).',
          matters:
            'The false teachers offered "fullness" through their practices. Paul says believers already have fullness in Christ.',
        },
        {
          name: 'Dying and Rising with Christ',
          definition:
            'Union with Christ in his death and resurrection.',
          appears:
            '"You were buried with him in baptism, in which you were also raised with him through faith" (2:12); "If then you have been raised with Christ, seek the things that are above" (3:1).',
          matters:
            'This union is the basis for ethics. You have died to the old ways; now live the new life.',
        },
        {
          name: 'Christ the Mystery',
          definition:
            'The hidden plan of God now revealed: Christ among the Gentiles.',
          appears:
            '"The mystery hidden for ages and generations but now revealed... which is Christ in you, the hope of glory" (1:26–27).',
          matters:
            'The false teachers offered secret knowledge. Paul says the mystery is now openly proclaimed: Christ himself.',
        },
        {
          name: 'The New Humanity',
          definition:
            'A renewed people where old divisions are overcome.',
          appears:
            '"Here there is not Greek and Jew, circumcised and uncircumcised, barbarian, Scythian, slave, free; but Christ is all, and in all" (3:11).',
          matters:
            'The new life is communal. Putting on the new self means participating in a community where Christ is everything.',
        },
      ],
    },

    {
      id: 'connections',
      heading: 'Where Colossians Sits in Scripture',
      entries: [
        {
          term: 'Ephesians',
          detail:
            'The two letters are closely related, with similar vocabulary, themes, and structure. Many scholars think they were written around the same time. Ephesians is more cosmic and general; Colossians is more polemical and specific.',
        },
        {
          term: 'Philemon',
          detail:
            'Sent at the same time, with the same carriers (Tychicus and Onesimus), to the same region. Archippus appears in both letters. Reading them together reveals the personal relationships behind the theology.',
        },
        {
          term: 'Philippians',
          detail:
            'Both contain Christ hymns (Phil 2:6–11; Col 1:15–20). Both are written from prison. Philippians emphasizes joy; Colossians emphasizes Christ\`s supremacy.',
        },
        {
          term: 'John 1',
          detail:
            'The prologue of John\`s Gospel echoes Colossians\` christology: the Word was with God, all things were made through him, in him was life. Both draw on Wisdom traditions applied to Christ.',
        },
        {
          term: 'Hebrews',
          detail:
            'Hebrews also exalts Christ above angels (Hebrews 1–2), arguing that Christ is superior to any spiritual intermediary. Both combat tendencies to diminish Christ\`s uniqueness.',
        },
      ],
    },

    {
      id: 'why',
      heading: 'Why Colossians Matters',
      body: [
        'Every generation faces the temptation to add something to Christ. In Colossae it was angel worship, calendar observances, and ascetic rules. In other times and places it has been rituals, experiences, political alignments, therapeutic practices, or spiritual techniques. The message of Colossians is always relevant: Christ is enough.',
        'The letter provides one of the clearest statements of Christ\`s cosmic significance. He is not merely a religious teacher or a spiritual guide; he is the one in whom all things were created, the one who holds the universe together, the one in whom all fullness dwells. Any christology smaller than this is too small.',
        'At the same time, Colossians is intensely practical. Because believers have died and risen with Christ, they are to put off anger, malice, and lying, and put on compassion, kindness, and forgiveness. The cosmic Christ has implications for how husbands treat wives, parents treat children, and masters treat slaves.',
        'The letter ends with a picture of the early church in action: letters being carried between cities, read aloud in house churches, exchanged with neighboring congregations. We see Tychicus journeying, Onesimus returning, Epaphras praying, Archippus fulfilling his ministry. The exalted Christ is at work through ordinary people in ordinary places.',
      ],
    },
  ],
};
