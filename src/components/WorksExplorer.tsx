import React, { useState } from 'react';
import { CreativeWork } from '../types';
import { creativeWorks } from '../data';
import { Play, FileText, Layout, ChevronRight, ChevronLeft, Eye, X, BookOpen, AlertCircle, Bookmark, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WorksExplorerProps {
  filterByMode?: 'Sensible' | 'Passionate' | 'Balanced';
}

export default function WorksExplorer({ filterByMode }: WorksExplorerProps) {
  const [selectedType, setSelectedType] = useState<'all' | 'video' | 'presentation' | 'document'>('all');
  const [activeWork, setActiveWork] = useState<CreativeWork | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isReadingBookmark, setIsReadingBookmark] = useState<string[]>([]); // Saved chapters path highlights

  // Filtering based on type tabs
  const filteredWorks = creativeWorks.filter(work => {
    // Stage 1: Filter by tab selector
    if (selectedType !== 'all' && work.type !== selectedType) {
      return false;
    }

    // Stage 2: Filter by general personality focus if provided
    if (filterByMode === 'Sensible') {
      return work.type === 'document' || work.type === 'presentation';
    }
    if (filterByMode === 'Passionate') {
      return work.type === 'video' || work.id === 'w3'; // "w3" is very visual presentation
    }
    return true;
  });

  const getWorkIcon = (type: 'video' | 'presentation' | 'document') => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'presentation': return <Layout className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
    }
  };

  const getWorkTypeBadge = (type: 'video' | 'presentation' | 'document') => {
    switch (type) {
      case 'video': return 'Cinematic Video';
      case 'presentation': return 'Illustrated Presentation';
      case 'document': return 'Academic Document';
    }
  };

  const handleOpenWork = (work: CreativeWork) => {
    setActiveWork(work);
    setCurrentSlideIndex(0);
  };

  const handleCloseWork = () => {
    setActiveWork(null);
  };

  const toggleBookmark = (chapter: string) => {
    setIsReadingBookmark(prev => 
      prev.includes(chapter) ? prev.filter(c => c !== chapter) : [...prev, chapter]
    );
  };

  return (
    <div id="works-explorer-wrapper">
      {/* Tab Filter Button Row */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { key: 'all', label: 'All Artifacts' },
          { key: 'video', label: 'Memorable Videos' },
          { key: 'presentation', label: 'Illustrated Presentations' },
          { key: 'document', label: 'Deep-Researched Papers' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedType(tab.key as any)}
            className={`px-4 py-2 rounded-lg font-sans text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
              selectedType === tab.key
                ? 'bg-blue-750 text-white shadow-md'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {tab.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid of Works */}
      <div id="works-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredWorks.map((work) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={work.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-lg hover:border-slate-350 transition duration-200"
            >
              {/* Card Header visual background */}
              <div className={`h-28 bg-gradient-to-tr ${work.thumbnailColor} relative p-4 flex flex-col justify-between text-white`}>
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 bg-black/35 backdrop-blur-md rounded text-[9px] font-mono tracking-widest font-bold uppercase">
                    {getWorkTypeBadge(work.type)}
                  </span>
                  <div className="p-1 px-2 bg-white/10 rounded backdrop-blur-md text-xs font-mono">
                    {work.type === 'video' ? work.duration : work.type === 'presentation' ? `${work.slides?.length} slides` : 'Research Piece'}
                  </div>
                </div>

                <div className="p-2 bg-black/10 backdrop-blur-[2px] rounded border border-white/10 flex items-center justify-center w-8 h-8">
                  {getWorkIcon(work.type)}
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans font-bold text-base text-slate-800 tracking-tight leading-snug line-clamp-1">
                    {work.title}
                  </h4>
                  <p className="text-slate-500 font-sans text-xs mt-2 leading-relaxed line-clamp-3">
                    {work.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1">
                    {work.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                        #{tag.replace(' ', '')}
                      </span>
                    ))}
                  </div>

                  {/* Button row */}
                  <button
                    onClick={() => handleOpenWork(work)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-1.5 transition duration-200 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    OPEN INTERACTIVE DEMO
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Embedded work detail simulation popup / Modal */}
      <AnimatePresence>
        {activeWork && (
          <div id="artifact-viewer-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              id="artifact-viewer-modal"
              className="w-full max-w-4xl bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Modal header */}
              <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 text-orange-400 rounded-lg border border-orange-500/20">
                    {getWorkIcon(activeWork.type)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 block font-bold">
                      {getWorkTypeBadge(activeWork.type)} INTERACTIVE LAB
                    </span>
                    <h3 className="font-sans font-bold text-lg text-white leading-tight">
                      {activeWork.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={handleCloseWork}
                  className="p-1.5 hover:bg-slate-800 rounded-full transition text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal body (Interactive Viewer depending on category) */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-900">
                {activeWork.type === 'video' && (
                  <div id="simulated-video-player" className="flex flex-col gap-5">
                    {/* Dark modern mockup video player UI */}
                    <div className="aspect-video w-full rounded-xl bg-black relative flex items-center justify-center overflow-hidden border border-slate-800">
                      
                      {/* Artistic static scene mockup */}
                      <img 
                        src={activeWork.videoUrl} 
                        alt={activeWork.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-80 filter saturate-125 select-none pointer-events-none" 
                      />

                      {/* Video Player overlay mock controls */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-5 flex flex-col gap-3">
                        {/* Audio visualizer spectrum mock */}
                        <div className="flex items-end gap-0.5 justify-center h-8 opacity-75">
                          {[12, 18, 30, 24, 15, 36, 42, 28, 14, 20, 25, 40, 16, 22, 10, 18, 32, 27, 45, 12, 8, 16, 32, 22, 14, 38, 48, 25, 10, 18].map((val, i) => (
                            <motion.div 
                              key={i} 
                              animate={{ height: [val * 0.4, val, val * 0.5, val] }}
                              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.05 }}
                              className="w-1 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t"
                            />
                          ))}
                        </div>

                        {/* Video timeline block */}
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-slate-400">01:14</span>
                          <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden relative cursor-pointer">
                            <div className="absolute left-0 top-0 bottom-0 w-2/5 bg-orange-500 rounded-full" />
                            <div className="absolute left-2/5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">{activeWork.duration}</span>
                        </div>

                        {/* Buttons row */}
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-4">
                            <button className="text-orange-400 font-bold hover:text-orange-300 font-mono tracking-wider">PAUSED</button>
                            <span className="text-slate-500">|</span>
                            <span className="text-slate-400 font-mono text-[10px]">PREVIEW SIMULATOR READY [HD]</span>
                          </div>
                          <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400">
                            <span>Vol: 85%</span>
                            <span>Speed: 1.0x</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Creative Details */}
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                      <h4 className="text-xs uppercase font-mono text-slate-500 font-bold mb-2">Director's Production Manifesto</h4>
                      <p className="text-sm font-sans text-slate-350 leading-relaxed font-light">
                        {activeWork.description} This video was fully structured using pre-visualized geometric storyboards. Edited inside Adobe Premiere Pro and stabilized with high frame-rate motion flow, the highlight comes from synchronized sound beats matching visual cut transitions perfectly.
                      </p>
                      
                      {/* Tech stack spec details */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-900 text-xs">
                        <div>
                          <span className="text-slate-500 font-mono uppercase block text-[10px] font-semibold">Editing Tool</span>
                          <span className="font-sans text-slate-300">Adobe Premiere Pro</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-mono uppercase block text-[10px] font-semibold">Color Grade</span>
                          <span className="font-sans text-slate-300">Cinematic Amber & Gold</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-mono uppercase block text-[10px] font-semibold">Target Frame Rate</span>
                          <span className="font-sans text-slate-300">60 FPS Ultra-Smooth</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-mono uppercase block text-[10px] font-semibold">Audio System</span>
                          <span className="font-sans text-slate-300">Stereo High-Tempo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeWork.type === 'presentation' && activeWork.slides && (
                  <div id="simulated-presentation-slides" className="flex flex-col gap-6">
                    {/* Modern illustrated slide deck viewer device */}
                    <div className="bg-slate-100 rounded-xl p-6 md:p-8 aspect-[16/10] border border-slate-200 flex flex-col justify-between shadow-inner relative overflow-hidden text-slate-900">
                      
                      {/* Top wireframe marker */}
                      <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 tracking-widest border-b border-slate-200 pb-3 uppercase font-bold">
                        <span>Meddhansh’s Portfolio Lab</span>
                        <span>Slide Deck Simulator</span>
                      </div>

                      {/* Active Slide Content */}
                      <div className="my-6 md:my-10 flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Slide words */}
                        <div>
                          <h4 className="font-sans font-extrabold text-2xl text-blue-900 leading-tight tracking-tight mb-4">
                            {activeWork.slides[currentSlideIndex].title}
                          </h4>
                          <ul className="space-y-3.5">
                            {activeWork.slides[currentSlideIndex].bulletPoints.map((pt, i) => (
                              <li key={i} className="flex gap-2.5 items-start text-xs font-sans text-slate-700 leading-relaxed">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 shrink-0" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Interactive diagram representation */}
                        <div className="bg-white/95 rounded-lg border border-slate-200 p-4 shadow flex flex-col justify-between h-full min-h-[160px]">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-2">Visual Mapping Sketch</span>
                            <p className="text-slate-600 font-sans text-xs italic leading-relaxed">
                              "{activeWork.slides[currentSlideIndex].visualConcept}"
                            </p>
                          </div>
                          
                          {/* Aesthetic grid sketch placeholder */}
                          <div className="h-10 border-t border-slate-100 pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                            <span>GRID BLOCK ALIGN</span>
                            <span className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center text-[8px] text-white font-bold font-serif">o</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom slide pager navigation controls bar */}
                      <div className="flex justify-between items-center border-t border-slate-200 pt-3">
                        <span className="text-[11px] font-mono text-slate-500 font-bold uppercase">
                          Slide {currentSlideIndex + 1} of {activeWork.slides.length}
                        </span>

                        <div className="flex gap-1.5">
                          <button
                            disabled={currentSlideIndex === 0}
                            onClick={() => setCurrentSlideIndex(prev => prev - 1)}
                            className="p-1.5 bg-white border border-slate-200 rounded disabled:opacity-40 select-none hover:bg-slate-50 transition duration-200 cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4 text-slate-800" />
                          </button>
                          <button
                            disabled={currentSlideIndex === activeWork.slides.length - 1}
                            onClick={() => setCurrentSlideIndex(prev => prev + 1)}
                            className="p-1.5 bg-white border border-slate-200 rounded disabled:opacity-40 select-none hover:bg-slate-50 transition duration-200 cursor-pointer"
                          >
                            <ChevronRight className="w-4 h-4 text-slate-800" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Designer logic */}
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                      <h4 className="text-xs uppercase font-mono text-slate-500 font-bold mb-2">Presenter Design Blueprint</h4>
                      <p className="text-sm font-sans text-slate-350 leading-relaxed font-light">
                        This sequence is optimized for deep corporate presentation. Rather than clutter slides with full paragraphs of text, only high-impact conceptual highlights are shown. The speaker is expected to verbally carry the nuance while the slide acts as structural mental milestones.
                      </p>
                    </div>
                  </div>
                )}

                {activeWork.type === 'document' && activeWork.documentContent && (
                  <div id="simulated-academic-document" className="flex flex-col gap-6">
                    {/* Clean legal/academic book layout */}
                    <div className="bg-stone-50 text-stone-900 rounded-xl p-6 md:p-10 border border-stone-200 shadow-xl flex flex-col font-serif">
                      
                      {/* Document Meta Header info */}
                      <div className="flex justify-between items-center border-b border-stone-200 pb-4 mb-6 text-xs text-stone-500 font-mono font-bold uppercase tracking-widest leading-none">
                        <span>The Doon School Research Ledger</span>
                        <span>VOL. XXII</span>
                      </div>

                      {/* Dynamic Chapter renderer */}
                      <div className="space-y-8 flex-1">
                        {activeWork.documentContent.map((chapter, i) => (
                          <div key={i} className="relative">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-bold text-lg text-stone-800 tracking-tight border-b-2 border-stone-200 pb-1">
                                {chapter.section}
                              </h4>
                              <button
                                onClick={() => toggleBookmark(chapter.section)}
                                className={`p-1.5 rounded border text-[10px] font-mono tracking-wider uppercase font-bold flex items-center gap-1 transition ${
                                  isReadingBookmark.includes(chapter.section)
                                    ? 'bg-amber-100 border-amber-400 text-amber-800 font-extrabold'
                                    : 'bg-stone-100 border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-200'
                                }`}
                              >
                                <Bookmark className="w-3.5 h-3.5" />
                                {isReadingBookmark.includes(chapter.section) ? 'Highlighted' : 'Highlight Section'}
                              </button>
                            </div>

                            <div className={`space-y-4 text-justify leading-relaxed text-sm antialiased text-stone-850 pl-0 md:pl-4 border-l ${
                              isReadingBookmark.includes(chapter.section) ? 'bg-amber-100/50 border-amber-500 p-3 rounded-r-lg' : 'border-transparent'
                            }`}>
                              {chapter.paragraphs.map((para, pi) => (
                                <p key={pi}>
                                  {para}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer signatures */}
                      <div className="border-t border-stone-200 mt-10 pt-4 flex justify-between items-center text-xs text-stone-500 font-mono">
                        <span>Reviewer Sign-off: AUTHORIZED</span>
                        <span>Page 02 SPAN</span>
                      </div>
                    </div>

                    {/* Academic notes card helper */}
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex items-start gap-4">
                      <BookOpen className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <h5 className="font-mono uppercase font-bold text-slate-400">Literature & Critique Methodology</h5>
                        <p className="text-slate-400 font-sans mt-1 leading-relaxed">
                          This analytical writing is fully referenced and formatted according to Chicago Manual of Style guidelines. Synthesizing secondary texts, Meddhansh crafts sharp comparative matrices to locate ideological shifts across historical epochs.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
