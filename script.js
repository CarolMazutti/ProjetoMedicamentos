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

// Cadastra clientes 
function addCliente() {
    const clienteNome = document.getElementById("cliente-nome").value;
    const clienteEndereco = document.getElementById("cliente-endereco").value;
    const clienteCidade = document.getElementById("cliente-cidade").value;
    const clienteEstado = document.getElementById("cliente-estado").value;

    if (clienteNome && clienteEndereco && clienteCidade && clienteEstado) {
        cliente.push({ name: clienteNome, endereco: clienteEndereco, cidade: clienteCidade, estado: clienteEstado });
        updateCliente(cliente[cliente.length - 1]); // Passa o novo cliente para a função de atualização
        prencherClienteDropdown() //Atualiza o dropdown de clientes no carrinho
        limpaCampos("cliente-form"); // Limpa os campos do fomulário
    } else {
        alert("Por favor, preencha os campos corretamente.");
    }

    updateClienteList();
}

// Atualiza clientes
function updateCliente(cliente, index) {
    const clienteList = document.getElementById("cliente-list");

    const row = document.createElement("tr");

    const nomeCli = document.createElement("td");
    nomeCli.textContent = cliente.name;

    const enderecoCli = document.createElement("td");
    enderecoCli.textContent = cliente.endereco;

    const cidadeCli = document.createElement("td");
    cidadeCli.textContent = cliente.cidade;

    const estadoCli = document.createElement("td");
    estadoCli.textContent = cliente.estado;

    const acoesCli = document.createElement("td");
    
    // Botão "Editar"
    const editarButton = document.createElement("button");
    editarButton.textContent = "Editar";
    editarButton.className = "btn btn-outline-secondary";
    editarButton.addEventListener("click", () => editarCliente(index));

    // Botão "Excluir"
    const excluirButton = document.createElement("button");
    excluirButton.textContent = "Excluir";
    excluirButton.className = "btn btn-outline-secondary";
    excluirButton.addEventListener("click", () => excluirCliente(index));

    acoesCli.appendChild(editarButton);
    acoesCli.appendChild(excluirButton);

    row.appendChild(nomeCli);
    row.appendChild(enderecoCli);
    row.appendChild(cidadeCli);
    row.appendChild(estadoCli);
    row.appendChild(acoesCli);

    clienteList.appendChild(row);
}

function updateClienteList() {
    const clienteList = document.getElementById("cliente-list");
    clienteList.innerHTML = ""; // Limpa a lista atual

    cliente.forEach((c, index) => {
        const row = document.createElement("tr");

        const nomeCli = document.createElement("td");
        nomeCli.textContent = c.name;

        const enderecoCli = document.createElement("td");
        enderecoCli.textContent = c.endereco;

        const cidadeCli = document.createElement("td");
        cidadeCli.textContent = c.cidade;

        const estadoCli = document.createElement("td");
        estadoCli.textContent = c.estado;

        const acoesCli = document.createElement("td");

        const editarButton = document.createElement("button");
        editarButton.textContent = "Editar";
        editarButton.className = "btn btn-outline-secondary";
        editarButton.addEventListener("click", () => editarCliente(index));

        const excluirButton = document.createElement("button");
        excluirButton.textContent = "Excluir";
        excluirButton.className = "btn btn-outline-secondary";
        excluirButton.addEventListener("click", () => excluirCliente(index));

        acoesCli.appendChild(editarButton);
        acoesCli.appendChild(excluirButton);

        row.appendChild(nomeCli);
        row.appendChild(enderecoCli);
        row.appendChild(cidadeCli);
        row.appendChild(estadoCli);
        row.appendChild(acoesCli);

        clienteList.appendChild(row);
    });
}

// Editar cliente
function editarCliente(index) {
    const clienteEdit = cliente[index];

    // Preencha os campos do formulário com os dados do cliente a ser editado
    document.getElementById("cliente-nome").value = clienteEdit.name;
    document.getElementById("cliente-endereco").value = clienteEdit.endereco;
    document.getElementById("cliente-cidade").value = clienteEdit.cidade;
    document.getElementById("cliente-estado").value = clienteEdit.estado;

    // Após editar, remova o cliente da lista
    cliente.splice(index, 1);

    // Atualiza a lista de clientes
    updateClienteList(); // Alterei a chamada dessa função

    // Atualiza o menu dropdown no carrinho após excluir um cliente
    prencherClienteDropdown();
}

