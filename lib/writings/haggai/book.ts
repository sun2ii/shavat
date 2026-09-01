import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Haggai: the ground a reader should be standing on before
 * the first verse. A prophet with four dated oracles and one question: why is
 * the LORD\`s house in ruins while you live in paneled houses?
 */
export const HAGGAI: BookOrientation = {
  slug: 'haggai',
  title: 'Haggai',
  subtitle: 'Consider Your Ways',
  scripture: 'Haggai 1–2',
  summary:
    'Four precisely dated oracles calling the returned exiles to rebuild the temple, with promises that God\`s presence and glory will fill it.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Haggai is the most precisely dated book in the Hebrew Bible. Every oracle carries a date: day, month, year of Darius the Persian king. The entire book spans four months in 520 BC. We know exactly when these words were spoken.',
        'The exiles have returned from Babylon. Cyrus allowed them to go home in 538 BC, eighteen years before Haggai speaks. They laid the foundation of the temple, then stopped. For nearly two decades the foundation has sat there, exposed to weather and weeds, while the people built their own houses.',
        'Haggai\`s message is simple: your priorities are backward. You say "the time has not yet come" to build the LORD\`s house, but you have found time to panel your own. Consider your ways.',
      ],
      figures: [
        {
          art: `  538 BC ──── Cyrus\`s decree, exiles return
    │           foundation laid
    │
    │         [ 18 years of nothing ]
    │
    ▼
  520 BC ──── HAGGAI SPEAKS
    │
    │    Aug 29 ─── First oracle: Consider your ways
    │    Sep 21 ─── Work begins
    │    Oct 17 ─── Second oracle: The latter glory
    │    Dec 18 ─── Third & fourth: Blessing begins
    │
    ▼
  516 BC ──── Temple completed`,
          caption: 'Four months of prophecy, four years to completion.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'The Babylonian exile ended when Persia conquered Babylon in 539 BC. Cyrus issued a decree allowing the Jews to return and rebuild their temple. About fifty thousand went back under Zerubbabel the governor and Joshua the high priest. They rebuilt the altar, offered sacrifices, and laid the foundation of the temple.',
        'Then they stopped. The Samaritans opposed them. The economy was struggling. The people said, "The time has not yet come to rebuild the house of the LORD." So they built their own houses instead, fine houses with paneled walls, while the temple site grew over with thorns.',
        'Haggai arrives in the second year of Darius I, eighteen years after the return. He has one message, delivered four times in four months. By the time he finishes, construction has resumed. Four years later, in 516 BC, the temple is complete.',
      ],
      entries: [
        {
          term: 'The return from exile',
          role: '538 BC',
          detail:
            'Cyrus\`s edict allowed the Jews to go home and rebuild. Not everyone went; many had built lives in Babylon. Those who returned found Jerusalem in ruins, the land occupied by others, and the work harder than expected.',
        },
        {
          term: 'Zerubbabel',
          role: 'governor and Davidic heir',
          detail:
            'Grandson of Jehoiachin, the king Nebuchadnezzar deported. He holds the Davidic line but rules only as a Persian-appointed governor. Haggai will speak remarkable words over him.',
        },
        {
          term: 'Joshua (Jeshua)',
          role: 'high priest',
          detail:
            'The religious leader alongside Zerubbabel the civil leader. Together they represent the two offices that will one day merge in the Messiah.',
        },
        {
          term: 'Darius I',
          role: 'Persian king',
          detail:
            'Came to power in 522 BC after a period of instability. His second year is 520 BC. He confirmed Cyrus\`s original decree and supported the rebuilding.',
        },
      ],
    },

    // ---------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'Haggai is built on four oracles, each with a precise date. The structure is rigid, almost bureaucratic: date, recipients, message. But within that frame, the oracles build from rebuke to promise.',
      ],
      figures: [
        {
          art: `   ORACLE ONE ─────── 1:1–15 ─────── Aug 29, 520
   │  "Consider your ways"
   │  Rebuke: You live in paneled houses; mine lies in ruins
   │  Response: The people obey (Sep 21)
   │
   ORACLE TWO ─────── 2:1–9 ─────── Oct 17, 520
   │  "The latter glory"
   │  Encouragement: This temple looks like nothing
   │  Promise: I will shake the nations; the glory will exceed Solomon\`s
   │
   ORACLE THREE ──── 2:10–19 ──── Dec 18, 520
   │  "From this day on"
   │  Illustration: Uncleanness spreads, holiness does not
   │  Promise: Blessing begins today
   │
   ORACLE FOUR ───── 2:20–23 ──── Dec 18, 520
      "My signet ring"
      Promise to Zerubbabel: I will make you like a signet ring`,
          caption: 'Four oracles, four dates, ascending hope.',
        },
      ],
      closing: [
        'Notice the movement: rebuke, then encouragement, then promise of blessing, then messianic hope. The book begins with "Consider your ways" and ends with a signet ring. Haggai compresses the whole arc of prophetic speech into thirty-eight verses.',
      ],
    },

    // ------------------------------------------------------------- characters
    {
      id: 'characters',
      heading: 'The People',
      figures: [
        {
          art: `       DARIUS (Persia)
           │
           │ appoints
           ▼
       ZERUBBABEL ════════════ JOSHUA
       governor                high priest
       Davidic line            priestly line
           │                       │
           └───────────┬───────────┘
                       │
                       ▼
                THE REMNANT
                returned exiles
                building houses, not temple`,
          caption: 'Two leaders, one people, one unfinished work.',
        },
      ],
      entries: [
        {
          term: 'Haggai',
          role: 'the prophet',
          detail:
            'We know almost nothing about him. He appears, delivers four oracles over four months, and vanishes from the record. He may have seen Solomon\`s temple before the exile, which would make him quite old. His name means "festal" or "my feast."',
        },
        {
          term: 'Zerubbabel',
          role: 'governor and hope',
          detail:
            'Son of Shealtiel, grandson of Jehoiachin. The Davidic line runs through him. God rejected Jehoiachin as a signet ring (Jeremiah 22:24); Haggai says God will make Zerubbabel a signet ring. The rejection is reversed.',
        },
        {
          term: 'Joshua',
          role: 'high priest',
          detail:
            'Son of Jehozadak, who was deported to Babylon. Joshua returned to rebuild both temple and priesthood. Zechariah will have more to say about him.',
        },
        {
          term: 'The remnant',
          role: 'the returned exiles',
          detail:
            'Those who came back from Babylon. They are discouraged, poor, and distracted. They have rebuilt their own houses while God\`s house lies in ruins. Haggai calls them to reconsider.',
        },
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Consider Your Ways',
          definition:
            'The repeated call to self-examination: look at what you are doing and what it is producing.',
          appears:
            '"Consider your ways" appears in 1:5 and 1:7. The phrase in Hebrew is literally "set your heart on your ways."',
          matters:
            'Haggai does not moralize; he points to evidence. You have sown much and harvested little. You earn wages and put them in a bag with holes. The drought is not random. Consider.',
        },
        {
          name: 'Priorities',
          definition:
            'The question of what gets built first, and what that reveals about the heart.',
          appears:
            '"Is it a time for you yourselves to dwell in your paneled houses, while this house lies in ruins?" (1:4)',
          matters:
            'The people said the time had not come to build God\`s house, but they found time for their own. Haggai exposes the excuse. They are not too busy; they are wrongly ordered.',
        },
        {
          name: 'The Presence of God',
          definition:
            'God\`s Spirit remains with the people despite their failure.',
          appears:
            '"My Spirit remains in your midst. Fear not" (2:5). The covenant promise from the exodus still holds.',
          matters:
            'The temple is not about manipulating God\`s presence but responding to it. God\`s Spirit is already there. The building is an act of recognition, not leverage.',
        },
        {
          name: 'The Latter Glory',
          definition:
            'The promise that the second temple will surpass the first.',
          appears:
            '"The latter glory of this house shall be greater than the former" (2:9).',
          matters:
            'This temple looked pathetic compared to Solomon\`s. The old men wept when they saw the foundation. Haggai says: wait. God will shake the nations, and the treasures will come. The glory is coming.',
        },
        {
          name: 'The Signet Ring',
          definition:
            'God\`s seal of authority, the mark of delegation.',
          appears:
            '"I will make you like a signet ring, for I have chosen you" (2:23).',
          matters:
            'God rejected Jehoiachin as a signet ring (Jeremiah 22:24). Now He reverses it with Zerubbabel. The Davidic line is not dead. The seal is being pressed again.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Haggai Sits in Scripture',
      entries: [
        {
          term: 'Zechariah',
          detail:
            'Haggai\`s contemporary, beginning to prophesy just two months later. The two books are a pair: Haggai focuses on building the temple; Zechariah unfolds the visions of what God is doing through it. Read them together.',
        },
        {
          term: 'Ezra',
          detail:
            'Ezra 5–6 narrates the same events from a historical angle. "The prophets Haggai and Zechariah prophesied to the Jews... Then Zerubbabel and Joshua arose and began to rebuild" (Ezra 5:1–2). Haggai shows the prophetic side of what Ezra reports.',
        },
        {
          term: 'Jeremiah 22:24',
          detail:
            'God says He would tear Jehoiachin off His hand like a signet ring. Haggai 2:23 reverses this: Zerubbabel will be like a signet ring. The curse on the line is lifted.',
        },
        {
          term: 'Hebrews 12:26',
          detail:
            'Hebrews quotes Haggai 2:6, "Yet once more I will shake not only the earth but also the heavens." The shaking continues; the kingdom that cannot be shaken is coming.',
        },
        {
          term: 'The Gospels',
          detail:
            'The second temple that Haggai calls them to build is the temple where Jesus will teach, cleanse, and say "Destroy this temple." The latter glory comes in a person.',
        },
      ],
      closing: [
        'Haggai is tiny but strategically placed. He stands at the hinge between exile and restoration, calling the people to act on what God has already made possible. The temple they build will stand for five hundred years, until another glory enters it.',
      ],
    },

    // --------------------------------------------------------------- consider
    {
      id: 'consider',
      heading: 'Consider Your Ways',
      body: [
        'The phrase appears twice, and it is the hinge of the book. Haggai does not merely command; he invites examination. Look at your life. Look at the results. Then think.',
      ],
      figures: [
        {
          art: `   WHAT YOU DID              WHAT HAPPENED
   ─────────────────────────────────────────
   Sowed much      ───────>   Harvested little
   Eat             ───────>   Never enough
   Drink           ───────>   Never filled
   Clothe          ───────>   Never warm
   Earn wages      ───────>   Bag with holes

   WHY?
   "Because of my house that lies in ruins,
    while each of you busies himself
    with his own house."
                              — Haggai 1:6, 9`,
          caption: 'The evidence trail.',
        },
      ],
      closing: [
        'Haggai\`s argument is empirical. He does not say "obey because God said so." He says "look at your life and explain the results." The harvest fails, the economy collapses, the bag leaks. Why? Because priorities are inverted. Fix the order, and the blessing flows.',
      ],
    },

    // --------------------------------------------------------------- glory
    {
      id: 'glory',
      heading: 'The Latter Glory',
      body: [
        'The second oracle addresses discouragement. The old men who remembered Solomon\`s temple wept when they saw this foundation. It was nothing by comparison. Haggai speaks to that grief.',
      ],
      figures: [
        {
          art: `   SOLOMON\`S TEMPLE          THIS TEMPLE
   ─────────────────────────────────────────
   Overlaid with gold         Modest stone
   Ark of the covenant        Ark lost
   Shekinah glory             ?
   Seven years building       Struggled start

   BUT:

   "The latter glory of this house
    shall be greater than the former,
    declares the LORD of hosts.

    And in this place I will give peace."
                              — Haggai 2:9`,
          caption: 'The comparison that misses the point.',
        },
      ],
      closing: [
        'How could this modest building surpass Solomon\`s golden temple? Haggai does not explain. He simply declares: the glory is coming. Five centuries later, an old man named Simeon held an infant in that temple and said, "My eyes have seen your salvation." The latter glory arrived in a person.',
      ],
    },

    // --------------------------------------------------------------- signet
    {
      id: 'signet',
      heading: 'The Signet Ring',
      body: [
        'The final oracle is addressed to Zerubbabel alone. It is brief, dense, and messianic. God will shake the heavens and the earth. He will overthrow thrones. And then:',
      ],
      figures: [
        {
          art: `   JEHOIACHIN (597 BC)
   │
   │  "Though Coniah... were the signet ring
   │   on my right hand, yet I would tear
   │   you off and give you into the hand
   │   of those who seek your life."
   │                        — Jeremiah 22:24
   │
   │  [ exiled to Babylon, line cursed ]
   │
   ▼
   ZERUBBABEL (520 BC)
   │
   │  "I will take you, O Zerubbabel...
   │   and make you like a signet ring,
   │   for I have chosen you."
   │                        — Haggai 2:23
   │
   │  [ curse reversed, line restored ]
   │
   ▼
   DAVID\`S THRONE
   │
   └──────> "Of the increase of his government
            and of peace there will be no end."`,
          caption: 'The ring taken off is put back on.',
        },
      ],
      closing: [
        'A signet ring carries the authority of the king. To be made a signet ring is to be invested with royal delegation. Zerubbabel was not a king; Persia ruled. But he carried the seed of David, and through him the line continued until it reached Bethlehem. The signet ring is still being pressed.',
      ],
    },
  ],
};
