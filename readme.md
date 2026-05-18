<div align="center">

# 🚀 Resolve AI Backend

### AI-Powered Ticket Resolution Backend System

A scalable backend application built using **Node.js**, **Express.js**, **MongoDB**, and **Generative AI** for intelligent ticket management, authentication, and automated resolution workflows.

<br/>

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
<img src="https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=black" />

<br/>

[![GitHub stars](https://img.shields.io/github/stars/SHRUTI-GAJJAR/resolve-ai-backend?style=social)](https://github.com/SHRUTI-GAJJAR/resolve-ai-backend)
[![GitHub forks](https://img.shields.io/github/forks/SHRUTI-GAJJAR/resolve-ai-backend?style=social)](https://github.com/SHRUTI-GAJJAR/resolve-ai-backend)

</div>

---

# 📌 Overview

Resolve AI Backend is a modern backend system designed for intelligent ticket management and automated resolution workflows.

The project integrates:

- 🔐 Authentication system
- 🤖 AI-generated ticket resolution
- 📧 Email integration
- 🌐 OAuth login support
- 📦 RESTful API architecture
- 📚 Swagger API documentation
- 🐳 Docker-based deployment

---

# ✨ Features

## 🔥 Core Functionalities

- 🎫 AI-powered ticket management system
- 🔐 JWT Authentication & Authorization
- 🌐 Google OAuth Login
- 🐙 GitHub OAuth Login
- 📧 Email service integration
- 📚 Swagger API documentation
- 🧩 Modular MVC architecture
- 🐳 Docker container support
- 🛡️ Secure middleware handling
- 📦 MongoDB database integration
- 📄 Logging system using Winston

---

# 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, Passport.js |
| OAuth | Google OAuth, GitHub OAuth |
| AI Integration | OpenAI, Google Generative AI |
| Documentation | Swagger |
| Logging | Winston |
| Email Service | Nodemailer |
| Security | Helmet, Express Validator |
| Deployment | Render, Docker |

---

# 📂 Project Structure

```bash
resolve-ai-backend/
│
├── logs/
│   ├── combined.log
│   └── error.log
│
├── src/
│   ├── ai/              # AI-related logic
│   ├── config/          # Database & configuration
│   ├── controllers/     # Business logic
│   ├── middlewares/     # Authentication & middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Service layer
│   └── utils/           # Utility functions
│
├── .dockerignore
├── .env
├── .gitignore
├── app.js
├── docker-compose.yml
├── dockerfile
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/SHRUTI-GAJJAR/resolve-ai-backend.git
```

---

## 2️⃣ Navigate into Project

```bash
cd resolve-ai-backend
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
MONGO_URI=
HF_API_KEY=
SESSION_SECRET=
JWT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=

EMAIL_USER=
EMAIL_PASS=
```

---

# 🚀 Run Development Server

```bash
npm run dev
```

---

# 🌐 Live Deployment

## Render Deployment

https://resolve-ai-backend.onrender.com

---

# 📚 Swagger API Documentation

Access Swagger Docs:

```bash
http://localhost:5000/api-docs
```

---

# 📡 API Endpoints

## 🔐 Authentication APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/github` | Login with GitHub |
| GET | `/api/auth/github/callback` | GitHub OAuth Callback |
| GET | `/api/auth/google` | Login with Google |
| GET | `/api/auth/google/callback` | Google OAuth Callback |
| POST | `/api/auth/register` | Register New User |
| POST | `/api/auth/login` | Login User |
| POST | `/api/auth/logout` | Logout User |
| GET | `/api/auth/me` | Get Logged-in User |

---

## 🎫 Ticket APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tickets` | Create New Ticket |
| GET | `/api/tickets` | Get All Tickets |
| GET | `/api/tickets/{id}` | Get Ticket By ID |

---

# 🤖 AI Integration

This backend integrates AI services for intelligent ticket resolution workflows using:

- OpenAI API
- Google Generative AI
- Hugging Face API

AI is used for:
- Automated resolution suggestions
- Smart ticket processing
- Intelligent response generation

---

# 🐳 Docker Support

## Build Docker Image

```bash
docker build -t resolve-ai-backend .
```

---

## Run Docker Container

```bash
docker run -p 5000:5000 resolve-ai-backend
```

---

# 📈 Future Improvements

- 🔥 Role-based authorization
- 🔥 Redis caching
- 🔥 Rate limiting
- 🔥 CI/CD pipeline
- 🔥 Unit & integration testing
- 🔥 Advanced AI workflows
- 🔥 Real-time notifications

---

# 👩‍💻 Author

## Shruti Gajjar

📍 Ahmedabad, Gujarat, India

🔗 GitHub:  
https://github.com/SHRUTI-GAJJAR

---

# ⭐ Support

If you found this project useful:

- ⭐ Star this repository
- 🍴 Fork the project
- 🛠️ Contribute improvements

---

<div align="center">

## 🚀 Built with Node.js, Express & AI

### Designed for scalable backend architecture

</div>