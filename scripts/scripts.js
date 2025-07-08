/*// ---------- VARIÁVEIS E INICIALIZAÇÃO ----------
let listaTarefas = JSON.parse(localStorage.getItem('listaTarefas')) || [];

const categoriaDesejada = document.getElementById('filter');
const form = document.querySelector('form');
const saveBtn = document.getElementById('save');
const btnModo = document.getElementById('alteraModo');
const tasksContainer = document.getElementById('tasks');


// ---------- INICIALIZAÇÃO ----------
document.addEventListener('DOMContentLoaded', () => {
  aplicarModoInicial();
  filtrar();
});

// ---------- EVENTOS ----------
categoriaDesejada.addEventListener('change', filtrar);

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Previne o refresh da página
});

saveBtn.addEventListener('click', salvarTarefa);

btnModo.addEventListener('click', alternarModo);

// ---------- FUNÇÕES PRINCIPAIS ----------

function salvarTarefa() {
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
  salvarNoLocalStorage();
  form.reset();
  filtrar();
}

function salvarNoLocalStorage() {
  localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas));
}

function renderizaTarefa(lista) {

  tasksContainer.innerHTML = lista.map(tarefa => `
    <div class="tarefa cards">
      <p class='titulo'><strong>Tarefa:</strong> ${tarefa.titulo}</p>
      <p class='descricao'><strong>Descrição:</strong> ${tarefa.descricao}</p>
      <p class='data'><strong>Data de vencimento:</strong> ${tarefa.dataVencimento}</p>
      <p class='categoria'><strong>Categoria:</strong> ${tarefa.categoria}</p>
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
    salvarNoLocalStorage();
    filtrar();
  }
}

function filtrar() {
  const valorFiltro = categoriaDesejada.value;

  if (valorFiltro === 'todas') {
    renderizaTarefa(listaTarefas);
  } else {
    const listaFiltrada = listaTarefas.filter(tarefa => tarefa.categoria === valorFiltro);
    renderizaTarefa(listaFiltrada);
  }
}

// ---------- MODO ESCURO ----------

function alternarModo() {
  const modoAtual = localStorage.getItem('ativado') === 'true';
  const novoModo = !modoAtual;

  document.body.classList.toggle('dark', novoModo);
  localStorage.setItem('ativado', novoModo.toString());
}

function aplicarModoInicial() {
  const modoSalvo = localStorage.getItem('ativado') === 'true';
  document.body.classList.toggle('dark', modoSalvo);
}

*/