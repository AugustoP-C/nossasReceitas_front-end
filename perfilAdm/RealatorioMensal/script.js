async function carregarRestaurantes() {
  const tabela = document.getElementById("tabela-restaurantes");
  tabela.innerHTML =
    '<tr><td colspan="3" class="text-center p-2 text-gray-500">Carregando...</td></tr>';

  try {
    const resposta = await fetch("http://localhost:8000/restaurantes");
    if (!resposta.ok) throw new Error("Erro ao buscar dados");

    const dados = await resposta.json();

    if (!Array.isArray(dados) || dados.length === 0) {
      tabela.innerHTML =
        '<tr><td colspan="3" class="text-center p-2 text-gray-500">Nenhum restaurante encontrado</td></tr>';
      return;
    }

    tabela.innerHTML = "";
    dados.forEach((rest) => {
      const row = document.createElement("tr");
      row.className = "bg-white";
      row.innerHTML = `
            <td class="border border-gray-300 py-1 px-2 text-left">
              <span class="text-yellow-400 text-[10px] sm:text-xs">
                ${gerarEstrelas(rest.nota)}
              </span>
            </td>
            <td class="border border-gray-300 py-1 px-2">${rest.nome}</td>
            <td class="border border-gray-300 py-1 px-2 space-x-2 text-gray-600 text-xs sm:text-sm">
              <i class="fas fa-pencil-alt cursor-pointer" title="Editar"></i>
              <i class="fas fa-info-circle cursor-pointer" title="Detalhes"></i>
              <i class="fas fa-trash-alt cursor-pointer" title="Excluir"></i>
            </td>
          `;
      tabela.appendChild(row);
    });
  } catch (error) {
    tabela.innerHTML = `<tr><td colspan="3" class="text-center text-red-500 p-2">Erro ao carregar dados: ${error.message}</td></tr>`;
  }
}

function gerarEstrelas(nota) {
  let estrelas = "";
  for (let i = 1; i <= 5; i++) {
    estrelas += `<i class="${i <= nota ? "fas" : "far"} fa-star"></i>`;
  }
  return estrelas;
}

// Iniciar carregamento assim que a página estiver pronta
document.addEventListener("DOMContentLoaded", carregarRestaurantes);
