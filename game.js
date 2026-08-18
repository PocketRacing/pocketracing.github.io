/* ==========================================
   POCKET RACING
   game.js
   Supabase + LocalStorage
========================================== */

let player = {
    id: null,
    name: "",
    money: 1000,
    gold: 0,
    experience: 0,
    level: 1
};

let supabasePlayerId = null;

/* ==========================================
   ЛОКАЛЬНОЕ СОХРАНЕНИЕ
========================================== */

function savePlayerLocal() {

    localStorage.setItem(
        "pocketRacingPlayer",
        JSON.stringify(player)
    );
}

/* ==========================================
   ЛОКАЛЬНАЯ ЗАГРУЗКА
========================================== */

function loadPlayerLocal() {

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
            id: data.id || null,
            name: data.name || "",
            money: Number(data.money) || 1000,
            gold: Number(data.gold) || 0,
            experience: Number(data.experience) || 0,
            level: Number(data.level) || 1
        };

        return true;

    } catch (error) {

        console.error(
            "Ошибка локальной загрузки:",
            error
        );

        return false;
    }
}

/* ==========================================
   SUPABASE — ПОИСК ИГРОКА
========================================== */

async function findPlayerInSupabase(name) {

    if (
        typeof supabase === "undefined"
    ) {

        console.error(
            "Supabase не подключён."
        );

        return null;
    }

    const {
        data,
        error
    } = await supabase
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
            "Ошибка поиска игрока:",
            error
        );

        return null;
    }

    return data;
}

/* ==========================================
   SUPABASE — СОЗДАНИЕ ИГРОКА
========================================== */

async function createPlayerInSupabase(name) {

    if (
        typeof supabase === "undefined"
    ) {

        console.error(
            "Supabase не подключён."
        );

        return null;
    }

    const {
        data,
        error
    } = await supabase
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
            "Ошибка создания игрока:",
            error
        );

        return null;
    }

    return data;
}

/* ==========================================
   SUPABASE — СОХРАНЕНИЕ ИГРОКА
========================================== */

async function savePlayerToSupabase() {

    if (
        typeof supabase === "undefined"
    ) {
        return;
    }

    if (!player.id) {
        return;
    }

    const {
        error
    } = await supabase
        .from("players")
        .update({

            username: player.name,

            money: player.money,

            gold: player.gold,

            experience: player.experience,

            level: player.level

        })
        .eq(
            "id",
            player.id
        );

    if (error) {

        console.error(
            "Ошибка сохранения игрока:",
            error
        );

        return;
    }

    console.log(
        "☁️ Игрок сохранён в Supabase"
    );
}

/* ==========================================
   ОБЩЕЕ СОХРАНЕНИЕ
========================================== */

async function savePlayer() {

    savePlayerLocal();

    await savePlayerToSupabase();
}

/* ==========================================
   ЗАГРУЗКА BIG BOSS / ИГРОКА
========================================== */

async functionЗОЛОТА
========================================== */

async function buyGold(amount) {

    amount =
        Number(amount);

    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        return;
    }

    const message =
        document.getElementById(
            "shopMessage"
        );

    if (message) {

        message.textContent =
            "💳 Реальная оплата пока не подключена.";

    }

    console.log(
        "Тест покупки золота:",
        amount
    );
}

/* ==========================================
   ОБНОВИТЬ ВСЁ
========================================== */

function updateAll() {

    updateMainMenu();

    updateGarage();

    updateProfile();

    updateShop();
}

/* ==========================================
   СООБЩЕНИЯ
========================================== */

function showMessage(text) {

    const message =
        document.getElementById(
            "message"
        );

    if (message) {

        message.textContent =
            text;
    }
}

function showGarageMessage(text) {

    const message =
        document.getElementById(
            "garageMessage"
        );

    if (message) {

        message.textContent =
            text;
    }
}

/* ==========================================
   СБРОС АККАУНТА
========================================== */

async function resetAccount() {

    const confirmed =
        confirm(
            "⚠️ Сбросить локальный аккаунт? Данные в базе Supabase удаляться не будут."
        );

    if (!confirmed) {
        return;
    }

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

    supabasePlayerId =
        null;

    showScreen(
        "accountScreen"
    );

    const input =
        document.getElementById(
            "playerNameInput"
        );

    if (input) {

        input.value = "";
    }

    const message =
        document.getElementById(
            "accountMessage"
        );

    if (message) {

        message.textContent = "";
    }
}

/* ==========================================
   START RACE
========================================== */

function startRace() {

    if (
        typeof window.startRaceGame ===
        "function"
    ) {

        window.startRaceGame();

        return;
    }

    showScreen(
        "race"
    );
}

/* ==========================================
   АВТОЗАГРУЗКА ЛОКАЛЬНОГО ПРОФИЛЯ
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const loaded =
            loadPlayerLocal();

        if (loaded && player.name) {

            updateAll();

            /*
               Пока не отправляем
               автоматически запрос в базу.
               Игрок сможет ввести имя
               на экране аккаунта.
            */

        }

    }
); loadPlayerF();
}

/* ==========================================
   ОБНОВЛЕНИЕ ГЛАВНОГО МЕНЮ
========================================== */

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

    if (name) {

        name.textContent =
            player.name;
    }

    if (money) {

        money.textContent =
            player.money.toLocaleString(
                "ru-RU"
            );
    }

    if (gold) {

        gold.textContent =
            player.gold.toLocaleString(
                "ru-RU"
            );
    }

    if (xp) {

        xp.textContent =
            player.experience.toLocaleString(
                "ru-RU"
            );
    }
}

/* ==========================================
   ГАРАЖ
========================================== */

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

    if (name) {

        name.textContent =
            player.name;
    }

    if (money) {

        money.textContent =
            player.money.toLocaleString(
                "ru-RU"
            );
    }

    if (gold) {

        gold.textContent =
            player.gold.toLocaleString(
                "ru-RU"
            );
    }

    if (xp) {

        xp.textContent =
            player.experience.toLocaleString(
                "ru-RU"
            );
    }

    if (level) {

        level.textContent =
            player.level;
    }
}

/* ==========================================
   ПРОФИЛЬ
========================================== */

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
            player.experience.toLocaleString(
                "ru-RU"
            );
    }

    if (money) {

        money.textContent =
            player.money.toLocaleString(
                "ru-RU"
            );
    }

    if (gold) {

        gold.textContent =
            player.gold.toLocaleString(
                "ru-RU"
            );
    }
}

/* ==========================================
   МАГАЗИН
========================================== */

function openShop() {

    showScreen(
        "shop"
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

    if (money) {

        money.textContent =
            player.money.toLocaleString(
                "ru-RU"
            );
    }

    if (gold) {

        gold.textContent =
            player.gold.toLocaleString(
                "ru-RU"
            );
    }
}

/* ==========================================
   ПОКУПКА
