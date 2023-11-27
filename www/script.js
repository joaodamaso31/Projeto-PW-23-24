// Array para armazenar os produtos
let produtos = [];

//Estado das mesas se estao abertas ou fechadas
const estadoMesas = {};

function mostrarMesas() {
    window.location.href = 'mesas.html';
}

function mostrarProdutos() {
    //atualizarListaProdutos();
    window.location.href = 'Produtos.html';
}

function mostrarTiposProdutos() {
    //window.location.href = 'mesas.html';
}

// Função para adicionar um produto
function adicionarProduto() {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;

    // Validar entrada
    if (!productName || !productPrice) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Criar objeto de produto
    const novoProduto = {
        nome: productName,
        preco: parseFloat(productPrice),
    };

    // Adicionar produto ao array
    produtos.push(novoProduto);

    // Limpar campos do formulário
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';

    // Atualizar a lista de produtos
    atualizarListaProdutos();
}

// Função para editar um produto
function editarProduto(index) {
    const produtoEditado = prompt('Editar nome do produto:', produtos[index].nome);
    const novoPreco = prompt('Editar preço do produto:', produtos[index].preco);

    // Validar entrada
    if (!produtoEditado || novoPreco === null) {
        alert('Edição cancelada ou campos inválidos.');
        return;
    }

    // Atualizar os detalhes do produto
    produtos[index].nome = produtoEditado;
    produtos[index].preco = parseFloat(novoPreco);

    // Atualizar a lista de produtos
    atualizarListaProdutos();
}


// Função para remover um produto
function removerProduto(index) {
    produtos.splice(index, 1);
    atualizarListaProdutos();
}

// Função para atualizar a lista de produtos na página
function atualizarListaProdutos() {
    const productList = document.getElementById('productList');

    // Limpar a lista atual
    productList.innerHTML = '';

    // Adicionar os produtos à lista
    produtos.forEach((produto, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${produto.nome} - € ${produto.preco.toFixed(2)} 
            <button onclick="removerProduto(${index})">Remover</button>
            <button onclick="editarProduto(${index})">Editar</button>`;
        productList.appendChild(listItem);
    });
}

// Função para inicializar os quadrados numerados e a especificação da mesa
function inicializarQuadrados() {
    const mesasContainer = document.getElementById('mesasContainer');
    const mesaSpecification = document.getElementById('mesaSpecification');

    for (let i = 1; i <= 20; i++) {
        const square = document.createElement('div');
        square.classList.add('table-square');
        square.textContent = i;
        
        // Adiciona um evento de clique para trocar o número da mesa e alterar a cor de fundo
        square.addEventListener('click', function() {
            trocarNumeroMesa(i);
            selecionarMesa(square);
        });

        mesasContainer.appendChild(square);
    }

    /*const mesaSpecificationText = document.createElement('p');
    mesaSpecificationText.textContent = "Mesa 1 - Consumido: R$ 50.00";
    mesaSpecification.appendChild(mesaSpecificationText);*/
}

// Função para trocar o número da mesa e selecionar a mesa
function trocarNumeroMesa(numeroMesaSelecionada) {
    const mesaNumber = document.getElementById('mesaNumber');
    mesaNumber.textContent = `Nº da Mesa: ${numeroMesaSelecionada}`;

    // Remove a classe 'selected' de todos os quadrados
    const squares = document.querySelectorAll('.table-square');
    squares.forEach(item => item.classList.remove('selected'));
}


// Função para selecionar a mesa e alterar a cor de fundo
function selecionarMesa(square, numeroMesa) {
    // Chama a função para trocar o número da mesa
    trocarNumeroMesa(numeroMesa);

    // Remove a classe 'selected' de todos os quadrados
    const squares = document.querySelectorAll('.table-square');
    squares.forEach(item => item.classList.remove('selected'));

    // Adiciona a classe 'selected' ao quadrado clicado
    square.classList.add('selected');
}

// Função para abrir a mesa e trocar a cor para verde
function abrirMesa() {
    const mesaNumber = document.getElementById('mesaNumber');
    const mesaAtual = mesaNumber.textContent;

    // Verifica se a mesa já está aberta
    const mesaAberta = estadoMesas[mesaAtual];

    if (!mesaAberta) {
        // Adiciona a classe 'aberta' à mesa
        mesaNumber.classList.add('aberta');
        // Altera o conteúdo para indicar que a mesa está aberta
        mesaNumber.textContent = `${mesaAtual} - Aberta`;

        // Troca a cor do quadrado da mesa para verde
        const square = document.querySelector('.table-square.selected');
        if (square) {
            square.style.backgroundColor = '#4CAF50'; // verde
        }

        // Atualiza o estado da mesa para aberta
        estadoMesas[mesaAtual] = true;
    } else {
        // Se a mesa já estiver aberta, exibe uma mensagem informando
        alert('Esta mesa já está aberta!');
    }
}

// Função para fechar a mesa
function fecharMesa() {
    const mesaNumber = document.getElementById('mesaNumber');
    const mesaAtual = mesaNumber.textContent;

    // Remove a classe 'aberta' da mesa
    mesaNumber.classList.remove('aberta');
    // Altera o conteúdo para indicar que a mesa está fechada
    mesaNumber.textContent = `${mesaAtual} - Fechada`;

    // Troca a cor do quadrado da mesa para vermelho
    const square = document.querySelector('.table-square.selected');
    if (square) {
        square.style.backgroundColor = '#FF0000'; // vermelho
    }

    // Atualiza o estado da mesa para fechada
    estadoMesas[mesaAtual] = false;

    setTimeout(function () {
        square.style.backgroundColor = ''; // Cor padrão (cinza claro)
        // Atualiza o estado da mesa para fechada
        estadoMesas[mesaAtual] = false;
    }, 3000);
}

// Chama a função de inicialização quando a página carregar
window.onload = inicializarQuadrados;

