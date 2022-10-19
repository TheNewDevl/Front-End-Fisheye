export const modalHelper = (modal: HTMLElement, openBtn: HTMLElement) => {
  const mainContent = document.querySelectorAll("header, main, footer");

  const onModalClose = () => {
    mainContent.forEach((item) => {
      item.setAttribute("aria-hidden", "false");
    });
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    openBtn.focus();
  };

  const onOpenModal = () => {
    const closeBtn: HTMLElement = document.querySelector(".close-btn");

    mainContent.forEach((item) => {
      item.setAttribute("aria-hidden", "true");
    });
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    closeBtn.focus();

    document.body.classList.add("no-scroll");
    closeBtn.addEventListener("click", onModalClose);
  };

  return { onModalClose, onOpenModal };
};
