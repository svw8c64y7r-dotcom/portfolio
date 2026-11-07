# Sri Ragav Surya A — Cybersecurity Professional Portfolio

> **"Securing Digital Infrastructure. One Vulnerability at a Time."**

A premium, highly interactive, production-ready cybersecurity portfolio website built for **Sri Ragav Surya A** (Cybersecurity Professional, Security Researcher, Penetration Tester, SOC Analyst, DFIR & GRC Specialist).

Designed following modern cybersecurity dashboard aesthetics and developer portfolios with deep dark background (`#110720`), neon borders (`#00FF9C`, `#00D9FF`, `#8B5CF6`), glassmorphism, responsive components, and an authentic Figma design architecture.

---

## 🛡️ Technical Architecture & Stack

- **Core Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/) (Sub-second HMR & optimized production bundling)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with custom cyber design tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: CSS3 hardware-accelerated transitions & keyframes
- **Deployment Target**: [Vercel](https://vercel.com/) with custom security response headers

---

## 🚀 Key Features & Sections

1. **Sticky Navigation Bar (`Navbar.tsx`)**:
   - Active section highlighting based on scroll spy
   - Mobile-responsive navigation drawer
   - One-click access to the authentic uploaded resume PDF and social channels
2. **Hero Section (`Hero.tsx`)**:
   - Iconic pointer header (`arrow.png`) with *"Hello! I Am Sri Ragav Surya A"*
   - Layered character graphic with glowing background (`me.png` + `me-glow.png`)
   - Highlighted headline with circular badge (`circle.png`): *"Securing Digital Infrastructure. One Vulnerability at a Time."*
   - Animated typing rotator cycling through key security identities
   - Verified credential badges: 4th Place International CTF, Top 50 DEFCON CTF, M.Sc. Forensics (8.3 CGPA), Cyber Security Engineer @ Pitowings
3. **About Me (`About.tsx`)**:
   - Complete personal narrative and background
   - Visual security ecosystem banner (`illustration.png`)
   - Career interests & core competency pillars
   - Academic & industry milestone journey
4. **Interactive Skills Dashboard (`Skills.tsx`)**:
   - Categorized across 6 domains: Offensive Security, Defensive Security, DFIR, GRC, Programming, and Automation
   - Real-time search query filtering
   - Proficiency tags (Core Competency, Advanced, Proficient, Hands-On) without arbitrary fake percentages
5. **Professional Work Experience (`Experience.tsx`)**:
   - Cyber Security Engineer at **Pitowings** (Feb 2025 – May 2025)
   - Detailed VAPT, OWASP Top 10, PoC documentation, and developer remediation
   - Feature cards with signature purple glow gradients and icons (`card-1.png` to `card-4.png`)
6. **Projects & Laboratory Portfolio (`Projects.tsx`)**:
   - Alternating staggered 2-column showcase with overlapping glassmorphic cards
   - **Project 1**: Advanced Web Vulnerability Scanner (2026, Python, Requests, BeautifulSoup, crawler, SQLi/XSS/Traversal detection)
   - **Project 2**: Epoteck Full-Stack Website (2026, Java, Spring Framework, REST APIs, Secure Coding)
   - **Projects 3, 4, 5**: Practical VAPT Assessment, Digital Forensics Lab, and SOC Monitoring Lab
   - Filter pills (All, Security Software, Practical Labs) + detailed modal inspector
7. **CTF & Competitive Achievements (`Achievements.tsx`)**:
   - 4th Place — International-Level CTF (Karunya Institute of Technology and Science)
   - Top 50 — DEFCON CTF
   - National-Level CTF Practice (PicoCTF, Hack The Box, TryHackMe)
8. **Certifications Gallery (`Certifications.tsx`)**:
   - Certified Social Engineering Defense Practitioner (SecOps Group)
   - CompTIA Network+ & A+
   - Python Programming & Java Programming (Udemy)
   - Full-Stack Web Development (Udemy)
9. **Academic Qualifications (`Education.tsx`)**:
   - M.Sc. Information Security & Digital Forensics (Karunya, 2025–2027, CGPA: 8.3 / 10)
   - B.Sc. Information Security & Digital Forensics (Karunya, 2022–2025, CGPA: 6.0 / 10)
10. **Security Research Blueprints (`Research.tsx`)**:
    - Publication blueprints for upcoming whitepapers, CTF write-ups, and DFIR analyses
11. **Interactive Cyber Terminal (`Terminal.tsx` & `TerminalSection.tsx`)**:
    - Simulated CLI `ragav@cybersecurity:~$`
    - Supported commands: `help`, `about`, `skills`, `projects`, `experience`, `achievements`, `certifications`, `education`, `github`, `linkedin`, `contact`, `resume`, `clear`, `banner`, `status`
    - History navigation (Up/Down arrows), tab completion, quick-command chips
    - Safe non-eval simulation
12. **GitHub Integration (`GithubSection.tsx`)**:
    - Live fetch from GitHub REST API for `svw8c64y7r-dotcom`
    - Graceful fallback to verified curated cards if offline or rate-limited
13. **Contact Section (`Contact.tsx`)**:
    - Direct verified coordinates (Email, Phone, Location, Profiles)
    - Interactive contact form with validation and mailto dispatch
14. **Official Resume Vault (`ResumeModal.tsx`)**:
    - Embeds and serves the user's authentic resume PDF (`/resume/Sri_Ragav_Surya_Resume.pdf`)
    - In-browser preview + one-click download

---

## 💻 Local Development Instructions

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/svw8c64y7r-dotcom/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be live at `http://localhost:5173`.

---

## 🔨 Production Build & Verification

```bash
# Type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

Output assets are generated in `dist/`.

---

## 🌐 Vercel Deployment Guide

1. Push code to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial release: Sri Ragav Surya A cybersecurity portfolio"
   git remote add origin https://github.com/svw8c64y7r-dotcom/<repo-name>.git
   git push -u origin main
   ```
2. Import project into [Vercel](https://vercel.com):
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy**. The included `vercel.json` ensures full client-side routing and security headers automatically.

---

## 👤 Personal & Contact Coordinates

- **Name**: Sri Ragav Surya A
- **Location**: Coimbatore, Tamil Nadu, India
- **Email**: [sriragavsurya@gmail.com](mailto:sriragavsurya@gmail.com)
- **Phone**: +91 8870726999
- **LinkedIn**: [linkedin.com/in/sri-ragav-surya](https://linkedin.com/in/sri-ragav-surya)
- **GitHub**: [github.com/svw8c64y7r-dotcom](https://github.com/svw8c64y7r-dotcom)

