(() => {
  const loader = document.currentScript;
  const searchToggle = document.querySelector("[data-search-toggle]");

  if (!loader || !searchToggle) return;

  const componentSrc = loader.dataset.componentSrc;
  const indexSrc = loader.dataset.indexSrc;
  let searchPromise;

  const loadScript = (src, type) =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      if (type) script.type = type;
      script.addEventListener("load", resolve, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });

  const ensureSearch = () => {
    if (searchPromise) return searchPromise;

    const ninja = document.createElement("ninja-keys");
    ninja.setAttribute("hideBreadcrumbs", "");
    ninja.setAttribute("noAutoLoadMdIcons", "");
    ninja.setAttribute("placeholder", "Type to start searching");
    document.body.appendChild(ninja);

    searchPromise = loadScript(componentSrc, "module")
      .then(() => customElements.whenDefined("ninja-keys"))
      .then(() => loadScript(indexSrc))
      .then(() => ninja);

    return searchPromise;
  };

  const openSearch = async () => {
    window.siteNavigation?.close();
    const ninja = await ensureSearch();
    ninja.classList.toggle("dark", determineComputedTheme() === "dark");
    ninja.open();
  };

  const shortcut = searchToggle.querySelector(".search-shortcut");
  const isMac = navigator.platform.toUpperCase().includes("MAC");
  if (shortcut) shortcut.textContent = isMac ? "⌘ K" : "Ctrl K";

  searchToggle.addEventListener("click", openSearch);
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
  });
})();
