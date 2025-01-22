document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    // Recupera os usuários armazenados no localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Adiciona evento para o envio do formulário de login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('admin-name').value; // Nome de usuário inserido
        const password = document.getElementById('admin-password').value; // Senha inserida
        const rememberMe = document.getElementById('remember-me').checked; // Verifica se "Lembrar de mim" está marcado

        // Verifica se o nome de usuário e a senha são válidos
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Se o "Lembrar de mim" estiver marcado, salva no localStorage
            if (rememberMe) {
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('loggedInUser', username); // Armazena o nome do usuário
            } else {
                sessionStorage.setItem('loggedIn', 'true');  // Se não, apenas durante a sessão
                sessionStorage.setItem('loggedInUser', username); // Armazena o nome do usuário na sessão
            }

            // Redireciona para a página de administração
            window.location.href = 'PagAdm.html'; // Substitua pelo caminho correto da sua página de administração
        } else {
            // Exibe a mensagem de erro se as credenciais estiverem incorretas
            loginError.style.display = 'block';  // Exibe a div de erro
        }
    });
});

// Verificar se o usuário já está logado ao acessar a página de administração
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser');

    // Verifica se o usuário não está logado
    if (!localStorage.getItem('loggedIn') && !sessionStorage.getItem('loggedIn')) {
        // Se o usuário não estiver logado, redireciona para a página de login
        window.location.href = 'Login.html';  // Redireciona para a página de login
    } else {
        // Exibe o nome do usuário logado no painel de administração
        document.getElementById('username-display').textContent = loggedInUser;
    }
});
