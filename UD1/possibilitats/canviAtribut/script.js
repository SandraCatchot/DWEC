let orca = document.getElementById('orca');
console.log(orca);

function canviaImatge() {
    if(orca.src.match("or")) {
        orca.src = "imatges/blanco.jpg";
    }
    else {
        orca.src = "imatges/orca.jpg";
    }   
}

function canviaTamany() {
    if(orca.src.match("or")) {
        orca.style.width = "1000px";
        orca.style.height = "1000px";
    }      
}

function mouImatge () {
    if(orca.src.match("or")) {
        
    } 
}

