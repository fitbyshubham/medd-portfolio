import { JourneyEvent, CreativeWork, SportsProfile, Book } from './types';

export const journeyEvents: JourneyEvent[] = [
  {
    id: 'j1',
    year: '2023',
    title: 'First Creative Breakthrough',
    subtitle: 'The Doon School Media Squad',
    description: 'Began combining a love for story-driven editing and visual presentation. Cut together a high-tempo sports documentary about the annual inter-house Squash championships.',
    category: 'video',
    tags: ['Video Editing', 'Premiere Pro', 'Squash']
  },
  {
    id: 'j2',
    year: '2024',
    title: 'Presentation Masterclass Award',
    subtitle: 'Inter-House Exposition',
    description: 'Designed a fully illustrated, high-impact slide deck explaining "The Geopolitics of Semi-conductors". Won First Place for design clarity and information architecture.',
    category: 'presentation',
    tags: ['Keynote', 'Illustration', 'Information Design']
  },
  {
    id: 'j3',
    year: '2024',
    title: 'Varsity Squash & Badminton Debut',
    subtitle: 'School Athletics Guild',
    description: 'Earned the "Most Improved Player" award in squash. Intensified training schedules to elevate from basic rallying to competitive intermediate match play.',
    category: 'sports',
    tags: ['Squash', 'Badminton', 'Varsity Athletics']
  },
  {
    id: 'j4',
    year: '2025',
    title: 'Published Literary Analysis',
    subtitle: 'Weekly School Journal',
    description: 'Authored and published a deep-researched document analyzing "Gothic Tropes in Modern Murder-Mysteries", tracing the narrative lineage from Edgar Allan Poe to Anthony Horowitz.',
    category: 'document',
    tags: ['Deep Research', 'Writing', 'Murder-Mystery']
  },
  {
    id: 'j5',
    year: '2026',
    title: 'Creative Studio Director',
    subtitle: 'Doon School Digital Guild',
    description: 'Leading a team of 4 student creators to oversee digital portfolios, game night presentation templates, and school sports documentary sizzles.',
    category: 'personal',
    tags: ['Leadership', 'Design Systems', 'Curation']
  }
];

