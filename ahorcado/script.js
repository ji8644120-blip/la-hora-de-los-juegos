// =========================
// PALABRAS DEL JUEGO
// =========================

const palabras = [
    "COMPUTADORA",
    "PROGRAMACION",
    "VIDEOJUEGO",
    "JAVASCRIPT",
    "INTERNET",
    "TECLADO",
    "MONITOR",
    "CELULAR",
    "MUSICA",
    "PELICULA",
    "ESCUELA",
    "BARRANQUILLA",
    "FUTBOL",
    "GUITARRA",
    "AMISTAD"
];


// =========================
// ELEMENTOS DEL HTML
// =========================

const wordElement = document.getElementById("word");
const lettersElement = document.getElementById("letters");
const attemptsElement = document.getElementById("attempts");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart-btn");


// Partes del muñeco
const hangmanParts = [
    document.querySelector(".head"),
    document.querySelector(".body"),
    document.querySelector(".left-arm"),
    document.querySelector(".right-arm"),
    document.querySelector(".left-leg"),
    document.querySelector(".right-leg")
];


// =========================
// VARIABLES DEL JUEGO
// =========================

let palabraActual = "";
let letrasAdivinadas = [];
let intentos = 6;
let juegoTerminado = false;


// =========================
// INICIAR JUEGO
// =========================

function iniciarJuego() {

    palabraActual =
        palabras[Math.floor(Math.random() * palabras.length)];

    letrasAdivinadas = [];

    intentos = 6;

    juegoTerminado = false;

    messageElement.textContent = "";

    attemptsElement.textContent = intentos;

    // Ocultar todas las partes del muñeco
    hangmanParts.forEach(parte => {
        parte.style.display = "none";
    });

    mostrarPalabra();

    crearBotonesLetras();
}


// =========================
// MOSTRAR PALABRA
// =========================

function mostrarPalabra() {

    wordElement.innerHTML = "";

    for (const letra of palabraActual) {

        const letraElemento = document.createElement("span");

        if (letrasAdivinadas.includes(letra)) {
            letraElemento.textContent = letra;
        } else {
            letraElemento.textContent = "_";
        }

        wordElement.appendChild(letraElemento);
    }
}


// =========================
// CREAR BOTONES
// =========================

function crearBotonesLetras() {

    lettersElement.innerHTML = "";

    const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

    for (const letra of letras) {

        const boton = document.createElement("button");

        boton.textContent = letra;

        boton.classList.add("letter-btn");

        boton.addEventListener("click", () => {
            comprobarLetra(letra, boton);
        });

        lettersElement.appendChild(boton);
    }
}


// =========================
// COMPROBAR LETRA
// =========================

function comprobarLetra(letra, boton = null) {

    if (juegoTerminado) {
        return;
    }

    if (letrasAdivinadas.includes(letra)) {
        return;
    }

    letrasAdivinadas.push(letra);

    // Desactivar botón
    if (boton) {
        boton.disabled = true;
    }

    // ¿La letra está en la palabra?
    if (palabraActual.includes(letra)) {

        mostrarPalabra();

        comprobarVictoria();

    } else {

        intentos--;

        attemptsElement.textContent = intentos;

        dibujarParte();

        if (intentos === 0) {
            perderJuego();
        }
    }
}


// =========================
// DIBUJAR MUÑECO
// =========================

function dibujarParte() {

    const partesMostradas = 6 - intentos;

    if (hangmanParts[partesMostradas - 1]) {

        hangmanParts[partesMostradas - 1].style.display = "block";
    }
}


// =========================
// COMPROBAR VICTORIA
// =========================

function comprobarVictoria() {

    const gano = [...palabraActual].every(letra =>
        letrasAdivinadas.includes(letra)
    );

    if (gano) {

        juegoTerminado = true;

        messageElement.textContent =
            "🏆 ¡GANASTE!";

        desactivarBotones();
    }
}


// =========================
// PERDER
// =========================

function perderJuego() {

    juegoTerminado = true;

    // Mostrar la palabra completa
    wordElement.innerHTML = "";

    for (const letra of palabraActual) {

        const letraElemento = document.createElement("span");

        letraElemento.textContent = letra;

        wordElement.appendChild(letraElemento);
    }

    messageElement.textContent =
        `💀 ¡PERDISTE! La palabra era: ${palabraActual}`;

    desactivarBotones();
}


// =========================
// DESACTIVAR BOTONES
// =========================

function desactivarBotones() {

    const botones = document.querySelectorAll(".letter-btn");

    botones.forEach(boton => {
        boton.disabled = true;
    });
}


// =========================
// BOTÓN NUEVA PARTIDA
// =========================

restartButton.addEventListener("click", () => {

    iniciarJuego();

});


// =========================
// TECLADO
// =========================

document.addEventListener("keydown", (evento) => {

    if (juegoTerminado) {
        return;
    }

    let letra = evento.key.toUpperCase();

    // Permitir Ñ
    if (letra === "Ñ") {
        comprobarLetra(letra);
        actualizarBotonTeclado(letra);
        return;
    }

    // Solo aceptar letras
    if (!/^[A-Z]$/.test(letra)) {
        return;
    }

    comprobarLetra(letra);

    actualizarBotonTeclado(letra);
});


// =========================
// ACTUALIZAR BOTÓN
// =========================

function actualizarBotonTeclado(letra) {

    const botones = document.querySelectorAll(".letter-btn");

    botones.forEach(boton => {

        if (boton.textContent === letra) {
            boton.disabled = true;
        }

    });
}


// =========================
// INICIAR AUTOMÁTICAMENTE
// =========================

iniciarJuego();
