const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sTelefone = document.querySelector('#m-telefone');
const sEmail = document.querySelector('#m-email');
const sEndereco = document.querySelector('#m-endereco');
const sRedesSociais = document.querySelector('#m-rede-social');
const sObservacao = document.querySelector('#m-observacao');
const sCategoria = document.querySelector('#m-categoria');
const sIdade = document.querySelector('#m-idade');
const sCpf = document.querySelector('#m-cpf');
const btnSalvar = document.querySelector('#btnSalvar');
const btnAdicionar = document.querySelector('#new');
const nomeUsuario = localStorage.getItem('name');
const btnLogout = document.querySelector('#logout');




if (nomeUsuario) {
  document.getElementById('saudacao').textContent = `Olá, ${nomeUsuario}!`;
} else {
  document.getElementById('saudacao').textContent = 'Olá, Usuário';
}

let itens = [];
let editIndex = undefined;
const userId = localStorage.getItem('userId'); // Recuperando o ID do usuário do localStorage
console.log(userId);

// Abrir o modal de criação ou edição
function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.classList.contains('modal-container')) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    const item = itens[index];
    sNome.value = item.name;
    sTelefone.value = item.phone;
    sEmail.value = item.email;
    sEndereco.value = item.address;
    sRedesSociais.value = item.socialMedia;
    sObservacao.value = item.note;
    sIdade.value = item.age;
    sCpf.value = item.cpf || '';
    editIndex = index;

    // Lógica para preencher o campo de categoria
    switch (item.category) {
      case 'Amigos':
        sCategoria.selectedIndex = 0; 
        break;
      case 'Família':
        sCategoria.selectedIndex = 1; 
        break;
      case 'Clientes':
        sCategoria.selectedIndex = 2; 
        break;
      case 'Favoritos':
        sCategoria.selectedIndex = 3;
        break;
      default:
        sCategoria.selectedIndex = -1;
        break;
    }
  } else {
    sNome.value = '';
    sTelefone.value = '';
    sEmail.value = '';
    sEndereco.value = '';
    sRedesSociais.value = '';
    sObservacao.value = '';
    sCategoria.value = '';
    sIdade.value = '';
    sCpf.value = '';
    editIndex = undefined;
  }
}

// Editar um item
function editItem(index) {
  openModal(true, index);
}


// Excluir um item
function deleteItem(index) {
  const contactId = itens[index].id; // Obtém o ID do contato

  fetch('http://localhost:3000/api/deletarContato', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Adiciona o token de autenticação
    },
    body: JSON.stringify({ contactId }) // Envia o ID do contato no corpo da requisição
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message || 'Erro ao excluir contato');
        });
      }
      return response.json();
    })
    .then(data => {
      alert(data.message || 'Contato excluído com sucesso!');
      itens.splice(index, 1); // Remove o item da lista local
      loadItens(); // Recarrega a lista de itens
    })
    .catch(error => {
      console.error('Erro ao excluir contato:', error);
      alert(`Erro ao excluir contato: ${error.message}`);
    });
}


// Inserir um item na tabela
function insertItem(item, index) {
  let tr = document.createElement('tr');
  tr.classList.add('main-row');
  
  tr.innerHTML = `
    <td>${item.name}</td> <!-- Alterando 'nome' para 'name' -->
    <td>${item.phone}</td> <!-- Alterando 'telefone' para 'phone' -->
    <td>${item.email}</td>
    <td class="acao">
      <button onclick="editItem(${index})" title="Editar"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})" title="Excluir"><i class='bx bx-trash'></i></button>
    </td>
    <td class="acao">
      <button onclick="toggleDetails(${index})" title="Mais"><i class='bx bx-chevron-down'></i></button>
    </td>
  `;

  let detailsRow = document.createElement('tr');
  detailsRow.classList.add('details-row');
  detailsRow.style.display = 'none';
  detailsRow.innerHTML = `
    <td colspan="5">
      <div class="details-content">
        <p><strong>Endereço:</strong> ${item.address || 'Não informado'}</p> <!-- Alterando 'endereco' para 'address' -->
        <p><strong>Redes Sociais:</strong> ${item.socialMedia || 'Não informado'}</p> <!-- Alterando 'redesSociais' para 'socialMedia' -->
        <p><strong>Categoria:</strong> ${item.category || 'N/A'}</p> <!-- Caso o campo categoria não exista -->
        <p><strong>Idade:</strong> ${item.age || 'Não informado'}</p> <!-- Alterando 'idade' para 'age' -->
        <p><strong>CPF:</strong> ${item.cpf || 'Não informado'}</p> <!-- Alterando 'cpf' e incluindo verificação -->
        <p><strong>Observação:</strong> ${item.note || 'Sem observações'}</p> <!-- Adicionando a exibição de observação -->
      </div>
    </td>
  `;

  tbody.appendChild(tr);
  tbody.appendChild(detailsRow);
}


// Alternar a exibição dos detalhes
function toggleDetails(index) {
  const detailsRows = tbody.querySelectorAll('.details-row');
  const chevrons = tbody.querySelectorAll('.acao button i');
  
  const detailsRow = detailsRows[index];
  const chevron = chevrons[index + 3];
  
  if (detailsRow.style.display === 'none') {
    detailsRow.style.display = 'table-row';
    chevron.classList.remove('bx-chevron-down');
    chevron.classList.add('bx-chevron-up');
  } else {
    detailsRow.style.display = 'none';
    chevron.classList.remove('bx-chevron-up');
    chevron.classList.add('bx-chevron-down');
  }
}

