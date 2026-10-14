# ✈️ Comfort Travels

A modern, production-ready, full-stack travel platform for discovering holiday packages, managing travel bookings & enquiries (flights, trains, hotels, visas), reading travel blogs, and administering agency operations via a protected dashboard.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Key Features](#-key-features)
- [Prerequisites](#-prerequisites)
- [Quick Start Guide](#-quick-start-guide)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup](#2-backend-setup-spring-boot)
  - [3. Frontend Setup](#3-frontend-setup-nextjs)
- [Environment Variables](#-environment-variables)
- [API Documentation & Endpoints](#-api-documentation--endpoints)
- [Admin Access](#-admin-access)
- [Build & Deployment](#-build--deployment)
- [License](#-license)

---

## 🌟 Overview

**Comfort Travels** is engineered as a decoupled, multi-tier travel management solution:
- **[Frontend](file:///c:/Users/Burhan%20Vora/Desktop/Projects/comfort_travels/frontend)**: High-performance Next.js 16 App Router application with React 19, Tailwind CSS, shadcn/ui components, and client-side data caching via TanStack Query.
- **[Backend](file:///c:/Users/Burhan%20Vora/Desktop/Projects/comfort_travels/backend)**: Enterprise-grade Spring Boot 3.5 REST API running on Java 21, backed by PostgreSQL, Spring Data JPA, automated schema migrations, MapStruct, and an extensible transactional email notification engine.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State & Data Fetching**: [TanStack Query v5](https://tanstack.com/query) + [Axios](https://axios-http.com/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Motion & UI**: [Framer Motion](https://www.framer.com/motion/), [Lucide React Icons](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) (Light & Dark mode support)

### Backend
- **Framework**: [Spring Boot 3.5](https://spring.io/projects/spring-boot)
- **Language & Runtime**: [Java 21](https://www.oracle.com/java/)
- **Database & ORM**: [PostgreSQL](https://www.postgresql.org/), [Spring Data JPA](https://spring.io/projects/spring-data-jpa), [Hibernate](https://hibernate.org/)
- **Object Mapping**: [MapStruct 1.6](https://mapstruct.org/)
- **API Documentation**: [Springdoc OpenAPI 2.8](https://springdoc.org/) (Swagger UI)
- **Mail Services**: Multi-provider support ([Brevo](https://www.brevo.com/), [Resend](https://resend.com/), or native SMTP)
- **Containerization**: [Docker](https://www.docker.com/) multi-stage build

---

## 📂 Project Architecture

```text
comfort_travels/
├── backend/                              # Spring Boot 3.5 REST API
│   ├── src/
│   │   ├── main/java/com/comforttravels/
│   │   │   ├── config/                   # WebConfig, OpenApiConfig, DatabaseInitializer
│   │   │   ├── controller/               # REST Controllers (Packages, Blogs, Enquiries)
│   │   │   ├── dto/                      # Data Transfer Objects
│   │   │   ├── entity/                   # JPA Entity models
│   │   │   ├── mapper/                   # MapStruct mappers
│   │   │   ├── repository/               # Spring Data JPA repositories
│   │   │   └── service/                  # Business logic & mail notification services
│   │   └── main/resources/
│   │       └── application.yml           # Application configuration
│   ├── Dockerfile                        # Multi-stage production container build
│   ├── pom.xml                           # Maven dependencies & build plugins
│   └── .env.example                      # Sample backend environment configuration
│
├── frontend/                             # Next.js 16 App Router application
│   ├── app/                              # Pages, Route Handlers, SEO (sitemap, robots)
│   ├── components/                       # Reusable UI & layout components
│   ├── features/                         # Domain features (admin, booking, packages, blogs)
│   ├── hooks/                            # Custom React hooks
│   ├── lib/                              # API client, constants, auth, validation
│   ├── providers/                        # Query client, theme, and toast providers
│   ├── types/                            # Domain TypeScript definitions
│   ├── package.json                      # NPM dependencies and scripts
│   └── .env.example                      # Sample frontend environment configuration
│
└── README.md                             # Monorepo documentation
```

---

## ⚡ Key Features

### 🌍 Customer Travel Portal
- **Interactive Home Experience**: Hero search bar, featured packages, value propositions, client testimonials, and animated statistics.
- **Package Exploration**: Browse, search, filter, and view detailed itineraries with day-by-day breakdowns, inclusions, and exclusions.
- **Dedicated Travel Services**: Specialized enquiry flows for Visas, Flights, Trains, and Hotel reservations.
- **Travel Blog & Stories**: SEO-optimized travel guides, destination highlights, and tips.
- **Multi-channel Contact & Enquiries**: Validated forms with instant feedback and automated email dispatch.
- **Dark & Light Mode**: Seamless theme switching with system preference detection.

### 🔐 Admin Backoffice Portal
- **Secured Authentication**: JWT-based session security with middleware-protected routes (`/admin/*`).
- **Dashboard Overview**: Track recent inquiries, popular packages, and publication metrics.
- **Package Management**: Full CRUD capabilities for holiday destinations, pricing, durations, and itineraries.
- **Blog Publishing**: Author, update, preview, and delete travel blog articles.
- **Customer Enquiry Inbox**: Centralized dashboard to review and manage customer leads.

---

## 📋 Prerequisites

Before running the project locally, ensure you have the following installed:

- **Node.js**: v18.18+ or v20+ ([Download](https://nodejs.org/))
- **npm**: v9+ (bundled with Node.js)
- **Java Development Kit (JDK)**: Version 21 ([Eclipse Temurin Recommended](https://adoptium.net/))
- **Apache Maven**: v3.9+ ([Download](https://maven.apache.org/download.cgi)) or an IDE with Maven support
- **PostgreSQL**: v14+ ([Download](https://www.postgresql.org/download/))
- **Docker**: (Optional) For containerized execution

---

## 🚀 Quick Start Guide

### 1. Clone Repository

```bash
git clone https://github.com/burhanv14/comfort_travels.git
cd comfort_travels
```

---

### 2. Backend Setup (Spring Boot)

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Configure Database & Environment**:
   Ensure PostgreSQL is running and create the database:
   ```sql
   CREATE DATABASE comfort_travels;
   ```
   Set up your environment variables or copy `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *(Ensure `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `SPRING_DATASOURCE_PASSWORD` match your PostgreSQL credentials).*

3. **Build & Run**:
   ```bash
   mvn clean spring-boot:run
   ```
   The backend API will start on: `http://localhost:8080`
   
   View Swagger UI API docs at: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

### 3. Frontend Setup (Next.js)

1. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The client application will run on: [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env.local`)

| Variable | Description | Default / Example |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Public base URL of the Next.js app | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | API base URL (Backend or Next.js route handlers) | `http://localhost:3000/api/v1` or `http://localhost:8080/api` |
| `NEXT_PUBLIC_APP_NAME` | Display brand name | `Comfort Travels` |
| `JWT_SECRET` | Secret key for signing/verifying admin JWT tokens | *Strong random string* |
| `JWT_EXPIRES_IN` | Token expiration period | `7d` |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Default development admin email | `admin@comforttravels.com` |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Default development admin password | `admin123` |

### Backend (`backend/src/main/resources/application.yml` or OS Environment)

| Variable | Description | Default / Example |
|---|---|---|
| `PORT` | HTTP port for the Spring Boot server | `8080` |
| `SPRING_DATASOURCE_URL` | JDBC connection string | `jdbc:postgresql://localhost:5432/comfort_travels` |
| `SPRING_DATASOURCE_USERNAME` | PostgreSQL username | `postgres` |
| `SPRING_DATASOURCE_PASSWORD` | PostgreSQL password | `postgres` |
| `MAIL_PROVIDER` | Email provider (`auto`, `brevo`, `resend`, `smtp`) | `smtp` |
| `MAIL_ENABLED` | Enable or disable outbound mail dispatch | `true` |
| `MAIL_FROM` | Sender email address | `no-reply@comforttravels.com` |
| `MAIL_FROM_NAME` | Sender display name | `Comfort Travels` |
| `MAIL_ENQUIRY_RECIPIENT` | Inbox where enquiry notifications are delivered | `contact@comforttravels.com` |
| `SPRING_MAIL_HOST` | SMTP server host | `smtp.gmail.com` |
| `SPRING_MAIL_PORT` | SMTP server port | `587` |
| `SPRING_MAIL_USERNAME` | SMTP account username | `user@example.com` |
| `SPRING_MAIL_PASSWORD` | SMTP account password / app password | `secret` |
| `BREVO_API_KEY` | (Optional) Brevo API key | `xkeysib-...` |
| `RESEND_API_KEY` | (Optional) Resend API key | `re_...` |

---

## 📡 API Documentation & Endpoints

When the backend is active, OpenAPI specification and Swagger UI are accessible at:
- **Swagger UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **OpenAPI JSON**: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

### Primary Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/packages` | List all available holiday packages |
| `GET` | `/api/packages/homepage` | List featured packages highlighted for homepage |
| `GET` | `/api/packages/{slug}` | Fetch single package details by unique slug |
| `POST` | `/api/packages` | Create a new holiday package (Admin) |
| `PUT` | `/api/packages/{slug}` | Update an existing holiday package |
| `DELETE`| `/api/packages/{slug}` | Remove a package |
| `GET` | `/api/blogs` | List all travel blogs and articles |
| `GET` | `/api/blogs/{slug}` | Fetch blog post by slug |
| `POST` | `/api/blogs` | Create a new blog post |
| `PUT` | `/api/blogs/{slug}` | Update an existing blog post |
| `DELETE`| `/api/blogs/{slug}` | Delete a blog post |
| `POST` | `/api/enquiries` | Submit customer booking or service enquiry |

---

## 🔑 Admin Access

- **Admin Login Route**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Protected Areas**:
  - `/admin/packages` - Package inventory and editor
  - `/admin/blogs` - Article publishing and drafts
  - `/admin/enquiries` - Customer enquiry inbox
  - `/admin/testimonials` - Testimonials curation
  - `/admin/settings` - Platform settings

---

## 📦 Build & Deployment

### Frontend Production Build
```bash
cd frontend
npm run build
npm run start
```

### Backend Production JAR & Docker
```bash
# Build JAR using Maven
cd backend
mvn clean package -DskipTests

# Run generated JAR
java -jar target/comfort-travels-api-0.0.1-SNAPSHOT.jar

# Build Docker image
docker build -t comfort-travels-backend .

# Run Docker container
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/comfort_travels \
  -e SPRING_DATASOURCE_USERNAME=postgres \
  -e SPRING_DATASOURCE_PASSWORD=postgres \
  comfort-travels-backend
```

---

## 📜 Quality & Code Style

- **Frontend Type Checking**: `npm run typecheck`
- **Frontend Linting**: `npm run lint`
- **Backend Tests**: `mvn test`

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
