"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import CertificateGenerator from "@/components/CertificateGenerator";
import ReportCardGenerator from "@/components/ReportCardGenerator";
import SalaryRecordsTable from "@/components/SalaryRecordsTable";
import {
  Video,
  UserCheck,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Plus,
  Send,
  Sparkles,
  ExternalLink,
  Award,
  FileText,
  User,
  FileCheck,
  DollarSign,
} from "lucide-react";

export default function TeacherDashboardPage() {
  const {
    user,
    attendance,
    markAttendance,
    homework,
    addHomework,
    gradeHomework,
    zoomLinks,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "studio" | "attendance" | "homework" | "certificates" | "reports" | "salary"
  >("studio");

  // Attendance Form State
  const [selectedStudent, setSelectedStudent] = useState("Zayd Ibn Ali");
  const [classCourse, setClassCourse] = useState("Noorani Qaida & Basic Tajweed");
  const [attStatus, setAttStatus] = useState<"present" | "absent" | "late" | "excused">("present");
  const [attNotes, setAttNotes] = useState("");

  // Homework Form State
  const [showAddHwModal, setShowAddHwModal] = useState(false);
  const [hwTitle, setHwTitle] = useState("");
  const [hwDesc, setHwDesc] = useState("");
  const [hwCourse, setHwCourse] = useState("Noorani Qaida & Basic Tajweed");
  const [hwStudent, setHwStudent] = useState("Zayd Ibn Ali");
  const [hwDueDate, setHwDueDate] = useState("2026-08-12");

  // Homework Grading State
  const [gradingHwId, setGradingHwId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [gradeValue, setGradeValue] = useState("A+");

  const handleLogAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    markAttendance({
      student_id: "student-501",
      student_name: selectedStudent,
      teacher_name: user?.name || "Ustadha Fatima Al-Zahra",
      course_name: classCourse,
      class_date: new Date().toISOString().split("T")[0],
      status: attStatus,
      notes: attNotes,
    });
    setAttNotes("");
    alert("Attendance logged successfully!");
  };

  const handleCreateHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle || !hwDesc) return;

    addHomework({
      title: hwTitle,
      description: hwDesc,
      course_name: hwCourse,
      student_id: "student-501",
      student_name: hwStudent,
      teacher_name: user?.name || "Ustadha Fatima Al-Zahra",
      due_date: hwDueDate,
    });

    setHwTitle("");
    setHwDesc("");
    setShowAddHwModal(false);
  };

  const handleSaveGrade = (hwId: string) => {
    if (!feedbackText) return;
    gradeHomework(hwId, feedbackText, gradeValue);
    setGradingHwId(null);
    setFeedbackText("");
  };

  const teacherName = user?.name || "Ustadha Fatima Al-Zahra";

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={teacherName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/50 shadow-lg"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-amber-600 flex items-center justify-center font-bold text-xl text-white">
              {teacherName.charAt(0)}
            </div>
          )}

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles size={14} /> Teacher Studio Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome, {teacherName}
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Assalamu Alaikum! Manage your live 1-on-1 Quran sessions, student attendance, and assignments.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddHwModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow-lg transition active:scale-95"
          >
            <Plus size={16} />
            <span>Assign Homework</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-800 space-x-2 sm:space-x-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("studio")}
          className={`pb-3 text-xs sm:text-sm font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === "studio"
              ? "border-amber-400 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Video size={18} />
          <span>Live Studio & Zoom</span>
        </button>

        <button
          onClick={() => setActiveTab("attendance")}
          className={`pb-3 text-xs sm:text-sm font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === "attendance"
              ? "border-emerald-400 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <UserCheck size={18} />
          <span>Attendance Logger</span>
        </button>

        <button
          onClick={() => setActiveTab("homework")}
          className={`pb-3 text-xs sm:text-sm font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === "homework"
              ? "border-amber-400 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <BookOpen size={18} />
          <span>Homework ({homework.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("certificates")}
          className={`pb-3 text-xs sm:text-sm font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === "certificates"
              ? "border-amber-400 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Award size={18} />
          <span>jsPDF Certificates</span>
        </button>

        <button
          onClick={() => setActiveTab("reports")}
          className={`pb-3 text-xs sm:text-sm font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === "reports"
              ? "border-emerald-400 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <FileCheck size={18} />
          <span>Report Cards</span>
        </button>

        <button
          onClick={() => setActiveTab("salary")}
          className={`pb-3 text-xs sm:text-sm font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === "salary"
              ? "border-blue-400 text-blue-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <DollarSign size={18} />
          <span>My Earnings & Salary</span>
        </button>
      </div>

      {/* TAB 1: LIVE STUDIO */}
      {activeTab === "studio" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Zoom Launcher Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                Virtual Classroom
              </span>
              <span className="text-xs text-slate-400 font-semibold">1-on-1 Studio HD</span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Daily 1-on-1 Quran & Tajweed Session</h2>
              <p className="text-xs text-slate-400 mt-1">
                Scheduled Mon - Fri | 09:00 AM - 10:00 AM EST
              </p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Meeting URL:</span>
                <span className="text-emerald-400 font-mono font-bold truncate max-w-xs">
                  https://zoom.us/j/9876543210
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Meeting ID:</span>
                <span className="text-slate-200 font-mono font-bold">987 654 3210</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Passcode:</span>
                <span className="text-amber-400 font-mono font-bold">Maqsad2026</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://zoom.us/j/9876543210?pwd=MaqsadQuran2026"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold text-sm shadow-xl shadow-rose-700/30 transition active:scale-95"
              >
                <Video size={18} />
                <span>Start Live Zoom Session Now</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Assigned Students Quick Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <User size={18} className="text-amber-400" />
              My Assigned Students
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-slate-100">Zayd Ibn Ali</p>
                  <p className="text-xs text-emerald-400">Noorani Qaida & Tajweed</p>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                  Active
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-slate-100">Maryam Siddiqui</p>
                  <p className="text-xs text-amber-400">Tajweed & Recitation</p>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ATTENDANCE LOGGER */}
      {activeTab === "attendance" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Logger Form */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck size={18} className="text-emerald-400" />
              Mark Class Attendance
            </h2>

            <form onSubmit={handleLogAttendance} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Student</label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Zayd Ibn Ali">Zayd Ibn Ali</option>
                  <option value="Maryam Siddiqui">Maryam Siddiqui</option>
                  <option value="Aisha Begum">Aisha Begum</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Course</label>
                <input
                  type="text"
                  value={classCourse}
                  onChange={(e) => setClassCourse(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Attendance Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttStatus("present")}
                    className={`py-2 rounded-xl text-xs font-bold transition border ${
                      attStatus === "present"
                        ? "bg-emerald-600 text-white border-emerald-500"
                        : "bg-slate-950 text-slate-400 border-slate-800"
                    }`}
                  >
                    Present
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttStatus("late")}
                    className={`py-2 rounded-xl text-xs font-bold transition border ${
                      attStatus === "late"
                        ? "bg-amber-600 text-white border-amber-500"
                        : "bg-slate-950 text-slate-400 border-slate-800"
                    }`}
                  >
                    Late
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttStatus("absent")}
                    className={`py-2 rounded-xl text-xs font-bold transition border ${
                      attStatus === "absent"
                        ? "bg-red-600 text-white border-red-500"
                        : "bg-slate-950 text-slate-400 border-slate-800"
                    }`}
                  >
                    Absent
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttStatus("excused")}
                    className={`py-2 rounded-xl text-xs font-bold transition border ${
                      attStatus === "excused"
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-slate-950 text-slate-400 border-slate-800"
                    }`}
                  >
                    Excused
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Session Lesson Notes</label>
                <textarea
                  rows={3}
                  value={attNotes}
                  onChange={(e) => setAttNotes(e.target.value)}
                  placeholder="e.g. Practiced Surah Al-Fatiha Makharij. Excellent performance."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition active:scale-95"
              >
                Log Attendance Record
              </button>
            </form>
          </div>

          {/* Attendance Log Table */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Logged Session Records</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/80 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-5 py-3.5">Date</th>
                    <th className="px-5 py-3.5">Student</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {attendance.map((att) => (
                    <tr key={att.id} className="hover:bg-slate-800/40">
                      <td className="px-5 py-3.5 text-xs text-amber-400 font-semibold">{att.class_date}</td>
                      <td className="px-5 py-3.5 font-bold text-slate-100">{att.student_name}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                          {att.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-400">{att.notes || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HOMEWORK & GRADING */}
      {activeTab === "homework" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homework.map((hw) => (
              <div key={hw.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold uppercase">
                      {hw.course_name}
                    </span>
                    <h3 className="text-base font-bold text-white mt-2">{hw.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">Student: <strong className="text-slate-200">{hw.student_name}</strong></p>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    hw.status === "reviewed"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : hw.status === "submitted"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}>
                    {hw.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {hw.description}
                </p>

                {hw.submission_text && (
                  <div className="bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-xl text-xs space-y-1">
                    <p className="font-bold text-emerald-400 flex items-center gap-1">
                      <FileText size={14} /> Student Submission:
                    </p>
                    <p className="text-slate-200">{hw.submission_text}</p>
                  </div>
                )}

                {hw.teacher_feedback ? (
                  <div className="bg-amber-950/30 border border-amber-500/30 p-3 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-400 flex items-center gap-1">
                        <Award size={14} /> Teacher Grade: {hw.grade}
                      </span>
                    </div>
                    <p className="text-slate-300">{hw.teacher_feedback}</p>
                  </div>
                ) : hw.status === "submitted" ? (
                  gradingHwId === hw.id ? (
                    <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/40 space-y-3">
                      <h4 className="text-xs font-bold text-amber-400">Enter Feedback & Grade</h4>
                      <input
                        type="text"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="e.g. Excellent recitation! MashaAllah."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      />
                      <div className="flex items-center justify-between">
                        <select
                          value={gradeValue}
                          onChange={(e) => setGradeValue(e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-xs text-white rounded px-2 py-1"
                        >
                          <option value="A+">A+</option>
                          <option value="A">A</option>
                          <option value="B+">B+</option>
                          <option value="Pass">Pass</option>
                        </select>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setGradingHwId(null)}
                            className="px-3 py-1 rounded text-xs bg-slate-800 text-slate-300"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveGrade(hw.id)}
                            className="px-3 py-1 rounded text-xs bg-amber-500 text-slate-950 font-bold"
                          >
                            Save Review
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setGradingHwId(hw.id)}
                      className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
                    >
                      Review & Grade Homework
                    </button>
                  )
                ) : null}
              </div>
            ))}
        </div>
      )}

      {/* TAB 4: CERTIFICATE GENERATOR */}
      {activeTab === "certificates" && <CertificateGenerator />}

      {/* TAB 5: REPORT CARD GENERATOR */}
      {activeTab === "reports" && <ReportCardGenerator />}

      {/* TAB 6: MY EARNINGS & SALARY RECORDS */}
      {activeTab === "salary" && <SalaryRecordsTable role="teacher" teacherFilterName={teacherName} />}

      {/* MODAL: ASSIGN HOMEWORK */}
      {showAddHwModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Assign Homework Task</h3>
            <form onSubmit={handleCreateHomework} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Homework Title</label>
                <input
                  type="text"
                  required
                  value={hwTitle}
                  onChange={(e) => setHwTitle(e.target.value)}
                  placeholder="e.g. Practice Noon Sakinah Rules Page 12"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Instructions / Description</label>
                <textarea
                  rows={3}
                  required
                  value={hwDesc}
                  onChange={(e) => setHwDesc(e.target.value)}
                  placeholder="Record audio recitation of Surah An-Naba verses 1-10..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Due Date</label>
                <input
                  type="date"
                  required
                  value={hwDueDate}
                  onChange={(e) => setHwDueDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddHwModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
