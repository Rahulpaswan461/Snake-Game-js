//board

var blockSize=25;
var rows=20;
var cols=20;
var context;  //It will be used to store the 2D rendering context of the game board.



//snake head
var snakeX=blockSize*5;   //defrim from where the snake will be started in both the x-axis as well as y-axis
var snakeY=blockSize*5;

//prvovide the speed to the snake
var velocityX=0;
var velocityY=0;

//provide the snake a body
var snakeBody=[];

//food
var foodX;
var foodY;

//the game over condition
var game=false;
window.onload=function(){
            board=document.getElementById("board");
            board.height=rows*blockSize;
            board.width=cols*blockSize;
            context=board.getContext("2d");
             placeFood();  //after getting size they will able to displya on the card that's why we call the function before otherwise it will
                 //assign a undefined and we don't want that
            document.addEventListener("keyup",changeDirection);
        setInterval(update,1000/10);
}
function update(){

        if(game==true)
        return;
        context.fillStyle='black';
        context.fillRect(0,0,board.width,board.height);

       //drawing the food
        context.fillStyle="red";
        context.fillRect(foodX,foodY,blockSize,blockSize);
  
         if(snakeX == foodX  && snakeY == foodY)
         {
                snakeBody.push([foodX,foodY]);
                placeFood();
         }

         for(let i=snakeBody.length-1; i > 0; i--)
         {
                snakeBody[i]=snakeBody[i-1];
         }
         if(snakeBody.length)
         {
                snakeBody[0]=[snakeX,snakeY];
         }
        //drawing the snake
        context.fillStyle="lime";
        snakeX+=velocityX*blockSize;
        snakeY+=velocityY*blockSize;
        context.fillRect(snakeX,snakeY,blockSize,blockSize);
        for(let i=0;i<snakeBody.length;i++)
        {
                 context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
        }
      //when the snake go out of the bound
        if(snakeX<0 || snakeX>cols*blockSize || snakeY<0 || snakeY>rows*blockSize)
        {
                game=true;
                alert("The game is over");
        }
        //when the snake touch his own body
        for(let i=0;i<snakeBody.length;i++)
        {
                  if(snakeX== snakeBody[i][0] && snakeY== snakeBody[i][1])
                  {
                         game=true;
                         alert("The game is over")
                  }
        }
}
function changeDirection(e){
          if(e.code == "ArrowUp" && velocityY !=1)
          {
                  velocityX=0;
                  velocityY=-1;
          }
          else if(e.code== "ArrowDown" && velocityY !=-1)
          {
                  velocityX=0;
                  velocityY=1;
          }
          else if(e.code== "ArrowLeft" && velocityX !=1)
          {
                  velocityX=-1;
                  velocityY=0;
          }
          else if(e.code== "ArrowRight" && velocityY !=-1)
          {
                  velocityX=1;
                  velocityY=0;
          }
}
function placeFood(){
          foodX=Math.floor(Math.random()*cols)*blockSize;
          foodY=Math.floor(Math.random()*rows)*blockSize;
}