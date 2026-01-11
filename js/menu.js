// Función para revisar ancho
export function checkWidth() {

const navbarIcons = document.querySelector(".herramientas");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const hamburgerMenu = document.getElementById("hamburgerMenu");
const navbar = document.querySelector(".encabezado");

  if (window.innerWidth < 500) {
    hamburgerBtn.style.display = "block";
    hamburgerMenu.appendChild(navbarIcons); // mueve los íconos al menú
    navbarIcons.style.display = "flex"; // asegurar que sea visible en el menú
  } else {
    hamburgerBtn.style.display = "none";
    if (navbar && navbarIcons.parentElement !== navbar) {
      navbar.appendChild(navbarIcons); // devuelve los íconos a la navbar
    }
    navbarIcons.style.display = "flex";
    hamburgerMenu.style.display = "none";
  }
}

// Toggle menú hamburguesa
export function hamburgerBtnToggle(){
    const navbarIcons = document.querySelector(".herramientas");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const navbar = document.querySelector(".encabezado");

      hamburgerBtn.addEventListener("click", () => {
      hamburgerMenu.style.display =
        hamburgerMenu.style.display === "none" ? "block" : "none";
    });
}
