"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import StudentProgressChart from "@/components/StudentProgressChart";
import AIPlacementTest from "@/components/AIPlacementTest";
import ZoomRecordingsPlayer from "@/components/ZoomRecordingsPlayer";
import {
  Video,
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Zap,
  TrendingUp,
  PlayCircle,
  HelpCircle,
  BarChart2,
  Compass,
} from "lucide-react";

export default function StudentDashboardPage() {
  const { user, attendance, homework, submitHomework, zoomLinks } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "overview" | "analytics" | "recordings" | "homework" | "attendance"
  >("overview");

  // Modal State
  const [isPlacementTestOpen, setIsPlacementTestOpen] = useState<boolean>(false);

  // Submission state
  const [submittingHwId, setSubmittingHwId] = useState<string | null>(null);
  const [submissionContent, setSubmissionContent] = useState("");

  const studentName = user?.name || "Zayd Ibn Ali";
  const teacherName = user?.assignedTeacher || "Ustadha Fatima Al-Zahra";
  const courseName = user?.course || "Noorani Qaida & Basic Tajweed";

  // Filter student attendance & homework
  const myAttendance = attendance.filter(
    (a) => a.student_name === studentName || a.student_id === "student-501"
  );
  const myHomework = homework.filter(
    (h) => h.student_name === studentName || h.student_id === "student-501"
  );

  const totalClasses = myAttendance.length || 1;
  const presentClasses = myAttendance.filter(
    (a) => a.status === "present" || a.status === "late"
  ).length;
  const attendancePercentage = Math.round((presentClasses / totalClasses) * 100);

  // Active Zoom Link
  const activeClassRoom = zoomLinks.find((z) => z.is_active) || zoomLinks[0];

  const handleSubmitHomework = (hwId: string) => {
    if (!submissionContent) return;
    submitHomework(hwId, submissionContent);
    setSubmittingHwId(null);
    setSubmissionContent("");
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={studentName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/50 shadow-lg"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center font-bold text-xl text-white">
              {studentName.charAt(0)}
            </div>
          )}

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles size={14} /> Student Quran Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Assalamu Alaikum, {studentName}
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Enrolled Course: <strong className="text-emerald-400">{courseName}</strong> | Tutor: {teacherName}
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-3 relative z-10">
          <button
            onClick={() => setIsPlacementTestOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs border border-amber-500/30 transition active:scale-95 shadow-md"
          >
            <Compass size={16} />
            <span>AI Placement Test</span>
          </button>

          {activeClassRoom && (
            <a
              href={activeClassRoom.meeting_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-extrabold text-xs shadow-[0_0_25px_rgba(251,191,36,0.4)] transition active:scale-95 border border-amber-300"
            >
              <Video size={18} />
              <span>Join Live Class Now</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Overview Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Attendance Rate</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{attendancePercentage}%</h3>
            <span className="text-[11px] text-emerald-400 font-medium">{presentClasses} / {totalClasses} classes attended</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assigned Homework</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{myHomework.length}</h3>
            <span className="text-[11px] text-amber-400 font-medium">Tasks & Memorization</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Grade</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">A+ Excellent</h3>
            <span className="text-[11px] text-rose-400 font-medium">Tajweed & Recitation</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tajweed Accuracy</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">97%</h3>
            <span className="text-[11px] text-cyan-400 font-medium">Top 5% Student Rank</span>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-800 space-x-2 sm:space-x-4 overflow-x-auto pb-1 text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "overview"
              ? "border-emerald-400 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Zap size={18} />
          <span>Live Studio & Schedule</span>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`pb-3 font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "analytics"
              ? "border-emerald-400 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <BarChart2 size={18} />
          <span>Progress Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab("recordings")}
          className={`pb-3 font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "recordings"
              ? "border-amber-400 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <PlayCircle size={18} />
          <span>Zoom Class Recordings</span>
        </button>

        <button
          onClick={() => setActiveTab("homework")}
          className={`pb-3 font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "homework"
              ? "border-amber-400 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <BookOpen size={18} />
          <span>Homework Hub ({myHomework.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("attendance")}
          className={`pb-3 font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "attendance"
              ? "border-emerald-400 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Calendar size={18} />
          <span>Attendance Log</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & LIVE STUDIO */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Virtual Zoom Room Banner */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                Live Classroom Ready
              </span>
              <span className="text-xs text-slate-400 font-semibold">1-on-1 Private Session</span>
            </div>

            {activeClassRoom && (
              <>
                <div>
                  <h2 className="text-xl font-bold text-white">{activeClassRoom.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">Course: {activeClassRoom.course_name}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <p><strong className="text-slate-400">Scheduled Time:</strong> {activeClassRoom.schedule_time}</p>
                  <p><strong className="text-slate-400">Quran Tutor:</strong> {activeClassRoom.teacher_name}</p>
                  {activeClassRoom.passcode && (
                    <p><strong className="text-slate-400">Meeting Passcode:</strong> <span className="text-amber-400 font-mono font-bold">{activeClassRoom.passcode}</span></p>
                  )}
                </div>

                <a
                  href={activeClassRoom.meeting_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-700/30 transition active:scale-95"
                >
                  <Video size={20} />
                  <span>Launch Zoom Virtual Classroom</span>
                  <ExternalLink size={16} />
                </a>
              </>
            )}
          </div>

          {/* Right Column: AI Test Banner & Gemini AI Assistant */}
          <div className="space-y-6">
            {/* Placement Test Banner */}
            <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                <Compass size={12} /> Diagnostic Evaluation
              </span>
              <h3 className="text-lg font-extrabold text-white">AI Placement & Skill Assessment</h3>
              <p className="text-xs text-slate-300">
                Want to evaluate your Tajweed rules, Makharij precision, or get matched with an advanced Hifz track?
              </p>

              <button
                onClick={() => setIsPlacementTestOpen(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-extrabold text-xs transition shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                <span>Start AI Diagnostic Test</span>
              </button>
            </div>

            {/* AI Assistant Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                  <Sparkles size={12} /> Gemini Quran AI
                </span>
                <h3 className="text-lg font-extrabold text-white mt-3">Quranic AI Tutor Assistant</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Have questions about Tajweed rules, Surah translations, or Islamic history? Ask your AI tutor anytime.
                </p>
              </div>

              <Link
                href="/#chat"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs border border-slate-700 transition"
              >
                <MessageSquare size={16} />
                <span>Ask AI Assistant</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROGRESS ANALYTICS */}
      {activeTab === "analytics" && <StudentProgressChart />}

      {/* TAB 3: ZOOM CLASS RECORDINGS */}
      {activeTab === "recordings" && <ZoomRecordingsPlayer />}

      {/* TAB 4: HOMEWORK HUB */}
      {activeTab === "homework" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myHomework.map((hw) => (
            <div key={hw.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-extrabold uppercase">
                    Due: {hw.due_date}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">{hw.title}</h3>
                  <p className="text-xs text-slate-400">Assigned by: {hw.teacher_name}</p>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                  hw.status === "reviewed"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : hw.status === "submitted"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                }`}>
                  {hw.status.toUpperCase()}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                {hw.description}
              </div>

              {hw.submission_text && (
                <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-emerald-400">My Submission:</p>
                  <p className="text-slate-200">{hw.submission_text}</p>
                </div>
              )}

              {hw.teacher_feedback && (
                <div className="bg-amber-950/40 border border-amber-500/30 p-3 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-amber-400 flex items-center gap-1">
                    <Award size={14} /> Teacher Feedback ({hw.grade}):
                  </p>
                  <p className="text-slate-200">{hw.teacher_feedback}</p>
                </div>
              )}

              {hw.status === "assigned" && (
                submittingHwId === hw.id ? (
                  <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-400">Submit Your Answer / Homework Notes</h4>
                    <textarea
                      rows={3}
                      value={submissionContent}
                      onChange={(e) => setSubmissionContent(e.target.value)}
                      placeholder="Write your homework answer or audio link here..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSubmittingHwId(null)}
                        className="px-3 py-1 rounded text-xs bg-slate-800 text-slate-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSubmitHomework(hw.id)}
                        className="px-3 py-1 rounded text-xs bg-emerald-600 text-white font-bold"
                      >
                        Submit Answer
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSubmittingHwId(hw.id)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                  >
                    Submit Homework Solution
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: ATTENDANCE LOG */}
      {activeTab === "attendance" && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar size={18} className="text-emerald-400" />
              My Session Attendance Log
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Tutor</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Teacher Lesson Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {myAttendance.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-800/40">
                    <td className="px-6 py-4 text-xs font-semibold text-amber-400">{att.class_date}</td>
                    <td className="px-6 py-4 font-bold text-slate-100">{att.course_name}</td>
                    <td className="px-6 py-4 text-xs text-slate-300">{att.teacher_name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                        {att.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">{att.notes || "No notes"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Placement Test Modal */}
      <AIPlacementTest
        isOpen={isPlacementTestOpen}
        onClose={() => setIsPlacementTestOpen(false)}
      />
    </div>
  );
}
