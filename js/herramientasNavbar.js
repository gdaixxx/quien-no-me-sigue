import { reiniciarColores } from "./semaforo.js";
import { alerta } from "./alertas.js";
import { abrirModal } from './modal.js';
import * as initScreen from './pantallaDeInicio.js'
import * as UILoader from "./UILoader.js"
import {cleaningScreebTransition} from './animation.js'

const btnBorrarColores = () => {
    const btn = document.getElementById('btn-borrar-colores');
    
    btn.addEventListener(
        'click',
        function (e){
            alerta(
                "¿Estás seguro de continuar?", 
                "Se eliminarán todos los colores que hayas aplicado para diferenciar usuarios, tanto en la vista normal como en la vista semáforo.",
                "¡Adiós semáforo!",
                "Los colores han sido eliminados correctamente. Diviértete con tu vida gris.",
                reiniciarColores
            )
        }
    )
}

const clearAll = () => {
    
    localStorage.removeItem('followers_data')
    localStorage.removeItem('following_data')
    localStorage.removeItem('estadosSemaforos')
    
    cleaningScreebTransition()
}

const tituloBtnAyuda = `<p>Cómo funciona<p/>`
const textoBtnAyuda = `<p>Este sitio te facilita conocer datos sobre tus seguidores, con particular énfasis en tomar decisiones sobre quienes no te siguen a vos. Para eso, contás con una herramienta semáforo🚦, que te permitirá indicar sobre cada cuenta de usuario qué acción desarías tomar: 🔴 dejar de seguir, 🟡 pensarlo mejor o 🟢 no dejar de seguir.<br>
<br>Tené en cuenta que, por razones de seguridad, no podemos acceder a tu cuenta de instagram para automatizar la tarea de dejar de seguir. Te toca hacerlo manualmente. Para que sea más fácil, tené presente que al hacer clic sobre el nombre de un usuario su perfil se abrirá una pestaña nueva en tu navegador.</p> `

const btnAyuda = () => {
    const btn = document.getElementById('help');

    btn.addEventListener(
        'click',
        function (e){
            abrirModal(tituloBtnAyuda, textoBtnAyuda)
        }
    )
}


const btnBorrar = () => {
    
    const btn = document.getElementById("delete")
    
    btn.addEventListener(
        'click',
        function (e){
            alerta(
                "¿Estás seguro de continuar?", 
                "Se eliminarán todos tus datos de manera definitiva y ya no tendrás acceso a ellos",
                "¡Von voyage!",
                "Todos los datos que teníamos de vos se acaban de ir por el retrete. Felicitaciones, humano 🚽.",
                clearAll
            )
        }
    )
}





export {btnBorrarColores, btnAyuda, btnBorrar}



