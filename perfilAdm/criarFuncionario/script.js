document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("form-funcionario")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const novoFuncionario = {
        nome: document.getElementById("nome").value,
        data_ingresso: document.getElementById("data").value,
        salario: parseFloat(document.getElementById("salario").value),
        id_cargo: parseInt(document.getElementById("id_cargo").value),
        nome_fantasia: document.getElementById("nome_fantasia").value,
      };

      fetch("http://localhost:8000/funcionarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoFuncionario),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao cadastrar funcionário");
          }
          return response.json();
        })
        .then((data) => {
          alert(data.message || "Funcionário cadastrado com sucesso!");

        })
        .catch((error) => {
          console.error("Erro:", error);
          alert("Erro ao cadastrar funcionário.");
        });

      console.log("Novo funcionário:", novoFuncionario);
    });
});
