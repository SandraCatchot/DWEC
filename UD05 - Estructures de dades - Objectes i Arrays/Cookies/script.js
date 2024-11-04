let crearCookie = document.getElementById("crearCookie");
let verCookies = document.getElementById("verCookies");

crearCookie.addEventListener("click", creaCookie, false);
verCookies.addEventListener("click", verTodasLasCookies, false);

function creaCookie() {
  let usuari = "pepe@pepe.com";
  document.cookie =
    "usuari=" +
    encodeURIComponent(usuari) +
    " ; expires=Tue, 29 Oct 2024 12:00:00 GMT ";
}

function verTodasLasCookies() {
  console.log(document.cookie);
}

verTodasLasCookies();
