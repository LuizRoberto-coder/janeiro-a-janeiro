        // Função para rolar os carrosseis
        function scrollCarousel(carouselId, direction) {
            const carousel = document.getElementById(carouselId);
            const scrollAmount = carousel.clientWidth * 0.8;
            carousel.scrollBy({
                left: scrollAmount * direction,
                behavior: 'smooth'
            });
        }

        // Efeito de scroll no header
        window.addEventListener('scroll', function () {
            const header = document.getElementById('mainHeader');
            if (window.scrollY > 50) {
                header.classList.add('header-scroll');
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('header-scroll');
                header.classList.remove('shadow-lg');
            }
        });

        // VIDEO MODAL LOGIC
        document.addEventListener('DOMContentLoaded', function () {
            const videoTriggers = document.querySelectorAll('.video-trigger');
            const videoModal = document.getElementById('videoModal');
            const videoContainer = document.getElementById('videoContainer');
            const videoTitle = document.getElementById('videoTitle');
            const videoDescription = document.getElementById('videoDescription');
            const closeModal = document.getElementById('closeModal');
            const featuredPlayButton = document.getElementById('featuredPlayButton');
            const heroPlayButton = document.getElementById('heroPlayButton'); // Novo botão

            // Função para abrir o modal de vídeo
            function openVideoModal(videoUrl, videoType, title, description) {
                videoContainer.innerHTML = ''; // Limpa o container
                videoContainer.classList.remove('vertical'); // Reset vertical class

                let videoElement;
                if (videoType === 'local') {
                    videoElement = document.createElement('video');
                    videoElement.controls = true;
                    videoElement.autoplay = true;
                    videoElement.className = 'w-full h-full object-contain';
                    videoElement.innerHTML = `<source src="${videoUrl}" type="video/mp4">Seu navegador não suporta vídeos HTML5.`;
                    
                    // Check video dimensions to apply vertical class if needed
                    videoElement.onloadedmetadata = function() {
                        if (videoElement.videoHeight > videoElement.videoWidth) {
                            videoContainer.classList.add('vertical');
                        }
                    };

                } else {
                    videoElement = document.createElement('iframe');
                    videoElement.className = 'w-full h-full object-contain';
                    videoElement.src = videoUrl;
                    videoElement.frameborder = '0';
                    videoElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                    videoElement.allowFullscreen = true;
                }
                videoContainer.appendChild(videoElement);

                videoTitle.textContent = title;
                videoDescription.textContent = description;
                videoModal.classList.remove('invisible', 'opacity-0');
                videoModal.classList.add('opacity-100');
                document.body.style.overflow = 'hidden';
            }

            // Event listeners para os triggers de vídeo existentes
            videoTriggers.forEach(trigger => {
                trigger.addEventListener('click', function () {
                    const videoUrl = this.getAttribute('data-video');
                    const videoType = this.getAttribute('data-video-type');
                    const title = this.getAttribute('data-title');
                    const description = this.getAttribute('data-description');
                    openVideoModal(videoUrl, videoType, title, description);
                });
            });

            // Event listener para o novo botão "Assistir Agora" da seção "Em Destaque"
            if (featuredPlayButton) {
                featuredPlayButton.addEventListener('click', function() {
                    const featuredVideoUrl = 'images/video_mcz.mp4';
                    const featuredVideoType = 'local';
                    const featuredTitle = 'Praia: Onde Tudo Floresceu';
                    const featuredDescription = 'Reviva o episódio em que Luiz e Carliane compartilharam momentos inesquecíveis à beira-mar, solidificando seu amor sob o sol.';
                    openVideoModal(featuredVideoUrl, featuredVideoType, featuredTitle, featuredDescription);
                });
            }

            // Event listener para o botão "Assistir" do Hero
            if (heroPlayButton) {
                heroPlayButton.addEventListener('click', function() {
                    const heroVideoUrl = 'images/video4.mp4'; // Vídeo especificado pelo usuário
                    const heroVideoType = 'local';
                    const heroTitle = 'Nosso Amor: A Série Completa';
                    const heroDescription = 'Assista à jornada completa de Luiz e Carliane, desde o primeiro encontro até os momentos mais recentes.';
                    openVideoModal(heroVideoUrl, heroVideoType, heroTitle, heroDescription);
                });
            }


            // Fechar modal
            closeModal.addEventListener('click', function () {
                const videoElement = videoContainer.querySelector('video');
                if (videoElement) {
                    videoElement.pause();
                }
                videoContainer.innerHTML = '';
                videoModal.classList.add('invisible', 'opacity-0');
                videoModal.classList.remove('opacity-100');
                document.body.style.overflow = 'auto';
            });

            // Fechar ao clicar fora
            videoModal.addEventListener('click', function (e) {
                if (e.target === videoModal) {
                    closeModal.click();
                }
            });
        });

        // Lógica do Card "Mais Informações"
        const infoButton = document.getElementById('infoButton');
        const infoCard = document.getElementById('infoCard');
        const closeInfoCardButton = document.getElementById('closeInfoCardButton');

        infoButton.addEventListener('click', () => {
            infoCard.classList.remove('hidden');
            infoCard.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });

        closeInfoCardButton.addEventListener('click', () => {
            infoCard.classList.add('hidden');
            infoCard.classList.remove('flex');
            document.body.style.overflow = 'auto';
        });

        infoCard.addEventListener('click', (event) => {
            if (event.target === infoCard) {
                infoCard.classList.add('hidden');
                infoCard.classList.remove('flex');
                document.body.style.overflow = 'auto';
            }
        });

        // Lógica do Modal de Detalhes dos Episódios
        const episodeModal = document.getElementById('episodeModal');
        const episodeModalTitle = document.getElementById('episodeModalTitle');
        const episodeModalDescription = document.getElementById('episodeModalDescription');
        const episodeList = document.getElementById('episodeList');
        const closeEpisodeModalButton = document.getElementById('closeEpisodeModalButton');
        const viewEpisodesButtons = document.querySelectorAll('.view-episodes-btn');

        const seasonsData = {
            '1': {
                title: 'Temporada 1: O Começo',
                description: 'A primeira temporada narra o início da jornada de Luiz e Carliane. Desde o primeiro encontro até os primeiros desafios, cada episódio é uma descoberta.',
                episodes: [
                    { title: 'Episódio 1: O Primeiro Olhar', date: '22/05/2020', synopsis: 'O dia em que tudo começou. Um encontro inesperado que mudaria suas vidas para sempre.' },
                    { title: 'Episódio 2: Primeiros Passos', date: '12/06/2020', synopsis: 'A fase de conhecer um ao outro, com conversas longas e risadas sinceras.' },
                    { title: 'Episódio 3: O Primeiro Beijo', date: '01/07/2020', synopsis: 'Um momento mágico que selou o início de um grande amor.' },
                    { title: 'Episódio 4: Descobertas', date: '15/08/2020', synopsis: 'Eles começam a explorar seus interesses em comum e a construir uma base sólida.' },
                    { title: 'Episódio 5: Pequenos Desafios', date: '05/09/2020', synopsis: 'Os primeiros obstáculos surgem, mas são superados com diálogo e carinho.' },
                    { title: 'Episódio 6: Conexão Profunda', date: '20/10/2020', synopsis: 'Aprofundando os laços e entendendo as nuances um do outro.' },
                    { title: 'Episódio 7: Surpresas', date: '10/11/2020', synopsis: 'Pequenas surpresas que tornam o dia a dia mais especial.' },
                    { title: 'Episódio 8: Primeiras Viagens', date: '01/12/2020', synopsis: 'Explorando novos lugares e criando memórias juntos.' },
                    { title: 'Episódio 9: Reflexões', date: '20/12/2020', synopsis: 'Um balanço do ano, com gratidão pelos momentos vividos.' },
                    { title: 'Episódio 10: Promessas', date: '31/12/2020', synopsis: 'O encerramento da temporada com promessas para o futuro.' },
                ]
            },
            '2': {
                title: 'Temporada 2: Crescendo Juntos',
                description: 'Na segunda temporada, Luiz e Carliane enfrentam desafios maiores, mas também celebram grandes conquistas. A união deles é posta à prova, mas o amor sempre prevalece.',
                episodes: [
                    { title: 'Episódio 1: A Decisão', date: '10/01/2021', synopsis: 'Um passo importante é dado, fortalecendo ainda mais o relacionamento.' },
                    { title: 'Episódio 2: Viagem Inesquecível', date: '20/03/2021', synopsis: 'Uma aventura juntos que criou memórias para toda a vida.' },
                    { title: 'Episódio 3: Apoio Mútuo', date: '05/05/2021', synopsis: 'Eles se apoiam em momentos difíceis, mostrando a força da parceria.' },
                    { title: 'Episódio 4: Celebrações', date: '15/07/2021', synopsis: 'Aniversários e datas especiais são comemorados com muita alegria.' },
                    { title: 'Episódio 5: Planos para o Futuro', date: '01/09/2021', synopsis: 'Começam a sonhar e planejar o futuro juntos, com muita esperança.' },
                    { title: 'Episódio 6: Superando Obstáculos', date: '10/10/2021', synopsis: 'Desafios inesperados que testam a resiliência do casal.' },
                    { title: 'Episódio 7: Novas Paixões', date: '25/11/2021', synopsis: 'Descobrindo novos hobbies e interesses que os unem ainda mais.' },
                    { title: 'Episódio 8: Momentos de Paz', date: '15/12/2021', synopsis: 'Desfrutando da tranquilidade e da companhia um do outro.' },
                    { title: 'Episódio 9: O Crescimento', date: '28/12/2021', synopsis: 'Reflexões sobre o amadurecimento do relacionamento.' },
                    { title: 'Episódio 10: A União', date: '31/12/2021', synopsis: 'O final da temporada, celebrando a força e a união do casal.' },
                ]
            },
            '3': {
                title: 'Temporada 3: Nosso Futuro',
                description: 'Novos capítulos se abrem, com mais sonhos, planos e a certeza de que o amor continua a crescer.',
                episodes: [
                    { title: 'Episódio 1: Novos Horizontes', date: '01/01/2022', synopsis: 'O início de um novo ano com novas metas e aspirações para o casal.' },
                    { title: 'Episódio 2: Conquistas Compartilhadas', date: '10/03/2022', synopsis: 'Eles celebram juntos as vitórias pessoais e profissionais de cada um.' },
                    { title: 'Episódio 3: A Força do Amor', date: '25/05/2022', synopsis: 'Superando desafios inesperados, o amor se mostra ainda mais resiliente.' },
                    { title: 'Episódio 4: Sonhos Realizados', date: '15/07/2022', synopsis: 'Um grande sonho se concretiza, fruto de muito esforço e dedicação mútua.' },
                    { title: 'Episódio 5: Eternamente Juntos', date: '31/12/2022', synopsis: 'O encerramento da temporada, com a promessa de um amor que durará para sempre.' },
                ]
            }
        };

        viewEpisodesButtons.forEach(button => {
            button.addEventListener('click', function () {
                const seasonNumber = this.getAttribute('data-season');
                const season = seasonsData[seasonNumber];

                if (season) {
                    episodeModalTitle.textContent = season.title;
                    episodeModalDescription.textContent = season.description;
                    episodeList.innerHTML = '';

                    season.episodes.forEach(episode => {
                        const episodeDiv = document.createElement('div');
                        episodeDiv.className = 'bg-gray-800 p-4 rounded-lg flex items-start space-x-4 hover:bg-gray-700 transition-colors cursor-pointer';
                        episodeDiv.innerHTML = `
                            <div class="flex-shrink-0 w-10 h-10 netflix-purple-gradient rounded-full flex items-center justify-center text-lg font-bold">
                                ${episode.title.split(':')[0].replace('Episódio ', '')}
                            </div>
                            <div class="flex-grow">
                                <h4 class="text-lg font-semibold">${episode.title}</h4>
                                <p class="text-sm text-gray-400">${episode.date}</p>
                                <p class="text-sm text-gray-300 mt-1">${episode.synopsis}</p>
                            </div>
                        `;
                        episodeList.appendChild(episodeDiv);
                    });

                    episodeModal.classList.remove('hidden');
                    episodeModal.classList.add('flex');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeEpisodeModalButton.addEventListener('click', () => {
            episodeModal.classList.add('hidden');
            episodeModal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        });

        episodeModal.addEventListener('click', (event) => {
            if (event.target === episodeModal) {
                closeEpisodeModalButton.click();
            }
        });


       // ...código anterior...
// QUIZ JAVASCRIPT
const quizData = [
    {
        question: "Em que cidade foi a nossa primeira viagem juntos?",
        answers: ["Natal", "Maceió", "Recife", "Fortaleza"],
        correct: 1
    },
    {
        question: "Qual comida não pode faltar quando estamos juntos?",
        answers: ["Pizza", "Rodízio", "Hambúrguer", "Churrasco"],
        correct: 1
    },
    {
        question: "Qual foi o mês do nosso primeiro beijo?",
        answers: ["Maio", "Junho", "Julho", "Agosto"],
        correct: 1
    },
    {
        question: "Qual é o apelido carinhoso que mais usamos?",
        answers: ["Tulipinha", "Amorzinho", "Vida", "Neném"],
        correct: 0
    },
    {
        question: "Onde gostamos de passear para conversar?",
        answers: ["Shopping", "Praça", "Orla", "Cinema"],
        correct: 2
    },
    {
        question: "Qual sobremesa marcou uma noite especial na viagem?",
        answers: ["Sorvete", "Milkshake de vaquinha", "Açaí", "Bolo de chocolate"],
        correct: 1
    },
    {
        question: "Qual foi o motivo da nossa última comemoração?",
        answers: ["Aniversário", "Formatura", "Viagem", "Promoção no trabalho"],
        correct: 1
    },
    {
        question: "Qual música representa nosso relacionamento?",
        answers: ["Trem Bala", "Te Amo", "De Janeiro a Janeiro", "Nosso Santo Bateu"],
        correct: 2
    },
    {
        question: "Qual dessas datas é especial para nós?",
        answers: ["22 de maio", "30 de maio", "15 de junho", "24 de dezembro"],
        correct: 1
    },
    {
        question: "O que mais gostamos de fazer juntos?",
        answers: [
            "Assistir séries",
            "Viajar e criar memórias",
            "Jogar videogame",
            "Fazer compras"
        ],
        correct: 1
    },

    {
        question: "Qual é o nosso lugar favorito para jantar?",
        answers: ["Rodízio", "Hamburgueria", "Pizzaria", "Restaurante Japonês"],
        correct: 0
    },
    {
        question: "Qual presente você mais gostou de ganhar de mim?",
        answers: ["Flores", "Cartinha", "Pelúcia", "Chocolate"],
        correct: 1
    },
    {
        question: "Qual foi o destino da nossa viagem dos sonhos?",
        answers: ["Maceió", "Gramado", "Rio de Janeiro", "Salvador"],
        correct: 0
    },

    {
        question: "Qual é a cor preferida do casal?",
        answers: ["Roxo", "Azul", "Vermelho", "Verde"],
        correct: 1
    },
    {
        question: "Qual o cantor ou banda marcou nosso relacionamento?",
        answers: ["Resenha do Arrocha", "Bruno Mars", "Jorge & Mateus", "Calcinha Preta"],
        correct: 1
    },
    {
        question: "Qual é o nosso maior sonho juntos?",
        answers: ["Viajar o mundo", "Construir uma família", "Comprar uma casa", "Ter um negócio próprio"],
        correct: 1
    },
    {
        question: "Qual apelido carinhoso você me deu?",
        answers: ["Tulipinha", "Mozão", "Amorzinho", "Vida"],
        correct: 0
    },
    {
        question: "Qual foi o prato mais diferente que já experimentamos juntos?",
        answers: ["Sushi", "Carne de sol", "Camarão", "Tapioca"],
        correct: 2
    }
];


        let currentQuestionIndex = 0;
        let score = 0;
        let timeLeft = 30;
        let timer;
        let selectedAnswer = null;

        const startScreen = document.getElementById('startScreen');
        const quizScreen = document.getElementById('quizScreen');
        const resultsScreen = document.getElementById('resultsScreen');
        const startBtn = document.getElementById('startBtn');
        const restartBtn = document.getElementById('restartBtn');
        const shareBtn = document.getElementById('shareBtn');

        const currentQuestionEl = document.getElementById('currentQuestion');
        const totalQuestionsEl = document.getElementById('totalQuestions');
        const currentScoreEl = document.getElementById('currentScore');
        const progressBar = document.getElementById('progressBar');
        const timerEl = document.getElementById('timer');
        const questionContainer = document.getElementById('questionContainer');
        const questionText = document.getElementById('questionText');
        const answersContainer = document.getElementById('answersContainer');

        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');
        const finalScore = document.getElementById('finalScore');
        const resultMessage = document.getElementById('resultMessage');

        const correctSound = document.getElementById('correctSound');
        const incorrectSound = document.getElementById('incorrectSound');

        totalQuestionsEl.textContent = quizData.length;

        startBtn.addEventListener('click', startQuiz);
        restartBtn.addEventListener('click', restartQuiz);
        shareBtn.addEventListener('click', shareResult);

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function startQuiz() {
            startScreen.classList.add('hidden');
            quizScreen.classList.remove('hidden');
            currentQuestionIndex = 0;
            score = 0;
            shuffleArray(quizData);
            showQuestion();
        }

        function showQuestion() {
            const question = quizData[currentQuestionIndex];

            currentQuestionEl.textContent = currentQuestionIndex + 1;
            currentScoreEl.textContent = score;
            progressBar.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;

            timeLeft = 30;
            startTimer();

            questionContainer.classList.remove('question-enter');
            questionContainer.classList.add('question-exit');
            setTimeout(() => {
                questionText.textContent = question.question;

                answersContainer.innerHTML = '';
                const shuffledAnswers = [...question.answers];
                shuffleArray(shuffledAnswers);

                shuffledAnswers.forEach((answer, index) => {
                    const button = document.createElement('button');
                    button.className = 'bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg text-left transition-all duration-300 hover:scale-105 border border-gray-600 flex items-center';
                    
                    const iconSpan = document.createElement('span');
                    iconSpan.className = 'mr-2 w-5 text-center';
                    button.appendChild(iconSpan);

                    const textSpan = document.createElement('span');
                    textSpan.textContent = answer;
                    button.appendChild(textSpan);

                    button.addEventListener('click', () => selectAnswer(answer, question.answers[question.correct]));
                    answersContainer.appendChild(button);
                });

                questionContainer.classList.remove('question-exit');
                questionContainer.classList.add('question-enter');
                selectedAnswer = null;
            }, 250);
        }

        function selectAnswer(selectedAnswerText, correctAnswerText) {
            if (selectedAnswer !== null) return;
            selectedAnswer = selectedAnswerText;
            clearInterval(timer);

            const buttons = answersContainer.querySelectorAll('button');
            const isCorrect = (selectedAnswerText === correctAnswerText);

            buttons.forEach(button => {
                const buttonText = button.querySelector('span:last-child').textContent;
                const iconSpan = button.querySelector('span:first-child');

                if (buttonText === correctAnswerText) {
                    button.classList.add('bg-green-600', 'border-green-400');
                    button.classList.remove('bg-gray-700', 'border-gray-600');
                    iconSpan.innerHTML = '<i class="fas fa-check-circle"></i>';
                } else if (buttonText === selectedAnswerText && !isCorrect) {
                    button.classList.add('bg-red-600', 'border-red-400');
                    button.classList.remove('bg-gray-700', 'border-gray-600');
                    iconSpan.innerHTML = '<i class="fas fa-times-circle"></i>';
                } else {
                    button.classList.add('opacity-50');
                }
                button.disabled = true;
            });

            if (isCorrect) {
                score += 10;
                currentScoreEl.textContent = score;
                correctSound.play();
            } else {
                incorrectSound.play();
            }

            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizData.length) {
                    showQuestion();
                } else {
                    showResults();
                }
            }, 2000);
        }

        function startTimer() {
            clearInterval(timer);
            timer = setInterval(() => {
                timeLeft--;
                timerEl.textContent = timeLeft;
                if (timeLeft <= 10) {
                    timerEl.classList.add('text-red-500');
                } else {
                    timerEl.classList.remove('text-red-500');
                }
                if (timeLeft <= 0) {
                    selectAnswer(-1);
                }
            }, 1000);
        }

        function showResults() {
            quizScreen.classList.add('hidden');
            resultsScreen.classList.remove('hidden');
            finalScore.textContent = score;

            if (score === 100) {
                resultIcon.textContent = '💖';
                resultTitle.textContent = 'UAU! Você é a alma gêmea perfeita!';
                resultTitle.className = 'text-3xl md:text-4xl font-bold mb-4 text-pink-400';
                resultMessage.textContent = 'Sua conexão com Luiz e Carliane é lendária! Parabéns, você sabe TUDO!';
            } else if (score >= 80) {
                resultIcon.textContent = '🏆';
                resultTitle.textContent = 'Especialista em Romance!';
                resultTitle.className = 'text-3xl md:text-4xl font-bold mb-4 text-yellow-400';
                resultMessage.textContent = 'Você conhece muito bem a série Luiz e Carliane! Verdadeiro fã!';
            } else if (score >= 50) {
                resultIcon.textContent = '❤️';
                resultTitle.textContent = 'Romântico de Coração!';
                resultTitle.className = 'text-3xl md:text-4xl font-bold mb-4 text-red-400';
                resultMessage.textContent = 'Você entende bem sobre amor e romance. Ótimo resultado!';
            } else {
                resultIcon.textContent = '💔';
                resultTitle.textContent = 'Precisa de Mais Romance!';
                resultTitle.className = 'text-3xl md:text-4xl font-bold mb-4 text-gray-400';
                resultMessage.textContent = 'Hora de maratonar Luiz e Carliane para entender melhor o amor! Não desista!';
            }
        }

        function restartQuiz() {
            resultsScreen.classList.add('hidden');
            startScreen.classList.remove('hidden');
            currentQuestionIndex = 0;
            score = 0;
            selectedAnswer = null;
            clearInterval(timer);
        }

        function shareResult() {
            const text = `Acabei de fazer o Quiz da série Luiz e Carliane na Amorflix e consegui ${score} de 100 pontos! 🎬❤️`;
            if (navigator.share) {
                navigator.share({
                    title: 'Quiz Luiz e Carliane - Amorflix',
                    text: text,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(text).then(() => {
                    alert('Resultado copiado para a área de transferência!');
                });
            }
        }

        window.addEventListener('load', function () {
            setTimeout(function () {
                document.body.classList.add('loaded');
            }, 500);
        });


        // JOGO DA MEMÓRIA JAVASCRIPT
        const memoryGameContainer = document.getElementById('memoryGame');
        const memoryAttemptsEl = document.getElementById('memoryAttempts');
        const memoryRoundEl = document.getElementById('memoryRound');
        const resetMemoryGameBtn = document.getElementById('resetMemoryGameBtn');

        const allMemoryImages = [
      
    [ // Rodada 1
        'images/imagem13.jpg',
        'images/imagem2.jpg',
        'images/imagem3.jpg',
        'images/imagem4.jpg'
    ],
    [ // Rodada 2
        'images/imagem5.jpg',
        'images/imagem6.jpg',
        'images/imagem7.jpg',
        'images/imagem15.jpg'
    ],
    [ // Rodada 3
        'images/imagem16.jpg',
        'images/imagem10.jpg',
        'images/imagem11.jpg',
        'images/imagem12.jpg'
    ]
];

        let currentRound = 0;
        const totalRounds = allMemoryImages.length;
        let cards = [];
        let flippedCards = [];
        let matchedPairs = 0;
        let attempts = 0;
        let lockBoard = false;

        function initializeMemoryGame(round = 0) {
            currentRound = round;
            if (currentRound >= totalRounds) {
                alert('Parabéns! Você completou todas as rodadas do Jogo da Memória! 🎉');
                currentRound = 0; // Reset for next play
            }

            memoryRoundEl.textContent = currentRound + 1;
            
            const roundImages = allMemoryImages[currentRound];
            cards = [...roundImages, ...roundImages];
            shuffleArray(cards);

            memoryGameContainer.innerHTML = '';
            flippedCards = [];
            matchedPairs = 0;
            attempts = 0;
            memoryAttemptsEl.textContent = attempts;
            lockBoard = false;

            renderMemoryCards();
        }

        function renderMemoryCards() {
            cards.forEach((image, index) => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('memory-card', 'aspect-square');
                cardElement.dataset.image = image;
                cardElement.dataset.index = index;

                cardElement.innerHTML = `
                    <div class="memory-card-face memory-card-back" style="background-image: url('images/verso.jpg');"></div>
                    <div class="memory-card-face memory-card-front" style="background-image: url('${image}');"></div>
                `;
                cardElement.addEventListener('click', flipCard);
                memoryGameContainer.appendChild(cardElement);
            });
        }

        function flipCard() {
            if (lockBoard) return;
            if (this === flippedCards[0]) return;

            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                attempts++;
                memoryAttemptsEl.textContent = attempts;
                lockBoard = true;
                checkForMatch();
            }
        }

        function checkForMatch() {
            const [card1, card2] = flippedCards;
            const isMatch = card1.dataset.image === card2.dataset.image;

            if (isMatch) {
                disableCards();
                matchedPairs++;
                if (matchedPairs === allMemoryImages[currentRound].length) {
                    setTimeout(() => {
                        alert(`Rodada ${currentRound + 1} completa! Próxima rodada...`);
                        initializeMemoryGame(currentRound + 1);
                    }, 1000);
                }
            } else {
                unflipCards();
            }
        }

        function disableCards() {
            flippedCards.forEach(card => {
                card.removeEventListener('click', flipCard);
                card.classList.add('matched');
            });
            resetFlippedCards();
        }

        function unflipCards() {
            setTimeout(() => {
                flippedCards.forEach(card => card.classList.remove('flipped'));
                resetFlippedCards();
            }, 1000);
        }

        function resetFlippedCards() {
            flippedCards = [];
            lockBoard = false;
        }

        resetMemoryGameBtn.addEventListener('click', () => initializeMemoryGame(0));

        document.addEventListener('DOMContentLoaded', () => initializeMemoryGame(0));

