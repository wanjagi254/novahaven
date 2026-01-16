import { Modal } from "./Modal.js";

export function PropertyCard({ title, img, description }) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="/src/assets/images/${img}" alt="${title}" />
    <h3>${title}</h3>
  `;

  card.addEventListener("click", () => {
    Modal({ title, image: `/src/assets/images/${img}`, description });
  });

  return card;
}

