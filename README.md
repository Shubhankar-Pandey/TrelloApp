🚀 Issue & Organisation Management System

A full-stack web application designed to manage organisations, departments, and issue workflows with role-based access control, privacy layers, and collaborative task handling.

This platform enables structured issue tracking within organisations while maintaining secure and controlled visibility.

📌 Overview

This system supports two types of users:

Owner
Employee

It allows organisations to manage internal workflows efficiently through departments and issues, with controlled access and assignment mechanisms.

✨ Features
👤 User Roles
🔹 Owner
Create and manage organisations (Public / Private)
Create multiple departments within an organisation (Public / Private)
Raise issues within departments (Public / Private)
Assign issues to employees via request-based system
Accept or reject employee requests to work on issues
🔹 Employee
View public issues of public departments in public organisations
Request to work on issues
Work on assigned issues
Access private issues only if assigned
🏢 Organisation Structure
Organisation
   ├── Departments
   │       ├── Issues

Each level supports privacy controls:

Public
Private
📋 Issue Management

Each issue includes:

Title & Description
Status tracking:
🟢 Open
🟡 Working
🔵 Done
Visibility:
Public / Private
Assignment system
🔄 Assignment Workflow
Owner → Employee
Owner sends assignment request
Employee must accept to get assigned
Employee → Owner
Employee requests to work on an issue
Owner must approve the request
🔐 Access Control Logic
Public issues in public departments & organisations → visible to all employees
Private issues → visible only to assigned employees
Strict hierarchical privacy enforcement
🚀 Additional Features
🔔 Notification system (assignment requests, approvals, updates)
💬 Comments & discussions on issues
⏳ Deadlines & priority levels
🔍 Advanced search & filtering
📊 Dashboard with analytics (issue stats, progress tracking)
📁 File attachments (screenshots, documents)
📈 Activity logs for tracking actions
⭐ Bookmark / watch issues
🌙 Modern UI with Tailwind CSS
🛠️ Tech Stack
Frontend
React (v18)
Tailwind CSS
Backend
Node.js
Express.js
Database
MongoDB
Other Tools
JWT Authentication
Cloud storage (for file uploads)
Email services (for notifications)
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone <your-repo-link>
cd <your-project-folder>
2️⃣ Install dependencies
npm install
3️⃣ Setup environment variables

Create a .env file and add:

PORT=4000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
4️⃣ Run the development server
npm run dev
5️⃣ Open in browser
http://localhost:3000
📂 Project Structure (Example)
/src
  /controllers
  /models
  /routes
  /middlewares
  /utils
🧠 Key Concepts Implemented
Role-Based Access Control (RBAC)
Request-Based Assignment System
Multi-Level Privacy Architecture
Scalable Backend Design
RESTful API Structure
🎯 Future Enhancements
Real-time updates using WebSockets
Kanban board (drag & drop UI)
Mobile responsiveness improvements
Team-level roles (Manager, Admin)
AI-based issue prioritization
🤝 Contributing

Contributions are welcome!

If you'd like to improve this project:

Fork the repo
Create a new branch
Submit a Pull Request
