# School Management System

A comprehensive **School Management System** that allows users to **add new schools** and **retrieve a list of schools sorted by proximity** to a given location.

---
## 📖 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---
## 🎯 Project Overview
The School Management System is designed to help manage schools efficiently by providing features such as adding schools, listing nearby schools based on proximity, and more. The system is built with a modern tech stack, ensuring a smooth and responsive user experience.

---
## 🌟 Features
- 📌 **Add a new school** with name, address, latitude, and longitude.
- 📍 **Find nearby schools**, sorted by distance from a user-specified location.
- 🚀 **Uses PostgreSQL** as the database for persistent storage.
- 🌍 **Haversine formula** for calculating distance between locations.
- 🖥️ **React (Vite) Frontend** for UI interaction.
- 🔗 **REST API endpoints** using Express.js.
- 🔒 **Secure API** with CORS configuration.

---
## 🛠 Tech Stack
- **Frontend:** React.js (Vite), React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Validation:** Zod

---
## 🚀 Installation
### Prerequisites
- Install **Node.js** & **npm**
- Install **PostgreSQL Server**

### Clone Repository
```sh
git clone https://github.com/TheUzair/school-management-system.git
cd school-management-system
```

### Setup Backend
```sh
cd backend
npm install
```
Create a `.env` file in `backend/` and add:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=schoolDB
PORT=5000
NODE_ENV=development
```
Run the backend:
```sh
npm start
```

---
## 🗄️ Database Setup
Run the following SQL commands to create the database and table:
```sql
CREATE DATABASE schoolDB;
USE schoolDB;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

### Setup Frontend
```sh
cd ../frontend
npm install
npm run dev
```

---
## 🔗 API Endpoints
### 1️⃣ Add a New School
- **Endpoint:** `POST /api/addSchool`
- **Payload:**
  ```json
  {
    "name": "ABC High School",
    "address": "123 Main St, City",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
  ```
- **Response:**
  ```json
  { "message": "School added successfully" }
  ```

### 2️⃣ List Schools Sorted by Proximity
- **Endpoint:** `GET /api/listSchools?latitude=40.7128&longitude=-74.0060`
- **Response:**
  ```json
  [
    { "id": 1, "name": "ABC High School", "address": "123 School Street, City", "latitude": 28.6139, "longitude": 77.2090, "distance": 2.5 },
    { "id": 2, "name": "XYZ Academy", "address": "789 School Street, City", "latitude": 77.2090, "longitude": 28.6139, "distance": 5.2 }
  ]
  ```

---
## 📂 Project Structure
```
school-management/
│── backend/
│   ├── config/
│   │   ├── db.js
│   ├── routes/
│   │   ├── schoolRoutes.js
│   ├── controllers/
│   │   ├── schoolController.js
│   ├── models/
│   │   ├── schoolModel.js
│   ├── .env
│   ├── server.js
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SchoolList.jsx
│   │   │   ├── AddSchoolForm.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
```

---
## 🎮 Usage
1. Run the backend server: `npm start`
2. Start the frontend: `npm run dev`
3. Open **http://localhost:5173** in your browser.
4. Add new schools and search for nearby schools.

---
## 🌍 Environment Variables
- `PORT`: The port on which the server will run.
- `DB_HOST`: PostgreSQL database host.
- `DB_USER`: PostgreSQL database user.
- `DB_PASS`: PostgreSQL database password.
- `DB_NAME`: PostgreSQL database name.

---
## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---
## 📜 License

This project is open-source under the [MIT License](LICENSE).

---