"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle2,
  Calendar,
  Sparkles,
  BarChart2,
  Clock,
  Target,
  Zap,
} from "lucide-react";

// Mock progress data over weeks
const WEEKLY_PROGRESS_DATA = [
  { week: "Wk 1", tajweedScore: 72, fluency: 65, versesMastered: 12, attendance: 100, hoursPracticed: 3.5 },
  { week: "Wk 2", tajweedScore: 78, fluency: 70, versesMastered: 24, attendance: 100, hoursPracticed: 4.2 },
  { week: "Wk 3", tajweedScore: 81, fluency: 74, versesMastered: 38, attendance: 80, hoursPracticed: 3.8 },
  { week: "Wk 4", tajweedScore: 86, fluency: 79, versesMastered: 52, attendance: 100, hoursPracticed: 5.0 },
  { week: "Wk 5", tajweedScore: 89, fluency: 83, versesMastered: 68, attendance: 100, hoursPracticed: 5.5 },
  { week: "Wk 6", tajweedScore: 92, fluency: 87, versesMastered: 85, attendance: 90, hoursPracticed: 6.1 },
  { week: "Wk 7", tajweedScore: 95, fluency: 91, versesMastered: 102, attendance: 100, hoursPracticed: 6.8 },
  { week: "Wk 8", tajweedScore: 97, fluency: 94, versesMastered: 120, attendance: 100, hoursPracticed: 7.2 },
];

const TAJWEED_SKILLS_BREAKDOWN = [
  { name: "Makharij (Pronunciation)", score: 96, color: "#10b981" },
  { name: "Noon Sakinah & Tanween", score: 92, color: "#f59e0b" },
  { name: "Meem Sakinah Rules", score: 88, color: "#06b6d4" },
  { name: "Qalqalah Echoes", score: 95, color: "#8b5cf6" },
  { name: "Madd (Elongation)", score: 90, color: "#ec4899" },
  { name: "Heavy & Light Letters", score: 85, color: "#3b82f6" },
];

const DAILY_RECITATION_MINS = [
  { day: "Mon", minutes: 35, verses: 15 },
  { day: "Tue", minutes: 45, verses: 20 },
  { day: "Wed", minutes: 30, verses: 12 },
  { day: "Thu", minutes: 50, verses: 22 },
  { day: "Fri", minutes: 60, verses: 30 },
  { day: "Sat", minutes: 40, verses: 18 },
  { day: "Sun", minutes: 25, verses: 10 },
];

export default function StudentProgressChart() {
  const [timeframe, setTimeframe] = useState<"8w" | "4w" | "all">("8w");
  const [activeChartTab, setActiveChartTab] = useState<"trend" | "skills" | "daily">("trend");

  const displayData =
    timeframe === "4w"
      ? WEEKLY_PROGRESS_DATA.slice(-4)
      : WEEKLY_PROGRESS_DATA;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1.5">
            <TrendingUp size={14} /> Analytics & Performance
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Recitation & Tajweed Mastery Progress
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time tracking of pronunciation accuracy, verses memorized, and study consistency.
          </p>
        </div>

        {/* Timeframe Controls */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setTimeframe("4w")}
            className={`px-3 py-1.5 rounded-xl transition ${
              timeframe === "4w"
                ? "bg-emerald-600 text-white shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Last 4 Weeks
          </button>
          <button
            onClick={() => setTimeframe("8w")}
            className={`px-3 py-1.5 rounded-xl transition ${
              timeframe === "8w"
                ? "bg-emerald-600 text-white shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            8 Weeks
          </button>
          <button
            onClick={() => setTimeframe("all")}
            className={`px-3 py-1.5 rounded-xl transition ${
              timeframe === "all"
                ? "bg-emerald-600 text-white shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Highlights Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Tajweed Accuracy</span>
            <Sparkles size={16} className="text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">97%</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              +5% wk
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Excellent Makhraj Precision</p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Verses Mastered</span>
            <BookOpen size={16} className="text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">120</span>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              +18 verses
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Juz Amma & Surah Al-Mulk</p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Recitation Speed</span>
            <Zap size={16} className="text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">94%</span>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
              Optimal Pace
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Tarteel Recitation Rate</p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Study Hours Logged</span>
            <Clock size={16} className="text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">44.1 hrs</span>
            <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
              7.2 hrs/wk
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Live Classes & Self-Practice</p>
        </div>
      </div>

      {/* Secondary Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveChartTab("trend")}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeChartTab === "trend"
              ? "bg-slate-800 text-emerald-400 border border-emerald-500/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <BarChart2 size={16} />
          <span>Weekly Growth Trend</span>
        </button>

        <button
          onClick={() => setActiveChartTab("skills")}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeChartTab === "skills"
              ? "bg-slate-800 text-amber-400 border border-amber-500/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Target size={16} />
          <span>Tajweed Skill Breakdown</span>
        </button>

        <button
          onClick={() => setActiveChartTab("daily")}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeChartTab === "daily"
              ? "bg-slate-800 text-cyan-400 border border-cyan-500/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Calendar size={16} />
          <span>Daily Recitation Output</span>
        </button>
      </div>

      {/* Main Interactive Recharts Section */}
      <div className="bg-slate-950/90 border border-slate-800/80 rounded-2xl p-4 sm:p-6 min-h-[320px]">
        {activeChartTab === "trend" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-semibold text-slate-200">
                Weekly Tajweed Accuracy Score vs. Recitation Fluency
              </span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Tajweed Score (%)
                </span>
                <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Fluency Score (%)
                </span>
              </div>
            </div>

            <div className="h-[280px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTajweed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorFluency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[50, 100]} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "0.75rem",
                      color: "#fff",
                      fontSize: "12px",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="tajweedScore"
                    name="Tajweed Accuracy (%)"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorTajweed)"
                  />
                  <Area
                    type="monotone"
                    dataKey="fluency"
                    name="Recitation Fluency (%)"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorFluency)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeChartTab === "skills" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-semibold text-slate-200">
                Detailed Tajweed Sub-Skill Proficiency Scores
              </span>
              <span className="text-emerald-400 font-bold">Target: 90%+ Mastery</span>
            </div>

            <div className="h-[280px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TAJWEED_SKILLS_BREAKDOWN} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="#cbd5e1" fontSize={11} width={150} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "0.75rem",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                    formatter={(val: any) => [`${val}% Score`, "Proficiency"]}
                  />
                  <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={22}>
                    {TAJWEED_SKILLS_BREAKDOWN.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeChartTab === "daily" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-semibold text-slate-200">
                Daily Practice Minutes & Verses Recited
              </span>
              <span className="text-cyan-400 font-bold">Weekly Total: 285 mins</span>
            </div>

            <div className="h-[280px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DAILY_RECITATION_MINS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "0.75rem",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }} />
                  <Bar dataKey="minutes" name="Practice Time (Mins)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="verses" name="Verses Recited" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
