//Código para cargar los ficheros JSON de followers y following y comparar quién no 
// te sigue


//Imports
import {compararFollowersFollowing} from './data.js';
import {separarPorColores} from './semaforo.js';
import {vistaSemaforoOff} from './semaforo.js';

// variables de scope global


let separarPorColoresOn = false
export { separarPorColoresOn };

export function setsepararPorColoresOn(valor) {
    separarPorColoresOn = valor;
}

export function getSepararPorColoresOn() {
    return separarPorColoresOn;
}

let timeout = null

import { interruptorSemaforo } from './semaforo.js';

// // Interruptor semaforo
// const interruptorSemaforo = document.getElementById('interruptor-semaforo');
// console.log(interruptorSemaforo.checked)
// interruptorSemaforo.addEventListener('change', () => {
//     separarPorColoresOn = interruptorSemaforo.checked
//     if(separarPorColoresOn){
//         separarPorColores()
//         const resumen = document.querySelector('#resumen-global');

// if (resumen) {
//     console.log("Encontrado", resumen);
//     resumen.style.display = 'none';
// } else {
//     console.log("No se encontró el elemento");
// }

//         document.querySelector('#resumen-global').style.display = 'none';

//     } else{
//         vistaSemaforoOff()
//     }
//     console.log(separarPorColoresOn)
// });




compararFollowersFollowing()




//Por colores button deberia abilitarse si y solo si hay algun semaforo en rojo, amarillo o verde. Si todos son grises, el boton deberia desabilitarse. 


// Efecto de contador animado


