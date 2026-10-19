// ==========================================
// AQUATECH CENTINEL
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ================= MENU MOBILE =================

    const menuButton = document.getElementById("menuButton");
    const menu = document.getElementById("menu");

    menuButton.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll(".menu a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });


    // ================= ELEMENTOS =================
    // (nomes com sufixo "El" para não conflitar com
    //  propriedades globais do navegador, como window.status)

    const waterLevel = document.getElementById("water-level");
    const levelText = document.getElementById("level-text");
    const nivelEl = document.getElementById("nivel");
    const statusEl = document.getElementById("status");
    const buzzerEl = document.getElementById("buzzer");
    const horaEl = document.getElementById("hora");


    // ================= HORÁRIO =================

    function atualizarHorario() {
        const agora = new Date();

        const horas = String(agora.getHours()).padStart(2, "0");
        const minutos = String(agora.getMinutes()).padStart(2, "0");
        const segundos = String(agora.getSeconds()).padStart(2, "0");

        horaEl.textContent = `${horas}:${minutos}:${segundos}`;
    }


    // ================= NÍVEL =================

    function atualizarNivel() {

        /*
            SIMULAÇÃO

            No projeto real, este valor poderia
            vir de um ESP32/Arduino.
        */

        const novoNivel = Math.floor(Math.random() * 91) + 5;

        // Atualiza o tamanho da água
        waterLevel.style.height = `${novoNivel}%`;

        // Atualiza os textos
        levelText.textContent = `${novoNivel}%`;
        nivelEl.textContent = `${novoNivel}%`;

        let cor, gradiente, situacao, alerta;

        if (novoNivel < 50) {
            // NORMAL
            cor = "#21d07a";
            gradiente = "linear-gradient(#21d07a, #0879b9)";
            situacao = "NORMAL";
            alerta = "DESATIVADO";
        } else if (novoNivel < 75) {
            // ATENÇÃO
            cor = "#ffd43b";
            gradiente = "linear-gradient(#ffd43b, #d68b00)";
            situacao = "ATENÇÃO";
            alerta = "DESATIVADO";
        } else {
            // CRÍTICO
            cor = "#ff4d5a";
            gradiente = "linear-gradient(#ff4d5a, #b51f30)";
            situacao = "CRÍTICO";
            alerta = "ATIVADO";
        }

        statusEl.textContent = situacao;
        statusEl.style.color = cor;

        buzzerEl.textContent = alerta;
        buzzerEl.style.color = cor;

        waterLevel.style.background = gradiente;

        atualizarHorario();
    }


    // ================= INICIAR =================

    atualizarNivel();
    atualizarHorario();

    // Atualiza o nível a cada 4 segundos
    setInterval(atualizarNivel, 4000);

    // Atualiza o relógio a cada segundo
    setInterval(atualizarHorario, 1000);


    // ================= LINKS SUAVES =================

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const destino = document.querySelector(link.getAttribute("href"));

            if (destino) {
                event.preventDefault();
                destino.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

});