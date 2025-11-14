// --- IMPORTAÇÕES ---
// Importa todos os elementos do DOM
import * as DOM from './dom-elements.js';
// Importa os bancos de dados
import { allSocialPosts } from './social-database.js';
import { gameEvents } from './event-database.js';

// --- ESTADO DO JOGO ---
let player = {
    name: "", age: 16, position: "",
    skill: 5, fame: 0, chaos: 0, money: 20,
    foco: 80, // Foco (0-100)
    team: "Nenhum",
    followers: 50,
    metDjalma: false, // Controle de loop da história
    flags: {}, // Controle de eventos
    style: "Padrão", // Novo status para corte de cabelo
    // ESTATÍSTICAS DE CARREIRA (VÁRZEA)
    gamesPlayed: 0,
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    // ESTATÍSTICAS DO INTERCLASSE (Separado)
    interclasse: {
        games: 0,
        goals: 0,
        assists: 0,
        teamName: "2° Info"
    }
};

let NPCs = { 
    amanda: { followers: 4500, affinity: 0 },
    marcos: { followers: 150 },
    julinha: { followers: 2100, affinity: 0 },
    lucas: { followers: 80, affinity: 0 }, 
    profCassia: { patience: 100 },
    // --- NOVOS NPCs ---
    mateus: { followers: 250, affinity: 0, chaos: 10 },
    caua: { followers: 120, affinity: 5, foco: 10 },
    julioCisterna: { followers: 400, affinity: 0, rivalry: 0 },
    diretor: { patience: 100 }
};

let socialFeedLog = []; 

let minigameCallback = {
    onSuccessEvent: '',
    onFailEvent: ''
};

// Variáveis do Minigame de Drible
let dribbleQTE_Timeout = null;
let dribbleQTE_CorrectDir = '';

// --- O MOTOR DO JOGO ---

// Event listener para o formulário de setup
DOM.setupForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    player.name = DOM.setupForm.querySelector('#player-name').value;
    player.age = parseInt(DOM.setupForm.querySelector('#player-age').value);
    player.position = DOM.setupForm.querySelector('#player-position').value;
    
    // Resetando os status para um novo jogo
    player.skill = 5; player.fame = 0; player.chaos = 0;
    player.money = 20; player.team = "Nenhum";
    player.followers = 50;
    player.foco = 80;
    player.metDjalma = false;
    player.flags = {}; 
    player.style = "Padrão";
    // RESET DAS ESTATÍSTICAS DE CARREIRA
    player.gamesPlayed = 0;
    player.goals = 0;
    player.assists = 0;
    player.yellowCards = 0;
    player.redCards = 0;
    // RESET INTERCLASSE
    player.interclasse = { games: 0, goals: 0, assists: 0, teamName: "2° Info" };
    
    // Reset NPCs
    NPCs.amanda.followers = 4500;
    NPCs.amanda.affinity = 0;
    NPCs.marcos.followers = 150;
    NPCs.julinha.followers = 2100;
    NPCs.julinha.affinity = 0;
    NPCs.lucas.followers = 80; 
    NPCs.lucas.affinity = 0;
    NPCs.profCassia.patience = 100;
    // RESET NOVOS NPCs
    NPCs.mateus = { followers: 250, affinity: 0, chaos: 10 };
    NPCs.caua = { followers: 120, affinity: 5, foco: 10 };
    NPCs.julioCisterna = { followers: 400, affinity: 0, rivalry: 0 };
    NPCs.diretor = { patience: 100 };
    
    socialFeedLog = []; // Limpa o feed

    DOM.playerNameDisplay.innerText = player.name + " (" + player.age + " anos)";
    updateStats();
    DOM.setupModal.close();
    DOM.gameContainer.classList.remove('hidden');
    showEvent('START');
});

