// Objeto con las palabras separadas por categoría y dificultad
const palabrasPorCategoria = {
  animales: {
    facil: ["GATO", "LOBO", "PEZ", "RANA"],
    medio: ["BALLENA", "DELFIN", "TORTUGA", "CAMELLO"],
    dificil: ["MURCIELAGO", "HIPOPOTAMO", "ARMADILLO", "CANGURO"],
  },
  tecnologia: {
    facil: ["WIFI", "CHIP", "APP", "BOT"],
    medio: ["INTERNET", "PROGRAMA", "SOFTWARE", "PANTALLA"],
    dificil: [
      "MICROPROCESADOR",
      "INTELIGENCIA",
      "TELECOMUNICACION",
      "SUPERCOMPUTADORA",
    ],
  },
  comida: {
    facil: ["PAN", "ARROZ", "FLAN", "KIWI"],
    medio: ["TORTILLA", "ESPAGUETI", "CHOCOLATE", "ENSALADA"],
    dificil: ["CALDERETA", "MARISCOS", "GUACAMOLE", "ALCACHOFA"],
  },
  lugares: {
    facil: ["ROMA", "LAGO", "ISLA", "CINE"],
    medio: ["PIRAMIDE", "VOLCAN", "CIUDAD", "DESIERTO"],
    dificil: ["ARCHIPIELAGO", "MONUMENTO", "CONTINENTE", "UNIVERSIDAD"],
  },
  colores: {
    facil: ["AZUL", "ROSA", "GRIS", "ORO"],
    medio: ["VERDE", "AMARILLO", "CELESTE", "MARRON"],
    dificil: ["ULTRAVIOLETA", "TURQUESA", "ANARANJADO", "ESMERALDA"],
  },
};

// Variables 
let palabraSecreta = "";
let nombreJugador = "";
let contadorErrores = 0;
let tiempo = 0;
let cronometroEnMarcha = false;
let cronometroInterval = null;
let tiempoCuentaAtras = 10;
let cuentaAtrasInterval = null;
const maxIntentos = 7;
let juegoEnCurso = false;

// Referencias a elementos del DOM
const palabraSecretaDiv = document.getElementById("palabra-secreta");
const erroresDiv = document.getElementById("contenedor-errores");
const intentosDiv = document.getElementById("contenedor-intentos");
const cronometroDiv = document.getElementById("contenedor-cronometro");
const cronometroLetraDiv = document.getElementById("contenedor-cronometro-letra");
const imagenAhorcado = document.getElementById("imagen-ahorcado");
const botonReiniciar = document.getElementById("botonReiniciar");
const botonParar = document.getElementById("botonParar");
const botonPista = document.getElementById("botonPista");
const selectCategoria = document.getElementById("categoria-select");
const selectDificultad = document.getElementById("dificultad-select");
const botonIniciar = document.getElementById("botonIniciar");
const botonesLetras = document.querySelectorAll(".letra");
const botonRanking = document.getElementById("mostrarRanking");
const rankingDiv = document.getElementById("ranking");
const rankingTablaBody = document.querySelector("#rankingTabla tbody");

// Eventos
selectCategoria.addEventListener("change", verificarSeleccion);
selectDificultad.addEventListener("change", verificarSeleccion);
botonIniciar.addEventListener("click", function() {
  const categoriaSeleccionada = selectCategoria.value;
  const dificultadSeleccionada = selectDificultad.value;
  inicializarJuego(categoriaSeleccionada, dificultadSeleccionada);
});
botonParar.addEventListener("click", pausarJuego);
botonReiniciar.addEventListener("click", reiniciarJuego);
botonRanking.addEventListener("click", mostrarRanking);

for (let i = 0; i < botonesLetras.length; i++) {
  botonesLetras[i].addEventListener("click", function() {
    verificarLetra(botonesLetras[i].innerText, botonesLetras[i]);
  });
}

botonPista.addEventListener("click", usarPista);

// Funciones
function verificarSeleccion() {
  // Si se ha elegido categoría y dificultad, habilita el botón de iniciar
  const categoria = selectCategoria.value;
  const dificultad = selectDificultad.value;
  if (categoria && dificultad) {
    botonIniciar.disabled = false;
  } else {
    botonIniciar.disabled = true;
  }
}

function pedirNombreJugador() {
  nombreJugador = prompt("Por favor, introduce tu NOMBRE:");
  if (!nombreJugador || nombreJugador.trim() === "") {
    alert("El nombre no puede estar vacío. Inténtalo de nuevo.");
    pedirNombreJugador();
  }
}

