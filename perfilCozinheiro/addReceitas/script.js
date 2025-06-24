async function carregarIngredientes() {
  const container = document.getElementById("ingredientes-container");
  const resposta = await fetch("http://localhost:8000/ingredientes/consultar");
  const ingredientes = await resposta.json();

  // exemplo:
  // const ingredientes = [
  //   { id: 1, nome: "Arroz" },
  //   { id: 2, nome: "Feijão" },
  //   { id: 3, nome: "Frango" },
  // ];

  ingredientes.forEach((ingrediente) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "ingredientes[]";
    checkbox.value = ingrediente.id;
    checkbox.id = `ingrediente-${ingrediente.id}`;

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = ingrediente.nome;

    const quantidadeInput = document.createElement("input");
    quantidadeInput.type = "text";
    quantidadeInput.name = `quantidade_${ingrediente.id}`;
    quantidadeInput.placeholder =
      "Quantidade (ex: 200g, 100ml, 1L, 1Xicara, 2Colher)";
    quantidadeInput.style.display = "none";
    quantidadeInput.style.marginLeft = "10px";

    checkbox.addEventListener("change", () => {
      quantidadeInput.style.display = checkbox.checked
        ? "inline-block"
        : "none";
    });

    const div = document.createElement("div");
    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(quantidadeInput);

    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  carregarIngredientes();

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
        categoria: document.getElementById("categoria").value,
      };

      // Pega todos os ingredientes marcados
      const ingredientesSelecionados = formData.getAll("ingredientes[]");

      // Cria array com { id, quantidade }
      const ingredientesComQuantidade = ingredientesSelecionados.map((id) => {
        const quantidade = formData.get(`quantidade_${id}`);
        return {
          id_ingrediente: parseInt(id), // aqui envia como 'id_ingrediente'
          quantidade: quantidade || "",
        };
      });

      // Adiciona ao JSON
      jsonData.ingredientes = ingredientesComQuantidade;

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
