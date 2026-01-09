export const abrirModal = (titulo, cuerpo) => {
    // 1. Creamos el elemento dialog
    const modal = document.createElement('dialog');
    modal.id = 'modal-dinamico';
    modal.className = 'modal';

    // 2. Inyectamos el contenido HTML
    modal.innerHTML = `
        <div class="modal-header">
            <h2>${titulo}</h2>
            <span class="close-modal material-symbols-outlined" id="close-x">close</span>
        </div>
        <div class="modal-body">
            ${cuerpo}
        </div>
        <div class="modal-footer">
            <button class="btn-entendido" id="btn-ok">¡Entendido!</button>
        </div>
    `;

    // 3. Lo añadimos al DOM
    document.body.appendChild(modal);

    // 4. Abrimos el modal
    modal.showModal();

    // 5. Función para cerrar y ELIMINAR del DOM
    const destruirModal = () => {
        modal.close();
        modal.remove(); // Aquí es donde desaparece por completo del HTML
    };

    // 6. Eventos de cierre
    modal.querySelector('#close-x').onclick = destruirModal;
    modal.querySelector('#btn-ok').onclick = destruirModal;
    
    // Cerrar al hacer clic fuera (en el backdrop)
    modal.onclick = (e) => {
        if (e.target === modal) destruirModal();
    };
};
