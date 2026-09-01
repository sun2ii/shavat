import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Daniel: the ground a reader should be standing on before
 * the first verse. A man of unwavering faithfulness in exile, granted visions
 * of God\`s sovereignty over all empires.
 */
export const DANIEL: BookOrientation = {
  slug: 'daniel',
  title: 'Daniel',
  subtitle: 'The Kingdom That Cannot Be Shaken',
  scripture: 'Daniel 1–12',
  summary:
    'Faithfulness in exile and visions of God\`s absolute sovereignty over empires, culminating in an everlasting kingdom.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Daniel is a book of two halves that share one thesis: God rules. The first six chapters are court tales, narratives of Jewish exiles navigating the deadly politics of Babylon and Persia while refusing to compromise their worship. The last six chapters are apocalyptic visions, symbolic revelations of empires rising and falling under divine decree. Both halves answer the same question: When the temple lies in ruins and God\`s people serve pagan kings, who is actually in charge?',
        'The court tales read like an anthology of crisis and deliverance. A fiery furnace. A lions\` den. A hand writing doom on a palace wall. In each story, imperial power overreaches, threatens God\`s faithful ones, and is humbled. The structure is repetitive because the lesson is invariant: every knee bows.',
        'The visions are stranger and denser. Beasts rise from the sea. Horns speak arrogant words. Angelic beings wage war behind the scenes. Time is measured in weeks of years. But the same thesis holds: kingdoms that seem invincible are already numbered, weighed, and divided. The stone cut without hands will shatter them all.',
      ],
      figures: [
        {
          art: `  EXILE (605 BC)
    │
    ▼
  COURT TALES (1–6)
    │
    ├── Training and diet ........ ch 1
    ├── Dream of statue .......... ch 2
    ├── Fiery furnace ............ ch 3
    ├── Nebuchadnezzar humbled ... ch 4
    ├── Writing on the wall ...... ch 5
    └── Lions\` den ............... ch 6
    │
    ▼
  APOCALYPTIC VISIONS (7–12)
    │
    ├── Four beasts .............. ch 7
    ├── Ram and goat ............. ch 8
    ├── Seventy weeks ............ ch 9
    └── Final conflict ........... ch 10–12
    │
    ▼
  THE EVERLASTING KINGDOM`,
          caption: 'Two halves, one thesis: God rules over all.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'The book opens in 605 BC, when Nebuchadnezzar first besieged Jerusalem and took hostages from the royal and noble families. Daniel was among them, a youth deported to serve in the court of Babylon. He would live through the entire exile, serving successive empires until the reign of Cyrus the Persian.',
        'Babylon in this period was the dominant world power, having crushed Assyria and defeated Egypt. Nebuchadnezzar built the city into a wonder of the ancient world: the Ishtar Gate, the ziggurat of Marduk, the hanging gardens. The captives from Judah found themselves in the heart of pagan civilization, surrounded by its gods and required to serve its kings.',
        'The theological crisis was severe. The temple was destroyed in 586 BC. The Davidic king was blinded and chained. It looked like Marduk had defeated Yahweh. Daniel\`s stories answer this appearance with defiance: the God of Israel was never localized to a temple or dependent on a throne. He rules from heaven, and earthly empires are His instruments.',
        'The book spans roughly seventy years of exile, from Nebuchadnezzar through Belshazzar (the last Babylonian king) to Darius the Mede and Cyrus the Persian. Daniel himself bridges all these regimes, an exile who outlasts every empire that held him captive.',
      ],
      entries: [
        {
          term: 'The exile',
          role: 'the setting',
          detail:
            'Babylon deported Judah in three waves: 605 BC (Daniel\`s deportation), 597 BC (Ezekiel\`s deportation), and 586 BC (destruction of Jerusalem). The exile lasted until Cyrus permitted return in 539 BC. Daniel stayed in Babylon, never returning to a homeland he left as a teenager.',
        },
        {
          term: 'Nebuchadnezzar',
          role: 'the first emperor',
          detail:
            'King of Babylon from 605 to 562 BC, the most powerful ruler of the ancient Near East. He destroyed Jerusalem, deported Judah, and built Babylon into a city of legendary grandeur. In Daniel, he learns through humiliation that the Most High rules.',
        },
        {
          term: 'Babylon',
          role: 'the golden head',
          detail:
            'The empire that swallowed Judah, represented in chapter 2 as the head of gold. Its gods, its grandeur, and its ambition all come under judgment. The writing on the wall announces its fall.',
        },
        {
          term: 'Persia',
          role: 'the silver empire',
          detail:
            'The empire that conquered Babylon in 539 BC. Under Cyrus and his successors, the exiles were permitted to return. Daniel served Persian kings as he had Babylonian ones, demonstrating that God\`s sovereignty transfers across regime change.',
        },
        {
          term: 'Apocalyptic literature',
          role: 'the genre of visions',
          detail:
            'A style of revelation using symbolic imagery, heavenly journeys, and cosmic timelines. Daniel 7 through 12 is the primary Old Testament example. The symbols are not puzzles to decode but pictures of a reality too large for prose: God is bringing history to its appointed end.',
        },
      ],
    },

    // ------------------------------------------------------------- characters
    {
      id: 'characters',
      heading: 'The People',
      figures: [
        {
          art: `             GOD MOST HIGH
                   │
         rules over all kingdoms
                   │
    ┌──────────────┼──────────────┐
    │              │              │
    ▼              ▼              ▼
 EMPIRES      FAITHFUL       ANGELIC
              EXILES         BEINGS
    │              │              │
 Babylon       Daniel         Michael
 Persia      Shadrach       Gabriel
 Greece      Meshach
 Rome(?)     Abednego
    │              │
    │              │
    ▼              └────────────────┐
 HUMBLED                            ▼
 or destroyed               VINDICATED
                            and exalted`,
          caption: 'The structure of power: God above all, empires accountable, the faithful preserved.',
        },
      ],
      entries: [
        {
          term: 'Daniel',
          role: 'the faithful exile',
          detail:
            'Taken from Judah as a youth, given a Babylonian name (Belteshazzar), trained in the court, and elevated to high office under multiple kings. His defining trait is unwavering faithfulness: he will not eat the king\`s food, will not stop praying, will not bow to false gods. He receives visions that span centuries and is told to seal them for the time of the end.',
        },
        {
          term: 'Shadrach, Meshach, and Abednego',
          role: 'the three in the fire',
          detail:
            'Daniel\`s companions, also deported and trained. Their Hebrew names were Hananiah, Mishael, and Azariah. When commanded to worship Nebuchadnezzar\`s golden image, they refused, were thrown into a furnace, and walked out unburned with a fourth figure beside them.',
        },
        {
          term: 'Nebuchadnezzar',
          role: 'the humbled king',
          detail:
            'The great king whose dreams Daniel interprets. His pride is broken when he is driven mad for seven years, living like an animal until he acknowledges that heaven rules. He is the only foreign king in Scripture to give testimony to the God of Israel.',
        },
        {
          term: 'Belshazzar',
          role: 'the weighed king',
          detail:
            'The last Babylonian ruler, feasting with temple vessels while Persia besieges the city. A hand writes his doom on the wall. He is killed that night, and Babylon falls.',
        },
        {
          term: 'Darius the Mede',
          role: 'the trapped king',
          detail:
            'The king who throws Daniel to the lions, not from malice but because he has been manipulated by envious officials. He cannot rescue Daniel because his own law binds him. God rescues Daniel instead.',
        },
        {
          term: 'Michael',
          role: 'the great prince',
          detail:
            'The angelic being who stands guard over Israel. Mentioned in chapters 10 and 12, he fights against the princes of Persia and Greece in the heavenly realm. His presence reveals that earthly conflicts have cosmic dimensions.',
        },
        {
          term: 'Gabriel',
          role: 'the interpreter',
          detail:
            'The angel who explains visions to Daniel. He interprets the ram and goat in chapter 8 and delivers the prophecy of seventy weeks in chapter 9.',
        },
        {
          term: 'The Son of Man',
          role: 'the one who receives the kingdom',
          detail:
            'In chapter 7, a figure "like a son of man" comes on the clouds of heaven to the Ancient of Days and receives dominion, glory, and an everlasting kingdom. This is the title Jesus most often uses for Himself.',
        },
      ],
    },

    // ----------------------------------------------------------------- places
    {
      id: 'places',
      heading: 'The Geography',
      figures: [
        {
          art: `                    HEAVEN
                       │
              where the Ancient of Days sits
              where decrees are issued
                       │
         ┌─────────────┼─────────────┐
         │             │             │
    JERUSALEM     BABYLON       SUSA/PERSIA
         │             │             │
    temple           exile        where Daniel
    destroyed        home         receives visions`,
          caption: 'Heaven above earthly capitals, ruling all.',
        },
      ],
      entries: [
        {
          term: 'Babylon',
          detail:
            'The imperial capital where Daniel spent most of his life. The city of ziggurats and idols, of grandeur and pride. In chapter 4, Nebuchadnezzar looks over its rooftops and says, "Is not this great Babylon, which I have built?" He is struck mad before the words leave his mouth.',
        },
        {
          term: 'Jerusalem',
          detail:
            'The city Daniel left as a youth and never saw again. He prayed three times daily with his windows open toward Jerusalem. The seventy weeks prophecy concerns the city\`s restoration and ultimate destiny.',
        },
        {
          term: 'The Ulai canal',
          detail:
            'In Susa, by this waterway, Daniel receives the vision of the ram and the goat. The geography locates the vision in the Persian sphere even as it prophesies Persia\`s fall.',
        },
        {
          term: 'The great river (Tigris)',
          detail:
            'Where Daniel receives his final vision. The man clothed in linen appears above the waters, and Daniel falls prostrate.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The book divides cleanly between narrative (1 through 6) and vision (7 through 12). But there is another pattern layered over this: chapters 2 through 7 are written in Aramaic, the common language of the Babylonian empire, while chapters 1, 8 through 12 are in Hebrew. The Aramaic section is chiastic, with matching pairs.',
      ],
      figures: [
        {
          art: `   HEBREW (ch 1)         Introduction: Daniel in exile
   ────────────────────────────────────────────────────
   ARAMAIC (ch 2–7)
     A  ch 2   Statue dream: four kingdoms, stone
       B  ch 3   Furnace: faithful ones preserved
         C  ch 4   Nebuchadnezzar humbled
         C\` ch 5   Belshazzar judged
       B\` ch 6   Lions: faithful one preserved
     A\` ch 7   Four beasts, Son of Man receives kingdom
   ────────────────────────────────────────────────────
   HEBREW (ch 8–12)       Visions: the end of days`,
          caption: 'Chiastic structure in the Aramaic section.',
        },
        {
          art: `   THE FOUR KINGDOMS (in three visions)

   Ch 2 STATUE        Ch 7 BEASTS        Ch 8 RAM/GOAT
   ──────────         ──────────         ─────────────
   Gold head          Lion               Ram (two horns)
   │                  │                  │
   Silver chest       Bear               Goat (one horn)
   │                  │                  │
   Bronze thighs      Leopard            Four horns
   │                  │                  │
   Iron legs          Terrifying beast   Little horn
   │                  │
   Iron/clay feet     Ten horns
   │                  │
   STONE              SON OF MAN
   smashes all        receives kingdom`,
          caption: 'The same history told three ways: empires fall, God\`s kingdom stands.',
        },
      ],
      closing: [
        'The visions interpret each other. Chapter 2\`s statue and chapter 7\`s beasts both depict successive empires ending in divine judgment. Chapter 8 zooms in on two of those empires (Persia and Greece). Chapter 11 zooms in further, detailing conflicts between the Ptolemies and Seleucids. The closer the focus, the more specific the suffering, but the conclusion never changes: the kingdom shall be given to the people of the saints of the Most High.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'The Sovereignty of God',
          definition:
            'God rules over all earthly kingdoms, setting up kings and removing them according to His purpose.',
          appears:
            'Chapter 2: "He changes times and seasons; he removes kings and sets up kings." Chapter 4: "The Most High rules the kingdom of men and gives it to whom he will." Chapter 5: the numbered kingdom. Chapter 7: the Ancient of Days on His throne.',
          matters:
            'This is the engine of the book. Every story and every vision runs on this premise. If God is not sovereign over Babylon, the book collapses.',
        },
        {
          name: 'Faithful Resistance',
          definition:
            'The refusal to compromise worship or identity, even under threat of death.',
          appears:
            'Chapter 1: refusing the king\`s food. Chapter 3: refusing to bow to the image. Chapter 6: refusing to stop praying. In each case, the demand is total, the refusal is absolute, and God delivers.',
          matters:
            'Daniel models how to live in exile without assimilation. Serve the empire in everything except worship. That line is non-negotiable.',
        },
        {
          name: 'The Humbling of Pride',
          definition:
            'Every imperial overreach is met with divine judgment.',
          appears:
            'Nebuchadnezzar\`s madness (ch 4). Belshazzar\`s feast (ch 5). The arrogant little horn (chs 7, 8, 11). The pattern is invariant: pride rises, God strikes.',
          matters:
            'The book insists that history has a moral structure. Empires are not gods; they answer to one.',
        },
        {
          name: 'The Son of Man',
          definition:
            'A heavenly figure who receives everlasting dominion from the Ancient of Days.',
          appears:
            'Chapter 7:13 through 14. He comes with the clouds of heaven, is presented before the throne, and receives a kingdom that will never be destroyed.',
          matters:
            'Jesus adopts this title more than any other. The vision in Daniel 7 is the primary background for His self-identification.',
        },
        {
          name: 'The Times Are in God\`s Hands',
          definition:
            'History moves according to divine schedule, not human ambition.',
          appears:
            'Seventy years of exile. Seventy weeks of years. "A time, times, and half a time." The counted days of chapter 12.',
          matters:
            'The numbers signal that history has structure. God is not reacting to events; He has appointed their duration.',
        },
        {
          name: 'Resurrection',
          definition:
            'The dead will rise, some to everlasting life and some to everlasting contempt.',
          appears:
            'Chapter 12:2 through 3. This is the clearest Old Testament statement of bodily resurrection. The wise shall shine like the stars.',
          matters:
            'If empires fall and the faithful are killed, justice requires an afterlife. Daniel 12 provides one.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Daniel Sits in Scripture',
      entries: [
        {
          term: 'Ezekiel',
          detail:
            'A contemporary in exile, prophesying in Babylon during the same period. Ezekiel mentions Daniel alongside Noah and Job as a byword for righteousness (Ezekiel 14:14, 20). The two books together show exile from different angles: Ezekiel gives theology, Daniel gives narrative and vision.',
        },
        {
          term: 'Jeremiah',
          detail:
            'Daniel reads Jeremiah\`s prophecy of seventy years (Jeremiah 25:11 through 12) and responds with the prayer of chapter 9. The books connect: Jeremiah predicts the exile\`s length; Daniel lives through it and receives further revelation.',
        },
        {
          term: 'Isaiah',
          detail:
            'Isaiah predicted Babylon\`s fall and Cyrus\`s rise long before Daniel was born. Daniel sees these prophecies fulfilled and receives visions extending further still.',
        },
        {
          term: 'The Gospels',
          detail:
            'Jesus calls Himself the Son of Man more than eighty times, invoking Daniel 7. At His trial, He tells the high priest, "You will see the Son of Man seated at the right hand of Power, and coming on the clouds of heaven." He is claiming Daniel\`s vision as His own.',
        },
        {
          term: 'Revelation',
          detail:
            'The Apocalypse is steeped in Daniel\`s imagery: beasts from the sea, horns, times and half times, the Ancient of Days and the Lamb, thrones and judgments. John writes the sequel.',
        },
        {
          term: 'The exile narratives',
          detail:
            'Esther and Nehemiah also deal with Jews in or after exile, navigating foreign courts. Daniel provides the theological framework: God is sovereign even when His people are captive.',
        },
      ],
      closing: [
        'Daniel bridges the prophets and the apocalyptic. He stands with Isaiah and Jeremiah in proclaiming God\`s word to nations, but he also opens the door to the kind of symbolic, visionary literature that culminates in Revelation. The Son of Man in Daniel 7 becomes the central self-designation of Jesus. The four kingdoms become a framework for understanding history as a countdown to God\`s final kingdom.',
      ],
    },

    // ------------------------------------------------------------- the visions
    {
      id: 'visions',
      heading: 'The Visions Compared',
      body: [
        'Daniel receives four major visions, each covering overlapping ground from different angles. Understanding them together clarifies the book\`s apocalyptic worldview.',
      ],
      figures: [
        {
          art: `   VISION      CHAPTER   SCOPE               KEY IMAGE

   Statue      2         Four kingdoms       Stone smashes all
                         → divine kingdom

   Beasts      7         Four kingdoms       Son of Man given
                         → judgment          dominion forever

   Ram/Goat    8         Persia → Greece     Little horn tramples
                         → little horn       sanctuary, then broken

   Final       10–12     Greece → conflict   Resurrection,
   Conflict              → end of days       shine like stars`,
          caption: 'Four visions, one direction: toward God\`s eternal kingdom.',
        },
        {
          art: `   THE SEVENTY WEEKS (ch 9)
   ───────────────────────────

   7 weeks     + 62 weeks       + 1 week
      │             │                │
      ▼             ▼                ▼
   Rebuild      Until anointed   Cut off,
   Jerusalem    one comes        destruction
                                 new covenant

   Total: 70 "weeks" of years = 490 years
   Structure: restoration → Messiah → consummation`,
          caption: 'The timeline in response to Daniel\`s prayer.',
        },
      ],
      closing: [
        'The visions do not provide a timeline to decode like a puzzle. They provide assurance: God knows the end from the beginning. Empires that seem invincible are already measured. The suffering of God\`s people has a limit. The kingdom that cannot be shaken is coming.',
      ],
    },

    // ----------------------------------------------------------- court tales
    {
      id: 'tales',
      heading: 'The Court Tales',
      body: [
        'The first six chapters follow a pattern: crisis, faithfulness, deliverance, doxology. Each story pits human power against divine claim, and each ends with the pagan king confessing God\`s supremacy.',
      ],
      figures: [
        {
          art: `   CHAPTER   CRISIS                FAITHFUL ACT           OUTCOME

   1         King\`s food           Refuse, request        Healthier than all
                                   vegetables             ten times wiser

   2         Dream forgotten       Daniel prays,          Promoted
             kill all wise men     God reveals

   3         Bow to image          Refuse, furnace        Fourth figure
             or burn                                      walks with them

   4         King\`s pride          Daniel warns           Seven years mad
                                                          then restored

   5         Feast with            Daniel reads           Numbered, weighed
             temple vessels        writing                divided, fallen

   6         Pray to king          Refuse, lions          Shut the mouths
             or be eaten`,
          caption: 'Six stories, one pattern: God delivers the faithful and humbles the proud.',
        },
      ],
      closing: [
        'These are not morality tales about being good. They are throne-room showdowns. In each case, the empire demands what belongs to God alone, the faithful refuse, and God demonstrates who actually rules. The message to exiles: you are not alone, and you are not forgotten.',
      ],
    },

    // -------------------------------------------------------------- chapter 7
    {
      id: 'chapter7',
      heading: 'The Son of Man',
      body: [
        'Chapter 7 is the hinge of the book, the first vision, and the most important. It introduces the figure Jesus would claim as His primary title.',
      ],
      figures: [
        {
          art: `   "I saw in the night visions,
    and behold, with the clouds of heaven
    there came one like a son of man,

    and he came to the Ancient of Days
    and was presented before him.

    And to him was given dominion
    and glory and a kingdom,

    that all peoples, nations, and languages
    should serve him;

    his dominion is an everlasting dominion,
    which shall not pass away,

    and his kingdom one
    that shall not be destroyed."

                            — Daniel 7:13–14`,
          caption: 'The vision that defines the Messiah.',
        },
        {
          art: `   BEASTS                      SON OF MAN
   ──────                      ──────────
   Rise from sea               Comes with clouds
   (chaos, nations)            (heaven, divine)

   Animal form                 Human form
   (bestial power)             (true humanity)

   Temporary dominion          Everlasting dominion
   (stripped away)             (never passes)

   Many, successive            One, final
   (four beasts, ten horns)    (singular figure)`,
          caption: 'The contrast is total.',
        },
      ],
      closing: [
        'When Jesus calls Himself the Son of Man, He is not being humble. He is claiming this vision: the one who comes on clouds, receives all authority, and rules an everlasting kingdom. At His trial, He makes the claim explicit. The high priest understands it as blasphemy. It is meant to be recognized.',
      ],
    },

    // -------------------------------------------------------------- ending
    {
      id: 'ending',
      heading: 'The Sealed Book',
      body: [
        'The book ends not with resolution but with instruction: seal the words until the time of the end. Daniel is told to go his way, rest, and rise at the end of days.',
      ],
      figures: [
        {
          art: `   "But you, Daniel, shut up the words
    and seal the book, until the time of the end.
    Many shall run to and fro,
    and knowledge shall increase."

                            — Daniel 12:4

   "Go your way, Daniel,
    for the words are shut up and sealed
    until the time of the end.

    Many shall purify themselves
    and make themselves white and be refined,
    but the wicked shall act wickedly.
    And none of the wicked shall understand,
    but those who are wise shall understand.

    But go your way till the end.
    And you shall rest
    and shall stand in your allotted place
    at the end of the days."

                            — Daniel 12:9–13`,
          caption: 'The book closes with a promise: rest now, rise then.',
        },
      ],
      closing: [
        'Daniel never sees the visions fulfilled. He seals them for later generations. He is told to rest, to die in peace, knowing that at the end of days he will stand in his allotted place. The book offers no tidy ending because history has not ended. But it offers certainty: the kingdom comes, the dead rise, the wise shine like stars. For now, go your way. For then, stand.',
      ],
    },
  ],
};
