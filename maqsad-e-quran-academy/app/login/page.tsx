"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { UserRole } from "@/lib/auth";
import { ShieldCheck, GraduationCap, UserCheck, ArrowRight, Lock, Mail, Sparkles, CheckCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, demoLogin } = useAuth();
  
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const userEmail = email || `${selectedRole}@maqsadquran.com`;
      const success = await login(userEmail, password || "password123", selectedRole);

      if (success) {
        router.push(`/dashboard/${selectedRole}`);
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemo = (role: UserRole) => {
    demoLogin(role);
    router.push(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
        {/* Header Branding */}
        <div className="text-center">
          <Link href="/" className="inline-flex flex-col items-center group">
            <div className="relative w-20 h-20 mb-2 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Maqsad-e-Quran Academy"
                fill
                priority
                className="object-contain filter drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Maqsad-e-Quran <span className="text-amber-400">Academy</span>
            </h1>
            <p className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mt-1">
              Interactive Learning Portal
            </p>
          </Link>

          <h2 className="mt-6 text-xl font-bold text-slate-200">
            Sign in to your account
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Access your 1-on-1 Quran classes, homework & schedule
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/80 grid grid-cols-3 gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => {
              setSelectedRole("student");
              setEmail("student@maqsadquran.com");
            }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              selectedRole === "student"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            <GraduationCap size={16} />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole("teacher");
              setEmail("teacher@maqsadquran.com");
            }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              selectedRole === "teacher"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            <UserCheck size={16} />
            <span>Teacher</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole("admin");
              setEmail("admin@maqsadquran.com");
            }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              selectedRole === "admin"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            <ShieldCheck size={16} />
            <span>Admin</span>
          </button>
        </div>

        {/* Credentials Form */}
        <div className="bg-slate-800/90 border border-slate-700/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={`${selectedRole}@maqsadquran.com`}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="font-semibold text-emerald-400 hover:text-emerald-300">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-700/30 transition-all duration-200 active:scale-98 disabled:opacity-50"
            >
              <span>{isSubmitting ? "Signing in..." : `Sign In as ${selectedRole.toUpperCase()}`}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/80" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-800 px-3 text-slate-400 font-semibold flex items-center gap-1">
                <Sparkles size={12} className="text-amber-400" /> Fast Demo Access
              </span>
            </div>
          </div>

          {/* Quick Instant Demo Login Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo("student")}
              className="p-2.5 rounded-xl border border-slate-700 hover:border-emerald-500/60 bg-slate-900/60 hover:bg-emerald-950/40 text-center transition group"
            >
              <span className="block text-[11px] font-semibold text-slate-400 group-hover:text-emerald-400">Student</span>
              <span className="text-xs font-bold text-slate-200">Demo</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo("teacher")}
              className="p-2.5 rounded-xl border border-slate-700 hover:border-emerald-500/60 bg-slate-900/60 hover:bg-emerald-950/40 text-center transition group"
            >
              <span className="block text-[11px] font-semibold text-slate-400 group-hover:text-emerald-400">Teacher</span>
              <span className="text-xs font-bold text-slate-200">Demo</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo("admin")}
              className="p-2.5 rounded-xl border border-slate-700 hover:border-emerald-500/60 bg-slate-900/60 hover:bg-emerald-950/40 text-center transition group"
            >
              <span className="block text-[11px] font-semibold text-slate-400 group-hover:text-emerald-400">Admin</span>
              <span className="text-xs font-bold text-slate-200">Demo</span>
            </button>
          </div>
        </div>

        {/* Back Link */}
        <p className="text-center text-xs text-slate-400">
          Want to register for a 3-Day Free Trial?{" "}
          <Link href="/#admissions" className="font-bold text-amber-400 hover:underline">
            Book Trial Here
          </Link>
        </p>
      </div>
    </div>
  );
}
