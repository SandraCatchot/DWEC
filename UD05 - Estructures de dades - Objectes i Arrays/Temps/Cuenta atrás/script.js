
let laHora = document.getElementById("laHora");
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reiniciar = document.getElementById("reiniciar");

let elCrono;
let laMevaData = new Date();

// Events
start.addEventListener(
    "click",
    function () {
      elCrono = setInterval(crono, 1000);
      this.disabled = true;
      stop.disabled = false;
    },
    false
  );

  stop.addEventListener(
    "click",
    function () {
      clearInterval(elCrono);
      start.disabled = false;
      start.innerHTML = "Continuar";
      this.disabled = true;
      reiniciar.disabled = false;
    },
    false
  );

  reiniciar.addEventListener(
    "click",
    function () {
      reiniciarCrono();
      this.disabled = true;
      stop.disabled = true;
    },
    false
  );

  laMevaData.setHours(0, 0, 20, 0);

function crono() {
  let horas = laMevaData.getHours();
  let minutos = laMevaData.getMinutes();
  let segundos = laMevaData.getSeconds();

  segundos -= 1;
  laMevaData.setSeconds(segundos);

  horas = omplirAmbZeros(horas, 2); 
  minutos = omplirAmbZeros(minutos, 2);
  segundos = omplirAmbZeros(segundos, 2);

  let horaActual = horas + ":" + minutos + ":" + segundos;

  laHora.innerHTML = horaActual;
}

function reiniciarCrono() {
    laMevaData.setHours(0,0,20,0);
    laHora.innerHTML = "00:00:20";
    start.disabled = false;
    start.innerHTML = "Start";
}

reiniciarCrono();

