import { getListaTarefas, setListaTarefas } from './storage.js';

let listaTarefas = getListaTarefas();
const form = document.querySelector('form');
const categoriaDesejada = document.getElementById('filter');
const tasksContainer = document.getElementById('tasks');


tasksContainer.addEventListener('dragover', (e) => {
  e.preventDefault();
  tasksContainer.classList.add('hovered');
});

tasksContainer.addEventListener('dragleave', () => {
  tasksContainer.classList.remove('hovered');
});

tasksContainer.addEventListener('drop', (e) => {
  e.preventDefault();
  tasksContainer.classList.remove('hovered');

  const id = e.dataTransfer.getData('text/plain');
  const tarefaArrastada = document.getElementById(id);

  // Lista de possíveis alvos
  const elementos = [...tasksContainer.querySelectorAll('.tarefa')].filter(el => el.id !== id);

  let elementoAlvo = null;
  for (const el of elementos) {
    const rect = el.getBoundingClientRect();

    // Decide se posiciona antes ou depois do alvo
    const offsetY = e.clientY - rect.top;
    const offsetX = e.clientX - rect.left;

    // Se o container for flex row, usa X; se for column, usa Y
    const isRow = getComputedStyle(tasksContainer).flexDirection.startsWith('row');
    const metade = isRow ? rect.width / 2 : rect.height / 2;
    const offset = isRow ? offsetX : offsetY;

    if (offset < metade) {
      elementoAlvo = el;
      break;
    }
  }

  if (elementoAlvo) {
    tasksContainer.insertBefore(tarefaArrastada, elementoAlvo);
  } else {
    tasksContainer.appendChild(tarefaArrastada);
  }

  // Atualiza ordem no localStorage
  const novaOrdem = Array.from(tasksContainer.querySelectorAll('.tarefa')).map(el => el.id);
  listaTarefas.sort((a, b) => novaOrdem.indexOf(a.id) - novaOrdem.indexOf(b.id));
  setListaTarefas(listaTarefas);
});



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
    <div class="tarefa cards" draggable="true" id="${tarefa.id}">
      <p class='titulo' > Tarefa:  ${tarefa.titulo}</p>
      <p class='descricao'> Descrição:  ${tarefa.descricao}</p>
      <p class='data'> Data de vencimento:  ${tarefa.dataVencimento}</p>
      <p class='categoria'> Categoria:  ${tarefa.categoria}</p>
      <button id="btnExcluir" class="excluir" data-id="${tarefa.id}">Excluir</button>
    </div>
  `).join('');

  document.querySelectorAll('.excluir').forEach(botao => {
    botao.addEventListener('click', excluirTarefa);
  });

  document.querySelectorAll('.tarefa').forEach(tarefa => {
    tarefa.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
    });
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