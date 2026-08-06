"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  Copy,
  CreditCard,
  Building2,
  Smartphone,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Lock,
  Globe,
  AlertCircle,
  QrCode,
  CheckCircle2,
} from "lucide-react";
import { sendAdmissionConfirmationEmail } from "@/lib/email-service";
import { sendWhatsAppAdmissionNotification } from "@/lib/whatsapp-notifier";

export interface PackageDetails {
  id?: string;
  name?: string;
  amount?: number;
  currency?: string;
  classesPerWeek?: number;
  durationMinutes?: number;
}

export interface StudentDetails {
  name?: string;
  email?: string;
  phone?: string;
  course?: string;
}

export interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageDetails?: PackageDetails;
  studentDetails?: StudentDetails;
  onSuccess?: (result: {
    gateway: string;
    transactionId: string;
    amount: number;
    currency: string;
    studentEmail: string;
  }) => void;
}

// Currency Conversion & Rates (Synced with PricingCalculator)
const CURRENCIES: Record<
  string,
  { code: string; symbol: string; label: string; rateFromUSD: number }
> = {
  USD: { code: "USD", symbol: "$", label: "USD ($)", rateFromUSD: 1 },
  GBP: { code: "GBP", symbol: "£", label: "GBP (£)", rateFromUSD: 0.78 },
  EUR: { code: "EUR", symbol: "€", label: "EUR (€)", rateFromUSD: 0.92 },
  CAD: { code: "CAD", symbol: "C$", label: "CAD (C$)", rateFromUSD: 1.35 },
  AUD: { code: "AUD", symbol: "A$", label: "AUD (A$)", rateFromUSD: 1.5 },
  AED: { code: "AED", symbol: "AED", label: "AED (د.إ)", rateFromUSD: 3.67 },
  PKR: { code: "PKR", symbol: "Rs.", label: "PKR (Rs.)", rateFromUSD: 278 },
};

type PaymentGatewayId =
  | "stripe"
  | "paypal"
  | "wise"
  | "payoneer"
  | "jazzcash"
  | "easypaisa";

interface GatewayOption {
  id: PaymentGatewayId;
  name: string;
  subtitle: string;
  category: "card" | "wallet" | "bank";
  badge?: string;
  iconBg: string;
}

const GATEWAYS: GatewayOption[] = [
  {
    id: "stripe",
    name: "Stripe",
    subtitle: "Credit / Debit Card (Visa, Mastercard)",
    category: "card",
    badge: "Instant",
    iconBg: "bg-indigo-600",
  },
  {
    id: "paypal",
    name: "PayPal",
    subtitle: "Global PayPal Account & One-Touch",
    category: "wallet",
    badge: "Popular",
    iconBg: "bg-blue-600",
  },
  {
    id: "wise",
    name: "Wise Direct",
    subtitle: "International Bank Transfer (Zero Fee)",
    category: "bank",
    badge: "Best Rate",
    iconBg: "bg-lime-600",
  },
  {
    id: "payoneer",
    name: "Payoneer",
    subtitle: "Direct Payoneer Account Transfer",
    category: "bank",
    iconBg: "bg-orange-500",
  },
  {
    id: "jazzcash",
    name: "JazzCash",
    subtitle: "Pakistan Local Mobile Wallet",
    category: "wallet",
    badge: "PKR Local",
    iconBg: "bg-red-600",
  },
  {
    id: "easypaisa",
    name: "Easypaisa",
    subtitle: "Pakistan Telenor Mobile Account",
    category: "wallet",
    badge: "PKR Local",
    iconBg: "bg-emerald-600",
  },
];

