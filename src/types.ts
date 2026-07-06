export interface JourneyEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'video' | 'presentation' | 'document' | 'sports' | 'personal';
  tags: string[];
}

export interface CreativeWork {
  id: string;
  title: string;
  type: 'video' | 'presentation' | 'document';
  description: string;
  tags: string[];
  thumbnailColor: string;
  // Specific details
  videoUrl?: string; // simulation or embedded details
  duration?: string;
  slides?: { title: string; bulletPoints: string[]; visualConcept: string }[];
  documentContent?: { section: string; paragraphs: string[] }[];
}

export interface SportsProfile {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Club Player';
  rating: number; // 1-100 scale
  matchesPlayed: number;
  winRate: string;
  description: string;
  favShotOrRole: string;
  iconType: 'squash' | 'badminton' | 'cricket' | 'hockey';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number; // 1-5
  review: string;
  colorTheme: string; // Tailwind bg color
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  purpose: 'Video Project' | 'Presentation Help' | 'Squash Match' | 'General Chat' | 'Book recommendation';
  message: string;
  timestamp: string;
}
