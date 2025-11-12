// --- ELEMENTOS DO JOGO (DOM) ---
export const setupModal = document.getElementById('setup-modal');
export const setupForm = document.getElementById('setup-form');
export const gameContainer = document.getElementById('game-container');
export const storyTextElement = document.getElementById('story-text');
export const choiceAreaElement = document.getElementById('choice-area');
export const playerNameDisplay = document.getElementById('player-name-display');

// --- ELEMENTOS DO HUD (STATUS) ---
export const statSkill = document.getElementById('stat-skill');
export const statFame = document.getElementById('stat-fame');
export const statChaos = document.getElementById('stat-chaos');
export const statFocus = document.getElementById('stat-focus');
export const statMoney = document.getElementById('stat-money');
export const statFollowers = document.getElementById('stat-followers');

// --- ELEMENTOS DO MINI-GAME (PÊNALTI/FALTA) ---
export const minigameOverlay = document.getElementById('minigame-overlay');
export const minigameTitle = document.getElementById('minigame-title');
export const minigameResult = document.getElementById('minigame-result');
export const minigameWall = document.getElementById('wall');
export const minigameTargets = document.querySelectorAll('.target-spot');

// --- ELEMENTOS DO MINI-GAME (DRIBLE QTE) ---
export const dribbleOverlay = document.getElementById('dribble-overlay');
export const dribbleTitle = document.getElementById('dribble-title');
export const dribbleResult = document.getElementById('dribble-result');
export const dribbleQteIcon = document.getElementById('dribble-qte-icon');
export const dribbleButtons = document.querySelectorAll('.qte-dribble-btn'); 

// --- ELEMENTOS DO INSTAVÁRZEA ---
export const socialButton = document.getElementById('social-button');
export const socialModal = document.getElementById('social-modal');
export const socialCloseBtn = document.getElementById('social-close-btn');
export const followerCountsDisplay = document.getElementById('follower-counts');
export const socialFeedContent = document.getElementById('social-feed-content');

// --- ELEMENTOS DO MODAL DE CARREIRA ---
export const statsButton = document.getElementById('stats-button');
export const careerModal = document.getElementById('career-modal');
export const careerCloseBtn = document.getElementById('career-close-btn');
export const careerContent = document.getElementById('career-content');
