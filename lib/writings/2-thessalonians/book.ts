import { BookOrientation } from '@/lib/types';

/**
 * The orientation for 2 Thessalonians: a follow-up letter addressing
 * continued confusion about the day of the Lord and the problem of idleness.
 */
export const SECOND_THESSALONIANS: BookOrientation = {
  slug: '2-thessalonians',
  title: '2 Thessalonians',
  subtitle: 'The Day Has Not Yet Come',
  scripture: '2 Thessalonians 1–3',
  summary:
    'Paul corrects a dangerous misunderstanding: the day of the Lord has not arrived, and until it does, keep working.',
  place: { city: 'Osaka', vibe: 'commerce, trade, connected' },

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'This is the sequel to 1 Thessalonians, likely written within months. The same authors, the same recipients, many of the same concerns—but one new problem dominates: someone has told the Thessalonians that the day of the Lord has already come.',
        'The result is panic and idleness. If the day has come, why work? If judgment is here, why plan? Paul writes to correct the error and call the church back to steady, faithful living.',
        'The letter is shorter and sharper than 1 Thessalonians. Less warmth, more correction. The pastoral father is still present, but now he is also the teacher who must set things straight.',
      ],
      figures: [
        {
          art: `  1 THESSALONIANS
    │
    │  Paul teaches about the return of Christ
    ▼
  SOME TIME PASSES
    │
    │  a report reaches Paul
    ▼
  THE PROBLEM
    │
    ├── someone claims the day of the Lord has come
    ├── possibly by "spirit, word, or letter" (2:2)
    └── some have stopped working
    │
    ▼
  THIS LETTER
    │
    ├── encouragement in persecution (ch. 1)
    ├── correction about the day (ch. 2)
    └── command to work (ch. 3)`,
          caption: 'The letter addresses a specific crisis.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'The Thessalonians are still under persecution, and now they are also confused. Someone—perhaps a false teacher, perhaps a misread letter, perhaps a prophetic claim—has convinced them that the day of the Lord has already arrived.',
        'This is not merely a theological error; it has practical consequences. Some believers have stopped working. They are living in disorder, meddling in others\' affairs, depending on the generosity of the church. Paul addresses both the doctrine and the behavior.',
        'The letter was likely written from Corinth, shortly after 1 Thessalonians, around AD 51–52. The situation has evolved but the church is the same.',
      ],
      entries: [
        {
          term: 'The false claim',
          role: 'the trigger',
          detail:
            'Paul warns them not to be "quickly shaken or alarmed" by any spirit, word, or letter seeming to be from him, claiming that the day of the Lord has come (2:2). The source of the error is unclear, but Paul takes it seriously.',
        },
        {
          term: 'Persecution',
          role: 'still ongoing',
          detail:
            'The letter opens with thanksgiving for their endurance under affliction (1:4). Persecution has not stopped. If anything, it may have made them more susceptible to the idea that final judgment was underway.',
        },
        {
          term: 'The idle',
          role: 'a growing problem',
          detail:
            '1 Thessalonians mentioned the need to work quietly (4:11). 2 Thessalonians makes it a major issue (3:6–15). Some have stopped working entirely, and Paul commands the church to discipline them.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'Three chapters, three concerns. The letter is compact and focused.',
      ],
      figures: [
        {
          art: `   CHAPTER 1: ENCOURAGEMENT
   ─────────────────────────────
   1:1–4    Greeting and thanksgiving
   1:5–10   God's righteous judgment
   1:11–12  Prayer for the church

   CHAPTER 2: CORRECTION
   ─────────────────────────────
   2:1–2    Do not be deceived
   2:3–12   The man of lawlessness
   2:13–17  Stand firm in the traditions

   CHAPTER 3: COMMAND
   ─────────────────────────────
   3:1–5    Request for prayer
   3:6–15   Warning against idleness
   3:16–18  Blessing and signature`,
          caption: 'Three chapters, three movements.',
        },
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'The day of the Lord',
          definition:
            'The future event when Christ returns in judgment and glory.',
          appears:
            'Chapter 2 insists it has not yet come. Specific events must precede it: the rebellion, the revealing of the man of lawlessness, his destruction by Christ.',
          matters:
            'Getting this wrong has consequences. If the day has come, normal life is pointless. Paul corrects the error to restore sane living.',
        },
        {
          name: 'The man of lawlessness',
          definition:
            'A future figure who will oppose God and exalt himself before being destroyed by Christ.',
          appears:
            '2:3–12 describes him in detail: he takes his seat in God\'s temple, proclaims himself to be God, deceives those who refused to love the truth, and is destroyed by the breath of Christ\'s mouth.',
          matters:
            'His revealing has not yet happened. Therefore the day has not come. Paul gives them a marker to watch for.',
        },
        {
          name: 'The restrainer',
          definition:
            'Something or someone currently holding back the man of lawlessness.',
          appears:
            '2:6–7 refers to what is restraining him and "he who now restrains." Paul says they know what he means; we do not. Interpretations vary: the Roman Empire, the preaching of the gospel, an angelic power.',
          matters:
            'The restrainer will be removed. Then the lawless one will be revealed. Then Christ will destroy him. The sequence matters more than identifying the restrainer.',
        },
        {
          name: 'Standing firm',
          definition:
            'Holding to the traditions received from Paul.',
          appears:
            '2:15 commands them to stand firm and hold to the traditions taught by Paul, whether by word or by letter. Truth is received and kept.',
          matters:
            'They were shaken by a false teaching. The remedy is to hold what they were taught. Stability comes from received truth.',
        },
        {
          name: 'Work',
          definition:
            'The ordinary obligation to labor and not burden others.',
          appears:
            'Chapter 3 is direct: if anyone is not willing to work, let him not eat. Paul worked night and day among them as an example. The idle are to be warned, then avoided.',
          matters:
            'Eschatological excitement does not exempt anyone from daily responsibility. Waiting for Jesus means working, not quitting.',
        },
        {
          name: 'Discipline',
          definition:
            'The church\'s responsibility to address persistent disobedience.',
          appears:
            '3:6, 14–15: keep away from those who walk in idleness, do not associate with them, warn them as brothers. Discipline is not rejection; it is serious love.',
          matters:
            'The church is not merely a gathering; it is a community with standards. Disorder harms everyone.',
        },
      ],
    },

    // ------------------------------------------------------------ man of lawlessness
    {
      id: 'lawlessness',
      heading: 'The Man of Lawlessness',
      body: [
        'The central teaching of 2 Thessalonians is the description of a figure who must appear before the day of the Lord. Paul calls him "the man of lawlessness" and "the son of destruction." He is not Satan, but he acts with satanic power.',
      ],
      figures: [
        {
          art: `   THE SEQUENCE
   ─────────────────────────────
   1. The restrainer is removed
         │
         ▼
   2. THE REBELLION (apostasia)
         │
         ▼
   3. THE MAN OF LAWLESSNESS IS REVEALED
         │
         ├── opposes every so-called god
         ├── exalts himself above all
         ├── takes his seat in God's temple
         └── proclaims himself to be God
         │
         ▼
   4. THE LORD JESUS APPEARS
         │
         └── kills him with the breath of his mouth
         │
         ▼
   5. THE DAY OF THE LORD`,
          caption: '2:3–8: the events that must precede the day.',
        },
      ],
      entries: [
        {
          term: 'The rebellion',
          role: 'the first sign',
          detail:
            'The Greek word is apostasia, a falling away or departure. Before the lawless one is revealed, there will be a widespread turning from the faith. The day will not come until this happens.',
        },
        {
          term: 'The temple',
          role: 'his seat',
          detail:
            'He takes his seat in the temple of God. Whether this refers to the Jerusalem temple, the church, or a future structure is debated. The point is the claim: he puts himself in God\'s place.',
        },
        {
          term: 'Satanic power',
          role: 'the source of his signs',
          detail:
            'His coming is "by the activity of Satan with all power and false signs and wonders" (2:9). He deceives those who refused to love the truth. The deception is real but not ultimate.',
        },
        {
          term: 'His destruction',
          role: 'the end',
          detail:
            'The Lord Jesus will kill him "with the breath of his mouth and bring to nothing by the appearance of his coming" (2:8). The lawless one\'s power is impressive but temporary. Christ ends him effortlessly.',
        },
      ],
      closing: [
        'Paul gives this teaching not to satisfy curiosity but to correct an error. The Thessalonians think the day has come. Paul shows them it cannot have: the man of lawlessness has not been revealed. Watch for the sequence, not for a date.',
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where 2 Thessalonians Sits',
      entries: [
        {
          term: '1 Thessalonians',
          detail:
            'The first letter. Same church, same authors, same concern with the return of Christ, but different emphasis. 1 Thessalonians comforts; 2 Thessalonians corrects.',
        },
        {
          term: 'Daniel 7–12',
          detail:
            'The language of rebellion, the abomination, and the destruction of an evil ruler by divine intervention echoes Daniel\'s visions. Paul stands in an apocalyptic tradition.',
        },
        {
          term: 'Jesus\' Olivet Discourse',
          detail:
            'Matthew 24, Mark 13, Luke 21: Jesus speaks of false christs, tribulation, and His return. Paul\'s teaching aligns with what Jesus taught.',
        },
        {
          term: 'Revelation',
          detail:
            'The beast, the false prophet, the deception of the nations, the destruction by Christ at His coming. Revelation expands what Paul sketches here.',
        },
      ],
    },

    // ----------------------------------------------------------------- idle
    {
      id: 'work',
      heading: 'The Problem of Idleness',
      body: [
        'Chapter 3 addresses a practical crisis. Some in the church have stopped working. They are living off others, meddling in what is not their business, and disrupting community life.',
        'Paul is blunt. He reminds them of his own example: he worked night and day so as not to burden anyone. He gave them a rule: if anyone is not willing to work, let him not eat. He commands the church to distance themselves from the idle.',
      ],
      figures: [
        {
          art: `   PAUL'S EXAMPLE
   ─────────────────────────────
   "We worked night and day,
    that we might not be a burden to any of you."
    (3:8)

   THE COMMAND
   ─────────────────────────────
   "If anyone is not willing to work,
    let him not eat."
    (3:10)

   THE DISCIPLINE
   ─────────────────────────────
   "Keep away from any brother
    who is walking in idleness."
    (3:6)

   "Do not regard him as an enemy,
    but warn him as a brother."
    (3:15)`,
          caption: 'Example, command, discipline.',
        },
      ],
      closing: [
        'Eschatology is not an excuse for irresponsibility. The return of Christ is certain, but the date is unknown. Until He comes, we work. We eat our own bread. We do not burden the church. This is not worldliness; it is faithfulness.',
      ],
    },

    // ----------------------------------------------------------------- closing
    {
      id: 'why',
      heading: 'Why 2 Thessalonians Endures',
      body: [
        'This short letter is a correction. The Thessalonians were shaken by a false teaching and drawn into unhealthy behavior. Paul writes to steady them: the day has not come, these things must happen first, meanwhile keep working.',
        'The letter endures because eschatological confusion endures. Every generation has its false claims about the end. Paul\'s answer remains: hold the traditions, watch for the signs, do not be quickly shaken, and work quietly with your hands until the Lord comes.',
        'The church that waits is not a church that quits. It is a church that endures persecution, holds to truth, disciplines disorder, and lives ordinary faithfulness in light of extraordinary hope.',
      ],
    },
  ],
};
