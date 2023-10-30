// Variáveis para armazenar dados
const cliente = [];
const fornecedor = [];
const medicamento = [];
const cart = [];

// Exibir a guia
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    const selectedTab = document.getElementById(`${tabName}-tab`);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
}

// Cadastrar clientes 
function addCliente() {
    const clienteNome = document.getElementById("cliente-name").value;
    const clienteEndereco = document.getElementById("cliente-endereco").value;
    const clienteCidade = document.getElementById("cliente-cidade").value;
    const clienteEstado = document.getElementById("cliente-estado").value;

    if (clienteNome && clienteEndereco && clienteCidade && clienteEstado) {
        cliente.push({ name: clienteNome, endereco: clienteEndereco, cidade: clienteCidade, estado: clienteEstado });
        updateCliente();
    } else {
        alert("Por favor, preencha os campos corretamente.");
    }
}

// Atualizar a lista de clientes
function updateCliente() {
    const clienteList = document.getElementById("cliente-list");
    clienteList.innerHTML = "";

    cliente.forEach(cliente => {
        const listItem = document.createElement("li");
        listItem.textContent = `Nome: ${cliente.name},
        Endereço: ${cliente.endereco},
        Cidade: ${cliente.Cidade},
        Estado: ${cliente.estado}`;
        clienteList.appendChild(listItem);
    });
}


// Cadastrar fornecedores
function addFornecedor() {
    const fornecedorNome = document.getElementById("fornecedor-nome").value;
    const fornecedorContato = document.getElementById("fornecedor-contato").value;
    const fornecedorCidade = document.getElementById("fornecedor-cidade").value;
    const fornecedorEstado = document.getElementById("fornecedor-estado").value;    

    if (fornecedorNome && fornecedorContato && fornecedorCidade && fornecedorEstado) {
        fornecedor.push({ nome: fornecedorNome, contato: fornecedorContato, cidade: fornecedorCidade, estado: fornecedorEstado });
        updateFornecedor();
    } else {
        alert("Por favor, preencha os campos corretamente.");
    }
}

// Função para atualizar a lista de fornecedores
function updateFornecedor() {
    const fornecedorList = document.getElementById("fornecedor-list");
    fornecedorList.innerHTML = "";

    fornecedor.forEach(fornecedor => {
        const listItem = document.createElement("li");
        listItem.textContent = `Nome: ${fornecedor.nome}, 
        Contato: ${fornecedor.contato}
        Cidade: ${fornecedor.cidade}
        Estado: ${fornecedor.estado}`;
        fornecedorList.appendChild(listItem);
    });
}

// Função para cadastrar medicamentos
function addMedicamento() {
    const nome = document.getElementById("medicamento-nome").value;
    const quantidade = parseInt(document.getElementById("medicamento-quantidade").value);

    if (nome && quantidade > 0) {
        medicamento.push({ nome, quantidade });
        updateMedicamento();
    } else {
        alert("Por favor, preencha os campos corretamente.");
    }
}

// Função para atualizar a lista de medicamentos
function updateMedicamento() {
    const medicamentoList = document.getElementById("medicamento-list");
    medicamentoList.innerHTML = "";

    medicamento.forEach(medicamento => {
        const listItem = document.createElement("li");
        listItem.textContent = `Nome: ${medicamento.nome} - Estoque: ${medicamento.quantidade}`;
        medicamentoList.appendChild(listItem);
    });
}

// Função para adicionar medicamento ao carrinho
function addToCart(index) {
    if (index >= 0 && index < medications.length) {
        const selectedMedication = medications[index];
        
        // Verifique se o medicamento já está no carrinho
        const existingCartItem = cart.find(item => item.name === selectedMedication.name);

        if (existingCartItem) {
            // Se o medicamento já estiver no carrinho, apenas incremente a quantidade
            existingCartItem.quantity += 1;
        } else {
            // Se o medicamento não estiver no carrinho, adicione-o
            cart.push({ name: selectedMedication.name, quantity: 1 });
        }

        updateCart();
    }
}

// Função para remover medicamento do carrinho (mesma lógica do exemplo anterior)
function removeFromCart(index) {
    // ...
}

// Função para atualizar o carrinho de compras (mesma lógica do exemplo anterior)
function updateCart() {
    // ...
}

// Função para finalizar a compra (mesma lógica do exemplo anterior)
function checkout() {
    // ...
}
