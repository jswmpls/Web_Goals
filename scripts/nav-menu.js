// Работа с меню навигации (nav-menu)
const btnNavMobile = document.querySelector(".mobile-btn");
const navMenuMobile = document.querySelector(".mobile-menu");
btnNavMobile.addEventListener("click", openNavMenu);
function openNavMenu() {
  navMenuMobile.classList.toggle("hide");
}