// Excluir cliente
function excluirCliente(index) {
    // Remove o cliente da lista
    cliente.splice(index, 1);

    // Atualiza a lista de clientes
    updateClienteList(); // Alterei a chamada dessa função

    // Atualiza o menu dropdown no carrinho após excluir um cliente
    prencherClienteDropdown();
}


function updateClientesSelect() {
    const clienteSelect = document.getElementById("cliente-select");
    clienteSelect.innerHTML = "<option value='0'>Selecione um cliente</option>";

    cliente.forEach((c, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = c.name;
        clienteSelect.appendChild(option);
    });
}

// Cadastra fornecedores
function addFornecedor() {
    const fornecedorNome = document.getElementById("fornecedor-nome").value;
    const fornecedorContato = document.getElementById("fornecedor-contato").value;
    const fornecedorCidade = document.getElementById("fornecedor-cidade").value;
    const fornecedorEstado = document.getElementById("fornecedor-estado").value;    

    if (fornecedorNome && fornecedorContato && fornecedorCidade && fornecedorEstado) {
        fornecedor.push({ nome: fornecedorNome, contato: fornecedorContato, cidade: fornecedorCidade, estado: fornecedorEstado });
        updateFornecedor(fornecedor[fornecedor.length - 1]);
        limpaCampos("fornecedor-form"); // Limpa os campos do fomulário
    } else {
        alert("Por favor, preencha os campos corretamente.");
    }
    updateFornecedorDropdown();
}

// Atualiza fornecedores
function updateFornecedor(fornecedor) {
    const fornecedorList = document.getElementById("fornecedor-list");

    const row = document.createElement("tr");

    const nomeforn = document.createElement("td");
    nomeforn.textContent = fornecedor.nome;

    const contatoforn = document.createElement("td");
    contatoforn.textContent = fornecedor.contato;

    const cidadeforn = document.createElement("td");
    cidadeforn.textContent = fornecedor.cidade;

    const estadoforn = document.createElement("td");
    estadoforn.textContent = fornecedor.estado;

    row.appendChild(nomeforn);
    row.appendChild(contatoforn);
    row.appendChild(cidadeforn);
    row.appendChild(estadoforn);

    fornecedorList.appendChild(row);

    // Atualize o dropdown de fornecedores no cad de medic
    const fornecedorDropdown = document.getElementById("fornecedor-dropdown");
    const option = document.createElement("option");
    option.value = fornecedor.nome;
    option.textContent = fornecedor.nome;
    fornecedorDropdown.appendChild(option);

    // Atualize o dropdown de fornecedores no cadastro de medicamentos
    updateFornecedorDropdown();

    updateFornecedorList();

}

function updateFornecedorDropdown() {
    const fornecedorDropdown = document.getElementById("fornecedor-dropdown");
    fornecedorDropdown.innerHTML = "<option value='0'>Selecione um fornecedor</option>"; // Limpa o menu dropdown

    fornecedor.forEach((f, index) => {
        const option = document.createElement("option");
        option.value = f.nome;
        option.textContent = f.nome;
        fornecedorDropdown.appendChild(option);
    });
    
}

