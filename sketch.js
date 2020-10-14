
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var END=1;
var PLAY=0;
var gameState=PLAY;
var GameOver;
var restart;
var score=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  BananaSound = loadSound("Sound Banana.m4a");
  
 
 monkeyCollide = loadAnimation("sprite_1.png");
}



function setup() {
  
   bananaGroup = new Group();
    foodGroup = new Group();
  obstacleGroup = new Group();
  
 
  
  ground=createSprite(300,332,600,5);
  ground.shapeColor="brown";
  
  
  
   monkey=createSprite(30,300,10,10);
  monkey.addAnimation("running",monkey_running);
   monkey.addAnimation("collide", monkeyCollide);
  monkey.scale=0.1;
}

    
function draw() {
  background("white");
   if(gameState===PLAY){
     ground.velocityX = -6 ;
     background.velocityX = -6 ;
     fill("black");
     text("SURVIVAL TIME: "+score, 230, 20);
      score = score + Math.round(getFrameRate()/60);
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    BananaSound.play();
  }
   
  
   if (ground.x < 100){
         ground.x = ground.width/2;
          }
  
  
  
  if(keyDown("space")&& monkey.y >=295){
    monkey.velocityY=-25;
    
  }
  
  monkey.velocityY = monkey.velocityY+1.0;
  
  monkey.collide(ground);
  
  food();
  obstacles();
     
     if(monkey.isTouching(obstacleGroup)){
    gameState=END;
    
  }
   }
    
  if(gameState===END){
    
    monkey.changeAnimation("collide",monkeyCollide);
   ground.velocityX=0;
    
     textSize(25);
    fill("black");
    text("Game Over!",100,200);
    text("Press 'R'to restart",100,230);
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    
     if (keyDown("r")){
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("running", monkey_running);
      score = 0;
       monkey.x=30;
      gameState = PLAY; 
    }
    
  }
  
  
  
  
  
drawSprites();
  




}



function food(){
  if (World.frameCount%80 === 0){
    
    banana=createSprite(600,300,10,10);
   banana.y=Math.round(random(150,300));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-10           
    banana.lifetime = 200;
    foodGroup.add(banana);
    

    
  }

    }



function obstacles(){
  if(World.frameCount % 200 === 0){
    obstacle=createSprite(600,320,10,10);
    obstacle.addImage("obstacles",obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-10;
    obstacle.lifetime=200;
   
     obstacleGroup.add(obstacle);
  }
   
}









