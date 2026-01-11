// Import
import {renderizadoInicial} from './initRender.js'

// Setter y getter del semáforo
  let separarPorColoresOn = false

  export { separarPorColoresOn };

  export function setSepararPorColoresOn(valor) {
      separarPorColoresOn = valor;
  }

  export function getSepararPorColoresOn() {
      return separarPorColoresOn;
  }

// Renderizado inicial

  renderizadoInicial()