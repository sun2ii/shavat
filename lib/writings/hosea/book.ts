import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Hosea: the ground a reader should be standing on before
 * the first verse. A prophet commanded to marry unfaithfulness, so Israel
 * could see itself in a mirror.
 */
export const HOSEA: BookOrientation = {
  slug: 'hosea',
  title: 'Hosea',
  subtitle: 'The Wounded Love of God',
  scripture: 'Hosea 1–14',
  summary:
    'God\`s covenant love for Israel, shown through a prophet\`s painful marriage to an unfaithful wife.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Hosea is a book about a marriage. The prophet is commanded to marry a woman who will be unfaithful, and then to keep loving her anyway. That marriage is the message. Israel has played the whore with other gods, and God has not stopped loving her.',
        'The book divides cleanly. Chapters 1 through 3 tell the story of Hosea and Gomer: wedding, children with devastating names, divorce imagery, and then repurchase. Chapters 4 through 14 are oracles, wave after wave of indictment and plea, circling the same wound from different angles. The marriage at the front interprets the oracles that follow. Without Gomer, the accusations would be legal. With her, they are personal.',
        'Read the shape before the details. Hosea does not argue his way to a conclusion; he returns, again and again, to the same unbearable situation: a husband who will not stop loving a wife who will not stop leaving.',
      ],
      figures: [
        {
          art: `  COMMAND
    │
    ▼
  MARRIAGE .......... Hosea takes Gomer
    │
    ▼
  CHILDREN .......... Jezreel, Lo-Ruhamah, Lo-Ammi
    │                  names that are verdicts
    ▼
  UNFAITHFULNESS .... she goes after lovers
    │
    ▼
  PURCHASED BACK .... bought for fifteen shekels
    │
    ▼
  ORACLES ........... chapters 4–14
    │                  indictment, judgment, longing
    ▼
  INVITATION ........ "Return, O Israel"`,
          caption: 'The whole book: a marriage, then the meaning.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Hosea prophesied to the northern kingdom of Israel in the eighth century BC, during the final decades before Assyria destroyed it. The superscription names kings of both Israel and Judah: Jeroboam II in the north, and Uzziah, Jotham, Ahaz, and Hezekiah in the south. The span covers roughly 760 to 720 BC.',
        'On the surface, the era looked prosperous. Jeroboam II had expanded Israel\`s borders to their widest extent since Solomon. Trade flourished. The wealthy built houses of hewn stone. But the prosperity was brittle. Beneath it lay religious syncretism, social injustice, and political instability. After Jeroboam died, six kings took the throne in twenty years; four were assassinated.',
        'The religion Hosea attacks is not pure paganism but mixture. Israel had not abandoned the name of Yahweh; they had confused Him with Baal, the Canaanite storm god. They offered sacrifices at the same shrines to both, or used Baal\`s name for Yahweh without noticing the exchange. The calves at Bethel and Dan, set up by Jeroboam I two centuries earlier, had become indistinguishable from idols. Hosea calls them what they are.',
      ],
      entries: [
        {
          term: 'The northern kingdom',
          role: 'Israel / Ephraim',
          detail:
            'Hosea speaks to the ten northern tribes, often called Ephraim after the dominant tribe. This is not Judah in the south. The split happened after Solomon, and the north built its own sanctuaries at Bethel and Dan to keep the people from going to Jerusalem. By Hosea\`s day, those sanctuaries have become centers of idolatry.',
        },
        {
          term: 'Baal worship',
          role: 'the affair',
          detail:
            'Baal was the Canaanite god of storm, rain, and fertility. Worship involved ritual prostitution and the assumption that Baal, not Yahweh, made the crops grow. Israel had not rejected Yahweh outright; they had added Baal alongside Him, which Hosea treats as worse. You cannot commit adultery against a god you never married.',
        },
        {
          term: 'Assyria',
          role: 'the rod',
          detail:
            'The rising empire to the east. Israel tried to play Assyria against Egypt, making alliances with one to fend off the other. Hosea mocks this strategy repeatedly: Ephraim is a silly dove, fluttering between powers that will both devour her. In 722 BC, Assyria conquered Samaria and deported the population. Hosea saw it coming.',
        },
        {
          term: 'The calves',
          role: 'images of Yahweh, become idols',
          detail:
            'When the kingdom split, Jeroboam I set up golden calves at Bethel and Dan so the people would not need Jerusalem. They may have been meant as pedestals for an invisible God, like the cherubim in the temple. By Hosea\`s day they were worshiped as gods. The calf of Samaria will be carried to Assyria as tribute.',
        },
      ],
    },

    // ------------------------------------------------------------- characters
    {
      id: 'characters',
      heading: 'The People',
      figures: [
        {
          art: `        GOD ════════════════ ISRAEL
         │     covenant        │
         │     marriage        │
         │                     │
         │    mirrored in      │
         │                     │
         ▼                     ▼
       HOSEA ═══════════════ GOMER
         │      marriage       │
         │                     │
    ┌────┴────┬────────────────┤
    │         │                │
 JEZREEL  LO-RUHAMAH      LO-AMMI
 "God      "No mercy"     "Not my
  scatters"               people"`,
          caption: 'The prophet\`s family becomes God\`s message.',
        },
      ],
      entries: [
        {
          term: 'Hosea',
          role: 'the wounded husband',
          detail:
            'A prophet in the northern kingdom, commanded to embody God\`s situation rather than merely announce it. He marries a woman the text calls promiscuous, loves her, watches her leave, and buys her back. His pain is the message. His faithfulness to an unfaithful wife shows what God\`s covenant love looks like when the covenant is broken.',
        },
        {
          term: 'Gomer',
          role: 'the unfaithful wife',
          detail:
            'Daughter of Diblaim, described as a wife of whoredom. Whether she was unfaithful before the marriage or became so after is debated; the point is the same either way. She represents Israel, and the children she bears carry names that are indictments. She is purchased back in chapter 3, but never speaks. Her silence is part of the portrait.',
        },
        {
          term: 'Jezreel',
          role: 'the firstborn',
          detail:
            'The name means "God scatters" or "God sows." It is also the valley where Jehu massacred the house of Ahab, and Hosea says God will punish the house of Jehu for that blood. The name points to judgment. But the same word can mean planting: in chapter 2, God will sow her for Himself in the land.',
        },
        {
          term: 'Lo-Ruhamah',
          role: 'no mercy',
          detail:
            'A daughter whose name means "not pitied" or "no mercy." God will no longer have mercy on the house of Israel. She is a walking verdict. Yet in chapter 2 the name is reversed: "I will have mercy on No-Mercy."',
        },
        {
          term: 'Lo-Ammi',
          role: 'not my people',
          detail:
            'A son whose name means "not my people." This is the covenant formula broken: what God said at Sinai ("you shall be my people") is now unsaid. It is the most devastating name of the three. And in chapter 2, it too is reversed: "I will say to Not-My-People, you are my people."',
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
                        │ exile
                        │
        JEZREEL VALLEY ─┤
        where judgment comes
                        │
          SAMARIA ──────┤ capital of the north
                        │
          BETHEL ───────┤ "Beth-aven" / house of wickedness
          GILGAL ───────┤ sanctuaries of false worship
                        │
          EGYPT ────────┘ where they came from
                          where they keep looking back`,
          caption: 'The north, caught between Egypt remembered and Assyria coming.',
        },
      ],
      entries: [
        {
          term: 'Jezreel',
          detail:
            'The great valley that cuts across northern Israel, site of Jehu\`s bloody coup and symbol of coming judgment. God will break the bow of Israel in the Valley of Jezreel. The name becomes the firstborn child\`s name, a prophecy the boy carries.',
        },
        {
          term: 'Samaria',
          detail:
            'Capital of the northern kingdom, built by Omri a century before Hosea. Its calf will be shattered; its king will perish like a chip on the water. The city fell to Assyria in 722 BC.',
        },
        {
          term: 'Bethel',
          detail:
            'Once the place where Jacob met God; by Hosea\`s day, a royal sanctuary with a golden calf. Hosea calls it Beth-aven, "house of wickedness" or "house of nothing," a bitter pun on a holy name.',
        },
        {
          term: 'Gilgal',
          detail:
            'Another shrine, associated with entry into the land under Joshua. Now a place of false worship. "Every evil of theirs is in Gilgal; there I began to hate them."',
        },
        {
          term: 'Egypt',
          detail:
            'Where Israel was enslaved and from which God brought them out. In Hosea, Egypt functions as the past they keep returning to: they will go back to Egypt, or Assyria will be their king, because they refuse to return to God.',
        },
        {
          term: 'The wilderness',
          detail:
            'Where God first wed Israel, and where He will take her again. "I will allure her and bring her into the wilderness and speak tenderly to her." The wilderness is not punishment; it is courtship.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The book falls into two unequal parts. Chapters 1 through 3 tell the story of Hosea\`s marriage; chapters 4 through 14 deliver oracles. The marriage is the lens through which the oracles should be read.',
      ],
      figures: [
        {
          art: `   PART ONE: THE MARRIAGE (1–3)
   ─────────────────────────────
   1    Hosea takes Gomer, children born
   2    Indictment and restoration (the LORD speaks)
   3    Hosea buys her back

   PART TWO: THE ORACLES (4–14)
   ─────────────────────────────
   4–8    Charges against Israel
          no faithfulness, no knowledge
          half-baked bread, silly dove
          sow wind, reap whirlwind

   9–10   Judgment announced
          glory flies away
          thorns on the altars
          the calf carried off

   11–14  Longing and invitation
          "When Israel was a child I loved him"
          "How can I give you up, Ephraim?"
          "Return, O Israel, to the LORD your God"`,
          caption: 'Two parts: story, then oracle.',
        },
        {
          art: `   1:2–9     Marriage and children of judgment
   1:10–2:1  Future reversal (inserted promise)
   2:2–13    Indictment: she went after lovers
   2:14–23   Restoration: I will allure her
   3:1–5     Purchased back: love her again`,
          caption: 'Chapters 1–3 in detail.',
        },
      ],
      closing: [
        'Notice how restoration keeps interrupting judgment. Chapter 1 names children of doom, then immediately promises reversal. Chapter 2 indicts the wife, then courts her. The book will not let judgment stand as the last word, though it also will not let anyone pretend judgment is not coming.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Covenant as Marriage',
          definition:
            'God\`s relationship with Israel understood as a marriage covenant, with idolatry as adultery.',
          appears:
            'The entire structure of chapters 1–3; the marriage metaphor running through chapter 2; the accusation "she is not my wife" paralleling "you are not my people."',
          matters:
            'It makes idolatry personal. Israel has not broken a rule; she has broken a heart. The wound is relational before it is legal.',
        },
        {
          name: 'Knowledge of God',
          definition:
            'Not information about God but relationship with Him, covenant intimacy.',
          appears:
            '"There is no knowledge of God in the land" (4:1); "My people are destroyed for lack of knowledge" (4:6); "Let us know, let us press on to know the LORD" (6:3).',
          matters:
            'Hosea\`s diagnosis is not that Israel has wrong theology but that they do not know God the way a wife knows a husband. The knowledge he calls for is experiential and covenantal.',
        },
        {
          name: 'Hesed',
          definition:
            'Covenant loyalty, steadfast love, mercy that does not quit.',
          appears:
            '"I desire hesed and not sacrifice" (6:6); the word appears throughout, describing both what God shows and what Israel lacks.',
          matters:
            'It is the quality that holds when everything else breaks. God\`s hesed outlasts Israel\`s unfaithfulness.',
        },
        {
          name: 'Sowing and Reaping',
          definition:
            'Actions have consequences that unfold over time.',
          appears:
            '"They sow the wind, and they shall reap the whirlwind" (8:7); "Sow for yourselves righteousness; reap steadfast love" (10:12).',
          matters:
            'Judgment in Hosea is not arbitrary; it is agricultural. What you plant comes up.',
        },
        {
          name: 'Return',
          definition:
            'Turning back to God, the opposite of going after other lovers.',
          appears:
            '"Return, O Israel, to the LORD your God" (14:1); the repeated accusation that Israel will not return; the promise that in the wilderness she will respond as in the days of her youth.',
          matters:
            'The book\`s final word is invitation. Judgment is not the destination; return is.',
        },
        {
          name: 'God\`s Internal Struggle',
          definition:
            'The tension within God between justice and love, judgment and mercy.',
          appears:
            'Chapter 11: "How can I give you up, O Ephraim? ... My heart recoils within me; my compassion grows warm and tender."',
          matters:
            'Hosea lets the reader hear God arguing with Himself. The resolution is not logic but love.',
        },
        {
          name: 'Wilderness Restoration',
          definition:
            'God taking Israel back to the place of first love to begin again.',
          appears:
            '"I will allure her and bring her into the wilderness and speak tenderly to her" (2:14).',
          matters:
            'The wilderness is not exile; it is courtship. God will redo the wedding.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Hosea Sits in Scripture',
      entries: [
        {
          term: 'The Exodus',
          detail:
            'Hosea reads Israel\`s history through the exodus. "When Israel was a child, I loved him, and out of Egypt I called my son" (11:1). The exodus is the wedding; the wilderness wandering is the honeymoon; Canaan is the home Israel polluted.',
        },
        {
          term: 'Amos',
          detail:
            'A near contemporary, also speaking to the north. Amos emphasizes justice and coming judgment; Hosea emphasizes love and covenant betrayal. Together they show the full picture: God is both righteous judge and wounded husband.',
        },
        {
          term: 'Jeremiah',
          detail:
            'Jeremiah, a century later, will pick up Hosea\`s marriage imagery and apply it to Judah. "I remember the devotion of your youth, your love as a bride, how you followed me in the wilderness" (Jeremiah 2:2). The metaphor endures.',
        },
        {
          term: 'Ezekiel',
          detail:
            'Ezekiel 16 and 23 develop the marriage metaphor into graphic allegory. The unfaithful wife becomes unfaithful sisters, Jerusalem and Samaria. Hosea provides the seed.',
        },
        {
          term: 'Matthew',
          detail:
            'Matthew quotes Hosea 11:1, "Out of Egypt I called my son," and applies it to Jesus returning from Egypt as an infant (Matthew 2:15). Jesus is the faithful son Israel never was.',
        },
        {
          term: 'Romans',
          detail:
            'Paul quotes the reversal of the children\`s names: "Those who were not my people I will call my people, and her who was not beloved I will call beloved" (Romans 9:25). The Gentiles are drawn into the restored marriage.',
        },
      ],
      closing: [
        'Hosea stands at the head of the Book of the Twelve, the Minor Prophets. His marriage metaphor sets the tone for what follows: God\`s relationship with His people is not contractual but covenantal, not business but marriage, and the wound of betrayal is deep enough to fill fourteen chapters with pleading.',
      ],
    },

    // ----------------------------------------------------------- the names
    {
      id: 'names',
      heading: 'The Children\`s Names',
      body: [
        'Hosea\`s three children carry names that are prophecies. They are not just symbols; they are children who would have been called by these names in the streets of Israel. The message walks around.',
      ],
      figures: [
        {
          art: `   NAME            MEANING           REVERSAL

   JEZREEL         "God scatters"    "I will sow her for myself"
                   judgment          the same word means planting

   LO-RUHAMAH      "No mercy"        "I will have mercy on No-Mercy"
                   pity withdrawn    pity restored

   LO-AMMI         "Not my people"   "You are my people"
                   covenant broken   covenant renewed`,
          caption: 'Each name is a wound. Each wound is healed.',
        },
      ],
      closing: [
        'The reversal of the names in chapter 2 is one of the most striking moves in the book. God does not give the children new names; He takes the devastating names and turns them inside out. The judgment becomes promise. The curse becomes blessing. Lo-Ammi becomes Ammi.',
      ],
    },

    // ----------------------------------------------------------- imagery
    {
      id: 'imagery',
      heading: 'The Imagery',
      body: [
        'Hosea thinks in pictures. The book is dense with metaphors, often shifting rapidly, piling image on image. Israel is a wife, a vineyard, a cake not turned, a dove, a wild donkey, a trained heifer, a child, a sick man, a morning mist, dew, chaff, smoke. God is a husband, a father, a lion, a leopard, a bear, a moth, dry rot, the dew, a cypress tree. The accumulation is intentional; no single image can hold the relationship.',
      ],
      entries: [
        {
          term: 'Half-baked bread',
          role: 'Ephraim is a cake not turned',
          detail:
            'A cake baked on one side only: burned underneath, raw on top. Israel mixes with the nations and does not notice that gray hairs are sprinkled on him. The image is of something ruined without knowing it.',
        },
        {
          term: 'Silly dove',
          role: 'Ephraim flutters between powers',
          detail:
            'A bird without sense, calling to Egypt, going to Assyria, never resting on the one who could save them. The politics of panic.',
        },
        {
          term: 'Wind and whirlwind',
          role: 'sowing and reaping',
          detail:
            'They sow the wind and reap the whirlwind. Small sins become large consequences. What they planted was invisible; what they harvest is devastating.',
        },
        {
          term: 'Morning mist, dew, chaff, smoke',
          role: 'what disappears',
          detail:
            'Four images in a row for what does not last. Israel\`s love is like morning mist; it vanishes. So will Israel, unless they return.',
        },
        {
          term: 'Lion, leopard, bear',
          role: 'God as predator',
          detail:
            'God will be to them like a lion, like a leopard, like a bear robbed of her cubs. These are images of judgment, and they are terrifying. The God who loves is also the God who devours.',
        },
        {
          term: 'Dew, rain, cypress',
          role: 'God as life-giver',
          detail:
            '"I will be like the dew to Israel; he shall blossom like the lily." The same God who was lion and leopard is also dew and evergreen. The imagery turns when Israel returns.',
        },
      ],
    },

    // ----------------------------------------------------------- chapter 11
    {
      id: 'chapter11',
      heading: 'The Heart of Hosea',
      body: [
        'Chapter 11 is the emotional center of the book. It opens with God remembering the exodus as a father teaching a child to walk, and it builds to a moment where God\`s own heart is divided against itself.',
      ],
      figures: [
        {
          art: `   "When Israel was a child, I loved him,
      and out of Egypt I called my son.

    The more they were called,
      the more they went away...

    Yet it was I who taught Ephraim to walk;
      I took them up by their arms,
      but they did not know that I healed them.

    I led them with cords of kindness,
      with the bands of love,
    and I became to them as one who eases the yoke,
      and I bent down to them and fed them."

                                  — Hosea 11:1–4`,
          caption: 'The memory of tenderness.',
        },
        {
          art: `   "How can I give you up, O Ephraim?
      How can I hand you over, O Israel?

    My heart recoils within me;
      my compassion grows warm and tender.

    I will not execute my burning anger;
      I will not again destroy Ephraim;
    for I am God and not a man,
      the Holy One in your midst,
      and I will not come in wrath."

                                  — Hosea 11:8–9`,
          caption: 'The turn. Love wins.',
        },
      ],
      closing: [
        'This is the deepest disclosure in the book. God does not resolve the tension between justice and mercy by argument; He resolves it by being God and not a man. His holiness, surprisingly, is the reason for mercy. Because He is God, He can absorb the wound and still love.',
      ],
    },

    // -------------------------------------------------------------- ending
    {
      id: 'ending',
      heading: 'The Invitation',
      body: [
        'The book ends not with doom but with plea. After thirteen chapters of accusation and longing, the final chapter is an altar call. "Return, O Israel, to the LORD your God." The door is open.',
      ],
      figures: [
        {
          art: `   "Return, O Israel, to the LORD your God,
      for you have stumbled because of your iniquity.

    Take with you words
      and return to the LORD;
    say to him,
      'Take away all iniquity;
      accept what is good,
      and we will pay with bulls the vows of our lips.'

    I will heal their apostasy;
      I will love them freely,
      for my anger has turned from them.

    I will be like the dew to Israel;
      he shall blossom like the lily...

    Whoever is wise, let him understand these things;
      whoever is discerning, let him know them;
    for the ways of the LORD are right,
      and the upright walk in them,
      but transgressors stumble in them."

                                  — Hosea 14:1–9 (selected)`,
          caption: 'The final word is invitation.',
        },
      ],
      closing: [
        'Hosea does not end with Assyria or exile. He ends with dew and lilies and cedars. The last image is a flourishing tree, and the last word is a choice: the upright walk in these ways, and the transgressors stumble. The book that began with a command to marry unfaithfulness ends with an invitation to return. The marriage is still open.',
      ],
    },
  ],
};
