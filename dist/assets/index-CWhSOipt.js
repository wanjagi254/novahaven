(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();function p(){const e=document.createElement("div");return e.innerHTML=`
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
  `,e}function m(){const e=document.createElement("div");e.className="page",e.innerHTML=`
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
  `;const i=e.querySelector(".image-grid"),a=e.querySelector(".booking-form"),l=a.querySelector("select"),o=a.querySelector(".message");async function n(){const t=await(await fetch("http://localhost:3000/api/catalog")).json();i.innerHTML=t.lands.map(s=>`
      <div class="image-card" style="background-image:url('${s.image}')">
        <div class="image-overlay">
          <h3>${s.title}</h3>
        </div>
      </div>
    `).join(""),l.innerHTML='<option value="">Select Land</option>'+t.lands.map(s=>`<option value="${s.title}">${s.title}</option>`).join("")}return a.onsubmit=async r=>{r.preventDefault();const t={name:a.name.value,email:a.email.value,service:"land",package:a.package.value};try{if(!(await fetch("http://localhost:3000/api/bookings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok)throw new Error("Failed to submit booking");o.textContent="Booking submitted successfully!",a.reset()}catch{o.textContent="Failed to submit booking",o.style.color="red"}},n(),e}function g(){const e=document.createElement("div");e.className="page",e.innerHTML=`
    <h1 class="page-title">Properties</h1>
    <div class="image-grid"></div>
    <h2>Book a Property</h2>
    <form class="booking-form">
      <input name="name" placeholder="Your Name" required />
      <input name="email" type="email" placeholder="Your Email" required />
      <select name="package" required>
        <option value="">Select Property</option>
      </select>
      <button>Book Now</button>
      <p class="message" style="color:green;"></p>
    </form>
  `;const i=e.querySelector(".image-grid"),a=e.querySelector(".booking-form"),l=a.querySelector("select"),o=a.querySelector(".message");async function n(){const t=await(await fetch("http://localhost:3000/api/catalog")).json();i.innerHTML=t.properties.map(s=>`
      <div class="image-card" style="background-image:url('${s.image}')">
        <div class="image-overlay">
          <h3>${s.title}</h3>
        </div>
      </div>
    `).join(""),l.innerHTML='<option value="">Select Property</option>'+t.properties.map(s=>`<option value="${s.title}">${s.title}</option>`).join("")}return a.onsubmit=async r=>{r.preventDefault();const t={name:a.name.value,email:a.email.value,service:"property",package:a.package.value};try{if(!(await fetch("http://localhost:3000/api/bookings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok)throw new Error("Failed to submit booking");o.textContent="Booking submitted successfully!",a.reset()}catch{o.textContent="Failed to submit booking",o.style.color="red"}},n(),e}function f(){const e=document.createElement("div");e.className="page",e.innerHTML=`
    <h1 class="page-title">Safaris</h1>
    <div class="image-grid"></div>
    <h2>Book a Safari</h2>
    <form class="booking-form">
      <input name="name" placeholder="Your Name" required />
      <input name="email" type="email" placeholder="Your Email" required />
      <select name="package" required>
        <option value="">Select Safari</option>
      </select>
      <button>Book Now</button>
      <p class="message" style="color:green;"></p>
    </form>
  `;const i=e.querySelector(".image-grid"),a=e.querySelector(".booking-form"),l=a.querySelector("select"),o=a.querySelector(".message");async function n(){const t=await(await fetch("http://localhost:3000/api/catalog")).json();i.innerHTML=t.safaris.map(s=>`
      <div class="image-card" style="background-image:url('${s.image}')">
        <div class="image-overlay">
          <h3>${s.title}</h3>
        </div>
      </div>
    `).join(""),l.innerHTML='<option value="">Select Safari</option>'+t.safaris.map(s=>`<option value="${s.title}">${s.title}</option>`).join("")}return a.onsubmit=async r=>{r.preventDefault();const t={name:a.name.value,email:a.email.value,service:"safari",package:a.package.value};try{if(!(await fetch("http://localhost:3000/api/bookings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok)throw new Error("Failed to submit booking");o.textContent="Booking submitted successfully!",a.reset()}catch{o.textContent="Failed to submit booking",o.style.color="red"}},n(),e}function h(){const e=document.createElement("div");e.className="page",e.innerHTML=`
    <h1>Contact Us</h1>

    <form class="inquiry-form">
      <h2>Send an Inquiry</h2>
      <input type="text" id="name" placeholder="Your Name" required />
      <input type="email" id="email" placeholder="Your Email" required />
      <textarea id="message" placeholder="Your Message" required></textarea>
      <button type="submit">Submit</button>
    </form>
  `;const i=e.querySelector(".inquiry-form");return i.addEventListener("submit",async a=>{a.preventDefault();const l=i.querySelector("#name").value,o=i.querySelector("#email").value,n=i.querySelector("#message").value;try{(await(await fetch("http://localhost:3000/api/inquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:l,email:o,message:n})})).json()).success?(alert("Inquiry sent successfully!"),i.reset()):alert("Failed to send inquiry.")}catch(r){console.error(r),alert("Cannot connect to server.")}}),e}function y(){const e=document.createElement("div");e.className="admin-page",e.innerHTML=`
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
  `,e.querySelector(".logout-btn").onclick=async()=>{await fetch("http://localhost:3000/api/admin/logout",{method:"POST",credentials:"include"}),location.href="/admin-login"};async function i(){return(await(await fetch("http://localhost:3000/api/admin/session",{credentials:"include"})).json()).loggedIn?!0:(location.href="/admin-login",!1)}e.querySelector(".admin-form").onsubmit=async n=>{n.preventDefault();const r=n.target,t={title:r.title.value.trim(),description:r.description.value.trim(),image:r.image.value.trim()};if(!t.title||!t.description||!t.image)return alert("All fields are required!");if(!(await(await fetch(`http://localhost:3000/api/catalog/${r.type.value}`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json()).success)return alert("Failed to add catalog item");r.reset(),await a(),alert("Catalog item added successfully!")};async function a(){const r=await(await fetch("http://localhost:3000/api/catalog",{credentials:"include"})).json(),t=Object.entries(r).map(([s,u])=>u.length?u.map(c=>`
            <div class="admin-card">
              <strong>${s}</strong>
              <img src="${c.image}" alt="${c.title}" />
              <p>${c.title}</p>
              <p>${c.description}</p>
            </div>
          `).join(""):`<p>No items in ${s}.</p>`).join("");e.querySelector("#catalog").innerHTML=t||"<p>No catalog items yet.</p>"}async function l(){const n=await fetch("http://localhost:3000/api/bookings",{credentials:"include"});if(!n.ok){e.querySelector("#bookings").innerHTML="<p>Failed to load bookings.</p>";return}const r=await n.json();if(!r.length){e.querySelector("#bookings").innerHTML="<p>No bookings yet.</p>";return}e.querySelector("#bookings").innerHTML=r.map(t=>`
      <div class="admin-card">
        <strong>Service:</strong> ${t.service}<br/>
        <strong>Package:</strong> ${t.package}<br/>
        <strong>Name:</strong> ${t.name}<br/>
        <strong>Email:</strong> ${t.email}<br/>
        <strong>Status:</strong> ${t.status}<br/>
        <small>${t.date}</small><br/>
        <button class="approve" data-id="${t.id}" ${t.status==="approved"?"disabled":""}>Approve</button>
        <button class="cancel" data-id="${t.id}" ${t.status==="cancelled"?"disabled":""}>Cancel</button>
        <button class="delete-booking" data-id="${t.id}">Delete</button>
      </div>
    `).join(""),e.querySelectorAll(".approve").forEach(t=>{t.onclick=async()=>{await fetch(`http://localhost:3000/api/bookings/${t.dataset.id}`,{method:"PUT",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"approved"})}),await l(),alert("Booking approved!")}}),e.querySelectorAll(".cancel").forEach(t=>{t.onclick=async()=>{await fetch(`http://localhost:3000/api/bookings/${t.dataset.id}`,{method:"PUT",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"cancelled"})}),await l(),alert("Booking cancelled!")}}),e.querySelectorAll(".delete-booking").forEach(t=>{t.onclick=async()=>{confirm("Delete this booking?")&&(await fetch(`http://localhost:3000/api/bookings/${t.dataset.id}`,{method:"DELETE",credentials:"include"}),await l(),alert("Booking deleted!"))}})}async function o(){const n=await fetch("http://localhost:3000/api/inquiries",{credentials:"include"});if(!n.ok){e.querySelector("#inquiries").innerHTML="<p>Failed to load inquiries.</p>";return}const r=await n.json();if(!r.length){e.querySelector("#inquiries").innerHTML="<p>No inquiries yet.</p>";return}e.querySelector("#inquiries").innerHTML=r.map(t=>`
      <div class="admin-card">
        <p><strong>${t.name}</strong> (${t.email})</p>
        <p>${t.message}</p>
        <small>${t.date}</small><br/>
        <button class="toggle-read" data-id="${t.id}">${t.read?"Mark Unread":"Mark Read"}</button>
        <button class="delete-inquiry" data-id="${t.id}">Delete</button>
      </div>
    `).join(""),e.querySelectorAll(".toggle-read").forEach(t=>{t.onclick=async()=>{await fetch(`http://localhost:3000/api/inquiries/${t.dataset.id}`,{method:"PUT",credentials:"include"}),await o()}}),e.querySelectorAll(".delete-inquiry").forEach(t=>{t.onclick=async()=>{confirm("Delete this inquiry?")&&(await fetch(`http://localhost:3000/api/inquiries/${t.dataset.id}`,{method:"DELETE",credentials:"include"}),await o())}})}return(async()=>await i()&&(await a(),await l(),await o()))(),e}function v(){const e=document.createElement("div");e.className="page",e.innerHTML=`
    <h1>Admin Login</h1>

    <form class="admin-login-form">
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>

    <p class="error" style="color:red;margin-top:1rem;"></p>
  `;const i=e.querySelector(".admin-login-form"),a=e.querySelector(".error");return i.onsubmit=async l=>{if(l.preventDefault(),!(await fetch("http://localhost:3000/api/admin/login",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:i.email.value,password:i.password.value})})).ok){a.textContent="Invalid credentials";return}location.href="/admin"},e}const b={"/":p,"/lands":m,"/properties":g,"/safaris":f,"/contact":h,"/admin-login":v,"/admin":y};async function d(){const e=document.getElementById("app");if(!e)return;const i=window.location.pathname;if(i==="/admin"&&!(await(await fetch("http://localhost:3000/api/admin/session",{credentials:"include"})).json()).loggedIn)return history.replaceState(null,"","/admin-login"),d();e.innerHTML="";const a=(b[i]||p)();e.appendChild(a)}function k(){const e=document.createElement("footer");e.className="site-footer",e.innerHTML=`
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
  `;const i=e.querySelector(".footer-contact-form"),a=e.querySelector(".feedback");return i.onsubmit=async l=>{l.preventDefault(),a.textContent="";const o={name:i.name.value.trim(),email:i.email.value.trim(),message:i.message.value.trim()};if(!o.name||!o.email||!o.message){a.style.color="red",a.textContent="Please fill in all fields.";return}try{if(!(await fetch("http://localhost:3000/api/inquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).ok)throw new Error("Failed to send message.");i.reset(),a.style.color="limegreen",a.textContent="Message sent! We'll get back to you soon."}catch{a.style.color="red",a.textContent="Failed to send message. Try again later."}},e}async function S(){const e=document.getElementById("adminLink");if(e)try{const a=await(await fetch("http://localhost:3000/api/admin/session",{credentials:"include"})).json();e.style.display=a.loggedIn?"inline-block":"none"}catch{e.style.display="none"}}function q(){document.body.addEventListener("click",e=>{e.target.matches("[data-link]")&&(e.preventDefault(),history.pushState(null,"",e.target.href),d())})}window.addEventListener("popstate",d);window.addEventListener("DOMContentLoaded",async()=>{if(q(),await S(),d(),!document.querySelector("footer.site-footer")){const i=k();document.body.appendChild(i)}});
