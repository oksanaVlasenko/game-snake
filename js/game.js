const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/bg5.png";

const foodImg = new Image();
foodImg.src = "img/foodimg1.png";

let box = 32;
let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event){
    if(event.keyCode == 37 && dir != "right") 
        dir = "left";
    else if(event.keyCode == 38 && dir != "down")
        dir = "up"; 
    else if(event.keyCode == 39 && dir != "left")
        dir = "right";
    else if(event.keyCode == 40 && dir != "up")
        dir = "down";
}

function eatTail(head, arr) {
    for(let i = 0; i<arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y)
        endDraw();
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = i == 0 ? "pink" : "#8be1f7";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box*2.5, box*1.9);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        };
    } else {
        snake.pop();
    }

    if(snakeX < box || snakeX > box*17 
        || snakeY < 3 * box || snakeY > box * 17){
            endDraw();
            setTimeout(() => {
                swal({
                    classname: "swal-modal",
                    title: 'You loose...\nDo you want to try again?',
                    button: {
                      text: "Yes, start!",
                      classname: "swal-title",
                      closeModal: false,
                    },
                  })
                  .then(() => {
                    startDraw();
                })                 
            }, 1000);  
        }
         
    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);

    if(snake.length >= 15){
        endDraw ();
        swal({
            title: "You are winner!!! \nCongratulation",
            text: "Do you want to win once again?",
            classname: "swal-modal",
            classname: "swal-text",
            button: {
                text: "Yes, start!",
                classname: "swal-title",
                closeModal: false,
            },
          })
          .then(() => {
                startDraw();
            })
    }
}

let game = setInterval(drawGame, 100);

const startBtn = document.getElementById("start");
const endBtn = document.getElementById("end");

function startDraw() {
    setTimeout(() => {
        document.location.reload(true);
    }, 0);
}

function endDraw() {
    clearInterval(game);
    
}

startBtn.addEventListener("click", startDraw);
endBtn.addEventListener("click", endDraw);