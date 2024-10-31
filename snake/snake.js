;
var board
var context
var blockSize = 30
var rows = 12
var cols = 12
;

;
var snakeX = blockSize * 5
var snakeY = blockSize * 5

var snakeBody = []
;

;
var foodX
var foodY
;

;
window.onload = function() {
    board = document.getElementById("board")
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext("2d")

    placeFood()
    document.addEventListener("keyup", changeDirection)
    setInterval(update, 100)
}

function update() {
    if (gameover) {
        return
    }

    context.fillStyle="chartreuse"
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle="red"
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood()
    }
}