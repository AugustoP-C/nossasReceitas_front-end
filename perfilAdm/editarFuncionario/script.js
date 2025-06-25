document
  .getElementById("form-funcionario")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const dados = {
      id_funcionario: document.getElementById("id_funcionario").value,
      nome: document.getElementById("nome").value,
      data: document.getElementById("data").value,
      rg: document.getElementById("rg").value,
      id_cargo: document.getElementById("id_cargo").value,
      salario: document
        .getElementById("salario")
        .value.replace(/[^0-9.,-]/g, "")
        .replace(",", "."),
      nome_fantasia: document.getElementById("nome_fantasia").value,
      email: document.getElementById("email").value,
    };

    const msgEl = document.getElementById("mensagem");
    msgEl.textContent = "Salvando...";
    msgEl.style.color = "black";

    try {
      const res = await fetch(
        "http://localhost:8000/api/funcionarios/atualizar",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        }
      );

      if (res.ok) {
        msgEl.textContent = "Funcionário criado com sucesso!";
        msgEl.style.color = "green";
      } else {
        msgEl.textContent = "Erro ao criar funcionário.";
        msgEl.style.color = "red";
      }
    } catch (err) {
      msgEl.textContent = "Erro de conexão com o servidor.";
      msgEl.style.color = "red";
    }
  });
