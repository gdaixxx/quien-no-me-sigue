const navbarIcons = document.querySelector(".herramientas");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const hamburgerMenu = document.getElementById("hamburgerMenu");
const navbar = document.querySelector(".encabezado");

// Función para revisar ancho
function checkWidth() {
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
hamburgerBtn.addEventListener("click", () => {
  hamburgerMenu.style.display =
    hamburgerMenu.style.display === "none" ? "block" : "none";
});

// Ejecutar al cargar y al redimensionar
window.addEventListener("resize", checkWidth);
checkWidth();
