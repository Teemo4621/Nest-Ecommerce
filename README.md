# 🛒 Ecommerce API

**A RESTful API for a modern e-commerce platform.**

Built with Node.js, TypeORM, and PostgreSQL.

---

## ✨ Features

* 🔐 **User Authentication** – Register and login securely
* 🗂️ **Category Management** – Full CRUD for product categories
* 📦 **Product Management** – Add, update, or remove products
* 🧮 **Stock Management** – Manage inventory with ease

---

## 🚀 Getting Started

### 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/ecommerce-api.git
   cd ecommerce-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure your database**
   Create a PostgreSQL database and update the credentials in
   `src/config/database.config.ts`

4. **Run migrations**

   ```bash
   npx typeorm migration:run
   ```

5. **Start the development server**

   ```bash
   npm run start:dev
   ```

---

## 📚 API Endpoints

### 🔐 Auth

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/auth/register` | Register new user |
| POST   | `/auth/login`    | User login        |

---

### 👤 Users

| Method | Endpoint     | Description              |
| ------ | ------------ | ------------------------ |
| GET    | `/users/@me` | Get current user details |

---

### 🗃️ Categories

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | `/categories`     | List all categories |
| POST   | `/categories`     | Create new category |
| GET    | `/categories/:id` | Get category by ID  |
| PUT    | `/categories/:id` | Update category     |
| DELETE | `/categories/:id` | Delete category     |

---

### 🛍️ Products

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/products`     | List all products  |
| POST   | `/products`     | Create new product |
| GET    | `/products/:id` | Get product by ID  |
| PUT    | `/products/:id` | Update product     |
| DELETE | `/products/:id` | Delete product     |

---

### 🧾 Stock

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/stock`     | List all stock  |
| POST   | `/stock`     | Add stock entry |
| GET    | `/stock/:id` | Get stock by ID |
| PUT    | `/stock/:id` | Update stock    |
| DELETE | `/stock/:id` | Delete stock    |

---

## 🛠 Tech Stack

* **Node.js**
* **TypeORM**
* **PostgreSQL**
* **NestJS** (if used)
* **Docker** (optional)

---

# Made with 🤍 by **ZEMONNUB**