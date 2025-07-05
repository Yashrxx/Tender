# 🧾 B2B Tender-Management Platform

A full-stack B2B tender-management platform that enables companies to:

- Register & manage their profiles (with logos/images)
- Create and publish tenders
- Browse and apply to tenders
- Search for other companies by name, industry, or services

---

## 🚀 Live Demo

- **Frontend** (GitHub Pages): [https://yashrxx.github.io/Tender/](https://yashrxx.github.io/Tender/)
- **Backend** (Render): [https://tender-56x1.onrender.com](https://tender-56x1.onrender.com)

## 🛠 Tech Stack

| Layer       | Technology                   |
|------------|-------------------------------|
| Frontend   | React.js (hosted on GitHub Pages) |
| Backend    | Node.js + Express.js          |
| Database   | PostgreSQL (via Sequelize ORM) |
| Auth       | JWT-based authentication      |
| Storage    | Supabase Storage (for company logos) |
| Deployment | GitHub Pages (frontend), Render (backend) |

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based login/signup
- Protected routes via middleware

### 🏢 Company Profile
- Create, read, update, delete company profiles
- Upload logo/images to Supabase
- View other company details

### 📢 Tender Management
- Create, list, update, delete tenders
- Paginated tender listings
- Filter tenders company-wise

### 📨 Application Workflow
- Apply to tenders
- View all applications received

### 🔍 Search Functionality
- Search companies by name, industry, or services (server-side)

---

## ⚙️ Setup Instructions

### 📁 Clone the Repo

```bash
git clone https://github.com/yashrxx/Tender.git
cd Tender