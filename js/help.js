import {abrirModal} from './modal.js'

const ayudaDescargaJSON = `

<video src="./assets/tutorialJSONdownload.mp4" 
           controls 
           style="width: 100%; border-radius: 8px;"
           poster="./assets/miniatura-video.jpg">
    </video>
<div class="tutorial-container">
        <div class="step-box">
            <p><strong>1.</strong> Entra a tu perfil de Instagram y ve a <strong>Menú > Centro de cuentas</strong>.</p>
        </div>
        <div class="step-box">
            <p><strong>2.</strong> Busca <strong>Tu información y permisos</strong> y elige <strong>Exportar tu información</strong>.</p>
        </div>
        <div class="step-box">
            <p><strong>3.</strong> Elige <strong>Exportar al dispositivo</strong> y en "Personalizar" selecciona <strong>solo Seguidores y seguidos</strong>.</p>
        </div>
        <div class="step-box highlight">
            <p><strong>4. ¡CLAVE!</strong> Cambia el Formato de <strong>HTML a JSON</strong> e inicia la exportación.</p>
        </div>
        <div class="info-footer">
            <p>📧 Te llegará un mail de Meta con el archivo en unas horas.</p>
        </div>
    </div>
`

const modalAyudaDescargaJSON = () => abrirModal("Video", ayudaDescargaJSON)

export const ayudaHandler = () => {
    const ayuda = document.getElementById('ayuda')
    ayuda.addEventListener(
        'click',
        modalAyudaDescargaJSON
    )
}