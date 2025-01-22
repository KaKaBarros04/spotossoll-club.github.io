document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');
    const registerError = document.getElementById('register-error');

    // Verifica se há usuários registrados no localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Adiciona evento para o envio do formulário de registro
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Verificar se o nome de usuário ou e-mail já existem
        const userExists = users.some(user => user.username === username || user.email === email);

        if (userExists) {
            // Exibe a mensagem de erro se o nome de usuário ou e-mail já existir
            registerError.style.display = 'block';
            registerError.textContent = 'Erro: O nome de usuário ou e-mail já está em uso!';
            return;
        }

        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            // Exibe a mensagem de erro se as senhas não coincidem
            registerError.style.display = 'block';
            registerError.textContent = 'Erro: As senhas não coincidem!';
            return;
        }

        // Cria o novo usuário
        const newUser = {
            username: username,
            email: email,
            password: password
        };

        // Armazena o novo usuário no localStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Redireciona o usuário para a página de login
        window.location.href = 'login.html';  // Ou a página que você desejar
    });
});
