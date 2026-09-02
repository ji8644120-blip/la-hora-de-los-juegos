// =========================
// ELEMENTOS HTML
// =========================

const choiceButtons = document.querySelectorAll(".choice-btn");

const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");

const playerChoiceElement = document.getElementById("player-choice");
const computerChoiceElement = document.getElementById("computer-choice");

const resultElement = document.getElementById("result");

const restartButton = document.getElementById("restart-btn");


// =========================
// VARIABLES
// =========================

let playerScore = 0;
let computerScore = 0;


// =========================
// OPCIONES
// =========================

const opciones = [
    "piedra",
    "papel",
    "tijera"
];


// =========================
// EMOJIS
// =========================

const emojis = {
    piedra: "🗿",
    papel: "📄",
    tijera: "✂️"
};


// =========================
// ELECCIÓN DE LA COMPUTADORA
// =========================

function eleccionComputadora() {

    const numeroAleatorio =
        Math.floor(Math.random() * opciones.length);

    return opciones[numeroAleatorio];
}


// =========================
// DETERMINAR GANADOR
// =========================

function determinarGanador(jugador, computadora) {

    if (jugador === computadora) {
        return "empate";
    }

    if (
        (jugador === "piedra" && computadora === "tijera") ||
        (jugador === "papel" && computadora === "piedra") ||
        (jugador === "tijera" && computadora === "papel")
    ) {
        return "jugador";
    }

    return "computadora";
}


// =========================
// JUGAR
// =========================

function jugar(eleccionJugador) {

    const eleccionPC = eleccionComputadora();

    const ganador =
        determinarGanador(
            eleccionJugador,
            eleccionPC
        );


    // Mostrar elecciones

    playerChoiceElement.textContent =
        `Tú: ${emojis[eleccionJugador]} ${capitalizar(eleccionJugador)}`;

    computerChoiceElement.textContent =
        `Computadora: ${emojis[eleccionPC]} ${capitalizar(eleccionPC)}`;


    // Determinar resultado

    if (ganador === "jugador") {

        playerScore++;

        playerScoreElement.textContent =
            playerScore;

        resultElement.textContent =
            "🏆 ¡Ganaste!";

    } else if (ganador === "computadora") {

        computerScore++;

        computerScoreElement.textContent =
            computerScore;

        resultElement.textContent =
            "💀 ¡Ganó la computadora!";

    } else {

        resultElement.textContent =
            "🤝 ¡Empate!";
    }
}


// =========================
// CAPITALIZAR TEXTO
// =========================

function capitalizar(texto) {

    return texto.charAt(0).toUpperCase() +
           texto.slice(1);
}


// =========================
// BOTONES
// =========================

choiceButtons.forEach(boton => {

    boton.addEventListener("click", () => {

        const eleccion =
            boton.dataset.choice;

        jugar(eleccion);

    });

});


// =========================
// REINICIAR
// =========================

restartButton.addEventListener("click", () => {

    playerScore = 0;

    computerScore = 0;

    playerScoreElement.textContent = "0";

    computerScoreElement.textContent = "0";

    playerChoiceElement.textContent =
        "Tú: -";

    computerChoiceElement.textContent =
        "Computadora: -";

    resultElement.textContent =
        "¡Elige una opción!";
});
