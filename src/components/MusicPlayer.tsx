import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: 'Cyberpunk City',
    artist: 'AI Synth-01',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/cyberpunk/200/200',
  },
  {
    id: 2,
    title: 'Neon Dreams',
    artist: 'AI Synth-02',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/neon/200/200',
  },
  {
    id: 3,
    title: 'Synthwave Night',
    artist: 'AI Synth-03',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/synthwave/200/200',
  },
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      if (duration) {
        audioRef.current.currentTime = (value[0] / 100) * duration;
        setProgress(value[0]);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />

      <div className="flex flex-col gap-2">
        {TRACKS.map((track, index) => (
          <motion.div
            key={track.id}
            onClick={() => {
              setCurrentTrackIndex(index);
              setIsPlaying(true);
            }}
            className={`flex items-center gap-3 p-2 border cursor-pointer transition-all ${
              currentTrackIndex === index 
                ? 'bg-glitch-cyan/20 border-glitch-cyan shadow-[0_0_10px_rgba(0,255,255,0.3)]' 
                : 'bg-black border-glitch-cyan/10 hover:border-glitch-cyan/40'
            }`}
          >
            <div className="w-10 h-10 border border-glitch-cyan/30 flex-shrink-0 relative overflow-hidden">
              <img src={track.cover} alt={track.title} className="w-full h-full object-cover grayscale contrast-125" referrerPolicy="no-referrer" />
              {currentTrackIndex === index && <div className="absolute inset-0 bg-glitch-cyan/20 animate-pulse" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-[11px] font-bold truncate ${currentTrackIndex === index ? 'text-glitch-cyan glitch' : 'text-glitch-cyan/60'}`} data-text={track.title}>
                {track.title}
              </div>
              <div className="text-[9px] text-glitch-magenta/60 font-mono uppercase tracking-widest truncate">
                {track.artist}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mini Controller */}
      <div className="mt-4 border-t border-glitch-cyan/20 pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevTrack}
              className="w-8 h-8 rounded-none border border-glitch-cyan/20 text-glitch-cyan hover:bg-glitch-cyan hover:text-black"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              onClick={togglePlay}
              className="w-8 h-8 rounded-none border border-glitch-cyan text-glitch-cyan bg-transparent hover:bg-glitch-cyan hover:text-black"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextTrack}
              className="w-8 h-8 rounded-none border border-glitch-cyan/20 text-glitch-cyan hover:bg-glitch-cyan hover:text-black"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-[10px] text-glitch-magenta animate-pulse">
            {isPlaying ? 'STREAMING_ACTIVE' : 'STREAM_HALTED'}
          </div>
        </div>

        <div className="space-y-1">
          <div className="h-1 bg-glitch-cyan/10 w-full relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-glitch-cyan shadow-[0_0_8px_rgba(0,255,255,0.8)]"
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-glitch-cyan/40">
            <span>{audioRef.current ? Math.floor(audioRef.current.currentTime) : 0}s</span>
            <span>{audioRef.current && !isNaN(audioRef.current.duration) ? Math.floor(audioRef.current.duration) : 0}s</span>
          </div>
        </div>
      </div>
    </div>
  );
};
