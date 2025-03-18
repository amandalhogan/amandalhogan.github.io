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





document.addEventListener("DOMContentLoaded", function () {
    // Force start in dark mode
    setTheme("dark");

    document.getElementById("light-toggle").addEventListener("click", function () {
        let currentTheme = document.documentElement.getAttribute("data-theme");
        let newTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    });
});

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    let moonIcon = document.getElementById("toggle-dark");
    let sunIcon = document.getElementById("toggle-light");

    if (theme === "dark") {
        document.body.classList.add("star-bg");
        moonIcon.style.display = "none";
        sunIcon.style.display = "inline";
    } else {
        document.body.classList.remove("star-bg");
        moonIcon.style.display = "inline";
        sunIcon.style.display = "none";
    }
}