// Função para mostrar um evento na tela
function showEvent(eventId) {
    // Garante que o foco e a paciência não ultrapassem os limites
    if (player.foco > 100) player.foco = 100;
    if (player.foco < 0) player.foco = 0;
    if (NPCs.profCassia.patience > 100) NPCs.profCassia.patience = 100;
    if (NPCs.diretor.patience > 100) NPCs.diretor.patience = 100;


    // Checagem de Game Over da Professora Cássia
    if (NPCs.profCassia.patience <= 0) {
        showEvent('GAME_OVER_CASSIA');
        return;
    }
    // Checagem de Game Over do Diretor
    if (NPCs.diretor.patience <= 0) {
        showEvent('GAME_OVER_DIRETOR');
        return;
    }

    const event = gameEvents[eventId];
    if (!event) { console.error(`Evento "${eventId}" não encontrado!`); return; }

    // Roda o onSelect do *próprio evento* (útil para contabilizar jogos)
    if (event.onSelect) {
        event.onSelect(player, NPCs);
    }

    // Atualiza o texto substituindo placeholders
    const storyText = event.text
        .replace(/\[playerName\]/g, player.name)
        .replace(/\[player.age\]/g, player.age)
        .replace(/\[playerPos\]/g, player.position)
        .replace(/\[player.team\]/g, player.team)
        .replace(/\[player.money\]/g, player.money) 
        .replace(/\[player.foco\]/g, player.foco) 
        .replace(/\[profCassia.patience\]/g, NPCs.profCassia.patience)
        .replace(/\[diretor.patience\]/g, NPCs.diretor.patience);
    
    DOM.storyTextElement.innerText = storyText;
    DOM.choiceAreaElement.innerHTML = '';

    // Renderiza as escolhas
    event.choices.forEach(choice => {
        // Checagem de condição
        if (choice.condition && !choice.condition(player, NPCs)) {
            return; 
        }
        
        // Checagem de flag
        if (choice.requiresFlag && !player.flags[choice.requiresFlag]) {
             return;
        }
        if (choice.skipIfFlag && player.flags[choice.skipIfFlag]) {
             return;
        }

        const button = document.createElement('button');
        button.classList.add('choice-button');
        
        button.innerText = choice.text.replace(/\[player.money\]/g, player.money);

        
        if (choice.minigame) {
            button.addEventListener('click', () => {
                if (choice.onSelect) {
                    choice.onSelect(player, NPCs);
                }
                startMinigame(
                    choice.minigame.type, 
                    choice.minigame.onSuccess, 
                    choice.minigame.onFail
                );
            });
        } else {
            button.addEventListener('click', () => selectChoice(choice));
        }
        DOM.choiceAreaElement.appendChild(button);
    });
}

// Função chamada quando o jogador clica em um botão
function selectChoice(choice) {
    if (choice.unlocksPost) {
        if (!socialFeedLog.includes(choice.unlocksPost)) {
            socialFeedLog.push(choice.unlocksPost);
        }
    }

    if (choice.onSelect) {
        choice.onSelect(player, NPCs); // Passa NPCs para a função onSelect
    }
    updateStats(); // Atualiza o HUD

    if (choice.nextEvent === 'GAME_OVER') {
        alert("FIM DE JOGO.\n" + (choice.text || "Sua jornada termina aqui.")); 
        DOM.setupModal.showModal(); 
        DOM.gameContainer.classList.add('hidden');
    } else {
        showEvent(choice.nextEvent);
    }
}

// Função para atualizar a barra de status
function updateStats() {
    DOM.statSkill.innerText = player.skill;
    DOM.statFame.innerText = player.fame;
    DOM.statChaos.innerText = player.chaos;
    DOM.statMoney.innerText = player.money;
    DOM.statFocus.innerText = player.foco; 
    DOM.statFollowers.innerText = player.followers; 
}


// --- FUNÇÕES DO MINI-GAME ---

// Roteador principal de Minigames
function startMinigame(type, onSuccessEvent, onFailEvent) {
    minigameCallback.onSuccessEvent = onSuccessEvent;
    minigameCallback.onFailEvent = onFailEvent;

    if (type === 'penalty' || type === 'freekick') {
        startPenaltyMinigame(type);
    } else if (type === 'dribble') {
        startDribbleMinigame();
    }
}

