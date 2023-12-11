//++++++++++++++++++++++++++++++++++++++++++++++
//---------------- CONSTANTES ----------------
//++++++++++++++++++++++++++++++++++++++++++++++

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

//const tiposProdutos = [];

const tiposProdutos = [
    { descricao: 'Fruta' },
    { descricao: 'Prato de Carne' },
    { descricao: 'Doces' }
];

//variavel para guardar id's
var idTipoProduto;

//Estado das mesas se estao abertas ou fechadas
const estadoMesas = {};

const estadoMesasArray = [];

const produtosPorMesa = {};

const totalPorMesa = {};

let totalGeral = 0;


//++++++++++++++++++++++++++++++++++++++++++++++
//-------- FUNCTIONS PARA CHAMAR HTML ----------
//++++++++++++++++++++++++++++++++++++++++++++++

function mostrarMesas() {
    window.location.href = 'mesas.html';
}

function mostrarProdutos() {
    window.location.href = 'Produtos.html';
}

function mostrarTiposProdutos() {
    window.location.href = 'TipoProdutos.html';
}




//++++++++++++++++++++++++++++++++++++++++++++++
//----------------- PRODUTOS ------------------
//++++++++++++++++++++++++++++++++++++++++++++++

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

    // Verificar se já existe um produto com a mesma descrição
    const produtoExistente = produtos.find(produto => produto.descricao === productDescription);

    if (produtoExistente) {
        alert('Já existe um produto com essa descrição. Por favor, escolha uma descrição única.');
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

    // Verificar se a nova descrição já existe
    const descricaoExistente = produtos.find(produto => produto.descricao === novaDescricao && produtos.indexOf(produto) !== idProduto);

    if (descricaoExistente) {
        alert('Já existe um produto com essa descrição. Por favor, escolha uma descrição única.');
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
    while (productList.firstChild) {
        productList.removeChild(productList.firstChild);
    }

    // Adicionar os produtos à lista
    produtos.forEach((produto, index) => {
        const newRow = productList.insertRow();

        // Célula 1: Descrição
        const cell1 = newRow.insertCell(0);
        const descricaoText = document.createTextNode(produto.descricao);
        cell1.appendChild(descricaoText);

        // Célula 2: Tipo
        const cell2 = newRow.insertCell(1);
        const tipoText = document.createTextNode(produto.tipo);
        cell2.appendChild(tipoText);

        // Célula 3: Preço
        const cell3 = newRow.insertCell(2);
        const precoText = document.createTextNode(`€ ${produto.preco.toFixed(2)}`);
        cell3.appendChild(precoText);

        // Célula 4: Botões de Ação
        const cell4 = newRow.insertCell(3);
        const editarButton = document.createElement('button');
        editarButton.textContent = 'Editar';
        editarButton.onclick = function () {
            mostrarEditarFormulario(index);
        };
        cell4.appendChild(editarButton);

        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.onclick = function () {
            removerProduto(index);
        };
        cell4.appendChild(removerButton);
    });
}





//++++++++++++++++++++++++++++++++++++++++++++++
//------------------- MESAS ------------------
//++++++++++++++++++++++++++++++++++++++++++++++

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
            exibirProdutosConsumidos(i);
        });

        mesasContainer.appendChild(square);

        // Inicializa a lista de produtos para cada mesa
        produtosPorMesa[`Mesa ${i}`] = [];
    }
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
    const numeroMesa = parseInt(mesaNumber.textContent.replace('Nº da Mesa: ', ''));

    if (!isNaN(numeroMesa)) {
        const mesaAtual = `Mesa ${numeroMesa}`;
        const mesaAberta = estadoMesas[mesaAtual];

        if (!mesaAberta) {
            mesaNumber.classList.add('aberta');
            mesaNumber.textContent = `${mesaAtual} - Aberta`;

            const square = document.querySelector('.table-square.selected');
            if (square) {
                square.style.backgroundColor = '#4CAF50'; // verde
            }

            estadoMesas[mesaAtual] = true;

            // Adicione ao estadoMesasTest apenas se não estiver já presente
            const mesaTestIndex = estadoMesasArray.findIndex(item => item.mesa === mesaAtual);
            if (mesaTestIndex === -1) {
                estadoMesasArray.push({
                    mesa: mesaAtual,
                    tf: 'true',
                    produtosPorMesa: []
                });
            }
        } else {
            alert('Esta mesa já está aberta!');
        }
    } else {
        alert('Selecione uma mesa antes de abrir!');
    }
}