// Ação ao clicar no botão "Adicionar"
btnAdicionar.onclick = () => openModal();


// Ação ao clicar no botão "Salvar"
btnSalvar.onclick = e => {
  e.preventDefault();

  // Verificar campos obrigatórios
  if (sNome.value === '' || sTelefone.value === '' || sEmail.value === '') {
    alert('Nome, telefone e e-mail são obrigatórios!');
    return;
  }

  // Criar objeto no formato esperado pelo backend
  const contact = {
    name: sNome.value, 
    age: parseInt(sIdade.value, 10), 
    cpf: sCpf.value, 
    phone: sTelefone.value, 
    email: sEmail.value, 
    address: sEndereco.value, 
    socialMedia: sRedesSociais.value, 
    note: sObservacao.value, 
    category: sCategoria.value || null, 
    id: editIndex !== undefined ? itens[editIndex].id : undefined, // ID do contato para atualização
    userId: userId 
  };

  // Validar idade como número
  if (isNaN(contact.age)) {
    alert('A idade deve ser um número válido!');
    return;
  }

  const method = editIndex !== undefined ? 'POST' : 'POST'; // rota para atualizar (POST com body)

  const url = editIndex !== undefined 
    ? 'http://localhost:3000/api/atualizarContatos'  // Nova rota para atualizar
    : 'http://localhost:3000/api/cadastroContato';  // Rota para criar

  // Enviar os dados para o backend
  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(contact) 
  })
    .then(async response => {
      if (response.status === 401) {
        // Token expirado, exibe a mensagem e redireciona
        showErrorAndRedirect('Seu token expirou. Por favor, faça login novamente.');
        throw new Error('Token expirado');
      }

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Erro na requisição');
      }
  
      return response.json();
    })
    .then(data => {      
      if (editIndex === undefined) {
        itens.push(data); // Adiciona o novo item
        alert(data.message)
      } else {
        itens[editIndex] = data; // Atualiza o item
        editIndex = undefined;
        alert(data.message)
      }
      modal.classList.remove('active');
      loadItens(); // Recarrega a lista
    })
    .catch(error => {
      console.error('Erro ao salvar:', error);
      alert(`Erro ao salvar: ${error.message}`);
    });
};


// Função para quando token acabar redirecionar para a pagina de login
function showErrorAndRedirect(message) {
  alert(message);  
  window.location.href = '/'; 
}

// função GET para listar os contatos
function loadItens() {
  fetch('http://localhost:3000/api/listarContatos', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  })
    .then(response => {
      if (response.status === 401) {

        showErrorAndRedirect('Seu token expirou. Por favor, faça login novamente.');
        throw new Error('Token expirado');
      }
      return response.json();
    })
    .then(data => {

      itens = data.Contacts;
      tbody.innerHTML = '';
      itens.forEach((item, index) => insertItem(item, index));
    })
    .catch(error => console.error('Erro ao carregar os itens:', error));
}

// Modal para comfirmação de exclusão
const modalDeleteAll = document.createElement('div');
modalDeleteAll.classList.add('modal-container');
modalDeleteAll.innerHTML = `
  <div class="modal">
    <p>Essa funcionalidade exclui todos os seus contatos. <strong>Isso é irreversível</strong>. Tem certeza?</p>
    <div>
      <button id="cancelDeleteAll">Não</button>
      <button id="confirmDeleteAll">Sim</button>
    </div>
  </div>
`;
document.body.appendChild(modalDeleteAll);

// Armazena na variavel o botao delete all
const btnDeleteAll = document.querySelector('#deleteAll');

// Abrir o modal de confirmação
btnDeleteAll.onclick = () => {
  modalDeleteAll.classList.add('active');
};

// nao
const btnCancelDeleteAll = modalDeleteAll.querySelector('#cancelDeleteAll');

//Função [nao]
btnCancelDeleteAll.onclick = () => {
  modalDeleteAll.classList.remove('active');
};

// sim
const btnConfirmDeleteAll = modalDeleteAll.querySelector('#confirmDeleteAll');

//Função [sim]
btnConfirmDeleteAll.onclick = () => {
  fetch('http://localhost:3000/api/deletarTodosContatos', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message || 'Erro ao excluir todos os contatos');
        });
      }
      return response.json();
    })
    .then(data => {
      alert(data.message || 'Todos os contatos foram excluídos com sucesso!');
      modalDeleteAll.classList.remove('active');
      itens = []; // Limpa a lista local
      loadItens(); // Atualiza a tabela
    })
    .catch(error => {
      console.error('Erro ao excluir todos os contatos:', error);
      alert(`Erro ao excluir todos os contatos: ${error.message}`);
    });
};

btnLogout.onclick = () => {
  // Limpa o localStorage e sessionStorage
  localStorage.clear();
  sessionStorage.clear();

  // Redireciona para a página de login
  window.location.href = '/'; // Altere para o caminho correto da sua página de login
};


// Inicializar o carregamento dos itens
loadItens();
