export function Lands() {
  const page = document.createElement("div");
  page.className = "page";

  page.innerHTML = `
    <h1 class="page-title">Lands</h1>
    <div class="image-grid"></div>
    <h2>Book a Land</h2>
    <form class="booking-form">
      <input name="name" placeholder="Your Name" required />
      <input name="email" type="email" placeholder="Your Email" required />
      <select name="package" required>
        <option value="">Select Land</option>
      </select>
      <button>Book Now</button>
      <p class="message" style="color:green;"></p>
    </form>
  `;

  const grid = page.querySelector(".image-grid");
  const form = page.querySelector(".booking-form");
  const packageSelect = form.querySelector("select");
  const message = form.querySelector(".message");

  async function loadItems() {
    const res = await fetch("http://localhost:3000/api/catalog");
    const data = await res.json();

    // Fill grid
    grid.innerHTML = data.lands.map(item => `
      <div class="image-card" style="background-image:url('${item.image}')">
        <div class="image-overlay">
          <h3>${item.title}</h3>
        </div>
      </div>
    `).join("");

    // Fill booking select
    packageSelect.innerHTML = `<option value="">Select Land</option>` +
      data.lands.map(item => `<option value="${item.title}">${item.title}</option>`).join("");
  }

  form.onsubmit = async e => {
    e.preventDefault();
    const payload = {
      name: form.name.value,
      email: form.email.value,
      service: "land",
      package: form.package.value
    };
    try {
      const res = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to submit booking");
      message.textContent = "Booking submitted successfully!";
      form.reset();
    } catch (err) {
      message.textContent = "Failed to submit booking";
      message.style.color = "red";
    }
  };

  loadItems();
  return page;
}
