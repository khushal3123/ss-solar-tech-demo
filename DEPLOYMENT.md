# Hosting & Deployment Guide — SS Solar

This project is pre-configured for one-click deployment to **Vercel**, **Netlify**, and **Google AI Studio / Cloud Run**.

---

## Step 1: Export or Sync to GitHub from Google AI Studio

1. If your preview is in fullscreen mode (`fullscreenApplet=true` in the browser URL), click the **Exit Fullscreen** icon (four inward-pointing corners at the far right of the top bar, next to `Device` and Reload).
2. In the top toolbar of Google AI Studio Build:
   - Click the **GitHub** icon to push/sync directly to your GitHub repository, **OR**
   - Click **Download ZIP**, extract the folder on your computer, and push to your GitHub repository:
     ```bash
     git init
     git add .
     git commit -m "Initial production release of SS Solar"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<your-repo>.git
     git push -u origin main
     ```

---

## Step 2A: Host on Netlify (via GitHub)

1. Log in to [app.netlify.com](https://app.netlify.com).
2. Click **Add new site** → **Import an existing project** → **GitHub**.
3. Select your **SS Solar** repository.
4. Netlify automatically detects `netlify.toml` with:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `22`
5. (Optional) Under **Site configuration → Environment variables**, set:
   - `NEXT_PUBLIC_SITE_URL` = your production URL (e.g., `https://ss-solar.netlify.app`)
6. Click **Deploy site**.

---

## Step 2B: Host on Vercel (via GitHub)

1. Log in to [vercel.com/new](https://vercel.com/new).
2. Click **Import** next to your **SS Solar** GitHub repository.
3. Vercel automatically reads `vercel.json` (`Framework Preset: Next.js`, `Build Command: npm run build`).
4. (Optional) Add environment variable `NEXT_PUBLIC_SITE_URL` with your production domain.
5. Click **Deploy**.

---

## Step 2C: Host Directly via Google AI Studio Share

1. Exit fullscreen preview so the main AI Studio header is visible.
2. Click **Share** / **Deploy** in the top-right corner.
3. Because `next.config.ts` is configured with `output: 'standalone'` and `.next/standalone` + `.next/static` are pre-built, AI Studio packages and publishes the app directly.

---

## Updating Contact Placeholders Later

All business contact details and calculator presets are centralized in `lib/config.ts`:
- `SITE_CONFIG.whatsappNumber`: Replace `'919999999999'` with your verified WhatsApp number (digits only, with country code `91`).
- `SITE_CONFIG.contactPlaceholders`: Replace `[PLACEHOLDER_PHONE]`, `[PLACEHOLDER_EMAIL]`, `[PLACEHOLDER_WHATSAPP]`, and the Indore business address.
