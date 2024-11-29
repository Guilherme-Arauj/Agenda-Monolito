var formSignin = document.querySelector('#signin');
var formSignup = document.querySelector('#signup');
var btnColor = document.querySelector('.btnColor');
var container = document.querySelector('.container');

// Botão de Entrar
document.querySelector('#btnSignin').addEventListener('click', () => {
  formSignin.style.left = "25px";
  formSignup.style.left = "450px";
  btnColor.style.left = "0px";
  container.style.height = "400px"; // Altura para o login
  document.querySelector('.logo').style.top = "90px"; // Posição padrão para login
});

// Botão de Cadastrar
document.querySelector('#btnSignup').addEventListener('click', () => {
  formSignin.style.left = "-450px";
  formSignup.style.left = "25px"; 
  btnColor.style.left = "110px";
  container.style.height = "550px"; // Altura para o cadastro
  document.querySelector('.logo').style.top = "15px"; // Sobe a logo para cadastro
});


// Função para enviar requisições
async function sendRequest(url, method, data) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Erro: ${error.message}`);
      return;
    }

    const result = await response.json();
    alert(result.message);

    if (url.includes('login')) {
      // Verificar se a resposta contém a estrutura correta de usuário e token
      if (result.user && result.user.token) {
        // Armazenar o token no localStorage após o login
        localStorage.setItem('authToken', result.user.token); // Armazenando o token
        localStorage.setItem('name', result.user.name); // Armazenando o nome do usuário
        localStorage.setItem('userId', result.user.id); // Armazenando o ID do usuário
      } else {
        alert('Erro: Token não recebido.');
      }

      // Redireciona para a página de contatos após login bem-sucedido
      window.location.href = '/contactPage';
    }
  } catch (error) {
    console.error('Erro ao enviar requisição:', error);
    alert('Erro ao processar sua solicitação. Tente novamente.');
  }
}

// Submissão do formulário de cadastro
formSignup.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    name: formSignup.querySelector('input[placeholder="Nome"]').value,
    email: formSignup.querySelector('input[placeholder="E-mail"]').value,
    password: formSignup.querySelector('input[placeholder="Senha"]').value,
  };

  sendRequest('/api/cadastro', 'POST', data);
});

// Submissão do formulário de login
formSignin.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    email: formSignin.querySelector('input[placeholder="E-mail"]').value,
    password: formSignin.querySelector('input[placeholder="Senha"]').value,
  };

  sendRequest('/api/login', 'POST', data);
});
