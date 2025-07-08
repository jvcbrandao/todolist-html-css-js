import { getModoEscuro, setModoEscuro } from './storage.js';

export function alternarModo() {
  const modoAtual = getModoEscuro();
  const novoModo = !modoAtual;
  document.body.classList.toggle('dark', novoModo);
  setModoEscuro(novoModo);
}

export function aplicarModoInicial() {
  const modoSalvo = getModoEscuro();
  document.body.classList.toggle('dark', modoSalvo);
}
