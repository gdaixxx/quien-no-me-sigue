import Swal from 'https://esm.sh/sweetalert2';

function efectoContadorAnimado() {
  
  const contadores = document.querySelectorAll('[class^="counter"]')
  
  contadores.forEach(counter => {
    const endValue = parseInt(counter.textContent, 10);
    animateValue(counter, 0, endValue, 2000);
    // console.log('Animando contador para', counter, 'hasta', endValue);
  });
}

function renderizarResumen(followersCount, followingCount, noTeSiguenCount, noSeguis) {
  const followersCounter = document.getElementById('te-siguen');
  const followingCounter = document.getElementById('seguis');
  const noTeSiguenCounter = document.getElementById('no-te-siguen');
  const noSeguisCounter = document.getElementById('no-seguis-counter');
  
  followersCounter.innerText = followersCount;
  followingCounter.innerText = followingCount;
  noTeSiguenCounter.innerText = noTeSiguenCount;
  noSeguisCounter.innerText = noSeguis;
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


const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
function confirmarBorrado() {
  return swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      return swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      return swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
    return result;
  });
}



function cleaningScreebTransition() {
    
        const curtain = document.createElement('div');
        curtain.id = 'transition-curtain';
        curtain.innerHTML = `
            <div id="curtain-text"></div>
            <div class="spinner"></div>
        `;
        document.body.appendChild(curtain);

        const text = document.getElementById('curtain-text');

        //  PEQUEÑA PAUSA (para que el navegador note que existe el div antes de animar)
        setTimeout(() => {
            // Ponemos el GIF y el mensaje
            text.innerHTML = `
                <div>
                    <img style="border-radius: 50%; max-width: 400px;" src="./assets/chatbot.gif" alt="Chatbot">
                </div>
                <div>Gracias por usarme, como tu ex</div>`;
            
            // Subimos la cortina
            curtain.classList.add('active');

            // 3. SEGUNDA PAUSA (Para leer el mensaje cruel)
            setTimeout(() => {
                curtain.classList.add('blue');
                text.innerText = "Reiniciando aplicación";

                // 4. ÚLTIMA PAUSA (Para ver el azul y el spinner antes de morir)
                setTimeout(() => {

                  location.reload();
                }, 2500); // 2 segundos de pantalla azul

            }, 3500); // 3 segundos para leer lo de "tu ex"

        }, 1550); 
      }
  
            


export { efectoContadorAnimado };
export { animateValue };
export { efectoContadorAnimadoEnVistasSemaforo };
export { renderizarResumen };
export { confirmarBorrado };
export {cleaningScreebTransition}