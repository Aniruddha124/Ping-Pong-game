const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");
canvasContext.font = "30px Arial";
var framesPerSecond = 50;
var ballSpeedX = 5;
var ballX = 50;
var ballY = 10;
var ballSpeedY = 5;
var paddle1Y = 250;
var paddle2Y = 250;
const paddle_height = 100;
const paddle_thickness = 15;
var playerScore = 0;
var computerScore = 0;
const winning_score = 10;
var showWinScreen = false;
var audio = document.getElementById("myaudio");

function playAudio(){
    setInterval(callEverything,1000/framesPerSecond); 
    audio.play();    
}

   
canvas.addEventListener("mousemove",function(e){
    var mousePos = calculateMousePos(e);
    paddle1Y = mousePos.y - (paddle_height/2);
});

canvas.addEventListener("click",function(){
    showWinScreen = false;  
    playerScore = 0;
    computerScore = 0; 
});

// allows us to control the paddle using mouse
function calculateMousePos(e){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = e.clientX - rect.left - root.scrollLeft;
    var mouseY = e.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    }
}

function ballReset(){
    if(playerScore >= winning_score || computerScore >= winning_score){
        showWinScreen = true;
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

//calls both the functions
function callEverything(){
    move();
    draw();
}
function moveComputerPaddle(){
    var paddle2YCenter = paddle2Y + (paddle_height/2);
    if(ballY > paddle2YCenter){
        paddle2Y= paddle2Y +4;
    }
    else{
        paddle2Y = paddle2Y -4;
    }
}

// moves everything the ball and blocks
function move(){
    if(showWinScreen){
        return;
    }
    moveComputerPaddle();
    ballX = ballX+ ballSpeedX;
    ballY = ballY+ ballSpeedY;
    if(ballX >= canvas.width ){
        if(ballY > paddle2Y && ballY < paddle2Y + paddle_height ){
            audio.play();
            ballSpeedX = -ballSpeedX; 
            var deltaY = ballY-(paddle2Y + paddle_height/2);
            ballSpeedY = deltaY * 0.35;
            }
        else{
            playerScore += 1;
            ballReset();  
        }
    }
    if(ballX <= 0 ){
        if(ballY > paddle1Y && ballY < paddle1Y + paddle_height ){
            audio.play();
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY-(paddle1Y + paddle_height/2);
            ballSpeedY = deltaY * 0.35;
            }
        else{
            computerScore += 1;
            ballReset();
        }
    }
    if(ballY >= canvas.height){
        ballSpeedY = -ballSpeedY;
    }
  
    if(ballY <= 0 ){
        ballSpeedY = -ballSpeedY;
    }
}
function drawNet(){
    for(var i=0;i<canvas.height;i+=30){
        canvasContext.fillStyle = "white";
        canvasContext.fillRect(canvas.width/2 - 1,i,2,20);
    }
}

// draws the canvas and other components
function draw(){
    // the background for the game
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    if(showWinScreen){
        if(playerScore == winning_score){
            canvasContext.fillStyle = "white";
            canvasContext.fillText ("Player wins",310,210);
        }else{
            canvasContext.fillStyle = "white";
            canvasContext.fillText ("Computer wins",310,210);
        }
        canvasContext.fillStyle = "white";
        canvasContext.fillText ("Click to continue",300,300);
        return;
    }
    drawNet();
    //player paddle
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(0,paddle1Y,paddle_thickness,paddle_height);
    //computer paddle
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(canvas.width-15,paddle2Y,paddle_thickness,paddle_height);
    //ball
    canvasContext.fillStyle = "red";
    canvasContext.beginPath();
    canvasContext.arc(ballX,ballY,10,0,Math.PI*2,true);
    canvasContext.fill();
    //score board
    canvasContext.fillStyle = "white";
    canvasContext.fillText(playerScore ,100,100);
    canvasContext.fillText(computerScore ,canvas.width-100,100);

}


