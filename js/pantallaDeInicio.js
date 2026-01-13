// Imports

import * as UILoader from "./UILoader.js"
import * as data from "./data.js"
import * as toolbar from "./herramientasNavbar.js"
import { initSemaforo } from "./semaforo.js";
import * as menu from './menu.js'

// Ocultar el h1 cuando termina su animación
const presentationTitle = document.getElementById("presentation-title");

export function titleAnimationHandler(){

    if(presentationTitle){
        presentationTitle.addEventListener("animationend", () => {
            console.log("Hola Lolo")
            presentationTitle.parentElement.style.display = "none";
        });
        
            presentationTitle.classList.add("animate__animated", "animate__bounceOutDown", "animate__delay-2s")
    }
}



// Función para procesar el archivo y guardarlo

export function cargarArchivo(idInput, claveStorage) {
    const input = document.getElementById(idInput);
    
    input.addEventListener('change', (event) => {
        const archivo = event.target.files[0];
        if (!archivo) return;
        
        // const btnId = event.target
        const lector = new FileReader();
        
        lector.onload = (e) => {
            
            try {
                
                const btnLabel = document.getElementById(event.target.previousElementSibling.id)
                btnLabel.style.backgroundColor = "green"
                btnLabel.innerHTML = `<span class="material-symbols-outlined animate__animated animate__bounceIn">check_circle</span>`
                              
                const contenido = e.target.result;
                
                // Validar que sea un JSON real
                JSON.parse(contenido); 
                
                // Guardar como string en el localStorage
                localStorage.setItem(claveStorage, contenido);
                
                verificarCargaCompleta();
                
            } catch (error) {
                
                const btnLabel = document.getElementById(event.target.previousElementSibling.id)
                
                btnLabel.style.backgroundColor = "red"
                
                btnLabel.innerHTML = `
                    <span class="material-symbols-outlined animate__animated animate__shakeX">error</span>`
                
                alert("El archivo no es un JSON válido");
            }
        };
        
        lector.readAsText(archivo);
        
    });
}


function verificarCargaCompleta() {
    
    const followers = localStorage.getItem('followers_data');
    
    const following = localStorage.getItem('following_data');
    
    const submitBtn = document.getElementById("submitBtn")

    if (followers && following) {
        submitBtn.disabled = false
        submitBtn.classList.add("animate__animated", "animate__flash")
    } else{
        submitBtn.disabled = true
    }
}

// Handler del botón submit: carga la interfaz de usuario y ejecuta comparación de datos para su inmediato renderizado
export function subtimBtnHandler(){
    const submitBtn = document.getElementById("submitBtn");
    if (!submitBtn) return;
    submitBtn.addEventListener('click', (e) => {
        data.cargarFollowers()
        data.cargarFollowing()
        UILoader.loadUI()
        data.compararFollowersFollowing()
        toolbar.btnBorrarColores()
        toolbar.btnAyuda()
        toolbar.btnBorrar()
        initSemaforo()
        menu.hamburgerBtnToggle()
        menu.checkWidth()
        window.addEventListener("resize", menu.checkWidth)  
    })
}