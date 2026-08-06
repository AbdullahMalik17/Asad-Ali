"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserRole,
  UserSession,
  DEMO_USERS,
  AdmissionItem,
  INITIAL_ADMISSIONS,
  AttendanceItem,
  INITIAL_ATTENDANCE,
  HomeworkItem,
  INITIAL_HOMEWORK,
  ZoomLinkItem,
  INITIAL_ZOOM_LINKS,
  signOutSupabase,
} from "./auth";

interface AuthContextType {
  user: UserSession | null;
  role: UserRole | null;
  loading: boolean;
  login: (email: string, pass: string, preferredRole?: UserRole) => Promise<boolean>;
  demoLogin: (targetRole: UserRole) => void;
  logout: () => void;

  // Admissions
  admissions: AdmissionItem[];
  approveAdmission: (id: string, teacherName?: string) => void;
  rejectAdmission: (id: string) => void;
  addAdmission: (item: Omit<AdmissionItem, "id" | "created_at" | "status">) => void;

  // Attendance
  attendance: AttendanceItem[];
  markAttendance: (record: Omit<AttendanceItem, "id" | "created_at">) => void;

  // Homework
  homework: HomeworkItem[];
  addHomework: (item: Omit<HomeworkItem, "id" | "created_at" | "status">) => void;
  submitHomework: (id: string, text: string) => void;
  gradeHomework: (id: string, feedback: string, grade: string) => void;

  // Zoom Links
  zoomLinks: ZoomLinkItem[];
  addZoomLink: (link: Omit<ZoomLinkItem, "id" | "created_at">) => void;
  toggleZoomLink: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  // Dynamic state populated with mock initial data
  const [admissions, setAdmissions] = useState<AdmissionItem[]>(INITIAL_ADMISSIONS);
  const [attendance, setAttendance] = useState<AttendanceItem[]>(INITIAL_ATTENDANCE);
  const [homework, setHomework] = useState<HomeworkItem[]>(INITIAL_HOMEWORK);
  const [zoomLinks, setZoomLinks] = useState<ZoomLinkItem[]>(INITIAL_ZOOM_LINKS);

  useEffect(() => {
    // Check localStorage session on mount
    const savedUser = localStorage.getItem("maqsad_auth_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as UserSession;
        setUser(parsed);
        setRole(parsed.role);
      } catch (err) {
        console.error("Failed to parse saved auth user:", err);
      }
    } else {
      // Default to student demo user for immediate experience if unauthenticated
      const defaultUser = DEMO_USERS.student;
      setUser(defaultUser);
      setRole(defaultUser.role);
    }
    setLoading(false);
  }, []);

  const demoLogin = (targetRole: UserRole) => {
    const demoUser = DEMO_USERS[targetRole];
    setUser(demoUser);
    setRole(targetRole);
    localStorage.setItem("maqsad_auth_user", JSON.stringify(demoUser));
  };

  const login = async (email: string, _pass: string, preferredRole: UserRole = "student"): Promise<boolean> => {
    // Standard login mapping or role detection based on email
    let detectedRole: UserRole = preferredRole;
    if (email.includes("admin")) detectedRole = "admin";
    else if (email.includes("teacher")) detectedRole = "teacher";
    else if (email.includes("student")) detectedRole = "student";

    const loggedInUser: UserSession = {
      id: `user-${Date.now()}`,
      email: email,
      name: email.split("@")[0].toUpperCase().replace(".", " ") || "Valued User",
      role: detectedRole,
      avatar: DEMO_USERS[detectedRole].avatar,
      assignedTeacher: detectedRole === "student" ? "Ustadha Fatima Al-Zahra" : undefined,
      course: detectedRole === "student" ? "Noorani Qaida & Basic Tajweed" : "Quranic Arabic",
    };

    setUser(loggedInUser);
    setRole(detectedRole);
    localStorage.setItem("maqsad_auth_user", JSON.stringify(loggedInUser));
    return true;
  };

  const logout = () => {
    signOutSupabase();
    setUser(null);
    setRole(null);
    localStorage.removeItem("maqsad_auth_user");
  };

  // Admissions logic
  const approveAdmission = (id: string, teacherName?: string) => {
    setAdmissions((prev) =>
      prev.map((adm) =>
        adm.id === id
          ? {
              ...adm,
              status: "approved",
              assigned_teacher_name: teacherName || "Ustadha Fatima Al-Zahra",
            }
          : adm
      )
    );
  };

  const rejectAdmission = (id: string) => {
    setAdmissions((prev) =>
      prev.map((adm) => (adm.id === id ? { ...adm, status: "rejected" } : adm))
    );
  };

  const addAdmission = (item: Omit<AdmissionItem, "id" | "created_at" | "status">) => {
    const newAdm: AdmissionItem = {
      ...item,
      id: `adm-${Date.now()}`,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    setAdmissions((prev) => [newAdm, ...prev]);
  };

  // Attendance logic
  const markAttendance = (record: Omit<AttendanceItem, "id" | "created_at">) => {
    const newRecord: AttendanceItem = {
      ...record,
      id: `att-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setAttendance((prev) => [newRecord, ...prev]);
  };

  // Homework logic
  const addHomework = (item: Omit<HomeworkItem, "id" | "created_at" | "status">) => {
    const newHw: HomeworkItem = {
      ...item,
      id: `hw-${Date.now()}`,
      status: "assigned",
      created_at: new Date().toISOString(),
    };
    setHomework((prev) => [newHw, ...prev]);
  };

  const submitHomework = (id: string, text: string) => {
    setHomework((prev) =>
      prev.map((hw) =>
        hw.id === id
          ? {
              ...hw,
              status: "submitted",
              submission_text: text,
            }
          : hw
      )
    );
  };

  const gradeHomework = (id: string, feedback: string, grade: string) => {
    setHomework((prev) =>
      prev.map((hw) =>
        hw.id === id
          ? {
              ...hw,
              status: "reviewed",
              teacher_feedback: feedback,
              grade: grade,
            }
          : hw
      )
    );
  };

  // Zoom Links logic
  const addZoomLink = (link: Omit<ZoomLinkItem, "id" | "created_at">) => {
    const newLink: ZoomLinkItem = {
      ...link,
      id: `zoom-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setZoomLinks((prev) => [newLink, ...prev]);
  };

  const toggleZoomLink = (id: string) => {
    setZoomLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, is_active: !l.is_active } : l))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        demoLogin,
        logout,
        admissions,
        approveAdmission,
        rejectAdmission,
        addAdmission,
        attendance,
        markAttendance,
        homework,
        addHomework,
        submitHomework,
        gradeHomework,
        zoomLinks,
        addZoomLink,
        toggleZoomLink,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
