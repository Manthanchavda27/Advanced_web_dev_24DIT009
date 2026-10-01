function TaskPage({
  tasks, form, editingId, loading, saving, error, toast,
  onFormChange, onSubmit, onEdit, onDelete, onToggleCompleted, onCancelEdit, onRefresh, onLogout,
}) {
  return (
    <>
      <nav className="navbar">
        <span className="navbar-brand">Task Manager</span>
        <ul className="navbar-links">
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#">Tasks</a></li>
          <li><button onClick={onRefresh}>Refresh</button></li>
          <li><button className="secondary" onClick={onLogout}>Logout</button></li>
        </ul>
      </nav>

      <main className="app">
        <div className="info-box">
          <h2>Welcome to Task Manager</h2>
          <p>Organize your work and stay productive.</p>
        </div>

        <section className="panel">
          <h1>Create a New Task</h1>
          <input
            name="title"
            value={form.title}
            onChange={onFormChange}
            placeholder="Task title"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={onFormChange}
            placeholder="Description"
          />
          <select name="priority" value={form.priority} onChange={onFormChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button disabled={saving} type="submit">
            {editingId ? "Update Task" : "Create Task"}
          </button>
          {editingId && (
            <button className="secondary" type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </form>

        {error && <p className="error">{error}</p>}
        {toast && <p className="toast">{toast}</p>}

        {loading ? (
          <div className="spinner"></div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li className="task-item" key={task._id}>
                <label className="task-title">
                  <input
                    checked={task.completed}
                    onChange={() => onToggleCompleted(task)}
                    type="checkbox"
                  />
                  <span className={task.completed ? "done" : ""}>{task.title}</span>
                </label>
                {task.description && <p>{task.description}</p>}
                <div className="task-actions">
                  <span className={`priority ${task.priority}`}>{task.priority}</span>
                  <button type="button" onClick={() => onEdit(task)}>Edit</button>
                  <button type="button" onClick={() => onDelete(task)}>Delete</button>
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
