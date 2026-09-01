/* ==========================================
   VARIABLES PRINCIPALES
   ========================================== */

// Nombre del jugador que escribió al entrar
let playerName = "";

// Indica si hay una sesión iniciada
let isLoggedIn = false;

// Correo del usuario que inició sesión
let loggedEmail = "";


/* ==========================================
   ELEMENTOS DEL HTML
   ========================================== */

const welcomeScreen = document.getElementById("welcome-screen");
const app = document.getElementById("app");

const playerNameInput = document.getElementById("player-name");
const enterButton = document.getElementById("enter-button");
const nameError = document.getElementById("name-error");

const displayPlayerName = document.getElementById("display-player-name");

const loginModal = document.getElementById("login-modal");
const loginNavButton = document.getElementById("login-nav-button");

const loggedUser = document.getElementById("logged-user");
const loggedUserName = document.getElementById("logged-user-name");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginMessage = document.getElementById("login-message");


/* ==========================================
   ENTRAR A LA PÁGINA
   ========================================== */

function enterPage() {

    const name = playerNameInput.value.trim();

    // Comprobar que haya escrito algo
    if (name === "") {

        nameError.textContent =
            "Por favor, escribe tu nombre para continuar.";

        playerNameInput.focus();

        return;
    }

    // Guardar el nombre
    playerName = name;

    // Mostrar el nombre en el menú
    displayPlayerName.textContent = playerName;

    // Ocultar pantalla de bienvenida
    welcomeScreen.classList.remove("active");
    welcomeScreen.classList.add("hidden");

    // Mostrar aplicación
    app.classList.remove("hidden");

    // Asegurarnos de comenzar en el menú principal
    showSection("home");
}


/* ==========================================
   BOTÓN ENTRAR
   ========================================== */

enterButton.addEventListener("click", enterPage);


/* ==========================================
   ENTER PARA ESCRIBIR EL NOMBRE
   ========================================== */

playerNameInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        enterPage();
    }

});


/* ==========================================
   CAMBIAR DE SECCIÓN
   ========================================== */

function showSection(sectionId) {

    // Obtener todas las secciones
    const sections = document.querySelectorAll(".section");

    // Ocultar todas
    sections.forEach(function(section) {

        section.classList.remove("active-section");

    });


    // Buscar la sección seleccionada
    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {

        selectedSection.classList.add("active-section");

    }


    // Llevar la página hacia arriba
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==========================================
   ABRIR LOGIN
   ========================================== */

function openLogin() {

    // Limpiar mensaje anterior
    loginMessage.textContent = "";

    // Mostrar modal
    loginModal.classList.remove("hidden");

    // Colocar el cursor en el correo
    setTimeout(function() {

        emailInput.focus();

    }, 100);

}


/* ==========================================
   CERRAR LOGIN
   ========================================== */

function closeLogin() {

    loginModal.classList.add("hidden");

    // Limpiar campos
    emailInput.value = "";
    passwordInput.value = "";

    // Limpiar mensaje
    loginMessage.textContent = "";

}


/* ==========================================
   INICIAR SESIÓN
   ========================================== */

function login() {

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();


    /*
       IMPORTANTE:

       No hacemos ninguna comprobación real.

       Cualquier correo y cualquier contraseña
       serán aceptados.
    */


    // Solo comprobamos que los campos no estén completamente vacíos
    if (email === "" || password === "") {

        loginMessage.textContent =
            "Por favor, completa los dos campos.";

        loginMessage.style.color = "#dc2626";

        return;
    }


    // Guardar los datos
    loggedEmail = email;
    isLoggedIn = true;


    // Cambiar interfaz
    loginNavButton.classList.add("hidden");

    loggedUser.classList.remove("hidden");


    // Mostrar información de la sesión
    loggedUserName.textContent =
        "👤 Sesión iniciada: " + email;


    // Mensaje de éxito
    loginMessage.textContent =
        "¡Sesión iniciada correctamente!";

    loginMessage.style.color = "#16a34a";


    // Cerrar automáticamente después de un momento
    setTimeout(function() {

        closeLogin();

    }, 1200);

}


/* ==========================================
   ENTER PARA INICIAR SESIÓN
   ========================================== */

emailInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        login();

    }

});


passwordInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        login();

    }

});


/* ==========================================
   CERRAR SESIÓN
   ========================================== */

function logout() {

    // Cambiar estado
    isLoggedIn = false;

    loggedEmail = "";


    // Volver a mostrar botón de login
    loginNavButton.classList.remove("hidden");


    // Ocultar información de sesión
    loggedUser.classList.add("hidden");


    // Restaurar texto
    loggedUserName.textContent =
        "👤 Sesión iniciada";


    // Opcionalmente regresar al menú
    showSection("home");

}


/* ==========================================
   CERRAR MODAL AL HACER CLICK FUERA
   ========================================== */

loginModal.addEventListener("click", function(event) {

    // Si se hizo click directamente sobre el fondo
    if (event.target === loginModal) {

        closeLogin();

    }

});


/* ==========================================
   ESC PARA CERRAR EL LOGIN
   ========================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        if (!loginModal.classList.contains("hidden")) {

            closeLogin();

        }

    }

});


/* ==========================================
   INICIO
   ========================================== */

// Asegurarnos de que el login comience cerrado
loginModal.classList.add("hidden");

// La aplicación comienza oculta
app.classList.add("hidden");

// La pantalla de bienvenida comienza visible
welcomeScreen.classList.remove("hidden");

// Mostrar menú principal cuando corresponda
showSection("home");