export const modalHelper = (
  modal: HTMLElement,
  openBtn: HTMLElement,
  haveToBeRemoved?: boolean
) => {
  const mainContent = document.querySelectorAll(
    "body > *:not(#modal):not(.loader)"
  );

  const keyDown = (e) => {
    if (e.key !== "Escape" && e.key !== "Tab") return;

    const focusableElements: NodeListOf<HTMLElement> = modal.querySelectorAll(
      "button, [href], input, video, img"
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
    modal.classList.add("fadeOut");
    mainContent.forEach((item) => {
      item.setAttribute("aria-hidden", "false");
    });

    window.setTimeout(() => {
      modal.classList.remove("fadeOut");
      haveToBeRemoved ? modal.remove() : (modal.style.display = "none");
    }, 300);

    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (openBtn) openBtn.focus();

    // remove listener
    document.removeEventListener("keydown", keyDown);
  };

  const onOpenModal = () => {
    modal.style.display = "flex";
    const closeBtn: HTMLElement = modal.querySelector(".close-btn");

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
