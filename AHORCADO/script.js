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
let cronometroEnMarcha = false;
let cronometroInterval;
let tiempoCuentaAtras = 10;
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
const botonPista = document.getElementById("botonPista");
const selectCategoria = document.getElementById("categoria-select");
const botonRanking = document.getElementById("mostrarRanking");
const rankingDiv = document.getElementById("ranking");
const rankingTablaBody = document.querySelector("#rankingTabla tbody");

//EVENT - Selección de categorías (al seleccionar categoría, se inicia el juego)
selectCategoria.addEventListener("change", (event) => {
  const categoriaSeleccionada = event.target.value;
  if (categoriaSeleccionada) {
    inicializarJuego(categoriaSeleccionada);
  }
});

//Los botones de las letras estan desactivados desde un inicio, se activan al iniciar la partida
document.querySelectorAll(".letra").forEach((boton) => {
  boton.disabled = true;
});

botonPista.disabled = true;

//EVENT - Seleccionar letra, lo que lleva a la función verificarLetra
document.querySelectorAll(".letra").forEach((boton) => {
  boton.addEventListener("click", () => {
    const letra = boton.innerText;
    verificarLetra(letra, boton);
    boton.disabled = true;
  });
});

botonPista.addEventListener("click", usarPista);
botonRanking.addEventListener("click", mostrarRanking);

//FUNCIONES
function pedirNombreJugador() {
  nombreJugador = prompt("Por favor, introduce tu NOMBRE:");
  if (!nombreJugador || nombreJugador.trim() === "") {
    //.trim elimina cualquier espacio del String
    alert("El nombre no puede estar vacío. Inténtalo de nuevo.");
    pedirNombreJugador();
  }
}

function inicializarJuego(categoriaSeleccionada) {
  intentosDiv.style.fontWeight = "normal";
  intentosDiv.style.fontSize = "medium";
  intentosDiv.style.backgroundColor = "transparent";
  intentosDiv.style.color = "black";
  erroresDiv.innerText = "Errores: 0";
  intentosDiv.innerText = `Intentos restantes: ${maxIntentos}`;
  cronometroDiv.innerText = "Tiempo TOTAL: 0 segundos";
  cronometroLetraDiv.innerText = "";
  imagenAhorcado.src = "img/0.png";
  botonPista.disabled = false;
  botonPista.style.color = "green";
  tiempo = 0;

  palabraSecreta =
    palabrasPorCategoria[categoriaSeleccionada][
      Math.floor(
        Math.random() * palabrasPorCategoria[categoriaSeleccionada].length
      )
    ];

  pedirNombreJugador();

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

function guardarDatosJugador(categoria) {
  const datosJugador = {
    nombre: nombreJugador || "Anónimo",
    palabra: palabraSecreta,
    categoria,
    tiempo,
    errores: contadorErrores,
  };

  let historial = JSON.parse(localStorage.getItem("historialAhorcado")) || [];
  const registroExistente = historial.find(
    (registro) => registro.palabra === palabraSecreta
  );

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

  // Guardar siempre el historial actualizado en localStorage
  localStorage.setItem("historialAhorcado", JSON.stringify(historial));
  alert(mensaje);
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
      mostrarEstiloResultado("green");
      desactivarBotones();
      guardarDatosJugador(selectCategoria.value);
      alert("¡Has ganado! Se ha actualizado el ranking.");
      setTimeout(() => location.reload(), 4000); // Recargar la página tras 4 segundos
      return;
    }
  } else {
    boton.classList.add("incorrecta");
    reducirIntentos();
  }

  boton.disabled = true;

  if (contadorErrores >= 5) {
    botonPista.disabled = true;
    botonPista.style.background = "red";
    botonPista.innerText = "SIN PISTAS";
    botonPista.style.cursor = "not-allowed";
  }
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
    mostrarEstiloResultado("red");
    intentosDiv.style.color = "white";
    intentosDiv.innerText = "¡Has perdido!";
    alert("Has perdido");
    botonPista.disabled = true;
    desactivarBotones();
    setTimeout(() => location.reload(), 4000); // Recargar la página tras 4 segundos
  }
}

function actualizarImagenAhorcado() {
  if (contadorErrores <= maxIntentos) {
    imagenAhorcado.src = `img/${contadorErrores}.png`;
  }
}

function desactivarBotones() {
  document
    .querySelectorAll(".letra")
    .forEach((boton) => (boton.disabled = true));
}

function mostrarEstiloResultado(color) {
  intentosDiv.style.border = "3px solid black";
  intentosDiv.style.fontWeight = "bolder";
  intentosDiv.style.fontSize = "x-large";
  intentosDiv.style.backgroundColor = color;
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

function usarPista() {
  if (contadorErrores < maxIntentos) {
    // Busca la primera letra no descubierta
    const letras = document.querySelectorAll(".letra-secreta");
    for (let i = 0; i < palabraSecreta.length; i++) {
      if (letras[i].innerText === "_") {
        letras[i].innerText = palabraSecreta[i]; // Revela la letra
        reducirIntentos();
        reducirIntentos();
        return;
      }
    }
  }
}
