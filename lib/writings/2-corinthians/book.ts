import { BookOrientation } from '@/lib/types';

export const SECOND_CORINTHIANS: BookOrientation = {
  slug: '2-corinthians',
  title: '2 Corinthians',
  subtitle: 'Power in Weakness',
  scripture: '2 Corinthians 1–13',
  summary:
    'Paul\`s most personal letter, defending his apostleship against rivals while revealing the paradox that God\`s power is made perfect in human weakness.',

  sections: [
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        '2 Corinthians is Paul\`s heart laid open. Where 1 Corinthians was corrective and orderly, this letter is emotional, defensive, and at times anguished. Paul is fighting for his relationship with the Corinthians and for the gospel itself against rivals who have infiltrated the church.',
        'The situation has deteriorated since the first letter. Paul made a "painful visit" to Corinth that went badly. He wrote a "severe letter" (now lost) that caused them grief. He has been waiting anxiously for news, and when Titus finally arrives with a good report, Paul pours out relief, gratitude, and continued concern.',
        'The letter is unusual in structure. Chapters 1–7 are conciliatory, celebrating reconciliation. Chapters 8–9 urge completion of the collection for Jerusalem. Then chapters 10–13 shift dramatically to sharp self-defense against "super-apostles" who are undermining Paul. Some scholars think this is a separate letter; others see it as Paul addressing a remaining faction.',
      ],
      figures: [
        {
          art: `  THE SEQUENCE OF EVENTS
    │
    ├── 1 CORINTHIANS .............. written from Ephesus
    │
    ├── PAINFUL VISIT .............. went badly, someone opposed Paul
    │
    ├── SEVERE LETTER .............. written "out of much affliction"
    │     │                         (now lost)
    │     └── carried by Titus
    │
    ├── PAUL WAITS IN ANXIETY ...... couldn\`t find Titus in Troas
    │     │                         went on to Macedonia
    │     │
    │     └── "our bodies had no rest... fighting without, fear within"
    │
    ├── TITUS ARRIVES .............. brings good news
    │     │
    │     └── the Corinthians repented, longed for Paul
    │
    └── 2 CORINTHIANS .............. this letter, written from Macedonia`,
          caption: 'What happened between the letters.',
        },
      ],
    },

    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'After writing 1 Corinthians, Paul\`s relationship with the church deteriorated. Rivals arrived, apparently Jewish Christians with impressive credentials, whom Paul sarcastically calls "super-apostles." They attacked Paul\`s legitimacy: his speech was unimpressive, his letters were weighty but his presence was weak, he was not a true apostle.',
        'Paul made a quick visit to Corinth that went badly. Someone opposed him publicly, and the church did not defend him. He left hurt and angry. Rather than return immediately, he wrote a "severe letter" (not 1 Corinthians, but a lost letter) and sent Titus to assess the situation.',
        'This letter is written after Titus returns with mostly good news. The church has repented and disciplined the offender. But some opposition remains. Chapters 10–13 address those who still question Paul\`s authority. The letter oscillates between joy at reconciliation and fierce defense against ongoing attacks.',
      ],
      entries: [
        {
          term: 'The super-apostles',
          role: 'the rivals',
          detail:
            'Paul\`s sarcastic term for opponents who claimed superior credentials. They were apparently Jewish Christians ("Hebrews, Israelites, descendants of Abraham") with letters of recommendation, impressive speech, and claims to visions. Paul calls them "false apostles, deceitful workmen."',
        },
        {
          term: 'The painful visit',
          role: 'the crisis',
          detail:
            'A visit to Corinth that went badly, mentioned in 2:1. Someone opposed Paul, the church failed to support him, and he left wounded. He vowed not to come again "in sorrow."',
        },
        {
          term: 'The severe letter',
          role: 'the intervention',
          detail:
            'A letter written "out of much affliction and anguish of heart and with many tears" (2:4). Not 1 Corinthians, but a now-lost letter demanding the church deal with the situation. It worked; they repented.',
        },
        {
          term: 'The collection',
          role: 'the project',
          detail:
            'A gift being gathered from Gentile churches for the poor in Jerusalem. Paul devotes two chapters (8–9) to encouraging the Corinthians to complete their pledge. Macedonia has given generously despite poverty; Corinth should follow through.',
        },
      ],
    },

    {
      id: 'characters',
      heading: 'The People',
      body: [
        'The letter mentions several individuals, and understanding their roles clarifies the situation.',
      ],
      entries: [
        {
          term: 'Paul',
          role: 'the embattled apostle',
          detail:
            'Writing to defend both his relationship with Corinth and his apostolic authority. He is more vulnerable here than anywhere else, describing his sufferings, his anxiety, his "thorn in the flesh," and his boasting in weakness.',
        },
        {
          term: 'Timothy',
          role: 'co-sender',
          detail:
            'Listed with Paul in the opening. Timothy had been sent to Corinth earlier (1 Cor 4:17). He is now with Paul in Macedonia as this letter is written.',
        },
        {
          term: 'Titus',
          role: 'the envoy',
          detail:
            'Paul\`s trusted co-worker who carried the severe letter to Corinth and brought back the good news of their repentance. Paul\`s relief at finding Titus in Macedonia is palpable: "God, who comforts the downcast, comforted us by the coming of Titus."',
        },
        {
          term: 'The offender',
          role: 'the one who opposed Paul',
          detail:
            'Someone who opposed Paul during the painful visit. The church has now disciplined him, and Paul urges them to forgive and restore him, "so that he may not be overwhelmed by excessive sorrow."',
        },
        {
          term: 'The super-apostles',
          role: 'the rivals',
          detail:
            'Unnamed opponents with impressive credentials who have infiltrated Corinth. They preach "another Jesus" and a "different gospel." They commend themselves, boast in appearances, and denigrate Paul. He will match their boasting, foolishly, only to show that his sufferings outweigh their credentials.',
        },
      ],
    },

    {
      id: 'places',
      heading: 'The Geography',
      body: [
        'Paul traces his movements in this letter, revealing his anxiety and relief.',
      ],
      figures: [
        {
          art: `                    PAUL\`S MOVEMENTS
                           │
                           ▼
                       EPHESUS
                    (wrote 1 Cor)
                           │
                           ▼
                       TROAS
                 "a door was opened"
                 but no rest, no Titus
                           │
                           ▼
                      MACEDONIA
                 finally meets Titus
                 writes 2 Corinthians
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
       CORINTH                       JERUSALEM
    (where Paul is                (destination of
     heading next)                 the collection)`,
          caption: 'Paul\`s path from Ephesus to Corinth via Macedonia.',
        },
      ],
      entries: [
        {
          term: 'Troas',
          detail:
            'A port city where Paul expected to meet Titus. Though there was opportunity for ministry, Paul "had no rest in my spirit" because Titus wasn\`t there. He moved on to Macedonia.',
        },
        {
          term: 'Macedonia',
          detail:
            'The northern province (Philippi, Thessalonica, Berea) where Titus finally reached Paul with good news. Paul writes this letter from Macedonia. He praises the Macedonians\` generosity to shame Corinth into completing their collection.',
        },
        {
          term: 'Achaia',
          detail:
            'The province containing Corinth. Paul mentions that Achaia has been ready since last year to contribute to the collection. He does not want them to be embarrassed if Macedonians come with him and find them unprepared.',
        },
        {
          term: 'Asia',
          detail:
            'The province of Ephesus, where Paul suffered an affliction so severe he despaired of life. He does not specify what happened, but it taught him to rely on God who raises the dead.',
        },
      ],
    },

    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The letter has three distinct sections, each with its own tone.',
      ],
      figures: [
        {
          art: `   PART ONE: RECONCILIATION (1–7)
   ──────────────────────────────
   1:1–11     Comfort in affliction
   1:12–2:13  Explaining his travel plans
   2:14–4:6   The ministry of the new covenant
   4:7–5:10   Treasure in jars of clay
   5:11–6:13  The ministry of reconciliation
   6:14–7:1   Do not be unequally yoked
   7:2–16     Joy at Titus\`s report

   PART TWO: THE COLLECTION (8–9)
   ──────────────────────────────
   8:1–15     Macedonia\`s example, Christ\`s poverty
   8:16–9:5   Commending the delegation
   9:6–15     Cheerful giving, thanksgiving

   PART THREE: APOSTOLIC DEFENSE (10–13)
   ──────────────────────────────
   10:1–18    Answering accusations
   11:1–15    Warning against false apostles
   11:16–33   The fool\`s boast: Paul\`s sufferings
   12:1–10    Visions and the thorn
   12:11–21   Concern for the upcoming visit
   13:1–14    Final warnings and greetings`,
          caption: 'Three sections: reconciliation, collection, defense.',
        },
      ],
    },

    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Power in Weakness',
          definition:
            'God\`s strength is displayed through human limitation, not despite it.',
          appears:
            '"My grace is sufficient for you, for my power is made perfect in weakness" (12:9). The treasure is in jars of clay "to show that the surpassing power belongs to God" (4:7).',
          matters:
            'This inverts the super-apostles\` credentials. They boast in strength; Paul boasts in weakness. The cross pattern continues: life through death, power through weakness.',
        },
        {
          name: 'The Ministry of Reconciliation',
          definition:
            'God reconciling the world to himself through Christ and entrusting that message to his people.',
          appears:
            '"God was reconciling the world to himself in Christ... and entrusting to us the message of reconciliation. Therefore, we are ambassadors for Christ" (5:19–20).',
          matters:
            'This defines what Paul is doing and why it matters. The stakes are cosmic: eternal reconciliation between God and humanity.',
        },
        {
          name: 'The New Covenant',
          definition:
            'The ministry of the Spirit that gives life, surpassing the ministry of the letter that kills.',
          appears:
            'Chapter 3 contrasts Moses\`s veiled glory with the unveiled, surpassing glory of Christ. The old covenant was glorious; the new covenant is more glorious.',
          matters:
            'Paul\`s ministry is legitimate because it is the ministry of the new covenant, not dependent on letters of recommendation but on transformed lives.',
        },
        {
          name: 'Comfort in Affliction',
          definition:
            'Suffering produces comfort that can be shared with others who suffer.',
          appears:
            '"Blessed be the God of all comfort, who comforts us in all our affliction, so that we may be able to comfort those who are in any affliction" (1:3–4).',
          matters:
            'Paul\`s sufferings are not meaningless. They qualify him to comfort others and demonstrate the pattern of Christ\`s death and resurrection.',
        },
        {
          name: 'Generous Giving',
          definition:
            'Giving that reflects Christ\`s self-giving and creates equality among believers.',
          appears:
            '"For you know the grace of our Lord Jesus Christ, that though he was rich, yet for your sake he became poor, so that you by his poverty might become rich" (8:9).',
          matters:
            'The collection for Jerusalem is not mere charity but an expression of the gospel: abundance flows to need, modeling Christ\`s own poverty for our enrichment.',
        },
      ],
    },

    {
      id: 'thorn',
      heading: 'The Thorn in the Flesh',
      body: [
        'One of the most intriguing passages in Paul\`s letters is his mention of a "thorn in the flesh" in 12:7–10. Paul never identifies it, and speculation has ranged widely: a physical ailment (poor eyesight, epilepsy, malaria), a spiritual struggle, persecution, or the opposition itself.',
      ],
      figures: [
        {
          art: `   WHAT WE KNOW
   ──────────────────────────────
   • Given to keep Paul from being conceited
   • Called "a messenger of Satan"
   • Paul asked three times for its removal
   • God refused: "My grace is sufficient"
   • Paul learned to boast in weakness

   WHAT WE DON\`T KNOW
   ──────────────────────────────
   • The specific nature of the thorn
   • Whether it was physical, relational, or spiritual
   • Whether it was ever removed`,
          caption: 'The thorn remains mysterious by design.',
        },
      ],
      closing: [
        'The thorn\`s ambiguity may be intentional. Every reader can identify their own thorn, whatever weakness or limitation God has not removed despite prayer. The principle transcends the particulars: God\`s power is displayed in what he leaves unhealed.',
      ],
    },

    {
      id: 'connections',
      heading: 'Where 2 Corinthians Sits in Scripture',
      entries: [
        {
          term: '1 Corinthians',
          detail:
            'The predecessor, written when the relationship was strained but not yet broken. 2 Corinthians reveals what happened after: the painful visit, the severe letter, the anxious waiting, and finally the reconciliation.',
        },
        {
          term: 'Romans',
          detail:
            'Written shortly after, from Corinth itself. Paul\`s extended treatment of justification, the Spirit, and the future builds on themes touched here. The collection Paul urges in 2 Corinthians 8–9 is about to be delivered (Romans 15:25–27).',
        },
        {
          term: 'Galatians',
          detail:
            'Similar themes of apostolic authority and the true gospel, but Galatians is angry at the churches while 2 Corinthians is relieved and conciliatory (mostly). Both defend Paul against rivals.',
        },
        {
          term: 'Philippians',
          detail:
            'Another letter written from difficulty, but with joy. The pattern of Christ\`s self-emptying (Philippians 2) echoes the Christ who became poor (2 Corinthians 8:9).',
        },
      ],
    },

    {
      id: 'why',
      heading: 'Why 2 Corinthians Matters',
      body: [
        'This is Paul unguarded. He reveals his anxiety, his relief, his hurt, his love for the Corinthians, and his frustration with rivals. He catalogs his sufferings in a way that reads almost like parody: shipwrecks, beatings, sleepless nights, danger from rivers, robbers, and false brothers. He admits to despair so deep he expected to die.',
        'And yet the theology that emerges from this vulnerability is among the most profound in Scripture. Power in weakness. Treasure in jars of clay. The death of Jesus at work in us so that life can be at work in others. God comforting us so we can comfort others. The ministry of reconciliation given to cracked vessels.',
        'The super-apostles had impressive resumes. Paul has scars. They had visions to boast about. Paul has a thorn he cannot remove. They peddled the word of God for profit. Paul refused support to avoid any appearance of self-interest. The contrast is stark, and Paul insists it is the difference between authentic and counterfeit apostleship.',
        'For anyone in ministry, anyone leading while wounded, anyone wondering if weakness disqualifies them, 2 Corinthians is essential. The answer is not just that weakness does not disqualify. The answer is that weakness is the venue where God\`s power is most clearly displayed.',
      ],
    },
  ],
};
