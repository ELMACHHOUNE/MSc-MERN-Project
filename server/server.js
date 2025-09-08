const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// View engine setup
app.set("view engine", "pug");
app.set("views", "./views");

// Routes
const authRoutes = require("./routes/authRoutes");
const viewRoutes = require("./routes/viewRoutes");
app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes); // optional compatibility
app.use("/", viewRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
