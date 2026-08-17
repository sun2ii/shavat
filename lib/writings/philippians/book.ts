import { BookOrientation } from '@/lib/types';

export const PHILIPPIANS: BookOrientation = {
  slug: 'philippians',
  title: 'Philippians',
  subtitle: 'Joy in Chains',
  scripture: 'Philippians 1–4',
  summary:
    'Paul\`s warmest letter, written from prison to his favorite church, urging unity and joy through the pattern of Christ\`s self-emptying humility.',
  place: { city: 'San Diego', vibe: 'military, civic pride, loyalty' },

  sections: [
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Philippians is the happiest of Paul\`s letters, which is remarkable since he wrote it from prison. The word "joy" or "rejoice" appears sixteen times in four chapters. Paul is in chains, his life uncertain, rivals are preaching Christ from envy, yet he writes: "Rejoice in the Lord always; again I will say, rejoice."',
        'The letter is personal and warm. The Philippians were Paul\`s first European converts, and they have maintained a special relationship with him. They sent him financial support repeatedly, and now they have sent Epaphroditus to care for him in prison. Paul writes to thank them, to send Epaphroditus back, and to address some tensions in the church.',
        'The center of the letter is the Christ hymn in 2:6–11, one of the most important christological passages in Scripture. Christ did not grasp at equality with God but emptied himself, took the form of a servant, and became obedient to death on a cross. Therefore God highly exalted him. This pattern of descent and exaltation becomes the model for Christian living.',
      ],
      figures: [
        {
          art: `  THE SITUATION
    │
    ├── PAUL IS IN PRISON
    │     │
    │     ├── Location uncertain (Rome? Ephesus? Caesarea?)
    │     ├── Outcome uncertain (life or death)
    │     └── But the gospel is advancing
    │
    ├── THE PHILIPPIANS SENT HELP
    │     │
    │     ├── Epaphroditus came to care for Paul
    │     ├── He nearly died from illness
    │     └── Now Paul sends him back
    │
    └── THE LETTER\`S PURPOSES
          │
          ├── Thank them for their gift
          ├── Update them on his situation
          ├── Send Epaphroditus back
          ├── Urge unity (Euodia and Syntyche)
          └── Warn against legalists`,
          caption: 'Why Paul wrote.',
        },
      ],
    },

    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Philippi was a Roman colony in Macedonia, settled with army veterans, proud of its Roman identity. Paul arrived there on his second missionary journey, around AD 49–50, and established the first church in Europe. The founding events are recorded in Acts 16: Lydia\`s conversion, the slave girl\`s exorcism, Paul and Silas in prison, the earthquake, the jailer\`s conversion.',
        'The church remained loyal to Paul and sent him support repeatedly, even when other churches did not. Paul had a unique relationship with them: he accepted their financial gifts, something he normally refused to avoid any appearance of self-interest. They were his partners in the gospel.',
        'The letter is written from prison, but which imprisonment is debated. If Rome (the traditional view), it was written around AD 60–62. If Ephesus (a common scholarly view), it was written around AD 54–56. The location affects interpretation, but the message remains the same: joy and unity through Christ\`s pattern of humble service.',
      ],
      entries: [
        {
          term: 'Roman colony',
          role: 'civic identity',
          detail:
            'Philippi\`s citizens were Roman citizens, proud of their status. Language like "citizenship" (3:20) and "imperial guard" (1:13) would resonate. Paul reminds them their true citizenship is in heaven.',
        },
        {
          term: 'The praetorian guard',
          role: 'Paul\`s audience',
          detail:
            'Paul mentions that his imprisonment has become known throughout the whole imperial guard. If in Rome, this is the elite troops guarding the emperor. Paul\`s chains have become an opportunity for witness.',
        },
        {
          term: 'The gift',
          role: 'the occasion',
          detail:
            'The Philippians sent Epaphroditus with financial support for Paul. Paul is grateful but also slightly awkward; he insists he has learned to be content in all circumstances. Still, he commends them: "No church shared with me in giving and receiving except you only."',
        },
        {
          term: 'Euodia and Syntyche',
          role: 'the tension',
          detail:
            'Two women leaders in the church who are in conflict. Paul urges them to "agree in the Lord" and asks someone to help them. These were significant figures who "labored side by side" with Paul in the gospel.',
        },
      ],
    },

    {
      id: 'characters',
      heading: 'The People',
      body: [
        'Philippians mentions several individuals by name, revealing the relationships behind the letter.',
      ],
      entries: [
        {
          term: 'Paul',
          role: 'prisoner and apostle',
          detail:
            'The author, writing from prison with uncertain outcome. He is torn between desire to depart and be with Christ and the need to remain for the Philippians\` sake. He models the joy he commends.',
        },
        {
          term: 'Timothy',
          role: 'co-sender and envoy',
          detail:
            'Listed as co-author. Paul hopes to send Timothy soon and commends him highly: "I have no one like him, who will be genuinely concerned for your welfare." Timothy was with Paul when the Philippian church was founded.',
        },
        {
          term: 'Epaphroditus',
          role: 'messenger from Philippi',
          detail:
            'The Philippians\` envoy who brought their gift and nearly died from illness while serving Paul. Paul calls him "brother, fellow worker, and fellow soldier." He is sending him back so the Philippians will rejoice to see him.',
        },
        {
          term: 'Euodia',
          role: 'church leader',
          detail:
            'A woman who "labored side by side" with Paul in the gospel. She is in conflict with Syntyche, and Paul publicly urges them to reconcile. Her leadership role is assumed, not questioned.',
        },
        {
          term: 'Syntyche',
          role: 'church leader',
          detail:
            'Another woman leader in conflict with Euodia. Paul addresses them both equally, urging agreement in the Lord. The church\`s unity depends on their reconciliation.',
        },
        {
          term: 'The true companion',
          role: 'mediator',
          detail:
            'Paul asks an unnamed "true companion" (Greek syzygos) to help Euodia and Syntyche. This may be someone\`s name (Syzygus), a title, or a reference to an individual known to the church.',
        },
        {
          term: 'Clement',
          role: 'co-worker',
          detail:
            'Mentioned as one who labored with Paul alongside Euodia and Syntyche. His name is in the book of life. Some identify him with Clement of Rome, but this is speculative.',
        },
        {
          term: 'Caesar\`s household',
          role: 'Roman believers',
          detail:
            'Paul sends greetings from "those of Caesar\`s household," meaning slaves and freedmen in the imperial administration. The gospel has penetrated even there.',
        },
      ],
    },

    {
      id: 'places',
      heading: 'The Geography',
      body: [
        'The letter connects Philippi with Paul\`s imprisonment and his broader network.',
      ],
      figures: [
        {
          art: `                    PHILIPPI
                  (the recipients)
                        │
              FIRST CHURCH IN EUROPE
              Founded on second journey
                        │
               ┌────────┴────────┐
               │                 │
           MACEDONIA         THESSALONICA
         (nearby churches)  (also founded
                            on same journey)


              PAUL\`S LOCATION
              ───────────────
              Debated: Rome? Ephesus? Caesarea?

              ROME (traditional)
                │
                ├── Praetorian guard fits
                ├── Caesar\`s household fits
                └── Distance explains delay

              EPHESUS (scholarly)
                │
                ├── Closer to Philippi
                ├── Multiple journeys possible
                └── Known opposition there`,
          caption: 'Philippi\`s location and Paul\`s uncertain whereabouts.',
        },
      ],
      entries: [
        {
          term: 'Philippi',
          detail:
            'A Roman colony in eastern Macedonia, on the Via Egnatia, the main Roman road from the Adriatic to the East. Site of the famous battle (42 BC) where Octavian and Antony defeated Brutus and Cassius.',
        },
        {
          term: 'Macedonia',
          detail:
            'The Roman province including Philippi, Thessalonica, and Berea. Paul\`s Macedonian churches were especially dear to him and generous in giving.',
        },
        {
          term: 'Thessalonica',
          detail:
            'The provincial capital, also founded on the second journey. Philippians 4:16 mentions that even in Thessalonica the Philippians sent Paul support, showing their generosity from the start.',
        },
      ],
    },

    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The letter is less formally structured than Romans but has a clear flow.',
      ],
      figures: [
        {
          art: `   GREETING AND THANKSGIVING (1:1–11)
   ──────────────────────────────
   Partnership in the gospel, prayer for growth

   PAUL\`S CIRCUMSTANCES (1:12–26)
   ──────────────────────────────
   Imprisonment advances gospel
   To live is Christ, to die is gain

   EXHORTATION TO UNITY (1:27–2:18)
   ──────────────────────────────
   Stand firm in one spirit
   THE CHRIST HYMN (2:6–11)
   Work out your salvation

   TIMOTHY AND EPAPHRODITUS (2:19–30)
   ──────────────────────────────
   Commendation and travel plans

   WARNING AND EXAMPLE (3:1–21)
   ──────────────────────────────
   Beware of dogs (legalists)
   Paul\`s credentials and their worthlessness
   Press on toward the goal
   Our citizenship is in heaven

   FINAL EXHORTATIONS (4:1–9)
   ──────────────────────────────
   Euodia and Syntyche
   Rejoice always
   The peace of God

   THANKS FOR THE GIFT (4:10–20)
   ──────────────────────────────
   Content in all circumstances
   I can do all things through Christ

   CLOSING (4:21–23)`,
          caption: 'The flow of the letter.',
        },
      ],
    },

    {
      id: 'hymn',
      heading: 'The Christ Hymn',
      body: [
        'Philippians 2:6–11 is one of the most important christological passages in the New Testament. Many scholars believe it is an early Christian hymn that Paul quotes. Whether he composed it or inherited it, it stands as a profound statement of Christ\`s nature and work.',
      ],
      figures: [
        {
          art: `   THE DESCENT
   ──────────────────────
   "though he was in the form of God"
        │
        ▼
   "did not count equality with God
    a thing to be grasped"
        │
        ▼
   "emptied himself"
        │
        ▼
   "taking the form of a servant"
        │
        ▼
   "being born in the likeness of men"
        │
        ▼
   "humbled himself"
        │
        ▼
   "became obedient to the point of death"
        │
        ▼
   "even death on a cross"


   THE EXALTATION
   ──────────────────────
   "Therefore God has highly exalted him"
        │
        ▼
   "bestowed on him the name above every name"
        │
        ▼
   "at the name of Jesus every knee should bow"
        │
        ▼
   "every tongue confess that Jesus Christ is Lord"`,
          caption: 'The pattern: descent then exaltation.',
        },
      ],
      closing: [
        'This hymn is not just theology to admire but a pattern to follow. Paul introduces it with "Have this mind among yourselves, which is yours in Christ Jesus." The community that follows Christ will reflect his self-emptying humility, not grasping at status but serving one another.',
      ],
    },

    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Joy',
          definition:
            'Rejoicing that does not depend on circumstances but on Christ.',
          appears:
            '"Rejoice in the Lord always; again I will say, rejoice" (4:4). Joy appears throughout despite imprisonment.',
          matters:
            'Paul models what he preaches. His joy is not denial of suffering but confidence in Christ\`s purposes.',
        },
        {
          name: 'Unity',
          definition:
            'Being of the same mind, having the same love, being in full accord.',
          appears:
            '"Complete my joy by being of the same mind" (2:2); the appeal to Euodia and Syntyche (4:2).',
          matters:
            'The Christ hymn grounds unity: if Christ humbled himself, believers cannot grasp at status over one another.',
        },
        {
          name: 'Humility',
          definition:
            'Counting others more significant than oneself, following Christ\`s pattern.',
          appears:
            '"Do nothing from selfish ambition or conceit, but in humility count others more significant than yourselves" (2:3).',
          matters:
            'Christ\`s descent from divine glory to crucifixion defines humility. It is not self-deprecation but self-giving service.',
        },
        {
          name: 'Citizenship',
          definition:
            'True belonging in heaven, not earthly status.',
          appears:
            '"Our citizenship is in heaven, and from it we await a Savior, the Lord Jesus Christ" (3:20).',
          matters:
            'The Philippians were proud of Roman citizenship. Paul redirects: their true citizenship is heavenly, awaiting Christ\`s return.',
        },
        {
          name: 'Contentment',
          definition:
            'Sufficiency in Christ regardless of plenty or want.',
          appears:
            '"I have learned in whatever situation I am to be content... I can do all things through him who strengthens me" (4:11–13).',
          matters:
            'This is not Stoic indifference but dependence on Christ. Paul can face any circumstance because Christ supplies strength.',
        },
      ],
    },

    {
      id: 'connections',
      heading: 'Where Philippians Sits in Scripture',
      entries: [
        {
          term: 'Acts',
          detail:
            'Acts 16 narrates the founding of the Philippian church: Lydia\`s conversion, the slave girl\`s exorcism, the prison earthquake, the jailer\`s baptism. The church began with signs and wonders.',
        },
        {
          term: 'The Prison Epistles',
          detail:
            'Philippians is grouped with Ephesians, Colossians, and Philemon as letters from imprisonment. All share themes of Christ\`s supremacy and encouragement amid difficulty.',
        },
        {
          term: '2 Corinthians',
          detail:
            'Both are personal letters revealing Paul\`s inner life. Both feature joy amid suffering, contentment in weakness, confidence in Christ.',
        },
        {
          term: 'Isaiah',
          detail:
            'The Christ hymn echoes Isaiah 45:23: "To me every knee shall bow, every tongue shall swear allegiance." What YHWH claimed is now applied to Jesus.',
        },
      ],
    },

    {
      id: 'why',
      heading: 'Why Philippians Matters',
      body: [
        'Philippians is a model of Christian joy that does not depend on circumstances. Paul writes from prison, uncertain whether he will live or die, yet the letter breathes gratitude and confidence. If joy requires freedom and security, Paul should be despairing. Instead, he rejoices.',
        'The Christ hymn in chapter 2 has shaped Christian thought about who Jesus is and what he did. He was in the form of God, yet he emptied himself. He descended to the lowest point, death on a cross, and was exalted to the highest place. This is the pattern for Christian community: not grasping at status but serving one another.',
        'The letter also models partnership in ministry. Paul and the Philippians share in the gospel. They support him financially; he cares for them spiritually. The relationship is mutual, sustained over years, built on shared mission. This is what church partnership can look like.',
        '"I can do all things through him who strengthens me" is often quoted out of context as a general promise of success. In context, it is about contentment: Paul can face plenty or hunger, abundance or need, because Christ supplies what he needs. The promise is not unlimited power but sufficient grace.',
      ],
    },
  ],
};
