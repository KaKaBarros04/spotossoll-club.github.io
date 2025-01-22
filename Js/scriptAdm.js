// Função chamada ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    // Verificar se o usuário está logado, seja pelo sessionStorage ou localStorage
    if (!localStorage.getItem('loggedIn') && !sessionStorage.getItem('loggedIn')) {
        window.location.href = 'login.html';  // Redireciona para o login
    }

    // Carregar membros, troféus e corridas ao abrir a página
    loadMembers();
    loadTrophies();
    loadRaces();
});

// Função chamada ao enviar o formulário de membros
document.getElementById('member-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const memberName = document.getElementById('name').value;
    const memberAge = document.getElementById('age').value;
    const memberCard = document.getElementById('card').value;  // Coletando o valor do campo 'card'
    const memberPhoto = document.getElementById('file-input').files[0]; // Captura da imagem

    // Validação
    if (!memberName || !memberAge || !memberCard || !memberPhoto) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (isNaN(memberAge) || memberAge <= 0) {
        alert("Por favor, insira uma idade válida.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const memberData = {
            name: memberName,
            age: memberAge,
            card: memberCard,  // Garantindo que o 'card' será incluído
            photo: event.target.result // A URL base64 da imagem
        };

        saveMember(memberData);  // Salva o membro no LocalStorage
        addMemberToDOM(memberData);  // Adiciona o membro à lista na tela
        document.getElementById('member-form').reset();  // Limpa o formulário após o envio
    };
    reader.readAsDataURL(memberPhoto); // Lê a imagem como base64
});

// Função para salvar membro no LocalStorage
function saveMember(member) {
    let members = JSON.parse(localStorage.getItem('members')) || [];
    members.push(member);
    localStorage.setItem('members', JSON.stringify(members));
}

// Função para carregar membros salvos
function loadMembers() {
    let members = JSON.parse(localStorage.getItem('members')) || [];
    const memberList = document.getElementById('member-list');
    memberList.innerHTML = '';  // Limpa a lista antes de adicionar novos itens
    members.forEach(member => {
        addMemberToDOM(member);
    });
}

// Função para adicionar membro à lista visível
function addMemberToDOM(member) {
    const memberList = document.getElementById('member-list');
    const memberCard = document.createElement('div');
    memberCard.classList.add('member-card');
    memberCard.innerHTML = `
        <img src="${member.photo}" alt="${member.name}" width="100">
        <h3>${member.name}</h3>
        <p>Idade: ${member.age}</p>
        <p>Dorsal: ${member.card}</p>
        <button class="remove-btn">Remover</button>
    `;
    memberCard.querySelector('.remove-btn').addEventListener('click', function () {
        // Exibe uma caixa de confirmação
        const confirmRemoval = confirm(`Tem certeza de que deseja remover o membro "${member.name}"?`);
        
        if (confirmRemoval) {
            removeMember(member);  // Chama a função para remover o membro
            memberList.removeChild(memberCard);  // Remove o cartão da interface
        }
    });
    
    memberList.appendChild(memberCard);
}

// Função para remover membro do LocalStorage
function removeMember(memberToRemove) {
    let members = JSON.parse(localStorage.getItem('members')) || [];
    members = members.filter(member => member.name !== memberToRemove.name);
    localStorage.setItem('members', JSON.stringify(members));
}

// Funções para Troféus

document.getElementById('trophy-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const trophyTitle = document.getElementById('trophy-title').value;
    const trophyDescription = document.getElementById('trophy-description').value;
    const trophyPhoto = document.getElementById('trophy-photo').files[0];

    if (!trophyTitle || !trophyDescription || !trophyPhoto) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const trophyData = { title: trophyTitle, description: trophyDescription, photo: event.target.result };
        saveTrophy(trophyData);
        addTrophyToDOM(trophyData);
        document.getElementById('trophy-form').reset();
    };
    reader.readAsDataURL(trophyPhoto);
});

// Função para salvar troféu no LocalStorage
function saveTrophy(trophy) {
    let trophies = JSON.parse(localStorage.getItem('trophies')) || [];
    trophies.push(trophy);
    localStorage.setItem('trophies', JSON.stringify(trophies));
}

// Função para carregar troféus salvos
function loadTrophies() {
    let trophies = JSON.parse(localStorage.getItem('trophies')) || [];
    const trophyList = document.getElementById('trophy-list');
    trophyList.innerHTML = '';
    trophies.forEach(trophy => {
        addTrophyToDOM(trophy);
    });
}

