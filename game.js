console.log("🔥 GAME.JS ЗАПУСТИЛСЯ");
let player = {
    id: null,
    name: "",
    money: 1000,
    gold: 0,
    experience: 0,
    level: 1
};

/* ==============================
   LOCAL STORAGE
============================== */

function saveLocal() {

    localStorage.setItem(
        "pocketRacingPlayer",
        JSON.stringify(player)
    );
}

/* ==============================
   SUPABASE — ПОИСК
============================== */

async function findPlayer(name) {

    const { data, error } =
        await supabase
            .from("players")
            .select(
                "id, username, money, gold, experience, level"
            )
            .eq(
                "username",
                name
            )
            .maybeSingle();

    if (error) {

        console.error(
            "Supabase ошибка:",
            error
        );

        return null;
    }

    return data;
}

/* ==============================
   SUPABASE — СОЗДАНИЕ
============================== */

async function createPlayer(name) {

    const { data, error } =
        await supabase
            .from("players")
            .insert({

                username: name,
                money: 1000,
                gold: 0,
                experience: 0,
                level: 1

            })
            .select(
                "id, username, money, gold, experience, level"
            )
            .single();

    if (error) {

        console.error(
            "Ошибка создания:",
            error
        );

        return null;
    }

    return data;
}

/* ==============================
   СОЗДАНИЕ / ВХОД
============================== */

async function createAccount() {

    const input =
        document.getElementById(
            "playerNameInput"
        );

    const message =
        document.getElementById(
            "accountMessage"
        );

    const name =
        input.value.trim();

    if (name.length < 2) {

        message.textContent =
            "⚠️ Введи имя минимум из 2 символов.";

        return;
    }

    message.textContent =
        "⏳ Подключаемся к базе...";

    try {

        /*
         * Сначала ищем игрока.
         */

        const existing =
            await findPlayer(name);

        /*
         * Игрок уже есть.
         */

        if (existing) {

            player = {

                id: existing.id,

                name: existing.username,

                money:
                    Number(existing.money),

                gold:
                    Number(existing.gold),

                experience:
                    Number(existing.experience),

                level:
                    Number(existing.level)

            };

            saveLocal();

            updateAll();

            message.textContent =
                "✅ Игрок найден!";

            setTimeout(
                function() {

                    showScreen(
                        "mainMenu"
                    );

                },
                300
            );

            return;
        }

        /*
         * Игрока нет — создаём.
         */

        message.textContent =
            "🏎️ Создаём гонщика...";

        const created =
            await createPlayer(name);

        if (!created) {

            message.textContent =
                "❌ Игрок не создан. Смотри ошибку в консоли.";

            return;
        }

        player = {

            id: created.id,

            name: created.username,

            money:
                Number(created.money),

            gold:
                Number(created.gold),

            experience:
                Number(created.experience),

            level:
                Number(created.level)

        };

        saveLocal();

        updateAll();

        message.textContent =
            "✅ Гонщик создан!";

        setTimeout(
            function() {

                showScreen(
                    "mainMenu"
                );

            },
            300
        );

    } catch (error) {

        console.error(
            "Критическая ошибка:","shop"
    );

    updateShop();
}

function updateShop() {

    const money =
        document.getElementById(
            "shopMoney"
        );

    const gold =
        document.getElementById(
            "gold"
        );

    if (money)
        money.textContent =
            player.money.toLocaleString(
                "ru-RU"
            );

    if (gold)
        gold.textContent =
            player.gold.toLocaleString(
                "ru-RU"
            );
}

function buyGold(amount) {

    const message =
        document.getElementById(
            "shopMessage"
        );

    if (message) {

        message.textContent =
            "💳 Реальная оплата пока не подключена.";

    }
}

/* ==============================
   ОБЩЕЕ ОБНОВЛЕНИЕ
============================== */

function updateAll() {

    updateMainMenu();
    updateGarage();
    updateProfile();
    updateShop();

}

/* ==============================
   СООБЩЕНИЯ
============================== */

function showMessage(text) {

    const message =
        document.getElementById(
            "message"
        );

    if (message)
        message.textContent =
            text;
}

function showGarageMessage(text) {

    const message =
        document.getElementById(
            "garageMessage"
        );

    if (message)
        message.textContent =
            text;
}

/* ==============================
   СБРОС
============================== */

function resetAccount() {

    localStorage.removeItem(
        "pocketRacingPlayer"
    );

    player = {

        id: null,
        name: "",
        money: 1000,
        gold: 0,
        experience: 0,
        level: 1

    };

    const input =
        document.getElementById(
            "playerNameInput"
        );

    if (input)
        input.value = "";

    showScreen(
        "accountScreen"
    );
}

/* ==============================
   ГОНКА
============================== */

function startRace() {

    showScreen(
        "race"
    );

}

/* ==============================
   СТАРТ
============================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "🏎️ Pocket Racing запущен"
        );

        console.log(
            "Supabase:",
            typeof supabase !== "undefined"
        );

    }
); error
        );

        message.textContent =
            "❌ Ошибка подключения к Supabase.";

    }
}

/* ==============================
   ЭКРАНЫ
============================== */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(
            function(screen) {

                screen.classList.add(
                    "hidden"
                );

            }
        );

    const screen =
        document.getElementById(id);

    if (screen) {

        screen.classList.remove(
            "hidden"
        );

    }
}

/* ==============================
   МЕНЮ
============================== */

function openMainMenu() {

    updateAll();

    showScreen(
        "mainMenu"
    );
}

function backToMenu() {

    openMainMenu();
}

/* ==============================
   ОБНОВЛЕНИЕ МЕНЮ
============================== */

function updateMainMenu() {

    const name =
        document.getElementById(
            "menuPlayerName"
        );

    const money =
        document.getElementById(
            "menuMoney"
        );

    const gold =
        document.getElementById(
            "menuGold"
        );

    const xp =
        document.getElementById(
            "menuXP"
        );

    if (name)
        name.textContent =
            player.name;

    if (money)
        money.textContent =
            player.money.toLocaleString(
                "ru-RU"
            );

    if (gold)
        gold.textContent =
            player.gold.toLocaleString(
                "ru-RU"
            );

    if (xp)
        xp.textContent =
            player.experience.toLocaleString(
                "ru-RU"
            );
}

/* ==============================
   ГАРАЖ
============================== */

function openGarage() {

    showScreen(
        "garage"
    );

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

    if (name)
        name.textContent =
            player.name;

    if (money)
        money.textContent =
            player.money.toLocaleString(
                "ru-RU"
            );

    if (gold)
        gold.textContent =
            player.gold.toLocaleString(
                "ru-RU"
            );

    if (xp)
        xp.textContent =
            player.experience.toLocaleString(
                "ru-RU"
            );

    if (level)
        level.textContent =
            player.level;
}

/* ==============================
   ПРОФИЛЬ
============================== */

function openProfile() {

    showScreen(
        "profile"
    );

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
            "profileGold"
        );

    if (name)
        name.textContent =
            player.name;

    if (level)
        level.textContent =
            player.level;

    if (xp)
        xp.textContent =
            player.experience.toLocaleString(
                "ru-RU"
            );

    if (money)
        money.textContent =
            player.money.toLocaleString(
                "ru-RU"
            );

    if (gold)
        gold.textContent =
            player.gold.toLocaleString(
                "ru-RU"
            );
}

/* ==============================
   МАГАЗИН
============================== */

function openShop() {

    showScreen(
