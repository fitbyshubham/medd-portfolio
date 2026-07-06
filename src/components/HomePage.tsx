import React, { useState, useRef } from 'react';
import { 
  Compass, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Award, 
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import InteractivePersonality from './InteractivePersonality';
import CrypticBookshelf from './CrypticBookshelf';

interface HomePageProps {
  onOpenConnect: () => void;
  activeInteractiveSubSection: 'works' | 'books';
  setActiveInteractiveSubSection: (section: 'works' | 'books') => void;
  scrollToLab: () => void;
  scrollToInteractiveLab: (section: 'works' | 'books') => void;
  interactiveLabRef: React.RefObject<HTMLDivElement | null>;
}

export default function HomePage({ 
  onOpenConnect, 
  activeInteractiveSubSection, 
  setActiveInteractiveSubSection,
  scrollToLab,
  scrollToInteractiveLab,
  interactiveLabRef
}: HomePageProps) {
  const [activeMode, setActiveMode] = useState<'Sensible' | 'Passionate' | 'Balanced'>('Balanced');

  return (
    <>
      {/* HERO SECTION MATCHING DESIGN SPEC */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side (Words & Bio) */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-orange-500 rounded-sm"></span>
            <div className="h-[2px] w-12 bg-orange-500/30"></div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl border border-purple-100 shadow-sm w-full max-w-2xl transform hover:scale-[1.005] transition-transform">
            <h1 className="font-serif font-black text-5xl md:text-6xl text-slate-950 tracking-tight leading-none mb-2">
              Hi, I'm <span className="text-orange-500">Meddhansh</span>
            </h1>
          </div>

          {/* Capitalized monospace paragraph board matching design */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 p-6 md:p-8 rounded-2xl w-full max-w-2xl">
            <p className="text-slate-800 font-mono text-sm leading-relaxed tracking-wide text-justify uppercase font-bold">
              I CREATE MEMORABLE VIDEOS, ILLUSTRATED AND ATTRACTIVE PRESENTATIONS, AND DEEP-RESEARCHED DOCUMENTS. 
              I AM AN INTERMEDIATE SQUASH PLAYER AND A BEGINNER BADMINTON PLAYER. I ALSO PLAY CRICKET AND HOCKEY. 
              I LIKE TO READ FICTION AND MURDER-MYSTERY.
            </p>
          </div>

          <button 
            onClick={scrollToLab}
            className="px-6 py-3.5 border-2 border-orange-500 hover:bg-orange-50 text-orange-600 font-sans font-black text-sm tracking-wider uppercase bg-white rounded transition duration-200 cursor-pointer shadow-sm flex items-center gap-2 hover:gap-3"
          >
            Explore Bookshelf
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Side (Dynamic Avatar & Theme Controller Wheel) */}
        <div className="lg:col-span-5 flex justify-center py-6">
          <InteractivePersonality 
            activeMode={activeMode} 
            onChangeMode={(mode) => setActiveMode(mode)} 
          />
        </div>
      </section>

      {/* QUOTATION SECTION */}
      <section className="bg-white border-y border-purple-100/50 py-16 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <span className="text-5xl font-serif text-orange-500 font-black leading-none select-none">”</span>
          
          <h2 className="font-serif italic font-bold text-2xl md:text-3.5xl text-slate-900 tracking-tight leading-relaxed max-w-3xl">
            -Do the best you can until you know better. Then when you know better, do better.-
          </h2>
          
          <span className="font-sans font-bold text-xs tracking-widest text-orange-500 uppercase mt-2">
            — Maya Angelou
          </span>
        </div>
      </section>

      {/* GIANT GRADIENT TEXT DIVIDER SECTION */}
      <div className="w-full bg-white/40 border-b border-purple-100/30 py-6 md:py-8 flex justify-center items-center overflow-hidden">
        <h2 
          className="font-sans font-black text-[12vw] sm:text-[10vw] md:text-[8.5vw] uppercase leading-none select-none bg-gradient-to-r from-[#F87171]/20 via-[#C084FC]/30 to-[#818CF8]/25 bg-clip-text text-transparent"
          style={{ letterSpacing: '-0.065em' }}
        >
          MEDDHANSH
        </h2>
      </div>

      {/* CORE PHILOSOPHIES / THREE CARDS PANEL */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Giant ghost font title in background */}
        <div className="text-center relative select-none pointer-events-none mb-12">
          <span className="font-serif font-black text-6xl md:text-9xl text-slate-200/50 uppercase tracking-widest block leading-none">
            Meddhansh
          </span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
            <span className="text-xs font-mono font-bold text-indigo-600 tracking-widest uppercase bg-[#F0EBF9] px-4 py-2 border border-purple-100 rounded-full">
              GUIDING PHILOSOPHIES
            </span>
          </div>
        </div>

        {/* Three core columns based on the design mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-6">
          
          {/* Card 1: Intellectual Curiosity */}
          <div 
            id="philosophy-item-1"
            className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
            onClick={() => scrollToInteractiveLab('books')}
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight leading-tight">
                  Intellectual Curiosity
                </h4>
                <p className="text-slate-400 font-mono text-[10px] mt-1 tracking-wider">GUIDED BY INQUIRY</p>
              </div>
            </div>
            <p className="text-slate-500 font-sans text-xs mt-6 leading-relaxed uppercase font-bold border-t border-slate-100 pt-4">
              EVERY BIG INVENTION CAME TO LIFE BECAUSE SOMEONE ASKED WHY?
            </p>
          </div>

          {/* Card 2: Strategic Boldness (The highlighted centerpiece) */}
          <div 
            id="philosophy-item-2"
            className="relative bg-blue-755 text-white bg-blue-750 rounded-2xl p-8 flex flex-col justify-between cursor-pointer group shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(249,115,22,1)] transition-all duration-200"
            onClick={() => scrollToInteractiveLab('books')}
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-white/10 text-orange-400 border border-white/20 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-xl text-white tracking-tight leading-tight">
                  Strategic Boldness
                </h4>
                <p className="text-blue-200 font-mono text-[10px] mt-1 tracking-wider">EXECUTION & POWER</p>
              </div>
            </div>
            <p className="text-orange-355 text-orange-300 font-sans text-xs mt-6 leading-relaxed uppercase font-black border-t border-white/10 pt-4">
              THINKING BEFORE ACTING!
            </p>
          </div>

          {/* Card 3: Striking the Balance */}
          <div 
            id="philosophy-item-3"
            className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
            onClick={() => scrollToInteractiveLab('books')}
          >
            <div className="space-y-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight leading-tight">
                  Striking the Balance
                </h4>
                <p className="text-slate-400 font-mono text-[10px] mt-1 tracking-wider">THE MIDPOINT SYNTHESIS</p>
              </div>
            </div>
            <p className="text-slate-500 font-sans text-xs mt-6 leading-relaxed uppercase font-bold border-t border-slate-100 pt-4">
              THE PAST HAS GONE, THE FUTURE IS YET TO COME, THE PRESENT IS BEING THOUGHT UPON.
            </p>
          </div>

        </div>
      </section>

      {/* INTERACTIVE WORKSPACE LAB TERMINAL */}
      <section ref={interactiveLabRef} id="interactive-workspace-lab" className="bg-slate-100 py-16 px-6 md:px-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Segment Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-slate-300 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="text-[10px] tracking-widest font-mono text-indigo-700 font-extrabold uppercase">MEDDHANSH COGNITIVE HUB</span>
              </div>
              <h2 className="font-sans font-black text-2xl md:text-3.5xl text-slate-900 tracking-tight mt-1">
                The Cryptic Bookshelf Riddle
              </h2>
            </div>
          </div>

          {/* Interactive display board container presenting Bookshelf directly */}
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl overflow-hidden min-h-[450px]">
            <div className="mb-6 border-b border-slate-100 pb-4">
              <span className="text-orange-500 font-mono text-[10px] font-bold tracking-widest uppercase">COGNITIVE SOLVER</span>
              <h3 className="text-xl font-sans font-black text-slate-800 tracking-tight mt-1">The Cryptic Locked-Room Bookshelf</h3>
              <p className="text-xs text-slate-550 mt-1 font-sans text-slate-500">
                Unveil reviews of foundational whodunit mysteries, hard science fiction novels, and solve the Agatha Christie literary riddle.
              </p>
            </div>
            <CrypticBookshelf />
          </div>

        </div>
      </section>
    </>
  );
}
