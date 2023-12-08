// Array para armazenar os produtos
const produtos = [
    {
        descricao: 'Maçã',
        tipo: 'Fruta',
        preco: 1.50
    },
    {
        descricao: 'Doce da Casa',
        tipo: 'Doces',
        preco: 2.00
    },
    {
        descricao: 'Frango a bras',
        tipo: 'Prato de Carne',
        preco: 5.99
    }
];

var idProduto;

//atualizarListaProdutos();

//const tiposProdutos = [];

const tiposProdutos = [
    { descricao: 'Fruta' },
    { descricao: 'Prato de Carne' },
    { descricao: 'Doces' }
];

var idTipoProduto;

//Estado das mesas se estao abertas ou fechadas
const estadoMesas = {};


function mostrarMesas() {
    window.location.href = 'mesas.html';
}

function mostrarProdutos() {
    window.location.href = 'Produtos.html';
}

function mostrarTiposProdutos() {
    window.location.href = 'TipoProdutos.html';
}

// Função para exibir o formulário de adição de produto
function mostrarFormulario() {
    document.getElementById('formTitle').textContent = 'Adicionar Produto';
    document.getElementById('productFormContainer').style.display = 'block';
}

// Função para fechar o formulário de adição de produto
function fecharFormulario() {
    document.getElementById('productFormContainer').style.display = 'none';
}

// Função para exibir o formulário de edição de produto
function mostrarEditarFormulario(index) {
    document.getElementById('editFormTitle').textContent = 'Editar Produto';
    document.getElementById('editFormContainer').style.display = 'block';
    idProduto = index;
}

// Função para fechar o formulário de edição de produto
function fecharEditarFormulario() {
    document.getElementById('editFormContainer').style.display = 'none';
}

// Função para adicionar um produto
function adicionarProduto() {
    const productDescription = document.getElementById('productDescription').value;
    const productType = document.getElementById('productType').value;
    const productPrice = document.getElementById('productPrice').value;

    // Validar entrada
    if (!productDescription || !productType || !productPrice) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const tipoProdutoExistente = tiposProdutos.find(tipo => tipo.descricao === productType);

    if (!tipoProdutoExistente) {
        alert('O tipo de produto selecionado não existe. Por favor, escolha um tipo válido.');
        return;
    }

    // Criar objeto de produto
    const novoProduto = {
        descricao: productDescription,
        tipo: productType,
        preco: parseFloat(productPrice),
    };

    // Adicionar produto ao array
    produtos.push(novoProduto);

    // Limpar campos do formulário
    document.getElementById('productDescription').value = '';
    document.getElementById('productType').value = '';
    document.getElementById('productPrice').value = '';

    // Atualizar a lista de produtos
    atualizarListaProdutos();
    fecharFormulario();
}

// Função para verificar se um tipo de produto existe
function tipoProdutoExiste(tipo) {
    return tiposProdutos.some(t => t.descricao === tipo);
}

