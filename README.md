# Corporate Affairs Portal - Government of India (Demo)

Authentic and accessible Indian Government-style Ministry information website inspired by the Ministry of Corporate Affairs (MCA) on India.gov.in.

---

## 🚀 GitHub Actions par Deploy karne ka Tareeka (Step-by-Step Guide)

Aapki website me GitHub Actions se automatic deploy hone ka workflow already configure kar diya gaya hai (`.github/workflows/deploy.yml`).

### Step 1: Code ko GitHub Repository me Push karein
Apne project ko GitHub repository me commit aur push karein:

```bash
git init
git add .
git commit -m "Initial commit for MCA portal"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

---

### Step 2: GitHub Pages Settings me "GitHub Actions" enable karein
1. Apne GitHub repository me jayein.
2. **Settings** tab par click karein.
3. Left sidebar me **Pages** par click karein.
4. **Build and deployment** section me:
   - **Source** dropdown me **`GitHub Actions`** select karein.
5. Save karein.

---

### Step 3: Automatic Deployment
- Jaise hi aap code `main` ya `master` branch par push karenge, GitHub Actions workflow automatically chalega.
- Aap **Actions** tab me ja kar live build aur deployment progress dekh sakte hain.
- Kuch hi seconds me aapki website live ho jayegi:
  `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

> **Note on Base Path:** `vite.config.ts` me `base: './'` configure kiya gaya hai, isliye chahe aapka repo subfolder me ho ya custom domain par, sabhi CSS, JS aur assets bilkul sahi load honge.

---

## 💻 Local Development

```bash
# Dependencies install karein
npm install

# Local dev server chalayein (Port 3000)
npm run dev

# Production build generate karein (dist folder me)
npm run build

# TypeScript validation karein
npm run lint
```
