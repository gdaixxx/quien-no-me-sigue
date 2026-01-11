export { cambiarEstadoSemaforo, separarPorColores, reiniciarColores, vistaSemaforoOff };
import {setSepararPorColoresOn, getSepararPorColoresOn} from "./main.js";
import { actualizarResumenSemaforo } from "./data.js";

let timeout = null

//cambiador de semaforo
function cambiarEstadoSemaforo(){
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
            
            if(getSepararPorColoresOn()){
                delayInColorUpdate()
            }

            actualizarResumenSemaforo()
        }
    })
}


function separarPorColores(){
    
    document.getElementById('resumen-semaforo').style.display = 'grid'
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
    
    
    
export const delayInColorUpdate = () => {
        // Si ya había un timeout pendiente, lo cancelo
        if (timeout) {
            clearTimeout(timeout);
        }
        
        // Programo la separación por colores dentro de 3 segundos
        timeout = setTimeout(() => {
            if (getSepararPorColoresOn()) {
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
        setSepararPorColoresOn(false);
        
        // Recordar: no se puede aplicar style a NodeList, hay que usar forEach para iterar sobre cada elemento y aplicar el estilo individualmente
        document.querySelectorAll('.por-colores').forEach(el => {
            el.style.display = 'none';
        });
        // me aseguro de que el resumen global esté visible y el resumen del semaforo oculto
        document.getElementById('resumen-global').style.display = 'grid';
        document.getElementById('resumen-semaforo').style.display = 'none'
    };
    
    const vistaSemaforoOff = () => {
        const contenedorNoTeSiguen = document.getElementById('no-te-siguen-list');
        const contenedorNoSeguis = document.getElementById('no-seguis-list');
        const usuarios = Array.from(document.querySelectorAll('.user-item'));
        const noSeguidos = Array.from(document.querySelectorAll('.user-item-no-seguido')); 
        
        // Limpia ambos contenedores
        contenedorNoTeSiguen.innerHTML = '';
        contenedorNoSeguis.innerHTML = '';
        
        usuarios.forEach(item => {contenedorNoTeSiguen.appendChild(item);});
        noSeguidos.forEach (item => {contenedorNoSeguis.appendChild(item);})

        document.querySelectorAll('.por-colores').forEach(el => {el.style.display = 'none';}) 
        
        document.getElementById('resumen-global').style.display = 'grid';
        document.getElementById('resumen-semaforo').style.display = 'none'
        document.getElementById('no-seguis-list').style.display = 'flex'

        
        setSepararPorColoresOn(false);
        
    }
    
    
    
    // Inicializador que enlaza el interruptor (debe llamarse después de renderizar la UI)
    export function initSemaforo() {
        const interruptorSemaforo = document.getElementById('interruptor-semaforo');

        if (!interruptorSemaforo) return;

        interruptorSemaforo.addEventListener('change', () => {
            setSepararPorColoresOn(interruptorSemaforo.checked)

            quitarDestacado()

            if(getSepararPorColoresOn()){
                separarPorColores()
                actualizarResumenSemaforo()
            } else{
                vistaSemaforoOff()
            }
        });
    }
    

    //sacar de main
const quitarDestacado = () => {
    const listado = document.getElementById('lista-de-usuarios');
    const activo = listado.querySelector('.user-item__activo');
    if (activo) {
        activo.classList.replace('user-item__activo', 'user-item');
    }}           
