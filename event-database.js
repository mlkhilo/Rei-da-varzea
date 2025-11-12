// --- BANCO DE DADOS DE EVENTOS ---
export const gameEvents = {
    'START': {
        text: "É uma tarde de sábado quente em Itapetininga. Você, [playerName], [player.age] anos, está no campinho de terra batida do seu bairro. Você acabou de ser cortado do time da escola (o 'Derac' ou o 'EC Itapetininga' não te deram chance).\n\nSeu melhor amigo, Lucas Lino, senta ao seu lado.\n\n'E aí, [playerName]. Cabeça erguida. Ouvi dizer que o 'Varzeano de Itapetininga' e o 'Distrito de Gramadinho' vão começar. É a nossa chance!'",
        choices: [
            { text: "Estou cansado de sonhar, Lucas. Talvez eu deva arrumar um emprego.", nextEvent: 'GAME_OVER_DESISTE_CEDO' },
            { text: "É isso aí! Vamos pra cima. Qual a boa?", nextEvent: 'VARZEA_CHANCE_1' }
        ]
    },
    'GAME_OVER_DESISTE_CEDO': {
        text: "Você largou o futebol aos [player.age] anos. Nos 10 anos seguintes, você trabalhou na mesma empresa, se perguntando 'e se?'.",
        choices: [ { text: "Recomeçar", nextEvent: 'GAME_OVER' } ]
    },
    'VARZEA_CHANCE_1': {
        text: "Lucas sorri. 'É assim que se fala! O Campeonato do Distrito de Gramadinho (2ª Divisão) é o primeiro. Tem três times precisando de [playerPos]...' \n\n1. O Calcário EC: Time de quebrada, só noia. Dizem que o 'bicho' é alto, mas o ambiente é pesado.\n\n2. O Vila Nova AAA: Time da galera, não paga nada, mas é só diversão e churrasco.\n\n3. O Chef Chips FC: O time da empresa de batatinhas da cidade. Pagam uma 'ajuda de custo' (R$ 30) e são organizados. É a chance de ser visto.",
        choices: [
            { text: "Vou pelo desafio. Falar com o Calcário EC. (Alto Risco)", onSelect: (p) => { p.money += 20; p.chaos += 10; p.team = "Calcário EC"; }, nextEvent: 'TIME_CALCARIO' },
            { text: "Vou pela diversão. Falar com o Vila Nova AAA. (Sem Grana)", onSelect: (p) => { p.skill += 1; p.fame += 5; p.team = "Vila Nova AAA"; }, nextEvent: 'TIME_VILANOVA' },
            { text: "Vou pela organização. Falar com o Chef Chips FC. (Equilíbrio)", onSelect: (p) => { p.money += 5; p.skill += 1; p.team = "Chef Chips FC"; }, nextEvent: 'TIME_CHEF_CHIPS' }
        ]
    },
    'TIME_CALCARIO': {
        text: "Você fecha com o Calcário EC. O 'diretor' é um cara mal-encarado. 'Seja bem-vindo, [playerName]. Aqui é sem corpo mole. Se fizer gol, o bicho é R$ 100. Se perder... nem queira saber.'\n\nO ambiente é pesado, mas a grana é boa.",
        choices: [ { text: "Entendido. Foco no dinheiro.", nextEvent: 'JOGO_1_PREP' } ]
    },
    'TIME_VILANOVA': {
        text: "Você se junta ao Vila Nova AAA. O clima é de festa, churrasco e música alta. \n\n'E aí, [playerName]! Pega uma cerveja! O jogo é domingo contra o Jamaica Itape. Se a gente ganhar, ótimo. Se perder, tem churrasco igual!'\n\nVocê se sente em casa.",
        choices: [ { text: "Estou pronto!", nextEvent: 'JOGO_1_PREP' } ]
    },
    'TIME_CHEF_CHIPS': { 
        text: "Você fecha com o Chef Chips FC. O técnico é o gerente da fábrica de batatinhas. 'Bem-vindo, [playerName]! O dono gosta de futebol bonito. Sua ajuda de custo é R$ 30 e um saco de batata chips por semana.'\n\nÉ um time sério, mas sem a pressão da 'quebrada'.",
        choices: [ { text: "Obrigado pela oportunidade!", nextEvent: 'JOGO_1_PREP' } ]
    },
    'JOGO_1_PREP': {
        text: "Você passou a semana pensando no jogo de estreia pelo [player.team]. A noite antes do jogo é crucial para seu descanso.",
        choices: [
            { text: "Dormir cedo e focar 100%.", onSelect: (p) => { p.skill += 1; p.foco += 30; }, nextEvent: 'JOGO_1_EVENTO' }, // REBALANCEADO
            { text: "Ficar vendo vídeos de dribles no YouTube até 3h da manhã.", onSelect: (p) => { p.chaos += 3; p.foco -= 20; }, nextEvent: 'JOGO_1_EVENTO' }
        ]
    },
    'JOGO_1_EVENTO': {
        text: "Jogo de estreia no Gramadinho. O campo é de terra, a bola é pesada. Você está nervoso. Placar 0 a 0, 70 minutos. Você recebe a bola na ponta. O zagueiro vem seco.",
        choices: [
            { text: "Obedecer o técnico e tocar de lado. (Seguro)", onSelect: (p) => { p.chaos -= 1; }, nextEvent: 'RESULTADO_JOGO_1_EMPATE' },
            { text: "Ignorar. Tentar o drible e o chute. (Ousadia)", onSelect: (p) => { p.chaos += 5; if (Math.random() > 0.5) { p.skill += 2; p.fame += 10; } else { p.fame -= 5; } }, nextEvent: 'RESULTADO_JOGO_1_OUSADIA' }
        ]
    },
    'RESULTADO_JOGO_1_EMPATE': {
        text: "O jogo termina empatado. Você jogou o simples. A torcida do [player.team] te aplaude pela segurança (ou te vaia pela falta de ousadia).\n\nVida que segue.",
        choices: [ { text: "Próxima semana...", nextEvent: 'EVENTO_OFF_FIELD_1' } ]
    },
    'RESULTADO_JOGO_1_OUSADIA': {
        text: "Você tentou o drible! A torcida foi ao delírio (ou te vaiou). Mesmo que o chute tenha ido para fora, seu nome já está na boca da galera.\n\n'Quem é aquele [playerPos] abusado do [player.team]?'",
        choices: [ { text: "Próxima semana...", nextEvent: 'EVENTO_OFF_FIELD_1' } ]
    },
    'EVENTO_OFF_FIELD_1': {
        text: "É quinta-feira à noite. Você está em casa, seus pais rígidos estão na sala. Seu celular vibra. É uma mensagem de 'Amanda Carolina', a influencer (4.5k seguidores) mais gata do Ensino Médio.\n\n'Festinha particular aqui em casa. Meus pais não estão. Só vem. 😉'",
        choices: [
            { text: "Ir para a festa. (Risco/Caos)", onSelect: (p, N) => { p.chaos += 10; p.fame += 5; p.foco -= 30; N.amanda.affinity += 10; }, unlocksPost: 'post_amanda_festa', nextEvent: 'FESTA_AMANDA_1' },
            { text: "Ficar em casa. (Disciplina)", onSelect: (p) => { p.skill += 1; p.foco += 20; }, nextEvent: 'CASA_DISCIPLINA_1' } // REBALANCEADO
        ]
    },
    'FESTA_AMANDA_1': {
        text: "Você pula a janela e vai para a festa. A música está alta. Amanda te oferece um copo de 'líquido suspeito'.\n\n'Que bom que você veio, [playerName]! Você é o [playerPos] do [player.team], né? Famoso!'",
        choices: [
            { text: "Beber e curtir a festa. (Caos)", onSelect: (p, N) => { p.chaos += 10; p.fame += 5; p.followers += 50; p.foco -= 20; N.amanda.affinity += 5; }, nextEvent: 'ESCOLA_SEGUNDA' },
            { text: "Conversar sobre futebol e tentar um 'networking'. (Fama)", onSelect: (p, N) => { p.fame += 10; p.followers += 100; NPCs.amanda.followers += 100; p.foco -= 10; N.amanda.affinity += 15; }, nextEvent: 'ESCOLA_SEGUNDA' }
        ]
    },
    'CASA_DISCIPLINA_1': {
        text: "Você avisa Amanda que não pode ir. Seus pais te dão 'boa noite'. Você está sozinho no seu quarto, focado.",
        choices: [
            { text: "Vou chutar bola no muro do quintal. (Físico)", onSelect: (p) => { p.skill += 1; p.foco += 15; }, nextEvent: 'ESCOLA_SEGUNDA' }, // REBALANCEADO
            { text: "Vou ver vídeos de tática do [playerPos]. (Inteligência)", onSelect: (p) => { p.skill += 2; p.foco += 20; }, nextEvent: 'ESCOLA_SEGUNDA' } // REBALANCEADO
        ]
    },
    'ESCOLA_SEGUNDA': {
        text: "Segunda-feira na escola (ETEC). Sua fama (ou falta dela) te precede.\n\n(O que acontece depende das suas escolhas...)",
        choices: [
            { text: "Amanda pisca para você no corredor.", condition: (p, N) => N.amanda.affinity > 10, nextEvent: 'ESCOLA_INVEJA_1' },
            { text: "Você se sente descansado e focado na aula.", condition: (p) => p.foco > 80, nextEvent: 'ESCOLA_INVEJA_1' },
            { text: "Matar aula para ir treinar no campinho.", onSelect: (p, N) => { p.skill += 1; p.chaos += 5; p.foco -= 10; N.profCassia.patience -= 15; }, nextEvent: 'TREINO_SEMANA' },
            { text: "Focar nos estudos por hoje.", onSelect: (p, N) => { p.foco += 15; N.profCassia.patience += 5; }, nextEvent: 'TREINO_SEMANA' }, // REBALANCEADO
            { text: "Amanda te chama para 'dar uma volta'...", condition: (p, N) => N.amanda.affinity > 5, nextEvent: 'ESCOLA_MATAR_AULA' }
        ]
    },
    'ESCOLA_MATAR_AULA': {
        text: "Segunda-feira de manhã. A aula de Geografia é um tédio. Amanda Carolina te manda uma mensagem: 'Me encontra na porta de trás da ETEC em 5 minutos. Vamos no Shopping comer açaí e matar essa aula chata. 😉'",
        choices: [
            { 
                text: "Ir com Amanda. (Risco/Caos)", 
                onSelect: (p, N) => { p.chaos += 10; p.fame += 10; p.money -= 10; p.followers += 50; p.foco -= 20; N.profCassia.patience -= 20; N.amanda.affinity += 10; }, 
                unlocksPost: 'post_matar_aula_amanda',
                nextEvent: 'TREINO_SEMANA' 
            },
            { 
                text: "Ficar na aula. (Disciplina)", 
                onSelect: (p) => { p.skill += 1; p.foco += 20; }, // REBALANCEADO
                nextEvent: 'TREINO_SEMANA' 
            }
        ]
    },
    'ESCOLA_INVEJA_1': {
        text: "No intervalo, o capitão do time da escola (que te cortou) te barra. 'E aí, [playerName]? Tá se achando a estrela da várzea? Você é só um [playerPos] de terrão. Nunca vai ser profissional.'\n\nA galera toda, inclusive Amanda, está olhando.",
        choices: [
            { text: "Rir e dizer: 'O terrão paga mais que seu banco na escola.' (Fama)", onSelect: (p) => { p.fame += 5; }, nextEvent: 'TREINO_SEMANA' },
            { text: "Ignorar e sair andando. (Disciplina)", onSelect: (p) => { p.foco += 10; }, nextEvent: 'TREINO_SEMANA' }, // REBALANCEADO
            { text: "Peitar ele. 'Melhor que você eu sou, por isso tá com inveja.' (Caos)", onSelect: (p) => { p.chaos += 5; p.foco -= 5; }, nextEvent: 'TREINO_SEMANA' }
        ]
    },
    'TREINO_SEMANA': {
        text: "Terça-feira, treino do [player.team]. O técnico está irritado. 'Vamos lá, seus pernas de pau! Hoje é treino físico!'\n\nVocê odeia treino físico.",
        choices: [
            { text: "Dar 110% e impressionar o técnico. (Disciplina)", onSelect: (p) => { p.skill += 2; p.foco -= 10; }, nextEvent: 'TREINO_RIVAL_INTRO' },
            { text: "Fazer 'corpo mole' e guardar energia para o drible.", onSelect: (p) => { p.chaos += 2; }, nextEvent: 'TREINO_RIVAL_INTRO' },
            { text: "Pedir para fazer um treino de drible. (Teste de Habilidade)", 
                minigame: { type: 'dribble', onSuccess: 'TREINO_RIVAL_INTRO', onFail: 'TREINO_RIVAL_INTRO' }
            }
        ]
    },
    'TREINO_RIVAL_INTRO': {
        text: "No meio do treino, um cara novo aparece. Seu amigo Lucas cochicha: 'Esse é o Marcos, centroavante do CAI. Ele veio ver o treino do rival.'\n\nMarcos te encara e ri.\n\n'Então esse é o [playerName], o [playerPos] 'famosinho'?'",
        choices: [
            { text: "Ignorar e continuar treinando. (Foco)", nextEvent: 'JOGO_2_PREP' },
            { text: "Encarar de volta. 'Famosinho que vai meter gol em você.' (Caos)", onSelect: (p) => { p.chaos += 5; p.fame += 5; p.foco -= 5; }, nextEvent: 'JOGO_2_PREP' }
        ]
    },
    'JOGO_2_PREP': {
        text: "O técnico do [player.team] viu o Marcos (do CAI) espionando o treino. 'Moleque abusado!'\n\nO próximo jogo é contra eles, o CAI. É o clássico do Gramadinho.\n\n'Seguinte, [playerName]', diz o técnico, 'o Marcos é forte, mas lento. Qual vai ser o plano?'",
        choices: [
            { text: "Vou jogar na velocidade e cansar ele. (Tática)", onSelect: (p) => { p.skill += 1; }, nextEvent: 'JOGO_2_EVENTO_RIVAL' },
            { text: "Vou pra cima dele no drible e na provocação. (Caos)", onSelect: (p) => { p.chaos += 5; }, nextEvent: 'JOGO_2_EVENTO_RIVAL' }
        ]
    },
    'JOGO_2_EVENTO_RIVAL': {
        text: "O Jogo: [player.team] vs. CAI. O campo está lotado. Marcos não para de te provocar. 'Vim te buscar, [playerPos] de festa!'\n\nO jogo está 1 a 1, 85 minutos. Você recebe a bola. Marcos vem na sua direção para dar o bote.",
        choices: [
            {
                text: "Driblar o Marcos (Caneta/Lençol). (Ousadia Pura)",
                onSelect: (p) => { p.fame += 10; p.chaos += 10; p.followers += 1000; NPCs.marcos.followers += 50; if (p.skill > p.chaos) { p.skill += 3; } },
                unlocksPost: 'post_drible_marcos',
                minigame: { type: 'dribble', onSuccess: 'JOGO_2_RESULTADO_VITORIA_DRIBLE', onFail: 'JOGO_2_RESULTADO_FALHA_DRIBLE' } 
            },
            { text: "Proteger a bola e tocar rápido. (Profissional)", onSelect: (p) => { p.skill += 2; }, nextEvent: 'JOGO_2_RESULTADO_EMPATE' },
            { text: "Forçar uma falta dura dele. (Malícia)", onSelect: (p) => { p.chaos += 5; }, nextEvent: 'JOGO_2_RESULTADO_FALTA' }
        ]
    },
    'JOGO_2_RESULTADO_VITORIA_DRIBLE': {
        text: "Você deu um drible humilhante no Marcos! A torcida do [player.team] explode! Você avança e chuta no ângulo. GOLAÇO!\n\nSeu time vence por 2 a 1. Você é o herói. Marcos sai de campo xingando.",
        choices: [ { text: "Comemorar!", unlocksPost: 'post_marcos_revidando', nextEvent: 'EVENTO_OFF_FIELD_2_FAMA' } ]
    },
    'JOGO_2_RESULTADO_FALHA_DRIBLE': {
        text: "Você tentou o drible, mas Marcos foi mais rápido e tomou a bola. A torcida do CAI te vaia. O jogo termina 1 a 1.",
        choices: [ { text: "Ir para o vestiário.", nextEvent: 'EVENTO_OFF_FIELD_2_NORMAL' } ]
    },
    'JOGO_2_RESULTADO_EMPATE': {
        text: "Você toca a bola com inteligência. O jogo termina 1 a 1. Foi um jogo duro. Você não brilhou, mas jogou sério. Marcos te cumprimenta com respeito forçado.",
        choices: [ { text: "Ir para o vestiário.", nextEvent: 'EVENTO_OFF_FIELD_2_NORMAL' } ]
    },
    'JOGO_2_RESULTADO_FALTA': {
        text: "Você usa o corpo e Marcos te acerta com violência. O juiz marca a falta e expulsa Marcos! Você ganha a vantagem, mas o jogo termina 1 a 1.\n\nVocê ganhou na malícia, mas não no talento.",
        choices: [ { text: "Levantar e provocar.", nextEvent: 'EVENTO_OFF_FIELD_2_BRIGA' } ]
    },
    
    'EVENTO_OFF_FIELD_2_FAMA': {
        text: "Seu golaço e o drible em Marcos viralizaram no 'InstaVárzea'. Você ganhou 1000 seguidores.\n\nVocê recebe uma DM de um perfil chamado 'Djalma Freitas - Gestão Esportiva'.\n\n'Garoto, vi seu vídeo. Você tem o drible, mas falta cabeça. Me encontra no posto (Posto Ipiranga do centro) amanhã. Posso te tirar dessa terra.'",
        choices: [
            { text: "Ignorar. Deve ser golpe. (Segurança)", nextEvent: 'JOGOTREINO_SARAPUI' }, 
            { text: "É a minha chance! Ir ao encontro. (Risco)", onSelect: (p) => { p.fame += 5; p.chaos += 5; p.metDjalma = true; }, unlocksPost: 'post_djalma_olheiro', nextEvent: 'ENCONTRO_DJALMA_1' }, // Seta metDjalma
            { text: "Ignorar Djalma e checar uma DM de 'Julinha (Bala de Prata)'", condition: (p) => p.fame > 15, nextEvent: 'ENCONTRO_JULINHA_1' }
        ]
    },
    'EVENTO_OFF_FIELD_2_BRIGA': {
        text: "Marcos te espera na saída do vestiário. 'Você é um covarde, [playerName]! Só sabe cair e chorar!'\n\nA galera do [player.team] se aproxima para ver a briga.",
        choices: [
            {
                text: "Partir para a briga física. (Caos Total)",
                onSelect: (p, N) => { p.chaos += 20; p.fame -= 10; p.skill -= 1; p.followers -= 50; NPCs.marcos.followers += 50; N.profCassia.patience -= 30; }, 
                unlocksPost: 'post_briga_marcos',
                nextEvent: 'BRIGA_VESTIARIO_RESULTADO'
            },
            {
                text: "Responder: 'Resolvi no campo, otário.' (Fama)",
                onSelect: (p) => { p.fame += 5; },
                nextEvent: 'JOGOTREINO_SARAPUI' 
            }
        ]
    },
    'EVENTO_OFF_FIELD_2_NORMAL': {
        text: "Mais uma semana normal. Você jogou bem, mas não o suficiente para chamar atenção. O campeonato continua. Você precisa de mais.",
        choices: [
            { text: "Próximo treino...", nextEvent: 'JOGOTREINO_SARAPUI' } 
        ]
    },
    'ENCONTRO_JULINHA_1': {
        text: "Você ignora a DM do olheiro e abre a da 'Julinha (Bala de Prata)', a torcedora-símbolo do time rival da 1ª Divisão. Ela é rival da Amanda.\n\n'E aí, [playerName]? Vi que você é famosinho aqui no Gramadinho. Mas será que aguenta a 1ª Divisão? Me encontra no Açaí do Centro.'",
        choices: [
            { text: "Ir ao encontro. (Fama/Caos)", onSelect: (p, N) => { p.fame += 10; p.chaos += 5; N.julinha.affinity += 10; }, unlocksPost: 'post_julinha_encontro', nextEvent: 'ENCONTRO_JULINHA_2' },
            { text: "Ignorar. Focar no meu time.", nextEvent: 'JOGOTREINO_SARAPUI' }
        ]
    },
    'ENCONTRO_JULINHA_2': {
        text: "Julinha é marrenta. 'Pensei que você era maior. Enfim, ouvi dizer que o Djalma tá de olho em você. Cuidado, ele só quer seu dinheiro. Se quiser fama DE VERDADE, cola comigo.'",
        choices: [
            { text: "Obrigado pela dica... (Sair)", nextEvent: 'JOGOTREINO_SARAPUI' },
            { text: "E o que você sugere? (Fama)", onSelect: (p) => { p.fame += 5; }, nextEvent: 'JOGOTREINO_SARAPUI' }
        ]
    },
    
    'BRIGA_VESTIARIO_RESULTADO': {
        text: "Vocês saíram na porrada. A 'Rádio Várzea' filmou tudo. Você foi banido por 2 jogos e perdeu o respeito do técnico.\n\nSeu nível de Caos está perigosamente alto.",
        choices: [
            { text: "Péssimo. (Pular 2 jogos)", nextEvent: 'JOGO_5_PREP' } 
        ]
    },

    // --- ROTA B (DJALMA / 1ª DIVISÃO) ---
    'ENCONTRO_DJALMA_1': {
        text: "Você vai ao Posto. Um homem mais velho, de camisa polo e óculos escuros, te analisa. 'Djalma Freitas. Você é o [playerName], [playerPos].'\n\n'Você joga no [player.team], que é um lixo. Mas você tem talento. Eu quero te levar para a 'Copinha' (Copa São Paulo) no ano que vem. Mas você tem que jogar o Varzeano da 1ª Divisão.'",
        choices: [
            { text: "Como assim? Eu tô na 2ª Divisão.", nextEvent: 'ENCONTRO_DJALMA_2' },
            { text: "Eu não confio em você. Vou seguir meu caminho.", nextEvent: 'JOGOTREINO_SARAPUI' } 
        ]
    },
    'ENCONTRO_DJALMA_2': {
        text: "Djalma ri. 'Exato. O CEMA (Campeão da 1ª Divisão) precisa de um [playerPos] para a final do Municipal contra o Nova Baixada. O jogo é daqui 3 semanas. Eles vão te pagar R$ 500 pela final.'\n\n'Se você aceitar, você abandona o [player.team] e o Gramadinho. Se você recusar, eu sumo.'",
        choices: [
            {
                text: "Aceitar! Abandonar o [player.team] e ir para o CEMA. (Traição/Oportunidade)",
                onSelect: (p) => { p.team = "CEMA (1ª Div)"; p.chaos += 15; p.fame += 20; p.followers += 200; p.money += 100; },
                unlocksPost: 'post_traicao_cema',
                nextEvent: 'MUDANCA_TIME_CEMA'
            },
            {
                text: "Recusar. Vou subir com meu time atual. (Lealdade)",
                onSelect: (p) => { p.skill += 2; },
                nextEvent: 'JOGOTREINO_SARAPUI' 
            }
        ]
    },
    'MUDANCA_TIME_CEMA': {
        text: "Você avisa seu time antigo. Eles te chamam de traidor e mercenário. Lucas Lino fica decepcionado.\n\nMas você não liga. Você está treinando com o CEMA, o melhor time da cidade, e vai jogar a final do Varzeano 1ª Divisão.",
        choices: [
            { text: "Se preparar para a final...", nextEvent: 'FINAL_VARZEANO_PREP' }
        ]
    },
    'FINAL_VARZEANO_PREP': {
        text: "O treino no CEMA é outro nível. Os caras são 'caninana' (cascudos). Você é o novato. O técnico te avisa: 'Você é o [playerPos] que o Djalma trouxe. Não me decepcione contra o Nova Baixada. É final única.'\n\nA pressão é absurda.",
        choices: [
            { text: "Vou focar 100% e treinar em dobro.", onSelect: (p) => { p.skill += 3; p.foco += 20; }, nextEvent: 'FINAL_VARZEANO_EVENTO' }, // REBALANCEADO
            { text: "Vou na festa da Amanda (ela ouviu da sua fama).", onSelect: (p, N) => { p.chaos += 10; p.fame += 10; p.foco -= 20; N.amanda.affinity += 5; }, nextEvent: 'FINAL_VARZEANO_EVENTO' }
        ]
    },
    'FINAL_VARZEANO_EVENTO': {
        text: "FINAL DA 1ª DIVISÃO: CEMA vs. Nova Baixada. O estádio (DERAC) está lotado. Djalma está na tribuna.\n\nJogo 0 a 0, 88 minutos. Você recebe a bola na entrada da área. O zagueiro vem babando.",
        choices: [
            { text: "Chutar de bico no canto. (Raiz)", onSelect: (p) => { p.skill += 1; }, minigame: { type: 'penalty', onSuccess: 'FINAL_VARZEANO_SUCESSO', onFail: 'DJALMA_SEM_GRANA' } },
            { text: "Tentar um drible humilhante (Caos)", onSelect: (p) => { p.chaos += 5; p.fame += 5; }, minigame: { type: 'dribble', onSuccess: 'FINAL_VARZEANO_SUCESSO', onFail: 'DJALMA_SEM_GRANA' } }
        ]
    },
    'FINAL_VARZEANO_SUCESSO': {
        text: "GOOOOL! Você é o herói do CEMA! A torcida invade o campo! Djalma te aplaude.",
        choices: [
            { text: "Comemorar o título!", unlocksPost: 'post_final_cema_campeao', nextEvent: 'ENCONTRO_DJALMA_COPINHA' }
        ]
    },
    'ENCONTRO_DJALMA_COPINHA': {
        text: "Depois da festa do título, Djalma te chama. 'Parabéns, [playerName]. Você tem estrela. Consegui um teste para você no CAT (Taboão da Serra) para a Copinha. Mas tem um custo...'\n\n'Preciso de R$ 1000 para a inscrição e despesas. E claro, 30% da sua alma (contrato).'",
        choices: [
            { text: "R$ 1000? Eu não tenho isso! (Você tem R$ [player.money])", condition: (p) => p.money < 1000, nextEvent: 'DJALMA_SEM_GRANA' },
            { text: "Topar! Aqui está o dinheiro. (Pagar R$ 1000)", onSelect: (p) => { p.money -= 1000; }, condition: (p) => p.money >= 1000, nextEvent: 'SUCESSO_COPINHA' }
        ]
    },
    'DJALMA_SEM_GRANA': {
        text: "Djalma balança a cabeça. 'Sem dinheiro, sem Copinha. O mundo profissional é assim, garoto. Me procure quando tiver a grana.'\n\nEle te deixa no vácuo. Você é o herói da várzea, mas sua chance sumiu.",
        choices: [
            { text: "Droga... (Voltar para a Várzea)", nextEvent: 'JOGOTREINO_SARAPUI' } 
        ]
    },
    'SUCESSO_COPINHA': {
        text: "Djalma sorri. 'Bem-vindo ao futebol profissional, [playerName]. Você vai sair de Itapetininga.'\n\nCONTINUA...",
        choices: [
            { text: "(Próximo Capítulo...)", nextEvent: 'START' } // Reinicia por enquanto
        ]
    },

    // --- ROTA A (LEALDADE / 2ª DIVISÃO) ---
    'JOGOTREINO_SARAPUI': {
        text: "Seu time ([player.team]) conseguiu um jogo-treino contra o **Meninos da Vila de Sarapuí**, um time respeitado da várzea vizinha, conhecido pela marcação dura. O jogo é uma vitrine para o resto do campeonato.",
        choices: [
            { 
                text: "Jogar sério e tentar o passe decisivo. (Profissional)", 
                onSelect: (p) => { p.skill += 1; }, 
                nextEvent: 'JOGOTREINO_SARAPUI_EVENTO' 
            },
            { 
                text: "Ir para o drible e humilhar os rivais. (Caos)", 
                onSelect: (p) => { p.chaos += 5; }, 
                nextEvent: 'JOGOTREINO_SARAPUI_EVENTO' 
            }
        ]
    },
    'JOGOTREINO_SARAPUI_EVENTO': {
        text: "O jogo está pegado. Você recebe a bola a 30 metros do gol. O zagueiro deles (um tal de Pé-de-Pano) já te avisou: 'Passou de mim, eu te quebro!' Você tem uma falta perigosa a seu favor.",
        choices: [
            { 
                text: "Bater a falta diretamente no ângulo! (Teste de Habilidade)", 
                minigame: { type: 'freekick', onSuccess: 'JOGOTREINO_SARAPUI_SUCESSO', onFail: 'JOGOTREINO_SARAPUI_FALHA' }
            },
            { 
                text: "Tocar para o companheiro e evitar confusão. (Seguro)", 
                onSelect: (p) => { p.chaos -= 2; }, 
                nextEvent: 'JOGOTREINO_SARAPUI_FALHA' 
            }
        ]
    },
    'JOGOTREINO_SARAPUI_SUCESSO': {
        text: "GOLAÇO DE FALTA! A bola explode na rede! O time de Sarapuí fica revoltado, mas você calou a boca deles. O pessoal do InstaVárzea filma tudo!",
        choices: [
            { text: "Vitória moral!", onSelect: (p) => { p.fame += 10; p.followers += 500; p.money += 30; }, nextEvent: 'ESCOLA_CHECK_CASSIA' }
        ]
    },
    'JOGOTREINO_SARAPUI_FALHA': {
        text: "A falta vai para fora/na barreira. Pé-de-Pano ri. O jogo termina empatado sem gols. Você não brilhou, mas saiu ileso.",
        choices: [
            { text: "Melhorar para o próximo jogo.", nextEvent: 'ESCOLA_CHECK_CASSIA' }
        ]
    },

    // --- (NOVOS EVENTOS DA PROFESSORA CÁSSIA E JULINHA) ---
    'ESCOLA_CHECK_CASSIA': {
        text: "De volta à ETEC. A Professora Cássia está de olho em você.",
        choices: [
            { text: "Ir para a próxima aula...", nextEvent: 'JOGO_3_PREP' },
            { text: "Professora Cássia te chama. (PROBLEMA!)", 
              condition: (p, N) => N.profCassia.patience <= 40, 
              nextEvent: 'ESCOLA_PROBLEMA_CASSIA' 
            },
            { text: "Professora Cássia te elogia? (RARO!)", 
              condition: (p, N) => N.profCassia.patience >= 90 && p.foco > 70, 
              nextEvent: 'ESCOLA_CASSIA_ELOGIO' 
            }
        ]
    },
     'ESCOLA_PROBLEMA_CASSIA': {
        text: "Você chega na aula de História. A Professora Cássia te para na porta.\n\n'[playerName], suas notas estão um desastre e sua paciência comigo está em [profCassia.patience]. Se você não melhorar, vou ligar para seus pais e você vai parar com essa história de futebol.'",
        choices: [
            { text: "Desculpe, professora. Vou focar mais.", onSelect: (p, N) => { p.foco += 20; N.profCassia.patience += 10; }, nextEvent: 'JOGO_3_PREP' }, // REBALANCEADO
            { text: "Tenho que treinar. (Caos)", onSelect: (p, N) => { p.chaos += 5; p.foco -= 5; N.profCassia.patience -= 20; }, nextEvent: 'JOGO_3_PREP' },
            { text: "Pedir ajuda e um trabalho extra. (Custo)", onSelect: (p, N) => { p.money -= 20; N.profCassia.patience += 30; }, condition: (p) => p.money >= 20, nextEvent: 'JOGO_3_PREP' }
        ]
    },
    'GAME_OVER_CASSIA': { // NOVO EVENTO
        text: "A Professora Cássia ligou para seus pais. Eles viram suas notas, suas faltas e as postagens no InstaVárzea. 'CHEGA!', disse seu pai. 'Você está de castigo. Sem futebol até o fim do ano.'\n\nVocê foi reprovado e perdeu sua chance.",
        choices: [
            { text: "Recomeçar", nextEvent: 'GAME_OVER' } 
        ]
    },
    'ESCOLA_CASSIA_ELOGIO': { // NOVO EVENTO
        text: "A Professora Cássia te para no corredor. 'Parabéns, [playerName]. Mesmo com a fama no futebol, você manteve o foco nos estudos. Estou impressionada.'\n\nEla te elogia na frente de outros alunos.",
        choices: [
            { text: "Obrigado, professora!", onSelect: (p) => { p.fame += 5; p.foco += 20; }, nextEvent: 'JOGO_3_PREP' }
        ]
    },

    'JOGO_3_PREP': {
        text: "Você continua no [player.team]. O próximo jogo é contra o Boche FC (da 2ª Divisão), um time muito sujo e violento. A pressão é alta para classificar.",
        choices: [
            { text: "Vamos pra cima!", nextEvent: 'JOGO_3_EVENTO' },
            { text: "Sua chuteira rasgou. Precisa de uma nova.", condition: (p) => p.money < 50, nextEvent: 'EVENTO_DINHEIRO_CHUTEIRA' }
        ]
    },
    'EVENTO_DINHEIRO_CHUTEIRA': { // NOVO EVENTO
        text: "No treino, sua única chuteira rasga. Você tem R$ [player.money]. Uma chuteira nova, decente, custa R$ 50.",
        choices: [
            { text: "Comprar a chuteira. (Gastar R$ 50)", onSelect: (p) => { p.money -= 50; p.skill += 1; }, condition: (p) => p.money >= 50, nextEvent: 'JOGO_3_EVENTO' },
            { text: "Pedir emprestado para o Lucas. (Caos)", onSelect: (p) => { p.chaos += 5; }, nextEvent: 'JOGO_3_EVENTO' },
            { text: "Jogar com ela rasgada mesmo. (Risco)", onSelect: (p) => { p.chaos += 10; p.skill -= 1; }, nextEvent: 'JOGO_3_EVENTO' }
        ]
    },
    'JOGO_3_EVENTO': {
        text: "Jogo contra o Boche FC. Como esperado, é uma guerra. Aos 90 minutos, 0 a 0, você sofre uma falta criminosa dentro da área. É PÊNALTI!",
        choices: [
            {
                text: "Pedir para bater o pênalti. (Pressão Máxima)",
                minigame: { type: 'penalty', onSuccess: 'JOGO_3_VITORIA_PENALTI', onFail: 'JOGO_3_DERROTA_PENALTI' }
            },
            { text: "Deixar o capitão bater. (Seguro)", onSelect: (p) => { p.chaos -= 2; }, nextEvent: 'JOGO_3_DERROTA_PENALTI' }
        ]
    },
    'JOGO_3_VITORIA_PENALTI': {
        text: "GOOOL! Você bateu com categoria! O [player.team] vence por 1 a 0 no último minuto! Você é o herói de novo! A classificação para a semifinal está próxima!",
        choices: [
            { text: "Próxima fase!", onSelect: (p) => { p.fame += 10; p.followers += 200; }, nextEvent: 'ESCOLA_INVEJA_2' }
        ]
    },
    'JOGO_3_DERROTA_PENALTI': {
        text: "ERROU! Você (ou o capitão) bateu na trave! O Boche FC comemora como se fosse um título. O jogo termina 0 a 0 e a culpa cai em você.\n\nSeu 'Caos' aumenta.",
        choices: [
            { text: "Assumir a culpa.", onSelect: (p) => { p.chaos += 5; p.followers -= 20; }, nextEvent: 'ESCOLA_INVEJA_2' }
        ]
    },
    'ESCOLA_INVEJA_2': {
        text: "Depois da sua atuação no Jogo 3 (seja o gol de pênalti ou o erro), sua fama na escola explode. Amanda Carolina agora te chama de 'Meu Jogador'.\n\nJulinha posta uma indireta no InstaVárzea: '#muitafama #poucotreino'",
        choices: [
            { text: "Continuar a jornada...", unlocksPost: 'post_julinha_provoca_1', nextEvent: 'ESCOLA_JULINHA_PROVOCA' } // Leva para a provocação da Julinha
        ]
    },
    'ESCOLA_JULINHA_PROVOCA': { // NOVO EVENTO
        text: "Você está no corredor da ETEC. Julinha (Bala de Prata) te para na frente de todos. 'E aí, [playerName]? Cuidado pra Amanda não te prender na coleira. Ouvi dizer que ela gosta de 'jogador' obediente.'",
        choices: [
            { text: "Defender Amanda: 'Ela é minha garota.'", onSelect: (p, N) => { N.amanda.affinity += 10; N.julinha.affinity -= 10; }, nextEvent: 'JOGO_4_PREP' },
            { text: "Flertar com Julinha: 'E você, gosta de que tipo?'", onSelect: (p, N) => { p.chaos += 10; N.julinha.affinity += 15; N.amanda.affinity -= 10; }, nextEvent: 'ROLO_JULINHA_1' }, // Começa o rolo
            { text: "Ignorar as duas e ir para a aula.", onSelect: (p) => { p.foco += 10; }, nextEvent: 'JOGO_4_PREP' }
        ]
    },
    'ROLO_JULINHA_1': { // NOVO EVENTO
        text: "Julinha ri. 'Gosto dos que não têm dona.' Ela te manda uma DM mais tarde: 'Sábado à noite, Praça do Coreto. Sozinho. Vamos ver se você é tão bom fora do campo.'",
        choices: [
            { text: "Ir ao encontro de Julinha. (Caos)", onSelect: (p, N) => { p.chaos += 15; p.fame += 10; N.julinha.affinity += 10; p.foco -= 20; }, unlocksPost: 'post_julinha_flerte', nextEvent: 'AMANDA_CONFRONTO_JULINHA' },
            { text: "Ignorar. Tenho treino no domingo.", onSelect: (p, N) => { p.foco += 20; N.julinha.affinity -= 10; }, nextEvent: 'JOGO_4_PREP' }
        ]
    },
    'AMANDA_CONFRONTO_JULINHA': { // NOVO EVENTO
        text: "Amanda viu o post da Julinha. Ela te encontra na escola, furiosa. 'O que significa aquele post da [playerName] na praça, [playerName]? Você tá de rolo com aquela torcedora de time de segunda?'",
        choices: [
            { text: "Mentir: 'Ela é louca. Só falei de futebol.'", onSelect: (p, N) => { p.chaos += 5; N.amanda.affinity -= 5; }, nextEvent: 'JOGO_4_PREP' },
            { text: "Assumir: 'A gente só conversou. Você não é minha dona.'", onSelect: (p, N) => { p.chaos += 20; N.amanda.affinity -= 30; N.julinha.affinity += 10; }, unlocksPost: 'post_amanda_ciumes', nextEvent: 'JOGO_4_PREP' },
            { text: "Culpar Julinha: 'Ela tá inventando pra ganhar fama.'", onSelect: (p, N) => { N.amanda.affinity += 5; N.julinha.affinity -= 20; }, nextEvent: 'JOGO_4_PREP' }
        ]
    },

    'JOGO_4_PREP': {
        text: "É a SEMIFINAL do Gramadinho! O [player.team] contra o Desportivo 4L. O técnico está nervoso.\n\n'Eles jogam no 'chuveirinho' (bola aérea). [playerName], preciso que você ajude na marcação, mesmo sendo [playerPos].'",
        choices: [
            { text: "Ok, técnico. Vou me sacrificar pelo time.", onSelect: (p) => { p.skill += 1; p.chaos -= 5; p.foco += 15; }, nextEvent: 'JOGO_4_EVENTO' }, // REBALANCEADO
            { text: "Técnico, eu sou [playerPos], meu negócio é gol. (Caos)", onSelect: (p) => { p.chaos += 5; p.foco -= 5; }, nextEvent: 'JOGO_4_EVENTO' },
            { text: "Julinha está na torcida te secando.", condition: (p, N) => N.julinha.affinity > 10, nextEvent: 'VARZEA_JULINHA_JOGO' } // Evento da Julinha
        ]
    },
    'VARZEA_JULINHA_JOGO': { // NOVO EVENTO
        text: "A semifinal está prestes a começar. Você vê Julinha na arquibancada, rindo e apontando para você com as amigas dela.\n\nEla grita: 'ANDA, [playerName]! FAZ UM GOL PRA MIM!'",
        choices: [
            { text: "Tentar um drible impossível para se exibir. (Caos)", onSelect: (p) => { p.chaos += 10; p.fame += 5; }, nextEvent: 'JOGO_4_EVENTO' },
            { text: "Ignorar e focar na tática do técnico.", onSelect: (p) => { p.foco += 15; }, nextEvent: 'JOGO_4_EVENTO' }
        ]
    },
    'JOGO_4_EVENTO': {
        text: "Semifinal tensa. 1 a 1. Aos 89 minutos, o Desportivo 4L tem uma FALTA PERIGOSA na entrada da área.",
        choices: [
            { text: "(Assistir à cobrança...)", nextEvent: 'JOGO_4_DERROTA' } 
        ]
    },
    'JOGO_4_DERROTA': {
        text: "GOL DELES. De falta. O juiz apita o fim do jogo. O [player.team] está eliminado na semifinal.\n\nVocê, [playerName], [player.age] anos, vê seu sonho de subir acabar... por enquanto. Você ganhou respeito no terrão.",
        choices: [
            { text: "Fim da temporada...", nextEvent: 'VARZEA_CHURRASCO_TIME' } // Leva para o churrasco
        ]
    },
    'VARZEA_CHURRASCO_TIME': { // NOVO EVENTO
        text: "Apesar da derrota, o time se reúne para o churrasco de fim de temporada. A cerveja está rolando e o som está alto.\n\n'Não foi dessa vez, [playerName], mas você jogou muito', diz o capitão.",
        choices: [
            { text: "Ficar na festa, beber e afogar as mágoas. (Caos)", onSelect: (p) => { p.chaos += 10; p.foco -= 20; }, nextEvent: 'FIM_TEMPORADA_VARZEA' },
            { text: "Comer a carne e ir para casa descansar. (Disciplina)", onSelect: (p) => { p.foco += 20; }, nextEvent: 'FIM_TEMPORADA_VARZEA' }
        ]
    },
    'FIM_TEMPORADA_VARZEA': { // LÓGICA DE FINAL CORRIGIDA
        text: "A temporada acabou. Você não subiu, mas seu nome é o mais falado na 2ª Divisão...",
        choices: [
            { text: "Djalma Freitas te manda uma DM...", 
              condition: (p) => p.metDjalma === false, // Só aparece se você NUNCA falou com ele
              onSelect: (p) => { p.fame += 10; p.metDjalma = true; }, 
              unlocksPost: 'post_djalma_olheiro', 
              nextEvent: 'ENCONTRO_DJALMA_1' 
            },
            { text: "Próxima temporada...", 
              condition: (p) => p.metDjalma === true, // Aparece se você JÁ falou com ele
              nextEvent: 'FIM_TEMPORADA_2_DIV' 
            }
        ]
    },
    'FIM_TEMPORADA_2_DIV': { // NOVO EVENTO
        text: "A temporada acabou. Djalma não te procurou de novo. Você continua no [player.team], mas agora tem [player.age] anos. O Varzeano da 1ª Divisão começa ano que vem, e seu nome está sendo cotado.\n\nVocê está pronto para o próximo capítulo?",
        choices: [
            { text: "Recomeçar (Próxima Temporada)", nextEvent: 'GAME_OVER' } // Loop de New Game+
        ]
    },
    'JOGO_5_PREP': {
        text: "Você voltou da suspensão de 2 jogos. Seu time ([player.team]) foi eliminado. Você está com fama de 'bad boy'.\n\nAmanda te ignora na escola. Marcos te chama de 'esquentadinho'.",
        choices: [
            { text: "Preciso recomeçar...", nextEvent: 'FIM_TEMPORADA_VARZEA' }
        ]
    }
};