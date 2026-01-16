// =====================================
// src/pages/AdminDashboard.js
// =====================================

export function AdminDashboard() {
  const page = document.createElement("div");
  page.className = "admin-page";

  page.innerHTML = `
    <h1>Admin Dashboard</h1>
    <button class="logout-btn">Logout</button>

    <section>
      <h2>Catalog</h2>
      <form class="admin-form">
        <select name="type" required>
          <option value="">Category</option>
          <option value="lands">Lands</option>
          <option value="properties">Properties</option>
          <option value="safaris">Safaris</option>
        </select>
        <input name="title" placeholder="Title" required />
        <input name="image" placeholder="/uploads/example.jpg" required />
        <textarea name="description" placeholder="Description" required></textarea>
        <button>Add Item</button>
      </form>
      <div id="catalog"></div>
    </section>

    <section>
      <h2>Bookings</h2>
      <div id="bookings"></div>
    </section>

    <section>
      <h2>Inquiries</h2>
      <div id="inquiries"></div>
    </section>
  `;

  // -------------------
  // LOGOUT
  // -------------------
  page.querySelector(".logout-btn").onclick = async () => {
    await fetch("http://localhost:3000/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    location.href = "/admin-login";
  };

  // -------------------
  // SESSION CHECK
  // -------------------
  async function checkSession() {
    const res = await fetch("http://localhost:3000/api/admin/session", {
      credentials: "include",
    });
    const data = await res.json();
    if (!data.loggedIn) {
      location.href = "/admin-login";
      return false;
    }
    return true;
  }

  // -------------------
  // ADD CATALOG ITEM
  // -------------------
  page.querySelector(".admin-form").onsubmit = async (e) => {
    e.preventDefault();
    const f = e.target;

    const payload = {
      title: f.title.value.trim(),
      description: f.description.value.trim(),
      image: f.image.value.trim(),
    };

    if (!payload.title || !payload.description || !payload.image) {
      return alert("All fields are required!");
    }

    const response = await fetch(
      `http://localhost:3000/api/catalog/${f.type.value}`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    if (!data.success) return alert("Failed to add catalog item");

    f.reset();
    await loadCatalog();
    alert("Catalog item added successfully!");
  };

  // -------------------
  // LOAD CATALOG
  // -------------------
  async function loadCatalog() {
    const res = await fetch("http://localhost:3000/api/catalog", {
      credentials: "include",
    });
    const catalog = await res.json();

    const html = Object.entries(catalog)
      .map(([type, items]) => {
        if (!items.length) return `<p>No items in ${type}.</p>`;
        return items
          .map(
            (item) => `
            <div class="admin-card">
              <strong>${type}</strong>
              <img src="${item.image}" alt="${item.title}" />
              <p>${item.title}</p>
              <p>${item.description}</p>
            </div>
          `
          )
          .join("");
      })
      .join("");

    page.querySelector("#catalog").innerHTML = html || "<p>No catalog items yet.</p>";
  }

  // -------------------
  // LOAD BOOKINGS
  // -------------------
  async function loadBookings() {
    const res = await fetch("http://localhost:3000/api/bookings", {
      credentials: "include",
    });

    if (!res.ok) {
      page.querySelector("#bookings").innerHTML = "<p>Failed to load bookings.</p>";
      return;
    }

    const bookings = await res.json();
    if (!bookings.length) {
      page.querySelector("#bookings").innerHTML = "<p>No bookings yet.</p>";
      return;
    }

    page.querySelector("#bookings").innerHTML = bookings
      .map(
        (b) => `
      <div class="admin-card">
        <strong>Service:</strong> ${b.service}<br/>
        <strong>Package:</strong> ${b.package}<br/>
        <strong>Name:</strong> ${b.name}<br/>
        <strong>Email:</strong> ${b.email}<br/>
        <strong>Status:</strong> ${b.status}<br/>
        <small>${b.date}</small><br/>
        <button class="approve" data-id="${b.id}" ${
          b.status === "approved" ? "disabled" : ""
        }>Approve</button>
        <button class="cancel" data-id="${b.id}" ${
          b.status === "cancelled" ? "disabled" : ""
        }>Cancel</button>
        <button class="delete-booking" data-id="${b.id}">Delete</button>
      </div>
    `
      )
      .join("");

    // -------------------
    // BOOKING CONTROLS
    // -------------------
    page.querySelectorAll(".approve").forEach((btn) => {
      btn.onclick = async () => {
        await fetch(`http://localhost:3000/api/bookings/${btn.dataset.id}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "approved" }),
        });
        await loadBookings();
        alert("Booking approved!");
      };
    });

    page.querySelectorAll(".cancel").forEach((btn) => {
      btn.onclick = async () => {
        await fetch(`http://localhost:3000/api/bookings/${btn.dataset.id}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "cancelled" }),
        });
        await loadBookings();
        alert("Booking cancelled!");
      };
    });

    page.querySelectorAll(".delete-booking").forEach((btn) => {
      btn.onclick = async () => {
        if (!confirm("Delete this booking?")) return;
        await fetch(`http://localhost:3000/api/bookings/${btn.dataset.id}`, {
          method: "DELETE",
          credentials: "include",
        });
        await loadBookings();
        alert("Booking deleted!");
      };
    });
  }

  // -------------------
  // LOAD INQUIRIES
  // -------------------
  async function loadInquiries() {
    const res = await fetch("http://localhost:3000/api/inquiries", {
      credentials: "include",
    });

    if (!res.ok) {
      page.querySelector("#inquiries").innerHTML = "<p>Failed to load inquiries.</p>";
      return;
    }

    const inquiries = await res.json();
    if (!inquiries.length) {
      page.querySelector("#inquiries").innerHTML = "<p>No inquiries yet.</p>";
      return;
    }

    page.querySelector("#inquiries").innerHTML = inquiries
      .map(
        (i) => `
      <div class="admin-card">
        <p><strong>${i.name}</strong> (${i.email})</p>
        <p>${i.message}</p>
        <small>${i.date}</small><br/>
        <button class="toggle-read" data-id="${i.id}">${i.read ? "Mark Unread" : "Mark Read"}</button>
        <button class="delete-inquiry" data-id="${i.id}">Delete</button>
      </div>
    `
      )
      .join("");

    page.querySelectorAll(".toggle-read").forEach((btn) => {
      btn.onclick = async () => {
        await fetch(`http://localhost:3000/api/inquiries/${btn.dataset.id}`, {
          method: "PUT",
          credentials: "include",
        });
        await loadInquiries();
      };
    });

    page.querySelectorAll(".delete-inquiry").forEach((btn) => {
      btn.onclick = async () => {
        if (!confirm("Delete this inquiry?")) return;
        await fetch(`http://localhost:3000/api/inquiries/${btn.dataset.id}`, {
          method: "DELETE",
          credentials: "include",
        });
        await loadInquiries();
      };
    });
  }

  // -------------------
  // INIT
  // -------------------
  (async () => {
    const ok = await checkSession();
    if (!ok) return;
    await loadCatalog();
    await loadBookings();
    await loadInquiries();
  })();

  return page;
}
