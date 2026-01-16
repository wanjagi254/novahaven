export function ContactForm() {
    const wrapper = document.createElement("div");
    wrapper.className = "contact-form-wrapper";

    wrapper.innerHTML = `
        <h2>Contact Us</h2>
        <p>Fill out the form and we'll get back to you shortly.</p>
        <form class="contact-form">
            <input type="text" name="name" placeholder="Full Name" required />
            <input type="email" name="email" placeholder="Email Address" required />
            <input type="text" name="subject" placeholder="Subject" required />
            <textarea name="message" rows="5" placeholder="Message" required></textarea>
            <button type="submit" class="cta-btn">Send Message</button>
        </form>
        <p class="form-feedback"></p>
    `;

    const form = wrapper.querySelector(".contact-form");
    const feedback = wrapper.querySelector(".form-feedback");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        feedback.textContent = "Thank you! Your message has been sent.";
        feedback.style.color = "#FFC857";
        form.reset();
    });

    return wrapper;
}
