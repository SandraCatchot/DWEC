// Configuración inicial y selección de elementos
const palabrasPorCategoria = {
  animales: [
    "RATON",
    "ELEFANTE",
    "IGUANA",
    "BALLENA",
    "GUEPARDO",
    "CANGREJO",
    "KOALA",
    "SERPIENTE",
    "CANGURO",
  ],
  tecnologia: [
    "TECLADO",
    "MONITOR",
    "PROGRAMACION",
    "INTERNET",
    "PROCESADOR",
    "SMARTPHONE",
    "ROBOT",
    "ALGORITMO",
  ],
  comida: [
    "MANZANA",
    "CHOCOLATE",
    "HAMBURGUESA",
    "PIZZA",
    "HELADO",
    "LASAÑA",
    "TACOS",
    "SUSHI",
    "ENSALADA",
    "PAELLA",
  ],
  lugares: [
    "PARIS",
    "MENORCA",
    "HAWAI",
    "LONDRES",
    "TOKIO",
    "EVEREST",
    "AMAZONAS",
    "SANTORINI",
  ],
  colores: [
    "TURQUESA",
    "VIOLETA",
    "PURPURA",
    "AMARILLO",
    "CELESTE",
    "CORAL",
    "GRANATE",
    "BEIGE",
    "NARANJA",
  ],
};

let palabraSecreta = "";
let nombreJugador = "";
let contadorErrores = 0;
let tiempo = 0;
let tiempoCuentaAtras = 10;
let cronometroInterval;
let cuentaAtrasInterval;
const maxIntentos = 7;

const palabraSecretaDiv = document.getElementById("palabra-secreta");
const erroresDiv = document.getElementById("contenedor-errores");
const intentosDiv = document.getElementById("contenedor-intentos");
const cronometroDiv = document.getElementById("contenedor-cronometro");
const cronometroLetraDiv = document.getElementById(
  "contenedor-cronometro-letra"
);
const imagenAhorcado = document.getElementById("imagen-ahorcado");
const botonJugar = document.getElementById("botonJugar");
const botonRanking = document.getElementById("mostrarRanking");
const botonPista = document.getElementById("botonPista");
const selectCategoria = document.getElementById("categoria-select");
const inputNombre = document.getElementById("nombre-input");
const rankingDiv = document.getElementById("ranking");
const rankingTablaBody = document.querySelector("#rankingTabla tbody");

document.querySelectorAll(".letra").forEach((boton) => (boton.disabled = true));

// Evento del botón "JUGAR"
botonJugar.addEventListener("click", () => {
  const categoriaSeleccionada = selectCategoria.value;
  const nombre = inputNombre.value.trim();

  if (!nombre) {
    alert("Por favor, introduce tu nombre.");
    return;
  }

  if (!categoriaSeleccionada) {
    alert("Por favor, selecciona una categoría.");
    return;
  }

  nombreJugador = nombre;
  inicializarJuego(categoriaSeleccionada);
  botonPista.disabled = true;
});

function inicializarJuego(categoriaSeleccionada) {
  contadorErrores = 0;
  tiempo = 0;
  tiempoCuentaAtras = 10;
  intentosDiv.innerText = `Intentos restantes: ${maxIntentos}`;
  erroresDiv.innerText = "Errores: 0";
  cronometroDiv.innerText = "Tiempo TOTAL: 0 segundos";
  cronometroLetraDiv.innerText = "Tiempo LETRA: 10 segundos";
  imagenAhorcado.src = "img/0.png";
  palabraSecretaDiv.innerHTML = "";
  botonPista.disabled = false;
  botonJugar.style.cursor = "not-allowed";
  botonJugar.disabled = true;

  palabraSecreta =
    palabrasPorCategoria[categoriaSeleccionada][
      Math.floor(
        Math.random() * palabrasPorCategoria[categoriaSeleccionada].length
      )
    ];

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
  cronometroDiv.innerText = `Tiempo TOTAL: ${tiempo} segundos`;
  cronometroInterval = setInterval(() => {
    tiempo++;
    cronometroDiv.innerText = `Tiempo TOTAL: ${tiempo} segundos`;
  }, 1000);
}

function detenerCronometro() {
  clearInterval(cronometroInterval);
}

function iniciarCuentaAtras() {
  tiempoCuentaAtras = 10;
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
  cronometroLetraDiv.innerText = "Tiempo LETRA: 10 segundos";
}

document.querySelectorAll(".letra").forEach((boton) => {
  boton.addEventListener("click", () => {
    const letra = boton.innerText;
    verificarLetra(letra, boton);
    boton.disabled = true;
    detenerCuentaAtras();
    iniciarCuentaAtras();
  });
});

function verificarLetra(letra, boton) {
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

  if (contadorErrores >= 5) {
    botonPista.disabled = true;
    botonPista.style.background = "red";
    botonPista.innerText = "SIN PISTAS";
    botonPista.style.cursor = "not-allowed";
  }

  verificarEstadoJuego();
}

