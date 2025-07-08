import { salvarTarefa, filtrar } from './tasks.js';
import { alternarModo, aplicarModoInicial } from './darkmode.js';

const categoriaDesejada = document.getElementById('filter');
const form = document.querySelector('form');
const saveBtn = document.getElementById('save');
const btnModo = document.getElementById('alteraModo');

document.addEventListener('DOMContentLoaded', () => {
  aplicarModoInicial();
  filtrar();
});

categoriaDesejada.addEventListener('change', filtrar);

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

saveBtn.addEventListener('click', salvarTarefa);
btnModo.addEventListener('click', alternarModo);


