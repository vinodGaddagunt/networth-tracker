# CrediKhaata – Loan Tracker for Shopkeepers

CrediKhaata is a RESTful backend service built with Node.js, Express, and PostgreSQL. It helps shopkeepers manage customers, track loans and repayments, and get overdue alerts.

---

## 🔧 Tech Stack

- Node.js
- Express.js
- PostgreSQL (via Sequelize)
- JWT Authentication
- Render (deployment)
- ElephantSQL / Render PostgreSQL (database)
- dotenv, bcryptjs, moment

---

## 🧪 API Features

### 1. Authentication
- `POST /api/auth/register` – Register a new shopkeeper
- `POST /api/auth/login` – Login and receive JWT token

### 2. Customers
- `POST /api/customers` – Add customer
- `GET /api/customers` – View all customers
- `PUT /api/customers/:id` – Edit customer
- `DELETE /api/customers/:id` – Delete customer

### 3. Loans
- `POST /api/loans` – Create a new loan
- `GET /api/loans` – Get all loans

### 4. Repayments
- `POST /api/repayments/:loanId` – Record repayment for a loan

### 5. Summary & Alerts
- `GET /api/summary` – Loan summary
- `GET /api/overdue` – Get overdue customers

All routes (except register/login) are protected via JWT.

---

## 🔐 Environment Variables

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_long_random_secret
