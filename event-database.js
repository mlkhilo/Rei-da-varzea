// --- BANCO DE DADOS DE EVENTOS ---
export const gameEvents = {
    'START': {
        text: "É uma tarde de sábado quente em Itapetininga. Você, [playerName], 16 anos, está no campinho de terra batida do seu bairro. Você acabou de ser cortado do time da escola (o 'Derac' ou o 'EC Itapetininga' não te deram chance).\n\nSeu melhor amigo, Lucas Lino, senta ao seu lado.\n\n'E aí, [playerName]. Cabeça erguida. Ouvi dizer que o 'Varzeano de Itapetininga' e o 'Distrito de Gramadinho' vão começar. É a nossa chance!'",
        choices: [
            { text: "Estou cansado de sonhar, Lucas. Talvez eu deva arrumar um emprego.", nextEvent: 'GAME_OVER_DESISTE_CEDO' },
            { text: "É isso aí! Vamos pra cima. Qual a boa?", nextEvent: 'VARZEA_CHANCE_1' }
        ]
    },
    'GAME_OVER_DESISTE_CEDO': {
        text: "Você largou o futebol aos 16 anos. Nos 10 anos seguintes, você trabalhou na mesma empresa, se perguntando 'e se?'.",
        choices: [ { text: "Recomeçar", nextEvent: 'GAME_OVER' } ]
    },
    'VARZEA_CHANCE_1': {
        text: "Lucas sorri. 'É assim que se fala! O Campeonato do Distrito de Gramadinho (2ª Divisão) é o primeiro. Tem três times precisando de [playerPos]...' \n\n1. O Calcário EC: Time de quebrada, só noia. Dizem que o 'bicho' é R$ 100 por gol, mas o ambiente é pesado.\n\n2. O Vila Nova AAA: Time da galera, não paga nada, mas é só diversão e churrasco.\n\n3. O Chef Chips FC: O time da empresa de batatinhas da cidade. Pagam uma 'ajuda de custo' (R$ 30) e são organizados. É a chance de ser visto.",
        choices: [
            // ** ATUALIZAÇÃO: Adiciona NPCs ao time **
            { text: "Vou pelo desafio. Falar com o Calcário EC. (Alto Risco)", onSelect: (p, N) => { p.money += 20; p.chaos += 10; p.team = "Calcário EC"; N.mateus.affinity -= 5; N.caua.affinity += 5; }, nextEvent: 'TIME_APRESENTACAO' },
            { text: "Vou pela diversão. Falar com o Vila Nova AAA. (Sem Grana)", onSelect: (p, N) => { p.skill += 1; p.fame += 5; p.team = "Vila Nova AAA"; N.mateus.affinity += 5; N.caua.affinity -= 5; }, nextEvent: 'TIME_APRESENTACAO' },
            { text: "Vou pela organização. Falar com o Chef Chips FC. (Equilíbrio)", onSelect: (p, N) => { p.money += 5; p.skill += 1; p.team = "Chef Chips FC"; N.mateus.affinity += 0; N.caua.affinity += 10; }, nextEvent: 'TIME_APRESENTACAO' }
        ]
    },
    
    // --- NOVOS EVENTOS: Apresentação dos Companheiros ---
    'TIME_APRESENTACAO': {
        text: "Você chega para o primeiro treino no [player.team]. O técnico te apresenta ao time.\n\n'Esse é o Cauã [3], nosso zagueiro xerife. Disciplinado.'\nCauã te dá um aperto de mão firme. 'Bem-vindo. Jogue sério.'\n\n'E esse é o Mateus [10], nosso outro [playerPos]. É talentoso, mas...'\nMateus está de fone, fazendo embaixadinha. 'E aí, craque. Só não vem roubar minha vaga, hein? (risos)'",
        choices: [
            { text: "Prazer em conhecer, rapaziada. Vim pra somar.", onSelect: (p, N) => { N.caua.affinity += 5; N.mateus.affinity += 5; }, nextEvent: 'JOGO_1_PREP_JUVENTUS' },
            { text: "Vim pra ser titular, Mateus. Se acostuma. (Caos)", onSelect: (p, N) => { p.chaos += 5; N.caua.affinity -= 5; N.mateus.affinity += 10; }, nextEvent: 'JOGO_1_PREP_JUVENTUS' }
        ]
    },

    // --- NOVO JOGO 1: Juventus Itapê (Fase de Grupos) ---
    'JOGO_1_PREP_JUVENTUS': {
        text: "Jogo de estreia no Gramadinho. Fase de Grupos contra a Juventus Itapê. O técnico avisa: 'Time chato, zaga alta. Vamos focar na bola parada.'",
        choices: [
            { text: "Entendido, professor!", onSelect: (p) => { p.foco += 10; }, nextEvent: 'JOGO_1_EVENTO_JUVENTUS' },
            { text: "Ficar vendo vídeos de dribles no YouTube até 3h da manhã.", onSelect: (p) => { p.chaos += 3; p.foco -= 20; }, nextEvent: 'JOGO_1_EVENTO_JUVENTUS' }
        ]
    },
    'JOGO_1_EVENTO_JUVENTUS': {
        text: "Jogo difícil. 0 a 0, 70 minutos. Você sofre uma falta na lateral. Escanteio para o [player.team]. Você ajeita a bola para cobrar.",
        onSelect: (p) => { p.gamesPlayed += 1; },
        choices: [
            { text: "Cruzar fechado no primeiro pau. (Tática)", onSelect: (p, N) => { p.assists += 1; p.skill += 1; N.caua.affinity += 5; }, nextEvent: 'JOGO_1_RESULTADO_VITORIA' },
            { text: "Cruzar no Cauã [3], o xerife. (Confiança)", onSelect: (p, N) => { p.assists += 1; p.skill += 1; N.caua.affinity += 10; }, nextEvent: 'JOGO_1_RESULTADO_VITORIA' },
            { text: "Tentar um gol olímpico. (Ousadia/Caos)", onSelect: (p, N) => { p.chaos += 5; p.fame += 5; if (Math.random() > 0.8) { p.goals += 1; } else { N.mateus.affinity -= 5; } }, nextEvent: 'JOGO_1_RESULTADO_EMPATE' }
        ]
    },
    'JOGO_1_RESULTADO_VITORIA': {
        text: "GOL! Você colocou a bola na cabeça do companheiro! O [player.team] vence a estreia por 1 a 0! Cauã te dá os parabéns pela cobrança.",
        choices: [ { text: "Boa! +1 Assistência!", nextEvent: 'EVENTO_OFF_FIELD_1' } ]
    },
    'JOGO_1_RESULTADO_EMPATE': {
        text: "Você tentou o gol olímpico e a bola foi pra fora. Mateus [10] te xinga. 'Tá maluco? Era pra cruzar!' O jogo termina 0 a 0.",
        choices: [ { text: "Droga...", nextEvent: 'EVENTO_OFF_FIELD_1' } ]
    },


    // --- Semana 1 (Festa) ---
    'EVENTO_OFF_FIELD_1': {
        text: "É quinta-feira à noite. Você está em casa, seus pais rígidos estão na sala. Seu celular vibra. É uma mensagem de 'Amanda Carolina', a influencer (4.5k seguidores) mais gata do Ensino Médio.\n\n'Festinha particular aqui em casa. Meus pais não estão. Só vem. 😉'",
        choices: [
            { text: "Ir para a festa. (Risco/Caos)", onSelect: (p, N) => { p.chaos += 10; p.fame += 5; p.foco -= 30; N.amanda.affinity += 10; }, unlocksPost: 'post_amanda_festa', nextEvent: 'FESTA_AMANDA_1' },
            { text: "Ficar em casa. (Disciplina)", onSelect: (p) => { p.skill += 1; p.foco += 20; }, nextEvent: 'CASA_DISCIPLINA_1' } 
        ]
    },
    'FESTA_AMANDA_1': {
        text: "Você pula a janela e vai para a festa. A música está alta. Amanda te oferece um copo de 'líquido suspeito'.\n\n'Que bom que você veio, [playerName]! Você é o [playerPos] do [player.team], né? Famoso!'",
        choices: [
            { text: "Beber e curtir a festa. (Caos)", onSelect: (p, N) => { p.chaos += 10; p.fame += 5; p.followers += 50; p.foco -= 20; N.amanda.affinity += 5; }, nextEvent: 'ESCOLA_HUB_EVENTOS_1' },
            { text: "Conversar sobre futebol e tentar um 'networking'. (Fama)", onSelect: (p, N) => { p.fame += 10; p.followers += 100; N.amanda.followers += 100; p.foco -= 10; N.amanda.affinity += 15; }, nextEvent: 'ESCOLA_HUB_EVENTOS_1' }
        ]
    },
    'CASA_DISCIPLINA_1': {
        text: "Você avisa Amanda que não pode ir. Seus pais te dão 'boa noite'. Você está sozinho no seu quarto, focado.",
        choices: [
            { text: "Vou chutar bola no muro do quintal. (Físico)", onSelect: (p) => { p.skill += 1; p.foco += 15; }, nextEvent: 'ESCOLA_HUB_EVENTOS_1' }, 
            { text: "Vou ver vídeos de tática do [playerPos]. (Inteligência)", onSelect: (p) => { p.skill += 2; p.foco += 20; }, unlocksPost: 'post_player_foco_1', nextEvent: 'ESCOLA_HUB_EVENTOS_1' } 
        ]
    },
    
    // --- ROTEADOR DE EVENTOS ESCOLARES 1 (Amanda/Cassia Aleatório) ---
    'ESCOLA_HUB_EVENTOS_1': {
        text: "Segunda-feira na escola (ETEC). Você está andando pelo corredor, indo para a aula...",
        choices: [
            { 
                text: "(De repente, Amanda te puxa pelo braço!)", 
                condition: (p, N) => N.amanda.affinity >= 10 && Math.random() > 0.4, 
                nextEvent: 'ESCOLA_AMANDA_PUXA' 
            },
            { 
                text: "(Você cruza com Amanda, e ela pisca para você...)", 
                condition: (p, N) => N.amanda.affinity > 5 && N.amanda.affinity < 10 && Math.random() > 0.4, 
                nextEvent: 'ESCOLA_AMANDA_PISCA_HUB' 
            },
            { 
                text: "(O capitão do time da ETEC te barra no corredor...)", 
                condition: (p) => p.fame > 5 && Math.random() > 0.4, 
                nextEvent: 'ESCOLA_INVEJA_1' 
            },
            { 
                text: "(Você entra na sala da Professora Cássia...)", 
                nextEvent: 'ESCOLA_CHECK_CASSIA_ROULETTE' 
            }
        ]
    },
    'ESCOLA_AMANDA_PUXA': { 
        text: "Segunda-feira de manhã. Você está indo para a aula de Geografia quando Amanda Carolina te puxa pelo braço para um canto do corredor.\n\n'Aula chata. Me encontra na porta de trás da ETEC em 5 minutos. Vamos no Shopping comer açaí e matar essa aula. 😉'",
        choices: [
            { 
                text: "Ir com Amanda. (Risco/Caos)", 
                onSelect: (p, N) => { p.chaos += 10; p.fame += 10; p.money -= 10; p.followers += 50; p.foco -= 20; N.profCassia.patience -= 20; N.amanda.affinity += 10; N.diretor.patience -= 5; }, 
                unlocksPost: 'post_matar_aula_amanda',
                nextEvent: 'TREINO_HUB_1' 
            },
            { 
                text: "Recusar e ir para a aula. (Disciplina)", 
                onSelect: (p, N) => { p.skill += 1; p.foco += 20; N.amanda.affinity -= 5; N.profCassia.patience += 5; }, 
                nextEvent: 'TREINO_HUB_1' 
            }
        ]
    },
    'ESCOLA_AMANDA_PISCA_HUB': { 
        text: "No corredor, você cruza com Amanda. Ela te dá um sorriso e uma piscadela clara, indicando para você segui-la. Ela vira no corredor da biblioteca.",
        choices: [
            { text: "Ir falar com ela. (Fama)", onSelect: (p, N) => { p.fame += 5; N.amanda.affinity += 5; }, nextEvent: 'ESCOLA_INVEJA_1' },
            { text: "Ignorar e ir para a aula. (Foco)", onSelect: (p) => { p.foco += 10; }, nextEvent: 'ESCOLA_CHECK_CASSIA_ROULETTE' }
        ]
    },
    'ESCOLA_INVEJA_1': {
        text: "No intervalo, o capitão do time da escola (que te cortou) te barra. 'E aí, [playerName]? Tá se achando a estrela da várzea? Você é só um [playerPos] de terrão. Nunca vai ser profissional.'\n\nA galera toda, inclusive Amanda, está olhando.",
        choices: [
            { text: "Rir e dizer: 'O terrão paga mais que seu banco na escola.' (Fama)", onSelect: (p) => { p.fame += 5; }, nextEvent: 'TREINO_HUB_1' },
            { text: "Ignorar e sair andando. (Disciplina)", onSelect: (p) => { p.foco += 10; }, nextEvent: 'TREINO_HUB_1' },
            { text: "Peitar ele. 'Melhor que você eu sou, por isso tá com inveja.' (Caos)", onSelect: (p, N) => { p.chaos += 5; p.foco -= 5; N.diretor.patience -= 5; }, nextEvent: 'TREINO_HUB_1' }
        ]
    },

    // --- ROTEADOR DA PROF. CÁSSIA (Roleta) ---
    'ESCOLA_CHECK_CASSIA_ROULETTE': {
        text: "Você entra na sala de aula. A Professora Cássia está na frente da classe...",
        choices: [
            { 
                text: "(Ela anuncia: 'PROVA SURPRESA!')", 
                condition: (p, N) => N.profCassia.patience < 90 && Math.random() > 0.5, 
                nextEvent: 'ESCOLA_PROVA_SURPRESA_GENERICA' 
            },
            { 
                text: "(Ela te chama na mesa dela... 'PROBLEMA!')", 
                condition: (p, N) => N.profCassia.patience <= 60, 
                nextEvent: 'ESCOLA_PROBLEMA_CASSIA_GENERICA' 
            },
            { 
                text: "(Ela te elogia na frente de todos?)", 
                condition: (p, N) => N.profCassia.patience >= 90 && p.foco > 70, 
                nextEvent: 'ESCOLA_CASSIA_ELOGIO_GENERICO' 
            },
            { 
                text: "(Foi uma aula normal. Você tem a tarde livre.)", 
                nextEvent: 'ESCOLA_TARDE_LIVRE' 
            }
        ]
    },
    'ESCOLA_PROVA_SURPRESA_GENERICA': {
        text: "PROVA SURPRESA! Guardem o material.'\n\nA professora Cássia distribui as folhas. Seu Foco atual é [player.foco].",
        choices: [
            { 
                text: "Tentar fazer (Foco > 50)", 
                condition: (p) => p.foco > 50,
                onSelect: (p, N) => { p.foco -= 10; N.profCassia.patience += 10; },
                nextEvent: 'EVENTO_PROVA_BEM_GENERICA'
            },
            { 
                text: "Se dar mal (Foco <= 50)", 
                condition: (p) => p.foco <= 50,
                onSelect: (p, N) => { p.foco -= 5; N.profCassia.patience -= 15; },
                nextEvent: 'EVENTO_PROVA_MAL_GENERICA'
            }
        ]
    },
    'EVENTO_PROVA_BEM_GENERICA': {
        text: "Você se deu bem! Seu foco nos treinos te ajudou a lembrar da matéria. A Professora Cássia te dá um 'Parabéns' seco.",
        choices: [ { text: "Ufa... agora tarde livre.", nextEvent: 'ESCOLA_TARDE_LIVRE' } ]
    },
    'EVENTO_PROVA_MAL_GENERICA': {
        text: "Você se deu mal. Sua cabeça estava em outro lugar. A Professora Cássia anota seu nome na caderneta. 'Precisa melhorar, [playerName].'",
        choices: [ { text: "Droga... agora tarde livre.", nextEvent: 'ESCOLA_TARDE_LIVRE' } ]
    },
    'ESCOLA_PROBLEMA_CASSIA_GENERICA': {
        text: "A Professora Cássia te chama na mesa. '[playerName], sua paciência comigo está em [profCassia.patience]. Suas faltas (por matar aula) e suas notas estão péssimas. Se não melhorar, vou ligar para seus pais.'",
        choices: [
            { text: "Desculpe, professora. Vou focar mais.", onSelect: (p, N) => { p.foco += 20; N.profCassia.patience += 10; }, nextEvent: 'ESCOLA_TARDE_LIVRE' }, 
            { text: "Tenho que treinar. (Caos)", onSelect: (p, N) => { p.chaos += 5; p.foco -= 5; N.profCassia.patience -= 20; N.diretor.patience -= 5; }, nextEvent: 'ESCOLA_TARDE_LIVRE' }
        ]
    },
    'ESCOLA_CASSIA_ELOGIO_GENERICO': { 
        text: "A Professora Cássia te para no corredor. 'Parabéns, [playerName]. Mesmo com a fama no futebol, você manteve o foco nos estudos. Estou impressionada.'",
        choices: [
            { text: "Obrigado, professora!", onSelect: (p) => { p.fame += 5; p.foco += 20; }, nextEvent: 'ESCOLA_TARDE_LIVRE' }
        ]
    },
    'ESCOLA_TARDE_LIVRE': { 
        text: "Você tem a tarde livre antes do treino.",
        choices: [
            { text: "Matar o resto das aulas para ir treinar no campinho.", onSelect: (p, N) => { p.skill += 1; p.chaos += 5; p.foco -= 10; N.profCassia.patience -= 15; N.diretor.patience -= 5; }, nextEvent: 'TREINO_HUB_1' },
            { text: "Focar nos estudos por hoje.", onSelect: (p, N) => { p.foco += 15; N.profCassia.patience += 5; }, nextEvent: 'TREINO_HUB_1' },
        ]
    },
    'GAME_OVER_CASSIA': { 
        text: "A Professora Cássia ligou para seus pais. Eles viram suas notas, suas faltas e as postagens no InstaVárzea. 'CHEGA!', disse seu pai. 'Você está de castigo. Sem futebol até o fim do ano.'\n\nVocê foi reprovado e perdeu sua chance.",
        choices: [
            { text: "Recomeçar", nextEvent: 'GAME_OVER' } 
        ]
    },
    // --- NOVO GAME OVER: Diretor ---
    'GAME_OVER_DIRETOR': {
        text: "O Diretor Adalberto te chama na sala dele. 'Sente-se, [playerName]. Briga no corredor, matar aula, jogar apagador no ventilador... A Professora Cássia não te aguenta mais. Você está suspenso por 30 dias.'\n\nVocê perdeu o campeonato.",
        choices: [
            { text: "Recomeçar", nextEvent: 'GAME_OVER' }
        ]
    },

    // --- ROTEADOR DE TREINO 1 ---
    'TREINO_HUB_1': {
        text: "Terça-feira, treino do [player.team].",
        choices: [
            { text: "(O técnico prepara um treino físico...)", nextEvent: 'TREINO_SEMANA_FISICO' },
            { text: "(Mateus e Cauã estão de resenha...)", condition: (p) => Math.random() > 0.5, nextEvent: 'EVENTO_MATEUS_CAUA_RESENHA' },
            { text: "(O 'Zé Manteiga' está correndo...)", condition: (p) => Math.random() > 0.5, nextEvent: 'EVENTO_ZUEIRO_ESCORREGAO' }
        ]
    },
    'TREINO_SEMANA_FISICO': {
        text: "O técnico está irritado. 'Vamos lá, seus pernas de pau! Hoje é treino físico!'\n\nVocê odeia treino físico.",
        choices: [
            { text: "Dar 110% e impressionar o técnico. (Disciplina)", onSelect: (p) => { p.skill += 2; p.foco -= 10; }, nextEvent: 'AMISTOSO_PREP_ATHENAS' },
            { text: "Fazer 'corpo mole' e guardar energia para o drible.", onSelect: (p) => { p.chaos += 2; }, nextEvent: 'AMISTOSO_PREP_ATHENAS' },
            { text: "Pedir para fazer um treino de drible. (Teste de Habilidade)", 
                minigame: { type: 'dribble', onSuccess: 'AMISTOSO_PREP_ATHENAS', onFail: 'AMISTOSO_PREP_ATHENAS' }
            }
        ]
    },
    'EVENTO_ZUEIRO_ESCORREGAO': {
        text: "No meio do treino físico, o 'Zé Manteiga', o zagueiro mais desengonçado do time, tenta dar um pique. Ele pisa em falso na terra fofa e toma um CAPOTE espetacular. A poeira sobe. O time todo para.\n\nSilêncio... e aí todo mundo cai na risada, até o técnico.",
        choices: [
            { text: "Rir junto (time todo ganha moral). (Fama)", onSelect: (p) => { p.fame += 1; p.foco += 5; p.chaos -= 1; }, nextEvent: 'AMISTOSO_PREP_ATHENAS' },
            { text: "Ajudar ele a levantar. (Disciplina)", onSelect: (p) => { p.skill += 1; p.foco += 5; }, nextEvent: 'AMISTOSO_PREP_ATHENAS' }
        ]
    },
    // --- NOVO EVENTO: Resenha Mateus/Cauã ---
    'EVENTO_MATEUS_CAUA_RESENHA': {
        text: "Pós-treino. Você está bebendo água. Mateus [10] chega por trás do zagueiro Cauã [3] e pula nas costas dele gritando 'MATA-LEÃO!'.\n\nCauã, sério, aplica uma chave de braço em 1 segundo e derruba Mateus. 'Tá maluco, moleque? Quer se machucar?'\n\nMateus levanta rindo. 'Calma, xerife! É resenha!'",
        choices: [
            { text: "Rir da situação. (Caos/Mateus+)", onSelect: (p, N) => { p.chaos += 5; N.mateus.affinity += 5; N.caua.affinity -= 5; }, unlocksPost: 'post_mateus_caua_resenha', nextEvent: 'AMISTOSO_PREP_ATHENAS' },
            { text: "Ajudar Mateus. 'Pega leve, Cauã.' (Foco/Cauã+)", onSelect: (p, N) => { p.foco += 5; N.caua.affinity += 5; N.mateus.affinity -= 5; }, nextEvent: 'AMISTOSO_PREP_ATHENAS' }
        ]
    },

    // --- Amistosos ---
    'AMISTOSO_PREP_ATHENAS': {
        text: "Depois do treino, o técnico reúne o time. 'Seguinte, rapaziada. Pra dar ritmo de jogo, fechei dois amistosos. O primeiro é amanhã contra o Athenas, time tranquilo.'",
        choices: [
            { text: "Beleza, técnico. Jogo é jogo.", nextEvent: 'AMISTOSO_ATHENAS' }
        ]
    },
    'AMISTOSO_ATHENAS': {
        text: "Amistoso contra o Athenas. Como esperado, o jogo é fácil. 60 minutos, 2 a 0 para o [player.team]. Você recebe a bola na cara do gol, sem goleiro.",
        onSelect: (p) => { p.gamesPlayed += 1; }, // Contabiliza Jogo
        choices: [
            { text: "Fazer o gol fácil e garantir. (Profissional)", onSelect: (p) => { p.skill += 1; p.goals += 1; }, nextEvent: 'AMISTOSO_PREP_JAMAICA' },
            { text: "Tentar um drible humilhante (de letra). (Caos/Fama)", onSelect: (p) => { p.chaos += 5; p.fame += 5; p.goals += 1; }, nextEvent: 'AMISTOSO_PREP_JAMAICA' }
        ]
    },
    'AMISTOSO_PREP_JAMAICA': {
        text: "O técnico gostou. 'Bom jogo. Agora descansem, porque sexta-feira o bicho pega. Amistoso contra o Jamaica Itapê. É aquele time de 'noia' do Teto. Os caras batem até na mãe.'",
        choices: [
            { text: "Não tenho medo de 'noia'. (Caos)", onSelect: (p) => { p.chaos += 2; }, nextEvent: 'AMISTOSO_PREP_JAMAICA_2' },
            { text: "Vou jogar na bola. (Foco)", onSelect: (p) => { p.foco += 10; }, nextEvent: 'AMISTOSO_PREP_JAMAICA_2' }
        ]
    },
    'AMISTOSO_PREP_JAMAICA_2': {
        text: "É quinta à noite, véspera do amistoso contra o Jamaica. Você está em casa. O que você faz para relaxar (ou treinar)?",
        choices: [
            { text: "Jogar FIFA até tarde. (Foco)", onSelect: (p) => { p.foco += 10; p.chaos += 2; }, nextEvent: 'AMISTOSO_JAMAICA_EVENTO' },
            { text: "Assistir vídeos de tática. (Habilidade)", onSelect: (p) => { p.skill += 1; p.foco += 5; }, nextEvent: 'AMISTOSO_JAMAICA_EVENTO' },
            { text: "Ir pro quintal treinar chute. (Habilidade/Foco)", onSelect: (p) => { p.skill += 2; p.foco -= 5; }, nextEvent: 'AMISTOSO_JAMAICA_EVENTO' }
        ]
    },
    'AMISTOSO_JAMAICA_EVENTO': {
        text: "O jogo contra o Jamaica Itapê é uma guerra. O campo é de terra fofa, a bola quica mal. Aos 20 minutos, você dá um drible no volante deles. Na jogada seguinte, o zagueiro vem com os dois pés e te dá um carrinho criminoso por trás. O juiz não marca nada.",
        onSelect: (p) => { p.gamesPlayed += 1; }, // Contabiliza Jogo
        choices: [
            { text: "Levantar, bater a poeira e seguir o jogo. (Foco/Disciplina)", onSelect: (p) => { p.foco += 10; p.skill += 1; }, nextEvent: 'EVENTO_MOCHILA_PREP' },
            { text: "Partir pra cima do zagueiro e empurrar. (CAOS TOTAL)", onSelect: (p) => { p.chaos += 20; p.fame -= 10; p.redCards += 1; }, unlocksPost: 'post_briga_jamaica', nextEvent: 'AMISTOSO_JAMAICA_BRIGA' }
        ]
    },
    'AMISTOSO_JAMAICA_BRIGA': {
        text: "Você se levanta e empurra o zagueiro. Ele te dá um soco no peito. O time todo do Jamaica vem pra cima! Começa uma briga generalizada! Voa chuteira, garrafa de água... O 'Gordão' da Rádio Várzea está filmando tudo!",
        choices: [
            { text: "Isso vai dar merda...", nextEvent: 'AMISTOSO_JAMAICA_FANS' } 
        ]
    },
    'AMISTOSO_JAMAICA_FANS': {
        text: "A briga foi contida (mal) e o jogo cancelado. Você está indo para o vestiário quando três torcedores do Jamaica, sem camisa e parecendo bêbados, cercam você.\n\n'E aí, [playerPos] folgado? Apanhou pouco no campo?'",
        choices: [
            { text: "Tentar sair na lábia. 'Calma, rapaziada, foi só o calor do jogo.'", onSelect: (p) => { p.foco -= 10; }, nextEvent: 'BRIGA_AMISTOSO_RESULTADO' },
            { text: "Sacar o celular e ligar para a polícia (PM). (Seguro)", onSelect: (p) => { p.chaos -= 10; p.foco -= 5; }, nextEvent: 'BRIGA_AMISTOSO_RESULTADO' },
            { text: "Tentar peitar eles. 'Perderam a noção?' (Caos)", onSelect: (p) => { p.chaos += 10; }, nextEvent: 'BRIGA_AMISTOSO_RESULTADO' }
        ]
    },
    'BRIGA_AMISTOSO_RESULTADO': {
        text: "A confusão (dentro e fora do campo) foi parar no InstaVárzea. A Liga do Gramadinho viu o vídeo e te deu um gancho de 1 JOGO. \n\nVocê está FORA do próximo jogo... o jogo fácil contra o N2.",
        choices: [
            { text: "Droga! (Pular o Jogo 2)", onSelect: (p) => { p.flags.skipJogo2 = true; }, nextEvent: 'JOGO_2_SUSPENSO' }
        ]
    },
    'JOGO_2_SUSPENSO': {
        text: "Você teve que assistir o jogo contra o N2 da arquibancada, suspenso. Foi um tédio. Seu time venceu fácil por 3 a 0 sem você.",
        choices: [
            { text: "Pelo menos o time não perdeu... Agora foco no CAI.", nextEvent: 'JOGO_3_CAI_INTRO' } // Pula para a preparação do Jogo 3 (CAI)
        ]
    },

    // --- EVENTO REAL: Preparar Mochila ---
    'EVENTO_MOCHILA_PREP': {
        text: "É sábado de manhã, dia de jogo. Você está preparando sua mochila para o jogo contra o N2. Você confere os itens.",
        choices: [
            { text: "Chuteira, caneleira, meião, short. (Tudo certo)", onSelect: (p) => { p.foco += 5; }, nextEvent: 'JOGO_2_PREP_N2' },
            { text: "Colocar R$ 10 a mais para o guaraná pós-jogo.", onSelect: (p) => { p.money -= 10; p.foco += 10; }, condition: (p) => p.money >= 10, nextEvent: 'JOGO_2_PREP_N2' },
            { text: "(Ops!) Quase esqueci a caneleira! (Sorte)", onSelect: (p) => { p.skill += 1; p.foco += 5; }, nextEvent: 'JOGO_2_PREP_N2' }
        ]
    },

    // --- JOGO 2: Jogo Fácil (N2) ---
    'JOGO_2_PREP_N2': {
        text: "O próximo jogo é contra o N2. É considerado o time mais fraco do campeonato. O técnico avisa: 'É pra ganhar e ganhar bem. Sem salto alto.'",
        choices: [
            { text: "Vamos pra cima fazer saldo de gol!", skipIfFlag: 'skipJogo2', onSelect: (p) => { p.foco += 5; }, nextEvent: 'JOGO_2_EVENTO_N2' },
            { text: "(SUSPENSO) Assistir o jogo da arquibancada.", requiresFlag: 'skipJogo2', onSelect: (p) => { delete p.flags.skipJogo2; }, nextEvent: 'JOGO_3_CAI_INTRO' } 
        ]
    },
    'JOGO_2_EVENTO_N2': {
        text: "Jogo contra o N2. Realmente, o time é muito ruim. 15 minutos de jogo, 1 a 0 pra vocês. Você recebe a bola livre, na cara do gol.",
        onSelect: (p) => { p.gamesPlayed += 1; },
        choices: [
            { text: "Tocar na saída do goleiro. (Fácil)", onSelect: (p) => { p.goals += 1; p.skill += 1; }, nextEvent: 'JOGO_2_RESULTADO_N2_VITORIA' },
            { text: "Tentar uma cavadinha para humilhar. (Caos)", onSelect: (p) => { p.goals += 1; p.fame += 5; p.chaos += 5; }, nextEvent: 'JOGO_2_RESULTADO_N2_VITORIA' }
        ]
    },
    'JOGO_2_RESULTADO_N2_VITORIA': {
        text: "O jogo termina 4 a 0. Foi um passeio. Você jogou bem e fez o seu. Agora, a preparação é para o clássico.",
        choices: [
            { text: "Próximo desafio: CAI.", nextEvent: 'JOGO_3_CAI_INTRO' }
        ]
    },


    // --- JOGO 3: Clássico vs CAI ---
    'JOGO_3_CAI_INTRO': {
        text: "No meio do treino, um cara novo aparece. Seu amigo Lucas cochicha: 'Esse é o Marcos, centroavante do CAI. Ele veio ver o treino do rival.'\n\nMarcos te encara e ri.\n\n'Então esse é o [playerName], o [playerPos] 'famosinho'?'",
        choices: [
            { text: "Ignorar e continuar treinando. (Foco)", nextEvent: 'ESCOLA_SEMANA_DE_PROVAS' },
            { text: "Encarar de volta. 'Famosinho que vai meter gol em você.' (Caos)", onSelect: (p) => { p.chaos += 5; p.fame += 5; p.foco -= 5; }, nextEvent: 'ESCOLA_SEMANA_DE_PROVAS' }
        ]
    },
    'ESCOLA_SEMANA_DE_PROVAS': {
        text: "É semana de provas na ETEC. A tensão é alta. O jogo contra o CAI é no fim de semana, mas a Professora Cássia está com uma pilha de folhas na mão.\n\n'Bom dia. Guardem o material. PROVA SURPRESA!'\n\nSeu Foco atual é [player.foco].",
        choices: [
            { 
                text: "Tentar fazer (Foco > 50)", 
                condition: (p) => p.foco > 50,
                onSelect: (p, N) => { p.foco -= 10; N.profCassia.patience += 10; },
                nextEvent: 'EVENTO_PROVA_BEM'
            },
            { 
                text: "Se dar mal (Foco <= 50)", 
                condition: (p) => p.foco <= 50,
                onSelect: (p, N) => { p.foco -= 5; N.profCassia.patience -= 15; },
                nextEvent: 'EVENTO_PROVA_MAL'
            }
        ]
    },
    'EVENTO_PROVA_BEM': {
        text: "Você se deu bem! Seu foco nos treinos te ajudou a lembrar da matéria. A Professora Cássia te dá um 'Parabéns' seco.",
        choices: [ { text: "Ufa... agora foco no clássico.", nextEvent: 'JOGO_3_PREP_CAI' } ]
    },
    'EVENTO_PROVA_MAL': {
        text: "Você se deu mal. Sua cabeça estava no clássico. A Professora Cássia anota seu nome na caderneta. 'Precisa melhorar, [playerName].'",
        choices: [ { text: "Droga... agora foco no clássico.", nextEvent: 'JOGO_3_PREP_CAI' } ]
    },

    'JOGO_3_PREP_CAI': {
        text: "O técnico do [player.team] viu o Marcos (do CAI) espionando o treino. 'Moleque abusado!'\n\nO próximo jogo é contra eles. É o clássico do Gramadinho.\n\n'Seguinte, [playerName]', diz o técnico, 'o Marcos é forte, mas lento. Qual vai ser o plano?'",
        choices: [
            { text: "Vou jogar na velocidade e cansar ele. (Tática)", onSelect: (p) => { p.skill += 1; }, nextEvent: 'JOGO_3_EVENTO_CAI_MOMENTO_1' },
            { text: "Vou pra cima dele no drible e na provocação. (Caos)", onSelect: (p) => { p.chaos += 5; }, nextEvent: 'JOGO_3_EVENTO_CAI_MOMENTO_1' }
        ]
    },
    'JOGO_3_EVENTO_CAI_MOMENTO_1': {
        text: "O Jogo: [player.team] vs. CAI. O campo está lotado. Marcos não para de te provocar. 'Vim te buscar, [playerPos] de festa!'\n\n30 minutos, 0 a 0. Você recebe a bola na ponta.",
        onSelect: (p) => { p.gamesPlayed += 1; }, 
        choices: [
            {
                text: "Tentar o drible para o gol. (Ousadia)",
                onSelect: (p) => { p.foco -= 1; }, // Placebo para garantir que o minigame ative
                unlocksPost: 'post_drible_marcos',
                minigame: { type: 'dribble', onSuccess: 'JOGO_3_RESULTADO_VITORIA_DRIBLE', onFail: 'JOGO_3_EVENTO_CAI_MOMENTO_2' } 
            },
            { text: "Tocar de lado e esperar. (Seguro)", onSelect: (p) => { p.skill += 1; }, nextEvent: 'JOGO_3_EVENTO_CAI_MOMENTO_2' },
            { text: "Chutar de longe, sem ângulo. (Risco)", onSelect: (p) => { p.fame -= 1; }, nextEvent: 'JOGO_3_EVENTO_CAI_MOMENTO_2' }
        ]
    },
    'JOGO_3_EVENTO_CAI_MOMENTO_2': {
        text: "O jogo continua 1 a 1, 85 minutos. A tensão é máxima. Marcos já está irritado por não ter te parado. Você recebe a bola no meio-campo e ele vem babando na sua direção para dar o bote.",
        choices: [
            {
                text: "Driblar o Marcos de novo. (Ousadia Pura)",
                unlocksPost: 'post_drible_marcos',
                minigame: { type: 'dribble', onSuccess: 'JOGO_3_RESULTADO_VITORIA_DRIBLE', onFail: 'JOGO_3_RESULTADO_FALHA_DRIBLE' } 
            },
            { text: "Proteger a bola e tocar rápido. (Profissional)", onSelect: (p) => { p.skill += 2; }, nextEvent: 'JOGO_3_RESULTADO_EMPATE' },
            { text: "Forçar uma falta dura dele. (Malícia)", onSelect: (p) => { p.chaos += 5; }, nextEvent: 'JOGO_3_RESULTADO_FALTA' }
        ]
    },

    'JOGO_3_RESULTADO_VITORIA_DRIBLE': {
        text: "Você deu um drible humilhante no Marcos! A torcida do [player.team] explode! Você avança e chuta no ângulo. GOLAÇO!\n\nSeu time vence por 2 a 1. Você é o herói. Marcos sai de campo xingando. O vídeo viraliza e você ganha +1000 seguidores!",
        choices: [ 
            { 
                text: "Comemorar!", 
                onSelect: (p, N) => { 
                    p.fame += 10; p.chaos += 10; p.followers += 1000; N.marcos.followers += 50; p.goals += 1;
                    if (p.skill > p.chaos) { p.skill += 3; }
                    if (p.team === "Calcário EC") { p.money += 100; } 
                }, 
                unlocksPost: 'post_marcos_revidando', 
                nextEvent: 'EVENTO_POS_JOGO_3_FAMA' 
            } 
        ]
    },
    'JOGO_3_RESULTADO_FALHA_DRIBLE': {
        text: "Você tentou o drible, mas Marcos foi mais rápido e tomou a bola. A torcida do CAI te vaia. O jogo termina 1 a 1.",
        choices: [ { text: "Ir para o vestiário.", nextEvent: 'EVENTO_POS_JOGO_3_NORMAL' } ]
    },
    'JOGO_3_RESULTADO_EMPATE': {
        text: "Você toca a bola com inteligência. O jogo termina 1 a 1. Foi um jogo duro. Você não brilhou, mas jogou sério. Marcos te cumprimenta com respeito forçado.",
        choices: [ { text: "Ir para o vestiário.", nextEvent: 'EVENTO_POS_JOGO_3_NORMAL' } ]
    },
    'JOGO_3_RESULTADO_FALTA': {
        text: "Você usa o corpo e Marcos te acerta com violência. O juiz marca a falta e expulsa Marcos! Você ganha a vantagem, mas o jogo termina 1 a 1.\n\nVocê ganhou na malícia, mas não no talento.",
        choices: [
            { text: "Levantar e provocar.", nextEvent: 'EVENTO_AMIGOS_CONVITE' } 
        ]
    },
    
    'EVENTO_AMIGOS_CONVITE': {
        text: "Depois do jogo, Marcos está furioso. Mas o técnico do CAI vem falar com você. 'Olha, foi jogo quente. Pra selar a paz, vamos fazer um 'Amigos do [player.team]' vs 'Amigos do CAI' no feriado. Churrasco e futebol. Topa?'\n\nMarcos te encara de longe.",
        choices: [
            { text: "Claro, 'selar a paz' é bom. (Ingênuo)", onSelect: (p) => { p.foco += 5; p.chaos -= 5; }, nextEvent: 'EVENTO_AMIGOS_JOGO' },
            { text: "Sei... Isso vai dar merda. Mas eu vou. (Caos)", onSelect: (p) => { p.chaos += 5; }, nextEvent: 'EVENTO_AMIGOS_JOGO' }
        ]
    },
    'EVENTO_AMIGOS_JOGO': {
        text: "É o jogo-festa. O clima é tenso. O 'juiz' é o Gordão da Rádio Várzea. Aos 20 minutos, você dá um drible em Marcos. Ele não gosta. Na jogada seguinte, ele te dá um carrinho por trás, no meio do 'amistoso'.",
        onSelect: (p) => { p.gamesPlayed += 1; }, 
        choices: [
            {
                text: "Partir para a briga física. (Caos Total)",
                onSelect: (p, N) => { p.chaos += 20; p.fame -= 10; p.skill -= 1; p.followers -= 50; N.marcos.followers += 50; N.profCassia.patience -= 30; p.redCards += 1; }, 
                unlocksPost: 'post_briga_marcos_amigos', 
                nextEvent: 'BRIGA_VESTIARIO_RESULTADO' 
            },
            {
                text: "Levantar e xingar: 'Seu covarde, nem em festa sabe jogar!' (Fama)",
                onSelect: (p) => { p.fame += 5; },
                nextEvent: 'JOGO_4_PREP_CRICIUMA' 
            }
        ]
    },
    'EVENTO_POS_JOGO_3_FAMA': {
        text: "Seu golaço e o drible em Marcos viralizaram no 'InstaVárzea'.\n\nVocê recebe uma DM de um perfil chamado 'Djalma Freitas - Gestão Esportiva'.\n\n'Garoto, vi seu vídeo. Você tem o drible, mas falta cabeça. Me encontra no posto (Posto Ipiranga do centro) amanhã. Posso te tirar dessa terra.'",
        choices: [
            { text: "Ignorar. Deve ser golpe. (Segurança)", nextEvent: 'JOGO_4_PREP_CRICIUMA' }, 
            { text: "É a minha chance! Ir ao encontro. (Risco)", onSelect: (p) => { p.fame += 5; p.chaos += 5; p.metDjalma = true; }, unlocksPost: 'post_djalma_olheiro', nextEvent: 'ENCONTRO_DJALMA_1' }, 
            { text: "Ignorar Djalma e checar uma DM de 'Julinha (Bala de Prata)'", condition: (p) => p.fame > 15, nextEvent: 'ENCONTRO_JULINHA_1' }
        ]
    },
    'EVENTO_POS_JOGO_3_NORMAL': {
        text: "Mais uma semana normal. Você jogou bem, mas não o suficiente para chamar atenção. O campeonato continua. Você precisa de mais.",
        choices: [
            { text: "Próximo treino...", nextEvent: 'JOGO_4_PREP_CRICIUMA' } 
        ]
    },
    'ENCONTRO_JULINHA_1': {
        text: "Você ignora a DM do olheiro e abre a da 'Julinha (Bala de Prata)', a torcedora-símbolo do time rival da 1ª Divisão. Ela é rival da Amanda.\n\n'E aí, [playerName]? Vi que você é famosinho aqui no Gramadinho. Mas será que aguenta a 1ª Divisão? Me encontra no Açaí do Centro.'",
        choices: [
            { text: "Ir ao encontro. (Fama/Caos)", onSelect: (p, N) => { p.fame += 10; p.chaos += 5; N.julinha.affinity += 10; }, unlocksPost: 'post_julinha_flerte', nextEvent: 'ENCONTRO_JULINHA_2' },
            { text: "Ignorar. Focar no meu time.", nextEvent: 'JOGO_4_PREP_CRICIUMA' }
        ]
    },
    'ENCONTRO_JULINHA_2': {
        text: "Julinha é marrenta. 'Pensei que você era maior. Enfim, ouvi dizer que o Djalma tá de olho em você. Cuidado, ele só quer seu dinheiro.\n\nSe quiser fama DE VERDADE, cola comigo. Ou você prefere ficar de coleira pra Amanda?'",
        choices: [
            { text: "Obrigado pela dica... (Sair)", nextEvent: 'JOGO_4_PREP_CRICIUMA' },
            { text: "E o que você sugere? (Fama)", onSelect: (p) => { p.fame += 5; }, nextEvent: 'JOGO_4_PREP_CRICIUMA' }
        ]
    },
    'BRIGA_VESTIARIO_RESULTADO': {
        text: "Vocês saíram na porrada. A 'Rádio Várzea' filmou tudo. Você foi banido por 2 jogos e perdeu o respeito do técnico.\n\nSeu nível de Caos está perigosamente alto.",
        choices: [
            { text: "Péssimo. (Pular 2 jogos)", onSelect: (p) => { p.flags.skipJogo4 = true; p.flags.skipJogo5 = true; }, nextEvent: 'JOGO_6_PREP_BOCHE' } 
        ]
    },
    
    // --- ROTA B (DJALMA / 1ª DIVISÃO) ---
    'ENCONTRO_DJALMA_1': {
        //... (Eventos Djalma/CEMA - Sem Mudanças) ...
    },
    // ... (restante da rota DJALMA/CEMA) ...

    'ENCONTRO_DJALMA_1': {
        text: "Você vai ao Posto. Um homem mais velho, de camisa polo e óculos escuros, te analisa. 'Djalma Freitas. Você é o [playerName], [playerPos].'\n\n'Você joga no [player.team], que é um lixo. Mas você tem talento. Eu quero te levar para a 'Copinha' (Copa São Paulo) no ano que vem. Mas você tem que jogar o Varzeano da 1ª Divisão.'",
        choices: [
            { text: "Como assim? Eu tô na 2ª Divisão.", nextEvent: 'ENCONTRO_DJALMA_2' },
            { text: "Eu não confio em você. Vou seguir meu caminho.", nextEvent: 'JOGO_4_PREP_CRICIUMA' } 
        ]
    },
    'ENCONTRO_DJALMA_2': {
        text: "Djalma ri. 'Exato. O CEMA (Campeão da 1ª Divisão) precisa de um [playerPos] para a final do Municipal contra o Nova Baixada. O jogo é daqui 3 semanas. Eles vão te pagar R$ 500 pela final.'\n\n'Se você aceitar, você abandona o [player.team] e o Gramadinho. Se você recusar, eu sumo.'",
        choices: [
            {
                text: "Aceitar! Abandonar o [player.team] e ir para o CEMA. (Traição/Oportunidade)",
                onSelect: (p) => { p.team = "CEMA (1ª Div)"; p.chaos += 15; p.fame += 20; p.followers += 200; p.money += 100; p.flags.traidor = true; }, 
                unlocksPost: 'post_traicao_cema',
                nextEvent: 'MUDANCA_TIME_CEMA_ANUNCIO' 
            },
            {
                text: "Recusar. Vou subir com meu time atual. (Lealdade)",
                onSelect: (p) => { p.skill += 2; },
                nextEvent: 'JOGO_4_PREP_CRICIUMA' 
            }
        ]
    },
    'MUDANCA_TIME_CEMA_ANUNCIO': { 
        text: "O CEMA FC solta uma nota no InstaVárzea. É oficial. A várzea está chocada com a 'traição'.",
        choices: [
            { text: "Ver o post...", unlocksPost: 'post_cema_anuncio', nextEvent: 'MUDANCA_TIME_CEMA' }
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
            { text: "Vou focar 100% e treinar em dobro.", onSelect: (p) => { p.skill += 3; p.foco += 20; }, nextEvent: 'FINAL_VARZEANO_EVENTO' }, 
            { text: "Vou na festa da Amanda (ela ouviu da sua fama).", onSelect: (p, N) => { p.chaos += 10; p.fame += 10; p.foco -= 20; N.amanda.affinity += 5; }, nextEvent: 'FINAL_VARZEANO_EVENTO' }
        ]
    },
    'FINAL_VARZEANO_EVENTO': {
        text: "FINAL DA 1ª DIVISÃO: CEMA vs. Nova Baixada. O estádio (DERAC) está lotado. Djalma está na tribuna.\n\nJogo 0 a 0, 88 minutos. Você recebe a bola na entrada da área. O zagueiro vem babando.",
        onSelect: (p) => { p.gamesPlayed += 1; }, // Contabiliza Jogo
        choices: [
            { text: "Chutar de bico no canto. (Raiz)", onSelect: (p) => { p.skill += 1; }, minigame: { type: 'penalty', onSuccess: 'FINAL_VARZEANO_SUCESSO', onFail: 'DJALMA_SEM_GRANA' } },
            { text: "Tentar um drible humilhante (Caos)", onSelect: (p) => { p.chaos += 5; p.fame += 5; }, minigame: { type: 'dribble', onSuccess: 'FINAL_VARZEANO_SUCESSO', onFail: 'DJALMA_SEM_GRANA' } }
        ]
    },
    'FINAL_VARZEANO_SUCESSO': {
        text: "GOOOOL! Você é o herói do CEMA! A torcida invade o campo! Djalma te aplaude.",
        choices: [
            { 
                text: "Comemorar o título! (Receber R$ 400)", 
                onSelect: (p) => { p.money += 400; p.goals += 1; }, 
                unlocksPost: 'post_final_cema_campeao', 
                nextEvent: 'ENCONTRO_DJALMA_COPINHA' 
            }
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
            { text: "Droga... (Voltar para a Várzea)", nextEvent: 'FIM_TEMPORADA_VARZEA' } 
        ]
    },
    'SUCESSO_COPINHA': {
        text: "Djalma sorri. 'Bem-vindo ao futebol profissional, [playerName]. Você vai sair de Itapetininga.'\n\nCONTINUA...",
        choices: [
            { text: "(Próximo Capítulo...)", nextEvent: 'GAME_OVER' } 
        ]
    },
    
    // --- ROTA A (LEALDADE / 2ª DIVISÃO) ---

    // --- JOGO 4: Clássico vs Criciúma Itapê ---
    'JOGO_4_PREP_CRICIUMA': {
        text: "O próximo jogo é o 'Clássico da Laranja' contra o Criciúma Itapê. A rivalidade é antiga e violenta. O técnico te chama no canto.\n\n'Seguinte, [playerName], eles vão te caçar. O zagueiro deles, o 'Javali', quebrou a perna de dois no ano passado. Jogue bola, não entre na pilha.'",
        choices: [
            { text: "Entendido, técnico. Foco total.", skipIfFlag: 'skipJogo4', onSelect: (p) => { p.foco += 15; }, nextEvent: 'JOGO_4_EVENTO_CRICIUMA' },
            { text: "Se ele vier, ele vai achar. Não levo desaforo.", skipIfFlag: 'skipJogo4', onSelect: (p) => { p.chaos += 10; p.foco -= 10; }, nextEvent: 'JOGO_4_EVENTO_CRICIUMA' },
            { text: "(SUSPENSO) Assistir o clássico da arquibancada.", requiresFlag: 'skipJogo4', onSelect: (p) => { delete p.flags.skipJogo4; }, nextEvent: 'JOGO_5_PREP_BOCHE' } 
        ]
    },
    'JOGO_4_EVENTO_CRICIUMA': {
        text: "O jogo é um inferno. Cada bola é uma batalha. Aos 40 do primeiro tempo, você tabela e sai na cara do gol. O 'Javali' vem por trás e te dá um carrinho criminoso, acertando seu tornozelo. O juiz dá só amarelo.",
        onSelect: (p) => { p.gamesPlayed += 1; },
        choices: [
            { text: "Levantar, respirar fundo e pedir para bater a falta. (Foco)", onSelect: (p) => { p.foco += 10; }, minigame: { type: 'freekick', onSuccess: 'JOGO_4_RESULTADO_VITORIA', onFail: 'JOGO_4_RESULTADO_DERROTA' } },
            { text: "Partir pra cima do Javali e empurrar. (Caos)", onSelect: (p) => { p.chaos += 20; p.redCards += 1; }, nextEvent: 'JOGO_4_RESULTADO_DERROTA' },
            { text: "Ficar caído e pedir substituição. (Medo)", onSelect: (p) => { p.skill -= 1; p.fame -= 5; }, nextEvent: 'JOGO_4_RESULTADO_DERROTA' }
        ]
    },
    'JOGO_4_RESULTADO_VITORIA': {
        text: "GOL! Você bateu a falta com perfeição! Você calou o Javali e a torcida deles! O time ganha moral e segura a vitória por 1 a 0.",
        choices: [
            { text: "Que vitória suada!", onSelect: (p) => { p.fame += 15; p.skill += 1; p.goals += 1; }, nextEvent: 'HUB_SEMANA_ESCOLAR_3' }
        ]
    },
    'JOGO_4_RESULTADO_DERROTA': {
        text: "Você errou a falta (ou foi expulso/substituído). O time sentiu sua falta. O Criciúma cresceu e fez 1 a 0 no final. Uma derrota amarga.",
        choices: [
            { text: "Droga...", onSelect: (p) => { p.chaos += 5; }, nextEvent: 'HUB_SEMANA_ESCOLAR_3' }
        ]
    },

    // --- ROTEADOR DE EVENTOS ESCOLARES 3 (Novos Eventos) ---
    'HUB_SEMANA_ESCOLAR_3': {
        text: "Outra semana na ETEC. A poeira do clássico contra o Criciúma baixou.",
        choices: [
            { text: "(Você vê o 'Nerdola' derrubar os livros...)", condition: (p) => Math.random() > 0.5, nextEvent: 'EVENTO_ZOEIRA_NERD' },
            { text: "(Você vê o 'Pro-Player do CS' na sala...)", condition: (p) => Math.random() > 0.5, nextEvent: 'EVENTO_RESENHA_CS' },
            { text: "(Você entra na sala da Professora Cássia...)", nextEvent: 'ESCOLA_CHECK_CASSIA_ROULETTE_3' }
        ]
    },
    'EVENTO_ZOEIRA_NERD': {
        text: "Você está no corredor. O 'Nerdola' (goleiro do seu time do Interclasse) tropeça e derruba uma pilha de livros. O Capitão do time da ETEC (que te odeia) passa e chuta os livros dele, rindo. 'Olha por onde anda, otário.'",
        choices: [
            { text: "Ajudar o Nerdola a pegar os livros. (Disciplina)", onSelect: (p) => { p.foco += 10; p.chaos -= 5; }, nextEvent: 'JOGOTREINO_SARAPUI' },
            { text: "Rir junto com o Capitão. (Caos/Fama)", onSelect: (p) => { p.chaos += 10; p.fame += 5; }, unlocksPost: 'post_nerd_zoeira', nextEvent: 'JOGOTREINO_SARAPUI' },
            { text: "Peitar o Capitão. 'Qual foi? Deixa o moleque.' (Caos)", onSelect: (p, N) => { p.chaos += 15; p.fame += 10; N.diretor.patience -= 10; }, nextEvent: 'JOGOTREINO_SARAPUI' }
        ]
    },
    'EVENTO_RESENHA_CS': {
        text: "Intervalo. O 'Pro-Player do CS' (seu ala do Interclasse) está no celular vendo um replay. 'Caralho, [playerName], olha esse 'clutch' 1v4 que eu fiz ontem na GC. Sou muito bom!'",
        choices: [
            { text: "Assistir e elogiar. 'Jogou fino, mano.' (Fama)", onSelect: (p) => { p.foco += 5; p.fame += 5; }, nextEvent: 'JOGOTREINO_SARAPUI' },
            { text: "Zuar. 'Isso aí é jogo de quem não corre.' (Caos)", onSelect: (p) => { p.chaos += 5; }, nextEvent: 'JOGOTREINO_SARAPUI' },
            { text: "Ignorar. 'Tenho que focar no treino.' (Foco)", onSelect: (p) => { p.foco += 10; }, nextEvent: 'JOGOTREINO_SARAPUI' }
        ]
    },
    'ESCOLA_CHECK_CASSIA_ROULETTE_3': {
        text: "Você entra na sala da Professora Cássia...",
        choices: [
            { 
                text: "(Ela te vê jogando bolinha de papel...)", 
                condition: (p) => p.chaos > 20 && Math.random() > 0.4, 
                nextEvent: 'EVENTO_ZUEIRA_APAGADOR'
            },
            {
                text: "(Ela te chama na mesa dela... 'PROBLEMA!')",
                condition: (p, N) => N.profCassia.patience <= 60,
                nextEvent: 'ESCOLA_PROBLEMA_CASSIA_GENERICA_2'
            },
            {
                text: "(Foi uma aula normal.)",
                nextEvent: 'JOGOTREINO_SARAPUI'
            }
        ]
    },
    // --- NOVOS EVENTOS DE ZOEIRA E DIRETOR ---
    'EVENTO_ZUEIRA_APAGADOR': {
        text: "Aula da Cássia. Um tédio. Você pega o apagador e tenta jogar no ventilador de teto. Você erra, e o apagador acerta em cheio a lousa, centímetros da cabeça dela. A sala congela.\n\n'[PLAYERNAME]! PARA A SALA DO DIRETOR! AGORA!'",
        choices: [
            { text: "Merda...", onSelect: (p, N) => { p.chaos += 15; p.foco -= 20; N.profCassia.patience = 10; N.diretor.patience -= 30; }, unlocksPost: 'post_zueira_apagador', nextEvent: 'DIRETOR_BRONCA' }
        ]
    },
    'DIRETOR_BRONCA': {
        text: "Você chega na sala do Diretor Adalberto. Ele é careca e intimidador. 'Sente-se, [playerName]. Matar aula, brigar no corredor, e agora tacar objetos na Professora Cássia? Sua paciência comigo está em [diretor.patience].\n\n'Você é um bom garoto, mas um péssimo aluno. Mais UMA reclamação e você será suspenso.'",
        choices: [
            { text: "Pedir desculpas. 'Não vai acontecer de novo, diretor.' (Foco)", onSelect: (p, N) => { p.foco += 10; N.diretor.patience += 10; }, nextEvent: 'JOGOTREINO_SARAPUI' },
            { text: "Tentar culpar a Cássia. 'Ela me persegue!' (Caos)", onSelect: (p, N) => { p.chaos += 10; N.diretor.patience -= 20; N.profCassia.patience -= 10; }, nextEvent: 'JOGOTREINO_SARAPUI' }
        ]
    },
    'ESCOLA_PROBLEMA_CASSIA_GENERICA_2': {
        text: "A Professora Cássia te chama na mesa. '[playerName], sua paciência comigo está em [profCassia.patience]. De novo. Se não melhorar, vou ligar para seus pais.'",
        choices: [
            { text: "Desculpe, professora. Vou focar mais.", onSelect: (p, N) => { p.foco += 20; N.profCassia.patience += 10; }, nextEvent: 'JOGOTREINO_SARAPUI' }, 
            { text: "Tenho que treinar. (Caos)", onSelect: (p, N) => { p.chaos += 5; p.foco -= 5; N.profCassia.patience -= 20; N.diretor.patience -= 5; }, nextEvent: 'JOGOTREINO_SARAPUI' }
        ]
    },
    
    // --- Jogo-Treino Sarapuí ---
    'JOGOTREINO_SARAPUI': {
        text: "Seu time ([player.team]) conseguiu um jogo-treino contra o **Meninos da Vila de Sarapuí**, um time respeitado da várzea vizinha, conhecido pela marcação dura. O jogo é uma vitrine para o resto do campeonato.",
        choices: [
            { text: "Jogar sério e tentar o passe decisivo. (Profissional)", onSelect: (p) => { p.skill += 1; }, nextEvent: 'JOGOTREINO_SARAPUI_EVENTO' },
            { text: "Ir para o drible e humilhar os rivais. (Caos)", onSelect: (p) => { p.chaos += 5; }, nextEvent: 'JOGOTREINO_SARAPUI_EVENTO' }
        ]
    },
    'JOGOTREINO_SARAPUI_EVENTO': {
        text: "O jogo está pegado. Você recebe a bola a 30 metros do gol. O zagueiro deles (um tal de Pé-de-Pano) já te avisou: 'Passou de mim, eu te quebro!' Você tem uma falta perigosa a seu favor.",
        onSelect: (p) => { p.gamesPlayed += 1; }, // Contabiliza Jogo
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
            { text: "Vitória moral!", onSelect: (p) => { p.fame += 10; p.followers += 500; p.money += 30; p.goals += 1; }, nextEvent: 'HUB_SEMANA_ESCOLAR_2' }
        ]
    },
    'JOGOTREINO_SARAPUI_FALHA': {
        text: "A falta vai para fora/na barreira. Pé-de-Pano ri. O jogo termina empatado sem gols. Você não brilhou, mas saiu ileso.",
        choices: [
            { text: "Melhorar para o próximo jogo.", nextEvent: 'HUB_SEMANA_ESCOLAR_2' }
        ]
    },

    
    // --- ROTEADOR DE EVENTOS ESCOLARES 2 (Pós-Sarapuí) ---
    'HUB_SEMANA_ESCOLAR_2': {
        text: "Outra semana começa na ETEC...",
        choices: [
            { 
                text: "(É hora de mudar o visual...)", 
                condition: (p) => p.fame > 20 && Math.random() > 0.5, 
                nextEvent: 'EVENTO_CABELO_CORTE'
            },
            { 
                text: "(Amanda te chama no corredor para a selfie...)", 
                condition: (p, N) => N.amanda.affinity > 20 && Math.random() > 0.4, 
                nextEvent: 'EVENTO_SELFIE_AMANDA' 
            },
            { 
                text: "(Lucas Lino te para no corredor...)", 
                condition: (p) => p.fame > 30 && Math.random() > 0.4, 
                nextEvent: 'EVENTO_CONSELHO_LUCAS' 
            },
            { 
                text: "(Você entra na sala da Professora Cássia...)", 
                nextEvent: 'ESCOLA_CHECK_CASSIA_ROULETTE_2' 
            }
        ]
    },
    // --- NOVO EVENTO: Corte de Cabelo ---
    'EVENTO_CABELO_CORTE': {
        text: "Você está se achando famoso. É hora de mudar o visual. Você vai no barbeiro do bairro. 'E aí, [playerName]! O que vamos mandar hoje?'",
        choices: [
            { text: "O 'Calvão de Cria' (raspado na zero). (Caos)", onSelect: (p) => { p.style = "Calvão de Cria"; p.chaos += 10; p.fame += 5; p.followers += 100; }, unlocksPost: 'post_cabelo_calvo', nextEvent: 'JOGO_5_PREP_BOCHE' },
            { text: "Platinar o cabelo. (Fama)", onSelect: (p) => { p.style = "Platinado"; p.fame += 10; p.followers += 200; }, unlocksPost: 'post_cabelo_platinado', nextEvent: 'JOGO_5_PREP_BOCHE' },
            { text: "Lançar um Moicano. (Fama/Caos)", onSelect: (p) => { p.style = "Moicano"; p.fame += 5; p.chaos += 5; p.followers += 150; }, unlocksPost: 'post_cabelo_moicano', nextEvent: 'JOGO_5_PREP_BOCHE' },
            { text: "Só 'fazer o pezinho' e manter o padrão. (Foco)", onSelect: (p) => { p.foco += 5; }, nextEvent: 'JOGO_5_PREP_BOCHE' }
        ]
    },
    'ESCOLA_CHECK_CASSIA_ROULETTE_2': {
        text: "Você entra na sala da Professora Cássia. Ela está na frente da classe...",
        choices: [
            {
                text: "(Ela te chama na mesa dela... 'PROBLEMA!')",
                condition: (p, N) => N.profCassia.patience <= 60,
                nextEvent: 'ESCOLA_PROBLEMA_CASSIA' 
            },
            {
                text: "(Ela te dá um 'bom dia' e te elogia?)",
                condition: (p, N) => N.profCassia.patience >= 90 && p.foco > 70,
                nextEvent: 'ESCOLA_CASSIA_ELOGIO' 
            },
            {
                text: "(Foi uma aula normal.)",
                nextEvent: 'JOGO_5_PREP_BOCHE' 
            }
        ]
    },
    'EVENTO_CONSELHO_LUCAS': {
        text: "Lucas Lino te para no intervalo. 'E aí, [playerName]. Tô vendo você ficando famosinho... Amanda, Julinha...'\n\n'Só toma cuidado pra não esquecer de onde a gente veio. A fama passa, o futebol fica. Foca no campo.'",
        choices: [
            { text: "Ouvir o conselho. 'Valeu, Lucas. Você tem razão.'", onSelect: (p) => { p.foco += 15; p.chaos -= 5; }, nextEvent: 'ESCOLA_CHECK_CASSIA_ROULETTE_2' },
            { text: "Ignorar. 'Relaxa, eu sei o que tô fazendo.'", onSelect: (p) => { p.chaos += 5; p.fame += 5; p.foco -= 10; }, nextEvent: 'ESCOLA_CHECK_CASSIA_ROULETTE_2' }
        ]
    },
    'EVENTO_SELFIE_AMANDA': {
        text: "Amanda te vê no corredor e corre na sua direção com o celular. 'Meu jogador! Amei o cabelo [player.style]!'\n\nEla está fazendo biquinho e todo mundo está olhando.",
        choices: [
            { text: "Tirar a selfie. (Fama/Caos)", onSelect: (p, N) => { p.fame += 10; p.chaos += 5; p.followers += 150; N.amanda.affinity += 10; }, unlocksPost: 'post_amanda_selfie', nextEvent: 'ESCOLA_CHECK_CASSIA_ROULETTE_2' },
            { text: "Recusar. 'Agora não, Amanda. Tô indo pra aula.' (Foco)", onSelect: (p, N) => { p.foco += 10; N.amanda.affinity -= 10; }, nextEvent: 'ESCOLA_CHECK_CASSIA_ROULETTE_2' }
        ]
    },
     'ESCOLA_PROBLEMA_CASSIA': {
        text: "A Professora Cássia te para na porta.\n\n'[playerName], suas notas estão um desastre e sua paciência comigo está em [profCassia.patience]. Se você não melhorar, vou ligar para seus pais e você vai parar com essa história de futebol.'",
        choices: [
            { text: "Desculpe, professora. Vou focar mais.", onSelect: (p, N) => { p.foco += 20; N.profCassia.patience += 10; }, nextEvent: 'JOGO_5_PREP_BOCHE' }, 
            { text: "Tenho que treinar. (Caos)", onSelect: (p, N) => { p.chaos += 5; p.foco -= 5; N.profCassia.patience -= 20; N.diretor.patience -= 10; }, nextEvent: 'JOGO_5_PREP_BOCHE' },
            { text: "Pedir ajuda e um trabalho extra. (Custo)", onSelect: (p, N) => { p.money -= 20; N.profCassia.patience += 30; }, condition: (p) => p.money >= 20, nextEvent: 'JOGO_5_PREP_BOCHE' }
        ]
    },
    'ESCOLA_CASSIA_ELOGIO': { 
        text: "A Professora Cássia te para no corredor. 'Parabéns, [playerName]. Mesmo com a fama no futebol, você manteve o foco nos estudos. Estou impressionada.'",
        choices: [
            { text: "Obrigado, professora!", onSelect: (p) => { p.fame += 5; p.foco += 20; }, nextEvent: 'JOGO_5_PREP_BOCHE' }
        ]
    },

    // --- JOGO 5: Boche FC ---
    'JOGO_5_PREP_BOCHE': {
        text: "Você continua no [player.team]. O próximo jogo é contra o Boche FC (da 2ª Divisão), um time muito sujo e violento. A pressão é alta para classificar.",
        choices: [
            { text: "Vamos pra cima!", skipIfFlag: 'skipJogo5', nextEvent: 'EVENTO_ZUEIRO_CACHORRO' }, 
            { text: "Sua chuteira rasgou. Precisa de uma nova.", condition: (p) => p.money < 50, nextEvent: 'EVENTO_DINHEIRO_CHUTEIRA' },
            { text: "(SUSPENSO) Assistir o jogo da arquibancada.", requiresFlag: 'skipJogo5', onSelect: (p) => { delete p.flags.skipJogo5; }, nextEvent: 'JOGO_6_PREP_AGUIA' } 
        ]
    },
    'EVENTO_DINHEIRO_CHUTEIRA': { 
        text: "No treino, sua única chuteira rasga. Você tem R$ [player.money]. Uma chuteira nova, decente, custa R$ 50.",
        choices: [
            { text: "Comprar a chuteira. (Gastar R$ 50)", onSelect: (p) => { p.money -= 50; p.skill += 1; }, condition: (p) => p.money >= 50, nextEvent: 'EVENTO_ZUEIRO_CACHORRO' },
            { text: "Pedir emprestado para o Lucas. (Caos)", onSelect: (p) => { p.chaos += 5; }, nextEvent: 'EVENTO_ZUEIRO_CACHORRO' },
            { text: "Jogar com ela rasgada mesmo. (Risco)", onSelect: (p) => { p.chaos += 10; p.skill -= 1; }, nextEvent: 'EVENTO_ZUEIRO_CACHORRO' }
        ]
    },
    'EVENTO_ZUEIRO_CACHORRO': {
        text: "O técnico está dando a preleção final antes do jogo contra o Boche FC. De repente, um cachorro vira-lata caramelo invade o campo, pega a bola do jogo e sai correndo! \n\nO massagista 'Tio Chico' corre atrás dele gritando: 'PEGA ELE! É A ÚNICA BOLA BOA!'",
        choices: [
            { text: "Ir atrás do cachorro. (Caos/Agilidade)", onSelect: (p) => { p.chaos += 2; p.skill += 1; }, nextEvent: 'JOGO_5_EVENTO_BOCHE' },
            { text: "Ficar rindo da situação. (Caos)", onSelect: (p) => { p.chaos += 1; p.foco -= 5; }, nextEvent: 'JOGO_5_EVENTO_BOCHE' }
        ]
    },
    'JOGO_5_EVENTO_BOCHE': {
        text: "Jogo contra o Boche FC. Como esperado, é uma guerra. Aos 90 minutos, 0 a 0, você sofre uma falta criminosa dentro da área. É PÊNALTI!",
        onSelect: (p) => { p.gamesPlayed += 1; }, 
        choices: [
            {
                text: "Pedir para bater o pênalti. (Pressão Máxima)",
                minigame: { type: 'penalty', onSuccess: 'JOGO_5_VITORIA_PENALTI', onFail: 'JOGO_5_DERROTA_PENALTI' }
            },
            { text: "Deixar o capitão bater. (Seguro)", onSelect: (p) => { p.chaos -= 2; }, nextEvent: 'JOGO_5_DERROTA_PENALTI' }
        ]
    },
    'JOGO_5_VITORIA_PENALTI': {
        text: "GOOOL! Você bateu com categoria! O [player.team] vence por 1 a 0 no último minuto! Você é o herói de novo! A classificação para a semifinal está próxima!",
        choices: [
            { 
                text: "Próxima fase!", 
                onSelect: (p) => { p.fame += 10; p.followers += 200; p.goals += 1; if (p.team === "Calcário EC") { p.money += 100; } }, 
                nextEvent: 'ESCOLA_INVEJA_2' 
            }
        ]
    },
    'JOGO_5_DERROTA_PENALTI': {
        text: "ERROU! Você (ou o capitão) bateu na trave! O Boche FC comemora como se fosse um título. O jogo termina 0 a 0 e a culpa cai em você.\n\nSeu 'Caos' aumenta.",
        choices: [
            { text: "Assumir a culpa.", onSelect: (p) => { p.chaos += 5; p.followers -= 20; }, nextEvent: 'ESCOLA_INVEJA_2' }
        ]
    },

    // --- Rola Amanda/Julinha ---
    'ESCOLA_INVEJA_2': {
        text: "Depois da sua atuação no Jogo 5 (seja o gol de pênalti ou o erro), sua fama na escola explode. Amanda Carolina agora te chama de 'Meu Jogador'.\n\nJulinha posta uma indireta no InstaVárzea: '#muitafama #poucotreino'",
        choices: [
            { text: "Continuar a jornada...", unlocksPost: 'post_julinha_provoca_1', nextEvent: 'ESCOLA_JULINHA_PROVOCA' } 
        ]
    },
    'ESCOLA_JULINHA_PROVOCA': { 
        text: "Você está no corredor da ETEC. Julinha (Bala de Prata) te para na frente de todos. 'E aí, [playerName]? Cuidado pra Amanda não te prender na coleira. Ouvi dizer que ela gosta de 'jogador' obediente.'",
        choices: [
            { text: "Defender Amanda: 'Ela é minha garota.'", onSelect: (p, N) => { N.amanda.affinity += 10; N.julinha.affinity -= 10; }, nextEvent: 'EVENTO_JULINHA_NIVER_CONVITE' },
            { text: "Flertar com Julinha: 'E você, gosta de que tipo?'", onSelect: (p, N) => { p.chaos += 10; N.julinha.affinity += 15; N.amanda.affinity -= 10; }, unlocksPost: 'post_julinha_provoca_2', nextEvent: 'ROLO_JULINHA_1' }, 
            { text: "Ignorar as duas e ir para a aula.", onSelect: (p) => { p.foco += 10; }, nextEvent: 'EVENTO_JULINHA_NIVER_CONVITE' }
        ]
    },
    'ROLO_JULINHA_1': { 
        text: "Julinha ri. 'Gosto dos que não têm dona.' Ela te manda uma DM mais tarde: 'Sábado à noite, Praça do Coreto. Sozinho. Vamos ver se você é tão bom fora do campo.'",
        choices: [
            { text: "Ir ao encontro de Julinha. (Caos)", onSelect: (p, N) => { p.chaos += 15; p.fame += 10; N.julinha.affinity += 10; p.foco -= 20; }, unlocksPost: 'post_julinha_flerte', nextEvent: 'AMANDA_CONFRONTO_JULINHA' },
            { text: "Ignorar. Tenho treino no domingo.", onSelect: (p, N) => { p.foco += 20; N.julinha.affinity -= 10; }, nextEvent: 'EVENTO_JULINHA_NIVER_CONVITE' }
        ]
    },
    'AMANDA_CONFRONTO_JULINHA': { 
        text: "Amanda viu o post da Julinha. Ela te encontra na escola, furiosa. 'O que significa aquele post da [playerName] na praça, [playerName]? Você tá de rolo com aquela torcedora de time de segunda?'",
        choices: [
            { text: "Mentir: 'Ela é louca. Só falei de futebol.'", onSelect: (p, N) => { p.chaos += 5; N.amanda.affinity -= 5; }, nextEvent: 'EVENTO_JULINHA_NIVER_CONVITE' },
            { text: "Assumir: 'A gente só conversou. Você não é minha dona.'", onSelect: (p, N) => { p.chaos += 20; N.amanda.affinity -= 30; N.julinha.affinity += 10; }, unlocksPost: 'post_amanda_ciumes', nextEvent: 'EVENTO_JULINHA_NIVER_CONVITE' },
            { text: "Culpar Julinha: 'Ela tá inventando pra ganhar fama.'", onSelect: (p, N) => { N.amanda.affinity += 5; N.julinha.affinity -= 20; }, nextEvent: 'EVENTO_JULINHA_NIVER_CONVITE' }
        ]
    },
    
    
    // --- ARCO: Aniversário da Julinha (com Julio Cisterna) ---
    'EVENTO_JULINHA_NIVER_CONVITE': {
        text: "É sexta-feira à noite. Seu celular vibra. DM de Julinha: 'Meu niver amanhã. Festinha aqui na chácara do meu pai. Só vai vir a galera do Bala de Prata e da 1ª Divisão. Vai encarar ou vai ficar na coleira da Amanda?'",
        choices: [
            { text: "Ir à festa. (Caos/Oportunidade)", onSelect: (p, N) => { p.chaos += 10; p.foco -= 20; N.julinha.affinity += 10; N.amanda.affinity -= 5; }, unlocksPost: 'post_julinha_niver', nextEvent: 'EVENTO_JULINHA_NIVER_FESTA' },
            { text: "Recusar educadamente. (Foco/Lealdade Amanda)", onSelect: (p, N) => { p.foco += 10; N.julinha.affinity -= 10; N.amanda.affinity += 5; }, nextEvent: 'JOGO_6_PREP_AGUIA' }
        ]
    },
    'EVENTO_JULINHA_NIVER_FESTA': {
        text: "A chácara está lotada. O som é ensurdecedor. Julinha te vê, sorri e te entrega um copo vermelho. 'Bebe, [playerName]! Hoje é dia de comemorar!' A galera do Bala de Prata te encara feio.",
        choices: [
            { text: "Beber e curtir a festa. (Caos)", onSelect: (p) => { p.chaos += 10; p.foco -= 20; }, nextEvent: 'EVENTO_JULINHA_NIVER_JULIO' },
            { text: "Ficar só no networking, sem beber. (Fama)", onSelect: (p) => { p.fame += 10; p.foco -= 5; }, nextEvent: 'EVENTO_JULINHA_NIVER_JULIO' }
        ]
    },
    'EVENTO_JULINHA_NIVER_JULIO': {
        text: "Julinha te puxa para apresentar o irmão mais velho dela. 'Esse é o [playerName], o [playerPos] do [player.team].'\n\nUm cara alto, forte e marrento te mede de cima a baixo. 'Então esse é o famoso? Sou Julio Cisterna [5], volante do Bala de Prata. Prazer.'\n\nEle aperta sua mão com força. 'Aproveita a 2ª Divisão, moleque. A 1ª é pra homem.'",
        choices: [
            { text: "Encarar de volta. 'Vou subir e te atropelar, Cisterna.' (Caos)", onSelect: (p, N) => { p.chaos += 10; N.julioCisterna.rivalry += 15; N.julinha.affinity += 5; }, unlocksPost: 'post_julio_cisterna_festa', nextEvent: 'EVENTO_JULINHA_NIVER_OPCOES' },
            { text: "Ignorar a provocação. 'Prazer. Bela festa.' (Foco)", onSelect: (p, N) => { p.foco += 5; N.julioCisterna.rivalry += 5; }, nextEvent: 'EVENTO_JULINHA_NIVER_OPCOES' },
            { text: "Rir. 'Veremos. Ouvi dizer que você é lento.' (Fama)", onSelect: (p, N) => { p.fame += 5; p.chaos += 5; N.julioCisterna.rivalry += 10; N.julinha.affinity += 5; }, nextEvent: 'EVENTO_JULINHA_NIVER_OPCOES' }
        ]
    },
    'EVENTO_JULINHA_NIVER_OPCOES': {
        text: "Você está no meio da festa. A música está alta. Você vê o capitão do Bala de Prata (o ex dela) te olhando torto. Julio Cisterna [5] também te observa.",
        choices: [
            { text: "Ir falar com o capitão rival. (Networking/Risco)", onSelect: (p) => { p.fame += 5; p.chaos += 5; }, nextEvent: 'JOGO_6_PREP_AGUIA' },
            { text: "Puxar Julinha para dançar. (Caos/Romance)", onSelect: (p, N) => { p.chaos += 10; N.julinha.affinity += 15; }, nextEvent: 'EVENTO_JULINHA_NIVER_FICA' },
            { text: "Beber mais e curtir a piscina. (Caos Total)", onSelect: (p, N) => { p.chaos += 15; p.foco -= 25; N.profCassia.patience -= 10; N.diretor.patience -= 5; }, nextEvent: 'JOGO_6_PREP_AGUIA' }
        ]
    },
    'EVENTO_JULINHA_NIVER_FICA': {
        text: "Você puxa Julinha para dançar. Ela ri. 'Você é rápido, [playerPos]...'\n\nO clima esquenta, mas antes que algo aconteça, Julio Cisterna [5] chega. 'Opa, opa. Menos, [playerName]. Minha irmã. Respeito.'\n\nO ex dela (o Capitão) só observa de longe.",
        choices: [
            { text: "Peitar ele. 'Ela não é sua.' (Caos)", onSelect: (p, N) => { p.chaos += 10; p.fame += 5; N.julioCisterna.rivalry += 10; }, nextEvent: 'JOGO_6_PREP_AGUIA' },
            { text: "Sair de fininho. 'Calma, só dançando.' (Foco)", onSelect: (p, N) => { p.foco += 5; N.julinha.affinity -= 5; }, nextEvent: 'JOGO_6_PREP_AGUIA' }
        ]
    },

    // --- JOGO 6: Águia Paulista (Assist Lucas) ---
    'JOGO_6_PREP_AGUIA': {
        text: "Depois do fim de semana agitado, o foco volta para o campeonato. O próximo jogo é contra o Águia Paulista. Um time rápido, mas que deixa espaços. Lucas Lino parece nervoso, a família dele veio assistir.",
        choices: [
            { text: "Vamos pra cima!", skipIfFlag: 'skipJogo6', nextEvent: 'JOGO_6_EVENTO_AGUIA' },
            { text: "(SUSPENSO) Assistir o jogo da arquibancada.", requiresFlag: 'skipJogo5', onSelect: (p) => { delete p.flags.skipJogo5; }, nextEvent: 'JOGO_7_PREP_RESSAK' } 
        ]
    },
    'JOGO_6_EVENTO_AGUIA': {
        text: "Jogo contra o Águia Paulista. 0 a 0, segundo tempo. A zaga deles sai jogando errado e a bola sobra limpa para você na entrada da área. O goleiro sai desesperado.\n\nVocê vê de rabo de olho seu amigo, Lucas Lino, entrando livre na segunda trave.",
        onSelect: (p) => { p.gamesPlayed += 1; },
        choices: [
            { text: "Tocar para o Lucas Lino fazer o gol. (Assistência/Foco)", onSelect: (p, N) => { p.skill += 1; p.foco += 10; p.assists += 1; N.lucas.affinity += 10; }, unlocksPost: 'post_aguia_assist_lucas', nextEvent: 'JOGO_6_RESULTADO_VITORIA' },
            { text: "Chutar no gol e garantir a fama. (Fama)", onSelect: (p) => { p.goals += 1; p.fame += 5; p.skill += 1; }, nextEvent: 'JOGO_6_RESULTADO_VITORIA' },
            { text: "Tentar driblar o goleiro e cavar. (Caos)", onSelect: (p, N) => { p.chaos += 5; N.lucas.affinity -= 10; }, nextEvent: 'JOGO_6_RESULTADO_EMPATE' }
        ]
    },
    'JOGO_6_RESULTADO_VITORIA': {
        text: "Gol! O [player.team] vence por 1 a 0! Seja com seu gol ou sua assistência, o time está classificado para as Oitavas de Final!",
        choices: [
            { text: "Oitavas, aqui vamos nós!", nextEvent: 'JOGO_7_PREP_RESSAK' }
        ]
    },
    'JOGO_6_RESULTADO_EMPATE': {
        text: "Você tentou o drible e o goleiro pegou. O jogo termina 0 a 0. O técnico fica irritado com sua 'fome de bola'. 'Era só tocar, [playerName]!'",
        choices: [
            { text: "Droga...", onSelect: (p) => { p.chaos += 5; }, nextEvent: 'JOGO_7_PREP_RESSAK' }
        ]
    },

    // --- NOVO JOGO 7: Ressak (Oitavas) ---
    'JOGO_7_PREP_RESSAK': {
        text: "OITAVAS DE FINAL. O jogo é contra o Ressak. O time é fraco, mas o técnico te avisa: 'É mata-mata. Não podemos dar bobeira. Mateus [10] e Cauã [3] vão ser titulares com você.'",
        choices: [
            { text: "Vamos garantir a vaga. (Foco)", onSelect: (p) => { p.foco += 10; }, nextEvent: 'JOGO_7_EVENTO_RESSAK' },
            { text: "Hora do show. Vou driblar todo mundo. (Caos)", onSelect: (p, N) => { p.chaos += 5; N.mateus.affinity += 5; N.caua.affinity -= 5; }, nextEvent: 'JOGO_7_EVENTO_RESSAK' }
        ]
    },
    'JOGO_7_EVENTO_RESSAK': {
        text: "Jogo fácil. 2 a 0 pro [player.team]. 80 minutos. Você dá um drible no zagueiro e ele te derruba na área. PÊNALTI!\n\nVocê pega a bola para bater. Mateus [10] se aproxima.",
        onSelect: (p) => { p.gamesPlayed += 1; },
        choices: [
            { text: "Bater o pênalti. (Eu sou o cobrador)", nextEvent: 'JOGO_7_PENALTI_MATEUS_ROUBA' },
            { text: "Deixar o Mateus bater. (Companheirismo)", onSelect: (p, N) => { p.foco += 5; N.mateus.affinity += 10; }, nextEvent: 'JOGO_7_PENALTI_MATEUS_BATE' }
        ]
    },
    'JOGO_7_PENALTI_MATEUS_ROUBA': {
        text: "Você ajeita a bola. Mateus [10] te empurra de leve. 'Sai daí, [playerName]. Deixa comigo, eu sou o 10.'\n\nEle pega a bola da sua mão, ignora o técnico gritando e ajeita na marca.",
        choices: [
            { text: "Deixar ele bater (puto). (Caos)", onSelect: (p, N) => { p.chaos += 10; N.mateus.affinity -= 10; }, nextEvent: 'JOGO_7_PENALTI_MATEUS_ERRA' },
            { text: "Tirar a bola dele à força. (Caos Total)", onSelect: (p, N) => { p.chaos += 20; N.mateus.affinity -= 20; N.caua.affinity -= 10; }, nextEvent: 'JOGO_7_PENALTI_MATEUS_ERRA' }
        ]
    },
    'JOGO_7_PENALTI_MATEUS_BATE': {
        text: "Você entrega a bola para Mateus. Ele sorri, marrento. 'Olha e aprende, [playerPos].'",
        choices: [
            { text: "...", nextEvent: 'JOGO_7_PENALTI_MATEUS_ERRA' }
        ]
    },
    'JOGO_7_PENALTI_MATEUS_ERRA': {
        text: "Mateus corre para a bola... e ISOLA! Ele chuta a bola por cima do alambrado. O técnico arranca os cabelos. Cauã [3] te olha com um olhar de 'Eu avisei'.",
        choices: [
            { text: "Ir xingar o Mateus. (Caos)", onSelect: (p, N) => { p.chaos += 10; }, unlocksPost: 'post_juventus_penalty', nextEvent: 'JOGO_7_RESULTADO_RESSAK' },
            { text: "Bater palmas (ironicamente). (Fama)", onSelect: (p, N) => { p.fame += 5; }, unlocksPost: 'post_juventus_penalty', nextEvent: 'JOGO_7_RESULTADO_RESSAK' },
            { text: "Ignorar. O jogo está ganho. (Foco)", onSelect: (p, N) => { p.foco += 10; }, unlocksPost: 'post_juventus_penalty', nextEvent: 'JOGO_7_RESULTADO_RESSAK' }
        ]
    },
    'JOGO_7_RESULTADO_RESSAK': {
        text: "Apesar do pênalti perdido, o jogo termina 2 a 0. O [player.team] está nas Quartas de Final. No vestiário, o técnico dá uma bronca histórica em Mateus.",
        choices: [
            { text: "Próxima fase!", unlocksPost: 'post_ressak_vitoria', nextEvent: 'JOGO_8_PREP_SEMIFINAL' }
        ]
    },
    

    // --- JOGO 8: Semifinal (Antigo Jogo 7) ---
    'JOGO_8_PREP_SEMIFINAL': {
        text: "É a SEMIFINAL do Gramadinho! O [player.team] contra o **Palmeirinha**. O técnico está nervoso.\n\n'Eles têm um zagueiro muito rápido. [playerName], preciso que você jogue inteligente.'",
        choices: [
            { text: "Ok, técnico. Vou me sacrificar pelo time.", skipIfFlag: 'skipJogo8', onSelect: (p) => { p.skill += 1; p.chaos -= 5; p.foco += 15; }, nextEvent: 'JOGO_8_EVENTO_SEMIFINAL' }, 
            { text: "Técnico, eu sou [playerPos], meu negócio é gol. (Caos)", skipIfFlag: 'skipJogo8', onSelect: (p) => { p.chaos += 5; p.foco -= 5; }, nextEvent: 'JOGO_8_EVENTO_SEMIFINAL' },
            { text: "Julinha está na torcida te secando.", skipIfFlag: 'skipJogo8', condition: (p, N) => N.julinha.affinity > 10, nextEvent: 'VARZEA_JULINHA_JOGO' },
            { text: "(SUSPENSO) Assistir o jogo da arquibancada.", requiresFlag: 'skipJogo8', onSelect: (p) => { delete p.flags.skipJogo8; }, nextEvent: 'JOGO_9_PREP_SUSPENSO' } // Evento de suspensão
        ]
    },
    'VARZEA_JULINHA_JOGO': { 
        text: "A semifinal está prestes a começar. Você vê Julinha na arquibancada, rindo e apontando para você com as amigas dela.\n\nEla grita: 'ANDA, [playerName]! FAZ UM GOL PRA MIM!'",
        choices: [
            { text: "Tentar um drible impossível para se exibir. (Caos)", onSelect: (p) => { p.chaos += 10; p.fame += 5; }, nextEvent: 'JOGO_8_EVENTO_SEMIFINAL' },
            { text: "Ignorar e focar na tática do técnico.", onSelect: (p) => { p.foco += 15; }, nextEvent: 'JOGO_8_EVENTO_SEMIFINAL' }
        ]
    },
    'JOGO_8_EVENTO_SEMIFINAL': {
        text: "Semifinal tensa. 1 a 1, 89 minutos. Você recebe a bola no meio-campo. É você e o último zagueiro do Palmeirinha. A final está nos seus pés.",
        onSelect: (p) => { p.gamesPlayed += 1; }, 
        choices: [
            { 
                text: "Partir para o drible! (Tudo ou Nada)", 
                minigame: { type: 'dribble', onSuccess: 'JOGO_8_VITORIA', onFail: 'JOGO_8_DERROTA' }
            },
            { 
                text: "Tocar para o lado e ir para os pênaltis. (Risco)", 
                onSelect: (p) => { p.chaos -= 5; }, 
                nextEvent: 'JOGO_8_PENALTIS' 
            }
        ]
    },
    'JOGO_8_PENALTIS': { 
        text: "Você tocou de lado. O jogo vai para os pênaltis. O técnico te escolhe como o 5º batedor. A responsabilidade é sua.",
        choices: [
            { 
                text: "Bater o pênalti decisivo.", 
                minigame: { type: 'penalty', onSuccess: 'JOGO_8_VITORIA', onFail: 'JOGO_8_DERROTA' }
            }
        ]
    },
    'JOGO_8_VITORIA': { 
        text: "VOCÊ CONSEGUIU! Seja no drible ou no pênalti, você colocou o [player.team] na GRANDE FINAL da 2ª Divisão!",
        onSelect: (p) => { p.goals += 1; }, 
        choices: [
            { text: "É A FINAL! ...Mas antes...", nextEvent: 'INTERCLASSE_INTRO' }
        ]
    },
    'JOGO_8_DERROTA': { 
        text: "Você tentou o drible (ou errou o pênalti) e o zagueiro te desarmou. O juiz apita o fim do jogo. O [player.team] está eliminado na semifinal.\n\nVocê, [playerName], 16 anos, vê seu sonho de subir acabar... por enquanto.",
        choices: [
            { text: "Fim da temporada da Várzea... Mas ainda tem o Interclasse.", onSelect: (p) => { p.flags.derrotaSemifinal = true; }, nextEvent: 'INTERCLASSE_INTRO' } 
        ]
    },
    // Fim do Jogo 8 (Suspenso)
    'JOGO_9_PREP_SUSPENSO': {
        text: "Você voltou da suspensão de 2 jogos. Seu time ([player.team]) foi eliminado na semifinal (Jogo 8) enquanto você estava fora. Você está com fama de 'bad boy'.\n\nAmanda te ignora na escola. Marcos te chama de 'esquentadinho'.",
        choices: [
            { text: "Preciso recomeçar... Pelo menos no Interclasse.", onSelect: (p) => { p.flags.derrotaSemifinal = true; }, nextEvent: 'INTERCLASSE_INTRO' }
        ]
    },

    // --- ARCO: INTERCLASSE ETEC ---
    'INTERCLASSE_INTRO': {
        text: "Apesar do resultado na Várzea, a vida escolar continua. A Professora Cássia anuncia: 'Atenção, turma. Começou o Interclasse. O 2° Informática (sua sala) joga hoje nas Oitavas.'\n\nSeu amigo te cutuca: 'Fudeu, é contra o 2° TS (T.S.I.).'",
        choices: [
            { text: "Oitavas? Hoje? Vamos pra cima.", nextEvent: 'INTERCLASSE_OITAVAS_TS' }
        ]
    },
    'INTERCLASSE_OITAVAS_TS': {
        text: "Oitavas de Final: 2° Info vs. 2° TS. Os caras são enormes e só sabem bater. O jogo é na quadra. A bola é pesada. Eles dão carrinho, puxão... O juiz é o professor de Ed. Física, que não marca nada.\n\nSeu time (2° Info) é: Você (10), Lucas (5), 'Nerdola' (Goleiro), 'Pro-Player do CS' (7) e 'Gordão da Lanchonete' (9).\n\nO que você faz?",
        onSelect: (p) => { p.interclasse.games += 1; },
        choices: [
            { text: "Tática: Tocar pro 'Pro-Player' (7) e deixar ele tentar a skill.", onSelect: (p) => { p.fame += 5; p.skill += 1; p.interclasse.goals += 1; p.interclasse.assists += 1; }, nextEvent: 'INTERCLASSE_QUARTAS_LING' },
            { text: "Tática: Tentar a jogada individual e humilhar. (Você, 10)", onSelect: (p) => { p.fame += 10; p.skill += 1; p.interclasse.goals += 2; }, nextEvent: 'INTERCLASSE_QUARTAS_LING' },
            { text: "Tática: Tocar pro 'Gordão' (9) fazer o pivô e bater de volta. (Caos)", onSelect: (p) => { p.chaos += 10; p.foco -= 5; }, nextEvent: 'INTERCLASSE_QUARTAS_LING' }
        ]
    },
    'INTERCLASSE_QUARTAS_LING': {
        text: "Quartas de Final: 2° Info vs. 2° Linguagens (Sala da Amanda). O jogo começa e você percebe algo estranho: a sala inteira dela está te vaiando. Amanda nem olha na sua cara. 'Mercenário!', grita um. 'Se acha o rei!', grita outro.\n\nO jogo está 0-0, tenso.",
        onSelect: (p) => { p.interclasse.games += 1; },
        choices: [
            { text: "Jogar com raiva. Chutar de qualquer lugar. (Caos)", onSelect: (p) => { p.chaos += 5; p.interclasse.goals += 1; }, nextEvent: 'INTERCLASSE_SEMI_RH' },
            { text: "Tabelar com Lucas (5) e jogar bonito. (Foco)", onSelect: (p, N) => { p.skill += 1; p.foco += 10; p.interclasse.goals += 2; p.interclasse.assists += 1; N.amanda.affinity -= 5; }, nextEvent: 'INTERCLASSE_SEMI_RH' },
            { text: "Fazer um gol e mandar a torcida 'calar a boca'. (Fama/Caos)", onSelect: (p, N) => { p.fame += 5; p.chaos += 5; p.interclasse.goals += 1; N.amanda.affinity -= 10; }, nextEvent: 'INTERCLASSE_SEMI_RH' }
        ]
    },
    'INTERCLASSE_SEMI_RH': {
        text: "Semifinal: 2° Info vs. 3° RH. A sala das meninas mais famosas (e bonitas) da ETEC. Elas estão na arquibancada com cartazes com seu nome. 'GATO!', 'CASA COMIGO [playerName]!'.\n\nJulinha e Amanda assistem de longe, com raiva.",
        onSelect: (p) => { p.interclasse.games += 1; },
        choices: [
            { text: "Dar um show. Dribles, chapéus e 2 gols. (Fama)", onSelect: (p, N) => { p.fame += 20; p.followers += 500; p.skill += 1; p.interclasse.goals += 2; N.amanda.affinity -= 5; N.julinha.affinity += 5; }, unlocksPost: 'post_amanda_ciumes', nextEvent: 'INTERCLASSE_FINAL_ADM' },
            { text: "Jogar sério e focar na final. (Foco)", onSelect: (p) => { p.foco += 10; p.interclasse.goals += 1; }, nextEvent: 'INTERCLASSE_FINAL_ADM' }
        ]
    },
    'INTERCLASSE_FINAL_ADM': {
        text: "A GRANDE FINAL do Interclasse: 2° Info vs. 2° ADM. O ginásio está lotado. O 2° ADM tem o 'melhor aluno' (um tal de Renan) e TRÊS PROFESSORES jogando com eles (Contabilidade, Gestão e Ética). É uma 'panela' clara.\n\nRenan te provoca: 'Aqui não é terrão, [playerPos]. Vai chorar?'",
        onSelect: (p) => { p.interclasse.games += 1; },
        choices: [
            { text: "Responder: 'Nem com professor vocês ganham.' (Caos)", onSelect: (p, N) => { p.chaos += 5; N.profCassia.patience -= 5; }, nextEvent: 'INTERCLASSE_FINAL_JOGO' },
            { text: "Ignorar e ir pro jogo. (Foco)", onSelect: (p) => { p.foco += 10; }, nextEvent: 'INTERCLASSE_FINAL_JOGO' }
        ]
    },
    'INTERCLASSE_FINAL_JOGO': {
        text: "O jogo é um ROUBO. Os professores-juízes marcam tudo contra vocês. Está 1 a 0 para o ADM, último minuto. Você tem a última bola. É uma falta de longe. O professor de Ética está no gol.",
        choices: [
            { 
                text: "Bater a falta! (Tudo ou Nada)", 
                minigame: { type: 'freekick', onSuccess: 'INTERCLASSE_FINAL_VITORIA', onFail: 'INTERCLASSE_FINAL_DERROTA' } 
            },
            { 
                text: "Tentar o drible em todo mundo. (Fama/Risco)", 
                minigame: { type: 'dribble', onSuccess: 'INTERCLASSE_FINAL_VITORIA', onFail: 'INTERCLASSE_FINAL_DERROTA' } 
            }
        ]
    },
    'INTERCLASSE_FINAL_VITORIA': {
        text: "GOOOOOL! Na gaveta! Você calou o ginásio! Você venceu a 'panela' dos professores e do 2° ADM! Sua sala invade a quadra! Você é, oficialmente, O REI DA ETEC!",
        choices: [
            { 
                text: "Levantar o troféu!", 
                onSelect: (p) => { p.fame += 50; p.followers += 1000; p.skill += 2; p.interclasse.goals += 1; }, 
                unlocksPost: 'post_interclasse_campeao',
                nextEvent: 'POS_INTERCLASSE_HUB'
            }
        ]
    },
    'INTERCLASSE_FINAL_DERROTA': {
        text: "Você errou. O juiz apita. A 'panela' do 2° ADM vence. Renan tira sarro da sua cara. 'Faltou campinho de terra, né?'\n\nVocê perdeu, mas todos viram que foi roubado.",
        choices: [
            { 
                text: "Ir para o vestiário...", 
                onSelect: (p) => { p.chaos += 10; p.fame += 10; }, 
                unlocksPost: 'post_interclasse_renan',
                nextEvent: 'POS_INTERCLASSE_HUB'
            }
        ]
    },

    // --- PÓS-INTERCLASSE (Roteador para Várzea) ---
    'POS_INTERCLASSE_HUB': {
        text: "A poeira do Interclasse baixou. Agora, resta o destino do campeonato da Várzea...",
        choices: [
            { 
                text: "Pelo menos o Interclasse foi louco... (Fim da Temporada)", 
                condition: (p) => p.flags.derrotaSemifinal === true, 
                nextEvent: 'VARZEA_CHURRASCO_TIME' 
            },
            { 
                text: "Ganhei (ou perdi) o Interclasse. Agora quero a Final da Várzea.", 
                condition: (p) => !p.flags.derrotaSemifinal, 
                nextEvent: 'EVENTO_JULINHA_APOSTA' 
            }
        ]
    },
    
    // --- Aposta da Julinha ---
    'EVENTO_JULINHA_APOSTA': {
        text: "É a véspera da FINAL da Várzea. Você está na praça. Julinha (do Bala de Prata, o time rival) senta ao seu lado.\n\n'E aí, Rei da ETEC. Tá se achando, né? Tão confiante que aposto... se você ganhar amanhã... te dou um beijo.'\n\nEla fala rindo, em tom de deboche total, como se fosse impossível.",
        choices: [
            { text: "'Aposta aceita. Prepara o batom.' (Caos)", onSelect: (p, N) => { p.chaos += 5; p.flags.apostaJulinha = true; N.julioCisterna.rivalry += 5; }, nextEvent: 'FINAL_2DIV_PREP' },
            { text: "'Não preciso de aposta. Vou ganhar de qualquer jeito.' (Foco)", onSelect: (p) => { p.foco += 5; }, nextEvent: 'FINAL_2DIV_PREP' }
        ]
    },

    // --- Final 2ª Divisão ---
    'FINAL_2DIV_PREP': {
        text: "É a semana da final da VÁRZEA. A cidade não fala de outra coisa. O [player.team] contra o Bala de Prata. Julio Cisterna [5], o capitão deles, e Julinha passaram a semana postando indireta.\n\n'Rei da ETEC? Vamos ver se é rei do Gramadinho.'",
        choices: [
            { text: "Treinar focado, ignorar provocações.", onSelect: (p) => { p.foco += 30; p.skill += 1; }, nextEvent: 'FINAL_2DIV_EVENTO' },
            { text: "Responder a provocação no InstaVárzea.", onSelect: (p, N) => { p.chaos += 5; p.fame += 5; p.foco -= 10; N.julioCisterna.rivalry += 5; }, unlocksPost: 'post_player_foco_1', nextEvent: 'FINAL_2DIV_EVENTO' }
        ]
    },
    'FINAL_2DIV_EVENTO': {
        text: "A FINAL. Campo do Gramadinho lotado. Julinha está na torcida organizada rival. Julio Cisterna [5] te caça em campo. Jogo 0 a 0, 92 minutos. Último lance. Você sofre uma falta de Cisterna na beira da área. É a bola do título.",
        onSelect: (p) => { p.gamesPlayed += 1; }, 
        choices: [
            { 
                text: "Bater a falta! (Glória ou Morte)",
                minigame: { type: 'freekick', onSuccess: 'FINAL_2DIV_CAMPEAO', onFail: 'FINAL_2DIV_VICE' }
            },
            { 
                text: "Deixar o Mateus [10] bater. (Caos)",
                onSelect: (p, N) => { p.chaos += 10; p.fame -= 10; N.mateus.affinity += 5; },
                nextEvent: 'FINAL_2DIV_VICE_MATEUS'
            }
        ]
    },
    'FINAL_2DIV_CAMPEAO': {
        text: "GOOOOOOOOOOOL! NO ÂNGULO! O [player.team] É CAMPEÃO DA 2ª DIVISÃO! Você é o herói! A torcida invade o campo! Julinha e Julio Cisterna te olham da arquibancada, chocados.\n\n(Se você apostou, você pisca para ela, lembrando da aposta.)",
        choices: [
            { 
                text: "CAMPEÃO!", 
                onSelect: (p) => { p.fame += 50; p.skill += 3; p.followers += 2000; p.goals += 1; if (p.team === "Calcário EC") { p.money += 200; } }, 
                unlocksPost: 'post_final_2div_campeao', 
                nextEvent: 'EVENTO_POS_FINAL_HUB' 
            }
        ]
    },
    'FINAL_2DIV_VICE': {
        text: "NA TRAVE! (Ou o goleiro pegou). O juiz apita o fim do jogo. O Bala de Prata é campeão. Julinha e Julio Cisterna comemoram na sua cara. 'EU FALEI!', ela grita.",
        choices: [
            { text: "Foi por pouco...", onSelect: (p) => { p.chaos += 10; p.fame += 10; }, nextEvent: 'VARZEA_CHURRASCO_TIME' }
        ]
    },
    'FINAL_2DIV_VICE_MATEUS': {
        text: "Mateus [10] ajeita a bola, bate... E ISOLA! A bola vai parar no estacionamento. O juiz apita o fim do jogo. O Bala de Prata é campeão. Julio Cisterna ri da sua cara.",
        choices: [
            { text: "Eu não acredito nisso...", onSelect: (p) => { p.chaos += 15; p.fame += 5; }, nextEvent: 'VARZEA_CHURRASCO_TIME' }
        ]
    },
    
    // --- ROTEADOR PÓS-FINAL (Para Aposta) ---
    'EVENTO_POS_FINAL_HUB': {
        text: "A festa do título está rolando no campo...",
        choices: [
            { 
                text: "(Julinha se aproxima...)", 
                condition: (p) => p.flags.apostaJulinha === true, 
                nextEvent: 'EVENTO_JULINHA_BEIJO_APOSTA' 
            },
            { 
                text: "(Ir comemorar com o time)", 
                condition: (p) => !p.flags.apostaJulinha, 
                nextEvent: 'FIM_TEMPORADA_VARZEA' 
            }
        ]
    },
    'EVENTO_JULINHA_BEIJO_APOSTA': {
        text: "No meio da festa, Julinha te puxa para trás da arquibancada. Ela está furiosa, mas com um sorriso de canto de boca. 'Droga, [playerName]. Você conseguiu.'\n\n'Uma aposta é uma aposta.'\n\nEla te puxa pela nuca e te dá um beijo.",
        choices: [
            { text: "'(Risos) Beijo bom é beijo de rival.' (Caos)", onSelect: (p, N) => { p.fame += 10; p.chaos += 5; N.julinha.affinity += 15; }, nextEvent: 'EVENTO_JULINHA_BEIJO_RESPOSTA' },
            { text: "'Só isso?' (Fama)", onSelect: (p, N) => { p.fame += 5; N.julinha.affinity += 5; }, nextEvent: 'EVENTO_JULINHA_BEIJO_APOSTA_2' },
            { text: "'...Obrigado.' (Foco)", onSelect: (p, N) => { p.foco += 5; N.julinha.affinity += 10; }, nextEvent: 'EVENTO_JULINHA_BEIJO_APOSTA_2' }
        ]
    },
    'EVENTO_JULINHA_BEIJO_RESPOSTA': {
        text: "Julinha ri. 'Você é um idiota.' Ela te puxa e te beija de novo, mais demorado.\n\nQuando ela se afasta, ela te dá um empurrão leve. 'Mas foi pura sorte. Ano que vem o Bala de Prata te pega na 1ª Divisão!'",
        choices: [
            { text: "'Estarei esperando.'", unlocksPost: 'post_julinha_beijo', nextEvent: 'FIM_TEMPORADA_VARZEA' }
        ]
    },
    'EVENTO_JULINHA_BEIJO_APOSTA_2': {
        text: "Julinha revira os olhos. 'Não se acostuma, Rei da ETEC.'\n\nEla se vira e vai embora, mas você nota ela olhando para trás uma última vez antes de sumir na multidão.",
        choices: [
            { text: "...", unlocksPost: 'post_julinha_beijo', nextEvent: 'FIM_TEMPORADA_VARZEA' }
        ]
    },

    // --- Fim de Temporada (Rota A) ---
    'VARZEA_CHURRASCO_TIME': { 
        text: "Apesar da derrota (ou mesmo com a vitória), o time se reúne para o churrasco de fim de temporada. A cerveja está rolando e o som está alto.\n\n'Não foi dessa vez, [playerName], mas você jogou muito' (se perdeu) ou 'É CAMPEÃO!' (se ganhou).",
        choices: [
            { text: "Ficar na festa, beber e afogar as mágoas/comemorar. (Caos)", onSelect: (p) => { p.chaos += 10; p.foco -= 20; }, nextEvent: 'FIM_TEMPORADA_VARZEA' },
            { text: "Comer a carne e ir para casa descansar. (Disciplina)", onSelect: (p) => { p.foco += 20; }, nextEvent: 'FIM_TEMPORADA_VARZEA' }
        ]
    },
    'FIM_TEMPORADA_VARZEA': { 
        text: "A temporada acabou. Você fez seu nome na 2ª Divisão...",
        choices: [
            { text: "Djalma Freitas te manda uma DM...", 
              condition: (p) => p.metDjalma === false, 
              onSelect: (p) => { p.fame += 10; p.metDjalma = true; }, 
              unlocksPost: 'post_djalma_olheiro', 
              nextEvent: 'ENCONTRO_DJALMA_1' 
            },
            { text: "Próxima temporada...", 
              condition: (p) => p.metDjalma === true, 
              nextEvent: 'FIM_TEMPORADA_2_DIV' 
            }
        ]
    },
    'FIM_TEMPORADA_2_DIV': { 
        text: "A temporada acabou. Djalma não te procurou de novo. Você continua no [player.team], mas agora tem 17 anos. O Varzeano da 1ª Divisão começa ano que vem, e seu nome está sendo cotado.\n\nVocê está pronto para o próximo capítulo?",
        choices: [
            { text: "Recomeçar (Próxima Temporada)", onSelect: (p) => { p.age += 1; }, nextEvent: 'GAME_OVER' } 
        ]
    }
};