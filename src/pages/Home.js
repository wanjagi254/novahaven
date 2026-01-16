// src/pages/Home.js
export function Home() {
  const page = document.createElement("div");

  page.innerHTML = `
    <!-- HERO -->
    <section class="hero" style="
      background-image:
        linear-gradient(rgba(6,26,64,0.7), rgba(6,26,64,0.7)),
        url('/images/backgrounds/background.1.png');
    ">
      <div>
        <h1 style="color:#fff; font-weight:800;">
         Welcome To NovaHaven
        </h1>
        <p style="color:#fff; font-weight:600; margin-top:1rem;">
          Premium Lands, Luxury Properties & Safari Experiences in Kenya
        </p>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="page">
      <h2 class="page-title">Our Services</h2>

      <div class="image-grid">

        <div class="image-card" style="background-image:url('/images/lands/land.package1.png')">
          <div class="image-overlay" style="flex-direction:column;">
            <h3>Lands</h3>
            <p style="color:#fff; font-weight:600;">
              Prime land packages ideal for residential and commercial investment.
            </p>
          </div>
        </div>

        <div class="image-card" style="background-image:url('/images/properties/properties.package1.png')">
          <div class="image-overlay" style="flex-direction:column;">
            <h3>Properties</h3>
            <p style="color:#fff; font-weight:600;">
              Premium residential and commercial properties built to last.
            </p>
          </div>
        </div>

        <div class="image-card" style="background-image:url('/images/safaris/safari.package1.png')">
          <div class="image-overlay" style="flex-direction:column;">
            <h3>Safaris</h3>
            <p style="color:#fff; font-weight:600;">
              Unforgettable safari adventures across Kenya’s finest parks.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- MISSION & VISION -->
    <section class="page">
      <h2 class="page-title">Mission & Vision</h2>

      <div class="image-grid">

        <div class="image-card" style="background-image:url('/images/backgrounds/background.2.png')">
          <div class="image-overlay" style="flex-direction:column;">
            <h3>Our Mission</h3>
            <p style="color:#fff; font-weight:600;">
              To deliver trusted real estate and travel solutions through
              integrity, quality, and client satisfaction.
            </p>
          </div>
        </div>

        <div class="image-card" style="background-image:url('/images/backgrounds/background.3.png')">
          <div class="image-overlay" style="flex-direction:column;">
            <h3>Our Vision</h3>
            <p style="color:#fff; font-weight:600;">
              To become a leading brand in property investment and safari
              experiences across East Africa.
            </p>
          </div>
        </div>

      </div>
    </section>
  `;

  return page;
}
