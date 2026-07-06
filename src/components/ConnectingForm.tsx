import React, { useState, useEffect } from 'react';
import { ContactMessage } from '../types';
import { X, Send, Inbox, Check, Sparkles, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConnectingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectingForm({ isOpen, onClose }: ConnectingFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState<'Video Project' | 'Presentation Help' | 'Squash Match' | 'General Chat' | 'Book recommendation'>('General Chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [showInbox, setShowInbox] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Load existing messages on mount
  useEffect(() => {
    const saved = localStorage.getItem('meddhansh_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse messages', e);
      }
    }
  }, [isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ sent: boolean; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setEmailStatus(null);

    const newMessage: ContactMessage = {
      id: 'm_' + Date.now(),
      name,
      email,
      purpose,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString()
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('meddhansh_messages', JSON.stringify(updated));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, purpose, message }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.emailSent) {
          setEmailStatus({ sent: true, message: 'Message successfully sent to Meddhansh\'s Gmail inbox!' });
        } else {
          setEmailStatus({ 
            sent: false, 
            message: 'Saved in local reader ledger (Gmail forwarding requires SMTP setup in settings).' 
          });
        }
      } else {
        setEmailStatus({ sent: false, message: 'Saved in local reader ledger (SMTP error).' });
      }
    } catch (err) {
      console.error('Email API failure, saved locally instead:', err);
      setEmailStatus({ sent: false, message: 'Saved in local reader ledger (offline/dev mode).' });
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setSubmitted(false);
        setEmailStatus(null);
        onClose();
      }, 3000);
    }
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('meddhansh_messages', JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <div id="connecting-form-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        id="connecting-form-card"
        className="relative w-full max-w-2xl bg-slate-50 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header bar of the modal */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 flex justify-between items-center relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div>
            <h3 className="font-sans font-bold text-2xl tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-400" />
              Let's Connect!
            </h3>
            <p className="text-blue-100 text-xs mt-1 font-mono tracking-wider uppercase">COLLABORATION & TALENT PORTAL</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowInbox(!showInbox)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 transition rounded-lg text-xs font-mono flex items-center gap-1.5"
              title="View simulated inbox message ledger"
            >
              <Inbox className="w-4 h-4 text-orange-400" />
              {showInbox ? 'Form view' : `Inbox (${messages.length})`}
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 transition rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal body */}
        <div className="p-6 overflow-y-auto flex-1">
          {showInbox ? (
            <div id="inbox-ledger" className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-mono text-xs font-bold text-slate-500 uppercase">Received Messages (Local Database)</span>
                <span className="bg-orange-500 text-white font-mono text-[10px] px-2 py-0.5 rounded-full font-bold">PERSISTENT LEDGER</span>
              </div>
              {messages.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Inbox className="w-12 h-12 stroke-1 mx-auto mb-3 opacity-40 text-slate-400" />
                  <p className="font-sans text-sm font-medium">Your mailroom is currently silent.</p>
                  <p className="text-xs text-slate-400 mt-1">Submit a test message via the contact form to see it saved here!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className="border border-slate-200 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="bg-indigo-100 text-indigo-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase mr-2">
                            {msg.purpose}
                          </span>
                          <span className="font-sans font-bold text-sm text-slate-800">{msg.name}</span>
                          <span className="text-xs text-slate-400 ml-2">({msg.email})</span>
                        </div>
                        <button 
                          onClick={() => deleteMessage(msg.id)}
                          className="text-slate-400 hover:text-red-500 transition text-xs font-mono font-bold"
                        >
                          DELETE
                        </button>
                      </div>
                      <p className="text-slate-600 text-sm whitespace-pre-wrap font-sans leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                        "{msg.message}"
                      </p>
                      <div className="text-right text-[10px] font-mono text-slate-400 mt-2">
                        Received: {msg.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 border-2 border-emerald-500">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="font-sans text-xl font-bold text-slate-800">Message Dispatched!</h4>
              <p className="text-slate-500 text-sm mt-2 max-w-sm">
                Thank you for reaching out, {name.split(' ')[0]}. {emailStatus?.message || 'Your transmission was processed successfully.'}
              </p>
              <div className="mt-6 flex items-center gap-2 text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg text-xs font-mono">
                <Trophy className="w-4 h-4 text-orange-500" />
                Doon School Mail Terminal Connected
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1.5">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" 
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 font-sans text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1.5">Your Email</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com" 
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 font-sans text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1.5">Purpose of Connection</label>
                <select 
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 font-sans text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                >
                  <option value="General Chat">General Chat / Say Hello</option>
                  <option value="Video Project">Video Co-production / Editing project</option>
                  <option value="Presentation Help">Illustrated Presentation Design help</option>
                  <option value="Squash Match">Squash / Badminton Challenge</option>
                  <option value="Book recommendation">Book recommendation Exchange</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-1.5">Your Message</label>
                <textarea 
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me a bit about yourself or your project ideas! My inbox is always open..." 
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 font-sans text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none"
                ></textarea>
              </div>

              <div id="school-disclaimer" className="bg-orange-50 border border-orange-200 p-3.5 rounded-xl flex gap-3">
                <div className="w-5 h-5 bg-orange-500 text-white font-serif rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">!</div>
                <div className="text-xs text-orange-850 leading-relaxed font-sans">
                  <strong>Please Note:</strong> Please take care of your language when sending messages. Let's keep it respectful!
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-sans font-bold text-sm rounded-lg transition duration-200 cursor-pointer flex items-center gap-2 shadow-lg shadow-orange-500/20 uppercase tracking-wider disabled:opacity-55"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Send Transmission'}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
