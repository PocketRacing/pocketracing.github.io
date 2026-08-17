// ========================================
// 🎮 GAME.JS — ОСНОВА ИГРЫ
// ========================================

// ========================================
// 1. СКРЫТЬ ВСЕ ЭКРАНЫ
// ========================================

function hideAllScreens() {

    document.querySelectorAll(".screen").forEach(function(screen) {

        screen.classList.add("hidden");

    });

}

// ========================================
// 2. ГЛАВНОЕ МЕНЮ → ГАРАЖ
// ========================================

function openGarage() {

    hideAllScreens();

    document.getElementById("garage").classList.remove("hidden");

}

// ========================================
// 3. ГАРАЖ → ГЛАВНОЕ МЕНЮ
// ========================================

function backToMenu() {

    hideAllScreens();

    document.getElementById("mainMenu").classList.remove("hidden");

}

// ========================================
// 4. ГАРАЖ → ГОНКА
// ========================================

function startRace() {

    hideAllScreens();

    document.getElementById("race").classList.remove("hidden");

}

// ========================================
// 5. СООБЩЕНИЯ
// ========================================

function showMessage(text) {

    const message = document.getElementById("message");

    if (message) {

        message.textContent = text;

    }

}

// ========================================
// 6. СООБЩЕНИЯ ГАРАЖА
// ========================================

function showGarageMessage(text) {

    const message = document.getElementById("garageMessage");

    if (message) {

        message.textContent = text;

    }

}

// ========================================
// 7. СООБЩЕНИЯ ГОНКИ
// ========================================

function showRaceMessage(text) {

    const message = document.getElementById("raceMessage");

    if (message) {

        message.textContent = text;

    }

}

// ========================================
// 8. СТАРТ
// ========================================

console.log("🎮 GAME.JS загружен");