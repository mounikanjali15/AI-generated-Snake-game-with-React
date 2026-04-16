import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Terminal, Cpu, Zap, Activity, SkipBack, Play, SkipForward, AlertTriangle } from 'lucide-react';

export default function App() {
  return (
    <div className="h-screen w-screen bg-black text-glitch-cyan font-mono selection:bg-glitch-magenta selection:text-black overflow-hidden flex flex-col relative">
      {/* CRT & Glitch Overlays */}
      <div className="crt-overlay" />
      <div className="noise" />
      <div className="scanline" />
      
      {/* Header / HUD */}
      <header className="h-12 px-4 flex items-center justify-between border-b border-glitch-cyan/30 bg-black z-50 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="glitch text-xl font-black tracking-[4px]" data-text="SYSTEM_OVERRIDE">
            SYSTEM_OVERRIDE
          </div>
        </div>
        <div className="flex items-center gap-6 text-[12px] tracking-widest">
          <span className="animate-pulse text-glitch-magenta">WARNING: UNSTABLE_CONNECTION</span>
          <span className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-glitch-magenta animate-bounce" />
            NODE_ID: 0x7F_GLITCH
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row p-4 gap-4 overflow-hidden relative z-10">
        {/* Left: System Diagnostics (Cryptic) */}
        <aside className="w-full lg:w-64 flex flex-col gap-4">
          <div className="border border-glitch-cyan/20 p-3 bg-black/50 tearing">
            <h3 className="text-[10px] text-glitch-magenta mb-2 flex items-center gap-2">
              <AlertTriangle className="w-3 h-3" /> CORE_VITALS
            </h3>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between"><span>CPU_LOAD</span><span className="text-glitch-magenta">ERR_99%</span></div>
              <div className="flex justify-between"><span>MEM_SYNC</span><span className="text-glitch-magenta">FAILED</span></div>
              <div className="flex justify-between"><span>TEMP</span><span className="text-glitch-magenta">CRITICAL</span></div>
            </div>
          </div>

          <div className="flex-1 border border-glitch-cyan/20 p-3 bg-black/50 overflow-hidden">
            <h3 className="text-[10px] text-glitch-cyan mb-2">LOG_STREAM</h3>
            <div className="space-y-1 text-[9px] opacity-60">
              <p>{`> INITIALIZING_SNAKE_PROTOCOL...`}</p>
              <p className="text-glitch-magenta">{`> ERROR: BUFFER_OVERFLOW_DETECTED`}</p>
              <p>{`> BYPASSING_SECURITY_LAYER_01`}</p>
              <p>{`> INJECTING_SYNTH_WAVEFORM...`}</p>
              <p className="animate-pulse">{`> _`}</p>
            </div>
          </div>
        </aside>

        {/* Center: The Game (The Core) */}
        <section className="flex-1 flex flex-col items-center justify-center border border-glitch-cyan/40 bg-black/80 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-glitch-magenta" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-glitch-magenta" />
          
          <div className="tearing w-full flex justify-center">
            <SnakeGame />
          </div>
        </section>

        {/* Right: Audio Matrix */}
        <aside className="w-full lg:w-72 flex flex-col gap-4">
          <div className="border border-glitch-cyan/20 p-4 bg-black/50">
            <h3 className="text-[10px] text-glitch-magenta uppercase tracking-[4px] mb-4">AUDIO_MATRIX</h3>
            <MusicPlayer />
          </div>

          <div className="p-4 border border-glitch-magenta/20 bg-black/50 flex flex-col gap-2">
            <h3 className="text-[10px] text-glitch-cyan uppercase tracking-widest">INPUT_MAPPING</h3>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="border border-glitch-cyan/10 p-1">DIR: ARROWS</div>
              <div className="border border-glitch-cyan/10 p-1">SYNC: SPACE</div>
              <div className="border border-glitch-cyan/10 p-1">REBOOT: R</div>
              <div className="border border-glitch-cyan/10 p-1">VOL: SLIDER</div>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer / Status Bar */}
      <footer className="h-8 border-t border-glitch-cyan/30 bg-black px-4 flex items-center justify-between z-50 text-[10px] tracking-[2px]">
        <div className="flex gap-4">
          <span className="text-glitch-magenta">ENCRYPTION: NONE</span>
          <span>LATENCY: 0.0001ms</span>
        </div>
        <div className="glitch" data-text="TERMINAL_LOCKED">TERMINAL_LOCKED</div>
      </footer>
    </div>
  );
}
