document.addEventListener("DOMContentLoaded", function () {
    const twinkleContainer = document.createElement("div");
    twinkleContainer.classList.add("twinkle-bg");
    document.body.appendChild(twinkleContainer);

    for (let i = 0; i < 100; i++) { // Adjust number of stars
        let star = document.createElement("span");
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let size = Math.random() * 3 + 1;

        star.style.position = "absolute";
        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.background = "white";
        star.style.borderRadius = "50%";
        star.style.opacity = "0.3";
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out alternate`;
        star.style.animationDelay = `${Math.random() * 5}s`;

        twinkleContainer.appendChild(star);
    }
});
