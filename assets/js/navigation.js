(() => {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.getElementById("navbarNav");

  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle("show", open);
    toggle.classList.toggle("collapsed", !open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  const close = () => setOpen(false);

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      close();
      toggle.focus();
    }
  });

  window.siteNavigation = { close };
})();
