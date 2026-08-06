# 🕌 Maqsad-e-Quran Academy - Complete Deployment & Operations Handbook

Welcome to the official deployment, API integration, and operations guide for **Maqsad-e-Quran Academy**. This document provides step-by-step instructions for launching the platform on **Vercel**, connecting cloud services (Supabase, Firebase, Resend, WhatsApp, Zoom, Payments), and managing daily academy operations.

---

## 📌 Table of Contents
1. [Prerequisites & Stack Overview](#1-prerequisites--stack-overview)
2. [Step 1: Database Setup (Supabase & Firebase)](#step-1-database-setup-supabase--firebase)
3. [Step 2: Vercel One-Click Deployment](#step-2-vercel-one-click-deployment)
4. [Step 3: Environment Variables Configuration](#step-3-environment-variables-configuration)
5. [Step 4: Custom Domain & DNS Setup](#step-4-custom-domain--dns-setup)
6. [Step 5: API Integrations Setup](#step-5-api-integrations-setup)
   - [Resend Email Dispatch](#a-resend-email-dispatch)
   - [WhatsApp Business API](#b-whatsapp-business-api)
   - [Zoom OAuth API](#c-zoom-oauth-api)
   - [Stripe & PayPal Gateways](#d-stripe--paypal-gateways)
7. [Step 6: Admin Operational Handbook](#step-6-admin-operational-handbook)
   - [Managing Student Admissions](#managing-student-admissions)
   - [Assigning Teachers & Schedules](#assigning-teachers--schedules)
   - [Generating PDF Certificates](#generating-pdf-certificates)
   - [Generating Monthly Report Cards](#generating-monthly-report-cards)
   - [Managing Teacher Salaries & Payslips](#managing-teacher-salaries--payslips)
8. [Step 7: Social Media & Marketing Playbook](#step-7-social-media--marketing-playbook)

---

## 1. Prerequisites & Stack Overview

- **Frontend & App Framework**: Next.js 16 (App Router, React 19, TypeScript, Tailwind CSS v4)
- **Database**: Supabase PostgreSQL (Relational LMS Data) + Firebase Firestore (NoSQL Trial Requests)
- **Storage & Auth**: Supabase Auth + Local Storage context
- **Email Service**: Resend API
- **Messaging**: Meta WhatsApp Business Cloud API v18.0
- **Virtual Classrooms**: Zoom OAuth API
- **Payments**: Stripe Checkout, PayPal REST API, Wise, Payoneer, JazzCash, Easypaisa
- **Hosting**: Vercel Serverless & Edge Network

---

## Step 1: Database Setup (Supabase & Firebase)

### A. Supabase PostgreSQL Schema
1. Log in to [Supabase Console](https://supabase.com/dashboard) and create a new project.
2. Navigate to **SQL Editor** in the left sidebar.
3. Open [`supabase/schema.sql`](file:///d:/Asad-Ali/maqsad-e-quran-academy/supabase/schema.sql) in your repository, copy its contents, paste them into the SQL Editor, and click **Run**.
4. This creates tables for `students`, `teachers`, `courses`, `chat_logs`, `faqs`, `profiles`, `admissions`, `attendance`, `homework`, and `zoom_links` with Row Level Security (RLS) enabled.

### B. Firebase Firestore Setup
1. Log in to [Firebase Console](https://console.firebase.google.com/).
2. Select or create project `maqsad-e-quran-academy`.
3. Go to **Firestore Database** -> **Create Database** (Start in production mode).
4. Create collections: `trialRequests` and `admissions`.

---

## Step 2: Vercel One-Click Deployment

1. Push your repository to GitHub (`git push origin main`).
2. Log in to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New Project**.
3. Select your GitHub repository (`maqsad-e-quran-academy`).
4. Framework Preset will automatically detect **Next.js**.
5. Expand **Environment Variables** and paste the keys listed in Step 3 below.
6. Click **Deploy**.

---

## Step 3: Environment Variables Configuration

Refer to [`.env.example`](file:///d:/Asad-Ali/maqsad-e-quran-academy/.env.example) in your project repository:

```env
# Application Base URL
NEXT_PUBLIC_APP_URL=https://maqsadquran.com

# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Gemini AI Key
GEMINI_API_KEY=your-gemini-api-key

# Resend Email Key
RESEND_API_KEY=re_your_resend_api_key

# WhatsApp Meta Cloud API
WHATSAPP_TOKEN=EAAG...
WHATSAPP_PHONE_NUMBER_ID=123456789
WHATSAPP_VERIFY_TOKEN=maqsad_quran_secure_webhook_token

# Zoom Server-to-Server OAuth Credentials
ZOOM_ACCOUNT_ID=your_zoom_account_id
ZOOM_CLIENT_ID=your_zoom_client_id
ZOOM_CLIENT_SECRET=your_zoom_client_secret

# Stripe Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal Payments
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

---

## Step 4: Custom Domain & DNS Setup

1. In Vercel Project Settings, navigate to **Domains**.
2. Add your domain `maqsadquran.com` and `www.maqsadquran.com`.
3. In your Domain Registrar (Cloudflare, GoDaddy, Namecheap), add the following DNS records:
   - **A Record**: `@` -> `76.76.21.21`
   - **CNAME Record**: `www` -> `cname.vercel-dns.com`
4. SSL certificates will issue automatically within 5 minutes.

---

## Step 5: API Integrations Setup

### A. Resend Email Dispatch
1. Log in to [Resend.com](https://resend.com), add domain `maqsadquran.com`, and verify DNS records (DKIM & SPF).
2. Generate an API Key and save it as `RESEND_API_KEY`.
3. All student enrollment emails will automatically send from `admissions@maqsadquran.com`.

### B. WhatsApp Business API
1. Create an app in [Meta Developers Portal](https://developers.facebook.com/) with product **WhatsApp**.
2. Add Webhook URL: `https://maqsadquran.com/api/whatsapp/webhook` with Verify Token `maqsad_quran_secure_webhook_token`.
3. Fill `WHATSAPP_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` in Vercel.

### C. Zoom OAuth API
1. Create a **Server-to-Server OAuth App** at [Zoom Marketplace](https://marketplace.zoom.us/).
2. Enable Scopes: `meeting:write:admin`, `meeting:read:admin`.
3. Save `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET` in environment variables.

---

## Step 6: Admin Operational Handbook

### Managing Student Admissions
1. Log in to `/login` using Admin credentials or 1-Click Demo Login.
2. Select **Pending Admissions** tab in `/dashboard/admin`.
3. Click **Approve & Assign Tutor** to match student with a male or female teacher.

### Generating PDF Certificates
1. Navigate to `/dashboard/admin` -> **Certificates** tab.
2. Select student name, course (Noorani Qaida, Tajweed, Hifz, Tafseer), completion date, and honor distinction.
3. Click **Download PDF Certificate** to save high-resolution landscape certificate (`Certificate_[Name].pdf`).

### Generating Monthly Report Cards
1. Navigate to `/dashboard/admin` or `/dashboard/teacher` -> **Report Cards** tab.
2. Select student and enter attendance %, Makharij score, Tajweed score, and teacher remarks.
3. Click **Export PDF Report Card**.

### Managing Teacher Salaries & Payslips
1. Navigate to `/dashboard/admin` -> **Salary & Financials** tab.
2. View monthly teacher payouts, base rates, bonuses, and payment status.
3. Click **Generate Payslip PDF** to issue official payslips for teachers.

---

## Step 7: Social Media & Marketing Playbook

### Dynamic Social Share Previews (Open Graph)
When sharing website links on WhatsApp, Facebook, LinkedIn, or Twitter, dynamic preview images are rendered automatically via `/api/og?title=...`.

### Social Media Profile Links:
- **Facebook**: `https://facebook.com/maqsadquran`
- **Instagram**: `@maqsadquran`
- **YouTube**: `Maqsad-e-Quran Academy`
- **WhatsApp Support**: `https://wa.me/923301676985`

---

*This guide was generated for Maqsad-e-Quran Academy production deployment.*
