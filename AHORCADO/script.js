const palabrasPorCategoria = {
  animales: ["RATON", "ELEFANTE", "IGUANA", "BALLENA", "GUEPARDO", "CANGREJO", "KOALA", "SERPIENTE", "CANGURO"],
  tecnologia: ["TECLADO", "MONITOR", "PROGRAMACION", "INTERNET", "PROCESADOR", "SMARTPHONE", "ROBOT", "ALGORITMO"],
  comida: ["MANZANA", "CHOCOLATE", "HAMBURGUESA", "PIZZA", "HELADO", "LASAÑA", "TACOS", "SUSHI", "ENSALADA", "PAELLA"],
  lugares: ["PARIS", "MENORCA", "HAWAI", "LONDRES", "TOKIO", "EVEREST", "AMAZONAS", "SANTORINI"],
  colores: ["TURQUESA", "VIOLETA", "PURPURA", "AMARILLO", "CELESTE", "CORAL", "GRANATE", "BEIGE", "NARANJA"],
};

let palabraSecreta = "";
let nombreJugador = "";
let contadorErrores = 0;
let tiempo = 0;
let cronometroEnMarcha = false;
let cronometroInterval;
let tiempoCuentaAtras = 10;
let cuentaAtrasInterval;
const maxIntentos = 7;
const recargarTiempo = 4000; // Tiempo para recargar en milisegundos

// Elementos del DOM
const palabraSecretaDiv = document.getElementById("palabra-secreta");
const erroresDiv = document.getElementById("contenedor-errores");
const intentosDiv = document.getElementById("contenedor-intentos");
const cronometroDiv = document.getElementById("contenedor-cronometro");
const cronometroLetraDiv = document.getElementById("contenedor-cronometro-letra");
const imagenAhorcado = document.getElementById("imagen-ahorcado");
const botonPista = document.getElementById("botonPista");
const selectCategoria = document.getElementById("categoria-select");
const botonRanking = document.getElementById("mostrarRanking");
const rankingTablaBody = document.querySelector("#rankingTabla tbody");
const rankingDiv = document.getElementById("ranking");

// EVENTOS
selectCategoria.addEventListener("change", (event) => {
  const categoriaSeleccionada = event.target.value;
  if (categoriaSeleccionada) inicializarJuego(categoriaSeleccionada);
});

document.querySelectorAll(".letra").forEach((boton) => {
  boton.disabled = true;
  boton.addEventListener("click", () => {
    verificarLetra(boton.innerText, boton);
    boton.disabled = true;
  });
});

botonPista.disabled = true;
botonPista.addEventListener("click", usarPista);
botonRanking.addEventListener("click", mostrarRanking);

// FUNCIONES GENERALES

function pedirNombreJugador() {
  do {
    nombreJugador = prompt("Por favor, introduce tu NOMBRE:");
  } while (!nombreJugador || nombreJugador.trim() === "");
}

function reiniciarJuego() {
  detenerCronometro();
  detenerCuentaAtras();
  setTimeout(() => location.reload(), recargarTiempo);
}

function configurarElemento(elemento, propiedades) {
  Object.assign(elemento.style, propiedades);
}

// FUNCIONES DE JUEGO

function inicializarJuego(categoriaSeleccionada) {
  configurarElemento(intentosDiv, { fontWeight: "normal", fontSize: "medium", backgroundColor: "transparent", color: "black" });
  erroresDiv.innerText = "Errores: 0";
  intentosDiv.innerText = `Intentos restantes: ${maxIntentos}`;
  cronometroDiv.innerText = "Tiempo TOTAL: 0 segundos";
  cronometroLetraDiv.innerText = "";
  imagenAhorcado.src = "img/0.png";
  botonPista.disabled = false;
  botonPista.style.color = "green";
  tiempo = 0;

  palabraSecreta = palabrasPorCategoria[categoriaSeleccionada][Math.floor(Math.random() * palabrasPorCategoria[categoriaSeleccionada].length)];
  pedirNombreJugador();

  palabraSecretaDiv.innerHTML = "";
  palabraSecreta.split("").forEach(() => {
    const letra = document.createElement("span");
    letra.classList.add("letra-secreta");
    letra.innerText = "_";
    palabraSecretaDiv.appendChild(letra);
  });

  document.querySelectorAll(".letra").forEach((boton) => {
    boton.disabled = false;
    boton.classList.remove("correcta", "incorrecta");
  });

  iniciarCronometro();
  iniciarCuentaAtras();
}

function verificarLetra(letra, boton) {
  detenerCuentaAtras();
  iniciarCuentaAtras();

  const letras = document.querySelectorAll(".letra-secreta");
  let letraEncontrada = false;

  palabraSecreta.split("").forEach((caracter, index) => {
    if (caracter === letra) {
      letras[index].innerText = letra;
      letraEncontrada = true;
    }
  });

  if (letraEncontrada) {
    boton.classList.add("correcta");
    if ([...letras].every((letra) => letra.innerText !== "_")) {
      detenerCronometro();
      detenerCuentaAtras();
      intentosDiv.innerText = "¡HAS GANADO!";
      configurarElemento(intentosDiv, { backgroundColor: "green", color: "white" });
      desactivarBotones();
      guardarDatosJugador(selectCategoria.value);
      alert("¡Has ganado! Se ha actualizado el ranking.");
      reiniciarJuego();
    }
  } else {
    boton.classList.add("incorrecta");
    reducirIntentos();
  }
}

function reducirIntentos() {
  contadorErrores++;
  erroresDiv.innerText = `Errores: ${contadorErrores}`;
  intentosDiv.innerText = `Intentos restantes: ${maxIntentos - contadorErrores}`;
  actualizarImagenAhorcado();

  if (contadorErrores >= maxIntentos) {
    intentosDiv.innerText = "¡Has perdido!";
    configurarElemento(intentosDiv, { backgroundColor: "red", color: "white" });
    alert("Has perdido");
    desactivarBotones();
    reiniciarJuego();
  }
}

function desactivarBotones() {
  document.querySelectorAll(".letra").forEach((boton) => (boton.disabled = true));
}

function actualizarImagenAhorcado() {
  if (contadorErrores <= maxIntentos) {
    imagenAhorcado.src = `img/${contadorErrores}.png`;
  }
}

function usarPista() {
  if (contadorErrores < maxIntentos) {
    const letras = document.querySelectorAll(".letra-secreta");
    for (let i = 0; i < palabraSecreta.length; i++) {
      if (letras[i].innerText === "_") {
        letras[i].innerText = palabraSecreta[i]; // Revela la letra
        reducirIntentos(); // Penaliza con un intento
        return;
      }
    }
  }
}

// FUNCIONES DE TIEMPO

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

// FUNCIONES DE RANKING

function guardarDatosJugador(categoria) {
  const datosJugador = {
    nombre: nombreJugador || "Anónimo",
    palabra: palabraSecreta,
    categoria,
    tiempo,
    errores: contadorErrores,
  };

  let historial = JSON.parse(localStorage.getItem("historialAhorcado")) || [];
  const registroExistente = historial.find((registro) => registro.palabra === palabraSecreta);

  let mensaje = "";

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

    mensaje = actualizado
      ? `Nuevo récord para la palabra: ${palabraSecreta}`
      : `No se superó el récord para la palabra: ${palabraSecreta}`;
  } else {
    historial.push(datosJugador);
    mensaje = `Nueva puntuación añadida para la palabra: ${palabraSecreta}`;
  }

  localStorage.setItem("historialAhorcado", JSON.stringify(historial));
  alert(mensaje);
}

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
