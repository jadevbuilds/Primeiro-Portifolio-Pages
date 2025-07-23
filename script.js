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

// Criar novo projeto
function criarCardProjeto(nome, link, descricao) {
  const div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = `
    <h3>${nome}</h3>
    <p>${descricao}</p>
    <div class="acoes">
      <a href="${link}" target="_blank" class="btn-ver-projeto">Ver Projeto</a>
      <button class="btn-excluir" aria-label="Excluir projeto" title="Excluir projeto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M3 6h18v2H3V6zm2 3h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9zm5 3v6h2v-6H10zm4 0v6h2v-6h-2z"/>
        </svg>
      </button>
    </div>
  `;

  // Confirmar exclusão antes de remover
  div.querySelector(".btn-excluir").addEventListener("click", () => {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
      div.remove();
    }
  });

  return div;
}

// Excluir projetos existentes com confirmação
document.querySelectorAll(".btn-excluir").forEach(btn => {
  btn.addEventListener("click", e => {
    const card = e.target.closest(".card");
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
      card.remove();
    }
  });
});

// Formulário de novos projetos
const form = document.getElementById("formProjeto");
const projetosGrid = document.getElementById("projetosGrid");

form.addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nomeProjeto").value.trim();
  const link = document.getElementById("linkProjeto").value.trim();
  const descricao = document.getElementById("descricaoProjeto").value.trim();

  if (!nome || !link || !descricao) return;

  const novoCard = criarCardProjeto(nome, link, descricao);
  projetosGrid.appendChild(novoCard);
  form.reset();
});











