import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Jeremiah: the ground a reader should be standing on before
 * the first verse. A prophet called as a youth, whose life became the message,
 * and who wept over a city that would not listen.
 */
export const JEREMIAH: BookOrientation = {
  slug: 'jeremiah',
  title: 'Jeremiah',
  subtitle: 'The Weeping Prophet and the New Covenant',
  scripture: 'Jeremiah 1–52',
  summary:
    'God\`s final plea to Judah before exile, delivered through a prophet whose suffering mirrors the nation\`s coming destruction.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Jeremiah is the longest prophetic book in the Bible, sprawling across 52 chapters and forty years of ministry. It is not arranged chronologically. Oracles, narratives, confessions, and symbolic actions are interwoven in ways that can feel disorienting. This is intentional. The book mirrors the chaos of Judah\`s final decades: a nation careening toward destruction while refusing to believe it could happen.',
        'The prophet himself is inseparable from the message. God tells Jeremiah not to marry, not to attend funerals, not to join feasts. His isolation is the sermon. When he buys a field during a siege, purchases a ruined future, that is the message. When he wears a yoke, breaks a jar, hides a loincloth, his body preaches what his words cannot make Judah hear.',
        'Alone among the prophets, Jeremiah gives us his internal life. His confessions (scattered through chapters 11 through 20) reveal a man who curses the day of his birth, accuses God of deception, and threatens to quit. He weeps. He rages. He keeps prophesying. The combination of public failure and private anguish makes this book as much about the cost of obedience as about the content of the message.',
      ],
      figures: [
        {
          art: `  CALL (ch 1)
    │
    ▼
  ORACLES (1–25)
    │   indictment after indictment
    │   broken cisterns, stubborn hearts
    │   potter and clay, figs good and bad
    ▼
  NARRATIVES (26–45)
    │   temple sermon, arrest, stocks
    │   Baruch writes, king burns scroll
    │   siege, fall, aftermath
    ▼
  ORACLES AGAINST NATIONS (46–51)
    │   Egypt, Philistia, Moab, Ammon
    │   Edom, Damascus, Kedar, Elam
    │   Babylon: the longest, the last
    ▼
  FALL OF JERUSALEM (ch 52)
      historical epilogue`,
          caption: 'Four movements: oracles, narratives, nations, ending.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Jeremiah prophesied from 627 BC to at least 586 BC, through the reigns of the last five kings of Judah. He began during Josiah\`s reformation, watched it unravel under Josiah\`s sons, and lived through the three Babylonian sieges that ended in Jerusalem\`s destruction.',
        'The political situation was impossible. Babylon was rising; Egypt was meddling; Judah was caught between them. Kings made alliances, broke them, rebelled, and were deported or killed. Jeremiah\`s consistent message was to submit to Babylon, which sounded like treason. He was arrested, beaten, thrown into a cistern, and accused of defecting to the enemy. He was right, and they hated him for it.',
        'After Jerusalem fell in 586 BC, the Babylonians left Jeremiah in the land. A remnant fled to Egypt against his warning and took him with them. Tradition says he died there. The book ends not with his death but with the fall of Babylon, looking forward to the end of exile.',
      ],
      entries: [
        {
          term: 'Josiah',
          role: 'the good king',
          detail:
            'Jeremiah\`s ministry began in the thirteenth year of Josiah, during the great reformation. Josiah found the Book of the Law, tore down the high places, and renewed the covenant. But the reform did not reach the heart. After Josiah died at Megiddo fighting Egypt, everything he built collapsed.',
        },
        {
          term: 'Jehoiakim',
          role: 'the defiant king',
          detail:
            'Son of Josiah, placed on the throne by Egypt. He cut up Jeremiah\`s scroll and burned it piece by piece. He built a palace with forced labor while the nation crumbled. He rebelled against Babylon and died before the consequences arrived.',
        },
        {
          term: 'Zedekiah',
          role: 'the weak king',
          detail:
            'The last king, installed by Babylon. He secretly consulted Jeremiah but never obeyed. He rebelled, was captured fleeing Jerusalem, watched his sons killed, and was blinded. He is the portrait of a man who knew the truth and could not act on it.',
        },
        {
          term: 'Nebuchadnezzar',
          role: 'God\`s servant',
          detail:
            'Jeremiah calls the Babylonian emperor "my servant" three times. Not because Nebuchadnezzar worships Yahweh but because God is using him as an instrument of judgment. The pagan king is doing God\`s work. This is one of Jeremiah\`s most offensive claims.',
        },
        {
          term: 'The three deportations',
          role: 'exile in stages',
          detail:
            '605 BC: Daniel and the first exiles taken. 597 BC: Jehoiachin and ten thousand more, including Ezekiel. 586 BC: Jerusalem destroyed, temple burned, the remaining population scattered. Jeremiah watched all three.',
        },
      ],
    },

    // ------------------------------------------------------------- characters
    {
      id: 'characters',
      heading: 'The People',
      figures: [
        {
          art: `        GOD ──────────────────────── JUDAH
         │        covenant              │
         │        broken                │
         ▼                              ▼
     JEREMIAH                      THE KINGS
         │                         ┌────┴────┐
    called as youth           Josiah  Jehoiakim  Zedekiah
    told not to marry         reform   defiance   weakness
         │
    ┌────┴────┐
 BARUCH    FALSE PROPHETS
 scribe     Hananiah, etc.
 faithful   "Peace, peace"`,
          caption: 'The prophet stands between God and a nation that will not listen.',
        },
      ],
      entries: [
        {
          term: 'Jeremiah',
          role: 'the weeping prophet',
          detail:
            'Called as a youth, perhaps a teenager, and told his words would tear down and build up. He never married, never had children, never saw his message accepted. His laments give us access to the interior cost of prophecy. He wanted to quit but could not. The word was fire in his bones.',
        },
        {
          term: 'Baruch',
          role: 'the faithful scribe',
          detail:
            'Jeremiah\`s secretary, who wrote his dictation and read the scroll publicly when Jeremiah was banned from the temple. He followed Jeremiah to Egypt and preserved the prophecies. Chapter 45 records God\`s personal word to Baruch: do not seek great things for yourself; your life as a prize is enough.',
        },
        {
          term: 'Hananiah',
          role: 'the false prophet',
          detail:
            'Prophesied that exile would last two years and the temple vessels would return. He broke the yoke from Jeremiah\`s neck. Jeremiah walked away, then returned with God\`s verdict: Hananiah would die within the year. He did.',
        },
        {
          term: 'Ebed-melech',
          role: 'the Ethiopian rescuer',
          detail:
            'A Cushite official who pulled Jeremiah from the cistern where he was sinking in mud. God promised him safety when Jerusalem fell. A foreigner showed more courage than the king.',
        },
        {
          term: 'The Rechabites',
          role: 'the faithful contrast',
          detail:
            'A clan who kept their ancestor\`s command to drink no wine for generations. God uses them to shame Judah: the Rechabites obey a human father; Judah will not obey their divine Father.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'Jeremiah resists tidy outlines. The book was compiled, not composed in one sitting, and the arrangement is thematic and associative rather than strictly chronological. Nevertheless, four major sections emerge.',
      ],
      figures: [
        {
          art: `   PART ONE: ORACLES AGAINST JUDAH (1–25)
   ──────────────────────────────────────
   1       The call: before you were formed
   2–6     Broken cisterns, stubborn nation
   7–10    Temple sermon: do not trust lies
   11–13   Broken covenant, linen belt
   14–17   Drought, no intercession
   18–20   Potter, jar, confessions
   21–24   Kings and prophets judged
   25      Seventy years, cup of wrath

   PART TWO: NARRATIVES OF CONFLICT (26–45)
   ──────────────────────────────────────
   26      Temple sermon, trial
   27–29   Yoke, letter to exiles
   30–33   THE BOOK OF CONSOLATION
           new covenant, bought field
   34–36   Scroll burned, Rechabites
   37–39   Siege, cistern, fall
   40–45   Aftermath, flight to Egypt

   PART THREE: ORACLES AGAINST NATIONS (46–51)
   ──────────────────────────────────────
   46      Egypt
   47      Philistia
   48      Moab
   49      Ammon, Edom, Damascus, Kedar, Elam
   50–51   Babylon (longest, climactic)

   PART FOUR: HISTORICAL APPENDIX (52)
   ──────────────────────────────────────
   52      Fall of Jerusalem (parallels 2 Kings 25)`,
          caption: 'Four parts: oracles, narratives, nations, epilogue.',
        },
        {
          art: `   THE BOOK OF CONSOLATION (30–33)
   ──────────────────────────────────────

   30    "I will restore the fortunes..."
         Rachel weeping, but children returning

   31    THE NEW COVENANT (31:31–34)
         not like Sinai
         law on hearts, all shall know me

   32    Jeremiah buys a field
         during the siege, for the future

   33    The righteous Branch
         Davidic promises renewed`,
          caption: 'The heart of hope, surrounded by judgment.',
        },
      ],
      closing: [
        'The Book of Consolation (chapters 30 through 33) sits inside the narrative section like a jewel in rubble. Jerusalem is under siege, Jeremiah is in prison, and the text suddenly opens into promises of restoration. The placement is deliberate: hope arrives when all human hope is gone.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'The New Covenant',
          definition:
            'A future covenant unlike Sinai, written on hearts rather than stone, with universal knowledge of God.',
          appears:
            'Jeremiah 31:31–34, the most quoted Old Testament passage in the New Testament (Hebrews 8). Anticipated in 24:7 and 32:40.',
          matters:
            'This is Jeremiah\`s enduring theological contribution. The old covenant failed not because it was wrong but because hearts were unchanged. The new covenant changes the heart.',
        },
        {
          name: 'Broken Cisterns',
          definition:
            'Israel\`s exchange of the living God for worthless alternatives.',
          appears:
            '"My people have committed two evils: they have forsaken me, the fountain of living waters, and hewed out cisterns for themselves, broken cisterns that can hold no water" (2:13).',
          matters:
            'The diagnosis is not that Judah chose something evil but that they chose something empty. Idolatry is thirst with a leaking cup.',
        },
        {
          name: 'The Potter and Clay',
          definition:
            'God\`s sovereignty over nations, with room for response.',
          appears:
            'Chapters 18 and 19. The potter reshapes or discards clay. The jar, once fired, can only be broken.',
          matters:
            'The image holds two truths: God is sovereign, but the clay\`s condition matters. Chapter 18 offers hope; chapter 19 breaks the jar.',
        },
        {
          name: 'True and False Prophecy',
          definition:
            'The contest between those who speak God\`s word and those who say what people want to hear.',
          appears:
            'Chapters 23, 27 through 29. "Peace, peace" when there is no peace. Hananiah versus Jeremiah.',
          matters:
            'The true prophet brings a word that wounds. The false prophet medicates symptoms. Time distinguishes them.',
        },
        {
          name: 'Return (Shuv)',
          definition:
            'The Hebrew root meaning both "turn back" and "repent," echoing throughout the book.',
          appears:
            'Jeremiah uses shuv more than any other prophet. "Return, faithless Israel." "They refused to return." The new covenant means God will turn their hearts.',
          matters:
            'The tragedy is that Judah could have turned but would not. The hope is that God will turn them.',
        },
        {
          name: 'The Confessions',
          definition:
            'Jeremiah\`s raw laments about his calling, scattered through chapters 11 through 20.',
          appears:
            '"Cursed be the day I was born." "You deceived me, LORD." "I will not speak in his name anymore."',
          matters:
            'These passages let us inside prophetic suffering. Jeremiah is not a detached messenger; he is crushed by what he must say and by being ignored.',
        },
        {
          name: 'Seventy Years',
          definition:
            'The duration of Babylonian exile prophesied by Jeremiah.',
          appears:
            'Jeremiah 25:11–12 and 29:10. Daniel reads this number and prays (Daniel 9).',
          matters:
            'The exile is not forever. God sets a limit. The number gives the exiles a horizon.',
        },
      ],
    },

    // -------------------------------------------------------------- passages
    {
      id: 'passages',
      heading: 'Key Passages',
      entries: [
        {
          term: 'The Call (1:4–10)',
          detail:
            '"Before I formed you in the womb I knew you." Jeremiah is appointed to pluck up and tear down, to build and plant. The call comes with a promise: God will put His words in Jeremiah\`s mouth.',
        },
        {
          term: 'Broken Cisterns (2:13)',
          detail:
            'The two evils: forsaking the fountain of living water and digging cisterns that leak. One of the most memorable images in Scripture for the futility of idolatry.',
        },
        {
          term: 'Temple Sermon (7:1–15)',
          detail:
            '"Do not trust in these deceptive words: the temple of the LORD." The people believed Jerusalem was invincible because God\`s temple stood there. Jeremiah reminds them of Shiloh, where the tabernacle once stood, now ruins.',
        },
        {
          term: 'The Potter (18:1–12)',
          detail:
            'God sends Jeremiah to the potter\`s house. The clay can be reshaped as long as it is wet. The image is of conditional judgment, still open to turning.',
        },
        {
          term: 'The Letter to Exiles (29:1–14)',
          detail:
            '"Build houses, plant gardens, seek the welfare of the city." The exiles should settle in Babylon rather than expecting quick return. "I know the plans I have for you" is not a promise of personal prosperity but a promise to the nation after seventy years.',
        },
        {
          term: 'The New Covenant (31:31–34)',
          detail:
            'The promise that defines the book. A covenant unlike Sinai, written on hearts. "They shall all know me, from the least to the greatest." The writer of Hebrews quotes this passage at length to explain Christ\`s work.',
        },
        {
          term: 'Buying the Field (32:1–15)',
          detail:
            'The Babylonians are besieging Jerusalem. God tells Jeremiah to buy a field. It makes no economic sense; it is a prophetic act. "Houses and fields and vineyards shall again be bought in this land."',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Jeremiah Sits in Scripture',
      entries: [
        {
          term: 'Deuteronomy',
          detail:
            'Jeremiah\`s theology is deeply Deuteronomic: blessings and curses, covenant faithfulness, the danger of idolatry. Josiah\`s discovery of "the Book of the Law" (likely Deuteronomy) may have shaped Jeremiah\`s early formation.',
        },
        {
          term: 'Hosea',
          detail:
            'Hosea\`s marriage metaphor for Israel\`s unfaithfulness echoes in Jeremiah. "I remember the devotion of your youth, your love as a bride" (2:2). Jeremiah extends the image to Judah.',
        },
        {
          term: 'Isaiah',
          detail:
            'Isaiah prophesied a century earlier about deliverance from Assyria; Jeremiah prophesies submission to Babylon. Different situations require different words. Isaiah\`s remnant hope is present in Jeremiah but smaller, darker.',
        },
        {
          term: 'Ezekiel',
          detail:
            'A contemporary in exile while Jeremiah remains in Jerusalem. They share themes: individual responsibility, new hearts, shepherds who fail, a future restoration. Ezekiel\`s "new heart" (36:26) parallels Jeremiah\`s new covenant.',
        },
        {
          term: 'Daniel',
          detail:
            'Daniel reads Jeremiah\`s seventy years and prays for its fulfillment (Daniel 9). The prophecy shapes exilic hope.',
        },
        {
          term: 'Lamentations',
          detail:
            'Traditionally attributed to Jeremiah, Lamentations is the weeping prophet\`s tears in poetry. Whether or not he wrote it, the two books belong together: one warns of destruction, the other mourns it.',
        },
        {
          term: 'Hebrews',
          detail:
            'Hebrews 8 and 10 quote Jeremiah 31 at length, arguing that Jesus inaugurates the new covenant. Jeremiah\`s promise becomes the interpretive key for understanding Christ\`s work.',
        },
        {
          term: 'The Lord\`s Supper',
          detail:
            '"This cup is the new covenant in my blood" (Luke 22:20, 1 Corinthians 11:25). Jesus identifies his death with the covenant Jeremiah promised. The longest prophetic book finds its fulfillment at a table.',
        },
      ],
      closing: [
        'Jeremiah stands at the hinge of Israel\`s history, watching the old order collapse. His prophecy of the new covenant becomes the bridge between testaments. What he wept over, Christ fulfills.',
      ],
    },

    // ------------------------------------------------------------ confessions
    {
      id: 'confessions',
      heading: 'The Confessions of Jeremiah',
      body: [
        'Scattered through chapters 11 through 20 are passages where Jeremiah speaks directly to God about the cost of his calling. These "confessions" are unprecedented in prophetic literature. Nowhere else do we hear a prophet accuse God, threaten to quit, and curse his own birth.',
      ],
      figures: [
        {
          art: `   CONFESSION           LOCATION     CORE CRY
   ─────────────────────────────────────────────
   Plot in Anathoth       11:18–23    "They seek my life"
   Why do the wicked      12:1–6      "How long?"
     prosper?
   Woe is me              15:10–21    "Why unceasing pain?"
   Terror on every side   17:14–18    "Heal me, O LORD"
   You deceived me        20:7–18     "Cursed be the day
                                        I was born"`,
          caption: 'The prophet\`s internal collapse.',
        },
        {
          art: `   "O LORD, you have deceived me,
      and I was deceived;
    you are stronger than I,
      and you have prevailed.
    I have become a laughingstock all the day;
      everyone mocks me...

    If I say, 'I will not mention him,
      or speak any more in his name,'
    there is in my heart as it were a burning fire
      shut up in my bones,
    and I am weary with holding it in,
      and I cannot."

                            — Jeremiah 20:7–9`,
          caption: 'The prophet cannot escape his calling.',
        },
      ],
      closing: [
        'The confessions show that faithfulness to God does not guarantee emotional stability or personal peace. Jeremiah is both obedient and undone. His suffering is not incidental to his ministry; it is part of what he brings to the people. He embodies the grief God feels.',
      ],
    },

    // ------------------------------------------------------------ symbolic acts
    {
      id: 'symbolic-acts',
      heading: 'The Prophetic Signs',
      body: [
        'Jeremiah does not only speak the word; he enacts it. His body and his circumstances become the message. These symbolic acts make the invisible visible.',
      ],
      entries: [
        {
          term: 'The linen belt',
          role: 'chapter 13',
          detail:
            'Jeremiah buries a belt by the Euphrates. When he digs it up, it is ruined. So God will ruin the pride of Judah and Jerusalem.',
        },
        {
          term: 'The potter\`s house',
          role: 'chapter 18',
          detail:
            'Jeremiah watches a potter reshape spoiled clay. The nation can still be reshaped if it turns.',
        },
        {
          term: 'The broken jar',
          role: 'chapter 19',
          detail:
            'Jeremiah smashes a clay jar in front of the elders. Once fired, clay cannot be remade. It can only be shattered. Time for turning is running out.',
        },
        {
          term: 'The yoke',
          role: 'chapters 27–28',
          detail:
            'Jeremiah wears a wooden yoke to symbolize submission to Babylon. Hananiah breaks it off. God says: "You have broken wooden bars, but you have made in their place bars of iron."',
        },
        {
          term: 'Buying the field',
          role: 'chapter 32',
          detail:
            'During the siege, Jeremiah purchases land from his cousin. It is an act of absurd hope: investing in a future when the present is burning.',
        },
        {
          term: 'No marriage, no mourning, no feasting',
          role: 'chapter 16',
          detail:
            'God forbids Jeremiah from normal life. His isolation is the sermon. The nation has no future, so the prophet has no family. They are dying, so he does not mourn. They pretend to celebrate, so he refuses to feast.',
        },
      ],
    },

    // -------------------------------------------------------------- ending
    {
      id: 'ending',
      heading: 'How It Ends',
      body: [
        'The book does not end with Jeremiah\`s death. It ends with two things: the fall of Babylon and the elevation of Jehoiachin. Both point beyond the present darkness.',
      ],
      figures: [
        {
          art: `   CHAPTER 51: BABYLON FALLS
   ─────────────────────────────
   "Declare among the nations...
    Babylon is taken,
    Bel is put to shame..."

   Jeremiah\`s prophecy against Babylon
   the empire that destroyed Jerusalem
   will itself be destroyed

   A scroll thrown into the Euphrates:
   "Thus shall Babylon sink,
   to rise no more."


   CHAPTER 52: JEHOIACHIN RELEASED
   ─────────────────────────────
   In the 37th year of exile
   the king of Babylon lifts up
   the head of Jehoiachin king of Judah
   and brings him out of prison

   He is given a seat above the other kings
   He eats at the king\`s table
   every day for the rest of his life`,
          caption: 'The empire falls; the king is remembered. Hope persists.',
        },
      ],
      closing: [
        'The final verses are strange and anticlimactic unless you see what they are doing. The Davidic king is still alive. He is eating at a foreign table, but he is eating. The line is not extinguished. The book that prophesied destruction also prophesied return, a new covenant, a righteous Branch. Jehoiachin alive in Babylon keeps those promises in view. It is not resolution, but it is not despair. The story continues.',
      ],
    },
  ],
};
