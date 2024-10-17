// let numeros = [1,2,3,4]; // array de 4 elementos
// console.log(numeros[0]); // indexados de 0 hasta su longitud -1
// console.log(numeros[3]); // último
// console.log(numeros[numeros.length - 1]); // último
// console.log(numeros[6]); // undefined, porque no existe

// let nombres = ["pepe", "Maria", 'Joan', `Pere`];
// console.log(nombres[0]);
// console.log(nombres[1]);
// console.log(nombres[2]);
// console.log(nombres[3]);

// let mescla1 = ["Hola", 10, true];
// console.log(mescla1[0]);
// console.log(mescla1[1]);
// console.log(mescla1[2]);

// console.log(mescla1);

// let numeros = new Array();
// numeros[0] = 10;
// numeros[1] = 20;
// numeros[3] = 10;
// console.log(numeros);

// let noms = new Array('Maria', 'Joan', 'Pere');
// console.log(noms);

// let numeros = new Array(5).fill('Hola'); //inicialitza array de 5 posicions amb valors 'Hola'
// console.log(numeros);

// MÉTODES D'ARRAY
// push(): Agrega un o més elements al final de l'array

const frutas = ["manzana", "platano", "naranja"];
// console.log(frutas);
// frutas.push('uva');
// console.log(frutas);

// pop(): Elimina es darrer element d'un array
// let uva = frutas.pop();
// console.log(frutas);

// shift(): Eliminar el primer element d'un array
// let primer = frutas.shift();
// console.log(primer);
// console.log(frutas);

// unshift(): Agrega un o més elements al principi de l'array
// frutas.unshift('melon', 'sandia');
// console.log(frutas);

// concat(); Combina dos o més arrays i retorna un nou array
// const frutas2 = ['melocoton', 'kiwi'];
// const combinacion = frutas.concat(frutas2);
// console.log(combinacion);

// slice(): Retorna una copia superficial d'una porció de l'array
// console.log(frutas);
// frutas.push('kiwi', 'melon', 'sandia', 'melocoton');
// console.log(frutas);

// const frutas2 = frutas.slice(1, 5);
// console.log(frutas2);

// splice(): Canvia el contingut d'un array eliminant, reemplaçant o agregant elements
// frutas2.splice(1, 1, 'uva', 'tomate');
// console.log(frutas2);

// // indexOf(): Retorna el primer index on es troba un element d'un array o -1 si no el troba
// const indiceElementoBuscado = frutas.indexOf('Platano'.toLowerCase());
// // console.log(indiceElementoBuscado);

// join(): Une todos los elementos de un array en una cadena, utilizando un separador especificado
// const unionElementos = frutas.join('*');
// console.log(unionElementos);

// sort(): Ordena els elements d'un array alfabèticament (si son cadenes) o numericamente (para numeros).
// frutas.sort();
// console.log(frutas);

// Ordena per valors unicode!!!!!!!!!!
// const numeros = [10,5,8,3,1];
// console.log(numeros);
// numeros.sort();
// console.log(numeros);

// const ciudades = ['Zaragoza', 'madrid', 'Barcelona'];
// ciudades.sort();
// console.log(ciudades);

// const ciudades = ['Zaragoza', 'madrid', 'Barcelona', 'Ávila'];
// for(let i = 0; i < ciudades.length; i++) {
//   console.log(ciudades[i]);
// }
// for(let ciudad in ciudades) {
//   console.log(ciudad);
// }
// for(let ciudad of ciudades) {
//   console.log(ciudad);
// }
// ciudades.forEach(ciudad => {
//   console.log(ciudad.toUpperCase())
// });

// Afortunadamente, sort() tiene un parametro opcional
// const numeros = [10,5,8,3,1];
// console.log(numeros.sort(function(a, b) {
//     // -1 a < b
//     // 1 a > b
//     // 0 a==b
//     return a - b}));

// console.log(numeros.sort((a, b) => a - b));


// const ciudades = ['Zaragoza', 'madrid', 'Barcelona', 'Ávila'];
// ciudades.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1:
//                         a.toLowerCase() < b.toLowerCase() ? -1 : 0);
// console.log(ciudades);

// ciudades.sort((a,b) => a.localeCompare(b));
// console.log(ciudades);


// Desestructuración
// const numeros = [1, 2, 3];
// const [a, b, c] = numeros;
// console.log(a);
// console.log(b);

// Operador Spread (operador de propagació)
// const numeros = [1, 2, 3];
// const masNumeros = [...numeros, 4, 5, ...numeros, ...[50,60]];
// console.log(masNumeros);

// function sumar(...numeros) {
//     let resultado = 0;
//     for(let numero of numeros) {
//         resultado += numero;
//     }
//     return resultado;
// }

// console.log(sumar(1,3,8,9,10,50));
// console.log(sumar(...numeros));


//DESPUES DE VER OBJETOS, VEMOS ALGUNA COSA MÁS DE ARRAYS

// forEach(): Ejecuta una función una vez por cada elemento del array
// const numeros = [1, 3, 5, 7];

// numeros.forEach((numero)=> {
//     console.log(numero);
// })

// map(): Crea un nuevo array con los resultados de aplicar una función a cada elemento del array original
// const numeros = [1, 2, 3, 4, 5];
// const doblaNumeros = numeros.map((numero)=> {
//    return numero * 2; 
// });

// console.log(doblaNumeros);
// console.log(numeros);

// filter(): Crea un nuevo array con todos los elementos que cumplan una condición determinada
// const numeros = [1, 2, 3, 4, 5];
// const numerosPares = numeros.filter((numero)=>{
//     return numero % 2 == 0;
// });

// console.log(numerosPares);
// console.log(numeros);

// reduce(): aplica una función a un acumulador y a cada elemento del array (de izquierda a derecha), para 
// reducirlo a un único valor
// const numeros = [1, 2, 3, 4, 5];
// let suma = numeros.reduce((acumula, numero)=>{
//     return acumula + numero;
// });

// console.log(suma);

// find(): Devuelve el PRIMER elemento del array qye cumpla una condición determinada
// const numeros = [1, 2, 3, 4, 5];
// const numeroEncontrado = numeros.find((numero)=> {
//     return numero < 3; 
// });

// console.log(numeroEncontrado);

// findIndex(): Devuelve el ÍNDICE del primer elemento del array que cumple 
// con una función de prueba, o "-1" si no se encuentra
// const numeros = [1, 2, 3, 4, 5];
// const indiceEncontrado = numeros.findIndex((numero)=>{
//     return numero > 3;
// });

// console.log(indiceEncontrado);

// some(): Comprueba si al menos un elemento del array cumple una condición determinada
// const numeros = [1, 2, 3, 4, 5];
// const tieneNumeroPar = numeros.some((numero)=> {
//     return numero % 2 == 0;
// });

// console.log(tieneNumeroPar);

// every(): Comprueba si todos los elementos del array cumplen con una condición determinada
// const numeros = [1, 2, 3, 4, 5];
// const numeros2 = [2, 4, 6, 8, 10, 0];
// const sonPares = numeros.every((numero)=> {
//     return numero % 2 == 0;
// });
// const sonPares2 = numeros2.every((numero)=> {
//     return numero % 2 == 0;
// });

// console.log(sonPares);
// console.log(sonPares2);




