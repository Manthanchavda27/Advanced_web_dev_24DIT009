function TaskPage({
  tasks, form, editingId, loading, saving, error, toast,
  aiLoading, onGenerate,
  onFormChange, onSubmit, onEdit, onDelete, onToggleCompleted, onCancelEdit, onRefresh, onLogout,
}) {
  const total     = tasks.length;
  const done      = tasks.filter((t) => t.completed).length;
  const pending   = total - done;

  return (
    <>
      <nav className="navbar">
        <span className="navbar-brand">✓ Task Manager</span>
        <ul className="navbar-links">
          <li><button onClick={onRefresh}>↻ Refresh</button></li>
          <li><button className="secondary" onClick={onLogout}>Logout</button></li>
        </ul>
      </nav>

      <main className="app">

        {/* Stats row */}
        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-num">{total}</span>
            <span className="stat-lbl">Total</span>
          </div>
          <div className="stat-box">
            <span className="stat-num pending">{pending}</span>
            <span className="stat-lbl">Pending</span>
          </div>
          <div className="stat-box">
            <span className="stat-num done-num">{done}</span>
            <span className="stat-lbl">Completed</span>
          </div>
        </div>

        {/* Form panel */}
        <section className="panel">
          <h2 className="panel-title">{editingId ? "✏️ Edit Task" : "＋ New Task"}</h2>
          <form className="task-form" onSubmit={onSubmit}>
            <input
              name="title" value={form.title} onChange={onFormChange}
              placeholder="Task title" required
            />
            <textarea
              name="description" value={form.description} onChange={onFormChange}
              placeholder="Description (optional)"
            />
            <button type="button" className="ai-btn" onClick={onGenerate} disabled={aiLoading}>
              {aiLoading ? "Generating…" : "✨ AI Generate Description"}
            </button>
            <div className="form-row">
              <select name="priority" value={form.priority} onChange={onFormChange}>
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
              <button disabled={saving}>
                {saving ? "Saving…" : editingId ? "Update Task" : "Add Task"}
              </button>
              {editingId && (
                <button className="secondary" type="button" onClick={onCancelEdit}>Cancel</button>
              )}
            </div>
          </form>

          {error && <p className="error">{error}</p>}
          {toast && <p className="toast">{toast}</p>}
        </section>

        {/* Task list */}
        <section className="panel" style={{ marginTop: 20 }}>
          <h2 className="panel-title">Your Tasks</h2>
          {loading ? (
            <div className="spinner"></div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📋</span>
              <p>No tasks yet. Add your first task above!</p>
            </div>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li className={`task-item ${task.completed ? "task-done" : ""}`} key={task._id}>
                  <div className="task-left">
                    <input
                      type="checkbox" checked={task.completed}
                      onChange={() => onToggleCompleted(task)}
                    />
                    <div className="task-info">
                      <span className={`task-title-text ${task.completed ? "done" : ""}`}>{task.title}</span>
                      {task.description && <span className="task-desc">{task.description}</span>}
                    </div>
                  </div>
                  <div className="task-right">
                    <span className={`priority ${task.priority}`}>{task.priority}</span>
                    <button type="button" className="icon-btn" onClick={() => onEdit(task)}>Edit</button>
                    <button type="button" className="icon-btn secondary" onClick={() => onDelete(task)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

      </main>
    </>
  );
}

export default TaskPage;
