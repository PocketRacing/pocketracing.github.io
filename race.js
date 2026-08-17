let playerWins = 0;
let policeWins = 0;

function attack() {

    let message = document.getElementById("raceMessage");
    let score = document.getElementById("raceScore");

    let result = Math.random() > 0.5;

    if (result) {

        playerWins++;

        message.innerHTML =
            "🏆 DODGE ПОБЕДИЛ!";

    } else {

        policeWins++;

        message.innerHTML =
            "🚓 POLICE ПОБЕДИЛА!";
    }

    score.textContent =
        playerWins + " : " + policeWins;
}