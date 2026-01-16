// src/components/Footer.js
export function Footer() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-about">
        <h3>NovaHaven</h3>
        <p>Your trusted partner in lands, properties, and safaris in Kenya.</p>
      </div>

      <div class="footer-contacts">
        <h4>Contact Us</h4>
        <form class="footer-contact-form">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
          <p class="feedback" style="color:limegreen; margin-top:0.5rem;"></p>
        </form>
        <p>Email: <a href="mailto:info@novahaven.com">info@novahaven.com</a></p>
        <p>Phone: <a href="tel:+254700000000">+254 700 744 940</a></p>
        <p>Address: Nairobi, Kenya</p>
      </div>

      <div class="footer-socials">
        <h4>Follow Us</h4>
        <a href="https://facebook.com/novahaven" target="_blank">Facebook</a> |
        <a href="https://instagram.com/novahaven" target="_blank">Instagram</a> |
        <a href="https://twitter.com/novahaven" target="_blank">Twitter</a>
      </div>
    </div>

    <div class="footer-bottom">
      <small>&copy; ${new Date().getFullYear()} NovaHaven. All rights reserved.</small>
    </div>
  `;

  // -----------------------------
  // Handle contact form submission
  // -----------------------------
  const form = footer.querySelector(".footer-contact-form");
  const feedback = footer.querySelector(".feedback");

  form.onsubmit = async (e) => {
    e.preventDefault();
    feedback.textContent = ""; // reset feedback

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    if (!formData.name || !formData.email || !formData.message) {
      feedback.style.color = "red";
      feedback.textContent = "Please fill in all fields.";
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to send message.");

      form.reset();
      feedback.style.color = "limegreen";
      feedback.textContent = "Message sent! We'll get back to you soon.";
    } catch (err) {
      feedback.style.color = "red";
      feedback.textContent = "Failed to send message. Try again later.";
    }
  };

  return footer;
}
