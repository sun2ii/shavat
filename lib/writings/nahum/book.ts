import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Nahum: the ground a reader should be standing on before
 * the first verse. An oracle against Nineveh, the city that once repented
 * under Jonah but returned to its brutality.
 */
export const NAHUM: BookOrientation = {
  slug: 'nahum',
  title: 'Nahum',
  subtitle: 'The Fall of the Oppressor',
  scripture: 'Nahum 1-3',
  summary:
    'God\`s vengeance against Nineveh, the Assyrian capital that crushed nations for a century and now faces the justice it dealt to others.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Nahum is a single sustained oracle against one city: Nineveh. There is no call to repentance, no conditional prophecy, no offer of mercy. The verdict is final. The execution is coming.',
        'The book is short and violent. Three chapters, each a different angle on the same doom. Chapter 1 declares God\`s character as the avenger of blood. Chapter 2 describes the assault on Nineveh in vivid present-tense poetry. Chapter 3 catalogs the crimes that warrant the sentence. The structure is theological, then visual, then judicial.',
        'This is not a comfortable book. It celebrates the destruction of a city. But the comfort is real: for those who lived under Assyrian terror, Nahum\`s name means "comfort," and the fall of Nineveh was exactly that.',
      ],
      figures: [
        {
          art: `  ORACLE AGAINST NINEVEH
    │
    ▼
  CHAPTER 1 .......... God\`s character
    │                   jealous, avenging
    │                   slow to anger but not forever
    ▼
  CHAPTER 2 .......... The siege described
    │                   chariots, soldiers, flood
    │                   the lion\`s den emptied
    ▼
  CHAPTER 3 .......... The indictment
    │                   blood, lies, plunder
    │                   you did this to others
    ▼
  NINEVEH FALLS ...... 612 BC, exactly as described`,
          caption: 'Three chapters, one verdict.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Nahum prophesied sometime between 663 and 612 BC. The earlier date is fixed by his reference to the fall of Thebes (No-Amon) to Assyria, which happened in 663 BC. The later date is Nineveh\`s actual fall. Most scholars place Nahum closer to the end, perhaps 650 to 620 BC, when Assyria\`s decline was becoming visible.',
        'Assyria had dominated the ancient Near East for over a century. In 722 BC, they destroyed the northern kingdom of Israel and deported its population. They besieged Jerusalem under Hezekiah. They demanded tribute, extracted hostages, and practiced systematic terror: impaling captives, skinning prisoners alive, piling skulls at city gates. Their own inscriptions boast of these atrocities.',
        'By Nahum\`s day, cracks were appearing. Egypt had reasserted independence. Babylon was rising. The Medes were gathering strength. The empire that seemed invincible was about to collapse with stunning speed. In 612 BC, a coalition of Babylonians and Medes breached Nineveh\`s walls after diverting the river to flood its foundations. The city was sacked and never rebuilt.',
      ],
      entries: [
        {
          term: 'Assyria',
          role: 'the oppressor',
          detail:
            'The dominant empire of the eighth and seventh centuries BC. Their capital at Nineveh was the largest city in the world, with walls so wide that three chariots could ride abreast. Their military machine was unmatched. Their cruelty was policy.',
        },
        {
          term: 'The fall of Israel',
          role: 'the wound',
          detail:
            'In 722 BC, Assyria conquered Samaria and ended the northern kingdom. The ten tribes were scattered, never to return. Judah watched and remembered. Nahum writes as one whose people have felt Assyrian power.',
        },
        {
          term: 'Thebes (No-Amon)',
          role: 'the precedent',
          detail:
            'The great Egyptian city Assyria sacked in 663 BC. Nahum uses it as argument: if Thebes with all its defenses fell, why should Nineveh think itself secure? The conqueror can be conquered.',
        },
        {
          term: 'The coalition',
          role: 'God\`s instrument',
          detail:
            'Babylon and Media joined forces against Assyria. In 614 BC they took Assur, the old capital. In 612 BC they took Nineveh. The empire collapsed so completely that within decades, no one knew where Nineveh had been.',
        },
      ],
    },

    // ----------------------------------------------------------------- jonah
    {
      id: 'jonah',
      heading: 'The Shadow of Jonah',
      body: [
        'Nahum cannot be read without remembering Jonah. A century or more earlier, God sent Jonah to Nineveh with a message of judgment. The city repented, from the king to the cattle. God relented. Jonah sulked. Mercy triumphed.',
        'What happened? The repentance did not last. Within a generation, Nineveh returned to its violence. The cruelty resumed. The conquests continued. The mercy extended to Nineveh under Jonah was not a permanent pardon; it was a reprieve. When the city returned to its ways, judgment returned as well.',
        'Nahum is the other side of Jonah. Together they teach that God\`s patience is real but not infinite. Repentance that does not persist does not save. The mercy Jonah resented was genuine. The judgment Nahum announces is equally genuine. Both are God.',
      ],
      figures: [
        {
          art: `   JONAH                          NAHUM
   ─────                          ─────
   circa 760 BC                   circa 650-612 BC

   Nineveh warned ──────────────► Nineveh condemned
   "Yet 40 days"                  "No healing for your wound"

   Repentance ──────────────────► Return to wickedness
   king to cattle                 "city of blood, full of lies"

   God relents ─────────────────► God avenges
   "Should I not pity?"           "Who can endure His indignation?"

   Jonah angry ─────────────────► Judah comforted
   "I knew you were merciful"     "Good news for the afflicted"`,
          caption: 'Two books, one city, two outcomes.',
        },
      ],
      closing: [
        'The contrast exposes a pattern. Repentance is always available; the book of Jonah proves it. But repentance that reverts is no repentance. Nineveh knew God\`s mercy and chose violence anyway. That makes the judgment not arbitrary but earned.',
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The book opens with a partial acrostic poem celebrating God\`s character, then shifts into two chapters of vivid war poetry. The progression is from theology to vision to verdict.',
      ],
      figures: [
        {
          art: `   CHAPTER 1: THE DIVINE WARRIOR
   ─────────────────────────────────
   1:1       Title: oracle against Nineveh
   1:2-8     Acrostic hymn (partial)
             God is jealous, avenging
             slow to anger, great in power
             good, a stronghold
   1:9-14    Addressed to Nineveh
             plot against the LORD
             cut off, no more descendants
   1:15      Good news for Judah
             (numbered 2:1 in Hebrew)

   CHAPTER 2: THE SIEGE
   ─────────────────────────────────
   2:1-2     The attacker has come
   2:3-10    Battle description
             chariots flash, defenders fall
             city breached, palace melts
             "Plunder! Plunder! Plunder!"
   2:11-13   The lion\`s den emptied
             where now is the dwelling?
             "I am against you"

   CHAPTER 3: THE INDICTMENT
   ─────────────────────────────────
   3:1-7     Crimes: blood, lies, witchcraft
             corpses without end
             "I am against you"
   3:8-13    Comparison with Thebes
             she fell, so will you
   3:14-17   Sarcastic preparation
             draw water for the siege
             your guards will flee
   3:18-19   Final dirge
             no healing for your wound
             all who hear clap their hands`,
          caption: 'Theology, vision, verdict.',
        },
      ],
      closing: [
        'Notice the refrain "I am against you" in chapters 2 and 3. This is the oracle\`s core. When God sets Himself against a power, no wall holds, no army stands, no empire endures.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Divine Vengeance',
          definition:
            'God\`s settled opposition to evil, expressed in retributive justice.',
          appears:
            '"The LORD is a jealous and avenging God; the LORD is avenging and wrathful" (1:2). The repetition is emphatic.',
          matters:
            'Vengeance in Scripture is not rage; it is justice. God repays those who harm His people and violate His order. This is comfort for the oppressed, terror for the oppressor.',
        },
        {
          name: 'The Patience of God',
          definition:
            'God is slow to anger, but slowness is not absence.',
          appears:
            '"The LORD is slow to anger and great in power, and the LORD will by no means clear the guilty" (1:3).',
          matters:
            'The same attribute that gave Nineveh time to repent under Jonah is now invoked to explain why judgment was delayed. Patience is not indifference. The bill comes due.',
        },
        {
          name: 'Justice for the Oppressed',
          definition:
            'The fall of oppressors is good news for their victims.',
          appears:
            '"Behold, upon the mountains, the feet of him who brings good news, who publishes peace!" (1:15). Judah can celebrate because the terror is ending.',
          matters:
            'Nahum is uncomfortable precisely because it rejoices in destruction. But the destruction is of a regime that built its power on atrocity. The celebration is not bloodlust; it is relief.',
        },
        {
          name: 'The Fall of Empires',
          definition:
            'No human power is permanent; all are subject to God\`s judgment.',
          appears:
            'The entire book assumes Assyria\`s apparent invincibility and declares its certain end. "All who hear the news of you clap their hands over you" (3:19).',
          matters:
            'Empires rise and fall. Nahum names the reason: God is sovereign over history. What Assyria did to others will be done to Assyria. The pattern is not coincidence; it is justice.',
        },
        {
          name: 'No Healing',
          definition:
            'Some wounds are terminal; some judgments are final.',
          appears:
            '"There is no healing for your wound; your injury is fatal" (3:19). No call to repent, no offer of restoration.',
          matters:
            'Nahum marks a limit. Mercy was offered through Jonah and rejected. The window has closed. This is sobering: grace extended and refused does not remain available forever.',
        },
      ],
    },

    // ---------------------------------------------------------------- imagery
    {
      id: 'imagery',
      heading: 'The Poetry of Destruction',
      body: [
        'Nahum is among the most vivid poets in Scripture. The battle scenes in chapters 2 and 3 are cinematographic: rapid cuts, sound effects, visual chaos. The reader sees the siege as if watching.',
      ],
      figures: [
        {
          art: `   "The crack of the whip,
      the rumble of wheels,
    galloping horses,
      jolting chariots!
    Charging cavalry,
      flashing swords,
      glittering spears!
    Piles of dead,
      heaps of corpses,
    dead bodies without end—
      they stumble over the bodies!"

                         — Nahum 3:2-3`,
          caption: 'The assault in present tense.',
        },
      ],
      entries: [
        {
          term: 'The lion and his den',
          role: 'Assyria as predator',
          detail:
            'Nahum asks where the lion\`s den is, the feeding place where the lion brought prey for his cubs. Assyria saw itself as a lion; its kings used the image. Now the den is empty, the prey gone, the lion hunted.',
        },
        {
          term: 'The prostitute',
          role: 'Nineveh\`s allure and betrayal',
          detail:
            '"The charming prostitute, the mistress of sorceries, who enslaves nations through her prostitution and peoples through her sorcery" (3:4). Nineveh seduced allies and then destroyed them. The metaphor is political.',
        },
        {
          term: 'The flood',
          role: 'the breach',
          detail:
            '"With an overflowing flood he will make a complete end of her place" (1:8). Nineveh\`s walls were breached when the river was diverted. The prophecy proved literal.',
        },
        {
          term: 'Locusts',
          role: 'Assyria\`s officials',
          detail:
            'Assyria\`s guards and scribes are like locusts: countless when the sun is cold, vanished when it rises. "Your guards are like locusts... when the sun appears they fly away, and no one knows where" (3:17).',
        },
        {
          term: 'Clapping hands',
          role: 'universal relief',
          detail:
            '"All who hear the news of you clap their hands over you" (3:19). The empire terrorized so many that its fall brings applause from every nation. No one mourns.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Nahum Sits in Scripture',
      entries: [
        {
          term: 'Jonah',
          detail:
            'The necessary counterpart. Jonah shows God\`s mercy to Nineveh; Nahum shows God\`s judgment on Nineveh. Together they reveal a God who offers grace but will not be mocked, who waits for repentance but will not wait forever.',
        },
        {
          term: 'Isaiah',
          detail:
            'Isaiah 10 calls Assyria "the rod of my anger," the instrument God uses to punish Israel. But Isaiah also prophesies that God will punish Assyria for its arrogance. Nahum is that prophecy fulfilled.',
        },
        {
          term: 'Habakkuk',
          detail:
            'The next book in the Twelve. While Nahum celebrates Assyria\`s fall to Babylon, Habakkuk will ask why God uses wicked Babylon as His instrument. The question Nahum resolves gives way to deeper questions.',
        },
        {
          term: 'Zephaniah',
          detail:
            'A contemporary prophet who also announces doom against Assyria and Nineveh: "He will stretch out his hand against the north and destroy Assyria, and he will make Nineveh a desolation" (Zephaniah 2:13).',
        },
        {
          term: 'Revelation',
          detail:
            'The fall of Nineveh foreshadows the fall of Babylon in Revelation 18. The same pattern: a city drunk on the blood of saints, seducing nations, destroyed suddenly, mourned by merchants but celebrated by heaven.',
        },
      ],
      closing: [
        'Nahum is uncomfortable because it shows the God who destroys. But destruction of oppressors is the other side of deliverance for the oppressed. You cannot have Exodus without the sea closing on Pharaoh. You cannot have justice for Israel without judgment on Assyria. Nahum reveals what redemption costs.',
      ],
    },

    // -------------------------------------------------------------- reading
    {
      id: 'reading',
      heading: 'How to Read Nahum',
      body: [
        'Do not read Nahum as bloodthirst. Read it as relief. Imagine living under a regime that impales prisoners and flays captives. Imagine your nation scattered, your capital besieged, your people deported. Now hear that the empire responsible will fall, that the terror will end, that justice will come.',
        'The book is addressed to Nineveh, but it was written for Judah. The message to Nineveh is doom; the message to Judah is hope. "The LORD is good, a stronghold in the day of trouble; he knows those who take refuge in him" (1:7). That verse, tucked into the acrostic, is the pastoral heart of the book.',
      ],
      figures: [
        {
          art: `   TO NINEVEH:                 TO JUDAH:
   ──────────                  ─────────
   "I am against you"          "The LORD is good"
   judgment                    refuge

   "No healing for             "Good news of peace"
    your wound"                liberation

   "Your name will             "Keep your feasts"
    be cut off"                restoration`,
          caption: 'Two audiences, one oracle.',
        },
      ],
      closing: [
        'Nahum teaches that God takes sides. He is not neutral between oppressor and oppressed. His patience is real, but so is His wrath. For those under the heel of empire, that is the best news imaginable.',
      ],
    },
  ],
};
