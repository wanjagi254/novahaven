export function CardSection({ cards, sectionId }) {
    const page = document.createElement("div");
    page.className = "page";

    cards.forEach(c => {
        const section = document.createElement("section");
        section.className = "card-section";
        section.id = sectionId;
        section.style.backgroundImage = `url('/src/assets/images/${c.img}')`;

        section.innerHTML = `
            <div class="section-overlay">
                <div class="section-content">
                    <h2>${c.title}</h2>
                    <p>${c.text}</p>
                </div>
            </div>
        `;

        page.appendChild(section);
    });

    return page;
}
