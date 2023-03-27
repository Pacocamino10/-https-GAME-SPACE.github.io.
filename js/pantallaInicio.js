class PantallaInicio {
  constructor() {
      let canvas = document.querySelector("canvas").remove();
    let pantalla = document.querySelector(".principal");

    let boton = document.createElement("button");
    boton.addEventListener("click", this.funcionEjecutar);
    boton.textContent = "INICIO";
    boton.className = "botonInicio";
    document.querySelector(".principal").appendChild(boton);
  }

  funcionEjecutar() {

document.body.innerHTML="";
    Game.init();
    
  }
}
