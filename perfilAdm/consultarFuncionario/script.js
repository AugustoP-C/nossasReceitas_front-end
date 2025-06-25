function excluirFuncionario(id) {
  if (!confirm("Quer mesmo excluir esse funcionário?")) return;

  fetch("http://localhost:8000/api/funcionarios/excluir", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id_funcionario: id }), // funciona agora
})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao excluir funcionário.");
      }
      alert("Funcionário excluído com sucesso!");
      location.reload(); // recarrega a página para atualizar a tabela
    })
    .catch((error) => {
      console.error("Erro ao excluir:", error);
      alert("Erro ao excluir funcionário.");
    });
}
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("corpo-tabela");

  fetch("http://localhost:8000/funcionarios/get") // <-- URL da sua API
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar dados do servidor.");
      }
      return response.json();
    })
    .then((funcionarios) => {
      funcionarios.forEach((f) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${f.nome}</td>
          <td>${f.data_ingresso}</td>
          <td>R$ ${parseFloat(f.salario).toFixed(2).replace(".", ",")}</td>
          <td>${f.id_cargo}</td>
          <td>${f.nome_fantasia}</td>
          <td>
            <span class="material-icons icon"
                  style="color: #1976d2;"
                  title="Editar"
                  onclick="window.location.href='../editarFuncionario/editar.html?id=${
                    f.id_funcionario
                  }'">
              edit
            </span>
            <span class="material-icons icon"
                  style="color: #d32f2f;"
                  title="Excluir"
                  onclick="excluirFuncionario(${f.id_funcionario})">
              delete
            </span>
          </td>
        `;

        tbody.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar funcionários:", error);
      tbody.innerHTML = `<tr><td colspan="6">Erro ao carregar os dados.</td></tr>`;
    });
});

function abrirModal(id) {
  document.getElementById(id).style.display = "flex";
}

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}

// Novo funcionário - envio simulado
document
  .getElementById("formNovoFuncionario")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const novoFuncionario = {
      nome: document.getElementById("novo-nome").value,
      data_ingresso: document.getElementById("novo-data").value,
      salario: parseFloat(document.getElementById("novo-salario").value),
      cargo_nome: document.getElementById("novo-cargo").value,
      nome_fantasia: document.getElementById("novo-fantasia").value,
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
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao cadastrar funcionário.");
      });

    console.log("Novo funcionário:", novoFuncionario);
    fecharModal("modalNovoFuncionario");
    alert("Funcionário cadastrado com sucesso!");
  });
