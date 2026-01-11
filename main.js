//Imports
import {compararFollowersFollowing} from './data.js';
import {separarPorColores} from './semaforo.js';
import {vistaSemaforoOff} from './semaforo.js';
import {delayInColorUpdate} from './semaforo.js';
import './semaforo.js';
import {btnBorrarColores, btnAyuda, btnBorrar} from './herramientasNavbar.js'
import { initSemaforo } from './semaforo.js'
// import { interruptorSemaforo } from './semaforo.js';
import { alerta } from './alertas.js';
import * as UILoader from "./UILoader.js"
import * as initScreen from './pantallaDeInicio.js'
import * as menu from './menu.js'


// Exports
let timeout = null

// Setter y getter del semáforo
let separarPorColoresOn = false

export { separarPorColoresOn };

export function setSepararPorColoresOn(valor) {
    separarPorColoresOn = valor;
}

export function getSepararPorColoresOn() {
    return separarPorColoresOn;
}

// Renderizado inicial

function renderizadoInicial() {
  if (localStorage.getItem("following_data") === null || localStorage.getItem("followers_data") === null){
    UILoader.loadWelcomeScreen()
    initScreen.titleAnimationHandler()
    console.log("Hola")
    initScreen.cargarArchivo('input-followers', 'followers_data')
    initScreen.cargarArchivo('input-following', 'following_data')
    initScreen.subtimBtnHandler()

  } else {
    UILoader.loadUI()
    initSemaforo()
    btnBorrarColores()
    btnAyuda()
    compararFollowersFollowing()
    btnBorrarColores()
    btnAyuda()
    btnBorrar()
    hamburgerBtnToggle()
    window.addEventListener("resize", checkWidth)
    menu.checkWidth()
    menu.hamburgerBtnToggle()
  }

}




renderizadoInicial()