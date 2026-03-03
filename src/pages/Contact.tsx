import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Phone, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/mpqjgkla", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("There was an error submitting the form. Please try again.");
      }
    } catch (error) {
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main relative overflow-hidden selection:bg-primary/30">
      {/* Cursor Glow */}
      <div 
        className="cursor-glow hidden md:block"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      
      <div className="absolute inset-0 grid-bg z-0 opacity-50" />

      {/* Header */}
      <header className="relative z-10 px-6 md:px-12 lg:px-24 py-8">
        <Link to="/" className="text-primary flex items-center gap-2 font-bold hover:gap-3 transition-all w-fit">
          <ArrowLeft size={20} /> Home
        </Link>
      </header>

      <main className="relative z-10 px-6 md:px-12 lg:px-24 pb-24 max-w-7xl mx-auto">
        {/* Hero Text */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display mb-4"
          >
            Let's Talk.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-main/60"
          >
            Tell us about your business and we'll be in touch within 24 hours.
          </motion.p>
        </div>

        {/* Form Section */}
        <div className="max-w-3xl mx-auto">
          {!isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 md:p-12 bg-secondary/40 border-primary/20 shadow-[0_0_50px_rgba(0,102,255,0.1)]"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main/60 uppercase tracking-widest">Full Name</label>
                    <input 
                      required 
                      name="name"
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main/60 uppercase tracking-widest">Business Name</label>
                    <input 
                      required 
                      name="business"
                      type="text" 
                      placeholder="Acme Corp"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main/60 uppercase tracking-widest">Phone Number</label>
                    <input 
                      required 
                      name="phone"
                      type="tel" 
                      placeholder="0400 000 000"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main/60 uppercase tracking-widest">Email Address</label>
                    <input 
                      required 
                      name="email"
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main/60 uppercase tracking-widest">Industry</label>
                    <select 
                      required 
                      name="industry"
                      defaultValue=""
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors appearance-none"
                    >
                      <option value="" disabled className="bg-background">Select Industry</option>
                      <option value="Lawn & Garden" className="bg-background">Lawn & Garden</option>
                      <option value="Financial Planning" className="bg-background">Financial Planning</option>
                      <option value="Cleaning" className="bg-background">Cleaning</option>
                      <option value="Trades & Construction" className="bg-background">Trades & Construction</option>
                      <option value="Health & Wellness" className="bg-background">Health & Wellness</option>
                      <option value="Professional Services" className="bg-background">Professional Services</option>
                      <option value="Other" className="bg-background">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main/60 uppercase tracking-widest">Monthly Revenue</label>
                    <select 
                      required 
                      name="revenue"
                      defaultValue=""
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors appearance-none"
                    >
                      <option value="" disabled className="bg-background">Select Revenue</option>
                      <option value="Under $10k" className="bg-background">Under $10k</option>
                      <option value="$10k–$30k" className="bg-background"> $10k–$30k</option>
                      <option value="$30k–$100k" className="bg-background">$30k–$100k</option>
                      <option value="$100k+" className="bg-background">$100k+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main/60 uppercase tracking-widest">What's your biggest challenge right now?</label>
                  <textarea 
                    name="challenge"
                    rows={4}
                    placeholder="Tell us what you're struggling with..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main/60 uppercase tracking-widest">How did you hear about us?</label>
                  <select 
                    required 
                    name="referral"
                    defaultValue=""
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors appearance-none"
                  >
                    <option value="" disabled className="bg-background">Select Option</option>
                    <option value="Meta/Facebook Ad" className="bg-background">Meta/Facebook Ad</option>
                    <option value="Google" className="bg-background">Google</option>
                    <option value="Referral" className="bg-background">Referral</option>
                    <option value="Other" className="bg-background">Other</option>
                  </select>
                </div>

                <button 
                  disabled={isLoading}
                  type="submit" 
                  className="glow-button w-full justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Message"} <ArrowRight size={20} />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 text-center flex flex-col items-center justify-center bg-primary/5 border-primary/40"
            >
              <CheckCircle2 className="text-primary mb-6" size={80} />
              <h2 className="text-4xl font-display mb-4">We'll be in touch shortly.</h2>
              <p className="text-xl text-text-main/60">Check your inbox — we'll reach out within 24 hours.</p>
              <Link to="/" className="mt-12 text-primary font-bold hover:underline">← Back to Home</Link>
            </motion.div>
          )}

          {/* Trust Icons */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 text-text-main/40 text-sm justify-center">
              <Zap size={18} className="text-primary" /> Response within 48 hours
            </div>
            <div className="flex items-center gap-3 text-text-main/40 text-sm justify-center">
              <ShieldCheck size={18} className="text-primary" /> Your details are never shared
            </div>
            <div className="flex items-center gap-3 text-text-main/40 text-sm justify-center">
              <Phone size={18} className="text-primary" /> Free strategy call, no obligation
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
