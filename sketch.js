var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.5;
  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
}

function draw() {
  background(200);
  if (gameState==="play"){
  if (keyDown("space")){
    ghost.velocityY=-8
  }
  if (keyDown("left")){
    ghost.x=ghost.x-3
  }
  if (keyDown("right")){
    ghost.x=ghost.x+3
  }
  ghost.velocityY=ghost.velocityY+0.3
  if(tower.y > 400){
      tower.y = 300
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
      ghost.destroy()
      gameState="end"
    }
    spawnobstacles();
    drawSprites()
  }
  if(gameState==="end"){
    background('black')
    stroke("yellow")
    textSize(40)
    text("gameover",150,200)
  }
}
function spawnobstacles(){
  if (frameCount%240===0){
  door=createSprite(300,10,10,40)
  door.addImage("door",doorImg)
  door.velocityY=1
  door.lifetime=700
  doorsGroup.add(door);
  climber=createSprite(300,60,10,30);
  climber.addImage("climber",climberImg);
  climber.velocityY=1
  climber.lifetime=700  
  climbersGroup.add(climber);
  door.x=Math.round(random(130,240))  
  climber.x=door.x   
  ghost.depth=door.depth
  ghost.depth=ghost.depth+1  
  invisibleBlock=createSprite(300,80,10,30);
  invisibleBlock.height=2
  invisibleBlock.velocityY=1
  invisibleBlock.x=door.x
  invisibleBlock.visible=false
  invisibleBlockGroup.add(invisibleBlock)
}}