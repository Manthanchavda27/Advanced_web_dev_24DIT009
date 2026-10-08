import { useEffect, useState, lazy, Suspense } from "react";
import { createTask, deleteTask, getTasks, login, register, updateTask } from "./api";
import LoadingFallback from "./components/LoadingFallback";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const TaskPage = lazy(() => import("./pages/TaskPage"));

const emptyForm = { title: "", description: "", priority: "medium" };
const emptyAuth = { name: "", email: "", password: "" };

function App() {
  const [token, setToken]       = useState(localStorage.getItem("token") || "");
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState(emptyAuth);
  const [authError, setAuthError] = useState("");
  const [tasks, setTasks]       = useState([]);
  const [form, setForm]         = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");
  const [toast, setToast]       = useState("");

  async function loadTasks() {
    try {
      setError(""); setLoading(true);
      const { tasks: data } = await getTasks();
      setTasks(data);
    } catch (err) {
      if (err.message.includes("401") || err.message.toLowerCase().includes("token")) {
        handleLogout();
      } else { setError(err.message); }
    } finally { setLoading(false); }
  }

  useEffect(() => { if (token) loadTasks(); }, [token]);

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(""), 2500); }
  function handleLogout() { localStorage.removeItem("token"); setToken(""); setTasks([]); }

  async function handleAuth(e) {
    e.preventDefault(); setAuthError("");
    try {
      const fn = authMode === "login" ? login : register;
      const { data } = await fn(authForm);
      localStorage.setItem("token", data.token);
      setToken(data.token); setAuthForm(emptyAuth);
    } catch (err) { setAuthError(err.message); }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSaving(true); setError("");
      if (editingId) {
        const { data: updated } = await updateTask(editingId, form);
        setTasks((c) => c.map((t) => (t._id === updated._id ? updated : t)));
        showToast("Task updated");
      } else {
        const { data: created } = await createTask(form);
        setTasks((c) => [created, ...c]);
        showToast("Task created");
      }
      setForm(emptyForm); setEditingId("");
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  }

  async function toggleCompleted(task) {
    try {
      const { data: updated } = await updateTask(task._id, {
        title: task.title, description: task.description,
        priority: task.priority, completed: !task.completed,
      });
      setTasks((c) => c.map((t) => (t._id === updated._id ? updated : t)));
      showToast("Task status updated");
    } catch (err) { setError(err.message); }
  }

  async function removeTask(task) {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    try {
      await deleteTask(task._id);
      setTasks((c) => c.filter((t) => t._id !== task._id));
      showToast("Task deleted");
    } catch (err) { setError(err.message); }
  }

  if (!token) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <AuthPage
          authMode={authMode} authForm={authForm} authError={authError}
          onFormChange={(e) => setAuthForm((c) => ({ ...c, [e.target.name]: e.target.value }))}
          onSubmit={handleAuth}
          onToggleMode={() => setAuthMode(authMode === "login" ? "register" : "login")}
        />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <TaskPage
        tasks={tasks} form={form} editingId={editingId}
        loading={loading} saving={saving} error={error} toast={toast}
        onFormChange={(e) => setForm((c) => ({ ...c, [e.target.name]: e.target.value }))}
        onSubmit={handleSubmit}
        onEdit={(task) => { setEditingId(task._id); setForm({ title: task.title, description: task.description || "", priority: task.priority || "medium" }); }}
        onDelete={removeTask}
        onToggleCompleted={toggleCompleted}
        onCancelEdit={() => { setEditingId(""); setForm(emptyForm); }}
        onRefresh={loadTasks}
        onLogout={handleLogout}
      />
    </Suspense>
  );
}

export default App;
