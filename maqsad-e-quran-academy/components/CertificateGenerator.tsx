"use client";

import React, { useState } from "react";
import { Award, Download, Printer, Sparkles, CheckCircle2, FileText, UserCheck } from "lucide-react";
import jsPDF from "jspdf";

export interface CertificateData {
  studentName: string;
  courseTitle: string;
  completionDate: string;
  instructorName: string;
  certificateId: string;
  distinction: string;
  appreciationText: string;
}

const PRESET_STUDENTS = [
  {
    studentName: "Zayd Ibn Ali",
    courseTitle: "Noorani Qaida & Basic Tajweed",
    instructorName: "Ustadha Fatima Al-Zahra",
    distinction: "Mumtaz (Excellence)",
    appreciationText: "For demonstrating flawless Makharij pronunciation and outstanding dedication to Quranic Tajweed rules.",
  },
  {
    studentName: "Maryam Siddiqui",
    courseTitle: "Juz Amma Memorization (Hifz)",
    instructorName: "Ustadha Fatima Al-Zahra",
    distinction: "High Distinction",
    appreciationText: "For successfully memorizing Juz 'Amma with precise Mutqan revision and accurate Waqf rules.",
  },
  {
    studentName: "Yousuf Hamdan",
    courseTitle: "Quran Translation & Tafseer Masterclass",
    instructorName: "Dr. Ustadh Ahmad Al-Mansoor",
    distinction: "First Class Honors",
    appreciationText: "For demonstrating profound analytical understanding of Quranic vocabulary and contextual Tafseer.",
  },
];

