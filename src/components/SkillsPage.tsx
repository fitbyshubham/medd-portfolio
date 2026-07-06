import React from 'react';
import { 
  Briefcase, 
  MessageSquare, 
  BookOpen, 
  Star, 
  Sparkles,
  Wrench
} from 'lucide-react';

interface SkillsPageProps {
  onOpenConnect: () => void;
}

export default function SkillsPage({ onOpenConnect }: SkillsPageProps) {
  return (
    <div className="bg-[#F5F3FA] text-slate-950 min-h-screen font-sans selection:bg-orange-500 selection:text-white pb-24">
      
      {/* HEADER HERO AREA */}
      <section className="px-6 md:px-16 lg:px-24 pt-16 pb-12 max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Main big blocky title exactly like screenshot */}
          <h1 className="font-sans font-black text-6xl md:text-8.5xl tracking-tighter uppercase leading-none select-none">
            <span className="text-[#0E0C22]">SKILLS </span>
            <span className="text-[#3C4EF2]">& </span>
            <span className="text-[#FF5522]">TOOLS</span>
          </h1>

          {/* Sub-badge: solid blue card with orange outline/shadow */}
          <div className="inline-block">
            <div className="px-4 py-2 bg-[#1B1FAD] text-white font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0px_0px_#FF5522] border border-[#1B1FAD]">
              WHAT I BRING TO THE TABLE
            </div>
          </div>

          {/* Solid orange briefcase icon box with blue shadow/outline */}
          <div className="pt-4">
            <div className="w-14 h-14 bg-[#FF5522] flex items-center justify-center border border-[#FF5522] shadow-[3px_3px_0px_0px_#1B1FAD]">
              <Briefcase className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
          </div>
        </div>
      </section>

      {/* CORE EXPERTISE (TOP SHELF) */}
      <section className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto mt-8">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold mb-6 block">
          TOP SHELF: CORE EXPERTISE
        </span>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Debating Card */}
          <div className="bg-white p-8 border border-slate-200 shadow-[6px_6px_0px_0px_#1B1FAD] hover:shadow-[8px_8px_0px_0px_#1B1FAD] transition-all duration-150 flex flex-col justify-between min-h-[300px]">
            <div>
              {/* Top Row */}
              <div className="flex justify-between items-start">
                <MessageSquare className="w-8 h-8 text-[#1B1FAD] stroke-[2.5]" />
                <span className="px-2.5 py-1 border border-slate-300 rounded text-[9px] font-mono text-slate-500 font-bold uppercase">
                  INTELLECTUAL
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-sans font-black text-4xl md:text-5xl text-[#0E0C22] tracking-tighter uppercase mt-6 mb-4">
                DEBATING
              </h3>
              
              {/* Description */}
              <p className="text-[11px] font-sans text-slate-600 font-bold uppercase tracking-wide leading-relaxed">
                CONSTRUCTING COMPELLING ARGUMENTS AND ENGAGING IN HIGH-STAKES INTELLECTUAL DISCOURSE.
              </p>
            </div>

            {/* Proficiency Bar */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold uppercase">
                <span>PROFICIENCY</span>
                <span>95%</span>
              </div>
              <div className="w-full h-1.5 bg-[#F0EBF9] rounded-full overflow-hidden">
                <div className="h-full bg-[#1B1FAD] rounded-full" style={{ width: '95%' }} />
              </div>
            </div>
          </div>

          {/* Ceramics Card */}
          <div className="bg-[#FF5522] text-white p-8 border border-[#FF5522] shadow-[6px_6px_0px_0px_#1B1FAD] hover:shadow-[8px_8px_0px_0px_#1B1FAD] transition-all duration-150 flex flex-col justify-between min-h-[300px]">
            <div>
              {/* Top spacing / visual */}
              <div className="h-8" />
              
              {/* Title split in light and heavy font exactly as in mockup */}
              <div className="mt-6 mb-4">
                <div className="font-serif font-light text-3xl uppercase tracking-wide leading-none">VASE</div>
                <div className="font-sans font-black text-5xl uppercase tracking-tighter leading-none mt-1">CERAMICS</div>
              </div>
              
              {/* Description */}
              <p className="text-[11px] font-sans text-orange-100 font-bold uppercase tracking-wide leading-relaxed">
                CRAFTING UNIQUE, TANGIBLE ART THROUGH THE INTERSECTION OF TRADITIONAL POTTERY AND MODERN FORM.
              </p>
            </div>

            {/* Proficiency Bar */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-orange-200 font-bold uppercase">
                <span>PROFICIENCY</span>
                <span>85%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E03B0D] rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CREATIVE & SOFT SKILLS (MIDDLE SHELF) */}
      <section className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto mt-16">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold mb-6 block">
          MIDDLE SHELF: CREATIVE & SOFT SKILLS
        </span>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Creative Writing Card */}
          <div className="bg-[#1B1FAD] text-white p-8 border border-[#1B1FAD] shadow-[6px_6px_0px_0px_#FF5522] hover:shadow-[8px_8px_0px_0px_#FF5522] transition-all duration-150 flex flex-col justify-between min-h-[280px]">
            <div>
              <BookOpen className="w-8 h-8 text-white stroke-[2.5]" />
              
              {/* Title exactly as requested */}
              <h4 className="font-sans font-black text-3.5xl uppercase tracking-tighter leading-none mt-6 mb-4">
                CREATIVE<br />
                WRITING
              </h4>
              
              {/* Description */}
              <p className="text-[11px] font-sans text-blue-100 font-bold uppercase tracking-wide leading-relaxed">
                DEVELOPING COMPELLING NARRATIVES ACROSS VARIOUS DIGITAL FORMATS.
              </p>
            </div>

            {/* Proficiency Bar */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-blue-200 font-bold uppercase">
                <span>PROFICIENCY</span>
                <span>90%</span>
              </div>
              <div className="w-full h-1.5 bg-[#12157A] rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: '90%' }} />
              </div>
            </div>
          </div>

          {/* Unflappable Card */}
          <div className="bg-white p-8 border border-slate-200 shadow-[6px_6px_0px_0px_#1B1FAD] hover:shadow-[8px_8px_0px_0px_#1B1FAD] transition-all duration-150 flex flex-col justify-between min-h-[280px]">
            <div>
              {/* Top Row */}
              <div className="flex justify-between items-start">
                <Star className="w-7 h-7 text-[#FF5522] stroke-[2.5]" />
                <span className="px-2.5 py-1 border border-slate-300 rounded text-[9px] font-mono text-slate-500 font-bold uppercase">
                  SOFT SKILL
                </span>
              </div>
              
              {/* Title in one line */}
              <h4 className="font-sans font-black text-3.5xl uppercase tracking-tighter leading-none mt-6 mb-4">
                UNFLAPPABLE
              </h4>
              
              {/* Description */}
              <p className="text-[11px] font-sans text-slate-600 font-bold uppercase tracking-wide leading-relaxed">
                MAINTAINING A CALM, FOCUSED PRESENCE EVEN IN HIGH-PRESSURE SITUATIONS.
              </p>
            </div>

            {/* Proficiency Bar */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold uppercase">
                <span>PROFICIENCY</span>
                <span>88%</span>
              </div>
              <div className="w-full h-1.5 bg-[#F0EBF9] rounded-full overflow-hidden">
                <div className="h-full bg-[#FF5522] rounded-full" style={{ width: '88%' }} />
              </div>
            </div>
          </div>

          {/* Creative Problem Solving Card */}
          <div className="bg-[#FF5522] text-white p-8 border border-[#FF5522] shadow-[6px_6px_0px_0px_#1B1FAD] hover:shadow-[8px_8px_0px_0px_#1B1FAD] transition-all duration-150 flex flex-col justify-between min-h-[280px]">
            <div>
              <Sparkles className="w-8 h-8 text-white stroke-[2.5]" />
              
              {/* Title */}
              <h4 className="font-sans font-black text-3.5xl uppercase tracking-tighter leading-none mt-6 mb-4">
                CREATIVE<br />
                PROBLEM<br />
                SOLVING
              </h4>
              
              {/* Description */}
              <p className="text-[11px] font-sans text-orange-100 font-bold uppercase tracking-wide leading-relaxed">
                APPROACHING COMPLEX CHALLENGES WITH AN INNOVATIVE MINDSET.
              </p>
            </div>

            {/* Proficiency Bar */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-orange-200 font-bold uppercase">
                <span>PROFICIENCY</span>
                <span>92%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E03B0D] rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* LEADERSHIP (BASE SHELF) */}
      <section className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto mt-16">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold mb-6 block">
          BASE SHELF: LEADERSHIP
        </span>

        {/* Wide Single Card */}
        <div className="bg-white p-8 md:p-10 border border-slate-200 shadow-[6px_6px_0px_0px_#FF5522] hover:shadow-[8px_8px_0px_0px_#FF5522] transition-all duration-150 flex flex-col justify-between min-h-[220px]">
          <div>
            <Sparkles className="w-8 h-8 text-[#1B1FAD] stroke-[2.5]" />
            
            {/* Title */}
            <h3 className="font-sans font-black text-4xl md:text-5.5xl text-[#0E0C22] tracking-tighter uppercase mt-6 mb-4">
              LEADERSHIP
            </h3>
            
            {/* Description */}
            <p className="text-[11px] font-sans text-slate-600 font-bold uppercase tracking-wide leading-relaxed">
              GUIDING TEAMS WITH A VISIONARY OUTLOOK AND INSPIRING OTHERS TOWARD SHARED GOALS.
            </p>
          </div>

          {/* Proficiency Bar */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold uppercase">
              <span>PROFICIENCY</span>
              <span>82%</span>
            </div>
            <div className="w-full h-1.5 bg-[#F0EBF9] rounded-full overflow-hidden">
              <div className="h-full bg-[#1B1FAD] rounded-full" style={{ width: '82%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* WORK-IN-PROGRESS SHELF: THE TOOLBOX */}
      <section className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto mt-16 pb-16">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping" />
          <span className="text-[10px] font-mono text-[#FF5522] uppercase tracking-widest font-extrabold">
            IN-PROGRESS SHELF: THE TOOLBOX
          </span>
        </div>

        {/* Industrial / Blueprint style toolbox card */}
        <div className="bg-[#121421] text-white p-8 md:p-10 border-2 border-dashed border-orange-500 shadow-[6px_6px_0px_0px_#1B1FAD] relative overflow-hidden">
          {/* Grid background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none" />

          <div className="relative z-10">
            {/* Header section with status badges */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-orange-500 text-white font-mono text-[9px] font-bold uppercase tracking-widest">
                    UNDER CONSTRUCTION
                  </span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 font-mono text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <Wrench className="w-2.5 h-2.5 text-orange-400" /> CALIBRATING
                  </span>
                </div>
                <h3 className="font-sans font-black text-4xl md:text-5xl text-white tracking-tighter uppercase leading-none">
                  WEB DESIGNING
                </h3>
              </div>

              {/* Progress Dial indicator */}
              <div className="bg-[#FF5522] text-white p-5 border border-[#FF5522] shadow-[4px_4px_0px_0px_#1B1FAD] text-center shrink-0">
                <span className="block text-[8px] font-mono uppercase tracking-widest text-orange-200">ASSEMBLING LEVEL</span>
                <span className="block font-sans font-black text-4.5xl leading-none mt-1">68%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