function updateFornecedorList() {
    const fornecedorList = document.getElementById("fornecedor-list");
    fornecedorList.innerHTML = ""; // Limpa a lista atual

    const fornecedorDropdown = document.getElementById("fornecedor-dropdown");
    fornecedorDropdown.innerHTML = "<option value='0'>Selecione um fornecedor</option>"; // Limpa o menu dropdown

    fornecedor.forEach((f, index) => {
        const row = document.createElement("tr");

        const nomeForn = document.createElement("td");
        nomeForn.textContent = f.nome;

        const contatoForn = document.createElement("td");
        contatoForn.textContent = f.contato;

        const cidadeForn = document.createElement("td");
        cidadeForn.textContent = f.cidade;

        const estadoForn = document.createElement("td");
        estadoForn.textContent = f.estado;

        const acoesForn = document.createElement("td");

        // Botão "Editar"
        const editarButton = document.createElement("button");
        editarButton.textContent = "Editar";
        editarButton.className = "btn btn-outline-secondary";
        editarButton.addEventListener("click", () => editarFornecedor(index));

        // Botão "Excluir"
        const excluirButton = document.createElement("button");
        excluirButton.textContent = "Excluir";
        excluirButton.className = "btn btn-outline-secondary";
        excluirButton.addEventListener("click", () => excluirFornecedor(index));

        acoesForn.appendChild(editarButton);
        acoesForn.appendChild(excluirButton);

        row.appendChild(nomeForn);
        row.appendChild(contatoForn);
        row.appendChild(cidadeForn);
        row.appendChild(estadoForn);
        row.appendChild(acoesForn);

        fornecedorList.appendChild(row);
    });
}

// Editar fornecedor
function editarFornecedor(index) {
    const fornecedorEdit = fornecedor[index];

    // Preencha os campos do formulário com os dados do fornecedor a ser editado
    document.getElementById("fornecedor-nome").value = fornecedorEdit.nome;
    document.getElementById("fornecedor-contato").value = fornecedorEdit.contato;
    document.getElementById("fornecedor-cidade").value = fornecedorEdit.cidade;
    document.getElementById("fornecedor-estado").value = fornecedorEdit.estado;

    // Após editar, remova o fornecedor da lista
    fornecedor.splice(index, 1);

    // Atualize a lista de fornecedores
    updateFornecedorList();

    updateFornecedorDropdown();

}

// Excluir fornecedor
function excluirFornecedor(index) {
    // Remove o fornecedor da lista
    fornecedor.splice(index, 1);

    // Atualize a lista de fornecedores
    updateFornecedorList();

    // Atualize o menu dropdown no formulário de cadastro de medicamentos
    updateFornecedorDropdown();
}

// Cadastra medicamentos
function addMedicamento() {
    const nome = document.getElementById("medicamento-nome").value;
    const quantidade = parseInt(document.getElementById("medicamento-quantidade").value);
    const fornecedorDropdown = document.getElementById("fornecedor-dropdown");
    const fornecedorSelecionado = fornecedorDropdown.value; // Acessa as informações de fornec para trazer ao menu dropdown

    if (nome && quantidade > 0 && fornecedorSelecionado !== "0") {
        const existingMedicamento = medicamento.find(item => item.nome === nome && item.fornecedor === fornecedorSelecionado); // Verifica se já tem na lista

        if (existingMedicamento) {
            existingMedicamento.quantidade += quantidade;
        } else {
            medicamento.push({ nome, quantidade, fornecedor: fornecedorSelecionado });
        }
        updateMedicamento();
        limpaCampos("Medicamento"); // Limpa os campos do fomulário
    } else {
        alert("Por favor, preencha os campos corretamente.");
    }
}


