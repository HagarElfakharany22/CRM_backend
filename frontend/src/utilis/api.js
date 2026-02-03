// utils/api.js
const BACKEND_URL = "http://localhost:8000/api/v1/user"; 

export const loginUser = async ({ email, password }) => {
  try {
    const res = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  } catch (err) {
    console.error("Login error:", err);
    return { error: err.message };
  }
};
