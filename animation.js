function efectoContadorAnimado(followersCount, followingCount, noTeSiguenCount, noSeguis) {
    const followersCounter = document.getElementById('te-siguen');
    const followingCounter = document.getElementById('seguis');
    const noTeSiguenCounter = document.getElementById('no-te-siguen');
    const noSeguisCounter = document.getElementById('no-seguis');

    followersCounter.innerText = followersCount;
    followingCounter.innerText = followingCount;
    noTeSiguenCounter.innerText = noTeSiguenCount;
    noSeguisCounter.innerText = noSeguis;

    const contadores = document.querySelectorAll('.counter')
    
    contadores.forEach(counter => {
        const endValue = parseInt(counter.textContent, 10);
        animateValue(counter, 0, endValue, 2000);
        // console.log('Animando contador para', counter, 'hasta', endValue);
    });
}

function efectoContadorAnimadoEnVistasSemaforo() {
    
    const contadores = document.querySelectorAll('.counter-semaforo')
    
    contadores.forEach(counter => {
        const endValue = parseInt(counter.textContent, 10);
        animateValue(counter, 0, endValue, 2000);
        // console.log('Animando contador para', counter, 'hasta', endValue);
    });
}



function animateValue(obj, start, end, duration) {

  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
  
}

export { efectoContadorAnimado };
export { animateValue };
export { efectoContadorAnimadoEnVistasSemaforo };