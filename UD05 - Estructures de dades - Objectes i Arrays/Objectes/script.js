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




