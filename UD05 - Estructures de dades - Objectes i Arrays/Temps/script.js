// OBJETO DATE (ens permetrà treballar amb dates, i també crear rellotge i cronometres)

// let miFecha = new Date();
// console.log(miFecha);

// let horas = miFecha.getHours();
// let minutos = miFecha.getMinutes();
// let segundos = miFecha.getSeconds();

// horas = omplirAmbZeros(horas, 2);   //omplirAmbZeros està a una altra carpeta, a un altre script (linkejada al html)
// minutos =omplirAmbZeros (minutos, 2);
// segundos = omplirAmbZeros (segundos, 2);

// let horaActual = horas + ":" + minutos + ":" + segundos;
// console.log(horaActual);

// EJERCICIO - Mostrar la hora entera con las horas hasta las 12 no 00h
// let miFecha = new Date();
// console.log(miFecha);

// let horas = miFecha.getHours();
// let minutos = miFecha.getMinutes();
// let segundos = miFecha.getSeconds();
// let ampm = "";

// if(horas > 12) {
//     horas -= 12;
//     ampm = "PM";
// } else {
//     ampm = "AM";
// }

// horas = omplirAmbZeros(horas, 2);   //omplirAmbZeros està a una altra carpeta, a un altre script (linkejada al html)
// minutos =omplirAmbZeros (minutos, 2);
// segundos = omplirAmbZeros (segundos, 2);

// let horaActual = horas + ":" + minutos + ":" + segundos + ' ' + ampm;
// console.log(horaActual);

// setTimeout (funcion_a_llamar, milisegundos)
// setInterval (funcion_a_llamar, milisegundos)
// clearInterval()
// clearTimeout()

function crono() {
  let miFecha = new Date();

  let horas = miFecha.getHours();
  let minutos = miFecha.getMinutes();
  let segundos = miFecha.getSeconds();
  let ampm = "";
  let laHora = document.getElementById("laHora");

  if (horas > 12) {
    horas -= 12;
    ampm = "PM";
  } else {
    ampm = "AM";
  }

  horas = omplirAmbZeros(horas, 2); //omplirAmbZeros està a una altra carpeta, a un altre script (linkejada al html)
  minutos = omplirAmbZeros(minutos, 2);
  segundos = omplirAmbZeros(segundos, 2);

  let horaActual = horas + ":" + minutos + ":" + segundos + " " + ampm;

  laHora.innerHTML = horaActual;
}

let elCrono;

window.onload = function () {
  elCrono = setInterval(crono, 1000);
};
