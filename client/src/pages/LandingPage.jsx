import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, EyeOff, Terminal } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#050608]">
      {/* Background grid/glow effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Terminal className="text-primary w-6 h-6" />
          <span className="font-display font-bold text-xl tracking-widest text-on-surface">SENTINEL<span className="text-primary">.AI</span></span>
        </div>
        <div className="flex gap-4">
          <Link to="/upload" className="btn-secondary">Initialize</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-primary/30 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          SYS_SEQ // THREE_PHASE_ANALYSIS
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold text-on-surface mb-6 leading-tight max-w-4xl">
          Decode Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Digital Shadow</span>
        </h1>
        
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-12 font-sans">
          Uncover invisible data trails with absolute precision. Our zero-knowledge engine analyzes your digital footprint locally. No cloud uploads. Total operational security.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <Link to="/upload" className="btn-primary group flex items-center gap-2">
            Execute Protocol <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Link>
          <a href="#features" className="btn-secondary">View Specs</a>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-8 group hover:glass-panel-active transition-all duration-300">
          <div className="w-12 h-12 mb-6 rounded-none bg-surface-bright flex items-center justify-center border border-outline-variant">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-display font-semibold mb-3">Ingest Data</h3>
          <p className="text-sm text-on-surface-variant">Feed raw telemetry or browser logs into the isolated sandbox environment.</p>
        </div>
        
        <div className="glass-panel p-8 group hover:glass-panel-active transition-all duration-300">
          <div className="w-12 h-12 mb-6 rounded-none bg-surface-bright flex items-center justify-center border border-outline-variant">
            <EyeOff className="w-6 h-6 text-tertiary" />
          </div>
          <h3 className="text-xl font-display font-semibold mb-3">Parse & Correlate</h3>
          <p className="text-sm text-on-surface-variant">Algorithms cross-reference data points to map your external exposure and vulnerable linkages.</p>
        </div>
        
        <div className="glass-panel p-8 group hover:glass-panel-active transition-all duration-300">
          <div className="w-12 h-12 mb-6 rounded-none bg-surface-bright flex items-center justify-center border border-outline-variant">
            <Shield className="w-6 h-6 text-secondary-container" />
          </div>
          <h3 className="text-xl font-display font-semibold mb-3">Neutralize Threats</h3>
          <p className="text-sm text-on-surface-variant">Generate actionable mitigation protocols. Erase identified footprints and fortify your perimeter.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
