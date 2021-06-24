var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var cycle2, cycle2_img,cycle2fall;
var cycle3, cycle_img,cycle3fall;

var cycle2_G,cycle3_G;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver, restart;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  cycle2_img = loadAnimation("images/opponent7.png","images/opponent8.png");
  
  cycle2fall = loadAnimation("images/opponent9.png")
  cycle3_img = loadAnimation("images/opponent1.png","images/opponent2.png");
  cycle3fall = loadAnimation("images/opponent3.png")
  
   gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(600,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.06;
  
gameOver = createSprite(250,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  /*cycle2 = createSprite(150,200,20,20);
  cycle2.addAnimation("cycle2run",cycle2_img);
  
  cycle2.scale = 0.07;
  
   cycle3 = createSprite(230,100,20,20);
  cycle3.addAnimation("cycle3run",cycle3_img);
  
  cycle3.scale = 0.07;*/
  
  cycle2_G = new Group();
  cycle3_G = new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(5 + 2*distance/150);
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = 450;
  }
     
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,2));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      cyclist2();
    }
    else {
      cyclist3();
    }
  }
  
   if(cycle2_G.isTouching(mainCyclist)){
     gameState = END;
     cycle2.velocityY = 0;
    cycle2.addAnimation("cycle2run",cycle2fall);
     
    }  
 
     if(cycle3_G.isTouching(mainCyclist)){
     gameState = END;
     cycle3.velocityY = 0;
     cycle3.addAnimation("cycle3run",cycle3fall);
    }
 }
  
  else if (gameState === END) {
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 300,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    
   cycle2_G.setVelocityXEach(0);
    cycle2_G.setLifetimeEach(-1);
  
    cycle3_G.setVelocityXEach(0);
    cycle3_G.setLifetimeEach(-1);
    
    
     if(keyDown("UP_ARROW")) {
      reset();
    }
}
}


function cyclist2(){
       cycle2 =createSprite(1100,Math.round(random(80, 250)));
       cycle2.scale =0.06;
       cycle2.velocityX = -(6 + 2*distance/150);
       cycle2.addAnimation("cycle2run",cycle2_img);
       cycle2.setLifetime=170;
       cycle2_G.add(cycle2);
}

function cyclist3(){
        cycle3 =createSprite(1100,Math.round(random(90, 270)));
        cycle3.scale =0.06;
        cycle3.velocityX = -(6 + 2*distance/150);
        cycle3.addAnimation("cycle3run",cycle3_img);
        cycle3.setLifetime=170;
        cycle3_G.add(cycle3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  cycle3_G.destroyEach();
  cycle2_G.destroyEach();
  
  
  distance = 0;
}
