import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Amos: the ground a reader should be standing on before
 * the first verse. A shepherd from Judah sent north to indict the wealthy
 * who trample the poor while playing at religion.
 */
export const AMOS: BookOrientation = {
  slug: 'amos',
  title: 'Amos',
  subtitle: 'The Roar of Justice',
  scripture: 'Amos 1-9',
  summary:
    'A shepherd from Tekoa pronounces judgment on nations and on Israel, exposing the rot beneath religious prosperity.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Amos is a book about justice. Not justice as abstract principle but justice as the test of whether you know God at all. Israel is prosperous, religious, and rotten. The wealthy trample the poor, the courts are corrupt, and the shrines are full. Amos comes from the south to tell the north that God is not impressed.',
        'The book has a clear shape. Chapters 1 and 2 deliver oracles against the nations, spiraling inward from Damascus to Gaza to Tyre to Edom to Ammon to Moab to Judah and finally to Israel. The audience cheers as enemies are condemned, then discovers they are next. Chapters 3 through 6 are sermons of indictment. Chapters 7 through 9 are visions of judgment, interrupted by a confrontation with the priest Amaziah.',
        'The famous line comes in chapter 5: "Let justice roll down like waters, and righteousness like an ever-flowing stream." This is not poetry decoration. It is the demand. Everything else in the book leads to it or flows from it.',
      ],
      figures: [
        {
          art: `  ORACLES AGAINST NATIONS (1-2)
    │
    ├─ Damascus, Gaza, Tyre
    ├─ Edom, Ammon, Moab
    ├─ Judah
    └─ ISRAEL ............. the real target
    │
    ▼
  THREE SERMONS (3-6)
    │
    ├─ "Hear this word" .... 3:1
    ├─ "Hear this word" .... 4:1
    └─ "Hear this word" .... 5:1
    │
    ▼
  FIVE VISIONS (7-9)
    │
    ├─ Locusts ............ averted
    ├─ Fire ............... averted
    ├─ Plumb line ......... no reprieve
    │   └─ [Amaziah confrontation]
    ├─ Summer fruit ....... end has come
    └─ Lord at the altar .. destruction
    │
    ▼
  RESTORATION (9:11-15)`,
          caption: 'The whole book: nations, sermons, visions, then hope.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Amos prophesied around 760-750 BC, during the reign of Jeroboam II in Israel and Uzziah in Judah. This was the golden age of the northern kingdom. Borders had expanded, trade flourished, the wealthy built summer houses and winter houses, and the shrines at Bethel and Gilgal were packed with worshipers.',
        'The prosperity was real but unevenly distributed. The rich got richer by dispossessing the poor. Debt slavery was common. Courts favored those who could pay bribes. The poor were sold for the price of sandals. Meanwhile, the religious calendar continued uninterrupted. Festivals, sacrifices, tithes, the whole apparatus of piety operated at full capacity.',
        'Amos saw what others missed: the connection between the two. You cannot worship the God who brought slaves out of Egypt while creating new slaves at home. The religious boom was not evidence of God\`s favor; it was evidence of God\`s patience running out.',
      ],
      entries: [
        {
          term: 'Jeroboam II',
          role: 'king of Israel',
          detail:
            'The most successful king the north ever had, measured by territory and wealth. Under him Israel reached its greatest extent since Solomon. Amos came at the peak of this success to announce its end.',
        },
        {
          term: 'The earthquake',
          role: 'the timestamp',
          detail:
            'The book dates itself to "two years before the earthquake." This earthquake was remembered for generations; Zechariah mentions it two centuries later. It became a symbol of the day of the Lord.',
        },
        {
          term: 'Bethel',
          role: 'royal sanctuary',
          detail:
            'The primary shrine of the northern kingdom, established by Jeroboam I after the split. By Amos\`s day it was the center of a religious establishment that served the state. Amos was expelled from there.',
        },
        {
          term: 'Assyria',
          role: 'the unnamed threat',
          detail:
            'Amos never names Assyria, but the "nation" God will raise against Israel is Assyria. Within thirty years of Amos\`s prophecy, Assyria would conquer the north and deport its population.',
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
         │ sends
         ▼
       AMOS ──────────────── sent to ──────────────── ISRAEL
    shepherd                                      northern kingdom
    from Tekoa                                    under Jeroboam II
         │
         │ confronts
         ▼
      AMAZIAH ─────────────── serves ──────────────── BETHEL
    priest                                         royal sanctuary
    at Bethel`,
          caption: 'An outsider sent to confront the establishment.',
        },
      ],
      entries: [
        {
          term: 'Amos',
          role: 'the outsider prophet',
          detail:
            'A shepherd and dresser of sycamore figs from Tekoa, a village in Judah about ten miles south of Jerusalem. He was not a professional prophet, not trained in the prophetic guilds, not from the north. He was a laborer whom God took from following the flock and sent to prophesy to Israel. His outsider status is essential; he owes nothing to the northern establishment.',
        },
        {
          term: 'Amaziah',
          role: 'the establishment priest',
          detail:
            'Priest at Bethel, the royal sanctuary. When Amos prophesied that Jeroboam would die by the sword and Israel would go into exile, Amaziah reported him to the king and ordered him to go back to Judah. He called Amos a "seer" and told him to earn his bread there. Amos\`s response: "I was no prophet, nor a prophet\`s son... the LORD took me."',
        },
        {
          term: 'Jeroboam II',
          role: 'the successful king',
          detail:
            'King of Israel at its zenith. He appears only indirectly, through Amaziah\`s report. Amos predicts his house will fall by the sword. The prophecy was fulfilled: his son Zechariah reigned six months before being assassinated.',
        },
        {
          term: 'The cows of Bashan',
          role: 'the wealthy women',
          detail:
            'Amos\`s name for the wealthy women of Samaria who oppress the poor and crush the needy while demanding that their husbands bring them drinks. Bashan was famous for its fat cattle. The image is deliberately insulting.',
        },
      ],
    },

    // ----------------------------------------------------------------- places
    {
      id: 'places',
      heading: 'The Geography',
      figures: [
        {
          art: `                    DAMASCUS ───┐
                                 │
              SAMARIA ───────────┤ capital of Israel
                │                │
              BETHEL ────────────┤ royal sanctuary
              GILGAL ────────────┤ place of pilgrimage
              BEERSHEBA ─────────┤ southern limit
                │                │
              TEKOA ─────────────┤ where Amos came from
                │                │   (in Judah, not Israel)
                                 │
                    EXILE ───────┘ "beyond Damascus"`,
          caption: 'From Tekoa in the south to judgment in the north.',
        },
      ],
      entries: [
        {
          term: 'Tekoa',
          detail:
            'A village in the Judean wilderness, about ten miles south of Jerusalem. Rocky, marginal land suitable for sheep. Amos came from here, an outsider geographically and socially.',
        },
        {
          term: 'Samaria',
          detail:
            'Capital of the northern kingdom, built on a hill. The wealthy there had houses of ivory, winter houses and summer houses. It will be destroyed.',
        },
        {
          term: 'Bethel',
          detail:
            'The chief sanctuary of the north, where Jacob saw the ladder. By Amos\`s day it was a royal chapel serving state religion. Amos was expelled from here by Amaziah.',
        },
        {
          term: 'Gilgal',
          detail:
            'Another pilgrimage site, associated with Israel\`s entry into the land. Now a place of corrupt worship. "Come to Bethel and transgress; to Gilgal and multiply transgression."',
        },
        {
          term: 'Beersheba',
          detail:
            'The southern limit of Israel proper, a pilgrimage site associated with the patriarchs. Israelites from the north would travel there for worship. Amos mocks this too.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The book is carefully constructed. The oracles against nations use a repeated formula ("for three transgressions... and for four") that creates rhythm and expectation. The sermons begin with "hear this word." The visions follow a pattern: two are averted by intercession, three are not.',
      ],
      figures: [
        {
          art: `   PART ONE: ORACLES AGAINST NATIONS (1:1-2:16)
   ─────────────────────────────────────────────
   1:3-5     Damascus    "for three... and for four"
   1:6-8     Gaza
   1:9-10    Tyre
   1:11-12   Edom
   1:13-15   Ammon
   2:1-3     Moab
   2:4-5     Judah       getting closer...
   2:6-16    ISRAEL      the longest, the real target

   PART TWO: SERMONS OF INDICTMENT (3:1-6:14)
   ─────────────────────────────────────────────
   3:1-15    "Hear this word" - privilege brings judgment
   4:1-13    "Hear this word" - failed warnings
   5:1-17    "Hear this word" - lament and call
   5:18-27   Woe: the day of the LORD
   6:1-14    Woe: those at ease in Zion

   PART THREE: VISIONS OF JUDGMENT (7:1-9:10)
   ─────────────────────────────────────────────
   7:1-3     Locusts - "O Lord GOD, please forgive!"
   7:4-6     Fire - "O Lord GOD, please cease!"
   7:7-9     Plumb line - no more intercession
   [7:10-17  Amaziah confrontation]
   8:1-14    Summer fruit - the end has come
   9:1-10    Lord at the altar - no escape

   EPILOGUE: RESTORATION (9:11-15)
   ─────────────────────────────────────────────
   The booth of David raised up
   Return from exile, planting in the land`,
          caption: 'Nations, sermons, visions, then unexpected hope.',
        },
      ],
      closing: [
        'Notice the spiral in the oracles: the nations are condemned for war crimes (brutality, slave trading, breaking treaties), then Judah for rejecting the law, then Israel for everything: injustice, oppression, corruption, religious hypocrisy. The audience\`s cheering turns to silence.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Justice and Righteousness',
          definition:
            'Not abstract principles but concrete practices: honest courts, fair dealing, care for the poor.',
          appears:
            '"Let justice roll down like waters, and righteousness like an ever-flowing stream" (5:24); "you who turn justice to wormwood" (5:7); "they sell the righteous for silver and the needy for a pair of sandals" (2:6).',
          matters:
            'Justice is the test of authentic worship. You cannot separate liturgy from ethics. God rejects their festivals because they pervert justice.',
        },
        {
          name: 'True vs. False Worship',
          definition:
            'Religious activity that does not produce justice is not worship but offense.',
          appears:
            '"I hate, I despise your feasts" (5:21); "Come to Bethel and transgress" (4:4); "Seek me and live" vs. "do not seek Bethel" (5:4-5).',
          matters:
            'The shrines were full. The problem was not absence of religion but religion divorced from righteousness. God is more offended by their worship than by their absence.',
        },
        {
          name: 'The Day of the LORD',
          definition:
            'The expected day of God\`s intervention, which Israel assumed would be salvation but Amos reveals as judgment.',
          appears:
            '"Woe to you who desire the day of the LORD! Why would you have the day of the LORD? It is darkness, and not light" (5:18).',
          matters:
            'Israel assumed their election guaranteed protection. Amos inverts the expectation. Election brings responsibility, and failure brings judgment.',
        },
        {
          name: 'Election and Responsibility',
          definition:
            'Being chosen by God does not grant immunity; it increases accountability.',
          appears:
            '"You only have I known of all the families of the earth; therefore I will punish you for all your iniquities" (3:2).',
          matters:
            'The logic is the opposite of what Israel assumed. "Therefore" connects election not to protection but to punishment. More knowledge means more responsibility.',
        },
        {
          name: 'The Roar of the Lion',
          definition:
            'God as predator, whose voice shakes the land.',
          appears:
            '"The LORD roars from Zion" (1:2); "The lion has roared; who will not fear? The Lord GOD has spoken; who can but prophesy?" (3:8).',
          matters:
            'The opening and the defense of the prophecy both use the lion image. Amos is not speaking because he chose to. The lion has roared; he has no choice.',
        },
        {
          name: 'The Plumb Line',
          definition:
            'God\`s standard of measurement against which Israel is found crooked.',
          appears:
            'The vision of the plumb line (7:7-9). God sets a plumb line in the midst of Israel. What is not straight will be torn down.',
          matters:
            'A plumb line does not compromise. It reveals what is actually vertical. Israel looks prosperous but is not plumb.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Amos Sits in Scripture',
      entries: [
        {
          term: 'The Exodus',
          detail:
            'Amos grounds his indictment in the exodus: "I brought you up out of the land of Egypt" (2:10, 3:1). God\`s deliverance of slaves creates an obligation to care for the vulnerable. You cannot worship the God of the exodus while creating new slaves.',
        },
        {
          term: 'Hosea',
          detail:
            'Contemporary with Amos, also speaking to the northern kingdom. Hosea emphasizes covenant love and unfaithfulness; Amos emphasizes justice and oppression. Together they show the full picture: Israel has betrayed both the heart of the covenant and its demands.',
        },
        {
          term: 'Isaiah',
          detail:
            'Isaiah, slightly later, will echo Amos\`s themes in the south: "What to me is the multitude of your sacrifices?... learn to do good; seek justice, correct oppression" (Isaiah 1:11, 17).',
        },
        {
          term: 'Micah',
          detail:
            'Another contemporary who summarizes the prophetic demand: "What does the LORD require of you but to do justice, and to love kindness, and to walk humbly with your God?" (Micah 6:8). The vocabulary is Amos\`s vocabulary.',
        },
        {
          term: 'James',
          detail:
            'James 5 echoes Amos\`s indictment of the wealthy: "Come now, you rich, weep and howl for the miseries that are coming upon you... You have condemned and murdered the righteous person." The prophetic tradition continues.',
        },
        {
          term: 'Acts 7',
          detail:
            'Stephen quotes Amos 5:25-27 in his speech before being martyred, applying the prophetic critique of false worship to Israel\`s rejection of Jesus. The pattern continues: religious activity that misses the point.',
        },
        {
          term: 'Acts 15',
          detail:
            'James quotes Amos 9:11-12 at the Jerusalem Council, applying the restoration of David\`s booth to the inclusion of Gentiles. The remnant has expanded beyond ethnic Israel.',
        },
      ],
      closing: [
        'Amos stands third in the Book of the Twelve but was likely the earliest writing prophet. His themes ripple through all the prophets: justice as the test of true worship, election as responsibility not immunity, the day of the Lord as judgment before salvation.',
      ],
    },

    // ----------------------------------------------------------- the formula
    {
      id: 'formula',
      heading: 'The Formula',
      body: [
        'The oracles against nations all begin the same way: "For three transgressions of X, and for four, I will not revoke the punishment." The formula creates rhythm and expectation. Three and four means enough and more than enough. The cup is full.',
      ],
      figures: [
        {
          art: `   "For three transgressions of DAMASCUS,
        and for four,
    I will not revoke the punishment..."

   "For three transgressions of GAZA,
        and for four,
    I will not revoke the punishment..."

   [six more nations]

   "For three transgressions of ISRAEL,
        and for four,
    I will not revoke the punishment..."

        │
        │
        ▼

    The indictment of Israel is three times longer
    than any other nation. The real target.`,
          caption: 'The formula that draws the audience in before trapping them.',
        },
      ],
      closing: [
        'The rhetorical strategy is devastating. Each nation is condemned for specific war crimes: ripping open pregnant women, breaking treaties, selling whole populations into slavery. The audience nods along. Then Judah: rejecting the law. Then Israel: selling the righteous for silver, trampling the head of the poor, father and son going to the same girl. The crimes are not military atrocities but economic oppression and religious hypocrisy. The nation that thought itself righteous is the worst of all.',
      ],
    },

    // ----------------------------------------------------------- the center
    {
      id: 'center',
      heading: 'The Center of Amos',
      body: [
        'Chapter 5 is the heart of the book. It begins as a funeral dirge over Israel, moves through a call to seek God and not the shrines, exposes the perversion of justice, and culminates in the most famous verse.',
      ],
      figures: [
        {
          art: `   "Fallen, no more to rise,
        is the virgin Israel;
    forsaken on her land,
        with none to raise her up."
                                  — 5:2

   "Seek me and live;
        but do not seek Bethel,
    and do not enter into Gilgal...
   Seek the LORD and live."
                                  — 5:4-6

   "You who turn justice to wormwood
        and cast down righteousness to the earth..."
                                  — 5:7

   "I hate, I despise your feasts,
        and I take no delight in your solemn assemblies...
    Take away from me the noise of your songs;
        to the melody of your harps I will not listen."
                                  — 5:21-23

   ═══════════════════════════════════════════════════

   "But let justice roll down like waters,
        and righteousness like an ever-flowing stream."

                                  — 5:24

   ═══════════════════════════════════════════════════`,
          caption: 'The demand that still echoes.',
        },
      ],
      closing: [
        'The "ever-flowing stream" is not a seasonal wadi that runs dry. It is a perennial river, constant and unstoppable. Justice is not an occasional virtue but a permanent condition. It does not trickle; it rolls. It does not pause; it flows. This is what God wants instead of worship.',
      ],
    },

    // ----------------------------------------------------------- amaziah
    {
      id: 'amaziah',
      heading: 'The Confrontation',
      body: [
        'In the middle of the visions, the narrative breaks for a confrontation between Amos and Amaziah, the priest of Bethel. This is the only prose narrative in the book, and it crystallizes the conflict between prophetic word and institutional religion.',
      ],
      figures: [
        {
          art: `   AMAZIAH to the king:
   ───────────────────
   "Amos has conspired against you
    in the midst of the house of Israel.
   The land is not able to bear all his words."

   AMAZIAH to Amos:
   ────────────────
   "O seer, go, flee away to the land of Judah,
    and eat bread there, and prophesy there,
   but never again prophesy at Bethel,
    for it is the king\`s sanctuary,
    and it is a temple of the kingdom."

   AMOS to Amaziah:
   ────────────────
   "I was no prophet, nor a prophet\`s son,
    but I was a herdsman and a dresser of sycamore figs.
   And the LORD took me from following the flock,
    and the LORD said to me,
   \`Go, prophesy to my people Israel.\`"

                                  — 7:10-15`,
          caption: 'The establishment tells the outsider to leave.',
        },
      ],
      closing: [
        'Amaziah calls Bethel "the king\`s sanctuary" and "a temple of the kingdom." That is precisely the problem. It is the king\`s, not God\`s. Amos\`s response is not credentials but calling. He did not choose this role; he was taken. The professional prophet serves the institution. The called prophet serves the word.',
      ],
    },

    // -------------------------------------------------------------- ending
    {
      id: 'ending',
      heading: 'The Ending',
      body: [
        'After relentless judgment, the book ends with unexpected hope. The booth of David, fallen and broken, will be raised. The land will be so fertile that the plowman overtakes the reaper. Israel will be planted in their land and never again uprooted.',
      ],
      figures: [
        {
          art: `   "In that day I will raise up
        the booth of David that is fallen
    and repair its breaches,
        and raise up its ruins
        and rebuild it as in the days of old...

    I will restore the fortunes of my people Israel,
        and they shall rebuild the ruined cities
        and inhabit them;
    they shall plant vineyards
        and drink their wine,
    and they shall make gardens
        and eat their fruit.

    I will plant them on their land,
        and they shall never again be uprooted
        out of the land that I have given them,"
            says the LORD your God.

                                  — 9:11-15`,
          caption: 'After the demolition, rebuilding.',
        },
      ],
      closing: [
        'The ending surprises readers who expect Amos to be pure judgment. It is not. The "booth" of David is a tent, not a palace, small and temporary, but it will be raised. The promise is specific: vineyards, gardens, cities, and permanence. The pattern of the prophets emerges: judgment is real, but it is not the last word. Through judgment, to restoration.',
      ],
    },
  ],
};
