"use client";

import React, { useState, useRef, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles, Mic, Award } from "lucide-react";

interface AudioSample {
  id: string;
  title: string;
  reciter: string;
  courseCategory: string;
  url: string;
  duration: string;
}

const AUDIO_SAMPLES: AudioSample[] = [
  {
    id: "fatiha",
    title: "Surah Al-Fatiha (Perfect Tajweed)",
    reciter: "Qari Hafiz Muhammad",
    courseCategory: "Tajweed & Makharij Rules",
    url: "https://server8.mp3quran.net/afs/001.mp3",
    duration: "0:45",
  },
  {
    id: "ikhlas",
    title: "Surah Al-Ikhlas (Madd & Ghunna)",
    reciter: "Qari Mishari Al-Afasy",
    courseCategory: "Noorani Qaida & Nazra",
    url: "https://server8.mp3quran.net/afs/112.mp3",
    duration: "0:25",
  },
  {
    id: "mulk",
    title: "Surah Al-Mulk (Short Sample)",
    reciter: "Qari Hafiz Muhammad",
    courseCategory: "Hifz & Revision Technique",
    url: "https://server8.mp3quran.net/afs/067.mp3",
    duration: "1:20",
  },
];

export default function AudioPreview() {
  const [activeSampleId, setActiveSampleId] = useState<string>("fatiha");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeSample = AUDIO_SAMPLES.find((s) => s.id === activeSampleId) || AUDIO_SAMPLES[0];

  const togglePlay = useCallback((sampleId?: string) => {
    if (sampleId && sampleId !== activeSampleId) {
      setActiveSampleId(sampleId);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch((e) => console.log("Audio play deferred:", e));
        }
      }, 50);
      return;
    }

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch((e) => console.log("Audio play error:", e));
      setIsPlaying(true);
    }
  }, [activeSampleId, isPlaying]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200/80 relative overflow-hidden" id="audio-demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200">
            <Mic className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            Listen to Teaching Quality
          </span>
          <h2 className="text-3xl font-black text-emerald-950 sm:text-4xl mt-2 tracking-tight">
            Authentic Recitation & <span className="text-amber-600">Tajweed Standard</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Experience the clarity, Makharij precision, and pronunciation standard taught by our certified male & female teachers.
          </p>
        </div>

        {/* Player Card */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-900 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-500/30 relative">
          
          <audio
            ref={audioRef}
            src={activeSample.url}
            aria-label="Quran recitation audio sample"
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-emerald-800/80">
            
            <div className="flex items-center gap-4 text-center sm:text-left">
              <button
                type="button"
                onClick={() => togglePlay()}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 flex items-center justify-center shadow-lg hover:scale-105 transition-transform shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" aria-hidden="true" /> : <Play className="w-6 h-6 fill-current ml-0.5" aria-hidden="true" />}
              </button>

              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  {activeSample.courseCategory}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{activeSample.title}</h3>
                <p className="text-xs text-emerald-200/80 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  {activeSample.reciter}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleMute}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? <VolumeX className="w-5 h-5" aria-hidden="true" /> : <Volume2 className="w-5 h-5" aria-hidden="true" />}
              </button>
            </div>

          </div>

          {/* Sample Switcher Tabs */}
          <div className="mt-6">
            <span className="block text-xs font-bold text-emerald-200/80 uppercase tracking-wider mb-3 text-center sm:text-left">
              Select Recitation Sample:
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="tablist" aria-label="Audio recitation samples">
              {AUDIO_SAMPLES.map((sample) => {
                const isActive = sample.id === activeSampleId;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Select recitation sample: ${sample.title}`}
                    onClick={() => togglePlay(sample.id)}
                    className={`p-3 rounded-2xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isActive
                        ? "border-amber-400 bg-white/15 text-white shadow-md"
                        : "border-white/10 bg-white/5 text-emerald-100 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold truncate">{sample.title.split("(")[0]}</span>
                      {isActive && isPlaying ? (
                        <span className="flex gap-0.5 items-end h-3" aria-hidden="true">
                          <span className="w-1 bg-amber-400 h-full animate-bounce"></span>
                          <span className="w-1 bg-amber-400 h-2/3 animate-bounce delay-75"></span>
                          <span className="w-1 bg-amber-400 h-4/5 animate-bounce delay-150"></span>
                        </span>
                      ) : (
                        <Play className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                      )}
                    </div>
                    <p className="text-[10px] text-emerald-300/80 mt-1">{sample.reciter}</p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
