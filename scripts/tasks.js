import { getListaTarefas, setListaTarefas } from './storage.js';

let listaTarefas = getListaTarefas();
const form = document.querySelector('form');
const tasksContainer = document.getElementById('tasks');
const categoriaDesejada = document.getElementById('filter');

export function salvarTarefa() {
  const titulo = document.getElementById('title').value.trim();
  const descricao = document.getElementById('description').value.trim();
  const categoria = document.getElementById('category').value;
  const dataVencimento = document.getElementById('deadline').value;

  if (titulo === '') return;

  const novaTarefa = {
    id: Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
    titulo,
    descricao,
    categoria,
    dataVencimento,
    status: false
  };

  listaTarefas.push(novaTarefa);
  setListaTarefas(listaTarefas);
  form.reset();
  filtrar();
}

export function filtrar() {
  listaTarefas = getListaTarefas();
  const valorFiltro = categoriaDesejada.value;

  if (valorFiltro === 'todas') {
    renderizaTarefa(listaTarefas);
  } else {
    const listaFiltrada = listaTarefas.filter(tarefa => tarefa.categoria === valorFiltro);
    renderizaTarefa(listaFiltrada);
  }
}

function renderizaTarefa(lista) {
  tasksContainer.innerHTML = lista.map(tarefa => `
    <div class="tarefa cards">
      <p class='titulo'> Tarefa:  ${tarefa.titulo}</p>
      <p class='descricao'> Descrição:  ${tarefa.descricao}</p>
      <p class='data'> Data de vencimento:  ${tarefa.dataVencimento}</p>
      <p class='categoria'> Categoria:  ${tarefa.categoria}</p>
      <button id="btnExcluir" class="excluir" data-id="${tarefa.id}">Excluir</button>
    </div>
  `).join('');

  document.querySelectorAll('.excluir').forEach(botao => {
    botao.addEventListener('click', excluirTarefa);
  });
}

function excluirTarefa(e) {
  const confirmacao = window.confirm("Tem certeza que deseja excluir esta tarefa?");
  if (confirmacao) {
    const idParaRemover = e.target.getAttribute('data-id');
    listaTarefas = listaTarefas.filter(tarefa => tarefa.id !== idParaRemover);
    setListaTarefas(listaTarefas);
    filtrar();
  }
}