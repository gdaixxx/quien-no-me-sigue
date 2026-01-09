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
    const noSeguisCounter = document.getElementById('no-seguis');

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


export { efectoContadorAnimado };
export { animateValue };
export { efectoContadorAnimadoEnVistasSemaforo };
export { renderizarResumen };
export { confirmarBorrado };