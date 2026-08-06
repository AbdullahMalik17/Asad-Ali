"use client";

import React, { useState } from "react";
import { FileCheck, Download, Printer, Sparkles, User, Award, CheckCircle, BarChart3 } from "lucide-react";
import jsPDF from "jspdf";

export interface ReportCardData {
  studentName: string;
  studentId: string;
  reportMonth: string;
  courseTitle: string;
  teacherName: string;
  totalClasses: number;
  classesAttended: number;
  lateClasses: number;
  absentClasses: number;
  tajweedScore: number;
  memorizationScore: number;
  fluencyScore: number;
  homeworkScore: number;
  conductScore: number;
  teacherComments: string;
  nextMonthFocus: string;
}

const PRESET_REPORTS = [
  {
    studentName: "Zayd Ibn Ali",
    studentId: "MQ-STU-501",
    reportMonth: "August 2026",
    courseTitle: "Noorani Qaida & Basic Tajweed",
    teacherName: "Ustadha Fatima Al-Zahra",
    totalClasses: 12,
    classesAttended: 11,
    lateClasses: 1,
    absentClasses: 0,
    tajweedScore: 94,
    memorizationScore: 90,
    fluencyScore: 88,
    homeworkScore: 96,
    conductScore: 98,
    teacherComments:
      "Zayd has made outstanding progress in pronouncing throat letters (Khaw & Ghain). His attention to detail in Tajweed rules is commendable.",
    nextMonthFocus: "Begin practice of Tanween and Noon Sakinah Rules with Iqlab exercises.",
  },
  {
    studentName: "Maryam Siddiqui",
    studentId: "MQ-STU-502",
    reportMonth: "August 2026",
    courseTitle: "Juz Amma Memorization (Hifz)",
    teacherName: "Ustadha Fatima Al-Zahra",
    totalClasses: 14,
    classesAttended: 14,
    lateClasses: 0,
    absentClasses: 0,
    tajweedScore: 98,
    memorizationScore: 96,
    fluencyScore: 95,
    homeworkScore: 100,
    conductScore: 99,
    teacherComments:
      "MashaAllah! Perfect attendance and impeccable memorization retention of Surah Al-Mulk and Surah Naba.",
    nextMonthFocus: "Memorize Surah Abasa with Mutqan revision of Juz 29.",
  },
  {
    studentName: "Yousuf Hamdan",
    studentId: "MQ-STU-503",
    reportMonth: "August 2026",
    courseTitle: "Quran Translation & Tafseer",
    teacherName: "Dr. Ustadh Ahmad Al-Mansoor",
    totalClasses: 10,
    classesAttended: 9,
    lateClasses: 1,
    absentClasses: 0,
    tajweedScore: 90,
    memorizationScore: 85,
    fluencyScore: 92,
    homeworkScore: 90,
    conductScore: 95,
    teacherComments:
      "Yousuf actively participates in interactive Tafseer discussions and submits insightful written assignments.",
    nextMonthFocus: "Complete study of Surah Al-Kahf translation and thematic structure.",
  },
];

