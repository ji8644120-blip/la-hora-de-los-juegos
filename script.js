// =========================================
// ELEMENTOS
// =========================================

const nameModal = document.getElementById("nameModal");
const nameInput = document.getElementById("nameInput");
const enterButton = document.getElementById("enterButton");
const nameError = document.getElementById("nameError");

const playerName = document.getElementById("playerName");
const welcomeName = document.getElementById("welcomeName");


// =========================================
// COMPROBAR SI YA EXISTE UN NOMBRE
// =========================================

const savedName = localStorage.getItem("playerName");

if (savedName) {

    playerName.textContent = savedName;
    welcomeName.textContent = savedName;

}


// =========================================
// ENTRAR A LA PÁGINA
// =========================================

enterButton.addEventListener("click", enterPage);

nameInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        enterPage();
    }

});


function enterPage() {

    const name = nameInput.value.trim();

    // Comprobar que haya un nombre
    if (name === "") {

        nameError.textContent =
            "Por favor, escribe tu nombre para continuar.";

        nameInput.focus();

        return;
    }


    // Guardar el nombre
    localStorage.setItem("playerName", name);


    // Mostrar el nombre en la página
    playerName.textContent = name;
    welcomeName.textContent = name;


    // Cerrar la ventana
    nameModal.style.display = "none";

}


// =========================================
// IMPEDIR SCROLL MIENTRAS ESTÁ EL MODAL
// =========================================

if (!savedName) {

    document.body.style.overflow = "hidden";

}

else {

    nameModal.style.display = "none";

}


// =========================================
// QUITAR EL BLOQUEO AL ENTRAR
// =========================================

enterButton.addEventListener("click", function() {

    if (nameInput.value.trim() !== "") {

        document.body.style.overflow = "auto";

    }

});