let listaIngredientes = [];

async function carregarIngredientes() {
  const select = document.getElementById("ingrediente-select");
  const resposta = await fetch("http://localhost:8000/ingredientes/consultar");
  const ingredientes = await resposta.json();

  ingredientes.forEach((ingrediente) => {
    const option = document.createElement("option");
    option.value = ingrediente.id_ingrediente;
    option.textContent = ingrediente.nome;
    select.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  carregarIngredientes();

  document
    .getElementById("adicionar-ingrediente")
    .addEventListener("click", () => {
      const select = document.getElementById("ingrediente-select");
      const id = select.value;
      const nome = select.options[select.selectedIndex].text;
      const quantidade = document
        .getElementById("ingrediente-quantidade")
        .value.trim();

      if (!id || !quantidade) {
        alert("Selecione um ingrediente e informe a quantidade.");
        return;
      }

      // Evita duplicata
      const jaExiste = listaIngredientes.some(
        (item) => item.id_ingrediente === parseInt(id)
      );
      if (jaExiste) {
        alert("Ingrediente já adicionado.");
        return;
      }

      listaIngredientes.push({
        id_ingrediente: parseInt(id),
        quantidade,
      });

      const container = document.getElementById("ingredientes-adicionados");
      const div = document.createElement("div");
      div.textContent = `${nome} - ${quantidade}`;
      container.appendChild(div);

      document.getElementById("ingrediente-quantidade").value = "";
    });

  document
    .getElementById("form-receita")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      const jsonData = {
        nome: formData.get("nome"),
        modo_preparo: formData.get("modo_preparo"),
        id_conzinheiro: sessionStorage.getItem("id_cozinheiro"),
        categoria: formData.get("categoria"),
        ingredientes: listaIngredientes,
      };

      console.log("Enviando JSON:", jsonData);

      try {
        const resposta = await fetch(
          "http://localhost:8000/receitas/adicionar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          }
        );

        if (!resposta.ok) throw new Error("Erro ao salvar receita");

        const resultado = await resposta.json();
        console.log("Receita salva com sucesso:", resultado);
        alert("Receita salva com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar:", error);
        alert("Erro ao salvar receita.");
      }
    });
});