// Minigame de Pênalti/Falta
function startPenaltyMinigame(type) {
    if (type === 'penalty') {
        DOM.minigameTitle.innerText = "PÊNALTI!";
        DOM.minigameWall.classList.add('hidden');
    } else { // 'freekick'
        DOM.minigameTitle.innerText = "FALTA PERIGOSA!";
        DOM.minigameWall.classList.remove('hidden');
    }

    DOM.minigameResult.innerText = "Escolha onde chutar!";
    DOM.minigameTargets.forEach(target => {
        target.className = 'target-spot';
        target.onclick = () => handleTargetClick(target); 
    });

    DOM.minigameOverlay.classList.remove('hidden');
}

function handleTargetClick(target) {
    DOM.minigameTargets.forEach(t => t.onclick = null);

    const focoBonus = (player.foco - 50) / 10;
    const totalChance = player.skill + focoBonus;
    const isSuccess = (Math.random() * 20) < totalChance; 

    if (isSuccess) {
        target.classList.add('success');
        DOM.minigameResult.innerText = "GOOOOL! QUE CAIXA!";
        player.skill += 1; 
        player.fame += 5;
        player.foco -= 5;
        setTimeout(() => {
            DOM.minigameOverlay.classList.add('hidden');
            selectChoice({ nextEvent: minigameCallback.onSuccessEvent });
        }, 1500); 
    } else {
        target.classList.add('fail');
        DOM.minigameResult.innerText = "ERROU! (Na trave ou o goleiro pegou)";
        player.chaos += 1; 
        player.foco -= 5;
        setTimeout(() => {
            DOM.minigameOverlay.classList.add('hidden');
            selectChoice({ nextEvent: minigameCallback.onFailEvent });
        }, 1500); 
    }
}


// --- FUNÇÕES DO MINI-GAME DE DRIBLE (QTE) ---

function startDribbleMinigame() {
    DOM.dribbleOverlay.classList.remove('hidden');
    DOM.dribbleResult.innerText = "Prepare-se...";
    DOM.dribbleQteIcon.innerText = '...';
    
    DOM.dribbleButtons.forEach(btn => btn.disabled = true);
    
    setTimeout(() => {
        DOM.dribbleButtons.forEach(btn => btn.disabled = false);
        runDribbleQTE();
    }, 2000); 
}

function runDribbleQTE() {
    const directions = ['left', 'up', 'right'];
    const icons = ['⬅️', '⬆️', '➡️'];
    const randomIndex = Math.floor(Math.random() * directions.length);
    
    dribbleQTE_CorrectDir = directions[randomIndex];
    DOM.dribbleQteIcon.innerText = icons[randomIndex];
    DOM.dribbleResult.innerText = "AGORA!";

    dribbleQTE_Timeout = setTimeout(() => {
        failDribble("LENTO DEMAIS!");
    }, 1500); 
}

DOM.dribbleButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!dribbleQTE_Timeout) return;

        const chosenDir = button.dataset.dir;
        
        clearTimeout(dribbleQTE_Timeout); 
        dribbleQTE_Timeout = null;
        
        DOM.dribbleButtons.forEach(btn => btn.disabled = true);

        if (chosenDir !== dribbleQTE_CorrectDir) {
            failDribble("DIREÇÃO ERRADA!");
            return;
        }
        
        checkDribbleSuccess();
    });
});

function checkDribbleSuccess() {
    const focoBonus = (player.foco - 50) / 10; 
    const totalChance = player.skill + focoBonus;
    const isSuccess = (Math.random() * 20) < totalChance;

    if (isSuccess) {
        successDribble();
    } else {
        failDribble("O ZAGUEIRO LEU SEU DRIBLE!");
    }
}

function successDribble() {
    DOM.dribbleQteIcon.innerText = '✅';
    DOM.dribbleResult.innerText = "QUE DRIBLE! FOI BUSCAR!";
    player.skill += 1; 
    player.fame += 5;
    player.foco -= 15;
    
    setTimeout(() => {
        DOM.dribbleOverlay.classList.add('hidden');
        selectChoice({ nextEvent: minigameCallback.onSuccessEvent });
    }, 1500);
}