// Função para adicionar troféu à lista visível
function addTrophyToDOM(trophy) {
    const trophyList = document.getElementById('trophy-list');
    const trophyCard = document.createElement('div');
    trophyCard.classList.add('trophy-card');
    trophyCard.innerHTML = `
    <div class="trophy-image-container">
        <img src="${trophy.photo}" alt="${trophy.title}" class="trophy-image">
    </div>
    <div class="trophy-info">
        <h3>${trophy.title}</h3>
        <p>${trophy.description}</p>
        <button class="remove-btn">Remover</button>
        </div>
    `;
    trophyCard.querySelector('.remove-btn').addEventListener('click', function () {
        removeTrophy(trophy);
        trophyList.removeChild(trophyCard);
    });
    trophyList.appendChild(trophyCard);
}

// Função para remover troféu do LocalStorage
function removeTrophy(trophyToRemove) {
    let trophies = JSON.parse(localStorage.getItem('trophies')) || [];
    trophies = trophies.filter(trophy => trophy.title !== trophyToRemove.title);
    localStorage.setItem('trophies', JSON.stringify(trophies));
}

// Funções para Corridas

document.getElementById('race-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const raceTitle = document.getElementById('race-title').value;
    const raceDate = document.getElementById('race-date').value;
    const raceDescription = document.getElementById('race-description').value;

    if (!raceTitle || !raceDate || !raceDescription) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const raceData = { title: raceTitle, date: raceDate, description: raceDescription };
    saveRace(raceData);
    addRaceToDOM(raceData);
    document.getElementById('race-form').reset();
});

// Função para salvar corrida no LocalStorage
function saveRace(race) {
    let races = JSON.parse(localStorage.getItem('races')) || [];
    races.push(race);
    localStorage.setItem('races', JSON.stringify(races));
}

// Função para carregar corridas salvas
function loadRaces() {
    let races = JSON.parse(localStorage.getItem('races')) || [];
    const raceList = document.getElementById('race-list');
    raceList.innerHTML = '';
    races.forEach(race => {
        addRaceToDOM(race);
    });
}

// Função para adicionar corrida à lista visível
function addRaceToDOM(race) {
    const raceList = document.getElementById('race-list');
    const raceCard = document.createElement('div');
    raceCard.classList.add('race-card');
    raceCard.innerHTML = `
        <div class="race-card-content">
        <div class="race-card-header">
            <h3>${race.title}</h3>
            <p class="race-date"><strong>Data:</strong> ${new Date(race.date).toLocaleDateString()}</p>
        </div>
        <div class="race-card-body">
            <p class="race-description">${race.description}</p>
        </div>
        <button class="remove-btn">Remover</button>
    `;
    raceCard.querySelector('.remove-btn').addEventListener('click', function () {
        removeRace(race);
        raceList.removeChild(raceCard);
    });
    raceList.appendChild(raceCard);
}

// Função para remover corrida do LocalStorage
function removeRace(raceToRemove) {
    let races = JSON.parse(localStorage.getItem('races')) || [];
    races = races.filter(race => race.title !== raceToRemove.title);
    localStorage.setItem('races', JSON.stringify(races));
}

// Função para exibir a caixa de confirmação personalizada
function showConfirmationModal(memberName, onConfirm) {
    const modal = document.getElementById('confirmation-modal');
    const message = document.getElementById('confirmation-message');
    const confirmButton = document.getElementById('confirm-btn');
    const cancelButton = document.getElementById('cancel-btn');

    // Atualiza a mensagem da confirmação com o nome do membro
    message.textContent = `Tem certeza de que deseja remover o membro "${memberName}"?`;

    // Exibe o modal
    modal.style.display = 'flex';

    // Lógica quando o botão "Sim" for clicado
    confirmButton.onclick = function() {
        onConfirm();  // Executa a função de remoção
        modal.style.display = 'none';  // Fecha o modal
    };

    // Lógica quando o botão "Cancelar" for clicado
    cancelButton.onclick = function() {
        modal.style.display = 'none';  // Fecha o modal
    };
}

document.getElementById('logout-btn').addEventListener('click', function() {
    if(confirm('Deseja realmente sair?')) {
        // Realizar logout aqui
    }
});
