// =========================
// PREGUNTAS
// =========================

const preguntas = [
    {
        pregunta: "¿Cuál es la capital de Colombia?",
        respuestas: [
            "Medellín",
            "Bogotá",
            "Cali",
            "Barranquilla"
        ],
        correcta: "Bogotá"
    },

    {
        pregunta: "¿Cuál es el planeta más grande del Sistema Solar?",
        respuestas: [
            "Saturno",
            "Marte",
            "Júpiter",
            "Venus"
        ],
        correcta: "Júpiter"
    },

    {
        pregunta: "¿Qué lenguaje se utiliza principalmente para dar estructura a una página web?",
        respuestas: [
            "CSS",
            "JavaScript",
            "HTML",
            "Python"
        ],
        correcta: "HTML"
    },

    {
        pregunta: "¿Cuánto es 12 × 8?",
        respuestas: [
            "86",
            "96",
            "108",
            "92"
        ],
        correcta: "96"
    },

    {
        pregunta: "¿Cuál es el resultado de la fotosíntesis que los seres humanos necesitan para respirar?",
        respuestas: [
            "Oxígeno",
            "Nitrógeno",
            "Dióxido de carbono",
            "Hidrógeno"
        ],
        correcta: "Oxígeno"
    },

    {
        pregunta: "¿Quién escribió Romeo y Julieta?",
        respuestas: [
            "Miguel de Cervantes",
            "William Shakespeare",
            "Gabriel García Márquez",
            "Pablo Neruda"
        ],
        correcta: "William Shakespeare"
    },

    {
        pregunta: "¿Qué significa CPU?",
        respuestas: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Computer Processing User"
        ],
        correcta: "Central Processing Unit"
    },

    {
        pregunta: "¿Cuál es el océano más grande del mundo?",
        respuestas: [
            "Atlántico",
            "Índico",
            "Ártico",
            "Pacífico"
        ],
        correcta: "Pacífico"
    },

    {
        pregunta: "¿Cuál de estos es un lenguaje de programación?",
        respuestas: [
            "HTML",
            "CSS",
            "JavaScript",
            "Photoshop"
        ],
        correcta: "JavaScript"
    },

    {
        pregunta: "¿Cuántos lados tiene un hexágono?",
        respuestas: [
            "5",
            "6",
            "7",
            "8"
        ],
        correcta: "6"
    }
];


// =========================
// ELEMENTOS HTML
// =========================

const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const messageElement = document.getElementById("message");

const nextButton = document.getElementById("next-btn");

const resultElement = document.getElementById("result");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");


// =========================
// VARIABLES DEL JUEGO
// =========================

let preguntaActual = 0;
let puntuacion = 0;
let respondida = false;


// =========================
// INICIAR JUEGO
// =========================

function iniciarJuego() {

    preguntaActual = 0;
    puntuacion = 0;
    respondida = false;

    scoreElement.textContent = puntuacion;

    resultElement.style.display = "none";

    questionElement.parentElement.style.display = "block";
    answersElement.style.display = "grid";

    messageElement.textContent = "";

    nextButton.style.display = "none";

    mostrarPregunta();
}


// =========================
// MOSTRAR PREGUNTA
// =========================

function mostrarPregunta() {

    respondida = false;

    const pregunta = preguntas[preguntaActual];

    questionNumber.textContent =
        `${preguntaActual + 1}/${preguntas.length}`;

    questionElement.textContent = pregunta.pregunta;

    answersElement.innerHTML = "";

    messageElement.textContent = "";

    nextButton.style.display = "none";


    // Crear botones de respuesta

    pregunta.respuestas.forEach(respuesta => {

        const boton = document.createElement("button");

        boton.textContent = respuesta;

        boton.classList.add("answer-btn");

        boton.addEventListener("click", () => {

            comprobarRespuesta(
                respuesta,
                boton
            );

        });

        answersElement.appendChild(boton);
    });
}


// =========================
// COMPROBAR RESPUESTA
// =========================

function comprobarRespuesta(respuesta, botonSeleccionado) {

    if (respondida) return;

    respondida = true;

    const pregunta = preguntas[preguntaActual];

    const botones =
        document.querySelectorAll(".answer-btn");


    // Desactivar todos los botones

    botones.forEach(boton => {
        boton.disabled = true;
    });


    // Comprobar respuesta

    if (respuesta === pregunta.correcta) {

        puntuacion++;

        scoreElement.textContent = puntuacion;

        botonSeleccionado.classList.add("correct");

        messageElement.textContent =
            "✅ ¡Respuesta correcta!";

    } else {

        botonSeleccionado.classList.add("incorrect");

        messageElement.textContent =
            `❌ Incorrecto. La respuesta correcta era: ${pregunta.correcta}`;


        // Mostrar cuál era la correcta

        botones.forEach(boton => {

            if (boton.textContent === pregunta.correcta) {

                boton.classList.add("correct");

            }

        });
    }


    // Mostrar botón siguiente

    nextButton.style.display = "inline-block";
}


// =========================
// SIGUIENTE PREGUNTA
// =========================

nextButton.addEventListener("click", () => {

    preguntaActual++;

    if (preguntaActual < preguntas.length) {

        mostrarPregunta();

    } else {

        terminarJuego();

    }

});


// =========================
// TERMINAR JUEGO
// =========================

function terminarJuego() {

    questionElement.parentElement.style.display = "none";

    answersElement.style.display = "none";

    nextButton.style.display = "none";

    messageElement.textContent = "";

    finalScoreElement.textContent =
        `${puntuacion}/${preguntas.length}`;

    resultElement.style.display = "block";
}


// =========================
// REINICIAR
// =========================

restartButton.addEventListener("click", () => {

    iniciarJuego();

});


// =========================
// COMENZAR
// =========================

iniciarJuego();
