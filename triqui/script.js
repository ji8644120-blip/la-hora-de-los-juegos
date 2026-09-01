// ==============================
// CONFIGURACIÓN DEL JUEGO
// ==============================

const cells = document.querySelectorAll(".cell");
const turnMessage = document.getElementById("turnMessage");
const resultMessage = document.getElementById("resultMessage");
const restartButton = document.getElementById("restartButton");

const playerNameX = document.getElementById("playerNameX");

const playerX = document.getElementById("playerX");
const playerO = document.getElementById("playerO");


// ==============================
// NOMBRE DEL JUGADOR
// ==============================

const savedName = localStorage.getItem("playerName");

if (savedName) {
    playerNameX.textContent = savedName;
}


// ==============================
// VARIABLES
// ==============================

let board = ["", "", "", "", "", "", "", ""];

let gameActive = true;

let currentPlayer = "X";


// ==============================
// COMBINACIONES GANADORAS
// ==============================

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


// ==============================
// EVENTOS
// ==============================

cells.forEach(cell => {

    cell.addEventListener("click", () => {

        const index = cell.dataset.index;

        if (board[index] !== "" || !gameActive) {
            return;
        }

        // Jugada del jugador
        board[index] = "X";
        cell.textContent = "❌";
        cell.disabled = true;

        if (checkWinner("X")) {
            endGame("win", "🎉 ¡Ganaste!");
            return;
        }

        if (checkDraw()) {
            endGame("draw", "🤝 ¡Empate!");
            return;
        }

        // Turno de la computadora
        currentPlayer = "O";

        updateTurn();

        setTimeout(computerMove, 500);
    });

});


// ==============================
// JUGADA DE LA COMPUTADORA
// ==============================

function computerMove() {

    if (!gameActive) {
        return;
    }

    const availableCells = [];

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {
            availableCells.push(i);
        }

    }

    if (availableCells.length === 0) {
        return;
    }


    // La computadora elige una casilla disponible
    const randomIndex =
        Math.floor(Math.random() * availableCells.length);

    const chosenCell =
        availableCells[randomIndex];


    board[chosenCell] = "O";

    cells[chosenCell].textContent = "⭕";
    cells[chosenCell].disabled = true;


    if (checkWinner("O")) {
        endGame("lose", "😔 ¡La computadora ganó!");
        return;
    }

    if (checkDraw()) {
        endGame("draw", "🤝 ¡Empate!");
        return;
    }


    // Regresa el turno al jugador
    currentPlayer = "X";

    updateTurn();
}


// ==============================
// COMPROBAR GANADOR
// ==============================

function checkWinner(symbol) {

    for (const combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            board[a] === symbol &&
            board[b] === symbol &&
            board[c] === symbol
        ) {

            // Resaltar las casillas ganadoras
            cells[a].style.borderColor = "#16a34a";
            cells[b].style.borderColor = "#16a34a";
            cells[c].style.borderColor = "#16a34a";

            return true;
        }
    }

    return false;
}


// ==============================
// COMPROBAR EMPATE
// ==============================

function checkDraw() {

    return board.every(cell => cell !== "");

}


// ==============================
// FINALIZAR PARTIDA
// ==============================

function endGame(type, message) {

    gameActive = false;

    resultMessage.textContent = message;

    resultMessage.className = "result-message";

    if (type === "win") {
        resultMessage.classList.add("win");
    }

    if (type === "lose") {
        resultMessage.classList.add("lose");
    }

    turnMessage.textContent = "🏁 Partida terminada";

    cells.forEach(cell => {
        cell.disabled = true;
    });

}


// ==============================
// ACTUALIZAR TURNO
// ==============================

function updateTurn() {

    if (currentPlayer === "X") {

        turnMessage.textContent = "Turno de ❌";

        playerX.classList.add("active");
        playerO.classList.remove("active");

    } else {

        turnMessage.textContent = "Turno de ⭕";

        playerO.classList.add("active");
        playerX.classList.remove("active");

    }

}


// ==============================
// REINICIAR PARTIDA
// ==============================

restartButton.addEventListener("click", restartGame);


function restartGame() {

    board = ["", "", "", "", "", "", "", ""];

    gameActive = true;

    currentPlayer = "X";

    resultMessage.textContent = "";

    resultMessage.className = "result-message";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.disabled = false;

        cell.style.borderColor = "";

    });

    updateTurn();

}
