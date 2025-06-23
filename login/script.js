function toggleSenha() {
  const input = document.getElementById("senha");
  input.type = input.type === "password" ? "text" : "password";
}

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const erro = urlParams.get("erro");
  const erroDiv = document.getElementById("erro-msg");

  if (erro) {
    let mensagem = "";
    switch (erro) {
      case "credenciais_invalidas":
        mensagem = "E-mail ou senha inválidos.";
        break;
      case "campos_vazios":
        mensagem = "Preencha todos os campos.";
        break;
      case "cargo_invalido":
        mensagem = "Seu cargo não tem acesso.";
        break;
      case "nao_autenticado":
        mensagem = "Faça login para continuar.";
        break;
      case "sem_permissao":
        mensagem = "Você não tem permissão para acessar essa página.";
        break;
      default:
        mensagem = "Erro desconhecido.";
    }
    erroDiv.textContent = mensagem;
  }
});

// Lógica de login via fetch (ajuste a URL para seu backend)
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = this.email.value;
    const senha = this.senha.value;

    sessionStorage.setItem("email", email);
    sessionStorage.setItem("senha", senha);

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Login realizado com sucesso!");
        window.location.href = "../home/home.html";
      } else {
        document.getElementById("erro-msg").textContent =
          data.mensagem || "Erro ao fazer login.";
      }
    } catch (err) {
      document.getElementById("erro-msg").textContent =
        "Erro de conexão com o servidor.";
      console.error(err);
    }
  });
