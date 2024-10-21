/*  Exercici 1
    Escribe un bucle que realice siete llamadas a 
    console.log para mostrar la siguiente figura:
    #
    ##
    ###
    ####
    #####
    ######
    #######
*/

// let cadena = "";
// for(let contador = 0; contador < 7; contador++) {
//     cadena += "#";
//     console.log(cadena);
// }

/* Exercici 2
    Escribe un programa que use console.log para imprimir todos
    los números del 1 al 100, con dos excepciones:
    - Para los números que sean divisibles por 3, imprime:
    "Jander".
    - Para los números divisibles por 5(y no por 3), imprime:
    "Clander".
*/

/* Ejercicio 2 - Extensión Pack
    Modifica tu programa para imprimir "JanderClander" para los
    numeros que sean divisibles por 3 y 5 (y sigue imprimiendo
    "Jander" o "Clander" para los números que son divisibles solo por uno
    de esos casos).

*/

// let numero;
// for (let numero = 0; numero <=100; numero++) {

//     if (numero % 3 == 0 && numero % 5 == 0) {
//         console.log("Jander-Clander");
//     }

//     else if (numero % 5 == 0 && !(numero % 3 == 0)){
//         console.log("Clander");
//     }

//     else if (numero % 3 == 0) {
//         console.log("Jander");
//     } else {
//         console.log(numero);
//     }
// }

/* Exercici 3
    Escribe un programa que cree una cadena que represente un tablero
    de 8x8, usando caracteres de salto de linea para separar las lineas.
    En cada posicion del tablero hay un caracter de espacio o un caracter
    "#". Los caracteres deben formar un tablero de ajedrez:

     # # # #
    # # # #
     # # # #
    # # # #
     # # # #
    # # # #
     # # # #
    # # # #

    EXTRA: Darle al tablero la medida que queramos
*/

// let tablero = "";
// let size = 8;

// for (let fila = 0; fila < size; fila++) {
//     for (let columna = 0; columna < size; columna++) {
//         // Si la suma de fila + columna es par, ponemos un espacio, si es impar, ponemos un "#"
//         if ((fila + columna) % 2 === 0) {
//             tablero += " ";
//         } else {
//             tablero += "#";
//         }
//     }
//     // Añadimos salto de línea al final de cada fila
//     tablero += "\n";
// }
// console.log(tablero);

// function generarTablero(n) {
//   let tablero = "";

//   for (let fila = 0; fila < n; fila++) {
//     for (let columna = 0; columna < n; columna++) {
//       if ((fila + columna) % 2 === 0) {
//         tablero += " ";
//       } else {
//         tablero += "#";
//       }
//     }
//     tablero += "\n";
//   }

//   console.log(tablero);
// }

// //Uso de la función
// generarTablero(15);

/* EJERCICIO 4
    Pedir al usuario con un switch ¿Qué quiere dibujar? con los 3 ejercicios anteriores.
    El usuario debe poder elegir qué opción, si elige la 3, también debe poder elegir
    de cuánto quiere que sea el tamaño del tablero.
*/

function generarTablero(n) {
    let tablero = "";
  
    for (let fila = 0; fila < n; fila++) {
      for (let columna = 0; columna < n; columna++) {
        if ((fila + columna) % 2 === 0) {
          tablero += " ";
        } else {
          tablero += "#";
        }
      }
      tablero += "\n";
    }
  
    console.log(tablero);
  }
  
  let pregunta = prompt(
    "¿Qué quieres dibujar? Elige: figura 1, figura 2 o figura 3"
  );
  switch (pregunta) {
    case "figura 1":
      console.log("Aquí tienes tu FIGURA 1");
      let cadena = "";
      for (let contador = 0; contador < 7; contador++) {
        cadena += "#";
        console.log(cadena);
      }
      break;
    case "figura 2":
      console.log("Aquí tienes tu FIGURA 2");
      let numero;
      for (let numero = 0; numero <= 100; numero++) {
        if (numero % 3 == 0 && numero % 5 == 0) {
          console.log("Jander-Clander");
        } else if (numero % 5 == 0 && !(numero % 3 == 0)) {
          console.log("Clander");
        } else if (numero % 3 == 0) {
          console.log("Jander");
        } else {
          console.log(numero);
        }
      }
      break;
    case "figura 3":
      let n = prompt("¿Qué medida de tablero quieres dibujar? (Ejemplo n*n)");
      console.log("Aquí tienes tu FIGURA 3");
      generarTablero(n);
      break;
    default:
      console.log("¡No has elegido una opción correcta!");
      break;
  }
  