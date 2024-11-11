// window.addEventListener('click', ()=> {
// console.log('Hiciste clic?');
// });

// let boton = document.querySelector("button");
// boton.addEventListener('click', clic);

// function clic() {
//     console.log("Clic sobre el botón");
//     boton.removeEventListener('click', clic);
// }

// let boton = document.querySelector("button");
// boton.addEventListener('mousedown', (e)=> {
//     // console.log(e);
//     //console.log(e.button);
//     if(e.button == 0) {
//         console.log("Botón izq");
//     } else if (e.button == 1) {
//         console.log("el chicho de enmedio");
//     } else if(e.button == 2) {
//         console.log("Botón dcho.");
//     } else {
//         console.log("Botón desconocido");
//     }
// });

// let boton = document.querySelector("button");
// let parrafo = document.getElementsByTagName("p")[0];

// parrafo.addEventListener("mousedown", ()=> {
//     console.log("Controlador de evento para el párrafo");
// });

// boton.addEventListener('mousedown', (e)=> {
//     console.log("Contralador de evento para el botón");
//     // console.log(e);
//     if(e.button == 2) {
//         e.stopPropagation();
//     }
    
// });

// document.addEventListener('click', (e)=> {
//     if(e.target.nodeName.toLowerCase() == "button") {
//         console.log('Clic en ', e.target.textContent);
//     }
// });

// let enlace = document.querySelector('a');

// enlace.addEventListener('click', (e)=> {
//     console.log('Correcto');
//     e.preventDefault();
// });

// window.addEventListener('keydown', (e)=> {
//     if(e.key == "v") {
//         document.body.style.background = "violet";
//     }
// });

// window.addEventListener('keyup', (e)=> {
//     if(e.key == "v") {
//         document.body.style.background = "";
//     }
// });

// window.addEventListener('keydown', (e)=> {
//     if(e.key == e.ctrlKey && e.key == " ") {
//         console.log('Continuado....');;
//     }
// });

// EJERCICIO - Si clicas en las 2/3 partes de arriba de la pantalla, se crea un div (un punto), 
// si clicas en el 1/3 inferior de la pantalla, se borran todos los puntos

// Si clicas en el tercio inferior, que se eliminen todos los divs creados
// acceder a los divs con queryselector, los que formen parte de dot... con un bucle, que se eliminen

window.addEventListener('click', (e)=> {
    let tercioPantalla = window.innerHeight / 3;
    if (e.pageY > tercioPantalla * 2) {
        let puntos = document.querySelectorAll('.dot');    
        puntos.forEach(punto => punto.remove());
    } else {
        let punto = document.createElement("div");
        punto.className = "dot";
        punto.style.left = (e.pageX - 4) + "px";
        punto.style.top = (e.pageY - 4) + "px";
        document.body.appendChild(punto);
    }
});





