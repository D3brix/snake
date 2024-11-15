do {
    userName = prompt('Write your name');
} while (userName.length !== 3);

async function getMessages() { const scoreboard2 = document.getElementById('scoreboard2');

const response = await fetch("https://kool.krister.ee/chat/SNAKE1");
const data = await response.json();

const scores = data.sort(function(a, b){return b.Score-a.Score});
console.log(scores)

let num_to_skip = [];
let i = 0;
for (let a = 0; a < scores.length; a++) {
  if (i >= 10)
    {
      break;
    }
    for (let b = 0; b < scores.length; b++)
      {
        if ((scores[a].userName == scores[b].userName) && a != b)
          {
            num_to_skip[b] = true; 
          }
      }
  if (num_to_skip[a] == undefined  || num_to_skip[a] != true)
    {
      scoreboard2.innerHTML += "<h3>" + scores[a].userName + " " + scores[a].Score + "</h3>";
      i++;
    }
  }




}

getMessages()
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

let gameovercontroller = false

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    document.addEventListener('keydown', changeDirection)
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
        displayGameOverScreen();
    }
}
function resetScore() {
    score = 0;
    updateScore(score);
}
function displayGameOverScreen() {
  
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "white";
    context.font = "50px Arial";
    context.textAlign = "center";
    context.fillText("Game Over", board.width / 2, board.height / 2 - 80);
    context.font = "30px Arial";
    context.fillText(`Score: ${score}`, board.width / 2, board.height / 2 - 30);
    context.fillText("Press Enter to Restart", board.width / 2, board.height / 2 + 30);

    if (gameovercontroller == false)
        {

    fetch("https://kool.krister.ee/chat/SNAKE1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName:userName , Score:score})
      });

    saveScore();
    gameovercontroller = true;
    }
}
function saveScore() {
    console.log("Latest score saved: " + score);
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
    if (e.code == "ArrowUp" || e.code == "KeyW") {
        velocityX = 0;
        velocityY = -1;
    }

    else if (e.code == "ArrowDown" || e.code == "KeyS") {
        velocityX = 0;
        velocityY = 1;
    }

    else if (e.code == "ArrowLeft" || e.code == "KeyA") {
        velocityX = -1;
        velocityY = 0;
    }

    else if (e.code == "ArrowRight" || e.code == "KeyD") {
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

var score = 0;

function updateScore(newScore) {
    score = newScore;
    document.getElementById('score').innerText = score;
}

function incrementScore() {
    updateScore(score + 1);
}