function inicializarJuego(categoriaSeleccionada, dificultadSeleccionada) {
  resetearEstilos();
  erroresDiv.innerText = "Errores: 0";
  intentosDiv.innerText = "Intentos restantes: " + maxIntentos;
  cronometroDiv.innerText = "Tiempo TOTAL: 0 segundos";
  cronometroLetraDiv.innerText = "";
  imagenAhorcado.src = "img/0.png";

  // Elegimos una palabra al azar
  const listaPalabras = palabrasPorCategoria[categoriaSeleccionada][dificultadSeleccionada];
  const indicePalabra = Math.floor(Math.random() * listaPalabras.length);
  palabraSecreta = listaPalabras[indicePalabra];

  pedirNombreJugador();
  detenerCronometro();
  detenerCuentaAtras();

  // Mostramos la palabra secreta con guiones
  palabraSecretaDiv.innerHTML = "";
  for (let i = 0; i < palabraSecreta.length; i++) {
    const letra = document.createElement("span");
    letra.classList.add("letra-secreta");
    letra.innerText = "_";
    palabraSecretaDiv.appendChild(letra);
  }

  // Reactivamos las letras
  for (let i = 0; i < botonesLetras.length; i++) {
    botonesLetras[i].disabled = false;
    botonesLetras[i].classList.remove("correcta", "incorrecta");
  }

  juegoEnCurso = true; 
  botonReiniciar.disabled = false; 
  iniciarCronometro();
  iniciarCuentaAtras();
}

function pausarJuego() {
  if (!juegoEnCurso) return;
  detenerCronometro();
  detenerCuentaAtras();
  for (let i = 0; i < botonesLetras.length; i++) {
    botonesLetras[i].disabled = true;
  }
}

function reiniciarJuego() {
  if (!juegoEnCurso) return;
  inicializarJuego(selectCategoria.value, selectDificultad.value);
}

function desactivarBotonesLetras() {
  for (let i = 0; i < botonesLetras.length; i++) {
    botonesLetras[i].disabled = true;
    botonesLetras[i].classList.remove("correcta", "incorrecta");
  }
}

function reiniciarCronometroLetra(esFinalizacion) {
  detenerCuentaAtras();
  tiempoCuentaAtras = 10; 
  cronometroLetraDiv.innerText = "Tiempo LETRA: " + tiempoCuentaAtras + " segundos";

  if (!esFinalizacion) {
    iniciarCuentaAtras();
  }
}

function guardarRegistro(nombre, palabra, categoria, dificultad, errores, tiempo, fecha) {
  let registrosExistentes = JSON.parse(localStorage.getItem("rankingAhorcado")) || {};

  if (!registrosExistentes[palabra]) {
    registrosExistentes[palabra] = [];
  }

  const registrosPalabra = registrosExistentes[palabra];

  if (registrosPalabra.length < 5) {
    registrosPalabra.push({ nombre, palabra, categoria, dificultad, errores, tiempo, fecha });
    alert('RECORD para "' + palabra + '" con ' + tiempo + ' segundos y ' + errores + ' errores. ¡Enhorabuena!');
  } else {
    // Buscamos el peor registro
    let peorRegistroIndex = null;
    for (let i = 0; i < registrosPalabra.length; i++) {
      const r = registrosPalabra[i];
      if (peorRegistroIndex === null ||
        r.errores > registrosPalabra[peorRegistroIndex].errores ||
        (r.errores === registrosPalabra[peorRegistroIndex].errores && r.tiempo > registrosPalabra[peorRegistroIndex].tiempo)) {
        peorRegistroIndex = i;
      }
    }

    const peorRegistro = registrosPalabra[peorRegistroIndex];
    if (errores < peorRegistro.errores || (errores === peorRegistro.errores && tiempo < peorRegistro.tiempo)) {
      registrosPalabra[peorRegistroIndex] = { nombre, palabra, categoria, dificultad, errores, tiempo, fecha };
      alert('RECORD para "' + palabra + '" con ' + tiempo + ' segundos y ' + errores + ' errores. ¡Enhorabuena!');
    }
  }

  registrosExistentes[palabra] = registrosPalabra;
  localStorage.setItem("rankingAhorcado", JSON.stringify(registrosExistentes));
}

function finalizarPartida(ganado) {
  detenerCronometro();
  detenerCuentaAtras();
  reiniciarCronometros();
  reiniciarContadores();
  resetearSelectores();
  desactivarBotonesLetras();
  reiniciarCronometroLetra(true);

  if (ganado) {
    const fechaActual = new Date().toISOString();
    guardarRegistro(
      nombreJugador,
      palabraSecreta,
      selectCategoria.value,
      selectDificultad.value,
      contadorErrores,
      palabraSecreta.length - contadorErrores,
      fechaActual
    );
    alert("¡Has ganado! La partida se ha registrado en el ranking.");
  } else {
    alert("¡Has perdido! Inténtalo de nuevo.");
  }

  juegoEnCurso = false;
  botonReiniciar.disabled = true;
}

