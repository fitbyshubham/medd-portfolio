import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  Play, 
  Pause, 
  Search, 
  Sparkles, 
  Check, 
  X, 
  User, 
  MapPin, 
  Flame, 
  BookOpen, 
  HelpCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecreationPageProps {
  onOpenConnect?: () => void;
}

export default function RecreationPage({ onOpenConnect }: RecreationPageProps) {
  const [activeGame, setActiveGame] = useState<'squash' | 'mystery'>('squash');

  // --- GAME 1: SQUASH RALLY MASTER STATE ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('squash_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'pro'>('intermediate');
  const [showSweetSpotMsg, setShowSweetSpotMsg] = useState(false);

  // Ball & Racket settings for Squash
  const ballRef = useRef({ x: 150, y: 150, dx: 3, dy: -3, radius: 8 });
  const racketRef = useRef({ x: 120, width: 70, height: 10 });
  const requestRef = useRef<number | null>(null);
  const isMuted = useRef(false);

  // --- GAME 2: THE WHODUNIT CLUE SOLVER STATE ---
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [cluesRevealed, setCluesRevealed] = useState<number[]>([]);
  const [deductions, setDeductions] = useState<Record<string, 'neutral' | 'yes' | 'no'>>({});
  const [accusedSuspect, setAccusedSuspect] = useState('');
  const [accusedWeapon, setAccusedWeapon] = useState('');
  const [accusedRoom, setAccusedRoom] = useState('');
  const [mysteryResult, setMysteryResult] = useState<'unsolved' | 'solved' | 'failed'>('unsolved');
  const [showCaseBook, setShowCaseBook] = useState(true);

  // Mystery cases structured
  const cases = [
    {
      title: "The Missing Cafeteria Pastry",
      difficulty: "Easy",
      context: "The Head Chef baked a special chocolate croissant, but it vanished right off the hot tray while he was looking away! Only three students were nearby.",
      suspects: ["Kabir", "Rohan", "Siddharth"],
      weapons: ["Chocolate Crumbs", "Croissant Wrapper", "Sticky Jam"],
      rooms: ["Pastry Station", "Juice Bar", "Dining Hall Table"],
      solution: {
        suspect: "Rohan",
        weapon: "Chocolate Crumbs",
        room: "Pastry Station"
      },
      clues: [
        "Kabir was sitting at the Dining Hall Table reading a magazine, eating nothing.",
        "Siddharth was at the Juice Bar drinking fresh orange juice with clean hands.",
        "Rohan was seen standing right next to the Pastry Station with chocolate crumbs all over his fingers!"
      ]
    },
    {
      title: "The Stolen Golden Squash Racket",
      difficulty: "Medium",
      context: "Just before the championship match, the rare Golden Squash Racket went missing from the locked glass cabinet. Only three suspects were in the sports complex during the critical 15-minute window.",
      suspects: ["Coach Kapoor", "Captain Vikram", "Librarian Sharma"],
      weapons: ["Squash Ball", "Nylon String", "Cabinet Key"],
      rooms: ["Trophy Lounge", "Squash Court 1", "Equipment Room"],
      solution: {
        suspect: "Coach Kapoor",
        weapon: "Cabinet Key",
        room: "Equipment Room"
      },
      clues: [
        "The Cabinet Key was found hidden inside a pocket at the Equipment Room.",
        "Captain Vikram has an airtight alibi; he was playing on Squash Court 1 the whole time.",
        "The person who dropped the Squash Ball was in the Trophy Lounge, but they aren't the thief.",
        "Librarian Sharma was spotted reading a detective novel in the Trophy Lounge, far from the racket case.",
        "The nylon string was not used to break into the cabinet or carry out the heist.",
        "Coach Kapoor was seen rushing out of the Equipment Room looking highly suspicious."
      ]
    },
    {
      title: "The Mystery of the Cryptic Inkwell",
      difficulty: "Hard",
      context: "A rare original Agatha Christie manuscript's signed page has been smudged with green ink inside the library. The Headmaster is furious. Detect the culprit, the ink carrier, and the exact study desk.",
      suspects: ["Scholar Arya", "Prefect Dev", "Gardener Ram"],
      weapons: ["Fountain Pen", "Quill Inkwell", "Felt Marker"],
      rooms: ["West Wing Alcove", "Main Reading Desk", "Archival Vault"],
      solution: {
        suspect: "Scholar Arya",
        weapon: "Quill Inkwell",
        room: "West Wing Alcove"
      },
      clues: [
        "Prefect Dev was inside the Archival Vault cataloging old documents and has clean fingers.",
        "A heavy scent of premium ink is present in the West Wing Alcove.",
        "Scholar Arya is notoriously messy and was writing in the West Wing Alcove with a Quill Inkwell.",
        "The Felt Marker belonged to Gardener Ram, who was working near the Main Reading Desk but has no ink on him.",
        "No smudges were found in the Main Reading Desk or Archival Vault.",
        "The Fountain Pen was found in the vault, untouched and dry."
      ]
    }
  ];

  // Initialize and run Squash Canvas
  useEffect(() => {
    if (activeGame !== 'squash') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set dimensions
    canvas.width = 400;
    canvas.height = 300;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const root = document.documentElement;
      const mouseX = e.clientX - rect.left - root.scrollLeft;
      // Keep within bounds
      racketRef.current.x = Math.max(0, Math.min(canvas.width - racketRef.current.width, mouseX - racketRef.current.width / 2));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        racketRef.current.x = Math.max(0, Math.min(canvas.width - racketRef.current.width, touchX - racketRef.current.width / 2));
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    let localScore = 0;

    const updateGame = () => {
      if (gameState !== 'playing') return;

      const ball = ballRef.current;
      const racket = racketRef.current;

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall collisions (Left, Right, Top)
      if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
        ball.dx = -ball.dx;
        ball.x = ball.x < canvas.width / 2 ? ball.radius : canvas.width - ball.radius;
      }
      if (ball.y - ball.radius <= 0) {
        ball.dy = -ball.dy;
        ball.y = ball.radius;
      }

      // Racket Collision (Bottom)
      if (
        ball.y + ball.radius >= canvas.height - racket.height - 10 &&
        ball.y - ball.radius <= canvas.height - 10 &&
        ball.x >= racket.x &&
        ball.x <= racket.x + racket.width &&
        ball.dy > 0
      ) {
        // Hit racket!
        const hitPosition = ball.x - (racket.x + racket.width / 2);
        const relativeHit = hitPosition / (racket.width / 2); // -1 to 1

        // Sweet spot check (middle 30%)
        if (Math.abs(relativeHit) < 0.3) {
          ball.dy = -Math.abs(ball.dy) * 1.05; // speed boost
          ball.dx = relativeHit * 4;
          localScore += 3;
          setScore(localScore);
          setShowSweetSpotMsg(true);
          setTimeout(() => setShowSweetSpotMsg(false), 800);
        } else {
          ball.dy = -Math.abs(ball.dy);
          ball.dx = relativeHit * 4; // angle variation
          localScore += 1;
          setScore(localScore);
        }

        // Clip ball position
        ball.y = canvas.height - racket.height - 12;
      }

      // Bottom out (Game Over)
      if (ball.y + ball.radius >= canvas.height) {
        setGameState('gameover');
        if (localScore > highScore) {
          setHighScore(localScore);
          localStorage.setItem('squash_highscore', localScore.toString());
        }
        return;
      }

      // Render Everything
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Squash Wall grid lines (blueprint background style)
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 20) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Highlight top sweet zone on the wall
      ctx.fillStyle = 'rgba(255, 85, 34, 0.05)';
      ctx.fillRect(0, 0, canvas.width, 50);
      ctx.strokeStyle = '#ff5522';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 50);
      ctx.lineTo(canvas.width, 50);
      ctx.stroke();

      // Draw Squash ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ff5522';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ff5522';
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      // Draw Racket
      ctx.fillStyle = '#3c4ef2';
      ctx.fillRect(racket.x, canvas.height - racket.height - 10, racket.width, racket.height);

      // Sweet Spot indicator on racket
      ctx.fillStyle = '#ff5522';
      ctx.fillRect(racket.x + racket.width * 0.35, canvas.height - racket.height - 10, racket.width * 0.3, racket.height);

      requestRef.current = requestAnimationFrame(updateGame);
    };

    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(updateGame);
    } else {
      // Draw initial state
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText('CLICK "LAUNCH GAME" TO BEGIN RALLY', canvas.width / 2, canvas.height / 2);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gameState, activeGame]);

  const startGame = () => {
    const startSpeed = difficulty === 'beginner' ? 3 : difficulty === 'intermediate' ? 5.5 : 8;
    ballRef.current = {
      x: 100 + Math.random() * 200,
      y: 80,
      dx: (Math.random() > 0.5 ? 1 : -1) * (startSpeed - 1),
      dy: startSpeed,
      radius: 7
    };
    setScore(0);
    setGameState('playing');
  };

  // --- MYSTERY DECISION BOARD HANDLERS ---
  const handleRevealClue = (idx: number) => {
    if (!cluesRevealed.includes(idx)) {
      setCluesRevealed([...cluesRevealed, idx]);
    }
  };

  const toggleDeductionCell = (key: string) => {
    const current = deductions[key] || 'neutral';
    let next: 'neutral' | 'yes' | 'no' = 'neutral';
    if (current === 'neutral') next = 'no';
    else if (current === 'no') next = 'yes';
    else next = 'neutral';

    setDeductions({
      ...deductions,
      [key]: next
    });
  };

  const handleCaseChange = (index: number) => {
    setSelectedCaseIndex(index);
    setCluesRevealed([]);
    setDeductions({});
    setAccusedSuspect('');
    setAccusedWeapon('');
    setAccusedRoom('');
    setMysteryResult('unsolved');
  };

  const submitAccusation = () => {
    const currentCase = cases[selectedCaseIndex];
    if (!accusedSuspect || !accusedWeapon || !accusedRoom) return;

    if (
      accusedSuspect === currentCase.solution.suspect &&
      accusedWeapon === currentCase.solution.weapon &&
      accusedRoom === currentCase.solution.room
    ) {
      setMysteryResult('solved');
    } else {
      setMysteryResult('failed');
    }
  };

  return (
    <div className="bg-[#0E0C22] text-slate-100 min-h-screen selection:bg-orange-500 selection:text-white font-sans pb-16">
      
      {/* HEADER HERO AREA */}
      <section className="relative pt-12 pb-12 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto border-b border-white/5 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="px-3 py-1 bg-orange-500 text-white font-mono text-[9px] font-black tracking-widest uppercase rounded">
              interactive arcade
            </span>
            <h1 className="font-serif font-black text-4xl md:text-6xl text-[#3C4EF2] tracking-tighter uppercase leading-none">
              RECREATION LOUNGE
            </h1>
            <p className="font-sans text-xs text-slate-400 font-bold uppercase tracking-wide max-w-2xl">
              Unwind and challenge yourself with two mini-games meticulously themed around Meddhansh’s personal hobbies: squash court rallies and high-suspense whodunit murder mysteries.
            </p>
          </div>

          {/* Toggle buttons between the two games */}
          <div className="flex bg-[#16152F] p-1.5 rounded-xl border border-white/10 self-start shrink-0">
            <button
              onClick={() => setActiveGame('squash')}
              className={`px-4 py-2 rounded-lg font-mono text-[10px] font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                activeGame === 'squash' 
                  ? 'bg-[#3C4EF2] text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🏸 Squash Rally
            </button>
            <button
              onClick={() => setActiveGame('mystery')}
              className={`px-4 py-2 rounded-lg font-mono text-[10px] font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                activeGame === 'mystery' 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🕵️ Clue Solver
            </button>
          </div>
        </div>
      </section>

      {/* GAME VIEWPORT */}
      <section className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto mt-10">
        
        {/* GAME 1: SQUASH RALLY MASTER */}
        {activeGame === 'squash' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Game Canvas Board */}
            <div className="lg:col-span-7 bg-[#121124] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
                    SQUASH COURT 1 (SOLO WALL)
                  </span>
                </div>
                
                {/* Score panel */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">RALLY SCORE</span>
                    <span className="font-sans font-black text-2xl text-white">{score}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">BEST SCORE</span>
                    <span className="font-sans font-black text-2xl text-[#3C4EF2]">{highScore}</span>
                  </div>
                </div>
              </div>

              {/* Responsive Container for Canvas */}
              <div className="flex justify-center relative bg-slate-950 rounded-xl overflow-hidden border border-white/5 shadow-inner">
                <canvas 
                  ref={canvasRef} 
                  className="max-w-full block aspect-[4/3] bg-gradient-to-b from-slate-900 to-slate-950 cursor-crosshair touch-none"
                />

                {/* Game state overlays */}
                {gameState === 'idle' && (
                  <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                    <div className="w-14 h-14 bg-orange-500/10 border border-orange-500 rounded-full flex items-center justify-center mb-4">
                      <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
                    </div>
                    <h3 className="font-serif font-black text-2xl uppercase text-white tracking-tight">SQUASH RALLY CHALLENGE</h3>
                    <p className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wide max-w-sm mt-1 mb-6">
                      Bust the squash ball against the front wall. Use your cursor or finger to slide the racket!
                    </p>

                    {/* Difficulty selector */}
                    <div className="flex items-center gap-2 bg-[#121124] p-1 border border-white/5 rounded-lg mb-6">
                      {(['beginner', 'intermediate', 'pro'] as const).map((level) => (
                        <button
                          key={level}
                          onClick={() => setDifficulty(level)}
                          className={`px-3 py-1 rounded-md font-mono text-[9px] font-bold uppercase tracking-wider transition ${
                            difficulty === level 
                              ? 'bg-[#3C4EF2] text-white shadow' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={startGame}
                      className="px-6 py-3 bg-[#3C4EF2] hover:bg-[#2529D8] text-white font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-full transition-all duration-150 shadow-[0px_4px_12px_rgba(60,78,242,0.3)] flex items-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> LAUNCH GAME
                    </button>
                  </div>
                )}

                {gameState === 'gameover' && (
                  <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center text-center p-6">
                    <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mb-4 text-red-500 text-lg font-bold">
                      ✕
                    </div>
                    <h3 className="font-serif font-black text-2xl uppercase text-white tracking-tight">OUT OF BOUNDS</h3>
                    <p className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wide max-w-xs mt-1 mb-2">
                      Rally terminated with a score of:
                    </p>
                    <span className="font-sans font-black text-5xl text-orange-500 mb-6">{score}</span>

                    <div className="flex gap-4">
                      <button
                        onClick={startGame}
                        className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-full transition-all duration-150 flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> RE-ENTER COURT
                      </button>
                      <button
                        onClick={() => setGameState('idle')}
                        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-full transition-all duration-150"
                      >
                        BACK TO ROOM
                      </button>
                    </div>
                  </div>
                )}

                {/* Sweet Spot Popup */}
                <AnimatePresence>
                  {showSweetSpotMsg && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="absolute top-12 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-orange-500 text-white font-mono text-[9px] font-black tracking-widest uppercase rounded shadow-lg pointer-events-none"
                    >
                      💥 SWEET SPOT +3 POINTS!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pause/Mute buttons for general comfort */}
              <div className="flex items-center justify-between mt-4 text-[10px] font-mono text-slate-500 uppercase">
                <span>⚡ Sweet spot is marked orange in the racket center</span>
                {gameState === 'playing' && (
                  <button
                    onClick={() => setGameState('idle')}
                    className="text-slate-400 hover:text-red-400 flex items-center gap-1 transition focus:outline-none"
                  >
                    <Pause className="w-3 h-3 fill-current" /> Terminate Rally
                  </button>
                )}
              </div>
            </div>

            {/* Instruction Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-[#121124] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-orange-400" />
                  <h3 className="font-serif font-black text-xl text-white uppercase tracking-tight">THE SQUASH MISSION</h3>
                </div>
                <div className="w-12 h-1 bg-orange-500 rounded" />
                <p className="font-sans text-xs text-slate-300 leading-relaxed text-justify">
                  In squash, a player’s level is determined by their consistency and clean control. Your task is to keep a rapid rally running against the wall.
                </p>
                
                <ul className="space-y-3 font-mono text-[10px] text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1 shrink-0" />
                    <span><strong>STANDARD REBOUND:</strong> Hitting with the edges of the racket gives <strong>1 point</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#3C4EF2] rounded-full mt-1 shrink-0" />
                    <span><strong>SWEET SPOT REBOUND:</strong> Hitting exactly in the center marked orange delivers a <strong>3x point reward (+3 score)</strong> with angle calibration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1 shrink-0" />
                    <span><strong>SPEED SCALING:</strong> The higher your score, the faster the squash ball launches off the front brick wall.</span>
                  </li>
                </ul>

                <div className="bg-slate-900 border border-white/5 p-4 rounded-xl">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">MEDDHANSH'S RACKET QUOTE</span>
                  <p className="text-[11px] font-sans italic text-slate-300 mt-1 leading-relaxed">
                    "Squash isn't just a workout; it is chess with reflexes. If you can anticipate the wall bounce, you own the court."
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* GAME 2: THE WHODUNIT CLUE SOLVER */}
        {activeGame === 'mystery' && (
          <div className="space-y-8">
            
            {/* Case Selection Deck */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cases.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCaseChange(idx)}
                  className={`p-6 text-left border rounded-2xl transition cursor-pointer relative overflow-hidden ${
                    selectedCaseIndex === idx 
                      ? 'bg-[#1D1B3F] border-[#3C4EF2]' 
                      : 'bg-[#121124] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 bg-slate-800 text-slate-300 font-mono text-[8px] uppercase tracking-widest rounded">
                      CASEFILE 0{idx + 1}
                    </span>
                    <span className={`font-mono text-[9px] uppercase font-bold tracking-wide ${
                      c.difficulty === 'Easy' ? 'text-green-400' : c.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {c.difficulty} Difficulty
                    </span>
                  </div>
                  <h3 className="font-serif font-black text-lg text-white uppercase tracking-tight">
                    {c.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                    {c.context}
                  </p>
                </button>
              ))}
            </div>

            {/* Case Book & Notebook Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Clues Book & Accusation Panel */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Context Card */}
                <div className="bg-[#121124] border border-white/10 rounded-2xl p-6 space-y-3">
                  <h3 className="font-serif font-black text-xl text-white uppercase tracking-tight flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-orange-400" />
                    THE CASE DOSSIER
                  </h3>
                  <div className="w-12 h-0.5 bg-orange-500 rounded" />
                  <p className="font-sans text-xs text-slate-300 leading-relaxed text-justify">
                    {cases[selectedCaseIndex].context}
                  </p>
                </div>

                {/* Clues Board */}
                <div className="bg-[#121124] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
                      DETECTIVE NOTES (CLICK TO INVESTIGATE)
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">
                      {cluesRevealed.length} OF {cases[selectedCaseIndex].clues.length} REVEALED
                    </span>
                  </div>

                  <div className="space-y-2">
                    {cases[selectedCaseIndex].clues.map((clue, idx) => {
                      const isRevealed = cluesRevealed.includes(idx);
                      return (
                        <button
                          key={idx}
                          onClick={() => handleRevealClue(idx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs font-sans transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                            isRevealed 
                              ? 'bg-[#181630] border-white/10 text-slate-200' 
                              : 'bg-slate-900/40 border-dashed border-white/5 text-slate-500 hover:bg-[#121124]'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-mono text-[9px] font-bold ${
                            isRevealed ? 'bg-[#3C4EF2] text-white' : 'bg-slate-800 text-slate-500'
                          }`}>
                            {idx + 1}
                          </span>
                          
                          <div className="flex-1">
                            {isRevealed ? (
                              <p className="leading-relaxed">{clue}</p>
                            ) : (
                              <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-slate-600 block pt-0.5">
                                [ CLUE HIDDEN — REVEAL BY SCANNING ]
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Final Accusation Deck */}
                <div className="bg-[#121124] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-orange-400" />
                    <span className="font-mono text-[10px] text-white font-extrabold uppercase tracking-widest">
                      INSPECTOR'S DECLARATION OF ACCUSATION
                    </span>
                  </div>

                  {mysteryResult === 'unsolved' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        
                        {/* Suspect Picker */}
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold">Select the Thief</label>
                          <select
                            value={accusedSuspect}
                            onChange={(e) => setAccusedSuspect(e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#3C4EF2]"
                          >
                            <option value="">-- CHOOSE --</option>
                            {cases[selectedCaseIndex].suspects.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>

                        {/* Weapon Picker */}
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold">Select the Item / Link</label>
                          <select
                            value={accusedWeapon}
                            onChange={(e) => setAccusedWeapon(e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#3C4EF2]"
                          >
                            <option value="">-- CHOOSE --</option>
                            {cases[selectedCaseIndex].weapons.map(w => (
                              <option key={w} value={w}>{w}</option>
                            ))}
                          </select>
                        </div>

                        {/* Room Picker */}
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold">Select Scene Location</label>
                          <select
                            value={accusedRoom}
                            onChange={(e) => setAccusedRoom(e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#3C4EF2]"
                          >
                            <option value="">-- CHOOSE --</option>
                            {cases[selectedCaseIndex].rooms.map(r => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>

                      </div>

                      <button
                        onClick={submitAccusation}
                        disabled={!accusedSuspect || !accusedWeapon || !accusedRoom}
                        className="w-full py-3 bg-[#3C4EF2] hover:bg-[#2529D8] disabled:opacity-30 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-xl transition duration-150 cursor-pointer"
                      >
                        SUBMIT ACCUSATION
                      </button>
                    </div>
                  )}

                  {mysteryResult === 'solved' && (
                    <div className="bg-green-500/10 border border-green-500 p-6 rounded-xl space-y-4 text-center">
                      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                        ✓
                      </div>
                      <h4 className="font-serif font-black text-xl text-green-400 uppercase tracking-tight">CASE RESOLVED SUCCESSFULLY!</h4>
                      <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                        Sensational work! You correctly analyzed the alibis to discover that <strong>{cases[selectedCaseIndex].solution.suspect}</strong> orchestrated the crime using the <strong>{cases[selectedCaseIndex].solution.weapon}</strong> inside the <strong>{cases[selectedCaseIndex].solution.room}</strong>.
                      </p>
                      <button
                        onClick={() => handleCaseChange(selectedCaseIndex)}
                        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider rounded"
                      >
                        PLAY AGAIN
                      </button>
                    </div>
                  )}

                  {mysteryResult === 'failed' && (
                    <div className="bg-red-500/10 border border-red-500 p-6 rounded-xl space-y-4 text-center">
                      <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                        ✕
                      </div>
                      <h4 className="font-serif font-black text-xl text-red-400 uppercase tracking-tight">ALIBIS NOT RESOLVED</h4>
                      <p className="font-sans text-xs text-slate-300 leading-relaxed">
                        The evidence rejects this timeline. Analyze the negative constraints inside the Clue Notebook again!
                      </p>
                      <button
                        onClick={() => setMysteryResult('unsolved')}
                        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider rounded"
                      >
                        RE-OPEN PROCEEDINGS
                      </button>
                    </div>
                  )}

                </div>

              </div>

              {/* Right Column: Dynamic Deduction Board */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Deduction Matrix Board */}
                <div className="bg-[#121124] border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                      DETECTIVE DEDUCTION MATRIX
                    </span>
                    <button
                      onClick={() => setDeductions({})}
                      className="text-slate-500 hover:text-white font-mono text-[8px] uppercase flex items-center gap-1 focus:outline-none"
                    >
                      <RotateCcw className="w-2.5 h-2.5" /> Clear board
                    </button>
                  </div>
                  <div className="w-12 h-0.5 bg-orange-500 rounded" />
                  <p className="text-[10px] font-sans text-slate-400 leading-relaxed">
                    Interactive Scratchpad Grid. Click cells to mark <strong>[✓] Confirmed</strong>, <strong>[✗] Eliminated</strong>, or <strong>[ ] Neutral</strong> based on the revealed alibis.
                  </p>

                  <div className="space-y-4">
                    {/* Suspect vs Room Matrix */}
                    <div className="space-y-1.5">
                      <span className="text-[8px] font-mono text-orange-400 block tracking-widest uppercase font-bold">SUSPECTS vs ROOMS</span>
                      <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[9px] font-bold">
                        <div />
                        {cases[selectedCaseIndex].rooms.map(r => (
                          <div key={r} className="truncate text-slate-500 uppercase text-[8px]" title={r}>
                            {r.split(' ')[0]}
                          </div>
                        ))}

                        {cases[selectedCaseIndex].suspects.map(s => (
                          <React.Fragment key={s}>
                            <div className="text-left text-slate-300 truncate font-sans py-1 pr-1">{s.split(' ')[1] || s}</div>
                            {cases[selectedCaseIndex].rooms.map(r => {
                              const cellKey = `s-r-${s}-${r}`;
                              const val = deductions[cellKey] || 'neutral';
                              return (
                                <button
                                  key={r}
                                  onClick={() => toggleDeductionCell(cellKey)}
                                  className={`h-7 border rounded cursor-pointer transition flex items-center justify-center font-mono text-xs ${
                                    val === 'yes' ? 'bg-green-500/20 border-green-500 text-green-400' :
                                    val === 'no' ? 'bg-red-500/20 border-red-500 text-red-400' :
                                    'bg-slate-900 border-white/5 text-slate-600 hover:border-white/20'
                                  }`}
                                >
                                  {val === 'yes' && '✓'}
                                  {val === 'no' && '✗'}
                                  {val === 'neutral' && ''}
                                </button>
                              );
                            })}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 my-3" />

                    {/* Suspect vs Item Matrix */}
                    <div className="space-y-1.5">
                      <span className="text-[8px] font-mono text-[#3C4EF2] block tracking-widest uppercase font-bold">SUSPECTS vs ITEMS</span>
                      <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[9px] font-bold">
                        <div />
                        {cases[selectedCaseIndex].weapons.map(w => (
                          <div key={w} className="truncate text-slate-500 uppercase text-[8px]" title={w}>
                            {w.split(' ')[0]}
                          </div>
                        ))}

                        {cases[selectedCaseIndex].suspects.map(s => (
                          <React.Fragment key={s}>
                            <div className="text-left text-slate-300 truncate font-sans py-1 pr-1">{s.split(' ')[1] || s}</div>
                            {cases[selectedCaseIndex].weapons.map(w => {
                              const cellKey = `s-w-${s}-${w}`;
                              const val = deductions[cellKey] || 'neutral';
                              return (
                                <button
                                  key={w}
                                  onClick={() => toggleDeductionCell(cellKey)}
                                  className={`h-7 border rounded cursor-pointer transition flex items-center justify-center font-mono text-xs ${
                                    val === 'yes' ? 'bg-green-500/20 border-green-500 text-green-400' :
                                    val === 'no' ? 'bg-red-500/20 border-red-500 text-red-400' :
                                    'bg-slate-900 border-white/5 text-slate-600 hover:border-white/20'
                                  }`}
                                >
                                  {val === 'yes' && '✓'}
                                  {val === 'no' && '✗'}
                                  {val === 'neutral' && ''}
                                </button>
                              );
                            })}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Reader Corner Tip */}
                <div className="bg-[#121124] border border-white/10 rounded-2xl p-6">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">DETECTIVE ACADEMY INSIGHT</span>
                  <p className="text-xs text-slate-300 italic leading-relaxed mt-2">
                    "Eliminate all other factors, and the one which remains must be the truth."
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono uppercase tracking-wide">
                    — Arthur Conan Doyle, Sherlock Holmes
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

      </section>

    </div>
  );
}
