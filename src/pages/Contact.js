// src/pages/Contact.js
export function Contact() {
  const page = document.createElement("div");
  page.className = "page";

  page.innerHTML = `
    <h1>Contact Us</h1>

    <form class="inquiry-form">
      <h2>Send an Inquiry</h2>
      <input type="text" id="name" placeholder="Your Name" required />
      <input type="email" id="email" placeholder="Your Email" required />
      <textarea id="message" placeholder="Your Message" required></textarea>
      <button type="submit">Submit</button>
    </form>
  `;

  const form = page.querySelector(".inquiry-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("#name").value;
    const email = form.querySelector("#email").value;
    const message = form.querySelector("#message").value;

    try {
      const res = await fetch("http://localhost:3000/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (data.success) {
        alert("Inquiry sent successfully!");
        form.reset();
      } else {
        alert("Failed to send inquiry.");
      }
    } catch (err) {
      console.error(err);
      alert("Cannot connect to server.");
    }
  });

  return page;
}
