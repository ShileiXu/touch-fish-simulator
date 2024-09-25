let score = 0;

// Get DOM elements
const counterElement = document.getElementById('counter');
const fish = document.getElementById('fish');
const hand = document.getElementById('hand');
const gameContainer = document.getElementById('game-container');

//update the counter display
function updateCounter() {
    counterElement.textContent = `Score: ${score}`;
}

//event listener for clicking the fish
fish.addEventListener('click', () => {
    score += 1;
    updateCounter();
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

updateCounter();