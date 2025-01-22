// Função chamada ao carregar a página para exibir os membros
document.addEventListener('DOMContentLoaded', function() {
    // Exibe os membros após a página ser carregada
    displayMember();

    // Exibe os troféus após a página carregada
    displayTrophy();

    // Chama a função para exibir corridas
    displayRaces();
});

// Função para exibir a lista de membros
function displayMember() {
    const memberContainer = document.getElementById('member-list');
    memberContainer.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

    const members = JSON.parse(localStorage.getItem('members')) || []; // Recupera os membros do localStorage
    if (members.length === 0) {
        memberContainer.innerHTML = '<p>Nenhum membro cadastrado.</p>';
        return;
    }

    members.forEach((member) => {
        const card = document.createElement('div');
        card.classList.add('member-card');  // Adiciona a classe do card

        // Criação da imagem
        const img = document.createElement('img');
        img.src = member.photo || 'images/default.jpg';  // Foto ou imagem padrão
        img.alt = `${member.name}'s photo`; // Texto alternativo
        img.classList.add('member-image');
        card.appendChild(img);

        // Nome do membro
        const name = document.createElement('h3');
        name.textContent = member.name;
        card.appendChild(name);

        // Idade do membro
        const age = document.createElement('p');
        age.textContent = `Idade: ${member.age}`;
        card.appendChild(age);

        // Número do cartão do membro
        const cardNumber = document.createElement('p');
        cardNumber.textContent = `Número: ${member.card || 'Não informado'}`;
        card.appendChild(cardNumber);

        // Adiciona o card à lista
        memberContainer.appendChild(card);
    });
}

// Função para exibir a lista de troféus
function displayTrophy() {
    const trophyContainer = document.getElementById('trophy-list');
    trophyContainer.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

    const trophies = JSON.parse(localStorage.getItem('trophies')) || []; // Recupera os troféus do localStorage

    if (trophies.length === 0) {
        trophyContainer.innerHTML = '<p>Nenhum troféu encontrado.</p>';
        return;
    }

    trophies.forEach((trophy) => {
        const card = document.createElement('div');
        card.classList.add('trophy-card');

        // Criação da imagem do troféu
        const img = document.createElement('img');
        img.src = trophy.photo || 'images/default.jpg';  // Foto ou imagem padrão
        img.alt = `${trophy.title} trophy`; // Texto alternativo
        img.classList.add('trophy-image');
        card.appendChild(img);

        // Criação do título do troféu
        const title = document.createElement('h3');
        title.textContent = trophy.title;
        card.appendChild(title);

        // Criação da descrição do troféu
        const description = document.createElement('p');
        description.textContent = trophy.description;
        card.appendChild(description);

        // Adiciona o card de troféu à lista
        trophyContainer.appendChild(card);
    });
}

// Função para exibir a lista de corridas
function displayRaces() {
    const raceContainer = document.getElementById('race-list');
    raceContainer.innerHTML = '';  // Limpa a lista antes de adicionar novos itens

    const races = JSON.parse(localStorage.getItem('races')) || []; // Recupera as corridas do localStorage

    if (races.length === 0) {
        raceContainer.innerHTML = '<p>Nenhuma corrida cadastrada.</p>';
        return;
    }

    races.forEach((race) => {
        // Criação do card de corrida
        const card = document.createElement('div');
        card.classList.add('race-card-content'); // Adiciona a classe do card da corrida
    
        // Criação do contêiner do cabeçalho
        const header = document.createElement('div');
        header.classList.add('race-card-header'); // Adiciona a classe 'race-card-header' ao contêiner do cabeçalho
    
        // Criação do título da corrida
        const title = document.createElement('h3');
        title.textContent = race.title;
        header.appendChild(title); // Adiciona o título ao cabeçalho
    
        // Exibição da data da corrida
        const date = document.createElement('p');
        date.classList.add('race-date'); // Adiciona a classe 'race-date' ao elemento de data
        date.textContent = `Data: ${new Date(race.date).toLocaleDateString()}`;
        header.appendChild(date); // Adiciona a data ao cabeçalho
    
        // Adiciona o cabeçalho ao card
        card.appendChild(header);
    
        // Exibição da descrição da corrida
        const description = document.createElement('p');
        description.classList.add('race-description'); // Adiciona a classe 'race-description' ao elemento de descrição
        description.textContent = `Descrição: ${race.description}`;
        card.appendChild(description); // Adiciona a descrição ao card
    
        // Adiciona o card de corrida à lista
        raceContainer.appendChild(card);
    });
    
}
