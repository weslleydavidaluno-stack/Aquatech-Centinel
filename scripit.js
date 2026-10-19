//js // ==========================================
// AQUATECH CENTINEL
// ==========================================


// ================= MENU MOBILE =================

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", () => {

    menu.classList.toggle("active");

});


// Fecha o menu quando clicar em um link

document.querySelectorAll(".menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

    });

});


// ================= ELEMENTOS =================

const waterLevel = document.getElementById("water-level");
const levelText = document.getElementById("level-text");

const nivel = document.getElementById("nivel");
const status = document.getElementById("status");
const buzzer = document.getElementById("buzzer");

const hora = document.getElementById("hora");


// ================= HORÁRIO =================

function atualizarHorario() {

    const agora = new Date();

    const horas =
        String(agora.getHours()).padStart(2, "0");

    const minutos =
        String(agora.getMinutes()).padStart(2, "0");

    const segundos =
        String(agora.getSeconds()).padStart(2, "0");

    hora.textContent =
        `${horas}:${minutos}:${segundos}`;
}


// ================= NÍVEL =================

function atualizarNivel() {

    /*
        SIMULAÇÃO

        No projeto real, este valor poderia
        vir de um ESP32/Arduino.
    */

    const novoNivel =
        Math.floor(Math.random() * 91) + 5;


    // Atualiza o tamanho da água

    waterLevel.style.height =
        `${novoNivel}%`;


    // Atualiza os textos

    levelText.textContent =
        `${novoNivel}%`;

    nivel.textContent =
        `${novoNivel}%`;


    // ================= NORMAL =================

    if (novoNivel < 50) {

        status.textContent = "NORMAL";

        status.style.color =
            "#21d07a";

        buzzer.textContent =
            "DESATIVADO";

        buzzer.style.color =
            "#21d07a";

        waterLevel.style.background =
            "linear-gradient(#21d07a, #0879b9)";
    }


    // ================= ATENÇÃO =================

    else if (novoNivel < 75) {

        status.textContent =
            "ATENÇÃO";

        status.style.color =
            "#ffd43b";

        buzzer.textContent =
            "DESATIVADO";

        buzzer.style.color =
            "#ffd43b";

        waterLevel.style.background =
            "linear-gradient(#ffd43b, #d68b00)";
    }


    // ================= CRÍTICO =================

    else {

        status.textContent =
            "CRÍTICO";

        status.style.color =
            "#ff4d5a";

        buzzer.textContent =
            "ATIVADO";

        buzzer.style.color =
            "#ff4d5a";

        waterLevel.style.background =
            "linear-gradient(#ff4d5a, #b51f30)";
    }


    atualizarHorario();
}


// ================= INICIAR =================

atualizarNivel();

atualizarHorario();


// Atualiza o nível a cada 4 segundos

setInterval(
    atualizarNivel,
    4000
);


// Atualiza o relógio a cada segundo

setInterval(
    atualizarHorario,
    1000
);


// ================= LINKS SUAVES =================

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            const destino =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (destino) {

                destino.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});