const API_URL = "http://localhost:3002";  // Your backend

async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  alert(data.message);  // e.g., "You are signed up"
}

async function signin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (response.ok) {
    // Save JWT in localStorage
    localStorage.setItem("token", data.message);
    alert("Signed in! Token stored.");
  } else {
    alert(data.message || "Sign-in failed.");
  }
}
