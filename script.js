// Dark Mode
const toggleButton = document.getElementById("toggle-dark-mode");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleButton.textContent = "☀️";
}

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  toggleButton.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const projetosGrid = document.getElementById("projetosGrid");

// Função para criar cards de projeto
function criarCardProjeto(nome, link, descricao, isLocal = false) {
  const div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = `
    <h3>${nome}</h3>
    <p>${descricao}</p>
    <div class="acoes">
      <a href="${link}" target="_blank" class="btn-ver-projeto">Ver Projeto</a>
      ${
        isLocal
          ? `<button class="btn-excluir" aria-label="Excluir projeto" title="Excluir projeto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M3 6h18v2H3V6zm2 3h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9zm5 3v6h2v-6H10zm4 0v6h2v-6h-2z"/>
              </svg>
            </button>`
          : ""
      }
    </div>
  `;

  if (isLocal) {
    div.querySelector(".btn-excluir").addEventListener("click", () => {
      if (confirm("Tem certeza que deseja excluir este projeto?")) {
        div.remove();
        removerProjetoLocal(nome);
      }
    });
  }

  return div;
}

// LocalStorage: salvar, carregar, remover
function salvarProjetoLocal(projeto) {
  const projetos = JSON.parse(localStorage.getItem("projetos")) || [];
  projetos.push(projeto);
  localStorage.setItem("projetos", JSON.stringify(projetos));
}

function carregarProjetosDoStorage() {
  return JSON.parse(localStorage.getItem("projetos")) || [];
}

function removerProjetoLocal(nome) {
  let projetos = JSON.parse(localStorage.getItem("projetos")) || [];
  projetos = projetos.filter(p => p.nome !== nome);
  localStorage.setItem("projetos", JSON.stringify(projetos));
}

// Renderizar todos os projetos (JSON público + localStorage)
async function renderizarProjetos() {
  projetosGrid.innerHTML = "";

  // 1. Carregar projetos do JSON público
  let projetosPublicos = [];
  try {
    const res = await fetch("projetos.json");
    projetosPublicos = await res.json();
  } catch (err) {
    console.error("Erro ao carregar projetos públicos:", err);
  }

  // 2. Carregar projetos locais
  const projetosLocais = carregarProjetosDoStorage();

  // 3. Adicionar os públicos
  projetosPublicos.forEach(({ nome, link, descricao }) => {
    const card = criarCardProjeto(nome, link, descricao, false);
    projetosGrid.appendChild(card);
  });

  // 4. Adicionar os locais
  projetosLocais.forEach(({ nome, link, descricao }) => {
    const card = criarCardProjeto(nome, link, descricao, true);
    projetosGrid.appendChild(card);
  });
}

// Formulário de novos projetos
const form = document.getElementById("formProjeto");

form.addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nomeProjeto").value.trim();
  const link = document.getElementById("linkProjeto").value.trim();
  const descricao = document.getElementById("descricaoProjeto").value.trim();

  if (!nome || !link || !descricao) return;

  const novoProjeto = { nome, link, descricao };
  salvarProjetoLocal(novoProjeto);

  const novoCard = criarCardProjeto(nome, link, descricao, true);
  projetosGrid.appendChild(novoCard);
  form.reset();
});

// Inicializar renderização
renderizarProjetos();













