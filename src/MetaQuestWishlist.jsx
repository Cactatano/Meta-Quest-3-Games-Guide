import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, X, Star, ShoppingCart, Trash2, Copy, RotateCcw,
  ExternalLink, Check, HelpCircle, Ban, Sparkles, Filter,
  Users, Monitor, Box, Tag, Gamepad2, ChevronDown, Plus, Minus,
  Info, AlertTriangle, Award, ArrowRight, Wand2
} from 'lucide-react';

const USD_TO_BRL = 5.30;

const formatBRL = (usd, free) => {
  if (free) return 'Grátis';
  const v = usd * USD_TO_BRL;
  return 'R$ ' + v.toFixed(2).replace('.', ',');
};

const rawBRL = (usd, free) => (free ? 0 : usd * USD_TO_BRL);

const CATEGORIES = [
  'Ritmo e Música',
  'Fitness e Treino',
  'Aventura e RPG',
  'Tiro e FPS',
  'Terror e Suspense',
  'Puzzle e Lógica',
  'Simulação',
  'Criativo',
  'Mixed Reality',
  'Party e Social',
  'Esportes',
  'Exploração e Viagem',
  'Infantil e Família',
  'Clássicos essenciais',
  'Apps úteis'
];

const GAMES = [
  {
    id: 'beat-saber',
    name: 'Beat Saber',
    emoji: '⚔️',
    category: 'Ritmo e Música',
    genre: 'Ritmo, Ação',
    priceUsd: 29.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.9,
    sizeGb: 2.4,
    developer: 'Beat Games',
    languages: 'Português, Inglês, Espanhol, +10',
    playMode: 'Em pé',
    description: [
      'O carro chefe do VR. Você corta blocos no ritmo da música usando dois sabres de luz, com mapas oficiais de Imagine Dragons, BTS, Lady Gaga, Metallica e muito mais.',
      'Tem comunidade gigante criando mapas custom, modo multiplayer com até 5 amigos e desafios diários. É daqueles que viciam de cara e ainda ajudam a queimar caloria sem perceber.'
    ],
    highlights: [
      'Trilha sonora oficial cheia de DLC pago e gratuito',
      'Multiplayer competitivo e cooperativo',
      'Curva de aprendizado satisfatória, do fácil ao impossível'
    ],
    considerations: [
      'DLCs vendidas separadas, fácil gastar um extra',
      'Precisa de um espaço razoável pra não esbarrar em nada'
    ],
    similar: ['pistol-whip', 'synth-riders']
  },
  {
    id: 'pistol-whip',
    name: 'Pistol Whip',
    emoji: '🔫',
    category: 'Ritmo e Música',
    genre: 'Ritmo, Tiro',
    priceUsd: 29.99,
    free: false,
    rating: '14',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 3.1,
    developer: 'Cloudhead Games',
    languages: 'Inglês, Português',
    playMode: 'Em pé',
    description: [
      'Imagina John Wick num clipe musical. Você atira no ritmo da batida enquanto desvia de balas em câmera lenta. É lindo, intenso e cinematográfico.',
      'Tem campanhas com história, modos arcade e atualizações constantes com novas músicas. O feedback de cada tiro acerta perfeito no compasso.'
    ],
    highlights: [
      'Sensação de protagonista de filme de ação',
      'Trilha eletrônica empolgante de cair o queixo',
      'Modos diários e desafios que renovam o jogo'
    ],
    considerations: [
      'Pode causar leve enjoo com tanto movimento',
      'Conteúdo extra (Smoke and Thunder, etc.) é pago'
    ],
    similar: ['beat-saber', 'audio-trip']
  },
  {
    id: 'synth-riders',
    name: 'Synth Riders',
    emoji: '🌈',
    category: 'Ritmo e Música',
    genre: 'Ritmo, Dança',
    priceUsd: 24.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 2.0,
    developer: 'Kluge Interactive',
    languages: 'Português, Inglês',
    playMode: 'Em pé',
    description: [
      'Mais focado em fluidez do que em corte. Você acompanha trilhas coloridas com as mãos, tipo dançando em pé. A vibe é synthwave, retrô e relaxada.',
      'Tem packs de Muse, Linkin Park, The Offspring, Caravan Palace, e modo multiplayer que rola até em festa.'
    ],
    highlights: [
      'Movimento mais natural, parece dança',
      'Trilha sonora variada com bandas grandes',
      'Ótimo pra quem quer algo menos competitivo'
    ],
    considerations: [
      'Menos intenso que Beat Saber, vai do gosto',
      'Vários DLCs musicais avulsos'
    ],
    similar: ['beat-saber', 'audio-trip']
  },
  {
    id: 'audio-trip',
    name: 'Audio Trip',
    emoji: '💃',
    category: 'Ritmo e Música',
    genre: 'Ritmo, Dança fitness',
    priceUsd: 19.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 1.8,
    developer: 'Kinemotik Studios',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Coreografias completas com mãos e quadril. É menos jogo de pontuação e mais experiência de dança guiada com avatar à frente mostrando os passos.',
      'Tem editor de coreografia da comunidade, então a biblioteca é gigantesca. Bom pra quem quer suar dançando sem se sentir num jogo de tiro.'
    ],
    highlights: [
      'Sensação real de aula de dança',
      'Comunidade ativa criando coreografias',
      'Excelente exercício cardiovascular'
    ],
    considerations: [
      'Menos viciante que ritmos clássicos',
      'Trilha oficial é limitada, depende da comunidade'
    ],
    similar: ['synth-riders', 'supernatural']
  },
  {
    id: 'ragnarock',
    name: 'Ragnarock',
    emoji: '🪓',
    category: 'Ritmo e Música',
    genre: 'Ritmo, Viking',
    priceUsd: 24.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 2.5,
    developer: 'WanadevStudio',
    languages: 'Inglês, Francês',
    playMode: 'Em pé',
    description: [
      'Você é um capitão viking remando ao som de metal e folk celta. Bate em tambores no ritmo pra fazer o barco voar mais rápido que os adversários.',
      'Multiplayer com até 5 capitães competindo na mesma corrida. Rola até trazer playlist própria via mod no PC.'
    ],
    highlights: [
      'Trilha sonora de metal celta absurdamente boa',
      'Multiplayer competitivo divertido',
      'Treino de braço sem perceber'
    ],
    considerations: [
      'Conceito mais nichado, pode cansar',
      'Sem versão em português'
    ],
    similar: ['beat-saber', 'unplugged']
  },
  {
    id: 'unplugged',
    name: 'Unplugged Air Guitar',
    emoji: '🎸',
    category: 'Ritmo e Música',
    genre: 'Ritmo, Guitarra',
    priceUsd: 19.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.3,
    sizeGb: 2.2,
    developer: 'Anotherway',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Guitar Hero sem guitarra. Usa só hand tracking e você simula o instrumento no ar com as mãos, tocando músicas de Ozzy, Steve Vai, Quiet Riot e mais.',
      'A ideia é genial, dá aquele papelão estilo air guitar do quarto. Funciona melhor com luz ambiente boa por causa do tracking.'
    ],
    highlights: [
      'Conceito único usando só as mãos',
      'Catálogo cheio de clássicos do rock',
      'Avatar carismático te apresentando as músicas'
    ],
    considerations: [
      'Hand tracking pode falhar em luz ruim',
      'Curva de aprendizado mais frustrante que outros ritmos'
    ],
    similar: ['ragnarock', 'beat-saber']
  },
  {
    id: 'supernatural',
    name: 'Supernatural',
    emoji: '🏔️',
    category: 'Fitness e Treino',
    genre: 'Ritmo fitness',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 1.2,
    developer: 'Supernatural (Meta)',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'O melhor app de fitness do Quest. Treinos diários comandados por coaches reais em locais lindos do mundo, do deserto do Atacama à Patagônia.',
      'O app baixa de graça mas exige assinatura mensal pra valer. A trilha sonora é licenciada de verdade (Beyoncé, Coldplay, Lizzo) e renova toda semana.'
    ],
    highlights: [
      'Cenários reais incríveis filmados em 360',
      'Coaches motivam de verdade',
      'Aulas novas todo dia sem repetir'
    ],
    considerations: [
      'Assinatura mensal não é barata em real',
      'Sem opção de jogar offline ou comprar avulso'
    ],
    similar: ['les-mills', 'fitxr']
  },
  {
    id: 'les-mills',
    name: 'Les Mills Bodycombat',
    emoji: '🥊',
    category: 'Fitness e Treino',
    genre: 'Boxe fitness',
    priceUsd: 29.99,
    free: false,
    rating: '12',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 2.0,
    developer: 'Odders Lab',
    languages: 'Português, Inglês, Espanhol',
    playMode: 'Em pé',
    description: [
      'Treinos de boxe e artes marciais da Les Mills, aquela mesma marca que tem aula em academia. Compra uma vez, treina pra sempre.',
      'Tem programas guiados de várias semanas, treinos rápidos, modo livre. Os instrutores são gente de verdade, gravados em motion capture.'
    ],
    highlights: [
      'Pagamento único, sem assinatura',
      'Vários níveis de intensidade',
      'Suor garantido em 20 minutos'
    ],
    considerations: [
      'Trilha sonora menos famosa que Supernatural',
      'Movimentos repetitivos depois de muitas horas'
    ],
    similar: ['supernatural', 'thrill-of-the-fight']
  },
  {
    id: 'fitxr',
    name: 'FitXR',
    emoji: '💪',
    category: 'Fitness e Treino',
    genre: 'Multi treino',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: true,
    multiplayer: true,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 1.8,
    developer: 'FitXR',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Plataforma com aulas de boxe, dança, HIIT e combat. Tem versão MR que coloca o estúdio na sua sala usando o passthrough do Quest 3.',
      'Modelo de assinatura mensal. Aulas ao vivo com instrutores e ranking competitivo entre alunos no mundo todo.'
    ],
    highlights: [
      'Variedade de modalidades num app só',
      'Modo Mixed Reality bem interessante',
      'Comunidade ativa e ranqueada'
    ],
    considerations: [
      'Assinatura recorrente meio salgada',
      'Algumas aulas exigem internet boa'
    ],
    similar: ['supernatural', 'les-mills']
  },
  {
    id: 'creed',
    name: 'Creed Rise to Glory Champ Edition',
    emoji: '🥊',
    category: 'Fitness e Treino',
    genre: 'Boxe simulação',
    priceUsd: 29.99,
    free: false,
    rating: '14',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 4.5,
    developer: 'Survios',
    languages: 'Português, Inglês',
    playMode: 'Em pé',
    description: [
      'O jogo oficial dos filmes Creed e Rocky. Você sobe na carreira treinando com Rocky Balboa e enfrentando lutadores icônicos da franquia.',
      'A simulação de boxe é mais realista que Bodycombat: tem fôlego, cansaço, leitura de adversário. Vai virar atleta ou apanhar feio.'
    ],
    highlights: [
      'Modo carreira com história envolvente',
      'Multiplayer online competitivo',
      'Sensação real de ringue de boxe'
    ],
    considerations: [
      'Curva de aprendizado puxada',
      'Apanhar virtual cansa o psicológico também'
    ],
    similar: ['thrill-of-the-fight', 'les-mills']
  },
  {
    id: 'thrill-of-the-fight',
    name: 'The Thrill of the Fight',
    emoji: '🥊',
    category: 'Fitness e Treino',
    genre: 'Boxe realista',
    priceUsd: 9.99,
    free: false,
    rating: '14',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 1.3,
    developer: 'Sealost Interactive',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'O simulador de boxe mais cru e realista do VR. Sem trilha animada, sem efeito mágico, só você apanhando e batendo num adversário com IA decente.',
      'Cada round dura 3 minutos de verdade. Você sai pingando suor. Tem sequência (Thrill 2) já lançada também.'
    ],
    highlights: [
      'Físicas de soco surpreendentemente boas',
      'Treino brutal pelo preço baixo',
      'Sensação de luta real, sem firulas'
    ],
    considerations: [
      'Visual datado e sem polimento',
      'Zero progressão ou modo história'
    ],
    similar: ['creed', 'les-mills']
  },
  {
    id: 'holofit',
    name: 'Holofit',
    emoji: '🚣',
    category: 'Fitness e Treino',
    genre: 'Cardio integrado',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.4,
    sizeGb: 1.5,
    developer: 'Holodia',
    languages: 'Inglês',
    playMode: 'Sentado',
    description: [
      'Sincroniza com bike ergométrica, remo, elíptico ou esteira. Vira o cardio chato em viagem por mundos fantásticos com missões e desafios.',
      'Funciona com vários equipamentos via Bluetooth ou só com o tracking do headset. Ótimo se você já tem aparelho parado em casa.'
    ],
    highlights: [
      'Faz tempo voar no aparelho de cardio',
      'Mundos variados e criativos',
      'Métricas detalhadas de treino'
    ],
    considerations: [
      'Precisa equipamento físico pra render',
      'Assinatura mensal pra acessar tudo'
    ],
    similar: ['supernatural', 'kayak-vr']
  },
  {
    id: 'asgards-wrath-2',
    name: "Asgard's Wrath 2",
    emoji: '⚡',
    category: 'Aventura e RPG',
    genre: 'RPG mundo aberto',
    priceUsd: 59.99,
    free: false,
    rating: '14',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.9,
    sizeGb: 33.0,
    developer: 'Sanzaru Games',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'O RPG mais ambicioso já feito pra Quest. Mais de 60 horas de campanha, sistema de combate profundo, mundos egípcios, vikings e celestes pra explorar.',
      'Você alterna entre o herói e a forma de deus, controlando seguidores em cima do mapa. Tipo Diablo encontra Skyrim em VR.'
    ],
    highlights: [
      'Escala absurda pra um jogo standalone',
      'Combate variado com múltiplas armas',
      'História envolvente em mitologia egípcia'
    ],
    considerations: [
      'Ocupa muito espaço de armazenamento',
      'Sessões longas cansam o pescoço'
    ],
    similar: ['behemoth', 'arken-age']
  },
  {
    id: 'walking-dead-1',
    name: 'The Walking Dead Saints & Sinners',
    emoji: '🧟',
    category: 'Aventura e RPG',
    genre: 'Survival horror',
    priceUsd: 39.99,
    free: false,
    rating: '18',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 8.5,
    developer: 'Skydance Interactive',
    languages: 'Português, Inglês, Espanhol',
    playMode: 'Em pé',
    description: [
      'Sobrevivência em Nova Orleans pós-apocalíptica. Você fabrica armas, gerencia inventário, ganha ou perde reputação com facções e mata zumbi de forma visceral.',
      'O loop de explorar de dia e correr da horda à noite é viciante. Decisões morais pesam de verdade na história.'
    ],
    highlights: [
      'Combate corpo a corpo com físicas brutais',
      'Decisões morais que afetam tudo',
      'Atmosfera de tirar o fôlego'
    ],
    considerations: [
      'Conteúdo bem violento e pesado',
      'Pode causar enjoo em sessões longas'
    ],
    similar: ['walking-dead-2', 'arizona-2']
  },
  {
    id: 'walking-dead-2',
    name: 'Saints & Sinners Ch 2 Retribution',
    emoji: '🧟',
    category: 'Aventura e RPG',
    genre: 'Survival horror',
    priceUsd: 39.99,
    free: false,
    rating: '18',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 12.0,
    developer: 'Skydance Interactive',
    languages: 'Português, Inglês, Espanhol',
    playMode: 'Em pé',
    description: [
      'Continuação direta do primeiro. Mais armas, mais inimigos humanos, novos bairros pra explorar e a chegada da Axeman, vilã que persegue você à noite.',
      'Adiciona armas de fogo automáticas, motosserra e novos sistemas. Vale mesmo se você curtiu o primeiro.'
    ],
    highlights: [
      'Arsenal expandido com armas pesadas',
      'Inimiga icônica que muda o ritmo',
      'Mais áreas e quests novas'
    ],
    considerations: [
      'Recomendado jogar o primeiro antes',
      'Performance pode oscilar em áreas cheias'
    ],
    similar: ['walking-dead-1', 'arizona-2']
  },
  {
    id: 'ac-nexus',
    name: "Assassin's Creed Nexus VR",
    emoji: '🗡️',
    category: 'Aventura e RPG',
    genre: 'Ação stealth',
    priceUsd: 39.99,
    free: false,
    rating: '16',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.4,
    sizeGb: 18.0,
    developer: 'Ubisoft',
    languages: 'Português, Inglês, +8',
    playMode: 'Em pé',
    description: [
      'Você joga como Ezio, Kassandra e Connor em missões inéditas. Parkour, salto de fé, lâmina oculta, tudo na primeira pessoa.',
      'A imersão é o ponto alto, escalar uma torre em VR é outra coisa. Algumas missões puxam pra stealth, outras pra ação aberta.'
    ],
    highlights: [
      'Três personagens icônicos da franquia',
      'Salto de fé impressionante em VR',
      'Mecânicas de parkour bem adaptadas'
    ],
    considerations: [
      'Pode causar enjoo de movimento em altura',
      'História menor que jogos clássicos da série'
    ],
    similar: ['batman-arkham-shadow', 'asgards-wrath-2']
  },
  {
    id: 'behemoth',
    name: 'Behemoth',
    emoji: '🪓',
    category: 'Aventura e RPG',
    genre: 'Ação fantasia',
    priceUsd: 49.99,
    free: false,
    rating: '16',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 14.0,
    developer: 'Skydance Interactive',
    languages: 'Português, Inglês, +5',
    playMode: 'Em pé',
    description: [
      'Da mesma desenvolvedora de Walking Dead VR. Você caça gigantes (os Behemoths) num reino de fantasia sombria, tipo Shadow of the Colossus em primeira pessoa.',
      'Combate com espada, machado e arco baseado em física. As batalhas contra os colossos são cinematográficas e enormes.'
    ],
    highlights: [
      'Lutas contra colossos espetaculares',
      'Combate físico satisfatório',
      'Direção de arte sombria e bonita'
    ],
    considerations: [
      'História mais curta que parece pelo preço',
      'Travamentos eventuais no Quest 3'
    ],
    similar: ['asgards-wrath-2', 'arken-age']
  },
  {
    id: 'arken-age',
    name: 'Arken Age',
    emoji: '🌌',
    category: 'Aventura e RPG',
    genre: 'RPG ação',
    priceUsd: 39.99,
    free: false,
    rating: '14',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 16.0,
    developer: 'VitruviusVR',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Um dos lançamentos mais elogiados de 2025. Mistura RPG, ficção científica e fantasia num mundo bem grande, com combate físico e progressão clássica.',
      'Tem armas variadas, magia, exploração, NPCs interessantes. Pacote completo, sensação de jogo grande mesmo.'
    ],
    highlights: [
      'Mundo coeso e divertido de explorar',
      'Combate físico com várias opções',
      'Boa relação tempo de jogo por preço'
    ],
    considerations: [
      'Sem dublagem ou texto em português',
      'Inventário pode ficar confuso no começo'
    ],
    similar: ['asgards-wrath-2', 'behemoth']
  },
  {
    id: 'arizona-2',
    name: 'Arizona Sunshine 2',
    emoji: '☀️',
    category: 'Aventura e RPG',
    genre: 'Tiro zumbi',
    priceUsd: 39.99,
    free: false,
    rating: '16',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 9.0,
    developer: 'Vertigo Games',
    languages: 'Português, Inglês, +5',
    playMode: 'Em pé',
    description: [
      'Você cruza o Arizona apocalíptico atirando em zumbi com seu cachorro Buddy do lado. A campanha tem coop online de até 4 jogadores.',
      'Mais leve e arcade que Walking Dead, perfeito pra quem só quer matar muito zumbi sem complicação.'
    ],
    highlights: [
      'Coop com até 4 amigos',
      'Cachorro companheiro carismático',
      'Ritmo arcade e divertido'
    ],
    considerations: [
      'História simples e previsível',
      'Animações dos zumbis repetitivas'
    ],
    similar: ['walking-dead-1', 'alien-rogue']
  },
  {
    id: 'alien-rogue',
    name: 'Alien Rogue Incursion',
    emoji: '👽',
    category: 'Aventura e RPG',
    genre: 'Survival horror',
    priceUsd: 49.99,
    free: false,
    rating: '18',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.4,
    sizeGb: 11.0,
    developer: 'Survios',
    languages: 'Português, Inglês, +4',
    playMode: 'Em pé',
    description: [
      'Você é Zula Hendricks num planeta infestado de Xenomorfos. Mistura tiro tático, survival horror e exploração na vibe Aliens com pitada de Alien Isolation.',
      'Tem rastreador de movimento clássico que faz aquele bip icônico. Cada encontro com xeno é tensão pura.'
    ],
    highlights: [
      'Atmosfera fiel à franquia Alien',
      'Rastreador de movimento icônico funciona lindamente',
      'Visual top em Quest 3'
    ],
    considerations: [
      'Muito tenso, não é pra qualquer um',
      'Sai por trás muitas vezes, susto frequente'
    ],
    similar: ['re4-vr', 'metro-awakening']
  },
  {
    id: 'batman-arkham-shadow',
    name: 'Batman Arkham Shadow',
    emoji: '🦇',
    category: 'Aventura e RPG',
    genre: 'Ação stealth',
    priceUsd: 49.99,
    free: false,
    rating: '16',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.9,
    sizeGb: 23.0,
    developer: 'Camouflaj',
    languages: 'Português, Inglês, +8',
    playMode: 'Em pé',
    description: [
      'Possivelmente o melhor exclusivo do Quest 3. Você é o Batman, esquivando, socando, planando e usando todos os gadgets icônicos numa Arkham bem dirigida.',
      'A sensação de ser o Batman é impecável. Combate fluido, stealth tenso, história canon do universo Arkham. Vale o headset por si só.'
    ],
    highlights: [
      'Imersão de ser o Batman é insana',
      'Combate fluido e gratificante',
      'Produção AAA visível em cada detalhe'
    ],
    considerations: [
      'Exclusivo Quest 3 e 3S, não roda no Quest 2',
      'Algumas seções de stealth bem difíceis'
    ],
    similar: ['ac-nexus', 'metro-awakening']
  },
  {
    id: 'metro-awakening',
    name: 'Metro Awakening',
    emoji: '🚇',
    category: 'Aventura e RPG',
    genre: 'Survival shooter',
    priceUsd: 39.99,
    free: false,
    rating: '18',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 14.0,
    developer: '4A Games / Vertigo',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'Prequela canônica da série Metro feita pra VR. Túneis escuros de Moscou pós nuclear, gerenciamento de máscara de gás, munição como moeda. Atmosfera pesada e linda.',
      'Os controles foram pensados pra VR de cabo a rabo: bomba a lanterna, recarrega o filtro da máscara, ajusta o relógio. Tudo manual, tudo imersivo.'
    ],
    highlights: [
      'Atmosfera Metro fielíssima em VR',
      'Mecânicas manuais que aumentam imersão',
      'Trilha sonora e dublagem excelentes'
    ],
    considerations: [
      'Dificuldade pode pesar pra novatos',
      'Algumas seções escuras demais'
    ],
    similar: ['alien-rogue', 'walking-dead-1']
  },
  {
    id: 'deadpool-vr',
    name: "Marvel's Deadpool VR",
    emoji: '🩸',
    category: 'Aventura e RPG',
    genre: 'Ação comédia',
    priceUsd: 39.99,
    free: false,
    rating: '18',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 13.0,
    developer: 'Twisted Pixel',
    languages: 'Português, Inglês, +4',
    playMode: 'Em pé',
    description: [
      'O Deadpool quebrando a quarta parede direto na sua cara. Sangue, palavrão, katana, pistola e piada infame em quantidade industrial.',
      'Dirigido com visual de quadrinho animado, dublagem competente e combate brutal que envolve usar até a própria mão decepada.'
    ],
    highlights: [
      'Humor afiado idêntico ao do personagem',
      'Visual estilo HQ animada',
      'Combate caótico e divertido'
    ],
    considerations: [
      'Violência e palavrão pesados',
      'Não é pra ouvido sensível, vovó passa longe'
    ],
    similar: ['batman-arkham-shadow', 'superhot-vr']
  },
  {
    id: 'contractors',
    name: 'Contractors',
    emoji: '🎯',
    category: 'Tiro e FPS',
    genre: 'FPS tático',
    priceUsd: 19.99,
    free: false,
    rating: '16',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 4.5,
    developer: 'Caveman Studio',
    languages: 'Inglês',
    playMode: 'Livre',
    description: [
      'O Counter Strike do VR. Partidas táticas em mapas variados, sistema de armas profundo, customização de carregamento e mods feitos pela comunidade.',
      'Tem modo battle royale, zumbi, escolta. Comunidade grande, partidas rolando direto. É o queridinho da galera competitiva.'
    ],
    highlights: [
      'Comunidade grande e ativa',
      'Customização de armas profunda',
      'Mods feitos pela comunidade'
    ],
    considerations: [
      'Curva de aprendizado em táticas é alta',
      'Voz no chat majoritariamente em inglês'
    ],
    similar: ['pavlov-shack', 'population-one']
  },
  {
    id: 'population-one',
    name: 'Population One',
    emoji: '🪂',
    category: 'Tiro e FPS',
    genre: 'Battle royale',
    priceUsd: 0,
    free: true,
    rating: '14',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 5.0,
    developer: 'BigBox VR (Meta)',
    languages: 'Português, Inglês, +6',
    playMode: 'Livre',
    description: [
      'Battle royale grátis em VR. Você desce de paraquedas com o esquadrão, escala qualquer parede, voa com asa delta e atira em outros 17 jogadores.',
      'A mecânica de escalar tudo é o diferencial. Vira jogo de altura e estratégia vertical.'
    ],
    highlights: [
      'Free to play sem pegadinha pesada',
      'Escalar qualquer coisa muda a estratégia',
      'Atualizações frequentes com novos modos'
    ],
    considerations: [
      'Loja de cosméticos pode tentar',
      'Comunidade já é veterana, novato apanha'
    ],
    similar: ['contractors', 'breachers']
  },
  {
    id: 'onward',
    name: 'Onward',
    emoji: '🪖',
    category: 'Tiro e FPS',
    genre: 'Mil sim',
    priceUsd: 24.99,
    free: false,
    rating: '16',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.3,
    sizeGb: 3.8,
    developer: 'Downpour Interactive',
    languages: 'Inglês',
    playMode: 'Livre',
    description: [
      'Simulador militar tático sério. Sem mira na tela, sem indicador de munição. Você confere o pente na mão e usa rádio e voz pra coordenar com o esquadrão.',
      'Comunidade nichada, partidas com voz por proximidade, modo cooperativo PvE também. Quem curte realismo, ama.'
    ],
    highlights: [
      'Realismo absurdo nas armas',
      'Coordenação por voz é essencial',
      'Modos PvP e PvE robustos'
    ],
    considerations: [
      'Sem novato amigável, apanha de início',
      'Comunidade menor que Contractors'
    ],
    similar: ['contractors', 'pavlov-shack']
  },
  {
    id: 'pavlov-shack',
    name: 'Pavlov Shack',
    emoji: '🔫',
    category: 'Tiro e FPS',
    genre: 'FPS arcade',
    priceUsd: 19.99,
    free: false,
    rating: '16',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.4,
    sizeGb: 3.0,
    developer: 'Vankrupt',
    languages: 'Inglês',
    playMode: 'Livre',
    description: [
      'A versão Quest do Pavlov, arcade tático estilo CS. Mods da comunidade dão modos novos toda hora: zumbi, faroeste, futurista.',
      'Mais leve que Onward, mais sério que Contractors. Bom meio termo de tiro tático.'
    ],
    highlights: [
      'Toneladas de mods da comunidade',
      'Performance leve no Quest',
      'Modos competitivos e casuais'
    ],
    considerations: [
      'Servidores variam de qualidade',
      'Versão PC tem mais conteúdo'
    ],
    similar: ['contractors', 'onward']
  },
  {
    id: 'ghosts-tabor',
    name: 'Ghosts of Tabor',
    emoji: '☠️',
    category: 'Tiro e FPS',
    genre: 'Extraction shooter',
    priceUsd: 29.99,
    free: false,
    rating: '18',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.4,
    sizeGb: 6.0,
    developer: 'Combat Waffle Studios',
    languages: 'Inglês',
    playMode: 'Livre',
    description: [
      'Tipo Tarkov em VR. Você entra num mapa, faz loot, sobrevive a outros jogadores e tenta extrair vivo com o que pegou. Perdeu, perdeu tudo.',
      'Vício total pra quem curte o gênero. Adrenalina alta toda partida, sensação de risco real.'
    ],
    highlights: [
      'Tensão constante de perder o loot',
      'Progressão de gear viciante',
      'Atualizações constantes'
    ],
    considerations: [
      'Frustrante perder tudo no fim',
      'Curva de aprendizado bem íngreme'
    ],
    similar: ['contractors', 'onward']
  },
  {
    id: 'forefront',
    name: 'Forefront',
    emoji: '🎖️',
    category: 'Tiro e FPS',
    genre: 'FPS arena',
    priceUsd: 0,
    free: true,
    rating: '14',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.2,
    sizeGb: 3.5,
    developer: 'Studio 369',
    languages: 'Inglês',
    playMode: 'Livre',
    description: [
      'FPS multiplayer free to play estilo Call of Duty arena. Partidas curtas, progressão de armas, modos clássicos como deathmatch e capture.',
      'Bom como aperitivo se você não quer pagar pelos taticões. Comunidade ainda crescendo.'
    ],
    highlights: [
      'Free to play sem barreira',
      'Partidas curtas e diretas',
      'Sensação arcade de COD'
    ],
    considerations: [
      'Comunidade ainda pequena',
      'Sem modos solo profundos'
    ],
    similar: ['population-one', 'pavlov-shack']
  },
  {
    id: 'breachers',
    name: 'Breachers',
    emoji: '🚪',
    category: 'Tiro e FPS',
    genre: 'Tático 5v5',
    priceUsd: 29.99,
    free: false,
    rating: '16',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 3.2,
    developer: 'Triangle Factory',
    languages: 'Inglês, Espanhol',
    playMode: 'Em pé',
    description: [
      'O Rainbow Six Siege do VR. Times 5 contra 5, atacantes invadem com explosivos e câmeras, defensores se barricam e plantam armadilhas.',
      'Comunidade pequena mas dedicada. Partidas exigem coordenação real, é puro tático.'
    ],
    highlights: [
      'Mecânica de invasão única no VR',
      'Coordenação real entre time',
      'Personagens com habilidades distintas'
    ],
    considerations: [
      'Comunidade menor, fila demora',
      'Quase obrigatório jogar com voz'
    ],
    similar: ['contractors', 'population-one']
  },
  {
    id: 'hard-bullet',
    name: 'Hard Bullet',
    emoji: '🩸',
    category: 'Tiro e FPS',
    genre: 'Sandbox tiro',
    priceUsd: 19.99,
    free: false,
    rating: '18',
    mr: false,
    multiplayer: false,
    needsPc: true,
    userRating: 4.5,
    sizeGb: 8.0,
    developer: 'AVR Productions',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Sandbox de violência slow motion. Tipo Superhot encontra Max Payne, com físicas exageradas, sangue jorrando e câmera lenta no estilo.',
      'Roda via PC VR. Sem campanha séria, só você se divertindo eliminando inimigos de jeitos cada vez mais criativos.'
    ],
    highlights: [
      'Físicas slow motion espetaculares',
      'Liberdade total de improvisação',
      'Mods da comunidade abundantes'
    ],
    considerations: [
      'Precisa de PC com placa boa',
      'Violência gráfica explícita'
    ],
    similar: ['superhot-vr', 'pavlov-shack']
  },
  {
    id: 're4-vr',
    name: 'Resident Evil 4 VR',
    emoji: '🧟',
    category: 'Terror e Suspense',
    genre: 'Survival horror',
    priceUsd: 39.99,
    free: false,
    rating: '18',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 9.5,
    developer: 'Armature Studio',
    languages: 'Português, Inglês, +5',
    playMode: 'Em pé',
    description: [
      'O clássico RE4 reimaginado pra VR. Você é Leon, em primeira pessoa, atirando, recarregando manualmente, organizando inventário no relógio do braço.',
      'Os encontros com Ganados e a luta no vilarejo ficam dez vezes mais aterrorizantes em VR. Versão polida e com boa duração.'
    ],
    highlights: [
      'Clássico atemporal repaginado',
      'Recarga manual viciante',
      'Versão Quest exclusiva polida'
    ],
    considerations: [
      'Pode causar enjoo em movimento livre',
      'Muito susto, coração não aguenta sempre'
    ],
    similar: ['alien-rogue', 'metro-awakening']
  },
  {
    id: 'fnaf-1',
    name: "Five Nights at Freddy's Help Wanted",
    emoji: '🐻',
    category: 'Terror e Suspense',
    genre: 'Terror minigame',
    priceUsd: 29.99,
    free: false,
    rating: '12',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 4.0,
    developer: 'Steel Wool Studios',
    languages: 'Português, Inglês, +6',
    playMode: 'Sentado',
    description: [
      'A coletânea oficial dos FNAF em VR, em primeira pessoa. Tem todos os jogos clássicos remasterizados com aquela vibe de pesadelo da pizzaria.',
      'Ideal pra fã da franquia ou pra quem quer experimentar terror leve com jumpscare. Pode jogar sentado.'
    ],
    highlights: [
      'Toda franquia FNAF num pacote só',
      'Pode jogar sentado, acessível',
      'Atmosfera fielíssima ao original'
    ],
    considerations: [
      'Jumpscare frequente, coração acelera',
      'Repetitivo se não for fã da série'
    ],
    similar: ['fnaf-2', 'exorcist']
  },
  {
    id: 'fnaf-2',
    name: "FNAF Help Wanted 2",
    emoji: '🐰',
    category: 'Terror e Suspense',
    genre: 'Terror minigame',
    priceUsd: 39.99,
    free: false,
    rating: '12',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 4.5,
    developer: 'Steel Wool Studios',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'Sequência direta com novos minigames, novos animatrônicos e mais imersão. Você trabalha em vários setores da nova Pizza Plex.',
      'Mais polido visualmente que o primeiro, mais variedade de cenários. Mantém o tom de terror de cair o queixo.'
    ],
    highlights: [
      'Novos minigames bem variados',
      'Visual aprimorado vs primeiro',
      'Mais imersão na pizzaria'
    ],
    considerations: [
      'Pesado demais pra crianças',
      'Susto em sequência cansa'
    ],
    similar: ['fnaf-1', 'madison']
  },
  {
    id: 'exorcist',
    name: 'The Exorcist Legion VR',
    emoji: '✝️',
    category: 'Terror e Suspense',
    genre: 'Terror narrativo',
    priceUsd: 19.99,
    free: false,
    rating: '16',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.3,
    sizeGb: 5.0,
    developer: 'Wolf & Wood',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Episódios de terror inspirados no universo do Exorcista. Você investiga cenas de possessão sobrenatural com ferramentas e confronto direto com o sobrenatural.',
      'Mais focado em narrativa e atmosfera do que em jumpscare. Episódios curtos perfeitos pra noite de Halloween.'
    ],
    highlights: [
      'Atmosfera oprimente e bem trabalhada',
      'Narrativa episódica boa',
      'Inspirado em franquia consagrada'
    ],
    considerations: [
      'Visual já com idade',
      'Sem dublagem em português'
    ],
    similar: ['madison', 'propagation']
  },
  {
    id: 'madison',
    name: 'Madison VR',
    emoji: '📷',
    category: 'Terror e Suspense',
    genre: 'Terror psicológico',
    priceUsd: 29.99,
    free: false,
    rating: '16',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 7.0,
    developer: 'BLOODIOUS GAMES',
    languages: 'Português, Inglês, +5',
    playMode: 'Em pé',
    description: [
      'Versão VR do terror psicológico que viralizou. Você usa uma câmera Polaroid pra revelar elementos do passado e desvendar uma história sinistra.',
      'A mecânica da câmera funciona de forma genial em VR. Tensão constante, ambientes apertados, narrativa que prende.'
    ],
    highlights: [
      'Mecânica de câmera Polaroid genial',
      'História adulta e bem amarrada',
      'Atmosfera claustrofóbica perfeita'
    ],
    considerations: [
      'Muito tenso pra jogadores sensíveis',
      'Puzzles podem travar progresso'
    ],
    similar: ['propagation', 'fnaf-2']
  },
  {
    id: 'propagation',
    name: 'Propagation Paradise Hotel',
    emoji: '🏨',
    category: 'Terror e Suspense',
    genre: 'Survival horror',
    priceUsd: 19.99,
    free: false,
    rating: '16',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.4,
    sizeGb: 4.5,
    developer: 'WanadevStudio',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'Você é Emily procurando a irmã num hotel infestado de zumbis e mutantes. Mistura tiro com puzzles e exploração no escuro.',
      'Ambientação caprichada, sustos bem dosados, duração curta de umas 4 horas. Bom pra quem quer terror sem investimento gigante.'
    ],
    highlights: [
      'Ambientação de hotel decadente top',
      'Mix bom de puzzle e tiro',
      'Preço camarada pelo conteúdo'
    ],
    considerations: [
      'Campanha curta, deixa querendo mais',
      'Algumas seções escuras demais'
    ],
    similar: ['madison', 'drop-dead-cabin']
  },
  {
    id: 'drop-dead-cabin',
    name: 'Drop Dead The Cabin',
    emoji: '🪵',
    category: 'Terror e Suspense',
    genre: 'Coop terror',
    priceUsd: 19.99,
    free: false,
    rating: '16',
    mr: true,
    multiplayer: true,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 5.5,
    developer: 'Soul Assembly',
    languages: 'Inglês, Espanhol',
    playMode: 'Em pé',
    description: [
      'Você e até 3 amigos ficam presos numa cabana cheia de zumbis. Coop online, modo MR pra colocar o pesadelo na sua sala, várias armas pra customizar.',
      'Ótimo pra noite de gaming com amigos. O modo Mixed Reality é diferenciado, zumbis aparecem da sua parede.'
    ],
    highlights: [
      'Modo Mixed Reality empolgante',
      'Coop online divertido com amigos',
      'Customização de armas legal'
    ],
    considerations: [
      'Repetitivo jogando solo',
      'Bugs ocasionais no modo MR'
    ],
    similar: ['arizona-2', 'walking-dead-1']
  },
  {
    id: 'red-matter-2',
    name: 'Red Matter 2',
    emoji: '🔴',
    category: 'Puzzle e Lógica',
    genre: 'Puzzle sci fi',
    priceUsd: 29.99,
    free: false,
    rating: '12',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.9,
    sizeGb: 6.0,
    developer: 'Vertical Robot',
    languages: 'Português, Inglês, +5',
    playMode: 'Em pé',
    description: [
      'Considerado o melhor puzzle visual do Quest 3. Você é um agente investigando bases secretas em luas distantes na Guerra Fria sci fi.',
      'Os puzzles são intuitivos, a direção de arte é incrível. Roda lindo no Quest 3, parece quase PC VR.'
    ],
    highlights: [
      'Visual de tirar o fôlego no Quest 3',
      'Puzzles bem elaborados sem frustração',
      'História com camadas legais'
    ],
    considerations: [
      'Pode jogar sem ter visto o primeiro',
      'Fim deixa querendo mais um capítulo'
    ],
    similar: ['myst', 'room-vr']
  },
  {
    id: 'moss-1',
    name: 'Moss',
    emoji: '🐭',
    category: 'Puzzle e Lógica',
    genre: 'Plataforma puzzle',
    priceUsd: 19.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 2.0,
    developer: 'Polyarc',
    languages: 'Português, Inglês, +5',
    playMode: 'Sentado',
    description: [
      'Você ajuda a ratinha Quill numa aventura mágica de plataforma e puzzle. Vista terceira pessoa, tipo um diorama vivo na sua frente.',
      'Encantador do começo ao fim. Arte de livro infantil, narração de adormecer criança, perfeito pra mostrar VR pra família.'
    ],
    highlights: [
      'Perfeito pra mostrar VR pra alguém novo',
      'Quill é uma personagem cativante',
      'Arte estilo conto de fadas linda'
    ],
    considerations: [
      'Curto, umas 4 a 6 horas',
      'Combate simples se você quer ação'
    ],
    similar: ['moss-2', 'angry-birds']
  },
  {
    id: 'moss-2',
    name: 'Moss Book 2',
    emoji: '🐭',
    category: 'Puzzle e Lógica',
    genre: 'Plataforma puzzle',
    priceUsd: 29.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 3.0,
    developer: 'Polyarc',
    languages: 'Português, Inglês, +5',
    playMode: 'Sentado',
    description: [
      'Sequência da aventura da Quill. Mais armas, novos mundos, puzzles maiores e história mais ambiciosa que o original.',
      'Pode jogar sem ter visto o primeiro mas vale a pena começar pelo Moss 1 pra entender a Quill.'
    ],
    highlights: [
      'Maior e mais variado que o original',
      'Novas armas mudam combate',
      'Direção de arte continua excelente'
    ],
    considerations: [
      'Faz mais sentido tendo jogado Moss 1',
      'Performance levemente pior em áreas grandes'
    ],
    similar: ['moss-1', 'red-matter-2']
  },
  {
    id: 'puzzling-places',
    name: 'Puzzling Places',
    emoji: '🧩',
    category: 'Puzzle e Lógica',
    genre: 'Quebra cabeça 3D',
    priceUsd: 14.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 1.5,
    developer: 'realities.io',
    languages: 'Português, Inglês, +6',
    playMode: 'Sentado',
    description: [
      'Quebra cabeça 3D com lugares reais escaneados em foto realismo. Você monta peças flutuando no ar, com música zen, totalmente relaxante.',
      'Desestressa que é uma beleza. Tem packs novos toda hora com lugares diferentes do mundo.'
    ],
    highlights: [
      'Relaxante de verdade, tipo meditação',
      'Lugares reais escaneados lindamente',
      'Pode jogar sentado em qualquer lugar'
    ],
    considerations: [
      'Repetitivo se não curte puzzle puro',
      'Packs extras pagos somam ao custo'
    ],
    similar: ['cubism', 'nature-treks']
  },
  {
    id: 'cubism',
    name: 'Cubism',
    emoji: '🟦',
    category: 'Puzzle e Lógica',
    genre: 'Puzzle minimalista',
    priceUsd: 9.99,
    free: false,
    rating: 'L',
    mr: true,
    multiplayer: false,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 0.3,
    developer: 'Thomas Van Bouwel',
    languages: 'Inglês, Português',
    playMode: 'Sentado',
    description: [
      'Puzzle minimalista lindo. Encaixa formas geométricas em moldes com complexidade crescente. Funciona em VR e MR, ótimo pra curto.',
      'Feito pelo mesmo dev de Laser Dance. Visual limpo, hand tracking perfeito, dá pra jogar em 5 minutos ou em 2 horas.'
    ],
    highlights: [
      'Hand tracking impecável',
      'Modo MR transforma sua mesa em puzzle',
      'Preço baixíssimo'
    ],
    considerations: [
      'Acaba relativamente rápido',
      'Sem narrativa, é puzzle puro'
    ],
    similar: ['puzzling-places', 'laser-dance']
  },
  {
    id: 'maskmaker',
    name: 'Maskmaker',
    emoji: '🎭',
    category: 'Puzzle e Lógica',
    genre: 'Puzzle artesanal',
    priceUsd: 29.99,
    free: false,
    rating: '12',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 4.0,
    developer: 'InnerspaceVR',
    languages: 'Português, Inglês, +5',
    playMode: 'Em pé',
    description: [
      'Você é aprendiz de mestre artesão de máscaras mágicas. Ao usar uma máscara, possui o corpo de alguém em outro mundo. Mecânica genial.',
      'Direção de arte surreal, puzzles criativos, atmosfera de conto de fadas. Sub apreciado entre os puzzles do Quest.'
    ],
    highlights: [
      'Mecânica de máscara é única',
      'Direção de arte fantástica',
      'Atmosfera de conto sombrio'
    ],
    considerations: [
      'Ritmo lento pode entediar',
      'Puzzles ocasionalmente confusos'
    ],
    similar: ['myst', 'room-vr']
  },
  {
    id: 'myst',
    name: 'Myst',
    emoji: '🏝️',
    category: 'Puzzle e Lógica',
    genre: 'Aventura clássica',
    priceUsd: 29.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 4.5,
    developer: 'Cyan',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'O lendário Myst de 1993 reimaginado pra VR. Você explora uma ilha misteriosa cheia de mecanismos, livros que levam a outras eras, sem mão na sua.',
      'Sem inimigo, sem pressa. Só você, a ilha e os puzzles. Imersão pura pra cabeça pensante.'
    ],
    highlights: [
      'Clássico atemporal renovado',
      'Liberdade total de exploração',
      'Sensação de estar mesmo na ilha'
    ],
    considerations: [
      'Ritmo bem cadenciado, sem ação',
      'Puzzles podem travar progresso por horas'
    ],
    similar: ['red-matter-2', 'maskmaker']
  },
  {
    id: 'iexpect-3',
    name: 'I Expect You To Die 3',
    emoji: '🕴️',
    category: 'Puzzle e Lógica',
    genre: 'Puzzle espião',
    priceUsd: 24.99,
    free: false,
    rating: '12',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 3.5,
    developer: 'Schell Games',
    languages: 'Português, Inglês, +6',
    playMode: 'Sentado',
    description: [
      'Você é espião de elite preso em situações impossíveis. Tem que sair vivo usando objetos do cenário, tipo escape room James Bond.',
      'Humor afiado, puzzles inteligentes, tema 007 lindo. Já é o terceiro da série, melhor que os anteriores.'
    ],
    highlights: [
      'Puzzles criativos e satisfatórios',
      'Humor britânico ótimo',
      'Sentado, perfeito pra noite calma'
    ],
    considerations: [
      'Curto, umas 5 horas',
      'Algumas mortes frustrantes por timing'
    ],
    similar: ['room-vr', 'myst']
  },
  {
    id: 'room-vr',
    name: 'The Room VR A Dark Matter',
    emoji: '🔍',
    category: 'Puzzle e Lógica',
    genre: 'Escape room',
    priceUsd: 29.99,
    free: false,
    rating: '12',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 2.5,
    developer: 'Fireproof Games',
    languages: 'Português, Inglês, +6',
    playMode: 'Sentado',
    description: [
      'Da série The Room, agora em VR. Você manipula caixas misteriosas e cenários ocultistas londrinos pra resolver o desaparecimento de um egiptólogo.',
      'Quem jogou no celular vai amar em VR. Atmosfera victoriana, sons sutis, puzzles densos.'
    ],
    highlights: [
      'Puzzles densos e satisfatórios',
      'Atmosfera vitoriana caprichada',
      'Ótimo pra jogar sentado'
    ],
    considerations: [
      'Curto, umas 5 horas',
      'Sem replay valor depois de zerar'
    ],
    similar: ['iexpect-3', 'maskmaker']
  },
  {
    id: 'ghost-town',
    name: 'Ghost Town',
    emoji: '👻',
    category: 'Puzzle e Lógica',
    genre: 'Mistério sobrenatural',
    priceUsd: 29.99,
    free: false,
    rating: '12',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 5.0,
    developer: 'Fireproof Games',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'Lançamento de 2025 dos criadores de The Room. Mistério sobrenatural ambientado nos anos 80, com puzzles intuitivos e história envolvente.',
      'Visual lindo no Quest 3, narrativa que prende, puzzles bem dosados. Um dos melhores do ano.'
    ],
    highlights: [
      'História prende do início ao fim',
      'Puzzles intuitivos sem frustração',
      'Visual oitentista nostálgico'
    ],
    considerations: [
      'Algumas seções de medinho leve',
      'Final pode dividir opiniões'
    ],
    similar: ['room-vr', 'red-matter-2']
  },
  {
    id: 'flight-sim',
    name: 'Microsoft Flight Simulator',
    emoji: '✈️',
    category: 'Simulação',
    genre: 'Simulação aérea',
    priceUsd: 59.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: true,
    userRating: 4.6,
    sizeGb: 150.0,
    developer: 'Asobo Studio',
    languages: 'Português, Inglês, +12',
    playMode: 'Sentado',
    description: [
      'O simulador de voo definitivo, agora em VR via PC. Você pilota qualquer aeronave em qualquer canto do planeta com clima e tráfego reais.',
      'Roda via Virtual Desktop ou Steam Link. Precisa de PC parrudo, mas a experiência é absurda.'
    ],
    highlights: [
      'Mundo inteiro escaneado em alta resolução',
      'Centenas de aeronaves',
      'Comunidade enorme de mods'
    ],
    considerations: [
      'Exige PC top, não roda standalone',
      'Curva de aprendizado de simulador real'
    ],
    similar: ['aerofly', 'kayak-vr']
  },
  {
    id: 'job-simulator',
    name: 'Job Simulator',
    emoji: '👔',
    category: 'Simulação',
    genre: 'Comédia simulação',
    priceUsd: 19.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 1.5,
    developer: 'Owlchemy Labs',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'O clássico que todo mundo joga primeiro. Você é humano num museu robótico fingindo ser cozinheiro, mecânico, atendente. Tudo é interativo.',
      'Pra mostrar pra família e amigo, é o cartão de visita do VR. Curtinho, divertido, perfeito.'
    ],
    highlights: [
      'Tudo é interativo, qualquer objeto pega',
      'Humor genuinamente engraçado',
      'Cartão de visita ideal pra novatos'
    ],
    considerations: [
      'Curto, umas 3 horas',
      'Sem rejogabilidade depois de explorar tudo'
    ],
    similar: ['vacation-sim', 'powerwash']
  },
  {
    id: 'vacation-sim',
    name: 'Vacation Simulator',
    emoji: '🏖️',
    category: 'Simulação',
    genre: 'Comédia simulação',
    priceUsd: 19.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 2.0,
    developer: 'Owlchemy Labs',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'Sequência do Job Simulator. Os robôs entenderam o que humano faz no trabalho, agora querem entender o que faz nas férias. Praia, montanha, floresta.',
      'Mais conteúdo e mais interações que o primeiro. Mesmo humor, mesma vibe.'
    ],
    highlights: [
      'Maior que o original',
      'Vários cenários de férias',
      'Humor afiado dos mesmos criadores'
    ],
    considerations: [
      'Sem evolução técnica grande',
      'Pode parecer mais do mesmo pra fã do primeiro'
    ],
    similar: ['job-simulator', 'powerwash']
  },
  {
    id: 'hand-physics',
    name: 'Hand Physics Lab',
    emoji: '🤚',
    category: 'Simulação',
    genre: 'Sandbox físicas',
    priceUsd: 9.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 0.8,
    developer: 'Holonautic',
    languages: 'Inglês',
    playMode: 'Sentado',
    description: [
      'Laboratório de hand tracking com mais de 80 níveis. Aprende física brincando: piano, instrumentos, quebra cabeça, basquete, tudo só com a mão.',
      'Vitrine perfeita pra mostrar como o tracking de mão do Quest é bom. Barato e satisfatório.'
    ],
    highlights: [
      'Hand tracking impecável',
      'Mais de 80 níveis variados',
      'Excelente vitrine da tecnologia'
    ],
    considerations: [
      'Sem objetivo grande, é exploração',
      'Algumas estações tracking exige luz boa'
    ],
    similar: ['cubism', 'powerwash']
  },
  {
    id: 'aerofly',
    name: 'Aerofly FS 4',
    emoji: '🛩️',
    category: 'Simulação',
    genre: 'Simulação aérea',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 5.0,
    developer: 'IPACS',
    languages: 'Inglês, Alemão',
    playMode: 'Sentado',
    description: [
      'Simulador de voo standalone no Quest. Não tem o mundo todo do MS Flight Sim, mas tem cenários selecionados em alta qualidade.',
      'Roda direto no headset sem PC. Aviação leve mais focada em prazer de voar do que em treinamento real.'
    ],
    highlights: [
      'Roda standalone sem PC',
      'Cenários selecionados detalhados',
      'Free pra experimentar'
    ],
    considerations: [
      'Mundo limitado vs MS Flight Sim',
      'Conteúdo extra é pago'
    ],
    similar: ['flight-sim', 'kayak-vr']
  },
  {
    id: 'powerwash',
    name: 'PowerWash Simulator VR',
    emoji: '💦',
    category: 'Simulação',
    genre: 'Limpeza zen',
    priceUsd: 19.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 4.0,
    developer: 'FuturLab',
    languages: 'Português, Inglês, +8',
    playMode: 'Em pé',
    description: [
      'Você lava com lavadora de pressão tudo que aparece pela frente: carro, casa, parquinho, foguete espacial. Em VR vira meditação suja.',
      'Coop online com até 6 jogadores. Vício zen confirmado, perde a hora limpando.'
    ],
    highlights: [
      'Satisfação visual de ver sujeira sumindo',
      'Coop online divertido',
      'Trilha relaxante pra desestressar'
    ],
    considerations: [
      'Pode ficar repetitivo após muitas horas',
      'Mecânica simples sem evolução'
    ],
    similar: ['job-simulator', 'puzzling-places']
  },
  {
    id: 'kayak-vr',
    name: 'Kayak VR Mirage',
    emoji: '🛶',
    category: 'Simulação',
    genre: 'Esportes natureza',
    priceUsd: 29.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 6.0,
    developer: 'Better Than Life',
    languages: 'Inglês',
    playMode: 'Sentado',
    description: [
      'Você rema de caiaque em lugares paradisíacos: Antártica, Costa Rica, Noruega. Visual deslumbrante, água super realista.',
      'Pode jogar sentado no sofá remando com os controles, ótimo treino de braço sem perceber.'
    ],
    highlights: [
      'Visualmente lindo no Quest 3',
      'Treino de braço relaxante',
      'Modo multiplayer competitivo'
    ],
    considerations: [
      'Ritmo lento, não é pra todos',
      'Pouco conteúdo de longo prazo'
    ],
    similar: ['nature-treks', 'real-fishing']
  },
  {
    id: 'gravity-sketch',
    name: 'Gravity Sketch',
    emoji: '✏️',
    category: 'Criativo',
    genre: 'Modelagem 3D',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 1.0,
    developer: 'Gravity Sketch',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Ferramenta profissional de modelagem 3D em VR usada por designers automotivos, arquitetos e ilustradores. Você desenha no ar com curvas precisas.',
      'Free pra uso pessoal. Roda standalone, exporta pra Blender, Unity, Unreal e outros.'
    ],
    highlights: [
      'Usado por estúdios profissionais grandes',
      'Multiplayer colaborativo no mesmo modelo',
      'Free pra uso pessoal'
    ],
    considerations: [
      'Curva de aprendizado não é trivial',
      'Plano profissional é caro'
    ],
    similar: ['quill', 'open-brush']
  },
  {
    id: 'quill',
    name: 'Quill',
    emoji: '🪶',
    category: 'Criativo',
    genre: 'Pintura animada',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: true,
    userRating: 4.6,
    sizeGb: 1.5,
    developer: 'Smoothstep',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Ferramenta de ilustração e animação 3D em VR feita pra contar histórias visuais. Originalmente da Oculus, hoje é gratuita e ativa.',
      'Roda via PC VR. Foi usado por animadores premiados pra fazer curtas inteiros.'
    ],
    highlights: [
      'Capacidade de contar histórias visuais',
      'Resultados de qualidade profissional',
      'Free e mantido ativo'
    ],
    considerations: [
      'Precisa de PC VR pra rodar',
      'Não é fácil de aprender'
    ],
    similar: ['gravity-sketch', 'open-brush']
  },
  {
    id: 'open-brush',
    name: 'Open Brush',
    emoji: '🖌️',
    category: 'Criativo',
    genre: 'Pintura 3D',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 0.8,
    developer: 'Icosa Foundation',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Versão open source do Tilt Brush do Google. Você pinta no ar 3D com pincéis variados, desde tinta a fogo, fumaça e estrelas.',
      'Roda direto no Quest, free, exporta pra vários formatos. Ferramenta criativa essencial.'
    ],
    highlights: [
      'Free e open source',
      'Pincéis criativos absurdos',
      'Roda standalone no Quest'
    ],
    considerations: [
      'Sem updates oficiais grandes',
      'Sem multiplayer'
    ],
    similar: ['multibrush', 'painting-vr']
  },
  {
    id: 'multibrush',
    name: 'Multibrush',
    emoji: '🎨',
    category: 'Criativo',
    genre: 'Pintura colab',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.4,
    sizeGb: 0.6,
    developer: 'BadVR',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Versão multiplayer do Open Brush. Você pinta junto com amigos no mesmo espaço 3D, em tempo real.',
      'Ótimo pra brainstorming criativo, aulas remotas, ou só zoeira artística com a galera.'
    ],
    highlights: [
      'Pintura colaborativa em tempo real',
      'Free de verdade',
      'Bom pra ensino e workshops'
    ],
    considerations: [
      'Conjunto de pincéis menor que Open Brush',
      'Performance cai com muita gente na sala'
    ],
    similar: ['open-brush', 'gravity-sketch']
  },
  {
    id: 'painting-vr',
    name: 'Painting VR',
    emoji: '🖼️',
    category: 'Criativo',
    genre: 'Pintura 2D',
    priceUsd: 14.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 1.2,
    developer: 'Oisoi Studio',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'Simulação realista de pintura em tela 2D. Tinta a óleo, acrílica, pincéis variados, paleta, espátula. Vira atelier do artista no VR.',
      'Diferente do Open Brush que é 3D, aqui é tela mesmo. Bom pra praticar técnica de pintura tradicional.'
    ],
    highlights: [
      'Sensação real de pintar em tela',
      'Variedade de tintas e pincéis',
      'Sem sujar nada de verdade'
    ],
    considerations: [
      'Curva de pintor real ainda existe',
      'Sem ferramentas de undo robustas'
    ],
    similar: ['open-brush', 'shapesxr']
  },
  {
    id: 'shapesxr',
    name: 'ShapesXR',
    emoji: '📐',
    category: 'Criativo',
    genre: 'Prototipagem',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 1.0,
    developer: 'ShapesXR',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Ferramenta de prototipagem em VR pra UX designers, arquitetos e equipes de produto. Você cria mockups 3D e testa interações.',
      'Plano free generoso. Multiplayer colaborativo, integra com Figma, exporta pra Unity.'
    ],
    highlights: [
      'Integra com Figma',
      'Colaboração remota fluida',
      'Plano free funcional'
    ],
    considerations: [
      'Foco profissional, não é jogo',
      'Plano pago necessário pra times'
    ],
    similar: ['gravity-sketch', 'multibrush']
  },
  {
    id: 'first-encounters',
    name: 'First Encounters',
    emoji: '👽',
    category: 'Mixed Reality',
    genre: 'Experiência MR',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: true,
    multiplayer: false,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 0.4,
    developer: 'Meta',
    languages: 'Português, Inglês, +8',
    playMode: 'Em pé',
    description: [
      'A demo gratuita oficial do Meta pra mostrar Mixed Reality no Quest 3. Aliens fofinhos invadem sua sala, você abre portais nas paredes, mira e atira.',
      'Curtinho, free, é a primeira coisa que todo mundo joga ao tirar o Quest 3 da caixa.'
    ],
    highlights: [
      'Demonstração técnica gratuita',
      'Mostra o potencial de MR',
      'Família inteira curte'
    ],
    considerations: [
      'Curto, umas 30 minutos',
      'Sem rejogabilidade depois de explorar'
    ],
    similar: ['laser-dance', 'starship-home']
  },
  {
    id: 'lego-bricktales',
    name: 'LEGO Bricktales',
    emoji: '🧱',
    category: 'Mixed Reality',
    genre: 'Puzzle MR',
    priceUsd: 19.99,
    free: false,
    rating: 'L',
    mr: true,
    multiplayer: false,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 3.0,
    developer: 'ClockStone',
    languages: 'Português, Inglês, +8',
    playMode: 'Em pé',
    description: [
      'Versão MR do hit LEGO Bricktales. Você monta construções de LEGO em cima da sua mesa real, com puzzles físicos pra resolver em cada cenário.',
      'Funciona em VR também, mas o modo MR é o destaque. Calmo, criativo, perfeito pra família.'
    ],
    highlights: [
      'Mesa vira cenário de LEGO',
      'Puzzles criativos de construção',
      'Acalma e diverte ao mesmo tempo'
    ],
    considerations: [
      'Puzzles de física nem sempre intuitivos',
      'Conteúdo limitado vs versão de console'
    ],
    similar: ['starship-home', 'first-encounters']
  },
  {
    id: 'starship-home',
    name: 'Starship Home',
    emoji: '🚀',
    category: 'Mixed Reality',
    genre: 'Aventura MR',
    priceUsd: 19.99,
    free: false,
    rating: 'L',
    mr: true,
    multiplayer: false,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 2.5,
    developer: 'Creature',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'Sua sala vira o cockpit de uma nave espacial. Você cuida de plantas alienígenas, navega pelo cosmos e interage com a IA da nave.',
      'Experiência narrativa relaxante, sem combate, focada em explorar e cuidar. MR feito direito.'
    ],
    highlights: [
      'Sua sala vira nave de verdade',
      'Atmosfera relaxante e charmosa',
      'Showcase top de MR'
    ],
    considerations: [
      'Pouco combate, ritmo lento',
      'Algumas missões repetitivas'
    ],
    similar: ['first-encounters', 'lego-bricktales']
  },
  {
    id: 'laser-dance',
    name: 'Laser Dance',
    emoji: '🔴',
    category: 'Mixed Reality',
    genre: 'Ação MR',
    priceUsd: 9.99,
    free: false,
    rating: 'L',
    mr: true,
    multiplayer: false,
    needsPc: false,
    userRating: 4.9,
    sizeGb: 0.6,
    developer: 'Thomas Van Bouwel',
    languages: 'Inglês',
    playMode: 'Livre',
    description: [
      'Lançamento de 2025 que ganhou prêmio de melhor MR do ano. Lasers vermelhos, azuis e amarelos cortam sua sala e você precisa desviar tipo Tom Cruise em Missão Impossível.',
      'Funciona com hand tracking. Usa o scan da sua sala pra montar puzzles únicos no seu espaço real.'
    ],
    highlights: [
      'Melhor MR do Quest 3 hoje',
      'Hand tracking impecável',
      'Preço camarada de 10 dólares'
    ],
    considerations: [
      'Precisa de espaço razoável na sala',
      'Sala bagunçada atrapalha o scan'
    ],
    similar: ['first-encounters', 'cubism']
  },
  {
    id: 'espire-2-mr',
    name: 'Espire 2 MR',
    emoji: '🥷',
    category: 'Mixed Reality',
    genre: 'Stealth MR',
    priceUsd: 29.99,
    free: false,
    rating: '14',
    mr: true,
    multiplayer: false,
    needsPc: false,
    userRating: 4.4,
    sizeGb: 4.5,
    developer: 'Digital Lode',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Stealth shooter inspirado em Metal Gear e Splinter Cell, com modo Mixed Reality que coloca inimigos atrás dos seus móveis reais.',
      'Funciona em VR clássico também. O modo MR é diferenciado, vira simulação de invasão na sua casa.'
    ],
    highlights: [
      'Stealth com gadgets variados',
      'Modo MR aproveita móveis reais',
      'Trilha sonora estilosa'
    ],
    considerations: [
      'IA dos inimigos não é genial',
      'Modo MR melhor com sala vazia'
    ],
    similar: ['laser-dance', 'first-encounters']
  },
  {
    id: 'bam',
    name: 'BAM!',
    emoji: '👊',
    category: 'Mixed Reality',
    genre: 'Boxe MR',
    priceUsd: 9.99,
    free: false,
    rating: '12',
    mr: true,
    multiplayer: true,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 1.2,
    developer: 'Resolution Games',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Boxe arcade em MR. Inimigos surgem do chão e parede da sua sala, você bate, esquiva e desvia. Mais cardio do que técnica.',
      'Ótimo pra exercício rápido em MR. Suor garantido em sessões curtas.'
    ],
    highlights: [
      'Cardio rápido e divertido',
      'Inimigos integrados na sala real',
      'Preço acessível'
    ],
    considerations: [
      'Conteúdo limitado pra longo prazo',
      'Alguns moves frustrantes de acertar'
    ],
    similar: ['thrill-of-the-fight', 'first-encounters']
  },
  {
    id: 'rec-room',
    name: 'Rec Room',
    emoji: '🎮',
    category: 'Party e Social',
    genre: 'Plataforma social',
    priceUsd: 0,
    free: true,
    rating: '10',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 2.5,
    developer: 'Rec Room Inc',
    languages: 'Português, Inglês, +10',
    playMode: 'Livre',
    description: [
      'Plataforma social grátis com milhares de salas criadas pela comunidade: paintball, dodgeball, escape rooms, rpg, jogos de tabuleiro, festas.',
      'Cross play entre VR, console e celular. Comunidade gigantesca, sempre tem gente online.'
    ],
    highlights: [
      'Free de verdade, conteúdo infinito',
      'Cross play entre todas plataformas',
      'Editor de salas pra criar próprio jogo'
    ],
    considerations: [
      'Vários menores na comunidade, modere',
      'Loja de cosméticos e moedas pode tentar'
    ],
    similar: ['vrchat', 'horizon-worlds']
  },
  {
    id: 'vrchat',
    name: 'VRChat',
    emoji: '👥',
    category: 'Party e Social',
    genre: 'Mundo social',
    priceUsd: 0,
    free: true,
    rating: '14',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 4.0,
    developer: 'VRChat Inc',
    languages: 'Inglês',
    playMode: 'Livre',
    description: [
      'O metaverso original. Milhões de mundos criados pela comunidade, avatares de qualquer coisa, eventos, festas, role play. Caos criativo.',
      'A versão Quest é limitada perto do PC mas já tem bastante. Mais aberto e adulto que Rec Room.'
    ],
    highlights: [
      'Comunidade criativa absurda',
      'Avatares de literalmente qualquer coisa',
      'Eventos e shows ao vivo'
    ],
    considerations: [
      'Comunidade caótica, criança modere',
      'Versão Quest vê menos conteúdo que PC'
    ],
    similar: ['rec-room', 'horizon-worlds']
  },
  {
    id: 'walkabout-golf',
    name: 'Walkabout Mini Golf',
    emoji: '⛳',
    category: 'Party e Social',
    genre: 'Mini golfe social',
    priceUsd: 14.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.9,
    sizeGb: 2.0,
    developer: 'Mighty Coconut',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Mini golfe social com física precisa, vários campos temáticos lindos e modo cooperativo com até 5 amigos. Sub estimadíssimo, é mágico.',
      'Cross play, voz por proximidade, atualizações constantes com novos campos. Vai entrar pro top sem nem perceber.'
    ],
    highlights: [
      'Física de tacada precisa e satisfatória',
      'Coop relaxante com amigos',
      'Cross play universal'
    ],
    considerations: [
      'DLC de novos campos é pago',
      'Sem conteúdo solo profundo'
    ],
    similar: ['among-us', 'rec-room']
  },
  {
    id: 'among-us',
    name: 'Among Us VR',
    emoji: '👨‍🚀',
    category: 'Party e Social',
    genre: 'Social dedução',
    priceUsd: 9.99,
    free: false,
    rating: '10',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.4,
    sizeGb: 1.5,
    developer: 'Schell Games',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'O Among Us que você já conhece, agora em VR primeira pessoa. Tarefas pelo mapa, votação no salão de reunião, traidor matando à noite.',
      'A imersão muda tudo. Mentir olhando no olho do amigo é hilário. Voz por proximidade incluída.'
    ],
    highlights: [
      'Imersão muda toda a dinâmica social',
      'Voz por proximidade ótima',
      'Cross play com outros headsets'
    ],
    considerations: [
      'Só um mapa por enquanto',
      'Espera de fila pode ser chata'
    ],
    similar: ['walkabout-golf', 'rec-room']
  },
  {
    id: 'gorilla-tag',
    name: 'Gorilla Tag',
    emoji: '🦍',
    category: 'Party e Social',
    genre: 'Pega pega VR',
    priceUsd: 0,
    free: true,
    rating: '10',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 0.5,
    developer: 'Another Axiom',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Você é um gorila sem perna que se move balançando os braços no chão e nas árvores. Pega pega multiplayer puro, e é viciante demais.',
      'Free, comunidade gigante, virou febre entre crianças e adultos. Treino de braço sem perceber.'
    ],
    highlights: [
      'Movimento de braço único e natural',
      'Free e comunidade enorme',
      'Cardio escondido'
    ],
    considerations: [
      'Cansa o ombro rapidão',
      'Comunidade tem muitas crianças, modere chat'
    ],
    similar: ['rec-room', 'population-one']
  },
  {
    id: 'horizon-worlds',
    name: 'Meta Horizon Worlds',
    emoji: '🌐',
    category: 'Party e Social',
    genre: 'Plataforma social',
    priceUsd: 0,
    free: true,
    rating: '12',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 3.8,
    sizeGb: 1.5,
    developer: 'Meta',
    languages: 'Português, Inglês, +12',
    playMode: 'Livre',
    description: [
      'O metaverso oficial do Meta. Mundos criados por usuários, eventos sociais, shows, jogos. Tem versão de celular também pra curtir sem headset.',
      'Visual mais limpo que VRChat mas com personalidade menos forte. Free pra entrar e explorar.'
    ],
    highlights: [
      'Cross play com celular',
      'Eventos oficiais do Meta',
      'Editor de mundos integrado'
    ],
    considerations: [
      'Comunidade divide opiniões',
      'Performance varia entre mundos'
    ],
    similar: ['rec-room', 'vrchat']
  },
  {
    id: 'eleven-tt',
    name: 'Eleven Table Tennis',
    emoji: '🏓',
    category: 'Esportes',
    genre: 'Tênis de mesa',
    priceUsd: 19.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.9,
    sizeGb: 1.0,
    developer: 'For Fun Labs',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'O simulador de tênis de mesa mais realista do VR. Físicas precisas, modo multiplayer global, treinador IA, customização de raquete.',
      'Atletas profissionais usam pra treino. Sério mesmo, é assim de bom.'
    ],
    highlights: [
      'Físicas realistas elogiadas por pros',
      'Multiplayer global ativo',
      'IA de treino que evolui com você'
    ],
    considerations: [
      'Sem dimensão extra, é tênis puro',
      'Curva de aprendizado pra jogo competitivo'
    ],
    similar: ['racket-club', 'premium-bowling']
  },
  {
    id: 'racket-club',
    name: 'Racket Club',
    emoji: '🎾',
    category: 'Esportes',
    genre: 'Padel híbrido',
    priceUsd: 19.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 2.5,
    developer: 'Resolution Games',
    languages: 'Inglês, Espanhol',
    playMode: 'Em pé',
    description: [
      'Esporte de raquete fictício híbrido entre padel, squash e tênis. Funciona absurdamente bem, ranqueado e com torneios.',
      'Multiplayer focado, comunidade competitiva crescendo rápido. Ótimo treino sem precisar de quadra.'
    ],
    highlights: [
      'Esporte original que funciona',
      'Multiplayer competitivo polido',
      'Treino físico decente'
    ],
    considerations: [
      'Precisa espaço pra movimento lateral',
      'Sem modo solo aprofundado'
    ],
    similar: ['eleven-tt', 'nock']
  },
  {
    id: 'premium-bowling',
    name: 'Premium Bowling',
    emoji: '🎳',
    category: 'Esportes',
    genre: 'Boliche realista',
    priceUsd: 14.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 1.2,
    developer: 'Perp Games',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Boliche realista com física de pino fiel à realidade. Vários estilos de salão, customização de bola, modo multiplayer e league.',
      'Não é arcade, é simulação séria. Perfeito pra quem ama boliche de verdade.'
    ],
    highlights: [
      'Física de pinos super realista',
      'Customização de bola',
      'Multiplayer e league com amigos'
    ],
    considerations: [
      'Pode parecer monótono pra novato',
      'Sem variantes arcade malucas'
    ],
    similar: ['eleven-tt', 'walkabout-golf']
  },
  {
    id: 'real-fishing',
    name: 'Real VR Fishing',
    emoji: '🎣',
    category: 'Esportes',
    genre: 'Pesca relax',
    priceUsd: 19.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 3.0,
    developer: 'MIRAGESOFT',
    languages: 'Português, Inglês, +6',
    playMode: 'Sentado',
    description: [
      'Pescaria relaxante em lugares lindos do mundo. Sons da natureza, várias espécies de peixe, customização de equipamento.',
      'Pode jogar sentado. É meditação com vara na mão. Tem multiplayer pra pescar com amigos no mesmo lago.'
    ],
    highlights: [
      'Relaxante de verdade',
      'Cenários reais bonitos',
      'Multiplayer com amigos'
    ],
    considerations: [
      'Ritmo bem lento, paciência exigida',
      'Locais extras pagos'
    ],
    similar: ['kayak-vr', 'nature-treks']
  },
  {
    id: 'nock',
    name: 'Nock',
    emoji: '🏹',
    category: 'Esportes',
    genre: 'Esporte arco',
    priceUsd: 19.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 1.5,
    developer: 'Normal',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Mistura futebol, hockey e arco e flecha. Você dirige um carrinho atirando flechas pra fazer gol num campo neon. Esporte futurista único.',
      'Cross play, partidas curtas, fácil de pegar mas difícil de dominar. Vibe Tron com competição saudável.'
    ],
    highlights: [
      'Conceito original que funciona',
      'Cross play universal',
      'Visual neon estiloso'
    ],
    considerations: [
      'Comunidade menor que outros multi',
      'Movimento pode causar enjoo leve'
    ],
    similar: ['racket-club', 'premium-bowling']
  },
  {
    id: 'golf-plus',
    name: 'Golf+',
    emoji: '⛳',
    category: 'Esportes',
    genre: 'Golfe simulação',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 4.0,
    developer: 'GolfPlus Inc',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Simulador de golfe oficial da PGA Tour. Campos reais como Pebble Beach e St Andrews, modo multiplayer, ranking ativo.',
      'Free pra começar. Físicas precisas e curvas de bola realistas. Conteúdo extra dos campos é pago.'
    ],
    highlights: [
      'Campos reais de torneio',
      'Físicas realistas',
      'Free pra experimentar'
    ],
    considerations: [
      'Campos premium são pagos',
      'Curva pra não acertar slice gigante'
    ],
    similar: ['walkabout-golf', 'eleven-tt']
  },
  {
    id: 'wander',
    name: 'Wander',
    emoji: '🗺️',
    category: 'Exploração e Viagem',
    genre: 'Viagem virtual',
    priceUsd: 9.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 0.5,
    developer: 'Parkline Interactive',
    languages: 'Inglês',
    playMode: 'Sentado',
    description: [
      'Google Street View em VR. Você visita qualquer lugar do mundo em foto 360, do Coliseu ao Cristo Redentor, passando por rua qualquer da Mongólia.',
      'Pode visitar com amigos remotamente, virou ferramenta de matar saudade da família distante.'
    ],
    highlights: [
      'Mundo inteiro disponível',
      'Visitar com amigos remotamente',
      'Preço quase ridiculamente baixo'
    ],
    considerations: [
      'É foto 360, não 3D real',
      'Algumas áreas com fotos antigas'
    ],
    similar: ['nat-geo', 'nature-treks']
  },
  {
    id: 'nat-geo',
    name: 'National Geographic Explore VR',
    emoji: '🐧',
    category: 'Exploração e Viagem',
    genre: 'Documentário interativo',
    priceUsd: 9.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 2.0,
    developer: 'Force Field',
    languages: 'Português, Inglês, +5',
    playMode: 'Em pé',
    description: [
      'Explora a Antártica e Machu Picchu como se fosse cinegrafista da Nat Geo. Tira foto, escala, anda de caiaque, encontra animais selvagens.',
      'Curtinho mas memorável. Educativo, perfeito pra mostrar pra criança que ama natureza.'
    ],
    highlights: [
      'Educativo e imersivo',
      'Cenários espetaculares',
      'Bom pra família e crianças'
    ],
    considerations: [
      'Curto, umas 2 horas',
      'Conteúdo limitado, só dois lugares'
    ],
    similar: ['wander', 'anne-frank']
  },
  {
    id: 'anne-frank',
    name: 'Anne Frank House VR',
    emoji: '📖',
    category: 'Exploração e Viagem',
    genre: 'Histórico imersivo',
    priceUsd: 0,
    free: true,
    rating: '12',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.8,
    sizeGb: 0.4,
    developer: 'Anne Frank Stichting',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'Recriação fiel do anexo onde Anne Frank se escondeu durante a guerra. Você caminha pelos cômodos com narração contextual.',
      'Free, curto, profundamente impactante. Educação histórica em outro nível.'
    ],
    highlights: [
      'Profundamente educativo e tocante',
      'Recriação fiel do anexo histórico',
      'Free e acessível pra todos'
    ],
    considerations: [
      'Tema pesado emocionalmente',
      'Curto, é mais experiência que jogo'
    ],
    similar: ['nat-geo', 'mission-iss']
  },
  {
    id: 'nature-treks',
    name: 'Nature Treks VR',
    emoji: '🌳',
    category: 'Exploração e Viagem',
    genre: 'Relax natureza',
    priceUsd: 9.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 1.5,
    developer: 'Greener Games',
    languages: 'Inglês',
    playMode: 'Sentado',
    description: [
      'Cenários relaxantes da natureza pra meditar ou desestressar. Praia, floresta, savana, espaço, com sons ambiente e animais.',
      'Sem objetivo, é um app de bem estar. Ótimo antes de dormir ou pra crise de ansiedade.'
    ],
    highlights: [
      'Excelente pra ansiedade e relax',
      'Cenários variados e bonitos',
      'Sem pressão, ritmo seu'
    ],
    considerations: [
      'Sem objetivo pode entediar',
      'Visual datado em alguns biomas'
    ],
    similar: ['ecosphere', 'kayak-vr']
  },
  {
    id: 'ecosphere',
    name: 'Ecosphere',
    emoji: '🌍',
    category: 'Exploração e Viagem',
    genre: 'Documentário 360',
    priceUsd: 9.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 6.0,
    developer: 'PHORIA',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'Documentário 360 sobre vida selvagem narrado por Daniel Wu. Borneo, Quênia e Raja Ampat em foto realismo.',
      'Visualmente impecável. Mais experiência cinematográfica que jogo, mas educativa e linda.'
    ],
    highlights: [
      'Visual de cinema 360',
      'Narração profissional engajante',
      'Educação ambiental top'
    ],
    considerations: [
      'Sem interatividade real',
      'Curto, três episódios'
    ],
    similar: ['nat-geo', 'nature-treks']
  },
  {
    id: 'mission-iss',
    name: 'Mission ISS Quest',
    emoji: '🛰️',
    category: 'Exploração e Viagem',
    genre: 'Simulação espacial',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 1.0,
    developer: 'Magnopus',
    languages: 'Inglês',
    playMode: 'Sentado',
    description: [
      'Você visita a Estação Espacial Internacional em escala real e flutua pelos módulos em microgravidade. Educacional e fascinante.',
      'Free, bem feito, dura uns 30 a 60 minutos. Bom pra mostrar pra qualquer fã de espaço.'
    ],
    highlights: [
      'ISS escaneada em escala real',
      'Sensação de flutuar em microgravidade',
      'Free e educativo'
    ],
    considerations: [
      'Curto, sem rejogabilidade',
      'Sem dublagem em português'
    ],
    similar: ['nat-geo', 'anne-frank']
  },
  {
    id: 'angry-birds',
    name: 'Angry Birds VR Isle of Pigs',
    emoji: '🐦',
    category: 'Infantil e Família',
    genre: 'Puzzle casual',
    priceUsd: 14.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 1.2,
    developer: 'Resolution Games',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'O Angry Birds que você já conhece, agora em 3D imersivo. Você joga os passarinhos contra construções de porcos em vários cenários temáticos.',
      'Família inteira diverte, criança aprende sozinha. Mecânica simples, satisfação alta.'
    ],
    highlights: [
      'Família inteira joga junto',
      'Criança pega rápido',
      'Físicas satisfatórias'
    ],
    considerations: [
      'Curto vs versão mobile',
      'Sem multiplayer cooperativo'
    ],
    similar: ['moss-1', 'dreamland']
  },
  {
    id: 'dreamland',
    name: 'Dreamland',
    emoji: '🦄',
    category: 'Infantil e Família',
    genre: 'Aventura infantil',
    priceUsd: 14.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 2.0,
    developer: 'Innerspace VR',
    languages: 'Português, Inglês, +5',
    playMode: 'Em pé',
    description: [
      'Aventura mágica num mundo onírico habitado por criaturas fofas. Visual de livro infantil, narração calma, puzzles leves.',
      'Perfeito pra criança a partir de 6 anos. Adulto também curte pelo charme visual.'
    ],
    highlights: [
      'Direção de arte encantadora',
      'Narração calma e amiga',
      'Acessível pra crianças menores'
    ],
    considerations: [
      'Pode ser fácil demais pra adulto',
      'Conteúdo curto, umas 3 horas'
    ],
    similar: ['moss-1', 'angry-birds']
  },
  {
    id: 'superhot-vr',
    name: 'Superhot VR',
    emoji: '🟥',
    category: 'Clássicos essenciais',
    genre: 'Ação puzzle',
    priceUsd: 24.99,
    free: false,
    rating: '14',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 1.0,
    developer: 'SUPERHOT Team',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'O tempo só anda quando você anda. Cada nível é um quebra cabeça de combate em câmera lenta onde você esquiva, agarra e ataca inimigos cristalinos.',
      'Curto mas inesquecível. Sensação de Matrix garantida em todo nível.'
    ],
    highlights: [
      'Mecânica de tempo é genial',
      'Sensação de protagonista de filme',
      'Perfeito pra clipes incríveis'
    ],
    considerations: [
      'Curto, umas 3 horas pra primeira run',
      'Pouca variedade de inimigos'
    ],
    similar: ['pistol-whip', 'hard-bullet']
  },
  {
    id: 'richies-plank',
    name: 'Richies Plank Experience',
    emoji: '🪜',
    category: 'Clássicos essenciais',
    genre: 'Demo VR',
    priceUsd: 14.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.6,
    sizeGb: 0.6,
    developer: 'Toast',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Aquela tábua famosa no 80 andar de prédio. É o jogo que todo mundo passa pra amigo conhecer VR e sair gritando.',
      'Tem extras tipo modo super herói voando, bombeiro, e várias brincadeiras curtas. Pequeno mas eterno.'
    ],
    highlights: [
      'Vitrine perfeita pra novato no VR',
      'Extras divertidos além da tábua',
      'Vai virar seu show pra visitas'
    ],
    considerations: [
      'Sem profundidade real',
      'Quase só serve pra mostrar pra gente'
    ],
    similar: ['job-simulator', 'first-encounters']
  },
  {
    id: 'vader-immortal',
    name: 'Vader Immortal',
    emoji: '🌑',
    category: 'Clássicos essenciais',
    genre: 'Aventura narrativa',
    priceUsd: 9.99,
    free: false,
    rating: '12',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 4.5,
    developer: 'ILMxLAB',
    languages: 'Português, Inglês, +6',
    playMode: 'Em pé',
    description: [
      'Trilogia Star Wars com Darth Vader como ameaça central. Você empunha sabre de luz, usa a força e enfrenta inimigos no planeta Mustafar.',
      'Não é longo mas a sensação de cara a cara com Vader e usar sabre de luz é inesquecível.'
    ],
    highlights: [
      'Sabre de luz funciona lindo',
      'Encontro com Vader é épico',
      'Preço camarada pelo conteúdo'
    ],
    considerations: [
      'Curta cada parte, total umas 5 horas',
      'Mais foco em narrativa que combate'
    ],
    similar: ['superhot-vr', 'asgards-wrath-2']
  },
  {
    id: 'youtube-vr',
    name: 'YouTube VR',
    emoji: '📺',
    category: 'Apps úteis',
    genre: 'Vídeo',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.3,
    sizeGb: 0.5,
    developer: 'Google',
    languages: 'Português, Inglês, +30',
    playMode: 'Sentado',
    description: [
      'YouTube oficial pra VR. Assiste vídeos comuns em telão, vídeos 360 e VR nativos. Acompanha sua conta e recomendações normais.',
      'O modo cinema com tela gigante é ótimo pra deitar e assistir como se fosse no cinema.'
    ],
    highlights: [
      'Acesso completo ao YouTube',
      'Modos cinema e 360',
      'Free com sua conta normal'
    ],
    considerations: [
      'Anúncios continuam normais',
      'Interface poderia ser melhor'
    ],
    similar: ['skybox', 'bigscreen']
  },
  {
    id: 'virtual-desktop',
    name: 'Virtual Desktop',
    emoji: '🖥️',
    category: 'Apps úteis',
    genre: 'Streaming PC',
    priceUsd: 19.99,
    free: false,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: true,
    userRating: 4.9,
    sizeGb: 0.3,
    developer: 'Guy Godin',
    languages: 'Português, Inglês, +6',
    playMode: 'Sentado',
    description: [
      'Streaming sem fio do PC pro Quest. Joga jogos PC VR, usa Windows num telão imenso, conecta sem fio com qualidade absurda.',
      'Considerado essencial pra quem tem PC gamer. Vale a pena cada centavo.'
    ],
    highlights: [
      'Streaming wireless sem latência perceptível',
      'Acesso a toda biblioteca SteamVR',
      'Excelente pra trabalho e jogo'
    ],
    considerations: [
      'Precisa de PC bom e Wi Fi 6',
      'Configuração inicial não é trivial'
    ],
    similar: ['immersed', 'bigscreen']
  },
  {
    id: 'immersed',
    name: 'Immersed',
    emoji: '💼',
    category: 'Apps úteis',
    genre: 'Produtividade',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: true,
    multiplayer: true,
    needsPc: true,
    userRating: 4.4,
    sizeGb: 0.5,
    developer: 'Immersed',
    languages: 'Inglês',
    playMode: 'Sentado',
    description: [
      'Vira seu Quest num escritório com até 5 monitores virtuais. Funciona em VR puro ou MR pra ver o teclado real enquanto trabalha.',
      'Plano free serve pra muita coisa, plano pago libera 4K e mais monitores.'
    ],
    highlights: [
      'Múltiplos monitores virtuais grandes',
      'Modo MR pra ver teclado real',
      'Plano free generoso'
    ],
    considerations: [
      'Precisa instalar agente no PC',
      'Plano pago caro pra uso pesado'
    ],
    similar: ['virtual-desktop', 'horizon-worlds']
  },
  {
    id: 'bigscreen',
    name: 'Bigscreen',
    emoji: '🎬',
    category: 'Apps úteis',
    genre: 'Cinema VR',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.5,
    sizeGb: 1.0,
    developer: 'Bigscreen Inc',
    languages: 'Inglês',
    playMode: 'Sentado',
    description: [
      'Cinema virtual social. Você assiste filme com amigos remotamente, em sala de cinema realista. Tem catálogo próprio de filmes pra alugar.',
      'Free pra entrar e ver com amigos. Streaming em qualidade boa, vibe de cinema mesmo.'
    ],
    highlights: [
      'Cinema social com amigos remoto',
      'Salas de cinema realistas',
      'Catálogo próprio de filmes'
    ],
    considerations: [
      'Filmes do catálogo são pagos',
      'Precisa galera pra render'
    ],
    similar: ['youtube-vr', 'skybox']
  },
  {
    id: 'skybox',
    name: 'Skybox VR Video Player',
    emoji: '🎞️',
    category: 'Apps úteis',
    genre: 'Player vídeo',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: false,
    needsPc: false,
    userRating: 4.7,
    sizeGb: 0.3,
    developer: 'Source Technology',
    languages: 'Português, Inglês, +12',
    playMode: 'Sentado',
    description: [
      'Player de vídeo local pra Quest. Roda filme do PC ou da rede em telão de cinema, suporta 360, 180, 3D e formatos exóticos.',
      'Free, leve, melhor app pra assistir filme baixado em telão IMAX virtual.'
    ],
    highlights: [
      'Suporta praticamente todo formato',
      'Streaming via SMB e DLNA',
      'Free e sem assinatura'
    ],
    considerations: [
      'Versão pro tem coisas extras',
      'Sem catálogo próprio, traz seus arquivos'
    ],
    similar: ['bigscreen', 'youtube-vr']
  },
  {
    id: 'spatial',
    name: 'Spatial',
    emoji: '🏛️',
    category: 'Apps úteis',
    genre: 'Reuniões VR',
    priceUsd: 0,
    free: true,
    rating: 'L',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.2,
    sizeGb: 0.7,
    developer: 'Spatial',
    languages: 'Inglês',
    playMode: 'Em pé',
    description: [
      'Galerias e espaços sociais 3D pra arte, eventos, reuniões. Você sobe seu mundo, exposição ou jogo e compartilha link pra qualquer um entrar.',
      'Plataforma criativa séria. Free pra começar, com pacotes pagos pra recursos profissionais.'
    ],
    highlights: [
      'Cria espaços próprios fácil',
      'Galerias de arte e eventos',
      'Cross play com web e celular'
    ],
    considerations: [
      'Performance varia por mundo',
      'Comunidade menor que VRChat'
    ],
    similar: ['horizon-worlds', 'rec-room']
  },
  {
    id: 'xbox-cloud',
    name: 'Xbox Cloud Gaming',
    emoji: '🎮',
    category: 'Apps úteis',
    genre: 'Cloud gaming',
    priceUsd: 0,
    free: true,
    rating: '14',
    mr: false,
    multiplayer: true,
    needsPc: false,
    userRating: 4.4,
    sizeGb: 0.4,
    developer: 'Microsoft',
    languages: 'Português, Inglês, +14',
    playMode: 'Sentado',
    description: [
      'App oficial pra jogar jogos do Game Pass via streaming, em tela curva gigante. Joga Forza, Halo, Starfield no Quest sem precisar de console.',
      'Free pra baixar mas precisa de assinatura Game Pass Ultimate. Ótimo se você já tem Game Pass.'
    ],
    highlights: [
      'Joga AAA do Xbox sem console',
      'Tela curva gigante imersiva',
      'Centenas de jogos no Game Pass'
    ],
    considerations: [
      'Precisa Game Pass Ultimate pago',
      'Internet boa é obrigatória'
    ],
    similar: ['virtual-desktop', 'youtube-vr']
  }
];

