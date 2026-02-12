import React, { useEffect, useRef, useState } from 'react';
import { 
  Database, 
  ChevronRight, 
  CheckCircle2, 
  Bot, 
  Award, 
  Banknote, 
  Calendar,
  ArrowRight, 
  BarChart3,
  Layers,
  Activity,
  UserCheck,
  Globe, 
  Landmark,
  Compass,
  Settings,
  MessageSquareText,
  Zap,
  Sparkles,
  ShieldCheck,
  SearchCode,
  LineChart,
  Target
} from 'lucide-react';

/**
 * AI Particle Background
 * High-performance, subtle animation for a premium feel.
 */
const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    const particleCount = 35;
    const connectionDistance = 140;

    class Particle {
      constructor() {
        this.x = Math.random() * (canvas.width || 800);
        this.y = Math.random() * (canvas.height || 600);
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 1.5 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(129, 140, 248, 0.25)'; 
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.12 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />;
};

const Logo = ({ className = "h-8", iconOnly = false }) => (
  <div className={`flex items-center space-x-3 group cursor-pointer ${className}`}>
    <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform group-hover:scale-110 transition-transform duration-500">
        <path d="M20 4L34 11V29L20 36L6 29V11L20 4Z" className="stroke-indigo-500" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M20 10L26 20L20 30L14 20L20 10Z" fill="white" className="group-hover:fill-indigo-400 transition-colors" />
        <circle cx="20" cy="20" r="3.5" fill="#6366f1" className="shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
        <circle cx="34" cy="11" r="1.5" fill="#6366f1" />
        <circle cx="6" cy="29" r="1.5" fill="#6366f1" />
      </svg>
    </div>
    {!iconOnly && (
      <div className="flex flex-col leading-none text-left">
        <span className="text-lg sm:text-xl font-black tracking-tighter text-white uppercase italic leading-none">Agentico</span>
        <span className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] text-indigo-400 uppercase italic mt-0.5 leading-none ml-0.5">Travel</span>
      </div>
    )}
  </div>
);

