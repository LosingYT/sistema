document.getElementById('login').addEventListener('click', (event) => {
    event.preventDefault(); // Impede o envio do formulário
  
    const username = document.getElementById('username').value; // Obtém o valor do campo de usuário
    const password = document.getElementById('password').value; // Obtém o valor do campo de senha
  
    // Envia uma solicitação POST para o servidor com o valor do campo de usuário
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
            console.log('login feito');
            window.location.replace('/menu');
          } else {
            console.log('Usuário não encontrado!');
          }
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  });

document.getElementById('register').addEventListener('click', (event) => {
  window.location.replace('/register');
});