// Função para fechar a mesa
function fecharMesa() {
    const mesaNumber = document.getElementById('mesaNumber');
    const numeroMesa = parseInt(mesaNumber.textContent.replace('Nº da Mesa: ', ''));

    if (!isNaN(numeroMesa)) {
        const mesaAtual = `Mesa ${numeroMesa}`;
        const mesaAberta = estadoMesas[mesaAtual];

        if (mesaAberta) {
            mesaNumber.classList.remove('aberta');
            mesaNumber.textContent = `${mesaAtual} - Fechada`;

            const square = document.querySelector('.table-square.selected');
            if (square) {
                square.style.backgroundColor = '#FF0000'; // vermelho
            }

            estadoMesas[mesaAtual] = false;

            // Remova do estadoMesasTest se estiver presente
            const mesaTestIndex = estadoMesasArray.findIndex(item => item.mesa === mesaAtual);
            if (mesaTestIndex !== -1) {
                estadoMesasArray[mesaTestIndex].produtosPorMesa = estadoMesas[mesaAtual].produtosPorMesa;
                estadoMesasArray.splice(mesaTestIndex, 1);
            }

            // Restaura a cor normal após 10 segundos
            setTimeout(() => {
                square.style.backgroundColor = ''; // Cor padrão (cinza claro)
                estadoMesas[mesaAtual] = false;
            }, 3000);

            produtosPorMesa[mesaAtual] = [];

            // Limpar a tabela atual
            const tableBody = document.getElementById('consumedItemsTable').getElementsByTagName('tbody')[0];

            // Limpar a tabela atual
            while (tableBody.firstChild) {
                tableBody.removeChild(tableBody.firstChild);
            }

            // Imprimir a fatura
            imprimirFatura();

            //O total da mesa passar a 0
            totalPorMesa[mesaAtual] = 0;

            // Atualizar o total no HTML
            const totalAmountElement = document.getElementById('totalAmount');
            totalAmountElement.textContent = `Total: € 0.00`;
        } else {
            alert('Esta mesa não está aberta para fechar!');
        }
    } else {
        alert('Selecione uma mesa antes de fechar!');
    }
}

// Função para imprimir a fatura
function imprimirFatura() {
    const mesaNumber = document.getElementById('mesaNumber').textContent;
    const totalAmount = document.getElementById('totalAmount').textContent;

    alert(`Fatura para ${mesaNumber}\n${totalAmount}`);
}

function mostrarMesasProdutoFormulario() {
    document.getElementById('productMesasFormContainer').style.display = 'block';
}

// Função para fechar o formulário de adição de tipo de produto
function fecharMesasProdutoFormulario() {
    document.getElementById('productMesasFormContainer').style.display = 'none';
}


// Função para exibir os produtos consumidos da mesa selecionada
function exibirProdutosConsumidos(numeroMesa) {
    const table = document.getElementById('consumedItemsTable').getElementsByTagName('tbody')[0];

    const mesaString = `Mesa ${numeroMesa}`;

    const produtosDaMesa = produtosPorMesa[mesaString] || [];

    console.log(produtosDaMesa);

    // Limpar a tabela atual
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    // Adicionar os produtos à tabela
    produtosDaMesa.forEach(produto => {
        const newRow = table.insertRow();

        const cell1 = newRow.insertCell(0);
        cell1.textContent = produto.descricao;

        const cell2 = newRow.insertCell(1);
        cell2.textContent = produto.quantidade;

        const cell3 = newRow.insertCell(2);
        const total = produto.quantidade * produto.preco;
        cell3.textContent = `€ ${total.toFixed(2)}`;

        const cell4 = newRow.insertCell(3);
        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', () => removerProdutoMesa(numeroMesa, produto));
        cell4.appendChild(removerButton);
    });
}

// Função para remover um produto de uma mesa específica
function removerProdutoMesa(numeroMesa, produto) {
    const mesaString = `Mesa ${numeroMesa}`;
    const produtosDaMesa = produtosPorMesa[mesaString] || [];

    // Encontrar o índice do produto dentro do array
    const index = produtosDaMesa.findIndex(p => p === produto);

    // Verificar se o produto está presente
    if (index !== -1) {
        // Remover o produto do array da mesa
        const produtoRemovido = produtosDaMesa.splice(index, 1)[0]; // Obtenha o produto removido

        // Atualizar a lista e a tabela
        produtosPorMesa[mesaString] = produtosDaMesa;
        exibirProdutosConsumidos(numeroMesa);

        // Remover o preço do produto do total da mesa
        const totalMesa = totalPorMesa[mesaString] || 0;
        const precoProdutoRemovido = produtoRemovido.quantidade * produtoRemovido.preco;
        totalPorMesa[mesaString] = totalMesa - precoProdutoRemovido;

        // Atualizar o total no HTML
        const totalAmountElement = document.getElementById('totalAmount');
        totalAmountElement.textContent = `Total: € ${totalPorMesa[mesaString].toFixed(2)}`;
    } else {
        alert('Produto não encontrado para remover.');
    }
}

