/* =========================================
   POCKET RACING
   АККАУНТ + СОХРАНЕНИЕ + БАЛАНС + МАГАЗИН
========================================= */

/* =========================================
   ДАННЫЕ ИГРОКА
========================================= */

let player = {
    name: "",
    money: 1000,
    gold: 0,
    experience: 0,
    level: 1
};

/* =========================================
   СОХРАНЕНИЕ
========================================= */

function savePlayer() {

    localStorage.setItem(
        "pocketRacingPlayer",
        JSON.stringify(player)
    );
}

/* =========================================
   ЗАГРУЗКА
========================================= */

function loadPlayer() {

    const savedPlayer =
        localStorage.getItem("pocketRacingPlayer");

    if (!savedPlayer) {
        return false;
    }

    try {

        const data =
            JSON.parse(savedPlayer);

        player = {
            name: data.name || "",
            money: Number.isFinite(data.money)
                ? data.money
                : 1000,
            gold: Number.isFinite(data.gold)
                ? data.gold
                : 0,
            experience: Number.isFinite(data.experience)
                ? data.experience
                : 0,
            level: Number.isFinite(data.level)
                ? data.level
                : 1
        };

        return true;

    } catch (error) {

        console.error(
            "Ошибка загрузки игрока:",
            error
        );

        return false;
    }
}

/* =========================================
   ПОКАЗ ЭКРАНА
========================================= */

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(
        function(screen) {

            screen.classList.add("hidden");

        }
    );

    const screen =
        document.getElementById(screenId);

    if (screen) {

        screen.classList.remove("hidden");
    }
}

/* =========================================
   СОЗДАНИЕ АККАУНТА
========================================= */

