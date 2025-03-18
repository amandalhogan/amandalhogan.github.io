// Function to toggle between dark and light mode
let toggleThemeSetting = () => {
    let currentTheme = localStorage.getItem("theme") || "dark";
    let newTheme = (currentTheme === "dark") ? "light" : "dark";
    
    setThemeSetting(newTheme);
};

// Function to set and apply the theme
let setThemeSetting = (theme) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    applyTheme();
};

// Function to apply the theme
let applyTheme = () => {
    let theme = localStorage.getItem("theme") || "dark";  // Default to dark mode

    transTheme();
    setHighlight(theme);
    setGiscusTheme(theme);
    setSearchTheme(theme);

    if (typeof mermaid !== "undefined") setMermaidTheme(theme);
    if (typeof Diff2HtmlUI !== "undefined") setDiff2htmlTheme(theme);
    if (typeof echarts !== "undefined") setEchartsTheme(theme);
    if (typeof vegaEmbed !== "undefined") setVegaLiteTheme(theme);

    document.documentElement.setAttribute("data-theme", theme);

    // Toggle dark mode styles for elements
    document.querySelectorAll("table").forEach(table => {
        if (theme === "dark") table.classList.add("table-dark");
        else table.classList.remove("table-dark");
    });

    document.querySelectorAll(".jupyter-notebook-iframe-container iframe").forEach(iframe => {
        let iframeBody = iframe.contentWindow.document.body;
        iframeBody.setAttribute("data-jp-theme-light", theme === "dark" ? "false" : "true");
        iframeBody.setAttribute("data-jp-theme-name", theme === "dark" ? "JupyterLab Dark" : "JupyterLab Light");
    });

    if (typeof medium_zoom !== "undefined") {
        medium_zoom.update({ background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee" });
    }

    // Add twinkling stars in dark mode
    toggleTwinklingStars(theme);
};

// Function to toggle twinkling stars in dark mode
let toggleTwinklingStars = (theme) => {
    let starContainer = document.querySelector(".stars");

    if (theme === "dark") {
        if (!starContainer) {
            starContainer = document.createElement("div");
            starContainer.className = "stars";
            document.body.appendChild(starContainer);

            for (let i = 0; i < 100; i++) {
                let star = document.createElement("div");
                star.className = "star";
                star.style.top = `${Math.random() * 100}vh`;
                star.style.left = `${Math.random() * 100}vw`;
                star.style.animationDelay = `${Math.random() * 2}s`;
                starContainer.appendChild(star);
            }
        }
    } else {
        if (starContainer) starContainer.remove();
    }
};

// Function for smooth theme transitions
let transTheme = () => {
    document.documentElement.classList.add("transition");
    setTimeout(() => {
        document.documentElement.classList.remove("transition");
    }, 500);
};

// Function to initialize the theme
let initTheme = () => {
    let theme = localStorage.getItem("theme") || "dark"; // Default to dark mode
    setThemeSetting(theme);

    document.addEventListener("DOMContentLoaded", () => {
        let themeToggle = document.getElementById("light-toggle");
        if (themeToggle) {
            themeToggle.addEventListener("click", toggleThemeSetting);
        }
    });
};

// Run theme initialization
initTheme();
