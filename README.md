# Fullstack Kanban Board

A simple Kanban Board application for task management, built with **React (Vite + TypeScript)** on the frontend and **Express + SQLite + Knex** on the backend.

---

## 📁 Project Structure

```
root
├── client/                # Frontend (React + Vite + TypeScript + TailwindCSS)
│   ├── public/            # Static files (icons, favicon, etc.)
│   ├── src/
│   │   ├── api/           # API requests to the backend (auth, boards, tasks)
│   │   ├── app/           # Main application component
│   │   ├── components/    # UI components
│   │   │   ├── auth/      # Auth components 
│   │   │   ├── board/     # Board components 
│   │   │   │   └── task/  # Task components inside board 
│   │   │   └── ui/        # Shared UI components 
│   │   ├── constants/     # Constants 
│   │   ├── context/       # React Context 
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Application pages 
│   │   ├── styles/        # Global styles 
│   │   ├── types/         # TypeScript types 
│   │   └── main.tsx       # Frontend entry point
│   ├── index.html         # HTML template
│   ├── vite.config.ts     # Vite config
│   ├── tailwind.config.js # TailwindCSS config
│   ├── tsconfig*.json     # TypeScript configs
│   └── ...                # Other configs and files
│
├── server/                # Backend (Express + SQLite + Knex)
│   ├── src/
│   │   ├── config/        # Configs 
│   │   ├── controllers/   # Controllers 
│   │   ├── db/            # Database initialization 
│   │   ├── middleware/    # Middleware 
│   │   ├── models/        # Data models 
│   │   ├── routes/        # Routes 
│   │   ├── validators/    # Data validation
│   │   └── app.js         # Express app entry point
│   ├── db.sqlite          # SQLite database file
│   ├── package.json       # Dependencies and scripts
│   └── ...                # Other configs and files
│
├── README.md
└── ...

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Setup and run the backend

```bash
cd server
cp .env.example .env
npm install
npm run migrate   # or: node src/db/initDb.js   # if you use a JS migration script
npm start
```

### 3. Setup and run the frontend

```bash
cd ../client
cp .env.example .env
npm install
npm run dev
```
