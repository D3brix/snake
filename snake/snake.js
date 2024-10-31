var board;
var context;
var blockSize = 25;
var rows = 12;
var cols = 12;

var velocity = 0;

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
    snakeX += velocity * blockSize;
    snakeY += velocity * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
}