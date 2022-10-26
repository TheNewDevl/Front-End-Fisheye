import { ModalHelper } from "../types.js";

export const modalHelper = (
  modal: HTMLElement,
  openBtn: HTMLElement,
  haveToBeRemoved?: boolean
): ModalHelper => {
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

  /** manages the closing of the modal, its accessibility and its display  */
  const onModalClose = () => {
    //fade out animation
    modal.classList.add("fadeOut");

    //aria-hidden false to the main content and true to the modal
    mainContent.forEach((item) => {
      item.setAttribute("aria-hidden", "false");
    });
    modal.setAttribute("aria-hidden", "true");

    //remove fade out class to be able to run animation again
    //remove modal from dom or set display none depending on haveToBeRemoved param
    window.setTimeout(() => {
      modal.classList.remove("fadeOut");
      haveToBeRemoved ? modal.remove() : (modal.style.display = "none");
    }, 300);

    // remove no-scroll body class
    document.body.classList.remove("no-scroll");

    // put focus on open modal button
    if (openBtn) openBtn.focus();

    // remove listener
    document.removeEventListener("keydown", keyDown);
  };

  /** manages the opening of the modal, its accessibility and its display  */
  const onOpenModal = () => {
    modal.style.display = "flex";
    const closeBtn: HTMLElement = modal.querySelector(".close-btn");

    //aria-hidden true to the main content and false to the modal
    mainContent.forEach((item) => {
      item.setAttribute("aria-hidden", "true");
    });
    modal.setAttribute("aria-hidden", "false");

    //if close button, put focus on button and add close event listener
    if (closeBtn) {
      closeBtn.focus();
      closeBtn.addEventListener("click", onModalClose);
    }

    // add no-scroll body class
    document.body.classList.add("no-scroll");

    // listen to escape click and close modal
    document.addEventListener("keydown", keyDown);
  };

  return { onModalClose, onOpenModal };
};
