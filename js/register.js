document.getElementById('register').addEventListener('click', (event) => {
    event.preventDefault(); // Impede o envio do formulário
  
    const username = document.getElementById('username').value; // Obtém o valor do campo de usuário
    const password = document.getElementById('password').value; // Obtém o valor do campo de senha
  
    // Envia uma solicitação POST para o servidor com o valor do campo de usuário e senha
  if(username != "" && password != ""){
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
            console.log('Registro feito');
            window.location.replace('/login');
          } else {
            console.log('Registro não feito');
          }
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }else{
    console.log("nenhum dos campos pode estar vazio");
  }
});


