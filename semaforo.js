export { vistaSemaforoOn, separarPorColores, reiniciarColores, vistaSemaforoOff };
export {interruptorSemaforo}
import {setsepararPorColoresOn, getSepararPorColoresOn} from "./main.js";

let timeout = null
let separarPorColoresOn = getSepararPorColoresOn

//cambiador de semaforo
function vistaSemaforoOn(){
    const coloresDelSemaforo = ["gris", "rojo", "amarillo", "verde"]

    document.addEventListener('click', function(e){
        if(e.target.classList.contains('semaforo')){

                const parent = e.target.parentElement
                
                const id = parent.id

                let estadoActual = coloresDelSemaforo.find(color => parent.classList.contains(color))

                let siguiente = ""

                switch (estadoActual) {
                    case "gris": siguiente = "rojo"; break;
                    case "rojo": siguiente = "amarillo"; break;
                    case "amarillo": siguiente = "verde"; break;
                    case "verde": siguiente = "gris"; break;
                }      
                parent.classList.remove(estadoActual)
                parent.classList.add(siguiente)

                const estados = JSON.parse(localStorage.getItem("estadosSemaforos")) || {}
                estados[id] = siguiente
                localStorage.setItem("estadosSemaforos", JSON.stringify(estados))

                if(separarPorColoresOn){
                    delayInColorUpdate()
                    }
            }
        })
    }


function separarPorColores(){
  
  document.getElementById('resumen-semaforo').style.display = 'flex'
  document.getElementById('resumen-global').style.display = 'none'

  
  const usuarios = Array.from(document.querySelectorAll('.user-item'));

  const contenedorRojo = document.getElementById('rojo');
  const contenedorAmarillo = document.getElementById('amarillo');
  const contenedorVerde = document.getElementById('verde');
  const contenedorGris = document.getElementById('gris');

  // Limpia los destinos
  contenedorRojo.innerHTML = '';
  contenedorAmarillo.innerHTML = '';
  contenedorVerde.innerHTML = '';
  contenedorGris.innerHTML = '';

  // Mueve los nodos originales (no clones)
  usuarios.forEach(usuario => {
    if (usuario.classList.contains('rojo')) {
      contenedorRojo.appendChild(usuario);
    } else if (usuario.classList.contains('amarillo')) {
      contenedorAmarillo.appendChild(usuario);
    } else if (usuario.classList.contains('verde')) {
      contenedorVerde.appendChild(usuario);
    } else {
      contenedorGris.appendChild(usuario);
    }
  });

  // Asegura que los destinos estén visibles
  contenedorRojo.style.display = 'block';
  contenedorAmarillo.style.display = 'block';
  contenedorVerde.style.display = 'block';
  contenedorGris.style.display = 'block';
    document.querySelectorAll('.por-colores').forEach(el => {
  el.style.display = 'block';});

  
  //separarPorColoresOn = true;
  setSepararPorColoresOn(true);

  // Oculta card de resumen global
  document.getElementById('resumen-global').style.display = 'none';

}



const delayInColorUpdate = () => {
  // Si ya había un timeout pendiente, lo cancelo
  if (timeout) {
    clearTimeout(timeout);
  }

  // Programo la separación por colores dentro de 3 segundos
  timeout = setTimeout(() => {
    if (separarPorColoresOn) {
      separarPorColores();
    }
    timeout = null; // limpio la referencia
  }, 1000); 
};

const reiniciarColores = () => {
  const contenedor = document.getElementById('no-te-siguen-list');

  // Tomo todos los elementos .user-item como array
  const usuarios = Array.from(document.querySelectorAll('.user-item'));

  // Pongo todos en gris
  usuarios.forEach(item => {
    item.classList.remove('rojo', 'amarillo', 'verde', 'gris');
    item.classList.add('gris');
  });

  // Ordeno por el atributo id
  usuarios.sort((a, b) => a.id.localeCompare(b.id));

  // Vacío el contenedor y reinsertar en orden
  contenedor.innerHTML = '';
  usuarios.forEach(item => contenedor.appendChild(item));

  // Limpio estados guardados
  localStorage.removeItem("estadosSemaforos");
  separarPorColoresOn = false;
 
  // Recordar: no se puede aplicar style a NodeList, hay que usar forEach para iterar sobre cada elemento y aplicar el estilo individualmente
  document.querySelectorAll('.por-colores').forEach(el => {
  el.style.display = 'none';
});
  // me aseguro de que el resumen global esté visible y el resumen del semaforo oculto
  document.getElementById('resumen-global').style.display = 'flex';
  document.getElementById('resumen-semaforo').style.display = 'none'
};

const vistaSemaforoOff = () => {
  const contenedor = document.getElementById('no-te-siguen-list');
  const usuarios = Array.from(document.querySelectorAll('.user-item')); 

  usuarios.sort((a, b) => a.id.localeCompare(b.id));

  contenedor.innerHTML = '';

  usuarios.forEach(item => contenedor.appendChild(item));
  
  document.querySelectorAll('.por-colores').forEach(el => {el.style.display = 'none';}) 
  
  document.getElementById('resumen-global').style.display = 'flex';
  document.getElementById('resumen-semaforo').style.display = 'none'

  separarPorColoresOn = false;

}



// Interruptor vista de semaforo
const interruptorSemaforo = document.getElementById('interruptor-semaforo');

interruptorSemaforo.addEventListener('change', () => {
    
    separarPorColoresOn = interruptorSemaforo.checked
    
    if(separarPorColoresOn){
        separarPorColores()
       // document.querySelector('#resumen-global').style.display = 'none';
        

    } else{
        vistaSemaforoOff()
    }
    console.log(separarPorColoresOn)
});

