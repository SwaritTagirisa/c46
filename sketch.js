var bg, bgImg;
var player,playerImg;
var npc,npcImg;
var npcGroup;
var lazer,lazerImg;
var lazerSound;
var score = 0;

function preload(){
    bgImg = loadImage("transformerbackground.jpg");
    playerImg = loadImage("transformers1v3.png");
    npcImg = loadImage("transformer2v2.png")
    lazerImg = loadImage("lazer.png")
    lazerSound = loadSound("lazerSound.mp3")
    
}

function setup(){
    createCanvas(700,600)

    bg = createSprite(600,300);
    bg.addImage(bgImg);
    bg.velocityX = -3;
    bg.scale = 1.5;

    player = createSprite(55,470);
    player.addImage(playerImg);
    player.scale = 0.3;

    npcGroup = new Group;
    lazerGroup = new Group;

    score = 0;
    stroke("red");
    fill("red")
    textSize(20);
    
}

function draw(){
    background(0);
    
    if(bg.x < 150){
        bg.x = bg.width/2;
    }

    if(keyDown("UP_ARROW")){
        player.y = player.y-4;
    }

    if(keyDown("DOWN_ARROW")){
        player.y = player.y+4;
    }
    
    if(keyDown("RIGHT_ARROW")){
        player.x = player.x+2;
    }

    if(keyDown("LEFT_ARROW")){
        player.x = player.x-2;
    }
    
    if(keyDown("space")){
        lazer = createSprite(player.x,player.y);
        lazer.addImage(lazerImg);
        lazer.velocityX = 5;
        lazerGroup.add(lazer);
        lazer.scale = 0.25
        lazerSound.play();

    }

    if(lazerGroup.isTouching(npcGroup)){
        lazerGroup[0].destroy();
        npcGroup[0].destroy();
        score = score+10;
    }

    spawnNpc();
    drawSprites();
    text("Score:"+score,300,50);
}

function spawnNpc(){
    if(World.frameCount % 150 === 0){
        npc = createSprite(700,300);
        npc.y = Math.round(random(550,50));
        
        npc.addImage(npcImg);
        npc.velocityX = -(5+ score/30);
        npc.scale = 0.2
        npcGroup.add(npc);
        npc.lifetime = 233;
      
    }
}