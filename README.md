# Comfort Travels – Full‑Stack Travel Agency Platform

A production‑grade, containerised travel‑agency website consisting of:

* **Frontend** – Next.js 15 (App Router) + React‑Query + Tailwind CSS (custom brand theme) + shadcn/ui components
* **Backend** – Spring Boot 3 (Java 21) + Spring Data JPA + PostgreSQL, exposed as a REST API (OpenAPI/Swagger)
* **Database** – PostgreSQL 16
* **Infrastructure** – Docker Compose for one‑command local development and CI/CD‑ready images

---

## Table of Contents
1. [Prerequisites](#prerequisites)  
2. [Repository Layout](#repository-layout)  
3. [Environment Variables](#environment-variables)  
4. [Running with Docker Compose (recommended)](#running-with-docker-compose-recommended)  
5. [Running Locally without Docker](#running-locally-without-docker)  
   - [Backend (Spring Boot)](#backend-spring-boot)  
   - [Frontend (Next.js)](#frontend-nextjs)  
6. [Useful Endpoints](#useful-endpoints)  
7. [Development Workflow](#development-workflow)  
8. [Testing](#testing)  
9. [Building Production Images](#building-production-images)  
10. [Troubleshooting](#troubleshooting)  

---

## Prerequisites
| Tool | Minimum Version | Install Link |
|------|----------------|--------------|
| **Docker** | 24.x | https://docs.docker.com/get-docker/ |
| **Docker Compose** | 2.x (bundled with Docker Desktop) | – |
| **Java** | 21 (Temurin/OpenJDK) | https://adoptium.net/ |
| **Maven** | 3.9+ | https://maven.apache.org/download.cgi |
| **Node.js** | 20 LTS | https://nodejs.org/ |
| **pnpm** (optional, npm works) | 9.x | `npm i -g pnpm` |
| **Git** | 2.x | https://git-scm.com/ |

> **Note** – If you use Docker Compose you **do not need** Java, Maven, Node, or Postgres installed locally.

---

## Repository Layout
```
comfort-travels/
├─ docker-compose.yml                # Orchestrates Postgres, API, Web
├─ backend/                          # Spring Boot (Maven)
│  ├─ pom.xml
│  ├─ src/main/java/com/comforttravels/
│  │   ├─ ComfortTravelsApplication.java
│  │   ├─ config/OpenApiConfig.java
│  │   ├─ controller/…               # REST controllers
│  │   ├─ dto/…                      # Data‑Transfer Objects
│  │   ├─ entity/…                   # JPA entities
│  │   ├─ mapper/…                   # MapStruct mappers
│  │   ├─ repository/…               # Spring Data repositories
│  │   └─ service/…                  # Business logic
│  ├─ src/main/resources/application.yml
│  └─ Dockerfile
├─ frontend/                         # Next.js 15 (App Router)
│  ├─ app/…                          # Pages, layouts, globals.css
│  ├─ components/…                   # shadcn/ui + custom sections
│  ├─ lib/api/…                      # Axios client + React‑Query helpers
│  ├─ hooks/…                        # Re‑usable hooks
│  ├─ tailwind.config.ts             # Brand theme
│  ├─ next.config.ts                 # `output: 'standalone'`
│  ├─ package.json
│  └─ Dockerfile
└─ README.md                         # ← you are here
```

---

## Environment Variables

| Service | Variable | Default (docker‑compose) | Description |
|---------|----------|--------------------------|-------------|
| **Postgres** | `POSTGRES_DB` | `comfort_travels` | Database name |
| | `POSTGRES_USER` | `postgres` | DB user |
| | `POSTGRES_PASSWORD` | `postgres` | DB password |
| **Spring API** | `SPRING_DATASOURCE_URL` | `jdbc:postgresql://db:5432/comfort_travels` | JDBC URL (auto‑wired in compose) |
| | `SPRING_DATASOURCE_USERNAME` | `postgres` | DB user |
| | `SPRING_DATASOURCE_PASSWORD` | `postgres` | DB password |
| **Next.js** | `NEXT_PUBLIC_API_URL` | `http://api:8080/api` | Base URL for all frontend API calls |

Create a **`.env`** file in the repo root if you want to override any of the above (docker‑compose will pick it up automatically).

Example `.env`:
```dotenv
POSTGRES_PASSWORD=supersecret
NEXT_PUBLIC_API_URL=http://localhost:8080/api   # when running API locally without compose
```

---

## Running with Docker Compose (recommended)

```bash
# 1️⃣ Clone the repo (if you haven't already)
git clone <your‑repo‑url> comfort-travels
cd comfort-travels

# 2️⃣ (Optional) tweak .env
# cp .env.example .env   # edit values if needed

# 3️⃣ Build & start everything
docker compose up --build   # first run builds both images

# 4️⃣ Open in browser
# Frontend → http://localhost:3000
# Swagger UI → http://localhost:8080/swagger-ui.html
# Actuator health → http://localhost:8080/actuator/health
```

**Stop / clean up**
```bash
docker compose down               # stops containers, keeps volumes
docker compose down -v            # also removes Postgres data volume
```

---

## Running Locally without Docker

### Backend (Spring Boot)

```bash
cd backend

# 1️⃣ Ensure a Postgres instance is reachable at localhost:5432
#    (you can start one quickly: docker run -d --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:16)

# 2️⃣ Set env vars (or edit src/main/resources/application.yml)
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/comfort_travels
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=postgres

# 3️⃣ Run with Maven wrapper (or installed Maven)
./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run
```

The API will be available at **http://localhost:8080/api** and Swagger UI at **http://localhost:8080/swagger-ui.html**.

### Frontend (Next.js)

```bash
cd frontend

# 1️⃣ Install deps (npm, pnpm or yarn)
npm ci          # or pnpm install / yarn install --frozen-lockfile

# 2️⃣ Create local env file
cp .env.example .env.local
# Edit .env.local if your API runs elsewhere:
# NEXT_PUBLIC_API_URL=http://localhost:8080/api

# 3️⃣ Dev server (hot reload)
npm run dev      # http://localhost:3000
```

**Production build locally**

```bash
npm run build
npm start        # serves the standalone output on port 3000
```

---

## Useful Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/destinations` | All destinations |
| `GET` | `/api/destinations/featured` | Featured destinations (home hero) |
| `GET` | `/api/destinations/{slug}` | Single destination detail |
| `GET` | `/api/packages` | All travel packages |
| `GET` | `/api/packages/popular` | Popular packages (home section) |
| `GET` | `/api/packages/{slug}` | Package detail |
| `GET` | `/api/blogs` | All blog posts |
| `GET` | `/api/blogs/{slug}` | Blog post detail |
| `GET` | `/api/testimonials` | Testimonials (sorted by rating) |
| `POST` | `/api/enquiries` | Submit contact/enquiry form (JSON body) |

All endpoints return **JSON** and follow the OpenAPI spec available at `/v3/api-docs` (Swagger UI at `/swagger-ui.html`).

---

## Development Workflow

1. **Start infrastructure** – `docker compose up -d db` (only Postgres)  
2. **Run backend** – `./mvnw spring-boot:run` (or from IDE)  
3. **Run frontend** – `npm run dev` in `frontend/`  
4. **Make changes** – both projects hot‑reload (Spring Boot DevTools can be added for auto‑restart).  
5. **Run tests** – see [Testing](#testing).  
6. **Commit** – pre‑commit hooks (`husky` + `lint-staged`) format/lint frontend code automatically.

---

## Testing

### Backend (JUnit 5 + MockMvc)

```bash
cd backend
./mvnw test
```

*Unit tests* live under `src/test/java/...`.  
*Integration tests* can spin up a Testcontainers Postgres instance (add `testcontainers` dependency if desired).

### Frontend (Vitest + React‑Testing‑Library)

```bash
cd frontend
npm run test        # or `pnpm test`
```

Configure `vitest.config.ts` (already present if you scaffolded with `create-next-app` + testing).  

Run **lint & type‑check** before push:

```bash
npm run lint
npm run typecheck
```

---

## Building Production Images

The `Dockerfile`s already produce **minimal, standalone** images.

```bash
# From repo root
docker compose build           # builds both api and web images
# Images are tagged as `comfort-travels-api` and `comfort-travels-web`
```

Push to a registry (e.g., GitHub Container Registry, Docker Hub) and deploy to any orchestration platform (Kubernetes, ECS, Cloud Run, etc.).  

**Health checks** – both containers expose `/actuator/health` (API) and Next.js responds with 200 on `/` (web), ready for load‑balancer probes.

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `Connection refused` on `http://localhost:8080` | API not started / Postgres not ready | Ensure `db` healthcheck passes (`docker compose ps`). Check API logs: `docker compose logs -f api`. |
| Frontend shows “Network Error” when calling API | `NEXT_PUBLIC_API_URL` points to wrong host | In Docker Compose the frontend uses `http://api:8080/api`. Locally use `http://localhost:8080/api`. |
| Tailwind styles not applied after theme change | Tailwind JIT not seeing new classes | Run `npm run dev` (re‑starts Tailwind) or `npm run build` to regenerate CSS. |
| `mvnw: Permission denied` | Wrapper script not executable | `chmod +x mvnw` (Unix) or run `mvnw.cmd` on Windows. |
| Database migration errors on repeat runs | `ddl-auto: update` conflicts | For production replace with Flyway/Liquibase; for dev drop DB (`docker compose down -v`) and restart. |

---

## License
MIT – feel free to use, modify, and distribute.

---

**Happy travels!** 🌍✈️  
*Built with ❤️ using Spring Boot, Next.js, Tailwind, and Docker.*