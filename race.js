/* =========================================
   POCKET RACING — RACE.JS
   Простая рабочая гонка
========================================= */

let playerScore = 0;
let enemyScore = 0;
let raceFinished = false;

/* =========================================
   ЭЛЕМЕНТЫ
========================================= */

const attackButton =
    document.getElementById("attackButton");

const raceScore =
    document.getElementById("raceScore");

const raceMessage =
    document.getElementById("raceMessage");

/* =========================================
   НОВАЯ ГОНКА
========================================= */

function initRace() {

    playerScore = 0;
    enemyScore = 0;
    raceFinished = false;

    updateRaceScreen();

    if (raceMessage) {
        raceMessage.textContent =
            "Готов к гонке? Атакуй!";
    }

    if (attackButton) {
        attackButton.disabled = false;
    }
}

/* =========================================
   ОБНОВЛЕНИЕ СЧЁТА
========================================= */

function updateRaceScreen() {

    if (raceScore) {
        raceScore.textContent =
            `${playerScore} : ${enemyScore}`;
    }
}

/* =========================================
   АТАКА ИГРОКА
========================================= */

function playerAttack() {

    if (raceFinished) {
        return;
    }

    /*
       Случайный шанс успешной атаки
    */

    const playerHit =
        Math.random() < 0.7;

    if (playerHit) {

        playerScore++;

        if (raceMessage) {
            raceMessage.textContent =
                "🔥 Отличная атака!";
        }

    } else {

        if (raceMessage) {
            raceMessage.textContent =
                "💨 Атака не прошла!";
        }
    }

    /* ================================
       ПРОВЕРЯЕМ ПОБЕДУ
    ================================= */

    if (playerScore >= 3) {

        finishRace(true);

        return;
    }

    /* ================================
       ХОД СОПЕРНИКА
    ================================= */

    enemyTurn();
}

/* =========================================
   ХОД ПОЛИЦИИ
========================================= */

function enemyTurn() {

    /*
       Небольшая вероятность ответной атаки
    */

    const enemyHit =
        Math.random() < 0.45;

    if (enemyHit) {

        enemyScore++;

        if (raceMessage) {
            raceMessage.textContent =
                "🚓 Полиция отвечает!";
        }

    }

    updateRaceScreen();

    /* ================================
       ПРОВЕРЯЕМ ПОРАЖЕНИЕ
    ================================= */

    if (enemyScore >= 3) {

        finishRace(false);

    }
}

/* =========================================
   ЗАВЕРШЕНИЕ ГОНКИ
========================================= */

function finishRace(playerWon) {

    raceFinished = true;

    if (attackButton) {
        attackButton.disabled = true;
    }

    if (playerWon) {

        updateRaceScreen();

        if (raceMessage) {
            raceMessage.textContent =
                "🏆 ПОБЕДА! +500 💰 +100 ⭐";
        }

        /*
           Передаём награду в game.js
        */

        if (typeof rewardForWin === "function") {
            rewardForWin();
        }

        /*
           Возвращаем кнопку через небольшую паузу
        */

        setTimeout(() => {

            if (raceMessage) {
                raceMessage.textContent =
                    "🏆 Победа! Награда получена.";
            }

        }, 1200);

    } else {

        if (raceMessage) {
            raceMessage.textContent =
                "💥 ПОРАЖЕНИЕ! Попробуй ещё раз.";
        }

    }

}

/* =========================================
   КНОПКА АТАКОВАТЬ
========================================= */

if (attackButton) {

    attackButton.addEventListener(
        "click",
        playerAttack
    );

}
