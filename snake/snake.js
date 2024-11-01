var board;
var border;
var context;
var blockSize = 50;
var rows = 15;
var cols = 15;

var velocityY = 0;
var velocityX = 0;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var snakeBody = [];

var foodX = blockSize * 10;
var foodY = blockSize * 10;

var gameover = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    document.addEventListener('keyup', changeDirection)
    setInterval(update, 180);
}

function update() {

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            location.reload();
        }
    })

    context.fillStyle = "chartreuse";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        incrementScore();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "green";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    console.log("Snake position:", snakeX, snakeY)
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameover = true;
            alert("Game Over");
        }
    }

    if (snakeX > 700)
        gameover = true;
   

    else if (snakeX < 0)
        gameover = true;
   

    else if (snakeY > 700)
        gameover = true;
   

    else if (snakeY < 0)
        gameover = true;
    
    if (gameover) {
        alert("Game Over");
    }
   

}

function collision() {
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            return true;
        }
    }
    return false;
}


function changeDirection(e) {
    if (e.code == "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    }

    else if (e.code == "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    }

    else if (e.code == "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    }

    else if (e.code == "ArrowRight") {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random(0) * cols) * blockSize;
    foodY = Math.floor(Math.random(0) * rows) * blockSize;
    if (foodX == snakeBody)
        placeFood();
    if (foodY == snakeBody)
        placeFood();
}


const scoreboard = document.createElement('div');
scoreboard.id = 'scoreboard';
scoreboard.innerHTML = `<h2>Score: <span id="score">0</span></h2>`;
document.body.appendChild(scoreboard);

let score = 0; 


function updateScore(newScore) {
    score = newScore;
    document.getElementById('score').innerText = score;
}

function incrementScore() {
        updateScore(score + 1);
}

