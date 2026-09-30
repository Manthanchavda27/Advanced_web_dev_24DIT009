const express = require("express");
const Task = require("../models/task");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

// Validation middleware - rejects requests with missing title
const validateTask = (req, res, next) => {
  if (!req.body.title || req.body.title.trim() === "")
    return res.status(400).json({ error: "Title is required" });
  next();
};

// All routes below are protected by authMiddleware
router.use(authMiddleware);

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateTask, async (req, res, next) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      priority: req.body.priority,
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateTask, async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        priority: req.body.priority,
      },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully", task });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
