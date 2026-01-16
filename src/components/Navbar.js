import { router } from "../router.js";

export function Navbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar";

  nav.innerHTML = `
    <div class="navbar-logo">
      <img src="images/logo/logo.png.jpeg" alt="NovaHaven Logo" />
    </div>
    <div class="navbar-links">
      <a href="/" data-link>Home</a>
      <a href="/lands" data-link>Lands</a>
      <a href="/properties" data-link>Properties</a>
      <a href="/safaris" data-link>Safaris</a>
      <a href="/contact" data-link>Contact</a>
    </div>
  `;

  // SPA navigation
  nav.querySelectorAll("[data-link]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, null, link.getAttribute("href"));
      router();
    });
  });

  return nav;
}

