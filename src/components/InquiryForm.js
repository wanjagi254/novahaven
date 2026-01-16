export function InquiryForm({ title }) {
  const wrapper = document.createElement("section");
  wrapper.className = "inquiry-form";

  wrapper.innerHTML = `
    <h2>${title}</h2>

    <form>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        required
      />

      <select name="interest" required>
        <option value="">Select Interest</option>
        <option value="Land">Land</option>
        <option value="Property">Property</option>
        <option value="Safari">Safari</option>
      </select>

      <textarea
        name="message"
        placeholder="Your Message"
        rows="4"
      ></textarea>

      <button type="submit">Send Inquiry</button>

      <p class="form-status" style="display:none;"></p>
    </form>
  `;

  const form = wrapper.querySelector("form");
  const status = wrapper.querySelector(".form-status");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const data = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      interest: form.interest.value,
      message: form.message.value.trim(),
      source: title
    };

    status.style.display = "block";
    status.textContent = "Sending inquiry...";
    status.style.color = "#555";

    try {
      const res = await fetch("http://localhost:5000/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error("Request failed");

      status.textContent = "Inquiry sent successfully!";
      status.style.color = "green";
      form.reset();

    } catch (err) {
      console.error(err);

      status.textContent =
        "Server unavailable. Opening WhatsApp instead...";
      status.style.color = "red";

      const msg =
        `Hello NovaHaven,%0A%0A` +
        `Name: ${data.name}%0A` +
        `Phone: ${data.phone}%0A` +
        `Interest: ${data.interest}%0A` +
        `Message: ${data.message}`;

      window.open(
        `https://wa.me/254784758493?text=${msg}`,
        "_blank"
      );
    }
  });

  return wrapper;
}
