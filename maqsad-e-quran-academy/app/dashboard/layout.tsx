"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { UserRole } from "@/lib/auth";
import {
  ShieldCheck,
  GraduationCap,
  UserCheck,
  LogOut,
  Home,
  BookOpen,
  Calendar,
  Video,
  FileCheck,
  ChevronRight,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, demoLogin, logout } = useAuth();

  const handleRoleSwitch = (newRole: UserRole) => {
    demoLogin(newRole);
    router.push(`/dashboard/${newRole}`);
  };

  const activeRole = role || "student";

  const getRoleBadgeColor = (r: UserRole) => {
    switch (r) {
      case "admin":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "teacher":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "student":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Dashboard Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo & Portal Title */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10 shrink-0 transition-transform group-hover:scale-105">
                  <Image
                    src="/logo.png"
                    alt="Maqsad-e-Quran"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="hidden sm:block">
                  <span className="text-base font-extrabold text-white tracking-tight">
                    Maqsad-e-Quran
                  </span>
                  <span className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                    LMS Portal
                  </span>
                </div>
              </Link>

              {/* Role Switcher Pills */}
              <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700/80 ml-2 sm:ml-4">
                <button
                  onClick={() => handleRoleSwitch("admin")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    activeRole === "admin"
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Switch to Admin Dashboard"
                >
                  <ShieldCheck size={14} />
                  <span className="hidden md:inline">Admin</span>
                </button>

                <button
                  onClick={() => handleRoleSwitch("teacher")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    activeRole === "teacher"
                      ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Switch to Teacher Dashboard"
                >
                  <UserCheck size={14} />
                  <span className="hidden md:inline">Teacher</span>
                </button>

                <button
                  onClick={() => handleRoleSwitch("student")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    activeRole === "student"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Switch to Student Dashboard"
                >
                  <GraduationCap size={14} />
                  <span className="hidden md:inline">Student</span>
                </button>
              </div>
            </div>

            {/* Quick Navigation Tabs for active role */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/dashboard/admin"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  pathname === "/dashboard/admin"
                    ? "bg-slate-800 text-rose-400 font-bold border border-rose-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Admin Overview
              </Link>
              <Link
                href="/dashboard/teacher"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  pathname === "/dashboard/teacher"
                    ? "bg-slate-800 text-amber-400 font-bold border border-amber-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Teacher Studio
              </Link>
              <Link
                href="/dashboard/student"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  pathname === "/dashboard/student"
                    ? "bg-slate-800 text-emerald-400 font-bold border border-emerald-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Student Hub
              </Link>
            </nav>

            {/* User Profile & Logout */}
            <div className="flex items-center gap-3">
              {user && (
                <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border border-emerald-500/50"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-xs text-white">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-slate-200 leading-none">
                      {user.name}
                    </p>
                    <span
                      className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded border mt-0.5 ${getRoleBadgeColor(
                        activeRole
                      )}`}
                    >
                      {activeRole}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition border border-transparent hover:border-slate-700"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Portal Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Portal Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>
          © 2026 Maqsad-e-Quran Academy LMS Portal. All rights reserved. | 1-on-1 Online Quran & Islamic Studies
        </p>
      </footer>
    </div>
  );
}
