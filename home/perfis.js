// Simula um login que retorna o perfil do usuário
async function obterPerfilUsuario() {
  let cargo = "";

  email = sessionStorage.getItem("email");
  senha = sessionStorage.getItem("senha");

  try {
    const res = await fetch("http://localhost:8000/perfil", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    const idCargo = await res.json();

    if (idCargo == "1") {
      cargo = "cozinheiro";
    } else if (idCargo == "2") {
      cargo = "degustador";
    } else if (idCargo == "3") {
      cargo = "editor";
    } else if (idCargo == "4") {
      cargo = "admin";
    }
  } catch (err) {
    document.getElementById("erro-msg").textContent =
      "Erro de conexão com o servidor.";
    console.error(err);
  }
  return cargo;
}

function carregarHomePorPerfil(perfil) {
  const conteudo = document.getElementById("conteudo");
  const body = document.body;

  // Aplica uma classe de estilo de acordo com o perfil
  body.classList.add(perfil);

  // Insere conteúdo baseado no perfil
  if (perfil === "admin") {
    conteudo.innerHTML = ` 
      <h2>
        <body>
          <header>Nossas Receitas</header>

          <div class="container">
            <div class="dashboard-box">
              <h2>Dashboard Administrador</h2>

              <div class="grid-buttons">
                <button onclick="window.location.href='../consultarFuncionario/funcionario.html'">Cargo</button>
                <button onclick="window.location.href='../ConsultarRestaurante/restaurantes.html'">Restaurantes</button>
                <button onclick="window.location.href='../IncluirCategoria/categoria.html'">Categoria</button>
                <button onclick="window.location.href='../consultarFuncionario/funcionario.html'">Funcionário</button>
                <button onclick="window.location.href='../RealatorioMensal/relatorio.html'">Relatório de Produção Mensal</button>
                <button onclick="window.location.href='../ConsultarRestaurante/restaurantes.html'">Referência</button>
                <button onclick="window.location.href='../GerarEmail/email.html'">Gerar e-mail de produção Mensal</button>
                <button onclick="window.location.href='../Parametros/parametros.html'">Parâmetros do Sistema</button>
              </div>

              <div class="voltar" onclick="window.history.back()">Voltar</div>
            </div>
          </div>
        </body>
      </h2>
    `;
  } else if (perfil === "cozinheiro") {
    conteudo.innerHTML = `
      <body>
        <header>Nossas Receitas</header>
          <div class="container">
            <div class="dashboard-box">
              <h2>Dashboard Cozinheiro</h2>
              <div class="dashboard-buttons">
                <button onclick="location.href='adicionar.html'">
                  <span class="icon">📋</span> Adicionar receita
                </button>
                <button onclick="location.href='ver.html'">
                  <span class="icon">📋</span> Ver receita
                </button>
                <button onclick="location.href='medida.html'">
                  <span class="icon">📏</span> Medida
                </button>
                <button onclick="location.href='ingredientes.html'">
                  <span class="icon">🧂</span> Ingredientes
                </button>
              </div>
              <div class="voltar" onclick="window.history.back()">Voltar</div>
            </div>
          </div>
      </body>
    `;
  } else {
    conteudo.innerHTML = `
      <h2>Bem-vindo Visitante</h2>
      <p>Cadastre-se ou faça login para acessar mais recursos.</p>
    `;
  }
}

// Executa ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const perfil = obterPerfilUsuario();
  carregarHomePorPerfil(perfil);
});
