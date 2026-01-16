export function Inquiry() {
  const page = document.createElement("div");
  page.className = "page inquiry-page";

  page.innerHTML = `
    <h1 class="page-title">Booking & Inquiry</h1>

    <form class="inquiry-form">
      <input type="text" placeholder="Full Name" required />
      <input type="email" placeholder="Email" required />
      <input type="tel" placeholder="Phone" required />

      <select required>
        <option value="">Select Service</option>
        <option>Lands</option>
        <option>Properties</option>
        <option>Safaris</option>
      </select>

      <textarea rows="5" placeholder="Your message"></textarea>

      <button type="submit">Submit Inquiry</button>
    </form>
  `;

  page.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    alert("Inquiry submitted successfully.");
    e.target.reset();
  });

  return page;
}
