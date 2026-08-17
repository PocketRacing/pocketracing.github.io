let player = {
    name: "",
    money: 1000,
    gold: 0,
    experience: 0,
    level: 1
};

/* ==============================
   СОХРАНЕНИЕ
============================== */

function savePlayer() {

    localStorage.setItem(
        "pocketRacingPlayer",
        JSON.stringify(player)
    );
}

/* ==============================
   ЗАГРУЗКА
============================== */

function loadPlayer() {

    const saved =
        localStorage.getItem(
            "pocketRacingPlayer"
        );

    if (!saved) {
        return false;
    }

    try {

        const data = JSON.parse(saved);

        player = {
            name: data.name || "",
            money: Number(data.money) || 1000,
            gold: Number(data.gold) || 0,
            experience: Number(data.experience) || 0,
            level: Number(data.level) || 1
        };

        return true;

    } catch (error) {

        console.error(
            "Ошибка загрузки аккаунта",
            error
        );

        return false;
    }
}

/* ==============================
   ЭКРАНЫ
============================== */

function showScreen(id) {

    document.querySelectorAll(".screen")
        .forEach(function(screen) {

            screen.classList.add("hidden");

        });

    const screen =
        document.getElementById(id);

    if (screen) {

        screen.classList.remove("hidden");
    }
}

/* ==============================
   СОЗДАНИЕ ГОНЩИКА
============================== */

function createAccount() {

    const input =
        document.getElementById(
            "playerNameInput"
        );

    const message =
        document.getElementById(
            "accountMessage"
        );

    if (!input) {

        console.error(
            "playerNameInput не найден"
        );

        return;
    }

    const name =
        input.value.trim();

    if (name.length < 2) {

        if (message) {

            message.textContent =
                "⚠️ Введи имя минимум из 2 символов.";

        }

        return;
    }

    player = {

        name: name,

        money: 1000,

        gold: 0,

        experience: 0,

        level: 1

    };

    savePlayer();

    updateAll();

    showScreen("mainMenu");
}

/* ==============================
   ГЛАВНОЕ МЕНЮ
============================== */

function openMainMenu() {

    showScreen("mainMenu");

    updateAll();
}

function backToMenu() {

    openMainMenu();
}

/* ==============================
   ГАРАЖ
============================== */

function openGarage() {

    showScreen("garage");

    updateGarage();
}

function updateGarage() {

    const name =
        document.getElementById(
            "garagePlayerName"
        );

    const money =
        document.getElementById(
            "money"
        );

    const gold =
        document.getElementById(
            "garageGold"
        );

    const xp =
        document.getElementById(
            "garageXP"
        );

    const level =
        document.getElementById(
            "playerLevel"
        );

    if (name) {
        name.textContent =
            player.name;
    }

    if (money) {
        money.textContent =
            player.money.toLocaleString("ru-RU");
    }

    if (gold) {
        gold.textContent =
            player.gold.toLocaleString("ru-RU");
    }

    if (xp) {
        xp.textContent =
            player.experience.toLocaleString("ru-RU");
    }

    if (level) {
        level.textContent =
            player.level;
    }
}

/* ==============================
   ПРОФИЛЬ
============================== */

function openProfile() {

    showScreen("profile");

    updateProfile();
}

function updateProfile() {

    const name =
        document.getElementById(
            "profileName"
        );

    const level =
        document.getElementById(
            "profileLevel"
        );

    const xp =
        document.getElementById(
            "profileXP"
        );

    const money =
        document.getElementById(
            "profileMoney"
        );

    const gold =
        document.getElementById(
