import { BookOrientation } from '@/lib/types';

/**
 * The orientation for Ruth: the ground a reader should be standing on before
 * the first verse. Terrain, then context, then people, places, and structure —
 * detail only after the shape is stable.
 */
export const RUTH: BookOrientation = {
  slug: 'ruth',
  title: 'Ruth',
  subtitle: 'Covenant Faithfulness in the Days of the Judges',
  scripture: 'Ruth 1–4',
  summary:
    'A quiet story of covenant faithfulness through which God preserves the line of David.',

  sections: [
    // ---------------------------------------------------------------- terrain
    {
      id: 'terrain',
      heading: 'The Terrain',
      body: [
        'Ruth is four chapters long and moves in one unbroken direction: out of fullness into emptiness, and back again. Everything the book will say is already visible in that motion. A family leaves the house of bread because there is no bread. Three men die. Two widows stand on a road. One of them turns back and one of them goes forward, and the whole of Israel’s future runs through the one who goes forward.',
        'Read the shape first. The details are easier to hold once you know where the ground slopes.',
      ],
      figures: [
        {
          art: `  FAMINE
    │
    ▼
  MOAB ............ ten years, three graves
    │
    ▼
  LOSS ............ Naomi is emptied
    │
    ▼
  RETURN .......... Ruth clings, Orpah turns back
    │
    ▼
  HARVEST ......... barley in Bethlehem
    │
    ▼
  PROVISION ....... gleaning in the field of Boaz
    │
    ▼
  REDEMPTION ...... the sandal at the gate
    │
    ▼
  OBED ............ a son born to Naomi
    │
    ▼
  DAVID ........... the king the famine nearly cost`,
          caption: 'The whole book, top to bottom.',
        },
      ],
    },

    // ---------------------------------------------------------------- context
    {
      id: 'context',
      heading: 'Historical Context',
      body: [
        'The first sentence sets the clock: “in the days when the judges ruled.” That single phrase does most of the work. The era it names is the one described in the book of Judges — generations of covenant collapse, tribal fracture, foreign oppression, and cycles that end lower than they began. Judges closes with a line that functions as a verdict: everyone did what was right in his own eyes.',
        'Ruth is set inside that same era, and it is the reason the book matters. Judges shows what Israel looked like from above — a nation coming apart. Ruth shows what the same years looked like from inside one household in one town. The contrast is deliberate. There are no armies here, no oppressors, no deliverers raised up with the Spirit rushing on them. There is a widow, a field, a harvest, and a series of decisions that no one but God is watching.',
        'The two books also share a setting. The final chapters of Judges tell a bleak story that begins with a Levite and a woman from Bethlehem in Judah and ends in civil war. Ruth begins in the same town and moves the other way. Same era, same road, opposite direction.',
      ],
      entries: [
        {
          term: 'Bethlehem',
          role: 'house of bread',
          detail:
            'A small town in Judah, six miles south of Jerusalem, sitting on farmland. Its name means house of bread, which is why the book opens with an irony it never explains: there is famine in the house of bread. Bethlehem is where the story starts, where it returns, and where it ends — and it is the town the rest of Scripture will keep coming back to.',
        },
        {
          term: 'Moab',
          role: 'across the Salt Sea',
          detail:
            'The high plateau east of the Dead Sea. Moab descends from Lot (Genesis 19:37), which makes it kin to Israel and outside the covenant at once. Relations were long hostile, and the law had ruled Moab out of the assembly (Deuteronomy 23:3). To an Israelite ear, “Ruth the Moabitess” — a phrase the narrator repeats rather than drops — is not a neutral description. It is the tension the book is built on.',
        },
        {
          term: 'The harvest',
          role: 'barley, then wheat',
          detail:
            'Naomi and Ruth reach Bethlehem at the beginning of the barley harvest, and chapters 2 through 4 unfold across the weeks that run from barley into wheat — roughly late spring. Harvest is not scenery. It is the season when the covenant law made the poor visible: the corners of the field and whatever the reapers dropped belonged to the widow, the orphan, and the foreigner (Leviticus 19:9–10, Deuteronomy 24:19–21). Ruth is not begging in chapter 2. She is exercising a right the law gave her.',
        },
        {
          term: 'The covenant background',
          role: 'law behind the plot',
          detail:
            'Three provisions carry the story. Gleaning feeds Ruth in chapter 2. Land redemption — the duty of a kinsman to buy back a family’s forfeited inheritance (Leviticus 25:25) — is what Naomi is counting on in chapter 3. Levirate marriage, the obligation to raise up a son for a dead brother, with the removed sandal marking a refusal (Deuteronomy 25:5–10), is what settles the matter in chapter 4. None of this is explained to the reader; the book assumes it. Knowing it turns chapter 4 from a legal curiosity into a rescue.',
        },
      ],
    },

    // ------------------------------------------------------------- characters
    {
      id: 'characters',
      heading: 'The People',
      figures: [
        {
          art: `      ELIMELECH ═════ NAOMI
                        │
             ┌──────────┴──────────┐
          MAHLON                KILION
             ║                     ║
           RUTH                  ORPAH
         (of Moab)             (of Moab)
             │
             │  all three men are dead by verse 5
             ▼
      the nearer kinsman ── declines ──┐
                                       │
                         RUTH ═══════ BOAZ
                                 │
                               OBED
                                 │
                               JESSE
                                 │
                               DAVID`,
          caption: 'Two households, joined where the first one ended.',
        },
      ],
      entries: [
        {
          term: 'Elimelech',
          role: 'the departure',
          detail:
            'Naomi’s husband, an Ephrathite of Bethlehem. His name means “my God is king,” and he is the man who leaves the land of the covenant when the covenant land fails. He dies in Moab in the fourth verse. His absence is the hole the rest of the book fills — the field that must be redeemed is his.',
        },
        {
          term: 'Naomi',
          role: 'the emptied one',
          detail:
            'The book’s center of gravity. She goes out full and comes back empty, and she says so plainly: do not call me Naomi, pleasant, call me Mara, bitter. She is not corrected for it. Her grief is allowed to stand for three chapters, and the last chapter answers it without ever arguing with it — the women of the town put a child in her lap and say a son has been born to Naomi.',
        },
        {
          term: 'Mahlon and Kilion',
          role: 'the two sons',
          detail:
            'Naomi’s sons, who marry Moabite women and die in Moab after about ten years, childless. They are barely characters; they are a closed door. Mahlon, named in chapter 4 as Ruth’s first husband, is the man whose name Boaz undertakes to raise up over the inheritance.',
        },
        {
          term: 'Ruth',
          role: 'the one who clings',
          detail:
            'A Moabite widow with no obligation to Naomi and nothing to gain by staying. Her vow on the road — your people shall be my people, and your God my God — is the book’s hinge, and it is spoken before there is any Boaz, any field, any prospect. She then works. Nearly everything else she is praised for in the book is work: gleaning from morning until evening, going to the floor at midnight, carrying six measures of barley home in the dark.',
        },
        {
          term: 'Orpah',
          role: 'the reasonable choice',
          detail:
            'Ruth’s sister-in-law, who kisses Naomi and goes back to her mother’s house. She is not condemned. She does exactly what Naomi tells her to do and what any sensible woman would do, and she exists so that Ruth’s decision can be seen for what it is: not the obvious path, but one of two real options.',
        },
        {
          term: 'Boaz',
          role: 'the redeemer',
          detail:
            'A worthy man of Elimelech’s clan, introduced the moment before Ruth needs him. He is generous before he is obligated — extra grain, water, a place at the meal, a warning to his young men — and he acts within the law rather than around it, taking the case to the gate and letting the nearer kinsman answer first. He calls Ruth a worthy woman, using the same word the narrator used of him.',
        },
        {
          term: 'The nearer kinsman',
          role: 'the unnamed one',
          detail:
            'A closer relative with the first right to redeem, and the first refusal. He will take the field until he learns the widow comes with it, then withdraws to protect his own inheritance. The narrator never gives him a name. In a book that ends with ten of them in a row, that is the judgment.',
        },
        {
          term: 'Obed',
          role: 'the answer',
          detail:
            'The son of Boaz and Ruth. His name means “servant,” and the women of Bethlehem name him — reckoning him to Naomi, not to his mother. He is the restoration of a house that had no one left to carry it.',
        },
        {
          term: 'Jesse and David',
          role: 'the horizon',
          detail:
            'Obed’s son and grandson. David is the last word of the book, and until he arrives the reader has no way of knowing how large this small story has been. A famine in chapter 1 nearly ended the line that produces Israel’s king.',
        },
      ],
    },

    // ----------------------------------------------------------------- places
    {
      id: 'places',
      heading: 'The Places',
      figures: [
        {
          art: `        ┌────── famine drives them out ──────┐
        │                                    │
        │                                    ▼
   BETHLEHEM                                MOAB
   house of bread                    east of the Salt Sea
   Judah, inside the covenant        Lot's line, outside it
        ▲                                    │
        │                                    │
        └────── the harvest calls them ──────┘`,
          caption: 'The book is a circle. It ends where it began, changed.',
        },
      ],
      entries: [
        {
          term: 'Bethlehem, at the start',
          detail:
            'A town with no bread. The land of promise is not producing, and a family concludes it can do better elsewhere. Every loss in chapter 1 follows from that departure, though the narrator never says so.',
        },
        {
          term: 'Moab',
          detail:
            'Safety, and then a graveyard. Moab keeps the family alive and takes the family apart. It is also where Ruth is from — the place outside the covenant that supplies the woman through whom the covenant continues. The book will not let Moab be simply the wrong country.',
        },
        {
          term: 'The road back',
          detail:
            'The most important scene in the book happens on open ground between two countries, with no property, no witnesses, and nothing to inherit. Three widows stand there and each one decides what she belongs to. Everything afterward is consequence.',
        },
        {
          term: 'The field',
          detail:
            'Daylight, public, lawful. Ruth arrives in the field of Boaz by what the text calls chance, and the whole rest of the book grows out of that ordinary morning of work.',
        },
        {
          term: 'The threshing floor',
          detail:
            'Midnight, private, risky. A hard scene, told with unusual restraint. Ruth asks Boaz to do what he has already blessed God for doing — to spread his covering over her — and he answers by naming the legal obstacle and promising to clear it.',
        },
        {
          term: 'The gate',
          detail:
            'Morning, public, final. The gate is where a town does business and settles claims before witnesses. Nothing in Ruth is resolved in private. The redemption is legal, witnessed, and blessed out loud by the elders.',
        },
      ],
    },

    // -------------------------------------------------------------- structure
    {
      id: 'structure',
      heading: 'Literary Structure',
      body: [
        'Four chapters, four movements, one location apiece. The book is built with a symmetry that a reader can feel before naming: the emptying of chapter 1 is answered by the filling of chapter 4, and the two middle chapters mirror each other as day and night, public and private, a man noticing a woman and a woman claiming a man.',
      ],
      figures: [
        {
          art: `   CH 1        CH 2          CH 3          CH 4
   LOSS   ──►  PROVISION ──►  PROMISE  ──►  REDEMPTION
   the road    the field      the floor     the gate
   emptied     sustained      claimed       restored`,
          caption: 'The four movements.',
        },
        {
          art: `   CH 1  emptying  ◄──────────────────►  CH 4  filling
   three graves                            one cradle
   two women leave Moab                    a town blesses a house

          CH 2  the field  ◄────►  CH 3  the floor
          daylight, public         midnight, private
          Boaz notices Ruth        Ruth asks Boaz`,
          caption: 'The mirror. The outer chapters answer each other; so do the inner.',
        },
        {
          art: `   CH 1   road out ──► three graves ──► road back ──► "call me Mara"
   CH 2   the field ──► noticed ──► favor ──► "he is one of our redeemers"
   CH 3   the plan ──► midnight ──► the claim ──► six measures of barley
   CH 4   the gate ──► the sandal ──► the witnesses ──► the genealogy`,
          caption: 'Each chapter in four beats.',
        },
      ],
      closing: [
        'Notice that every chapter ends by pointing forward. Chapter 1 ends at the beginning of barley harvest. Chapter 2 ends with Ruth staying through the wheat harvest. Chapter 3 ends with Boaz saying the man will not rest until he has settled it today. The book never lingers, and it never explains itself. It puts one thing after another and lets the reader see the pattern late — which is exactly how the providence it describes is experienced.',
      ],
    },

    // ----------------------------------------------------------------- themes
    {
      id: 'themes',
      heading: 'Major Themes',
      themes: [
        {
          name: 'Hesed',
          definition:
            'Covenant loyalty — kindness that is owed to no one and given anyway, and then kept.',
          appears:
            'Naomi blesses her daughters-in-law for it (1:8); Boaz names it in Ruth twice (2:11–12, 3:10); it is the one quality the book praises in every direction, including God’s.',
          matters:
            'It is the book’s single organizing virtue. Every character is measured by whether they extend it beyond obligation, and God’s dealings with Israel are described with the same word.',
        },
        {
          name: 'Faithfulness',
          definition: 'Staying, when leaving is permitted and would cost nothing.',
          appears:
            'Ruth’s vow on the road, and then her work: the field, the floor, the years. Boaz’s refusal to shortcut the nearer kinsman’s right.',
          matters:
            'In the era of Judges, no one keeps anything. Ruth is a book about two people who keep what they were not required to keep, and about how much turns out to hang on that.',
        },
        {
          name: 'Providence',
          definition:
            'God governing the ordinary — the harvest, the timing, the field a woman happens into.',
          appears:
            'Chapter 2 verse 3, where Ruth’s chance brings her to the field of Boaz, and every arrival that is exactly on time thereafter.',
          matters:
            'The book’s claim is not that God intervenes but that God is never absent. What looks like coincidence from inside is a line, seen from the end.',
        },
        {
          name: 'Redemption',
          definition:
            'A kinsman paying to restore what a family has lost — land, name, future.',
          appears:
            'Named first by Naomi in 2:20, requested at the floor in 3:9, transacted at the gate in 4:1–10.',
          matters:
            'It is the mechanism by which everything empty in chapter 1 is refilled. Redemption in Ruth is not sentiment; it is price, right, and public record.',
        },
        {
          name: 'Harvest',
          definition: 'The season, and the book’s clock and its argument at once.',
          appears:
            'From the last verse of chapter 1 to the marriage in chapter 4; barley into wheat.',
          matters:
            'The famine that opens the book and the harvest that fills it are the same land under the same God. The reversal is agricultural before it is personal.',
        },
        {
          name: 'Belonging',
          definition:
            'Being counted among a people you were not born into.',
          appears:
            'Ruth’s vow (1:16), Boaz’s blessing about wings of refuge (2:12), the elders’ blessing naming her with Rachel and Leah (4:11).',
          matters:
            'A Moabite is drawn into Israel not by exception but by covenant loyalty, and the book records it in the genealogy of the king without apology.',
        },
        {
          name: 'Emptiness and fullness',
          definition:
            'The book’s own vocabulary for what it is doing — Naomi’s words, adopted by the narrator.',
          appears:
            '“I went out full, and the LORD has brought me back empty” (1:21); six measures of barley pressed on her in 3:17; a child in her lap in 4:16.',
          matters:
            'It gives the reader the measure to read by. Every later scene either widens the emptiness or begins to close it.',
        },
        {
          name: 'Family',
          definition:
            'The household as the unit that carries a name, a field, and a future.',
          appears:
            'The dead husbands, the inheritance of Elimelech, the levirate duty, the naming of Obed by the women of the town.',
          matters:
            'What is at stake is never merely comfort. A household without a son is a name about to be erased, and the book treats that as an emergency worth four chapters.',
        },
        {
          name: 'Hidden work',
          definition:
            'God accomplishing a public purpose through private faithfulness.',
          appears:
            'Everywhere, and named nowhere. No one in the book knows that David is coming.',
          matters:
            'The genealogy at the end reframes every small decision that preceded it. That is the book’s final move, and it is aimed at the reader.',
        },
      ],
    },

    // ------------------------------------------------------------ connections
    {
      id: 'connections',
      heading: 'Where Ruth Sits in Scripture',
      entries: [
        {
          term: 'Genesis',
          detail:
            'Moab begins with Lot (19:37), and the elders at the gate bless Boaz by invoking Rachel and Leah, who built the house of Israel, and Perez, born to Judah and Tamar (Genesis 38). Both memories are irregular. Ruth places itself deliberately in that company: the line of promise has come through outsiders and through improvisation before.',
        },
        {
          term: 'Joshua',
          detail:
            'Joshua is the book of inheritance — land measured out, allotted, and held. Ruth is what happens when a family loses its portion. Behind it stands Rahab, the Canaanite woman brought into Israel at Jericho, whom Matthew names as the mother of Boaz. The land books and the Ruth story ask the same question from opposite ends: who belongs to this people, and on what terms?',
        },
        {
          term: 'Judges',
          detail:
            'The same years, told at ground level. Judges is national, violent, and descending; Ruth is domestic, quiet, and ascending. Judges ends with no king in Israel and everyone doing what was right in his own eyes. Ruth ends with the name David.',
        },
        {
          term: 'Samuel',
          detail:
            '1 Samuel opens on a nation that needs a king and does not have one. Ruth has just supplied his pedigree. The connection runs the other way too: when David is hunted, he entrusts his father and mother to the king of Moab (1 Samuel 22:3–4) — the country his great-grandmother came from.',
        },
        {
          term: 'Matthew',
          detail:
            'The genealogy that opens the New Testament picks the line up again and names Ruth in it (Matthew 1:5), alongside Tamar, Rahab, and Bathsheba. The four chapters end at David; the line does not.',
        },
      ],
      closing: [
        'Why Ruth follows Judges: because of its first sentence and its last word. It opens inside the era Judges describes and closes with the king Judges kept saying Israel did not have. Placed there, it is a bridge — the span between the collapse of the tribes and the rise of the monarchy. In the Hebrew canon Ruth is arranged differently, among the Writings, and is read at the Feast of Weeks, the harvest festival; that placement hears the book as a harvest story. Both orders are hearing something the book is actually doing.',
        'Why the genealogy matters: without it, Ruth is a moving domestic story that ends well. With it, the reader learns that the survival of a single starving household in a forgotten decade was the survival of the royal line. The genealogy is not an appendix. It is the disclosure the book has been withholding.',
      ],
    },

    // ----------------------------------------------------------- hebrew ideas
    {
      id: 'hebrew',
      heading: 'Four Hebrew Ideas',
      body: [
        'Four words carry more weight in Ruth than any translation can hold evenly. They are worth knowing before reading, and worth not over-reading once known.',
      ],
      entries: [
        {
          term: 'hesed',
          role: 'covenant loyalty',
          detail:
            'Usually rendered kindness, steadfast love, or loyalty. It describes commitment that goes past what is owed and then stays. In Ruth it is used of God and of people with the same word — Naomi prays that the LORD may deal in hesed with her daughters-in-law as they have dealt with the dead, and Boaz says Ruth’s last hesed is greater than her first. The book’s argument is largely that these are not two different things.',
        },
        {
          term: 'shuv',
          role: 'to return, to turn back',
          detail:
            'A common verb that clusters heavily in chapter 1 — Naomi returns, she urges the women to return, Orpah returns, Ruth refuses to return. The same word covers going home and turning away, so the chapter’s central choice is made in one repeated syllable. Elsewhere in Scripture this is also the word for turning back to God, which the chapter does not press but does not avoid.',
        },
        {
          term: 'goel',
          role: 'guardian-redeemer',
          detail:
            'The near kinsman with the right and duty to buy back what his relative has lost: land, freedom, a family name. It is a legal role before it is a metaphor. Naomi uses it of Boaz in 2:20, Ruth uses it of him at the floor in 3:9, and chapter 4 is the role being carried out in full, in daylight, before witnesses.',
        },
        {
          term: 'kanaph',
          role: 'wing, corner of a garment',
          detail:
            'One word for both. Boaz blesses Ruth for coming to take refuge under the wings of the God of Israel (2:12); at the threshing floor Ruth asks him to spread his wing — the corner of his garment — over her, since he is a redeemer (3:9). The book lets the two uses stand next to each other without comment. The connection is in the vocabulary, and that is as far as it needs to go.',
        },
      ],
    },

    // -------------------------------------------------------------- reversals
    {
      id: 'reversals',
      heading: 'The Reversals',
      body: [
        'Ruth is constructed out of reversals, and it announces them in its own words rather than leaving them to the reader to find. Naomi supplies the terms in chapter 1; chapter 4 pays each one back.',
      ],
      figures: [
        {
          art: `   EMPTY ──────────────────────────────► FULL

   famine                                 harvest
   three graves                           one cradle
   Moab                                   Bethlehem
   widow                                  wife
   foreigner                              named among the mothers
   "call me Mara"                         "a son is born to Naomi"
   a name about to end                    the father of Jesse`,
          caption: 'Chapter 1 states the loss; chapter 4 answers it item by item.',
        },
      ],
      reversals: [
        {
          from: 'Famine',
          to: 'Harvest',
          note: 'The book opens with no bread in the house of bread and closes across a full barley and wheat season.',
        },
        {
          from: 'Empty',
          to: 'Full',
          note: 'Naomi’s own word in 1:21 is answered by six measures of barley and then by a child.',
        },
        {
          from: 'Widowhood',
          to: 'Family',
          note: 'Three deaths in five verses become a marriage, a birth, and a household with a future.',
        },
        {
          from: 'Moab',
          to: 'Bethlehem',
          note: 'Outside the covenant to inside it — and the movement carries a Moabite woman with it, permanently.',
        },
        {
          from: 'Death',
          to: 'Birth',
          note: 'The book begins with a family that cannot continue and ends with the LORD giving conception.',
        },
        {
          from: 'Loss',
          to: 'David',
          note: 'The final reversal is one no character lives to see: the emptied household becomes the royal line.',
        },
      ],
    },

    // ------------------------------------------------------------ god's work
    {
      id: 'presence',
      heading: 'How God Acts in This Book',
      body: [
        'One of Ruth’s defining literary characteristics is restraint. God never speaks. No prophet appears, no angel is sent, no miracle interrupts the ordinary. Nothing in these four chapters violates the way an agricultural town in Judah actually worked. And yet the book is about God from beginning to end.',
        'The narrator credits God directly exactly twice. In 1:6 the LORD has visited his people in giving them bread. In 4:13 the LORD gives Ruth conception. Bread at the start, a child at the end — the two things the story needs and no human being can produce. Everything between them is human: a decision on a road, a morning of gleaning, a landowner’s generosity, a night of nerve, a legal case argued at a town gate.',
      ],
      figures: [
        {
          art: `   NARRATED AS GOD'S OWN ACT
     1:6   the LORD gave his people bread
     4:13  the LORD gave her conception

   EVERYTHING ELSE
     a vow on a road
     a field entered by chance          (2:3)
     a landowner who gives beyond law
     a plan made at night
     a kinsman who declines
     ten elders at a gate`,
          caption: 'Two acts named. The rest is providence wearing ordinary clothes.',
        },
      ],
      closing: [
        'The characters, meanwhile, speak of God constantly — in greetings, blessings, oaths, and complaints. Naomi charges God with her bitterness; Boaz blesses God over a stranger in his field; the town blesses God over a newborn. They assume God is involved without ever being able to point at the moment.',
        'This is the book’s account of providence, and it is worth stating carefully. Ruth does not teach that everything happening is pleasant, or that loss is secretly a gift. Naomi’s grief is real and the text never takes it back. What the book shows is narrower and steadier: that God’s purposes advance through ordinary faithfulness in a decade nobody would have chosen to live in, and that the pattern is visible only from the end. The characters walk it forward in the dark. The reader gets to look back.',
      ],
    },

    // --------------------------------------------------------------- timeline
    {
      id: 'timeline',
      heading: 'The Timeline',
      figures: [
        {
          art: `  ├────── the days when the judges ruled ──────┤

   famine in Bethlehem
     │
     ▼
   MOAB ─── about ten years ─── three graves
     │
     ▼
   the road home ── "at the beginning of barley harvest"
     │
     ▼
   the field   ch 2 ─┐
     │               │
   the floor   ch 3  ├─ barley into wheat, some seven weeks
     │               │
   the gate    ch 4 ─┘
     │
     ▼
   marriage, and a son
     │
     ▼
   Obed ──► Jesse ──► DAVID`,
          caption: 'Ten years of loss, a few weeks of restoration, two generations to the king.',
        },
      ],
      closing: [
        'The proportions are worth noticing. The years of loss are handled in five verses. The weeks of restoration take three and a half chapters. And the generations that follow are compressed into a list of ten names. The book spends its attention where the faithfulness happens.',
      ],
    },

    // --------------------------------------------------------------- genealogy
    {
      id: 'genealogy',
      heading: 'The Genealogy',
      figures: [
        {
          art: `   PEREZ ......... born to Judah and Tamar, Genesis 38
     │
   HEZRON
     │
    RAM
     │
   AMMINADAB
     │
   NAHSHON ....... a leader of Judah in the wilderness
     │
   SALMON
     │
    BOAZ ═══ RUTH ....... a Moabite widow
     │
    OBED ......... "a son has been born to Naomi"
     │
   JESSE
     │
   DAVID ......... where the book stops
     ⋮
   JESUS ......... where Matthew picks the line back up`,
          caption: 'Ten names, Perez to David — the closing verses of the book.',
        },
      ],
      body: [
        'The book ends with a list. After four chapters of scenes told with unusual intimacy — a woman weeping on a road, grain measured into a shawl, a sandal changing hands — the final verses shift to the flattest form Scripture has, and simply name ten men in order.',
        'The change of register is the point. A genealogy is what a household leaves when it survives. Chapter 1 put a family one death away from having nothing to record; chapter 4 records it, and keeps going for six more generations than anyone in the story lived to see. The list is Naomi’s emptiness answered in the driest possible language, which is why it lands.',
        'It also relocates the reader. Up to that moment Ruth is a story about a widow, a field, and a decent man. The last word turns it into the account of how Israel got its king — and, in Matthew’s hands, further still. Nothing in chapters 1 through 3 changes. What changes is how large the reader now knows those chapters were.',
      ],
    },

    // ------------------------------------------------------------ why it lasts
    {
      id: 'why',
      heading: 'Why Ruth Endures',
      body: [
        'Nothing in this book is large. A famine in a small town, a family that leaves and mostly does not come back, a widow gleaning behind reapers because the law says she may, a landowner who is kinder than he has to be, a legal formality settled at a gate by ten men whose names are not recorded. Judged by its own scenes, Ruth is minor.',
        'That is the reason it lasts. Scripture is full of thunder, and Ruth is what the same God is doing during the quiet. The people in it are not delivered by a sign; they are carried by each other, at some cost, over a period of years, without knowing what any of it was for. When the book finally tells us — one line, ten names, the word David — it does not reinterpret their faithfulness as strategy. It just shows what it was holding up.',
        'Ruth also insists on who is permitted to matter. A Moabite widow, from the wrong side of a long border and the wrong side of a law, is the one who says the most covenant-shaped sentence in the book, and she says it to a bitter old woman with nothing to offer her. The town’s elders bless her by the names of Rachel and Leah. The genealogy of Israel’s king runs through her without a footnote of apology.',
        'And it leaves grief its dignity. Naomi is never told she was wrong to call herself bitter. She is simply, slowly, given a full lap and a name to carry forward. The book does not explain the ten years in Moab. It ends before it would have to.',
        'Read it as an account of ordinary faithfulness held long enough to become someone else’s inheritance. That is the ground. The story begins with a famine.',
      ],
    },
  ],
};
