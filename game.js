/* =========================================
   POCKET RACING — GAME.JS
   Меню, гараж, баланс и опыт
========================================= */

/* =========================================
   ДАННЫЕ ИГРОКА
========================================= */

let player = {
    money: 1000,
    experience: 0,
    level: 1
};

/* =========================================
   ЭКРАНЫ
========================================= */

function hideAllScreens() {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });
}

/* =========================================
   ГЛАВНОЕ МЕНЮ
========================================= */

function openGarage() {
    hideAllScreens();

    const garage = document.getElementById("garage");

    if (garage) {
        garage.classList.remove("hidden");
    }

    updateGarage();
}

function backToMenu() {
    hideAllScreens();

    const menu = document.getElementById("mainMenu");

    if (menu) {
        menu.classList.remove("hidden");
    }
}

/* =========================================
   ГАРАЖ
========================================= */

function updateGarage() {

    const moneyElement = document.getElementById("money");

    if (moneyElement) {
        moneyElement.textContent =
            player.money.toLocaleString("ru-RU");
    }
}

/* =========================================
   ОПЫТ
========================================= */

function addExperience(amount) {

    player.experience += amount;

    /*
       Каждые 100 XP = новый уровень
    */

    while (player.experience >= player.level * 100) {

        player.experience -= player.level * 100;

        player.level++;

        showGarageMessage(
            `⭐ Новый уровень: ${player.level}!`
        );
    }

    updateGarage();
}

/* =========================================
   ДЕНЬГИ
========================================= */

function addMoney(amount) {

    player.money += amount;

    updateGarage();
}

/* =========================================
   НАГРАДА ЗА ПОБЕДУ
========================================= */

function rewardForWin() {

    const moneyReward = 500;
    const experienceReward = 100;

    addMoney(moneyReward);
    addExperience(experienceReward);

    showGarageMessage(
        `🏆 Победа! +${moneyReward} 💰 и +${experienceReward} ⭐`
    );
}

/* =========================================
   ГОНКА
========================================= */

function startRace() {

    hideAllScreens();

    const race = document.getElementById("race");

    if (race) {
        race.classList.remove("hidden");
    }

    /*
       Сообщаем race.js,
       что начинается новая гонка
    */

    if (typeof initRace === "function") {
        initRace();
    }
}

/* =========================================
   СООБЩЕНИЯ
========================================= */

function showMessage(text) {

    const message = document.getElementById("message");

    if (message) {
        message.textContent = text;
    }
}

function showGarageMessage(text) {

    const message =
        document.getElementById("garageMessage");

    if (message) {
        message.textContent = text;
    }
}

/* =========================================
   СТАРТ
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateGarage();

});
