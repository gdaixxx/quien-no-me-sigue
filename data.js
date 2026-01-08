import { vistaSemaforoOn, separarPorColores, reiniciarColores, vistaSemaforoOff } from './semaforo.js';

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

    finally{
        console.log('Hola mundo')
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

    finally{
        console.log('Hola mundo')
    }
}


async function compararFollowersFollowing(){
    const dataFollowers = await cargarFollowers()
    const dataFollowing = await cargarFollowing()

    const nombresFollowers = dataFollowers.map( following => following.string_list_data[0].value)
    
    const nombresFollowing = dataFollowing.relationships_following.map(following => following.title)

    console.log('followers' + nombresFollowers)
    console.log('following' + nombresFollowing)


    const teSiguen = nombresFollowing.filter(userName => nombresFollowers.includes(userName)) 

    console.log(teSiguen)

    const noTeSiguen = nombresFollowing.filter(userName => !nombresFollowers.includes(userName)) 

    console.log(noTeSiguen)

    const noTeSiguenConLinks = dataFollowing.relationships_following
    .filter(following => noTeSiguen.includes(following.title)).sort((a, b) => a.title.localeCompare(b.title))
    // Includes devuelve TRUE o FALSE, según si el elemento está o no en el array y va construyendo uno nuevo con aquellos elementos que sí están a partir de el array original de dataFollowing
    .map(user => ({
        usuario: user.title,
        href: user.string_list_data[0].href,
        status: "gris"
    }))


    console.log(noTeSiguenConLinks)

    document.getElementById('no-te-siguen-count').innerHTML = noTeSiguen.length

    // document.getElementById('no-te-siguen-list').innerHTML = `
    //     ${noTeSiguenConLinks.map(item => `<li id=${self.crypto.randomUUID()}><a href='${item.href}'>${item.usuario}</a>🔗<span>🚦</span></li>`).join('')}
    // `

    
    document.getElementById('no-te-siguen-list').innerHTML = `
        ${noTeSiguenConLinks.map(item => `<div class="user-item ${item.status}" id=${item.usuario}><a href='${item.href}' target="_blank">${item.usuario}</a><span class="semaforo">🚦</span>   <span class="status-dot status-red"></span>
</div>`).join('')}
    `

    // const resumen = `
    // <p>🫡 Te siguen ${dataFollowers.length} personas.</p>
    // <p>😉 Seguís ${dataFollowing.relationships_following.length} personas.</p>
    // <p>😩 No te siguen ${noTeSiguen.length} personas.</p>
    // <p>🤫 No seguís a xxxx personas que te siguen.</p>
    // `

    // document.getElementById('resumen').innerHTML = resumen
    
    efectoContadorAnimado(dataFollowers.length, dataFollowing.relationships_following.length, noTeSiguen.length)
    
    restaurarEstados()
    
    cambiarEstadoSemaforo()

}



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

import {efectoContadorAnimado, animateValue} from './animation.js';

export { compararFollowersFollowing, cargarFollowers, cargarFollowing };