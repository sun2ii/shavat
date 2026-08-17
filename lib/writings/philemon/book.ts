import { BookOrientation } from '@/lib/types';

export const PHILEMON: BookOrientation = {
  slug: 'philemon',
  title: 'Philemon',
  subtitle: 'Slavery Subverted by the Gospel',
  scripture: 'Philemon 1–25',
  summary:
    'Paul\`s personal appeal to a slave owner to receive back his runaway slave, now a Christian brother, demonstrating how the gospel transforms social relationships.',

  sections: [
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Philemon is Paul\`s shortest letter, a single chapter of 25 verses. It is not addressed to a church but to an individual: Philemon, a wealthy Christian in Colossae who owned slaves. One of those slaves, Onesimus, had run away and somehow ended up with Paul in prison.',
        'During his time with Paul, Onesimus became a Christian. Now Paul faces a dilemma. Roman law required returning runaway slaves to their owners, and owners had the right to punish them severely, even to death. Paul sends Onesimus back but writes this letter asking Philemon to receive him not as a slave but as a beloved brother.',
        'The letter is a masterpiece of persuasion. Paul does not command but appeals. He does not condemn slavery outright but subverts it from within. If Onesimus is now Philemon\`s brother in Christ, how can Philemon treat him as mere property? The gospel logic undermines the institution itself.',
      ],
      figures: [
        {
          art: `  THE SITUATION
    │
    ├── PHILEMON
    │     │
    │     ├── Wealthy Christian in Colossae
    │     ├── House church meets in his home
    │     └── Owes his conversion to Paul
    │
    ├── ONESIMUS
    │     │
    │     ├── Philemon\`s slave
    │     ├── Ran away (possibly stole something)
    │     ├── Found Paul in prison
    │     └── Became a Christian
    │
    └── PAUL\`S REQUEST
          │
          ├── Receive Onesimus back
          ├── Not as a slave but as a brother
          ├── Charge any debt to Paul
          └── (Implied: free him?)`,
          caption: 'The triangle of relationships.',
        },
      ],
    },

    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'Slavery in the Roman Empire was pervasive. Perhaps a third of the population were slaves. They had no legal rights; their masters could punish them at will. Runaway slaves, if caught, faced severe penalties: branding, flogging, or crucifixion. Harboring a runaway was itself a crime.',
        'Paul writes from prison (likely Rome, though Ephesus is possible) and sends Onesimus back with this letter. He also sends Tychicus, who carries the letter to the Colossians (Colossians 4:7–9). The two letters were likely delivered together, with Onesimus himself as one of the carriers.',
        'Paul\`s approach is remarkable. He does not denounce slavery as an institution or call for abolition. Instead, he applies the gospel to a specific relationship: if Philemon and Onesimus are now brothers in Christ, the master-slave relationship cannot remain unchanged. Paul appeals to love, conscience, and Christian identity to transform the situation.',
      ],
      entries: [
        {
          term: 'Runaway slave',
          role: 'the legal situation',
          detail:
            'Under Roman law, slaves were property. Running away was theft of oneself from one\`s owner. Owners could pursue legal action or take personal vengeance. Paul is sending Onesimus back into potential danger.',
        },
        {
          term: 'The debt',
          role: 'the complication',
          detail:
            'Paul says "if he has wronged you at all, or owes you anything, charge that to my account." This suggests Onesimus may have stolen money when he fled. Paul offers to repay it personally.',
        },
        {
          term: 'Patronage',
          role: 'the social context',
          detail:
            'Roman society ran on patronage: powerful people obligating less powerful people through favors. Paul uses this language but subverts it: Philemon owes Paul his very self (his conversion), so Paul can "charge" Onesimus\`s debt to that account.',
        },
        {
          term: 'Manumission',
          role: 'the implied request',
          detail:
            'Freeing a slave was called manumission. Paul does not explicitly ask Philemon to free Onesimus, but his request to receive him "no longer as a slave but as a beloved brother" points in that direction. "Perhaps this is why he was parted from you for a while, that you might have him back forever."',
        },
      ],
    },

    {
      id: 'characters',
      heading: 'The People',
      body: [
        'The letter mentions several individuals, revealing a network of relationships around Philemon\`s household.',
      ],
      entries: [
        {
          term: 'Paul',
          role: 'prisoner and apostle',
          detail:
            'The author, identifying himself as "a prisoner for Christ Jesus." He emphasizes his chains, making his appeal carry the weight of his suffering. He is also Philemon\`s spiritual father.',
        },
        {
          term: 'Timothy',
          role: 'co-sender',
          detail:
            'Listed with Paul in the greeting, called "our brother." His presence adds weight to the appeal, though the letter is clearly Paul\`s personal work.',
        },
        {
          term: 'Philemon',
          role: 'the recipient',
          detail:
            'A wealthy Christian in Colossae, host of a house church, owner of at least one slave. Paul calls him "beloved fellow worker" and praises his love and faith. The whole letter is aimed at persuading him.',
        },
        {
          term: 'Apphia',
          role: 'probably Philemon\`s wife',
          detail:
            'Called "our sister," listed alongside Philemon. If she was his wife, she would have responsibility for household slaves and a stake in the decision about Onesimus.',
        },
        {
          term: 'Archippus',
          role: 'fellow soldier',
          detail:
            'Called "our fellow soldier," possibly Philemon\`s son or a church leader. Colossians 4:17 mentions him receiving a ministry to fulfill. His presence makes the appeal more public.',
        },
        {
          term: 'Onesimus',
          role: 'the runaway',
          detail:
            'Philemon\`s slave who fled, met Paul, and became a Christian. His name means "useful," and Paul puns on it: "Formerly he was useless to you, but now he is useful to you and to me." Paul calls him "my child" and "my very heart."',
        },
        {
          term: 'Epaphras',
          role: 'fellow prisoner',
          detail:
            'Mentioned in the greetings as "my fellow prisoner in Christ Jesus." He was from Colossae and likely founded the church there (Colossians 1:7). His presence connects this letter to Colossians.',
        },
        {
          term: 'Mark, Aristarchus, Demas, Luke',
          role: 'co-workers',
          detail:
            'Listed as "my fellow workers" in the closing greetings. The same group appears in Colossians 4:10–14, confirming the letters were sent together.',
        },
      ],
    },

    {
      id: 'places',
      heading: 'The Geography',
      body: [
        'The letter connects Paul\`s prison with the household in Colossae.',
      ],
      figures: [
        {
          art: `                PAUL\`S PRISON
              (Rome? Ephesus? Caesarea?)
                        │
                        │ Letter sent with
                        │ Tychicus and Onesimus
                        │
                        ▼
                    COLOSSAE
                        │
              ┌─────────┴─────────┐
              │                   │
         PHILEMON\`S          THE CHURCH
          HOUSEHOLD          (meets there)
              │
              └── Onesimus returns`,
          caption: 'The letter\`s journey.',
        },
      ],
      entries: [
        {
          term: 'Colossae',
          detail:
            'A city in the Lycus Valley of Asia Minor (modern Turkey), near Laodicea and Hierapolis. Paul apparently never visited it; the church was founded by Epaphras. Philemon\`s house church met there.',
        },
        {
          term: 'Paul\`s prison',
          detail:
            'The traditional view is Rome, fitting the reference to "Caesar\`s household" in the parallel letter to Philippians. But Ephesus, much closer to Colossae, is also possible. The proximity would make the back-and-forth more plausible.',
        },
      ],
    },

    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'The letter follows ancient letter conventions but is shaped entirely by persuasion.',
      ],
      figures: [
        {
          art: `   GREETING (1–3)
   ──────────────────────
   Paul and Timothy to Philemon, Apphia, Archippus, and the church

   THANKSGIVING (4–7)
   ──────────────────────
   Philemon\`s love and faith
   "the hearts of the saints have been refreshed through you"

   THE APPEAL (8–21)
   ──────────────────────
   v.8–9   I could command, but I appeal
   v.10–11 Onesimus is now my child, useful
   v.12–14 I am sending him back, my very heart
   v.15–16 Receive him as a brother, not a slave
   v.17–19 Charge any debt to me; you owe me yourself
   v.20–21 Refresh my heart; I know you will do more

   CLOSING (22–25)
   ──────────────────────
   Prepare a guest room; I hope to visit
   Greetings from fellow workers
   Grace`,
          caption: 'A letter built around a single request.',
        },
      ],
    },

    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Brotherhood in Christ',
          definition:
            'The new identity that transcends social status.',
          appears:
            '"No longer as a bondservant but more than a bondservant, as a beloved brother" (v.16).',
          matters:
            'If Onesimus is Philemon\`s brother in the Lord, the master-slave relationship cannot continue unchanged. The gospel creates new relationships.',
        },
        {
          name: 'Persuasion over Command',
          definition:
            'Paul appeals to conscience rather than commanding obedience.',
          appears:
            '"Though I am bold enough in Christ to command you to do what is required, yet for love\`s sake I prefer to appeal to you" (v.8–9).',
          matters:
            'Paul models leadership that respects the other\`s agency. He wants Philemon\`s willing consent, not grudging compliance.',
        },
        {
          name: 'Reconciliation',
          definition:
            'Restoring broken relationships through the gospel.',
          appears:
            'The entire letter is about reconciling Onesimus and Philemon, now on new terms.',
          matters:
            'The gospel that reconciles us to God also reconciles us to one another. Paul mediates between the two.',
        },
        {
          name: 'Useful Service',
          definition:
            'The transformation that makes someone truly valuable.',
          appears:
            '"Formerly he was useless to you, but now he is useful to you and to me" (v.11).',
          matters:
            'The name Onesimus means "useful." Paul\`s pun suggests that conversion made him what his name promised. True usefulness comes from new life in Christ.',
        },
      ],
    },

    {
      id: 'connections',
      heading: 'Where Philemon Sits in Scripture',
      entries: [
        {
          term: 'Colossians',
          detail:
            'Written and sent at the same time. Colossians 4:9 mentions that Onesimus is accompanying Tychicus. The same co-workers are listed in both letters\` greetings. Reading them together illuminates both.',
        },
        {
          term: 'Galatians',
          detail:
            '"There is neither slave nor free... for you are all one in Christ Jesus" (Galatians 3:28). Philemon is the practical application: what does that unity mean for an actual slave and master?',
        },
        {
          term: '1 Corinthians',
          detail:
            '"Were you a bondservant when called? Do not be concerned about it. But if you can gain your freedom, avail yourself of the opportunity" (7:21). Paul encourages freedom but does not require revolution.',
        },
        {
          term: 'Ephesians',
          detail:
            'Ephesians 6:5–9 addresses slaves and masters directly, calling for mutual respect and reminding masters that they too have a Master in heaven. Philemon embodies this teaching.',
        },
      ],
    },

    {
      id: 'slavery',
      heading: 'Paul and Slavery',
      body: [
        'Philemon raises the question of why Paul did not simply condemn slavery. Modern readers expect a prophetic denunciation, but Paul takes a different approach.',
      ],
      figures: [
        {
          art: `   WHAT PAUL DOES NOT DO
   ──────────────────────
   • Denounce slavery as an institution
   • Call for abolition
   • Command Philemon to free Onesimus

   WHAT PAUL DOES
   ──────────────────────
   • Apply the gospel to a specific relationship
   • Assert Onesimus\`s new identity as brother
   • Appeal to Philemon\`s conscience and love
   • Imply that freedom is the appropriate response
   • Make the slave-owner structure untenable

   THE EFFECT
   ──────────────────────
   If consistently applied, Paul\`s logic
   undermines slavery from within:
   You cannot own your brother.`,
          caption: 'Subversion rather than revolution.',
        },
      ],
      closing: [
        'Paul\`s approach has been criticized as insufficient and praised as strategic. He did not have the power to abolish a Roman institution, but he planted seeds that would eventually grow. When abolitionists later argued against slavery, they appealed to texts like Philemon: how can you enslave someone who is your brother in Christ?',
      ],
    },

    {
      id: 'why',
      heading: 'Why Philemon Matters',
      body: [
        'This tiny letter shows the gospel working at the most personal level. It is not a treatise on social ethics but a real intervention in a real situation. Paul is risking his relationship with both men, asking something costly of Philemon and sending Onesimus into danger.',
        'The letter models Christian persuasion. Paul has authority to command but chooses to appeal. He builds his case on shared faith, mutual obligation, and transformed identity. He trusts Philemon to do the right thing and says so: "Confident of your obedience, I know that you will do even more than I say."',
        'Philemon also shows that the gospel cannot be privatized. If Christ has made Onesimus a new person, that new identity must be recognized in his social relationships. Faith is not a private affair between the soul and God; it transforms how we treat one another.',
        'The question the letter asks is still relevant: if we are brothers and sisters in Christ, what social distinctions should that change? What relationships should be transformed? What "Onesimuses" are we being asked to receive not as inferiors but as beloved family?',
      ],
    },
  ],
};
