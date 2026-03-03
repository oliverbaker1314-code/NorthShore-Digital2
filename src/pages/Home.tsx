import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  X, 
  TrendingUp, 
  Scissors,
  Briefcase,
  Sparkles,
  Hammer,
  HeartPulse,
  Scale,
  Mail,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Components ---

const Counter = ({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl lg:text-6xl mb-4 max-w-3xl"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl text-text-main/60 max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden selection:bg-primary/30">
      {/* Cursor Glow */}
      <div 
        className="cursor-glow hidden md:block"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20">
        <div className="absolute inset-0 grid-bg z-0" />
        
        {/* Animated Light Streak */}
        <motion.div 
          animate={{ 
            x: ['-100%', '200%'],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent z-0"
        />

        <div className="relative z-10 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-8"
          >
            We Don't Guess.<br />
            <span className="text-primary text-glow">We Prove It.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-main/80 mb-12 max-w-2xl"
          >
            Meta Ads for local service businesses — built by someone who did it first.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="#client-results" className="glow-button w-fit text-lg">
              See Our Results <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Proof Bar */}
      <div className="bg-black border-y border-white/10 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-primary/30 pb-8 md:pb-0 md:pr-8">
            <span className="text-4xl md:text-5xl font-display text-highlight mb-1">
              <Counter value={100} prefix="$" />
            </span>
            <span className="text-primary text-xs uppercase tracking-widest font-bold">Ad Spend</span>
          </div>
          <div className="flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-primary/30 pb-8 md:pb-0 md:pr-8">
            <span className="text-4xl md:text-5xl font-display text-highlight mb-1">
              <Counter value={10270} prefix="$" />
            </span>
            <span className="text-primary text-xs uppercase tracking-widest font-bold">Annual Revenue Generated</span>
          </div>
          <div className="flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-primary/30 pb-8 md:pb-0 md:pr-8">
            <span className="text-4xl md:text-5xl font-display text-highlight mb-1">
              <Counter value={102} suffix="x" />
            </span>
            <span className="text-primary text-xs uppercase tracking-widest font-bold">Return</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-4xl md:text-5xl font-display text-highlight mb-1">
              <Counter value={13.36} prefix="$" />
            </span>
            <span className="text-primary text-xs uppercase tracking-widest font-bold">Cost Per Lead</span>
          </div>
        </div>
      </div>

      {/* The Difference Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-background relative z-10">
        <SectionHeading>
          Most agencies have never run a successful ad for a real business. <span className="text-primary">We have.</span>
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Other Agencies */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border-red-500/20"
          >
            <h3 className="text-2xl mb-8 flex items-center gap-3">
              Other Agencies
            </h3>
            <ul className="space-y-6">
              {[
                "Charge thousands before proving anything",
                "Generic strategies",
                "No real world results",
                "Lock-in contracts"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-text-main/60">
                  <X className="text-red-500 mt-1 shrink-0" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Northshore Digital */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border-primary/40 bg-primary/5 shadow-[0_0_40px_rgba(0,102,255,0.1)]"
          >
            <h3 className="text-2xl mb-8 flex items-center gap-3">
              Northshore Digital
            </h3>
            <ul className="space-y-6">
              {[
                "Proven results on our own business first",
                "Built for local service businesses",
                "$100 → $10,270 case study",
                "Month to month, no lock-in"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-highlight">
                  <Check className="text-primary mt-1 shrink-0" size={20} />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Case Study Section */}
      <section id="case-study" className="py-24 px-6 md:px-12 lg:px-24 bg-secondary relative z-10">
        <SectionHeading subtitle="We didn't start by selling. We started by doing.">
          Our Own Business. <span className="text-primary">Our Own Results.</span>
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card p-8 md:p-12"
          >
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(0,102,255,1)]" />
                  <div className="w-[2px] h-full bg-primary/20 mt-2" />
                </div>
                <div>
                  <h4 className="text-xl font-display mb-2">November 2025</h4>
                  <p className="text-text-main/60">Launched lawn mowing business from zero on the Northern Beaches.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(0,102,255,1)]" />
                  <div className="w-[2px] h-full bg-primary/20 mt-2" />
                </div>
                <div>
                  <h4 className="text-xl font-display mb-2">February 2026</h4>
                  <p className="text-text-main/60">Ran Meta Ads for 11 days to test the system.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(0,102,255,1)]" />
                </div>
                <div>
                  <h4 className="text-xl font-display mb-2">The Result</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <p className="text-primary font-bold text-2xl">$100</p>
                      <p className="text-xs uppercase text-text-main/40">Total Spend</p>
                    </div>
                    <div>
                      <p className="text-primary font-bold text-2xl">5</p>
                      <p className="text-xs uppercase text-text-main/40">Leads Generated</p>
                    </div>
                    <div>
                      <p className="text-primary font-bold text-2xl">3</p>
                      <p className="text-xs uppercase text-text-main/40">Converted Clients</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 bg-primary/10 border-primary/30 flex flex-col justify-center items-center text-center"
          >
            <TrendingUp className="text-primary mb-6" size={48} />
            <p className="text-4xl md:text-5xl font-display mb-2 text-highlight">$10,270</p>
            <p className="text-text-main/60 uppercase tracking-widest text-sm mb-8">Annual Recurring Revenue</p>
            <div className="h-[1px] w-full bg-white/10 mb-8" />
            <p className="text-lg font-medium italic">"This is what we'll do for your business."</p>
          </motion.div>
        </div>
      </section>

      {/* Who We Work With Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-background relative z-10">
        <SectionHeading subtitle="Local service businesses who want a predictable flow of new clients every month.">
          We specialise in <span className="text-primary">one thing.</span>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Scissors, label: "Lawn & Garden" },
            { icon: Briefcase, label: "Financial Planning" },
            { icon: Sparkles, label: "Cleaning" },
            { icon: Hammer, label: "Trades & Construction" },
            { icon: HeartPulse, label: "Health & Wellness" },
            { icon: Scale, label: "Professional Services" },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 flex flex-col items-center text-center hover:border-primary/60 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <item.icon className="text-primary" size={32} />
              </div>
              <h4 className="text-xl font-display">{item.label}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-background relative z-10">
        <SectionHeading>
          The <span className="text-primary">Process.</span>
        </SectionHeading>

        <div className="relative">
          {/* Horizontal Line */}
          <div className="absolute top-12 left-0 w-full h-[2px] bg-white/5 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
            {[
              { num: "01", title: "Discovery Call", desc: "We learn about your business and goals." },
              { num: "02", title: "Strategy & Build", desc: "We build your custom ad system." },
              { num: "03", title: "Launch", desc: "Your ads go live to your local area." },
              { num: "04", title: "Optimise", desc: "We tweak and refine for maximum ROI." },
              { num: "05", title: "Scale", desc: "We push what works to grow your revenue." },
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col"
              >
                <div className="text-4xl font-display text-primary mb-6">{step.num}</div>
                <h4 className="text-xl font-display mb-3">{step.title}</h4>
                <p className="text-text-main/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-background relative z-10">
        <SectionHeading subtitle="Simple, transparent pricing. No lock-in contracts.">
          Ready to <span className="text-primary">Scale?</span>
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Starter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 flex flex-col"
          >
            <h3 className="text-2xl mb-2">Starter</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-display text-highlight">$500</span>
              <span className="text-text-main/40">/mo</span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow">
              {["Meta Ads Management", "Basic Ad Creative", "Monthly Reporting", "Email Support"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text-main/80">
                  <Check size={18} className="text-primary" /> {item}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="w-full py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-colors text-center">
              Get Started
            </Link>
          </motion.div>

          {/* Growth */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 flex flex-col border-primary/50 bg-primary/5 relative shadow-[0_0_50px_rgba(0,102,255,0.15)]"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="text-2xl mb-2">Growth</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-display text-highlight">$900</span>
              <span className="text-text-main/40">/mo</span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow">
              {["Advanced Ad Creative", "Landing Page Optimisation", "Weekly Reporting", "Priority Support", "Lead Tracking Dashboard"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-highlight">
                  <Check size={18} className="text-primary" /> {item}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all text-center">
              Get Started
            </Link>
          </motion.div>

          {/* Scale */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 flex flex-col"
          >
            <h3 className="text-2xl mb-2">Scale</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-display text-highlight">$1,400</span>
              <span className="text-text-main/40">/mo</span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow">
              {["Full Funnel Build", "Video Ad Production", "Daily Optimisation", "24/7 Slack Access", "Competitor Analysis"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text-main/80">
                  <Check size={18} className="text-primary" /> {item}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="w-full py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-colors text-center">
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-background relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border-l-4 border-primary pl-8"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl leading-tight">
              Built by someone who's <span className="text-primary">done it.</span>
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl text-text-main/80 leading-relaxed">
              I'm 17, based on the Northern Beaches. I built my own lawn mowing business from zero using Meta Ads — $100 in, $10,270 annual revenue out.
            </p>
            <p className="text-xl text-text-main/80 leading-relaxed">
              Now I run the same system for local businesses who want the same result. No fluff, no guessing, just proven execution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials/Results Section */}
      <section id="client-results" className="py-24 px-6 md:px-12 lg:px-24 bg-secondary relative z-10">
        <SectionHeading subtitle="Real numbers from real local businesses.">
          Client <span className="text-primary">Results.</span>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { result: "$4,200 Revenue", suburb: "Manly", industry: "Cleaning", date: "Last 30 Days" },
            { result: "12 New Leads", suburb: "Dee Why", industry: "Plumbing", date: "Last 14 Days" },
            { result: "$8,500 Contract", suburb: "Mona Vale", industry: "Landscaping", date: "Last 30 Days" },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {item.industry}
                </div>
                <span className="text-text-main/40 text-xs">{item.date}</span>
              </div>
              <p className="text-3xl font-display text-highlight mb-2">{item.result}</p>
              <p className="text-text-main/60 flex items-center gap-2">
                <MapPin size={14} className="text-primary" /> {item.suburb}, Sydney
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-background relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl mb-8 font-display"
          >
            Ready to stop relying on word of mouth?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-text-main/60 mb-12"
          >
            First call is free. No lock-in. No BS.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <Link to="/contact" className="glow-button text-xl">
              Book a Free Strategy Call <ArrowRight size={24} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-white/5 bg-background relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-display mb-2">Northshore Digital</h3>
            <p className="text-text-main/40 text-sm">Northern Beaches, Sydney</p>
          </div>
          
          <div className="flex gap-8 text-sm text-text-main/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="mailto:hello@northshoredigital.com" className="hover:text-primary transition-colors flex items-center gap-2">
              <Mail size={16} /> hello@northshoredigital.com
            </a>
          </div>

          <div className="text-text-main/40 text-sm">
            © {new Date().getFullYear()} Northshore Digital.
          </div>
        </div>
      </footer>
    </div>
  );
}
