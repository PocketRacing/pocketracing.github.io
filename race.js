/* =========================================
   POCKET RACING — RACE.JS
   Полностью рабочий файл для гонки
========================================= */

console.log("🔥 RACE.JS ЗАПУСТИЛСЯ");

let playerScore = 0;
let enemyScore = 0;
let raceFinished = false;

// --- ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ: ПОЛУЧИТЬ ЭЛЕМЕНТЫ ---
// Ищем элементы только тогда, когда они реально нужны, чтобы избежать ошибок
function getElements() {
    return {
        attackButton: document.getElementById("attackButton"),
        raceScore: document.getElementById("raceScore"),
        raceMessage: document.getElementById("raceMessage")
    };
}

/* =========================================
   НАЧАЛО ГОНКИ (Сброс счёта)
========================================= */
function initRace() {
    playerScore = 0;
    enemyScore = 0;
    raceFinished = false;

    const els = getElements();
    updateRaceScreen(els);

    if (els.raceMessage) {
        els.raceMessage.textContent = "Готов к гонке? Атакуй!";
        els.raceMessage.style.color = "#fff";
    }

    if (els.attackButton) {
        els.attackButton.disabled = false;
        els.attackButton.textContent = "⚡ Атаковать";
    }
}

/* =========================================
   ОБНОВЛЕНИЕ СЧЁТА НА ЭКРАНЕ
========================================= */
function updateRaceScreen(els) {
    if (!els.raceScore) return;
    els.raceScore.textContent = `${playerScore} : ${enemyScore}`;
}

/* =========================================
   ДЕЙСТВИЕ ИГРОКА (КНОПКА АТАКОВАТЬ)
========================================= */
function playerAttack() {
    const els = getElements();

    // Если гонка закончена или кнопка заблокирована — ничего не делаем
    if (raceFinished || !els.attackButton || els.attackButton.disabled) {
        return;
    }

    // Блокируем кнопку сразу, чтобы нельзя было спамить кликами
    els.attackButton.disabled = true;

    /*
       Случайный шанс успешной атаки (70%)
    */
    const playerHit = Math.random() < 0.7;

    if (playerHit) {
        playerScore++;
        if (els.raceMessage) {
            els.raceMessage.textContent = "🔥 Отличная атака!";
            els.raceMessage.style.color = "#4ade80"; // Зеленый цвет
        }
    } else {
        if (els.raceMessage) {
            els.raceMessage.textContent = "💨 Атака не прошла!";
            els.raceMessage.style.color = "#fbbf24"; // Желтый цвет
        }
    }

    updateRaceScreen(els);

    /* ================================
       ПРОВЕРЯЕМ ПОБЕДУ
    ================================= */
    if (playerScore >= 3) {
        finishRace(true, els);
        return;
    }

    /* ================================
       ХОД СОПЕРНИКА (с задержкой для эффекта)
    ================================= */
    setTimeout(() => {
        enemyTurn(els);
    }, 800); // Ждем 0.8 секунды перед ходом врага
}

/* =========================================
   ХОД ПОЛИЦИИ (ВРАГ)
========================================= */
function enemyTurn(els) {
    /*
       Вероятность ответной атаки (45%)
    */
    const enemyHit = Math.random() < 0.45;

    if (enemyHit) {
        enemyScore++;
        if (els.raceMessage) {
            els.raceMessage.textContent = "🚓 Полиция отвечает!";
            els.raceMessage.style.color = "#ef4444"; // Красный цвет
        }
    } else {
        if (els.raceMessage) {
            els.raceMessage.textContent = "👮 Полиция промахнулась!";
            els.raceMessage.style.color = "#fff";
        }
    }

    updateRaceScreen(els);

    /* ================================
       ПРОВЕРЯЕМ ПОРАЖЕНИЕ
    ================================= */
    if (enemyScore >= 3) {
        finishRace(false, els);
    } else {
        // Если игра продолжается, разблокируем кнопку игрока
        if (els.attackButton) els.attackButton.disabled = false;
    }
}

/* =========================================
   ЗАВЕРШЕНИЕ ГОНКИ
========================================= */
function finishRace(playerWon, els) {
    raceFinished = true;
    
    if (els.attackButton) {
        els.attackButton.disabled = true;
        els.attackButton.textContent = "Гонка окончена";
    }

    if (playerWon) {
        updateRaceScreen(els);
        
        if (els.raceMessage) {
            els.raceMessage.textContent = "🏆 ПОБЕДА! +500 💰 +100 ⭐";
            els.raceMessage.style.color = "#4ade80";
        }

        // --- ВЫЗОВ НАГРАДЫ ИЗ game.js ---
        // Эта функция ДОЛЖНА быть в game.js!
        if (typeof rewardForWin === "function") {
            rewardForWin();
        } else {
            console.error("❌ Ошибка: Функция rewardForWin не найдена! Проверь game.js");
        }

        // Через 1.5 секунды показываем финальное сообщение
        setTimeout(() => {
            if (els.raceMessage) {
                els.raceMessage.textContent = "🎉 Победа! Награда зачислена.";
                els.raceMessage.style.color = "#fff";
            }
        }, 1500);

    } else {
        if (els.raceMessage) {
            els.raceMessage.textContent = "💥 ПОРАЖЕНИЕ! Полиция тебя догнала.";
            els.raceMessage.style.color = "#ef4444";
        }
        // Можно добавить штраф денег здесь, если хочешь
        // player.money -= 50; saveLocal(); updateAll();
    }
}

/* =========================================
   ПОДКЛЮЧЕНИЕ СОБЫТИЙ
========================================= */
// Ждем, пока DOM полностью загрузится, прежде чем вешать слушатель
document.addEventListener("DOMContentLoaded", () => {
    const els = getElements();
    
    if (els.attackButton) {
        els.attackButton.addEventListener("click", playerAttack);
        console.log("✅ Кнопка 'Атаковать' подключена");
    } else {
        console.warn("⚠️ Кнопка 'attackButton' не найдена в HTML!");
    }
});
