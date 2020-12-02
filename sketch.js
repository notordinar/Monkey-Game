var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground, invisibleGround, groundImage;
var score=0;
var ground;
var monkeyStop;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyStop = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  invisibleGround = createSprite(0,350,800,15);
  invisibleGround.visible = false;
 
}



function setup() {
  
  ground = createSprite(0,350,800,15);
  monkey = createSprite(40,300,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collided",monkeyStop);
  monkey.scale = 0.15;
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background(180);
  if(gameState === PLAY){
   survivalTime=Math.ceil(frameCount/frameRate());
  if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 1.0;
  bananas();
  obstacles();
  if(bananaGroup.isTouching(monkey)){
    score = score + 2;
    bananaGroup.destroyEach();
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
    bananaGroup.destroyEach();
    }
  }
  else if(gameState=== END){
    monkey.changeAnimation("collided",monkeyStop);
    monkey.velocityX = 0;
   // frameRate = 0;
  }
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score, 300, 20);
  stroke("black");
  fill("black");
  
  text("Survival Time "+ survivalTime,10,20);
  monkey.collide(invisibleGround);
  drawSprites();
}
function bananas(){
  if (frameCount % 80 === 0) {
    banana = createSprite(600,180,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}
function obstacles(){
  if(frameCount % 300===0){
    obstacle = createSprite(600,310,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}