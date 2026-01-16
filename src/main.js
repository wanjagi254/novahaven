import "./styles/styles.css";
import { router } from "./router.js";
import { Footer } from "./components/Footer.js"; // <-- import Footer

async function updateAdminLink() {
  const adminLink = document.getElementById("adminLink");
  if (!adminLink) return;

  try {
    const res = await fetch("http://localhost:3000/api/admin/session", {
      credentials: "include",
    });
    const data = await res.json();

    adminLink.style.display = data.loggedIn ? "inline-block" : "none";
  } catch {
    adminLink.style.display = "none";
  }
}

function enableNavigation() {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });
}

window.addEventListener("popstate", router);

window.addEventListener("DOMContentLoaded", async () => {
  enableNavigation();
  await updateAdminLink();
  router();

  // -----------------------------
  // Attach Footer once globally
  // -----------------------------
  const existingFooter = document.querySelector("footer.site-footer");
  if (!existingFooter) {
    const footer = Footer();
    document.body.appendChild(footer);
  }
});

export async function refreshAdminUI() {
  await updateAdminLink();
}
