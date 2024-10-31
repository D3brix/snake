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
window.onload = function() {
    board = document.getElementById("board")
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext("2d")
    
}