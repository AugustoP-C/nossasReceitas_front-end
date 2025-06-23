document
  .getElementById("form-receita")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede que o formulário recarregue a página

    // Cria um objeto com os dados do formulário
    const form = event.target;
    const formData = new FormData(form);

    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
    const idUsuario = document.getElementById("categoria");
    jsonData["categoria"] = idUsuario;

    try {
      const resposta = await fetch("http://localhost:8000/receitas/adicionar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!resposta.ok) throw new Error("Erro ao salvar receita");

      const resultado = await resposta.json();
      console.log("Receita salva com sucesso:", resultado);
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  });
