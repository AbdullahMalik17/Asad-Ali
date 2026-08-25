"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Mic,
  Award,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Headphones,
} from "lucide-react";

interface AudioSample {
  id: string;
  title: string;
  surahArabic: string;
  reciter: string;
  credentials: string;
  courseCategory: string;
  tajweedPoints: string[];
  url: string;
  duration: string;
}

const RECITATION_SAMPLES: AudioSample[] = [
  {
    id: "fatiha",
    title: "Surah Al-Fatiha",
    surahArabic: "سُورَةُ الْفَاتِحَة",
    reciter: "Qari Hafiz Muhammad",
    credentials: "Wifaq-ul-Madaris Certified • 10 Years Experience",
    courseCategory: "Tajweed & Makharij Foundation",
    tajweedPoints: [
      "Precise throat Makharij (Ain & Ha)",
      "Clear Madd Munfasil execution",
      "Proper vowel elongations & stops",
    ],
    url: "https://server8.mp3quran.net/afs/001.mp3",
    duration: "0:48",
  },
  {
    id: "ikhlas",
    title: "Surah Al-Ikhlas",
    surahArabic: "سُورَةُ الْإِخْلَاص",
    reciter: "Qari Mishari Rashid Al-Afasy",
    credentials: "Ijazah Holder • Hafiz-ul-Quran",
    courseCategory: "Noorani Qaida & Nazra Reading",
    tajweedPoints: [
      "Qalqalah Kubra on Dal at verse endings",
      "Ghunna on Noon Mushaddad",
      "Correct Heavy Letter (Qaf) articulation",
    ],
    url: "https://server8.mp3quran.net/afs/112.mp3",
    duration: "0:28",
  },
  {
    id: "mulk",
    title: "Surah Al-Mulk",
    surahArabic: "سُورَةُ الْمُلْك",
    reciter: "Qari Hafiz Muhammad",
    credentials: "Senior Hifz Faculty Leader",
    courseCategory: "Hifz-ul-Quran & Memorization Pacing",
    tajweedPoints: [
      "Measured, steady Tartil pace for retention",
      "Idgham with Ghunna transitions",
      "Smooth breath management in long verses",
    ],
    url: "https://server8.mp3quran.net/afs/067.mp3",
    duration: "1:15",
  },
  {
    id: "rahman",
    title: "Surah Ar-Rahman",
    surahArabic: "سُورَةُ الرَّحْمَٰن",
    reciter: "Qari Abdul Basit Style",
    credentials: "Al-Azhar University Specialist",
    courseCategory: "Advanced Tajweed & Melodic Tartil",
    tajweedPoints: [
      "Deep spiritual resonance and pausing",
      "Madd Lazim 6-harakat precision",
      "Subtle Ikhfa nasal sound balance",
    ],
    url: "https://server8.mp3quran.net/afs/055.mp3",
    duration: "1:30",
  },
];

