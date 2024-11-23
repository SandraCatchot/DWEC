const palabrasPorCategoria = {
  animales: ["RATON", "ELEFANTE", "IGUANA", "BALLENA", "GUEPARDO"],
  tecnologia: ["TECLADO", "MONITOR", "PROGRAMACION", "INTERNET", "PROCESADOR"],
  comida: ["MANZANA", "CHOCOLATE", "HAMBURGUESA", "PIZZA", "HELADO"],
  lugares: ["PARIS", "MENORCA", "HAWAI", "PLAYA", "DESIERTO"],
  colores: ["TURQUESA", "VIOLETA", "PURPURA", "AMARILLO", "CELESTE"],
};

let palabraSecreta = "";
let nombreJugador = "";

const palabraSecretaDiv = document.getElementById("palabra-secreta");
const erroresDiv = document.getElementById("contenedor-errores");
const intentosDiv = document.getElementById("contenedor-intentos");
const cronometroDiv = document.getElementById("contenedor-cronometro");
const cronometroLetraDiv = document.getElementById("contenedor-cronometro-letra");
const imagenAhorcado = document.getElementById("imagen-ahorcado");
const botonReiniciar = document.getElementById("botonReiniciar");
const botonParar = document.getElementById("botonParar");
const selectCategoria = document.getElementById("categoria-select");
const botonRanking = document.getElementById("mostrarRanking");
const rankingDiv = document.getElementById("ranking");
const rankingTablaBody = document.querySelector("#rankingTabla tbody");

let contadorErrores = 0;
const maxIntentos = 7;
let tiempo = 0;
let cronometroEnMarcha = false;
let cronometroInterval;
let tiempoCuentaAtras = 10;
let cuentaAtrasInterval;

selectCategoria.addEventListener("change", (event) => {
  const categoriaSeleccionada = event.target.value;
  if (categoriaSeleccionada) {
    inicializarJuego(categoriaSeleccionada);
  }
});

botonReiniciar.addEventListener("click", reiniciarJuego);
botonParar.addEventListener("click", pararJuego);

document.querySelectorAll(".letra").forEach((boton) => {
  boton.addEventListener("click", () => {
    const letra = boton.innerText;
    verificarLetra(letra, boton);
    boton.disabled = true;
  });
});

function pedirNombreJugador() {
  nombreJugador = prompt("Por favor, introduce tu NOMBRE:");
  if (!nombreJugador || nombreJugador.trim() === "") {
    alert("El nombre no puede estar vacío. Inténtalo de nuevo.");
    pedirNombreJugador();
  }
}

function guardarDatosJugador(categoria) {
  const datosJugador = {
    nombre: nombreJugador || "Anónimo",
    palabra: palabraSecreta,
    categoria: categoria,
    tiempo: tiempo,
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

    if (actualizado) {
      console.log(`Nuevo récord para la palabra: ${palabraSecreta}`);
    } else {
      console.log(`No se superó el récord para la palabra: ${palabraSecreta}`);
    }
  } else {
    historial.push(datosJugador);
    console.log(`Nueva puntuación añadida para la palabra: ${palabraSecreta}`);
  }

  localStorage.setItem("historialAhorcado", JSON.stringify(historial));

  console.log("Historial actualizado:", historial); // Log para validar
}

function inicializarJuego(categoriaSeleccionada) {
  intentosDiv.style.border = "";
  intentosDiv.style.fontWeight = "";
  intentosDiv.style.fontSize = "";
  intentosDiv.style.backgroundColor = "";

  erroresDiv.innerText = "Errores: 0";
  intentosDiv.innerText = `Intentos restantes: ${maxIntentos}`;
  cronometroDiv.innerText = "Tiempo TOTAL: 0 segundos";
  cronometroLetraDiv.innerText = "";
  imagenAhorcado.src = "img/0.png";

  contadorErrores = 0;
  tiempo = 0;

  const palabrasDeCategoria = palabrasPorCategoria[categoriaSeleccionada];
  palabraSecreta =
    palabrasDeCategoria[Math.floor(Math.random() * palabrasDeCategoria.length)];

  pedirNombreJugador();
  detenerCronometro();
  detenerCuentaAtras();

  palabraSecretaDiv.innerHTML = "";

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
}

function reducirIntentos() {
  contadorErrores++;
  erroresDiv.innerText = `Errores: ${contadorErrores}`;
  intentosDiv.innerText = `Intentos restantes: ${
    maxIntentos - contadorErrores
  }`;
  actualizarImagenAhorcado();

  if (contadorErrores >= maxIntentos) {
    detenerCronometro();
    detenerCuentaAtras();
    intentosDiv.style.border = "3px solid black";
    intentosDiv.style.fontWeight = "bolder";
    intentosDiv.style.fontSize = "x-large";
    intentosDiv.style.backgroundColor = "red";
    intentosDiv.innerText = "¡Has perdido!";
    desactivarBotones();
  }
}

function actualizarImagenAhorcado() {
  if (contadorErrores <= maxIntentos) {
    imagenAhorcado.src = `img/${contadorErrores}.png`;
  }
}

function verificarLetra(letra, boton) {
  detenerCuentaAtras();
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
      intentosDiv.style.border = "3px solid black";
      intentosDiv.style.fontWeight = "bolder";
      intentosDiv.style.fontSize = "x-large";
      intentosDiv.style.backgroundColor = "green";
      desactivarBotones();
      const categoriaSeleccionada = selectCategoria.value;
      guardarDatosJugador(categoriaSeleccionada);
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
  document.querySelectorAll(".letra").forEach((boton) => {
    boton.disabled = false;
    boton.classList.remove("correcta", "incorrecta");
  });

  detenerCronometro();
  detenerCuentaAtras();
  iniciarCronometro();
  iniciarCuentaAtras();

  cronometroDiv.innerText = `Tiempo TOTAL: ${tiempo} segundos`;
  cronometroLetraDiv.innerText = `Tiempo LETRA: ${tiempoCuentaAtras} segundos`;
  intentosDiv.innerText = `Intentos restantes: ${
    maxIntentos - contadorErrores
  }`;
  intentosDiv.style.border = "";
  intentosDiv.style.fontWeight = "";
  intentosDiv.style.fontSize = "";
  intentosDiv.style.backgroundColor = "";
}

botonRanking.addEventListener("click", () => {
  let historial = JSON.parse(localStorage.getItem("historialAhorcado")) || [];

  // Filtrar registros inválidos
  historial = historial.filter((registro) => registro && registro.palabra);

  if (historial.length === 0) {
    alert("No hay datos válidos para mostrar en el ranking.");
    rankingDiv.style.display = "none";
    return;
  }

  rankingTablaBody.innerHTML = "";

  // Ordenar el historial por palabra alfabéticamente
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
});
