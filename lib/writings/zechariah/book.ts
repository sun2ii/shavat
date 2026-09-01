import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Zechariah: the ground a reader should be standing on before
 * the first verse. A post-exilic prophet painting the clearest portrait of the
 * Messiah in all the prophets.
 */
export const ZECHARIAH: BookOrientation = {
  slug: 'zechariah',
  title: 'Zechariah',
  subtitle: 'The Messianic Blueprint',
  scripture: 'Zechariah 1–14',
  summary:
    'Eight visions of cosmic restoration, followed by the clearest portrait of Israel\`s coming King: humble, betrayed, pierced, and enthroned.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Zechariah is the most explicitly messianic book in the Old Testament. Where other prophets offer glimpses, Zechariah provides a portrait: a king riding a donkey, sold for thirty pieces of silver, pierced by those he came to save, a shepherd struck so the sheep scatter. The New Testament quotes Zechariah more than any other prophet except Isaiah.',
        'The book divides into three distinct sections. Chapters 1 through 6 contain eight night visions, strange and symbolic, given over a single night in 520 BC. Chapters 7 and 8 address questions about fasting and pivot from past judgment to future glory. Chapters 9 through 14 are two oracles of burden, marked by the phrase "the burden of the word of the LORD." These final chapters shift style dramatically: no more dated visions, only eschatological poetry about the coming king and the final battle.',
        'Read Zechariah in layers. The night visions establish that God is awake to Jerusalem\`s future while the nations sleep in false security. The oracles apply that awakening to the Messiah and the end of history.',
      ],
      figures: [
        {
          art: `  EXILES RETURN (538 BC)
    │
    ▼
  TEMPLE STALLED .......... discouragement, opposition
    │
    ▼
  HAGGAI + ZECHARIAH ...... 520 BC: prophets arise
    │
    ▼
  NIGHT VISIONS ........... chapters 1–6
    │                        eight visions in one night
    │                        horsemen, horns, measuring line,
    │                        Joshua cleansed, lampstand, scroll,
    │                        woman in basket, chariots
    ▼
  FASTING QUESTIONS ....... chapters 7–8
    │                        should we keep mourning?
    │                        look forward, not back
    ▼
  ORACLE ONE .............. chapters 9–11
    │                        the King comes humble
    │                        sold for thirty silver
    ▼
  ORACLE TWO .............. chapters 12–14
                             pierced one mourned
                             fountain opened for sin
                             final battle, Yahweh reigns`,
          caption: 'The whole book: visions, questions, oracles.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Zechariah prophesied in the early years of the return from Babylon. The first exiles had come back under Zerubbabel and Joshua in 538 BC, fired with hope to rebuild the temple. They laid the foundation, then stopped. Opposition from neighbors, crop failures, and discouragement paralyzed them for sixteen years.',
        'In 520 BC, two prophets arose: Haggai and Zechariah. Haggai was blunt: You live in paneled houses while God\`s house lies in ruins. Zechariah was visionary: God is not done with Jerusalem, and the temple you build now points to something far greater. Together they restarted the work. The temple was completed in 516 BC.',
        'The first eight chapters date precisely to this period, with specific dates given in the text. The final six chapters (9 through 14) carry no dates and shift to apocalyptic poetry. Many scholars see them as later, but the book presents itself as a unity, and the messianic themes in the second half fulfill what the visions in the first half prepare.',
      ],
      entries: [
        {
          term: 'The Persian period',
          role: 'the new world order',
          detail:
            'Cyrus of Persia conquered Babylon in 539 BC and reversed the deportation policy. Jews could go home. But home was rubble, and the Persians remained overlords. Zechariah speaks to a people technically free but functionally colonized, rebuilding a modest temple under foreign rule. The visions promise something greater.',
        },
        {
          term: 'Zerubbabel',
          role: 'the governor',
          detail:
            'Grandson of King Jehoiachin, appointed governor of Judah by the Persians. He represents the Davidic line under constraint. Zechariah addresses him directly: "Not by might, nor by power, but by my Spirit." Zerubbabel will complete the temple, but the crown belongs to someone greater.',
        },
        {
          term: 'Joshua the high priest',
          role: 'the cleansed one',
          detail:
            'High priest of the return, partner with Zerubbabel in rebuilding. In Zechariah\`s fourth vision, Joshua stands before the angel in filthy garments, accused by the Satan. The LORD rebukes the accuser and reclothes Joshua in pure vestments. The priesthood is cleansed so it can point forward.',
        },
        {
          term: 'The temple rebuilding',
          role: 'the present work',
          detail:
            'The immediate occasion for Zechariah\`s prophecy. The temple had been destroyed in 586 BC; rebuilding began in 538 BC and stalled until 520 BC. Zechariah and Haggai pushed it to completion by 516 BC. But this second temple was disappointing to those who remembered Solomon\`s glory. Zechariah promises that the latter glory will exceed the former.',
        },
      ],
    },

    // ------------------------------------------------------------ structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The book falls into three distinct blocks, each with its own style and concern. The visions are dated and symbolic; the oracles are undated and eschatological. The fasting section bridges them.',
      ],
      figures: [
        {
          art: `   PART ONE: EIGHT NIGHT VISIONS (1:1–6:15)
   ─────────────────────────────────────────
   1:7–17    Horsemen among the myrtles
   1:18–21   Four horns, four craftsmen
   2:1–13    The man with a measuring line
   3:1–10    Joshua cleansed, the Branch promised
   4:1–14    Golden lampstand and two olives
   5:1–4     Flying scroll of judgment
   5:5–11    Woman in a basket (wickedness removed)
   6:1–8     Four chariots from bronze mountains

   6:9–15    Crowning of Joshua: the Branch

   PART TWO: FASTING AND FUTURE (7:1–8:23)
   ─────────────────────────────────────────
   7:1–14    Why did you fast? For whom?
   8:1–23    Future glory: nations will seek the LORD

   PART THREE: TWO ORACLES (9:1–14:21)
   ─────────────────────────────────────────
   9:1–11:17   Oracle One: the humble King
               9:9   King on a donkey
               11:12–13   Thirty pieces of silver

   12:1–14:21  Oracle Two: the pierced One
               12:10   They will look on me whom they pierced
               13:7    Strike the shepherd
               14:1–21 The Day of the LORD`,
          caption: 'Three blocks: visions, transition, oracles.',
        },
        {
          art: `   THE EIGHT VISIONS: A CHIASTIC STRUCTURE
   ─────────────────────────────────────────
   1. Horsemen patrol the earth ────┐
                                    │ Cosmic surveillance
   8. Chariots patrol the earth ────┘

   2. Horns and craftsmen ──────────┐
                                    │ Enemies defeated
   7. Woman in basket (sin removed)─┘

   3. Measuring line (city expanded)─┐
                                     │ Jerusalem restored
   6. Flying scroll (sin judged) ────┘

   4. Joshua cleansed ──────────────┐
                                    │ CENTER: Leadership
   5. Lampstand + two olives ───────┘
              priest + king
              "by my Spirit"`,
          caption: 'The visions mirror each other, centering on Spirit-empowered leadership.',
        },
      ],
      closing: [
        'Notice the inversion. The outer visions deal with cosmic affairs: God patrolling the whole earth. The inner visions deal with Jerusalem: cleansing, rebuilding, judgment on sin. At the very center stand Joshua the priest and Zerubbabel the governor, flanking the lampstand. The message: what God is doing in the whole earth converges on these two offices, which will one day merge in one person, the Branch.',
      ],
    },

    // ------------------------------------------------------------ night visions
    {
      id: 'visions',
      heading: 'The Eight Night Visions',
      body: [
        'All eight visions occurred in a single night: February 15, 519 BC. They form a unified message about God\`s plans for Jerusalem, the cleansing of sin, and the coming of the Messiah. An interpreting angel guides Zechariah through each scene.',
      ],
      entries: [
        {
          term: 'Vision 1: Horsemen among the myrtles',
          role: '1:7–17',
          detail:
            'Divine horsemen patrol the earth and report that the nations are at ease while Jerusalem suffers. God responds: "I am exceedingly jealous for Jerusalem." The nations are comfortable; God is not. Comfort for the complacent is a problem.',
        },
        {
          term: 'Vision 2: Four horns and four craftsmen',
          role: '1:18–21',
          detail:
            'Four horns represent the powers that scattered Judah; four craftsmen come to terrify and cast them down. Empire has an expiration date.',
        },
        {
          term: 'Vision 3: The man with a measuring line',
          role: '2:1–13',
          detail:
            'A man sets out to measure Jerusalem for walls. An angel stops him: Jerusalem will overflow its walls, and God himself will be a wall of fire around it. The city cannot be contained.',
        },
        {
          term: 'Vision 4: Joshua cleansed',
          role: '3:1–10',
          detail:
            'Joshua the high priest stands in filthy garments, accused by the Satan. The LORD rebukes the accuser, removes Joshua\`s filth, and clothes him in pure robes. The priesthood is not clean enough; God makes it clean. Then: "I will bring my servant the Branch." Priesthood points forward.',
        },
        {
          term: 'Vision 5: The golden lampstand',
          role: '4:1–14',
          detail:
            'A lampstand fed by two olive trees, which are two anointed ones: priest and king, Joshua and Zerubbabel. The word to Zerubbabel: "Not by might, nor by power, but by my Spirit." Temple-building is Spirit-work.',
        },
        {
          term: 'Vision 6: The flying scroll',
          role: '5:1–4',
          detail:
            'A massive scroll flying over the land, carrying curses for thieves and liars. Sin will be judged; wickedness cannot stay hidden.',
        },
        {
          term: 'Vision 7: The woman in the basket',
          role: '5:5–11',
          detail:
            'A woman representing wickedness is stuffed into a basket and carried to Babylon, where a house is built for her. Sin is not merely judged; it is removed and relocated. Judah is being cleansed.',
        },
        {
          term: 'Vision 8: Four chariots',
          role: '6:1–8',
          detail:
            'Four chariots emerge from between two bronze mountains and patrol the earth. The one going north "sets my Spirit at rest in the north country." Babylon, the place of exile, receives God\`s judgment. The cycle closes where it began: divine patrols, but now with resolution.',
        },
      ],
      figures: [
        {
          art: `   MOVEMENT OF THE VISIONS
   ─────────────────────────────────────

   COSMOS (1–2)          COSMOS (7–8)
   God patrols earth     Wickedness removed
   Enemies will fall     Chariots sent out
          │                     │
          ▼                     ▼
        ┌───────────────────────────┐
        │    CENTER: JERUSALEM      │
        │                           │
        │  City expands (3)         │
        │  Sin judged (6)           │
        │                           │
        │    ┌─────────────────┐    │
        │    │  LEADERSHIP     │    │
        │    │  Joshua cleansed│    │
        │    │  Lampstand fed  │    │
        │    │  "by my Spirit" │    │
        │    └─────────────────┘    │
        └───────────────────────────┘`,
          caption: 'From world to city to leadership to Spirit.',
        },
      ],
    },

    // ------------------------------------------------------------ the branch
    {
      id: 'branch',
      heading: 'The Branch',
      body: [
        'The term "Branch" (Hebrew: tsemach) appears four times in the prophets as a messianic title: Isaiah 4:2, Jeremiah 23:5, Jeremiah 33:15, and twice in Zechariah. It is a royal sprouting from the stump of David\`s line. In Zechariah, the Branch merges offices that were always separate.',
      ],
      figures: [
        {
          art: `   "Behold, I will bring my servant the Branch."
                                        — 3:8

   "Behold, the man whose name is the Branch:
    he shall branch out from his place,
    and he shall build the temple of the LORD...
    and shall bear royal honor,
    and shall sit and rule on his throne.
    And there shall be a priest on his throne,
    and the counsel of peace shall be between them both."
                                        — 6:12–13


   PRIEST ══════════╗
                    ║
                    ╠════ THE BRANCH
                    ║
   KING ════════════╝

   Two offices, one throne.`,
          caption: 'The Branch is both priest and king: offices never combined in Israel.',
        },
      ],
      closing: [
        'In Israel, kings could not be priests and priests could not be kings. Uzziah was struck with leprosy for burning incense in the temple. The offices were separated by law. But Zechariah sees them merging in one figure: the Branch will build the temple, sit on the throne, and wear the priestly crown. The counsel of peace will be between them both, meaning the offices will no longer be in tension. They will be one.',
      ],
    },

    // ------------------------------------------------------------ messianic passages
    {
      id: 'messiah',
      heading: 'The Messianic Portrait',
      body: [
        'The second half of Zechariah (chapters 9 through 14) paints the most detailed portrait of the Messiah in the Old Testament. These passages were quoted more by Jesus and the Gospel writers than any other prophetic book except Isaiah.',
      ],
      figures: [
        {
          art: `   "Rejoice greatly, O daughter of Zion!
      Shout aloud, O daughter of Jerusalem!
    Behold, your king is coming to you;
      righteous and having salvation is he,
    humble and mounted on a donkey,
      on a colt, the foal of a donkey."

                                — Zechariah 9:9

   ┌────────────────────────────────────────────┐
   │  Fulfilled: Palm Sunday                    │
   │  Matthew 21:5, John 12:15                  │
   │  Jesus enters Jerusalem on a donkey        │
   └────────────────────────────────────────────┘`,
          caption: 'The humble king.',
        },
        {
          art: `   "Then I said to them, 'If it seems good to you,
      give me my wages; but if not, keep them.'
    And they weighed out as my wages
      thirty pieces of silver.

    Then the LORD said to me,
      'Throw it to the potter'—
      the lordly price at which I was priced by them.
    So I took the thirty pieces of silver
      and threw them into the house of the LORD,
      to the potter."

                                — Zechariah 11:12–13

   ┌────────────────────────────────────────────┐
   │  Fulfilled: Judas\` betrayal                │
   │  Matthew 26:15, 27:9–10                    │
   │  Thirty pieces of silver, thrown into      │
   │  the temple, used to buy a potter\`s field  │
   └────────────────────────────────────────────┘`,
          caption: 'The price of the shepherd.',
        },
        {
          art: `   "And I will pour out on the house of David
      and the inhabitants of Jerusalem
    a spirit of grace and pleas for mercy,
      so that, when they look on me,
      on him whom they have pierced,
    they shall mourn for him,
      as one mourns for an only child,
    and weep bitterly over him,
      as one weeps over a firstborn."

                                — Zechariah 12:10

   ┌────────────────────────────────────────────┐
   │  Fulfilled: The crucifixion                │
   │  John 19:37, Revelation 1:7                │
   │  "They will look on him whom they pierced" │
   └────────────────────────────────────────────┘`,
          caption: 'The pierced one.',
        },
        {
          art: `   "Awake, O sword, against my shepherd,
      against the man who stands next to me,"
        declares the LORD of hosts.
    "Strike the shepherd, and the sheep will be scattered."

                                — Zechariah 13:7

   ┌────────────────────────────────────────────┐
   │  Fulfilled: Gethsemane                     │
   │  Matthew 26:31, Mark 14:27                 │
   │  Jesus quotes this as the disciples flee   │
   └────────────────────────────────────────────┘`,
          caption: 'The struck shepherd.',
        },
      ],
      closing: [
        'Notice the paradox: the king comes humble, not conquering. The shepherd is paid the price of a slave. The one they pierce is the one they mourn. The shepherd is struck by God\`s own sword. This is not triumphalist messianism but suffering messianism. Zechariah prepares Israel for a Messiah who will be rejected before being received.',
      ],
    },

    // ------------------------------------------------------------ themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'God\`s Jealousy for Jerusalem',
          definition:
            'Divine passion for His city, expressed as anger at those who harmed it and commitment to restore it.',
          appears:
            '"I am exceedingly jealous for Jerusalem and for Zion" (1:14); "I am jealous for Zion with great jealousy, and I am jealous for her with great wrath" (8:2).',
          matters:
            'Jealousy in God is not petty; it is covenantal. He is jealous the way a husband is jealous for a wife. Jerusalem is not merely real estate; it is the place where His name dwells.',
        },
        {
          name: 'Cleansing from Sin',
          definition:
            'The removal of guilt and wickedness, making the people fit for God\`s presence.',
          appears:
            'Joshua\`s filthy garments removed (3:4); the flying scroll judging sin (5:1–4); wickedness carried to Babylon (5:5–11); "On that day there shall be a fountain opened for the house of David to cleanse them from sin" (13:1).',
          matters:
            'The temple can be rebuilt, but if the people remain unclean, nothing changes. Zechariah promises both external rebuilding and internal cleansing. The fountain for sin is the ultimate solution.',
        },
        {
          name: 'Not by Might but by Spirit',
          definition:
            'God\`s work accomplished through divine power, not human effort.',
          appears:
            '"Not by might, nor by power, but by my Spirit, says the LORD of hosts" (4:6).',
          matters:
            'Zerubbabel is building a temple with meager resources under foreign rule. The visions say: do not measure success by resources. The Spirit completes what might cannot.',
        },
        {
          name: 'The Day of the LORD',
          definition:
            'The future moment when God intervenes decisively in history to judge and to save.',
          appears:
            'Throughout chapters 12 through 14: Jerusalem attacked, the LORD fighting, living waters flowing, the LORD becoming king over all the earth.',
          matters:
            'Zechariah places current events in eschatological context. The temple they are building, the city they are restoring: these are not endpoints but waypoints toward a Day when God will act finally.',
        },
        {
          name: 'The Nations Coming to Zion',
          definition:
            'Gentiles drawn to Jerusalem to seek the LORD.',
          appears:
            '"Many nations shall join themselves to the LORD in that day" (2:11); "Ten men from the nations shall take hold of the robe of a Jew" (8:23); nations coming up to keep the Feast of Booths (14:16).',
          matters:
            'Israel\`s restoration is not nationalistic isolation but becomes a magnet for the nations. The endgame is not Israel alone but all peoples seeking the LORD.',
        },
        {
          name: 'Suffering before Glory',
          definition:
            'The Messiah rejected, struck, and pierced before being recognized and enthroned.',
          appears:
            'The shepherd sold for thirty silver (11:12–13); the shepherd struck (13:7); the pierced one mourned (12:10).',
          matters:
            'Zechariah prepares for a Messiah who does not come in obvious triumph. The pattern is suffering first, then recognition. This is why the disciples did not understand: they expected glory without the cross.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Zechariah Sits in Scripture',
      entries: [
        {
          term: 'Haggai',
          detail:
            'Contemporary prophet, working alongside Zechariah to restart the temple. Haggai is practical and immediate; Zechariah is visionary and eschatological. Together they cover both the present work and its ultimate meaning.',
        },
        {
          term: 'Ezekiel',
          detail:
            'Ezekiel, an exile prophet before the return, saw visions of departure (the glory leaving the temple) and return (the new temple with waters flowing east). Zechariah picks up these themes: Jerusalem restored, sin removed, living waters flowing from the city.',
        },
        {
          term: 'Daniel',
          detail:
            'Another exile prophet with apocalyptic visions. Daniel\`s "one like a son of man" coming on clouds and Zechariah\`s humble king on a donkey are complementary portraits: the same figure, seen from different angles.',
        },
        {
          term: 'Isaiah',
          detail:
            'Isaiah\`s Suffering Servant (Isaiah 53) and Zechariah\`s pierced shepherd illuminate each other. Both describe a figure rejected, wounded, and mourned. Isaiah focuses on substitutionary suffering; Zechariah on Israel\`s future recognition of the one they pierced.',
        },
        {
          term: 'The Gospels',
          detail:
            'Zechariah is quoted at the triumphal entry (9:9), at the Last Supper regarding the shepherd struck (13:7), and at the crucifixion regarding the pierced one (12:10). John 19:37 applies the piercing directly to Jesus on the cross.',
        },
        {
          term: 'Revelation',
          detail:
            'Revelation 1:7 quotes Zechariah 12:10: "Every eye will see him, even those who pierced him, and all tribes of the earth will wail on account of him." The mourning is extended from Israel to all nations. The lampstand imagery and the final battle also echo Zechariah.',
        },
      ],
      closing: [
        'Zechariah is the hinge between Old Testament hope and New Testament fulfillment. More than any other prophet, he provides the specific details that the Gospel writers recognized in Jesus: the donkey, the silver, the piercing, the scattering. To read Zechariah is to see the cross before it happened.',
      ],
    },

    // ------------------------------------------------------------ chapter 14
    {
      id: 'chapter14',
      heading: 'The Final Vision',
      body: [
        'Chapter 14 is the climax: the Day of the LORD in its fullest expression. Jerusalem is attacked, the LORD descends to fight, the Mount of Olives splits, living waters flow, and the LORD becomes king over all the earth. It is the most apocalyptic chapter in the Minor Prophets.',
      ],
      figures: [
        {
          art: `   THE DAY OF THE LORD (Zechariah 14)
   ─────────────────────────────────────

   Jerusalem besieged, city taken ─────────┐
                                           │
   "Then the LORD will go out              │
    and fight against those nations" ──────┤
                                           │
   His feet stand on the Mount of Olives   │
   The mountain splits east and west ──────┤
                                           │
   Living waters flow from Jerusalem       │
   half to the eastern sea                 │
   half to the western sea ────────────────┤
                                           │
   "The LORD will be king over             │
    all the earth.                         │
   On that day the LORD will be one        │
    and his name one." ────────────────────┘

                                           │
                                           ▼

   The nations come up year by year
   to worship the King, the LORD of hosts
   and to keep the Feast of Booths.

   Even the bells of the horses:
     "HOLY TO THE LORD"
   Every pot in Jerusalem: holy.`,
          caption: 'From siege to worship. Everything becomes holy.',
        },
      ],
      closing: [
        'The chapter moves from catastrophe to consummation. Jerusalem falls, then God fights. The familiar geography transforms: mountains split, waters flow where none flowed before. The pagan nations who attacked Jerusalem now come annually to worship. The distinction between sacred and common dissolves: even horse bells and cooking pots become as holy as temple vessels. The book that began with a small community rebuilding a modest temple ends with the whole earth as God\`s sanctuary.',
      ],
    },

    // ------------------------------------------------------------ reading
    {
      id: 'reading',
      heading: 'How to Read Zechariah',
      body: [
        'Read the night visions as a unit. They were given in one night and form a single message: God is cleansing His people, empowering their leaders, and preparing for something greater than the current temple. The strangeness is intentional; these are dreams, not newspaper articles.',
        'Read chapters 9 through 14 with the Gospels nearby. When you encounter the king on a donkey, remember Palm Sunday. When you read of thirty pieces of silver, think of Judas. When you see the shepherd struck and sheep scattered, recall Gethsemane. The cross is everywhere in these chapters.',
        'Do not flatten the timeline. Zechariah mixes near and far fulfillment. Some of what he sees happened in his lifetime (temple completed), some at the first coming (the humble king), some awaits the second coming (the final battle, living waters, universal recognition). Prophetic vision is not a linear timeline but a mountain range: peaks appear close together though valleys separate them.',
      ],
      figures: [
        {
          art: `   ZECHARIAH\`S VIEW OF HISTORY
   ─────────────────────────────

   PRESENT           FIRST COMING        SECOND COMING
   520 BC            ~30 AD              Future
     │                  │                    │
     ▼                  ▼                    ▼
   temple          humble king          final battle
   rebuilt         sold, struck,        nations worship
                   pierced              living waters
                                        LORD is King
     │                  │                    │
     └──────────────────┴────────────────────┘
                        │
         All seen in one prophetic vision
         Peaks appear adjacent though
         valleys of centuries separate them`,
          caption: 'Prophetic foreshortening: distant peaks look close.',
        },
      ],
      closing: [
        'Zechariah wrote for a discouraged remnant rebuilding a small temple under foreign rule. His message: this modest work matters because it connects to something cosmic. The current governor points to the Branch. The current cleansing points to the fountain for sin. The current building points to the day when the LORD will be king over all the earth and his name will be one. Keep building.',
      ],
    },
  ],
};
