// CREACIÓN
// let saludo = "Hola";
// console.log(saludo);

// CONSTRUCTOR
// let saludo2 = new String('Hola');
// console.log(saludo2);

// PROPIEDADES
// length
// let saludo = "Hola";
// console.log(saludo.length);

// MÉTODOS COMÚNES

// charAt(): Retorna el caràcter de l'índex especificat dins la cadena, com si cada caràcter
//          fos un element de l'array
// let caracter = saludo.charAt(1);
// console.log(caracter);

// charCodeAt(): Retorna el codi unicode del caràcter de l'índex especificat
// let codigo = saludo.charCodeAt(3);
// console.log(codigo); //97

// concat(): combina una o més cadenes
// let saludoCompleto = saludo.concat(', ¿cómo estás?');
// console.log(saludoCompleto);

// inclues(): verifica si una cadena conté una altra (retornarà un booleà)
// console.log(saludo.includes('mundo'));
// console.log(saludoCompleto.includes('cómo'));

// indexOf(): Retorna l'índex de la primera aparició d'una cadena a una altra cadena
// let indice = saludo.indexOf('la');
// console.log(indice);

// lastIndexOf(): Retorna l'index de la darrera aparició d'una cadena a una altra cadena
// let cadena = "Hola, hola, adios y hola";
// let ultimoIndice = cadena.lastIndexOf('hola');
// console.log(ultimoIndice);

// slice(): Extrae una parte de una cadena y devuelve una nueva cadena
// let cadena = "Hola, cara de bola";
// let nuevaCadena = cadena.slice(2, 10);
// console.log(nuevaCadena);

// subString(): Similar a slice, pero
// let cadena = 'Hola, cara de bola';
// let nuevaCadena = cadena.substring(6,10);
// console.log(nuevaCadena);

// toLowerCase(), toUpperCase()
// let cadena = "Hola, cara de bola";
// let mayus = cadena.toUpperCase();
// let minus = cadena.toLowerCase();
// console.log(minus);
// console.log(mayus);

// // Devolver cadena minus todo en minus menos 'cara'
// let cadena1 = minus.substring(0,5);
// let cadena2 = minus.substring(6,10).toUpperCase();
// let cadena3 = minus.substring(11, 18);

// let cadenaNueva = cadena1.concat(' ' + cadena2).concat(' ' + cadena3);
// console.log(cadenaNueva);

// replace(): Reemplaza una cadena por otra
// let cadena = "Hola, cara de bola";
// let mayus = cadena.toUpperCase();
// let minus = mayus.toLowerCase().replace('cara', 'CARA');
// console.log(minus);

// trim(): Elimina espacios en blanco delante y detrás de la cadena (trimEnd() y trimStart() para eliminar solo los de delante o solo los de detrás)
// let cadena = "   Joan    ";
// console.log(cadena.length);
// console.log(cadena);
// let cadenaSinEspacios = cadena.trim();
// console.log(cadenaSinEspacios);
// console.log(cadenaSinEspacios.length);

// split(): Divide una cadena en un array de subcadenas
let cadena = "Hola, cara de bola";
// let miArray = cadena.split(' ');
// console.log(miArray);
console.log(cadena[1]);
