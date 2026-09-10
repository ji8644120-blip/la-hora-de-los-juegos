const memoryBoard = document.getElementById("memoryBoard");

const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const pairsDisplay = document.getElementById("pairs");

const winMessage = document.getElementById("winMessage");

const finalMoves = document.getElementById("finalMoves");
const finalTime = document.getElementById("finalTime");

const playAgainButton = document.getElementById("playAgainButton");


// ========================================
// TODAS LAS POSIBLES FIGURAS
// ========================================

const symbols = [

    // COMIDA
    "🍕",
    "🍔",
    "🍟",
    "🌮",
    "🍩",
    "🍦",
    "🍎",
    "🍉",
    "🍓",
    "🍒",

    // DEPORTES
    "⚽",
    "🏀",
    "🏆",
    "🎯",
    "🏈",

    // TECNOLOGÍA Y MÚSICA
    "🎮",
    "🎸",
    "🎧",
    "📱",
    "💻",

    // ANIMALES
    "🐶",
    "🐱",
    "🦊",
    "🐼",
    "🐸",
    "🐵",

    // VEHÍCULOS
    "🚗",
    "🚀",
    "✈️",
    "🏎️"
];


let cards = [];

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let moves = 0;
let pairs = 0;

let seconds = 0;
let timer = null;

let gameStarted = false;


// ========================================
// INICIAR / REINICIAR JUEGO
// ========================================

function startGame() {

    moves = 0;
    pairs = 0;
    seconds = 0;

    firstCard = null;
    secondCard = null;

    lockBoard = false;
    gameStarted = false;

    clearInterval(timer);

    movesDisplay.textContent = "0";
    pairsDisplay.textContent = "0 / 6";
    timerDisplay.textContent = "00:00";

    winMessage.style.display = "none";

    memoryBoard.innerHTML = "";


    // ========================================
    // ELEGIR 6 SÍMBOLOS ALEATORIOS
    // DE TODA LA COLECCIÓN
    // ========================================

    const selectedSymbols = [...symbols]
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);


    // Crear las 6 parejas

    cards = [
        ...selectedSymbols,
        ...selectedSymbols
    ];


    // Mezclar las 12 cartas

    cards.sort(() => Math.random() - 0.5);


    // ========================================
    // CREAR LAS CARTAS
    // ========================================

    cards.forEach((symbol) => {

        const card = document.createElement("div");

        card.classList.add("memory-card");

        card.dataset.symbol = symbol;

        card.innerHTML = `
            <div class="card-inner">

                <div class="card-front">
                    🃏
                </div>

                <div class="card-back">
                    ${symbol}
                </div>

            </div>
        `;

        card.addEventListener("click", flipCard);

        memoryBoard.appendChild(card);

    });

}


// ========================================
// VOLTEAR CARTA
// ========================================

function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    if (this.classList.contains("matched")) return;


    // Iniciar el cronómetro con la primera carta

    if (!gameStarted) {

        gameStarted = true;

        timer = setInterval(updateTimer, 1000);

    }


    this.classList.add("flipped");


    // Primera carta

    if (!firstCard) {

        firstCard = this;

        return;

    }


    // Segunda carta

    secondCard = this;

    moves++;

    movesDisplay.textContent = moves;


    checkMatch();

}


// ========================================
// COMPROBAR SI SON PAREJA
// ========================================

function checkMatch() {

    const isMatch =
        firstCard.dataset.symbol === secondCard.dataset.symbol;


    if (isMatch) {

        disableCards();

    } else {

        unflipCards();

    }

}


// ========================================
// CARTAS CORRECTAS
// ========================================

function disableCards() {

    firstCard.classList.add("matched");

    secondCard.classList.add("matched");


    pairs++;

    pairsDisplay.textContent = `${pairs} / 6`;


    resetBoard();


    // Si encontró las 6 parejas

    if (pairs === 6) {

        endGame();

    }

}


// ========================================
// CARTAS INCORRECTAS
// ========================================

function unflipCards() {

    lockBoard = true;


    setTimeout(() => {

        firstCard.classList.remove("flipped");

        secondCard.classList.remove("flipped");

        resetBoard();

    }, 900);

}


// ========================================
// REINICIAR SELECCIÓN
// ========================================

function resetBoard() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}


// ========================================
// CRONÓMETRO
// ========================================

function updateTimer() {

    seconds++;


    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;


    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

}


// ========================================
// TERMINAR JUEGO
// ========================================

function endGame() {

    clearInterval(timer);


    finalMoves.textContent = moves;

    finalTime.textContent = timerDisplay.textContent;


    setTimeout(() => {

        winMessage.style.display = "block";


        winMessage.scrollIntoView({
            behavior: "smooth"
        });

    }, 500);

}


// ========================================
// BOTÓN JUGAR DE NUEVO
// ========================================

playAgainButton.addEventListener("click", startGame);


// ========================================
// INICIAR JUEGO AL CARGAR
// ========================================

startGame();
