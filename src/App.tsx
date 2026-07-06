import React, { useState, useRef } from 'react';
import { Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import our custom interactive modules
import ConnectingForm from './components/ConnectingForm';
import AboutPage from './components/AboutPage';
import HomePage from './components/HomePage';
import SkillsPage from './components/SkillsPage';
import RecreationPage from './components/RecreationPage';

export default function App() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isEmailPopoverOpen, setIsEmailPopoverOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<'home' | 'about' | 'skills' | 'recreation'>('home');
  const [activeInteractiveSubSection, setActiveInteractiveSubSection] = useState<'works' | 'books'>('works');

  // Segment scrolls/ref
  const interactiveLabRef = useRef<HTMLDivElement>(null);

  const scrollToLab = () => {
    setActiveInteractiveSubSection('works');
    interactiveLabRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToInteractiveLab = (section: 'works' | 'books') => {
    setActiveInteractiveSubSection(section);
    interactiveLabRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGoToSkills = () => {
    setCurrentTab('about');
    setTimeout(() => {
      const target = document.getElementById('skills-section-node');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <div className={`min-h-screen ${currentTab === 'about' || currentTab === 'recreation' ? 'bg-[#0E0C22]' : 'bg-[#F5F3FA]'} text-slate-900 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300`}>
      
      {/* HEADER NAVBAR */}
      <header className={`sticky top-0 z-40 ${currentTab === 'about' || currentTab === 'recreation' ? 'bg-[#0E0C22]/90 border-white/5 text-white' : 'bg-white/80 border-purple-100 text-slate-900'} backdrop-blur-md border-b px-6 py-4 md:px-12 flex justify-between items-center transition-colors duration-300`}>
        {/* Logo matching screenshot style */}
        <div 
          className="font-serif font-black text-xl tracking-tight cursor-pointer text-[#3C4EF2]" 
          onClick={() => {
            setCurrentTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Meddhansh Rupal
        </div>

        {/* Links & Connect Button */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <button 
            onClick={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-mono text-[10px] md:text-xs font-black uppercase tracking-widest transition cursor-pointer ${
              currentTab === 'home' 
                ? 'text-[#3C4EF2]' 
                : currentTab === 'about' || currentTab === 'recreation' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-[#3C4EF2]'
            }`}
          >
            HOME
          </button>
          
          <button 
            onClick={() => {
              setCurrentTab('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-mono text-[10px] md:text-xs font-black uppercase tracking-widest transition cursor-pointer ${
              currentTab === 'about' 
                ? 'text-[#3C4EF2]' 
                : currentTab === 'recreation' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-[#3C4EF2]'
            }`}
          >
            ABOUT
          </button>

          <button 
            onClick={() => {
              setCurrentTab('skills');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-mono text-[10px] md:text-xs font-black uppercase tracking-widest transition cursor-pointer ${
              currentTab === 'skills'
                ? 'text-[#3C4EF2]'
                : currentTab === 'about' || currentTab === 'recreation' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-[#3C4EF2]'
            }`}
          >
            SKILLS
          </button>

          <button 
            onClick={() => {
              setCurrentTab('recreation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-mono text-[10px] md:text-xs font-black uppercase tracking-widest transition cursor-pointer ${
              currentTab === 'recreation'
                ? 'text-[#3C4EF2]'
                : currentTab === 'about' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-[#3C4EF2]'
            }`}
          >
            RECREATION
          </button>

          <button 
            onClick={() => setIsConnectOpen(true)}
            className="px-4 py-2 bg-[#1B1FAD] hover:bg-[#2529D8] text-white font-mono text-[9px] md:text-[10px] font-bold tracking-widest rounded-full transition-all duration-150 cursor-pointer uppercase"
          >
            LET'S CONNECT
          </button>
        </div>
      </header>

      {/* RENDER PAGES CONDITIONALLY */}
      {currentTab === 'home' && (
        <HomePage 
          onOpenConnect={() => setIsConnectOpen(true)}
          activeInteractiveSubSection={activeInteractiveSubSection}
          setActiveInteractiveSubSection={setActiveInteractiveSubSection}
          scrollToLab={scrollToLab}
          scrollToInteractiveLab={scrollToInteractiveLab}
          interactiveLabRef={interactiveLabRef}
        />
      )}
      {currentTab === 'about' && (
        <AboutPage 
          onGoToTab={(tab) => {
            if (tab === 'books') {
              setCurrentTab('home');
              setTimeout(() => {
                scrollToInteractiveLab('books');
              }, 120);
            } else {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          onOpenConnect={() => setIsConnectOpen(true)}
        />
      )}
      {currentTab === 'skills' && (
        <SkillsPage 
          onOpenConnect={() => setIsConnectOpen(true)}
        />
      )}
      {currentTab === 'recreation' && (
        <RecreationPage 
          onOpenConnect={() => setIsConnectOpen(true)}
        />
      )}

      {/* FOOTER SECTION MATCHING DESIGN */}
      <footer className="bg-[#0E0C22] text-slate-400 border-t border-white/5 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo brand */}
          <div className="font-serif font-black text-lg text-[#3C4EF2]">
            Meddhansh Rupal
          </div>

          {/* Quick email action */}
          <div className="relative text-[10px] font-mono text-slate-500">
            Email me:{" "}
            <button
              onClick={() => setIsEmailPopoverOpen(!isEmailPopoverOpen)}
              className="text-slate-400 hover:text-white transition underline underline-offset-2 cursor-pointer focus:outline-none"
            >
              meddhansh.323.2031@doonschool.com
            </button>

            <AnimatePresence>
              {isEmailPopoverOpen && (
                <>
                  {/* Invisible backdrop for outside click handling */}
                  <div 
                    className="fixed inset-0 z-40 cursor-default" 
                    onClick={() => setIsEmailPopoverOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-[#14122b] border border-white/10 rounded-xl p-3 shadow-2xl z-50 text-left"
                  >
                    <div className="flex flex-col gap-1.5">
                      {/* Option 1: Lets Connect through Email */}
                      <a
                        href="https://www.google.com/gmail/about/signup_complete.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsEmailPopoverOpen(false)}
                        className="flex flex-col text-left p-2.5 hover:bg-white/5 rounded-lg transition group"
                      >
                        <span className="text-xs font-bold text-white group-hover:text-orange-400 font-sans transition-colors">
                          Lets Connect through Email
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono mt-0.5 font-bold tracking-wide">
                          opens a new page which is the gmail app
                        </span>
                      </a>

                      <div className="border-t border-white/5 my-1" />

                      {/* Option 2: Website */}
                      <button
                        onClick={() => {
                          setIsConnectOpen(true);
                          setIsEmailPopoverOpen(false);
                        }}
                        className="flex flex-col text-left p-2.5 hover:bg-white/5 rounded-lg transition group w-full cursor-pointer"
                      >
                        <span className="text-xs font-bold text-white group-hover:text-orange-400 font-sans transition-colors">
                          Website
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono mt-0.5 font-bold tracking-wide">
                          opens the lets connect page
                        </span>
                      </button>
                    </div>
                    {/* Tiny visual notch pointing down to the clicked email */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.5 w-3 h-3 bg-[#14122b] border-r border-b border-white/10 rotate-45" />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Copyright */}
          <div className="text-[10px] font-mono text-slate-500">
            © 2026 Meddhansh Rupal. All rights reserved.
          </div>
        </div>
      </footer>

      {/* CONNECTING COMPONENT MODAL COOPERATIVE */}
      <ConnectingForm 
        isOpen={isConnectOpen} 
        onClose={() => setIsConnectOpen(false)} 
      />

    </div>
  );
}
