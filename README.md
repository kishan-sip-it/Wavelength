<div align="center">

# 〰️ Wavelength

### Find your frequency.

A frontend-only signup wizard replica — landing → terms → verification → progressive profile setup → success.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Poppins](https://img.shields.io/badge/Font-Poppins-black)](https://fonts.google.com/specimen/Poppins)

</div>

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Flow](#-flow)
- [Features](#-features)
- [Deliberate Improvements](#-deliberate-improvements)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Demo Notes](#-demo-notes)

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:5173**

<details>
<summary><strong>Build for production</strong></summary>

```bash
npm run build
npm run preview
```
</details>

---

## 🧭 Flow

```
Landing  →  Terms  →  Location  →  Signup Intro
   │
   ▼
Email  →  OTP  →  Username  →  Name  →  Date of Birth  →  Pronouns  →  Invite Code
   │
   ▼
Success  →  Dashboard
```

---

## ✨ Features

<details open>
<summary><strong>Core wizard</strong></summary>

- Multi-step progressive disclosure with back-navigation history
- Profile details (Username, Name, DOB, Pronouns) collected only after email verification
- Animated screen transitions between every step

</details>

<details open>
<summary><strong>Validation & UX</strong></summary>

| Behavior | Where |
|---|---|
| Real-time on-blur/on-change validation | Every field |
| Contextual inline error messages | Every field |
| Global toast alerts | OTP failure, pronoun limit, sign-up success |
| Character limits + whitespace rejection | Username, Name, Invite code |
| Numeric-only input | OTP, DOB |
| Loading spinner on submit | Email, OTP, Username, Invite |
| Auto-advance / auto-back / paste support | OTP boxes |

</details>

---

## 🛠 Deliberate Improvements

> Beyond direct replication — issues identified and fixed:

- [x] **OTP screen redesigned** — auto-advancing boxes, paste support, resend cooldown timer, shake feedback on wrong code
- [x] **Under-18 signups blocked** — Date of Birth field calculates real age and stops signup with a clear message
- [x] **Pronoun selector modernized** — glowing pill chips instead of default checkboxes
- [x] **Mountain hero animates** — the landing silhouette flutters like a waving flag, not a static shape
- [x] **"Maybe later" isn't a dead end** — dismissible prompt with a persistent re-entry point

---

## 🧱 Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Font | Poppins |
| State | `useReducer` + Context (`WizardContext`) — no external state library needed |
| Icons | lucide-react |

---

## 📂 Project Structure

```
src/
├── components/       # Logo, Buttons, FieldInput, Toast, MountainDivider, WizardHeader...
├── context/          # WizardContext.jsx — screen history + form data
├── pages/            # One file per screen/step
├── utils/
│   └── validators.js # Centralized validation rules
└── App.jsx           # Screen router
```

---

## 🎬 Demo Notes

> [!NOTE]
> This is a **frontend-only** exercise — no real backend exists.

- OTP demo code: **`123456`** (shown on-screen, clearly labeled)
- All "submissions" are simulated with a timed delay
- **Restart demo** button available on the Dashboard screen
