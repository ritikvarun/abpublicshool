# A B Public School — Complete Deployment & Technical Guide

**Project:** Full-Stack School Website with Admin Management Panel  
**Generated Date:** July 23, 2026  
**Author:** Antigravity AI Pair Programmer

---

## 1. 🌐 Live Production URLs

| Component | Platform | Live Production URL |
| :--- | :--- | :--- |
| **Backend API** | Render | `https://abpublicshool-backend.onrender.com` |
| **Frontend Website** | Vercel | `https://abpublicshool.vercel.app` |
| **Admin Management Panel** | Vercel | `https://abpublicshool-yzdj.vercel.app` |

---

## 2. ⚙️ Environment Variables Matrix

### A. Vercel Dashboard — Frontend Project (`school-website`)
Go to **Vercel Dashboard -> Project Settings -> Environment Variables**:

| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `VITE_API_URL` | `https://abpublicshool-backend.onrender.com` | Connects frontend React components to live Render backend API |

### B. Vercel Dashboard — Admin Project (`admin`)
Go to **Vercel Dashboard -> Project Settings -> Environment Variables**:

| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `VITE_API_URL` | `https://abpublicshool-backend.onrender.com` | Connects admin management panel to live Render backend API |

### C. Render Dashboard — Backend Service (`abpublicshool-backend`)
Go to **Render Dashboard -> Service Settings -> Environment**:

| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `PORT` | `5000` | Port for Express server |
| `MONGODB_URI` | `mongodb://ritikvarun64_db_user:...` | MongoDB Atlas Database Connection String |
| `JWT_SECRET` | `super_secret_school_jwt_token_key...` | Secret key for signing admin authentication JWT tokens |
| `CLIENT_URL` | `https://abpublicshool.vercel.app` | Primary frontend origin for CORS security |
| `ADMIN_URL` | `https://abpublicshool-yzdj.vercel.app` | Admin panel origin for CORS security |
| `USE_CLOUDINARY` | `true` | Enable Cloudinary for image uploads |
| `CLOUDINARY_CLOUD_NAME` | `dfo95t5up` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | `662862151532728` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | `ZEDlJwY8QfEskFYhmBpFqM8MmQE` | Cloudinary API secret |

---

## 3. 💻 Local Development Workflow vs Production

- **Local Development:**
  - In `frontend/.env`: `VITE_API_URL=http://localhost:5000`
  - In `admin/.env`: `VITE_API_URL=http://localhost:5000`
  - Running `npm run dev` in all 3 folders targets `localhost:5000` for testing without affecting live production data.

- **Deployment Workflow:**
  1. Test features locally.
  2. Run `git add .`, `git commit -m "your message"`, `git push origin main`.
  3. Render & Vercel will automatically trigger build & deployment.

---

## 4. 🔒 CORS & Security Architecture

1. **Strict Exact-Origin Whitelist:** Backend (`backend/src/index.js`) validates requests against exact URLs (`https://abpublicshool.vercel.app` and `https://abpublicshool-yzdj.vercel.app`).
2. **Peer Dependency Fix:** `.npmrc` files added with `legacy-peer-deps=true` to guarantee smooth builds on Render without `npm ERESOLVE` errors.

---

## 5. 🚀 Search Engine Optimization (SEO) & Google Ranking

- **Meta Tags & Title:** High-converting meta descriptions, keyword tags, and title (`A B Public School — Best Senior Secondary CBSE School`).
- **Schema.org Structured Data:** Embedded JSON-LD script for Google Knowledge Graph, address, contact info, and opening hours.
- **Sitemap & Robots.txt:** Located at `/sitemap.xml` and `/robots.txt`.

### 📌 How to Rank #1 on Google:
1. **Google Search Console:** Submit `https://abpublicshool.vercel.app/sitemap.xml` at [search.google.com/search-console](https://search.google.com/search-console).
2. **Google Business Profile:** Register **A B Public School** at [google.com/business](https://www.google.com/business/) with location, photos, and website URL for top 1st rank on local Google search & Google Maps.
