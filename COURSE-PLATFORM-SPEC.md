# Course Platform Specification

## Overview

Custom course website with full control, no monthly platform fees. Two sales channels funneling into one registration/course system.

## Sales Channels

### Path 1 — Gumroad
- Customer finds course on Gumroad
- Pays on Gumroad
- Gumroad redirects to registration page on course site
- Student creates account → immediate access to dashboard

### Path 2 — Landing Page (Stripe)
- Customer lands on course sales page
- Clicks buy button
- Pays via Stripe (embedded on site)
- After successful payment → redirect to registration page
- Student creates account → immediate access to dashboard

## Registration Page

Single entry point for both paths:
- Student creates username and password
- Immediate access to student dashboard
- Module 1 unlocked and ready

## Student Dashboard

- Shows all 6 modules
- Progress tracking (which lessons completed, which modules unlocked)
- Resume where they left off

## Module Structure

Each module contains, in order:
1. **Video lesson + slides** (at top)
2. **Lesson content** (written material, lessons 1-5 per module)
3. **Downloadable worksheet**
4. **Slides** (reference resource)
5. **Quiz** (at end, must pass to unlock next module)

## Progress System

- Progress saved automatically
- Sequential unlocking (complete quiz to unlock next module)
- Quiz scores recorded (pass/fail)
- Content can be all-at-once OR dripped week-by-week (TBD)

## Infrastructure

**Hybrid Architecture — Zero Hosting Costs**

- **GitHub Pages** → Static frontend (HTML/CSS/JS, lesson content, embedded videos)
- **Firebase** → Backend (user auth, progress tracking, quiz scores, data storage)

Course content (lessons, quizzes, materials) stored as static files on GitHub Pages. Firebase handles all dynamic logic. Completely free hosting.

### Firebase Services Used

- **Authentication** — Email/password login, password reset
- **Firestore** — User progress, quiz scores, module unlocks

### Data Storage

- **User credentials** — Firebase/Supabase auth (encrypted, we never see plain text)
- **Student progress** — modules unlocked, lessons completed, tied to user account
- **Quiz scores** — each attempt, pass/fail status, unlocks next module

## Questions to Resolve

1. **Firebase or Supabase?** ✅ Firebase selected
2. **Content drip (week by week) or all available at once?** ✅ Progressive unlock (complete module → unlock next)
3. **Video hosting solution?** ✅ YouTube unlisted
4. **Custom domain ready, or need to set one up?** ✅ Using GitHub Pages
5. **Email for login credentials (transactional email service needed)?** ⏳ Using gto.custom.a.i@gmail.com — need to set up email automation

---

## Implementation Status

### ✅ Completed

**Infrastructure:**
- Firebase configuration (`firebase-config.js`)
- Authentication system with registration, login, password reset (`js/auth.js`)
- Progress tracking with Firestore (`js/auth.js`)
- Stripe checkout integration (`js/stripe-checkout.js`)
- Course content data structure (`js/course-content.js`)

**Pages:**
- `register.html` — User registration with Firebase Auth
- `login.html` — User login with Firebase Auth
- `dashboard.html` — Student dashboard showing progress, modules, stats
- `module.html` — Lesson viewer with video placeholder, content, quizzes

**Sales Page:**
- Updated `course/index.html` with Stripe payment link integration
- Enrollment button checks login state before purchase

**Brand:**
- Scrubbed all "The Oliver Agency" references → "GTO Custom Automation Innovations"

### ⏳ Remaining Work

1. **Firebase Project Setup**
   - Create Firebase project at console.firebase.google.com
   - Enable Email/Password authentication
   - Create Firestore database
   - Copy config to `firebase-config.js`

2. **Stripe Webhook (for automatic access grant)**
   - Set up Stripe webhook to Firebase Cloud Function
   - OR use Stripe Payment Link with manual access grant

3. **Video Hosting**
   - Upload course videos to YouTube as unlisted
   - Update video URLs in course content

4. **Domain Update**
   - GitHub Pages repo still uses "oliveragencyai-bot" name
   - Consider creating new "gtoautomation.github.io" repo

5. **Email Automation**
   - Set up transactional emails (welcome, password reset)
   - Options: Firebase Extensions, SendGrid, or Postmark

---

**Created:** March 9, 2026