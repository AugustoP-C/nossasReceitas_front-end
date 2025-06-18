// Simula um login que retorna o perfil do usuário
function obterPerfilUsuario() {
  // Isso normalmente viria de uma API ou do localStorage/cookies
  return "admin"; // Mude para "cliente" ou "visitante" para testar
}

function carregarHomePorPerfil(perfil) {
  const conteudo = document.getElementById("conteudo");
  const body = document.body;

  // Aplica uma classe de estilo de acordo com o perfil
  body.classList.add(perfil);

  // Insere conteúdo baseado no perfil
  if (perfil === "admin") {
    conteudo.innerHTML = ` 
      <h2>Painel do Administrador</h2>
      <p>Você tem acesso total ao sistema.</p>
    
    `;
  } else if (perfil === "cliente") {
    conteudo.innerHTML = `
      <h2>Área do Cliente</h2>
      <p>Bem-vindo, cliente! Veja seus pedidos e informações.</p>
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