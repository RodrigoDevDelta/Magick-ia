// Aguarda o documento HTML ser completamente carregado para executar o script.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELEÇÃO DOS ELEMENTOS DO HTML
    // Selecionamos todos os elementos com os quais vamos interagir.
    const selectCategoria = document.getElementById('categoria');
    const inputPreco = document.getElementById('preco');
    const btnFiltrar = document.querySelector('.btn-filtrar');
    const todasAsCartas = document.querySelectorAll('.carta');

    // 2. ADIÇÃO DO "ESCUTADOR DE EVENTOS"
    // Adicionamos um evento de clique ao botão "Aplicar filtros".
    // Toda vez que o botão for clicado, a função 'filtrarCartas' será executada.
    btnFiltrar.addEventListener('click', filtrarCartas);

    // 3. FUNÇÃO PRINCIPAL DE FILTRAGEM
    function filtrarCartas() {
        // Pega os valores atuais dos campos de filtro.
        // Usamos .toLowerCase() para evitar problemas com letras maiúsculas/minúsculas (ex: "Épica" vs "épica").
        const categoriaSelecionada = selectCategoria.value.toLowerCase();

        // Convertemos o valor do preço para um número. Se estiver vazio, será NaN (Not-a-Number).
        const precoMaximo = parseFloat(inputPreco.value);

        // 4. LÓGICA PARA MOSTRAR OU ESCONDER CADA CARTA
        // Passamos por cada carta, uma por uma.
        todasAsCartas.forEach(carta => {
            // Pegamos a categoria e o preço de cada carta a partir dos seus atributos 'data-*'.
            const categoriaDaCarta = carta.dataset.categoria.toLowerCase();
            const precoDaCarta = parseFloat(carta.dataset.preco);

            // Verificamos se a carta atende aos critérios do filtro.

            // Verificação da Categoria:
            // A carta passa se a categoria selecionada estiver vazia ("Selecione uma carta")
            // OU se a categoria da carta for igual à categoria selecionada.
            const categoriaValida = !categoriaSelecionada || categoriaDaCarta === categoriaSelecionada;

            // Verificação do Preço:
            // A carta passa se o campo de preço máximo não foi preenchido (resultando em NaN)
            // OU se o preço da carta for menor ou igual ao preço máximo digitado.
            const precoValido = isNaN(precoMaximo) || precoDaCarta <= precoMaximo;

            // 5. AÇÃO FINAL: MOSTRAR OU ESCONDER
            // Se a carta for válida para AMBOS os filtros, nós a exibimos.
            // Caso contrário, nós a escondemos.
            if (categoriaValida && precoValido) {
                carta.style.display = 'flex'; // 'flex' para manter o layout do CSS
            } else {
                carta.style.display = 'none'; // Esconde a carta que não corresponde
            }
        });
    }
});