export default function AudioRecitationPreview() {
  const [activeSampleId, setActiveSampleId] = useState<string>("fatiha");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeSample =
    RECITATION_SAMPLES.find((s) => s.id === activeSampleId) ||
    RECITATION_SAMPLES[0];

  const handleSelectSample = useCallback((id: string) => {
    setActiveSampleId(id);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((e) => console.log("Audio play deferred:", e));
      }
    }, 50);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        ?.play()
        .catch((e) => console.log("Audio play error:", e));
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  return (
    <section
      className="relative py-16 sm:py-24 bg-islamic-pattern-light overflow-hidden border-y border-emerald-900/10"
      id="audio-preview"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-100/90 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-900 shadow-sm">
            <Headphones size={14} className="text-amber-700" />
            Listen To Teaching Quality
          </span>

          <h2 className="mt-3 text-3xl font-black text-emerald-950 sm:text-4xl lg:text-5xl tracking-tight">
            Authentic Recitation &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              Tajweed Standards
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Experience the clarity, Makharij precision, and soothing melody
            instilled in every student by our certified male & female teachers.
          </p>
        </div>

        {/* 21st-Style Interactive Player Console */}
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-10 shadow-2xl border border-emerald-500/30 relative overflow-hidden">
          {/* Ambient Lighting Background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* HTML5 Audio Element */}
          <audio
            ref={audioRef}
            src={activeSample.url}
            aria-label="Quran recitation live audio"
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          {/* Top Player Status Bar */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-emerald-800/80">
            {/* Play Button & Title */}
            <div className="flex items-center gap-5 text-center sm:text-left w-full md:w-auto">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause Recitation" : "Play Recitation"}
                className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-emerald-950 shadow-gold-glow transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                {isPlaying ? (
                  <Pause size={28} className="fill-emerald-950" />
                ) : (
                  <Play size={28} className="fill-emerald-950 ml-1" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-amber-300 border border-amber-300/30">
                    {activeSample.courseCategory}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mt-1">
                  <h3 className="text-2xl font-black text-white">
                    {activeSample.title}
                  </h3>
                  <span className="font-arabic text-xl text-amber-300 font-bold hidden sm:inline">
                    {activeSample.surahArabic}
                  </span>
                </div>

                <p className="text-xs text-emerald-200/90 flex items-center gap-1.5 mt-0.5 font-medium">
                  <Award size={14} className="text-amber-400 shrink-0" />
                  <span>{activeSample.reciter}</span>
                  <span className="text-emerald-400">•</span>
                  <span>{activeSample.credentials}</span>
                </p>
              </div>
            </div>

            {/* Live Waveform Equalizer & Audio Controls */}
            <div className="flex items-center gap-4">
              {/* Waveform Bars */}
              <div
                className="flex items-end gap-1 h-8 px-3 py-1 bg-emerald-950/80 rounded-xl border border-emerald-700/50"
                title={isPlaying ? "Audio playing" : "Audio paused"}
              >
                {[40, 75, 100, 55, 90, 60, 85, 45, 95, 70, 50, 80].map(
                  (height, idx) => (
                    <span
                      key={idx}
                      style={{
                        height: isPlaying ? `${height}%` : "20%",
                        animationDuration: `${0.6 + (idx % 4) * 0.2}s`,
                      }}
                      className={`w-1 rounded-full bg-gradient-to-t from-amber-500 to-amber-300 transition-all duration-200 ${
                        isPlaying ? "animate-pulse" : ""
                      }`}
                    />
                  )
                )}
              </div>

              {/* Mute Button */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX size={20} className="text-amber-400" />
                ) : (
                  <Volume2 size={20} className="text-amber-400" />
                )}
              </button>
            </div>
          </div>

          {/* Sample Selector Grid */}
          <div className="relative z-10 mt-8">
            <span className="block text-xs font-bold text-emerald-200/90 uppercase tracking-wider mb-3">
              Select Sample Surah / Level:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {RECITATION_SAMPLES.map((sample) => {
                const isSelected = sample.id === activeSampleId;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isSelected
                        ? "border-amber-400 bg-white/15 text-white shadow-lg ring-1 ring-amber-400/50"
                        : "border-white/10 bg-white/5 text-emerald-100/90 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold truncate">
                        {sample.title}
                      </span>
                      {isSelected && isPlaying ? (
                        <span className="flex gap-0.5 items-end h-3">
                          <span className="w-1 bg-amber-400 h-full animate-bounce"></span>
                          <span className="w-1 bg-amber-400 h-2/3 animate-bounce delay-75"></span>
                          <span className="w-1 bg-amber-400 h-4/5 animate-bounce delay-150"></span>
                        </span>
                      ) : (
                        <Play size={14} className="text-amber-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-amber-300/90 mt-1 font-arabic">
                      {sample.surahArabic}
                    </p>
                    <p className="text-[10px] text-emerald-200/80 mt-0.5 truncate">
                      {sample.courseCategory.split("Foundation")[0]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tajweed Focus Points Callout */}
          <div className="relative z-10 mt-8 rounded-2xl bg-emerald-950/70 border border-emerald-700/40 p-5">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300 mb-2.5">
              <Sparkles size={14} className="text-amber-400" />
              <span>Tajweed Precision Taught in This Lesson:</span>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {activeSample.tajweedPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-xs text-emerald-100 font-medium bg-white/5 p-2.5 rounded-xl border border-white/5"
                >
                  <CheckCircle2
                    size={15}
                    className="text-amber-400 mt-0.5 shrink-0"
                  />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Trial Booking CTA */}
          <div className="relative z-10 mt-8 pt-6 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-emerald-200/90 font-medium text-center sm:text-left">
              Want your child or yourself to recite with this Tajweed standard?
            </p>
            <a
              href="#admissions"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-xs sm:text-sm font-black text-emerald-950 shadow-md hover:scale-105 transition-transform"
            >
              <span>Schedule 3-Day Free Trial</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
