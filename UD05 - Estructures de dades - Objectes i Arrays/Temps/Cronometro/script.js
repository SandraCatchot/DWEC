
let segundos = 0;
let minutos = 0;
let horas = 0;
let cronometro; // Variable para mostrar el cronometro
let enMarcha = false; // Variable para verificar si el cronómetro está corriendo

function actualizarCrono() {
    segundos++;
    if (segundos >= 60) {
        segundos = 0;
        minutos++;

        if (minutos >= 60) {
            minutos = 0;
            horas++;
        }
    }

    let horasTexto = omplirAmbZeros(horas, 2);
    let minutosTexto = omplirAmbZeros(minutos, 2);
    let segundosTexto = omplirAmbZeros(segundos, 2);

    document.getElementById('laHora').innerHTML = horasTexto + ":" + minutosTexto + ":" + segundosTexto;
}

document.getElementById('btnStart').addEventListener('click', function() {
    if (!enMarcha) { // Solo iniciar si no está corriendo
        cronometro = setInterval(actualizarCrono, 1000);
        enMarcha= true;
    }
});

document.getElementById('btnStop').addEventListener('click', function() {
    clearInterval(cronometro); 
    enMarcha = false;
});

document.getElementById('btnReset').addEventListener('click', function() {
    clearInterval(cronometro);
    enMarcha = false;
    segundos = 0;
    minutos = 0;
    horas = 0;
    document.getElementById('laHora').innerHTML = "00:00:00"; // Reiniciar vista crono
});
