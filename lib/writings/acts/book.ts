import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Acts: the ground a reader should be standing on before
 * the first verse. What Jesus began in His body He continues through His church.
 */
export const ACTS: BookOrientation = {
  slug: 'acts',
  title: 'Acts',
  subtitle: 'The Gospel Spreads to the Ends of the Earth',
  scripture: 'Acts 1–28',
  summary:
    'The risen Christ, through His Spirit, builds His church from Jerusalem to Rome.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Acts is one book in two halves. The first half follows Peter and the church in Jerusalem. The second half follows Paul and the church among the nations. Between them stands a hinge: the conversion of Saul on the Damascus road, the inclusion of the Gentiles at Cornelius\`s house, and the council that declares the door open.',
        'The whole book moves outward. Jerusalem to Judea. Judea to Samaria. Samaria to the ends of the earth. Jesus announced this trajectory in His final words before the ascension (1:8), and the rest of the book is the Spirit making it happen.',
        'Read Acts as volume two of Luke\`s work. The Gospel told what Jesus began to do and teach. Acts tells what the risen Jesus continued to do and teach through His Spirit in His people. The same author, the same recipient (Theophilus), the same story.',
      ],
      figures: [
        {
          art: `  ASCENSION
    │
    ▼
  PENTECOST .......... the Spirit poured out
    │
    ▼
  JERUSALEM .......... the church is born
    │
    ├──► JUDEA & SAMARIA
    │         │
    │         ▼
    │     PERSECUTION .... scatters the church
    │         │
    │         ▼
    │     CORNELIUS ...... the door opens to Gentiles
    │
    ▼
  ANTIOCH ............ the sending church
    │
    ▼
  MISSIONARY JOURNEYS
    │
    ├──► Asia Minor
    ├──► Greece
    └──► back to Jerusalem
    │
    ▼
  ARREST ............. Paul bound for Rome
    │
    ▼
  ROME ............... the gospel at the center of the empire`,
          caption: 'The whole book, from ascension to Rome.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Acts covers roughly thirty years: from the ascension of Jesus (around AD 30) to Paul\`s imprisonment in Rome (around AD 62). The Roman Empire provides the political frame. Pax Romana means travel is possible. Roman roads and Greek language mean the gospel can move.',
        'The church begins as a Jewish movement within Judaism. The first believers are Jews who recognize Jesus as Messiah. The tension that drives much of Acts is the question: must Gentiles become Jews to follow the Jewish Messiah? The answer emerges slowly, painfully, and definitively: no. Faith in Christ is the door, not circumcision.',
        'Luke writes as a careful historian. He names governors, records speeches, tracks journeys, and preserves details a novelist would not bother to invent. The "we" passages (16:10–17, 20:5–21:18, 27:1–28:16) indicate Luke was present for parts of the story he tells.',
      ],
      entries: [
        {
          term: 'Jerusalem',
          role: 'the starting point',
          detail:
            'The city where Jesus was crucified, buried, and raised. The disciples are told to wait there for the Spirit. The church is born there at Pentecost. The first seven chapters never leave it. Even after persecution scatters believers, Jerusalem remains the center of authority (chapter 15).',
        },
        {
          term: 'The Temple',
          role: 'the old meeting place',
          detail:
            'Still standing, still central to Jewish life. The early believers worship there daily (2:46, 3:1). Stephen\`s speech critiques its misuse. Paul\`s final arrest happens in its courts. Acts begins in the temple\`s shadow and ends with Paul under house arrest in Rome, free from its constraints.',
        },
        {
          term: 'Antioch',
          role: 'the new center',
          detail:
            'The third largest city in the empire, where believers are first called Christians (11:26). Unlike Jerusalem, Antioch has a mixed congregation from the start. It becomes the sending church for Paul\`s missions. What Jerusalem began, Antioch extends.',
        },
        {
          term: 'Rome',
          role: 'the destination',
          detail:
            'The capital of the world. Paul\`s goal from chapter 19 onward. He arrives as a prisoner, but the gospel arrives free. The book ends with Paul preaching openly in Rome, unhindered. The word has reached the center.',
        },
        {
          term: 'The synagogue',
          role: 'the first stop',
          detail:
            'In every city Paul enters, he goes first to the synagogue. This is not strategy; it is conviction: to the Jew first. The pattern repeats: proclamation, division, rejection by some, belief by others, then turning to the Gentiles. The synagogue is both starting point and flashpoint.',
        },
      ],
    },

    // ------------------------------------------------------------- characters
    {
      id: 'characters',
      heading: 'The People',
      figures: [
        {
          art: `        PART ONE: JERUSALEM
             PETER
               │
    ┌──────────┼──────────┐
    │          │          │
  JOHN     STEPHEN    PHILIP
                         │
                    ETHIOPIAN

        PART TWO: TO THE NATIONS
             PAUL
               │
    ┌──────────┼──────────┐
    │          │          │
BARNABAS    SILAS      LUKE
               │
         TIMOTHY`,
          caption: 'Two leaders, two movements, one Spirit.',
        },
      ],
      entries: [
        {
          term: 'Peter',
          role: 'the rock',
          detail:
            'The fisherman who denied Jesus three times now preaches Him boldly. He opens doors: to Jews at Pentecost, to Samaritans with John, to Gentiles at Cornelius\`s house. After chapter 15, he steps offstage. His work was to establish that the door is open.',
        },
        {
          term: 'Stephen',
          role: 'the first martyr',
          detail:
            'A man full of faith and the Spirit, chosen to serve tables but compelled to preach. His speech in chapter 7 is the longest in Acts, a retelling of Israel\`s story that accuses the current generation of repeating their fathers\` pattern. He sees the Son of Man standing at God\`s right hand as the stones fall.',
        },
        {
          term: 'Philip',
          role: 'the evangelist',
          detail:
            'Another of the Seven, who takes the gospel to Samaria (crossing one barrier) and to an Ethiopian eunuch on a desert road (crossing more). The Spirit directs his steps. He does not build institutions; he plants seeds in unlikely soil.',
        },
        {
          term: 'Paul (Saul)',
          role: 'the apostle to the nations',
          detail:
            'Present at Stephen\`s death, breathing threats against the church, knocked down on the Damascus road and raised up a servant of the Lord he persecuted. The second half of Acts is his story: three missionary journeys, countless beatings, one shipwreck, and an unshakable conviction that the risen Christ had commissioned him to carry the name of Jesus to the Gentiles.',
        },
        {
          term: 'Barnabas',
          role: 'the encourager',
          detail:
            'A Levite from Cyprus who sells a field and lays the money at the apostles\` feet. He finds Saul when everyone else is afraid and brings him to Antioch. He travels with Paul until they part over John Mark. His gift was seeing potential.',
        },
        {
          term: 'James',
          role: 'the pillar',
          detail:
            'The Lord\`s brother, not one of the Twelve but leader of the Jerusalem church by chapter 15. He presides at the council that decides Gentiles need not be circumcised. He holds the center while Paul pushes the edges.',
        },
        {
          term: 'Luke',
          role: 'the physician',
          detail:
            'The author, present in the "we" passages. A Gentile believer, a careful observer, a companion of Paul through shipwreck and imprisonment. He writes so that Theophilus may have certainty about the things he has been taught.',
        },
        {
          term: 'Cornelius',
          role: 'the first Gentile',
          detail:
            'A Roman centurion, a God-fearer, a man whose prayers and alms have risen before God. The Spirit falls on his household before Peter finishes preaching. His conversion is the test case that settles the question: God accepts the Gentiles.',
        },
      ],
    },

    // ----------------------------------------------------------------- places
    {
      id: 'places',
      heading: 'The Geography',
      figures: [
        {
          art: `                    ROME
                      ▲
                      │
        SPAIN? ◄──────┼───────► ILLYRICUM
        (planned)     │
                      │
           GREECE ────┤
         (Corinth,    │
          Athens,     │
          Philippi)   │
                      │
       ASIA MINOR ────┤
        (Ephesus,     │
         Galatia)     │
                      │
           SYRIA ─────┤
         (Antioch)    │
                      │
          JUDEA ──────┘
       (Jerusalem)`,
          caption: 'The gospel moves outward, always outward.',
        },
      ],
      entries: [
        {
          term: 'Jerusalem',
          detail:
            'Where the church is born, where the Spirit falls, where the first council convenes, and where Paul is arrested. It is the center until it is not. By the end of Acts, the center has moved.',
        },
        {
          term: 'Damascus',
          detail:
            'The city Saul was traveling to when Jesus stopped him. He enters blind and leaves a preacher. The Christians he came to arrest baptize him instead.',
        },
        {
          term: 'Antioch',
          detail:
            'The Gentile church that becomes the launching point for world mission. Believers are first called Christians here. This is where the new thing takes its name.',
        },
        {
          term: 'Philippi',
          detail:
            'The first European city to receive the gospel. Lydia\`s household baptized by a river. Paul and Silas singing in prison at midnight. The jailer converted by an earthquake.',
        },
        {
          term: 'Athens',
          detail:
            'The intellectual capital. Paul provoked by idols, preaching in the Areopagus about the unknown God. Some mock; a few believe. The gospel can hold its own in the marketplace of ideas.',
        },
        {
          term: 'Corinth',
          detail:
            'A commercial crossroads, morally notorious. Paul stays eighteen months, longer than almost anywhere. The Lord speaks: "I have many people in this city." Churches grow in unlikely soil.',
        },
        {
          term: 'Ephesus',
          detail:
            'Center of the Artemis cult, a hub for Asia Minor. Paul\`s longest stay, extraordinary miracles, a riot by silversmiths, and a farewell to elders that reads like a last will. The word of the Lord spread widely.',
        },
        {
          term: 'Caesarea',
          detail:
            'The Roman administrative capital. Where Peter preaches to Cornelius. Where Paul is imprisoned for two years. Where he appeals to Caesar and boards a ship for Rome.',
        },
        {
          term: 'Rome',
          detail:
            'The end of the road. Paul arrives in chains but preaches unhindered. Acts ends with him under house arrest, the gospel loose in the capital. The book closes on an open door.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'Acts is built around Jesus\` commission in 1:8: "You will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth." The book is the fulfillment of that sentence.',
      ],
      figures: [
        {
          art: `   PART ONE: JERUSALEM TO JUDEA (1–12)
   ─────────────────────────────────────
   1–2    Ascension, Pentecost, birth of the church
   3–5    Signs, opposition, growth
   6–7    Stephen and the expanding vision
   8      Samaria, the Ethiopian, Saul\`s persecution
   9      Saul\`s conversion, Peter\`s expanding ministry
   10–11  Cornelius: the Gentile door opens
   12     Herod\`s persecution, Peter\`s deliverance

   PART TWO: ANTIOCH TO ROME (13–28)
   ─────────────────────────────────────
   13–14  First missionary journey (Barnabas & Paul)
   15     Jerusalem Council: Gentiles welcomed
   16–18  Second journey (Silas & Paul, into Europe)
   19–20  Third journey (Ephesus, farewell to elders)
   21–23  Arrest in Jerusalem
   24–26  Trials before Felix, Festus, Agrippa
   27–28  Voyage to Rome, shipwreck, arrival`,
          caption: 'Two halves, one trajectory.',
        },
        {
          art: `   1:8 THE COMMISSION
     │
     ├──► JERUSALEM .............. chapters 1–7
     │
     ├──► JUDEA & SAMARIA ........ chapters 8–12
     │
     └──► ENDS OF THE EARTH ...... chapters 13–28`,
          caption: 'Jesus announces the outline; the Spirit fills it in.',
        },
      ],
      closing: [
        'Notice how the book ends: not with a conclusion but with a continuation. Paul is still preaching, still welcoming visitors, still proclaiming the kingdom. The story does not end because the mission does not end.',
      ],
    },

    // ---------------------------------------------------------------- epistles
    {
      id: 'epistles',
      heading: 'Acts & the Epistles',
      body: [
        'Acts provides the historical narrative behind many of Paul\`s letters. Corinth, Ephesus, Philippi, Thessalonica, Rome—these are not just names attached to New Testament books. We watch Paul enter these places, establish churches, leave them, and later write back to them.',
        'Acts tells the journey. The Epistles let us read the correspondence happening during that journey.',
      ],
      figures: [
        {
          art: `   EARLY CHURCH
   Acts 1–12 · AD 30–44
        │
        ▼
   FIRST JOURNEY
   Acts 13–14 · AD 46–48
        │
        └── GALATIANS? ............ ~AD 48–49
                                    dating debated
        │
        ▼
   JERUSALEM COUNCIL
   Acts 15 · ~AD 49
        │
        ▼
   SECOND JOURNEY
   Acts 15:36–18:22 · AD 49–52
        │
        ├── 1 THESSALONIANS ....... ~AD 50–51
        └── 2 THESSALONIANS ....... ~AD 51–52
        │
        ▼
   THIRD JOURNEY
   Acts 18:23–21:17 · AD 53–57
        │
        ├── 1 CORINTHIANS ......... ~AD 53–55
        ├── 2 CORINTHIANS ......... ~AD 55–56
        └── ROMANS ................ ~AD 56–57
        │
        ▼
   ARREST & TRIALS
   Acts 21–26 · AD 57–59
        │
        ▼
   VOYAGE TO ROME
   Acts 27 · AD 59–60
        │
        ▼
   ROME / IMPRISONMENT
   Acts 28 · AD 60–62
        │
        ├── PHILIPPIANS
        ├── PHILEMON
        ├── COLOSSIANS
        └── EPHESIANS ............. ~AD 60–62
        │
        ▼
   ─────────── ACTS ENDS ───────────
        │
        ▼
   LATER MINISTRY
   ~AD 62–65
        │
        ├── 1 TIMOTHY
        └── TITUS
        │
        ▼
   FINAL IMPRISONMENT
   ~AD 64–67
        │
        └── 2 TIMOTHY`,
          caption: 'Acts is the spine; the letters fit inside the journey.',
        },
      ],
      entries: [
        {
          term: 'Galatians',
          role: 'the debated placement',
          detail:
            'Galatians may be Paul\`s earliest surviving letter, possibly written around the first missionary journey or the Jerusalem Council. Its exact date is disputed. Its central conflict—whether Gentile believers must adopt Jewish law—directly overlaps the crisis seen in Acts 15.',
        },
        {
          term: 'Thessalonians',
          role: 'letters from the second journey',
          detail:
            'Acts 17 shows Paul preaching in Thessalonica and being forced to leave. During the same journey, while Paul is later in Corinth (Acts 18), he writes back to this young church. 1 and 2 Thessalonians come from this period.',
        },
        {
          term: 'Corinthians',
          role: 'letters to a church we watched begin',
          detail:
            'Acts 18 shows Paul arriving in Corinth and staying about eighteen months, establishing the church. Later, during the third journey, from Ephesus he writes 1 Corinthians (around Acts 19). After leaving Ephesus and traveling through Macedonia (Acts 20:1–2), he writes 2 Corinthians. We watched this church begin. The letters show what happened after Paul left.',
        },
        {
          term: 'Romans',
          role: 'written before Rome',
          detail:
            'Paul writes to Rome before he arrives there. Around Acts 20, while in Corinth near the end of the third journey, Paul writes to Christians in a city he has never visited. Soon afterward he returns to Jerusalem, is arrested, appeals to Caesar, and the final chapters of Acts narrate the chain of events that finally gets him to the city he had already written to.',
        },
        {
          term: 'The Prison Letters',
          role: 'letters from captivity',
          detail:
            'Philippians, Philemon, Colossians, and Ephesians are traditionally associated with Paul\`s imprisonment and are commonly placed around the Roman imprisonment described at the end of Acts (chapters 27–28).',
        },
        {
          term: 'The Pastoral Letters',
          role: 'after Acts',
          detail:
            '1 Timothy, Titus, and 2 Timothy do not fit inside the events narrated by Acts. Acts ends around Paul\`s first Roman imprisonment. The Pastorals reflect later ministry: 1 Timothy and Titus from a period of continued travel, and finally 2 Timothy from Paul\`s last imprisonment as he faces death.',
        },
      ],
      closing: [
        'Once you see this chronology, the New Testament connects. Acts 18 is no longer merely Paul\`s visit to Corinth—it is the beginning of the community that will later receive 1 and 2 Corinthians. Acts 17 gives Thessalonians a history. Acts 19 gives 1 Corinthians a location. Acts 20 places Romans on the road. Acts 28 gives the prison letters a world. Acts is the narrative map; the letters let us step inside the churches along the way.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'The Holy Spirit',
          definition:
            'The promised power, poured out at Pentecost, directing, empowering, and authenticating the mission.',
          appears:
            'Pentecost (ch. 2), Samaritan believers (ch. 8), Cornelius\`s household (ch. 10), Ephesian disciples (ch. 19), and constantly guiding decisions throughout.',
          matters:
            'Acts could be titled "The Acts of the Holy Spirit." Jesus ascends but does not abandon. He works through His Spirit in His people.',
        },
        {
          name: 'Witness',
          definition:
            'Testimony to what has been seen: the resurrection of Jesus and its implications.',
          appears:
            'The apostles\` primary role (1:8, 1:22), the content of every major speech, the reason for every journey.',
          matters:
            'The church does not invent a message; it reports an event. Witnesses tell what they have seen.',
        },
        {
          name: 'The Word of God',
          definition:
            'The message that spreads, grows, and prevails wherever it is proclaimed.',
          appears:
            '"The word of God continued to spread" (6:7, 12:24, 19:20). Progress reports punctuate the narrative.',
          matters:
            'Acts tracks the word more than the church. The word is the agent; people are the carriers.',
        },
        {
          name: 'Inclusion',
          definition:
            'The progressive opening of the door: Samaritans, an Ethiopian, a Roman centurion, the nations.',
          appears:
            'Philip in Samaria (ch. 8), Peter at Cornelius\`s house (ch. 10–11), the Jerusalem Council (ch. 15).',
          matters:
            'The question "who is in?" gets answered repeatedly. The answer is always: more than you thought.',
        },
        {
          name: 'Suffering',
          definition:
            'Persecution as the normal condition of the advancing church.',
          appears:
            'Arrests (ch. 4–5), Stephen\`s martyrdom (ch. 7), Herod\`s violence (ch. 12), Paul\`s beatings, stonings, imprisonments.',
          matters:
            'The gospel advances through opposition, not around it. Suffering does not stop the mission; it spreads it.',
        },
        {
          name: 'Prayer',
          definition:
            'The church\`s constant practice, preceding every major decision and breakthrough.',
          appears:
            'The upper room (ch. 1), Pentecost (ch. 2), Peter\`s release (ch. 12), sending missionaries (ch. 13), appointing elders (ch. 14).',
          matters:
            'The church does not plan its way forward; it prays its way forward. Prayer and the Spirit work together.',
        },
        {
          name: 'Boldness',
          definition:
            'Fearless proclamation in the face of threats, the Spirit\`s gift to the witnessing church.',
          appears:
            'Peter before the Sanhedrin (ch. 4), Stephen before his accusers (ch. 7), Paul in every city.',
          matters:
            'The same disciples who fled at Jesus\` arrest now refuse to be silenced. The Spirit produces courage.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Acts Sits in Scripture',
      entries: [
        {
          term: 'Luke\`s Gospel',
          detail:
            'Acts is volume two. Luke tells what Jesus began; Acts tells what He continues through His Spirit. Same author, same recipient, one continuous story.',
        },
        {
          term: 'The Old Testament',
          detail:
            'The speeches in Acts are saturated with Scripture. Peter at Pentecost quotes Joel and the Psalms. Stephen retells Israel\`s history. Paul reasons from the prophets. The new events fulfill ancient promises.',
        },
        {
          term: 'Paul\`s Letters',
          detail:
            'Acts provides the narrative that Paul\`s letters assume. Galatians, Thessalonians, Corinthians, Romans, the prison letters—all fit within the journey Acts describes. Read them together.',
        },
        {
          term: 'Revelation',
          detail:
            'Acts shows the church beginning; Revelation shows it ending. The lampstands, the witnesses, the Spirit speaking to the churches—all build on what Acts establishes.',
        },
      ],
      closing: [
        'Acts stands at the hinge of the New Testament. Before it, the Gospels. After it, the Letters and Revelation. Without Acts, the letters have no narrative context; the church appears from nowhere. Acts is the bridge.',
      ],
    },

    // ----------------------------------------------------------- speeches
    {
      id: 'speeches',
      heading: 'The Speeches',
      body: [
        'Luke records speeches at length—Peter at Pentecost, Stephen before the Sanhedrin, Paul at Pisidian Antioch, Athens, Miletus, and in Jerusalem. Together they constitute about a third of the book.',
      ],
      entries: [
        {
          term: 'Peter at Pentecost (2:14–41)',
          role: 'the first proclamation',
          detail:
            'The template for gospel preaching: Jesus\` life, death, resurrection, and exaltation, interpreted through Scripture, demanding repentance and faith.',
        },
        {
          term: 'Stephen (7:2–53)',
          role: 'the longest speech',
          detail:
            'A retelling of Israel\`s story—Abraham, Joseph, Moses, the tabernacle, the temple—building to an accusation: you always resist the Spirit.',
        },
        {
          term: 'Paul at Pisidian Antioch (13:16–41)',
          role: 'the synagogue template',
          detail:
            'Paul\`s proclamation to Jews: Israel\`s history, David\`s promise, Jesus\` fulfillment, forgiveness offered, rejection warned against.',
        },
        {
          term: 'Paul at Athens (17:22–31)',
          role: 'the Gentile template',
          detail:
            'No Scripture, only observation and reason: the unknown God, creation, human unity, the call to repentance, judgment by a risen man.',
        },
        {
          term: 'Paul at Miletus (20:17–35)',
          role: 'the pastoral farewell',
          detail:
            'Not evangelism but exhortation to elders: guard the flock, beware wolves, remember the pattern of ministry you saw.',
        },
      ],
      closing: [
        'The speeches show the gospel being contextualized. Peter speaks to Jews at Pentecost; Paul adjusts for Gentiles at Athens. The core is unchanged; the entry point shifts.',
      ],
    },

    // ----------------------------------------------------------------- spirit
    {
      id: 'spirit',
      heading: 'How the Spirit Works in This Book',
      body: [
        'The Spirit is the main character of Acts. Jesus promises Him (1:4–5). He falls at Pentecost (2:1–4). He directs Philip (8:29), Peter (10:19), the church at Antioch (13:2), Paul\`s journeys (16:6–7), and Paul\`s resolve (20:22–23).',
        'The Spirit\`s work in Acts is not private but public. He produces speech—prophecy, tongues, bold proclamation. He authenticates the word with signs. He breaks down barriers between Jew and Gentile. He is the agent of mission.',
      ],
      figures: [
        {
          art: `   PENTECOST ......... the Spirit falls on Jews
         │
   SAMARIA ........... the Spirit falls on Samaritans
         │
   CORNELIUS ......... the Spirit falls on Gentiles
         │
   EPHESUS ........... the Spirit falls on disciples of John

   Each event answers a question:
     Is this movement for Jews only? (no)
     For proper Jews only? (no)
     For proselytes only? (no)
     For those who know Jesus already? (no)`,
          caption: 'The Spirit\`s falling keeps expanding the circle.',
        },
      ],
      closing: [
        'The Spirit is not an impersonal force but a directing person. He speaks (13:2), forbids (16:6), testifies (20:23), appoints (20:28). The church follows His lead.',
      ],
    },

    // -------------------------------------------------------------- ending
    {
      id: 'ending',
      heading: 'The Open Ending',
      body: [
        'Acts ends without ending. Paul is under house arrest in Rome, welcoming all who come, preaching the kingdom, teaching about Jesus "with all boldness and without hindrance."',
        'No verdict, no martyrdom, no conclusion. Luke stops writing, but the story does not stop. The open ending is the point: the mission continues.',
      ],
      figures: [
        {
          art: `   "He proclaimed the kingdom of God
    and taught about the Lord Jesus Christ—
    with all boldness and without hindrance."
                                  — Acts 28:31

   The last word in Greek: akolytōs
   "unhindered"`,
          caption: 'The gospel cannot be stopped.',
        },
      ],
      closing: [
        'You are reading this book inside the continuation of that story. The Spirit who fell at Pentecost is still at work. The word that spread from Jerusalem is still spreading. The mission that reached Rome has not stopped.',
      ],
    },
  ],
};
