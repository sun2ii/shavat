import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Joel: the ground a reader should be standing on before
 * the first verse. A locust plague becomes a lens for seeing the Day of the Lord.
 */
export const JOEL: BookOrientation = {
  slug: 'joel',
  title: 'Joel',
  subtitle: 'The Day of the LORD',
  scripture: 'Joel 1–3',
  summary:
    'A devastating locust plague reveals what the Day of the LORD looks like, and what lies on the other side: repentance, the Spirit poured out, and restoration.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Joel is a short book built on a single event: a locust plague so severe that the land is stripped bare. But Joel does not treat the plague as merely agricultural disaster. He sees in it the shape of something larger: the Day of the LORD. The locusts are a preview. What comes next will be worse, or better, depending on how Israel responds.',
        'The structure is clean. Chapters 1 through 2:11 describe the plague and interpret it as divine judgment. 2:12 through 2:17 call for repentance. 2:18 through 3:21 promise restoration, climaxing in the outpouring of the Spirit and final judgment on the nations.',
        'The pivot is 2:12: "Yet even now, return to me with all your heart." Everything before that verse is crisis. Everything after is promise. The hinge is repentance.',
      ],
      figures: [
        {
          art: `  THE PLAGUE
    │
    ▼
  LOCUSTS ........... wave after wave (1:4)
    │                  land stripped bare
    │                  priests mourn, drunkards weep
    ▼
  INTERPRETATION .... "the Day of the LORD is near" (1:15)
    │                  locusts = army of God
    ▼
  CALL .............. "Return to me" (2:12–17)
    │                  rend hearts, not garments
    ▼
  RESPONSE .......... "The LORD became jealous for his land" (2:18)
    │
    ▼
  RESTORATION ....... grain, wine, oil returned
    │                  the army driven out
    │                  the Spirit poured out (2:28)
    ▼
  JUDGMENT .......... the nations gathered
                       the Valley of Decision`,
          caption: 'Crisis, call, restoration, judgment.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Joel gives no kings, no dates, no explicit historical markers. Scholars have placed it everywhere from the ninth century BC to the fourth. The lack of reference to Assyria, Babylon, or the exile has led many to date it post-exilic, perhaps in the Persian period, when Judah was a small province centered on the temple.',
        'The silence about history may be intentional. Joel is interested in something that transcends any particular political moment: the Day of the LORD, a pattern that repeats. The locusts were real, but they reveal a structure that applies whenever God comes near in judgment and mercy.',
        'What we do know: Joel speaks to Judah and Jerusalem, not the northern kingdom. The temple is standing; priests and offerings are central. The nation is small enough that a call to solemn assembly can reach everyone.',
      ],
      entries: [
        {
          term: 'The Day of the LORD',
          role: 'the controlling idea',
          detail:
            'A phrase Joel inherits and expands. It appears in Amos, Isaiah, Zephaniah, and others. It is the day when the LORD acts decisively, intervening in history with judgment and salvation. Joel sees the locust plague as a miniature Day, a warning of a greater one to come.',
        },
        {
          term: 'Post-exilic Judah',
          role: 'probable setting',
          detail:
            'If Joel writes after the return from Babylon, the community is small, poor, and dependent on the temple cult for identity. The priests are the leaders; the king is absent; the nations loom large. This fits Joel\`s focus on temple, offerings, and the fate of the nations.',
        },
        {
          term: 'Locust plagues',
          role: 'the occasion',
          detail:
            'Devastating swarms that could strip a landscape in hours. Joel describes four types (or stages) of locust, wave after wave. The memory of such plagues lingered for generations. Joel says: what you just witnessed is what judgment looks like.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'Joel has three chapters in English Bibles, four in Hebrew (which splits chapter 2). The division is theological: crisis, call, restoration, judgment.',
      ],
      figures: [
        {
          art: `   PART ONE: THE PLAGUE (1:1–2:11)
   ───────────────────────────────
   1:1–4      Four waves of locusts
   1:5–14     Wake up, mourn, fast
   1:15–20    The Day is near: fire and drought
   2:1–11     The locust army: God at the head

   THE PIVOT (2:12–17)
   ───────────────────
   2:12–14    "Return to me with all your heart"
   2:15–17    Blow the trumpet, call assembly

   PART TWO: RESTORATION (2:18–3:21)
   ─────────────────────────────────
   2:18–27    The LORD responds: grain, wine, oil
   2:28–32    The Spirit poured out on all flesh
   3:1–16     The nations judged in the Valley
   3:17–21    Zion restored, fountains flow`,
          caption: 'The book turns at 2:12.',
        },
        {
          art: `   BEFORE THE CALL          AFTER THE CALL
   ────────────────          ──────────────
   locusts devour            grain returns
   army invades              army driven out
   Day of darkness           sun and moon restored
   judgment near             Spirit poured out
   creation mourns           mountains drip wine`,
          caption: 'Repentance reverses the curse.',
        },
      ],
      closing: [
        'The structure is chiastic at the largest level: what the plague takes, restoration returns. But the center is not balanced; it is a choice. The call to repentance is what makes the difference between the two halves.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'The Day of the LORD',
          definition:
            'The moment when God intervenes directly in history, bringing judgment and salvation.',
          appears:
            '"The Day of the LORD is near" (1:15); "a day of darkness and gloom" (2:2); "the sun shall be turned to darkness" (2:31); "the Day of the LORD is near in the Valley of Decision" (3:14).',
          matters:
            'Joel\`s contribution is to show that the Day has layers. The locusts were a Day; a greater Day comes; and when the Spirit is poured out, that too is a Day. The phrase holds both terror and hope.',
        },
        {
          name: 'Corporate Repentance',
          definition:
            'The whole community turning to God together, with fasting, weeping, and mourning.',
          appears:
            'The call to sanctify a fast, call a solemn assembly, gather the people (1:14; 2:15–16). Even the bride and groom leave their chambers.',
          matters:
            'Joel does not call individuals to private prayer. He calls the nation to public repentance. The response must match the scale of the crisis.',
        },
        {
          name: 'The Spirit Poured Out',
          definition:
            'God\`s Spirit given not to prophets alone but to all flesh: sons and daughters, old and young, servants and maidservants.',
          appears:
            '2:28–29, the most famous passage in Joel, quoted by Peter at Pentecost (Acts 2).',
          matters:
            'This is the turning point of redemptive history. What was reserved for prophets becomes common inheritance. The democracy of the Spirit begins here.',
        },
        {
          name: 'Judgment Through Nature',
          definition:
            'Creation itself becomes the instrument of divine judgment.',
          appears:
            'The locust army; fire and drought; the sun turned to darkness and the moon to blood.',
          matters:
            'Joel sees no distinction between natural disaster and divine action. The locusts are both insects and army, both plague and prophecy.',
        },
        {
          name: 'Restoration',
          definition:
            'God reversing the effects of judgment and giving back what was lost.',
          appears:
            '"I will restore to you the years that the swarming locust has eaten" (2:25); grain, wine, and oil returned; mountains dripping wine; fountains flowing from the temple.',
          matters:
            'Restoration is not mere recovery but abundance. God does not just replace what was lost; He exceeds it.',
        },
      ],
    },

    // ----------------------------------------------------------------- places
    {
      id: 'places',
      heading: 'The Geography',
      figures: [
        {
          art: `           THE NATIONS
               │
               ▼
        VALLEY OF JEHOSHAPHAT
        "the LORD judges"
               │
               ▼
           JERUSALEM ──── the temple
               │          where the assembly gathers
               │
               ▼
            ZION ──────── "the LORD dwells in Zion"
               │
               ▼
        FOUNTAIN FROM TEMPLE
               │
               ▼
        VALLEY OF SHITTIM
        "the desert blooms"`,
          caption: 'Zion at center, the nations gathered for judgment.',
        },
      ],
      entries: [
        {
          term: 'The Valley of Jehoshaphat',
          detail:
            'A symbolic name meaning "the LORD judges." This is where the nations are gathered for final judgment. Some identify it with the Kidron Valley east of Jerusalem; Joel may intend something larger than geography.',
        },
        {
          term: 'Zion / Jerusalem',
          detail:
            'The center of the world in Joel\`s vision. The temple mount, where the assembly gathers, where God dwells, from which the fountain flows. "Jerusalem shall be holy, and strangers shall never again pass through it."',
        },
        {
          term: 'The Valley of Shittim',
          detail:
            'A dry valley watered by the fountain from the temple. The image is of desert becoming garden, judgment reversing into abundance.',
        },
        {
          term: 'Egypt and Edom',
          detail:
            'Named as examples of nations that will become desolate, because of violence done to Judah. They stand for all hostile powers.',
        },
      ],
    },

    // ------------------------------------------------------------ the locusts
    {
      id: 'locusts',
      heading: 'The Locust Army',
      body: [
        'Joel describes the locusts with the language of invasion. They are an army with the LORD at its head. The metaphor works in both directions: the locusts are like an army, and armies are like locusts.',
      ],
      figures: [
        {
          art: `   THE FOUR WAVES (1:4)
   ─────────────────────
   gazam ─── "cutting locust"     ───┐
   arbeh ─── "swarming locust"    ───┤ four words
   yeleq ─── "hopping locust"     ───┤ same destruction
   hasil ─── "destroying locust"  ───┘ nothing left

   THE ARMY (2:1–11)
   ─────────────────
   like dawn spreading on mountains
   a great and powerful people
   fire before them, flame behind
   horses, war horses
   chariots on mountaintops
   they do not break ranks
   the LORD utters his voice at the head`,
          caption: 'Insects become invasion.',
        },
      ],
      closing: [
        'The horror of 2:1–11 is that God is leading this army. "The LORD utters his voice before his army." The locusts are judgment, and the judge is present in the judgment.',
      ],
    },

    // ------------------------------------------------------------ the spirit
    {
      id: 'spirit',
      heading: 'The Spirit Poured Out',
      body: [
        'Joel 2:28–32 is the most consequential passage in the book. Peter quotes it at Pentecost to explain what is happening. The outpouring of the Spirit marks the beginning of the last days.',
      ],
      figures: [
        {
          art: `   "And it shall come to pass afterward,
      that I will pour out my Spirit on all flesh;

    your sons and your daughters shall prophesy,
      your old men shall dream dreams,
      your young men shall see visions.

    Even on the male and female servants
      in those days I will pour out my Spirit.

    And I will show wonders in the heavens
      and on the earth,
      blood and fire and columns of smoke.

    The sun shall be turned to darkness,
      and the moon to blood,
      before the great and awesome day of the LORD comes.

    And it shall come to pass that everyone
      who calls on the name of the LORD shall be saved."

                                  — Joel 2:28–32`,
          caption: 'The democracy of the Spirit.',
        },
      ],
      closing: [
        'What was once restricted is now universal. Sons and daughters, old and young, slave and free. The Spirit that rested on Moses and the elders, on David and the prophets, now falls on all flesh. Joel does not explain how this happens; he announces that it will. Peter at Pentecost says: this is that.',
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Joel Sits in Scripture',
      entries: [
        {
          term: 'The plagues of Egypt',
          detail:
            'Joel\`s locusts echo the eighth plague. What God sent on Egypt, He now sends on His own people. The exodus pattern is reversed: judgment begins at the house of God.',
        },
        {
          term: 'Amos and Obadiah',
          detail:
            'Joel shares phrases with both. "The LORD roars from Zion" appears in both Joel (3:16) and Amos (1:2). The judgment on Edom connects to Obadiah. Joel is woven into the fabric of the Twelve.',
        },
        {
          term: 'Ezekiel',
          detail:
            'The fountain flowing from the temple (Joel 3:18) is developed fully in Ezekiel 47. Water from the sanctuary bringing life to the desert.',
        },
        {
          term: 'Acts 2',
          detail:
            'Peter quotes Joel 2:28–32 at Pentecost. The tongues of fire, the prophesying, the international crowd understanding: this is the fulfillment Joel foresaw.',
        },
        {
          term: 'Revelation',
          detail:
            'The sun darkened, the moon to blood, the nations gathered for judgment: Joel\`s imagery runs through the apocalypse. The Day of the LORD is still coming.',
        },
      ],
      closing: [
        'Joel is brief but foundational. The outpouring of the Spirit, the cosmic signs, the nations gathered for judgment: these become standard furniture in apocalyptic expectation. A locust plague in Judah becomes a lens for seeing the end of history.',
      ],
    },

    // -------------------------------------------------------------- ending
    {
      id: 'ending',
      heading: 'The Final Vision',
      body: [
        'Joel ends with abundance and presence. The mountains drip wine, the hills flow with milk, the valley is watered from the temple, and the LORD dwells in Zion. What began with devastation ends with overflow.',
      ],
      figures: [
        {
          art: `   "And in that day
      the mountains shall drip sweet wine,
      and the hills shall flow with milk,
    and all the streambeds of Judah
      shall flow with water;
    and a fountain shall come forth from the house of the LORD
      and water the Valley of Shittim.

    Egypt shall become a desolation
      and Edom a desolate wilderness,
    for the violence done to the people of Judah,
      because they have shed innocent blood in their land.

    But Judah shall be inhabited forever,
      and Jerusalem to all generations.
    I will avenge their blood,
      blood I have not avenged,
      for the LORD dwells in Zion."

                                  — Joel 3:18–21`,
          caption: 'The LORD dwells in Zion.',
        },
      ],
      closing: [
        'The last word is presence. "The LORD dwells in Zion." This is what all the judgment and restoration pointed toward: not just grain and wine returned, but God returned. The locusts stripped the land; the Spirit fills it. The Day of the LORD is terrible, but what comes after is God Himself, dwelling with His people.',
      ],
    },
  ],
};
