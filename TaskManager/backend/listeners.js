const taskEvents = require("./events");

// Listener: task-created
taskEvents.on("task-created", (task) => {
  // Simulate slow notification (2 seconds) to prove API responds before handler finishes
  setTimeout(() => {
    console.log(`[Notification] Task "${task.title}" created at ${new Date().toISOString()} | Priority: ${task.priority}`);
  }, 2000);
});

// Supplementary: task-deleted listener
taskEvents.on("task-deleted", (task) => {
  console.log(`[Notification] Task "${task.title}" was deleted at ${new Date().toISOString()}`);
});

// Supplementary: error listener — prevents unhandled error crash
taskEvents.on("error", (err) => {
  console.error(`[TaskEvents Error] ${err.message}`);
});