export default function PaymentGatewayModal({
  isOpen,
  onClose,
  packageDetails,
  studentDetails,
  onSuccess,
}: PaymentGatewayModalProps) {
  // State variables
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [selectedGateway, setSelectedGateway] =
    useState<PaymentGatewayId>("stripe");
  
  // Student input state
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [transactionIdInput, setTransactionIdInput] = useState("");

  // Process & Loading states
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Success state
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [completedDetails, setCompletedDetails] = useState<{
    txId: string;
    gateway: string;
    amount: number;
    currency: string;
  } | null>(null);

  // Sync props when modal opens
  useEffect(() => {
    if (isOpen) {
      if (packageDetails?.currency) {
        setSelectedCurrency(packageDetails.currency.toUpperCase());
      }
      setStudentName(studentDetails?.name || "");
      setStudentEmail(studentDetails?.email || "");
      setStudentPhone(studentDetails?.phone || "");
      setTransactionIdInput("");
      setErrorMessage("");
      setPaymentCompleted(false);
      setCompletedDetails(null);
    }
  }, [isOpen, packageDetails, studentDetails]);

  if (!isOpen) return null;

  // Calculate pricing based on currency conversion
  const rawBaseAmount = packageDetails?.amount || 50;
  const curr = CURRENCIES[selectedCurrency] || CURRENCIES.USD;
  
  // Convert base USD price to selected currency
  const finalAmount =
    selectedCurrency === "USD"
      ? rawBaseAmount
      : Math.round(rawBaseAmount * curr.rateFromUSD);

  const packageName =
    packageDetails?.name || "Standard Quran Learning Package (3 Days/wk)";

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Online gateway handlers (Stripe / PayPal)
  const handleInitiateOnlineCheckout = async () => {
    if (!studentEmail.trim()) {
      setErrorMessage("Please enter a valid student email address.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      if (selectedGateway === "stripe") {
        const response = await fetch("/api/payments/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            packageName,
            amount: finalAmount,
            currency: selectedCurrency,
            studentEmail: studentEmail.trim(),
            studentName: studentName.trim() || "Valued Student",
          }),
        });

        const data = await response.json();

        if (data.url) {
          window.location.href = data.url;
          return;
        }

        // Mock mode instant completion if no redirect URL
        const mockTx = data.sessionId || `str_mock_${Date.now()}`;
        completePaymentSuccess("Stripe Card Payment", mockTx);
      } else if (selectedGateway === "paypal") {
        const response = await fetch("/api/payments/paypal/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            packageName,
            amount: finalAmount,
            currency: selectedCurrency,
            studentEmail: studentEmail.trim(),
          }),
        });

        const data = await response.json();

        if (data.approvalUrl) {
          window.location.href = data.approvalUrl;
          return;
        }

        const mockTx = data.orderId || `pp_mock_${Date.now()}`;
        completePaymentSuccess("PayPal", mockTx);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Payment initialization failed";
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  // Offline / Transfer gateway verification submission (Wise, Payoneer, JazzCash, Easypaisa)
  const handleSubmitManualTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionIdInput.trim()) {
      setErrorMessage("Please enter your Transfer Transaction / Reference ID.");
      return;
    }
    if (!studentEmail.trim()) {
      setErrorMessage("Please enter your email for receipt delivery.");
      return;
    }

    const gatewayName =
      GATEWAYS.find((g) => g.id === selectedGateway)?.name || selectedGateway;

    completePaymentSuccess(gatewayName, transactionIdInput.trim());
  };

  const completePaymentSuccess = (gatewayLabel: string, txId: string) => {
    setPaymentCompleted(true);
    setCompletedDetails({
      txId,
      gateway: gatewayLabel,
      amount: finalAmount,
      currency: selectedCurrency,
    });

    // Fire Email Admission Confirmation
    if (studentEmail.trim()) {
      sendAdmissionConfirmationEmail({
        studentName: studentName.trim() || "Student",
        email: studentEmail.trim(),
        course: studentDetails?.course || "Quran Learning Program",
        packageName,
        amountPaid: finalAmount,
        currency: selectedCurrency,
        receiptNumber: txId,
      }).catch((err) => console.warn("Admission email trigger error:", err));
    }

    // Fire WhatsApp Admission Confirmation
    const phoneToNotify = studentPhone.trim() || studentDetails?.phone?.trim();
    if (phoneToNotify) {
      sendWhatsAppAdmissionNotification({
        toPhone: phoneToNotify,
        studentName: studentName.trim() || "Student",
        course: studentDetails?.course || "Quran Learning Program",
        packageName,
      }).catch((err) => console.warn("Admission WhatsApp trigger error:", err));
    }

    if (onSuccess) {
      onSuccess({
        gateway: gatewayLabel,
        transactionId: txId,
        amount: finalAmount,
        currency: selectedCurrency,
        studentEmail,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md transition-all animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-6 sm:p-8 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center justify-between gap-4 pr-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-300/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Direct Academy Checkout
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {packageName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Select your preferred global or local payment gateway
              </p>
            </div>

            {/* Total Price Display & Currency Selector */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 sm:px-5 text-right flex flex-col items-end">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="bg-slate-900 text-xs font-bold text-amber-400 rounded-lg px-2 py-1 border border-slate-700 outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  {Object.values(CURRENCIES).map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {curr.symbol} {finalAmount.toLocaleString()}
                <span className="text-xs text-slate-400 font-normal"> / mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {paymentCompleted && completedDetails ? (
          /* SUCCESS SCREEN */
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-5 animate-scaleUp">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Payment Confirmation Received! 🎉
              </h3>
              <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
                Assalamu Alaikum! Your payment details via{" "}
                <strong className="text-amber-400">{completedDetails.gateway}</strong>{" "}
                have been registered.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="w-full max-w-md bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 text-left text-sm space-y-3">
              <div className="flex justify-between border-b border-slate-700/60 pb-2">
                <span className="text-slate-400">Package:</span>
                <span className="font-bold text-white text-right">{packageName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700/60 pb-2">
                <span className="text-slate-400">Total Amount:</span>
                <span className="font-bold text-emerald-400">
                  {completedDetails.currency} {completedDetails.amount}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-700/60 pb-2">
                <span className="text-slate-400">Transaction Ref / ID:</span>
                <span className="font-mono font-bold text-amber-300 truncate max-w-[200px]">
                  {completedDetails.txId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Student Email:</span>
                <span className="font-semibold text-slate-200">{studentEmail}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm">
              An official admission confirmation receipt has been sent to your email. Our team will contact you on WhatsApp shortly.
            </p>

            <button
              onClick={onClose}
              className="w-full max-w-xs py-3.5 px-6 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all"
            >
              Back to Website
            </button>
          </div>
        ) : (
          /* GATEWAY SELECTOR & FORM */
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            
            {/* Student Information Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Abdullah Khan"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="e.g. student@gmail.com"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Gateway Selection Grid */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Choose Payment Method
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {GATEWAYS.map((g) => {
                  const isSelected = selectedGateway === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => {
                        setSelectedGateway(g.id);
                        setErrorMessage("");
                      }}
                      className={`relative flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg"
                          : "bg-slate-800/50 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600"
                      }`}
                    >
                      {g.badge && (
                        <span className="absolute top-2 right-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          {g.badge}
                        </span>
                      )}

                      <div
                        className={`w-8 h-8 rounded-lg ${g.iconBg} text-white flex items-center justify-center font-bold text-xs mb-2 shadow-sm`}
                      >
                        {g.id === "stripe" && <CreditCard className="w-4 h-4" />}
                        {g.id === "paypal" && <span className="font-extrabold text-sm">P</span>}
                        {g.id === "wise" && <Building2 className="w-4 h-4" />}
                        {g.id === "payoneer" && <Globe className="w-4 h-4" />}
                        {(g.id === "jazzcash" || g.id === "easypaisa") && (
                          <Smartphone className="w-4 h-4" />
                        )}
                      </div>

                      <span className="text-sm font-bold text-white">{g.name}</span>
                      <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {g.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Display */}
            {errorMessage && (
              <div className="flex items-center gap-2 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* GATEWAY SPECIFIC DETAILED ACTION PANEL */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5">
              
              {/* STRIPE CARD PANEL */}
              {selectedGateway === "stripe" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Stripe Online Card Payment</h4>
                      <p className="text-xs text-slate-400">
                        Supports Visa, Mastercard, American Express, Apple Pay & Google Pay
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Clicking below will securely initiate your subscription of{" "}
                    <strong className="text-amber-400">
                      {curr.symbol} {finalAmount} {selectedCurrency}
                    </strong>{" "}
                    via Stripe SSL 256-bit encrypted checkout.
                  </p>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleInitiateOnlineCheckout}
                    className="w-full py-3.5 px-6 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                  >
                    {isProcessing ? (
                      <span>Redirecting to Stripe...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" /> Pay {curr.symbol} {finalAmount} with Card <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* PAYPAL PANEL */}
              {selectedGateway === "paypal" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
                      <span className="font-black text-base">P</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">PayPal One-Touch Checkout</h4>
                      <p className="text-xs text-slate-400">
                        Pay with your PayPal balance or linked bank account
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    You will be redirected to PayPal to complete your tuition fee of{" "}
                    <strong className="text-amber-400">
                      {curr.symbol} {finalAmount} {selectedCurrency}
                    </strong>
                    .
                  </p>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleInitiateOnlineCheckout}
                    className="w-full py-3.5 px-6 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                  >
                    {isProcessing ? (
                      <span>Connecting to PayPal...</span>
                    ) : (
                      <>
                        Proceed to PayPal <ExternalLink className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* WISE DIRECT BANK TRANSFER PANEL */}
              {selectedGateway === "wise" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-lime-400" />
                      <h4 className="font-bold text-white text-sm">Wise Bank Details</h4>
                    </div>
                    <span className="text-[11px] font-bold text-lime-400 bg-lime-400/10 px-2.5 py-0.5 rounded-full border border-lime-400/20">
                      Zero Exchange Markup
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Account Title</span>
                        <span className="font-bold text-white">Maqsad-e-Quran Academy Ltd</span>
                      </div>
                      <button
                        onClick={() => handleCopy("Maqsad-e-Quran Academy Ltd", "Wise Title")}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        {copiedField === "Wise Title" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">IBAN Number</span>
                        <span className="font-mono font-bold text-amber-300">GB98 WISE 1234 5678 9012 34</span>
                      </div>
                      <button
                        onClick={() => handleCopy("GB98WISE12345678901234", "Wise IBAN")}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        {copiedField === "Wise IBAN" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">BIC / SWIFT Code</span>
                        <span className="font-mono font-bold text-white">WISEGB2L</span>
                      </div>
                      <button
                        onClick={() => handleCopy("WISEGB2L", "Wise BIC")}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        {copiedField === "Wise BIC" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Manual Tx Submission Form */}
                  <form onSubmit={handleSubmitManualTransaction} className="pt-2 space-y-3">
                    <label className="block text-xs font-bold text-slate-300">
                      Enter Wise Transfer Reference / Transaction ID:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. TRANSFER-8912345"
                        value={transactionIdInput}
                        onChange={(e) => setTransactionIdInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        className="py-2 px-4 bg-lime-600 hover:bg-lime-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
                      >
                        Confirm Transfer
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* PAYONEER PANEL */}
              {selectedGateway === "payoneer" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-700/60 pb-3">
                    <Globe className="w-5 h-5 text-orange-400" />
                    <h4 className="font-bold text-white text-sm">Payoneer Account Details</h4>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Payoneer Email</span>
                        <span className="font-bold text-amber-300">payments@maqsadquran.com</span>
                      </div>
                      <button
                        onClick={() => handleCopy("payments@maqsadquran.com", "Payoneer Email")}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        {copiedField === "Payoneer Email" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Account ID</span>
                        <span className="font-mono font-bold text-white">10098234</span>
                      </div>
                      <button
                        onClick={() => handleCopy("10098234", "Payoneer ID")}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        {copiedField === "Payoneer ID" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitManualTransaction} className="pt-2 space-y-3">
                    <label className="block text-xs font-bold text-slate-300">
                      Enter Payoneer Payment Reference / Transaction ID:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. PAY-3928172"
                        value={transactionIdInput}
                        onChange={(e) => setTransactionIdInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        className="py-2 px-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
                      >
                        Submit Receipt
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* JAZZCASH PANEL */}
              {selectedGateway === "jazzcash" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-red-400" />
                      <h4 className="font-bold text-white text-sm">JazzCash Mobile Wallet (Pakistan)</h4>
                    </div>
                    <span className="text-[11px] font-bold text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">
                      Local Wallet
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Account Title</span>
                        <span className="font-bold text-white">Maqsad-e-Quran Academy</span>
                      </div>
                      <button
                        onClick={() => handleCopy("Maqsad-e-Quran Academy", "Jazz Title")}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        {copiedField === "Jazz Title" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">JazzCash Number</span>
                        <span className="font-mono font-bold text-amber-300">0300-1234567</span>
                      </div>
                      <button
                        onClick={() => handleCopy("03001234567", "Jazz Number")}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        {copiedField === "Jazz Number" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Merchant Till ID</span>
                        <span className="font-mono font-bold text-white">987654</span>
                      </div>
                      <button
                        onClick={() => handleCopy("987654", "Till ID")}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        {copiedField === "Till ID" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitManualTransaction} className="pt-2 space-y-3">
                    <label className="block text-xs font-bold text-slate-300">
                      Enter JazzCash Transaction TID / Reference:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 0192837465"
                        value={transactionIdInput}
                        onChange={(e) => setTransactionIdInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        className="py-2 px-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
                      >
                        Submit TID
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* EASYPAISA PANEL */}
              {selectedGateway === "easypaisa" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-emerald-400" />
                      <h4 className="font-bold text-white text-sm">Easypaisa Mobile Account (Pakistan)</h4>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Local Wallet
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Account Title</span>
                        <span className="font-bold text-white">Maqsad-e-Quran Academy</span>
                      </div>
                      <button
                        onClick={() => handleCopy("Maqsad-e-Quran Academy", "Easy Title")}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        {copiedField === "Easy Title" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Easypaisa Mobile No</span>
                        <span className="font-mono font-bold text-amber-300">0345-7654321</span>
                      </div>
                      <button
                        onClick={() => handleCopy("03457654321", "Easy Number")}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        {copiedField === "Easy Number" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitManualTransaction} className="pt-2 space-y-3">
                    <label className="block text-xs font-bold text-slate-300">
                      Enter Easypaisa Transaction TID / Reference:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 9847120394"
                        value={transactionIdInput}
                        onChange={(e) => setTransactionIdInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
                      >
                        Submit TID
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>

            {/* SSL Security Assurance Footer */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>256-Bit Encrypted Payment • No hidden registration fees</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
