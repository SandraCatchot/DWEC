// {} objectes

// let unCliente = {
//     nombre: "Peter Jackson",
//     "Dirección del cliente": "c/ desconocida",
//     "-+-+-+-+": "boquepasa",
//     pago: {
//         tipo: "Visa",
//         tarjeta: "1234567890",
//         "fecha de caducidad": "nunca"
//     }
// };

// console.log(unCliente);
// // unCliente["nombre"] = "Juan";
// // console.log(unCliente["nombre"]);
// // console.log(unCliente.nombre);

// console.log(unCliente.pago.tipo);
// console.log(unCliente.pago["fecha de caducidad"]);

// let estudiante = {
//     id: 2,
//     nombre: "Obi Wan Kenobi",
//     diHola: function () {
//         return "Hola";
//     }
// };

// console.log(estudiante);
// // console.log(estudiante.diHola());

// estudiante.edad = 190;
// estudiante.diAdios = function() {
//     return "Adiós";
// }

// console.log(estudiante.diAdios());
// console.log(estudiante);

// this
// let factura = {
//     descripcion: "factura de prueba",
//     importe: 100.0, 
//     iva: 21.00,
//     subtotal: function() {
//         return this.importe;
//     },
//     total: function() {
//         return this.importe + (this.importe * this.iva) / 100;
//     }
// }

// console.log(factura.total());
// console.log(factura.subtotal());


// CONSTRUCTORES
// function Web() {
//     this.url = "http://localhost";
//     this.nombre = "Localhost";
//     this.fechaCreacion = 1995;
//     this.ip = "192.168.1.15";

//     this.mostrarInfo = () => {
//         return this.nombre + " / " + this.url + " / " + this.fechaCreacion + " / " + this.ip;
//     }
// }

// let unaWeb = new Web();
// unaWeb.url = "http://fcbarcelona.cat";
// unaWeb.nombre = "Més que un club";
// // console.log(unaWeb);
// console.log(unaWeb.mostrarInfo());

// let otraWeb = new Web();
// console.log(otraWeb.mostrarInfo());


// function Web(url, nombre) {
//     this.url = url;
//     this.nombre = nombre;
//     this.fechaCreacion = 1995;
//     this.ip = "192.168.1.15";

//     this.mostrarInfo = () => {
//         return this.nombre + " / " + this.url + " / " + this.fechaCreacion + " / " + this.ip;
//     }
// }

// let unaWeb = new Web("http://fcbarcelona.cat", "Més que un club");
// console.log(unaWeb.mostrarInfo());

// let otraWeb = new Web("http://localhost", "Localhost");
// console.log(otraWeb.mostrarInfo());

// Web.visitas = 10;
// console.log(unaWeb.visitas);

// Web.miFuncion = function() {
//     return "Boquepasa";
// }

// console.log(unaWeb.miFuncion());

// PROTOTYPE
// console.log(unaWeb);

// Web.prototype.visitas = 10;
// Web.prototype.diHola = function () {
//     return "Hola"
// };
// unaWeb.visitas = 23;
// console.log(unaWeb.visitas);

// console.log(unaWeb.diHola());

// RECORRER UN OBJECTE
// let notas = {
//     diw: 8,
//     dwes: 9.5,
//     dwec: 4.9,
//     daw: {
//         test: 2.0,
//         practic: 5.0
//     }
// };

// for(let nota in notas) {
//     console.log(typeof notas[nota]);
//     console.log(notas[nota]);
// }

// STAR WARS: Personajes y edades
/*
    Eres un joven padawan que colecciona datos sobre los héroes de Star Wars.
    Se te proporcionan dos arrays: uno con los nombres de algunos de estos héroes
    y otro con sus edades (en el episodio IV), con la indexación correspondiente
    a su nombre en el otro array.

*/

// const nombres = ["Luke", "Obi-Wan", "Yoda", "Leia"];
// const edades = [19, 57, 900, 19];

/*
    Escribe un programa que combine los datos de ambos arrays en un objeto y 
    los muestre por consola.
    Calcula, además, la suma de las edades y muestrala al final.

*/

// let personajes = {};
// let sumaEdades = 0;


// for (let i = 0; i < nombres.length; i++) {
//     let nombre = nombres [i];
//     let edad = edades [i];

//     personajes[nombre] = edad;

//     sumaEdades = sumaEdades + edad;  
// }

// console.log("Personajes y sus edades:", personajes);
// console.log("Suma de las edades:", sumaEdades);




// let personajes = {};
// let sumaEdades = 0;

// // forEach para recorrer los arrays
// nombres.forEach((nombre, index) => {
//     personajes[nombre] = edades[index];  // Añadimos cada personaje con su edad al objeto
//     sumaEdades += edades[index];         // Suma de edades
// });

// console.log("Personajes y edades:", personajes);
// console.log("Suma de las edades:", sumaEdades);



// DESESTRUCTURACION DE OBJETOS
// const persona = {
//     nombre: "Pere",
//     edad: 33
// };

// const {nombre, edad} = persona;

// console.log(nombre, edad);

// const nombre = "Toni";
// const edad = "54";

// const persona {
//     nombre,
//     edad
// };

// ORDENAR MATRICES CON OBJETOS
const ciudades = [{
    municipio: "Zaragoza",
    poblacion: "Zaragoza"
}, 
{
    municipio: "Ávila",
    poblacion: "Ávila"
},
{
    municipio: "madrid",
    poblacion: "madrid"
}
];

ciudades.sort((a,b)=> {
    a.municipio.localeCompare(b.municipio);
});

console.log(ciudades);




