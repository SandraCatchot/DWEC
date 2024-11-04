let arrayUsuarios = [];

function cargarUsuariosDesdeCookies() {
  const cookies = document.cookie.split("; "); // Obtenemos todas las cookies

  for (let i = 0; i < cookies.length; i++) {
    const [clave, valor] = cookies[i].split("=");
    const nombreDecodificado = decodeURIComponent(valor);

    // Si la cookie contiene el nombre de un usuario
    if (clave.includes("nombre_")) {
      const nombre = nombreDecodificado;
      const edadClave = "edad_" + nombre;

      // Buscar la cookie de edad correspondiente en el siguiente elemento
      for (let j = 0; j < cookies.length; j++) {
        const [edadClaveActual, edadValor] = cookies[j].split("=");
        if (edadClaveActual === edadClave) {
          const edad = decodeURIComponent(edadValor);
          arrayUsuarios[arrayUsuarios.length] = { nombre: nombre, edad: edad };
          break;
        }
      }
    }
  }
}

function existe() {
  let nombreUser = prompt("Introduce tu nombre:");
  let encontrado = false;

  for (let usuario of arrayUsuarios) {
    if (usuario.nombre === nombreUser) {
      alert(
        "Tu nombre es: " +
          usuario.nombre +
          " y tienes " +
          usuario.edad +
          " años."
      );
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    cookieNomEdat(nombreUser);
  }
}

function cookieNomEdat(nombre) {
  let edad = prompt("Introduce tu edad:");

  document.cookie =
    "nombre_" +
    encodeURIComponent(nombre) +
    "=" +
    encodeURIComponent(nombre) +
    "; expires=Thu, 31 Oct 2024 12:00:00 GMT";
  document.cookie =
    "edad_" +
    encodeURIComponent(nombre) +
    "=" +
    encodeURIComponent(edad) +
    "; expires=Thu, 31 Oct 2024 12:00:00 GMT";

  arrayUsuarios.push({ nombre: nombre, edad: edad });
  alert("Cookies creadas y usuario añadido.");
}

// Carga los usuarios desde las cookies al iniciar
cargarUsuariosDesdeCookies();
existe();
