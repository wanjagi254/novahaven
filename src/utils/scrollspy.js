export function initScrollSpy() {
    const sections = document.querySelectorAll("section[data-spy]");
    const navLinks = document.querySelectorAll(".navbar a[data-link]");

    if (!sections.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");

                    navLinks.forEach(link => {
                        link.classList.remove("active");
                        if (link.dataset.link === id) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        {
            threshold: 0.6
        }
    );

    sections.forEach(section => observer.observe(section));
}

