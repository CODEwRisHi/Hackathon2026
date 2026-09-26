import React from 'react';
import { 
  ShieldAlert, 
  ArrowUpRight, 
  ChevronRight, 
  Plus, 
  SlidersHorizontal,
  Radio,
  Server
} from 'lucide-react';

export default function CyberGuard() {
  return (
    <div className="min-h-screen bg-[#D5D8C5] text-[#181818] font-outfit p-6 select-none">
      {/* Top Navbar */}
      <header className="flex items-center justify-between pb-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F9771D] flex items-center justify-center text-white font-bold shadow-md shadow-[#F9771D]/20">
            <ShieldAlert size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#181818]">CyberGuard</span>
        </div>

        <nav className="flex items-center gap-1 bg-[#E1E4D5] border border-[#C2C6B2] px-2 py-1.5 rounded-full text-xs font-semibold text-[#181818]/70">
          <button className="px-4 py-1.5 rounded-full bg-[#D5D8C5] text-[#181818] font-bold shadow-xs">Data overview</button>
          <button className="px-4 py-1.5 hover:text-[#181818] transition">Key Alerts</button>
          <button className="px-4 py-1.5 hover:text-[#181818] transition">Insights</button>
          <button className="px-4 py-1.5 hover:text-[#181818] transition">Executions</button>
          <button className="p-1.5 hover:text-[#181818] transition"><Plus size={14} /></button>
        </nav>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-[#E1E4D5] border border-[#C2C6B2] rounded-full text-xs font-semibold hover:bg-white/40 transition">
            Alerts Table
          </button>
          <div className="w-8 h-8 rounded-full bg-[#E1E4D5] border border-[#C2C6B2] flex items-center justify-center cursor-pointer">
            <SlidersHorizontal size={14} className="text-[#181818]/70" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Upper Dark Radar Deck */}
        <section className="bg-[#181818] text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl border border-white/5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-xs font-medium text-white/60">
              <span>Dynamic View</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-[#18B880]">
                <Radio size={12} className="animate-pulse" /> Live Feed
              </span>
              <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/80">24h</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-6 items-center">
            {/* Left Metrics */}
            <div className="col-span-3 space-y-6">
              <div>
                <span className="text-xs text-white/40 font-medium block">Data Ingestion</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-light">65</span>
                  <span className="text-xs text-white/50">Total</span>
                </div>
                <svg className="w-28 h-8 mt-2 stroke-white/40 fill-none" viewBox="0 0 100 30">
                  <path d="M0,20 Q25,5 50,22 T100,8" strokeWidth="2" />
                </svg>
              </div>

              <div>
                <span className="text-xs text-white/40 block mb-2 font-medium">Open Incidents</span>
                <div className="flex gap-2">
                  {[
                    { count: 3, label: 'C' },
                    { count: 2, label: 'H' },
                    { count: 5, label: 'M' },
                    { count: 0, label: 'L' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <div className="w-6 h-6 rounded-full bg-[#F9771D] text-white flex items-center justify-center text-[10px] font-bold">
                        {item.count}
                      </div>
                      <span className="text-[10px] text-white/40 font-semibold">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Radar Arc Display */}
            <div className="col-span-6 relative flex flex-col items-center justify-center py-6">
              <div className="relative w-80 h-44 border-t-[3px] border-l-[3px] border-r-[3px] border-dashed border-white/20 rounded-t-full flex items-end justify-center">
                <div className="absolute top-2 w-64 h-36 border-t border-dashed border-white/10 rounded-t-full flex items-end justify-center">
                  <div className="w-48 h-28 border-t-4 border-[#18B880] rounded-t-full flex flex-col items-center justify-end pb-3">
                    <span className="text-3xl font-light">10%</span>
                    <span className="text-[11px] text-white/50 tracking-wide uppercase">Manually Resolved</span>
                  </div>
                </div>

                <span className="absolute top-4 left-6 text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">okta</span>
                <span className="absolute top-0 right-16 text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">aws</span>
                <span className="absolute bottom-4 left-2 text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">APACHE</span>
                <span className="absolute bottom-2 right-2 text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">Alibaba Cloud</span>
              </div>
            </div>

            {/* Right Feed Panel */}
            <div className="col-span-3 space-y-2">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs flex items-center justify-between">
                <span className="text-white/80">3 Incidents reopened</span>
                <span className="text-[10px] text-white/40">1m ago</span>
              </div>
              <div className="bg-[#F9771D] text-white rounded-xl p-3 text-xs flex items-center justify-between font-semibold shadow-lg shadow-[#F9771D]/20">
                <span className="flex items-center gap-1.5"><ShieldAlert size={14} /> Okta | Connection error</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs flex items-center justify-between">
                <span className="text-white/80">2 Incidents reopened</span>
                <span className="text-[10px] text-white/40">5m ago</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lower Sage Grid Cards */}
        <section className="grid grid-cols-4 gap-4">
          <div className="bg-[#E1E4D5] rounded-3xl p-5 border border-[#C2C6B2] flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm">Sources</h3>
              <ArrowUpRight size={16} className="text-[#181818]/60 cursor-pointer" />
            </div>
            <div className="space-y-3">
              {[
                { name: 'XDR Agent', count: 37 },
                { name: 'XDR Analitics BIOS', count: 29 },
                { name: 'XDR BIOS', count: 18 }
              ].map((src, i) => (
                <div key={i} className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-[#181818]/80 flex items-center gap-2"><Server size={14} /> {src.name}</span>
                  <span className="font-bold">{src.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#E1E4D5] rounded-3xl p-5 border border-[#C2C6B2]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm">Alerts</h3>
              <ArrowUpRight size={16} className="text-[#181818]/60 cursor-pointer" />
            </div>
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between mb-1 text-[11px] font-semibold">
                  <span className="text-[#181818]/70">High</span>
                  <span>23</span>
                </div>
                <div className="h-1.5 w-full bg-[#C2C6B2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#CE6969] rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-[11px] font-semibold">
                  <span className="text-[#181818]/70">Medium</span>
                  <span>15</span>
                </div>
                <div className="h-1.5 w-full bg-[#C2C6B2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F9771D] rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-[11px] font-semibold">
                  <span className="text-[#181818]/70">Low</span>
                  <span>8</span>
                </div>
                <div className="h-1.5 w-full bg-[#C2C6B2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#18B880] rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#E1E4D5] rounded-3xl p-5 border border-[#C2C6B2] flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-sm">Automation</h3>
              <ArrowUpRight size={16} className="text-[#181818]/60 cursor-pointer" />
            </div>
            <div className="space-y-2">
              {['Playbooks Complete', 'Waiting for Analysis', 'Playbook Recommendations'].map((text, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-[#D5D8C5]/70 hover:bg-[#D5D8C5] transition cursor-pointer text-xs font-semibold">
                  <span>{text}</span>
                  <ChevronRight size={14} className="text-[#181818]/50" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#E1E4D5] rounded-3xl p-5 border border-[#C2C6B2] flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm">Assets</h3>
              <ArrowUpRight size={16} className="text-[#181818]/60 cursor-pointer" />
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <span className="text-4xl font-light">12</span>
              <span className="text-xs font-bold text-[#181818]/60 uppercase">New</span>
            </div>
            <button className="w-full mt-4 py-2.5 bg-[#F9771D] hover:bg-[#e06714] text-white rounded-xl text-xs font-bold transition shadow-md shadow-[#F9771D]/20">
              Full timeline
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}