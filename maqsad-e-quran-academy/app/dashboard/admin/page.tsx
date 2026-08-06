"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import CertificateGenerator from "@/components/CertificateGenerator";
import ReportCardGenerator from "@/components/ReportCardGenerator";
import SalaryRecordsTable from "@/components/SalaryRecordsTable";
import {
  Users,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Clock,
  Video,
  Plus,
  Search,
  UserPlus,
  Sparkles,
  Calendar,
  FileSpreadsheet,
  Check,
  X,
  ExternalLink,
  Award,
  FileCheck,
  DollarSign,
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    admissions,
    approveAdmission,
    rejectAdmission,
    addAdmission,
    attendance,
    zoomLinks,
    addZoomLink,
    toggleZoomLink,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "admissions" | "zoom" | "attendance" | "certificates" | "reports" | "salary"
  >("admissions");

  // New Admission Modal / Form state
  const [showAddAdmissionModal, setShowAddAdmissionModal] = useState(false);
  const [newFullName, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCountry, setNewCountry] = useState("United States");
  const [newCourse, setNewCourse] = useState("Noorani Qaida & Tajweed");
  const [newSchedule, setNewSchedule] = useState("Mon/Wed/Fri - 6:00 PM EST");

  // New Zoom Modal / Form state
  const [showAddZoomModal, setShowAddZoomModal] = useState(false);
  const [zoomTitle, setZoomTitle] = useState("");
  const [zoomUrl, setZoomUrl] = useState("");
  const [zoomMeetingId, setZoomMeetingId] = useState("");
  const [zoomPasscode, setZoomPasscode] = useState("");
  const [zoomTeacher, setZoomTeacher] = useState("Ustadha Fatima Al-Zahra");
  const [zoomCourse, setZoomCourse] = useState("Tajweed & Recitation");
  const [zoomSchedule, setZoomSchedule] = useState("Mon-Fri 09:00 AM EST");

  // Stats calculation
  const totalAdmissions = admissions.length;
  const pendingAdmissions = admissions.filter((a) => a.status === "pending").length;
  const approvedAdmissions = admissions.filter((a) => a.status === "approved").length;
  const activeZoomCount = zoomLinks.filter((z) => z.is_active).length;

  const handleCreateAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newEmail || !newPhone) return;

    addAdmission({
      full_name: newFullName,
      email: newEmail,
      phone: newPhone,
      country: newCountry,
      course_name: newCourse,
      preferred_schedule: newSchedule,
    });

    setNewFullName("");
    setNewEmail("");
    setNewPhone("");
    setShowAddAdmissionModal(false);
  };

  const handleCreateZoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zoomTitle || !zoomUrl) return;

    addZoomLink({
      title: zoomTitle,
      meeting_url: zoomUrl,
      meeting_id: zoomMeetingId,
      passcode: zoomPasscode,
      teacher_name: zoomTeacher,
      course_name: zoomCourse,
      schedule_time: zoomSchedule,
      is_active: true,
    });

    setZoomTitle("");
    setZoomUrl("");
    setZoomMeetingId("");
    setZoomPasscode("");
    setShowAddZoomModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border border-rose-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={14} /> Admin Command Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Academy Overview & Operations
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage student admissions, assign Quran tutors, control live Zoom sessions, generate certificates, and track financial records.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowAddAdmissionModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition active:scale-95 cursor-pointer"
          >
            <UserPlus size={16} />
            <span>New Admission Request</span>
          </button>

          <button
            onClick={() => setShowAddZoomModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-lg transition active:scale-95 cursor-pointer"
          >
            <Video size={16} className="text-rose-400" />
            <span>Create Zoom Studio Link</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Admissions</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{pendingAdmissions}</h3>
            <span className="text-[11px] text-amber-400 font-medium">Awaiting tutor assignment</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Approved Students</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{approvedAdmissions}</h3>
            <span className="text-[11px] text-emerald-400 font-medium">Enrolled in active courses</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <Video size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Zoom Rooms</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{activeZoomCount}</h3>
            <span className="text-[11px] text-rose-400 font-medium">Live 1-on-1 virtual classrooms</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <FileSpreadsheet size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Attendance Logs</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{attendance.length}</h3>
            <span className="text-[11px] text-blue-400 font-medium">Class sessions completed</span>
          </div>
        </div>
      </div>

      {/* Main Tabs Selection */}
      <div className="flex border-b border-slate-800 space-x-2 sm:space-x-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("admissions")}
          className={`pb-3 text-xs sm:text-sm font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === "admissions"
              ? "border-amber-400 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <GraduationCap size={18} />
          <span>Admissions ({admissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("zoom")}
          className={`pb-3 text-xs sm:text-sm font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === "zoom"
              ? "border-rose-400 text-rose-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Video size={18} />
          <span>Zoom Studios ({zoomLinks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("attendance")}
          className={`pb-3 text-xs sm:text-sm font-bold transition border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === "attendance"
              ? "border-emerald-400 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Calendar size={18} />
          <span>Attendance Audit Log</span>
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
          <span>Progress Report Cards</span>
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
          <span>Salary & Financials</span>
        </button>
      </div>

      {/* TAB 1: ADMISSIONS MANAGER */}
      {activeTab === "admissions" && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users size={18} className="text-amber-400" />
              Student Admission Requests & Applications
            </h2>
            <span className="text-xs font-medium text-slate-400">
              Showing all {admissions.length} applications
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Course Applied</th>
                  <th className="px-6 py-4">Country & Phone</th>
                  <th className="px-6 py-4">Preferred Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {admissions.map((adm) => (
                  <tr key={adm.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-100">{adm.full_name}</p>
                      <p className="text-xs text-slate-400">{adm.email}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-200">{adm.course_name}</td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-semibold text-slate-300">{adm.country}</p>
                      <p className="text-xs text-slate-500">{adm.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-300">{adm.preferred_schedule}</td>
                    <td className="px-6 py-4">
                      {adm.status === "pending" && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold inline-flex items-center gap-1">
                          <Clock size={12} /> Pending Approval
                        </span>
                      )}
                      {adm.status === "approved" && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold inline-flex items-center gap-1">
                          <CheckCircle2 size={12} /> Approved
                        </span>
                      )}
                      {adm.status === "rejected" && (
                        <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold inline-flex items-center gap-1">
                          <XCircle size={12} /> Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {adm.status === "pending" ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => approveAdmission(adm.id, "Ustadha Fatima Al-Zahra")}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition flex items-center gap-1"
                          >
                            <Check size={14} /> Approve & Assign Tutor
                          </button>
                          <button
                            onClick={() => rejectAdmission(adm.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 font-bold text-xs border border-slate-700 hover:border-red-800 transition"
                          >
                            <X size={14} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 italic">
                          Assigned to {adm.assigned_teacher_name || "Assigned"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ZOOM LIVE STUDIOS */}
      {activeTab === "zoom" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {zoomLinks.map((zoom) => (
            <div
              key={zoom.id}
              className={`p-6 rounded-3xl border transition shadow-xl ${
                zoom.is_active
                  ? "bg-slate-900/90 border-slate-700"
                  : "bg-slate-950/60 border-slate-800 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-[10px] font-extrabold uppercase tracking-wider mb-2 border border-rose-500/20">
                    Live Virtual Classroom
                  </span>
                  <h3 className="text-lg font-extrabold text-white">{zoom.title}</h3>
                  <p className="text-xs text-emerald-400 font-semibold mt-0.5">{zoom.course_name}</p>
                </div>

                <button
                  onClick={() => toggleZoomLink(zoom.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition border ${
                    zoom.is_active
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                >
                  {zoom.is_active ? "Active" : "Inactive"}
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                <p>
                  <strong className="text-slate-400">Assigned Teacher:</strong> {zoom.teacher_name}
                </p>
                <p>
                  <strong className="text-slate-400">Schedule:</strong> {zoom.schedule_time}
                </p>
                {zoom.meeting_id && (
                  <p>
                    <strong className="text-slate-400">Meeting ID:</strong> {zoom.meeting_id} | Passcode: {zoom.passcode}
                  </p>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <a
                  href={zoom.meeting_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs shadow-lg transition"
                >
                  <Video size={16} />
                  <span>Launch Zoom Session</span>
                  <ExternalLink size={12} />
                </a>

                <span className="text-[11px] text-slate-500">ID: {zoom.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ATTENDANCE AUDIT LOG */}
      {activeTab === "attendance" && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar size={18} className="text-emerald-400" />
              Student Class Attendance Ledger
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Teacher</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Session Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {attendance.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4 text-xs font-semibold text-amber-400">{att.class_date}</td>
                    <td className="px-6 py-4 font-bold text-slate-100">{att.student_name}</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-300">{att.course_name}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">{att.teacher_name}</td>
                    <td className="px-6 py-4">
                      {att.status === "present" && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                          Present
                        </span>
                      )}
                      {att.status === "late" && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
                          Late
                        </span>
                      )}
                      {att.status === "absent" && (
                        <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold">
                          Absent
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400 max-w-xs truncate">
                      {att.notes || "No notes"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CERTIFICATE GENERATOR */}
      {activeTab === "certificates" && <CertificateGenerator />}

      {/* TAB 5: REPORT CARD GENERATOR */}
      {activeTab === "reports" && <ReportCardGenerator />}

      {/* TAB 6: SALARY & FINANCIAL RECORDS */}
      {activeTab === "salary" && <SalaryRecordsTable role="admin" />}

      {/* MODAL: ADD ADMISSION */}
      {showAddAdmissionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Add New Admission Application</h3>
              <button
                onClick={() => setShowAddAdmissionModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateAdmission} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="e.g. Ibrahim Hassan"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="ibrahim@example.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+1 (555) 019-2831"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Course Choice</label>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Noorani Qaida & Tajweed">Noorani Qaida & Tajweed</option>
                  <option value="Online Hifz Program">Online Hifz Program</option>
                  <option value="Quran Translation & Tafseer">Quran Translation & Tafseer</option>
                  <option value="Islamic Studies for Kids">Islamic Studies for Kids</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddAdmissionModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
                >
                  Create Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD ZOOM LINK */}
      {showAddZoomModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Create New Zoom Class Studio</h3>
              <button
                onClick={() => setShowAddZoomModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateZoom} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Class Title</label>
                <input
                  type="text"
                  required
                  value={zoomTitle}
                  onChange={(e) => setZoomTitle(e.target.value)}
                  placeholder="e.g. Advanced Hifz & Muraja'ah Studio"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Zoom Meeting URL</label>
                <input
                  type="url"
                  required
                  value={zoomUrl}
                  onChange={(e) => setZoomUrl(e.target.value)}
                  placeholder="https://zoom.us/j/123456789"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Meeting ID</label>
                  <input
                    type="text"
                    value={zoomMeetingId}
                    onChange={(e) => setZoomMeetingId(e.target.value)}
                    placeholder="987 654 321"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Passcode</label>
                  <input
                    type="text"
                    value={zoomPasscode}
                    onChange={(e) => setZoomPasscode(e.target.value)}
                    placeholder="Maqsad2026"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddZoomModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500"
                >
                  Create Studio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
