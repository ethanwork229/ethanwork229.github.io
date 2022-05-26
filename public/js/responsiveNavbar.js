const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

const classExists = document.getElementsByClassName("mobile-navbar").length > 0;

toggleButton.addEventListener("click", (e) => {
  navbarLinks.classList.toggle("active");
});
