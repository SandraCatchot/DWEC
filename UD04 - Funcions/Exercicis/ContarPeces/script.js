// function contarPeces(cadena, posicion = 0) {
//   // Usamos indexOf para encontrar el siguiente "><>" a partir de la posición actual
//   const siguientePez = cadena.indexOf("><>", posicion);

//   // Si no hay más "><>", devolvemos 0 porque no hay más peces que contar.
//   // Cuando indexOf devuelve -1 = no hay más elementos buscados
//   if (siguientePez === -1) {
//     return 0;
//   }

//   // Caso recursivo: si encontramos un "><>", contamos 1 y llamamos de nuevo a la función,
//   // pero ahora buscamos desde la posición siguiente al pez encontrado.
//   return 1 + contarPeces(cadena, siguientePez + 3);
// }

// const oceano = "~~~~~~~~~~><>><>~~~><>~~~~~~><>~><>~"; //5
// const oceano2 = "~~~><>~~~~~~~~~~~~><>~~~~~~><>~><>~"; //4
// const oceano3 = "~~~><>><>~><>~><>><>~><>~~~><>~><>~"; //8

// console.log(contarPeces(oceano3));

//