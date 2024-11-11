let guardarLS = document.getElementById('guardarLS');
let recuperarLS = document.getElementById('recuperarLS');
let valorsLS = document.getElementById('valorsLS');
let netejarLS = document.getElementById('netejarLS');

let diHola = 'Hola';
let diAdios = 'Adiós';
let numeros = [1,3,5,7];
let factura = {
    numero: 1,
    descripcion: 'Taula nova del profe',
    import: 22000.50,
    tipoPago: {
        modo: ['tarjeta', 'efectivo', 'bizum'],
        moneda: ['euros', 'dolares', 'yenes']
    }
};

guardarLS.addEventListener('click', () => {
    // localStorage.setItem('diHola', diHola);
    // localStorage.setItem('diAdios', diAdios);

    localStorage.setItem('numeros', JSON.stringify(numeros));
    localStorage.setItem('factura', JSON.stringify(factura));
   
});

recuperarLS.addEventListener('click', () => {
    // let lsdiHola = localStorage.getItem('diHola');
    // if(lsdiHola) {
    //     valorsLS.innerText = lsdiHola;
    // }

    let lsNumeros = localStorage.getItem('numeros');
    lsNumeros = JSON.parse(lsNumeros);
    console.log(lsNumeros);
    valorsLS.innerText = lsNumeros;
    let lsFactura = JSON.parse(localStorage.getItem('factura'));
    console.log(lsFactura);
    console.log(typeof lsFactura);
    valorsLS.innerText = lsFactura;
})

netejarLS.addEventListener('click', ()=> {
    localStorage.clear();
})