export default function ReportCardGenerator() {
  const [data, setData] = useState<ReportCardData>({
    studentName: "Zayd Ibn Ali",
    studentId: "MQ-STU-501",
    reportMonth: "August 2026",
    courseTitle: "Noorani Qaida & Basic Tajweed",
    teacherName: "Ustadha Fatima Al-Zahra",
    totalClasses: 12,
    classesAttended: 11,
    lateClasses: 1,
    absentClasses: 0,
    tajweedScore: 94,
    memorizationScore: 90,
    fluencyScore: 88,
    homeworkScore: 96,
    conductScore: 98,
    teacherComments:
      "Zayd has made outstanding progress in pronouncing throat letters (Khaw & Ghain). His attention to detail in Tajweed rules is commendable.",
    nextMonthFocus: "Begin practice of Tanween and Noon Sakinah Rules with Iqlab exercises.",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const attendancePercentage = Math.round((data.classesAttended / (data.totalClasses || 1)) * 100);
  const overallGPA = (
    (data.tajweedScore + data.memorizationScore + data.fluencyScore + data.homeworkScore + data.conductScore) /
    5
  ).toFixed(1);

  const handleApplyPreset = (preset: (typeof PRESET_REPORTS)[0]) => {
    setData({ ...preset });
  };

  const generatePDF = () => {
    setIsGenerating(true);

    try {
      // Portrait A4: 210mm x 297mm
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const width = 210;
      const height = 297;

      // Header Banner Background (#0f172a -> Slate 900)
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, width, 40, "F");

      // Gold Decorative Stripe (#d97706)
      doc.setFillColor(217, 119, 6);
      doc.rect(0, 40, width, 3, "F");

      // Title & Academy Name
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.text("MAQSAD-E-QURAN ACADEMY", 15, 18);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(217, 119, 6);
      doc.text("STUDENT MONTHLY PROGRESS REPORT CARD", 15, 25);

      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text(`Reporting Period: ${data.reportMonth}`, width - 15, 18, { align: "right" });
      doc.text(`Ref ID: ${data.studentId}`, width - 15, 25, { align: "right" });

      // Student Info Box (Y = 50)
      let y = 52;
      doc.setFillColor(248, 250, 252);
      doc.rect(15, y, width - 30, 26, "F");
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.rect(15, y, width - 30, 26, "S");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text(`Student: ${data.studentName}`, 20, y + 8);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(71, 85, 105);
      doc.text(`Course: ${data.courseTitle}`, 20, y + 15);
      doc.text(`Assigned Teacher: ${data.teacherName}`, 20, y + 21);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(16, 185, 129);
      doc.text(`Overall Score: ${overallGPA}%`, width - 20, y + 12, { align: "right" });

      // Attendance Metrics Section (Y = 86)
      y = 86;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(6, 78, 59);
      doc.text("1. ATTENDANCE & PARTICIPATION SUMMARY", 15, y);

      y += 4;
      doc.setFillColor(236, 253, 245);
      doc.rect(15, y, width - 30, 18, "F");
      doc.setDrawColor(167, 243, 208);
      doc.rect(15, y, width - 30, 18, "S");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(`Total Scheduled Classes: ${data.totalClasses}`, 20, y + 7);
      doc.text(`Classes Attended: ${data.classesAttended}`, 80, y + 7);
      doc.text(`Late Arrivals: ${data.lateClasses}`, 145, y + 7);

      doc.text(`Unexcused Absences: ${data.absentClasses}`, 20, y + 13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(5, 150, 105);
      doc.text(`Attendance Rate: ${attendancePercentage}%`, 145, y + 13);

      // Academic Ratings Table (Y = 116)
      y = 116;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(6, 78, 59);
      doc.text("2. ACADEMIC & SKILL ASSESSMENT", 15, y);

      y += 4;
      // Table Header
      doc.setFillColor(15, 23, 42);
      doc.rect(15, y, width - 30, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("Evaluation Category", 20, y + 5.5);
      doc.text("Score / 100", 110, y + 5.5);
      doc.text("Grade Level", 160, y + 5.5);

      const subjects = [
        { name: "Tajweed & Makharij Pronunciation", score: data.tajweedScore },
        { name: "Hifz & Quran Memorization Retention", score: data.memorizationScore },
        { name: "Recitation Fluency & Voice Tone", score: data.fluencyScore },
        { name: "Homework & Assignment Completion", score: data.homeworkScore },
        { name: "Class Discipline, Respect & Adab", score: data.conductScore },
      ];

      y += 8;
      subjects.forEach((sub, i) => {
        const bg = i % 2 === 0 ? 255 : 248;
        doc.setFillColor(bg, bg, bg);
        doc.rect(15, y, width - 30, 8, "F");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        doc.text(sub.name, 20, y + 5.5);

        doc.setFont("helvetica", "bold");
        doc.text(`${sub.score}%`, 110, y + 5.5);

        const letterGrade =
          sub.score >= 95 ? "A+ (Mumtaz)" : sub.score >= 90 ? "A (Very Good)" : sub.score >= 80 ? "B+ (Good)" : "Pass";
        doc.setTextColor(sub.score >= 90 ? 5 : 217, sub.score >= 90 ? 150 : 119, sub.score >= 90 ? 105 : 6);
        doc.text(letterGrade, 160, y + 5.5);

        doc.setDrawColor(226, 232, 240);
        doc.line(15, y + 8, width - 15, y + 8);
        y += 8;
      });

      // Teacher Comments Box (Y = 168)
      y += 6;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(6, 78, 59);
      doc.text("3. TEACHER MONTHLY REMARKS & OBSERVATIONS", 15, y);

      y += 4;
      doc.setFillColor(254, 252, 232);
      doc.rect(15, y, width - 30, 24, "F");
      doc.setDrawColor(254, 240, 138);
      doc.rect(15, y, width - 30, 24, "S");

      doc.setFont("helvetica", "italic");
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      const splitRemarks = doc.splitTextToSize(`"${data.teacherComments}"`, width - 40);
      doc.text(splitRemarks, 20, y + 7);

      // Target Focus Next Month
      y += 30;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(6, 78, 59);
      doc.text("4. RECOMMENDED FOCUS FOR UPCOMING MONTH", 15, y);

      y += 4;
      doc.setFillColor(241, 245, 249);
      doc.rect(15, y, width - 30, 16, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      const splitFocus = doc.splitTextToSize(data.nextMonthFocus, width - 40);
      doc.text(splitFocus, 20, y + 7);

      // Signature & Footer (Y = 245)
      y = 250;
      doc.setDrawColor(148, 163, 184);
      doc.setLineWidth(0.5);
      doc.line(20, y, 75, y);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(data.teacherName, 47.5, y + 5, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text("Assigned Quran Tutor", 47.5, y + 10, { align: "center" });

      doc.line(width - 75, y, width - 20, y);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text("Dr. Ustadh Ahmad Al-Mansoor", width - 47.5, y + 5, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text("Director of Education", width - 47.5, y + 10, { align: "center" });

      // Footer line
      doc.setFillColor(15, 23, 42);
      doc.rect(0, height - 12, width, 12, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text("Maqsad-e-Quran Academy Official Document • Confidential Progress Report", width / 2, height - 5, {
        align: "center",
      });

      const cleanName = data.studentName.replace(/[^a-zA-Z0-9]/g, "_");
      doc.save(`ReportCard_${cleanName}_${data.reportMonth.replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("Report Card PDF error:", err);
      alert("Failed to generate Report Card PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={14} /> Academic Evaluation Studio
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Student Monthly Progress Report Card
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Generate detailed monthly academic report cards with attendance logs, Tajweed scores, and teacher remarks.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs shadow-xl transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Download size={16} />
            <span>{isGenerating ? "Generating PDF..." : "Export Report Card PDF"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-lg transition active:scale-95 cursor-pointer"
          >
            <Printer size={16} className="text-emerald-400" />
            <span>Print View</span>
          </button>
        </div>
      </div>

      {/* Main Form + Interactive Canvas Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form Controls (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
              <FileCheck size={18} className="text-emerald-400" />
              Report Card Data Input
            </h3>
            <p className="text-xs text-slate-400">Set student attendance and performance evaluations.</p>
          </div>

          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">Select Student Profile:</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_REPORTS.map((preset) => (
                <button
                  key={preset.studentName}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    data.studentName === preset.studentName
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {preset.studentName}
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={data.studentName}
                  onChange={(e) => setData({ ...data, studentName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Reporting Month</label>
                <input
                  type="text"
                  value={data.reportMonth}
                  onChange={(e) => setData({ ...data, reportMonth: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Course Title</label>
              <input
                type="text"
                value={data.courseTitle}
                onChange={(e) => setData({ ...data, courseTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Attendance Sliders */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
                <BarChart3 size={14} /> Attendance Statistics
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400">Total Classes</label>
                  <input
                    type="number"
                    value={data.totalClasses}
                    onChange={(e) => setData({ ...data, totalClasses: parseInt(e.target.value) || 1 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400">Attended</label>
                  <input
                    type="number"
                    value={data.classesAttended}
                    onChange={(e) => setData({ ...data, classesAttended: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Skill Scores */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Award size={14} /> Academic Scores (Out of 100)
              </h4>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300">Tajweed & Pronunciation:</span>
                  <span className="font-bold text-emerald-400">{data.tajweedScore}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={data.tajweedScore}
                  onChange={(e) => setData({ ...data, tajweedScore: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500"
                />

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-300">Hifz / Memorization:</span>
                  <span className="font-bold text-emerald-400">{data.memorizationScore}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={data.memorizationScore}
                  onChange={(e) => setData({ ...data, memorizationScore: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500"
                />

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-300">Homework Discipline:</span>
                  <span className="font-bold text-emerald-400">{data.homeworkScore}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={data.homeworkScore}
                  onChange={(e) => setData({ ...data, homeworkScore: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Teacher Monthly Remarks</label>
              <textarea
                rows={3}
                value={data.teacherComments}
                onChange={(e) => setData({ ...data, teacherComments: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </form>
        </div>

        {/* Right Column: Visual Report Card Interactive Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck size={14} className="text-emerald-400" /> Interactive Report Card Preview
            </span>
            <span className="text-xs font-extrabold text-amber-400">GPA: {overallGPA}%</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-x-auto">
            <div className="min-w-[580px] bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl text-xs space-y-4 pb-6">
              {/* Report Card Header */}
              <div className="bg-slate-950 border-b border-slate-800 p-5 flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30 uppercase">
                    MAQSAD ACADEMIC REPORT
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-1">{data.studentName}</h3>
                  <p className="text-xs text-slate-400">{data.courseTitle}</p>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-2xl font-extrabold text-emerald-400">{overallGPA}%</span>
                  <p className="text-[10px] text-slate-400">Overall Grade Average</p>
                </div>
              </div>

              {/* Attendance Card */}
              <div className="px-5">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 font-medium">Month: {data.reportMonth}</p>
                    <p className="font-bold text-white mt-0.5">
                      Attended {data.classesAttended} / {data.totalClasses} Classes
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-sm border border-emerald-500/30">
                      {attendancePercentage}% Attendance
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Breakdown Table */}
              <div className="px-5 space-y-2">
                <h4 className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Award size={14} className="text-amber-400" /> Academic Skill Evaluation
                </h4>

                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 font-bold text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Skill Subject</th>
                        <th className="p-3">Score</th>
                        <th className="p-3">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="p-3 font-semibold text-slate-200">Tajweed & Pronunciation</td>
                        <td className="p-3 font-bold text-emerald-400">{data.tajweedScore}%</td>
                        <td className="p-3 text-emerald-400 font-bold">Excellent (A+)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-200">Hifz & Memorization</td>
                        <td className="p-3 font-bold text-emerald-400">{data.memorizationScore}%</td>
                        <td className="p-3 text-emerald-400 font-bold">Very Good (A)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-200">Recitation Fluency</td>
                        <td className="p-3 font-bold text-amber-400">{data.fluencyScore}%</td>
                        <td className="p-3 text-amber-400 font-bold">Good (B+)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-200">Homework Discipline</td>
                        <td className="p-3 font-bold text-emerald-400">{data.homeworkScore}%</td>
                        <td className="p-3 text-emerald-400 font-bold">Outstanding</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Remarks Box */}
              <div className="px-5 space-y-2">
                <h4 className="font-bold text-slate-300">Teacher Remarks</h4>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-slate-300 italic">
                  &ldquo;{data.teacherComments}&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
