"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Clock,
  Calendar,
  BookOpen,
  Download,
  Search,
  CheckCircle2,
  Video,
  FileText,
  User,
  Sparkles,
  Bookmark,
  Share2,
} from "lucide-react";

export interface RecordingSession {
  id: string;
  title: string;
  courseName: string;
  teacherName: string;
  date: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: "tajweed" | "hifz" | "tafseer" | "qaida";
  notesPdfUrl?: string;
  timestamps: { time: string; seconds: number; label: string }[];
}

const SAMPLE_RECORDINGS: RecordingSession[] = [
  {
    id: "rec-01",
    title: "Lesson 12: Makharij of Throat Letters & Noon Sakinah",
    courseName: "Noorani Qaida & Basic Tajweed",
    teacherName: "Ustadha Fatima Al-Zahra",
    date: "August 04, 2026",
    duration: "42:15",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
    category: "tajweed",
    notesPdfUrl: "#download-notes-lesson-12",
    timestamps: [
      { time: "01:20", seconds: 80, label: "Recitation Warm-up & Review" },
      { time: "08:45", seconds: 525, label: "Makhraj of Letter Ghain & Khaw" },
      { time: "16:30", seconds: 990, label: "Noon Sakinah Izhar Rule Examples" },
      { time: "28:10", seconds: 1690, label: "Teacher Correction & Recitation Drill" },
      { time: "38:00", seconds: 2280, label: "Homework Assignment Overview" },
    ],
  },
  {
    id: "rec-02",
    title: "Surah Al-Mulk Verses 1-10 Recitation & Memorization Check",
    courseName: "Tajweed & Recitation Masterclass",
    teacherName: "Ustadha Fatima Al-Zahra",
    date: "August 01, 2026",
    duration: "35:40",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&q=80&w=800",
    category: "hifz",
    notesPdfUrl: "#download-notes-surah-mulk",
    timestamps: [
      { time: "00:45", seconds: 45, label: "Surah Al-Mulk Opening Recitation" },
      { time: "10:15", seconds: 615, label: "Qalqalah in Verse 3 Detailed Check" },
      { time: "22:50", seconds: 1370, label: "Memorization Repetition Technique" },
    ],
  },
  {
    id: "rec-03",
    title: "Tafseer of Surah An-Naba: Signs of Creation & Judgement Day",
    courseName: "Quran Translation & Tafseer",
    teacherName: "Dr. Ustadh Ahmad Al-Mansoor",
    date: "July 28, 2026",
    duration: "50:10",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800",
    category: "tafseer",
    notesPdfUrl: "#download-notes-tafseer-naba",
    timestamps: [
      { time: "02:00", seconds: 120, label: "Context of Revelation (Asbab al-Nuzul)" },
      { time: "18:40", seconds: 1120, label: "Linguistic Breakdown of Verses 1-16" },
      { time: "36:15", seconds: 2175, label: "Practical Spiritual Lessons" },
    ],
  },
];

