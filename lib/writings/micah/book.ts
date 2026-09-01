import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Micah: the ground a reader should be standing on before
 * the first verse. A prophet from the countryside who saw both kingdoms
 * crumbling from injustice, and yet pointed to Bethlehem.
 */
export const MICAH: BookOrientation = {
  slug: 'micah',
  title: 'Micah',
  subtitle: 'Justice, Judgment, and the Shepherd from Bethlehem',
  scripture: 'Micah 1-7',
  summary:
    'A rural prophet indicts corrupt leaders and predicts the fall of both capitals, but points forward to a ruler from Bethlehem and a God who delights to forgive.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Micah is a book of contrasts. It swings between devastating judgment and unexpected hope, between the crimes of the powerful and the vindication of the poor, between the fall of cities and the rise of a ruler from an insignificant village. The prophet does not smooth these tensions; he holds them together.',
        'The book divides into three cycles, each moving from judgment to hope. Chapters 1 through 2 indict Samaria and Jerusalem, then promise gathering. Chapters 3 through 5 attack corrupt leaders, then envision the peaceful reign of the Bethlehem ruler. Chapters 6 through 7 stage a covenant lawsuit, then end with a confession of trust in God\`s mercy.',
        'Read Micah as a prosecutor who becomes a pastor. He knows the case against Israel is airtight. He also knows the God who brings that case is the same God who will pardon iniquity and cast sins into the sea.',
      ],
      figures: [
        {
          art: `  CYCLE ONE (1-2)
    │
    ├─ JUDGMENT ........ Samaria and Jerusalem will fall
    │                    the wound is incurable
    └─ HOPE ............ "I will gather the remnant"
    │
  CYCLE TWO (3-5)
    │
    ├─ JUDGMENT ........ leaders devour the people
    │                    Zion will be plowed as a field
    └─ HOPE ............ the Bethlehem ruler
    │                    the remnant among the nations
    │
  CYCLE THREE (6-7)
    │
    ├─ LAWSUIT ......... what does the LORD require?
    │                    the city is full of violence
    └─ TRUST ........... who is a God like you?
                         pardoning iniquity`,
          caption: 'Three cycles, each ending in hope.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Micah prophesied during the reigns of Jotham, Ahaz, and Hezekiah, kings of Judah, placing him roughly between 735 and 700 BC. He was contemporary with Isaiah in Jerusalem and Hosea in the north. He witnessed the fall of Samaria to Assyria in 722 BC and may have seen Sennacherib\`s siege of Jerusalem in 701 BC.',
        'Unlike Isaiah, who moved in royal circles, Micah came from Moresheth, a small town in the Shephelah, the lowland hills between the coastal plain and the Judean highlands. He was a man of the villages, and his sympathies lie with the poor farmers being crushed by wealthy landowners. The crimes he attacks are not abstract; they are the foreclosures and evictions happening in his own region.',
        'The era was one of religious formalism covering social injustice. People offered sacrifices and festivals while cheating in the marketplace. Micah\`s response is one of the most quoted verses in the prophets: "What does the LORD require of you but to do justice, and to love kindness, and to walk humbly with your God?"',
      ],
      entries: [
        {
          term: 'Moresheth',
          role: 'Micah\`s home',
          detail:
            'Also called Moresheth-gath, a village about 25 miles southwest of Jerusalem, near the Philistine city of Gath. Micah was not from the capital or the priesthood; he was from the agricultural heartland. His perspective is that of someone watching the powerful devour the weak.',
        },
        {
          term: 'The fall of Samaria',
          role: 'background event',
          detail:
            'In 722 BC, Assyria conquered the northern kingdom and deported its population. Micah saw this happen and used it as a warning to Judah: the same fate awaits Jerusalem if they do not repent. Samaria\`s wound is incurable, and it has reached the gate of Jerusalem.',
        },
        {
          term: 'Sennacherib\`s invasion',
          role: 'possible context',
          detail:
            'In 701 BC, Sennacherib of Assyria invaded Judah and besieged many cities, including those in Micah\`s region. Isaiah 36-37 records the siege of Jerusalem; Micah\`s words about Zion being plowed as a field were remembered a century later as having been spoken during Hezekiah\`s reign.',
        },
        {
          term: 'Land consolidation',
          role: 'the injustice',
          detail:
            'Wealthy landowners were seizing the small family farms that were Israel\`s economic foundation. They "covet fields and seize them, and houses and take them away; they oppress a man and his house." This violated the Mosaic laws protecting ancestral inheritance.',
        },
      ],
    },

    // ------------------------------------------------------------- characters
    {
      id: 'characters',
      heading: 'The Voices',
      figures: [
        {
          art: `        THE LORD
            │
            │ speaks through
            │
          MICAH ─────────── THE PROPHET
            │                from Moresheth
            │
    ┌───────┴───────┐
    │               │
 ACCUSED         REMNANT
    │               │
  rulers         the poor
  prophets       the faithful
  priests        those who wait`,
          caption: 'The prophet stands between the court of heaven and the crimes of earth.',
        },
      ],
      entries: [
        {
          term: 'Micah',
          role: 'the prosecutor',
          detail:
            'His name means "Who is like Yahweh?" and the book ends with a play on this name: "Who is a God like you, pardoning iniquity?" Micah speaks for the LORD in the covenant lawsuit, but he also speaks for the oppressed. He is filled with power, justice, and might to declare to Jacob his transgression.',
        },
        {
          term: 'The rulers',
          role: 'the defendants',
          detail:
            'Heads of Jacob and rulers of the house of Israel who should know justice but hate the good and love evil. Micah\`s imagery is graphic: they tear the skin off the people, eat their flesh, break their bones. Leadership has become cannibalism.',
        },
        {
          term: 'The false prophets',
          role: 'the enablers',
          detail:
            'Prophets who cry "Peace" when they have something to eat, but declare war against those who put nothing in their mouths. They sell their oracles to the highest bidder. When darkness falls on them, the sun will go down on these prophets.',
        },
        {
          term: 'The remnant',
          role: 'the hope',
          detail:
            'The survivors whom God will gather. The lame become a remnant, the outcasts a strong nation. They will be like dew from the LORD, like a lion among the nations. The remnant is Micah\`s consistent hope: not all will be saved, but some will.',
        },
      ],
    },

    // ----------------------------------------------------------------- places
    {
      id: 'places',
      heading: 'The Geography',
      figures: [
        {
          art: `                    ASSYRIA
                        ▲
                        │ conquest
                        │
          SAMARIA ──────┤ "I will make Samaria a heap"
          capital of north, falls 722 BC
                        │
          JERUSALEM ────┤ "Zion shall be plowed as a field"
          capital of south
                        │
          BETHLEHEM ────┤ "too little to be among the clans"
          where the ruler comes from
                        │
          MORESHETH ────┘ Micah\`s home
          in the Shephelah`,
          caption: 'Two capitals fall; one village produces the ruler.',
        },
      ],
      entries: [
        {
          term: 'Samaria',
          detail:
            'Capital of the northern kingdom. Micah opens with its doom: "I will make Samaria a heap in the open country." The city sits on a hill surrounded by valleys; Micah sees its stones rolled down into the valley, its foundations laid bare. This happened in 722 BC.',
        },
        {
          term: 'Jerusalem',
          detail:
            'Capital of Judah, also called Zion. Micah\`s shocking prophecy was that Zion would be plowed as a field and Jerusalem become a heap of ruins. This word was remembered a century later and saved Jeremiah\`s life: the elders recalled that Hezekiah did not execute Micah for saying it.',
        },
        {
          term: 'Bethlehem Ephrathah',
          detail:
            'A small village five miles south of Jerusalem, too little to be among the clans of Judah. Yet from here will come a ruler whose origin is from of old, from ancient days. David came from Bethlehem; the new David will come from there as well.',
        },
        {
          term: 'Moresheth-gath',
          detail:
            'Micah\`s hometown in the lowland hills. In chapter 1, Micah runs through a series of wordplays on town names in his region, lamenting their coming destruction. These are his neighbors.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'Micah organizes his material in three cycles, each beginning with judgment and ending with promise. The word "Hear" (Hebrew shema) opens each cycle, signaling a new unit. Within each cycle, the mood swings dramatically, but the trajectory is always from indictment to hope.',
      ],
      figures: [
        {
          art: `   CYCLE ONE: Judgment and Gathering (1-2)
   ──────────────────────────────────────
   1:1       Superscription
   1:2-7     Theophany: the LORD comes in judgment
   1:8-16    Lament over the towns of Judah
   2:1-5     Woe against land-grabbers
   2:6-11    Conflict with false prophets
   2:12-13   Promise: I will gather the remnant

   CYCLE TWO: Leaders and the Ruler (3-5)
   ──────────────────────────────────────
   3:1-4     Against rulers who devour the people
   3:5-8     Against prophets who mislead
   3:9-12    Zion will be plowed as a field
   4:1-5     The mountain of the LORD exalted
   4:6-13    The remnant gathered, Babylon ahead
   5:1-6     The ruler from Bethlehem
   5:7-15    The remnant: dew and lion

   CYCLE THREE: Lawsuit and Mercy (6-7)
   ──────────────────────────────────────
   6:1-8     The LORD\`s case; what He requires
   6:9-16    The city\`s crimes and punishment
   7:1-7     Lament: the faithful have perished
   7:8-13    Confidence: the enemy will see
   7:14-17   Prayer for restoration
   7:18-20   Doxology: who is a God like you?`,
          caption: 'Three cycles, each with indictment and promise.',
        },
      ],
      closing: [
        'The structure itself is the message. Judgment is never the final word. Each cycle that begins with accusation ends with hope. The God who brings the case is the same God who acquits the defendant.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Social Justice',
          definition:
            'The treatment of the poor as the measure of a society\`s faithfulness to God.',
          appears:
            'Chapter 2: coveting fields and seizing houses. Chapter 3: rulers who eat the flesh of the people. Chapter 6: wicked scales, bags of deceitful weights. Chapter 7: the faithful have perished, none is upright.',
          matters:
            'Micah\`s indictment is economic and social before it is cultic. The crimes are foreclosures, bribery, false weights. God cares about how the powerful treat the powerless.',
        },
        {
          name: 'Corrupt Leadership',
          definition:
            'Rulers, prophets, and priests who exploit rather than serve.',
          appears:
            'Chapter 3 is a sustained attack on all three groups. Rulers judge for bribes, priests teach for money, prophets divine for payment. Yet they lean on the LORD and say, "Is not the LORD in our midst?"',
          matters:
            'Leadership should protect the vulnerable; instead it devours them. The failure of leadership is why both capitals will fall.',
        },
        {
          name: 'The Remnant',
          definition:
            'The survivors whom God will gather and through whom He will fulfill His purposes.',
          appears:
            '2:12: "I will gather the remnant of Israel." 4:7: "The lame I will make the remnant." 5:7-8: "The remnant of Jacob shall be among the nations like dew, like a lion."',
          matters:
            'Judgment will not annihilate Israel. A remnant will survive, and from this remnant God will build something new. The remnant is both comfort and warning: some will be saved, but not all.',
        },
        {
          name: 'The Bethlehem Ruler',
          definition:
            'The future shepherd-king from David\`s village who will bring peace.',
          appears:
            '5:2-5: "From you shall come forth for me one who is to be ruler in Israel, whose coming forth is from of old, from ancient days... And he shall stand and shepherd his flock in the strength of the LORD."',
          matters:
            'This is the messianic hope. When Matthew quotes this passage at Jesus\` birth, he sees fulfillment. The ruler comes from obscurity, not from the corrupt capitals.',
        },
        {
          name: 'True Religion',
          definition:
            'What God actually requires, as opposed to ritual performance.',
          appears:
            '6:6-8: "With what shall I come before the LORD? ... He has told you, O man, what is good; and what does the LORD require of you but to do justice, and to love kindness, and to walk humbly with your God?"',
          matters:
            'This is one of the most quoted verses in the Hebrew Bible. It summarizes the prophetic critique: ritual without ethics is worthless. God wants justice and hesed, not thousands of rams.',
        },
        {
          name: 'Divine Mercy',
          definition:
            'God\`s character as one who pardons sin and delights in steadfast love.',
          appears:
            '7:18-20: "Who is a God like you, pardoning iniquity and passing over transgression for the remnant of his inheritance? He does not retain his anger forever, because he delights in steadfast love."',
          matters:
            'The book ends not with judgment but with wonder at forgiveness. The God who brings the lawsuit is the God who throws sins into the sea.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Micah Sits in Scripture',
      entries: [
        {
          term: 'Isaiah',
          detail:
            'Micah\`s contemporary in Jerusalem. They share some material: the vision of nations streaming to the mountain of the LORD (Micah 4:1-3 = Isaiah 2:2-4). But Micah speaks from the villages, Isaiah from the court. Together they cover the same era from different angles.',
        },
        {
          term: 'Amos',
          detail:
            'An earlier prophet with similar concerns. Both attack social injustice, wealthy landowners, and religious hypocrisy. Amos says, "Let justice roll down like waters"; Micah says, "Do justice, love kindness." The same fire, different vocabulary.',
        },
        {
          term: 'Hosea',
          detail:
            'Another contemporary, but with a different emphasis. Hosea focuses on covenant unfaithfulness as adultery; Micah focuses on covenant unfaithfulness as oppression. Hosea speaks of hesed as marital love; Micah speaks of hesed as social ethics.',
        },
        {
          term: 'Jeremiah',
          detail:
            'A century later, when Jerusalem faced the Babylonians, the elders remembered Micah\`s prophecy that Zion would be plowed as a field. They cited it to save Jeremiah from execution: Hezekiah did not kill Micah for his words. Micah\`s memory saved Jeremiah\`s life (Jeremiah 26:17-19).',
        },
        {
          term: 'Matthew',
          detail:
            'When Herod asks where the Messiah is to be born, the scribes quote Micah 5:2: Bethlehem. The magi follow the star to the village the prophet named seven centuries earlier. Micah\`s words find their target.',
        },
      ],
      closing: [
        'Micah sits among the Twelve Prophets as the voice of the countryside. He speaks for those who have no voice in the capital. His prophecy of Bethlehem connects the obscure village to the throne of David, and his final doxology connects the covenant lawsuit to the character of a God who delights to forgive.',
      ],
    },

    // ------------------------------------------------------------ the lawsuit
    {
      id: 'lawsuit',
      heading: 'The Covenant Lawsuit',
      body: [
        'Chapter 6 opens with a formal legal proceeding. God summons the mountains as witnesses and puts Israel on trial. The genre is called a rib, a lawsuit or controversy. God is both prosecutor and injured party.',
      ],
      figures: [
        {
          art: `   SCENE: The Courtroom
   ─────────────────────

   WITNESSES:      mountains, hills, foundations of earth
   PLAINTIFF:      the LORD
   DEFENDANT:      Israel
   EVIDENCE:       exodus, wilderness, Balaam, entry into land

   THE CHARGE:     "O my people, what have I done to you?
                    How have I wearied you? Answer me!"

   THE QUESTION:   "With what shall I come before the LORD?"
                    (burnt offerings? thousands of rams?
                     my firstborn for my transgression?)

   THE VERDICT:    "He has told you, O man, what is good;
                    and what does the LORD require of you
                    but to do justice,
                    and to love kindness,
                    and to walk humbly with your God?"`,
          caption: 'The trial ends with the simplest requirement.',
        },
      ],
      closing: [
        'The escalating sacrifices in verses 6-7 are absurd: thousands of rams, ten thousands of rivers of oil, the sacrifice of the firstborn. Each offer is more extreme and more wrong. God does not want more; He wants different. Justice, kindness, humility. No sacrifice can substitute for faithfulness.',
      ],
    },

    // ------------------------------------------------------------ bethlehem
    {
      id: 'bethlehem',
      heading: 'The Bethlehem Prophecy',
      body: [
        'Micah 5:2-5 is one of the clearest messianic passages in the prophets. It specifies a location, an origin, and a role. The ruler comes from Bethlehem, but his goings forth are from of old. He will shepherd his flock in the strength of the LORD.',
      ],
      figures: [
        {
          art: `   "But you, O Bethlehem Ephrathah,
      who are too little to be among the clans of Judah,
    from you shall come forth for me
      one who is to be ruler in Israel,
    whose coming forth is from of old,
      from ancient days.

    Therefore he shall give them up
      until the time when she who is in labor has given birth;
    then the rest of his brothers shall return
      to the people of Israel.

    And he shall stand and shepherd his flock
      in the strength of the LORD,
      in the majesty of the name of the LORD his God.
    And they shall dwell secure,
      for now he shall be great to the ends of the earth.

    And he shall be their peace."

                                      — Micah 5:2-5a`,
          caption: 'From the smallest village, the greatest ruler.',
        },
      ],
      closing: [
        'The passage combines humility and majesty. Bethlehem is insignificant; the ruler\`s origin is eternal. He shepherds; he reigns to the ends of the earth. He is their peace. When the magi arrive in Jerusalem asking where the king of the Jews is to be born, the scribes know exactly where to look. The prophet from Moresheth had already told them.',
      ],
    },

    // -------------------------------------------------------------- ending
    {
      id: 'ending',
      heading: 'The Final Doxology',
      body: [
        'The book ends with a hymn of praise to God\`s character. After seven chapters of accusation, lament, and hope, Micah concludes by asking a question that plays on his own name: "Who is a God like you?" The answer is: no one.',
      ],
      figures: [
        {
          art: `   "Who is a God like you, pardoning iniquity
      and passing over transgression
      for the remnant of his inheritance?
    He does not retain his anger forever,
      because he delights in steadfast love.
    He will again have compassion on us;
      he will tread our iniquities underfoot.
    You will cast all our sins
      into the depths of the sea.
    You will show faithfulness to Jacob
      and steadfast love to Abraham,
    as you have sworn to our fathers
      from the days of old."

                                      — Micah 7:18-20`,
          caption: 'The lawsuit ends in pardon.',
        },
      ],
      closing: [
        'The God who prosecuted is the God who forgives. The sins that filled the indictment are cast into the sea. The ancient promises to Abraham and Jacob stand. Micah\`s name asks, "Who is like Yahweh?" The final verses answer: no one, because no other god delights in hesed, treads iniquity underfoot, and throws sins into the depths. The book that began with cosmic judgment ends with cosmic mercy.',
      ],
    },
  ],
};
