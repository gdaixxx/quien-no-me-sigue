//Código para cargar los ficheros JSON de followers y following y comparar quién no te sigue

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
    .filter(following => noTeSiguen.includes(following.title))
    // Includes devuelve TRUE o FALSE, según si el elemento está o no en el array y va construyendo uno nuevo con aquellos elementos que sí están a partir de el array original de dataFollowing
    .map(user => ({
        usuario: user.title,
        href: user.string_list_data[0].href
    }))


    console.log(noTeSiguenConLinks)

    document.getElementById('no-te-siguen-count').innerHTML = noTeSiguen.length

    document.getElementById('no-te-siguen-list').innerHTML = `
        ${noTeSiguenConLinks.map(item => `<li><a href='${item.href}'>${item.usuario}</a>🔗</li>`).join('')}
    `

    const resumen = `
    <p>🫡 Te siguen ${dataFollowers.length} personas.</p>
    <p>😉 Seguís ${dataFollowing.relationships_following.length} personas.</p>
    <p>😩 No te siguen ${noTeSiguen.length} personas.</p>
    <p>🤫 No seguís a xxxx personas que te siguen.</p>
    `

    document.getElementById('resumen').innerHTML = resumen

    
}

compararFollowersFollowing()
