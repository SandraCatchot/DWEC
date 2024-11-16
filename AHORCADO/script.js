const palabraSecreta = "JAVASCRIPT";
const palabraSecretaDiv = document.getElementById("palabra-secreta");
const erroresDiv = document.getElementById("contenedor-errores");
const intentosDiv = document.getElementById("contenedor-intentos");
const cronometroDiv = document.getElementById("contenedor-cronometro");
const imagenAhorcado = document.getElementById("imagen-ahorcado");
const botonReiniciar = document.getElementById("botonReiniciar");

let contadorErrores = 0;
const maxIntentos = 7;
let tiempo = 0;
let cronometroEnMarcha = false;
let cronometroInterval;

function inicializarJuego() {
  palabraSecretaDiv.innerHTML = "";
  erroresDiv.innerText = "";
  intentosDiv.innerText = `Intentos restantes: ${
    maxIntentos - contadorErrores
  }`;
  cronometroDiv.innerText = "Tiempo: 0 segundos";
  imagenAhorcado.src = "img/0.png";
  contadorErrores = 0;
  tiempo = 0;
  cronometroEnMarcha = false;

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

  detenerCronometro();
}

function iniciarCronometro() {
  if (!cronometroEnMarcha) {
    cronometroEnMarcha = true;
    cronometroInterval = setInterval(() => {
      tiempo++;
      cronometroDiv.innerText = `Tiempo: ${tiempo} segundos`;
    }, 1000);
  }
}

function detenerCronometro() {
  clearInterval(cronometroInterval);
  cronometroEnMarcha = false;
}

function actualizarImagenAhorcado() {
  if (contadorErrores <= maxIntentos) {
    imagenAhorcado.src = `img/${contadorErrores}.png`;
  }
}

function verificarLetra(letra, boton) {
  iniciarCronometro();

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
  } else {
    boton.classList.add("incorrecta");
    contadorErrores++;
    erroresDiv.innerText = `Errores: ${contadorErrores}`;
    intentosDiv.innerText = `Intentos restantes: ${
      maxIntentos - contadorErrores
    }`;
    actualizarImagenAhorcado();
  }

  if (contadorErrores >= maxIntentos) {
    actualizarImagenAhorcado();
    detenerCronometro();
    desactivarBotones();
    intentosDiv.innerText = "Juego Terminado: ¡Has perdido!";
    window.alert("Juego Terminado: ¡Has perdido!");    
  }
}

function desactivarBotones() {
  document.querySelectorAll(".letra").forEach((boton) => {
    boton.disabled = true;
  });
}

botonReiniciar.addEventListener("click", inicializarJuego);

document.querySelectorAll(".letra").forEach((boton) => {
  boton.addEventListener("click", () => {
    const letra = boton.innerText;
    verificarLetra(letra, boton);
    boton.disabled = true;
  });
});

inicializarJuego();
