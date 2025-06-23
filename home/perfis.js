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

    const data = await res.json();

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

    return cargo;
  } catch (err) {
    document.getElementById("erro-msg").textContent =
      "Erro de conexão com o servidor.";
    console.error(err);
  }
}

async function carregarHomePorPerfil() {
  const conteudo = document.getElementById("conteudo");
  const body = document.body;
  const perfil = await obterPerfilUsuario();
  if (perfil) {
    document.body.classList.add(perfil);
  } else {
    console.warn("Classe não definida, valor:", perfil);
  }

  // Aplica uma classe de estilo de acordo com o perfil

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
                <button onclick="window.location.href='../perfilAdm/consultarFuncionario/funcionario.html'">Cargo</button>
                <button onclick="window.location.href='../perfilAdm/ConsultarRestaurante/restaurantes.html'">Restaurantes</button>
                <button onclick="window.location.href='../perfilAdm/IncluirCategoria/categoria.html'">Categoria</button>
                <button onclick="window.location.href='../perfilAdm/consultarFuncionario/funcionario.html'">Funcionário</button>
                <button onclick="window.location.href='../perfilAdm/RealatorioMensal/relatorio.html'">Relatório de Produção Mensal</button>
                <button onclick="window.location.href='../perfilAdm/ConsultarRestaurante/restaurantes.html'">Referência</button>
                <button onclick="window.location.href='../perfilAdm/GerarEmail/email.html'">Gerar e-mail de produção Mensal</button>
                <button onclick="window.location.href='../perfilAdm/Parametros/parametros.html'">Parâmetros do Sistema</button>
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
                <button onclick="location.href='../perfilCozinheiro/addReceitas/addReceitas.html'">
                  <span class="icon">📋</span> Adicionar receita
                </button>
                <button onclick="location.href='../perfilCozinheiro/verReceitas/verReceitas.html'">
                  <span class="icon">📋</span> Ver receita
                </button>
                <button onclick="location.href='../perfilCozinheiro/medidas/medidas.html'">
                  <span class="icon">📏</span> Medida
                </button>
                <button onclick="location.href='../perfilCozinheiro/ingredientes/ingredientes.html'">
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
  carregarHomePorPerfil();
});
