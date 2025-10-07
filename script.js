document.addEventListener('DOMContentLoaded', function () {
    // Elementos principais
    const startContainer = document.querySelector('.start-container');
    const quizContainer = document.querySelector('.quiz-container');
    const startButton = document.querySelector('.btn-start');

    const progressElement = document.querySelector('.progress');
    const progressTextElement = document.querySelector('.progress-text span:first-child');
    const progressPercentElement = document.querySelector('.progress-text span:last-child');
    const questionElement = document.querySelector('.question');
    const optionsElements = document.querySelectorAll('.option');
    const prevButton = document.querySelector('.btn-prev');
    const nextButton = document.querySelector('.btn-next');
    const quizBody = document.querySelector('.quiz-body');
    const resultContainer = document.querySelector('.result-container');
    const resultScore = document.querySelector('.result-score');
    const resultMessage = document.querySelector('.result-message');
    const restartButton = document.querySelector('.btn-restart');

    // Perguntas do quiz
    const questions = [
        {
            question: "Qual destes é um princípio do ECA (Estatuto da Criança e do Adolescente)?",
            options: ["Prioridade absoluta", "Responsabilidade subsidiária", "Primazia do Estado", "Direito patrimonial"],
            correct: 0
        },
        {
            question: "De acordo com o ECA, criança é a pessoa até quantos anos de idade?",
            options: ["10 anos", "12 anos", "14 anos", "16 anos"],
            correct: 1
        },
        {
            question: "Qual órgão é responsável por zelar pelos direitos da criança e do adolescente?",
            options: ["Conselho Tutelar", "Ministério Público", "Defensoria Pública", "Todos os anteriores"],
            correct: 3
        },
        {
            question: "O ECA foi instituído pela lei:",
            options: ["Lei 8.069/90", "Lei 9.394/96", "Lei 8.080/90", "Lei 7.853/89"],
            correct: 0
        },
        {
            question: "Qual é a finalidade principal do ECA?",
            options: [
                "Proteção integral da criança e do adolescente",
                "Regulamentação do trabalho infantil",
                "Estabelecimento de punições severas",
                "Criação de abrigos para menores"
            ],
            correct: 0
        }
    ];

    let currentQuestion = 0;
    let userAnswers = new Array(questions.length).fill(null);

    // Função para carregar a pergunta
    function loadQuestion() {
        const question = questions[currentQuestion];
        questionElement.textContent = question.question;

        optionsElements.forEach((option, index) => {
            option.textContent = question.options[index];
            option.classList.remove('selected');
            if (userAnswers[currentQuestion] === index) {
                option.classList.add('selected');
            }
        });

        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressElement.style.width = `${progress}%`;
        progressTextElement.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
        progressPercentElement.textContent = `${Math.round(progress)}% completo`;

        prevButton.disabled = currentQuestion === 0;
        nextButton.innerHTML = currentQuestion === questions.length - 1
            ? 'Finalizar <i class="fas fa-check"></i>'
            : 'Próxima <i class="fas fa-arrow-right"></i>';
    }

    // Seleção de opções
    optionsElements.forEach((option, index) => {
        option.addEventListener('click', () => {
            optionsElements.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            userAnswers[currentQuestion] = index;
        });
    });

    // Botão próxima
    nextButton.addEventListener('click', () => {
        if (userAnswers[currentQuestion] === null) {
            alert('Selecione uma opção!');
            return;
        }

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            const score = calculateScore();
            showResults(score);
        }
    });

    // Botão anterior
    prevButton.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
        }
    });

    // Botão reiniciar
    restartButton.addEventListener('click', () => {
        currentQuestion = 0;
        userAnswers = new Array(questions.length).fill(null);
        loadQuestion();
        quizBody.style.display = 'block';
        resultContainer.style.display = 'none';
    });

    // Cálculo de score
    function calculateScore() {
        let correctAnswers = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === questions[index].correct) correctAnswers++;
        });
        return (correctAnswers / questions.length) * 100;
    }

    // Mostrar resultado
    function showResults(score) {
        quizBody.style.display = 'none';
        resultContainer.style.display = 'block';
        resultScore.textContent = `${Math.round(score)}%`;

        if (score >= 80) {
            resultMessage.textContent = 'Excelente! Você demonstrou um conhecimento excepcional sobre o ECA.';
        } else if (score >= 60) {
            resultMessage.textContent = 'Bom trabalho! Você demonstrou um bom conhecimento sobre o assunto.';
        } else if (score >= 40) {
            resultMessage.textContent = 'Você tem um conhecimento básico, mas pode melhorar.';
        } else {
            resultMessage.textContent = 'Que tal estudar um pouco mais e tentar novamente?';
        }
    }

    // Botão iniciar quiz
    startButton.addEventListener('click', () => {
        startContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuestion();
    });
});