const form = document.getElementById("form");
const nomUsuari = document.getElementById("nomUsuari");
const edat = document.getElementById("edat");
const nivellAngles = document.getElementById("nivellAngles");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const acceptaTermes = document.getElementById("acceptaTermes");


function mostraError(input, missatge) {
  const formControl = input.parentElement;

  formControl.className = "form-control error";
  const label = formControl.querySelector("label");
  const small = formControl.querySelector("small");
  small.innerText = label.innerText + " " + missatge;
}

function mostraCorrecte(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control correcte";
}

function esEmailValid(input) {
  const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value).toLowerCase())) {
      mostraCorrecte(input);
  } else {
      mostraError(input, "no té el format correcte");
  }
}

function esObligatori(inputArray) {
  inputArray.forEach((input) => {
      if (input.type === "checkbox") {
          if (!input.checked) {
              mostraError(input, "és obligatori");
          } else {
              mostraCorrecte(input);
          }
      } else if (input.tagName === "SELECT") {
          if (input.value === "") {
              mostraError(input, "és obligatori");
          } else {
              mostraCorrecte(input);
          }
      } else {
          if (input.value === "") {
              mostraError(input, "és obligatori");
          } else {
              mostraCorrecte(input);
          }
      }
  });
}

function comprovaLongitud(input, min, max) {
  if(input.value.length < min) {
    mostraError(input, `ha de tenir almenys ${min} caràcters`);
  } else if (input.value.length > max) {
    mostraError(input, `ha de tenir màxim ${max} caràcters`);
  } else {
    mostraCorrecte(input);
  }
}

function comprovarContrasenyesIguals(input1, input2){
    if(input1.value != input2.value){
    mostraError(input2, ': no coincideix amb la primera');
    }
}

[nomUsuari, email, password, password2, edat, nivellAngles, acceptaTermes].forEach((input) => {
  input.addEventListener("input", () => {
      if (input.id === "email") {
          esEmailValid(input);
      } else if (input.id === "password2") {
          comprovarContrasenyesIguals(password, password2);
      } else if (input.id === "nomUsuari" || input.id === "password") {
          const min = input.id === "nomUsuari" ? 3 : 4;
          const max = input.id === "nomUsuari" ? 15 : 10;
          comprovaLongitud(input, min, max);
      } else if (input.tagName === "SELECT" && input.value !== "") {
          mostraCorrecte(input);
      } else if (input.type === "checkbox") {
          if (input.checked) {
              mostraCorrecte(input);
          } else {
              mostraError(input, "és obligatori");
          }
      }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const arrControls = [nomUsuari, edat, nivellAngles, email, password, password2, acceptaTermes];

  esObligatori(arrControls);
  comprovaLongitud(nomUsuari, 3, 15);
  comprovaLongitud(password, 4, 10);
  esEmailValid(email);
  comprovarContrasenyesIguals(password, password2);
});

validaTempsReal();