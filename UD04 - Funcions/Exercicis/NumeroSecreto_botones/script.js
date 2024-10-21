
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentosRestantes = 5;

function crearBotones() {
  const containerBotones = document.getElementById("contenedor-botones");
  
  for (let i = 1; i <= 100; i++) {
    const boton = document.createElement("button"); //creamos elemento
    boton.textContent = i; // mostramos texto en elemento
    boton.id = `boton${i}`; //asignamos id a cada botón

    // Al hacer clic, con addEventListener llamamos a la función adivinarNumero con el número del botón
    boton.addEventListener("click", () => {
      adivinarNumero(i);
    });

    containerBotones.appendChild(boton); //añadimos un nuevo elemento hijo con appendChild
  }
}

function adivinarNumero(numero) {
  if (numero === numeroSecreto) {
    alert(`¡Felicidades! Adivinaste el número secreto en ${6 - intentosRestantes} intentos.`);
    eliminarBotones(1, 100);
  } else {
    intentosRestantes--;
    if (intentosRestantes === 0) {
      alert(
        `Lo siento, te quedaste sin intentos. El número secreto era ${numeroSecreto}.`
      );
      eliminarBotones(1, 100);
    } else if (numero < numeroSecreto) {
      alert(
        `El número secreto es más grande. Te quedan ${intentosRestantes} intentos.`
      );
      eliminarBotones(1, numero);
    } else {
      alert(
        `El número secreto es más pequeño. Te quedan ${intentosRestantes} intentos.`
      );
      eliminarBotones(numero, 100);
    }
  }
}

function eliminarBotones(inicio, fin) {
  for (let i = inicio; i <= fin; i++) {
    const boton = document.getElementById(`boton${i}`);
    if (boton) {
      boton.remove();
    }
  }
}

crearBotones();
