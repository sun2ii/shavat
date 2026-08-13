import { promises as fs } from 'fs';
import path from 'path';

export type Status = 'done' | 'partial' | 'wip' | '-';

export interface Milestone {
  text: string;
  done: boolean;
  section: string;
}

export interface BookStatus {
  commentary: Status;
  voices: Status;
  places: Status;
  character: Status;
}

export interface Roadmap {
  milestones: Milestone[];
  books: Record<string, BookStatus>;
}

export async function parseRoadmap(): Promise<Roadmap> {
  const roadmapPath = path.join(process.cwd(), 'ROADMAP.md');
  const content = await fs.readFile(roadmapPath, 'utf-8');

  const milestones: Milestone[] = [];
  const books: Record<string, BookStatus> = {};

  const lines = content.split('\n');
  let currentSection = '';
  let inBookStatus = false;

  for (const line of lines) {
    // Detect section headers
    if (line.startsWith('## ')) {
      const sectionName = line.replace('## ', '').trim();
      if (sectionName === 'Book Status') {
        inBookStatus = true;
        currentSection = '';
      } else {
        inBookStatus = false;
        currentSection = sectionName;
      }
      continue;
    }

    // Parse milestones from any non-Book Status section
    if (currentSection && !inBookStatus) {
      const checkboxMatch = line.match(/^- \[(x| )\] (.+)$/);
      if (checkboxMatch) {
        milestones.push({
          done: checkboxMatch[1] === 'x',
          text: checkboxMatch[2].trim(),
          section: currentSection,
        });
      }
    }

    // Parse book status table
    if (inBookStatus) {
      // Skip header row, separator row, and comment lines
      if (line.startsWith('|') && !line.includes('Book') && !line.includes('---')) {
        const cells = line.split('|').map(c => c.trim()).filter(Boolean);
        if (cells.length >= 5) {
          const [slug, commentary, voices, places, character] = cells;
          books[slug] = {
            commentary: parseStatus(commentary),
            voices: parseStatus(voices),
            places: parseStatus(places),
            character: parseStatus(character),
          };
        }
      }
    }
  }

  return { milestones, books };
}

function parseStatus(value: string): Status {
  const normalized = value.toLowerCase().trim();
  if (normalized === 'done') return 'done';
  if (normalized === 'partial') return 'partial';
  if (normalized === 'wip') return 'wip';
  return '-';
}
