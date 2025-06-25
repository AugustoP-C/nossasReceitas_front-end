function excluirFuncionario(id) {
  if (!confirm("Quer mesmo excluir esse funcionário?")) return;

  fetch(`http://localhost:8000/funcionarios/excluir?id=${id}`, {
    method: "POST",
    // NENHUM body nem headers necessários se o backend espera apenas query string
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

  fetch("http://localhost:8000/funcionarios") // <-- URL da sua API
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar dados do servidor.");
      }
      return response.json();
    })
    .then((funcionarios) => {
      tbody.innerHTML = ""; // Limpa antes de inserir
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
                  onclick="abrirModal('modalNovoFuncionario', ${
                    f.id_funcionario
                  })">
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

// Exibe o modal de edição
function abrirModal(idModal, idFuncionario = null) {
  document.getElementById(idModal).style.display = "flex";

  if (idFuncionario) {
    fetch(`http://localhost:8000/funcionarios/${idFuncionario}`)
      .then((res) => res.json())
      .then((funcionario) => {
        document.getElementById("novo-nome").value = funcionario.nome;
        document.getElementById("novo-data").value = funcionario.data_ingresso;
        document.getElementById("novo-salario").value = funcionario.salario;
        document.getElementById("novo-cargo").value = funcionario.cargo_nome;
        document.getElementById("novo-fantasia").value =
          funcionario.nome_fantasia;
        document.getElementById("id_funcionario").value =
          funcionario.id_funcionario;
      })
      .catch((err) => console.error("Erro ao preencher dados:", err));
  }
}

function fecharModal(idModal) {
  document.getElementById(idModal).style.display = "none";
}

// Submissão do formulário (cadastrar/editar)
document
  .getElementById("formNovoFuncionario")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("id_funcionario")?.value || null;

    const funcionario = {
      id_funcionario: id,
      nome: document.getElementById("novo-nome").value,
      data_ingresso: document.getElementById("novo-data").value,
      salario: parseFloat(document.getElementById("novo-salario").value),
      cargo_nome: document.getElementById("novo-cargo").value,
      nome_fantasia: document.getElementById("novo-fantasia").value,
    };

    const url = id
      ? "http://localhost:8000/api/funcionarios/atualizar"
      : "http://localhost:8000/api/funcionarios/adicionar";

    fetch(url, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(funcionario),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao salvar funcionário.");
        return response.json();
      })
      .then(() => {
        alert("Funcionário salvo com sucesso!");
        fecharModal("modalNovoFuncionario");
        location.reload();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao salvar funcionário.");
      });

    console.log("Novo funcionário:", novoFuncionario);
    fecharModal("modalNovoFuncionario");
    alert("Funcionário cadastrado com sucesso!");

    // Aqui você pode fazer um fetch POST para enviar ao backend.
  });
