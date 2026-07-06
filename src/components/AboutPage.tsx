import React from "react";
import {
  ArrowRight,
  Video,
  Layout,
  Search,
  BookOpen,
  Compass,
  Flame,
  Book,
} from "lucide-react";
import profileImage from "../assets/images/image-2.png"; // Update the path and extension as needed

interface AboutPageProps {
  onGoToTab: (tab: "home" | "books") => void;
  onOpenConnect: () => void;
}

export default function AboutPage({
  onGoToTab,
  onOpenConnect,
}: AboutPageProps) {
  return (
    <div className="bg-[#0E0C22] text-slate-100 min-h-screen selection:bg-orange-500 selection:text-white font-sans">
      {/* 1. HERO WITH DARK DOTTED GRID CANVAS */}
      <section className="relative pt-16 pb-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto border-b border-white/5 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px]">
        {/* Top absolute corner tag */}
        <div className="mb-8">
          <span className="px-3 py-1 bg-[#DE3163] text-white font-mono text-[9px] font-black tracking-widest uppercase rounded">
            PORTFOLIO EXPLORER
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Texts */}
          <div className="lg:col-span-8 space-y-8 z-10">
            <h1 className="font-serif font-black text-6xl md:text-8.5xl leading-[0.95] text-[#3C4EF2] tracking-tighter uppercase">
              ABOUT
              <br />
              MEDDHANSH
            </h1>

            {/* Left light blue side bar for tagline */}
            <div className="flex items-stretch gap-4">
              <span className="w-1.5 bg-[#3C4EF2] rounded-full" />
              <p className="font-sans font-bold text-lg text-slate-300 leading-relaxed">
                Student, Visionary Explorer, and Lifelong Learner.
              </p>
            </div>

            {/* Controls row removed as requested */}
          </div>

          {/* Right Grey Box Placeholder Canvas */}
          <div className="lg:col-span-4 flex justify-center z-10">
            <div className="relative w-64 h-80">
              {/* Double offset outline frames matching style */}
              <div className="absolute inset-0 border-2 border-orange-500 translate-x-4 translate-y-4 pointer-events-none" />
              <div className="absolute inset-0 border-2 border-blue-600 -translate-x-2 -translate-y-2 pointer-events-none" />

              {/* Solid minimalist grey container */}
              <div className="w-full h-full rounded-none border border-slate-700 shadow-2xl relative overflow-hidden bg-[#1B1B2F]">
                <img
                  src={profileImage}
                  alt="Meddhansh Rupal"
                  className="w-full h-full object-cover"
                />

                {/* Optional dark overlay for a cinematic look */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                {/* Optional name at the bottom */}
                <div className="absolute bottom-4 left-0 right-0 text-center z-10">
                  <h4 className="font-serif font-black text-sm text-white tracking-wide uppercase">
                    Meddhansh Rupal
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SCHOOL & CREATIVE VISION */}
      <section className="py-20 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left text block */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif font-black text-4xl leading-tight text-white uppercase">
            THE DOON SCHOOL{" "}
            <span className="text-indigo-400 font-serif italic font-light">
              &
            </span>
            <br />
            CREATIVE VISION
          </h2>
          <div className="w-16 h-1 bg-[#DE3163] rounded" />

          <div className="space-y-4">
            <p className="font-sans font-bold text-lg text-slate-300 leading-relaxed">
              I'm{" "}
              <span className="text-[#3C4EF2] font-black">Meddhansh Rupal</span>
              , a student based in Ludhiana. I am a student of{" "}
              <span className="underline decoration-[#DE3163] decoration-2 underline-offset-4 text-orange-400 italic font-serif">
                The Doon School, Dehradun.
              </span>
            </p>
            <p className="font-sans text-xs text-slate-400 leading-relaxed text-justify font-light">
              I create memorable videos, illustrated and attractive
              presentations, and deep-researched documents. My approach combines
              rigorous academic discipline with a disruptive avant-garde
              aesthetic.
            </p>
          </div>
        </div>

        {/* Right graphical blocks (Video, Presentation, Deep Research) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Blue card (Video Creation) */}
          <div className="p-6 bg-[#3C4EF2] border border-[#2B3FF4] rounded-none flex flex-col justify-between min-h-[140px] shadow-lg">
            <Video className="w-8 h-8 text-white stroke-2" />
            <div>
              <h4 className="font-sans font-extrabold text-xs tracking-widest text-white uppercase mt-4">
                Video Creation
              </h4>
            </div>
          </div>

          {/* Orange card (Presentations) */}
          <div className="p-6 bg-[#FF5522] border border-[#FF4411] rounded-none flex flex-col justify-between min-h-[140px] shadow-lg">
            <Layout className="w-8 h-8 text-white stroke-2" />
            <div>
              <h4 className="font-sans font-extrabold text-xs tracking-widest text-white uppercase mt-4">
                Presentations
              </h4>
            </div>
          </div>

          {/* Wide dark card (Deep Research) */}
          <div className="sm:col-span-2 p-6 bg-[#0E0C22] border-2 border-blue-600/50 rounded-none flex flex-col justify-between min-h-[120px] shadow-inner relative overflow-hidden">
            <Search className="w-8 h-8 text-white stroke-2" />
            <div>
              <h4 className="font-sans font-extrabold text-xs tracking-widest text-white uppercase mt-4">
                Deep Research
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ENTIRE PAGE BARUCH QUOTE */}
      <section className="bg-[#0A0918] py-20 px-6 md:px-12 border-y border-white/5 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="font-serif italic font-extrabold text-xl md:text-3.5xl text-[#3C4EF2] tracking-tight leading-relaxed uppercase">
            "BE WHO YOU ARE AND SAY WHAT YOU FEEL, BECAUSE THOSE WHO MIND DON'T
            MATTER, AND THOSE WHO MATTER DON'T MIND."
          </p>
          <div className="h-[1px] w-20 bg-slate-800 mx-auto" />
          <span className="font-mono text-[9px] tracking-widest text-[#DE3163] block font-black uppercase">
            — BERNARD M. BARUCH
          </span>
        </div>
      </section>

      {/* 4. INTERESTS & PASSIONS (SQUASH, BADMINTON, CRICKET, HOCKEY, READER) */}
      <section className="py-20 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto space-y-12">
        {/* Header Title with giant orange accent */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3 border-b border-white/5 pb-6">
          <div>
            <h2 className="font-serif font-black text-4xl md:text-5xl leading-none text-white tracking-tight">
              INTERESTS
              <br />
              <span className="text-[#FF5522] font-serif font-black">
                & PASSIONS
              </span>
            </h2>
          </div>
          <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest font-bold">
            DIVERSIFIED GROWTH
          </span>
        </div>

        {/* Interests Grid Matching Mockup Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Squash (Row 1 Left - 5 columns) */}
          <div className="md:col-span-5 p-8 bg-[#0E0C22] border-2 border-[#3C4EF2]/50 rounded-none flex flex-col justify-between shadow-lg relative overflow-hidden min-h-[180px]">
            <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
              <Compass className="w-36 h-36 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-serif font-black text-3xl tracking-tight text-[#3C4EF2] uppercase">
                Squash
              </h3>
              <p className="text-[10px] uppercase font-mono tracking-wider text-slate-550 font-bold mt-1">
                INTERMEDIATE PLAYER
              </p>
            </div>
          </div>

          {/* Badminton (Row 1 Middle - 3 columns to prevent text overflow) */}
          <div className="md:col-span-3 p-6 bg-[#0E0C22] border-2 border-slate-800 rounded-none flex flex-col justify-between shadow-lg min-h-[180px]">
            <div className="flex justify-between items-start">
              {/* Elegant custom CSS Badminton Racket */}
              <div
                className="relative w-8 h-12 flex-shrink-0"
                aria-label="Badminton Racket"
              >
                {/* Racket Oval Head */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-7 border-2 border-[#FF5522] rounded-full flex items-center justify-center overflow-hidden">
                  {/* Grid string lines inside */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#FF5522_1px,transparent_1px),linear-gradient(to_bottom,#FF5522_1px,transparent_1px)] bg-[size:4px_4px] opacity-30" />
                </div>
                {/* Shaft */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-[#FF5522]" />
                {/* Handle */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-2.5 bg-[#FF5522] rounded-sm" />
              </div>
            </div>
            <div>
              <h4 className="font-serif font-black text-lg text-[#FF5522] uppercase">
                Badminton
              </h4>
              <p className="text-[10px] font-mono text-slate-550 font-bold uppercase mt-1">
                Beginner
              </p>
            </div>
          </div>

          {/* Avid Reader (Row 1 & 2 Right Tall Card - 4 columns, made smaller as requested) */}
          <div
            onClick={() => onGoToTab("books")}
            className="md:col-span-4 md:row-span-2 p-6 bg-[#5A1C49] border border-[#782461] rounded-none flex flex-col justify-center items-center text-pink-50 shadow-xl cursor-pointer text-center min-h-[260px] relative hover:opacity-90 transition duration-150"
          >
            <Book className="w-10 h-10 text-white mb-6" />

            <div className="space-y-3">
              <h4 className="font-serif font-black text-2xl leading-tight uppercase tracking-tight">
                AVID READER
              </h4>
              <p className="text-[9px] font-mono tracking-wider font-extrabold text-orange-300 uppercase block">
                FICTION & MURDER-MYSTERY ENTHUSIAST
              </p>
            </div>
          </div>

          {/* Cricket (Row 2 Left - 4 columns, text on single line) */}
          <div className="md:col-span-4 p-8 bg-[#FF5522] border border-[#FF4411] rounded-none flex flex-col justify-between text-white shadow-xl min-h-[140px]">
            <Flame className="w-8 h-8 text-white" />
            <div>
              <h4 className="font-serif font-black text-3xl uppercase tracking-tight leading-none">
                CRICKET
              </h4>
            </div>
          </div>

          {/* Hockey (Row 2 Middle - 4 columns, made smaller) */}
          <div className="md:col-span-4 p-8 bg-[#0E0C22] border-2 border-slate-800 rounded-none flex flex-row justify-between items-center shadow-lg min-h-[140px]">
            <div className="flex flex-col gap-1">
              <h3 className="font-serif font-black text-2xl tracking-tight text-white uppercase flex items-center gap-2">
                HOCKEY
              </h3>
            </div>

            {/* Minimalist custom CSS Hockey Stick instead of a line */}
            <div
              className="relative w-8 h-12 flex-shrink-0"
              aria-label="Hockey Stick"
            >
              {/* Shaft */}
              <div className="absolute right-3 top-0 w-1.5 h-10 bg-[#FF5522] rounded-full transform -rotate-[15deg] origin-bottom-right" />
              {/* Blade/Hook */}
              <div className="absolute right-1 bottom-1 w-5 h-2.5 bg-[#FF5522] rounded-r-full rounded-bl-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION CONTACT */}
      <section className="py-20 px-6 md:px-12 text-center bg-[#0E0C22]">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="font-serif font-bold text-2xl md:text-3xl text-white">
            Let's build beautiful, precise works together.
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
            Have a proposal or want to exchange whodunit book reviews? Click to
            send a direct message into Meddhansh's school mail inbox.
          </p>
          <button
            onClick={onOpenConnect}
            className="px-6 py-3.5 bg-[#FF5522] hover:bg-[#FF4411] text-white font-sans font-bold text-xs uppercase tracking-wider rounded transition-transform cursor-pointer shadow-lg inline-flex items-center gap-2"
          >
            Launch Connection Portal
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </section>
    </div>
  );
}
