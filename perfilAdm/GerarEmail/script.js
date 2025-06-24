async function carregarTabela() {
  const tabela = document.getElementById("corpo-tabela");
  tabela.innerHTML =
    '<tr><td colspan="5" class="text-center p-2 text-gray-500">Carregando...</td></tr>';

  try {
    const resposta = await fetch("http://localhost:3000/api/cozinheiros"); // Altere essa URL para a real
    if (!resposta.ok) throw new Error("Erro na requisição");

    const dados = await resposta.json();
    if (!Array.isArray(dados) || dados.length === 0) {
      tabela.innerHTML =
        '<tr><td colspan="5" class="text-center p-2 text-gray-500">Nenhum dado encontrado</td></tr>';
      return;
    }

    tabela.innerHTML = "";

    dados.forEach((item) => {
      const tr = document.createElement("tr");
      tr.className = "bg-white";

      tr.innerHTML = `
            <td class="border border-gray-300 px-3 py-1 text-sm">${
              item.nome
            }</td>
            <td class="border border-gray-300 px-3 py-1 text-center text-sm">${
              item.prontas
            }</td>
            <td class="border border-gray-300 px-3 py-1 text-center text-sm">${
              item.afazer
            }</td>
            <td class="border border-gray-300 px-3 py-1 text-center text-sm">${
              item.meta
            }</td>
            <td class="border border-gray-300 px-3 py-1 text-center text-sm space-x-1">
              <i class="fas fa-pencil-alt cursor-pointer"></i>
              <i class="fas fa-info-circle cursor-pointer"></i>
              <i class="fas fa-trash cursor-pointer"></i>
              ${
                item.checkbox !== false
                  ? `<input type="checkbox" ${
                      item.checkbox ? "checked" : ""
                    } class="inline-block align-middle" />`
                  : `<i class="far fa-square"></i>`
              }
            </td>
          `;

      tabela.appendChild(tr);
    });
  } catch (err) {
    tabela.innerHTML = `<tr><td colspan="5" class="text-center text-red-500 p-2">Erro ao carregar dados: ${err.message}</td></tr>`;
  }
}

document.addEventListener("DOMContentLoaded", carregarTabela);
