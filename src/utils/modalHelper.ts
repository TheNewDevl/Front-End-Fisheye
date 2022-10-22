export const modalHelper = (modal: HTMLElement, openBtn: HTMLElement) => {
  const mainContent = document.querySelectorAll("body > *:not(#modal)");

  const keyDown = (e) => {
    if (e.key !== "Escape" && e.key !== "Tab") return;

    const focusableElements: NodeListOf<HTMLElement> = modal.querySelectorAll(
      "button, [href], input"
    );
    const firstFocusable: HTMLElement = focusableElements[0];
    const lastFocusable: HTMLElement =
      focusableElements[focusableElements.length - 1];

    switch (e.key) {
      case "Escape":
        onModalClose();
        break;
      case "Tab":
        // trap focus inside the modal
        if (e.shiftKey && document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
        break;
    }
  };

  const onModalClose = () => {
    mainContent.forEach((item) => {
      item.setAttribute("aria-hidden", "false");
    });
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (openBtn) openBtn.focus();

    // remove listener
    document.removeEventListener("keyup", keyDown);
  };

  const onOpenModal = () => {
    modal.style.display = "flex";
    const closeBtn: HTMLElement = document.querySelector(".close-btn");

    mainContent.forEach((item) => {
      item.setAttribute("aria-hidden", "true");
    });
    modal.setAttribute("aria-hidden", "false");

    if (closeBtn) {
      closeBtn.focus();
      closeBtn.addEventListener("click", onModalClose);
    }

    document.body.classList.add("no-scroll");

    // listen to escape click and close modal
    document.addEventListener("keydown", keyDown);
  };

  return { onModalClose, onOpenModal };
};
