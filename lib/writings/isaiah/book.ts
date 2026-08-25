import { BookOrientation } from '@/lib/types';

export const ISAIAH: BookOrientation = {
  slug: 'isaiah',
  title: 'Isaiah',
  subtitle: 'The Gospel According to the Old Testament',
  scripture: 'Isaiah 1–66',
  summary:
    'The prophet who saw the Holy One enthroned, announced judgment and comfort, and unveiled the suffering Servant who would bear the sins of many.',
  place: { city: 'Jerusalem', vibe: 'holiness, throne, exile and return' },

  sections: [
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Isaiah is the largest prophetic book and arguably the most theologically rich. Spanning 66 chapters across roughly 150 years of history, it moves from Judah\`s kings through the Assyrian crisis, anticipates Babylonian exile, and ends with visions of cosmic restoration. Early Christians called it "the fifth Gospel" because its messianic imagery so clearly anticipates Jesus.',
        'The book divides naturally into two major sections. Chapters 1–39 address Judah under threat from Assyria: judgment on sin, calls to trust God rather than foreign powers, and glimpses of a coming righteous King. Chapters 40–66 shift tone entirely: comfort for exiles, the rise of Cyrus, the suffering Servant, and the new creation. The pivot is chapters 36–39, a historical narrative where Assyria threatens but God delivers, yet Babylon looms on the horizon.',
        'Isaiah\`s vision is simultaneously local and cosmic. He speaks to specific kings (Ahaz, Hezekiah) about specific crises (the Syro-Ephraimite war, Sennacherib\`s invasion). But he also sees God\`s purposes spanning all nations, all history, and culminating in new heavens and new earth. The Holy One of Israel will judge, redeem, and reign.',
      ],
      figures: [
        {
          art: `  THE SHAPE OF ISAIAH
    │
    ├── FIRST ISAIAH (1–39)
    │     │
    │     ├── Isaiah & Judah (1–6)
    │     │     Judgment, holiness, throne-room call
    │     │
    │     ├── Ahaz & Immanuel (7–12)
    │     │     Assyrian crisis, Immanuel sign, righteous King
    │     │
    │     ├── Nations Judged (13–27)
    │     │     Babylon, Moab, Egypt, worldwide judgment
    │     │
    │     ├── Judah & Assyria (28–35)
    │     │     Woes, trust God not Egypt, future glory
    │     │
    │     └── Hezekiah & Isaiah (36–39)
    │           Sennacherib, Hezekiah\`s prayer, Babylon envoys
    │
    └── SECOND ISAIAH (40–66)
          │
          ├── The Servant (40–55)
          │     Comfort, Cyrus, Servant Songs, free salvation
          │
          └── Zion Restored (56–66)
                True worship, new heavens and earth`,
          caption: 'Judgment, then comfort; exile, then restoration.',
        },
      ],
    },

    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Isaiah ministered during the reigns of Uzziah, Jotham, Ahaz, and Hezekiah (roughly 740–686 BC). This was the Assyrian century. The northern kingdom of Israel fell to Assyria in 722 BC; Judah survived but as a vassal, under constant threat.',
        'Two crises dominate. The first is the Syro-Ephraimite war (chapter 7): Aram and Israel pressure Judah to join an anti-Assyrian coalition. King Ahaz panics and appeals to Assyria for help, rejecting Isaiah\`s counsel to trust God. Isaiah gives the sign of Immanuel, but Ahaz\`s faithlessness sets Judah on a destructive path.',
        'The second crisis is Sennacherib\`s invasion (chapters 36–37): the Assyrian army besieges Jerusalem itself. King Hezekiah, unlike his father Ahaz, turns to God in prayer. Isaiah prophesies deliverance, and the Assyrian army is destroyed overnight. But immediately afterward, Babylonian envoys visit, and Isaiah announces that Babylon, not Assyria, will eventually carry Judah into exile.',
        'Chapters 40–66 presuppose that exile. The tone shifts from judgment to comfort; the audience is no longer Judah under Assyrian threat but Israel scattered among the nations. Cyrus is named as God\`s instrument of restoration. The Servant will bring light to the nations. A new creation awaits.',
      ],
      entries: [
        {
          term: 'Uzziah\`s death',
          role: 'the beginning',
          detail:
            'Isaiah\`s call comes "in the year that King Uzziah died" (chapter 6). Uzziah\`s reign had been prosperous; his death marked uncertainty. Isaiah sees the true King, the LORD enthroned, and is commissioned.',
        },
        {
          term: 'The Syro-Ephraimite war',
          role: 'the first crisis',
          detail:
            'Aram (Syria) and Israel (Ephraim) attack Judah to force it into an anti-Assyrian alliance. Ahaz refuses to trust God\`s promise of deliverance and instead pays tribute to Assyria, making Judah a vassal.',
        },
        {
          term: 'The fall of Samaria',
          role: 'the warning',
          detail:
            'In 722 BC, Assyria conquered the northern kingdom and scattered its people. Isaiah uses this as warning: what happened to Israel will happen to Judah if she persists in unfaithfulness.',
        },
        {
          term: 'Sennacherib\`s invasion',
          role: 'the second crisis',
          detail:
            'In 701 BC, the Assyrian king Sennacherib invaded Judah, took many cities, and besieged Jerusalem. Hezekiah prayed; Isaiah prophesied; the angel of the LORD struck the army. Jerusalem was spared.',
        },
        {
          term: 'The Babylonian envoys',
          role: 'the pivot',
          detail:
            'After Hezekiah\`s healing, Babylon sends envoys. Hezekiah shows them all his treasures. Isaiah announces that one day Babylon will carry away everything, including Hezekiah\`s descendants. The seeds of exile are planted.',
        },
        {
          term: 'Cyrus',
          role: 'the liberator',
          detail:
            'Chapters 44–45 name Cyrus, the Persian king who conquered Babylon in 539 BC and decreed that exiles could return. Isaiah calls him God\`s "anointed" (messiah) and "shepherd," a pagan king serving divine purposes.',
        },
      ],
    },

    {
      id: 'characters',
      heading: 'The People',
      body: [
        'Isaiah interacts with kings, gives his children prophetic names, and speaks of mysterious figures whose identity unfolds across Scripture.',
      ],
      entries: [
        {
          term: 'Isaiah',
          role: 'the prophet',
          detail:
            'His name means "the LORD saves," the theme of his book. He had access to kings, spoke with authority, and saw visions spanning centuries. Tradition says he was martyred under Manasseh by being sawn in two.',
        },
        {
          term: 'Ahaz',
          role: 'the faithless king',
          detail:
            'King during the Syro-Ephraimite war. He refused Isaiah\`s counsel, declined to ask for a sign, and made Judah a vassal of Assyria. His faithlessness brought Assyrian entanglement and idolatry.',
        },
        {
          term: 'Hezekiah',
          role: 'the faithful king',
          detail:
            'Ahaz\`s son, who purified the temple and trusted God during Sennacherib\`s invasion. His prayer brought deliverance. Yet his display of treasures to Babylon foreshadowed exile.',
        },
        {
          term: 'Shear-Jashub',
          role: 'a sign',
          detail:
            'Isaiah\`s son, whose name means "a remnant shall return." Isaiah brought him when meeting Ahaz, embodying the message: judgment is coming, but a remnant will survive.',
        },
        {
          term: 'Maher-Shalal-Hash-Baz',
          role: 'a sign',
          detail:
            'Isaiah\`s second son, whose name means "swift is the plunder, speedy is the prey." Before the child could speak, Assyria would plunder Damascus and Samaria.',
        },
        {
          term: 'Immanuel',
          role: 'the promise',
          detail:
            '"God with us." Given as a sign to Ahaz, the identity unfolds through Scripture. The child signals both imminent deliverance and ultimate fulfillment in Christ.',
        },
        {
          term: 'The Servant',
          role: 'the mystery',
          detail:
            'Four "Servant Songs" (42:1–9; 49:1–13; 50:4–11; 52:13–53:12) describe a figure who suffers, is rejected, dies for the sins of others, and is exalted. Israel is called "servant," but this Servant does what Israel could not.',
        },
        {
          term: 'Cyrus',
          role: 'the pagan messiah',
          detail:
            'The Persian king named 150 years before his birth. God calls him "my shepherd" and "my anointed." He conquered Babylon and freed the exiles, fulfilling Isaiah\`s prophecy.',
        },
      ],
    },

    {
      id: 'places',
      heading: 'The Geography',
      body: [
        'Isaiah\`s prophecies sweep from Jerusalem to Babylon to the ends of the earth.',
      ],
      figures: [
        {
          art: `                THE ANCIENT NEAR EAST
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       ASSYRIA        JUDAH        BABYLON
      (Nineveh)    (Jerusalem)   (later threat)
          │             │             │
          │     ┌───────┴───────┐     │
          │     │               │     │
          └──► ISRAEL         ARAM ◄──┘
              (Samaria)    (Damascus)
                 │
                 ▼
           FALLS 722 BC


              NATIONS JUDGED (13–23)
         ─────────────────────────────
         Babylon, Moab, Damascus, Cush,
         Egypt, Arabia, Tyre

              THE FUTURE VISION
         ─────────────────────────────
         Nations stream to Zion
         "from the ends of the earth"`,
          caption: 'Local crisis, cosmic resolution.',
        },
      ],
      entries: [
        {
          term: 'Jerusalem/Zion',
          detail:
            'The center of Isaiah\`s vision. Corrupt now, besieged by Assyria, destined for exile, but ultimately the place where nations stream, where God dwells, where light shines to the world.',
        },
        {
          term: 'Assyria',
          detail:
            'The superpower of chapters 1–39. God calls Assyria "the rod of my anger," an instrument of judgment. But Assyria overreaches, and God will judge the judge.',
        },
        {
          term: 'Babylon',
          detail:
            'Barely a power in Isaiah\`s day, yet he prophesies its rise and fall. Chapter 13 announces Babylon\`s doom; chapters 40–48 celebrate its fall to Cyrus. Babylon becomes the archetype of human pride opposing God.',
        },
        {
          term: 'Egypt',
          detail:
            'The temptation for Judah: trust in Egyptian horses and chariots rather than God. Isaiah warns repeatedly that Egypt is a broken reed. Those who go down to Egypt for help will be shamed.',
        },
        {
          term: 'The nations',
          detail:
            'Moab, Edom, Tyre, Cush, Arabia: all judged, all ultimately drawn into God\`s purposes. "The earth shall be full of the knowledge of the LORD as the waters cover the sea."',
        },
      ],
    },

    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'Isaiah is not a random collection of oracles but a carefully composed book with deliberate architecture.',
      ],
      figures: [
        {
          art: `   PART ONE: JUDGMENT (1–39)
   ──────────────────────
   1–6     Judah\`s sin, Isaiah\`s call
   7–12    Ahaz, Immanuel, the righteous King
   13–23   Oracles against the nations
   24–27   The "Isaiah Apocalypse": cosmic judgment
   28–33   Woes against trust in Egypt
   34–35   Edom\`s doom, the ransomed return
   36–39   Hezekiah and the Assyrian crisis
           (Transition: Babylon\`s shadow)

   PART TWO: COMFORT (40–66)
   ──────────────────────
   40–48   Comfort, Cyrus, idols vs. the LORD
   49–55   The Servant, suffering and triumph
   56–59   True worship, sin exposed
   60–62   Zion\`s glory
   63–66   Final judgment and new creation

   STRUCTURAL MARKERS
   ──────────────────────
   "Holy One of Israel" — 25x in Isaiah, 6x elsewhere
   "Comfort, comfort my people" — 40:1 begins Part Two
   "There is no peace for the wicked" — 48:22, 57:21`,
          caption: 'Two halves, one vision.',
        },
      ],
    },

    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'The Holy One of Israel',
          definition:
            'Isaiah\`s distinctive title for God, emphasizing both transcendence and covenant relationship.',
          appears:
            'Used 25 times in Isaiah, rarely elsewhere. The throne-room vision (chapter 6): "Holy, holy, holy is the LORD of hosts."',
          matters:
            'Holiness is not just purity but otherness, weight, glory. The Holy One cannot tolerate sin but also cannot abandon his people. Judgment and salvation both flow from holiness.',
        },
        {
          name: 'Trust vs. Fear',
          definition:
            'The choice between relying on God or on political alliances and human power.',
          appears:
            'Ahaz refuses to trust (chapter 7). "In returning and rest you shall be saved; in quietness and trust shall be your strength" (30:15). Egypt is flesh, not spirit.',
          matters:
            'Isaiah\`s practical message to his contemporaries: trust the LORD, not Assyria or Egypt. The nations are tools in God\`s hand. Fear God, and you need not fear them.',
        },
        {
          name: 'The Remnant',
          definition:
            'A faithful core who survive judgment and carry the promise forward.',
          appears:
            'Shear-Jashub ("a remnant shall return"), the stump of Jesse, the holy seed (6:13), those who wait for the LORD.',
          matters:
            'Judgment is severe but not total. God preserves a people. The remnant becomes the root from which restoration grows.',
        },
        {
          name: 'The Servant',
          definition:
            'A figure who embodies Israel\`s calling, suffers for others, and brings light to the nations.',
          appears:
            'Four Servant Songs: called from the womb (49:1), taught by God (50:4), pierced for our transgressions (53:5), exalted after suffering (52:13).',
          matters:
            'Israel was called to be God\`s servant but failed. The Servant does what Israel could not, taking sin upon himself. The New Testament identifies Jesus as this Servant.',
        },
        {
          name: 'The Coming King',
          definition:
            'A future ruler from David\`s line who will reign in righteousness.',
          appears:
            'The child given (9:6–7): Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace. The shoot from Jesse\`s stump (11:1–5).',
          matters:
            'Unlike Ahaz or even Hezekiah, this King will perfectly embody God\`s rule. His kingdom will have no end. Spirit-empowered, righteous, bringing cosmic peace.',
        },
        {
          name: 'New Creation',
          definition:
            'God\`s ultimate purpose: heavens and earth renewed, death destroyed, sorrow ended.',
          appears:
            '"Behold, I create new heavens and a new earth" (65:17). Death swallowed up forever (25:8). The desert blooms (35:1). Wolf and lamb together (11:6).',
          matters:
            'Isaiah\`s vision does not stop at political restoration. God is making all things new. The final chapters anticipate Revelation: no more tears, eternal worship, all nations gathered.',
        },
      ],
    },

    {
      id: 'servant-songs',
      heading: 'The Servant Songs',
      body: [
        'Four passages in chapters 40–55 describe a mysterious "Servant of the LORD" whose identity deepens as the songs progress.',
      ],
      figures: [
        {
          art: `   THE FOUR SERVANT SONGS
   ──────────────────────

   FIRST SONG (42:1–9)
   "Behold my servant, whom I uphold"
   • Spirit-anointed
   • Brings justice to the nations
   • Does not cry out or break bruised reeds
   • A light to the nations

   SECOND SONG (49:1–13)
   "The LORD called me from the womb"
   • Named before birth
   • Formed to bring Jacob back
   • "Too light a thing" to restore Israel only
   • Will be a light to the nations

   THIRD SONG (50:4–11)
   "I gave my back to those who strike"
   • Taught by God morning by morning
   • Does not rebel or turn back
   • Faces insult and spitting
   • Set face like flint

   FOURTH SONG (52:13–53:12)
   "He was pierced for our transgressions"
   • Exalted, then marred beyond recognition
   • Despised and rejected
   • Bears our griefs and carries our sorrows
   • Crushed for our iniquities
   • Silent before slaughter
   • Buried with the wicked, with the rich
   • Sees offspring, prolongs days
   • Makes many righteous

   IDENTITY
   ──────────────────────
   Israel is called "servant" (41:8, 44:1)
   But Israel is blind and deaf (42:19)
   This Servant does what Israel cannot
   The New Testament: Jesus is the Servant`,
          caption: 'The progressive revelation of the Suffering Servant.',
        },
      ],
    },

    {
      id: 'chapter6',
      heading: 'Isaiah 6: The Throne Room',
      body: [
        'Isaiah\`s call (chapter 6) is the interpretive key to the book. The prophet sees God as he really is, sees himself as he really is, and receives a devastating commission.',
      ],
      figures: [
        {
          art: `   THE VISION (6:1–4)
   ──────────────────────
   "I saw the Lord sitting upon a throne,
    high and lifted up"

   Seraphim cry: "Holy, holy, holy"
   Foundations shake; house fills with smoke

   THE CONFESSION (6:5)
   ──────────────────────
   "Woe is me! For I am lost;
    for I am a man of unclean lips,
    and I dwell in the midst of a people
    of unclean lips"

   THE CLEANSING (6:6–7)
   ──────────────────────
   Burning coal touches lips
   "Your guilt is taken away,
    your sin atoned for"

   THE COMMISSION (6:8–13)
   ──────────────────────
   "Whom shall I send?"
   "Here I am! Send me."

   Message: "Make the heart of this people dull"
   How long? "Until cities lie waste"
   But: "The holy seed is its stump"`,
          caption: 'Holiness, confession, atonement, mission.',
        },
      ],
      closing: [
        'This sequence shapes the entire book. God is holy; Israel is sinful; atonement is possible; but Israel\`s heart is hard and judgment must come before restoration. The holy seed, the remnant, the stump: these will survive and grow into something new.',
      ],
    },

    {
      id: 'connections',
      heading: 'Where Isaiah Sits in Scripture',
      entries: [
        {
          term: 'The Gospels',
          detail:
            'The most quoted Old Testament book in the New Testament. John the Baptist is "the voice crying in the wilderness" (40:3). Jesus reads Isaiah 61 in the Nazareth synagogue. The Ethiopian eunuch reads Isaiah 53.',
        },
        {
          term: 'Romans',
          detail:
            'Paul draws heavily on Isaiah for his argument about Israel. The remnant (Romans 9:27), the stumbling stone (9:33), "How beautiful the feet" (10:15), "All day long I have held out my hands" (10:21).',
        },
        {
          term: 'Revelation',
          detail:
            'The throne-room vision (Revelation 4) echoes Isaiah 6. "Holy, holy, holy." The new heavens and new earth (Revelation 21) quotes Isaiah 65. Death swallowed up, tears wiped away (25:8).',
        },
        {
          term: 'The Twelve Prophets',
          detail:
            'Isaiah is the head of the prophetic corpus. Hosea, Amos, Micah were contemporaries. Later prophets like Jeremiah and Ezekiel build on Isaiah\`s themes of exile and restoration.',
        },
        {
          term: 'Exodus',
          detail:
            'Isaiah recasts the Exodus pattern. The new exodus from Babylon (chapters 40–55) will be greater than the first. "I am making a way in the wilderness and rivers in the desert" (43:19).',
        },
        {
          term: 'Genesis',
          detail:
            'Creation language throughout. The new creation (65:17) reverses the curse. The peaceable kingdom (11:6–9) restores Eden. Abraham appears as the rock from which Israel was hewn (51:1–2).',
        },
      ],
    },

    {
      id: 'reading',
      heading: 'How to Read Isaiah',
      body: [
        'Isaiah is long and dense. Here is a path through the terrain.',
      ],
      figures: [
        {
          art: `   ORIENTATION READING
   ──────────────────────
   1. Chapter 6 — The throne-room call
   2. Chapter 7 — The sign of Immanuel
   3. Chapter 9:1–7 — The child given
   4. Chapter 11 — The shoot from Jesse
   5. Chapter 40 — Comfort, comfort
   6. Chapter 52:13–53:12 — The Suffering Servant
   7. Chapter 55 — Come to the waters
   8. Chapter 65:17–25 — New heavens and new earth

   THEN THE DIVISIONS
   ──────────────────────
   Isaiah & Judah (1–6)
   Ahaz & Immanuel (7–12)
   Nations Judged (13–27)
   Judah & Assyria (28–35)
   Hezekiah & Isaiah (36–39)
   The Servant (40–55)
   Zion Restored (56–66)

   READING POSTURE
   ──────────────────────
   • Hold judgment and comfort together
   • Watch for "Holy One of Israel"
   • Notice the Servant Songs
   • See Christ in the coming King
   • Let the new creation vision
     interpret the hard passages`,
          caption: 'An entry map for 66 chapters.',
        },
      ],
    },

    {
      id: 'why',
      heading: 'Why Isaiah Matters',
      body: [
        'Isaiah is the theological summit of the Old Testament prophets. Its vision of God\`s holiness, its announcement of judgment and comfort, its suffering Servant and coming King, its new creation: these themes converge in Jesus and extend to Revelation\`s final vision.',
        'The book refuses easy categories. God is transcendent and intimate. Judgment is severe and redemption is free. The Servant suffers and triumphs. Exile is deserved and deliverance is gracious. Isaiah holds these tensions without resolving them into comfortable formulas.',
        'More than any other prophet, Isaiah shows that Israel\`s story is the world\`s story. Nations stream to Zion. The Servant is a light to the Gentiles. New heavens and new earth are cosmic, not merely national. God\`s purposes begin with Abraham but end with all creation renewed.',
        'The New Testament writers returned to Isaiah constantly because they found the gospel there: righteousness from God, sin borne by another, good news proclaimed to the poor, comfort for those who mourn, liberation for captives, beauty for ashes. Isaiah saw it first.',
      ],
    },
  ],
};
