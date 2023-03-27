class PantallaInicio {
    
  constructor() {

    let titulo = document.createElement('h1');
    titulo.textContent="ALIEN SPACE";
    document.querySelector(".principal").appendChild(titulo);

    let boton = document.createElement("button");
    boton.addEventListener("click", this.funcionEjecutar);
    boton.textContent = "INICIO";
    boton.className = "botonInicio";
    document.querySelector(".principal").appendChild(boton);
  }

  funcionEjecutar() {

document.body.innerHTML="";
const audio2 = new Audio("musica/07 Shelf Space.mp3");
audio2.play();
audio2.volume=0.5;

    Game.init(audio2);
    
  }
}
