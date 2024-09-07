document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const dataListItems = document.getElementById('dataListItems');

    // Função para adicionar um novo dado
    async function addData(data) {
        try {
            const response = await fetch('https://app-web-uniara-example-60f73cc06c77.herokuapp.com/apiuniara/api/v1/aluno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                fetchData(); // Atualiza a lista após adicionar
            } else {
                console.error('Erro ao adicionar o dado');
            }
        } catch (error) {
            console.error('Erro ao fazer a solicitação', error);
        }
    }

    // Função para listar os dados
    async function fetchData() {
        try {
            const response = await fetch('https://app-web-uniara-example-60f73cc06c77.herokuapp.com/apiuniara/api/v1/aluno');
            const data = await response.json();
            dataListItems.innerHTML = ''; // Limpa a lista atual
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `Nome: ${item.nome}, Email: ${item.email}, Telefone: ${item.telefone}, Curso: ${item.curso}`;
                dataListItems.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao buscar os dados', error);
        }
    }

    // Manipulador de envio do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const curso = document.getElementById('curso').value;

        const newData = {
            nome,
            email,
            telefone,
            curso,
        };

        addData(newData);
    });

    // Busca os dados quando a página carrega
    fetchData();
});
