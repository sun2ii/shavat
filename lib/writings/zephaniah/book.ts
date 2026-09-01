import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Zephaniah: the ground a reader should be standing on before
 * the first verse. A royal prophet who announces the Day of the Lord, then reveals
 * the God who sings over His people.
 */
export const ZEPHANIAH: BookOrientation = {
  slug: 'zephaniah',
  title: 'Zephaniah',
  subtitle: 'The Day of the Lord and the Singing God',
  scripture: 'Zephaniah 1–3',
  summary:
    'Universal judgment sweeps the earth, then God gathers a humble remnant and rejoices over them with singing.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Zephaniah is a book of contrasts so sharp they cut. The first two chapters announce cosmic devastation: silence before the Lord, for the Day is near. The final chapter pivots to restoration so tender it borders on shocking. The God who sweeps away everything becomes the God who sings over His people with joy.',
        'The book divides into three movements. Chapter 1 announces the Day of the Lord against Judah and Jerusalem. Chapter 2 extends judgment to the surrounding nations, with a brief call to seek the Lord tucked in the middle. Chapter 3 indicts Jerusalem\`s leaders, then turns without warning to promise: the proud will be removed, the humble will remain, and God Himself will be in their midst, rejoicing.',
        'Read for the emotional arc. Zephaniah begins with a voice of total destruction and ends with a love song. The same God who says "I will utterly sweep away everything" also says "He will quiet you by his love; he will exult over you with loud singing." Both are true. The book holds them together.',
      ],
      figures: [
        {
          art: `  SUPERSCRIPTION
    │
    ▼
  DAY OF THE LORD ........ 1:1–2:3
    │                      cosmic judgment
    │                      Judah condemned
    │                      "Seek the LORD"
    ▼
  ORACLES AGAINST NATIONS . 2:4–15
    │                      Philistia, Moab, Ammon
    │                      Cush, Assyria
    ▼
  JERUSALEM\`S SIN ........ 3:1–8
    │                      woe to the oppressing city
    │                      corrupt leaders
    ▼
  RESTORATION ............ 3:9–20
    │                      humble remnant
    │                      God in their midst
    ▼
  THE SINGING GOD ........ 3:17
                           "He will rejoice over you"`,
          caption: 'The whole book: devastation, then delight.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Zephaniah prophesied during the reign of Josiah, king of Judah, roughly 640 to 609 BC. The superscription traces his lineage back four generations to Hezekiah, almost certainly King Hezekiah who reigned a century earlier. Zephaniah is royalty speaking against royalty.',
        'Josiah\`s reign saw the last great reform in Judah. When the Book of the Law was discovered in the temple around 622 BC, Josiah tore his robes and launched a purge of idolatry. Zephaniah likely prophesied before or during the early stages of this reform, when the syncretism he condemns was still rampant: Baal worship, astral cults, those who bow on rooftops to the host of heaven while also swearing by the Lord.',
        'The Assyrian Empire was weakening. Within a decade of Josiah\`s reforms, Nineveh would fall. The international scene was shifting, and Judah\`s temptation was to assume that Assyria\`s decline meant safety. Zephaniah counters this. The Day of the Lord is not just for enemies; it sweeps Judah first.',
      ],
      entries: [
        {
          term: 'Josiah\`s reign',
          role: 'the setting',
          detail:
            'Josiah became king at eight years old after his father Amon was assassinated. He would become the most faithful king since David, tearing down high places and burning the bones of false priests. Zephaniah\`s prophecy either catalyzed or accompanied this reform.',
        },
        {
          term: 'Royal lineage',
          role: 'the prophet\`s credentials',
          detail:
            'The superscription traces Zephaniah through Cushi, Gedaliah, Amariah, to Hezekiah. No other prophet has a four-generation genealogy recorded. The inclusion of Hezekiah—likely the king—means Zephaniah was of royal blood, a prince denouncing the court from the inside.',
        },
        {
          term: 'Syncretism',
          role: 'the disease',
          detail:
            'Judah had not abandoned the Lord; they had added to Him. They worshiped Baal alongside Yahweh, bowed to the stars while swearing by the Lord, dressed in foreign garments for foreign gods. This mixture is what Zephaniah attacks. Half-loyalty is no loyalty.',
        },
        {
          term: 'The decline of Assyria',
          role: 'the international backdrop',
          detail:
            'Assyria had dominated the ancient Near East for two centuries, destroying the northern kingdom of Israel in 722 BC. By Zephaniah\`s day, the empire was crumbling. Nineveh would fall to Babylon in 612 BC. Zephaniah prophesies this fall: Nineveh will become a desolation, a dry waste like the desert.',
        },
      ],
    },

    // ------------------------------------------------------------- characters
    {
      id: 'characters',
      heading: 'The People',
      figures: [
        {
          art: `        GOD
         │
         │ judges
         │ restores
         │ sings
         ▼
    ┌────┴────────────────┐
    │                     │
 THE PROUD            THE HUMBLE
 officials            remnant of Israel
 judges               those who seek the LORD
 prophets             the meek of the earth
 priests              who do his just commands
    │                     │
    ▼                     ▼
 REMOVED              SHELTERED
 from the city        in the day of anger`,
          caption: 'The division that matters.',
        },
      ],
      entries: [
        {
          term: 'Zephaniah',
          role: 'the royal prophet',
          detail:
            'His name means "The LORD has hidden" or "The LORD protects," fitting for a prophet who promises shelter for the humble. His royal lineage gave him access to the court he condemns. He speaks as an insider.',
        },
        {
          term: 'The officials and judges',
          role: 'roaring lions and evening wolves',
          detail:
            'Jerusalem\`s leaders are predators. The officials are lions; the judges are wolves that leave nothing till morning. They devour rather than protect.',
        },
        {
          term: 'The prophets',
          role: 'fickle and treacherous',
          detail:
            'The prophets who should speak God\`s word are unreliable. They prophesy for gain and tell people what they want to hear. Truth has left them.',
        },
        {
          term: 'The priests',
          role: 'profaners of the holy',
          detail:
            'The priests who should guard the sanctuary have profaned it. They do violence to the law, failing to distinguish between clean and unclean, holy and common.',
        },
        {
          term: 'The humble remnant',
          role: 'those who survive',
          detail:
            'The meek of the earth, those who do God\`s just commands, who seek righteousness and humility. These are told to seek shelter. These will be left in the city when the proud are removed.',
        },
      ],
    },

    // ----------------------------------------------------------------- places
    {
      id: 'places',
      heading: 'The Geography',
      figures: [
        {
          art: `                 ASSYRIA / NINEVEH
                        ▲
                        │ will become desolation
                        │
                 AMMON ─┤
                  MOAB ─┤ east: like Sodom
                        │
           JERUSALEM ───┤ center: judged first
                        │
             PHILISTIA ─┤ west: Cherethites cut off
                        │
                  CUSH ─┤ south: slain by sword
                        ▼
                   EGYPT`,
          caption: 'Judgment sweeps from Judah outward to all nations.',
        },
      ],
      entries: [
        {
          term: 'Jerusalem',
          detail:
            'The city Zephaniah addresses directly in chapter 3: "Woe to her who is rebellious and defiled, the oppressing city!" She does not trust in the Lord, does not draw near to her God. Her leaders are all corrupt. Yet Jerusalem is also where God will dwell when the proud are removed.',
        },
        {
          term: 'The Fish Gate and the Second Quarter',
          detail:
            'Specific locations in Jerusalem mentioned in chapter 1. The Day of the Lord will bring wailing from these places. Zephaniah is not speaking generically; he is naming neighborhoods.',
        },
        {
          term: 'Philistia',
          detail:
            'The coastal cities to the west: Gaza, Ashkelon, Ashdod, Ekron. The word of the Lord is against them. Canaan, the land of the Philistines, will be destroyed.',
        },
        {
          term: 'Moab and Ammon',
          detail:
            'The nations east of the Jordan, descended from Lot. They have taunted God\`s people and boasted against their territory. They will become like Sodom and Gomorrah, a land possessed by nettles and salt pits.',
        },
        {
          term: 'Cush',
          detail:
            'The region south of Egypt, often translated Ethiopia or Nubia. The Cushites will be slain by the sword of the Lord.',
        },
        {
          term: 'Nineveh',
          detail:
            'The great city of Assyria, the empire that had terrorized the ancient Near East. Zephaniah pronounces its doom: it will become a desolation, dry as the desert. Flocks will lie down in it; the owl will hoot in the window. This happened in 612 BC.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The book moves from total judgment to total restoration, with a hinge in the middle. The structure is chiastic: it begins with cosmic destruction and ends with cosmic renewal. The Day of the Lord frames everything, but it has two faces—terror for the proud, deliverance for the humble.',
      ],
      figures: [
        {
          art: `   THE DAY OF THE LORD AGAINST JUDAH (1:1–18)
   ──────────────────────────────────────────
   1:2–6    Universal destruction, Judah\`s idolatry
   1:7      "Be silent before the Lord GOD!"
   1:8–13   Punishment of officials, merchants, complacent
   1:14–18  The great Day: bitter, dark, wrath

   CALL TO REPENTANCE (2:1–3)
   ──────────────────────────
   "Seek the LORD... seek righteousness, seek humility;
    perhaps you may be hidden"

   ORACLES AGAINST NATIONS (2:4–15)
   ──────────────────────────────
   2:4–7    Philistia (west)
   2:8–11   Moab and Ammon (east)
   2:12     Cush (south)
   2:13–15  Assyria/Nineveh (north)

   JERUSALEM\`S CORRUPTION (3:1–8)
   ────────────────────────────
   3:1–5    Indictment: rebellious, defiled, oppressing
   3:6–8    Warning: nations destroyed, yet she did not fear

   RESTORATION AND JOY (3:9–20)
   ─────────────────────────────
   3:9–13   Purified peoples, humble remnant
   3:14–17  Sing, daughter Zion! The LORD is in your midst
   3:18–20  Gathering of the scattered, shame turned to praise`,
          caption: 'Judgment first, then the turn.',
        },
        {
          art: `   MOVEMENT OF THE BOOK

   DESTRUCTION ──────────────────────► RESTORATION
       │                                     │
       │                                     │
   "I will utterly                    "The LORD your God
    sweep away                         is in your midst"
    everything"                              │
       │                                     │
       │                                     │
   DARKNESS ─────────────────────────► SINGING
       │                                     │
       │                                     │
   "a day of wrath,                   "He will rejoice
    a day of distress                  over you with
    and anguish"                       gladness... exult
                                       over you with
                                       loud singing"`,
          caption: 'The emotional arc: from wrath to rejoicing.',
        },
      ],
      closing: [
        'Notice the pivot point: 2:1–3, the call to seek the Lord. This is the hinge. Before it, universal judgment. After it, judgment on the nations and then restoration. The humble who seek the Lord may be hidden in the Day of anger. That "perhaps" carries tremendous weight.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'The Day of the Lord',
          definition:
            'A day of divine intervention when God acts decisively in history, bringing judgment on the wicked and deliverance for the faithful.',
          appears:
            '"The great day of the LORD is near" (1:14); descriptions of darkness, gloom, clouds, trumpet blast (1:15–16); cosmic scope of destruction (1:2–3, 18).',
          matters:
            'Zephaniah provides the most vivid portrait of the Day of the Lord in the prophets. It is not distant; it is near. It is not partial; it sweeps everything. And it is not final—it leads to restoration.',
        },
        {
          name: 'Universal Judgment',
          definition:
            'God\`s wrath extends to all creation and all nations, not just Judah.',
          appears:
            '"I will utterly sweep away everything from the face of the earth" (1:2); judgment on man and beast, birds and fish (1:3); oracles against Philistia, Moab, Ammon, Cush, Assyria (2:4–15).',
          matters:
            'No nation escapes. The Day of the Lord is cosmic. But this universality also prepares for universal restoration: "I will change the speech of the peoples to a pure speech, that all of them may call upon the name of the LORD" (3:9).',
        },
        {
          name: 'The Humble Remnant',
          definition:
            'Those who seek the Lord, practice righteousness, and may be sheltered in the Day of judgment.',
          appears:
            '"Seek the LORD, all you humble of the land" (2:3); "I will leave in your midst a people humble and lowly" (3:12).',
          matters:
            'Survival through the Day is not based on power or position but on humility. The proud are removed; the humble remain. This is the pattern of the kingdom.',
        },
        {
          name: 'Silence Before God',
          definition:
            'The appropriate response to divine judgment is not argument but awe.',
          appears:
            '"Be silent before the Lord GOD! For the day of the LORD is near" (1:7).',
          matters:
            'Zephaniah commands silence where other prophets might command repentance. When God acts in judgment, the proper response is to stop talking. The Day is near; words fail.',
        },
        {
          name: 'God in the Midst',
          definition:
            'The LORD dwelling among His people, present and active.',
          appears:
            '"The LORD your God is in your midst, a mighty one who will save" (3:17); contrast with "The LORD within her is righteous" even while leaders corrupt (3:5).',
          matters:
            'The presence of God cuts two ways. While the city is corrupt, God\`s presence means judgment is inescapable. After the proud are removed, God\`s presence means salvation is secure.',
        },
        {
          name: 'The Singing God',
          definition:
            'God not merely tolerating but delighting in His people, expressing joy through song.',
          appears:
            '"He will rejoice over you with gladness; he will quiet you by his love; he will exult over you with loud singing" (3:17).',
          matters:
            'This is the most unexpected image in the book. The God who sweeps away everything becomes the God who sings over His people. The movement from wrath to singing is the arc of the entire book.',
        },
        {
          name: 'Reversal of Shame',
          definition:
            'God turning His people\`s disgrace into praise and renown.',
          appears:
            '"At that time I will bring you in, at the time when I gather you together; for I will make you renowned and praised among all the peoples of the earth, when I restore your fortunes before your eyes" (3:20).',
          matters:
            'The book ends not just with survival but with honor. What was shameful becomes glorious. The scattered are gathered; the despised become praised.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Zephaniah Sits in Scripture',
      entries: [
        {
          term: 'Joel',
          detail:
            'Joel and Zephaniah share the Day of the Lord as their central image. Joel focuses on locusts as invading army; Zephaniah focuses on cosmic reversal. Both move from judgment to restoration, both promise the Spirit\`s outpouring implicitly through the purified remnant.',
        },
        {
          term: 'Amos',
          detail:
            'Amos warns that the Day of the Lord will be darkness, not light (Amos 5:18–20). Zephaniah elaborates this: "a day of darkness and gloom, a day of clouds and thick darkness" (1:15). Both correct the assumption that Israel will be blessed on that Day.',
        },
        {
          term: 'Nahum',
          detail:
            'Nahum is entirely focused on Nineveh\`s destruction. Zephaniah includes Nineveh in his sweep of nations (2:13–15). Together they show Assyria\`s fall from different angles.',
        },
        {
          term: 'Habakkuk',
          detail:
            'A near contemporary. Habakkuk questions how God can use the wicked to judge His people; Zephaniah simply announces that judgment. Both end with faith: Habakkuk in trust despite circumstances, Zephaniah in joy because of restoration.',
        },
        {
          term: 'Isaiah',
          detail:
            'Isaiah\`s vision of universal judgment (Isaiah 2, 13, 24) and the remnant of Israel (Isaiah 10:20–22) are amplified in Zephaniah. Both prophets see the proud brought low and the humble exalted.',
        },
        {
          term: 'Revelation',
          detail:
            'The Day of the Lord in Zephaniah anticipates the final judgment. The wrath of the Lamb, the silence in heaven, the removal of the wicked, and the dwelling of God with His people—all have roots in Zephaniah.',
        },
      ],
      closing: [
        'Zephaniah stands among the Minor Prophets as the fullest portrait of the Day of the Lord. What other prophets mention, Zephaniah elaborates. And uniquely, he shows where the Day leads: not to silence but to singing, not to desolation but to delight.',
      ],
    },

    // ------------------------------------------------------------ day imagery
    {
      id: 'day-imagery',
      heading: 'The Day of the Lord',
      body: [
        'No prophet describes the Day of the Lord with more concentrated intensity than Zephaniah. Chapter 1:14–18 piles description on description, building a portrait of total catastrophe.',
      ],
      figures: [
        {
          art: `   THE GREAT DAY IS NEAR

   ▪ near and hastening fast
   ▪ the sound: the cry is bitter
   ▪ a warrior cries aloud

   A DAY OF:
   ─────────
   wrath           distress        anguish
   ruin            devastation     darkness
   gloom           clouds          thick darkness
   trumpet blast   battle cry

   AGAINST:
   ────────
   the fortified cities
   the lofty battlements

   RESULT:
   ───────
   walking like blind men
   blood poured out like dust
   flesh like dung
   silver and gold cannot deliver`,
          caption: 'The Day as Zephaniah sees it: total, dark, inescapable.',
        },
        {
          art: `   BEFORE THE DAY          AFTER THE DAY

   "I will punish           "I will leave
    the officials            in your midst
    and the king\`s           a people humble
    sons"                    and lowly"

   "I will punish           "They shall pasture
    all who leap             and lie down,
    over the                 and none shall
    threshold"               make them afraid"

   "I will cut off          "The King of Israel,
    every remnant            the LORD, is
    of Baal"                 in your midst"

   wrath                     singing
   darkness                  rejoicing
   desolation                restoration`,
          caption: 'The contrast: what the Day removes, what it reveals.',
        },
      ],
      closing: [
        'The Day of the Lord is not the end of the story; it is the crisis that divides history. On one side, the proud and their gods. On the other side, the humble and their God. The Day burns away one to reveal the other.',
      ],
    },

    // ------------------------------------------------------------ the turn
    {
      id: 'turn',
      heading: 'The Pivot',
      body: [
        'The call to repentance in 2:1–3 is the hinge of the book. Everything before it is judgment; everything after moves toward restoration. The command is simple: seek the Lord, seek righteousness, seek humility. The promise is cautious: perhaps you will be hidden.',
      ],
      figures: [
        {
          art: `   "Gather together, yes, gather,
       O shameless nation,
    before the decree takes effect
       —before the day passes away like chaff—
    before there comes upon you
       the burning anger of the LORD,
    before there comes upon you
       the day of the anger of the LORD.

    Seek the LORD, all you humble of the land,
       who do his just commands;
    seek righteousness; seek humility;
       perhaps you may be hidden
       on the day of the anger of the LORD."

                                  — Zephaniah 2:1–3`,
          caption: 'The narrow window.',
        },
      ],
      closing: [
        'The word "perhaps" is not uncertainty about God but honesty about humans. God\`s invitation is genuine. Whether anyone takes it is the question. The humble who seek may be hidden. The proud who refuse will be swept away. The choice is now, before the decree takes effect.',
      ],
    },

    // ------------------------------------------------------------ singing god
    {
      id: 'singing-god',
      heading: 'The Singing God',
      body: [
        'The climax of Zephaniah is not judgment but joy. After the proud are removed and the humble remain, the book shifts from proclamation to celebration. God Himself sings.',
      ],
      figures: [
        {
          art: `   "Sing aloud, O daughter of Zion;
       shout, O Israel!
    Rejoice and exult with all your heart,
       O daughter of Jerusalem!

    The LORD has taken away the judgments against you;
       he has cleared away your enemies.
    The King of Israel, the LORD, is in your midst;
       you shall never again fear evil.

    On that day it shall be said to Jerusalem:
    'Fear not, O Zion;
       let not your hands grow weak.

    The LORD your God is in your midst,
       a mighty one who will save;
    he will rejoice over you with gladness;
       he will quiet you by his love;
    he will exult over you with loud singing.'"

                                  — Zephaniah 3:14–17`,
          caption: 'The God who devastates also delights.',
        },
        {
          art: `   ISRAEL SINGS ─────────── GOD SINGS

   "Sing aloud,              "He will exult
    O daughter                over you with
    of Zion"                  loud singing"

        │                         │
        └─────────┬───────────────┘
                  │
                  ▼
            MUTUAL JOY

   The people sing because God has saved.
   God sings because the people are His.`,
          caption: 'The singing is mutual.',
        },
      ],
      closing: [
        'This is the most unexpected turn in prophetic literature. The God who announced destruction in such terrifying terms now sings with joy over His people. The severity was real; the tenderness is equally real. Both flow from the same love. The judgment cleared the way for the singing.',
      ],
    },

    // ------------------------------------------------------------ ending
    {
      id: 'ending',
      heading: 'The Gathering',
      body: [
        'The book ends with restoration complete. The scattered are gathered. The shamed are honored. The prophecy that began with "I will utterly sweep away everything" ends with "I will make you renowned and praised among all the peoples of the earth."',
      ],
      figures: [
        {
          art: `   "At that time I will bring you in,
       at the time when I gather you together;
    for I will make you renowned and praised
       among all the peoples of the earth,
    when I restore your fortunes
       before your eyes," says the LORD.

                                  — Zephaniah 3:20`,
          caption: 'The last word is gathering, not scattering.',
        },
        {
          art: `   THE ARC OF ZEPHANIAH

   CH 1                     CH 3
   ────                     ────

   "I will sweep away       "I will leave
    everything"              a humble remnant"

   "I will punish           "I will remove
    the officials"           the proudly exultant"

   Darkness, wrath,         Singing, joy,
   devastation              restoration

   "On that day"            "On that day"
   terror                   no fear

   THE SAME GOD
   THE SAME DAY
   DIFFERENT OUTCOMES
   FOR DIFFERENT HEARTS`,
          caption: 'One Day, two destinies.',
        },
      ],
      closing: [
        'Zephaniah\`s final vision is a city purified, a people humbled, a God singing. The judgment was never the destination; it was the means. What remains after the fire is precious: a remnant who trust in the name of the Lord, a God who dwells in their midst, and mutual rejoicing that will not end.',
      ],
    },
  ],
};
