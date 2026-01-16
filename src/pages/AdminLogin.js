export function AdminLogin() {
  const page = document.createElement("div");
  page.className = "page";

  page.innerHTML = `
    <h1>Admin Login</h1>

    <form class="admin-login-form">
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>

    <p class="error" style="color:red;margin-top:1rem;"></p>
  `;

  const form = page.querySelector(".admin-login-form");
  const error = page.querySelector(".error");

  form.onsubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/admin/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email.value,       // keep as email
        password: form.password.value  // keep as password
      })
    });

    if (!res.ok) {
      error.textContent = "Invalid credentials";
      return;
    }

    // ✅ THIS WAS MISSING: redirect to dashboard after successful login
    location.href = "/admin";
  };

  return page;
}