function failDribble(message) {
    DOM.dribbleQteIcon.innerText = '❌';
    DOM.dribbleResult.innerText = message;
    player.chaos += 2;
    player.foco -= 10;
    
    setTimeout(() => {
        DOM.dribbleOverlay.classList.add('hidden');
        selectChoice({ nextEvent: minigameCallback.onFailEvent });
    }, 1500);
}


// --- FUNÇÕES DO INSTAVÁRZEA ---
DOM.socialButton.addEventListener('click', () => {
    renderSocialFeed();
    DOM.socialModal.showModal();
});
DOM.socialCloseBtn.addEventListener('click', () => {
    DOM.socialModal.close();
});

// Lógica do InstaVárzea (clicável)
function renderSocialFeed() {
    DOM.followerCountsDisplay.innerHTML = `
        <span>Você: <b id="p-followers">${player.followers}</b></span>
        <span>Amanda: <b id="a-followers">${NPCs.amanda.followers}</b></span>
        <span>Julinha: <b id="j-followers">${NPCs.julinha.followers}</b></span>
        <span>Mateus: <b id="m-followers">${NPCs.mateus.followers}</b></span>
        <span>Cauã: <b id="c-followers">${NPCs.caua.followers}</b></span>
    `; 

    DOM.socialFeedContent.innerHTML = '';

    if (socialFeedLog.length === 0) {
        DOM.socialFeedContent.innerHTML = "<p style='padding: 20px; text-align: center;'>Nada novo por aqui...</p>";
        return;
    }

    socialFeedLog.forEach(postId => {
        const postData = allSocialPosts[postId];
        if (postData) {
            const postAuthor = postData.author.replace(/\[playerName\]/g, player.name);
            const postBody = postData.body
                .replace(/\[playerName\]/g, player.name)
                .replace(/\[player.team\]/g, player.team)
                .replace(/\[playerPos\]/g, player.position);

            const postElement = document.createElement('div');
            postElement.className = 'social-post';

            const postHeader = document.createElement('div');
            postHeader.className = 'post-header';
            postHeader.innerHTML = `${postAuthor} <span>(clique para ver)</span>`;

            const postContentWrapper = document.createElement('div');
            postContentWrapper.className = 'post-content-wrapper hidden'; // Começa escondido
            postContentWrapper.innerHTML = `
                <div class="post-body">${postBody}</div>
                <div class="post-footer">${postData.likes} curtidas</div>
            `;

            postHeader.addEventListener('click', () => {
                postContentWrapper.classList.toggle('hidden');
            });

            postElement.appendChild(postHeader);
            postElement.appendChild(postContentWrapper);
            DOM.socialFeedContent.appendChild(postElement);
        }
    });
}

// --- FUNÇÕES DO MODAL DE CARREIRA ---
DOM.statsButton.addEventListener('click', () => {
    renderCareerStats();
    DOM.careerModal.showModal();
});
DOM.careerCloseBtn.addEventListener('click', () => {
    DOM.careerModal.close();
});

// Atualizado para incluir Stats do Interclasse
function renderCareerStats() {
    DOM.careerContent.innerHTML = `
        <h3>Estatísticas de ${player.name}</h3>
        <p>Time Atual: <strong>${player.team}</strong></p>
        
        <h4>🏆 Carreira na Várzea</h4>
        <ul>
            <li>Jogos Disputados: <strong>${player.gamesPlayed}</strong></li>
            <li>Gols: <strong>${player.goals}</strong></li>
            <li>Assistências: <strong>${player.assists}</strong></li>
            <li>Cartões Amarelos: <strong>${player.yellowCards}</strong></li>
            <li>Cartões Vermelhos: <strong>${player.redCards}</strong></li>
        </ul>
        <hr>
        <h4>🏆 Interclasse (${player.interclasse.teamName})</h4>
        <ul>
            <li>Jogos: <strong>${player.interclasse.games}</strong></li>
            <li>Gols: <strong>${player.interclasse.goals}</strong></li>
            <li>Assistências: <strong>${player.interclasse.assists}</strong></li>
        </ul>
    `;
}
