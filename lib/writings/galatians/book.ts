import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Galatians: the ground a reader should be standing on
 * before the first verse. Paul\`s most urgent letter, written to churches
 * being pulled back into slavery after tasting freedom.
 */
export const GALATIANS: BookOrientation = {
  slug: 'galatians',
  title: 'Galatians',
  subtitle: 'The Battle for the Gospel',
  scripture: 'Galatians 1–6',
  summary:
    'Paul\`s urgent defense of justification by faith alone, written to churches tempted to add circumcision to Christ.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Galatians is a letter written in crisis. Churches Paul founded are being told that faith in Christ is not enough, that Gentile believers must also be circumcised and keep the Jewish law. Paul writes to stop them before they cross a line he considers fatal.',
        'The letter has no warm greeting, no thanksgiving for the recipients. Paul skips the pleasantries and goes straight to astonishment: "I am amazed that you are so quickly deserting him who called you." Something has gone wrong, and Paul is not calm about it.',
        'The argument runs in three movements. First, Paul defends himself and his gospel (chapters 1–2). Then he argues the theology: faith, not law, is how anyone has ever been made right with God (chapters 3–4). Finally, he applies it: freedom in Christ is not freedom to sin but freedom to love (chapters 5–6).',
      ],
      figures: [
        {
          art: `  THE CRISIS
    │
    ▼
  PAUL PLANTS CHURCHES ........ Galatia, first journey
    │
    ▼
  PAUL LEAVES ................. moves on to other cities
    │
    ▼
  AGITATORS ARRIVE ............ "You must be circumcised"
    │
    ▼
  GALATIANS WAVER ............. tempted to comply
    │
    ▼
  PAUL HEARS .................. writes this letter
    │
    ▼
  THE ARGUMENT
    │
    ├── My gospel is from God, not men (1–2)
    ├── Abraham was justified by faith (3–4)
    └── Walk by the Spirit, not flesh (5–6)`,
          caption: 'The situation behind the letter.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Galatians is probably Paul\`s earliest surviving letter, written around AD 48–49, though some date it later. The churches addressed are in the Roman province of Galatia, in central Asia Minor (modern Turkey). Paul established them on his first missionary journey, recorded in Acts 13–14.',
        'The crisis was theological and practical at once. After Paul left, other Jewish Christians arrived and taught that Gentile believers must be circumcised and observe the law of Moses. This was not a minor adjustment; it redefined the gospel. If circumcision is required, then Christ\`s death is not sufficient. If law-keeping justifies, then grace is not grace.',
        'Paul sees the stakes clearly. This is not a disagreement about customs; it is a different gospel, which is no gospel at all. The agitators may have claimed the authority of Jerusalem, of James, of the original apostles. Paul will spend two chapters establishing that his gospel came directly from Christ and was confirmed, not corrected, by the Jerusalem leaders.',
      ],
      entries: [
        {
          term: 'The agitators',
          role: 'the troublemakers',
          detail:
            'Paul never names them. He calls them "those who are disturbing you" and "those who want to make a good showing in the flesh." They were Jewish Christians who insisted Gentiles must be circumcised to be fully saved. They may have questioned Paul\`s authority, suggesting he was a second-hand apostle who watered down the true gospel.',
        },
        {
          term: 'Circumcision',
          role: 'the presenting issue',
          detail:
            'The sign of the covenant with Abraham, required of all Jewish males. The question was whether Gentile believers must receive it. Paul says no: to require circumcision is to say Christ is not enough. The Galatians were apparently being pressured to undergo it.',
        },
        {
          term: 'Works of the law',
          role: 'the deeper issue',
          detail:
            'Not good deeds in general, but observance of the Mosaic law as the basis for right standing with God. Paul\`s argument is that no one has ever been justified by law-keeping; Abraham was counted righteous by faith before circumcision existed.',
        },
        {
          term: 'The Jerusalem Council',
          role: 'the decision',
          detail:
            'Acts 15 records a council in Jerusalem that decided Gentiles did not need circumcision. If Galatians was written before that council, it explains the crisis. If after, the agitators were defying the council\`s decision. Either way, Paul writes as though the matter must be argued from Scripture, not merely cited from authority.',
        },
      ],
    },

    // ------------------------------------------------------------- people
    {
      id: 'characters',
      heading: 'The People',
      body: [
        'Galatians mentions several key figures. Understanding who they are and how they relate to each other clears up most of the confusion in the letter.',
      ],
      figures: [
        {
          art: `                    JERUSALEM
                        │
         ┌──────────────┼──────────────┐
         │              │              │
       JAMES         PETER          JOHN
     (the Lord\`s   (Cephas)      (the apostle)
      brother)         │
         │             │
         │      "pillars" ─── recognize Paul\`s gospel
         │             │
         │             ▼
         │      ANTIOCH INCIDENT
         │      Peter eats with Gentiles
         │      then withdraws when "men from James" arrive
         │             │
         │             ▼
         │      PAUL OPPOSES PETER
         │      "to his face, because he stood condemned"
         │
         └──── The agitators may have claimed James\`s authority


                     PAUL
                       │
           ┌───────────┴───────────┐
           │                       │
       BARNABAS                 TITUS
    (traveled with Paul)    (Gentile, uncircumcised)
                            a test case in Jerusalem`,
          caption: 'The people in the letter and how they connect.',
        },
      ],
      entries: [
        {
          term: 'Paul',
          role: 'apostle by revelation',
          detail:
            'The author, writing to defend both his apostleship and his gospel. His authority was being questioned. He argues he received his gospel not from any human source but by direct revelation of Jesus Christ. He did not consult the Jerusalem apostles until years after his conversion, and when he did, they added nothing to his message.',
        },
        {
          term: 'Peter (Cephas)',
          role: 'apostle to the circumcised',
          detail:
            'The leading apostle, who had previously eaten with Gentiles in Antioch but withdrew when "certain men from James" arrived, fearing criticism. Paul confronted him publicly for hypocrisy: if Peter, a Jew, had been living like a Gentile, why was he now compelling Gentiles to live like Jews?',
        },
        {
          term: 'James',
          role: 'the Lord\`s brother',
          detail:
            'Leader of the Jerusalem church. Not one of the Twelve, but a "pillar" alongside Peter and John. Paul met with him privately on his visits to Jerusalem. The "men from James" whose arrival caused Peter\`s withdrawal may or may not have represented James\`s own position; Paul does not accuse James directly.',
        },
        {
          term: 'John',
          role: 'pillar',
          detail:
            'One of the three "pillars" who gave Paul and Barnabas the right hand of fellowship, recognizing their mission to the Gentiles. He appears briefly in chapter 2 and is not discussed further.',
        },
        {
          term: 'Barnabas',
          role: 'Paul\`s companion',
          detail:
            'Paul\`s partner on the first missionary journey, who helped establish the Galatian churches. Even Barnabas was carried away by Peter\`s hypocrisy in Antioch, withdrawing from Gentile table fellowship. This showed Paul how serious the problem was.',
        },
        {
          term: 'Titus',
          role: 'the test case',
          detail:
            'A Gentile believer who accompanied Paul to Jerusalem. He was not compelled to be circumcised, which Paul cites as proof that the Jerusalem leaders agreed with his gospel. Titus was living evidence that Gentiles could be fully Christian without becoming Jews.',
        },
        {
          term: 'Abraham',
          role: 'the original believer',
          detail:
            'The patriarch, cited throughout chapters 3–4 as proof that faith, not law, has always been God\`s way of justifying people. Abraham believed God and it was counted to him as righteousness, before circumcision, before the law. Those who have faith are Abraham\`s children.',
        },
        {
          term: 'Hagar and Sarah',
          role: 'the two covenants',
          detail:
            'In chapter 4, Paul uses Abraham\`s two wives as an allegory. Hagar the slave represents Mount Sinai and the present Jerusalem, bearing children for slavery. Sarah the free woman represents the Jerusalem above, bearing children of promise. Believers are children of the free woman.',
        },
        {
          term: 'The agitators',
          role: 'unnamed opponents',
          detail:
            'Jewish Christians teaching that Gentiles must be circumcised. Paul never names them but attacks them sharply: they preach a different gospel, they want to make a good showing in the flesh, they themselves do not keep the whole law. He wishes they would go further and castrate themselves.',
        },
      ],
    },

    // ----------------------------------------------------------------- places
    {
      id: 'places',
      heading: 'The Geography',
      body: [
        'The letter mentions many places. They matter because Paul is tracing his movements to prove his gospel did not come from Jerusalem. He wants to show he was independent of the original apostles for years, and that when he finally met them, they confirmed him.',
      ],
      figures: [
        {
          art: `                         ┌─────────────────────┐
                         │     DAMASCUS        │
                         │  Paul\`s conversion  │
                         │  preaches there     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      ARABIA         │
                         │  "I went away"      │
                         │  (3 years total)    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    JERUSALEM #1     │
                         │  15 days with Peter │
                         │  saw James          │
                         └──────────┬──────────┘
                                    │
                                    ▼
         ┌──────────────────────────┴──────────────────────────┐
         │                      SYRIA & CILICIA                │
         │              (Tarsus is in Cilicia)                 │
         │                    unknown years                    │
         └──────────────────────────┬──────────────────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      ANTIOCH        │
                         │  base of operations │
                         │  the incident       │
                         └──────────┬──────────┘
                                    │
            ┌───────────────────────┴───────────────────────┐
            │                                               │
            ▼                                               ▼
   ┌─────────────────┐                           ┌─────────────────────┐
   │   JERUSALEM #2  │                           │      GALATIA        │
   │ "after 14 years"│                           │  Pisidian Antioch   │
   │ Titus not       │                           │  Iconium            │
   │ circumcised     │                           │  Lystra             │
   │ pillars give    │                           │  Derbe              │
   │ right hand      │                           │  (the churches)     │
   └─────────────────┘                           └─────────────────────┘`,
          caption: 'Paul\`s movements as recounted in Galatians 1–2.',
        },
      ],
      entries: [
        {
          term: 'Damascus',
          detail:
            'The city Paul was traveling to when Christ appeared to him. Instead of arresting Christians, he began preaching Christ there. He did not immediately go to Jerusalem to consult the apostles.',
        },
        {
          term: 'Arabia',
          detail:
            'After his conversion, Paul "went away into Arabia" before returning to Damascus. He does not say why or for how long, only that he did not consult with flesh and blood. The total time in Damascus and Arabia was three years.',
        },
        {
          term: 'Jerusalem (first visit)',
          detail:
            'After three years, Paul went up to Jerusalem to visit Cephas (Peter) and stayed fifteen days. He saw no other apostle except James the Lord\`s brother. This is his point: he was not taught by the Twelve; he only briefly met two of them.',
        },
        {
          term: 'Syria and Cilicia',
          detail:
            'The regions Paul went to after his first Jerusalem visit. Tarsus, his hometown, is in Cilicia. He was still unknown by face to the churches of Judea; they only heard that their former persecutor was now preaching the faith.',
        },
        {
          term: 'Antioch',
          detail:
            'The church that became Paul\`s base, a mixed congregation of Jews and Gentiles. This is where the incident with Peter happened: Peter ate with Gentiles until "certain men from James" arrived, then withdrew. Paul confronted him publicly.',
        },
        {
          term: 'Jerusalem (second visit)',
          detail:
            '"After fourteen years" Paul went up to Jerusalem again, taking Barnabas and Titus. He laid his gospel before the leaders privately. Titus was not compelled to be circumcised. The "pillars" recognized Paul\`s mission to the Gentiles and gave him the right hand of fellowship.',
        },
        {
          term: 'Galatia',
          detail:
            'The Roman province in central Asia Minor where Paul founded churches on his first missionary journey. Acts 13–14 names the cities: Pisidian Antioch, Iconium, Lystra, and Derbe. These are the "churches of Galatia" receiving this letter.',
        },
        {
          term: 'Pisidian Antioch',
          detail:
            'A city in the province of Galatia (not Syrian Antioch). Paul preached in the synagogue there, was rejected by the Jewish leaders, and turned to the Gentiles. He was eventually driven out.',
        },
        {
          term: 'Iconium',
          detail:
            'The next city Paul visited. Again he preached in the synagogue, again he was opposed, and eventually had to flee when a plot to stone him was discovered.',
        },
        {
          term: 'Lystra',
          detail:
            'Where Paul healed a lame man and the crowd tried to worship him and Barnabas as gods (Hermes and Zeus). Later, Jews from Antioch and Iconium arrived and persuaded the crowd to stone Paul. He survived and continued.',
        },
        {
          term: 'Derbe',
          detail:
            'The furthest point of the first journey. Paul made disciples there, then retraced his steps through Lystra, Iconium, and Antioch, strengthening the churches before returning to Syrian Antioch.',
        },
        {
          term: 'Mount Sinai',
          detail:
            'Where Moses received the law. In chapter 4, Paul uses it allegorically: Sinai represents Hagar, the slave woman, bearing children for slavery. The law given at Sinai cannot produce freedom.',
        },
        {
          term: 'Jerusalem above',
          detail:
            'In contrast to Sinai and "the present Jerusalem," Paul speaks of "the Jerusalem above" which is free and is the mother of believers. This is not a place on a map but the heavenly reality the church belongs to.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The letter moves from personal defense to theological argument to practical application. Each section builds on the previous.',
      ],
      figures: [
        {
          art: `   PART ONE: PERSONAL DEFENSE (1–2)
   ─────────────────────────────────
   1:1–10    No other gospel
   1:11–24   Paul\`s calling and early years
   2:1–10    Jerusalem: the pillars add nothing
   2:11–21   Antioch: Paul opposes Peter

   PART TWO: THEOLOGICAL ARGUMENT (3–4)
   ─────────────────────────────────
   3:1–14    Abraham justified by faith
   3:15–25   The law was temporary
   3:26–29   One in Christ Jesus
   4:1–11    No longer slaves but sons
   4:12–20   Paul\`s appeal
   4:21–31   Hagar and Sarah: two covenants

   PART THREE: PRACTICAL APPLICATION (5–6)
   ─────────────────────────────────
   5:1–12    Stand firm in freedom
   5:13–26   Flesh versus Spirit
   6:1–10    Bear burdens, do good
   6:11–18   Final warning, boast in cross`,
          caption: 'Three movements: my authority, the theology, the life.',
        },
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Justification by Faith',
          definition:
            'Being declared righteous before God through faith in Christ, not by works of the law.',
          appears:
            '"We know that a person is not justified by works of the law but through faith in Jesus Christ" (2:16); Abraham\`s faith counted as righteousness (3:6).',
          matters:
            'This is the gospel Paul is defending. If justification comes through law, Christ died for nothing.',
        },
        {
          name: 'Freedom',
          definition:
            'Release from slavery to the law, to sin, and to the elemental spirits of the world.',
          appears:
            '"For freedom Christ has set us free; stand firm therefore, and do not submit again to a yoke of slavery" (5:1).',
          matters:
            'The Galatians were trading freedom for bondage. Circumcision would put them back under obligation to the whole law.',
        },
        {
          name: 'The Spirit',
          definition:
            'The Holy Spirit received by faith, who enables believers to live differently.',
          appears:
            '"Did you receive the Spirit by works of the law or by hearing with faith?" (3:2); "Walk by the Spirit, and you will not gratify the desires of the flesh" (5:16).',
          matters:
            'The Spirit is proof that God accepts believers apart from law. The Spirit is also the power for the new life.',
        },
        {
          name: 'Flesh versus Spirit',
          definition:
            'Two ways of living: according to human effort and desire, or according to the Spirit\`s leading.',
          appears:
            'The works of the flesh (5:19–21) versus the fruit of the Spirit (5:22–23).',
          matters:
            'Freedom is not license. Those who belong to Christ crucify the flesh with its passions.',
        },
        {
          name: 'Sonship',
          definition:
            'Believers are not slaves but sons and heirs through Christ.',
          appears:
            '"You are all sons of God through faith in Christ Jesus" (3:26); "God sent forth his Son... so that we might receive adoption as sons" (4:4–5).',
          matters:
            'The status changes everything. Slaves work to earn approval; sons already have it.',
        },
      ],
    },

    // ------------------------------------------------------------ the incident
    {
      id: 'incident',
      heading: 'The Antioch Incident',
      body: [
        'One of the most dramatic moments in the New Testament happens in Galatians 2:11–14. Paul confronts Peter publicly, to his face, because Peter "stood condemned."',
      ],
      figures: [
        {
          art: `   BEFORE
   ─────────────────────────────────
   Peter in Antioch
     │
     └── eats with Gentile believers
         (table fellowship, shared meals)


   THE ARRIVAL
   ─────────────────────────────────
   "Certain men from James" come
     │
     └── Peter withdraws
         │
         └── separates himself
             │
             └── fearing "the circumcision party"


   THE EFFECT
   ─────────────────────────────────
   Other Jews join the hypocrisy
     │
     └── even Barnabas is carried away


   PAUL\`S RESPONSE
   ─────────────────────────────────
   "I opposed him to his face"
     │
     └── public rebuke
         │
         └── "If you, though a Jew, live like a Gentile,
              how can you force the Gentiles to live like Jews?"`,
          caption: 'What happened at Antioch.',
        },
      ],
      closing: [
        'This incident matters because it shows the issue was not merely theoretical. The leading apostle, who had received the vision at Cornelius\`s house, who had eaten with Gentiles, was being pressured into segregation. If Peter could waver, anyone could. Paul\`s rebuke was for the gospel itself.',
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Galatians Sits in Scripture',
      entries: [
        {
          term: 'Genesis',
          detail:
            'Paul\`s argument depends on the Abraham story. God\`s promise to Abraham and Abraham\`s faith precede the law by 430 years. The law cannot annul the promise. Gentiles who believe are Abraham\`s offspring.',
        },
        {
          term: 'Acts',
          detail:
            'Acts 13–14 narrates Paul\`s first journey through Galatia. Acts 15 records the Jerusalem Council\`s decision that Gentiles need not be circumcised. Galatians is Paul\`s own account of the same crisis.',
        },
        {
          term: 'Romans',
          detail:
            'Romans covers much of the same ground but at greater length and in calmer tone. Galatians is the urgent letter; Romans is the treatise. Both argue justification by faith using Abraham as the key example.',
        },
        {
          term: 'The other Pauline letters',
          detail:
            'Galatians was likely written first. Themes introduced here, like freedom, Spirit, flesh, sonship, will be developed throughout Paul\`s correspondence.',
        },
      ],
      closing: [
        'Galatians is Paul\`s clearest, sharpest statement of the gospel he preached. It became foundational for the Reformation\`s rediscovery of justification by faith. Luther called it his Katherine von Bora, his wife, the book he was married to.',
      ],
    },

    // ------------------------------------------------------------ why it lasts
    {
      id: 'why',
      heading: 'Why Galatians Matters',
      body: [
        'The specific issue, circumcision, is not the presenting question for most readers today. But the underlying issue never goes away: can human effort add to what Christ has done? Is grace sufficient, or does it need our contribution?',
        'Every generation finds new ways to smuggle law back into the gospel. It may not be circumcision, but it is always something: the right practices, the right experiences, the right politics, the right purity. Galatians asks one question of all of them: did you receive the Spirit by doing that, or by hearing with faith?',
        'The letter also insists that freedom is not lawlessness. Those who walk by the Spirit do not gratify the desires of the flesh. The fruit of the Spirit, love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control, is not produced by trying harder. It is produced by the Spirit in those who have been set free.',
        'Paul ends the letter writing with his own large letters, unusual for him. He wants them to see his hand, to know this is personal. Then the final boast: "Far be it from me to boast except in the cross of our Lord Jesus Christ, by which the world has been crucified to me, and I to the world." That is the ground. The cross is enough. Christ plus nothing.',
      ],
    },
  ],
};
