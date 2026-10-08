function AuthPage({ authMode, authForm, authError, onFormChange, onSubmit, onToggleMode }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="auth-logo-icon">✓</span>
        </div>
        <h1 className="auth-title">Task Manager</h1>
        <p className="auth-subtitle">
          {authMode === "login" ? "Sign in to your account" : "Create a new account"}
        </p>

        <form className="auth-form" onSubmit={onSubmit}>
          {authMode === "register" && (
            <div className="field">
              <label>Full Name</label>
              <input name="name" value={authForm.name} onChange={onFormChange} placeholder="Enter your name" required />
            </div>
          )}
          <div className="field">
            <label>Email Address</label>
            <input name="email" type="email" value={authForm.email} onChange={onFormChange} placeholder="Enter your email" required />
          </div>
          <div className="field">
            <label>Password</label>
            <input name="password" type="password" value={authForm.password} onChange={onFormChange} placeholder="Enter your password" required />
          </div>

          {authError && <p className="error">{authError}</p>}

          <button type="submit" className="auth-btn">
            {authMode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          {authMode === "login" ? "Don't have an account?" : "Already have an account?"}
          <button type="button" className="auth-link" onClick={onToggleMode}>
            {authMode === "login" ? "Register" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