export const creativeWorks: CreativeWork[] = [
  {
    id: 'w1',
    title: 'The Doon School: Dusk & Dawn',
    type: 'video',
    description: 'A dynamic cinematic montage showcasing the heritage architecture, vibrant house system, and high-energy athletic life of The Doon School.',
    tags: ['Cinematic', 'Color Grading', 'Sound Design'],
    thumbnailColor: 'from-amber-500 to-red-600',
    duration: '2m 45s',
    videoUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'w2',
    title: 'Squash Physics: Ball Collisions and Court Angles',
    type: 'video',
    description: 'An educational, illustrated whiteboard video explaining the physics behind the boast shot, visual calculations of wall reflections, and swing drag mechanics.',
    tags: ['Motion Graphics', 'Voiceover', 'Sports Science'],
    thumbnailColor: 'from-indigo-500 to-purple-600',
    duration: '3m 30s',
    videoUrl: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'w3',
    title: 'Aesthetic Minimalism in Information Design',
    type: 'presentation',
    description: 'An interactive illustrated slide deck arguing why high negative space, single bold accent outline shifts, and standard serif typography holds 5x better retention.',
    tags: ['Slide Deck', 'Typography', 'Aesthetics'],
    thumbnailColor: 'from-blue-600 to-sky-400',
    slides: [
      {
        title: '01: The Grid system',
        bulletPoints: [
          'Enforcing strict 8px spacing rules builds cognitive trust',
          'Aligning headers with body text shapes predictable reading paths',
          'Never place text blocks directly adjacent without a divider'
        ],
        visualConcept: 'A pristine layout of overlapping thin blue borders, demonstrating proportional balance.'
      },
      {
        title: '02: Typography is Voice',
        bulletPoints: [
          'Serifs like Playfair represent historical authority and deep contemplation',
          'Clean sans-serifs convey structural efficiency and current action',
          'Double-scale disparity between headers and sub-headers creates dynamic narrative rhythm'
        ],
        visualConcept: 'Side-by-side comparison of standard text and oversized display letters.'
      },
      {
        title: '03: Color as Accent, Not Noise',
        bulletPoints: [
          'Keep 90% of your slide monochrome (off-whites, deep charcoals)',
          'Use exactly ONE brand color (like Meddhansh’s bright Orange/Red) to pull eyes to the core message',
          'Avoid complex color blocks or rainbow badges that dilute focus'
        ],
        visualConcept: 'A striking minimal diagram showcasing an orange-accented bullet point on a dark grey field.'
      }
    ]
  },
  {
    id: 'w4',
    title: 'The Future of Renewable Bio-Materials',
    type: 'presentation',
    description: 'Illustrated deck evaluating seaweed-based bioplastics, covering cost curves, water barrier limitations, and mechanical characteristics.',
    tags: ['Case Study', 'Ecology', 'Sankey Diagrams'],
    thumbnailColor: 'from-emerald-600 to-teal-400',
    slides: [
      {
        title: '01: Seaweed Harvesting Efficiency',
        bulletPoints: [
          'Macroalgae grows up to 30 times faster than terrestrial crops',
          'Zeros out fertilizer runoff and requires no fresh water',
          'Acts as an active marine carbon-sink during cultivation'
        ],
        visualConcept: 'A high-contrast graphic detailing harvest rates per acre'
      },
      {
        title: '02: Chemical Depolymerization',
        bulletPoints: [
          'Extracting sodium alginate through mild alkaline solutions',
          'Cross-linking with benign calcium ions to establish heat-stability',
          'Resulting film degrades completely in soil within 14 days'
        ],
        visualConcept: 'A clean molecular pathway outline with modern tech annotations'
      }
    ]
  },
  {
    id: 'w5',
    title: 'The Silent Sleuth: Gothic Roots in Whodunits',
    type: 'document',
    description: 'A deep-researched, publication-grade academic document analyzing how murder-mysteries adapted gothic castle moods into cozy country estates.',
    tags: ['Research Paper', 'Literary Criticism', 'Murder-Mystery'],
    thumbnailColor: 'from-fuchsia-600 to-pink-500',
    documentContent: [
      {
        section: 'I. Introduction: The Castle Becomes the Parlor',
        paragraphs: [
          'The core architecture of fear undergoes an intriguing transformation between 1794 and 1920. In Horace Walpole’s gothic landscapes, dread was generated by vast, sprawling, uncontrollable external structures—catacombs, haunted turrets, and endless subterranean crypts. There, the menace is paranormal and absolute.',
          'By the Golden Age of Detective Fiction, spearheaded by Agatha Christie and John Dickson Carr, this sprawling dread is compressed. The creepy castle is miniaturized into the locked country house parlor. No longer is threat an external monster; it is an internal guest sharing tea. The terror shifts from cosmic to domestic, making the mystery a intellectual game of logic.'
        ]
      },
      {
        section: 'II. The Locked-Room Paradox',
        paragraphs: [
          'The closed circle of suspects acts as a scientific vacuum. By bounding the physical environment (a snowed-in train, an isolated island, an airtight chamber), the writer eliminates external variables. It becomes a pure system of logic—analogous to a chess board.',
          'Crucially, this echoes the "Sensible vs. Passionate" duality. Under the cold, sensible gaze of Hercule Poirot or Sherlock Holmes, the passionate, bloody actions of the murderer are reverse-engineered into neat, sterile logical proofs.'
        ]
      }
    ]
  },
  {
    id: 'w6',
    title: 'Autonomous Swarm Robotics in Disaster Recovery',
    type: 'document',
    description: 'Analytical review paper reviewing fault-tolerant swarm algorithms for coordinated grid search under collapsed communication grids.',
    tags: ['Robotics', 'Research Synthesis', 'Algorithms'],
    thumbnailColor: 'from-zinc-700 to-slate-900',
    documentContent: [
      {
        section: 'I. Decentralized Mesh Configurations',
        paragraphs: [
          'When cell towers fail, search robots must act as independent nodes that coordinate wirelessly. By formulating swarm search as a dynamic Voronoi tessellation, individual units adjust scanning boundaries dynamically based on neighboring battery levels.',
          'This ensures that even if 40% of the robotic agents suffer physical failure, the remaining search-and-rescue units automatically stretch their sensor footprints to cover the blindspots.'
        ]
      }
    ]
  }
];