function editarProdutosConsumidos() {
    const productDescription = document.getElementById('productMesasDescription').value;
    const quantidade = document.getElementById('quantidadeMesasDescription').value;
    const mesaNumber = document.getElementById('mesaNumber').textContent;

    const numeroMesa = parseInt(mesaNumber.replace('Nº da Mesa: ', ''));

    // Verificar se uma mesa está selecionada
    if (isNaN(numeroMesa)) {
        alert('Selecione uma mesa antes de adicionar produtos consumidos.');
        return;
    }

    // Verificar se a mesa está aberta no estadoMesasArray
    const mesaAberta = estadoMesasArray.find(item => item.mesa === `Mesa ${numeroMesa}` && item.tf === 'true');

    if (mesaAberta) {
        const produtoEncontrado = produtos.find(produto => produto.descricao === productDescription);

        if (produtoEncontrado) {
            // Adicionar o produto consumido à lista da mesa
            if (!produtosPorMesa[`Mesa ${mesaNumber}`]) {
                //produtosPorMesa[`Mesa ${mesaNumber}`] = [];
            }

            const mesaAtualProdutos = produtosPorMesa[`Mesa ${numeroMesa}`];
            mesaAtualProdutos.push({
                descricao: produtoEncontrado.descricao,
                quantidade: parseInt(quantidade),
                preco: produtoEncontrado.preco,
            });

            const table = document.getElementById('consumedItemsTable').getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();

            const cell1 = newRow.insertCell(0);
            cell1.textContent = productDescription;

            const cell2 = newRow.insertCell(1);
            cell2.textContent = quantidade;

            const cell3 = newRow.insertCell(2);
            const precoProduto = produtoEncontrado.preco;
            const total = quantidade * precoProduto;

            const totalTudo = total;
            totalGeral += totalTudo;

            cell3.textContent = `€ ${total.toFixed(2)}`;

            document.getElementById('productMesasDescription').value = '';
            document.getElementById('quantidadeMesasDescription').value = '';

            if (!totalPorMesa[`Mesa ${numeroMesa}`]) {
                totalPorMesa[`Mesa ${numeroMesa}`] = 0;
            }

            //const totalTudo = total;
            totalPorMesa[`Mesa ${numeroMesa}`] += totalTudo;

            const totalAmountElement = document.getElementById('totalAmount');
            totalAmountElement.textContent = `Total: € ${totalPorMesa[`Mesa ${numeroMesa}`].toFixed(2)}`;

            // Exibir os produtos consumidos atualizados
            exibirProdutosConsumidos(numeroMesa);

            //atualizarTotalProdutosMesas();
            fecharMesasProdutoFormulario();

            // Atualizar totalGeral para a mesa específica
            totalGeral = totalPorMesa[`Mesa ${numeroMesa}`];
        } else {
            alert('Produto não encontrado na tabela de produtos.');
        }
    } else {
        alert('A mesa não está aberta. Abra a mesa antes de adicionar produtos consumidos.');
    }
}

// Função chamada quando a página é carregada
document.addEventListener('DOMContentLoaded', function () {
    atualizarTipoProdutos();
    tipoProdutos();
    inicializarQuadrados();
});






//++++++++++++++++++++++++++++++++++++++++++++++
//-------------- TIPO DE PRODUTOS --------------
//++++++++++++++++++++++++++++++++++++++++++++++

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
    while (tipoProdutoList.firstChild) {
        tipoProdutoList.removeChild(tipoProdutoList.firstChild);
    }

    // Adicionar os tipos de produtos à lista
    tiposProdutos.forEach((tipoProduto, index) => {
        const newRow = tipoProdutoList.insertRow();

        // Célula 1: Número
        const cell1 = newRow.insertCell(0);
        const numeroText = document.createTextNode(`${index + 1}.`);
        cell1.appendChild(numeroText);

        // Célula 2: Descrição
        const cell2 = newRow.insertCell(1);
        const descricaoText = document.createTextNode(tipoProduto.descricao);
        cell2.appendChild(descricaoText);

        // Célula 3: Botões de Ação
        const cell3 = newRow.insertCell(2);

        const editarButton = document.createElement('button');
        editarButton.textContent = 'Editar';
        editarButton.onclick = function () {
            mostrarEditarTipoProdutoFormulario(index);
        };
        cell3.appendChild(editarButton);

        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.onclick = function () {
            removerTipoProduto(index);
        };
        cell3.appendChild(removerButton);
    });
}

// Chama a função de inicialização quando a página carregar
window.onload = inicializarQuadrados;

atualizarListaProdutos();

