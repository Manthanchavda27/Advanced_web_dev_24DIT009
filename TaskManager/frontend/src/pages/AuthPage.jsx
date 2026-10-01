function AuthPage({ authMode, authForm, authError, onAuthChange, onSubmit, onToggleMode }) {
  return (
    <main className="app">
      <section className="panel">
        <div className="heading">
          <h1>Task Manager</h1>
        </div>
        <form className="task-form" onSubmit={onSubmit}>
          {authMode === "register" && (
            <input
              name="name"
              value={authForm.name}
              onChange={onAuthChange}
              placeholder="Name"
              required
            />
          )}
          <input
            name="email"
            type="email"
            value={authForm.email}
            onChange={onAuthChange}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={authForm.password}
            onChange={onAuthChange}
            placeholder="Password"
            required
          />
          <button type="submit">{authMode === "login" ? "Login" : "Register"}</button>
          <button type="button" className="secondary" onClick={onToggleMode}>
            {authMode === "login" ? "No account? Register" : "Have account? Login"}
          </button>
        </form>
        {authError && <p className="error">{authError}</p>}
      </section>
    </main>
  );
}

export default AuthPage;