// Atualiza medicamentos
function updateMedicamento() {
    const medicamentoList = document.getElementById("medicamento-list");
    medicamentoList.innerHTML = "";

    medicamento.forEach((medicamento, medicamentoIndex) => {
        const row = document.createElement("tr");

        const nomeMedic = document.createElement("td");
        nomeMedic.textContent = medicamento.nome;

        const quantidadeMedic = document.createElement("td");
        quantidadeMedic.textContent = medicamento.quantidade;

        // Adiciona a coluna do fornecedor
        const fornecedorMedic = document.createElement("td");
        fornecedorMedic.textContent = medicamento.fornecedor;

        const carrinhoButtonMedic = document.createElement("td");
        const carrinhoButton = document.createElement("button");
        carrinhoButton.textContent = "Adicionar ao Carrinho";
        carrinhoButton.className = "btn btn-outline-secondary";
        carrinhoButton.addEventListener("click", () => addToCarrinho(medicamentoIndex));

        carrinhoButtonMedic.appendChild(carrinhoButton);

        const acoesMedic = document.createElement("td");
        // Botão "Editar"
        const editarButtonMedic = document.createElement("td");
        const editarButton = document.createElement("button");
        editarButton.textContent = "Editar";
        editarButton.className = "btn btn-outline-secondary";
        editarButton.addEventListener("click", () => editarMedicamento(medicamentoIndex));

        editarButtonMedic.appendChild(editarButton);

        // Botão "Excluir"
        const excluirButtonMedic = document.createElement("td");
        const excluirButton = document.createElement("button");
        excluirButton.textContent = "Excluir";
        excluirButton.className = "btn btn-outline-secondary";
        excluirButton.addEventListener("click", () => excluirMedicamento(medicamentoIndex));

        excluirButtonMedic.appendChild(excluirButton);

        
        row.appendChild(nomeMedic);
        row.appendChild(quantidadeMedic);
        row.appendChild(fornecedorMedic); // Adiciona a coluna do fornecedor
        row.appendChild(carrinhoButtonMedic);
        row.appendChild(editarButtonMedic);
        row.appendChild(excluirButtonMedic);

        medicamentoList.appendChild(row);
    });
}

// Editar medicamento
function editarMedicamento(index) {
    const medicamentoEdit = medicamento[index];

    // Preencha os campos do formulário com os dados do medicamento a ser editado
    document.getElementById("medicamento-nome").value = medicamentoEdit.nome;
    document.getElementById("medicamento-quantidade").value = medicamentoEdit.quantidade;
    const fornecedorDropdown = document.getElementById("fornecedor-dropdown");
    fornecedorDropdown.value = medicamentoEdit.fornecedor;

    // Após editar, remova o medicamento da lista
    medicamento.splice(index, 1);

    // Atualize a lista de medicamentos em estoque
    updateMedicamento();
}

// Excluir medicamento
function excluirMedicamento(index) {
    // Remove o medicamento da lista
    medicamento.splice(index, 1);

    // Atualize a lista de medicamentos em estoque
    updateMedicamento();
}



// Adiciona medicamento ao carrinho
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
    if (index >= 0 && index < carrinho.length) {
        carrinho.splice(index, 1);
        updateCarrinho();
    }
}

// Atualiza o carrinho
function updateCarrinho() {
    const carrinhoList = document.getElementById("carrinho");
    carrinhoList.innerHTML = "";

    carrinho.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `Nome: ${item.nome} - Quantidade: ${item.quantidade} 
        <button onclick="removeFromCarrinho(${index})" class="btn btn-outline-secondary">Excluir</button>`;
        carrinhoList.appendChild(listItem);
    });
}

function prencherClienteDropdown() {
    const clienteSelect = document.getElementById("cliente-select");
    clienteSelect.innerHTML = "<option value='0'>Selecione um cliente</option>";

    cliente.forEach((c, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = c.name;
        clienteSelect.appendChild(option);
    });
}


// Finaliza a compra
function checkout() {
    //Verifica se tem estoque
    const estoqueVazio = medicamento.some(item => item.quantidade <= 0);

    if (carrinho.length === 0) {
        alert("Carrinho de compras vazio. Adicione itens para finalizar a compra.");
    } else if (estoqueVazio) {
        alert("Estoque insuficiente.");
    } else {
        // Atualiza a lista de estoque após a finalização da venda
        carrinho.forEach(item => {
            const matchingMedicamento = medicamento.find(medicamento => medicamento.nome === item.nome);
            if (matchingMedicamento) {
                matchingMedicamento.quantidade -= item.quantidade;
            }
        });

        // Limpa o carrinho
        carrinho.length = 0;
        
        // Atualiza as listas de estoque e carrinho
        updateMedicamento();
        updateCarrinho();
        // Limpa os campos nos menus dropdown no carrinho de compras
        const clienteSelect = document.getElementById("cliente-select");
        clienteSelect.value = "0"; // Redefine a seleção para "Selecione um cliente"
        
        alert("Compra finalizada com sucesso!");
    }
}

// Função globla para limpar campos
function limpaCampos(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

