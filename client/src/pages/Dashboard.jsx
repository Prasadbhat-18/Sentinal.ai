import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { Activity, ShieldAlert, Globe, Clock, LayoutGrid, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockRadarData = [
  { axis: "Social Dependency", value: 85 },
  { axis: "Impulsivity", value: 60 },
  { axis: "Productivity", value: 40 },
  { axis: "Nocturnal Index", value: 75 },
  { axis: "Privacy Awareness", value: 30 },
  { axis: "Attention Span", value: 50 }
];

const mockTopSites = [
  { domain: 'youtube.com', visits: 342 },
  { domain: 'twitter.com', visits: 289 },
  { domain: 'reddit.com', visits: 210 },
  { domain: 'github.com', visits: 156 },
  { domain: 'amazon.com', visits: 98 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-outline-variant/30 bg-surface-container-lowest p-6 flex flex-col">
        <div className="mb-12">
          <h2 className="font-display font-bold text-xl tracking-widest text-on-surface">SENTINEL</h2>
          <p className="text-xs font-mono text-outline mt-1">v2.04.1</p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary border-l-2 border-primary font-mono text-sm uppercase tracking-wider">
            <LayoutGrid className="w-4 h-4" /> Dashboard
          </Link>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors font-mono text-sm uppercase tracking-wider">
            <Clock className="w-4 h-4" /> Timeline
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors font-mono text-sm uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" /> Audit
          </a>
        </nav>
        
        <div className="mt-auto">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface font-mono text-sm uppercase tracking-wider">
            <Settings className="w-4 h-4" /> Settings
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-10">
          <h1 className="font-display text-3xl font-bold mb-2">CORE ANALYTICS</h1>
          <p className="font-mono text-sm text-outline uppercase tracking-widest">Real-time Behavioral Fingerprint Analysis</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Risk Score */}
          <div className="glass-panel p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-error"></div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-outline mb-4">Privacy Risk Score</h3>
            <div className="text-6xl font-display font-bold text-error mb-2">78</div>
            <p className="text-sm text-error-container bg-error/10 px-3 py-1 font-mono uppercase">High Exposure</p>
          </div>

          {/* Radar Chart */}
          <div className="glass-panel p-6 lg:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-outline mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Behavioral Fingerprint
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockRadarData}>
                  <PolarGrid stroke="#3b494b" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: '#b9cacb', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="User" dataKey="value" stroke="#00f0ff" fill="#00f0ff" fillOpacity={0.2} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e1f25', border: '1px solid #3b494b' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Domains */}
          <div className="glass-panel p-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-outline mb-6 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" /> Top Domains VOL
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockTopSites} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3b494b" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#849495" tick={{fontSize: 12}} />
                  <YAxis dataKey="domain" type="category" stroke="#e3e1e9" tick={{fontSize: 12, fontFamily: 'JetBrains Mono'}} width={100} />
                  <Tooltip cursor={{fill: '#292a2f'}} contentStyle={{ backgroundColor: '#1e1f25', border: '1px solid #3b494b' }} />
                  <Bar dataKey="visits" fill="#00dbe9" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Matrix placeholder */}
          <div className="glass-panel p-6">
             <h3 className="font-mono text-xs uppercase tracking-widest text-outline mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4 text-tertiary" /> Activity Matrix T-24H
            </h3>
            <div className="h-64 flex items-center justify-center border border-dashed border-outline-variant/30">
              <p className="text-outline font-mono text-xs uppercase tracking-widest">Heatmap Render Pending</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
