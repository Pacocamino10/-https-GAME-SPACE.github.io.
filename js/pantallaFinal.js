class PantallaFinal {
   
  constructor(texto,musica) {
    const audio3 = new Audio(musica);
    audio3.play();
    let div = document.createElement("div");
    div.textContent = texto;
    div.className = "principal2";
    document.body.appendChild(div);
    let boton = document.createElement("button");
    boton.addEventListener("click", this.funcionEjecutar);
    boton.textContent = "INICIO";
    boton.className = "botonInicio";
    document.querySelector(".principal2").appendChild(boton);
  }

  funcionEjecutar() {
    Game.cancion.pause();
    document.body.innerHTML=""
    
     Game.init(new Audio("musica/07 Shelf Space.mp3"));
    
  }
}
