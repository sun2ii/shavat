import { BookOrientation } from '@/lib/types';

export const FIRST_CORINTHIANS: BookOrientation = {
  slug: '1-corinthians',
  title: '1 Corinthians',
  subtitle: 'Order in a Chaotic Church',
  scripture: '1 Corinthians 1–16',
  summary:
    'Paul addresses a divided, morally confused church in a wealthy port city, correcting their views on wisdom, sexuality, worship, and resurrection.',
  place: { city: 'Las Vegas', vibe: 'money, sex, status, excess' },

  sections: [
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        '1 Corinthians is a letter to a church in crisis. Not persecution from outside, but chaos from within. The Corinthians are divided into factions, tolerating sexual immorality, suing each other in court, abusing the Lord\`s Supper, and confused about spiritual gifts, marriage, and resurrection.',
        'Paul had founded this church on his second missionary journey and spent eighteen months there. Now, about three years later, he writes from Ephesus to address reports he has received and questions they have sent him. The letter alternates between confronting problems ("It is actually reported...") and answering inquiries ("Now concerning...").',
        'Corinth was a wealthy commercial hub, newly rebuilt by Rome, famous for its immorality. The church there was made up largely of Gentile converts bringing their cultural baggage into the faith. Paul must teach them what it means to be the temple of the Holy Spirit in a city devoted to temples of other gods.',
      ],
      figures: [
        {
          art: `  THE SITUATION
    │
    ├── REPORTS PAUL RECEIVED
    │     │
    │     ├── Divisions: "I follow Paul/Apollos/Cephas/Christ"
    │     ├── A man sleeping with his father\`s wife
    │     ├── Lawsuits between believers
    │     └── Disorder at the Lord\`s Supper
    │
    └── QUESTIONS THE CORINTHIANS SENT
          │
          ├── Marriage and singleness (ch. 7)
          ├── Food offered to idols (ch. 8–10)
          ├── Head coverings in worship (ch. 11)
          ├── Spiritual gifts (ch. 12–14)
          └── Resurrection of the dead (ch. 15)`,
          caption: 'Two sources: what Paul heard and what they asked.',
        },
      ],
    },

    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Corinth sat on a narrow isthmus controlling trade between the Aegean and Adriatic seas. Destroyed by Rome in 146 BC, it was refounded as a Roman colony in 44 BC and quickly became the capital of the province of Achaia. By Paul\`s time it was a thriving commercial center, ethnically diverse, socially stratified, and religiously pluralistic.',
        'The city\`s reputation for immorality was so widespread that "to Corinthianize" became a Greek verb meaning to practice sexual immorality. The temple of Aphrodite on the Acrocorinth was famous throughout the ancient world. Paul\`s converts came out of this environment.',
        'Paul arrived in Corinth around AD 50–51, during his second missionary journey. He worked as a tentmaker with Aquila and Priscilla, preached in the synagogue, and eventually established a house church. He stayed eighteen months before moving on. This letter was written around AD 53–55 from Ephesus.',
      ],
      entries: [
        {
          term: 'The factions',
          role: 'the presenting problem',
          detail:
            'The church had split into groups claiming allegiance to different leaders: Paul, Apollos, Cephas (Peter), or Christ. Paul rejects all these divisions. Christ is not divided. The leaders are merely servants through whom they believed.',
        },
        {
          term: 'Wisdom',
          role: 'the cultural issue',
          detail:
            'Corinth valued rhetorical skill and philosophical wisdom. Some believers were evaluating leaders by these standards. Paul counters that the message of the cross is foolishness to the world but the power of God. He deliberately avoided impressive speech.',
        },
        {
          term: 'Spiritual gifts',
          role: 'the worship problem',
          detail:
            'The Corinthians prized spectacular gifts, especially tongues. Their worship had become chaotic, with everyone speaking at once. Paul corrects their theology of gifts and establishes order: all gifts are from one Spirit, for the common good.',
        },
        {
          term: 'Resurrection',
          role: 'the theological crisis',
          detail:
            'Some Corinthians were saying there is no resurrection of the dead. Paul responds with the earliest written account of the resurrection appearances and argues that if the dead are not raised, Christ has not been raised, and faith is futile.',
        },
      ],
    },

    {
      id: 'characters',
      heading: 'The People',
      body: [
        'The letter mentions several individuals by name. Understanding who they are helps clarify the situation Paul is addressing.',
      ],
      figures: [
        {
          art: `                      PAUL
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       APOLLOS       CEPHAS      SOSTHENES
    (watered what   (Peter)     (co-sender)
     Paul planted)
          │
          ▼
    ELOQUENT ALEXANDRIAN
    arrived after Paul left
    some preferred his style


         THE CORINTHIAN HOUSEHOLDS
         ─────────────────────────
         Chloe\`s people ── reported the divisions
         Stephanas ─────── first converts, devoted to ministry
         Crispus ────────── synagogue ruler Paul baptized
         Gaius ─────────── Paul baptized, hosted church
         Fortunatus ────── brought the letter from Corinth
         Achaicus ───────── brought the letter from Corinth`,
          caption: 'The people named in the letter.',
        },
      ],
      entries: [
        {
          term: 'Paul',
          role: 'founder and father',
          detail:
            'The author, writing to correct a church he planted. He calls himself their father in Christ and appeals to them as his beloved children. He planted, Apollos watered, but God gave the growth.',
        },
        {
          term: 'Apollos',
          role: 'the eloquent successor',
          detail:
            'An Alexandrian Jew, "eloquent, competent in the Scriptures," who came to Corinth after Paul. Some preferred his speaking style, creating a faction around him. Paul insists they are fellow workers, not rivals. He urged Apollos to return to Corinth, but Apollos was not willing at present.',
        },
        {
          term: 'Cephas (Peter)',
          role: 'the Jerusalem apostle',
          detail:
            'Some Corinthians claimed allegiance to Peter, perhaps Jewish Christians who valued his authority over Paul\`s. Peter may never have visited Corinth; his name was being used to create division.',
        },
        {
          term: 'Sosthenes',
          role: 'co-sender',
          detail:
            'Listed as co-author in the greeting. Possibly the same Sosthenes who was synagogue ruler in Corinth and was beaten before Gallio (Acts 18:17). If so, he had become a believer and was now with Paul in Ephesus.',
        },
        {
          term: 'Chloe\`s people',
          role: 'the informants',
          detail:
            'Members of Chloe\`s household who reported the divisions to Paul. Whether Chloe herself was in Corinth or Ephesus is unknown. Her people were the source of the troubling news.',
        },
        {
          term: 'Stephanas',
          role: 'first fruits of Achaia',
          detail:
            'Stephanas and his household were the first converts in the province of Achaia (which included Corinth). They devoted themselves to serving the saints. Paul urges the church to submit to such people.',
        },
        {
          term: 'Aquila and Priscilla',
          role: 'Paul\`s hosts',
          detail:
            'The couple who hosted Paul in Corinth, working together as tentmakers. By the time of this letter they are in Ephesus with Paul. A church meets in their house. They send greetings.',
        },
        {
          term: 'Timothy',
          role: 'Paul\`s envoy',
          detail:
            'Paul\`s trusted co-worker, sent to Corinth to remind them of Paul\`s ways in Christ. Paul asks them to receive him without fear, since he is doing the Lord\`s work.',
        },
      ],
    },

    {
      id: 'places',
      heading: 'The Geography',
      body: [
        'Understanding Corinth\`s location and character illuminates nearly every issue in the letter.',
      ],
      figures: [
        {
          art: `                    CORINTH
                        │
      ┌─────────────────┼─────────────────┐
      │                 │                 │
  LECHAEUM         THE ISTHMUS       CENCHREAE
 (western port)    (land bridge)    (eastern port)
      │                 │                 │
      ▼                 ▼                 ▼
  ADRIATIC         ACROCORINTH        AEGEAN
    SEA         (temple of Aphrodite)   SEA
                        │
                        ▼
               COMMERCIAL HUB
         goods portaged across isthmus
         rather than sailing around
         the Peloponnese


                   PAUL\`S ROUTE
         ─────────────────────────────
         Philippi → Thessalonica → Athens → CORINTH
                                              │
                                        18 months
                                              │
                                              ▼
                                          EPHESUS
                                     (where Paul writes)`,
          caption: 'Corinth controlled east-west trade.',
        },
      ],
      entries: [
        {
          term: 'Corinth',
          detail:
            'A Roman colony on the isthmus connecting mainland Greece to the Peloponnese. Its two ports gave it control of trade between Rome and the East. A cosmopolitan, wealthy, morally lax city.',
        },
        {
          term: 'Acrocorinth',
          detail:
            'The acropolis rising 1,886 feet above the city, site of the temple of Aphrodite. The temple\`s association with prostitution shaped Corinth\`s reputation for immorality.',
        },
        {
          term: 'Cenchreae',
          detail:
            'The eastern port of Corinth, on the Aegean side. Phoebe was a deacon of the church there (Romans 16:1). Paul had his hair cut there as part of a vow (Acts 18:18).',
        },
        {
          term: 'Ephesus',
          detail:
            'The major city of the province of Asia, across the Aegean from Corinth. Paul wrote this letter from Ephesus during his extended ministry there. He mentions "many adversaries" but also a "wide door for effective work."',
        },
        {
          term: 'Macedonia',
          detail:
            'The province to the north, including Philippi and Thessalonica. Paul plans to pass through Macedonia before coming to Corinth. The Macedonian churches will later participate in the collection for Jerusalem.',
        },
      ],
    },

    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The letter has a clear organization, moving from reported problems to written questions.',
      ],
      figures: [
        {
          art: `   RESPONDING TO REPORTS (1–6)
   ────────────────────────────
   1:10–4:21   Divisions and wisdom
   5:1–13      Sexual immorality (the man and his stepmother)
   6:1–11      Lawsuits before unbelievers
   6:12–20     The body is for the Lord

   ANSWERING QUESTIONS (7–16)
   ────────────────────────────
   "Now concerning..."

   7:1–40      Marriage and singleness
   8:1–11:1    Food offered to idols
   11:2–16     Head coverings
   11:17–34    The Lord\`s Supper
   12:1–14:40  Spiritual gifts
   15:1–58     The resurrection
   16:1–24     The collection, plans, greetings`,
          caption: 'Reports first, then their questions.',
        },
      ],
    },

    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'The Cross as God\`s Wisdom',
          definition:
            'What the world considers foolish and weak, God has chosen to save and transform.',
          appears:
            '"The word of the cross is folly to those who are perishing, but to us who are being saved it is the power of God" (1:18).',
          matters:
            'The Corinthians were evaluating leaders by worldly standards of eloquence and wisdom. The cross inverts all such judgments.',
        },
        {
          name: 'The Body of Christ',
          definition:
            'The church as one body with many members, each necessary, none superior.',
          appears:
            'Chapter 12 develops the metaphor at length. The eye cannot say to the hand, "I have no need of you." God has arranged the members as he chose.',
          matters:
            'This corrects both the divisions (chapter 1–4) and the gift-pride (chapter 12–14). No one can claim superiority; all need each other.',
        },
        {
          name: 'The Temple of the Holy Spirit',
          definition:
            'Believers individually and corporately are God\`s dwelling place.',
          appears:
            '"Do you not know that your body is a temple of the Holy Spirit?" (6:19); "Do you not know that you are God\`s temple?" (3:16).',
          matters:
            'In a city full of pagan temples, Paul insists the church is the true temple. Sexual immorality defiles the temple; divisions destroy it.',
        },
        {
          name: 'Love',
          definition:
            'The way that surpasses all gifts and makes them meaningful.',
          appears:
            'Chapter 13, the "love chapter," placed between chapters on spiritual gifts. Without love, tongues are noise, prophecy is nothing, sacrifice is worthless.',
          matters:
            'The Corinthians pursued gifts without love, producing chaos. Love is patient, kind, not arrogant, not insisting on its own way.',
        },
        {
          name: 'Resurrection',
          definition:
            'The bodily raising of Christ and of all who belong to him.',
          appears:
            'Chapter 15, the longest sustained argument in the letter, from the resurrection appearances to the transformed body.',
          matters:
            'If Christ is not raised, preaching is vain and faith is futile. But Christ has been raised, the firstfruits of those who have fallen asleep.',
        },
      ],
    },

    {
      id: 'connections',
      heading: 'Where 1 Corinthians Sits in Scripture',
      entries: [
        {
          term: 'Acts',
          detail:
            'Acts 18 narrates Paul\`s founding of the Corinthian church, his eighteen-month stay, and his appearance before the proconsul Gallio. This letter was written perhaps three years later.',
        },
        {
          term: '2 Corinthians',
          detail:
            'The sequel, written after a painful visit and a "severe letter." The relationship between the letters is complex; 2 Corinthians is more personal, defensive, and emotional.',
        },
        {
          term: 'Romans',
          detail:
            'Written shortly after the Corinthian correspondence, from Corinth itself. Many themes overlap: the body of Christ, spiritual gifts, love, the resurrection.',
        },
        {
          term: 'The Gospels',
          detail:
            '1 Corinthians 11 contains the earliest written account of the Last Supper, predating the Gospels. Chapter 15 contains the earliest resurrection witness list.',
        },
      ],
    },

    {
      id: 'why',
      heading: 'Why 1 Corinthians Matters',
      body: [
        'This letter is practical theology at its best. Paul does not merely theologize; he applies the gospel to real problems: sexuality, lawsuits, marriage, worship, death. Every issue comes back to the cross, the body of Christ, and the coming resurrection.',
        'The church at Corinth is recognizable. They were enthusiastic but immature, gifted but proud, free but careless. They confused cultural values with spiritual ones. They valued eloquence over the cross, spectacular gifts over love, present experience over future hope.',
        'Paul\`s response is not to dampen enthusiasm but to direct it. Yes, pursue spiritual gifts, but even more pursue love. Yes, all things are lawful, but not all things build up. Yes, you have knowledge, but knowledge puffs up while love builds up. The corrective is always Christ crucified, the body united, the resurrection coming.',
        'Chapter 13 on love and chapter 15 on resurrection are among the most famous passages in Scripture. But they are not standalone essays; they are responses to specific problems. Love corrects chaotic worship. Resurrection corrects denial of bodily hope. The most beautiful theology emerges from the messiest situations.',
      ],
    },
  ],
};
