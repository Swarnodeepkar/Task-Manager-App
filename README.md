# Task Manager App

A full-stack task management application with JWT authentication, built with Node.js, Express, MongoDB, React, TypeScript, and Tailwind CSS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Authentication | JSON Web Tokens (JWT) + bcryptjs |
| Frontend | React 18 + TypeScript |
| HTTP Client | Axios |
| Styling | Tailwind CSS |
| Bundler | Vite |

---

## Project Structure

```
Morae aassigment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js   # Register & Login logic
│   │   │   └── taskController.js   # CRUD task logic
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js   # JWT verification
│   │   │   └── errorHandler.js     # Global error handler
│   │   ├── models/
│   │   │   ├── User.js             # User schema
│   │   │   └── Task.js             # Task schema
│   │   └── routes/
│   │       ├── authRoutes.js       # /api/auth/*
│   │       └── taskRoutes.js       # /api/tasks/*
│   ├── .env                        # Environment variables
│   ├── package.json
│   └── server.js                   # Express entry point
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.ts            # Axios instance + interceptors
    │   ├── components/
    │   │   ├── FilterBar.tsx       # All / Pending / Completed filter
    │   │   ├── Navbar.tsx          # Top navigation bar
    │   │   ├── ProtectedRoute.tsx  # Auth guard for routes
    │   │   ├── TaskCard.tsx        # Individual task row
    │   │   └── TaskForm.tsx        # Create / Edit task form
    │   ├── context/
    │   │   └── AuthContext.tsx     # Global auth state
    │   ├── pages/
    │   │   ├── LoginPage.tsx
    │   │   ├── RegisterPage.tsx
    │   │   └── TasksPage.tsx       # Main dashboard
    │   ├── types/
    │   │   └── index.ts            # Shared TypeScript interfaces
    │   ├── App.tsx                 # Router setup
    │   └── main.tsx                # React entry point
    ├── .env
    ├── index.html
    ├── tailwind.config.js
    ├── tsconfig.json
    └── vite.config.ts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher
- A MongoDB Atlas account 

---



###  Backend Setup

```bash
cd backend
npm install
```

Create or update `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/taskmanager
JWT_SECRET=your_strong_random_secret_here
JWT_EXPIRES_IN=7d
```



Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Verify `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Reference

All task routes require the `Authorization: Bearer <token>` header.

### Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Create a new account | No |
| POST | `/api/auth/login` | Login and receive JWT | No |

**Register / Login request body:**
```json
{
  "name": "Swarnodeep",
  "email": "ks@gmail.com",
  "password": "subai@123"
}
```

**Response:**
```json
{
  "token": "<jwt>",
  "user": { "id": "69d4cc078a29cc63b44a9bec", "name": "Swarnodeep", "email": "ks@gmail.com" }
}
```

---

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Fetch all tasks for logged-in user |
| GET | `/api/tasks?status=pending` | Fetch filtered tasks (`pending` or `completed`) |
| GET | `/api/tasks/:id` | Fetch a single task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update title, description, or status |
| DELETE | `/api/tasks/:id` | Delete a task |

**Create / Update task body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending"
}
```

---

## Features

- **Authentication** — Register and login with email/password. JWT stored in localStorage, automatically attached to all API requests via Axios interceptor.
- **Protected Routes** — Unauthenticated users are redirected to `/login`.
- **Task CRUD** — Create, view, edit, and delete tasks.
- **Mark as Complete** — Toggle task status with a single checkbox click.
- **Filter by Status** — Filter tasks by All, Pending, or Completed.
- **Persistent Sessions** — JWT is restored from localStorage on page refresh.
- **Responsive UI** — Fully responsive layout using Tailwind CSS.
- **User Isolation** — Each user only sees and manages their own tasks.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the API server listens on | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for signing JWTs | `a_long_random_string` |
| `JWT_EXPIRES_IN` | JWT expiry duration | `7d` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL for all API calls | `http://localhost:5000/api` |

---

## Scripts

### Backend

| Command | Description |
|---|---|
| `npm run dev` | Start with nodemon (auto-reload) |
| `npm start` | Start without auto-reload |

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build  |
| `npm run preview` | Preview the build locally |

---