function createAccount() {

    const input =
        document.getElementById("playerNameInput");

    const message =
        document.getElementById("accountMessage");

    if (!input) {

        console.error(
            "Не найден playerNameInput"
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

/* =========================================
   ПРОВЕРКА АККАУНТА
========================================= */

function checkAccount() {

    const hasAccount =
        loadPlayer();

    if (hasAccount && player.name) {

        updateAll();

        showScreen("mainMenu");

    } else {

        showScreen("accountScreen");
    }
}

/* =========================================
   ГЛАВНОЕ МЕНЮ
========================================= */

function openMainMenu() {

    showScreen("mainMenu");

    updateAll();
}

function backToMenu() {

    openMainMenu();
}

/* =========================================
   ГАРАЖ
========================================= */

function openGarage() {

    showScreen("garage");

    updateGarage();
}

function updateGarage() {

    const money =
        document.getElementById("money");

    const gold =
        document.getElementById("garageGold");

    const xp =
        document.getElementById("garageXP");

    const level =
        document.getElementById("playerLevel");

    const name =
        document.getElementById("garagePlayerName");

    if (money) {

        money.textContent =
            player.money.toLocaleString("ru-RU");
    }

    if (gold) {

        gold.textContent =
            player.gold.toLocaleString("ru-RU");
    }

    if (xp) {xp.textContent =
            player.experience.toLocaleString("ru-RU");
    }

    if (level) {

        level.textContent =
            player.level;
    }

    if (name) {

        name.textContent =
            player.name;
    }
}

/* =========================================
   ПРОФИЛЬ
========================================= */

function openProfile() {

    showScreen("profile");

    updateProfile();
}

function updateProfile() {

    const name =
        document.getElementById("profileName");

    const level =
        document.getElementById("profileLevel");

    const xp =
        document.getElementById("profileXP");

    const money =
        document.getElementById("profileMoney");

    const gold =
        document.getElementById("profileGold");

    if (name) {

        name.textContent =
            player.name;
    }

    if (level) {

        level.textContent =
            player.level;
    }

    if (xp) {

        xp.textContent =
            player.experience.toLocaleString("ru-RU");
    }

    if (money) {

        money.textContent =
            player.money.toLocaleString("ru-RU");
    }

    if (gold) {

        gold.textContent =
            player.gold.toLocaleString("ru-RU");
    }
}

/* =========================================
   ГЛАВНОЕ МЕНЮ — ДАННЫЕ
========================================= */

function updateMenu() {

    const name =
        document.getElementById("menuPlayerName");

    const money =
        document.getElementById("menuMoney");

    const gold =
        document.getElementById("menuGold");

    const xp =
        document.getElementById("menuXP");

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
}

/* =========================================
   МАГАЗИН
========================================= */

function openShop() {

    showScreen("shop");

    updateShop();
}

function updateShop() {

    const money =
        document.getElementById("shopMoney");

    const gold =
        document.getElementById("gold");

    if (money) {

        money.textContent =
            player.money.toLocaleString("ru-RU");
    }

    if (gold) {

        gold.textContent =
            player.gold.toLocaleString("ru-RU");
    }
}

/* =========================================
   ТЕСТОВАЯ ПОКУПКА
========================================= */

function buyGold(amount) {

    amount =
        Number(amount);

    if (!Number.isFinite(amount) || amount <= 0) {

        return;
    }

    /*
       ПОКА ЭТО ТЕСТ.
       РЕАЛЬНАЯ ОПЛАТА БУДЕТ ПОДКЛЮЧЕНА ПОЗЖЕ.
    */

    player.gold += amount;

    savePlayer();

    updateAll();

    const message =
        document.getElementById("shopMessage");

    if (message) {

        message.textContent =
            "✅ Получено +" +
            amount +
            " 💎";
    }
}

/* =========================================
   МОНЕТЫ
========================================= */

function addMoney(amount) {

    amount =
        Number(amount);

    if (!Number.isFinite(amount)) {

        return;
    }

    player.money += amount;

    savePlayer();

    updateAll();
}

/* =========================================
   XP И УРОВНИ
========================================= */

function addExperience(amount) {

    amount =
        Number(amount);

    if (!Number.isFinite(amount) || amount <= 0) {

        return;
    }

    player.experience += amount;

    while (
        player.experience >=
        player.level * 100
    ) {

        player.experience -=
            player.level * 100;

        player.level++;

        showGarageMessage(
            "⭐ Новый уровень: " +
            player.level +
            "!"
        );
    }

    savePlayer();

    updateAll();
}

/* =========================================НАГРАДА ЗА ПОБЕДУ
========================================= */

function rewardForWin() {

    const moneyReward =
        500;

    const xpReward =
        100;

    player.money +=
        moneyReward;

    player.experience +=
        xpReward;

    while (
        player.experience >=
        player.level * 100
    ) {

        player.experience -=
            player.level * 100;

        player.level++;
    }

    savePlayer();

    updateAll();

    showGarageMessage(
        "🏆 Победа! +" +
        moneyReward +
        " 💰 и +" +
        xpReward +
        " ⭐"
    );
}

/* =========================================
   ГОНКА
========================================= */

function startRace() {

    showScreen("race");

    const raceName =
        document.getElementById("racePlayerName");

    if (raceName) {

        raceName.textContent =
            player.name;
    }

    if (
        typeof initRace ===
        "function"
    ) {

        initRace();
    }
}

/* =========================================
   СООБЩЕНИЯ
========================================= */

function showMessage(text) {

    const message =
        document.getElementById("message");

    if (message) {

        message.textContent =
            text;
    }
}

function showGarageMessage(text) {

    const message =
        document.getElementById("garageMessage");

    if (message) {

        message.textContent =
            text;
    }
}

/* =========================================
   ОБНОВЛЕНИЕ ВСЕХ ЭКРАНОВ
========================================= */

function updateAll() {

    updateMenu();

    updateGarage();

    updateProfile();

    updateShop();
}

/* =========================================
   СБРОС АККАУНТА
========================================= */

function resetAccount() {

    const answer =
        confirm(
            "Точно удалить аккаунт и весь прогресс?"
        );

    if (!answer) {

        return;
    }

    localStorage.removeItem(
        "pocketRacingPlayer"
    );

    location.reload();
}

/* =========================================
   ЗАПУСК ИГРЫ
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
           Кнопка создаётся напрямую через JS,
           поэтому она работает даже если
           onclick в HTML не сработал.
        */

        const createButton =
            document.getElementById(
                "createPlayerButton"
            );

        if (createButton) {

            createButton.addEventListener(
                "click",
                createAccount
            );
        }

        /*
           Если в HTML используется
           onclick="createAccount()",
           функция createAccount тоже доступна.
        */

        checkAccount();

    }
);
