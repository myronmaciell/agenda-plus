const STORAGE_KEY = 'comunidade_pessoas';

function getPessoas() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function savePessoas(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function adicionarPessoa() {
  const input = document.getElementById('inputNome');
  const nome = input.value.trim();
  if (!nome) { input.focus(); return; }

  const lista = getPessoas();
  lista.push({ id: Date.now(), nome });
  savePessoas(lista);
  input.value = '';
  input.focus();
  renderLista();
}

function removerPessoa(id) {
  savePessoas(getPessoas().filter(p => p.id !== id));
  renderLista();
}

function renderLista() {
  const ul = document.getElementById('listaPessoas');
  const badge = document.getElementById('countBadge');
  const lista = getPessoas();

  badge.textContent = lista.length;

  if (lista.length === 0) {
    ul.innerHTML = '<li class="empty-msg">Nenhuma pessoa cadastrada ainda.</li>';
    return;
  }

  ul.innerHTML = lista.map(p => `
    <li class="person-item">
      <div class="person-info">
        <div class="avatar">${escapeHtml(p.nome.charAt(0).toUpperCase())}</div>
        <span class="person-name">${escapeHtml(p.nome)}</span>
      </div>
      <button class="btn-remove" onclick="removerPessoa(${p.id})">Remover</button>
    </li>
  `).join('');
}

document.getElementById('inputNome').addEventListener('keydown', e => {
  if (e.key === 'Enter') adicionarPessoa();
});

renderLista();