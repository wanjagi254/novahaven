import { Home } from "./pages/Home.js";
import { Lands } from "./pages/Lands.js";
import { Properties } from "./pages/Properties.js";
import { Safaris } from "./pages/Safaris.js";
import { Contact } from "./pages/Contact.js";
import { AdminDashboard } from "./pages/AdminDashboard.js";
import { AdminLogin } from "./pages/AdminLogin.js";

const routes = {
  "/": Home,
  "/lands": Lands,
  "/properties": Properties,
  "/safaris": Safaris,
  "/contact": Contact,
  "/admin-login": AdminLogin,
  "/admin": AdminDashboard
};

export async function router() {
  const app = document.getElementById("app");
  if (!app) return;

  const path = window.location.pathname;

  // Protect admin route
  if (path === "/admin") {
    const res = await fetch("http://localhost:3000/api/admin/session", {
      credentials: "include"
    });
    const data = await res.json();

    if (!data.loggedIn) {
      // redirect to login if not logged in
      history.replaceState(null, "", "/admin-login");
      return router();
    }
  }

  // Render the page
  app.innerHTML = "";
  const page = (routes[path] || Home)();
  app.appendChild(page);
}