function verificarLetra(letra, boton) {
  let letraEncontrada = false;
  const letras = document.querySelectorAll(".letra-secreta");

  // Comprobamos si la letra está en la palabra secreta
  for (let i = 0; i < palabraSecreta.length; i++) {
    if (palabraSecreta[i] === letra) {
      letras[i].innerText = letra;
      letraEncontrada = true;
    }
  }

  if (letraEncontrada) {
    boton.classList.add("correcta");
    // Si todas las letras se han descubierto, ganamos
    let todasDescubiertas = true;
    for (let i = 0; i < letras.length; i++) {
      if (letras[i].innerText === "_") {
        todasDescubiertas = false;
        break;
      }
    }
    if (todasDescubiertas) {
      finalizarPartida(true);
      return;
    }
  } else {
    boton.classList.add("incorrecta");
    reducirIntentos();
  }

  // Desactivamos el botón de la letra seleccionada
  boton.disabled = true; 
  reiniciarCronometroLetra(false);
}

function reducirIntentos() {
  contadorErrores++;
  erroresDiv.innerText = "Errores: " + contadorErrores;
  intentosDiv.innerText = "Intentos restantes: " + (maxIntentos - contadorErrores);
  actualizarImagenAhorcado();

  if (contadorErrores >= maxIntentos) {
    finalizarPartida(false);
  }
}

function iniciarCronometro() {
  if (!cronometroEnMarcha) {
    cronometroEnMarcha = true;
    cronometroInterval = setInterval(function() {
      tiempo++;
      cronometroDiv.innerText = "Tiempo TOTAL: " + tiempo + " segundos";
    }, 1000);
  }
}

function detenerCronometro() {
  clearInterval(cronometroInterval);
  cronometroEnMarcha = false;
}

function reiniciarCronometros() {
  tiempo = 0;
  tiempoCuentaAtras = 10;
  cronometroEnMarcha = false;
  cronometroDiv.innerText = "Tiempo TOTAL: 0 segundos";
  cronometroLetraDiv.innerText = "Tiempo LETRA: 10 segundos";
}

function reiniciarContadores() {
  contadorErrores = 0;
  erroresDiv.innerText = "Errores: 0";
  intentosDiv.innerText = "Intentos restantes: " + maxIntentos;
}

function resetearSelectores() {
  selectCategoria.value = ""; 
  selectDificultad.value = ""; 
  botonIniciar.disabled = true; 
}

function iniciarCuentaAtras() {
  detenerCuentaAtras();
  tiempoCuentaAtras = 10;
  cronometroLetraDiv.innerText = "Tiempo LETRA: " + tiempoCuentaAtras + " segundos";

  cuentaAtrasInterval = setInterval(function() {
    tiempoCuentaAtras--;
    cronometroLetraDiv.innerText = "Tiempo LETRA: " + tiempoCuentaAtras + " segundos";

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

function actualizarImagenAhorcado() {
  if (contadorErrores <= maxIntentos) {
    imagenAhorcado.src = "img/" + contadorErrores + ".png";
  }
}

function resetearEstilos() {
  intentosDiv.style.border = "";
  intentosDiv.style.fontWeight = "";
  intentosDiv.style.fontSize = "";
  intentosDiv.style.backgroundColor = "";
}

function usarPista() {
  if (contadorErrores < (maxIntentos - 2)) {
    const letras = document.querySelectorAll(".letra-secreta");
    for (let i = 0; i < palabraSecreta.length; i++) {
      if (letras[i].innerText === "_") {
        // Revelamos una letra de la palabra
        letras[i].innerText = palabraSecreta[i]; 
        reducirIntentos(); // -1 intento
        reducirIntentos(); // -1 intento más
        verificarPistaEstado();
        return;
      }
    }
  } else {
    alert("No puedes usar una pista, ya que perderías la partida.");
  }
}

function verificarPistaEstado() {
  const intentosRestantes = maxIntentos - contadorErrores;
  if (intentosRestantes <= 2) {
    botonPista.disabled = true; 
    botonPista.style.backgroundColor = "red"; 
    botonPista.innerText = "SIN PISTAS"; 
  }
}

function mostrarRanking() {
  let rankingData = JSON.parse(localStorage.getItem("rankingAhorcado")) || {};

  let allRecords = [];
  for (let palabra in rankingData) {
    if (rankingData.hasOwnProperty(palabra)) {
      const registros = rankingData[palabra];
      for (let i = 0; i < registros.length; i++) {
        const r = registros[i];
        if (r && r.palabra) {
          allRecords.push(r);
        }
      }
    }
  }

  if (allRecords.length === 0) {
    alert("No hay datos válidos para mostrar en el ranking.");
    rankingDiv.style.display = "none";
    return;
  }

  // Ordenamos alfabéticamente por palabra
  allRecords.sort(function(a, b) {
    if (a.palabra < b.palabra) return -1;
    if (a.palabra > b.palabra) return 1;
    return 0;
  });

  rankingTablaBody.innerHTML = "";
  for (let i = 0; i < allRecords.length; i++) {
    const registro = allRecords[i];
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${registro.palabra}</td>
      <td>${registro.nombre || "Sin Nombre"}</td>
      <td>${registro.tiempo || 0} segundos</td>
      <td>${registro.errores || 0}</td>
      <td>${registro.categoria || "Sin Categoría"}</td>
    `;
    rankingTablaBody.appendChild(fila);
  }

  rankingDiv.style.display = "block";
}
