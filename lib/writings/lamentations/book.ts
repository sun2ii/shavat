import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Lamentations: five poems of grief over Jerusalem\`s
 * destruction, written in acrostic form. A funeral for a city.
 */
export const LAMENTATIONS: BookOrientation = {
  slug: 'lamentations',
  title: 'Lamentations',
  subtitle: 'The Funeral of a City',
  scripture: 'Lamentations 1\u20135',
  summary:
    'Five acrostic poems mourning the destruction of Jerusalem, where grief itself becomes an offering to God.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Lamentations is a funeral. Jerusalem has fallen. The Babylonians have destroyed the temple, torn down the walls, and carried the people into exile. This book is what remains: five poems of raw grief, written to be sung over ruins.',
        'The form is as important as the content. Four of the five chapters are acrostics, each verse beginning with the next letter of the Hebrew alphabet. This is not ornament; it is discipline. When grief is overwhelming, the alphabet provides structure. You cannot say everything, but you can say something under each letter. The form contains the chaos.',
        'Read this book slowly. It is not argument; it is weeping. The theology emerges from the grief, not the other way around. Somewhere in chapter 3, hope appears, but it appears inside the darkness, not as an escape from it.',
      ],
      figures: [
        {
          art: `  FALL OF JERUSALEM (586 BC)
    │
    ▼
  CHAPTER 1 ....... How lonely sits the city
    │              the widow weeps
    │
  CHAPTER 2 ....... The Lord has destroyed
    │              anger poured out
    │
  CHAPTER 3 ....... I am the man who has seen affliction
    │              BUT his mercies are new every morning
    │              the center of the book
    │
  CHAPTER 4 ....... Gold has grown dim
    │              the precious sons
    │
  CHAPTER 5 ....... Remember, O Lord
                   a prayer for restoration`,
          caption: 'Five poems. Chapter 3 is the hinge.',
        },
      ],
    },

    // ---------------------------------------------------------------- form
    {
      id: 'form',
      heading: 'The Acrostic Structure',
      body: [
        'The Hebrew alphabet has 22 letters. Chapters 1, 2, and 4 have 22 verses, one for each letter. Chapter 3 has 66 verses: three verses for each letter, making it the longest and densest poem. Chapter 5 has 22 verses but abandons the acrostic pattern, as if grief has finally exhausted even the alphabet.',
        'This structure is not visible in English translation, but it shapes everything. The acrostic says: we will mourn through the whole alphabet, from aleph to tav, from A to Z. Nothing will be left unsaid. The form is a container for total grief.',
      ],
      figures: [
        {
          art: `   CHAPTER 1    22 verses    acrostic (1 verse per letter)
   CHAPTER 2    22 verses    acrostic (1 verse per letter)
   CHAPTER 3    66 verses    triple acrostic (3 verses per letter)
   CHAPTER 4    22 verses    acrostic (1 verse per letter)
   CHAPTER 5    22 verses    NOT acrostic (prayer)

   Total: 154 verses
   Chapter 3 is exactly at the center
   and exactly triple the intensity`,
          caption: 'The architecture of grief.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'In 586 BC, Nebuchadnezzar of Babylon destroyed Jerusalem. The siege had lasted eighteen months. When the walls finally fell, the Babylonians burned the temple Solomon had built, tore down the city walls, and carried the surviving population into exile. The Davidic kingdom ended. The place where God had put His name became rubble.',
        'This was not just political catastrophe; it was theological crisis. The temple was supposed to be inviolable. God dwelt there. The Davidic line was supposed to last forever. Prophets had warned this would happen, but warnings do not make the event bearable. Lamentations is what happens after the prophets are proven right and everyone wishes they had been wrong.',
        'Tradition attributes the book to Jeremiah, who prophesied throughout the siege and watched the city fall. Whether or not he wrote it, the book comes from someone who was there, who saw the smoke and heard the screaming, who watched children die of hunger in the streets.',
      ],
      entries: [
        {
          term: 'The siege',
          role: 'eighteen months',
          detail:
            'Nebuchadnezzar besieged Jerusalem from 588 to 586 BC. Inside the walls, famine reached the point where mothers ate their children (2:20, 4:10). The horror of the siege is remembered throughout the book.',
        },
        {
          term: 'The temple',
          role: 'destroyed',
          detail:
            'Solomon\`s temple, standing for nearly 400 years, was burned to the ground. The ark of the covenant disappeared from history. The place where heaven met earth became ash.',
        },
        {
          term: 'The exile',
          role: 'Babylon',
          detail:
            'The survivors were marched to Babylon, where they would remain for seventy years. Psalm 137 captures the exile: "By the waters of Babylon, there we sat down and wept."',
        },
        {
          term: 'Jeremiah',
          role: 'traditional author',
          detail:
            'The prophet who warned Judah for forty years, who was imprisoned for his message, who watched everything he predicted come true. Whether or not he wrote Lamentations, he wept over it.',
        },
      ],
    },

    // ---------------------------------------------------------------- voices
    {
      id: 'voices',
      heading: 'The Voices',
      body: [
        'The book speaks in multiple voices. Sometimes a narrator describes Jerusalem; sometimes Jerusalem herself speaks in the first person; sometimes an individual man speaks from the pit. The voices blur because the grief is shared.',
      ],
      figures: [
        {
          art: `   CHAPTER 1     narrator ──► "How lonely sits the city"
                      │
                      └──► Jerusalem speaks: "Is it nothing to you?"

   CHAPTER 2     narrator ──► "The Lord has destroyed"
                      │
                      └──► Jerusalem addressed: "What can I say to you?"

   CHAPTER 3     "I am the man" ──► individual sufferer
                      │
                      └──► voice of hope: "His mercies are new"

   CHAPTER 4     narrator ──► "How the gold has grown dim"

   CHAPTER 5     collective "we" ──► "Remember, O Lord"`,
          caption: 'The voices shift, but the grief is one.',
        },
      ],
      entries: [
        {
          term: 'The narrator',
          role: 'observer',
          detail:
            'Describes Jerusalem in the third person, cataloging her suffering like a witness at a funeral. Sees the destruction from outside.',
        },
        {
          term: 'Daughter Zion',
          role: 'the city personified',
          detail:
            'Jerusalem speaks as a woman, a widow, a mother who has lost her children. "Look and see if there is any sorrow like my sorrow." The city has a voice.',
        },
        {
          term: 'The man',
          role: 'representative sufferer',
          detail:
            'Chapter 3 opens "I am the man who has seen affliction." This may be Jeremiah, or every exile, or a type of Christ. The singular voice carries collective weight.',
        },
        {
          term: 'The community',
          role: 'collective prayer',
          detail:
            'Chapter 5 shifts to "we." The community speaks together, asking God to remember. The funeral ends with congregational prayer.',
        },
      ],
    },

    // ---------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The five chapters form a chiastic structure, with chapter 3 as the center. Chapters 1 and 5 correspond (individual and communal responses to suffering); chapters 2 and 4 correspond (the Lord\`s judgment and its effects). Chapter 3 stands alone at the center, where despair turns to hope.',
      ],
      figures: [
        {
          art: `   A  CHAPTER 1   The widow weeps
                     Jerusalem speaks, seeks comfort

      B  CHAPTER 2   The Lord has destroyed
                     Divine anger, total devastation

         C  CHAPTER 3   THE CENTER
                        Affliction ──► Despair ──► HOPE ──► Prayer
                        "His mercies are new every morning"

      B\` CHAPTER 4   Gold has grown dim
                     Results of judgment, leaders failed

   A\` CHAPTER 5   Remember, O Lord
                     Community speaks, seeks restoration`,
          caption: 'Chapter 3 is the fulcrum.',
        },
        {
          art: `   1:1–11   Jerusalem\`s misery described
   1:12–22  Jerusalem speaks: "Is it nothing to you?"

   2:1–10   God\`s wrath described
   2:11–19  The poet responds, calls Jerusalem to cry out
   2:20–22  Jerusalem cries out to God

   3:1–18   The man\`s affliction
   3:19–39  HOPE: steadfast love, faithfulness, mercy
   3:40–47  Call to repentance and lament
   3:48–66  Return to grief and prayer for vindication

   4:1–10   The suffering of the siege
   4:11–16  Divine wrath and human failure
   4:17–20  False hopes that failed
   4:21–22  Judgment on Edom, promise to Zion

   5:1–18   Description of present misery
   5:19–22  Final plea to God`,
          caption: 'The five poems in detail.',
        },
      ],
    },

    // ---------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Theodicy in Reverse',
          definition:
            'Rather than asking "Why do the righteous suffer?", Lamentations confesses "We deserved this."',
          appears:
            '"The Lord is in the right, for I have rebelled against his word" (1:18); "The Lord has done what he purposed" (2:17).',
          matters:
            'The book does not protest innocence. It grieves while acknowledging that God\`s judgment is just. This is not fatalism; it is confession.',
        },
        {
          name: 'The Faithfulness of God',
          definition:
            'Even in judgment, God\`s steadfast love does not cease.',
          appears:
            '"The steadfast love of the LORD never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness" (3:22\u201323).',
          matters:
            'This is the hinge of the book. Hope is not denial of suffering but trust in God\`s character through suffering.',
        },
        {
          name: 'Grief as Worship',
          definition:
            'Lament offered to God is itself an act of faith.',
          appears:
            'The entire book is addressed to God or spoken in God\`s presence. The weeping is not private; it is liturgical.',
          matters:
            'Taking grief to God rather than away from God is the book\`s fundamental posture. Complaint becomes prayer.',
        },
        {
          name: 'Corporate Suffering',
          definition:
            'The community suffers together and must grieve together.',
          appears:
            'The shift from singular to plural throughout the book; chapter 5\`s communal "we."',
          matters:
            'Lamentations is not just personal; it is national. The grief is shared, and the restoration must be shared.',
        },
        {
          name: 'Memory',
          definition:
            'Asking God to remember is asking God to act.',
          appears:
            '"Remember, O LORD, what has befallen us; look, and see our disgrace!" (5:1).',
          matters:
            'To remember is not merely to recall but to respond. The final prayer asks God to see and to act.',
        },
      ],
    },

    // ---------------------------------------------------------------- chapter3
    {
      id: 'chapter3',
      heading: 'The Heart of Lamentations',
      body: [
        'Chapter 3 is the center of the book in every sense. It is three times the density of the other poems. It moves from the deepest despair to the clearest hope and back into grief. The hope does not resolve the pain; it sustains through the pain.',
      ],
      figures: [
        {
          art: `   "I am the man who has seen affliction
        under the rod of his wrath;
    he has driven and brought me
        into darkness without any light...

    He has made my teeth grind on gravel,
        and made me cower in ashes;
    my soul is bereft of peace;
        I have forgotten what happiness is;
    so I say, \`My endurance has perished;
        so has my hope from the LORD.\`"

                                  — Lamentations 3:1\u20132, 16\u201318`,
          caption: 'The descent.',
        },
        {
          art: `   "But this I call to mind,
        and therefore I have hope:

    The steadfast love of the LORD never ceases;
        his mercies never come to an end;
    they are new every morning;
        great is your faithfulness.
    \`The LORD is my portion,\` says my soul,
        \`therefore I will hope in him.\`

    The LORD is good to those who wait for him,
        to the soul who seeks him.
    It is good that one should wait quietly
        for the salvation of the LORD."

                                  — Lamentations 3:21\u201326`,
          caption: 'The turn.',
        },
      ],
      closing: [
        'The famous words about God\`s faithfulness do not come at the end of a neat argument. They come in the middle of ashes. The man has just said his hope has perished. Then he remembers. The turn is not a solution; it is a choice to trust what he knows about God\`s character even when his experience says otherwise.',
      ],
    },

    // ---------------------------------------------------------------- imagery
    {
      id: 'imagery',
      heading: 'The Imagery',
      body: [
        'Lamentations is dense with physical imagery. The suffering is not abstract; it is bodies, hunger, fire, stones. The poet sees everything and spares nothing.',
      ],
      entries: [
        {
          term: 'The widow',
          role: 'Jerusalem without her God',
          detail:
            '"How lonely sits the city that was full of people! How like a widow has she become." The covenant was a marriage; now Jerusalem mourns alone.',
        },
        {
          term: 'Gold grown dim',
          role: 'the precious made worthless',
          detail:
            '"How the gold has grown dim, how the pure gold is changed! The holy stones lie scattered at the head of every street." What was sacred is now rubble.',
        },
        {
          term: 'Children\`s hunger',
          role: 'the most vulnerable',
          detail:
            '"The tongue of the nursing infant sticks to the roof of its mouth for thirst; the children beg for food, but no one gives to them" (4:4). The horror is specific.',
        },
        {
          term: 'Cannibalism',
          role: 'the unthinkable',
          detail:
            '"The hands of compassionate women have boiled their own children" (4:10). The siege reduced mothers to this. The book does not look away.',
        },
        {
          term: 'Gall and wormwood',
          role: 'bitterness',
          detail:
            '"He has filled me with bitterness; he has sated me with wormwood" (3:15). The taste of grief.',
        },
        {
          term: 'Gravel in the teeth',
          role: 'ground down',
          detail:
            '"He has made my teeth grind on gravel" (3:16). The texture of despair.',
        },
      ],
    },

    // ---------------------------------------------------------------- connections
    {
      id: 'connections',
      heading: 'Where Lamentations Sits in Scripture',
      entries: [
        {
          term: 'Jeremiah',
          detail:
            'Lamentations is placed after Jeremiah in the English Bible (following the Greek tradition). Jeremiah warned for decades that this would happen. Lamentations is what remains when the warnings come true.',
        },
        {
          term: 'The Psalms',
          detail:
            'Many psalms are laments, but Lamentations is sustained lament. Where a psalm might spend ten verses in grief before turning to praise, Lamentations spends five chapters. The genre reaches its full intensity here.',
        },
        {
          term: 'Job',
          detail:
            'Job and Lamentations both deal with suffering. Job protests innocence; Lamentations confesses guilt. Both find themselves in the presence of a God who is terrifying and trustworthy.',
        },
        {
          term: 'Isaiah 53',
          detail:
            '"He was despised and rejected... a man of sorrows and acquainted with grief." The man of chapter 3 finds his ultimate fulfillment in the Servant who bears the grief of others.',
        },
        {
          term: 'Jesus over Jerusalem',
          detail:
            'Jesus wept over Jerusalem (Luke 19:41\u201344), foreseeing another destruction. "Would that you, even you, had known on this day the things that make for peace!" Lamentations\` grief echoes forward.',
        },
        {
          term: 'Revelation 21',
          detail:
            '"He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore." The promise that ends what Lamentations begins.',
        },
      ],
    },

    // ---------------------------------------------------------------- ending
    {
      id: 'ending',
      heading: 'The Final Question',
      body: [
        'The book does not end with resolution. It ends with a question that trails off into silence.',
      ],
      figures: [
        {
          art: `   "But you, O LORD, reign forever;
        your throne endures to all generations.
    Why do you forget us forever,
        why do you forsake us for so many days?
    Restore us to yourself, O LORD, that we may be restored!
        Renew our days as of old—
    unless you have utterly rejected us,
        and you remain exceedingly angry with us."

                                  — Lamentations 5:19\u201322`,
          caption: 'The book\`s final words.',
        },
      ],
      closing: [
        'The last line is not a statement but a fear: "unless you have utterly rejected us." The book refuses to manufacture false closure. God\`s faithfulness was confessed in chapter 3, but the book ends still waiting. The restoration will come, but not yet. For now, there is only the prayer and the silence after it.',
        'Jewish tradition, when reading Lamentations aloud in synagogue on Tisha B\`Av, repeats verse 21 after verse 22, so the reading ends with hope rather than fear. But the book itself does not do that. It lets the question hang.',
      ],
    },
  ],
};
