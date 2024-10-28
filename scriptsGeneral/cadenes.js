function omplirAmbZeros(numero, longitud) {
    let cadenaNumero = String(numero);
    while (cadenaNumero.length < longitud) {
      cadenaNumero = "0" + cadenaNumero;
    }
    return cadenaNumero;
  }
  