const STATUS_COLOR = {
  yes: { ring: 'ring-green-500', bg: 'bg-green-500', text: 'text-green-400', soft: 'bg-green-500/10', border: 'border-green-500' },
  maybe: { ring: 'ring-yellow-500', bg: 'bg-yellow-500', text: 'text-yellow-300', soft: 'bg-yellow-500/10', border: 'border-yellow-500' },
  no: { ring: 'ring-neutral-600', bg: 'bg-neutral-600', text: 'text-neutral-400', soft: 'bg-neutral-700/40', border: 'border-neutral-600' }
};

const RATING_COLOR = {
  L: 'bg-green-600',
  '10': 'bg-blue-600',
  '12': 'bg-yellow-600',
  '14': 'bg-orange-600',
  '16': 'bg-red-600',
  '18': 'bg-black border border-red-500'
};

function Badge({ children, className = '' }) {
  return (
    <span className={'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide ' + className}>
      {children}
    </span>
  );
}

function GameCard({ game, status, onSetStatus, onOpen }) {
  const ringClass = status ? 'ring-2 ' + STATUS_COLOR[status].ring : 'ring-1 ring-neutral-800';
  const priceText = formatBRL(game.priceUsd, game.free);
  return (
    <div
      className={'group relative bg-neutral-900 rounded-2xl p-4 flex flex-col gap-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(200,224,0,0.35)] ' + ringClass}
      style={{ backgroundColor: '#1a1a1a' }}
    >
      {game.free && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-[#c8e000] text-black">GRÁTIS</Badge>
        </div>
      )}
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded-xl bg-neutral-800 flex items-center justify-center text-4xl shrink-0 ring-1 ring-neutral-700">
          {game.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-base leading-tight line-clamp-2">{game.name}</h3>
          <p className="text-neutral-400 text-xs mt-1 truncate">{game.genre}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-[#c8e000] fill-[#c8e000]" />
            <span className="text-xs text-neutral-300 font-semibold">{game.userRating.toFixed(1)}</span>
            <span className="text-[10px] text-neutral-500">de 5</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        <Badge className={RATING_COLOR[game.rating] + ' text-white'}>{game.rating}</Badge>
        {game.mr && <Badge className="bg-purple-600/30 text-purple-300 ring-1 ring-purple-500/40"><Sparkles className="w-2.5 h-2.5" />MR</Badge>}
        {game.multiplayer && <Badge className="bg-blue-600/30 text-blue-300 ring-1 ring-blue-500/40"><Users className="w-2.5 h-2.5" />Multi</Badge>}
        {game.needsPc && <Badge className="bg-orange-600/30 text-orange-300 ring-1 ring-orange-500/40"><Monitor className="w-2.5 h-2.5" />PC</Badge>}
        <Badge className="bg-neutral-800 text-neutral-400"><Box className="w-2.5 h-2.5" />{game.sizeGb}GB</Badge>
      </div>

      <div className="flex items-baseline justify-between mt-auto">
        <span className="text-xs text-neutral-500 truncate">{game.category}</span>
        <span className={'font-bold text-lg ' + (game.free ? 'text-[#c8e000]' : 'text-white')}>{priceText}</span>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        <button
          onClick={() => onSetStatus(game.id, status === 'yes' ? null : 'yes')}
          className={'rounded-lg py-2 text-xs font-bold transition-all ' + (status === 'yes' ? 'bg-green-500 text-white' : 'bg-green-500/10 text-green-400 hover:bg-green-500/20')}
        >
          <Check className="w-4 h-4 mx-auto" />
          SIM
        </button>
        <button
          onClick={() => onSetStatus(game.id, status === 'maybe' ? null : 'maybe')}
          className={'rounded-lg py-2 text-xs font-bold transition-all ' + (status === 'maybe' ? 'bg-yellow-500 text-black' : 'bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20')}
        >
          <HelpCircle className="w-4 h-4 mx-auto" />
          TALVEZ
        </button>
        <button
          onClick={() => onSetStatus(game.id, status === 'no' ? null : 'no')}
          className={'rounded-lg py-2 text-xs font-bold transition-all ' + (status === 'no' ? 'bg-neutral-600 text-white' : 'bg-neutral-700/40 text-neutral-400 hover:bg-neutral-700')}
        >
          <Ban className="w-4 h-4 mx-auto" />
          NÃO
        </button>
      </div>

      <button
        onClick={() => onOpen(game)}
        className="text-xs text-neutral-400 hover:text-[#c8e000] flex items-center justify-center gap-1 mt-1 transition-colors"
      >
        Ver detalhes <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}

function DetailsModal({ game, status, onSetStatus, onClose, onOpenSimilar, allGames }) {
  if (!game) return null;
  const priceText = formatBRL(game.priceUsd, game.free);
  const storeUrl = 'https://www.meta.com/experiences/search/?q=' + encodeURIComponent(game.name);
  const similarGames = (game.similar || []).map((id) => allGames.find((g) => g.id === id)).filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto ring-1 ring-neutral-800"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: '#1a1a1a' }}
      >
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-neutral-800/50 to-neutral-900 border-b border-neutral-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-24 h-24 rounded-2xl bg-neutral-800 flex items-center justify-center text-6xl ring-1 ring-neutral-700">
              {game.emoji}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white">{game.name}</h2>
              <p className="text-neutral-400 mt-1">{game.genre}</p>
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#c8e000] fill-[#c8e000]" />
                  <span className="text-sm text-white font-semibold">{game.userRating.toFixed(1)}</span>
                </div>
                <Badge className={RATING_COLOR[game.rating] + ' text-white'}>{game.rating}</Badge>
                {game.mr && <Badge className="bg-purple-600/30 text-purple-300"><Sparkles className="w-2.5 h-2.5" />Mixed Reality</Badge>}
                {game.multiplayer && <Badge className="bg-blue-600/30 text-blue-300"><Users className="w-2.5 h-2.5" />Multiplayer</Badge>}
                {game.needsPc && <Badge className="bg-orange-600/30 text-orange-300"><Monitor className="w-2.5 h-2.5" />Precisa de PC</Badge>}
                {game.free && <Badge className="bg-[#c8e000] text-black">GRÁTIS</Badge>}
              </div>
              <p className={'mt-3 text-2xl font-bold ' + (game.free ? 'text-[#c8e000]' : 'text-white')}>{priceText}</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <section>
            {game.description.map((p, i) => (
              <p key={i} className="text-neutral-300 leading-relaxed mb-3 last:mb-0">{p}</p>
            ))}
          </section>

          <section>
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Ficha técnica
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <FichaItem label="Desenvolvedor" value={game.developer} />
              <FichaItem label="Tamanho" value={game.sizeGb + ' GB'} />
              <FichaItem label="Idiomas" value={game.languages} />
              <FichaItem label="Modo de jogo" value={game.playMode} />
              <FichaItem label="Mixed Reality" value={game.mr ? 'Sim' : 'Não'} />
              <FichaItem label="Multiplayer" value={game.multiplayer ? 'Sim' : 'Não'} />
              <FichaItem label="Precisa de PC" value={game.needsPc ? 'Sim' : 'Não'} />
              <FichaItem label="Categoria" value={game.category} />
              <FichaItem label="Classificação" value={game.rating === 'L' ? 'Livre' : game.rating + ' anos'} />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#c8e000]" />
              O que tem de massa
            </h3>
            <ul className="space-y-2">
              {game.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-neutral-200">
                  <Check className="w-4 h-4 text-[#c8e000] mt-0.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              Coisas pra considerar
            </h3>
            <ul className="space-y-2">
              {game.considerations.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-neutral-200">
                  <span className="text-yellow-400 mt-0.5 shrink-0">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          {similarGames.length > 0 && (
            <section>
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Wand2 className="w-4 h-4" />
                Jogos parecidos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {similarGames.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onOpenSimilar(s)}
                    className="text-left bg-neutral-800/60 hover:bg-neutral-800 p-3 rounded-xl transition-colors flex items-center gap-2"
                  >
                    <span className="text-2xl">{s.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-sm text-white font-semibold truncate">{s.name}</p>
                      <p className="text-xs text-neutral-400 truncate">{formatBRL(s.priceUsd, s.free)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Ver na loja do Quest
          </a>

          <div className="grid grid-cols-3 gap-2 sticky bottom-0 pt-3">
            <button
              onClick={() => onSetStatus(game.id, status === 'yes' ? null : 'yes')}
              className={'rounded-xl py-3 text-sm font-bold transition-all flex flex-col items-center gap-1 ' + (status === 'yes' ? 'bg-green-500 text-white' : 'bg-green-500/10 text-green-400 hover:bg-green-500/20')}
            >
              <Check className="w-5 h-5" />
              SIM
            </button>
            <button
              onClick={() => onSetStatus(game.id, status === 'maybe' ? null : 'maybe')}
              className={'rounded-xl py-3 text-sm font-bold transition-all flex flex-col items-center gap-1 ' + (status === 'maybe' ? 'bg-yellow-500 text-black' : 'bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20')}
            >
              <HelpCircle className="w-5 h-5" />
              TALVEZ
            </button>
            <button
              onClick={() => onSetStatus(game.id, status === 'no' ? null : 'no')}
              className={'rounded-xl py-3 text-sm font-bold transition-all flex flex-col items-center gap-1 ' + (status === 'no' ? 'bg-neutral-600 text-white' : 'bg-neutral-700/40 text-neutral-400 hover:bg-neutral-700')}
            >
              <Ban className="w-5 h-5" />
              NÃO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FichaItem({ label, value }) {
  return (
    <div className="bg-neutral-800/60 rounded-xl p-3">
      <p className="text-[10px] text-neutral-500 uppercase tracking-wide font-semibold">{label}</p>
      <p className="text-sm text-neutral-200 mt-1 font-medium">{value}</p>
    </div>
  );
}

function CartPanel({ open, onClose, decisions, onSetStatus, allGames, onAskReset, onCopy, copied }) {
  if (!open) return null;
  const yesGames = allGames.filter((g) => decisions[g.id] === 'yes');
  const maybeGames = allGames.filter((g) => decisions[g.id] === 'maybe');
  const yesTotal = yesGames.reduce((s, g) => s + rawBRL(g.priceUsd, g.free), 0);
  const maybeTotal = maybeGames.reduce((s, g) => s + rawBRL(g.priceUsd, g.free), 0);
  const yesFreeCount = yesGames.filter((g) => g.free).length;

  return (
    <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex justify-end" onClick={onClose}>
      <div
        className="bg-neutral-950 w-full max-w-md h-full overflow-y-auto ring-1 ring-neutral-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: '#0f0f0f' }}
      >
        <div className="sticky top-0 bg-neutral-950 z-10 p-5 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#c8e000]" />
              Minha lista
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">{yesGames.length} confirmados, {maybeGames.length} em dúvida</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5 flex-1">
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-green-400 uppercase tracking-wide flex items-center gap-2">
                <Check className="w-4 h-4" /> Quero comprar
              </h3>
              <span className="text-xs text-neutral-500">{yesGames.length} item{yesGames.length === 1 ? '' : 's'}</span>
            </div>
            {yesGames.length === 0 ? (
              <div className="text-sm text-neutral-500 bg-neutral-900 rounded-xl p-4 text-center">
                Nenhum item marcado como SIM ainda. Volta lá e escolhe uns!
              </div>
            ) : (
              <ul className="space-y-2">
                {yesGames.map((g) => (
                  <CartItem key={g.id} game={g} onRemove={() => onSetStatus(g.id, null)} />
                ))}
              </ul>
            )}
          </section>

          <div className="bg-gradient-to-br from-[#c8e000]/10 to-transparent border border-[#c8e000]/30 rounded-2xl p-5">
            <p className="text-xs text-neutral-400 uppercase tracking-wide font-semibold">Subtotal SIM</p>
            <p className="text-4xl font-black text-[#c8e000] mt-1">{yesTotal === 0 ? 'R$ 0,00' : 'R$ ' + yesTotal.toFixed(2).replace('.', ',')}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {yesFreeCount} grátis</span>
              <span className="flex items-center gap-1"><Gamepad2 className="w-3 h-3" /> {yesGames.length - yesFreeCount} pago{yesGames.length - yesFreeCount === 1 ? '' : 's'}</span>
            </div>
          </div>

          {maybeGames.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-yellow-300 uppercase tracking-wide flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" /> Em dúvida
                </h3>
                <span className="text-xs text-neutral-500">{maybeGames.length} item{maybeGames.length === 1 ? '' : 's'}</span>
              </div>
              <ul className="space-y-2">
                {maybeGames.map((g) => (
                  <MaybeItem
                    key={g.id}
                    game={g}
                    onYes={() => onSetStatus(g.id, 'yes')}
                    onNo={() => onSetStatus(g.id, 'no')}
                  />
                ))}
              </ul>
              <div className="mt-3 bg-neutral-900 rounded-xl p-4 text-sm text-neutral-300">
                Se você juntar todos os TALVEZ, total fica <span className="font-bold text-yellow-300">R$ {(yesTotal + maybeTotal).toFixed(2).replace('.', ',')}</span>
              </div>
            </section>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={onCopy}
              disabled={yesGames.length === 0}
              className="flex items-center justify-center gap-2 bg-[#c8e000] hover:bg-[#d4eb1f] disabled:bg-neutral-800 disabled:text-neutral-600 text-black font-bold py-3 rounded-xl transition-colors text-sm"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copiado!' : 'Copiar lista'}
            </button>
            <button
              onClick={onAskReset}
              className="flex items-center justify-center gap-2 bg-neutral-800 hover:bg-red-500/20 text-neutral-300 hover:text-red-400 font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Resetar tudo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItem({ game, onRemove }) {
  return (
    <li className="flex items-center gap-3 bg-neutral-900 rounded-xl p-3">
      <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-2xl shrink-0">{game.emoji}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{game.name}</p>
        <p className="text-xs text-neutral-500 truncate">{game.category}</p>
      </div>
      <p className={'text-sm font-bold ' + (game.free ? 'text-[#c8e000]' : 'text-white')}>{formatBRL(game.priceUsd, game.free)}</p>
      <button onClick={onRemove} className="text-neutral-500 hover:text-red-400 p-1">
        <Trash2 className="w-4 h-4" />
      </button>
    </li>
  );
}

function MaybeItem({ game, onYes, onNo }) {
  return (
    <li className="bg-neutral-900 rounded-xl p-3 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-2xl shrink-0">{game.emoji}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{game.name}</p>
        <p className="text-xs text-neutral-500">{formatBRL(game.priceUsd, game.free)}</p>
      </div>
      <div className="flex gap-1">
        <button onClick={onYes} className="px-2 py-1.5 rounded-lg bg-green-500/15 hover:bg-green-500/30 text-green-400 text-[10px] font-bold flex items-center gap-1">
          <Check className="w-3 h-3" /> SIM
        </button>
        <button onClick={onNo} className="px-2 py-1.5 rounded-lg bg-neutral-700/40 hover:bg-neutral-700 text-neutral-400 text-[10px] font-bold flex items-center gap-1">
          <Ban className="w-3 h-3" /> NÃO
        </button>
      </div>
    </li>
  );
}

function ResetConfirm({ open, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-2xl p-6 max-w-sm ring-1 ring-red-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Resetar mesmo?</h3>
        </div>
        <p className="text-sm text-neutral-300">Isso vai apagar todas suas escolhas (SIM, TALVEZ e NÃO). Não tem volta.</p>
        <div className="grid grid-cols-2 gap-2 mt-5">
          <button onClick={onCancel} className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 rounded-xl text-sm">
            Cancelar
          </button>
          <button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl text-sm">
            Resetar tudo
          </button>
        </div>
      </div>
    </div>
  );
}

const QUICK_FILTERS = [
  { id: 'free', label: 'Grátis', test: (g) => g.free },
  { id: 'cheap', label: 'Até R$ 50', test: (g) => !g.free && rawBRL(g.priceUsd, false) <= 50 },
  { id: 'mid', label: 'R$ 50 a R$ 150', test: (g) => !g.free && rawBRL(g.priceUsd, false) > 50 && rawBRL(g.priceUsd, false) <= 150 },
  { id: 'high', label: 'Acima de R$ 150', test: (g) => !g.free && rawBRL(g.priceUsd, false) > 150 },
  { id: 'mr', label: 'Suporta MR', test: (g) => g.mr },
  { id: 'multi', label: 'Multiplayer', test: (g) => g.multiplayer },
  { id: 'solo', label: 'Solo', test: (g) => !g.multiplayer }
];

const SORT_OPTIONS = [
  { id: 'name', label: 'Nome A a Z' },
  { id: 'priceAsc', label: 'Preço menor primeiro' },
  { id: 'priceDesc', label: 'Preço maior primeiro' },
  { id: 'ratingDesc', label: 'Nota maior primeiro' },
  { id: 'category', label: 'Categoria' }
];

const TABS = [
  { id: 'all', label: 'Todos', icon: Filter },
  { id: 'yes', label: 'SIM', icon: Check },
  { id: 'maybe', label: 'TALVEZ', icon: HelpCircle },
  { id: 'no', label: 'NÃO', icon: Ban },
  { id: 'unmarked', label: 'Sem marcar', icon: Plus }
];

export default function MetaQuestWishlist({ initialGames = GAMES }) {
  const [decisions, setDecisions] = useState({});
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [quickFilters, setQuickFilters] = useState([]);
  const [tab, setTab] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [cartOpen, setCartOpen] = useState(false);
  const [modalGame, setModalGame] = useState(null);
  const [showReset, setShowReset] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const setStatus = (id, status) => {
    setDecisions((prev) => {
      const next = { ...prev };
      if (status === null) delete next[id];
      else next[id] = status;
      return next;
    });
  };

  const toggleQuickFilter = (id) => {
    setQuickFilters((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const filteredGames = useMemo(() => {
    let list = initialGames;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((g) => g.name.toLowerCase().includes(q) || g.genre.toLowerCase().includes(q));
    }
    if (category !== 'all') list = list.filter((g) => g.category === category);
    if (quickFilters.length > 0) {
      list = list.filter((g) => quickFilters.every((qf) => {
        const f = QUICK_FILTERS.find((x) => x.id === qf);
        return f ? f.test(g) : true;
      }));
    }
    if (tab !== 'all') {
      if (tab === 'unmarked') list = list.filter((g) => !decisions[g.id]);
      else list = list.filter((g) => decisions[g.id] === tab);
    }
    const sorted = [...list];
    if (sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'priceAsc') sorted.sort((a, b) => rawBRL(a.priceUsd, a.free) - rawBRL(b.priceUsd, b.free));
    if (sortBy === 'priceDesc') sorted.sort((a, b) => rawBRL(b.priceUsd, b.free) - rawBRL(a.priceUsd, a.free));
    if (sortBy === 'ratingDesc') sorted.sort((a, b) => b.userRating - a.userRating);
    if (sortBy === 'category') sorted.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    return sorted;
  }, [initialGames, search, category, quickFilters, tab, sortBy, decisions]);

  const yesCount = useMemo(() => Object.values(decisions).filter((v) => v === 'yes').length, [decisions]);
  const yesTotal = useMemo(() => initialGames
    .filter((g) => decisions[g.id] === 'yes')
    .reduce((s, g) => s + rawBRL(g.priceUsd, g.free), 0), [initialGames, decisions]);

  const counts = useMemo(() => {
    const all = initialGames.length;
    const yes = initialGames.filter((g) => decisions[g.id] === 'yes').length;
    const maybe = initialGames.filter((g) => decisions[g.id] === 'maybe').length;
    const no = initialGames.filter((g) => decisions[g.id] === 'no').length;
    const unmarked = all - yes - maybe - no;
    return { all, yes, maybe, no, unmarked };
  }, [initialGames, decisions]);

  const handleCopy = async () => {
    const yesGames = initialGames.filter((g) => decisions[g.id] === 'yes');
    if (yesGames.length === 0) return;
    const text = 'Jogos que quero pro Quest 3:\n\n' +
      yesGames.map((g, i) => (i + 1) + '. ' + g.name + ' (' + formatBRL(g.priceUsd, g.free) + ')').join('\n') +
      '\n\nTotal: R$ ' + yesTotal.toFixed(2).replace('.', ',');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConfirmReset = () => {
    setDecisions({});
    setShowReset(false);
  };

  const fontStack = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0a0a0a', fontFamily: fontStack }}>
      <header className="sticky top-0 z-30 bg-[#0a0a0a]/95 backdrop-blur border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c8e000] flex items-center justify-center text-black font-black text-xl">Q</div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">Meta Quest Wishlist</h1>
              <p className="text-[10px] sm:text-xs text-neutral-500">Catálogo curado por você</p>
            </div>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 px-3 sm:px-4 py-2 rounded-xl ring-1 ring-neutral-800 transition-colors"
          >
            <ShoppingCart className="w-4 h-4 text-[#c8e000]" />
            <span className="hidden sm:inline text-sm font-semibold">Lista</span>
            <span className="bg-[#c8e000] text-black text-xs font-black rounded-full px-2 py-0.5 min-w-[24px] text-center">{yesCount}</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="bg-neutral-900 rounded-2xl p-4 sm:p-5 ring-1 ring-neutral-800 space-y-4" style={{ backgroundColor: '#141414' }}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Procurar por nome ou gênero..."
                className="w-full bg-neutral-800 text-white placeholder-neutral-500 pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c8e000] text-sm"
              />
            </div>
            <div className="grid grid-cols-2 md:flex md:flex-row gap-3">
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none bg-neutral-800 text-white pl-3 pr-8 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c8e000] text-sm w-full md:w-auto"
                >
                  <option value="all">Todas categorias</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-neutral-800 text-white pl-3 pr-8 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c8e000] text-sm w-full md:w-auto"
                >
                  {SORT_OPTIONS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {QUICK_FILTERS.map((qf) => {
              const active = quickFilters.includes(qf.id);
              return (
                <button
                  key={qf.id}
                  onClick={() => toggleQuickFilter(qf.id)}
                  className={'px-3 py-1.5 rounded-full text-xs font-semibold transition-all ' + (active ? 'bg-[#c8e000] text-black' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700')}
                >
                  {qf.label}
                </button>
              );
            })}
            {(quickFilters.length > 0 || search || category !== 'all') && (
              <button
                onClick={() => { setQuickFilters([]); setSearch(''); setCategory('all'); }}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-300 hover:bg-red-500/20 flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Limpar filtros
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-neutral-800 pt-4">
            {TABS.map((t) => {
              const active = tab === t.id;
              const count = counts[t.id];
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={'px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ' + (active ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700')}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t.label}
                  <span className={'px-1.5 py-0.5 rounded text-[10px] ' + (active ? 'bg-black/15 text-black' : 'bg-neutral-700 text-neutral-400')}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-400">
            Mostrando <span className="text-white font-bold">{filteredGames.length}</span> de {initialGames.length} itens
          </p>
          {yesCount > 0 && (
            <p className="text-sm text-neutral-400">
              Subtotal: <span className="text-[#c8e000] font-bold">R$ {yesTotal.toFixed(2).replace('.', ',')}</span>
            </p>
          )}
        </div>

        {filteredGames.length === 0 ? (
          <div className="bg-neutral-900 rounded-2xl p-12 text-center ring-1 ring-neutral-800">
            <Search className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
            <p className="text-neutral-400">Nada encontrado com esses filtros. Tenta outra combinação!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredGames.map((g) => (
              <GameCard
                key={g.id}
                game={g}
                status={decisions[g.id]}
                onSetStatus={setStatus}
                onOpen={(g) => setModalGame(g)}
              />
            ))}
          </div>
        )}

        <footer className="text-center text-xs text-neutral-600 pt-8 pb-4">
          Cotação aplicada: 1 USD = R$ 5,30. Preços são estimativas, confere na loja oficial antes de comprar.
        </footer>
      </div>

      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-30 bg-[#c8e000] hover:bg-[#d4eb1f] text-black font-black rounded-full shadow-2xl shadow-[#c8e000]/30 px-5 py-4 flex items-center gap-2 transition-all hover:scale-105"
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="hidden sm:inline">Minha lista</span>
        <span className="bg-black text-[#c8e000] rounded-full px-2 py-0.5 text-xs min-w-[26px] text-center">{yesCount}</span>
      </button>

      <CartPanel
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        decisions={decisions}
        onSetStatus={setStatus}
        allGames={initialGames}
        onAskReset={() => setShowReset(true)}
        onCopy={handleCopy}
        copied={copied}
      />

      <DetailsModal
        game={modalGame}
        status={modalGame ? decisions[modalGame.id] : null}
        onSetStatus={setStatus}
        onClose={() => setModalGame(null)}
        onOpenSimilar={(g) => setModalGame(g)}
        allGames={initialGames}
      />

      <ResetConfirm
        open={showReset}
        onConfirm={handleConfirmReset}
        onCancel={() => setShowReset(false)}
      />
    </div>
  );
}
