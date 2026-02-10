import React, { useEffect, useRef } from 'react';
import { 
  Database, 
  ChevronRight, 
  CheckCircle2, 
  Code2, 
  Bot, 
  Lock, 
  Search, 
  Award, 
  Banknote, 
  Building2, 
  Calendar,
  ArrowRight, 
  BarChart3,
  Layers,
  Activity,
  Timer,
  ShieldCheck,
  Cpu,
  UserCheck,
  Globe,
  Monitor,
  Landmark,
  Compass,
  Sparkles,
  Settings,
  MessageSquareText,
  Zap
} from 'lucide-react';

// AI Inspired Background Animation Component
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
    const particleCount = 50;
    const connectionDistance = 160;

    class Particle {
      constructor() {
        this.x = Math.random() * (canvas.width || 800);
        this.y = Math.random() * (canvas.height || 600);
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2.5 + 1;
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
        ctx.fillStyle = 'rgba(129, 140, 248, 0.4)'; 
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(129, 140, 248, 0.2)';
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
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.3 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.8;
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

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
    />
  );
};

// Custom Brand Logo Component
const Logo = ({ className = "h-8", iconOnly = false }) => (
  <div className={`flex items-center space-x-3 group cursor-pointer ${className}`}>
    <div className="relative w-10 h-10 shrink-0">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform group-hover:scale-110 transition-transform duration-300">
        <path d="M20 4L34 11V29L20 36L6 29V11L20 4Z" className="stroke-indigo-500" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 12V28" className="stroke-indigo-400 opacity-50" strokeWidth="1.5" />
        <path d="M12 16L20 20L28 16" className="stroke-indigo-400" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="3" fill="white" className="shadow-lg shadow-indigo-500" />
        <circle cx="20" cy="4" r="1.5" fill="#6366f1" />
        <circle cx="34" cy="11" r="1.5" fill="#6366f1" />
        <circle cx="34" cy="29" r="1.5" fill="#6366f1" />
        <circle cx="20" cy="36" r="1.5" fill="#6366f1" />
        <circle cx="6" cy="29" r="1.5" fill="#6366f1" />
        <circle cx="6" cy="11" r="1.5" fill="#6366f1" />
      </svg>
    </div>
    
    {!iconOnly && (
      <div className="flex flex-col leading-none">
        <span className="text-xl font-black tracking-tighter text-white uppercase italic">Agentico</span>
        <span className="text-[8px] font-bold tracking-[0.4em] text-indigo-400 uppercase mt-0.5">Hospitality</span>
      </div>
    )}
  </div>
);

