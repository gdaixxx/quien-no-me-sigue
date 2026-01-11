//Imports
import {compararFollowersFollowing} from './data.js';
import {initSemaforo} from './semaforo.js';
import {btnBorrarColores, btnAyuda, btnBorrar} from './herramientasNavbar.js';
import * as UILoader from "./UILoader.js";
import * as initScreen from './pantallaDeInicio.js';
import * as menu from './menu.js';
import {ayudaHandler} from './help.js';

function nuevaSesion(){
    UILoader.loadWelcomeScreen()
    initScreen.titleAnimationHandler()
    initScreen.cargarArchivo('input-followers', 'followers_data')
    initScreen.cargarArchivo('input-following', 'following_data')
    initScreen.subtimBtnHandler()
    ayudaHandler()
}

function recuperarSesionAnterior(){
    UILoader.loadUI()
    initSemaforo()
    btnBorrarColores()
    btnAyuda()
    compararFollowersFollowing()
    btnBorrarColores()
    btnAyuda()
    btnBorrar()
    window.addEventListener("resize", menu.checkWidth)
    menu.checkWidth()
    menu.hamburgerBtnToggle()
}



export function renderizadoInicial() {

    if (localStorage.getItem("following_data") === null || localStorage.getItem("followers_data") === null){

        nuevaSesion()

    } else {

        recuperarSesionAnterior()

    }

}