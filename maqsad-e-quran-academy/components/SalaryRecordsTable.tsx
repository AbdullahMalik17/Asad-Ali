"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Download,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  CreditCard,
  Building2,
  TrendingUp,
  FileSpreadsheet,
  X,
  Sparkles,
  Calendar,
} from "lucide-react";
import jsPDF from "jspdf";

export interface SalaryRecord {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar?: string;
  payPeriod: string;
  hoursTaught: number;
  baseRate: number;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netPayout: number;
  paymentMethod: "Bank Transfer" | "PayPal" | "Wise" | "Stripe Direct";
  status: "paid" | "pending" | "processing";
  transactionRef?: string;
  payoutDate?: string;
}

const INITIAL_SALARY_RECORDS: SalaryRecord[] = [
  {
    id: "sal-801",
    teacherId: "teacher-101",
    teacherName: "Ustadha Fatima Al-Zahra",
    teacherAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    payPeriod: "August 2026",
    hoursTaught: 48,
    baseRate: 25,
    baseSalary: 1200,
    bonus: 150,
    deductions: 50,
    netPayout: 1300,
    paymentMethod: "Bank Transfer",
    status: "paid",
    transactionRef: "TRX-2026-9948",
    payoutDate: "2026-08-01",
  },
  {
    id: "sal-802",
    teacherId: "teacher-102",
    teacherName: "Dr. Ustadh Ahmad Al-Mansoor",
    teacherAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    payPeriod: "August 2026",
    hoursTaught: 55,
    baseRate: 30,
    baseSalary: 1650,
    bonus: 200,
    deductions: 0,
    netPayout: 1850,
    paymentMethod: "Wise",
    status: "paid",
    transactionRef: "TRX-2026-8812",
    payoutDate: "2026-08-02",
  },
  {
    id: "sal-803",
    teacherId: "teacher-103",
    teacherName: "Sheikh Bilal Hassan",
    payPeriod: "August 2026",
    hoursTaught: 40,
    baseRate: 22,
    baseSalary: 880,
    bonus: 70,
    deductions: 30,
    netPayout: 920,
    paymentMethod: "PayPal",
    status: "pending",
  },
  {
    id: "sal-804",
    teacherId: "teacher-101",
    teacherName: "Ustadha Fatima Al-Zahra",
    teacherAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    payPeriod: "July 2026",
    hoursTaught: 50,
    baseRate: 25,
    baseSalary: 1250,
    bonus: 100,
    deductions: 40,
    netPayout: 1310,
    paymentMethod: "Bank Transfer",
    status: "paid",
    transactionRef: "TRX-2026-7719",
    payoutDate: "2026-07-01",
  },
];

interface SalaryRecordsTableProps {
  role?: "admin" | "teacher";
  teacherFilterName?: string;
}

