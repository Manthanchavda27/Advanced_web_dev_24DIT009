const express = require("express");
const Task = require("../models/task");
const authMiddleware = require("../middleware/authmiddleware");
const { getCache, setCache, delCache } = require("../cache");
const taskEvents = require("../events");

const router = express.Router();

const CACHE_ALL = "all_tasks";
const taskKey = (id) => `task_${id}`;

const validateTask = (req, res, next) => {
  if (!req.body.title || req.body.title.trim() === "")
    return res.status(400).json({ error: "Title is required" });
  next();
};

router.use(authMiddleware);

// GET /tasks — cache-first
router.get("/", async (req, res, next) => {
  try {
    const cached = getCache(CACHE_ALL);
    if (cached) {
      res.set("X-Cache", "HIT");
      return res.json(cached);
    }
    const tasks = await Task.find();
    setCache(CACHE_ALL, tasks);
    res.set("X-Cache", "MISS");
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// GET /tasks/:id — cache single task separately
router.get("/:id", async (req, res, next) => {
  try {
    const key = taskKey(req.params.id);
    const cached = getCache(key);
    if (cached) {
      res.set("X-Cache", "HIT");
      return res.json(cached);
    }
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    setCache(key, task);
    res.set("X-Cache", "MISS");
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// POST /tasks — create + invalidate all-tasks cache
router.post("/", validateTask, async (req, res, next) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      priority: req.body.priority,
    });
    delCache(CACHE_ALL);
    console.log(`[API] Response sent at ${new Date().toISOString()}`);
    res.status(201).json(task);
    taskEvents.emit("task-created", task);
  } catch (err) {
    next(err);
  }
});

// PUT /tasks/:id — update + invalidate both caches
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
    delCache(CACHE_ALL, taskKey(req.params.id));
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// DELETE /tasks/:id — delete + invalidate both caches
router.delete("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    delCache(CACHE_ALL, taskKey(req.params.id));
    res.json({ message: "Task deleted successfully", task });
    taskEvents.emit("task-deleted", task);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
