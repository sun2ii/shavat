import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Jonah: the ground a reader should be standing on before
 * the first verse. A prophet who ran from God and then raged when God showed
 * mercy to the enemy.
 */
export const JONAH: BookOrientation = {
  slug: 'jonah',
  title: 'Jonah',
  subtitle: 'The Scandal of Grace',
  scripture: 'Jonah 1–4',
  summary:
    'A prophet flees from God, is swallowed by a fish, preaches to Israel\`s enemy, and becomes furious when they repent.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Jonah is unique among the prophets. The other books are collections of oracles; this one is a story about the prophet himself. We get eight verses of preaching and four chapters of narrative. The message is not what Jonah says; the message is what Jonah does, and what God does to Jonah.',
        'The structure is clean. Two cycles, two descents, two encounters with God. In the first half, Jonah runs from the command and sinks into the sea; in the second half, he obeys the command and sinks into despair. The fish saves him in chapter 2; the vine exposes him in chapter 4. Both times, God is teaching the same lesson.',
        'Read this book as comedy. Not because it lacks seriousness, but because it has the shape of comedy: the proud are humbled, the unlikely are exalted, and the ending is a question mark, not a period. Jonah is the butt of the joke, and he never gets it.',
      ],
      figures: [
        {
          art: `  COMMAND ──────────── "Go to Nineveh"
    │
    ▼
  FLIGHT ───────────── "But Jonah rose to flee"
    │                   down to Joppa, down into the ship,
    │                   down into the hold, down into the sea
    ▼
  FISH ─────────────── swallowed, prays, vomited out
    │
    ▼
  COMMAND ──────────── "Go to Nineveh" (again)
    │
    ▼
  OBEDIENCE ────────── "Jonah arose and went"
    │                   forty days and the city overturns
    ▼
  REPENTANCE ───────── Nineveh believes, king decrees fast
    │
    ▼
  GOD RELENTS ──────── "and God relented"
    │
    ▼
  JONAH\`S FURY ─────── "it is better for me to die"
    │
    ▼
  THE VINE ─────────── grows, withers, exposes
    │
    ▼
  THE QUESTION ─────── "Should I not pity Nineveh?"
                        (unanswered)`,
          caption: 'The whole book: two cycles of descent and divine intervention.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Jonah son of Amittai appears once in the historical books. In 2 Kings 14:25, he prophesies that Jeroboam II will restore the borders of Israel. This places him in the eighth century BC, a contemporary of Amos and Hosea. He is a northern prophet, and a successful one: his word came true.',
        'Nineveh was the capital of Assyria, Israel\`s existential threat. Within decades of Jonah\`s time, Assyria would conquer the northern kingdom and scatter its people. To ask a prophet to go to Nineveh is to ask him to preach to the enemy. The command is not just inconvenient; it is offensive.',
        'The book does not tell us when it was written. The story may come from the eighth century, or it may be told later about an eighth-century prophet. Either way, the point is theological, not chronological. The question is not "Did this happen?" but "What does it mean that God works this way?"',
      ],
      entries: [
        {
          term: 'Nineveh',
          role: 'the enemy city',
          detail:
            'The great city of Assyria, described as three days\` journey across and containing 120,000 who cannot tell their right hand from their left. Assyria was not a theoretical enemy; they were the empire that would destroy Israel. Nineveh is everything Israel fears and hates.',
        },
        {
          term: 'Tarshish',
          role: 'the opposite direction',
          detail:
            'Probably a Phoenician trading port at the western end of the Mediterranean, possibly in Spain. God says "Go east to Nineveh." Jonah buys a ticket west. The geography is the theology: he is running as far as ships can carry him.',
        },
        {
          term: 'Jeroboam II',
          role: 'the king Jonah served',
          detail:
            'The last great king of the northern kingdom. Under him, Israel reached its maximum extent since Solomon. Jonah had prophesied this expansion. He was a prophet of good news for Israel, which may explain his fury at good news for Nineveh.',
        },
        {
          term: 'Assyria',
          role: 'the empire',
          detail:
            'The superpower of the ancient Near East in the eighth and seventh centuries. Known for brutal warfare, mass deportations, and psychological terror. Their reliefs depict impaled captives and flayed prisoners. This is who God wants to save.',
        },
      ],
    },

    // ------------------------------------------------------------- characters
    {
      id: 'characters',
      heading: 'The People',
      figures: [
        {
          art: `        GOD ═══════════════════════════════════╗
         │                                      ║
    commands                             shows mercy to
         │                                      ║
         ▼                                      ▼
       JONAH ─── refuses ───▶ SAILORS ─── fear the LORD
         │                       │
    (finally obeys)          (throw him over)
         │                       │
         ▼                       ▼
      NINEVEH ◀──────────────────────────────────╝
         │
    repents in sackcloth
         │
         ▼
    GOD RELENTS ────────▶ JONAH RAGES

    Everyone in this book responds correctly except the prophet.`,
          caption: 'The structure of irony.',
        },
      ],
      entries: [
        {
          term: 'Jonah',
          role: 'the reluctant prophet',
          detail:
            'Son of Amittai, a prophet from Gath-hepher in the north. He knows the LORD is gracious and merciful, slow to anger and abounding in steadfast love (4:2), and that is precisely his problem. He does not want Nineveh to receive what Israel receives.',
        },
        {
          term: 'The sailors',
          role: 'the righteous pagans',
          detail:
            'Foreign sailors who fear the storm, pray to their gods, do everything possible to save Jonah, and finally call on the LORD when they throw him overboard. They offer sacrifices and make vows. They are more pious than the prophet.',
        },
        {
          term: 'The king of Nineveh',
          role: 'the repentant enemy',
          detail:
            'Unnamed, but his response is immediate and total. He rises from his throne, removes his robe, covers himself with sackcloth, sits in ashes, and decrees a fast for the entire city, including animals. He does what Israel\`s kings never did.',
        },
        {
          term: 'The Ninevites',
          role: 'the city that believed',
          detail:
            'The great enemy repents at a single sentence of preaching from a prophet who does not want them saved. Jesus will later say the men of Nineveh will rise at the judgment and condemn this generation, because they repented at the preaching of Jonah.',
        },
        {
          term: 'The fish',
          role: 'the divine rescue vehicle',
          detail:
            'The LORD appoints a great fish to swallow Jonah. The fish is not the punishment; it is the salvation. Three days in the belly, then vomited onto dry land. The fish is doing what Jonah will not: carrying God\`s prophet where he needs to go.',
        },
        {
          term: 'The plant',
          role: 'the object lesson',
          detail:
            'A plant that grows overnight to shade Jonah, then dies overnight when a worm attacks it. Jonah is furious. God\`s point: you pity a plant you did not make or grow. Should I not pity a city of 120,000 souls?',
        },
      ],
    },

    // ----------------------------------------------------------------- places
    {
      id: 'places',
      heading: 'The Geography',
      figures: [
        {
          art: `                       NINEVEH ◀────── GO HERE
                          ▲
                          │
                          │  (God\`s command)
                          │
                   ───────┼───────
                          │
                    ISRAEL (Jonah\`s home)
                          │
                          │
                       JOPPA ──────── Jonah boards ship
                          │
                          │
                          ▼
                      TARSHISH ◀────── RUN HERE
                    (far west)

    The geography is simple: God says east, Jonah goes west.
    The entire Mediterranean cannot hide him.`,
          caption: 'The flight.',
        },
      ],
      entries: [
        {
          term: 'Nineveh',
          detail:
            'On the Tigris River, in modern-day Iraq. The text says it is a three days\` journey across, which may mean circumference or may be hyperbole for greatness. The point is its enormity: too big to ignore, too wicked to tolerate, too far to walk without meaning it.',
        },
        {
          term: 'Joppa',
          detail:
            'The port city on the Mediterranean coast. Jonah goes down to Joppa, finds a ship, pays the fare, and goes down into the ship. The descent begins. Later, Peter will have a vision in Joppa about clean and unclean, and will go to the Gentiles.',
        },
        {
          term: 'Tarshish',
          detail:
            'The far western edge of the known world. Ships of Tarshish meant ocean-going vessels for long voyages. Jonah is buying a ticket to the end of the earth. He is not merely avoiding Nineveh; he is attempting to escape the presence of the LORD.',
        },
        {
          term: 'The sea',
          detail:
            'In Hebrew thought, the sea is chaos, the uncreated deep, the domain of monsters. Jonah goes down into it voluntarily. The LORD hurls a wind, the sailors hurl cargo, they finally hurl Jonah. But even the chaos obeys God. The sea grows quiet.',
        },
        {
          term: 'The belly of the fish',
          detail:
            'Three days and three nights in the dark. Jonah prays from the belly of Sheol, from the depths of the pit. The fish is simultaneously death and deliverance, grave and womb. When the fish vomits him out, it is resurrection.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The book divides into two parallel halves. Each begins with the word of the LORD, includes a descent, features pagan people responding better than the prophet, and ends with a question from God. The symmetry is deliberate.',
      ],
      figures: [
        {
          art: `   PART ONE: FLIGHT (1–2)         PART TWO: FURY (3–4)
   ─────────────────────         ─────────────────────
   1:1-2  Word of the LORD       3:1-2  Word of the LORD (again)
   1:3    Jonah flees            3:3    Jonah obeys
   1:4-16 Storm, sailors, sea    3:4-10 Preaching, repentance
   2:1-9  Prayer from the fish   4:1-3  Prayer of anger
   2:10   Vomited out            4:4    "Do you do well to be angry?"

                    The pattern continues:

   ─────────────────────         ─────────────────────
   Ch 1: Jonah goes DOWN         Ch 3: Jonah goes INTO
         into ship, hold, sea           into Nineveh
   Ch 2: Fish = rescue           Ch 4: Plant = lesson
         prayer = gratitude             prayer = rage
   End:  Sailors sacrifice       End:  Question unanswered`,
          caption: 'Two halves, same structure, opposite attitudes.',
        },
        {
          art: `   THE FOUR CHAPTERS:

   1  FLIGHT ─────────── Jonah runs from the command
                         sailors fear, pray, sacrifice
                         Jonah is thrown into the sea

   2  FISH ──────────── swallowed, prays, delivered
                        "Salvation belongs to the LORD"
                        vomited onto dry land

   3  NINEVEH ───────── Jonah preaches eight words
                        the city repents, king to commoner
                        God relents from disaster

   4  FURY ──────────── Jonah is angry enough to die
                        the plant, the worm, the sun
                        God\`s question hangs open`,
          caption: 'Chapter by chapter.',
        },
      ],
      closing: [
        'Notice the descent language in chapter 1: he went down to Joppa, down into the ship, down into the inner part, down into the sea, down to the roots of the mountains. Jonah is sinking. The fish interrupts the fall.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'The Scandal of Grace',
          definition:
            'God\`s mercy extends to those who do not deserve it, including and especially enemies.',
          appears:
            'The entire plot: God wants to save Nineveh, does save Nineveh, and defends saving Nineveh. Jonah\`s anger in chapter 4 is his refusal to accept this.',
          matters:
            'Grace is not grace if it only goes to those we approve of. Jonah understood God\`s character perfectly (4:2) and hated it. The book asks: do you?',
        },
        {
          name: 'The Reluctant Prophet',
          definition:
            'A messenger who does not want his message to succeed.',
          appears:
            'Jonah\`s flight (ch 1), his minimalist preaching (ch 3), and his fury at the outcome (ch 4). He is the only prophet who tries to quit, and the only one angry when his message works.',
          matters:
            'The prophet is not the point. God can use a resentful messenger, a eight-word sermon, and a pagan city to accomplish His will. Jonah\`s rebellion changes nothing except Jonah.',
        },
        {
          name: 'Descent and Deliverance',
          definition:
            'The pattern of sinking into death and being brought back up.',
          appears:
            'Chapter 1: down to Joppa, into the ship, into the hold, into the sea, into the fish. Chapter 2: out of Sheol, out of the pit, up from the depths. The language is deliberate.',
          matters:
            'Jesus will cite Jonah as a sign: three days in the heart of the earth, then resurrection. The fish is a grave that gives back its dead.',
        },
        {
          name: 'Pagan Righteousness',
          definition:
            'Gentiles responding to God better than God\`s own prophet.',
          appears:
            'The sailors fear, pray, and sacrifice. The Ninevites fast, repent, and turn from violence. Jonah sleeps in the storm and sulks after the revival. Everyone except Jonah gets it right.',
          matters:
            'The irony indicts Israel. If Nineveh repents at one sentence, what excuse has Israel for generations of prophets? The outsiders shame the insider.',
        },
        {
          name: 'The God Who Relents',
          definition:
            'Divine judgment is conditional; repentance changes outcomes.',
          appears:
            'God relents from the disaster He planned (3:10). Jonah knew this would happen (4:2). The threat was real, but it was not inevitable.',
          matters:
            'Prophecy of judgment is not fate; it is warning. Nineveh took the warning seriously and avoided the disaster. Jonah wanted prophecy to be fate.',
        },
        {
          name: 'The Unanswered Question',
          definition:
            'The book ends with a question from God that Jonah does not answer.',
          appears:
            '4:11: "Should I not pity Nineveh, that great city, in which there are more than 120,000 persons who do not know their right hand from their left, and also much cattle?"',
          matters:
            'The question hangs in the air because it is directed at the reader. Jonah\`s answer does not matter. Yours does.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Jonah Sits in Scripture',
      entries: [
        {
          term: 'Jesus and the sign of Jonah',
          detail:
            'In Matthew 12:39-41, Jesus says an evil generation seeks a sign, but no sign will be given except the sign of Jonah. As Jonah was three days in the fish, so the Son of Man will be three days in the heart of the earth. And the men of Nineveh will rise at the judgment and condemn this generation.',
        },
        {
          term: 'The Exodus formula',
          detail:
            'Jonah 4:2 quotes Exodus 34:6: "gracious and merciful, slow to anger and abounding in steadfast love." This is the core confession of Israel\`s faith. Jonah\`s complaint is that God acts like Himself.',
        },
        {
          term: 'Nahum',
          detail:
            'Another prophet to Nineveh, but with opposite message. Nahum pronounces doom on Nineveh a century later. The city that repented under Jonah reverted and was destroyed in 612 BC. The books are paired: mercy offered, mercy rejected.',
        },
        {
          term: 'Elijah',
          detail:
            'Jonah echoes Elijah. Both flee into the wilderness, both want to die (1 Kings 19:4, Jonah 4:3), both sit under plants. But Elijah flees after success; Jonah flees from success. Elijah wants Israel saved; Jonah does not want Nineveh saved.',
        },
        {
          term: 'The Psalms',
          detail:
            'Jonah\`s prayer in chapter 2 is a pastiche of psalm language: "out of my distress I called to the LORD," "the waters closed in over me," "my prayer came to you." He knows the right words. His heart is another matter.',
        },
        {
          term: 'Acts 10',
          detail:
            'Peter\`s vision in Joppa, the same port Jonah fled from. Peter is told to go to Gentiles he considers unclean. The Jonah pattern continues: reluctant prophet, shocked that God includes outsiders.',
        },
      ],
      closing: [
        'Jonah sits in the Book of the Twelve between Obadiah (judgment on Edom) and Micah (judgment and hope for Israel). Its placement asks a question: what happens when God offers to outsiders what Israel assumed was only for them?',
      ],
    },

    // ------------------------------------------------------------ irony
    {
      id: 'irony',
      heading: 'The Irony',
      body: [
        'Jonah is the most ironic book in the Bible. The comedy is theological. Every expectation is reversed, and the prophet is always wrong.',
      ],
      figures: [
        {
          art: `   EXPECTATION                      REALITY
   ───────────────────────────────────────────────────
   Prophet obeys                    Prophet runs
   Pagans are enemies               Pagans repent and worship
   Prophet wants mission success    Prophet wants mission failure
   Nineveh is destroyed             Nineveh is spared
   Prophet rejoices at mercy        Prophet rages at mercy
   Plant dies, minor loss           Jonah mourns the plant
   City saved, 120,000 souls        Jonah ignores the city

   WHO RESPONDS CORRECTLY?

   ✓ Sailors ─── fear, pray, sacrifice
   ✓ Fish ───── obeys, carries, delivers
   ✓ Ninevites ─ repent from king to cattle
   ✓ Plant ──── grows when appointed
   ✓ Worm ──── attacks when appointed
   ✓ Sun ───── beats when appointed
   ✗ Jonah ─── runs, sulks, rages, refuses`,
          caption: 'Everything in the book obeys God except the prophet.',
        },
      ],
      closing: [
        'The fish obeys. The storm obeys. The plant, the worm, and the scorching wind obey. The pagan sailors obey. The wicked Ninevites obey. Only the prophet of the LORD resists. The irony is the message: Israel is more rebellious than the nations it despises.',
      ],
    },

    // ------------------------------------------------------------ the prayer
    {
      id: 'prayer',
      heading: 'Jonah\`s Prayer',
      body: [
        'Chapter 2 contains a psalm of thanksgiving, prayed from inside the fish. It sounds pious. It uses all the right language. But notice what it does not say.',
      ],
      figures: [
        {
          art: `   "I called out to the LORD, out of my distress,
        and he answered me;
    out of the belly of Sheol I cried,
        and you heard my voice.

    For you cast me into the deep,
        into the heart of the seas...
    The waters closed in over me to take my life;
        the deep surrounded me;
    weeds were wrapped about my head
        at the roots of the mountains.

    I went down to the land whose bars closed upon me forever;
        yet you brought up my life from the pit,
        O LORD my God...

    Salvation belongs to the LORD!"

                                    — Jonah 2:2–9 (selected)`,
          caption: 'A psalm of rescue, but no word of repentance.',
        },
      ],
      closing: [
        'The prayer is theologically correct but morally incomplete. Jonah thanks God for rescue but never confesses the reason he needed rescuing. He never mentions the command he disobeyed. He never mentions Nineveh. "Salvation belongs to the LORD" is true, but Jonah does not yet understand what that means for his enemies.',
      ],
    },

    // ------------------------------------------------------------ the ending
    {
      id: 'ending',
      heading: 'The Unanswered Question',
      body: [
        'The book ends with God asking Jonah a question. Jonah does not answer. The silence is the point.',
      ],
      figures: [
        {
          art: `   JONAH\`S COMPLAINT:

   "I knew it. I knew you would do this.
    That\`s why I ran.
    You are gracious and merciful,
    slow to anger and abounding in steadfast love.
    You relent from disaster.

    Therefore kill me now.
    It is better for me to die than to live."

   GOD\`S QUESTION:

   "You pity the plant,
    for which you did not labor,
    which came into being in a night
    and perished in a night.

    And should I not pity Nineveh,
    that great city,
    in which there are more than 120,000 persons
    who do not know their right hand from their left,
    and also much cattle?"

                                    (no response)
                                    (the book ends)
                                    (silence)`,
          caption: 'The question is still open.',
        },
      ],
      closing: [
        'God does not answer Jonah\`s arguments. He asks a question and waits. Should I not pity Nineveh? The logic is simple: if you pity a plant, should I not pity a city? But the question cuts deeper. It asks whether Jonah\`s God is big enough. Whether Israel\`s God belongs only to Israel. Whether mercy has boundaries. The book refuses to close the question because the question is for every reader who thinks they know who deserves grace.',
      ],
    },

    // ------------------------------------------------------------ reading
    {
      id: 'reading',
      heading: 'How to Read This Book',
      body: [
        'Read Jonah as theology in story form. The narrative carries the argument. Every detail matters.',
      ],
      figures: [
        {
          art: `   THE QUESTION JONAH FORCES:

   ┌─────────────────────────────────────────────────────┐
   │  Do you believe God should save your enemies?       │
   │                                                     │
   │  Not:  "Could God save them?"                       │
   │  Not:  "Might God save them?"                       │
   │  But:  "Do you want God to save them?"              │
   │                                                     │
   │  Jonah\`s answer: No.                                │
   │  God\`s answer:   I already did.                     │
   │  Your answer:    ?                                  │
   └─────────────────────────────────────────────────────┘`,
          caption: 'The book is a mirror.',
        },
      ],
      closing: [
        'The humor is intentional. The absurdity is intentional. A prophet running from God, sleeping through a storm, swallowed by a fish, preaching eight words, furious at success, mourning a plant while ignoring a city. The comedy makes the point. Jonah is ridiculous. And so is anyone who reads this book and still thinks grace has limits.',
      ],
    },
  ],
};
