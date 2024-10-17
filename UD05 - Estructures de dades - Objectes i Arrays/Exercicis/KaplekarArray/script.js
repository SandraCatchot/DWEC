
// Tenemos que hacer que cada paso de la función se guarde en un array


function calculaKaprekar(numero) {
  let pasos = 0;
  const numMax = 6174;

  // Convertimos número a cadena y aseguramos que tenga 4 dígitos, añadimos 0 si tiene -4 digitos
  let numeroString = numero.toString();
  while (numeroString.length < 4) {
    numeroString = "0" + numeroString;
  }

  while (numeroString !== "6174" && pasos < 7) {
    // Separamos la cadena en un array de caracteres (dígitos)
    let digitos = numeroString.split("");

    // Ordenamos los dígitos de forma numérica ascendente y descendente
    let numeroAscendente = digitos
      .sort((a, b) => a - b) // Para orden numérico ascendente
      .join(""); //une lo que separamos con split
    let numeroDescendente = digitos
      .sort((a, b) => b - a) // Para orden numérico descendente
      .join("");

    // Convertimos las cadenas a números para realizar la resta y volvemos a convertirlo a String
    let resultado = parseInt(numeroDescendente) - parseInt(numeroAscendente);
    numeroString = resultado.toString();

    // Asegurar que el resultado tenga 4 dígitos (añadir ceros a la izquierda si es necesario)
    while (numeroString.length < 4) {
      numeroString = "0" + numeroString;
    }

    pasos++;

    let stringPaso = `Paso número ${pasos} - ${numeroDescendente} - ${numeroAscendente} = ${numeroString}`;
    let arrayPasos = new Array();
    arrayPasos.unshift(stringPaso);

    console.log(
      `Paso número ${pasos} - ${numeroDescendente} - ${numeroAscendente} = ${numeroString}`
    );
  }

  console.log(arrayPasos);

  if (numeroString === "6174") {
    console.log("Resuelto en " + pasos + " pasos.");
  } else {
    console.log("Algo no funciona porque debe resolverse en menos de 7 pasos.");
  }
}

function insertarEnArray() {
    
}

calculaKaprekar(8303);