export default function ZoomRecordingsPlayer() {
  const [selectedRecording, setSelectedRecording] = useState<RecordingSession>(SAMPLE_RECORDINGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch((err) => console.log("Video play deferred:", err));
      setIsPlaying(true);
    }
  };

  const handleSelectRecording = (recording: RecordingSession) => {
    setSelectedRecording(recording);
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((err) => console.log("Video play deferred:", err));
      }
    }, 100);
  };

  const jumpToTimestamp = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      if (!isPlaying) {
        videoRef.current.play().catch((err) => console.log("Video play deferred:", err));
        setIsPlaying(true);
      }
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const filteredRecordings = SAMPLE_RECORDINGS.filter((rec) => {
    const matchesCategory = selectedCategory === "all" || rec.category === selectedCategory;
    const matchesSearch =
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Video size={14} /> Zoom Recording Vault
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Class Recordings & Teacher Corrections
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Rewatch live 1-on-1 sessions, jump to teacher feedback timestamps, and download study notes.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-2xl border border-slate-800 text-xs">
          <Sparkles size={14} className="text-amber-400" />
          <span className="text-slate-300 font-semibold">{SAMPLE_RECORDINGS.length} Saved HD Cloud Sessions</span>
        </div>
      </div>

      {/* Main Video Player Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Video Player & Timestamps */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 relative shadow-2xl group">
            <video
              ref={videoRef}
              src={selectedRecording.videoUrl}
              poster={selectedRecording.thumbnailUrl}
              onEnded={() => setIsPlaying(false)}
              className="w-full aspect-video object-cover bg-black"
            />

            {/* Custom Overlay Player Controls */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition shadow-lg"
                >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                </button>

                <button onClick={toggleMute} className="p-2 text-slate-300 hover:text-white transition">
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <div className="text-xs text-slate-300 font-medium">
                  <span className="text-white font-bold">{selectedRecording.title.split(":")[0]}</span>
                </div>
              </div>

              {/* Speed & Fullscreen */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center bg-slate-900/80 rounded-lg p-1 border border-slate-700">
                  {[1, 1.25, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => changeSpeed(spd)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                        playbackSpeed === spd
                          ? "bg-amber-400 text-slate-950"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <button onClick={toggleFullscreen} className="p-2 text-slate-300 hover:text-white transition">
                  <Maximize size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Session Info & Timestamps */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {selectedRecording.courseName}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">{selectedRecording.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <User size={13} className="text-slate-400" /> {selectedRecording.teacherName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-slate-400" /> {selectedRecording.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-amber-400" /> {selectedRecording.duration}
                  </span>
                </p>
              </div>

              {selectedRecording.notesPdfUrl && (
                <a
                  href={selectedRecording.notesPdfUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading lesson notes & slide notes for ${selectedRecording.title}...`);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-slate-700 transition flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Download size={14} />
                  <span>Lesson Notes PDF</span>
                </a>
              )}
            </div>

            {/* Interactive Timestamps / Teacher Markers */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Bookmark size={14} className="text-amber-400" /> Teacher Feedback & Correction Bookmarks:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedRecording.timestamps.map((ts, idx) => (
                  <button
                    key={idx}
                    onClick={() => jumpToTimestamp(ts.seconds)}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/40 text-left transition flex items-center justify-between group"
                  >
                    <span className="text-xs text-slate-300 group-hover:text-white font-medium truncate pr-2">
                      {ts.label}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 shrink-0">
                      {ts.time}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recording Library List */}
        <div className="space-y-4">
          {/* Search & Category Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recordings by lesson or surah..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: "all", label: "All Sessions" },
                { id: "tajweed", label: "Tajweed" },
                { id: "hifz", label: "Hifz" },
                { id: "tafseer", label: "Tafseer" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recordings Cards List */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredRecordings.length === 0 ? (
              <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                No recordings found matching your search.
              </div>
            ) : (
              filteredRecordings.map((rec) => {
                const isSelected = selectedRecording.id === rec.id;
                return (
                  <div
                    key={rec.id}
                    onClick={() => handleSelectRecording(rec)}
                    className={`p-3 rounded-2xl border transition cursor-pointer flex gap-3 group ${
                      isSelected
                        ? "bg-slate-800 border-amber-400/80 shadow-lg"
                        : "bg-slate-950/70 border-slate-800 hover:bg-slate-950 hover:border-slate-700"
                    }`}
                  >
                    <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 relative">
                      <img src={rec.thumbnailUrl} alt={rec.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition">
                        <Play size={16} fill="white" className="text-white ml-0.5" />
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.2 rounded text-[9px] font-mono text-white">
                        {rec.duration}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className={`text-xs font-bold truncate ${isSelected ? "text-amber-400" : "text-white group-hover:text-amber-300"}`}>
                        {rec.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{rec.courseName}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
                        <span>{rec.date}</span>
                        <span className="font-semibold text-emerald-400">{rec.teacherName.split(" ")[0]}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
