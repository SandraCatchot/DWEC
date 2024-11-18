const palabrasSecretas = [
  "JAVASCRIPT",
  "HELICOPTERO",
  "PROGRAMACION",
  "HUESO",
  "GAVIOTA",
  "OCEANO",
  "COSTILLA",
  "COCHE",
  "ESTANTERIA",
  "DISEÑO",
  "NUMERO",
  "LETRA",
  "DISCORDIA",
  "ELEGANCIA",
  "VESTIMENTA",
  "LOCUTOR",
  "AUTOMOVIL",
  "TECLADO",
  "RATON",
  "JIRAFA",
  "ELEFANTE",
  "PANTALLA",
  "WINDOWS",
];

let palabraSecreta = "";
let nombreJugador = "";
const botonIniciar = document.getElementById("botonIniciar");
const palabraSecretaDiv = document.getElementById("palabra-secreta");
const erroresDiv = document.getElementById("contenedor-errores");
const intentosDiv = document.getElementById("contenedor-intentos");
const cronometroDiv = document.getElementById("contenedor-cronometro");
const cronometroLetraDiv = document.getElementById("contenedor-cronometro-letra");
const imagenAhorcado = document.getElementById("imagen-ahorcado");
const botonReiniciar = document.getElementById("botonReiniciar");
const botonParar = document.getElementById("botonParar");

let contadorErrores = 0;
const maxIntentos = 7;
let tiempo = 0;
let cronometroEnMarcha = false;
let cronometroInterval;
let tiempoCuentaAtras = 5;
let cuentaAtrasInterval;

function pedirNombreJugador() {
  nombreJugador = prompt("Por favor, introduce tu NOMBRE:");
  if (!nombreJugador || nombreJugador.trim() === "") {
    alert("El nombre no puede estar vacío. Inténtalo de nuevo.");
    pedirNombreJugador();
  }
}

function guardarDatosJugador() {
  const datosJugador = {
    nombre: nombreJugador,
    palabra: palabraSecreta,
    tiempo: tiempo,
    errores: contadorErrores,
  };

  let historial = JSON.parse(localStorage.getItem("historialAhorcado")) || [];
  historial.push(datosJugador);
  localStorage.setItem("historialAhorcado", JSON.stringify(historial));

  console.log("Datos guardados:", datosJugador);
}

botonIniciar.addEventListener("click", () => {
  inicializarJuego();
});

botonReiniciar.addEventListener("click", reiniciarJuego);
botonParar.addEventListener("click", pararJuego);

function inicializarJuego() {
  pedirNombreJugador();
  palabraSecreta =
    palabrasSecretas[Math.floor(Math.random() * palabrasSecretas.length)];
  palabraSecretaDiv.innerHTML = "";
  erroresDiv.innerText = "";
  intentosDiv.innerText = `Intentos restantes: ${maxIntentos}`;
  cronometroDiv.innerText = "Tiempo TOTAL: 0 segundos";
  cronometroLetraDiv.innerText = "";
  imagenAhorcado.src = "img/0.png";
  contadorErrores = 0;
  tiempo = 0;
  detenerCronometro();
  detenerCuentaAtras();

  for (let i = 0; i < palabraSecreta.length; i++) {
    const letra = document.createElement("span");
    letra.classList.add("letra-secreta");
    letra.innerText = "_";
    palabraSecretaDiv.appendChild(letra);
  }

  document.querySelectorAll(".letra").forEach((boton) => {
    boton.disabled = false;
    boton.classList.remove("correcta", "incorrecta");
  });

  iniciarCronometro();
  iniciarCuentaAtras();
}

function iniciarCronometro() {
  if (!cronometroEnMarcha) {
    cronometroEnMarcha = true;
    cronometroInterval = setInterval(() => {
      tiempo++;
      cronometroDiv.innerText = `Tiempo TOTAL: ${tiempo} segundos`;
    }, 1000);
  }
}

function detenerCronometro() {
  clearInterval(cronometroInterval);
  cronometroEnMarcha = false;
}

function iniciarCuentaAtras() {
  detenerCuentaAtras();
  tiempoCuentaAtras = 5;
  cronometroLetraDiv.innerText = `Tiempo LETRA: ${tiempoCuentaAtras} segundos`;

  cuentaAtrasInterval = setInterval(() => {
    tiempoCuentaAtras--;
    cronometroLetraDiv.innerText = `Tiempo LETRA: ${tiempoCuentaAtras} segundos`;

    if (tiempoCuentaAtras <= 0) {
      reducirIntentos(); 
      detenerCuentaAtras();
      iniciarCuentaAtras();
    }
  }, 1000);
}

function detenerCuentaAtras() {
  clearInterval(cuentaAtrasInterval);
}

function reducirIntentos() {
  contadorErrores++;
  erroresDiv.innerText = `Errores: ${contadorErrores}`;
  intentosDiv.innerText = `Intentos restantes: ${maxIntentos - contadorErrores}`;
  actualizarImagenAhorcado();

  if (contadorErrores >= maxIntentos) {
    detenerCronometro();
    detenerCuentaAtras();
    intentosDiv.innerText = "Juego Terminado: ¡Has perdido!";
    desactivarBotones();
  }
}

function actualizarImagenAhorcado() {
  if (contadorErrores <= maxIntentos) {
    imagenAhorcado.src = `img/${contadorErrores}.png`;
  }
}

function verificarLetra(letra, boton) {
  detenerCuentaAtras(); // Reiniciar cuenta atrás cuando se selecciona una letra
  iniciarCuentaAtras();

  let letraEncontrada = false;
  const letras = document.querySelectorAll(".letra-secreta");

  for (let i = 0; i < palabraSecreta.length; i++) {
    if (palabraSecreta[i] === letra) {
      letras[i].innerText = letra;
      letraEncontrada = true;
    }
  }

  if (letraEncontrada) {
    boton.classList.add("correcta");

    const palabraDescubierta = [...letras].every(
      (letra) => letra.innerText !== "_"
    );
    if (palabraDescubierta) {
      detenerCronometro();
      detenerCuentaAtras();
      intentosDiv.innerText = "¡HAS GANADO!";
      desactivarBotones();
      guardarDatosJugador();
      return;
    }
  } else {
    boton.classList.add("incorrecta");
    reducirIntentos();
  }

  boton.disabled = true;
}

function desactivarBotones() {
  document.querySelectorAll(".letra").forEach((boton) => {
    boton.disabled = true;
  });
}

function pararJuego() {
  detenerCronometro(); 
  detenerCuentaAtras(); 
  desactivarBotones(); 
  intentosDiv.innerText = "Juego pausado. Reinicia o inicia para continuar.";
}

function reiniciarJuego() {
  inicializarJuego();
}

document.querySelectorAll(".letra").forEach((boton) => {
  boton.addEventListener("click", () => {
    const letra = boton.innerText;
    verificarLetra(letra, boton);
    boton.disabled = true;
  });
});
