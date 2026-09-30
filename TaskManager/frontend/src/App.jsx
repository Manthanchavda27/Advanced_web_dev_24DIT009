import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, login, register, updateTask } from "./api";

const emptyForm = { title: "", description: "", priority: "medium" };
const emptyAuth = { name: "", email: "", password: "" };

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"
  const [authForm, setAuthForm] = useState(emptyAuth);
  const [authError, setAuthError] = useState("");

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  async function loadTasks() {
    try {
      setError("");
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      if (err.message.includes("401") || err.message.toLowerCase().includes("token")) {
        handleLogout();
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) loadTasks();
  }, [token]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken("");
    setTasks([]);
  }

  function handleAuthChange(e) {
    const { name, value } = e.target;
    setAuthForm((c) => ({ ...c, [name]: value }));
  }

  async function handleAuth(e) {
    e.preventDefault();
    setAuthError("");
    try {
      const fn = authMode === "login" ? login : register;
      const data = await fn(authForm);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setAuthForm(emptyAuth);
    } catch (err) {
      setAuthError(err.message);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((c) => ({ ...c, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");
      if (editingId) {
        const updated = await updateTask(editingId, form);
        setTasks((c) => c.map((t) => (t._id === updated._id ? updated : t)));
        showToast("Task updated");
      } else {
        const created = await createTask(form);
        setTasks((c) => [created, ...c]);
        showToast("Task created");
      }
      setForm(emptyForm);
      setEditingId("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleCompleted(task) {
    try {
      setError("");
      const updated = await updateTask(task._id, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        completed: !task.completed,
      });
      setTasks((c) => c.map((t) => (t._id === updated._id ? updated : t)));
      showToast("Task status updated");
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(task) {
    setEditingId(task._id);
    setForm({ title: task.title, description: task.description || "", priority: task.priority || "medium" });
  }

  async function removeTask(task) {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    try {
      setError("");
      await deleteTask(task._id);
      setTasks((c) => c.filter((t) => t._id !== task._id));
      showToast("Task deleted");
    } catch (err) {
      setError(err.message);
    }
  }

  // Auth screen
  if (!token) {
    return (
      <main className="app">
        <section className="panel">
          <div className="heading">
            <h1>Task Manager</h1>
          </div>
          <form className="task-form" onSubmit={handleAuth}>
            {authMode === "register" && (
              <input name="name" value={authForm.name} onChange={handleAuthChange} placeholder="Name" required />
            )}
            <input name="email" type="email" value={authForm.email} onChange={handleAuthChange} placeholder="Email" required />
            <input name="password" type="password" value={authForm.password} onChange={handleAuthChange} placeholder="Password" required />
            <button type="submit">{authMode === "login" ? "Login" : "Register"}</button>
            <button type="button" className="secondary" onClick={() => { setAuthMode(authMode === "login" ? "register" : "login"); setAuthError(""); }}>
              {authMode === "login" ? "No account? Register" : "Have account? Login"}
            </button>
          </form>
          {authError && <p className="error">{authError}</p>}
        </section>
      </main>
    );
  }

  // Task Manager screen
  return (
    <main className="app">
      <section className="panel">
        <div className="heading">
          <h1>Task Manager</h1>
          <div>
            <button type="button" onClick={loadTasks}>Refresh</button>
            <button type="button" className="secondary" onClick={handleLogout} style={{ marginLeft: 8 }}>Logout</button>
          </div>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Task title" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button disabled={saving} type="submit">{editingId ? "Update Task" : "Create Task"}</button>
          {editingId && (
            <button className="secondary" type="button" onClick={() => { setEditingId(""); setForm(emptyForm); }}>Cancel</button>
          )}
        </form>

        {error && <p className="error">{error}</p>}
        {toast && <p className="toast">{toast}</p>}

        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li className="task-item" key={task._id}>
                <label className="task-title">
                  <input checked={task.completed} onChange={() => toggleCompleted(task)} type="checkbox" />
                  <span className={task.completed ? "done" : ""}>{task.title}</span>
                </label>
                {task.description && <p>{task.description}</p>}
                <div className="task-actions">
                  <span className={`priority ${task.priority}`}>{task.priority}</span>
                  <button type="button" onClick={() => startEdit(task)}>Edit</button>
                  <button type="button" onClick={() => removeTask(task)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