export default function CertificateGenerator() {
  const [data, setData] = useState<CertificateData>({
    studentName: "Zayd Ibn Ali",
    courseTitle: "Noorani Qaida & Basic Tajweed",
    completionDate: new Date().toISOString().split("T")[0],
    instructorName: "Ustadha Fatima Al-Zahra",
    certificateId: `MQ-CERT-${Math.floor(100000 + Math.random() * 900000)}`,
    distinction: "Mumtaz (Excellence)",
    appreciationText:
      "For demonstrating flawless Makharij pronunciation and outstanding dedication to Quranic Tajweed rules.",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleApplyPreset = (preset: (typeof PRESET_STUDENTS)[0]) => {
    setData((prev) => ({
      ...prev,
      studentName: preset.studentName,
      courseTitle: preset.courseTitle,
      instructorName: preset.instructorName,
      distinction: preset.distinction,
      appreciationText: preset.appreciationText,
      certificateId: `MQ-CERT-${Math.floor(100000 + Math.random() * 900000)}`,
    }));
  };

  const generatePDF = () => {
    setIsGenerating(true);

    try {
      // Landscape A4: 297mm x 210mm
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const width = 297;
      const height = 210;

      // Background color - Very soft warm ivory/white
      doc.setFillColor(253, 252, 248);
      doc.rect(0, 0, width, height, "F");

      // Outer Green Border (#064e3b -> RGB 6, 78, 59)
      doc.setDrawColor(6, 78, 59);
      doc.setLineWidth(4);
      doc.rect(8, 8, width - 16, height - 16);

      // Inner Gold Border (#d97706 -> RGB 217, 119, 6)
      doc.setDrawColor(217, 119, 6);
      doc.setLineWidth(1.5);
      doc.rect(13, 13, width - 26, height - 26);

      // Corner Ornaments (Golden boxes)
      const corners = [
        [13, 13],
        [width - 23, 13],
        [13, height - 23],
        [width - 23, height - 23],
      ];
      corners.forEach(([x, y]) => {
        doc.setFillColor(217, 119, 6);
        doc.rect(x, y, 10, 10, "F");
        doc.setFillColor(6, 78, 59);
        doc.rect(x + 2, y + 2, 6, 6, "F");
      });

      // Bismillah & Header
      doc.setFont("helvetica", "bold");
      doc.setTextColor(6, 78, 59);
      doc.setFontSize(14);
      doc.text("Bismillah-ir-Rahman-ir-Rahim", width / 2, 25, { align: "center" });

      doc.setFontSize(22);
      doc.setTextColor(217, 119, 6);
      doc.text("MAQSAD-E-QURAN ACADEMY", width / 2, 36, { align: "center" });

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text("International Online Center for Quranic Studies & Tajweed", width / 2, 42, { align: "center" });

      // Separator Line
      doc.setDrawColor(217, 119, 6);
      doc.setLineWidth(0.75);
      doc.line(60, 46, width - 60, 46);

      // Certificate Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(6, 78, 59);
      doc.text("CERTIFICATE OF ACHIEVEMENT", width / 2, 57, { align: "center" });

      doc.setFontSize(11);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(71, 85, 105);
      doc.text("This official credential is proudly awarded to", width / 2, 66, { align: "center" });

      // Student Name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.setTextColor(15, 23, 42);
      doc.text(data.studentName.toUpperCase(), width / 2, 80, { align: "center" });

      // Underline for Student Name
      const nameWidth = doc.getTextWidth(data.studentName.toUpperCase());
      doc.setDrawColor(217, 119, 6);
      doc.setLineWidth(1);
      doc.line((width - nameWidth) / 2 - 10, 83, (width + nameWidth) / 2 + 10, 83);

      // Body text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(51, 65, 85);
      doc.text("for successfully fulfilling all requirements and completing the course", width / 2, 94, {
        align: "center",
      });

      // Course Name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(6, 78, 59);
      doc.text(`"${data.courseTitle}"`, width / 2, 105, { align: "center" });

      // Distinction & Appreciation
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(217, 119, 6);
      doc.text(`Awarded with Distinction: ${data.distinction}`, width / 2, 116, { align: "center" });

      if (data.appreciationText) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        doc.text(`"${data.appreciationText}"`, width / 2, 124, { align: "center" });
      }

      // Description
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(100, 116, 139);
      const splitDesc = doc.splitTextToSize(
        "Demonstrated exceptional proficiency in Quranic Tajweed, correct Makhraj pronunciation, active recitation fluency, and adherence to authentic Tarteel principles.",
        width - 80
      );
      doc.setTextColor(71, 85, 105);
      doc.text(`Issue Date: ${data.completionDate}`, 20, height - 12);
      doc.text(`Verification Serial: ${data.certificateId}`, width - 20, height - 12, { align: "right" });

      // Save PDF
      const cleanName = data.studentName.replace(/[^a-zA-Z0-9]/g, "_");
      doc.save(`Certificate_${cleanName}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
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
            <Sparkles size={14} /> Certificate Studio
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            jsPDF Certificate Generator
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Create, customize, preview, and download official Maqsad-e-Quran certificates of completion in high-res PDF format.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-xl transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Download size={16} />
            <span>{isGenerating ? "Generating PDF..." : "Download High-Res PDF"}</span>
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

      {/* Main Grid: Form Controls + Live Interactive Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form & Presets (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
              <FileText size={18} className="text-amber-400" />
              Certificate Details
            </h3>
            <p className="text-xs text-slate-400">Fill in recipient information and academic honors.</p>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">Quick Student Presets:</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_STUDENTS.map((preset) => (
                <button
                  key={preset.studentName}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    data.studentName === preset.studentName
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {preset.studentName}
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Student Full Name</label>
              <input
                type="text"
                value={data.studentName}
                onChange={(e) => setData({ ...data, studentName: e.target.value })}
                placeholder="e.g. Zayd Ibn Ali"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Course Title</label>
              <input
                type="text"
                value={data.courseTitle}
                onChange={(e) => setData({ ...data, courseTitle: e.target.value })}
                placeholder="e.g. Noorani Qaida & Basic Tajweed"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Completion Date</label>
                <input
                  type="date"
                  value={data.completionDate}
                  onChange={(e) => setData({ ...data, completionDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Distinction Level</label>
                <select
                  value={data.distinction}
                  onChange={(e) => setData({ ...data, distinction: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Mumtaz (Excellence)">Mumtaz (Excellence)</option>
                  <option value="High Distinction">High Distinction</option>
                  <option value="First Class Honors">First Class Honors</option>
                  <option value="Passed with Distinction">Passed with Distinction</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Instructor / Teacher Name</label>
              <input
                type="text"
                value={data.instructorName}
                onChange={(e) => setData({ ...data, instructorName: e.target.value })}
                placeholder="Ustadha Fatima Al-Zahra"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Certificate Serial Code</label>
              <input
                type="text"
                value={data.certificateId}
                onChange={(e) => setData({ ...data, certificateId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Appreciation & Commendation</label>
              <textarea
                rows={3}
                value={data.appreciationText}
                onChange={(e) => setData({ ...data, appreciationText: e.target.value })}
                placeholder="Commendation note for the student..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </form>
        </div>

        {/* Right Column: Live Interactive Visual Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award size={14} className="text-amber-400" /> Live Certificate Canvas Preview
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">Ready for PDF Export</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-x-auto">
            {/* The Certificate Paper Mockup */}
            <div className="min-w-[620px] bg-[#fdfcf8] text-slate-900 border-8 border-emerald-900 rounded-2xl p-6 sm:p-8 relative shadow-2xl font-serif">
              {/* Inner Decorative Golden Border */}
              <div className="border-2 border-amber-600 p-6 rounded-xl relative">
                {/* Bismillah Header */}
                <div className="text-center space-y-1">
                  <p className="text-emerald-950 text-sm font-bold tracking-wide">
                    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                  </p>
                  <p className="text-[10px] text-amber-700 tracking-widest font-sans font-extrabold uppercase">
                    Bismillah-ir-Rahman-ir-Rahim
                  </p>
                </div>

                {/* Academy Title */}
                <div className="text-center mt-3">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-amber-700 tracking-wider font-sans">
                    MAQSAD-E-QURAN ACADEMY
                  </h3>
                  <p className="text-[10px] text-slate-500 font-sans tracking-wide">
                    International Online Center for Quranic Studies & Tajweed
                  </p>
                </div>

                {/* Divider Line */}
                <div className="w-3/4 mx-auto my-3 border-b-2 border-amber-600/60 flex items-center justify-center">
                  <div className="w-3 h-3 bg-amber-600 rotate-45 -mb-1.5" />
                </div>

                {/* Certificate Main Label */}
                <div className="text-center space-y-1 my-4">
                  <h4 className="text-lg font-bold text-emerald-950 tracking-widest font-sans uppercase">
                    CERTIFICATE OF ACHIEVEMENT
                  </h4>
                  <p className="text-xs italic text-slate-600 font-sans">
                    This official credential is proudly presented to
                  </p>
                </div>

                {/* Student Name */}
                <div className="text-center my-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 border-b-2 border-amber-500 inline-block pb-1 px-6 font-sans">
                    {data.studentName}
                  </h2>
                </div>

                {/* Course Completion Details */}
                <div className="text-center space-y-1 my-3 font-sans text-xs text-slate-700">
                  <p>for successfully fulfilling all academic requirements and completing the course</p>
                  <p className="text-lg font-extrabold text-emerald-900 py-1 font-serif">
                    &ldquo;{data.courseTitle}&rdquo;
                  </p>
                  <p className="text-xs font-bold text-amber-700">
                    Awarded Distinction: <span className="underline">{data.distinction}</span>
                  </p>
                  {data.appreciationText && (
                    <p className="text-[11px] italic text-slate-600 max-w-md mx-auto mt-2">
                      &ldquo;{data.appreciationText}&rdquo;
                    </p>
                  )}
                </div>

                {/* Hadith Quote Box */}
                <div className="bg-slate-100 border border-slate-200 rounded-lg p-2 text-center text-[10px] italic text-slate-800 my-4 max-w-lg mx-auto font-sans">
                  &ldquo;The best among you are those who learn the Quran and teach it.&rdquo; — Sahih Al-Bukhari
                </div>

                {/* Signatures & Seal Row */}
                <div className="mt-8 pt-4 border-t border-slate-300 flex items-center justify-between text-xs font-sans">
                  {/* Left Signature */}
                  <div className="text-center space-y-1">
                    <div className="w-32 border-b border-slate-400 mx-auto py-1">
                      <span className="font-serif italic text-slate-600 text-xs font-bold">
                        {data.instructorName}
                      </span>
                    </div>
                    <p className="font-bold text-[10px] text-slate-800">Lead Quran Tutor</p>
                  </div>

                  {/* Middle Badge Seal */}
                  <div className="w-14 h-14 rounded-full bg-emerald-900 border-2 border-amber-500 flex flex-col items-center justify-center text-[8px] font-bold text-amber-300 shadow-md">
                    <span>VERIFIED</span>
                    <span className="text-[7px]">ACADEMY</span>
                    <span>SEAL</span>
                  </div>

                  {/* Right Signature */}
                  <div className="text-center space-y-1">
                    <div className="w-32 border-b border-slate-400 mx-auto py-1">
                      <span className="font-serif italic text-slate-600 text-xs font-bold">
                        Dr. Ustadh Ahmad
                      </span>
                    </div>
                    <p className="font-bold text-[10px] text-slate-800">Academic Director</p>
                  </div>
                </div>

                {/* Bottom Serial & Date */}
                <div className="mt-4 flex items-center justify-between text-[9px] font-sans text-slate-500 border-t border-slate-200 pt-2">
                  <span>Issue Date: {data.completionDate}</span>
                  <span className="font-mono text-amber-700 font-bold">Ref: {data.certificateId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
