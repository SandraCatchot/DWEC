// function miFuncion() {

// }

// Definir funcions
// const quadrat = function (n) {
//   return n * n;
// };

// function mensaje() {
//   console.log("Funció que no retorna res, però que mostra un missatge");
// }

// mensaje();
// console.log(quadrat(3));

// const redondeaA = function (n, m) {
//   //Calculamos el resto
//   const resto = n % m;

//   // Si el resto es menor que la mitad del múltiplo, redondeamos hacia abajo
//   if (resto < m / 2) {
//     return n - resto;
//   } else {
//     // Si es mayor o igual a la mitad, redondeamos hacia arriba
//     return n + (m - resto);
//   }
// };

// // Ejemplo de uso
// console.log(redondeaA(13, 5));
// console.log(redondeaA(17, 5));

// //Redondear n al multiplo más cercano a m

// const redondeaA = function (n, m) {
//     //Redondear n al multiplo más cercano a m
//     let resto = n % m;
//     return n - resto + (resto < m / 2 ? 0 : m);
//   }
//   console.log(redondeaA(23,10));

// Ámbitos

//   let x = 10; // variable global
//   if(true) {
//     let y = 20; // variable local respecto al bloque
//     var z = 30; // variable Global al usar var
//   }
//   console.log(z);

// const mitad = function(n) {
//     return n / 2;
// };

// let n = 10;
// console.log(mitad(100));
// console.log(mitad(n));

//Ámbito anidado

// const humus = function(factor) {
//     const ingrediente = function(cantidad, unidad, nombre) {
//         let cantidadIngrediente = cantidad * factor;
//         if (cantidadIngrediente > 1) {
//             unidad += "s";
//         }
//         console.log(`${cantidadIngrediente} ${unidad} ${nombre}`);
//     };
//     ingrediente(1, "lata", "garbanzos");
//     ingrediente(0.25, "taza", "tahini");
//     ingrediente(0.25, "taza", "jugo de limón");
//     ingrediente(1, "diente", "ajo");
//     ingrediente(2, "cucharada", "aceite de oliva");
//     ingrediente(0.5, "cucharadita", "comino");
// };

// humus(100);

// FUNCIONES FLECHA
// La palabra function desaparece y se añade el símbolo =>

// const redondeaA = (n, m) => {
//     //Redondear n al multiplo más cercano a m
//     let resto = n % m;
//     return n - resto + (resto < m / 2 ? 0 : m);
//   };

// const saluda = (nombre) => console.log(nombre);
// saluda("Joan");

// const saluda2 = (nombre) => "Hola " + nombre;
// console.log(saluda2("Joan"));

// // Pila de llamadas
// // cada crida gasta memòria
// function saludar (nombre) {
//     console.log("Hola " + nomnre);
// }
// saludar("Joan");
// console.log("Adiós");

// // no en función
// // en saludar
// // en clg
// // en saludar
// // no en funcion
// // en clg
// // no en funcion

// function gallina () {
//     return huevo();
// }

// function huevo () {
//     return gallina()
// }

// console.log("Qué fue antes, el " + huevo() + "o la " + gallina());

// // Paràmetres opcionals
// const quadrat = function(n, b = "n/a") {
//     console.log(b);
//     return n * n
// };
// console.log(quadrat(3));

// Cierre o Clausura
// function valor(n) {
//     let local = n;
//     return () => local;
// }

// let valor1 = valor(1);
// let valor2 = valor(2);

// console.log(valor1());
// console.log(valor2());

// Recursivitat
// function exponencial(base, exponente) {
//   if ((exponente == 0)) {
//     return 1;
//   } else {
//     return base * exponencial(base, exponente - 1);
//   }
// }
// console.log(exponencial(2,3));

// Calcular factorial d'un número
// Factorial de n: n! = n * (n-1) * (n-2)... * 1
// Ej: 4! = 4*3*2*1 = 24
// Spoiler: 5! = 5 * 4!

// function calculaFactorial(n) {
//   let resultado = 1;
//   if (n == 0 || n == 1) {
//     return 1;
//   } else {
//     while (n > 1) {
//       resultado = resultado * n;
//       n--;
//     }
//     return resultado;
//   }
// }
// console.log(calculaFactorial(10));

// Crecimiento de las funciones

// imprimirInventarioGranja(10,15);

// function imprimirInventarioGranja(vacas, pollos) {
//   let cadenaVaca = String(vacas);

//   while (cadenaVaca.length < 3) {
//     cadenaVaca = "0" + cadenaVaca;
//   }

//   console.log(`${cadenaVaca} Vacas`);

//   let cadenaPollo = String(pollos);

//   while (cadenaPollo.length < 3) {
//     cadenaPollo = "0" + cadenaPollo;
//   }

//   console.log(`${cadenaPollo} Pollos`);
// }

// function rellenarConCeros(numero, longitud) {
//   let cadenaNumero = String(numero);

//   while (cadenaNumero.length < 3) {
//     cadenaNumero = "0" + cadenaNumero;
//   }

//   return cadenaNumero;
// }

// function imprimirInventarioGranja(vacas, pollos, cerdos) {
//   console.log(`${rellenarConCeros(vacas,5)} Vacas`);
//   console.log(`${rellenarConCeros(vacas,5)} Pollos`);
//   console.log(`${rellenarConCeros(vacas,5)} Cerdos`);
//   }

//   imprimirInventarioGranja(5,12,23);
// rellenarConCeros(vacas, "Vacas");
// rellenarConCeros(pollos, "Pollos");
// rellenarConCeros(cerdos, "Cerdos");

// Math.min()
// let a = Math.min(2,4);
// console.log(a);

// Escribe una funcion que devuelva el minimo de 3 numeros
// devuelveMinimo(33, 22, 30);

// function devuelveMinimo(a, b, c) {
//   let resultado = Math.min(a, b, c);

//   console.log(resultado + " es el número más pequeño de los 3 que has introducido.");
// }

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

function calculaKaprekar(numero) {
  let pasos = 0;
  const numMax = 6174;

  while (numero !== numMax && pasos < 7) {
    // Convertir el número a una cadena y asegurar que tenga 4 dígitos
    let digitos = numero.toString().split('');

    while (digitos.length < 4) {
      digitos = "0" + digitos;
    }

    // Ordenar los dígitos para crear los números ascendente y descendente
    digitos.sort();
    let numeroAscendente = parseInt(digitos.join(''), 10);
    let numeroDescendente = parseInt(digitos.reverse().join(''), 10);

    // Realizar la resta y convertir el resultado a cadena
    let resultado = numeroDescendente - numeroAscendente;
    let resultadoString = resultado.toString();

    // Asegurar que el resultado tenga 4 dígitos
    while (resultadoString.length < 4) {
      resultadoString = '0' + resultadoString;
    }

    numero = parseInt(resultadoString, 10);
    pasos++;

    console.log(pasos + " paso: " + numeroDescendente + " - " + numeroAscendente + " = " + resultadoString);
  }

  if (numero === numMax) {
    console.log("Resuelto en " + pasos + " pasos.");
  } else {
    console.log("No se pudo resolver en 7 pasos.");
  }
}

calculaKaprekar(1234);