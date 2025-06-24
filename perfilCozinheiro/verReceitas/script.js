async function buscarReceitas() {
  const resposta = await fetch("http://localhost:3000/receitas");
  const receitas = await resposta.json();

  // Simulando resposta de uma API
  // const receitas = [
  //   {
  //     id_receita: 1,
  //     nome: "Sopa de Abóbora",
  //     modo_preparo: "Cozinhe e bata no liquidificador",
  //     ingredientes: "1 abobora e 1ch sopa",
  //   },
  //   {
  //     id_receita: 4,
  //     nome: "Bolo de Cenoura com Cobertura de Chocolate",
  //     modo_preparo: "Misture todos os ingredientes, asse por 40 minutos",
  //     ingredientes: "3 cenoras e 1 chocolate",
  //   },
  // ];

  const lista = document.getElementById("lista-receitas");

  receitas.forEach((receita) => {
    const item = document.createElement("li");
    item.textContent = receita.nome;
    item.style.cursor = "pointer";
    item.addEventListener("click", () => exibirDetalhes(receita));
    lista.appendChild(item);
  });
}

function exibirDetalhes(receita) {
  document.getElementById("dialogTitulo").textContent = receita.nome;
  document.getElementById("dialogModo").textContent = receita.modo_preparo;
  document.getElementById("dialogIngredientes").textContent =
    receita.ingredientes;
  document.getElementById("detalhesDialog").showModal();
}

// Executa após carregar HTML
document.addEventListener("DOMContentLoaded", buscarReceitas);
