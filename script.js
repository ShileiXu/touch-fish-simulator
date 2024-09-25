let score = 0;
let timeLeft = 20; //game time = 1min
let timerInterval = null;

// Get DOM elements
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const fish = document.getElementById('fish');
const hand = document.getElementById('hand');
const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-button');
const gameTitle = document.getElementById('game-title');
const gameOverMessage = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');

//update the score display
function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

//update the timer display
function updateTimer() {
    timerElement.textContent = `Time: ${timeLeft}s`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function startGame() {
    startButton.style.display = 'none';
    gameTitle.style.display = 'none';
    fish.style.display = 'block';
    gameOverMessage.style.display = 'none';
    score = 0;
    timeLeft = 20;
    updateScore();
    updateTimer();
    moveFish();
    startTimer();
}

function endGame() {
    fish.style.display = 'none';

    finalScoreElement.textContent = score;
    gameOverMessage.style.display = 'block';
    startButton.style.display = 'block';
    score = 0;
    timeLeft = 20;

}

startButton.addEventListener('click', startGame);

//event listener for clicking the fish
fish.addEventListener('click', () => {
    score += 1;
    updateScore();
    moveFish();
});

//move the fish to a random position within the game container
function moveFish() {
    const containerWidth = gameContainer.clientWidth;
    const containerHeight = gameContainer.clientHeight;
    const fishWidth = fish.clientWidth;
    const fishHeight = fish.clientHeight;

    //calculate random positions ensuring the fish stays within the container
    const randomX = Math.floor(Math.random() * (containerWidth - fishWidth));
    const randomY = Math.floor(Math.random() * (containerHeight - fishHeight));

    fish.style.left = `${randomX}px`;
    fish.style.top = `${randomY}px`;
}

//update hand position based on mouse coordinates
function updateHandPosition(event) {
    const handWidth = hand.clientWidth;
    const handHeight = hand.clientHeight;

    const rect = gameContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    //update hand position
    hand.style.left = `${x}px`;
    hand.style.top = `${y}px`;
}

//attach mousemove event listener to the game container
gameContainer.addEventListener('mousemove', updateHandPosition);

updateScore();
updateTimer();