document
  .getElementById("formCategoria")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const descricao = document.getElementById("descricao").value.trim();
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Salvando...";
    mensagem.className = "text-center mt-4 text-base text-gray-600";

    try {
      const resposta = await fetch("http://localhost:3000/api/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ descricao }),
      });

      if (resposta.ok) {
        mensagem.textContent = "Categoria salva com sucesso!";
        mensagem.className = "text-center mt-4 text-green-600 font-semibold";
        document.getElementById("formCategoria").reset();
      } else {
        const erro = await resposta.json();
        mensagem.textContent = erro.message || "Erro ao salvar categoria.";
        mensagem.className = "text-center mt-4 text-red-600 font-semibold";
      }
    } catch (err) {
      mensagem.textContent = "Erro de conexão com o servidor.";
      mensagem.className = "text-center mt-4 text-red-600 font-semibold";
    }
  });
