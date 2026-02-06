const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let id = 1;

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add task
app.post("/tasks", (req, res) => {
  const task = {
    id: id++,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || "Pending"   // 👈 default
  };
  tasks.push(task);
  res.json(task);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    Object.assign(task, req.body);
    res.json(task);
  }
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Task deleted" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