function verificarEstadoJuego() {
  if (contadorErrores >= maxIntentos) {
    detenerCronometro();
    clearInterval(cuentaAtrasInterval);
    alert(`¡Has perdido! La palabra era: ${palabraSecreta}`);
    reiniciarJuego();
    return;
  }

  if (
    [...document.querySelectorAll(".letra-secreta")].every(
      (letra) => letra.innerText !== "_"
    )
  ) {
    intentosDiv.innerText = "¡Has ganado!";
    mostrarEstiloResultado("green");
    intentosDiv.style.color = "white";
    botonPista.disabled = true;
    botonParar.disabled = true;
    botonReiniciar.disabled = true;
    detenerCronometro();
    clearInterval(cuentaAtrasInterval);
    guardarDatosJugador();
    reiniciarJuego();
  }
}

function reducirIntentos(cantidad = 1) {
  contadorErrores += cantidad;
  erroresDiv.innerText = `Errores: ${contadorErrores}`;
  intentosDiv.innerText = `Intentos restantes: ${
    maxIntentos - contadorErrores
  }`;
  actualizarImagenAhorcado();

  if (contadorErrores >= maxIntentos) {
    detenerCronometro();
    clearInterval(cuentaAtrasInterval);
    alert("¡Has perdido!");
    reiniciarJuego();
    mostrarEstiloResultado("red");
    intentosDiv.style.color = "white";
    intentosDiv.innerText = "¡Has perdido!";
    botonPista.disabled = true;
    botonParar.disabled = true;
    botonReiniciar.disabled = true;
  }
}

function mostrarEstiloResultado(color) {
  intentosDiv.style.border = "3px solid black";
  intentosDiv.style.fontWeight = "bolder";
  intentosDiv.style.fontSize = "x-large";
  intentosDiv.style.backgroundColor = color;
}

botonPista.addEventListener("click", usarPista);

// Función de usar pista corregida
function usarPista() {
  const letras = document.querySelectorAll(".letra-secreta");
  let letraRevelada = false;

  for (let i = 0; i < palabraSecreta.length; i++) {
    if (letras[i].innerText === "_") {
      letras[i].innerText = palabraSecreta[i]; // Revela una letra
      letraRevelada = true;
      break; // Revelar solo una letra
    }
  }

  if (letraRevelada) {
    reducirIntentos(2); // Reducir 2 intentos al usar la pista

    if (maxIntentos - contadorErrores < 2) {
      botonPista.disabled = true; // Desactivar el botón si no quedan suficientes intentos
      botonPista.style.display = "none"; // Opcional: ocultar el botón
    }
  }
}

function guardarDatosJugador() {
  const datosJugador = {
    nombre: nombreJugador || "Anónimo",
    palabra: palabraSecreta,
    categoria: categoriaSeleccionada,
    tiempo,
    errores: contadorErrores,
  };

  let historial = JSON.parse(localStorage.getItem("historialAhorcado")) || [];
  const registroExistente = historial.find(
    (registro) => registro.palabra === palabraSecreta
  );

  if (registroExistente) {
    let actualizado = false;

    if (tiempo < registroExistente.tiempo) {
      registroExistente.tiempo = tiempo;
      actualizado = true;
    }

    if (contadorErrores < registroExistente.errores) {
      registroExistente.errores = contadorErrores;
      actualizado = true;
    }

    if (registroExistente.nombre !== datosJugador.nombre) {
      registroExistente.nombre = datosJugador.nombre;
      actualizado = true;
    }

    if (actualizado) {
      alert(`Nuevo récord para la palabra: ${palabraSecreta}`);
    } else {
      alert(`No se superó el récord para la palabra: ${palabraSecreta}`);
    }
  } else {
    historial.push(datosJugador);
    alert(`Nueva puntuación añadida para la palabra: ${palabraSecreta}`);
  }

  localStorage.setItem("historialAhorcado", JSON.stringify(historial));
}

// Evento para mostrar el ranking
botonRanking.addEventListener("click", mostrarRanking);

function mostrarRanking() {
  let historial = JSON.parse(localStorage.getItem("historialAhorcado")) || [];
  historial = historial.filter((registro) => registro && registro.palabra);

  if (historial.length === 0) {
    alert("No hay datos válidos para mostrar en el ranking.");
    rankingDiv.style.display = "none";
    return;
  }

  rankingTablaBody.innerHTML = "";
  historial.sort((a, b) => a.palabra.localeCompare(b.palabra));

  historial.forEach((registro) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${registro.palabra}</td>
      <td>${registro.nombre || "Sin Nombre"}</td>
      <td>${registro.tiempo || 0} segundos</td>
      <td>${registro.errores || 0}</td>
      <td>${registro.categoria || "Sin Categoría"}</td>
    `;
    rankingTablaBody.appendChild(fila);
  });

  rankingDiv.style.display = "block";
}

function actualizarImagenAhorcado() {
  imagenAhorcado.src = `img/${contadorErrores}.png`;
}

function reiniciarJuego() {
  botonJugar.disabled = false;
  botonJugar.style.cursor = "pointer";
  inputNombre.value = "";
  selectCategoria.value = "";
  document
    .querySelectorAll(".letra")
    .forEach((boton) => (boton.disabled = true));
}
