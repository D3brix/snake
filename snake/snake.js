var board;
var context;
var blockSize = 25;
var rows = 12;
var cols = 12;

var velocityY= 0;
var velocityX= 0;

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

    setInterval(update, 100);
}

function update() {
    if (gameover) {
        return;
    }

    context.fillStyle = "chartreuse";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
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
}

function changeDirection(e) {
    if (e.code == "W" && velocityY !=1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "S" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "A" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "D" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}