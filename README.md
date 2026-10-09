# 🌿 Serene Care — Frontend

A modern, role-based healthcare management web application built with **React + Vite + TypeScript**.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Getting Started](#getting-started)
- [Running with Docker](#running-with-docker)
- [CI/CD Pipeline](#cicd-pipeline)

---

## 🏥 About the Project

Serene Care is a full-stack healthcare management system designed to connect **Caretakers (patients/families)**, **Caregivers (nurses/helpers)**, **Managers**, **Admins**, and **Accountants** through a unified web platform.

This repository contains the **frontend** of the application.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| Vite 6 | Build tool & dev server |
| TypeScript | Type-safe JavaScript |
| React Router v6 | Client-side routing |
| Redux Toolkit | Global state management |
| MUI (Material UI) | UI component library |
| Ant Design | Additional UI components |
| React Bootstrap | Layout & grid system |
| Axios | HTTP API requests |
| React Pro Sidebar | Navigation sidebar |

---

## 📁 Project Structure

```
src/
├── pages/              # Page components (organized by role)
│   ├── ADMIN/          # Admin dashboard & user management
│   ├── CAREGIVER/      # Caregiver dashboard & profile
│   ├── CARETAKER/      # Caretaker dashboard, payments, reports
│   ├── MANAGER/        # Manager dashboard & care plans
│   ├── accountant/     # Accountant dashboard
│   ├── Home/           # Public landing page
│   ├── Login/          # Authentication page
│   └── Register/       # Registration page
├── components/         # Reusable UI components (Navbar, Sidebar)
├── layouts/            # Page layout wrappers (MasterLayout, AuthLayout)
├── routes/             # Protected route logic
├── context/            # Auth context (logged-in user state)
├── store/              # Redux store & slices
├── types/              # TypeScript interfaces
└── utils/              # Helper functions
```

---

## 👥 User Roles

| Role | Access |
|---|---|
| **Admin** | Manage all staff and users |
| **Manager** | Manage care plans, assign caregivers |
| **Caregiver** | View assignments, update profile |
| **Caretaker** | Request services, view reports, make payments |
| **Accountant** | Financial overview dashboard |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 20+
- npm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/NavodYasara/Serene-care-frontend.git
cd Serene-care-frontend

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start the dev server
npm run start
```

The app will be available at **http://localhost:5173**

---

## 🐳 Running with Docker

### Pull the pre-built image
```bash
docker pull navodyasara/serene-frontend:latest
docker run -d -p 3000:80 navodyasara/serene-frontend:latest
```

The app will be available at **http://localhost:3000**

### Or run the full stack with Docker Compose
> From the root `SDP/` directory:
```bash
docker compose pull
docker compose up -d
```

---

## ⚙️ CI/CD Pipeline

On every push to the `dev` branch:

1. GitHub Actions builds a Docker image using the `Dockerfile`
2. The image is pushed to Docker Hub as `navodyasara/serene-frontend:latest`

```
Push to dev → GitHub Actions → Docker Build → Docker Hub
```
