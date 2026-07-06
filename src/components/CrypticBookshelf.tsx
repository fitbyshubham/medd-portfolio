import React, { useState } from 'react';
import { Book } from '../types';
import { bookReviews } from '../data';
import { BookOpen, Sparkles, Star, ChevronRight, HelpCircle, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CrypticBookshelf() {
  const [selectedBookId, setSelectedBookId] = useState<string>('b1');
  const [userGuess, setUserGuess] = useState<string>('');
  const [quizOutput, setQuizOutput] = useState<{ status: 'idle' | 'success' | 'error'; msg: string }>({ status: 'idle', msg: '' });

  const activeBook = bookReviews.find(b => b.id === selectedBookId) || bookReviews[0];

  // Whodunit mini riddle quiz
  const handleSolveAckroyd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userGuess.trim()) return;

    const formatted = userGuess.toLowerCase().trim();
    if (formatted.includes('sheppard') || formatted.includes('doctor') || formatted.includes('dr.')) {
      setQuizOutput({
        status: 'success',
        msg: "Phenomenal deduction! Indeed, Dr. James Sheppard - the reliable narrator himself - was the murderer all along. Christie's genius was making the chronicler the culprit."
      });
    } else {
      setQuizOutput({
        status: 'error',
        msg: "Not quite. Re-read Poirot's final assembly! Keep in mind the narrator's missing hours and the dictaphone..."
      });
    }
  };

  return (
    <div id="cryptic-bookshelf-component" className="bg-slate-900 text-slate-100 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Shelf Display (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-orange-400" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold">LITERARY EXPEDITION</span>
            </div>
            
            <h3 className="font-sans font-black text-xl text-white tracking-tight leading-none mb-1">
              The Cryptic Bookshelf
            </h3>
            <p className="text-slate-400 text-xs font-sans mt-1.5 leading-relaxed">
              Curated notes and summaries on Golden Age locked-room whodunits, classic literature, and science fiction.
            </p>
          </div>

          {/* Interactive Wooden/Metal Book Spine list */}
          <div className="my-6 space-y-2.5">
            <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">TAP IN TO EXPAND BOOK JACKET</span>
            {bookReviews.map((book) => {
              const isSelected = book.id === selectedBookId;
              return (
                <button
                  key={book.id}
                  onClick={() => {
                    setSelectedBookId(book.id);
                    setQuizOutput({ status: 'idle', msg: '' });
                    setUserGuess('');
                  }}
                  className={`w-full text-left p-3.5 rounded-lg border-l-4 transition-all duration-200 flex justify-between items-center bg-slate-950/60 border-slate-800 cursor-pointer ${
                    isSelected 
                      ? 'border-l-orange-500 bg-slate-950 text-white pl-5 shadow-md' 
                      : 'hover:bg-slate-950/80 hover:text-white'
                  }`}
                >
                  <div className="min-w-0 pr-4">
                    <h5 className="font-sans font-bold text-xs leading-none tracking-tight truncate">
                      {book.title}
                    </h5>
                    <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase">
                      {book.author}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono text-orange-400/90 tracking-wide uppercase shrink-0 font-bold">
                    {book.genre.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-[10px] font-mono text-slate-500">
            Doon School General Reading Ledger #44
          </div>
        </div>

        {/* Right Side: Showcase Paper / Review Jacket (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-xl flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBook.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Rating stars */}
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase tracking-widest text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded font-bold">
                  {activeBook.genre}
                </span>

                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < activeBook.rating ? 'fill-current' : 'opacity-20'}`} 
                    />
                  ))}
                </div>
              </div>

              {/* Title group */}
              <div>
                <span className="text-slate-500 text-xs font-mono uppercase font-semibold">REVIEW BRIEF</span>
                <h4 className="font-sans font-extrabold text-lg text-white mt-1 leading-tight tracking-tight">
                  {activeBook.title}
                </h4>
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">
                  by {activeBook.author}
                </p>
              </div>

              {/* Review Text */}
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-lg text-xs leading-relaxed text-slate-300 font-light italic pl-4 border-l-2 border-l-indigo-500">
                "{activeBook.review}"
              </div>

              {/* Classic Whodunit Riddle Interactive Widget */}
              {activeBook.id === 'b1' && (
                <div id="roger-ackroyd-riddle-grid" className="bg-orange-500/5 border border-orange-500/10 p-4 rounded-lg mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-orange-300">
                      WHODUNIT INTERACTIVE TRIVIA
                    </span>
                  </div>
                  
                  <p className="text-[11px] font-sans text-slate-400 leading-relaxed">
                    "The Murder of Roger Ackroyd" is world-famous for its incredible twist. Who was the actual murderer? Guess the name/role to test your investigative skills:
                  </p>

                  <form onSubmit={handleSolveAckroyd} className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={userGuess}
                      onChange={(e) => setUserGuess(e.target.value)}
                      placeholder="e.g., The Dr., Sheppard"
                      className="flex-1 bg-slate-900 border border-slate-700 rounded p-1.5 px-3 text-xs text-white uppercase font-mono focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded cursor-pointer transition uppercase"
                    >
                      SOLVE
                    </button>
                  </form>

                  {quizOutput.status !== 'idle' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className={`text-[11px] font-sans p-2.5 rounded mt-3 leading-relaxed border ${
                        quizOutput.status === 'success'
                          ? 'bg-emerald-900/40 border-emerald-700 text-emerald-250'
                          : 'bg-red-900/40 border-red-700 text-red-200'
                      }`}
                    >
                      {quizOutput.msg}
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="pt-4 border-t border-slate-900 mt-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center">
            Critical Review Grade: APPROVED
          </div>
        </div>

      </div>
    </div>
  );
}
