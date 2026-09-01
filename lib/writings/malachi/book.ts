import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Malachi: the ground a reader should be standing on before
 * the first verse. The final prophet of the Old Testament, speaking to a people
 * whose worship has grown cold while they claim to honor God.
 */
export const MALACHI: BookOrientation = {
  slug: 'malachi',
  title: 'Malachi',
  subtitle: 'The Lord\`s Final Argument',
  scripture: 'Malachi 1–4',
  summary:
    'God\`s closing word to Old Testament Israel: a series of disputes exposing corrupt worship, broken covenants, and the coming day when all will be set right.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Malachi is an argument. Not a vision, not a lament, not a narrative, but a structured disputation between God and His people. The pattern repeats six times: God makes a statement, the people object ("How have you loved us?" "How have we despised your name?"), and God answers with evidence. This is courtroom theology, and the people are on trial.',
        'The book stands at the end of the Old Testament, the last prophetic voice before four hundred years of silence. The temple has been rebuilt, the exiles have returned, but the fire has gone out. The priests offer blind and lame animals. The people divorce their wives to marry foreign women. Tithes go unpaid. And through it all, the people protest their innocence. Malachi\`s task is to strip away the pretense.',
        'Read the disputations as a single sustained cross-examination. Each one peels back another layer of self-deception until the defendants stand exposed. Then, in the final chapter, the verdict: a day is coming that will burn like a furnace, but for those who fear the Lord, the sun of righteousness will rise with healing in its wings.',
      ],
      figures: [
        {
          art: `  THE DISPUTATION PATTERN
    │
    ▼
  GOD SPEAKS .......... "I have loved you"
    │
    ▼
  PEOPLE OBJECT ....... "How have you loved us?"
    │
    ▼
  GOD ANSWERS ......... (Evidence, indictment, verdict)
    │
    ▼
  REPEAT .............. six times through the book

  ═══════════════════════════════════════════════

  THE SIX DISPUTATIONS:

  1:2–5    God\`s love questioned
  1:6–2:9  Priests despising God\`s name
  2:10–16  Faithless marriages
  2:17–3:5 Wearying God with words
  3:6–12   Robbing God in tithes
  3:13–4:3 Harsh words against God`,
          caption: 'The whole book: six rounds of divine cross-examination.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Malachi prophesied around 460 to 430 BC, roughly a century after the exiles returned from Babylon. The temple had been rebuilt under Zerubbabel (516 BC), and Ezra and Nehemiah had led reforms. But the initial enthusiasm had curdled into routine, and routine into corruption.',
        'The situation Malachi addresses is not outright idolatry like the pre-exilic prophets confronted. The people still worship at the temple, still bring sacrifices, still observe the festivals. But their worship is hollow. They offer the worst of their flocks while keeping the best for themselves. The priests accept it because they have stopped caring. The whole system runs on autopilot while God is treated as a nuisance.',
        'This is the danger of post-revival religion. The first generation rebuilds with tears and joy; the second maintains the structures; the third wonders why they bother. Malachi speaks to the third generation, and his method is confrontation. He will not let them sleep through their betrayal.',
      ],
      entries: [
        {
          term: 'The Second Temple',
          role: 'rebuilt but corrupt',
          detail:
            'The temple Zerubbabel built in 516 BC, far less glorious than Solomon\`s but still the center of worship. By Malachi\`s day it had become a place of religious routine. The priests were bored, the offerings were defective, and the people resented even the minimal effort required.',
        },
        {
          term: 'The Persian period',
          role: 'the political backdrop',
          detail:
            'Judah was a province of the Persian Empire. There was no king from David\`s line, no political independence, no immediate threat of conquest. The muted circumstances bred spiritual complacency. With no crisis to galvanize them, the people drifted.',
        },
        {
          term: 'Ezra and Nehemiah',
          role: 'reformers in the same era',
          detail:
            'Ezra arrived around 458 BC to teach the Law; Nehemiah came around 445 BC to rebuild the walls. The abuses Malachi attacks, including mixed marriages, neglected tithes, and corrupt priests, are the same issues Ezra and Nehemiah confronted. Malachi may have worked alongside them or in their immediate wake.',
        },
        {
          term: 'Edom',
          role: 'the unloved brother',
          detail:
            'The opening disputation contrasts Israel with Edom: "Jacob I loved, but Esau I hated." Edom, descended from Esau, had gloated over Jerusalem\`s fall and been destroyed. God\`s choice of Israel over Edom is the first evidence of His love. The people had forgotten.',
        },
      ],
    },

    // ------------------------------------------------------------- characters
    {
      id: 'characters',
      heading: 'The Parties',
      figures: [
        {
          art: `        GOD ══════════════ THE PEOPLE
         │    covenant       │
         │    (disputed)     │
         │                   │
    speaks through           respond with
         │                   │
         ▼                   ▼
     MALACHI              "HOW...?"
    (my messenger)        (objections)
         │
         │
    ┌────┴────────────────────┐
    │                         │
  THE PRIESTS            THE FAITHFUL
  (indicted)             (remembered)
  bored, corrupt         a book of
  defiling the altar     remembrance`,
          caption: 'The dispute has clear sides.',
        },
      ],
      entries: [
        {
          term: 'Malachi',
          role: 'my messenger',
          detail:
            'The name means "my messenger" in Hebrew, leading some to wonder if it is a title rather than a name. Either way, the prophet is the mouthpiece for the final Old Testament indictment. He speaks almost entirely in God\`s voice, stepping aside to let the dispute proceed.',
        },
        {
          term: 'The priests',
          role: 'the primary defendants',
          detail:
            'The Levitical priests receive the longest and harshest disputation. They despise God\`s name, offer defective animals, and teach poorly. The covenant with Levi has been corrupted. Once, Levi stood in awe; now his descendants count sacrifice a burden.',
        },
        {
          term: 'The people',
          role: 'complicit',
          detail:
            'The laypeople are also guilty: divorcing wives, marrying foreign women, withholding tithes, calling God unjust. Their objections ("How have you loved us?" "How have we robbed you?") reveal genuine confusion. They do not see what they have become.',
        },
        {
          term: 'Those who fear the Lord',
          role: 'the remnant',
          detail:
            'Amid the general failure, some still fear God. They speak to one another, and the Lord hears. A book of remembrance is written for them. They will be spared on the coming day. Malachi does not preach to the faithful; he reassures them that God sees.',
        },
        {
          term: 'The messenger of the covenant',
          role: 'the coming one',
          detail:
            'God announces He will send His messenger to prepare the way, then the Lord Himself will come suddenly to His temple. The messenger of the covenant will refine the priests like a metalworker refines silver. This figure points forward to John the Baptist and to Christ.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The book is a series of six disputations, each following the same rhetorical pattern: assertion, objection, response. The pattern creates cumulative force; each round strips away another defense. The final section shifts from disputation to prophecy, announcing the Day of the Lord.',
      ],
      figures: [
        {
          art: `   DISPUTATION 1 (1:2–5): GOD\`S LOVE
   ─────────────────────────────────────
   Assertion:  "I have loved you"
   Objection:  "How have you loved us?"
   Response:   "Is not Esau Jacob\`s brother?
               Yet I loved Jacob but hated Esau"

   DISPUTATION 2 (1:6–2:9): DESPISED NAME
   ─────────────────────────────────────
   Assertion:  "Where is my honor?"
   Objection:  "How have we despised your name?"
   Response:   "You offer polluted bread...
               blind, lame, sick animals"

   DISPUTATION 3 (2:10–16): FAITHLESS MARRIAGES
   ─────────────────────────────────────
   Assertion:  "The LORD was witness to your vows"
   Objection:  (implied: "Why does God reject our offerings?")
   Response:   "You have been faithless...
               covering your garments with violence"

   DISPUTATION 4 (2:17–3:5): WEARYING GOD
   ─────────────────────────────────────
   Assertion:  "You have wearied the LORD"
   Objection:  "How have we wearied him?"
   Response:   "By saying, \`Where is the God of justice?\`"

   DISPUTATION 5 (3:6–12): ROBBING GOD
   ─────────────────────────────────────
   Assertion:  "Return to me, and I will return to you"
   Objection:  "How shall we return?"
   Response:   "You are robbing me... in tithes"

   DISPUTATION 6 (3:13–4:3): HARSH WORDS
   ─────────────────────────────────────
   Assertion:  "Your words have been hard against me"
   Objection:  "How have we spoken against you?"
   Response:   "You said, \`It is vain to serve God\`"`,
          caption: 'Six rounds. Same pattern. Escalating exposure.',
        },
        {
          art: `   STRUCTURE OVERVIEW:

   1:1        Superscription

   1:2–5      First disputation: God\`s love
   1:6–2:9    Second disputation: corrupt priests
   2:10–16    Third disputation: faithless marriages
   2:17–3:5   Fourth disputation: justice is coming
   3:6–12     Fifth disputation: robbing God
   3:13–4:3   Sixth disputation: the coming day

   4:4–6      Epilogue: remember Moses, expect Elijah`,
          caption: 'The flow: six disputes, then final prophecy.',
        },
      ],
      closing: [
        'The disputation form is distinctively Malachi\`s contribution to prophetic literature. Other prophets accuse; Malachi cross-examines. The format assumes the people think they are innocent, and each round proves otherwise. By the end, no defense remains.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'The Unchanging God',
          definition:
            'God\`s character does not shift. His covenant faithfulness persists even when His people drift.',
          appears:
            '"For I the LORD do not change; therefore you, O children of Jacob, are not consumed" (3:6).',
          matters:
            'The people have changed: their devotion has cooled, their worship has corrupted. But God remains who He was. This is both comfort (they still exist) and warning (He still judges).',
        },
        {
          name: 'Corrupt Worship',
          definition:
            'Offering God the leftovers while calling it devotion.',
          appears:
            'The priests accept blind, lame, and sick animals (1:8). The people bring polluted offerings and call the table of the Lord contemptible (1:12). God would rather someone shut the temple doors than continue this charade (1:10).',
          matters:
            'Malachi exposes the gap between ritual and heart. The sacrifices continue, but the honor is gone. Going through the motions is worse than not going at all.',
        },
        {
          name: 'Covenant Faithfulness',
          definition:
            'Keeping the vows made to God and to one another.',
          appears:
            'The covenant with Levi has been corrupted (2:8). The people have been faithless to the wives of their youth (2:14). Marriage is a covenant, witnessed by God.',
          matters:
            'Malachi links divine and human covenants. Breaking faith with a spouse reflects breaking faith with God. The same word, faithless, covers both.',
        },
        {
          name: 'The Day of the Lord',
          definition:
            'The coming moment when God sets everything right, terrifying for the wicked, healing for the righteous.',
          appears:
            '"The day is coming, burning like an oven... But for you who fear my name, the sun of righteousness shall rise with healing in its wings" (4:1–2).',
          matters:
            'Malachi closes the Old Testament with anticipation. Justice is not yet visible, but it is coming. The book refuses to let the status quo be final.',
        },
        {
          name: 'The Coming Messengers',
          definition:
            'God will send a preparer and then come Himself.',
          appears:
            '"Behold, I send my messenger, and he will prepare the way before me" (3:1). "Behold, I will send you Elijah the prophet before the great and awesome day of the LORD comes" (4:5).',
          matters:
            'These prophecies bridge to the New Testament. John the Baptist fulfills the Elijah role (Matthew 11:14), and Christ is the Lord who comes suddenly to His temple.',
        },
        {
          name: 'The Remnant Remembered',
          definition:
            'God sees and records those who fear Him.',
          appears:
            '"Then those who feared the LORD spoke with one another. The LORD paid attention... and a book of remembrance was written" (3:16).',
          matters:
            'Amid corporate failure, individual faithfulness matters. God keeps a record. The faithful are His treasured possession.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Malachi Sits in Scripture',
      entries: [
        {
          term: 'The closing of the Old Testament',
          detail:
            'Malachi is the last book in the Christian Old Testament order, positioned to set up the New. The final verses recall Moses (the Law) and predict Elijah (the Prophets), summarizing the whole Old Testament and pointing forward.',
        },
        {
          term: 'The Book of the Twelve',
          detail:
            'In the Hebrew canon, Malachi ends the Minor Prophets. The Twelve form a single scroll, and Malachi\`s conclusion becomes the conclusion of all twelve. The prophetic voice goes silent after these words.',
        },
        {
          term: 'Ezra and Nehemiah',
          detail:
            'The abuses Malachi confronts, including intermarriage, neglected tithes, and corrupt Levites, are the same issues addressed in Ezra 9–10 and Nehemiah 13. Malachi\`s disputations may have accompanied or followed these reforms.',
        },
        {
          term: 'The Gospels',
          detail:
            'Matthew, Mark, and Luke all see John the Baptist as the fulfillment of Malachi\`s messenger prophecy (Mark 1:2; Luke 1:17; Matthew 11:10). The four hundred years of silence break with John in the wilderness, preparing the way.',
        },
        {
          term: 'Romans 9',
          detail:
            'Paul quotes Malachi 1:2–3, "Jacob I loved, but Esau I hated," in his discussion of divine election (Romans 9:13). God\`s love for Israel is not earned but chosen.',
        },
        {
          term: 'Revelation',
          detail:
            'The imagery of the Day of the Lord, with its burning and its healing, echoes through Revelation\`s final judgment scenes. What Malachi anticipates, Revelation completes.',
        },
      ],
      closing: [
        'Malachi\`s placement is providential. The Old Testament ends with the word curse (4:6), reminding readers that the problem of human sin is not yet solved. But it also ends with expectation: Elijah is coming. The Day is approaching. The silence that follows is pregnant, not empty.',
      ],
    },

    // ------------------------------------------------------------ the priests
    {
      id: 'priests',
      heading: 'The Indictment of the Priests',
      body: [
        'The second disputation (1:6–2:9) is the longest and most detailed. God puts the Levitical priesthood on trial. The charges are specific: contempt for His name, polluted offerings, bored service, failure to teach. The priests are supposed to guard knowledge and guide the people, but they have become obstacles.',
      ],
      figures: [
        {
          art: `   THE ORIGINAL COVENANT WITH LEVI:

   "My covenant with him was one of
    life and peace, and I gave them to
    him. It was a covenant of fear, and
    he feared me. He stood in awe of
    my name.

    True instruction was in his mouth,
    and no wrong was found on his lips.
    He walked with me in peace and
    uprightness, and he turned many
    from iniquity."

                              — Malachi 2:5–6

   ═══════════════════════════════════════════

   THE CURRENT CORRUPTION:

   "But you have turned aside from the way.
    You have caused many to stumble by
    your instruction. You have corrupted
    the covenant of Levi, says the LORD."

                              — Malachi 2:8`,
          caption: 'What Levi was. What his sons have become.',
        },
        {
          art: `   WHAT THE PRIESTS OFFER:

   ┌──────────────────────────────────┐
   │  "When you offer blind animals   │
   │   in sacrifice, is that not      │
   │   evil?                          │
   │                                  │
   │   When you offer those that are  │
   │   lame or sick, is that not      │
   │   evil?                          │
   │                                  │
   │   Present that to your governor; │
   │   will he accept you?"           │
   └──────────────────────────────────┘

   They would not insult a Persian official
   with defective gifts—but they bring
   their worst to God.`,
          caption: 'The diagnostic: you honor the governor more than God.',
        },
      ],
      closing: [
        'God\`s verdict is severe: He will curse the priests, spread dung on their faces (2:3), and make them contemptible before all the people. But the purpose is not destruction; it is exposure. The priesthood has failed, and everyone needs to see it. The ground is being prepared for a better priest.',
      ],
    },

    // ------------------------------------------------------ marriage covenant
    {
      id: 'marriage',
      heading: 'Faithlessness in Marriage',
      body: [
        'The third disputation turns from priests to people, and from altar to household. The men of Judah have been divorcing the wives of their youth to marry foreign women. Their offerings are rejected, but they cannot understand why. Malachi connects the two: you cannot be faithful at the altar while being faithless at home.',
      ],
      figures: [
        {
          art: `   "Did he not make them one, with a portion
    of the Spirit in their union? And what
    was the one God seeking? Godly offspring.

    So guard yourselves in your spirit, and
    let none of you be faithless to the wife
    of your youth.

    \`For the man who does not love his wife
    but divorces her,\` says the LORD, the God
    of Israel, \`covers his garment with violence.\`

    So guard yourselves in your spirit, and
    do not be faithless."

                                  — Malachi 2:15–16`,
          caption: 'Divorce is violence. Marriage is covenant.',
        },
      ],
      closing: [
        'The issue is not merely social but theological. Marriage is a covenant witnessed by God. Faithlessness to a spouse is faithlessness to the God who witnessed the vows. The horizontal and vertical are inseparable. You cannot worship well while living badly.',
      ],
    },

    // ----------------------------------------------------------- the day
    {
      id: 'day',
      heading: 'The Day of the Lord',
      body: [
        'After the six disputations, Malachi turns to prophecy. A day is coming that will resolve everything. The wicked will be stubble; the righteous will leap like calves. Before that day, a messenger will come to prepare the way. These final chapters are the hinge between the testaments.',
      ],
      figures: [
        {
          art: `   THE SEQUENCE OF THE DAY:

   1. THE MESSENGER SENT
      "Behold, I send my messenger,
       and he will prepare the way
       before me."
                                   (3:1a)
              │
              ▼
   2. THE LORD COMES
      "And the Lord whom you seek
       will suddenly come to his temple;
       and the messenger of the covenant
       in whom you delight."
                                   (3:1b)
              │
              ▼
   3. THE REFINING
      "He will sit as a refiner and
       purifier of silver, and he will
       purify the sons of Levi."
                                   (3:3)
              │
              ▼
   4. THE DAY BURNS
      "The day is coming, burning
       like an oven... all the
       arrogant and evildoers
       will be stubble."
                                   (4:1)
              │
              ▼
   5. THE SUN RISES
      "But for you who fear my name,
       the sun of righteousness shall
       rise with healing in its wings.
       You shall go out leaping
       like calves from the stall."
                                   (4:2)`,
          caption: 'Judgment and healing arrive together.',
        },
        {
          art: `   TWO OUTCOMES, ONE DAY:

   ┌─────────────────┬─────────────────┐
   │  THE ARROGANT   │  THOSE WHO FEAR │
   │                 │  THE LORD       │
   ├─────────────────┼─────────────────┤
   │  stubble        │  calves leaping │
   │  burned up      │  healed         │
   │  neither root   │  sun of         │
   │  nor branch     │  righteousness  │
   │  left           │  rising         │
   └─────────────────┴─────────────────┘

   The same sun that heals the righteous
   burns the wicked. Same day, different
   experiences.`,
          caption: 'The Day separates.',
        },
      ],
      closing: [
        'The Day of the Lord is not escapable; it is only survivable for those who fear Him. Malachi offers no third option. The question hanging over the book is: which group will you be in when the day comes?',
      ],
    },

    // -------------------------------------------------------------- ending
    {
      id: 'ending',
      heading: 'The Bridge to the New Testament',
      body: [
        'The final verses of Malachi are the final verses of the Old Testament in Christian order. They function as a summary and a transition. Remember Moses. Expect Elijah. Fathers and children must be reconciled, or the land faces a curse.',
      ],
      figures: [
        {
          art: `   "Remember the law of my servant Moses,
    the statutes and rules that I commanded
    him at Horeb for all Israel.

    Behold, I will send you Elijah the prophet
    before the great and awesome day of
    the LORD comes.

    And he will turn the hearts of fathers
    to their children and the hearts of
    children to their fathers, lest I come
    and strike the land with a decree of
    utter destruction."

                              — Malachi 4:4–6`,
          caption: 'Moses. Elijah. Reconciliation. Or curse.',
        },
        {
          art: `   OLD TESTAMENT ════════════════ NEW TESTAMENT
        │                              │
        │  "Behold, I will send        │
        │   Elijah the prophet"        │
        │           │                  │
        │           │ 400 years        │
        │           ▼                  │
        │     JOHN THE BAPTIST         │
        │     "in the spirit and       │
        │      power of Elijah"        │
        │           │                  │
        │           ▼                  │
        │     JESUS CHRIST             │
        │     "the Lord whom you seek  │
        │      will suddenly come      │
        │      to his temple"          │
        │                              │`,
          caption: 'Malachi\`s prophecy finds its answer.',
        },
      ],
      closing: [
        'The Old Testament ends mid-sentence, mid-story. The problem is stated but not solved. The messenger is promised but not arrived. The Day is coming but not here. Everything leans forward. Four hundred years will pass, and then a voice in the wilderness will cry: "Prepare the way of the Lord." Malachi\`s final words are still ringing.',
      ],
    },
  ],
};