export const sportsProfiles: SportsProfile[] = [
  {
    id: 's1',
    name: 'Squash',
    level: 'Intermediate',
    rating: 74,
    matchesPlayed: 48,
    winRate: '68%',
    description: 'My absolute favorite athletic pursue. I love the geometric precision, rapid reflex requirements, and intense physical stamina of the squash court. Active house team representative.',
    favShotOrRole: 'The Forehand Low Boast',
    iconType: 'squash'
  },
  {
    id: 's2',
    name: 'Badminton',
    level: 'Beginner',
    rating: 45,
    matchesPlayed: 18,
    winRate: '55%',
    description: 'An incredibly fun and explosive game. I enjoy the fast double-clears and sharp wrist technique on school courts. It helps keep my hand-eye coordination lightning quick.',
    favShotOrRole: 'The Backhand Hairpin Drop',
    iconType: 'badminton'
  },
  {
    id: 's3',
    name: 'Cricket',
    level: 'Club Player',
    rating: 61,
    matchesPlayed: 32,
    winRate: '59%',
    description: 'A traditional staple of life at The Doon School. I serve as an all-rounder on my house team, providing steady focus in the middle batting order and spin variations.',
    favShotOrRole: 'Aggressive Off-Spin Delivery',
    iconType: 'cricket'
  },
  {
    id: 's4',
    name: 'Hockey',
    level: 'Club Player',
    rating: 58,
    matchesPlayed: 20,
    winRate: '50%',
    description: 'High pacing, physical grit, and team coordinate movements. Hockey at Doon is legendary. Playing on the hard grass pitches trains spatial awareness and split-second teamwork.',
    favShotOrRole: 'Right Wing Attacking Wingman',
    iconType: 'hockey'
  }
];

export const bookReviews: Book[] = [
  {
    id: 'b1',
    title: 'The Murder of Roger Ackroyd',
    author: 'Agatha Christie',
    genre: 'Classic Murder-Mystery',
    rating: 5,
    review: 'The absolute pinnacle of Golden Age detective fiction. Christie uses an extremely brave, brilliant narrative device that completely turns reader assumptions upside down. The logic of Poirot remains spotless.',
    colorTheme: 'bg-red-950 border-red-500 text-red-50'
  },
  {
    id: 'b2',
    title: 'Magpie Murders',
    author: 'Anthony Horowitz',
    genre: 'Modern Meta-Mystery',
    rating: 5,
    review: 'A magnificent double-mystery: a book-within-a-book. Horowitz mimics classical cozy whodunis with spectacular elegance, while delivering an equally cynical modern-day literary investigation in parallel.',
    colorTheme: 'bg-indigo-950 border-indigo-500 text-indigo-50'
  },
  {
    id: 'b3',
    title: 'The Appeal',
    author: 'Janice Hallett',
    genre: 'Epistolary Crime Novel',
    rating: 4,
    review: 'An absolute blast. The entire story is told through emails, WhatsApp texts, and documents. It challenges you to read between the lines, dissect passive aggression, and play detective in real time.',
    colorTheme: 'bg-purple-950 border-purple-500 text-purple-50'
  },
  {
    id: 'b4',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Hard Sci-Fi / Mystery',
    rating: 5,
    review: 'Though sci-fi, it is fundamentally a high-stakes scientific mystery: why is the sun losing energy, and how can a lone amnesiac biology teacher save humanity? The chemistry between the two main characters is unforgettable.',
    colorTheme: 'bg-amber-950 border-amber-600 text-amber-50'
  }
];
