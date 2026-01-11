import Swal from 'https://esm.sh/sweetalert2';

const alerta = (titulo, texto, tituloConfirmacion, textoConfirmacion, funcion) => {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "¡Sí, adelante!"
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
          title: tituloConfirmacion,
          text: textoConfirmacion,
          icon: "success"
        });

        funcion()

    }
});
}

export {alerta};