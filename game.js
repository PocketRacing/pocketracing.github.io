/* =========================================
   POCKET RACING — GAME.JS
   Меню, гараж, баланс, XP и магазин
========================================= */

/* =========================================
   ДАННЫЕ ИГРОКА
========================================= */

let player = {
    money: 1000,
    gold: 0,
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

function backToMenu() {

    hideAllScreens();

    const menu =
        document.getElementById("mainMenu");

    if (menu) {
        menu.classList.remove("hidden");
    }
}

/* =========================================
   ГАРАЖ
========================================= */

function openGarage() {

    hideAllScreens();

    const garage =
        document.getElementById("garage");

    if (garage) {
        garage.classList.remove("hidden");
    }

    updateGarage();
}

function updateGarage() {

    const moneyElement =
        document.getElementById("money");

    const goldElement =
        document.getElementById("garageGold");

    const xpElement =
        document.getElementById("garageXP");

    const levelElement =
        document.getElementById("playerLevel");

    if (moneyElement) {

        moneyElement.textContent =
            player.money.toLocaleString("ru-RU");
    }

    if (goldElement) {

        goldElement.textContent =
            player.gold.toLocaleString("ru-RU");
    }

    if (xpElement) {

        xpElement.textContent =
            player.experience.toLocaleString("ru-RU");
    }

    if (levelElement) {

        levelElement.textContent =
            player.level;
    }
}

/* =========================================
   ОПЫТ
========================================= */

function addExperience(amount) {

    player.experience += amount;

    while (
        player.experience >=
        player.level * 100
    ) {

        player.experience -=
            player.level * 100;

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

    const race =
        document.getElementById("race");

    if (race) {
        race.classList.remove("hidden");
    }

    if (typeof initRace === "function") {

        initRace();
    }
}

/* =========================================
   💎 МАГАЗИН
========================================= */

function openShop() {

    hideAllScreens();

    const shop =
        document.getElementById("shop");

    if (shop) {

        shop.classList.remove("hidden");
    }

    updateShop();
}

/* =========================================
   ОБНОВЛЕНИЕ МАГАЗИНА
========================================= */

function updateShop() {

    const goldElement =
        document.getElementById("gold");

    const shopMoneyElement =
        document.getElementById("shopMoney");

    if (goldElement) {

        goldElement.textContent =
            player.gold.toLocaleString("ru-RU");
    }

    if (shopMoneyElement) {

        shopMoneyElement.textContent =
            player.money.toLocaleString("ru-RU");
    }

    updateGarage();/* =========================================
   ТЕСТОВАЯ ПОКУПКА ЗОЛОТА
========================================= */

function buyGold(amount) {

    player.gold += amount;

    updateShop();

    const message =
        document.getElementById("shopMessage");

    if (message) {

        message.textContent =
            `✅ Тестовая покупка! +${amount} 💎`;
    }
}

/* =========================================
   СООБЩЕНИЯ
========================================= */

function showMessage(text) {

    const message =
        document.getElementById("message");

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
   ЗАПУСК
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateGarage();

    }
);}
