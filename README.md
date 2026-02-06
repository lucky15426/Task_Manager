# 📋 TaskFlow Dash

A premium full-stack task management application designed for productivity. Built with a modern React frontend and a robust Node.js/Express backend, featuring secure authentication and a sleek UI.


---

## ✨ Features

- 🔐 **Secure Authentication** - Protected by Clerk for reliable user management.
- ✅ **Dynamic Task Management** - Create, view, edit, and delete tasks with ease.
- 🎨 **Premium UI/UX** - Glassmorphic design, smooth animations, and a professional loading experience.
- 📊 **Dashboard Analytics** - Real-time statistics for task progress and completion.
- 🔍 **Advanced Filtering** - Filter tasks by status (Pending, In Progress, Completed).
- 📱 **Fully Responsive** - Seamless experience across mobile, tablet, and desktop.
- ⚡ **Optimized Performance** - Fast interactions and real-time state management.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** (Functional Components + Hooks)
- **Vite** (Next-gen build tooling)
- **Clerk** (User authentication & Management)
- **CSS3** (Custom design system, Flexbox, Animations)

### Backend
- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **CORS** & **Dotenv** configuration

---

## 📁 Project Structure

```bash
task-manager/
├── client/                  # Frontend Application (Vite + React)
│   ├── src/
│   │   ├── components/      # UI Components (TaskCard, TaskForm, TaskList, LoadingScreen)
│   │   ├── services/        # API communication layer
│   │   ├── App.jsx          # Main application logic
│   │   └── main.jsx         # Entry point with Clerk provider
│   └── package.json
├── server/                  # Backend API (Node.js + Express)
│   ├── config/              # DB Configuration
│   ├── controllers/         # Request handlers
│   ├── models/              # MongoDB Schemas
│   ├── routes/              # API Endpoints
│   ├── server.js            # Server entry point
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **MongoDB** (Local instance or MongoDB Atlas)
- **Clerk Account** (For API keys)

### 1. Clone the Repository

```bash
git clone <https://github.com/lucky15426/Task_Manager.git>
cd task-manager
```

### 2. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/api/tasks` | Retrieve all tasks |
| **GET** | `/api/tasks?status=Pending` | Filter tasks by status |
| **POST** | `/api/tasks` | Create a new task |
| **PUT** | `/api/tasks/:id` | Update an existing task |
| **DELETE** | `/api/tasks/:id` | Remove a task |

### Task Schema Details

```json
{
  "title": "String (Required)",
  "description": "String (Optional)",
  "status": "Pending | In Progress | Completed",
  "createdAt": "ISO Date"
}
```

---

## 🛡️ Authentication

This project uses **Clerk** for authentication. To set it up:
1. Go to the [Clerk Dashboard](https://clerk.com/).
2. Create a new application.
3. Copy your **Publishable Key**.
4. Paste it into `client/.env.local` as `VITE_CLERK_PUBLISHABLE_KEY`.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
