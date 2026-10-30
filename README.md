# DEVVERSE — Explore My Universe
> **A Cinematic Developer Portfolio for Akshatha**  
> *MCA Student | Aspiring Software Developer & Cloud Engineer*

![DEVVERSE Badge](https://img.shields.io/badge/DEVVERSE-Portfolio-FF7A00?style=for-the-badge&logo=saturn)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge)

---

## 🪐 About The Experience

**DEVVERSE** is a bespoke, cinematic developer portfolio inspired by planetary orbits, deep space aesthetics, and Saturn. Designed to showcase engineering capability with clarity and visual prestige.

### ✨ Signature Features
1. **Interactive 3D Saturn Planetary System**:
   - Continuously rotating spherical cloud bands with dynamic atmospheric terminator shading.
   - Multiple elliptical orbital rings with independent differential speeds and true 3D front/back depth occlusion.
   - Luminous satellites (Titan & Enceladus) navigating interactive orbital trajectories.
   - Atmospheric amber corona glow (`#FF7A00`) and cursor parallax tracking.
2. **Dynamic Deep Space Starfield**:
   - Multi-layered canvas-driven twinkling stars, colored celestial dust, subtle cosmic drift, and periodic shooting star comets.
3. **Featured Engineering Projects**:
   - **Microfinance Loan Approval & Risk-Based Management System** (PHP, MySQL, JavaScript, HTML5/CSS3, Bootstrap, OpenStreetMap API, Razorpay).
   - **ForkRoute — Smart Restaurant Management System** (Java, Android Studio, Firebase, Razorpay).
   - Direct verified LinkedIn profile buttons (`https://www.linkedin.com/in/akshatha-shridhar-hande-5697b4343/`).
   - Detailed modal case studies with problem analysis, architectural blueprints, and key metrics.
4. **My Technology Universe**:
   - Categorized skills grid across Programming Languages, Frontend, Backend & Databases, Tools & Integrations, Core Computer Science, and Cloud Computing.
   - Interactive supplementary **Cosmic Orbit View**.
5. **My Journey & Milestones**:
   - Constellation timeline featuring MCA at Poornaprajna Institute (9.02 CGPA), BCA at Bhandarkars' College (8.95 CGPA), NPTEL Cloud Computing Certification (2026), and Rajya Puraskar Governor's Award.
6. **Transmission Hub (Contact Station)**:
   - One-click "Copy Email" with feedback notification, direct `mailto:` integration, verified phone and location, and direct PDF résumé download.

---

## 🚀 Quick Start (Local Development)

```bash
# Navigate to the project directory
cd "C:\Users\Akshatha S\.gemini\antigravity\scratch\devverse"

# Start the Vite development server
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 🛠️ Production Build

```bash
# Compile and optimize for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 🌐 Deploy to Vercel

### Option 1: Using Vercel CLI (Recommended & Fastest)
```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Deploy directly from the project directory
cd "C:\Users\Akshatha S\.gemini\antigravity\scratch\devverse"
vercel
```
Follow the interactive prompts:
- **Set up and deploy?**: `y`
- **Which scope?**: (Select your account)
- **Link to existing project?**: `N`
- **What’s your project’s name?**: `devverse-akshatha`
- **In which directory is your code located?**: `./`
- **Want to modify settings?**: `N`

Your portfolio will be live on an HTTPS URL in seconds!

### Option 2: Deploying via GitHub & Vercel Dashboard
1. Initialize a Git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: launch DEVVERSE portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/devverse.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `devverse` repository.
4. Click **"Deploy"** (Vercel automatically detects Vite).

---

## 📁 Key File Locations & Configuration

- **Resume PDF**: `public/resume.pdf` (Already configured with Akshatha's resume).
- **Configuration & Data**: `src/data/portfolioData.js` (Centralized links, projects, and bio).
- **Saturn Planet Component**: `src/components/SaturnPlanet.jsx` & `src/components/SaturnPlanet.css`.
- **Cosmic Theme Tokens**: `src/index.css`.
