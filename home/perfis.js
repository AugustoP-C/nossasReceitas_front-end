// Simula um login que retorna o perfil do usuário
function obterPerfilUsuario() {
  let cargo = "";
  fetch("/perfil", {})
    .then((res) => res.json())
    .then((data) => {
      const idCargo = data.id_cargo;
      if (idCargo == "1") {
        cargo = "cozinheiro";
      } else if (idCargo == "2") {
        cargo = "degustador";
      } else if (idCargo == "3") {
        cargo = "editor";
      } else if (idCargo == "4") {
        cargo = "admin";
      }
    });

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
                <button onclick="window.location.href='ConsultarFuncionario.php'">Cargo</button>
                <button onclick="window.location.href='consultarRestaurante.php'">Restaurantes</button>
                <button onclick="window.location.href='IncluirCategoria.php'">Categoria</button>
                <button onclick="window.location.href='ConsultarFuncionario.php'">Funcionário</button>
                <button onclick="window.location.href='RealatorioMensal.php'">Relatório de Produção Mensal</button>
                <button onclick="window.location.href='consultarRestaurante.php'">Referência</button>
                <button onclick="window.location.href='GerarEmail.php'">Gerar e-mail de produção Mensal</button>
                <button onclick="window.location.href='Parametros.php'">Parâmetros do Sistema</button>
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