// Função para editar um produto
function editarProduto() {
    //const selectedIndex = parseInt(document.getElementById('editProductIndex').value);
    // Obter os valores dos campos de edição
    const novaDescricao = document.getElementById('editProductDescription').value;
    const novoTipo = document.getElementById('editProductType').value;
    const novoPreco = parseFloat(document.getElementById('editProductPrice').value);

    // Validar entrada
    if (!novaDescricao || !novoTipo || isNaN(novoPreco)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Verificar se o tipo de produto existe
    if (!tipoProdutoExiste(novoTipo)) {
        alert('O tipo de produto especificado não existe.');
        return;
    }

    // Atualizar os detalhes do produto
    produtos[idProduto].descricao = novaDescricao;
    produtos[idProduto].tipo = novoTipo;
    produtos[idProduto].preco = novoPreco;

    // Atualizar a lista de produtos
    atualizarListaProdutos();

    // Fechar o formulário de edição
    fecharEditarFormulario();
}

// Função para remover um produto
function removerProduto(index) {
    produtos.splice(index, 1);
    atualizarListaProdutos();
    fecharEditarFormulario();
}

// Função para atualizar a lista de produtos na página
function atualizarListaProdutos() {
    const productList = document.getElementById('productTable').getElementsByTagName('tbody')[0];

    // Limpar a lista atual
    productList.innerHTML = '';

    // Adicionar os produtos à lista
    produtos.forEach((produto, index) => {
        const newRow = productList.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        cell1.innerHTML = produto.descricao;
        cell2.innerHTML = produto.tipo;
        cell3.innerHTML = `€ ${produto.preco.toFixed(2)}`;
        cell4.innerHTML = `<button onclick="mostrarEditarFormulario(${index})">Editar</button>
                           <button onclick="removerProduto(${index})">Remover</button>`;
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
        square.addEventListener('click', function () {
            trocarNumeroMesa(i);
            selecionarMesa(square, i);
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

// Função chamada quando a página é carregada
document.addEventListener('DOMContentLoaded', function () {
    tipoProdutos();
});

// Função para mostrar o formulário de adição de tipo de produto
function mostrarTipoProdutoFormulario() {
    document.getElementById('productTypeFormContainer').style.display = 'block';
}

// Função para fechar o formulário de adição de tipo de produto
function fecharTipoProdutoFormulario() {
    document.getElementById('productTypeFormContainer').style.display = 'none';
}

// Função para mostrar o formulário de midificação de tipo de produto
function mostrarEditarTipoProdutoFormulario(index) {
    document.getElementById('editTypeFormContainer').style.display = 'block';
    idTipoProduto = index;
}

// Função para fechar o formulário de modificação de tipo de produto
function fecharEditarTipoProdutoFormulario() {
    document.getElementById('editTypeFormContainer').style.display = 'none';
}

// Função para adicionar um novo produto
function adicionarTipoProduto() {
    const tipoProdutoDescricao = document.getElementById('productTypeDescription').value;

    // Validar entrada
    if (!tipoProdutoDescricao) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Criar objeto de tipo de produto
    const novoTipoProduto = {
        descricao: tipoProdutoDescricao,
    };

    // Adicionar tipo de produto ao array
    tiposProdutos.push(novoTipoProduto);

    // Limpar campo do formulário
    document.getElementById('productTypeDescription').value = '';

    // Atualizar a lista de tipos de produtos
    atualizarTipoProdutos();
    fecharTipoProdutoFormulario();
}

// Função para editar um produto existente
function editarTipoProduto() {
    const novaTipoProduto = document.getElementById('editTypeDescription').value;

    // Validar entrada
    if (!novaTipoProduto) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Atualizar os detalhes do produto
    tiposProdutos[idTipoProduto].descricao = novaTipoProduto;

    // Atualizar a lista de produtos
    atualizarTipoProdutos();

    // Fechar o formulário de edição
    fecharEditarTipoProdutoFormulario();
}

// Função para remover um produto existente
function removerTipoProduto(index) {
    const tipoRemovido = tiposProdutos[index].descricao;

    // Verificar se o tipo de produto está em uso por algum produto
    const tipoEmUso = produtos.some(produto => produto.tipo === tipoRemovido);

    if (tipoEmUso) {
        alert('Não é possível remover o tipo de produto porque está sendo utilizado por algum produto.');
        return;
    }

    tiposProdutos.splice(index, 1);
    atualizarTipoProdutos();
}

// Função para atualizar a lista de produtos com base no tipo selecionado
function atualizarTipoProdutos() {
    const tipoProdutoList = document.getElementById('productTypeTable').getElementsByTagName('tbody')[0];

    // Limpar a lista atual
    tipoProdutoList.innerHTML = '';

    // Adicionar os tipos de produtos à lista
    tiposProdutos.forEach((tipoProduto, index) => {
        const newRow = tipoProdutoList.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);

        cell1.innerHTML = `${index + 1}.`;
        cell2.innerHTML = tipoProduto.descricao;

        const cell3 = newRow.insertCell(2);
        cell3.innerHTML = `<button onclick="mostrarEditarTipoProdutoFormulario(${index})">Editar</button>
                           <button onclick="removerTipoProduto(${index})">Remover</button>`;
    });
}

// Chama a função de inicialização quando a página carregar
window.onload = inicializarQuadrados;


