import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Ezekiel: the ground a reader should be standing on before
 * the first verse. A priest exiled to Babylon who becomes prophet, watching
 * God\`s glory depart from a doomed temple and return to a temple not yet built.
 */
export const EZEKIEL: BookOrientation = {
  slug: 'ezekiel',
  title: 'Ezekiel',
  subtitle: 'The Glory Departing and Returning',
  scripture: 'Ezekiel 1-48',
  summary:
    'A priest in exile sees visions of God\`s glory leaving the temple, judging the nations, and returning to dwell with a restored people.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Ezekiel is a book of visions, bizarre actions, and relentless repetition. The prophet does not merely speak; he enacts. He lies on his side for over a year. He shaves his head and burns a third of the hair. He digs through a wall at night. He refuses to mourn when his wife dies. Every act is a sermon.',
        'The book divides into three movements. Chapters 1 through 24 pronounce judgment on Jerusalem, building toward its fall. Chapters 25 through 32 turn outward to the nations surrounding Israel. Chapters 33 through 48 pivot to restoration: the watchman recalled, the shepherds replaced, the bones revived, the temple rebuilt. The hinge is chapter 33, where news of Jerusalem\`s fall arrives and Ezekiel\`s mouth is finally opened.',
        'The book is held together by one image: the glory of the LORD. It appears in chapter 1, departs the temple in chapters 8 through 11, and returns in chapter 43. Everything else orbits this departure and return. God is not bound to a building; He can leave. And He can come back.',
      ],
      figures: [
        {
          art: `  VISION: THE THRONE-CHARIOT (ch 1)
    │
    ▼
  CALL .................. Ezekiel commissioned
    │                     (ch 2-3)
    ▼
  ENACTED JUDGMENTS ..... brick, iron pan, lying on side
    │                     (ch 4-7)
    ▼
  VISION: TEMPLE ........ abominations seen,
    │                     glory departs (ch 8-11)
    ▼
  MORE JUDGMENTS ........ allegories, oracles
    │                     (ch 12-24)
    ▼
  ORACLES AGAINST NATIONS (ch 25-32)
    │
    ▼
  NEWS: JERUSALEM FALLEN (ch 33)
    │
    ▼
  RESTORATION ........... shepherds, bones, new heart
    │                     (ch 34-39)
    ▼
  VISION: NEW TEMPLE .... glory returns
                          (ch 40-48)`,
          caption: 'The whole book: glory departs, nations judged, glory returns.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Ezekiel was a priest, trained for temple service, exiled to Babylon in 597 BC with King Jehoiachin and ten thousand others. He never served in the temple he was trained for. Instead, he received visions of it from afar, watching in the spirit as it was defiled and destroyed.',
        'His prophecies span 593 to 571 BC, beginning five years into exile and continuing past Jerusalem\`s destruction in 586 BC. He prophesied to the exiles in Babylon, not to those still in Jerusalem. His audience already knew something was wrong; they had been carried away. But they still hoped Jerusalem would stand, that the exile would be brief, that the temple would survive. Ezekiel\`s task was to dismantle that false hope before it destroyed them.',
        'The exiles lived at Tel-abib by the Chebar canal, a settlement in Babylonia. They were not prisoners but colonists, allowed to build houses and plant gardens. Ezekiel sat among them, sometimes silent for days, sometimes acting out parables, always strange. The elders came to his house to inquire of the LORD, and often God refused to be inquired of.',
      ],
      entries: [
        {
          term: 'The first deportation (597 BC)',
          role: 'Ezekiel\`s exile',
          detail:
            'When Jehoiachin surrendered to Nebuchadnezzar, the Babylonians took the king, the queen mother, the officials, the craftsmen, and the warriors. Ezekiel was among them. This was not the final destruction; that came eleven years later. But it was the beginning of the end.',
        },
        {
          term: 'Jehoiachin and Zedekiah',
          role: 'two kings',
          detail:
            'Jehoiachin reigned three months before exile. Zedekiah, his uncle, was installed by Babylon as a puppet king over what remained. Ezekiel dates his prophecies by Jehoiachin\`s exile, not Zedekiah\`s reign, a subtle statement about who the true king is.',
        },
        {
          term: 'The fall of Jerusalem (586 BC)',
          role: 'the confirmation',
          detail:
            'Zedekiah rebelled against Babylon. Nebuchadnezzar besieged Jerusalem for two years, breached the walls, burned the temple, and deported most of the remaining population. Ezekiel had been prophesying this for seven years. When the news reached the exiles, his mouth was opened.',
        },
        {
          term: 'Tel-abib',
          role: 'the prophet\`s home',
          detail:
            'A settlement by the Chebar canal in Babylonia, where the exiles lived. Ezekiel sat among them, received visions, and enacted strange prophecies. The elders came to his house seeking oracles; often they left without answers.',
        },
      ],
    },

    // ------------------------------------------------------------- characters
    {
      id: 'characters',
      heading: 'The People',
      figures: [
        {
          art: `           GOD (YHWH)
               │
               │ sends visions
               ▼
           EZEKIEL ──────────────── THE EXILES
           priest-prophet           his audience
               │
               │ enacted prophecies
               │
    ┌──────────┼──────────┐
    │          │          │
  ISRAEL    JUDAH     NATIONS
  (past)    (present)  (surrounding)
    │          │          │
    └──────────┴──────────┘
               │
               ▼
        FUTURE ISRAEL
        restored, unified`,
          caption: 'The prophet stands between God and the exiles, speaking to past, present, and future.',
        },
      ],
      entries: [
        {
          term: 'Ezekiel',
          role: 'priest become prophet',
          detail:
            'Son of Buzi, a priest of the line of Zadok. He was thirty when the visions began, the age when he would have begun temple service. Instead of serving in the temple, he saw visions of its destruction. His name means "God strengthens," and he would need it. He was married; his wife died suddenly, and God forbade him to mourn.',
        },
        {
          term: 'The elders of Israel',
          role: 'the inquirers',
          detail:
            'Leaders among the exiles who came to Ezekiel\`s house seeking a word from the LORD. Three times they are told God will not answer their inquiry because of the idols in their hearts. They want guidance while serving other gods; God refuses the transaction.',
        },
        {
          term: 'The shepherds of Israel',
          role: 'the failed leaders',
          detail:
            'Kings, priests, and prophets who fed themselves instead of the flock. Chapter 34 indicts them and promises God Himself will be the shepherd. He will set up one shepherd, His servant David, to tend them.',
        },
        {
          term: 'Gog of Magog',
          role: 'the final enemy',
          detail:
            'A mysterious figure from the far north, representing hostile nations in a final assault against restored Israel. Chapters 38 and 39 describe his attack and total defeat. The vision is apocalyptic, pointing beyond historical enemies to ultimate conflict.',
        },
      ],
    },

    // ----------------------------------------------------------------- places
    {
      id: 'places',
      heading: 'The Geography',
      figures: [
        {
          art: `                           MAGOG
                             (far north)
                                 │
                                 ▼ Gog\`s invasion

        BABYLON ◄──────────── JERUSALEM ──────────► EGYPT
        where Ezekiel sits    where glory dwelt     where Israel
        seeing visions        where glory leaves    must not go
              │
              │
        TEL-ABIB ◄───────── THE EXILES
        by the Chebar

                    ▼

              NEW JERUSALEM
              where glory returns
              (ch 40-48)`,
          caption: 'The prophet in Babylon, watching Jerusalem from afar, seeing what will come.',
        },
      ],
      entries: [
        {
          term: 'Jerusalem',
          detail:
            'The city of God\`s dwelling, center of Ezekiel\`s visions. He sees it defiled, besieged, burned, and finally restored. The temple mount is where glory departs and where it returns.',
        },
        {
          term: 'Babylon',
          detail:
            'The empire that destroyed Jerusalem, but also the place of exile where God meets His people. The visions come to Ezekiel in Babylon. God is not confined to Judah.',
        },
        {
          term: 'The Chebar canal',
          detail:
            'A canal in Babylonia where the exiles settled. Here, by foreign waters, the heavens opened and Ezekiel saw visions of God. The throne-chariot appears here, far from the temple, proving God can move.',
        },
        {
          term: 'Egypt',
          detail:
            'The old temptation. Israel kept looking to Egypt for help against Babylon. Ezekiel pronounces extensive oracles against Egypt, longer than against any other nation. The exodus must not be reversed.',
        },
        {
          term: 'Tyre',
          detail:
            'The wealthy trading city, described in elaborate poetry. Chapters 26 through 28 picture Tyre as a proud ship that will sink, and its king as an Adam figure expelled from Eden. The proudest cities fall.',
        },
        {
          term: 'The new temple',
          detail:
            'The visionary temple of chapters 40 through 48, measured with exacting precision. It is larger than Solomon\`s temple, laid out with perfect symmetry, with the glory of the LORD filling it. Whether literal or symbolic, it declares: God will dwell with His people again.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The book is carefully dated. Ezekiel provides more chronological markers than any other prophet: fourteen specific dates, anchored to the years of Jehoiachin\`s exile. The visions and oracles can be placed on a timeline, and they are mostly sequential. This is not a random collection; it is a chronicle.',
      ],
      figures: [
        {
          art: `   PART ONE: JUDGMENT ON JUDAH (1-24)
   ─────────────────────────────────────
   1        The throne-chariot vision
   2-3      Call and commission: eat the scroll
   4-7      Enacted judgments: siege, sword, famine
   8-11     Temple vision: abominations, glory departs
   12-19    Oracles and allegories
   20-24    Final indictments, the pot, Ezekiel\`s wife dies

   PART TWO: ORACLES AGAINST NATIONS (25-32)
   ─────────────────────────────────────────
   25       Ammon, Moab, Edom, Philistia
   26-28    Tyre (the ship, the king in Eden)
   29-32    Egypt (seven oracles)

   PART THREE: RESTORATION (33-48)
   ────────────────────────────────
   33       The watchman restored, Jerusalem fallen
   34       The shepherds judged, God as shepherd
   35-36    Mountains of Edom vs. mountains of Israel
   36:16-38 New heart, new spirit
   37       The valley of dry bones, two sticks
   38-39    Gog and Magog
   40-48    The new temple, the river, the land divided`,
          caption: 'Three movements: judgment, nations, restoration.',
        },
        {
          art: `   THE GLORY\`S MOVEMENT
   ──────────────────────

   Ch 1     Glory appears at Chebar (Babylon)
            │
   Ch 8     Glory in the temple (Jerusalem)
            │
   Ch 9     Glory moves to threshold
            │
   Ch 10    Glory moves to east gate
            │
   Ch 11    Glory departs to Mount of Olives
            │
            │  ... 32 chapters ...
            │
   Ch 43    Glory returns from the east
            └──► fills the new temple`,
          caption: 'The book\`s spine: glory departs, glory returns.',
        },
      ],
      closing: [
        'Notice the symmetry. The book opens with a vision of God\`s glory by the Chebar canal and closes with glory filling the new temple. The departure in chapters 8 through 11 is answered by the return in chapter 43. Everything between is the working out of that departure and the preparation for that return.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'The Glory of the LORD',
          definition:
            'God\`s manifest presence, visible and weighty, moving where He wills.',
          appears:
            'The throne-chariot in chapter 1; the temple visions in chapters 8 through 11; the return in chapter 43.',
          matters:
            'The glory is mobile. It does not depend on the temple; the temple depends on it. When Israel defiles the temple, the glory leaves. When God restores, the glory returns. The building is nothing without the presence.',
        },
        {
          name: 'Individual Responsibility',
          definition:
            'Each person stands or falls by their own righteousness, not their ancestors\`.',
          appears:
            'Chapter 18 at length: "The soul who sins shall die." Also chapter 33.',
          matters:
            'The exiles were quoting a proverb: "The fathers have eaten sour grapes, and the children\`s teeth are set on edge." Ezekiel shuts it down. You are not doomed by your parents. You are responsible for yourself. The wicked who repents will live; the righteous who turns will die.',
        },
        {
          name: 'The Watchman',
          definition:
            'A sentinel responsible to warn the city, innocent of blood if he speaks, guilty if he does not.',
          appears:
            'Chapters 3 and 33, framing the book\`s first and third movements.',
          matters:
            'Ezekiel is appointed watchman. If he warns and they do not listen, their blood is on their own heads. If he fails to warn, he is accountable for their death. Prophecy is not optional; it is obligation.',
        },
        {
          name: 'New Heart and New Spirit',
          definition:
            'God\`s promise to remove the heart of stone and give a heart of flesh, putting His Spirit within.',
          appears:
            'Chapter 36:26-27; also 11:19 and 37:14.',
          matters:
            'The problem is not just behavior but nature. Israel cannot keep the covenant because their hearts are stone. The solution is surgery: God will replace the heart. This is the deepest promise in the book.',
        },
        {
          name: 'The Shepherd of Israel',
          definition:
            'God Himself becoming the shepherd His people never had, then setting up David as under-shepherd.',
          appears:
            'Chapter 34: indictment of false shepherds, promise of the true shepherd.',
          matters:
            'The leaders failed. They fed themselves, not the flock. God fires them all and takes the job Himself. Then He places one shepherd over them, His servant David. Jesus will cite this chapter.',
        },
        {
          name: 'Resurrection',
          definition:
            'The dead brought back to life, a nation restored from the grave.',
          appears:
            'Chapter 37: the valley of dry bones.',
          matters:
            'The vision is corporate: Israel in exile is a field of bones, dry and dead. But God can breathe life into bones. The vision promises national restoration, but it uses the language of bodily resurrection. Both layers remain.',
        },
        {
          name: 'Know That I Am the LORD',
          definition:
            'The purpose statement repeated throughout: that all parties recognize YHWH as God.',
          appears:
            'Over sixty times: "Then they/you will know that I am the LORD."',
          matters:
            'This is the telos of everything. Judgment is not revenge; it is revelation. Restoration is not reward; it is revelation. Everything Ezekiel prophesies aims at one outcome: that God be known as God.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Ezekiel Sits in Scripture',
      entries: [
        {
          term: 'Jeremiah',
          detail:
            'A contemporary prophet, speaking to those still in Jerusalem while Ezekiel speaks to the exiles in Babylon. They share themes: the fall is coming, the prophets lie, the covenant is broken. But Ezekiel sees visions where Jeremiah writes letters. They complement each other across the distance.',
        },
        {
          term: 'Isaiah',
          detail:
            'Isaiah\`s temple vision (chapter 6) precedes Ezekiel\`s by a century. Isaiah saw the LORD high and lifted up, and the temple filled with smoke. Ezekiel sees the glory leave that temple. What Isaiah glimpsed in holiness, Ezekiel watches depart in judgment.',
        },
        {
          term: 'Leviticus',
          detail:
            'Ezekiel is a priest, and his concern for holiness, cleanness, and proper worship echoes Leviticus throughout. The new temple vision in chapters 40 through 48 is Levitical architecture, a sacred space measured and ordered for the presence of God.',
        },
        {
          term: 'Daniel',
          detail:
            'Another exile in Babylon, but in the court rather than the settlement. Daniel interprets dreams; Ezekiel receives visions. Both see cosmic realities behind earthly politics. Ezekiel 14 mentions Daniel (or a figure by that name) as a paragon of righteousness.',
        },
        {
          term: 'John and Revelation',
          detail:
            'The Gospel of John draws on Ezekiel\`s shepherd imagery: Jesus is the good shepherd who lays down his life. Revelation draws heavily on Ezekiel\`s visions: the throne, the living creatures, Gog and Magog, the river of life, the measured city. Ezekiel\`s visions become the grammar of apocalypse.',
        },
        {
          term: 'The Gospels',
          detail:
            'Jesus calls Himself "Son of Man," the title God uses for Ezekiel over ninety times. Whether Jesus is claiming the title or transforming it, the echo is unmistakable. The watchman\`s son becomes the Good Shepherd.',
        },
      ],
      closing: [
        'Ezekiel stands at the end of Judah\`s monarchy and the beginning of something new. He is the priest without a temple, the watchman in exile, the prophet of departure and return. His visions look backward to Sinai and forward to the age to come. The dry bones will live.',
      ],
    },

    // ------------------------------------------------------------- the visions
    {
      id: 'visions',
      heading: 'The Visions',
      body: [
        'Ezekiel sees what other prophets only hear. The book contains four major visions, each transported by the Spirit to see what human eyes cannot reach. These are not dreams but wakeful sight of unseen reality.',
      ],
      figures: [
        {
          art: `   THE FOUR GREAT VISIONS
   ───────────────────────

   1. THE THRONE-CHARIOT (ch 1)
      │
      └─► Four living creatures
          wheels within wheels
          expanse like crystal
          figure like a man, fire, rainbow
          = God is mobile, God is present in exile

   2. THE TEMPLE DEFILED (ch 8-11)
      │
      └─► Transported to Jerusalem
          sees abominations in the temple
          watches glory depart step by step
          = God leaves what is defiled

   3. THE VALLEY OF DRY BONES (ch 37)
      │
      └─► A valley full of bones, very dry
          "Can these bones live?"
          breath enters, they live
          = Israel will be restored from death

   4. THE NEW TEMPLE (ch 40-48)
      │
      └─► Transported to a very high mountain
          a man with measuring rod
          temple measured in exact detail
          glory returns from the east
          river flows from the temple, heals the land
          = God will dwell with His people again`,
          caption: 'Four visions: presence, departure, resurrection, return.',
        },
      ],
      closing: [
        'The visions are load-bearing. Remove the throne-chariot and Ezekiel has no authority. Remove the temple vision and the departure of glory is not witnessed. Remove the dry bones and there is no hope for the dead nation. Remove the new temple and the glory has no destination. Ezekiel\`s ministry is built on what he sees.',
      ],
    },

    // ------------------------------------------------------------- enacted signs
    {
      id: 'signs',
      heading: 'The Enacted Prophecies',
      body: [
        'Ezekiel does not only speak; he performs. God commands him to act out Jerusalem\`s fate in ways that cost him sleep, comfort, and grief. His body becomes a text.',
      ],
      figures: [
        {
          art: `   SIGN               MEANING
   ────               ───────
   Brick + siege      Jerusalem besieged (ch 4)
   Iron pan           Wall between God and city (ch 4)
   Lying on side      Bearing iniquity, 390 + 40 days (ch 4)
   Siege rations      Famine in the city (ch 4)
   Shaved head        Judgment divided in thirds:
                      burned, struck, scattered (ch 5)
   Baggage packed     Going into exile (ch 12)
   Dig through wall   Zedekiah\`s escape attempt (ch 12)
   Trembling, sighing The people\`s terror (ch 12, 21)
   Two ways, sword    Babylon choosing Jerusalem (ch 21)
   Boiling pot        The city as cauldron (ch 24)
   Wife\`s death       No mourning for Jerusalem (ch 24)
   Two sticks         Israel and Judah reunited (ch 37)`,
          caption: 'The prophet\`s body as message.',
        },
      ],
      closing: [
        'The enacted signs are not illustrations; they are the prophecy itself. When Ezekiel lies on his side for 390 days, he is not demonstrating a point. He is bearing iniquity. When he refuses to mourn his wife, he is showing what Jerusalem\`s fall will demand. The signs cost him everything, and that cost is the message.',
      ],
    },

    // -------------------------------------------------------------- chapter 37
    {
      id: 'chapter37',
      heading: 'The Valley of Dry Bones',
      body: [
        'Chapter 37 is the hinge of hope. Everything before has been judgment and death. Now God asks a question: "Can these bones live?" The answer is prophecy itself.',
      ],
      figures: [
        {
          art: `   The hand of the LORD was upon me,
     and he brought me out in the Spirit
     and set me down in the middle of the valley;
     it was full of bones.

   And he led me around among them,
     and behold, there were very many on the surface of the valley,
     and behold, they were very dry.

   And he said to me,
     "Son of man, can these bones live?"

   And I answered,
     "O Lord GOD, you know."

                               — Ezekiel 37:1-3`,
          caption: 'The question that changes everything.',
        },
        {
          art: `   BONES ─────► SINEWS ─────► FLESH ─────► SKIN
              │          │           │           │
              └──────────┴───────────┴───────────┘
                         │
                    no breath yet
                         │
                         ▼
                    BREATH ENTERS
                         │
                         ▼
                  THEY STAND UP
                  a vast army`,
          caption: 'Resurrection in stages.',
        },
      ],
      closing: [
        'The bones are Israel in exile, hopeless and cut off. But God is the God of resurrection. He commands Ezekiel to prophesy to the bones, then to the breath. The word itself brings life. This is the mechanics of restoration: God speaks, the dead hear, the dry bones live.',
      ],
    },

    // -------------------------------------------------------------- the new temple
    {
      id: 'newtemple',
      heading: 'The Temple Vision',
      body: [
        'The final nine chapters describe a temple that has never been built. Whether literal blueprint or visionary ideal, the message is clear: God will dwell with His people again, and this time the dwelling will be permanent.',
      ],
      figures: [
        {
          art: `   EZEKIEL\`S NEW TEMPLE (ch 40-48)
   ────────────────────────────────

   THE STRUCTURE
   ├── Outer court with chambers
   ├── Inner court with altar
   ├── Holy place
   └── Most Holy Place

   THE GLORY
   └── Returns from the east (ch 43)
       enters the temple
       fills it
       "I will dwell in their midst forever"

   THE RIVER
   └── Flows from under the threshold (ch 47)
       eastward, deepening
       ankle → knee → waist → swimming
       heals the Dead Sea
       trees on both banks, fruit monthly

   THE LAND
   └── Divided among the tribes (ch 48)
       the city in the center
       the city\`s name: YHWH SHAMMAH
       "The LORD is there"`,
          caption: 'Glory returns, river flows, God dwells.',
        },
      ],
      closing: [
        'The final words of the book are the city\`s name: "The LORD is there." After forty-eight chapters of judgment and hope, departure and return, enacted signs and cosmic visions, the book ends with presence. God is there. That is the point of everything.',
      ],
    },

    // -------------------------------------------------------------- ending
    {
      id: 'ending',
      heading: 'The Last Word',
      body: [
        'Ezekiel ends not with judgment but with geography. The final chapter divides the land, assigns the tribes, and names the city. After all the terror, the book closes with order, inheritance, and dwelling.',
      ],
      figures: [
        {
          art: `   "The circumference of the city
      shall be 18,000 cubits.

    And the name of the city from that time on
      shall be,

              YHWH SHAMMAH

              The LORD is there."

                               — Ezekiel 48:35`,
          caption: 'The book\`s final word: presence.',
        },
      ],
      closing: [
        'The glory that departed in chapter 11 has returned in chapter 43 and now has a permanent address. The city is not named Jerusalem; it is named for what matters: the LORD is there. Ezekiel began with a vision of God\`s mobile throne, able to appear in Babylon. He ends with that same God settled, present, at home. The exile is over. The dwelling is restored. The name says it all.',
      ],
    },
  ],
};
