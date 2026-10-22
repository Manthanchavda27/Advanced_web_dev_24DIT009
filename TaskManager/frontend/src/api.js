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

  return { data };
}

export async function getTasks() {
  const { data } = await request("/tasks");
  return { tasks: data };
}

export async function createTask(task) {
  return request("/tasks", { method: "POST", body: JSON.stringify(task) });
}

export async function updateTask(id, task) {
  return request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(task) });
}

export async function deleteTask(id) {
  return request(`/tasks/${id}`, { method: "DELETE" });
}

export async function register(data) {
  return request("/api/auth/register", { method: "POST", body: JSON.stringify(data) });
}

export async function login(data) {
  return request("/api/auth/login", { method: "POST", body: JSON.stringify(data) });
}

export async function getMe() {
  return request("/api/auth/me");
}

export async function generateDescription(title) {
  return request("/api/ai/generate-description", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}
