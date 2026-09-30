const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.pre("save", async function () {
  if (this.title) this.title = this.title.trim();
});

module.exports = mongoose.model("Task", taskSchema);
