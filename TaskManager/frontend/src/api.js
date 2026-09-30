const BASE_URL = "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, options = {}) {
  const token = getToken();
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }

  return data;
}

export function getTasks() {
  return request("/tasks");
}

export function createTask(task) {
  return request("/tasks", { method: "POST", body: JSON.stringify(task) });
}

export function updateTask(id, task) {
  return request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(task) });
}

export function deleteTask(id) {
  return request(`/tasks/${id}`, { method: "DELETE" });
}

export function register(data) {
  return request("/api/auth/register", { method: "POST", body: JSON.stringify(data) });
}

export function login(data) {
  return request("/api/auth/login", { method: "POST", body: JSON.stringify(data) });
}

export function getMe() {
  return request("/api/auth/me");
}
