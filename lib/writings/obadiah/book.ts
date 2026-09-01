import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Obadiah: the ground a reader should be standing on before
 * the first verse. A single oracle against a brother nation that betrayed its kin.
 */
export const OBADIAH: BookOrientation = {
  slug: 'obadiah',
  title: 'Obadiah',
  subtitle: 'The Brotherhood Broken',
  scripture: 'Obadiah 1–21',
  summary:
    'God\`s judgment on Edom for standing with Jerusalem\`s enemies when she fell, and the promise that Zion will rise while Esau\`s mountain burns.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Obadiah is the shortest book in the Old Testament: twenty-one verses, one chapter, one oracle. No narrative frame, no superscription beyond a name, no call story. Just a word against Edom.',
        'The brevity is appropriate. This is not a book that develops an argument; it is a verdict. Edom stood by when Jerusalem fell. Worse, they gloated, looted, and cut off refugees. The brotherhood of Esau and Jacob, already strained across Genesis, finally snapped. God saw.',
        'Read this book as a legal ruling. The charges are specific. The sentence is total. And at the end, a reversal: the survivors of Israel will possess the mountains of Esau.',
      ],
      figures: [
        {
          art: `  THE STRUCTURE
  ─────────────
  vv. 1–4    Edom\`s pride
             "though you soar like the eagle"

  vv. 5–9    Edom\`s destruction
             thieves, grape-gatherers, allies

  vv. 10–14  Edom\`s crime
             "you stood aloof"
             "you should not have..."

  vv. 15–21  The Day of the LORD
             nations judged, Zion restored
             "the kingdom shall be the LORD\`s"`,
          caption: 'Twenty-one verses, four movements.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'The event behind Obadiah is almost certainly the fall of Jerusalem in 586 BC. Babylon breached the walls, burned the temple, and deported the population. Edom, Israel\`s neighbor to the southeast, did not merely watch. They participated.',
        'The Edomites blocked escape routes, handed over fugitives, and looted the ruins. Psalm 137 remembers this: "Remember, O LORD, against the Edomites the day of Jerusalem, how they said, \`Lay it bare, lay it bare, down to its foundations!\`" Lamentations and Ezekiel confirm the bitterness.',
        'But the wound goes deeper than 586. Edom descends from Esau, Jacob\`s twin brother. These are not strangers but relatives. The betrayal at Jerusalem is the final chapter of a rivalry that began in the womb.',
      ],
      entries: [
        {
          term: 'Edom',
          role: 'the accused',
          detail:
            'The nation descended from Esau, Jacob\`s brother. They occupied the mountainous region south of the Dead Sea, with their capital at Sela (later Petra). Their terrain was rugged, their fortresses carved into cliffs, their pride legendary.',
        },
        {
          term: 'The fall of Jerusalem',
          role: '586 BC',
          detail:
            'Nebuchadnezzar of Babylon destroyed Jerusalem after a long siege. The temple was burned, the walls broken, the king blinded and taken in chains. The population was deported. This is the catastrophe behind Obadiah.',
        },
        {
          term: 'The brotherhood',
          role: 'Esau and Jacob',
          detail:
            'Jacob and Esau were Isaac\`s twin sons. Esau sold his birthright, Jacob stole the blessing. They reconciled awkwardly in Genesis 33, but their descendants remained rivals. Edom refused Israel passage during the exodus. The hostility was ancient.',
        },
      ],
    },

    // ------------------------------------------------------------ characters
    {
      id: 'characters',
      heading: 'The Nations',
      figures: [
        {
          art: `        ESAU ═══════════════ JACOB
          │      brothers       │
          │      rivals         │
          │                     │
          ▼                     ▼
        EDOM                 ISRAEL
          │                     │
          │                     │
      Mount Seir            Mount Zion
          │                     │
          ▼                     ▼
       JUDGED               RESTORED`,
          caption: 'The twin brothers become twin nations.',
        },
      ],
      entries: [
        {
          term: 'Edom',
          role: 'the proud brother',
          detail:
            'Confident in mountain fortresses, trusting in allies, wise in their own eyes. Obadiah describes them nesting among the stars, thinking no one can bring them down. Their pride is the first charge.',
        },
        {
          term: 'Israel / Jacob',
          role: 'the wounded brother',
          detail:
            'The nation that fell to Babylon, whose refugees Edom cut off, whose goods Edom looted. In Obadiah, they are victims, but the book ends with their restoration. They will possess Edom\`s mountains.',
        },
        {
          term: 'The nations',
          role: 'also judged',
          detail:
            'Edom is not alone. The Day of the LORD is near "upon all the nations." Edom is the representative case, but the judgment expands.',
        },
      ],
    },

    // ----------------------------------------------------------------- places
    {
      id: 'places',
      heading: 'The Geography',
      figures: [
        {
          art: `                JERUSALEM
                Mount Zion
                    │
                    │  fell in 586 BC
                    │
        ────────────┼────────────
                    │
                    │  refugees fled south
                    │
                    ▼
                THE NEGEV
                    │
                    │  Edom cut them off
                    │
                    ▼
              MOUNT SEIR / EDOM
              cliffs, fortresses
              "the clefts of the rock"
              Sela = Petra`,
          caption: 'The geography of betrayal.',
        },
      ],
      entries: [
        {
          term: 'Mount Seir',
          detail:
            'The mountainous region where Edom dwelt. Rugged terrain with narrow passes and cliff fortresses. The geography bred overconfidence: who could reach them?',
        },
        {
          term: 'Sela',
          detail:
            'The rock city, likely later Petra. Carved into rose-red cliffs, accessible only through narrow gorges. The name means "rock" or "cliff."',
        },
        {
          term: 'Mount Zion',
          detail:
            'Jerusalem\`s hill, where the temple stood. In Obadiah\`s vision, survivors will return there. "On Mount Zion there shall be those who escape, and it shall be holy."',
        },
        {
          term: 'The Negev',
          detail:
            'The southern desert region. Israelites fleeing Jerusalem would have passed through here, where Edom intercepted them.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'Obadiah moves in four stages: pride exposed, destruction announced, crime enumerated, and restoration promised. The logic is tight. Pride leads to crime, crime to judgment, judgment to reversal.',
      ],
      figures: [
        {
          art: `   I. EDOM\`S PRIDE EXPOSED (vv. 1–4)
   ─────────────────────────────────
   "The pride of your heart has deceived you"
   "You who live in the clefts of the rock"
   "Though you soar aloft like the eagle"
   "I will bring you down"

   II. EDOM\`S DESTRUCTION ANNOUNCED (vv. 5–9)
   ─────────────────────────────────
   Worse than thieves (who leave something)
   Worse than grape-gatherers (who leave gleanings)
   Esau will be stripped bare
   Allies will deceive, wisdom will fail
   Warriors will be dismayed

   III. EDOM\`S CRIME ENUMERATED (vv. 10–14)
   ─────────────────────────────────
   "Because of violence to your brother Jacob"
   Eight accusations, each beginning:
     "You should not have..."
   The crime: standing by, gloating, looting, betraying

   IV. THE DAY OF THE LORD (vv. 15–21)
   ─────────────────────────────────
   The LORD\`s day is near upon all nations
   "As you have done, it shall be done to you"
   Zion will be holy
   Jacob will possess Esau
   "The kingdom shall be the LORD\`s"`,
          caption: 'The four movements.',
        },
      ],
      closing: [
        'Notice how the eight accusations in verses 10 through 14 all begin with "you should not have." The repetition hammers the point: Edom knew what brotherhood required and chose otherwise. Each accusation is specific. This is not vague moral failure; it is documented betrayal.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Pride Before the Fall',
          definition:
            'The deception of thinking position makes you invulnerable.',
          appears:
            'Verses 1 through 4: Edom trusts in cliffs, altitude, fortresses. "The pride of your heart has deceived you."',
          matters:
            'Pride is self-deception. Edom looked at geography and saw safety. God looked at hearts and saw targets.',
        },
        {
          name: 'Brotherhood Betrayed',
          definition:
            'The special guilt of harming kin when they are most vulnerable.',
          appears:
            '"Because of violence to your brother Jacob" (v. 10). The word "brother" echoes throughout.',
          matters:
            'Edom\`s crime is not merely cruelty but treachery. Strangers might be excused; brothers cannot. The covenant of kinship makes the betrayal worse.',
        },
        {
          name: 'The Day of the LORD',
          definition:
            'The moment when God intervenes to judge and restore.',
          appears:
            'Verse 15: "The day of the LORD is near upon all the nations."',
          matters:
            'Obadiah connects Edom\`s particular judgment to a universal day. What happens to Edom previews what happens to all proud nations.',
        },
        {
          name: 'Lex Talionis',
          definition:
            'The principle of proportional justice: as you have done, so it shall be done to you.',
          appears:
            '"As you have done, it shall be done to you; your deeds shall return on your own head" (v. 15).',
          matters:
            'The punishment fits the crime. Edom gloated; Edom will be shamed. Edom looted; Edom will be stripped. The mirror reverses.',
        },
        {
          name: 'Zion Restored',
          definition:
            'The promise that God\`s people will return, possess, and reign.',
          appears:
            'Verses 17 through 21: "On Mount Zion there shall be those who escape... The kingdom shall be the LORD\`s."',
          matters:
            'The book does not end with Edom\`s destruction but with Israel\`s restoration. Judgment is penultimate; the kingdom is final.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Obadiah Sits in Scripture',
      entries: [
        {
          term: 'Genesis 25 and 27',
          detail:
            'The story of Esau and Jacob: twins struggling in the womb, the birthright sold, the blessing stolen, the hostility kindled. Obadiah is the final chapter of that story.',
        },
        {
          term: 'Numbers 20',
          detail:
            'When Israel asked to pass through Edom during the exodus, Edom refused and came out with a large army. The hostility was already there.',
        },
        {
          term: 'Psalm 137',
          detail:
            '"Remember, O LORD, against the Edomites the day of Jerusalem." The same memory, the same wound, the same cry for justice.',
        },
        {
          term: 'Jeremiah 49',
          detail:
            'Jeremiah\`s oracle against Edom shares language with Obadiah. Either one quoted the other, or both drew from common tradition. The message is the same: Edom will fall.',
        },
        {
          term: 'Ezekiel 25 and 35',
          detail:
            'Ezekiel also pronounces judgment on Edom for rejoicing over Israel\`s fall. "Because Mount Seir said, \`These two nations shall be mine,\` I will make you desolate."',
        },
        {
          term: 'Amos 1:11',
          detail:
            '"Because he pursued his brother with the sword and cast off all pity." Amos, a century earlier, already sees the pattern.',
        },
        {
          term: 'Malachi 1:2–5',
          detail:
            '"I have loved Jacob but Esau I have hated." Malachi looks back at Edom\`s desolation as evidence of God\`s covenant love for Israel.',
        },
      ],
      closing: [
        'Obadiah stands among the Book of the Twelve as a compact judgment oracle. Its brevity belies its weight. The brotherhood of Esau and Jacob, one of Scripture\`s oldest rivalries, reaches its final verdict here.',
      ],
    },

    // ------------------------------------------------------------ the charges
    {
      id: 'charges',
      heading: 'The Eight Accusations',
      body: [
        'The heart of Obadiah is verses 10 through 14, where the prophet lists what Edom did when Jerusalem fell. Each charge begins with "you should not have." The grammar is past tense but reads as present shame.',
      ],
      figures: [
        {
          art: `   "You should not have..."
   ─────────────────────────

   1. GLOATED over your brother
      in the day of his misfortune

   2. REJOICED over the people of Judah
      in the day of their ruin

   3. BOASTED
      in the day of distress

   4. ENTERED the gate of my people
      in the day of their calamity

   5. GLOATED over his disaster
      in the day of his calamity

   6. LOOTED his wealth
      in the day of his calamity

   7. STOOD at the crossroads
      to cut off his fugitives

   8. DELIVERED UP his survivors
      in the day of distress`,
          caption: 'Eight failures of brotherhood, each remembered.',
        },
      ],
      closing: [
        'The repetition is relentless. "In the day of" appears again and again. Edom\`s crimes are dated. They happened when Israel was weakest. That timing is the charge.',
      ],
    },

    // ------------------------------------------------------------ the reversal
    {
      id: 'reversal',
      heading: 'The Reversal',
      body: [
        'Obadiah ends not with destruction but with restoration. The house of Jacob will be fire, the house of Esau stubble. Mount Zion will possess the mountains of Esau. The dispossessed will possess.',
      ],
      figures: [
        {
          art: `   BEFORE                    AFTER
   ──────                    ─────

   Edom in the heights       Edom brought down
   Israel in ruins           Israel on Mount Zion

   Esau possesses            Jacob possesses Esau
   Jacob scattered           Jacob fires, Esau stubble

   Edom among nations        No survivor for Esau
   Israel exiled             "The kingdom shall be
                              the LORD\`s"`,
          caption: 'The reversal is total.',
        },
      ],
      closing: [
        'The final verse is the theological center: "The kingdom shall be the LORD\`s." This is not merely Israel\`s victory over Edom. It is God\`s sovereignty over all nations. Obadiah, for all its brevity, ends with eschatology. The Day of the LORD resolves into the kingdom of God.',
      ],
    },
  ],
};
