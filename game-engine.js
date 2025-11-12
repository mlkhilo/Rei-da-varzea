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
    metDjalma: false // Controle de loop da história
};

let NPCs = { 
    amanda: { followers: 4500, affinity: 0 },
    marcos: { followers: 150 },
    julinha: { followers: 2100, affinity: 0 },
    profCassia: { patience: 100 } 
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
    
    // Reset NPCs
    NPCs.amanda.followers = 4500;
    NPCs.amanda.affinity = 0;
    NPCs.marcos.followers = 150;
    NPCs.julinha.followers = 2100;
    NPCs.julinha.affinity = 0;
    NPCs.profCassia.patience = 100;
    
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

    // Checagem de Game Over da Professora Cássia
    if (NPCs.profCassia.patience <= 0) {
        showEvent('GAME_OVER_CASSIA');
        return;
    }

    const event = gameEvents[eventId];
    if (!event) { console.error(`Evento "${eventId}" não encontrado!`); return; }

    // Atualiza o texto substituindo placeholders
    const storyText = event.text
        .replace(/\[playerName\]/g, player.name)
        .replace(/\[player.age\]/g, player.age)
        .replace(/\[playerPos\]/g, player.position)
        .replace(/\[player.team\]/g, player.team)
        .replace(/\[profCassia.patience\]/g, NPCs.profCassia.patience);
    
    DOM.storyTextElement.innerText = storyText;
    DOM.choiceAreaElement.innerHTML = '';

    // Renderiza as escolhas
    event.choices.forEach(choice => {
        if (choice.condition && !choice.condition(player, NPCs)) {
            return; 
        }

        const button = document.createElement('button');
        button.classList.add('choice-button');
        button.innerText = choice.text;
        
        if (choice.minigame) {
            button.addEventListener('click', () => {
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
    // Desbloqueia posts nas redes sociais
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
    DOM.statFoco.innerText = player.foco;
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

function renderSocialFeed() {
    // 1. Atualiza contagem de seguidores
    DOM.followerCountsDisplay.innerHTML = `
        <span>Você: <b id="p-followers">${player.followers}</b></span>
        <span>Amanda: <b id="a-followers">${NPCs.amanda.followers}</b></span>
        <span>Marcos: <b id="m-followers">${NPCs.marcos.followers}</b></span>
        <span>Julinha: <b id="j-followers">${NPCs.julinha.followers}</b></span>
    `;

    // 2. Limpa o feed antigo
    DOM.socialFeedContent.innerHTML = '';

    // 3. Checa se há posts
    if (socialFeedLog.length === 0) {
        DOM.socialFeedContent.innerHTML = "<p style='padding: 20px; text-align: center;'>Nada novo por aqui...</p>";
        return;
    }

    // 4. Renderiza os posts desbloqueados
    socialFeedLog.forEach(postId => {
        const postData = allSocialPosts[postId];
        if (postData) {
            // Substitui placeholders nos posts
            const postBody = postData.body
                .replace(/\[playerName\]/g, player.name)
                .replace(/\[player.team\]/g, player.team);

            const postElement = document.createElement('div');
            postElement.className = 'social-post';
            postElement.innerHTML = `
                <div class="post-header">${postData.author}</div>
                <div class="post-body">${postBody}</div>
                <div class="post-footer">${postData.likes} curtidas</div>
            `;
            DOM.socialFeedContent.appendChild(postElement);
        }
    });
}


