let botonCookie = document.getElementById("crearCookie");
let crono = document.getElementById("crono");
let cookieCreada = document.getElementById("cookieCreada");
let tiempoRestante = 30;
let intervalo;

botonCookie.addEventListener("click", iniciarCrono);

function iniciarCrono() {
  crearCookie("miCookie", "valorCookie", 30); 
  cookieCreada.textContent = `¡Enhorabuena! La cookie ha sido creada.`;
  tiempoRestante = 30; 
  clearInterval(intervalo); 
  intervalo = setInterval(actualizarCrono, 1000); // Iniciar cuenta atrás
}

function crearCookie(name, value, seconds) {
  document.cookie = `${name}=${value}; max-age=${seconds}`; //max-age -> Controlar la caducidad de una cookie sin tener que calcular una fecha específica
}

function actualizarCrono() {
  crono.textContent = `La cookie caducará en: ${tiempoRestante} segundos`;
  tiempoRestante--;

  if (tiempoRestante < 0) {
    clearInterval(intervalo);
    verificarCookie();
  }
}

function verificarCookie() {
    const cookieExiste = document.cookie.includes("miCookie=");
    if (cookieExiste) {
        crono.textContent = "La cookie aún existe.";
    } else {
        cookieCreada.textContent = "";
        crono.textContent = "La cookie ha caducado y ha sido eliminada.";
    }
}
