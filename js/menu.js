// Chamar a função para preencher a tabela quando a página carregar
window.addEventListener('DOMContentLoaded', populateProductTable);

// Função para preencher a tabela com os dados do banco de dados
function populateProductTable() {
    fetch('/products')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('tableBody');
  
        // Limpar o conteúdo da tabela
        tableBody.innerHTML = '';
  
        // Adicionar as linhas com os dados do banco de dados
        data.forEach(product => {
          const row = document.createElement('tr');
          const idCell = document.createElement('td');
          const descriptionCell = document.createElement('td');
  
          idCell.textContent = product.id;
          descriptionCell.textContent = product.description;
  
          row.appendChild(idCell);
          row.appendChild(descriptionCell);
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }


