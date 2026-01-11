export const loadUI = () => {
    document.body.innerHTML = UI
} 

export const loadWelcomeScreen = () => {
    document.body.innerHTML = welcomeScreen
}

const UI = `

    <header>

        <div class="encabezado">
 
            <button id="hamburgerBtn" style="display:none;">☰</button>
 
            <h1 class="brand-name">Clasificador de&nbsp;seguidores</h1>

            <div class="herramientas">

                <div class="toolbox">
                    
                    <div class="tooltip">
                        <span class="material-symbols-outlined toolbar-tool" id="btn-borrar-colores">format_color_reset</span>
                        <span class="tooltiptext">Reiniciar colores</span>
                    </div>
                    
                    <div class="tooltip" id="help">
                        <span class="material-symbols-outlined toolbar-tool">help</span>
                        <span class="tooltiptext">Cómo funciona</span>
                    </div>
                                        
                    <div class="tooltip" id="delete">
                        <span class="material-symbols-outlined toolbar-tool danger">delete</span>
                        <span class="tooltiptext">Eliminar datos</span>
                    </div>
                </div>  
                
                <div class="separador-vertical">&nbsp;</div>


                <div id="bloque-interruptor">
                    <div id="contenedorIconoSemaforo">
                        <span class="material-symbols-outlined" id="icono-semaforo">traffic</span>
                    </div>
                    
                    <label class="switch tooltip">
                        <input type="checkbox" id="interruptor-semaforo">
                        <span class="slider round"></span>
                        <span class="tooltiptext">Modo semáforo <br>ON/OFF</span>
                    </label>
                </div>
                
            </div>
            
                <div id="hamburgerMenu" style="display:none;"></div>
        </div>

    </header>


    <main>

        <div class="resumen-containers-wrapper">
            <section class="resumen-container" id="resumen-global">

                <article class="card">
                    <div class="card-emoji">🫡</div>
                    <div class="counter" id="te-siguen"></div>
                    <div class="card-label">te siguen</div>
                </article>

                <article class="card">
                    <div class="card-emoji">😉</div>
                    <div class="counter" id="seguis">
                        <div class="new-counter"></div>
                    </div>
                    <div class="card-label">seguís</div>
                </article>

                <article class="card">
                    <div class="card-emoji">😩</div>
                    <div class="counter" id="no-te-siguen"></div>
                    <div class="card-label">no te siguen</div>
                </article>

                <article class="card">
                    <div class="card-emoji">🤫</div>
                    <div class="counter" id="no-seguis-counter"></div>
                    <div class="card-label">no seguís</div>
                </article>

            </section>
            <section class="resumen-container" id="resumen-semaforo" style="display:none;">
                <article class="card">
                    <div class="card-emoji">🔴</div>
                    <div class="counter-semaforo rojo-count" id="resumen-rojo">0<span class="mini-loader"></span></div>
                    <div class="card-label">Dejar de seguir</div>
                </article>
                <article class="card">
                    <div class="card-emoji">🟡</div>
                    <div class="counter-semaforo amarillo-count" id="resumen-amarillo">
                        <span class="mini-loader"></span>
                    </div>
                    <div class="card-label">En duda</div>
                </article>
                <article class="card">
                    <div class="card-emoji">🟢</div>
                    <div class="counter-semaforo verde-count" id="resumen-verde">0<span class="mini-loader"></span></div>
                    <div class="card-label">Conservar</div>
                </article>
                <article class="card">
                    <div class="card-emoji">⚪</div>
                    <div class="counter-semaforo gris-count" id="resumen-gris">0<span class="mini-loader"></span></div>
                    <div class="card-label">Sin evaluar</div>
                </article>
                
            </section>
        </div>
        
        <div class="separador-horizontal">    </div>
        
        <div id="lista-de-usuarios">
            
            <section>
                <h2>No te siguen</h2>
                <article id="no-te-siguen-list"></article>
            </section>
            
            <div class="semaforo-grid-wrapper">
                
                <section class="por-colores" id="contenedor-rojo">    
                    <h3> Dejar de seguir</h3>
                    <div id="rojo"></div>
                </section>
                
                <section class="por-colores" id="contenedor-amarillo">
                    <h3>En duda</h3>
                    <div id="amarillo"></div>
                </section>
                
                <section class="por-colores" id="contenedor-verde">
                    <h3>Conservar</h3>
                    <div id="verde"></div>
                </section>
                
                <section class="por-colores" id="contenedor-gris">
                    <h3>Sin evaluar</h3>
                    <div id="gris"></div>
                </section>
            </div>
            <div class="separador-horizontal">    </div>
            <div class="divisor2"></div>
            <section class="">
                
                <h2 id="no-seguis-header">No seguís</h2>
                
                <div id="no-seguis-list" class="no-seguis-container-wrapper">

                </div>
            </section>
            
        </div>    
    </main>
    
    <footer>

        <div class="melting-text-container">
            <p class="melting-text">Instadaixo</p>
        </div>     <p>Desarrollado por <a href="https://instadaixo.com">Instadaixo</a></p>

    </footer>
`

const welcomeScreen = `
    <div id="presentation-title-wrapper">
        <h1 class="animate__bounceOutDown animate__delay-2s animate__animated" id="presentation-title">Clasificador de&nbsp;seguidores</h1>
    </div>
    
    <div class="wrapper animate__animated animate__slideInRight animate__delay-3s">
        
        <!-- 
        <div class="carga-container-wrapper"></div> -->
        <div class="carga-container" id="carga-container">
            
            <div class="video"></div>
            
            
            <div class="container">
                <div class="top">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                
                <div class="content">
                    <h2>¿Querés saber quiénes <i>no</i> te siguen en Instagram?</h2>
                    <div class="text-intro-wrapper">
                        <p>Esta aplicación te da una mano para que accedas de forma rápida y sencilla a esta información. Para ello tendrás que obtener dos archivos de tu red social (<span id="ayuda" class="keyword-con-link">acá</span> te mostramos cómo) y subirlos en el orden correcto a continuación.</p>
                        <p>¿Preocupado por tu información? ¡No lo estés! Esta app es "segura". Tus datos se procesan directamente en tu dispositivo, sin necesidad de darnos acceso a tu cuenta, y podés borrar tu información con un simple paso cuando lo desees.</p>
                    </div>
                    <div class="carga">
                        <div class="carga-followers">
                            <label class="uploadBtn" for="input-followers" id="uploadBtnFollowers">
                                <span class="display-inline-block material-symbols-outlined">upload</span></label>
                                <input type="file" id="input-followers" accept=".json" hidden>
                                <p>Subí tus SEGUIDORES <span class="exampleText">
                                    <br>(p.ej. Followers.json)</span></p>
                                </div>
                                
                                <div class="carga-following">
                                    <label class="uploadBtn" for="input-following" id="uploadBtnFollowing">
                                        <span class=" display-inline-block material-symbols-outlined">upload</span></label>
                                        <input type="file" id="input-following" accept=".json" hidden>
                                        <p>Subí tus SEGUIDOS <span class="exampleText">
                                            <br>(p.ej. Following.json)</span></p>
                                        </div>
                                    </div>
                                    <div class="wrapperBtn">
                                        <button id="submitBtn" class="" disabled>¡Comenzar!</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                        
                    </div>
                </div>     
`