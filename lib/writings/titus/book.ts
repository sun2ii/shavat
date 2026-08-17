import { BookOrientation } from '@/lib/types';

export const TITUS: BookOrientation = {
  slug: 'titus',
  title: 'Titus',
  subtitle: 'Sound Doctrine, Good Works',
  scripture: 'Titus 1–3',
  summary:
    'Paul\`s instructions to Titus for establishing church order in Crete, emphasizing that sound doctrine produces godly living and good works.',
  place: { city: 'Costa Rica', vibe: 'distinct regional culture, communities needing organization' },

  sections: [
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Titus is the shortest of the three Pastoral Epistles, a compact letter about church organization. Paul has left Titus in Crete to "put what remained into order" and appoint elders in every town. The Cretan situation is rough: false teachers, rebellious people, and a cultural reputation for dishonesty.',
        'Like 1 Timothy, Titus provides qualifications for elders and warnings against false teaching. But Titus has a distinctive emphasis on "good works." The phrase appears repeatedly: believers are to be "zealous for good works," "ready for every good work," "devoted to good works." Sound doctrine produces visible godliness.',
        'The letter contains one of the most beautiful summary statements of the gospel (2:11–14) and another of salvation by grace (3:4–7). These theological gems are embedded in practical instructions, showing that doctrine and life are inseparable.',
      ],
      figures: [
        {
          art: `  THE SITUATION
    │
    ├── PAUL HAS VISITED CRETE
    │     └── Left Titus to complete the work
    │
    ├── THE TASK
    │     │
    │     ├── Appoint elders in every town
    │     ├── Confront false teachers
    │     └── Teach what accords with sound doctrine
    │
    └── THE CRETAN CHALLENGE
          │
          ├── "Cretans are always liars, evil beasts, lazy gluttons"
          │    (quoting their own prophet)
          │
          └── Rebellious people, especially "the circumcision party"`,
          caption: 'Why Titus was left in Crete.',
        },
      ],
    },

    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Crete is a large island in the eastern Mediterranean, with a long history going back to Minoan civilization. By Roman times it was a province known for its rough population. Acts 27 mentions Paul sailing past Crete on his way to Rome, but that was as a prisoner; he had no opportunity for ministry.',
        'The letter assumes a setting after Acts ends, when Paul was free to travel and evangelize. He apparently visited Crete with Titus, established churches, and left Titus to complete the organization. This would place the letter around AD 62–65, similar to 1 Timothy.',
        'The false teachers in Crete seem to be Jewish Christians emphasizing circumcision, genealogies, and "commands of people who turn away from the truth." They are "upsetting whole families" and must be silenced. Titus must rebuke them sharply.',
      ],
      entries: [
        {
          term: 'Crete',
          role: 'the mission field',
          detail:
            'A large Mediterranean island with many towns. Paul and Titus had established churches there, but they needed to be organized with qualified elders. The Cretan population had a reputation for dishonesty, making the church\`s witness all the more important.',
        },
        {
          term: 'The circumcision party',
          role: 'the troublemakers',
          detail:
            'Jewish Christians insisting on circumcision and Jewish observances. They were "teaching for shameful gain what they ought not to teach," upsetting whole families. Paul says they must be silenced.',
        },
        {
          term: 'Epimenides',
          role: 'the Cretan prophet',
          detail:
            'Paul quotes "one of the Cretans, a prophet of their own": "Cretans are always liars, evil beasts, lazy gluttons." This is attributed to the 6th-century BC poet Epimenides. Paul says the testimony is true and instructs Titus to rebuke them sharply.',
        },
        {
          term: 'Good works',
          role: 'the emphasis',
          detail:
            'A distinctive theme in Titus. Believers are to be "zealous for good works" (2:14), "ready for every good work" (3:1), "devoted to good works" (3:8, 14). Sound doctrine produces visible godliness.',
        },
      ],
    },

    {
      id: 'characters',
      heading: 'The People',
      body: [
        'Titus mentions fewer individuals than 1 Timothy but reveals key relationships.',
      ],
      entries: [
        {
          term: 'Paul',
          role: 'apostle and mentor',
          detail:
            'The author, describing himself as "a servant of God and an apostle of Jesus Christ." He writes with authority, giving Titus instructions to be implemented.',
        },
        {
          term: 'Titus',
          role: 'delegate in Crete',
          detail:
            'Paul\`s "true child in a common faith." Titus was a Gentile convert who accompanied Paul to the Jerusalem council and was not compelled to be circumcised (Gal 2:1–5). He later served as Paul\`s envoy to Corinth. Now he is establishing churches in Crete.',
        },
        {
          term: 'Artemas or Tychicus',
          role: 'potential replacements',
          detail:
            'Paul plans to send one of them to relieve Titus so he can join Paul in Nicopolis for the winter (3:12). Tychicus is known from Ephesians and Colossians; Artemas appears only here.',
        },
        {
          term: 'Zenas and Apollos',
          role: 'traveling ministers',
          detail:
            'Paul asks Titus to help them on their journey, making sure they lack nothing (3:13). Apollos is known from Acts and 1 Corinthians; Zenas is called "the lawyer" and appears only here.',
        },
        {
          term: 'Older men, older women, young women, young men, slaves',
          role: 'the groups',
          detail:
            'Titus 2 provides instructions for each group in the church. The concern is that their conduct "adorn the doctrine of God our Savior."',
        },
      ],
    },

    {
      id: 'places',
      heading: 'The Geography',
      body: [
        'The letter connects Crete with Paul\`s ongoing travel plans.',
      ],
      figures: [
        {
          art: `              MEDITERRANEAN SEA
                        │
              ┌─────────┴─────────┐
              │                   │
           CRETE              NICOPOLIS
      (Titus\`s location)    (Paul\`s winter
              │                destination)
              │
       "every town"
    (appoint elders)`,
          caption: 'Crete and Paul\`s plans.',
        },
      ],
      entries: [
        {
          term: 'Crete',
          detail:
            'A large Mediterranean island, about 160 miles long. Paul and Titus had planted churches in multiple towns, and Titus was to appoint elders "in every town."',
        },
        {
          term: 'Nicopolis',
          detail:
            'Paul\`s intended winter destination, where Titus should join him after being relieved. There were several cities named Nicopolis; this is likely the one on the western coast of Greece.',
        },
      ],
    },

    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The letter is brief but well-organized.',
      ],
      figures: [
        {
          art: `   GREETING (1:1–4)
   ──────────────────────────────
   Paul to Titus, my true child

   APPOINTING ELDERS (1:5–9)
   ──────────────────────────────
   The task: appoint elders in every town
   Qualifications: above reproach, holding firm to the word

   CONFRONTING FALSE TEACHERS (1:10–16)
   ──────────────────────────────
   The problem: rebellious people, circumcision party
   The solution: rebuke them sharply, silence them

   TEACHING SOUND DOCTRINE (2:1–15)
   ──────────────────────────────
   Older men, older women, young women, young men
   Titus himself: a model
   Slaves: adorning the doctrine
   THE GRACE THAT TRAINS (2:11–14)

   DOING GOOD WORKS (3:1–11)
   ──────────────────────────────
   Submit to authorities, ready for good works
   THE KINDNESS THAT SAVED (3:4–7)
   Avoid foolish controversies
   Warn divisive people

   CLOSING (3:12–15)
   ──────────────────────────────
   Travel plans, greetings, grace`,
          caption: 'Elders, false teachers, sound doctrine, good works.',
        },
      ],
    },

    {
      id: 'elders',
      heading: 'Elder Qualifications',
      body: [
        'Titus 1:5–9 provides qualifications for elders similar to 1 Timothy 3, with some distinctive emphases.',
      ],
      figures: [
        {
          art: `   QUALIFICATIONS FOR ELDERS (1:5–9)
   ──────────────────────────────

   PERSONAL CHARACTER
   • Above reproach
   • Husband of one wife
   • Not arrogant, not quick-tempered
   • Not a drunkard, not violent
   • Not greedy for gain

   POSITIVE QUALITIES
   • Hospitable
   • A lover of good
   • Self-controlled
   • Upright
   • Holy
   • Disciplined

   DOCTRINAL ABILITY
   • Holds firm to the trustworthy word
   • Able to give instruction in sound doctrine
   • Able to rebuke those who contradict it

   FAMILY MANAGEMENT
   • Children are believers
   • Children not open to the charge of debauchery or insubordination`,
          caption: 'Character, virtue, and teaching ability.',
        },
      ],
    },

    {
      id: 'gospel',
      heading: 'The Gospel Statements',
      body: [
        'Titus contains two of the most beautiful summary statements of the gospel in Paul\`s letters.',
      ],
      figures: [
        {
          art: `   TITUS 2:11–14 — THE GRACE THAT TRAINS
   ──────────────────────────────
   "For the grace of God has appeared,
    bringing salvation for all people,

    training us to renounce ungodliness
    and worldly passions,

    and to live self-controlled, upright,
    and godly lives in the present age,

    waiting for our blessed hope,
    the appearing of the glory of
    our great God and Savior Jesus Christ,

    who gave himself for us to redeem us
    from all lawlessness and to purify for himself
    a people for his own possession
    who are zealous for good works."


   TITUS 3:4–7 — THE KINDNESS THAT SAVED
   ──────────────────────────────
   "But when the goodness and loving kindness
    of God our Savior appeared,

    he saved us, not because of works
    done by us in righteousness,

    but according to his own mercy,

    by the washing of regeneration
    and renewal of the Holy Spirit,

    whom he poured out on us richly
    through Jesus Christ our Savior,

    so that being justified by his grace
    we might become heirs
    according to the hope of eternal life."`,
          caption: 'Two gospel summaries embedded in practical instruction.',
        },
      ],
    },

    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Sound Doctrine',
          definition:
            'Healthy teaching that produces godly living.',
          appears:
            '"Teach what accords with sound doctrine" (2:1); "a trustworthy word" (1:9); "the doctrine of God our Savior" (2:10).',
          matters:
            'Doctrine and life are inseparable. Sound doctrine adorns the faith when lived out.',
        },
        {
          name: 'Good Works',
          definition:
            'Visible acts of godliness that result from salvation.',
          appears:
            '"Zealous for good works" (2:14); "ready for every good work" (3:1); "devote themselves to good works" (3:8, 14).',
          matters:
            'Grace trains us to live differently. The redeemed life is characterized by good works, not as the cause of salvation but as its fruit.',
        },
        {
          name: 'Grace that Trains',
          definition:
            'God\`s grace not only saves but also transforms.',
          appears:
            '"The grace of God has appeared... training us to renounce ungodliness" (2:11–12).',
          matters:
            'Grace is not passive. It actively teaches and shapes believers to live godly lives.',
        },
        {
          name: 'Adorning the Doctrine',
          definition:
            'Living in a way that makes the gospel attractive.',
          appears:
            '"So that in everything they may adorn the doctrine of God our Savior" (2:10).',
          matters:
            'Conduct either recommends or discredits the faith. Slaves are to live so that unbelievers see the gospel\`s beauty.',
        },
        {
          name: 'Rebuke Sharply',
          definition:
            'Confronting false teachers with clarity and authority.',
          appears:
            '"Rebuke them sharply, that they may be sound in the faith" (1:13); "exhort and rebuke with all authority" (2:15).',
          matters:
            'Not all errors can be tolerated. Some require sharp correction. Titus must not be passive.',
        },
      ],
    },

    {
      id: 'connections',
      heading: 'Where Titus Sits in Scripture',
      entries: [
        {
          term: '1 Timothy',
          detail:
            'Written around the same time, addressing similar issues but in Ephesus. Both provide elder qualifications and warn against false teachers. 1 Timothy is longer and more detailed.',
        },
        {
          term: '2 Timothy',
          detail:
            'Written later, when Paul is imprisoned and expecting death. 2 Timothy is more personal and urgent. Titus is organizational; 2 Timothy is testamental.',
        },
        {
          term: 'Galatians',
          detail:
            'Titus himself appears in Galatians 2:1–5 as the Gentile test case who was not compelled to be circumcised. The circumcision party in Crete is the same sort of opponents.',
        },
        {
          term: '2 Corinthians',
          detail:
            'Titus served as Paul\`s envoy to Corinth, carrying letters and negotiating reconciliation (2 Cor 2:13; 7:6–7, 13–15; 8:6, 16–24). He was trusted with difficult assignments.',
        },
      ],
    },

    {
      id: 'why',
      heading: 'Why Titus Matters',
      body: [
        'Titus shows what healthy churches need: qualified leaders, sound teaching, and visible godliness. The formula is simple but demanding. Elders must hold firm to the word and be able to teach it. The congregation must live in ways that "adorn the doctrine."',
        'The letter refuses to separate doctrine from ethics. Sound teaching produces good works. Grace trains us to renounce ungodliness. The gospel is not just believed; it is lived. When Paul describes salvation, he immediately connects it to "a people zealous for good works."',
        'The Cretan context is challenging. The population has a reputation for dishonesty; the church must be different. False teachers are upsetting families; they must be silenced. Young churches need structure and clear teaching. Titus is to provide both.',
        'The gospel statements in chapters 2 and 3 are worth memorizing. They capture the full sweep of salvation: grace appearing, training us, awaiting the blessed hope. Not by works we have done, but by mercy, through regeneration and renewal, poured out richly. These are among Paul\`s most compact and beautiful summaries of what God has done in Christ.',
      ],
    },
  ],
};
