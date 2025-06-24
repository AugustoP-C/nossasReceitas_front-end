document
  .getElementById("medidas")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede que o formulário recarregue a página

    // Cria um objeto com os dados do formulário
    const form = event.target;
    const formData = new FormData(form);

    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    try {
      const resposta = await fetch("http://localhost:8000/medida", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!resposta.ok) throw new Error("Erro ao adicionar medidas");

      const resultado = await resposta.json();
      console.log("Medida salva com sucesso:", resultado);
    } catch (error) {
      console.error("Erro ao adicionar:", error);
    }
  });