const App = () => {
  const calendlyUrl = "https://calendly.com/agentico-hospitality/30min";

  useEffect(() => {
    // 1. Performance Optimization: Preconnect to Calendly domains
    const preconnects = [
      { rel: 'preconnect', href: 'https://assets.calendly.com' },
      { rel: 'preconnect', href: 'https://calendly.com' },
      { rel: 'dns-prefetch', href: 'https://assets.calendly.com' }
    ];

    const linkElements = preconnects.map(p => {
      const link = document.createElement('link');
      link.rel = p.rel;
      link.href = p.href;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      return link;
    });

    // 2. Load Stylesheets
    const styleLink = document.createElement('link');
    styleLink.href = "https://assets.calendly.com/assets/external/widget.css";
    styleLink.rel = "stylesheet";
    document.head.appendChild(styleLink);

    // 3. Load Script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      linkElements.forEach(l => document.head.contains(l) && document.head.removeChild(l));
      if (document.head.contains(styleLink)) document.head.removeChild(styleLink);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      window.open(calendlyUrl, '_blank');
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <Logo />
          <div className="flex items-center space-x-4 sm:space-x-10">
            <button onClick={handleBooking} className="bg-indigo-600 text-white px-5 sm:px-8 py-2 sm:py-2.5 rounded-full font-bold text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
              Book free AI strategy call
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-44 overflow-hidden border-b border-slate-900 text-center">
        <NeuralBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <div className="bg-lime-400/10 border border-lime-400/20 rounded-full px-4 py-1.5 shadow-[0_0_20px_-5px_rgba(163,230,53,0.4)]">
                <span className="text-[10px] font-black uppercase text-lime-400 italic tracking-widest leading-none">SEO is Legacy. AEO is a must.</span>
              </div>
              <div className="bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)]">
                <span className="text-[10px] font-black uppercase text-amber-400 italic tracking-wider leading-none">Stop paying 18%+ commissions to OTAs</span>
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-8 leading-[1.2] tracking-tight uppercase italic">
              BOOST DIRECT BOOKINGS <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 italic leading-tight">WITH AI ENGINE OPTIMIZATION.</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-zinc-300 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Hotel sales are dominated by legacy OTAs, but AI is disrupting how travelers search and book. We <span className="text-white font-medium italic underline decoration-indigo-500/50 underline-offset-8 decoration-2 text-slate-100">make your hotel AI ready</span> so AI engines send travelers directly to your online booking engine and save you the OTAs commissions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
              <button onClick={handleBooking} className="w-full sm:w-auto group flex items-center justify-center space-x-4 bg-white text-black px-10 py-6 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl shadow-white/5 text-sm hover:bg-zinc-200 active:scale-95">
                <span>Unlock your AI revenue potential</span>
                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform text-indigo-600" />
              </button>
              <div className="flex flex-col space-y-2 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[57%] h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                  </div>
                  <span className="text-[9px] font-black uppercase text-indigo-400 tracking-widest leading-none">4/7 Slots Filled</span>
                </div>
                <span className="text-[10px] text-zinc-400 italic uppercase tracking-widest leading-none">Property Exclusivity protocol active.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-30"></div>
      </section>

      {/* Agency Strengths Section */}
      <section id="experience" className="py-24 border-y border-slate-900 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-20 text-center mx-auto">
            <span className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-[10px]">The Agentico Advantage</span>
            <h2 className="text-3xl lg:text-5xl font-black text-white mt-4 tracking-tighter italic uppercase leading-[1.1]">The Anatomy of Our <br /> Direct-Booking Expertise.</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 text-center sm:text-left">
            {[
              { icon: Bot, title: "Conversational AI & LLMs", desc: "Expertise in vector space data citation. We ensure your hotel is the primary source of truth for AI agents (Perplexity, OpenAI, Gemini)." },
              { icon: Landmark, title: "Hotel Management", desc: "We speak the language of RevPAR and ADR. Our background in management ensures solutions align with your operational realities." },
              { icon: Compass, title: "Content Strategy", desc: "Crafting the high-fidelity narrative signals that both high-net-worth travelers and recommendation engines prioritize." }
            ].map((strength, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 transition-all duration-500 group hover:border-indigo-500/30 flex flex-col items-center sm:items-start text-center sm:text-left">
                <strength.icon className="w-10 h-10 text-indigo-400 mb-6 group-hover:rotate-6 transition-transform" />
                <h4 className="text-lg font-bold text-white uppercase italic tracking-tighter mb-4 leading-tight">{strength.title}</h4>
                <p className="text-zinc-300 text-sm leading-relaxed font-light">{strength.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy Briefing (Gap Analysis) Section */}
      <section id="briefing" className="py-20 lg:py-32 bg-white text-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="text-center lg:text-left">
              <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px]">Discovery Call Details</span>
              <h2 className="text-4xl lg:text-6xl font-black leading-[0.95] mt-4 mb-8 uppercase italic tracking-tighter">Your Direct <br className="hidden lg:block" /> Revenue <br className="hidden lg:block" /> Blueprint.</h2>
              <p className="text-slate-600 mb-10 font-light text-base sm:text-lg italic leading-relaxed max-w-xl mx-auto lg:mx-0">
                "We don't do sales pitches. We perform a technical check to see if there is an optimization gap and build the strategy of how to proceed."
              </p>
              
              <div className="grid gap-8 text-left">
                {[
                  { icon: SearchCode, title: "Optimisation Gap Check", text: "We analyze your current presence to see where AI agents are currently failing to cite your property for direct bookings." },
                  { icon: LineChart, title: "Revenue Mapping", text: "Identifying search intents where you are overpaying 25% commission to OTAs for traffic you should own." },
                  { icon: Target, title: "Strategic Roadmap", text: "A step-by-step technical plan to fix optimization gaps and anchor your hotel into global Knowledge Graphs." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 sm:gap-6 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm border border-slate-200">
                      <span className="font-black italic text-lg">{i+1}</span>
                    </div>
                    <div>
                      <h4 className="font-black text-sm sm:text-base uppercase italic tracking-tight mb-1 leading-tight">{item.title}</h4>
                      <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-[#020617] rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-12 text-white shadow-2xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                <h3 className="text-2xl font-black italic uppercase mb-6 leading-tight relative z-10 text-white">Protect your <br /><span className="text-indigo-400">future margins.</span></h3>
                <p className="text-zinc-300 text-sm mb-10 font-light italic relative z-10 leading-relaxed">
                  During this free 30-minute call, we will check if your tech stack is AEO-ready and explore how AI can help you win more direct booking revenue.
                </p>
                <button 
                  onClick={handleBooking}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 sm:py-6 px-6 sm:px-10 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-3 sm:space-x-4 shadow-2xl shadow-indigo-500/30 relative z-10 text-xs sm:text-sm active:scale-95"
                >
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  <span className="text-center">Book My Free AI Strategy Call</span>
                </button>
                <div className="mt-8 flex items-center justify-center space-x-3 text-[9px] sm:text-[10px] text-zinc-400 uppercase font-black relative z-10 tracking-[0.2em]">
                  <UserCheck className="w-4 h-4 text-indigo-400" />
                  <span>Exclusive for 7 properties per destination</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section id="success" className="py-20 lg:py-24 bg-[#020617] border-y border-slate-900 text-center lg:text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
           <div className="order-2 lg:order-1 mx-auto lg:mx-0">
              <div className="bg-slate-900/50 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-slate-800 relative shadow-2xl">
                 <div className="bg-indigo-600 text-white text-[9px] sm:text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest inline-block mb-8 leading-none">Case Study: Vienna, Austria</div>
                 <div className="flex items-center justify-center sm:justify-start space-x-4 mb-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
                       <Award className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="text-left">
                       <h3 className="text-xl sm:text-2xl font-black text-white italic uppercase leading-none">Vayalen Boutique Hotel</h3>
                       <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-bold mt-2 leading-none">AEO Impact Analysis</p>
                    </div>
                 </div>
                 <p className="text-zinc-200 text-sm leading-relaxed mb-8 font-light italic text-left">"Agentico's strategy identified major citation gaps in our Knowledge Graph. We reclaimed visibility and bypassed OTA commission cycles for luxury search intents."</p>
                 <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                    <div className="p-4 sm:p-5 bg-slate-800/50 rounded-xl sm:rounded-2xl border border-indigo-500/20">
                       <div className="text-2xl sm:text-3xl font-black text-white leading-none">+40%</div>
                       <div className="text-[8px] sm:text-[9px] text-zinc-400 uppercase font-bold mt-2 leading-tight text-center">Direct Share Shift</div>
                    </div>
                    <div className="p-4 sm:p-5 bg-slate-800/50 rounded-xl sm:rounded-2xl border border-indigo-900/20">
                       <div className="text-2xl sm:text-3xl font-black text-indigo-400 leading-none">+312%</div>
                       <div className="text-[8px] sm:text-[9px] text-zinc-400 uppercase font-bold mt-2 leading-tight text-center">Agent Discovery</div>
                    </div>
                 </div>
              </div>
           </div>
           <div className="order-1 lg:order-2">
              <span className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-[10px]">Real-World Proof</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mt-4 mb-10 leading-tight uppercase italic tracking-tighter text-slate-100">Infrastructure <br /> Beats <br /> Marketing.</h2>
              <button onClick={handleBooking} className="w-full sm:w-auto group flex items-center justify-center space-x-4 bg-white text-black px-8 py-4 rounded-xl transition-all shadow-xl hover:bg-zinc-200 mx-auto lg:mx-0">
                <span className="text-xs font-black uppercase tracking-widest text-black italic">Book My Free Strategy Call</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-24 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
          <span className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-[10px]">Strategic Solutions</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 tracking-tighter italic uppercase leading-none text-white">The Framework</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-slate-900/40 p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col group">
            <BarChart3 className="text-indigo-400 w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter italic text-left">Gap Analysis</h3>
            <p className="text-zinc-300 text-sm leading-relaxed mb-8 font-light text-left">Identifying structural optimization gaps and OTA commission vulnerabilities in your stack.</p>
            <div className="mt-auto flex items-baseline space-x-2">
              <span className="text-3xl font-black text-white">$699</span>
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">Fixed Fee</span>
            </div>
          </div>
          <div className="bg-indigo-600/5 p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-indigo-500/30 relative shadow-2xl flex flex-col group">
            <div className="absolute top-4 right-4 bg-indigo-500 text-white text-[8px] font-black px-2 py-1 rounded uppercase shadow-lg tracking-widest">Priority</div>
            <Layers className="text-indigo-400 w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter italic leading-tight text-left">Entity Anchoring</h3>
            <p className="text-zinc-200 text-sm leading-relaxed mb-8 font-light text-left">Building proprietary Hotel Data Entities for authoritative citation across agentic LLMs.</p>
            <div className="mt-auto font-black text-white uppercase italic tracking-widest text-lg">Custom Quote</div>
          </div>
          <div className="bg-slate-900/40 p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col group">
            <Activity className="text-indigo-400 w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter italic leading-tight text-left">Active Protocol</h3>
            <p className="text-zinc-300 text-sm leading-relaxed mb-8 font-light text-left">Ongoing semantic maintenance, hallucination checks, and data entity monitoring.</p>
            <div className="mt-auto flex items-baseline space-x-2">
              <span className="text-3xl font-black text-white">$499</span>
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">/ Month</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 sm:py-32 bg-[#020617] relative overflow-hidden border-t border-slate-900 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-5 py-2 mb-10">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-indigo-400">Secure Your Asset's Future Authority</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 italic uppercase tracking-tighter leading-[1.05]">
            RECLAIM YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">DIRECT REVENUE.</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-zinc-200 mb-14 leading-relaxed font-light max-w-2xl mx-auto">
            Our destination slots fill fast. Book a free intro call to see how AI can boost your direct bookings and stop you from paying up to 25% to OTAs. Rebalance your channel booking distribution.
          </p>

          <div className="flex flex-col items-center gap-6 px-4">
            <button onClick={handleBooking} className="w-full sm:w-auto group flex items-center justify-center space-x-4 sm:space-x-6 bg-indigo-600 hover:bg-indigo-500 text-white px-6 sm:px-12 py-5 sm:py-6 rounded-2xl transition-all font-black uppercase tracking-[0.15em] text-xs sm:text-sm shadow-2xl shadow-indigo-500/40 active:scale-95">
              <Calendar className="w-6 h-6 shrink-0 group-hover:rotate-12 transition-transform" />
              <span>book my free AI visibility strategy call</span>
              <ArrowRight className="w-6 h-6 shrink-0 group-hover:translate-x-2 transition-transform" />
            </button>
            <div className="flex items-center justify-center space-x-4 text-zinc-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
              <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Infrastructure Discovery • Zero Pitch Environment</span>
            </div>
          </div>
        </div>
        
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px]"></div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-900 bg-[#020617] text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <Logo className="mb-8" iconOnly />
          <p className="text-zinc-200 text-[10px] uppercase tracking-[0.5em] mb-4">Agentico Travel</p>
          <p className="text-zinc-400 text-[9px] sm:text-[10px] max-w-sm mx-auto font-mono italic opacity-70 leading-loose">
            Agentico Travel by TravelMedia OÜ. © 2026. <br /> All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
