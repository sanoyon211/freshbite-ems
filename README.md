<div align="center">

<img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Recharts-2.12-FF6384?style=for-the-badge" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

<br /><br />

# 🍴 FreshBite Foods Ltd.
### Employee Management System

**A complete, production-ready Employee Management Dashboard**
built for the Food & Beverage industry with React + Tailwind CSS.

[🚀 Live Demo](#) &nbsp;·&nbsp; [📸 Screenshots](#-screenshots) &nbsp;·&nbsp; [🛠️ Installation](#%EF%B8%8F-installation) &nbsp;·&nbsp; [📁 Project Structure](#-project-structure)

<br />

</div>

---

## 🌟 Features

| Module | Description |
|--------|-------------|
| 🔐 **Login Page** | Email/password auth with form validation & loading state |
| 📊 **Dashboard** | KPI stats, recharts bar chart, activity feed, quick actions |
| 👥 **Employees** | Full CRUD — search, filter, pagination, add/edit/delete |
| 👤 **Profile** | Detailed card, attendance summary, salary history, performance |
| 📅 **Attendance** | Interactive monthly grid — toggle Present / Absent / Leave |
| 💰 **Payroll** | Salary breakdown, Pay Now per employee, Pay All action |
| 📋 **Leave Management** | Approve/Reject requests, status filters, mobile card view |

---

## 📸 Screenshots

> **Login Page** — Clean professional auth screen

```
Email: admin@freshbite.bd
Password: any 4+ characters
```

> **Dashboard** — Stats + attendance chart + activity feed

> **Employees** — Searchable, filterable table with full CRUD

> **Attendance** — Clickable monthly grid (P → A → L toggle)

> **Payroll** — Salary breakdown with Pay Now buttons

> **Leave** — Approve/Reject with status filter tabs

---

## 🛠️ Installation

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9+

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/freshbite-ems.git

# 2. Go into the project folder
cd freshbite-ems

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open **http://localhost:3000** in your browser 🎉

### Build for Production

```bash
npm run build
```

Output goes to `dist/` — ready to deploy on **Vercel**, **Netlify**, or any static host.

---

## 📁 Project Structure

```
freshbite/
├── index.html                    ← HTML entry point
├── public/                       ← Static assets
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx           ← Collapsible dark sidebar (mobile drawer)
│   │   ├── Navbar.jsx            ← Top navbar (search, notifications, profile)
│   │   ├── StatsCard.jsx         ← Reusable KPI stat card
│   │   ├── EmployeeCard.jsx      ← Mini employee row card
│   │   ├── Modal.jsx             ← Add/Edit modal + Confirm delete modal
│   │   └── Toast.jsx             ← Global toast notification system
│   ├── pages/
│   │   ├── Login.jsx             ← Auth / login page
│   │   ├── Dashboard.jsx         ← Main dashboard
│   │   ├── Employees.jsx         ← Employee list & CRUD management
│   │   ├── Profile.jsx           ← Employee profile detail view
│   │   ├── Attendance.jsx        ← Monthly attendance grid
│   │   ├── Payroll.jsx           ← Payroll management
│   │   └── Leave.jsx             ← Leave request management
│   ├── data/
│   │   └── dummyData.js          ← All dummy data (9 Bangladeshi employees)
│   ├── utils/
│   │   └── helpers.js            ← Utility functions & style maps
│   ├── App.jsx                   ← Root component (routing + global state)
│   ├── main.jsx                  ← React entry point
│   └── index.css                 ← Global styles + Tailwind imports
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| **Primary** | `#F97316` Orange | Buttons, active states, accents |
| **Background** | `#F1F5F9` Slate-100 | Page background |
| **Surface** | `#FFFFFF` White | Cards, tables, modals |
| **Sidebar** | `#0F172A` Slate-900 | Dark sidebar |
| **Text Primary** | `#1E293B` Slate-800 | Headings |
| **Text Secondary** | `#64748B` Slate-500 | Labels, subtitles |
| **Font** | Poppins | Google Fonts |

---

## 📦 Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 18.3 | UI framework |
| `react-dom` | 18.3 | DOM rendering |
| `tailwindcss` | 3.4 | Utility-first CSS |
| `lucide-react` | 0.383 | Icon library |
| `recharts` | 2.12 | Bar chart on dashboard |
| `vite` | 5.3 | Dev server & bundler |

---

## 👥 Sample Employees (9 total)

| ID | Name | Department | Role | Status |
|----|------|-----------|------|--------|
| FB-001 | Rahim Uddin | Kitchen Staff | Head Chef | ✅ Active |
| FB-002 | Fatema Begum | Service | Sr. Waitress | ✅ Active |
| FB-003 | Karim Hossain | Kitchen Staff | Line Cook | ✅ Active |
| FB-004 | Nasrin Akter | Management | Branch Manager | ✅ Active |
| FB-005 | Jamal Ahmed | Delivery | Delivery Driver | ✅ Active |
| FB-006 | Sumaiya Islam | Service | Waitress | ❌ Inactive |
| FB-007 | Rafiqul Islam | Cashier | Head Cashier | ✅ Active |
| FB-008 | Momena Khatun | Cleaning | Cleaning Lead | ✅ Active |
| FB-009 | Tariqul Hasan | Kitchen Staff | Pastry Chef | ✅ Active |

---

## 📱 Responsive Breakpoints

| Device | Breakpoint | Layout |
|--------|-----------|--------|
| Mobile | `< 640px` | Hamburger menu, card views, stacked layout |
| Tablet | `640px–1024px` | Compact table, hidden columns |
| Desktop | `> 1024px` | Full sidebar + wide table |

---

## 🔧 Customisation

- **Add real auth** → Replace `Login.jsx` fake login with an API call
- **Connect backend** → Swap `dummyData.js` with `fetch()` / Axios in `App.jsx`
- **Add React Router** → Replace the `page` state in `App.jsx` with `<Routes>`
- **Deploy to Vercel** → `npm run build` then drag `dist/` to vercel.com

---

## 🚀 Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts → your app will be live in 60 seconds!
```

---

## 📄 License

This project is licensed under the **MIT License** — free to use for personal and commercial projects.

---

<div align="center">

**Built with ❤️ using React + Tailwind CSS**

⭐ Star this repo if you found it helpful!

</div>
