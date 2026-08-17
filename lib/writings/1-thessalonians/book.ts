import { BookOrientation } from '@/lib/types';

/**
 * The orientation for 1 Thessalonians: Paul's earliest surviving letter,
 * written to a young church under pressure, waiting for Jesus to return.
 */
export const FIRST_THESSALONIANS: BookOrientation = {
  slug: '1-thessalonians',
  title: '1 Thessalonians',
  subtitle: 'The Church That Waits',
  scripture: '1 Thessalonians 1–5',
  summary:
    'Paul writes to a young church born in persecution, commending their faith and clarifying their hope.',
  place: { city: 'Osaka', vibe: 'commerce, trade, connected' },

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'This is probably Paul\'s earliest surviving letter, written around AD 50–51 from Corinth. The church in Thessalonica is young—months old, not years. Paul had to leave suddenly under persecution (Acts 17:1–10), and he writes back to a congregation he barely had time to teach.',
        'The letter has two movements. The first three chapters look backward: thanksgiving for what God has done in them, defense of Paul\'s conduct among them, longing to see them again. The final two chapters look forward: how to live while waiting, and what happens to believers who die before Jesus returns.',
        'Read 1 Thessalonians as a letter to new converts who are suffering and confused. They have the gospel but not yet the full picture. Paul fills in what he didn\'t have time to say.',
      ],
      figures: [
        {
          art: `  PAUL IN THESSALONICA
    │
    │  persecution drives him out (Acts 17)
    ▼
  BEREA → ATHENS → CORINTH
    │
    │  Timothy sent back to check on them
    ▼
  TIMOTHY'S REPORT
    │
    │  they are standing firm
    ▼
  THIS LETTER
    │
    ├── thanksgiving (ch. 1–3)
    └── instruction (ch. 4–5)`,
          caption: 'The letter answers a report from Timothy.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Thessalonica was the capital of Macedonia, a major port city on the Via Egnatia, the main Roman road connecting East and West. It was strategic, prosperous, and thoroughly pagan.',
        'Paul arrived during his second missionary journey (Acts 17:1–9). He reasoned in the synagogue for three Sabbaths, and some Jews believed, along with many God-fearing Greeks and prominent women. But opposition arose quickly. A mob accused Paul of "turning the world upside down" and preaching another king besides Caesar. The brothers sent Paul away by night to Berea.',
        'Paul\'s time in Thessalonica was short—perhaps only a few weeks. He left behind a church composed mostly of Gentile converts who had "turned to God from idols" (1:9). They were young believers under immediate pressure, with minimal teaching, and Paul was worried about them.',
      ],
      entries: [
        {
          term: 'Thessalonica',
          role: 'capital of Macedonia',
          detail:
            'A free city with its own assembly and magistrates (the "politarchs" of Acts 17:6). Strategically located, economically important, and loyal to Rome. The accusation that Paul preached "another king" was politically dangerous in such a city.',
        },
        {
          term: 'The Via Egnatia',
          role: 'the Roman highway',
          detail:
            'The main east-west road through Macedonia, running through Thessalonica. What Rome built for empire, the gospel used for mission. A church planted here could influence traffic in both directions.',
        },
        {
          term: 'Timothy\'s mission',
          role: 'the reason for the letter',
          detail:
            'Unable to return himself, Paul sent Timothy from Athens to strengthen and encourage the Thessalonians (3:1–5). Timothy returned with good news: their faith and love were holding. This letter is Paul\'s response to that report.',
        },
        {
          term: 'The second journey',
          role: 'the larger context',
          detail:
            'Paul is in Corinth when he writes, having traveled through Philippi, Thessalonica, Berea, and Athens. The letter reflects the urgency of a missionary who cannot get back to his people.',
        },
      ],
    },

    // ------------------------------------------------------------- characters
    {
      id: 'characters',
      heading: 'The People',
      entries: [
        {
          term: 'Paul',
          role: 'the absent father',
          detail:
            'He writes with unusual affection. He calls them his glory and joy. He compares himself to a nursing mother, a father with his children. The letter reveals how personally invested Paul was in churches he planted.',
        },
        {
          term: 'Silvanus (Silas)',
          role: 'co-sender',
          detail:
            'Paul\'s traveling companion from Jerusalem (Acts 15:40). He was with Paul in Thessalonica and is named as co-author of the letter. The "we" throughout is genuine—this was a team ministry.',
        },
        {
          term: 'Timothy',
          role: 'the messenger',
          detail:
            'Young, trusted, sent on a difficult errand. He brought back the report that prompted this letter. Paul speaks of him as a fellow worker in the gospel, not merely a courier.',
        },
        {
          term: 'The Thessalonian believers',
          role: 'the recipients',
          detail:
            'Mostly Gentile converts who had turned from idols. They received the word under affliction but with the joy of the Holy Spirit. Their faith was being talked about throughout Macedonia and Achaia.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The letter divides naturally in half. Chapters 1–3 are personal: thanksgiving, remembrance, defense, longing. Chapters 4–5 are practical: sexual ethics, brotherly love, the dead in Christ, the day of the Lord, life in community.',
      ],
      figures: [
        {
          art: `   THANKSGIVING & REMEMBRANCE (1–3)
   ─────────────────────────────────
   1:1–10   Thanksgiving for their faith
   2:1–12   Paul's conduct among them
   2:13–16  Their reception of the word
   2:17–3:5 Paul's longing and Timothy's mission
   3:6–13   Joy at Timothy's report

   INSTRUCTION & EXHORTATION (4–5)
   ─────────────────────────────────
   4:1–12   Living to please God
   4:13–18  The dead in Christ
   5:1–11   The day of the Lord
   5:12–28  Community life and closing`,
          caption: 'Two halves: looking back, then looking forward.',
        },
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'The return of Jesus',
          definition:
            'The certain, expected, imminent coming of the Lord from heaven.',
          appears:
            'Every chapter ends with a reference to Christ\'s return (1:10, 2:19, 3:13, 4:13–18, 5:23). The letter is saturated with expectation.',
          matters:
            'The Thessalonians are waiting. Their dead are being raised. Their suffering is temporary. The horizon shapes everything.',
        },
        {
          name: 'Affliction and endurance',
          definition:
            'Suffering as the normal condition of the faithful church.',
          appears:
            'They received the word in much affliction (1:6). They suffered from their own countrymen (2:14). Paul was concerned the tempter had undermined them (3:5).',
          matters:
            'Opposition is not a sign of failure. The Thessalonians imitate churches that suffered before them. Persecution is expected.',
        },
        {
          name: 'Imitation',
          definition:
            'Becoming a pattern by following a pattern.',
          appears:
            'They became imitators of Paul and of the Lord (1:6). They became an example to all believers in Macedonia and Achaia (1:7). Faith spreads through visible lives.',
          matters:
            'The gospel is seen before it is heard. A young church in a pagan city becomes a model within months.',
        },
        {
          name: 'Holiness',
          definition:
            'God\'s will for His people, particularly in sexual conduct.',
          appears:
            'Chapter 4:1–8 is direct: abstain from sexual immorality, control your body, do not transgress against your brother. God did not call us to impurity.',
          matters:
            'Gentile converts came from a world where sexual ethics were different. Paul does not assume they know. He tells them plainly.',
        },
        {
          name: 'Hope for the dead',
          definition:
            'Believers who die before Christ returns will not be left behind.',
          appears:
            '4:13–18 answers their grief: the dead in Christ will rise first. We will be caught up together with them to meet the Lord in the air.',
          matters:
            'Someone has died since Paul left. The church is grieving and confused. Paul writes to give them hope.',
        },
        {
          name: 'Watchfulness',
          definition:
            'Living alert and sober because the day of the Lord comes like a thief.',
          appears:
            '5:1–11 contrasts children of light and children of darkness. We are not in darkness. We are to stay awake and put on faith, love, and hope.',
          matters:
            'The timing is unknown but the outcome is certain. Watchfulness is not anxiety; it is readiness.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where 1 Thessalonians Sits',
      entries: [
        {
          term: 'Acts 17',
          detail:
            'The founding of the church: Paul in the synagogue, converts from Jews and Greeks, the riot, the accusation of sedition, the midnight escape. This letter is the sequel.',
        },
        {
          term: '2 Thessalonians',
          detail:
            'A follow-up letter, likely written soon after, addressing continued confusion about the day of the Lord and the problem of idleness. The two letters belong together.',
        },
        {
          term: 'Philippians',
          detail:
            'Another letter to a Macedonian church, written later from prison. The same affection, the same joy, the same partnership in the gospel. Paul loved his Macedonian churches.',
        },
        {
          term: 'Daniel and Jesus\' teaching',
          detail:
            'The language of 4:13–18 echoes Daniel 7 (the Son of Man coming on clouds) and Jesus\' Olivet discourse. Paul is not inventing; he is passing on what he received.',
        },
      ],
    },

    // ------------------------------------------------------------ dead in christ
    {
      id: 'dead',
      heading: 'The Dead in Christ',
      body: [
        'The most distinctive passage in 1 Thessalonians is 4:13–18. Someone in the church has died, and the congregation is grieving without hope. They seem to fear that those who die before Jesus returns will miss out on the resurrection.',
        'Paul\'s answer is direct: the dead in Christ will rise first. When the Lord descends, the dead will be raised before the living are transformed. We will all be caught up together. No one is left behind.',
      ],
      figures: [
        {
          art: `   THE LORD DESCENDS
         │
         ├── with a cry of command
         ├── with the voice of an archangel
         └── with the trumpet of God
         │
         ▼
   THE DEAD IN CHRIST RISE FIRST
         │
         ▼
   THEN WE WHO ARE ALIVE
         │
         └── caught up together with them
         │
         ▼
   TO MEET THE LORD IN THE AIR
         │
         ▼
   AND SO WE WILL ALWAYS BE WITH THE LORD`,
          caption: '4:16–17: the sequence of the resurrection.',
        },
      ],
      closing: [
        'Paul does not give a timeline. He gives a sequence and a promise. The point is not the details of the event but the comfort it provides: those who have died in Christ are not lost. They will rise. We will be together. We will be with the Lord. Therefore encourage one another with these words.',
      ],
    },

    // -------------------------------------------------------------- day of lord
    {
      id: 'day',
      heading: 'The Day of the Lord',
      body: [
        'Chapter 5 shifts from the dead in Christ to the timing of Christ\'s return. The Thessalonians apparently wanted to know when. Paul\'s answer: you already know. The day comes like a thief in the night.',
        'But believers are not in darkness. They are children of light. The day will not surprise them like a thief because they are awake, sober, and armored with faith, love, and hope.',
      ],
      figures: [
        {
          art: `   THEY SAY: "Peace and safety"
         │
         ▼
   SUDDEN DESTRUCTION COMES
         │
         └── like labor pains on a pregnant woman
         │
         ▼
   THEY WILL NOT ESCAPE

   ─────────────────────────────

   BUT YOU ARE NOT IN DARKNESS
         │
         └── you are children of light
         │
         ▼
   THE DAY WILL NOT SURPRISE YOU
         │
         └── so stay awake, stay sober
         │
         ▼
   PUT ON THE ARMOR
         │
         ├── breastplate of faith and love
         └── helmet of the hope of salvation`,
          caption: '5:1–8: two kinds of people, one day.',
        },
      ],
      closing: [
        'The day of the Lord is judgment for those in darkness and deliverance for those in light. Paul does not tell them when. He tells them who they are and how to live. That is enough.',
      ],
    },

    // ----------------------------------------------------------------- closing
    {
      id: 'why',
      heading: 'Why 1 Thessalonians Endures',
      body: [
        'This is Paul at his most pastoral. He is not fighting heresy or correcting division. He is encouraging a young church that is doing well under pressure. The letter is warm, affectionate, and urgent.',
        'It is also the New Testament\'s clearest early teaching on the return of Christ. The hope that shapes the letter is the hope that shapes the church: Jesus is coming back. The dead will rise. We will be with Him forever.',
        'Read 1 Thessalonians as a letter to people who are waiting. They are suffering, but they are faithful. They are grieving, but they are not without hope. They are watching, but they are not anxious. The Lord is coming. The night is almost over.',
      ],
    },
  ],
};
