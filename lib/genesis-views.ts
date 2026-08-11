// Book section views for navigation cards

export interface SectionView {
  title: string;
  theme: string;
  scripture: string;
  startChapter: number;
  endChapter: number;
}

export const GENESIS_SECTIONS: SectionView[] = [
  { title: 'Adam & Eve', theme: 'Creation, Eden, Fall', scripture: 'Genesis 1–3', startChapter: 1, endChapter: 3 },
  { title: 'Cain & Abel', theme: 'Sin and its spread', scripture: 'Genesis 4–5', startChapter: 4, endChapter: 5 },
  { title: 'Noah', theme: 'Flood, covenant, nations', scripture: 'Genesis 6–11', startChapter: 6, endChapter: 11 },
  { title: 'Abraham', theme: 'Call, covenant, promise', scripture: 'Genesis 12–25', startChapter: 12, endChapter: 25 },
  { title: 'Isaac', theme: 'Inheritance and blessing', scripture: 'Genesis 26–27', startChapter: 26, endChapter: 27 },
  { title: 'Jacob', theme: 'Struggle and transformation', scripture: 'Genesis 28–36', startChapter: 28, endChapter: 36 },
  { title: 'Joseph', theme: 'Providence and reconciliation', scripture: 'Genesis 37–50', startChapter: 37, endChapter: 50 },
];

