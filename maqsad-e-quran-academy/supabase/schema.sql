-- ========================================================
-- MAQSAD-E-QURAN ACADEMY - SUPABASE DATABASE SCHEMA & RLS
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & ROLES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT CHECK (role IN ('admin', 'teacher', 'student')) DEFAULT 'student',
    avatar_url TEXT,
    phone TEXT,
    country TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    country TEXT,
    learning_goals TEXT,
    preferred_schedule TEXT,
    assigned_teacher_id UUID,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TEACHERS TABLE
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    slug TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE,
    gender TEXT CHECK (gender IN ('male', 'female')),
    qualification TEXT,
    ijazah_certified BOOLEAN DEFAULT false,
    specializations TEXT[],
    languages_spoken TEXT[],
    bio TEXT,
    profile_image_url TEXT,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    category TEXT,
    duration TEXT,
    monthly_price NUMERIC(10, 2),
    currency TEXT DEFAULT 'USD',
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),
    features TEXT[],
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ADMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.admissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT,
    course_name TEXT NOT NULL,
    preferred_schedule TEXT,
    notes TEXT,
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    assigned_teacher_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    teacher_name TEXT NOT NULL,
    course_name TEXT NOT NULL,
    class_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT CHECK (status IN ('present', 'absent', 'late', 'excused')) DEFAULT 'present',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. HOMEWORK TABLE
CREATE TABLE IF NOT EXISTS public.homework (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    course_name TEXT NOT NULL,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    teacher_name TEXT NOT NULL,
    due_date DATE NOT NULL,
    status TEXT CHECK (status IN ('assigned', 'submitted', 'reviewed')) DEFAULT 'assigned',
    submission_text TEXT,
    teacher_feedback TEXT,
    grade TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. ZOOM LINKS TABLE
CREATE TABLE IF NOT EXISTS public.zoom_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    meeting_url TEXT NOT NULL,
    meeting_id TEXT,
    passcode TEXT,
    teacher_name TEXT NOT NULL,
    course_name TEXT NOT NULL,
    schedule_time TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. CHAT LOGS TABLE (FOR GEMINI AI STUDENT ASSISTANT)
CREATE TABLE IF NOT EXISTS public.chat_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE SET NULL,
    session_id TEXT,
    user_message TEXT NOT NULL,
    bot_response TEXT NOT NULL,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. FAQS TABLE (FOR PROGRAMMATIC SEO)
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT,
    keywords TEXT[],
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zoom_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public teachers are viewable by everyone" ON public.teachers FOR SELECT USING (is_active = true);
CREATE POLICY "Public courses are viewable by everyone" ON public.courses FOR SELECT USING (is_published = true);
CREATE POLICY "Public FAQs are viewable by everyone" ON public.faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public zoom links viewable by authenticated users" ON public.zoom_links FOR SELECT USING (true);

-- ADMISSIONS INSERT & READ POLICIES
CREATE POLICY "Allow public admissions insert" ON public.admissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admissions read" ON public.admissions FOR SELECT USING (true);

-- ATTENDANCE READ/WRITE POLICIES
CREATE POLICY "Allow attendance select" ON public.attendance FOR SELECT USING (true);
CREATE POLICY "Allow attendance insert" ON public.attendance FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow attendance update" ON public.attendance FOR UPDATE USING (true);

-- HOMEWORK READ/WRITE POLICIES
CREATE POLICY "Allow homework select" ON public.homework FOR SELECT USING (true);
CREATE POLICY "Allow homework insert" ON public.homework FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow homework update" ON public.homework FOR UPDATE USING (true);

-- CHAT LOG & STUDENT REGISTRATION
CREATE POLICY "Allow public insert into chat_logs" ON public.chat_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow student registration insert" ON public.students FOR INSERT WITH CHECK (true);
