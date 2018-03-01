/*global Phaser*/
/*global Timer*/


var game = new Phaser.Game(1000, 600, Phaser.AUTO, '');
var game_state = {};
var bulletTime = 0;

var counterText;
var counter = 0;
var facing = 'right';

// var facingRight = true;







game_state.main = function() {};
game_state.main.prototype = {
    
    preload: function(){
        
        game.load.spritesheet("player","assets/main.png",84,72,16);
        game.load.image("background", "assets/bg.png");
        game.load.image("background2","assets/bg2.png");
        game.load.image("ground","assets/platform.png");

        
        
        //REMEMBER TO CHANGE THE PLAYER IMAGE INTO A SPRITESHEET
      //  game.load.image("player", "assets/allanPaskel.png");
        
        //REMEMBER TO CHANGE THE ZOMBIE IMAGE INTO A SPRITESHEET
        game.load.image("zombie", "assets/zombie.png");
        
        game.load.spritesheet("bullet","assets/newbullet.png", 14, 9, 3);
        game.load.spritesheet("leftbullet","assets/leftbullet.png", 14, 9, 4);

    },
    
    
    
    
    
    

    create: function(){
        
        
        counter = 0;
        
        game.time.desiredFps = 30;
        
        game.add.tileSprite(0, 0, 1024, 612,"background");
        
        //start arcade physics system
        game.physics.startSystem(Phaser.Physics.Arcade);

        
        
        

        
       //multiple ground creation
       
       
        this.ground = this.add.physicsGroup();
        

        
        this.ground.create(0, 350, 'ground');
        this.ground.create(0, 550, 'ground');

        this.ground.create(325, 100, 'ground');
        this.ground.create(620, 350, 'ground');
        this.ground.create(620, 550, 'ground');
    

        
        
        this.ground.setAll('body.allowGravity', false);

        this.ground.setAll('.enableBody', true);
        

        this.ground.setAll('body.immovable', true);

        this.ground.setAll('scale.x', 0.5);
        this.ground.setAll('scale.y', 0.5);                
        
     
      


       
       
       
    
        
        
        //COME BACK TO THIS AND FIX as a spritesheet, on lines 32 and 33
        //meant to add player at bottom of screen
        this.player = game.add.sprite(20, 40, 'player');
        this.player.scale.setTo(1);
        this.player.anchor.x=0;
        this.player.anchor.y=1;
        this.player.animations.add('left',[8,9,10,11,12,13,14,15,16], 10, true);
        this.player.animations.add('right',[0,1,2,3,4,5], 7, true);
        
        
        // player.animations.add('left', [0, 1, 2, 3], 10, true);
        // player.animations.add('turn', [4], 20, true);
        // player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        
        game.physics.arcade.enable(this.player);
        this.player.body.bounce. y = .4;
        this.player.body.gravity.y = 400;
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(100, 50, 50, 25);
        
        

        
        
        //creation of bullets group
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
    
    
        //creation of zombies group
        this.zombie = game.add.group();
        this.zombie.scale.setTo(0.5);
    
    
        
        //enable bodies for all sprites
        this.zombie.enableBody = true;
        this.player.enableBody = true;

        
        
        
        //this is registering the keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.space1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.p = game.input.keyboard.addKey(Phaser.Keyboard.P);
        
        
        


        
        
        //pause portion
        
        var styleBoofy = {font: "bold 20px arial", fill: "#FFFF33"};
        var pausetext = game.add.text(0, 0, "Pause", styleBoofy);


        pausetext.inputEnabled = true;
        
        
        pausetext.events.onInputUp.add(function(){
             game.paused = true;
        });
        
         game.input.onDown.add(unpause, window.self); 
        
        function unpause(event){
            if(game.paused){
                game.paused = false;
            }
        }
        
        
        //anchor this object to _this variable
        
        
        var _this = this;
        
        
        
        
        
        
        
        
        
        //SPAWNS ZOMBIES
        
        
        
        game.time.events.loop(Phaser.Timer.SECOND, makeZombies, this);
        
        
        function makeZombies(){
            
            
            var zombie = _this.zombie.create(1600, (Math.random() * 800), 'zombie');
            zombie.scale.setTo(0.5, 0.5);
            
            zombie.body.setSize(10, 50, 50, 25);
            
            
            zombie.body.gravity.y = 50;            
            
        }
        
        
        
        
        
        
        
        
        
        counterText = game.add.text(100, 0 ,"Bombies Killed:" + counter , styleBoofy);   


    },
    
    
    
    update: function(){
        
        
                
    
    
    game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);
    game.physics.arcade.overlap(this.player, this.zombie, this.zombieBite, null, this);        
    game.physics.arcade.collide(this.bullets, this.zombie, this.zombieKill, null, this); 

    game.physics.arcade.collide(this.player, this.ground);   
    game.physics.arcade.collide(this.zombie, this.ground);   
        
        
        // Sprite debug info
    game.debug.spriteInfo(this.player, 400,200);
    game.debug.inputInfo(400, 300);
    game.debug.body(this.player);
    
    //  game.debug.spriteInfo(this.ground, 400,200);
    // game.debug.inputInfo(400, 300);
    game.debug.body(this.zombie);
    
    
    
    // THE JUMPING
        
        if (this.up.isDown && ((this.player.body.onFloor()) || this.player.body.touching.down)) {
            
            this.player.body.velocity.y = -520;
          }
          

        
        //SHOOTING WHILE STANDING STILL
        
        if (this.space1.isDown){
            
            if(facing =="right"){
                if (game.time.now > bulletTime)
                    {
                    bulletTime = game.time.now + 100;
                    this.bullet = this.bullets.create(this.player.body.x+80, this.player.body.y+28, "bullet");
                    this.bullet.body.velocity.x = 400;
                    this.bullet.animations.add("fly");
                    this.bullet.animations.play('fly', 10, true);
                    }
            
            }
            
            
            if(facing == "left"){
                 if (game.time.now > bulletTime)
                {
                bulletTime = game.time.now + 100;
                this.bullet = this.bullets.create(this.player.body.x-10, this.player.body.y+28, "leftbullet");
                this.bullet.body.velocity.x = -400;
                this.bullet.animations.add('fly', [1, 2, 3], true);
                
                this.bullet.animations.play('fly', 10, true);
                }
                
            } 
            
            
                
                
                
        } 
        
        
        if (this.p.isDown) {
            game.paused = true;
            
        } 
        
        
        if (this.left.isDown) {
            
            
            this.player.body.velocity.x = -300;
            this.player.animations.play('left');
            facing = 'left';
            
            
            //this.player.animations.play("left");  // COME BACK TO THIS
            
            
            
            
            
        } else if (this.right.isDown) {
            
            this.player.body.velocity.x = 300;
            this.player.animations.play("right");    //COME BACK TO THIS
            facing = 'right';
            
        } else if (this.down.isDown){    //CROUCHING ANIMATION
            
           this.player.height = 36;
           
            
          
            
        } else {
            this.player.body.velocity.x = 0;
            this.player.height = 72;
            
            //this.player.animations.stop();     COME BACK TO THIS
            //this.player.frame = 6;      COME BACK TO THIS
            
        }
        

    },
    

    
    
    
    hitObject: function(player, object){
        
        object.kill();

    },
    
    
    zombieBite: function(player, zombie){

        player.kill();
        game.state.start('death');
        
    },

    
    
    
    
        
    zombieKill: function(bullet, zombie){

        zombie.kill();
        bullet.kill();
        counter += 1;
        counterText.setText("Bombies Killed: " + counter);
    },
    

    
    
};


game.state.add('main', game_state.main);
game.state.add('death', game_state.death);
//game.state.start('main'); 