document.addEventListener('DOMContentLoaded', function () {
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');
    const addUserForm = document.getElementById('add-user-form');
    const userList = document.getElementById('user-list');

    // Verificar se o usuário está logado
    const loggedInUser = localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        // Se o usuário não estiver logado, redireciona para a página de login
        window.location.href = 'Login.html';
    }

    // Exibir o nome do usuário logado
    usernameDisplay.textContent = loggedInUser;

    // Carregar a lista de usuários do localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    displayUserList(users);

    // Função para exibir a lista de usuários
    function displayUserList(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.username} - ${user.email}`;
            userList.appendChild(li);
        });
    }

    // Adicionar novo usuário
    addUserForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;

        // Verificar se o nome de usuário ou e-mail já existem
        if (users.some(user => user.username === username || user.email === email)) {
            alert('Erro: Nome de usuário ou e-mail já em uso.');
            return;
        }

        // Criar um novo usuário e adicionar à lista
        const newUser = { username, email };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Atualizar a lista de usuários
        displayUserList(users);
        alert('Usuário adicionado com sucesso!');
    });

    // Logout
    logoutBtn.addEventListener('click', function () {
        // Remover o item de login do localStorage ou sessionStorage
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('loggedInUser');
        
        // Redirecionar para a página de login
        window.location.href = 'Login.html';
    });
});
