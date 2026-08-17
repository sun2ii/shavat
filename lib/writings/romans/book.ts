import { BookOrientation } from '@/lib/types';

export const ROMANS: BookOrientation = {
  slug: 'romans',
  title: 'Romans',
  subtitle: 'The Gospel Systematized',
  scripture: 'Romans 1–16',
  summary:
    'Paul\`s most complete and systematic presentation of the gospel, written to a church he did not found, explaining justification by faith, life in the Spirit, and God\`s faithfulness to Israel.',
  place: { city: 'Tokyo', vibe: 'power, capital, influence' },

  sections: [
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Romans is unique among Paul\`s letters. He is not correcting errors or defending himself. He is writing to a church he has never visited, introducing himself and his gospel before he arrives. The result is his most careful, comprehensive theological statement.',
        'The letter unfolds in a logical progression: all humanity stands guilty before God (chapters 1–3); justification comes by faith, as shown in Abraham (chapters 3–4); those justified receive new life through union with Christ (chapters 5–8); God\`s promises to Israel have not failed (chapters 9–11); the redeemed community lives differently (chapters 12–15).',
        'Paul writes from Corinth, about to sail for Jerusalem with the collection from the Gentile churches. He hopes to visit Rome on his way to Spain. The letter prepares the Roman church for his coming and presents the gospel he will bring.',
      ],
      figures: [
        {
          art: `  THE ARGUMENT OF ROMANS
    │
    ├── THE PROBLEM (1:18–3:20)
    │     │
    │     ├── Gentiles are without excuse (1:18–32)
    │     ├── Jews are also guilty (2:1–29)
    │     └── All have sinned (3:9–20)
    │
    ├── THE SOLUTION (3:21–5:21)
    │     │
    │     ├── Justification by faith (3:21–31)
    │     ├── Abraham as example (4:1–25)
    │     └── Peace with God through Christ (5:1–21)
    │
    ├── THE LIFE (6:1–8:39)
    │     │
    │     ├── Dead to sin, alive to God (6:1–23)
    │     ├── Free from the law (7:1–25)
    │     └── Life in the Spirit (8:1–39)
    │
    ├── ISRAEL (9:1–11:36)
    │     │
    │     ├── God\`s sovereign choice (9:1–33)
    │     ├── Israel\`s failure is not final (10:1–21)
    │     └── All Israel will be saved (11:1–36)
    │
    └── THE COMMUNITY (12:1–15:13)
          │
          ├── Living sacrifice (12:1–21)
          ├── Submission to authorities (13:1–14)
          └── The strong and the weak (14:1–15:13)`,
          caption: 'The logical flow of the letter.',
        },
      ],
    },

    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'The church in Rome was not founded by Paul or any other known apostle. It likely arose from Jews who were in Jerusalem at Pentecost and returned home as believers. The church may have been predominantly Jewish initially, but when Emperor Claudius expelled Jews from Rome in AD 49, the Gentile believers remained.',
        'By AD 57, when Paul writes, Claudius has died and Jews have returned. The church is now mixed, with tensions between Jewish and Gentile Christians. Paul\`s discussion of the strong and weak (chapters 14–15) and his extended treatment of Israel (chapters 9–11) address this specific situation.',
        'Paul has finished his work in the eastern Mediterranean. He wants to push west to Spain, using Rome as his base. But first he must deliver the collection to Jerusalem, a journey he knows is dangerous. He asks the Romans to pray that he will be delivered from unbelievers in Judea and that the collection will be acceptable.',
      ],
      entries: [
        {
          term: 'The expulsion under Claudius',
          role: 'the background',
          detail:
            'In AD 49, Emperor Claudius expelled Jews from Rome, according to the historian Suetonius, because of disturbances "at the instigation of Chrestus" (likely Christ). This forced out Jewish Christians like Aquila and Priscilla. The church became Gentile-majority during their absence.',
        },
        {
          term: 'The return',
          role: 'the tension',
          detail:
            'When Jews returned after Claudius died in AD 54, Jewish Christians came back to a church that had changed. Gentiles had been leading; Jewish practices had lapsed. The letter addresses how these groups should relate.',
        },
        {
          term: 'The collection',
          role: 'Paul\`s mission',
          detail:
            'Paul has been gathering a gift from Gentile churches for the poor in Jerusalem. Romans 15 describes this as a debt: Gentiles share in Jewish spiritual blessings, so they owe material support. Paul is about to deliver it.',
        },
        {
          term: 'The Spanish mission',
          role: 'Paul\`s goal',
          detail:
            'Paul wants to preach where Christ has not been named. He considers his eastern work complete and plans to push to Spain, the western edge of the empire. Rome would be his base for this mission.',
        },
      ],
    },

    {
      id: 'characters',
      heading: 'The People',
      body: [
        'Unlike Paul\`s other letters, Romans is not addressed to people he knows well. But chapter 16 greets many individuals, suggesting Paul has connections in Rome despite never visiting.',
      ],
      entries: [
        {
          term: 'Paul',
          role: 'apostle to the Gentiles',
          detail:
            'The author, introducing himself to a church he did not found. He emphasizes his calling to preach to Gentiles and his desire to visit Rome and go on to Spain.',
        },
        {
          term: 'Phoebe',
          role: 'the letter carrier',
          detail:
            'A deacon of the church at Cenchreae (Corinth\`s eastern port), commended in 16:1–2. She likely carried this letter to Rome. Paul asks them to receive her and help her with whatever she needs.',
        },
        {
          term: 'Priscilla and Aquila',
          role: 'Paul\`s co-workers',
          detail:
            'The couple who hosted Paul in Corinth and worked with him in Ephesus. They have returned to Rome, where a church meets in their house. Paul says they risked their necks for him.',
        },
        {
          term: 'Andronicus and Junia',
          role: 'fellow prisoners',
          detail:
            'Jewish believers who were Christians before Paul, prominent among the apostles. Paul was imprisoned with them at some point. Junia is a woman\`s name; this is possibly a husband-wife pair in apostolic ministry.',
        },
        {
          term: 'Tertius',
          role: 'the scribe',
          detail:
            'The secretary who physically wrote the letter as Paul dictated. In 16:22 he inserts his own greeting: "I Tertius, who wrote this letter, greet you in the Lord."',
        },
        {
          term: 'Abraham',
          role: 'the example',
          detail:
            'The patriarch, central to Paul\`s argument in chapter 4. Abraham was justified by faith before he was circumcised, making him the father of all who believe, Jew and Gentile alike.',
        },
        {
          term: 'Adam',
          role: 'the contrast',
          detail:
            'In chapter 5, Adam represents humanity under sin and death. Christ is the second Adam, whose obedience brings righteousness and life. Through Adam came condemnation; through Christ comes justification.',
        },
      ],
    },

    {
      id: 'places',
      heading: 'The Geography',
      body: [
        'Romans mentions several locations that situate Paul\`s ministry and plans.',
      ],
      figures: [
        {
          art: `                    PAUL\`S PLAN
                         │
           ┌─────────────┼─────────────┐
           │             │             │
           ▼             ▼             ▼
       CORINTH       JERUSALEM       ROME
    (writing from)  (delivering    (then visit)
                    collection)        │
                                       ▼
                                    SPAIN
                                 (final goal)


                   PAUL\`S PAST WORK
         ───────────────────────────────
         "from Jerusalem and all the way
          around to Illyricum I have
          fulfilled the ministry of the
          gospel of Christ"

                 JERUSALEM
                     │
           ┌─────────┴──────────┐
           │                    │
         ASIA               MACEDONIA
      (Ephesus)    (Philippi, Thessalonica)
           │                    │
           └────────┬───────────┘
                    │
               ACHAIA (Corinth)
                    │
               ILLYRICUM
            (furthest west so far)`,
          caption: 'Paul\`s completed work and future plans.',
        },
      ],
      entries: [
        {
          term: 'Rome',
          detail:
            'The capital of the empire, which Paul has long wanted to visit. He has been hindered until now by his eastern work. He plans to stop in Rome on his way to Spain.',
        },
        {
          term: 'Corinth',
          detail:
            'Where Paul is writing from, probably at the home of Gaius (16:23). Cenchreae, Corinth\`s eastern port, is where Phoebe is a deacon.',
        },
        {
          term: 'Jerusalem',
          detail:
            'Paul\`s immediate destination, to deliver the collection from the Gentile churches. He asks prayer because he fears hostility from unbelievers in Judea.',
        },
        {
          term: 'Spain',
          detail:
            'Paul\`s ultimate goal, the western edge of the Roman Empire. He wants to preach where Christ has not been named. Whether he ever reached Spain is unknown.',
        },
        {
          term: 'Illyricum',
          detail:
            'The region along the eastern Adriatic coast (modern Albania/Croatia), the westernmost point of Paul\`s previous work. He mentions it to show the scope of his completed mission.',
        },
      ],
    },

    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'Romans is carefully organized, moving from universal guilt to cosmic redemption to practical living.',
      ],
      figures: [
        {
          art: `   INTRODUCTION (1:1–17)
   ──────────────────────
   Greeting, thanksgiving, theme: the gospel

   THE GOSPEL EXPLAINED (1:18–11:36)
   ──────────────────────
   1:18–3:20   The wrath of God: all are guilty
   3:21–4:25   Justification by faith
   5:1–21      Peace through Christ, Adam and Christ
   6:1–23      Dead to sin, alive to God
   7:1–25      The law and the flesh
   8:1–39      Life in the Spirit, no condemnation
   9:1–11:36   Israel: God\`s faithfulness

   THE GOSPEL APPLIED (12:1–15:13)
   ──────────────────────
   12:1–21     Living sacrifice, body of Christ
   13:1–14     Authorities, love, the day is near
   14:1–15:13  The strong and the weak

   CONCLUSION (15:14–16:27)
   ──────────────────────
   Paul\`s plans, greetings, doxology`,
          caption: 'Doctrine first, then application.',
        },
      ],
    },

    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Justification by Faith',
          definition:
            'Being declared righteous before God through faith in Christ, apart from works of the law.',
          appears:
            '"For we hold that one is justified by faith apart from works of the law" (3:28); "Abraham believed God, and it was counted to him as righteousness" (4:3).',
          matters:
            'This is the heart of the gospel Paul preaches. Jew and Gentile are both guilty; Jew and Gentile are both justified the same way: by faith.',
        },
        {
          name: 'The Righteousness of God',
          definition:
            'God\`s faithfulness to his covenant and his act of making sinners righteous.',
          appears:
            '"For in it the righteousness of God is revealed from faith for faith" (1:17); "the righteousness of God through faith in Jesus Christ for all who believe" (3:22).',
          matters:
            'God is both just and the justifier of the one who has faith. The cross demonstrates that God did not simply overlook sin but dealt with it.',
        },
        {
          name: 'Union with Christ',
          definition:
            'Believers\` participation in Christ\`s death and resurrection.',
          appears:
            '"We were buried with him by baptism into death, in order that, just as Christ was raised from the dead, we too might walk in newness of life" (6:4).',
          matters:
            'This answers the question of chapter 6: shall we sin that grace may abound? No, because we have died with Christ. Sin\`s dominion is broken.',
        },
        {
          name: 'Life in the Spirit',
          definition:
            'The new existence empowered by the Holy Spirit, fulfilling what the law could not.',
          appears:
            'Chapter 8: "The law of the Spirit of life has set you free from the law of sin and death" (8:2); "You are not in the flesh but in the Spirit, if in fact the Spirit of God dwells in you" (8:9).',
          matters:
            'The Spirit is the power for the new life. Those led by the Spirit are sons of God, heirs with Christ, awaiting the redemption of their bodies.',
        },
        {
          name: 'God\`s Faithfulness to Israel',
          definition:
            'God\`s promises to Israel have not failed, even though many Jews have not believed.',
          appears:
            'Chapters 9–11. "Has God rejected his people? By no means!" (11:1). "All Israel will be saved" (11:26).',
          matters:
            'Gentile believers should not boast over unbelieving Jews. They have been grafted into Israel\`s olive tree. God\`s gifts and calling are irrevocable.',
        },
        {
          name: 'Love as Fulfillment',
          definition:
            'Love for neighbor fulfills the law\`s intent.',
          appears:
            '"Love is the fulfilling of the law" (13:10); "The one who loves another has fulfilled the law" (13:8).',
          matters:
            'After eleven chapters of doctrine, Paul summarizes Christian ethics: love. The commands are summed up in loving your neighbor as yourself.',
        },
      ],
    },

    {
      id: 'chapter8',
      heading: 'Romans 8: The Summit',
      body: [
        'Romans 8 is often considered the high point of Paul\`s theology. It begins with "no condemnation" and ends with "nothing can separate us from the love of God." Between these bookends is the most sustained treatment of life in the Spirit in the New Testament.',
      ],
      figures: [
        {
          art: `   ROMANS 8 STRUCTURE
   ──────────────────────
   8:1–4     No condemnation
   8:5–11    Flesh vs. Spirit
   8:12–17   Sonship and inheritance
   8:18–25   Future glory, creation groaning
   8:26–27   The Spirit intercedes
   8:28–30   Called, justified, glorified
   8:31–39   Nothing can separate us

   THE CLIMAX
   ──────────────────────
   "If God is for us, who can be against us?"

   "Who shall separate us from the love of Christ?
    Shall tribulation, or distress, or persecution,
    or famine, or nakedness, or danger, or sword?"

   "No, in all these things we are more than
    conquerors through him who loved us."`,
          caption: 'The architecture of assurance.',
        },
      ],
    },

    {
      id: 'connections',
      heading: 'Where Romans Sits in Scripture',
      entries: [
        {
          term: 'Galatians',
          detail:
            'Romans covers much of the same ground but at greater length and in calmer tone. Galatians was urgent polemic; Romans is measured exposition. Both argue justification by faith using Abraham.',
        },
        {
          term: 'The Corinthian letters',
          detail:
            'Written just before Romans, from Corinth itself. Themes of Spirit, body of Christ, and love appear in both. The collection Paul mentions is the same one he urged on the Corinthians.',
        },
        {
          term: 'Genesis',
          detail:
            'Paul draws heavily on the Abraham narrative in chapter 4 and the Adam narrative in chapter 5. Abraham believed before circumcision; Adam\`s sin brought death to all.',
        },
        {
          term: 'Isaiah',
          detail:
            'Quoted throughout, especially in chapters 9–11. The remnant, the stumbling stone, the root of Jesse, the deliverer from Zion.',
        },
        {
          term: 'Habakkuk',
          detail:
            '"The righteous shall live by faith" (Habakkuk 2:4) is quoted in 1:17 as the theme verse of the letter.',
        },
      ],
    },

    {
      id: 'why',
      heading: 'Why Romans Matters',
      body: [
        'Romans has shaped Christian theology more than any other book of the Bible. Augustine\`s conversion came through reading Romans 13. Luther\`s breakthrough came through studying Romans 1. Wesley\`s heart was "strangely warmed" while hearing Luther\`s preface to Romans. Barth\`s commentary on Romans launched a theological revolution.',
        'The letter provides the most complete exposition of how sinful humanity is reconciled to a holy God. It does not shrink from the hard questions: Why do the righteous suffer? Has God failed Israel? Should believers submit to pagan rulers? How should the strong and weak live together? Paul addresses them all.',
        'The sweep is breathtaking: from the wrath of God against all unrighteousness to the glory that awaits those who are in Christ. From "all have sinned" to "nothing can separate us." From Adam\`s disobedience to Christ\`s obedience. From condemnation to no condemnation.',
        'And yet this doctrinal treatise ends in practical instruction. Present your bodies as living sacrifices. Be transformed by the renewing of your mind. Love one another. Do not be overcome by evil, but overcome evil with good. The gospel is not merely to be believed but to be lived.',
      ],
    },
  ],
};
