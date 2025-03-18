let toggleThemeSetting = () => {
    let e = determineThemeSetting();
    setThemeSetting("system" == e ? "light" : "light" == e ? "dark" : "system");
};

let setThemeSetting = e => {
    localStorage.setItem("theme", e);
    document.documentElement.setAttribute("data-theme-setting", e);
    applyTheme();
};

let applyTheme = () => {
    let e = determineComputedTheme();
    transTheme();
    setHighlight(e);
    setGiscusTheme(e);
    setSearchTheme(e);
    "undefined" != typeof mermaid && setMermaidTheme(e);
    "undefined" != typeof Diff2HtmlUI && setDiff2htmlTheme(e);
    "undefined" != typeof echarts && setEchartsTheme(e);
    "undefined" != typeof vegaEmbed && setVegaLiteTheme(e);
    document.documentElement.setAttribute("data-theme", e);

    let t = document.getElementsByTagName("table");
    for (let i = 0; i < t.length; i++)
        "dark" == e ? t[i].classList.add("table-dark") : t[i].classList.remove("table-dark");

    let i = document.getElementsByClassName("jupyter-notebook-iframe-container");
    for (let t = 0; t < i.length; t++) {
        let m = i[t].getElementsByTagName("iframe")[0].contentWindow.document.body;
        "dark" == e ? (m.setAttribute("data-jp-theme-light", "false"), m.setAttribute("data-jp-theme-name", "JupyterLab Dark"))
                    : (m.setAttribute("data-jp-theme-light", "true"), m.setAttribute("data-jp-theme-name", "JupyterLab Light"));
    }

    "undefined" != typeof medium_zoom && medium_zoom.update({ background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee" });

    // 🌌 Add/Remove Stars when switching modes
    if (e === "dark") {
        addStars();
    } else {
        removeStars();
    }
};

let addStars = () => {
    if (document.querySelector('.stars')) return; // Prevent multiple layers

    const starContainer = document.createElement("div");
    starContainer.classList.add("stars");

    for (let i = 0; i < 150; i++) { // Number of stars
        let star = document.createElement("div");
        star.classList.add("star");

        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 3 + 1}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;

        starContainer.appendChild(star);
    }

    document.body.appendChild(starContainer);
};

let removeStars = () => {
    const stars = document.querySelector('.stars');
    if (stars) stars.remove();
};

let setHighlight = e => {
    "dark" == e ? (document.getElementById("highlight_theme_light").media = "none", document.getElementById("highlight_theme_dark").media = "")
                : (document.getElementById("highlight_theme_dark").media = "none", document.getElementById("highlight_theme_light").media = "");
};

let setGiscusTheme = e => {
    function t(e) {
        const t = document.querySelector("iframe.giscus-frame");
        t && t.contentWindow.postMessage({ giscus: e }, "https://giscus.app");
    }
    t({ setConfig: { theme: e } });
};

let transTheme = () => {
    document.documentElement.classList.add("transition");
    window.setTimeout(() => { document.documentElement.classList.remove("transition"); }, 500);
};

let determineThemeSetting = () => {
    let e = localStorage.getItem("theme");
    return "dark" != e && "light" != e && "system" != e ? "system" : e;
};

let determineComputedTheme = () => {
    let e = determineThemeSetting();
    if ("system" == e) {
        const e = window.matchMedia;
        return e && e("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return e;
};

let initTheme = () => {
    let e = determineThemeSetting();
    setThemeSetting(e);

    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("light-toggle").addEventListener("click", function () {
            toggleThemeSetting();
        });
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches: e }) => {
        applyTheme();
    });

    // 🌌 Check if dark mode is enabled on page load
    if (document.body.classList.contains("dark-mode")) {
        addStars();
    }
};
