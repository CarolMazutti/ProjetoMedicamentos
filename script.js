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
}

// Atualiza clientes
function updateCliente(cliente) {
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

    row.appendChild(nomeCli);
    row.appendChild(enderecoCli);
    row.appendChild(cidadeCli);
    row.appendChild(estadoCli);

    clienteList.appendChild(row);
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

}

// Cadastra medicamentos
function addMedicamento() {
    const nome = document.getElementById("medicamento-nome").value;
    const quantidade = parseInt(document.getElementById("medicamento-quantidade").value);

    const fornecedorDropdown = document.getElementById("fornecedor-dropdown");
    const fornecedorSelecionado = fornecedorDropdown.options[fornecedorDropdown.selectedIndex].value; // Acessa as informações de fornec para trazer ao menu dropdown

    if (nome && quantidade > 0 && fornecedorSelecionado !== "0") {
        const existingMedicamento = medicamento.find(item => item.nome === nome); // Verifica se já tem na lista
        if (existingMedicamento) {
            existingMedicamento.quantidade += quantidade;
            existingMedicamento.fornecedor = fornecedorSelecionado;
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

        row.appendChild(nomeMedic);
        row.appendChild(quantidadeMedic);
        row.appendChild(fornecedorMedic); // Adiciona a coluna do fornecedor
        row.appendChild(carrinhoButtonMedic);

        medicamentoList.appendChild(row);
    });
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

