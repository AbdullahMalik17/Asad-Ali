import { supabase } from "./supabase";

export type UserRole = "admin" | "teacher" | "student";

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  assignedTeacher?: string;
  course?: string;
}

export interface AdmissionItem {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  course_name: string;
  preferred_schedule: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";
  assigned_teacher_name?: string;
  created_at: string;
}

export interface AttendanceItem {
  id: string;
  student_id: string;
  student_name: string;
  teacher_name: string;
  course_name: string;
  class_date: string;
  status: "present" | "absent" | "late" | "excused";
  notes?: string;
  created_at: string;
}

export interface HomeworkItem {
  id: string;
  title: string;
  description: string;
  course_name: string;
  student_id: string;
  student_name: string;
  teacher_name: string;
  due_date: string;
  status: "assigned" | "submitted" | "reviewed";
  submission_text?: string;
  teacher_feedback?: string;
  grade?: string;
  created_at: string;
}

export interface ZoomLinkItem {
  id: string;
  title: string;
  meeting_url: string;
  meeting_id?: string;
  passcode?: string;
  teacher_name: string;
  course_name: string;
  schedule_time: string;
  is_active: boolean;
  created_at: string;
}

// Initial Mock Users for Instant Portal Access
export const DEMO_USERS: Record<UserRole, UserSession> = {
  admin: {
    id: "admin-001",
    email: "admin@maqsadquran.com",
    name: "Dr. Ustadh Ahmad Al-Mansoor",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
  teacher: {
    id: "teacher-101",
    email: "teacher@maqsadquran.com",
    name: "Ustadha Fatima Al-Zahra",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    course: "Tajweed & Quran Recitation",
  },
  student: {
    id: "student-501",
    email: "student@maqsadquran.com",
    name: "Zayd Ibn Ali",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    assignedTeacher: "Ustadha Fatima Al-Zahra",
    course: "Noorani Qaida & Basic Tajweed",
  },
};

// Initial Mock Admissions
export const INITIAL_ADMISSIONS: AdmissionItem[] = [
  {
    id: "adm-101",
    full_name: "Yousuf Hamdan",
    email: "yousuf.h@example.com",
    phone: "+1 (555) 234-5678",
    country: "United States",
    course_name: "Online Hifz Program",
    preferred_schedule: "Mon/Wed/Fri - 6:00 PM EST",
    notes: "Completed 3 Juz already. Wants to complete Hifz in 2 years.",
    status: "pending",
    created_at: "2026-08-05T10:30:00Z",
  },
  {
    id: "adm-102",
    full_name: "Aisha Begum",
    email: "aisha.b@example.co.uk",
    phone: "+44 7700 900123",
    country: "United Kingdom",
    course_name: "Noorani Qaida for Beginners",
    preferred_schedule: "Tue/Thu/Sat - 5:00 PM GMT",
    notes: "Beginner level. Prefers female Quran tutor.",
    status: "approved",
    assigned_teacher_name: "Ustadha Fatima Al-Zahra",
    created_at: "2026-08-04T14:15:00Z",
  },
  {
    id: "adm-103",
    full_name: "Omar Tariq",
    email: "omar.t@example.ca",
    phone: "+1 (416) 555-0199",
    country: "Canada",
    course_name: "Quran Translation & Tafseer",
    preferred_schedule: "Sat/Sun - 10:00 AM EST",
    notes: "Adult learner looking for deep analytical understanding.",
    status: "pending",
    created_at: "2026-08-06T08:00:00Z",
  },
];

// Initial Mock Attendance
export const INITIAL_ATTENDANCE: AttendanceItem[] = [
  {
    id: "att-001",
    student_id: "student-501",
    student_name: "Zayd Ibn Ali",
    teacher_name: "Ustadha Fatima Al-Zahra",
    course_name: "Noorani Qaida & Basic Tajweed",
    class_date: "2026-08-06",
    status: "present",
    notes: "Practiced Makharij (Letters Ghain & Khaw). Excellent pronunciation.",
    created_at: "2026-08-06T09:00:00Z",
  },
  {
    id: "att-002",
    student_id: "student-501",
    student_name: "Zayd Ibn Ali",
    teacher_name: "Ustadha Fatima Al-Zahra",
    course_name: "Noorani Qaida & Basic Tajweed",
    class_date: "2026-08-04",
    status: "present",
    notes: "Reviewed Lesson 5 - Noon Sakinah rules.",
    created_at: "2026-08-04T09:00:00Z",
  },
  {
    id: "att-003",
    student_id: "student-501",
    student_name: "Zayd Ibn Ali",
    teacher_name: "Ustadha Fatima Al-Zahra",
    course_name: "Noorani Qaida & Basic Tajweed",
    class_date: "2026-08-02",
    status: "late",
    notes: "Joined 10 mins late due to internet reconnection.",
    created_at: "2026-08-02T09:10:00Z",
  },
  {
    id: "att-004",
    student_id: "student-502",
    student_name: "Maryam Siddiqui",
    teacher_name: "Ustadha Fatima Al-Zahra",
    course_name: "Tajweed & Recitation",
    class_date: "2026-08-05",
    status: "present",
    notes: "Surah Al-Mulk verse 1-10 recitation checked.",
    created_at: "2026-08-05T11:00:00Z",
  },
];

// Initial Mock Homework
export const INITIAL_HOMEWORK: HomeworkItem[] = [
  {
    id: "hw-201",
    title: "Memorize Surah Al-Mulk Verses 1-5",
    description: "Listen to Sheikh Minshawi recitation 3 times and practice correct Makharij for Al-Qamar.",
    course_name: "Noorani Qaida & Basic Tajweed",
    student_id: "student-501",
    student_name: "Zayd Ibn Ali",
    teacher_name: "Ustadha Fatima Al-Zahra",
    due_date: "2026-08-08",
    status: "submitted",
    submission_text: "Assalamu Alaikum Teacher, I have practiced and recorded my audio recitation. Ready for live testing in next class.",
    teacher_feedback: "Ma sha Allah, great pronunciation of Qalqalah letters!",
    grade: "A+",
    created_at: "2026-08-04T10:00:00Z",
  },
  {
    id: "hw-202",
    title: "Noorani Qaida Exercise 7 - Tanween Exercises",
    description: "Read Page 14 aloud 5 times and write down 10 examples of Izhar from Surah An-Naba.",
    course_name: "Noorani Qaida & Basic Tajweed",
    student_id: "student-501",
    student_name: "Zayd Ibn Ali",
    teacher_name: "Ustadha Fatima Al-Zahra",
    due_date: "2026-08-10",
    status: "assigned",
    created_at: "2026-08-06T09:30:00Z",
  },
];

// Initial Mock Zoom Links
export const INITIAL_ZOOM_LINKS: ZoomLinkItem[] = [
  {
    id: "zoom-301",
    title: "Daily 1-on-1 Quran Session (Live Studio 1)",
    meeting_url: "https://zoom.us/j/9876543210?pwd=MaqsadQuran2026",
    meeting_id: "987 654 3210",
    passcode: "Maqsad2026",
    teacher_name: "Ustadha Fatima Al-Zahra",
    course_name: "Noorani Qaida & Basic Tajweed",
    schedule_time: "Mon to Fri | 09:00 AM - 10:00 AM EST",
    is_active: true,
    created_at: "2026-08-01T00:00:00Z",
  },
  {
    id: "zoom-302",
    title: "Weekend Tafseer & Translation Masterclass",
    meeting_url: "https://zoom.us/j/1234567890?pwd=TafseerQuran",
    meeting_id: "123 456 7890",
    passcode: "Tafseer2026",
    teacher_name: "Dr. Ustadh Ahmad Al-Mansoor",
    course_name: "Quran Translation & Tafseer",
    schedule_time: "Saturday & Sunday | 04:00 PM GMT",
    is_active: true,
    created_at: "2026-08-01T00:00:00Z",
  },
];

// Supabase Auth Helper Functions
export async function signInWithSupabase(email: string, pass: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) throw error;
    return data;
  } catch (err: any) {
    console.warn("Supabase Auth notice:", err.message || err);
    return null;
  }
}

export async function signOutSupabase() {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn("Supabase signOut error:", err);
  }
}
