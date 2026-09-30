require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskmanager";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Content-Type validation middleware for POST and PUT
app.use((req, res, next) => {
  if ((req.method === "POST" || req.method === "PUT") &&
      !req.is("application/json")) {
    return res.status(415).json({ error: "Content-Type must be application/json" });
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Task Management API",
    endpoints: ["/api/auth/register", "/api/auth/login", "/api/auth/me", "/tasks"],
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
    return res.status(400).json({ error: "Validation failed", details: errors });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid task id" });
  }

  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
