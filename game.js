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
   ЭКРАНЫ (ДОЛЖНЫ БЫТЬ ВВЕРХУ!)
============================== */
function showScreen(id) {
    // Скрываем все экраны
    document.querySelectorAll(".screen").forEach(function(screen) {
        screen.classList.add("hidden");
    });

    // Показываем нужный
    const screen = document.getElementById(id);
    if (screen) {
        screen.classList.remove("hidden");
    } else {
        console.error("❌ Экран не найден: " + id);
    }
}

/* ==============================
   LOCAL STORAGE
============================== */
function saveLocal() {
    localStorage.setItem("pocketRacingPlayer", JSON.stringify(player));
}

function loadLocal() {
    const saved = localStorage.getItem("pocketRacingPlayer");
    if (saved) {
        const data = JSON.parse(saved);
        player = data;
        console.log("✅ Данные загружены из LocalStorage");
        return true;
    }
    return false;
}

/* ==============================
   SUPABASE — ПОИСК
============================== */
async function findPlayer(name) {
    try {
        const { data, error } = await supabase
            .from("players")
            .select("id, username, money, gold, experience, level")
            .eq("username", name)
            .maybeSingle();

        if (error) {
            console.error("Supabase ошибка поиска:", error);
            return null;
        }
        return data;
    } catch (e) {
        console.error("Критическая ошибка поиска:", e);
        return null;
    }
}

/* ==============================
   SUPABASE — СОЗДАНИЕ
============================== */
async function createPlayer(name) {
    try {
        const { data, error } = await supabase
            .from("players")
            .insert({
                username: name,
                money: 1000,
                gold: 0,
                experience: 0,
                level: 1
            })
            .select("id, username, money, gold, experience, level")
            .single();

        if (error) {
            console.error("Ошибка создания:", error);
            return null;
        }
        return data;
    } catch (e) {
        console.error("Критическая ошибка создания:", e);
        return null;
    }
}

/* ==============================
   СОЗДАНИЕ / ВХОД (ИСПРАВЛЕНО)
============================== */
async function createAccount() {
    const input = document.getElementById("playerNameInput");
    const message = document.getElementById("accountMessage");

    if (!input || !message) return;

    const name = input.value.trim();

    if (name.length < 2) {
        message.textContent = "⚠️ Введи имя минимум из 2 символов.";
        return;
    }

    message.textContent = "⏳ Подключаемся к базе...";

    try {
        // 1. Ищем игрока
        const existing = await findPlayer(name);

        // 2. Если есть - загружаем
        if (existing) {
            player = {
                id: existing.id,
                name: existing.username,
                money: Number(existing.money),
                gold: Number(existing.gold),
                experience: Number(existing.experience),
                level: Number(existing.level)
            };
            saveLocal();
            updateAll();
            message.textContent = "✅ Игрок найден!";
            setTimeout(() => showScreen("mainMenu"), 500);
            return;
        }

        // 3. Если нет - создаем
        message.textContent = "🏎️ Создаём гонщика...";
        const created = await createPlayer(name);

        if (!created) {
            message.textContent = "❌ Игрок не создан. Смотри консоль (F12).";
            return;
        }

        player = {
            id: created.id,
            name: created.username,
            money: Number(created.money),
            gold: Number(created.gold),
            experience: Number(created.experience),
            level: Number(created.level)
        };

        saveLocal();
        updateAll();
        message.textContent = "✅ Гонщик создан!";
        setTimeout(() => showScreen("mainMenu"), 500);

    } catch (error) {
        console.error("💥 Критическая ошибка в createAccount:", error);
        message.textContent = "❌ Ошибка подключения к базе данных.";
    }
}

/* ==============================
   ОБНОВЛЕНИЕ ИНТЕРФЕЙСА
============================== */

function updateMainMenu() {
    const els = {
        name: document.getElementById("menuPlayerName"),
        money: document.getElementById("menuMoney"),
        gold: document.getElementById("menuGold"),
        xp: document.getElementById("menuXP")
    };
    if (els.name) els.name.textContent = player.name;
    if (els.money) els.money.textContent = player.money.toLocaleString("ru-RU");
    if (els.gold) els.gold.textContent = player.gold.toLocaleString("ru-RU");
    if (els.xp) els.xp.textContent = player.experience.toLocaleString("ru-RU");
}

function updateGarage() {
    const els = {
        name: document.getElementById("garagePlayerName"),
        money: document.getElementById("money"),
        gold: document.getElementById("garageGold"),
        xp: document.getElementById("garageXP"),
        level: document.getElementById("playerLevel")
    };
    if (els.name) els.name.textContent = player.name;
    if (els.money) els.money.textContent = player.money.toLocaleString("ru-RU");
    if (els.gold) els.gold.textContent = player.gold.toLocaleString("ru-RU");
    if (els.xp) els.xp.textContent = player.experience.toLocaleString("ru-RU");
    if (els.level) els.level.textContent = player.level;
}

function updateProfile() {
    const els = {
        name: document.getElementById("profileName"),
        level: document.getElementById("profileLevel"),
        xp: document.getElementById("profileXP"),
        money: document.getElementById("profileMoney"),
        gold: document.getElementById("profileGold")
    };
    if (els.name) els.name.textContent = player.name;
    if (els.level) els.level.textContent = player.level;
    if (els.xp) els.xp.textContent = player.experience.toLocaleString("ru-RU");
    if (els.money) els.money.textContent = player.money.toLocaleString("ru-RU");
    if (els.gold) els.gold.textContent = player.gold.toLocaleString("ru-RU");
}

function updateShop() {
    const money = document.getElementById("shopMoney");
    const gold = document.getElementById("gold");
    if (money) money.textContent = player.money.toLocaleString("ru-RU");
    if (gold) gold.textContent = player.gold.toLocaleString("ru-RU");
}

function updateAll() {
    updateMainMenu();
    updateGarage();
    updateProfile();
    updateShop();
}

/* ==============================
   НАВИГАЦИЯ
============================== */

function openMainMenu() {
    updateAll();
    showScreen("mainMenu");
}

function backToMenu() {
    openMainMenu();
}

function openGarage() {
    showScreen("garage");
    updateGarage();
}

function openProfile() {
    showScreen("profile");
    updateProfile();
}

function openShop() {
    showScreen("shop");
    updateShop();
}

function startRace() {
    showScreen("race");
}

/* ==============================
   СООБЩЕНИЯ
============================== */

function showMessage(text) {
    const msg = document.getElementById("message");
    if (msg) msg.textContent = text;
}

function showGarageMessage(text) {
    const msg = document.getElementById("garageMessage");
    if (msg) msg.textContent = text;
}

function buyGold(amount) {
    const msg = document.getElementById("shopMessage");
    if (msg) msg.textContent = "💳 Реальная оплата пока не подключена.";
}

/* ==============================
   СБРОС
============================== */

function resetAccount() {
    if(confirm("⚠️ Точно сбросить аккаунт?")) {
        localStorage.removeItem("pocketRacingPlayer");
        player = { id: null, name: "", money: 1000, gold: 0, experience: 0, level: 1 };
        const input = document.getElementById("playerNameInput");
        if (input) input.value = "";
        showScreen("accountScreen");
    }
}

/* ==============================
   СТАРТ
============================== */

document.addEventListener("DOMContentLoaded", () => {
    console.log("🏁 Pocket Racing запущен");
    
    // Проверяем, есть ли сохранённый игрок
    if (loadLocal()) {
        updateAll();
        showScreen("mainMenu");
    } else {
        // Иначе показываем экран создания
        showScreen("accountScreen");
    }
});
