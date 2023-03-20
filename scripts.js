document.addEventListener("DOMContentLoaded", function () {
    const playerInputsContainer = document.getElementById("player-inputs-container");
    const addPlayerButton = document.getElementById("add-player");
    const calculateScoresButton = document.getElementById("calculate-scores");
    const saveResultsButton = document.getElementById("save-results");
    const resultsContainer = document.getElementById("results-container");
    const highScoresContainer = document.getElementById("high-scores-container");
    const highestScoringGamesContainer = document.getElementById("highest-scoring-games-container");

    addPlayerButton.addEventListener("click", function () {
        addPlayerInput();
    });

    calculateScoresButton.addEventListener("click", function () {
        calculateScores();
    });

    saveResultsButton.addEventListener("click", function () {
        saveResults();
    });

    function addPlayerInput() {
        const playerInput = document.createElement("div");
        playerInput.classList.add("player-input");

        playerInput.innerHTML = `
            <label>Player Name: <input type="text" class="player-name"></label>
            <label>Corporation: <input type="text" class="corporation"></label>
            <label>TR: <input type="number" class="tr"></label>
            <label>Awards: <input type="number" class="awards"></label>
            <label>Milestones: <input type="number" class="milestones"></label>
            <label>Greeneries: <input type="number" class="greeneries"></label>
            <label>Cities: <input type="number" class="cities"></label>
            <label>Card VPs: <input type="number" class="card-vps"></label>
        `;

        playerInputsContainer.appendChild(playerInput);
    }

    function calculateScores() {
        const playerInputs = document.querySelectorAll(".player-input");
        const results = [];

        for (const playerInput of playerInputs) {
            const playerName = playerInput.querySelector(".player-name").value;
            const corporation = playerInput.querySelector(".corporation").value;
            const tr = Number(playerInput.querySelector(".tr").value);
            const awards = Number(playerInput.querySelector(".awards").value);
            const milestones = Number(playerInput.querySelector(".milestones").value);
            const greeneries = Number(playerInput.querySelector(".greeneries").value);
            const cities = Number(playerInput.querySelector(".cities").value);
            const cardVps = Number(playerInput.querySelector(".card-vps").value);

            const totalScore = tr + awards + milestones + greeneries + cities + cardVps;

            results.push({
                playerName,
                corporation,
                tr,
                awards,
                milestones,
                greeneries,
                cities,
                cardVps,
                totalScore,
            });
        }

        results.sort((a, b) => b.totalScore - a.totalScore);

        displayResults(results);
    }

    function displayResults(results) {
        resultsContainer.innerHTML = "";

        for (const result of results) {
            const resultElement = document.createElement("div");
            resultElement.textContent = `${result.playerName} (${result.corporation}): ${result.totalScore}`;
            resultsContainer.appendChild(resultElement);
        }
    }

    function saveResults() {
        const results = Array.from(document.querySelectorAll("#results-container > div")).map(div => {
            const [playerName, corporation, totalScore] = div.textContent.split(/[\(\):]/).map(s => s.trim());

            return {
                playerName,
                corporation,
                totalScore: Number(totalScore),
            };
        });
        let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        let highestScoringGames = JSON.parse(localStorage.getItem("highestScoringGames")) || [];

        for (const result of results) {
            highScores.push(result);
        }

        highScores.sort((a, b) => b.totalScore - a.totalScore);
        highScores = highScores.slice(0, 10);
        localStorage.setItem("highScores", JSON.stringify(highScores));

        highestScoringGames.push({
            playerName: results[0].playerName,
            corporation: results[0].corporation,
            totalScore: results[0].totalScore,
        });

        highestScoringGames.sort((a, b) => b.totalScore - a.totalScore);
        highestScoringGames = highestScoringGames.slice(0, 5);
        localStorage.setItem("highestScoringGames", JSON.stringify(highestScoringGames));

        displayHighScores();
        displayHighestScoringGames();
    }

    function displayHighScores() {
        highScoresContainer.innerHTML = "";

        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

        for (const highScore of highScores) {
            const highScoreElement = document.createElement("div");
            highScoreElement.textContent = `${highScore.playerName} (${highScore.corporation}): ${highScore.totalScore}`;
            highScoresContainer.appendChild(highScoreElement);
        }
    }

    function displayHighestScoringGames() {
        highestScoringGamesContainer.innerHTML = "";

        const highestScoringGames = JSON.parse(localStorage.getItem("highestScoringGames")) || [];

        for (const highestScoringGame of highestScoringGames) {
            const highestScoringGameElement = document.createElement("div");
            highestScoringGameElement.textContent = `${highestScoringGame.playerName} (${highestScoringGame.corporation}): ${highestScoringGame.totalScore}`;
            highestScoringGamesContainer.appendChild(highestScoringGameElement);
        }
    }

    // Initialize app
    addPlayerInput();
    displayHighScores();
    displayHighestScoringGames();
});

        
