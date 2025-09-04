📌 MERN Authentication App

A simple MERN stack project with user authentication (register & login) using Express.js, JWT, MongoDB, React (Vite), and Tailwind CSS.

🚀 Features

🔐 User Authentication (Register & Login) with JWT

🛠️ Express.js backend with MVC architecture

🌱 MongoDB + Mongoose for database

⚡ React (Vite) frontend with JSX

🎨 Tailwind CSS v4 for styling

🔑 Environment variables with .env

🔄 Hot reload using Nodemon

📂 Project Structure
MERNgit_app/
│── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Pages (Home, Register, Login)
│ │ ├── App.jsx # Main App file
│ │ ├── App.css # Tailwind import
│ └── .env # Frontend environment variables
│
│── server/ # Express backend
│ ├── config/ # DB connection, JWT secret
│ ├── controllers/ # Business logic
│ ├── middleware/ # Auth middleware
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── server.js # Main entry
│ └── .env # Backend environment variables
│
│── package.json
│── README.md

⚙️ Backend Setup (server/)

Navigate to the server folder:

cd server

Install dependencies:

npm install express mongoose cors dotenv jsonwebtoken bcrypt nodemon

Create .env file in server/:

PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_app
JWT_SECRET=your_jwt_secret_key

Run backend with Nodemon:

npm run dev

🎨 Frontend Setup (client/)

Navigate to the client folder:

cd client

Install dependencies:

npm install

Install Tailwind CSS v4:

npm install tailwindcss

In src/App.css add:

@import "tailwindcss";

Run frontend:

npm run dev

🔄 Connecting Frontend & Backend

Option 1 (direct):
Use full API URL in fetch/axios:

fetch("http://localhost:5000/api/auth/register")

Option 2 (proxy):
Add this to client/vite.config.js:

export default {
server: {
proxy: {
"/api": "http://localhost:5000",
},
},
};

Then call API with:

fetch("/api/auth/register")

📌 Scripts
Backend (server/package.json)
"scripts": {
"dev": "nodemon server.js"
}

Frontend (client/package.json)
"scripts": {
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
}

✅ Usage

Start backend:

cd server
npm run dev

Start frontend:

cd client
npm run dev

Open browser at:

http://localhost:5173

🛡️ Authentication Flow

User registers → data stored in MongoDB → JWT issued

User logs in → receives JWT → stored in localStorage

Protected routes require JWT validation via middleware

📖 Tech Stack

Frontend: React (Vite), Tailwind CSS v4

Backend: Express.js, Node.js

Database: MongoDB + Mongoose

Auth: JWT + Bcrypt

📜 License

This project is open-source and available under the MIT License.
