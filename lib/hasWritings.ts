export interface Writing {
  book: string;
  chapter: number;
  division: string;
  divisionIndex: number;
  title: string;
  path: string;
}

const WRITINGS: Writing[] = [
  { book: 'john', chapter: 1, division: 'prologue', divisionIndex: 1, title: 'The Love of God in John 1', path: '/writings/john/prologue' },
  { book: 'john', chapter: 2, division: 'discourses', divisionIndex: 1, title: 'Two Powerful Sides of Jesus', path: '/writings/john/discourses-1' },
  { book: 'john', chapter: 3, division: 'discourses', divisionIndex: 2, title: 'The Love of God: Holy, Saving, and Life-Giving', path: '/writings/john/discourses-2' },
  { book: 'john', chapter: 4, division: 'discourses', divisionIndex: 3, title: 'The Love of God Breaks Barriers', path: '/writings/john/discourses-3' },
  { book: 'john', chapter: 5, division: 'discourses', divisionIndex: 4, title: 'The Love of God Gives Life', path: '/writings/john/discourses-4' },
  { book: 'john', chapter: 6, division: 'discourses', divisionIndex: 5, title: 'The Love of God: Come and Be Satisfied', path: '/writings/john/discourses-5' },
  { book: 'john', chapter: 7, division: 'discourses', divisionIndex: 6, title: 'The Love of God Divides', path: '/writings/john/discourses-6' },
  { book: 'john', chapter: 8, division: 'discourses', divisionIndex: 7, title: 'The Love of God: Truth and Mercy Together', path: '/writings/john/discourses-7' },
  { book: 'john', chapter: 9, division: 'discourses', divisionIndex: 8, title: 'The Love of God Opens Eyes', path: '/writings/john/discourses-8' },
  { book: 'john', chapter: 10, division: 'discourses', divisionIndex: 9, title: 'The Love of God: The Good Shepherd', path: '/writings/john/discourses-9' },
  { book: 'john', chapter: 11, division: 'discourses', divisionIndex: 10, title: 'The Love of God: I Am the Resurrection', path: '/writings/john/discourses-10' },
  { book: 'john', chapter: 12, division: 'final-week', divisionIndex: 1, title: 'The Love of God: The Grain of Wheat Must Die', path: '/writings/john/final-week-1' },
  { book: 'john', chapter: 13, division: 'final-week', divisionIndex: 2, title: 'The Love of God: Love One Another', path: '/writings/john/final-week-2' },
  { book: 'john', chapter: 14, division: 'final-week', divisionIndex: 3, title: 'The Love of God: Peace I Leave With You', path: '/writings/john/final-week-3' },
  { book: 'john', chapter: 15, division: 'final-week', divisionIndex: 4, title: 'The Love of God: Abide in Me', path: '/writings/john/final-week-4' },
  { book: 'john', chapter: 16, division: 'final-week', divisionIndex: 5, title: 'The Love of God: I Have Overcome the World', path: '/writings/john/final-week-5' },
  { book: 'john', chapter: 17, division: 'final-week', divisionIndex: 6, title: 'The Love of God: The High Priestly Prayer', path: '/writings/john/final-week-6' },
  { book: 'john', chapter: 18, division: 'passion', divisionIndex: 1, title: 'The Love of God: The Cup the Father Gave Me', path: '/writings/john/passion-1' },
  { book: 'john', chapter: 19, division: 'passion', divisionIndex: 2, title: 'The Love of God: It Is Finished', path: '/writings/john/passion-2' },
  { book: 'john', chapter: 20, division: 'resurrection', divisionIndex: 1, title: 'The Love of God: I Have Seen the Lord', path: '/writings/john/resurrection-1' },
  { book: 'john', chapter: 21, division: 'resurrection', divisionIndex: 2, title: 'The Love of God: Do You Love Me?', path: '/writings/john/resurrection-2' },
  { book: 'hebrews', chapter: 1, division: 'christ-superior-to-all', divisionIndex: 1, title: 'The Supremacy of Christ: God Has Spoken', path: '/writings/hebrews/christ-superior-to-all-1' },
  { book: 'hebrews', chapter: 2, division: 'christ-superior-to-all', divisionIndex: 2, title: 'The Supremacy of Christ: He Became Like Us to Save Us', path: '/writings/hebrews/christ-superior-to-all-2' },
  { book: 'hebrews', chapter: 3, division: 'christ-superior-to-all', divisionIndex: 3, title: 'The Supremacy of Christ: Greater Than Moses', path: '/writings/hebrews/christ-superior-to-all-3' },
  { book: 'hebrews', chapter: 4, division: 'christ-superior-to-all', divisionIndex: 4, title: 'The Supremacy of Christ: Enter His Rest', path: '/writings/hebrews/christ-superior-to-all-4' },
  { book: 'hebrews', chapter: 5, division: 'christs-priesthood', divisionIndex: 1, title: 'The Supremacy of Christ: Our Sympathetic High Priest', path: '/writings/hebrews/christs-priesthood-1' },
  { book: 'hebrews', chapter: 6, division: 'christs-priesthood', divisionIndex: 2, title: 'The Supremacy of Christ: Hope as an Anchor', path: '/writings/hebrews/christs-priesthood-2' },
  { book: 'hebrews', chapter: 7, division: 'christs-priesthood', divisionIndex: 3, title: 'The Supremacy of Christ: A Priest Forever', path: '/writings/hebrews/christs-priesthood-3' },
  { book: 'hebrews', chapter: 8, division: 'faith-and-sacrifice', divisionIndex: 1, title: 'The Supremacy of Christ: Mediator of a Better Covenant', path: '/writings/hebrews/faith-and-sacrifice-1' },
  { book: 'hebrews', chapter: 9, division: 'faith-and-sacrifice', divisionIndex: 2, title: 'The Supremacy of Christ: Once for All', path: '/writings/hebrews/faith-and-sacrifice-2' },
  { book: 'hebrews', chapter: 10, division: 'faith-and-sacrifice', divisionIndex: 3, title: 'The Supremacy of Christ: Draw Near with Confidence', path: '/writings/hebrews/faith-and-sacrifice-3' },
  { book: 'hebrews', chapter: 11, division: 'call-to-persevere', divisionIndex: 1, title: 'The Supremacy of Christ: The Hall of Faith', path: '/writings/hebrews/call-to-persevere-1' },
  { book: 'hebrews', chapter: 12, division: 'call-to-persevere', divisionIndex: 2, title: 'The Supremacy of Christ: Run the Race with Endurance', path: '/writings/hebrews/call-to-persevere-2' },
  { book: 'hebrews', chapter: 13, division: 'call-to-persevere', divisionIndex: 3, title: 'The Supremacy of Christ: Live by Faith', path: '/writings/hebrews/call-to-persevere-3' },
  { book: 'james', chapter: 1, division: 'epistle', divisionIndex: 1, title: 'Faith That Works: Tested and True', path: '/writings/james/epistle-1' },
  { book: 'james', chapter: 2, division: 'epistle', divisionIndex: 2, title: 'Faith That Works: No Favoritism, No Pretense', path: '/writings/james/epistle-2' },
  { book: 'james', chapter: 3, division: 'epistle', divisionIndex: 3, title: 'Faith That Works: Taming the Tongue, Pursuing Wisdom', path: '/writings/james/epistle-3' },
  { book: 'james', chapter: 4, division: 'epistle', divisionIndex: 4, title: 'Faith That Works: Submitting to God, Resisting Pride', path: '/writings/james/epistle-4' },
  { book: 'james', chapter: 5, division: 'epistle', divisionIndex: 5, title: 'Faith That Works: Patient Endurance Until Christ Returns', path: '/writings/james/epistle-5' },
  { book: '1-peter', chapter: 1, division: 'suffering-and-hope', divisionIndex: 1, title: 'Hope in Suffering: Born Again to Living Hope', path: '/writings/1-peter/suffering-and-hope-1' },
  { book: '1-peter', chapter: 2, division: 'suffering-and-hope', divisionIndex: 2, title: 'Hope in Suffering: Living Stones and the Way of Christ', path: '/writings/1-peter/suffering-and-hope-2' },
  { book: '1-peter', chapter: 3, division: 'submission-and-witness', divisionIndex: 1, title: 'Hope in Suffering: Witness Through Submission and Blessing', path: '/writings/1-peter/submission-and-witness-1' },
  { book: '1-peter', chapter: 4, division: 'submission-and-witness', divisionIndex: 2, title: 'Hope in Suffering: Living for God\'s Will', path: '/writings/1-peter/submission-and-witness-2' },
  { book: '1-peter', chapter: 5, division: 'submission-and-witness', divisionIndex: 3, title: 'Hope in Suffering: Humble Yourselves Under God\'s Mighty Hand', path: '/writings/1-peter/submission-and-witness-3' },
  { book: '2-peter', chapter: 1, division: 'epistle', divisionIndex: 1, title: 'Growing in Grace: The Ladder of Christian Virtue', path: '/writings/2-peter/epistle-1' },
  { book: '2-peter', chapter: 2, division: 'epistle', divisionIndex: 2, title: 'Growing in Grace: Exposing False Teachers', path: '/writings/2-peter/epistle-2' },
  { book: '2-peter', chapter: 3, division: 'epistle', divisionIndex: 3, title: 'Growing in Grace: The Day of the Lord', path: '/writings/2-peter/epistle-3' },
  { book: '1-john', chapter: 1, division: 'fellowship-with-god', divisionIndex: 1, title: 'Walk in Light and Love: Fellowship Through Confession', path: '/writings/1-john/fellowship-with-god-1' },
  { book: '1-john', chapter: 2, division: 'fellowship-with-god', divisionIndex: 2, title: 'Walk in Light and Love: Obedience and the Antichrist', path: '/writings/1-john/fellowship-with-god-2' },
  { book: '1-john', chapter: 3, division: 'love-one-another', divisionIndex: 1, title: 'Walk in Light and Love: Children of God', path: '/writings/1-john/love-one-another-1' },
  { book: '1-john', chapter: 4, division: 'love-one-another', divisionIndex: 2, title: 'Walk in Light and Love: God Is Love', path: '/writings/1-john/love-one-another-2' },
  { book: '1-john', chapter: 5, division: 'assurance', divisionIndex: 1, title: 'Walk in Light and Love: Assurance of Eternal Life', path: '/writings/1-john/assurance-1' },
  { book: '2-john', chapter: 1, division: 'epistle', divisionIndex: 1, title: 'Walk in Truth and Love: Guard the Apostolic Teaching', path: '/writings/2-john/epistle-1' },
  { book: '3-john', chapter: 1, division: 'epistle', divisionIndex: 1, title: 'Walk in Truth and Love: Support Faithful Workers', path: '/writings/3-john/epistle-1' },
  { book: 'jude', chapter: 1, division: 'epistle', divisionIndex: 1, title: 'Contend for the Faith: Stand Firm Against False Teaching', path: '/writings/jude/epistle-1' },
  { book: 'romans', chapter: 1, division: 'sin-and-judgment', divisionIndex: 1, title: 'The Righteousness of God: The Power of the Gospel', path: '/writings/romans/sin-and-judgment-1' },
  { book: 'romans', chapter: 2, division: 'sin-and-judgment', divisionIndex: 2, title: 'The Righteousness of God: Impartial Judgment', path: '/writings/romans/sin-and-judgment-2' },
  { book: 'romans', chapter: 3, division: 'sin-and-judgment', divisionIndex: 3, title: 'The Righteousness of God: Justified by Faith', path: '/writings/romans/sin-and-judgment-3' },
  { book: 'romans', chapter: 4, division: 'justification-by-faith', divisionIndex: 1, title: 'The Righteousness of God: Abraham Believed', path: '/writings/romans/justification-by-faith-1' },
  { book: 'romans', chapter: 5, division: 'justification-by-faith', divisionIndex: 2, title: 'The Righteousness of God: Peace with God', path: '/writings/romans/justification-by-faith-2' },
  { book: 'romans', chapter: 6, division: 'sanctification', divisionIndex: 1, title: 'The Righteousness of God: Dead to Sin, Alive to God', path: '/writings/romans/sanctification-1' },
  { book: 'romans', chapter: 7, division: 'sanctification', divisionIndex: 2, title: 'The Righteousness of God: The Struggle with Sin', path: '/writings/romans/sanctification-2' },
  { book: 'romans', chapter: 8, division: 'sanctification', divisionIndex: 3, title: 'The Righteousness of God: Life in the Spirit', path: '/writings/romans/sanctification-3' },
  { book: 'romans', chapter: 9, division: 'israels-place', divisionIndex: 1, title: 'The Righteousness of God: God\'s Sovereign Choice', path: '/writings/romans/israels-place-1' },
  { book: 'romans', chapter: 10, division: 'israels-place', divisionIndex: 2, title: 'The Righteousness of God: Faith Comes by Hearing', path: '/writings/romans/israels-place-2' },
  { book: 'romans', chapter: 11, division: 'israels-place', divisionIndex: 3, title: 'The Righteousness of God: Israel\'s Future Restoration', path: '/writings/romans/israels-place-3' },
  { book: 'romans', chapter: 12, division: 'practical-christian-living', divisionIndex: 1, title: 'The Righteousness of God: Living Sacrifices', path: '/writings/romans/practical-christian-living-1' },
  { book: 'romans', chapter: 13, division: 'practical-christian-living', divisionIndex: 2, title: 'The Righteousness of God: Submit to Authorities, Love Fulfills the Law', path: '/writings/romans/practical-christian-living-2' },
  { book: 'romans', chapter: 14, division: 'practical-christian-living', divisionIndex: 3, title: 'The Righteousness of God: Accept One Another', path: '/writings/romans/practical-christian-living-3' },
  { book: 'romans', chapter: 15, division: 'practical-christian-living', divisionIndex: 4, title: 'The Righteousness of God: Bear with the Weak', path: '/writings/romans/practical-christian-living-4' },
  { book: 'romans', chapter: 16, division: 'practical-christian-living', divisionIndex: 5, title: 'The Righteousness of God: Greetings and Doxology', path: '/writings/romans/practical-christian-living-5' },
  { book: 'matthew', chapter: 1, division: 'birth-and-preparation', divisionIndex: 1, title: 'The Promised King: A Royal Genealogy', path: '/writings/matthew/birth-and-preparation-1' },
  { book: 'matthew', chapter: 2, division: 'birth-and-preparation', divisionIndex: 2, title: 'The Promised King: Gentiles Bow While Herod Rages', path: '/writings/matthew/birth-and-preparation-2' },
  { book: 'matthew', chapter: 3, division: 'birth-and-preparation', divisionIndex: 3, title: 'The Promised King: The Herald of the King', path: '/writings/matthew/birth-and-preparation-3' },
  { book: 'matthew', chapter: 4, division: 'birth-and-preparation', divisionIndex: 4, title: 'The Promised King: The King Resists the Usurper', path: '/writings/matthew/birth-and-preparation-4' },
  { book: 'matthew', chapter: 5, division: 'sermon-on-the-mount', divisionIndex: 1, title: 'The Promised King: The Constitution of the Kingdom', path: '/writings/matthew/sermon-on-the-mount-1' },
  { book: 'matthew', chapter: 6, division: 'sermon-on-the-mount', divisionIndex: 2, title: 'The Promised King: The Hidden Life of the Kingdom', path: '/writings/matthew/sermon-on-the-mount-2' },
  { book: 'matthew', chapter: 7, division: 'sermon-on-the-mount', divisionIndex: 3, title: 'The Promised King: The Narrow Road into the Kingdom', path: '/writings/matthew/sermon-on-the-mount-3' },
  { book: 'matthew', chapter: 8, division: 'authority-in-action', divisionIndex: 1, title: 'The Promised King: Authority Over Disease, Distance, and Nature', path: '/writings/matthew/authority-in-action-1' },
  { book: 'matthew', chapter: 9, division: 'authority-in-action', divisionIndex: 2, title: 'The Promised King: He Forgives Sins, Calls Outsiders, Defeats Death', path: '/writings/matthew/authority-in-action-2' },
  { book: 'matthew', chapter: 10, division: 'authority-in-action', divisionIndex: 3, title: 'The Promised King: The King Commissions His Ambassadors', path: '/writings/matthew/authority-in-action-3' },
  { book: 'matthew', chapter: 11, division: 'parables-of-the-kingdom', divisionIndex: 1, title: 'The Promised King: Come to Me, and I Will Give You Rest', path: '/writings/matthew/parables-of-the-kingdom-1' },
  { book: 'matthew', chapter: 12, division: 'parables-of-the-kingdom', divisionIndex: 2, title: 'The Promised King: Lord of the Sabbath', path: '/writings/matthew/parables-of-the-kingdom-2' },
  { book: 'matthew', chapter: 13, division: 'parables-of-the-kingdom', divisionIndex: 3, title: 'The Promised King: The Hidden Kingdom', path: '/writings/matthew/parables-of-the-kingdom-3' },
  { book: 'matthew', chapter: 14, division: 'discipleship-and-identity', divisionIndex: 1, title: 'The Promised King: The King Provides and Rules the Waves', path: '/writings/matthew/discipleship-and-identity-1' },
  { book: 'matthew', chapter: 15, division: 'discipleship-and-identity', divisionIndex: 2, title: 'The Promised King: Mercy Reaches the Gentiles', path: '/writings/matthew/discipleship-and-identity-2' },
  { book: 'matthew', chapter: 16, division: 'discipleship-and-identity', divisionIndex: 3, title: 'The Promised King: You Are the Christ, the Son of the Living God', path: '/writings/matthew/discipleship-and-identity-3' },
  { book: 'matthew', chapter: 17, division: 'discipleship-and-identity', divisionIndex: 4, title: 'The Promised King: The King Unveiled in Glory', path: '/writings/matthew/discipleship-and-identity-4' },
  { book: 'matthew', chapter: 18, division: 'teaching-on-community', divisionIndex: 1, title: 'The Promised King: Forgiveness in the Kingdom', path: '/writings/matthew/teaching-on-community-1' },
  { book: 'matthew', chapter: 19, division: 'teaching-on-community', divisionIndex: 2, title: 'The Promised King: The Cost of Entering the Kingdom', path: '/writings/matthew/teaching-on-community-2' },
  { book: 'matthew', chapter: 20, division: 'teaching-on-community', divisionIndex: 3, title: 'The Promised King: The King Who Came to Serve', path: '/writings/matthew/teaching-on-community-3' },
  { book: 'matthew', chapter: 21, division: 'confrontation-in-jerusalem', divisionIndex: 1, title: 'The Promised King: The King Enters His City', path: '/writings/matthew/confrontation-in-jerusalem-1' },
  { book: 'matthew', chapter: 22, division: 'confrontation-in-jerusalem', divisionIndex: 2, title: 'The Promised King: The King Silences His Opponents', path: '/writings/matthew/confrontation-in-jerusalem-2' },
  { book: 'matthew', chapter: 23, division: 'confrontation-in-jerusalem', divisionIndex: 3, title: 'The Promised King: Woe to False Shepherds', path: '/writings/matthew/confrontation-in-jerusalem-3' },
  { book: 'matthew', chapter: 24, division: 'olivet-discourse', divisionIndex: 1, title: 'The Promised King: The King Will Return', path: '/writings/matthew/olivet-discourse-1' },
  { book: 'matthew', chapter: 25, division: 'olivet-discourse', divisionIndex: 2, title: 'The Promised King: The Final Reckoning', path: '/writings/matthew/olivet-discourse-2' },
  { book: 'matthew', chapter: 26, division: 'passion-and-resurrection', divisionIndex: 1, title: 'The Promised King: The King Submits to the Father\'s Cup', path: '/writings/matthew/passion-and-resurrection-1' },
  { book: 'matthew', chapter: 27, division: 'passion-and-resurrection', divisionIndex: 2, title: 'The Promised King: King of the Jews — Crowned with Thorns', path: '/writings/matthew/passion-and-resurrection-2' },
  { book: 'matthew', chapter: 28, division: 'passion-and-resurrection', divisionIndex: 3, title: 'The Promised King: All Authority Given to the Risen King', path: '/writings/matthew/passion-and-resurrection-3' },
  { book: 'mark', chapter: 1, division: 'authority-revealed', divisionIndex: 1, title: 'The Servant Son of God: The Beginning of the Gospel', path: '/writings/mark/authority-revealed-1' },
  { book: 'mark', chapter: 2, division: 'authority-revealed', divisionIndex: 2, title: 'The Servant Son of God: Authority to Forgive Sins', path: '/writings/mark/authority-revealed-2' },
  { book: 'mark', chapter: 3, division: 'authority-revealed', divisionIndex: 3, title: 'The Servant Son of God: The Gathered People', path: '/writings/mark/authority-revealed-3' },
  { book: 'mark', chapter: 4, division: 'power-and-identity', divisionIndex: 1, title: 'The Servant Son of God: The Word and the Wind', path: '/writings/mark/power-and-identity-1' },
  { book: 'mark', chapter: 5, division: 'power-and-identity', divisionIndex: 2, title: 'The Servant Son of God: Power Over Demons, Disease, and Death', path: '/writings/mark/power-and-identity-2' },
  { book: 'mark', chapter: 6, division: 'power-and-identity', divisionIndex: 3, title: 'The Servant Son of God: Rejected at Home, Provider for the Crowd', path: '/writings/mark/power-and-identity-3' },
  { book: 'mark', chapter: 7, division: 'power-and-identity', divisionIndex: 4, title: 'The Servant Son of God: True Defilement and Surprising Faith', path: '/writings/mark/power-and-identity-4' },
  { book: 'mark', chapter: 8, division: 'power-and-identity', divisionIndex: 5, title: 'The Servant Son of God: Who Do You Say I Am?', path: '/writings/mark/power-and-identity-5' },
  { book: 'mark', chapter: 9, division: 'the-way-of-the-cross', divisionIndex: 1, title: 'The Servant Son of God: Glory Unveiled, Cross Foretold', path: '/writings/mark/the-way-of-the-cross-1' },
  { book: 'mark', chapter: 10, division: 'the-way-of-the-cross', divisionIndex: 2, title: 'The Servant Son of God: Not to Be Served, but to Serve', path: '/writings/mark/the-way-of-the-cross-2' },
  { book: 'mark', chapter: 11, division: 'confrontation-in-jerusalem', divisionIndex: 1, title: 'The Servant Son of God: The King Enters His City', path: '/writings/mark/confrontation-in-jerusalem-1' },
  { book: 'mark', chapter: 12, division: 'confrontation-in-jerusalem', divisionIndex: 2, title: 'The Servant Son of God: The Great Reckoning', path: '/writings/mark/confrontation-in-jerusalem-2' },
  { book: 'mark', chapter: 13, division: 'confrontation-in-jerusalem', divisionIndex: 3, title: 'The Servant Son of God: Watch', path: '/writings/mark/confrontation-in-jerusalem-3' },
  { book: 'mark', chapter: 14, division: 'passion-and-victory', divisionIndex: 1, title: 'The Servant Son of God: Not What I Will, but What You Will', path: '/writings/mark/passion-and-victory-1' },
  { book: 'mark', chapter: 15, division: 'passion-and-victory', divisionIndex: 2, title: 'The Servant Son of God: A Ransom for Many', path: '/writings/mark/passion-and-victory-2' },
  { book: 'mark', chapter: 16, division: 'passion-and-victory', divisionIndex: 3, title: 'The Servant Son of God: He Has Risen', path: '/writings/mark/passion-and-victory-3' },
  { book: 'luke', chapter: 1, division: 'birth-narratives', divisionIndex: 1, title: 'The Savior for All: A Savior Promised to the Humble', path: '/writings/luke/birth-narratives-1' },
  { book: 'luke', chapter: 2, division: 'birth-narratives', divisionIndex: 2, title: 'The Savior for All: A Savior Born for All People', path: '/writings/luke/birth-narratives-2' },
  { book: 'luke', chapter: 3, division: 'preparation-and-galilean-ministry', divisionIndex: 1, title: 'The Savior for All: A Savior for the Whole Human Race', path: '/writings/luke/preparation-and-galilean-ministry-1' },
  { book: 'luke', chapter: 4, division: 'preparation-and-galilean-ministry', divisionIndex: 2, title: 'The Savior for All: Good News to the Poor', path: '/writings/luke/preparation-and-galilean-ministry-2' },
  { book: 'luke', chapter: 5, division: 'preparation-and-galilean-ministry', divisionIndex: 3, title: 'The Savior for All: He Calls Sinners', path: '/writings/luke/preparation-and-galilean-ministry-3' },
  { book: 'luke', chapter: 6, division: 'preparation-and-galilean-ministry', divisionIndex: 4, title: 'The Savior for All: Blessings for the Poor, Woes for the Rich', path: '/writings/luke/preparation-and-galilean-ministry-4' },
  { book: 'luke', chapter: 7, division: 'preparation-and-galilean-ministry', divisionIndex: 5, title: 'The Savior for All: Across Every Line', path: '/writings/luke/preparation-and-galilean-ministry-5' },
  { book: 'luke', chapter: 8, division: 'preparation-and-galilean-ministry', divisionIndex: 6, title: 'The Savior for All: He Frees the Man No One Could Bind', path: '/writings/luke/preparation-and-galilean-ministry-6' },
  { book: 'luke', chapter: 9, division: 'preparation-and-galilean-ministry', divisionIndex: 7, title: 'The Savior for All: He Set His Face Toward Jerusalem', path: '/writings/luke/preparation-and-galilean-ministry-7' },
  { book: 'luke', chapter: 10, division: 'journey-to-jerusalem', divisionIndex: 1, title: 'The Savior for All: A Samaritan as the Hero', path: '/writings/luke/journey-to-jerusalem-1' },
  { book: 'luke', chapter: 11, division: 'journey-to-jerusalem', divisionIndex: 2, title: 'The Savior for All: Teach Us to Pray', path: '/writings/luke/journey-to-jerusalem-2' },
  { book: 'luke', chapter: 12, division: 'journey-to-jerusalem', divisionIndex: 3, title: 'The Savior for All: Do Not Fear, Little Flock', path: '/writings/luke/journey-to-jerusalem-3' },
  { book: 'luke', chapter: 13, division: 'journey-to-jerusalem', divisionIndex: 4, title: 'The Savior for All: The Narrow Door', path: '/writings/luke/journey-to-jerusalem-4' },
  { book: 'luke', chapter: 14, division: 'journey-to-jerusalem', divisionIndex: 5, title: 'The Savior for All: Compel Them to Come In', path: '/writings/luke/journey-to-jerusalem-5' },
  { book: 'luke', chapter: 15, division: 'journey-to-jerusalem', divisionIndex: 6, title: 'The Savior for All: Heaven Rejoices Over One Sinner', path: '/writings/luke/journey-to-jerusalem-6' },
  { book: 'luke', chapter: 16, division: 'journey-to-jerusalem', divisionIndex: 7, title: 'The Savior for All: You Cannot Serve God and Money', path: '/writings/luke/journey-to-jerusalem-7' },
  { book: 'luke', chapter: 17, division: 'journey-to-jerusalem', divisionIndex: 8, title: 'The Savior for All: Only the Samaritan Returned', path: '/writings/luke/journey-to-jerusalem-8' },
  { book: 'luke', chapter: 18, division: 'journey-to-jerusalem', divisionIndex: 9, title: 'The Savior for All: The Humble Are Justified', path: '/writings/luke/journey-to-jerusalem-9' },
  { book: 'luke', chapter: 19, division: 'journey-to-jerusalem', divisionIndex: 10, title: 'The Savior for All: The Son of Man Came to Seek and Save the Lost', path: '/writings/luke/journey-to-jerusalem-10' },
  { book: 'luke', chapter: 20, division: 'jerusalem-ministry', divisionIndex: 1, title: 'The Savior for All: The Stone the Builders Rejected', path: '/writings/luke/jerusalem-ministry-1' },
  { book: 'luke', chapter: 21, division: 'jerusalem-ministry', divisionIndex: 2, title: 'The Savior for All: The Widow\'s Two Coins and the End of the Age', path: '/writings/luke/jerusalem-ministry-2' },
  { book: 'luke', chapter: 22, division: 'passion', divisionIndex: 1, title: 'The Savior for All: Not My Will, but Yours', path: '/writings/luke/passion-1' },
  { book: 'luke', chapter: 23, division: 'passion', divisionIndex: 2, title: 'The Savior for All: Today You Will Be With Me in Paradise', path: '/writings/luke/passion-2' },
  { book: 'luke', chapter: 24, division: 'resurrection-and-ascension', divisionIndex: 1, title: 'The Savior for All: He Opened the Scriptures', path: '/writings/luke/resurrection-and-ascension-1' },
];

export function hasWriting(book: string, chapter: number): boolean {
  return WRITINGS.some(
    (w) => w.book === book && w.chapter === chapter
  );
}

export function getWriting(book: string, chapter: number): Writing | undefined {
  return WRITINGS.find(
    (w) => w.book === book && w.chapter === chapter
  );
}

export function getAllWritings(): Writing[] {
  return WRITINGS;
}

export function getWritingByPath(book: string, divisionPath: string): Writing | undefined {
  return WRITINGS.find(
    (w) => w.book === book && w.path === `/writings/${book}/${divisionPath}`
  );
}

export function divisionHasWritings(book: string, chapters: number[]): boolean {
  return chapters.some(chapter => hasWriting(book, chapter));
}
