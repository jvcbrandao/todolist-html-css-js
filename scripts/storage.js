export function getListaTarefas() {
  return JSON.parse(localStorage.getItem('listaTarefas')) || [];
}

export function setListaTarefas(lista) {
  localStorage.setItem('listaTarefas', JSON.stringify(lista));
}

export function getModoEscuro() {
  return localStorage.getItem('ativado') === 'true';
}

export function setModoEscuro(valor) {
  localStorage.setItem('ativado', valor.toString());
}
