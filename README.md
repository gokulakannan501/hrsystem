# HR Automation System

A robust HR Attendance & Leave Automation System built with Node.js, Express, SQLite, and React + Tailwind.

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
node database.js  # Initializes DB
node server.js    # Starts API on port 5000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev       # Starts React app on port 5173
```

### 3. Seed Data (Optional)

To login immediately with test accounts:

```bash
cd scripts
node seed.js
```

### 🔑 Test Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@hr.com | 123 |
| **Manager** | manager@company.com | 123 |
| **Employee** | john@company.com | 123 |

---

## 🏗️ Architecture

- **Backend**: Express.js REST API
- **Database**: SQLite (Local file `backend/hr_system.db`)
- **Frontend**: React, Vite, Tailwind CSS
- **Auth**: JWT Bearer Tokens

## 🌟 Features

1. **Automated Lost Time Calculation**: Automatically calculates late/early minutes based on 09:00 - 18:00 shifts.
2. **Project Loss Report**: HR Dashboard showing calculate percentage of time lost per employee.
3. **Leave Workflow**: Employees apply -> Managers Approve/Reject.
4. **Bulk Upload**: HR can paste JSON attendance logs to bulk process data.

## 📂 Project Structure

- `/backend`: API Server and Database
- `/frontend`: React User Interface
- `/scripts`: Utilities and Seeders
- `/docs`: Documentation

