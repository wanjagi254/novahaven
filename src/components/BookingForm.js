export function BookingForm({ service, packageName }) {
  const form = document.createElement("form");
  form.className = "booking-form";

  form.innerHTML = `
    <h3>Book ${packageName}</h3>

    <input name="name" placeholder="Full Name" required />
    <input name="email" type="email" placeholder="Email Address" required />

    <button type="submit">Submit Booking</button>
  `;

  form.onsubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.value,
      email: form.email.value,
      service,
      package: packageName
    };

    console.log("BOOKING PAYLOAD →", payload);

    const res = await fetch("http://localhost:3000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("BOOKING FAILED →", text);
      alert("Failed to submit booking");
      return;
    }

    alert("Booking submitted successfully");
    form.reset();
  };

  return form;
}
