const cliente = [];
const fornecedor = [];
const medicamento = [];
const carrinho = [];

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

// Atualizar clientes
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

// Atualizar fornecedores
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

// Cadastrar medicamentos
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

// Atualizar medicamentos
function updateMedicamento() {
    const medicamentoList = document.getElementById("medicamento-list");
    medicamentoList.innerHTML = "";

    medicamento.forEach((medicamento, medicamentoIndex) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `Nome: ${medicamento.nome} - Estoque: ${medicamento.quantidade} 
        <button onclick="addToCarrinho(${medicamentoIndex})" class="btn btn-outline-secondary">Adicionar Carrinho</button>`;
        medicamentoList.appendChild(listItem);
    });
    
}

// Adicionar medicamento ao carrinho
function addToCarrinho(index) {
    if (index >= 0 && index < medicamento.length) {
        const selectedMedicamento = medicamento[index];
        
        // Verifica se o medicamento já está no carrinho
        const existingCarrinhoItem = carrinho.find(item => item.nome === selectedMedicamento.nome);

        if (existingCarrinhoItem) {
            // Se o medicamento já estiver, apenas incremente a quantidade
            existingCarrinhoItem.quantidade += 1;
        } else {
            // Se o medicamento não estiver, adiciona
            carrinho.push({ nome: selectedMedicamento.nome, quantidade: 1 });
        }

        updateCarrinho();
    }
}

// Remove medicamentos do carrinho
function removeFromCarrinho(index) {
    const removedMedicamento = carrinho.splice(index, 1)[0];
    const matchingMedicamento = medicamento.find(medicamento => medicamento.nome === removedMedicamento.nome);
    if (matchingMedicamento) {
        matchingMedicamento.quantidade++;
    }
    updateMedicamento();
    updateCarrinho();
}

// Atualiza o carrinho
function updateCarrinho() {
    const carrinhoList = document.getElementById("carrinho");
    carrinhoList.innerHTML = "";

    carrinho.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Nome: ${item.nome} - Quantidade: ${item.quantidade} 
        <button onclick="removeFromCarrinho(${index})" class="btn btn-outline-secondary">Excluir</button>`;
        carrinhoList.appendChild(listItem);
    });
}


// Finaliza a compra
function checkout() {
    if (carrinho.length === 0) {
        alert("Carrinho de compras vazio. Adicione itens para finalizar a compra.");
    } else {
        alert("Compra finalizada com sucesso!");
        carrinho.length = 0; // Limpa o carrinho
        updateCarrinho();
    }
}
