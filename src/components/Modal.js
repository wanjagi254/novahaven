export function Modal({ title, image, description }) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  const modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
    <button class="modal-close">&times;</button>
    <img src="${image}" alt="${title}" />
    <h2>${title}</h2>
    <p>${description}</p>
  `;

  overlay.appendChild(modal);

  modal.querySelector(".modal-close").addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  });

  document.body.appendChild(overlay);
}
