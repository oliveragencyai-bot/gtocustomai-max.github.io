# GTO Custom Automation Course Platform

AI Automation Fundamentals course website with Firebase authentication and Stripe payment integration.

## Structure

- `index.html` — Main landing page
- `course/index.html` — Course sales page
- `register.html` — User registration
- `login.html` — User login
- `dashboard.html` — Student dashboard
- `module.html` — Lesson viewer
- `payment-success.html` — Post-payment page
- `js/auth.js` — Firebase authentication
- `js/course-content.js` — Course modules and lessons
- `js/stripe-checkout.js` — Stripe integration
- `firebase-config.js` — Firebase configuration (requires setup)

## Setup Required

1. **Firebase Project**
   - Create project at console.firebase.google.com
   - Enable Email/Password authentication
   - Create Firestore database
   - Update `firebase-config.js` with your config

2. **Stripe**
   - Product and Payment Link already created
   - For webhook integration, set up Firebase Cloud Functions

3. **Video Hosting**
   - Upload videos to YouTube as unlisted
   - Update video URLs in course content

## Deployment

This site is deployed to GitHub Pages at: https://gtocustomai-max.github.io/

---

**GTO Custom Automation Innovations**
*Automation-First Solutions for Modern Business*