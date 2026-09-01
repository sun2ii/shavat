import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Habakkuk: the ground a reader should be standing on before
 * the first verse. A prophet who argues with God about justice, and receives
 * an answer that demands faith.
 */
export const HABAKKUK: BookOrientation = {
  slug: 'habakkuk',
  title: 'Habakkuk',
  subtitle: 'The Argument with God',
  scripture: 'Habakkuk 1–3',
  summary:
    'A prophet\`s dialogue with God about injustice, ending in radical trust despite unanswered questions.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Habakkuk is not a sermon to Israel; it is an argument with God. The prophet sees violence and injustice in Judah and demands to know why God does nothing. God answers: He is raising up the Babylonians to punish. Habakkuk is appalled. How can a holy God use an even more wicked nation as His instrument? The book is theodicy in real time.',
        'The structure is unique among the prophets: two rounds of complaint and divine response, then a prayer that is also a psalm. Habakkuk does not preach; he questions, listens, and ultimately trusts. The dialogue form makes the reader a witness to the wrestling.',
        'Read this book as a transcript of a hard conversation. The prophet does not pretend his questions are easy. God does not pretend His answers are comfortable. What emerges is not explanation but faith.',
      ],
      figures: [
        {
          art: `  FIRST COMPLAINT (1:2–4)
    │
    │   "How long, O LORD?"
    │   Violence in Judah, justice perverted
    │
    ▼
  FIRST ANSWER (1:5–11)
    │
    │   "I am raising up the Babylonians"
    │   God will judge through a ruthless nation
    │
    ▼
  SECOND COMPLAINT (1:12–2:1)
    │
    │   "Why do you use the wicked?"
    │   Babylon is worse than Judah
    │   "I will stand at my watch and wait"
    │
    ▼
  SECOND ANSWER (2:2–20)
    │
    │   "Write the vision... the righteous shall live by faith"
    │   Five woes against the oppressor
    │   "The LORD is in his holy temple; let all the earth be silent"
    │
    ▼
  THE PRAYER (chapter 3)
    │
    │   Theophany: God coming in power
    │   "Though the fig tree does not blossom... yet I will rejoice"`,
          caption: 'The whole book: two rounds of argument, then trust.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Habakkuk prophesied around 608 to 605 BC, during the reign of Jehoiakim in Judah. The good king Josiah had died in battle at Megiddo in 609 BC, and reform died with him. Jehoiakim was a puppet of Egypt, then of Babylon, and the injustice Habakkuk describes fits his reign: oppression, violence, the powerful exploiting the weak.',
        'The Babylonians (also called Chaldeans) were rising. In 612 BC they destroyed Nineveh, ending the Assyrian Empire. In 605 BC Nebuchadnezzar defeated Egypt at Carchemish and began to dominate the region. Habakkuk\`s prophecy catches Judah at the hinge: Assyria gone, Babylon coming, and Judah squeezed between empires.',
        'The prophet\`s complaint is not abstract. He sees real violence in Jerusalem, real corruption in the courts. And God\`s answer is not comfort but a darker storm: the Babylonians are coming, and they are worse. This is the crisis that generates the book\`s central question: How can a holy God use the wicked to punish the less wicked?',
      ],
      entries: [
        {
          term: 'Jehoiakim',
          role: 'king of Judah',
          detail:
            'Son of Josiah, placed on the throne by Pharaoh Necho after Josiah\`s death. He reversed his father\`s reforms, built palaces with forced labor, murdered prophets, and burned Jeremiah\`s scroll. The injustice Habakkuk laments likely happened under his rule.',
        },
        {
          term: 'The Babylonians',
          role: 'instrument of judgment',
          detail:
            'Also called Chaldeans. They rose to power after Assyria fell and would eventually destroy Jerusalem in 586 BC. In Habakkuk, God announces them as His instrument, which horrifies the prophet. They are described as fierce, swift, and self-worshiping.',
        },
        {
          term: 'The fall of Assyria',
          role: 'the power vacuum',
          detail:
            'Nineveh fell in 612 BC. The empire that had destroyed the northern kingdom and threatened Judah for over a century was gone. Babylon filled the void. Habakkuk\`s dialogue happens in this transition.',
        },
        {
          term: 'Carchemish',
          role: 'the turning point',
          detail:
            'In 605 BC, Nebuchadnezzar defeated Egypt at Carchemish, making Babylon the dominant power. This is likely around the time Habakkuk received his prophecy, or shortly after.',
        },
      ],
    },

    // ------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'Habakkuk has a unique three-part structure: dialogue, woes, and psalm. The first two chapters are a conversation between the prophet and God, with Habakkuk complaining and God responding twice. The third chapter is a prayer set to music, a theophany that ends in trust.',
      ],
      figures: [
        {
          art: `   DIALOGUE: COMPLAINT AND ANSWER
   ═══════════════════════════════════════════════════
   1:1        Superscription
   1:2–4      COMPLAINT 1: Violence in Judah
   1:5–11     ANSWER 1: I am sending Babylon
   1:12–2:1   COMPLAINT 2: But they are worse!
   2:2–5      ANSWER 2: Wait; the righteous live by faith

   WOES: JUDGMENT ON THE OPPRESSOR
   ═══════════════════════════════════════════════════
   2:6–8      Woe 1: Plundering
   2:9–11     Woe 2: Unjust gain
   2:12–14    Woe 3: Bloodshed
   2:15–17    Woe 4: Debauchery
   2:18–20    Woe 5: Idolatry

   PRAYER: THEOPHANY AND TRUST
   ═══════════════════════════════════════════════════
   3:1–2      Petition: Revive your work
   3:3–15     Theophany: God\`s march in power
   3:16–19    Resolution: Yet I will rejoice`,
          caption: 'Three movements: argue, judge, trust.',
        },
        {
          art: `   THE DIALOGUE STRUCTURE

   HABAKKUK                    GOD
   ────────────────────────────────────────────
   "How long?"           →
                         ←    "Watch: Babylon"
   "But they are wicked!"→
                         ←    "Wait: Faith"

   Prophet speaks first, then listens.
   God answers, but not with comfort.
   The prophet must decide what to do with the answer.`,
          caption: 'The dialogue is a genuine exchange, not a monologue.',
        },
      ],
      closing: [
        'The structure moves from protest to trust. Habakkuk begins shouting at heaven and ends singing. But the movement is not easy; it passes through silence (2:20), theophany (3:3–15), and trembling (3:16) before arriving at joy.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Theodicy',
          definition:
            'The problem of evil: why do the wicked prosper and the righteous suffer?',
          appears:
            'Habakkuk\`s first complaint (1:2–4) and especially his second (1:12–17), where he protests that God is using an unjust instrument.',
          matters:
            'The book does not solve the problem; it transforms it. Habakkuk moves from demanding an answer to trusting the Answerer.',
        },
        {
          name: 'Faith',
          definition:
            'Trust in God\`s justice and character despite evidence to the contrary.',
          appears:
            '"The righteous shall live by his faith" (2:4), the central declaration. Chapter 3 embodies it: "yet I will rejoice."',
          matters:
            'Faith in Habakkuk is not belief in a proposition; it is holding on to God when His actions seem unjust. It is relational trust.',
        },
        {
          name: 'Waiting',
          definition:
            'Patience between promise and fulfillment, between question and vindication.',
          appears:
            '"Write the vision... it awaits its appointed time; it will not lie. If it seems slow, wait for it" (2:2–3).',
          matters:
            'God\`s timing is not Habakkuk\`s timing. The vision has an appointed hour. Faith is learning to wait.',
        },
        {
          name: 'Divine Sovereignty',
          definition:
            'God is in control even when He uses wicked instruments.',
          appears:
            'God raises up the Babylonians (1:6); the woes show He will judge them too (2:6–20); "The LORD is in his holy temple" (2:20).',
          matters:
            'Babylon is not out of control. God can use the wicked and still hold them accountable. History is His to direct.',
        },
        {
          name: 'Theophany',
          definition:
            'A dramatic appearance of God, often with cosmic imagery.',
          appears:
            'Chapter 3: God comes from Teman, stops the sun and moon, tramples the nations. The language echoes the exodus and Sinai.',
          matters:
            'Habakkuk\`s trust is grounded in who God is and what He has done. The theophany reminds him that this God saves.',
        },
      ],
    },

    // ------------------------------------------------------------ 2:4
    {
      id: 'faith',
      heading: 'The Righteous Shall Live by Faith',
      body: [
        'The single most influential verse in the book is 2:4. It became foundational for Paul\`s theology of justification and for the Protestant Reformation. But in context, it is God\`s answer to a prophet who has asked how to survive an era of injustice.',
      ],
      figures: [
        {
          art: `   "Behold, his soul is puffed up; it is not upright within him,
      but the righteous shall live by his faith."
                                                    — Habakkuk 2:4

   TWO PATHS
   ═════════════════════════════════════════════════════

   THE PROUD                    THE RIGHTEOUS
   ───────────────────────────────────────────────────
   Soul puffed up               Lives by faith
   Not upright                  Trusts God\`s timing
   Self-reliant                 Dependent on God
   Will fall (the woes)         Will live`,
          caption: 'The contrast defines the choice.',
        },
        {
          art: `   IN THE NEW TESTAMENT

   ROMANS 1:17
   "The righteous shall live by faith"
   → Thesis of the epistle: righteousness by faith

   GALATIANS 3:11
   "The righteous shall live by faith"
   → Against works of the law

   HEBREWS 10:38
   "My righteous one shall live by faith"
   → Endurance until Christ returns`,
          caption: 'Three epistles, one verse, three angles.',
        },
      ],
      closing: [
        'In Habakkuk, faith is not abstract belief but active trust during waiting. The vision is delayed; the wicked are prospering; Babylon is coming. What does the righteous person do? They live by faith. They hold on. They wait for the vision.',
      ],
    },

    // ------------------------------------------------------------ woes
    {
      id: 'woes',
      heading: 'The Five Woes',
      body: [
        'God\`s second answer includes five woes against the oppressor. Though immediately applied to Babylon, they function as universal judgments against imperial arrogance. Each woe follows the same pattern: what the wicked do, and how it will turn against them.',
      ],
      figures: [
        {
          art: `   WOE    SIN                 REVERSAL
   ════════════════════════════════════════════════════════════
   1      Plundering           You will be plundered (2:6–8)
          heaping up           the remnant will loot you

   2      Unjust gain          Your house will shame you (2:9–11)
          building by evil     the stones cry out

   3      Bloodshed            You build in vain (2:12–14)
          cities by violence   the earth will be filled
                               with knowledge of God\`s glory

   4      Debauchery           Shame will cover you (2:15–17)
          making neighbors     violence to Lebanon returns
          drunk to expose them

   5      Idolatry             Your gods are silent (2:18–20)
          trusting carved      but the LORD is in his temple
          images`,
          caption: 'Sin and reversal: the boomerang of injustice.',
        },
      ],
      closing: [
        'The woes answer Habakkuk\`s protest. Yes, God is using Babylon. But no, Babylon will not escape judgment. The instrument of wrath is also under wrath. God\`s justice is not partial; it reaches the wicked in Judah and the wicked who punish Judah.',
      ],
    },

    // ------------------------------------------------------------ chapter 3
    {
      id: 'prayer',
      heading: 'The Prayer of Chapter 3',
      body: [
        'Chapter 3 is a psalm, complete with musical notations ("according to Shigionoth," "Selah," "to the choirmaster"). It moves from petition to theophany to trust. Habakkuk asks God to act, sees God acting in vision, trembles at the sight, and then chooses joy.',
      ],
      figures: [
        {
          art: `   MOVEMENT OF CHAPTER 3

   v. 2     PETITION
            "O LORD, I have heard the report of you...
             in wrath remember mercy."

   vv. 3–15 THEOPHANY
            God comes from Teman
            His splendor covers the heavens
            Mountains writhe, waters rage
            Sun and moon stand still
            He marches through the earth
            He tramples the nations
            He saves his anointed

   v. 16    TREMBLING
            "I hear, and my body trembles...
             I will quietly wait for the day of trouble"

   vv. 17–19 TRUST
             "Though the fig tree does not blossom...
              yet I will rejoice in the LORD"`,
          caption: 'From request to vision to trembling to joy.',
        },
        {
          art: `   "Though the fig tree does not blossom,
      nor fruit be on the vines,
    the produce of the olive fail
      and the fields yield no food,
    the flock be cut off from the fold
      and there be no herd in the stalls,

    yet I will rejoice in the LORD;
      I will take joy in the God of my salvation.

    GOD, the Lord, is my strength;
      he makes my feet like the deer\`s;
      he makes me tread on my high places."
                                        — Habakkuk 3:17–19`,
          caption: 'The most radical statement of faith in the prophets.',
        },
      ],
      closing: [
        'This ending is the answer to the book\`s questions. Not an explanation of why the wicked prosper or why God uses Babylon, but a decision to trust anyway. Habakkuk\`s faith is not optimism (things will turn out well) but faithfulness (God is still God). The circumstances are worst-case: no harvest, no flocks, economic ruin. Yet I will rejoice.',
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Habakkuk Sits in Scripture',
      entries: [
        {
          term: 'Job',
          detail:
            'Both books wrestle with theodicy, but differently. Job asks why the righteous suffer; Habakkuk asks why the wicked prosper and why God uses them. Job gets theophany and silence; Habakkuk gets theophany and trust.',
        },
        {
          term: 'The Psalms',
          detail:
            'Habakkuk\`s complaints echo the lament psalms: "How long, O LORD?" (cf. Psalm 13). Chapter 3 is itself a psalm. The movement from lament to trust mirrors the structure of many psalms.',
        },
        {
          term: 'Jeremiah',
          detail:
            'A contemporary prophet who also lived through Jehoiakim\`s reign and the Babylonian crisis. Jeremiah preaches to the people; Habakkuk argues with God. Both address the same historical moment.',
        },
        {
          term: 'Nahum',
          detail:
            'The book immediately before Habakkuk in the Twelve. Nahum announces judgment on Assyria; Habakkuk sees Babylon rise to take Assyria\`s place. One oppressor falls; another rises.',
        },
        {
          term: 'Romans',
          detail:
            'Paul quotes 2:4 as the thesis of his epistle: "The righteous shall live by faith" (Romans 1:17). The verse becomes foundational for justification by faith, though Paul extends its meaning.',
        },
        {
          term: 'Galatians',
          detail:
            'Paul quotes 2:4 again to argue that righteousness comes by faith, not by works of the law (Galatians 3:11). Habakkuk\`s word about endurance becomes a word about salvation.',
        },
        {
          term: 'Hebrews',
          detail:
            'Hebrews 10:37–38 quotes both 2:3 and 2:4: the vision is coming, and the righteous live by faith. The context is perseverance while waiting for Christ\`s return.',
        },
      ],
      closing: [
        'Habakkuk stands as a hinge in the Twelve. Nahum before him deals with Assyria; Zephaniah after him announces the Day of the LORD. Habakkuk catches the moment between empires, when faith must hold without seeing resolution.',
      ],
    },

    // -------------------------------------------------------------- ending
    {
      id: 'ending',
      heading: 'Reading Habakkuk',
      body: [
        'Enter this book as a witness to a private conversation. Habakkuk does not address Israel; he addresses God. His complaints are real, his questions unfiltered. And God\`s answers are not comfortable. They demand faith, not understanding.',
      ],
      figures: [
        {
          art: `   WHAT HABAKKUK WANTS        WHAT HABAKKUK GETS
   ═══════════════════════════════════════════════════════

   Justice now                  Justice later (wait for it)
   Comfortable instrument       Uncomfortable instrument (Babylon)
   Explanation                  Theophany (who God is, not why)
   Safety                       Strength (deer\`s feet on heights)`,
          caption: 'The gap between request and answer is where faith lives.',
        },
      ],
      closing: [
        'The book does not answer the problem of evil. It transforms the questioner. Habakkuk begins demanding that God explain Himself and ends rejoicing in a God who has not explained anything. What changed is not his circumstances or his understanding but his posture. He moves from the watchtower of demand to the high places of trust. That movement is the message.',
      ],
    },
  ],
};
