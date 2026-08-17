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

    if (savedPlayer) {

        try {

            player = JSON.parse(savedPlayer);

        } catch (error) {

            console.log(
                "Ошибка загрузки аккаунта"
            );
        }
    }
}

/* =========================================
   ПРОВЕРКА АККАУНТА
========================================= */

function checkAccount() {

    const accountScreen =
        document.getElementById("accountScreen");

    const savedPlayer =
        localStorage.getItem("pocketRacingPlayer");

    if (savedPlayer) {

        loadPlayer();

        accountScreen.classList.add("hidden");

        updateAll();

    } else {

        accountScreen.classList.remove("hidden");

        hideAllScreensExcept("accountScreen");
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

    const name =
        input.value.trim();

    if (name.length < 2) {

        message.textContent =
            "⚠️ Введи имя минимум из 2 символов.";

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

    openMainMenu();
}

/* =========================================
   ЭКРАНЫ
========================================= */

function hideAllScreens() {

    document.querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.add("hidden");

        });
}

function hideAllScreensExcept(id) {

    document.querySelectorAll(".screen")
        .forEach(screen => {

            if (screen.id !== id) {

                screen.classList.add("hidden");
            }

        });
}

/* =========================================
   ГЛАВНОЕ МЕНЮ
========================================= */

function openMainMenu() {

    hideAllScreens();

    const menu =
        document.getElementById("mainMenu");

    if (menu) {

        menu.classList.remove("hidden");
    }

    updateAll();
}

function backToMenu() {

    openMainMenu();
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

    updateAll();
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

    if (xp) {

        xp.textContent =
            player.experience.toLocaleString("ru-RU");
    }

    if (level) {

        level.textContent =
            player.level;
    }

    if (name) {

        name.textContentplayer.name;
    }
}

/* =========================================
   ПРОФИЛЬ
========================================= */

function openProfile() {

    hideAllScreens();

    const profile =
        document.getElementById("profile");

    if (profile) {

        profile.classList.remove("hidden");
    }

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
            player.experience;
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
   XP
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

    savePlayer();

    updateAll();
}

/* =========================================
   МОНЕТЫ
========================================= */

function addMoney(amount) {

    player.money += amount;

    savePlayer();

    updateAll();
}

/* =========================================
   НАГРАДА
========================================= */

function rewardForWin() {

    const moneyReward = 500;
    const xpReward = 100;

    player.money += moneyReward;

    addExperience(xpReward);

    savePlayer();

    updateAll();

    showGarageMessage(
        `🏆 Победа! +${moneyReward} 💰 и +${xpReward} ⭐`
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

    const raceName =
        document.getElementById("racePlayerName");

    if (raceName) {

        raceName.textContent =
            player.name;
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
   ТЕСТОВЫЙ ДОНАТ
========================================= */

function buyGold(amount) {

    player.gold += amount;

    savePlayer();

    updateAll();

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
   ОБНОВЛЕНИЕ ВСЕГО
========================================= */

function updateAll() {

    updateMenu();

    updateGarage();

    updateProfile();

    updateShop();
}

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
   СБРОС АККАУНТА
========================================= */

function resetAccount() {

    const confirmReset =
        confirm(
            "Точно удалить аккаунт и весь прогресс?"
        );

    if (!confirmReset) {

        return;
    }

    localStorage.removeItem(
        "pocketRacingPlayer"
    );

    location.reload();
}

/* =========================================
   ЗАПУСК
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        checkAccount();

    }
); =