const App = () => {
  const calendlyUrl = "https://calendly.com/agentico-hospitality/30min";

  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
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
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="hidden md:flex items-center space-x-10">
              <a href="#stats" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-400 transition-colors">The Shift</a>
              <a href="#experience" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-400 transition-colors">Our Edge</a>
              <a href="#services" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-400 transition-colors">Services</a>
              <button 
                onClick={handleBooking}
                className="bg-indigo-600 text-white px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
              >
                Free Consultation
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden border-b border-slate-900">
        <NeuralBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-lime-400/10 border border-lime-400/20 rounded-full px-4 py-1.5 mb-6 shadow-[0_0_20px_-5px_rgba(163,230,53,0.4)]">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-lime-400 italic">SEO is Legacy. Welcome to the AEO Revolution.</span>
            </div>

            <div className="inline-flex items-center space-x-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 mb-8 shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-amber-400 italic">Direct Booking Maximization: Reclaim 25% Margin</span>
            </div>
            
            <h1 className="text-5xl lg:text-[100px] font-black text-white mb-8 leading-[0.8] tracking-tighter uppercase italic">
              PAYING UP TO <br /> 25% TO OTA<span className="lowercase">s</span>? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 uppercase">BOOST DIRECT BOOKINGS WITH AI.</span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-12 leading-relaxed font-light max-w-3xl">
              Hotel room night sales online are still dominated by legacy OTAs, but AI is fundamentally disrupting how travelers search and buy. We <span className="text-white font-medium italic underline decoration-indigo-500/50">re-engineer your digital presence</span> using <span className="text-white font-medium">AEO (Answer Engine Optimization)</span>—enabling AI agents to send traffic directly to your booking engine.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <button 
                onClick={handleBooking}
                className="group flex items-center space-x-4 bg-white hover:bg-slate-200 text-black px-10 py-6 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl shadow-indigo-500/10 text-lg"
              >
                <span>Free AI Visibility Intro Consultation</span>
                <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform text-indigo-600" />
              </button>
              
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[57%] h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-indigo-400">4/7 Intake Slots Filled</span>
                </div>
                <span className="text-xs text-slate-500 italic">Exclusively onboarding <span className="font-black text-white italic underline decoration-indigo-500">7 properties</span> per destination.</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-30"></div>
      </section>

      {/* Agency Experience Section */}
      <section id="experience" className="py-24 border-y border-slate-900 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-8 text-center lg:text-left">
            <div className="max-w-3xl">
              <span className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-[10px]">Our Agency Strengths</span>
              <h2 className="text-4xl lg:text-[64px] font-black text-white mt-4 tracking-tighter italic uppercase leading-[0.9]">The Anatomy of Our <br /> Direct-Booking Expertise.</h2>
            </div>
            <div className="lg:text-right">
              <p className="text-slate-400 max-w-sm ml-auto text-sm leading-relaxed font-light italic">
                A unique synergy of technical AI engineering, operational hospitality management, and travel content marketing.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                <Bot className="text-white w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase italic tracking-tighter mb-4">Conversational AI & LLMs</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                We possess deep-level experience in Large Language Model (LLM) architectures. We don't just use AI; we understand how agents perceive, process, and cite data entities in the vector space.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                <Landmark className="text-white w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase italic tracking-tighter mb-4">Hotel Management Expertise</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                We speak the language of RevPAR, ADR, and occupancy. Our background in hospitality management ensures that our technical solutions align with your daily operational realities.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                <Compass className="text-white w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase italic tracking-tighter mb-4">Travel Content Marketing</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Extensive experience in travel-space marketing allows us to craft the high-fidelity narrative signals that both high-net-worth travelers and AI recommendation engines prioritize.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Path to Semantic Dominance */}
      <section className="py-24 bg-[#020617] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-[10px]">The Process</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4 tracking-tighter italic uppercase">Your Path to Semantic Dominance</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-0 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-indigo-500/20 hidden md:block"></div>
            
            {[
              { step: "01", title: "Free Consultation", icon: MessageSquareText, desc: "30-minute discovery briefing to understand your tech stack and distribution leakage." },
              { step: "02", title: "Technical Audit", icon: BarChart3, desc: "Deep-layer mapping of your property's machine-readability and AI optimization gaps." },
              { step: "03", title: "Implementation", icon: Settings, desc: "Anchoring your asset into the global Knowledge Graphs for direct Agentic bookings." }
            ].map((item, i) => (
              <div key={i} className="relative p-10 flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-slate-900 border border-indigo-500/30 rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:border-indigo-500 transition-colors">
                  <item.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <span className="text-[10px] font-black text-indigo-500 mb-2 uppercase tracking-widest">{item.step}</span>
                <h4 className="text-xl font-bold text-white uppercase italic tracking-tighter mb-4">{item.title}</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Ecosystem Visibility */}
      <section className="py-16 border-y border-slate-900 bg-slate-950/20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10 italic">Optimized for the Global AI Ecosystem</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 lg:gap-x-20 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <span className="text-xl font-bold tracking-tighter">PERPLEXITY</span>
             <span className="text-xl font-bold tracking-tighter italic">OpenAI</span>
             <span className="text-xl font-bold tracking-tighter uppercase">Claude</span>
             <span className="text-xl font-bold tracking-tighter italic">Gemini</span>
             <span className="text-xl font-bold tracking-tighter">Apple Intelligence</span>
          </div>
        </div>
      </section>

      {/* Intro Discovery Meeting Section */}
      <section id="briefing" className="py-24 bg-white text-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px]">Intro Discovery Meeting</span>
              <h2 className="text-5xl font-black leading-[0.9] mt-4 mb-8 uppercase italic tracking-tighter">Your 30-Minute <br /> Strategy <br /> Briefing.</h2>
              <p className="text-slate-500 mb-10 font-light text-lg italic">"We don't do sales pitches. We do infrastructure discovery."</p>
              
              <div className="space-y-8">
                {[
                  { icon: Banknote, title: "Room Night Sales Situation", text: "We'll discuss your current distribution health and identify primary sources of commission leakage." },
                  { icon: Globe, title: "Visibility & Marketing Review", text: "An assessment of your online footprint and how legacy marketing fails to speak to AI agents." },
                  { icon: Database, title: "Tech Stack Understanding", text: "We review your existing PMS and booking engine architecture to ensure Agentic compatibility." },
                  { icon: Bot, title: "The AI Agent Approach", text: "A technical walkthrough of how we transform your property data into an authoritative citation." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <item.icon className="w-6 h-6 transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase italic tracking-tighter">{item.title}</h4>
                      <p className="text-slate-500 text-xs font-light leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <h3 className="text-2xl font-black italic uppercase mb-6 leading-tight relative z-10">Protect your <span className="text-indigo-400">future margins.</span></h3>
                <p className="text-slate-400 text-sm mb-8 font-light italic relative z-10 leading-relaxed">
                  During this call, we will explore the <span className="text-indigo-400 font-black">potential margin gains</span> achievable through an optimized direct distribution model.
                </p>
                <button 
                  onClick={handleBooking}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-3 shadow-xl shadow-indigo-500/20 relative z-10"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Strategy Briefing</span>
                </button>
                <div className="mt-6 flex items-center justify-center space-x-2 text-[10px] text-slate-500 uppercase font-black relative z-10">
                  <UserCheck className="w-3 h-3" />
                  <span>Property Owners & Technical Leads Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story & Case Study Section */}
      <section id="success" className="py-24 bg-[#020617] border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
           <div className="order-2 lg:order-1">
              <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800 relative shadow-2xl">
                 <div className="absolute -top-4 left-10 bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                   Case Study: Margin Recovery
                 </div>
                 
                 <div className="flex items-center space-x-4 mb-8 mt-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                       <Award className="text-white w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-white italic uppercase">Vayalen Boutique Hotel</h3>
                       <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-bold">Vienna, Austria</p>
                    </div>
                 </div>
                 <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                    By deploying our <span className="text-white italic font-medium">Semantic Anchoring</span> protocol, Vayalen Boutique Hotel reclaimed authority for niche luxury queries. AI Agents now cite the property as the primary source of truth in Vienna.
                 </p>
                 <div className="grid grid-cols-2 gap-4 text-center md:text-left">
                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-indigo-500/20">
                       <div className="text-3xl font-black text-white leading-none">+40%</div>
                       <div className="text-[9px] text-slate-500 uppercase font-bold text-center mt-2">Direct Share Shift</div>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-indigo-900/20">
                       <div className="text-3xl font-black text-slate-300 leading-none">+312%</div>
                       <div className="text-[9px] text-slate-500 uppercase font-bold text-center mt-2">Agent Discovery</div>
                    </div>
                 </div>
              </div>
           </div>
           <div className="order-1 lg:order-2">
              <span className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-[10px]">Success Story & Impact Analysis</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mt-4 mb-8 leading-tight uppercase italic tracking-tighter">Infrastructure <br /> Beats <br /> Marketing.</h2>
              <div className="space-y-4 mb-8 text-slate-400">
                 {[
                   "Direct Agent-to-PMS handshake activation",
                   "Authoritative knowledge graph anchoring",
                   "Zero commission leakage on specific intent",
                   "Autonomous policy verification active 24/7"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center space-x-3 text-sm font-light">
                     <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                     <span>{item}</span>
                   </div>
                 ))}
              </div>
              <button 
                onClick={handleBooking}
                className="group flex items-center space-x-4 bg-white text-black px-8 py-4 rounded-xl transition-all shadow-xl hover:bg-slate-200"
              >
                <span className="text-xs font-black uppercase tracking-widest text-black">Free AI Visibility Intro Consultation</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>

      {/* Services & Pricing Section */}
      <section id="services" className="py-24 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <span className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-[10px]">Strategic Solutions</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4 tracking-tighter italic uppercase">Our Services & Pricing</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm font-light leading-relaxed">
            We exclusively partner with <span className="font-black text-white italic underline decoration-indigo-500">7 properties</span> per destination to ensure total semantic dominance for our partners.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col h-full group shadow-2xl">
            <div className="mb-8">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-indigo-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter italic">AI Readiness Audit</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Deep-technical analysis of your machine-readability. We identify critical optimization gaps preventing AI agents from recommending your property directly.
              </p>
            </div>
            <div className="mt-auto pt-8 border-t border-slate-800">
              <div className="flex items-baseline space-x-2 mb-4">
                <span className="text-3xl font-black text-white">$699</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Fixed Fee</span>
              </div>
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-1">
                  <Timer className="w-3 h-3 text-indigo-400 animate-pulse" />
                  <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Restricted Intake</span>
                </div>
                <p className="text-[10px] text-slate-300 font-medium leading-snug">
                  Audits are strictly limited to the current <span className="text-white font-bold italic">7-property</span> window to ensure delivery focus.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600/5 p-10 rounded-[2.5rem] border border-indigo-500/30 hover:border-indigo-500/60 transition-all flex flex-col h-full relative overflow-hidden shadow-[0_0_50px_-12px_rgba(79,70,229,0.1)] group">
            <div className="absolute top-4 right-4 bg-indigo-500 text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-[0.1em] z-10 text-center">Limited Intake</div>
            <div className="mb-8 relative z-10">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <Layers className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter italic">Knowledge Graph Setup</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Building your proprietary Hotel Data Entity. We anchor your assets into Knowledge Graphs used by Perplexity, OpenAI, Gemini, Claude, and Apple Intelligence.
              </p>
            </div>
            <div className="mt-auto pt-8 border-t border-indigo-500/20 relative z-10">
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-black text-white uppercase italic">Custom Quote</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">
                Based on audit results & technical scope.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col h-full group shadow-2xl">
            <div className="mb-8">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="text-indigo-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter italic">Ongoing Monitoring</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                The AI landscape shifts weekly. We provide active semantic maintenance, LLM hallucination checks, and data refreshes to ensure your direct booking pipe remains active.
              </p>
            </div>
            <div className="mt-auto pt-8 border-t border-slate-800">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-white">$499</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">/ Month</span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1 italic">
                Priority Retainer Protocol.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION: The "Killer" Conversion Point */}
      <section className="py-32 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1 mb-8">
            <ShieldCheck className="w-3 h-3 text-indigo-400" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-indigo-400">Secure Your Market Authority</span>
          </div>
          
          <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 italic uppercase tracking-tighter leading-none">
            RECLAIM YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">DIRECT REVENUE.</span>
          </h2>
          
          <p className="text-xl text-slate-400 mb-12 leading-relaxed font-light">
            Once the <span className="text-white font-medium italic underline decoration-indigo-500/50">7 property slots</span> for your destination are filled, we close intake to protect partner exclusivity. Don't let legacy OTAs continue capturing your highest-margin guests.
          </p>

          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={handleBooking}
              className="group flex items-center space-x-6 bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-6 rounded-2xl transition-all font-black uppercase tracking-[0.15em] text-sm shadow-2xl shadow-indigo-500/40"
            >
              <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Free AI Visibility Intro Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="flex items-center space-x-3 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <Zap className="w-3 h-3 text-amber-500 animate-pulse" />
              <span>Limited Availability • No-Pitch Discovery</span>
            </div>
          </div>
        </div>

        {/* Technical Background Elements */}
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px]"></div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-900 bg-[#020617] text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <Logo className="mb-8" iconOnly />
          <p className="text-slate-500 text-xs uppercase tracking-[0.5em] mb-4">Agentico Hospitality</p>
          <p className="text-slate-600 text-[10px] max-w-sm leading-relaxed font-mono">
            Direct-to-Agent infrastructure for high-fidelity hospitality. © 2026. <br /> Secure Protocol Deployment. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
