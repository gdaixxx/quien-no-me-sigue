import { cambiarEstadoSemaforo, separarPorColores, reiniciarColores, vistaSemaforoOff } from './semaforo.js';

import {efectoContadorAnimado, animateValue, efectoContadorAnimadoEnVistasSemaforo, renderizarResumen} from './animation.js';

import { getSepararPorColoresOn, setSepararPorColoresOn } from './main.js';

export { compararFollowersFollowing, cargarFollowers, cargarFollowing };

async function cargarFollowers() {
    try {
        const fetchFollowers = await fetch('./followers_1.json')
        if(!fetchFollowers.ok){
            throw new Error('error' + fetchFollowers.status)
        }
        
        const following = await fetch('./following.json') 
        const dataFollowers = await fetchFollowers.json()
        return dataFollowers
        //console.log(dataFollowers)     
    }
    
    catch(error){
        console.error(error)
    }
    
}

async function cargarFollowing() {
    try {
        const fetchFollowing = await fetch('./following.json')
        if(!fetchFollowing.ok){
            throw new Error('error' + fetchFollowing.status)
        }
        
        const dataFollowing = await fetchFollowing.json()
        return dataFollowing
        //    console.log(dataFollowing)     
    }
    
    catch(error){
        console.error(error)
    }
    
}
async function compararFollowersFollowing(){
    //0. Loaders
    const contadores = document.querySelectorAll('.counter-semaforo');
    contadores.forEach(c => c.innerHTML = '<span class="mini-loader"></span>');

    // 1. Cargar datos
    const dataFollowers = await cargarFollowers();
    const dataFollowing = await cargarFollowing();
    
    // 2. Inyectar HTML (Esto es lo que tarda en procesar el navegador)
    const noTeSiguen = renderUsuarios(dataFollowing, dataFollowers);

    // 3. Animaciones y Listeners
    
    userItemClickListener();
    
    // 4. Aplicar estados (localStorage y Semáforo)
    restaurarEstados(); 
    cambiarEstadoSemaforo();
    
    const isSemaforoOn = document.getElementById('interruptor-semaforo').checked;
    setSepararPorColoresOn(isSemaforoOn);

    renderizarResumen(dataFollowers.length, dataFollowing.relationships_following.length, noTeSiguen.length, "0");
    actualizarResumenSemaforo();

    if(isSemaforoOn){
        separarPorColores();
         efectoContadorAnimado() 
            
    } else {
        vistaSemaforoOff();
         efectoContadorAnimado() 
    }

    // 5. EL TRUCO: requestAnimationFrame
    // Esto espera a que el navegador termine de "pintar" los cambios anteriores
    // requestAnimationFrame(() => {
    //     actualizarResumenSemaforo();
    //     // document.getElementById('resumen-semaforo').style.display = 'block';
    // });
}

//mostrar un div u otro según el estado del slider!!!!!!!!!! animar solo cuando sea necesario

const renderUsuarios = (dataFollowing, dataFollowers) => {
    const nombresFollowers = dataFollowers.map( following => following.string_list_data[0].value)
    
    const nombresFollowing = dataFollowing.relationships_following.map(following => following.title)
    

    
    const teSiguen = nombresFollowing.filter(userName => nombresFollowers.includes(userName)) 
    
    // console.log(teSiguen)
    
    const noTeSiguen = nombresFollowing.filter(userName => !nombresFollowers.includes(userName)) 
    
    // console.log(noTeSiguen)
    
    const noTeSiguenConLinks = dataFollowing.relationships_following
    .filter(following => noTeSiguen.includes(following.title)).sort((a, b) => a.title.localeCompare(b.title))
    // Includes devuelve TRUE o FALSE, según si el elemento está o no en el array y va construyendo uno nuevo con aquellos elementos que sí están a partir de el array original de dataFollowing
    .map(user => ({
        usuario: user.title,
        href: user.string_list_data[0].href,
        status: "gris"
    }))
        
    document.getElementById('no-te-siguen-list').innerHTML = `
        ${noTeSiguenConLinks.map(item => `<div class="user-item ${item.status}" id=${item.usuario}><a class="link-to-user-account" href='${item.href}' target="_blank">${item.usuario}</a><span class="semaforo">🚦</span>   <span class="status-dot status-red"></span></div>`).join('')}
    `

    return noTeSiguen


}

//Ni de casualidad hubiera pensado eso sin IA
const userItemClickListener = () => {
document.getElementById('lista-de-usuarios').addEventListener('click', function(e) {
  // ¿hicieron clic en un link dentro de un .user-item?
  if (e.target.matches('.user-item a')) {
    const item = e.target.closest('.user-item');
    if (!item) return;

    // desactivo todos los activos
    this.querySelectorAll('.user-item__activo').forEach(el => {
      el.classList.replace('user-item__activo', 'user-item');
    });

    // activo el padre del link clickeado
    item.classList.replace('user-item', 'user-item__activo');
  }
})};

function restaurarEstados(){
    
    const estados = JSON.parse(localStorage.getItem("estadosSemaforos")) || {}
    
    for (const id in estados) {
        const div = document.getElementById(id)
        
        if (div) {
            div.classList.remove("gris","rojo","amarillo","verde")
            div.classList.add(estados[id])
        }
    }
}

const actualizarResumenSemaforo = () => {
    // Usamos querySelectorAll para buscar CUALQUIER elemento que tenga la clase de color
    // independientemente de si es .user-item o .user-item__activo
    const rojos = document.querySelectorAll('.rojo').length;
    const amarillos = document.querySelectorAll('.amarillo').length;
    const verdes = document.querySelectorAll('.verde').length;
    const grises = document.querySelectorAll('.gris').length;

    console.log("Conteo detectado -> Rojos:", rojos, "Verdes:", verdes);

    // Actualización del DOM
    const actualizarTexto = (id, valor) => {
        const el = document.getElementById(id);
        if (el) el.innerText = valor;
    };

    actualizarTexto('resumen-rojo', rojos);
    actualizarTexto('resumen-amarillo', amarillos);
    actualizarTexto('resumen-verde', verdes);
    actualizarTexto('resumen-gris', grises);

    return { rojos, amarillos, verdes, grises };
}

export {actualizarResumenSemaforo};