// Ejercicio recursividad:
/*  Podemos usar % para verificar si un número es par o impar
    al usar el %2 para ver si es divisible por dos.
    Existe otra manera de definir si un número es par o impar:
    - 0 es PAR
    - 1 es IMPAR
    - N: su paridad es la misma que N - 2
    Define la función recursiva esPar que corresponda a esta
    descripción. La función debe aceptar un solo parámetro (número
    entero positivo) y devolver un booleano.
    Probar con 50 y 75.
*/

// function esPar(numero) {
//   if (numero === 0) {
//     return true; // 0 es par
//   } else if (numero === 1) {
//     return false; // 1 es impar
//   } else {
//     return esPar(numero - 2);
//   }
// }

// // Probar con 50 y 75
// console.log(esPar(50)); // true
// console.log(esPar(75)); // false

// inicial 3524
// 1paso -> 5432 + 2345 = 3087
// 2paso -> 8730 - 0378 = 8352
// 3 paso -> 8532 - 2358 = 6174
// Resuelto en 3 pasos

// function calculaKaprekar(numero) {
//   let pasos = 0;
//   const numMax = 6174;

//   // Convertimos número a cadena y aseguramos que tenga 4 dígitos, añadimos 0 si tiene -4 digitos
//   let numeroString = numero.toString();
//   while (numeroString.length < 4) {
//     numeroString = "0" + numeroString;
//   }

//   while (numeroString !== "6174" && pasos < 7) {
//     // Separamos la cadena en un array de caracteres (dígitos)
//     let digitos = numeroString.split("");

//     // Ordenamos los dígitos de forma numérica ascendente y descendente
//     let numeroAscendente = digitos
//       .sort((a, b) => a - b) // Para orden numérico ascendente
//       .join(""); //une lo que separamos con split
//     let numeroDescendente = digitos
//       .sort((a, b) => b - a) // Para orden numérico descendente
//       .join("");

//     // Convertimos las cadenas a números para realizar la resta y volvemos a convertirlo a String
//     let resultado = parseInt(numeroDescendente) - parseInt(numeroAscendente);
//     numeroString = resultado.toString();

//     // Asegurar que el resultado tenga 4 dígitos (añadir ceros a la izquierda si es necesario)
//     while (numeroString.length < 4) {
//       numeroString = "0" + numeroString;
//     }

//     pasos++;
//     console.log(
//       `Paso número ${pasos} - ${numeroDescendente} - ${numeroAscendente} = ${numeroString}`
//     );
//   }

//   if (numeroString === "6174") {
//     console.log("Resuelto en " + pasos + " pasos.");
//   } else {
//     console.log("Algo no funciona porque debe resolverse en menos de 7 pasos.");
//   }
// }

// calculaKaprekar(8303);