export default function SalaryRecordsTable({ role = "admin", teacherFilterName }: SalaryRecordsTableProps) {
  const [records, setRecords] = useState<SalaryRecord[]>(INITIAL_SALARY_RECORDS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal State for adding new payout record
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTeacherName, setNewTeacherName] = useState("Ustadha Fatima Al-Zahra");
  const [newPayPeriod, setNewPayPeriod] = useState("August 2026");
  const [newHours, setNewHours] = useState(45);
  const [newRate, setNewRate] = useState(25);
  const [newBonus, setNewBonus] = useState(100);
  const [newDeductions, setNewDeductions] = useState(0);
  const [newMethod, setNewMethod] = useState<SalaryRecord["paymentMethod"]>("Bank Transfer");
  const [newStatus, setNewStatus] = useState<SalaryRecord["status"]>("paid");

  // Filter records based on role and search term
  const displayedRecords = records.filter((r) => {
    if (role === "teacher" && teacherFilterName) {
      if (r.teacherName.toLowerCase() !== teacherFilterName.toLowerCase()) return false;
    }
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        r.teacherName.toLowerCase().includes(q) ||
        r.payPeriod.toLowerCase().includes(q) ||
        (r.transactionRef && r.transactionRef.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Calculate metrics
  const totalPaidOut = records
    .filter((r) => r.status === "paid")
    .reduce((sum, r) => sum + r.netPayout, 0);

  const pendingPayout = records
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.netPayout, 0);

  const totalHoursTaught = records.reduce((sum, r) => sum + r.hoursTaught, 0);

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const baseSalary = newHours * newRate;
    const netPayout = baseSalary + newBonus - newDeductions;
    const newRec: SalaryRecord = {
      id: `sal-${Date.now()}`,
      teacherId: `teacher-${Date.now()}`,
      teacherName: newTeacherName,
      payPeriod: newPayPeriod,
      hoursTaught: newHours,
      baseRate: newRate,
      baseSalary: baseSalary,
      bonus: newBonus,
      deductions: newDeductions,
      netPayout: netPayout,
      paymentMethod: newMethod,
      status: newStatus,
      transactionRef: newStatus === "paid" ? `TRX-2026-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      payoutDate: newStatus === "paid" ? new Date().toISOString().split("T")[0] : undefined,
    };

    setRecords([newRec, ...records]);
    setShowAddModal(false);
  };

  const handleDownloadPayslip = (record: SalaryRecord) => {
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const width = 210;

      // Dark Blue Header Banner
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, width, 45, "F");

      doc.setFillColor(217, 119, 6);
      doc.rect(0, 45, width, 2, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255);
      doc.text("MAQSAD-E-QURAN ACADEMY", 15, 20);

      doc.setFontSize(11);
      doc.setTextColor(217, 119, 6);
      doc.text("OFFICIAL TEACHER SALARY PAYSLIP", 15, 28);

      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text(`Pay Period: ${record.payPeriod}`, width - 15, 20, { align: "right" });
      doc.text(`Ref ID: ${record.transactionRef || record.id}`, width - 15, 28, { align: "right" });

      // Teacher Details Card
      let y = 58;
      doc.setFillColor(248, 250, 252);
      doc.rect(15, y, width - 30, 28, "F");
      doc.setDrawColor(226, 232, 240);
      doc.rect(15, y, width - 30, 28, "S");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text(`Instructor: ${record.teacherName}`, 20, y + 8);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(71, 85, 105);
      doc.text(`Payment Method: ${record.paymentMethod}`, 20, y + 15);
      doc.text(`Payout Status: ${record.status.toUpperCase()}`, 20, y + 22);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(16, 185, 129);
      doc.text(`Net Paid: $${record.netPayout.toLocaleString()}`, width - 20, y + 15, { align: "right" });

      // Financial Calculation Table
      y = 96;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(6, 78, 59);
      doc.text("EARNINGS & DISBURSEMENT BREAKDOWN", 15, y);

      y += 4;
      doc.setFillColor(15, 23, 42);
      doc.rect(15, y, width - 30, 8, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("Description", 20, y + 5.5);
      doc.text("Calculation / Hours", 110, y + 5.5);
      doc.text("Amount ($)", 165, y + 5.5);

      const items = [
        { desc: "Base Teaching Compensation", calc: `${record.hoursTaught} hrs @ $${record.baseRate}/hr`, amount: `$${record.baseSalary}` },
        { desc: "Performance Incentive & Bonus", calc: "Monthly Teaching Bonus", amount: `+$${record.bonus}` },
        { desc: "Tax & Admin Withholding", calc: "Standard Deductions", amount: `-$${record.deductions}` },
      ];

      y += 8;
      items.forEach((item, idx) => {
        const bg = idx % 2 === 0 ? 255 : 248;
        doc.setFillColor(bg, bg, bg);
        doc.rect(15, y, width - 30, 8, "F");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        doc.text(item.desc, 20, y + 5.5);
        doc.text(item.calc, 110, y + 5.5);

        doc.setFont("helvetica", "bold");
        doc.text(item.amount, 165, y + 5.5);

        doc.setDrawColor(226, 232, 240);
        doc.line(15, y + 8, width - 15, y + 8);
        y += 8;
      });

      // Total Row
      doc.setFillColor(236, 253, 245);
      doc.rect(15, y, width - 30, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(6, 78, 59);
      doc.text("TOTAL NET PAYOUT DISBURSED", 20, y + 6.5);
      doc.text(`$${record.netPayout.toLocaleString()}`, 165, y + 6.5);

      // Signatures
      y += 40;
      doc.setDrawColor(148, 163, 184);
      doc.setLineWidth(0.5);
      doc.line(20, y, 80, y);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text("Academy Finance Department", 50, y + 5, { align: "center" });

      doc.line(width - 80, y, width - 20, y);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(record.teacherName, width - 50, y + 5, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("Teacher Signature / Acknowledgment", width - 50, y + 9, { align: "center" });

      doc.save(`Payslip_${record.teacherName.replace(/\s+/g, "_")}_${record.payPeriod.replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("Payslip PDF Error:", err);
      alert("Failed to generate Payslip PDF.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Financial Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Salary Disbursed</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">${totalPaidOut.toLocaleString()}</h3>
            <span className="text-[11px] text-emerald-400 font-medium">Fully settled payouts</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Payouts</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">${pendingPayout.toLocaleString()}</h3>
            <span className="text-[11px] text-amber-400 font-medium">Awaiting final approval</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Teaching Hours</p>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{totalHoursTaught} hrs</h3>
            <span className="text-[11px] text-blue-400 font-medium">Logged class sessions</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, & Action Button */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex flex-1 items-center gap-3 w-full">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search teacher, period, or ref ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
          </select>
        </div>

        {role === "admin" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            <span>Record Salary Payout</span>
          </button>
        )}
      </div>

      {/* Main Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileSpreadsheet size={18} className="text-amber-400" />
            Teacher Salary & Payroll Disbursements
          </h3>
          <span className="text-xs text-slate-400">Showing {displayedRecords.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Teacher / Instructor</th>
                <th className="px-6 py-4">Pay Period</th>
                <th className="px-6 py-4">Hours & Base Rate</th>
                <th className="px-6 py-4">Bonus / Deductions</th>
                <th className="px-6 py-4">Net Payout</th>
                <th className="px-6 py-4">Method & Ref</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {displayedRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {r.teacherAvatar ? (
                        <img src={r.teacherAvatar} alt={r.teacherName} className="w-9 h-9 rounded-xl object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                          {r.teacherName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-100">{r.teacherName}</p>
                        <p className="text-[11px] text-slate-400">Tutor ID: {r.teacherId}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-amber-400">{r.payPeriod}</p>
                    <p className="text-[10px] text-slate-500">{r.payoutDate || "N/A"}</p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-xs font-semibold text-slate-200">{r.hoursTaught} Hours</p>
                    <p className="text-[11px] text-slate-400">${r.baseRate}/hr (${r.baseSalary})</p>
                  </td>

                  <td className="px-6 py-4 text-xs">
                    <p className="text-emerald-400 font-medium">+${r.bonus} bonus</p>
                    {r.deductions > 0 && <p className="text-red-400">-${r.deductions} ded.</p>}
                  </td>

                  <td className="px-6 py-4 font-bold text-emerald-400 text-sm">
                    ${r.netPayout.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-xs font-medium text-slate-300">{r.paymentMethod}</p>
                    <p className="text-[10px] font-mono text-slate-500">{r.transactionRef || "Pending Ref"}</p>
                  </td>

                  <td className="px-6 py-4">
                    {r.status === "paid" && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold inline-flex items-center gap-1">
                        <CheckCircle2 size={12} /> Paid
                      </span>
                    )}
                    {r.status === "pending" && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold inline-flex items-center gap-1">
                        <Clock size={12} /> Pending
                      </span>
                    )}
                    {r.status === "processing" && (
                      <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-bold inline-flex items-center gap-1">
                        <Clock size={12} /> Processing
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDownloadPayslip(r)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download size={14} className="text-amber-400" /> Payslip PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD PAYOUT RECORD */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Record Teacher Salary Disbursement</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Teacher / Instructor</label>
                <select
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100"
                >
                  <option value="Ustadha Fatima Al-Zahra">Ustadha Fatima Al-Zahra</option>
                  <option value="Dr. Ustadh Ahmad Al-Mansoor">Dr. Ustadh Ahmad Al-Mansoor</option>
                  <option value="Sheikh Bilal Hassan">Sheikh Bilal Hassan</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pay Period</label>
                  <input
                    type="text"
                    value={newPayPeriod}
                    onChange={(e) => setNewPayPeriod(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Payment Method</label>
                  <select
                    value={newMethod}
                    onChange={(e) => setNewMethod(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Wise">Wise</option>
                    <option value="Stripe Direct">Stripe Direct</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hours Taught</label>
                  <input
                    type="number"
                    value={newHours}
                    onChange={(e) => setNewHours(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={newRate}
                    onChange={(e) => setNewRate(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Bonus ($)</label>
                  <input
                    type="number"
                    value={newBonus}
                    onChange={(e) => setNewBonus(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
                >
                  Save Payout Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
