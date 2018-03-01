/*global Phaser*/

var game = new Phaser.Game(1000, 600, Phaser.AUTO, '');
var game_state = {};
var ammo = 0; 
var ammotext;
var zombieskilled = 0;
var zombiekilledtext;
var life = 3;
var lifetext;
var bulletTime = 0;
game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.spritesheet('player', 'assets/player.png', 96, 144);
        game.load.image('object', 'assets/ammo.png');
        game.load.image('zombie', 'assets/zombie.png');
        game.load.image('bullet','assets/newbullet.png');
        
        this.game.load.image('background',"graveyard.1.jpg");
        
    },

    create: function() {

        //set background color
        // game.stage.backgroundColor = '#6495ED';
        game.add.tileSprite(0, 0, 1024, 612, 'background');
        //start arcade physics system
        game.physics.startSystem(Phaser.Physics.Arcade);

        // add player at bottom of screen
        this.player = game.add.sprite(200, 400, 'player');
        this.player.animations.add('left',[3, 4,5,], 10, true);
        this.player.animations.add('right',[0,1,2], 10, true);
        
        game.physics.arcade.enable(this.player);
        this.player.body.bounce. y = .2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        this.player.enableBody = true;
        this.player.body.immovable = true;
        
        
        //this is registering the keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.space1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.objects = game.add.group();
        this.zombie = game.add.group();
        this.bullets = game.add.group();
        

        this.objects.enableBody = true;
        this.zombie.enableBody = true;
        this.bullets.enableBody = true;
        

        //anchor this object to _this variable
        var _this = this;

        setInterval(function() {

            var zombie = _this.zombie.create(Math.random() * 1000, -64, 'zombie');
            zombie.body.gravity.y = 500;

        }, 200)
        
        
         setInterval(function() {

            var object = _this.objects.create(Math.random() * 1000, -64, 'object');
            object.body.gravity.y = 300;

        }, 200)

              ammotext = game.add.text(16, 42, 'Ammo:' + ammo, { fontSize: '32px Arial', fill: '#ffffff' });
              zombiekilledtext = game.add.text(16, 68, 'Zombies Killed:' + zombieskilled, { fontSize: '32px Arial', fill: '#ffffff' });
              lifetext = game.add.text(16, 18, 'Life:' + life, { fontSize: '32px Arial', fill: '#ffffff' });


    },

    update: function() {
       
        if (this.left.isDown) {
            this.player.body.velocity.x = -300;
            this.player.animations.play('left');
        }

        else if (this.right.isDown) {
            this.player.body.velocity.x = 300;
            this.player.animations.play('right');
        }
        else { 
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.frame = 6;
        }
        
     
        
        if(this.space1.isDown && ammo>0){
            
             if (game.time.now > bulletTime)
                {
                bulletTime = game.time.now + 200;
                this.bullet = this.bullets.create(this.player.body.x+30, this.player.body.y+30, "bullet");
                this.bullet.body.velocity.y = -600 ;
                ammo -=1;
                ammotext.text =  'Ammo:' + ammo;
                }   
        }
        
        
        
        //this is the command that checks if objects collide
        // (first object, second object, the name of the function, null, this)

        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);
        game.physics.arcade.overlap(this.player, this.zombie, this.zombieBite, null, this); 
        //game.physics.arcade.overlap(this.bullet, this.zombie, this.zombieKill, null, this);
        game.physics.arcade.collide(this.bullets, this.zombie, this.zombieKill, null, this);

    },

    hitObject: function(player, object) {
        object.kill();
        ammo += 1; 
        ammotext.text =  'Ammo:' + ammo;
        
        game.time.events.add(0000, function() {    game.add.tween(this.text).to({y:200}, 1000, Phaser.Easing.Linear.None, true);    game.add.tween(this.text).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);}, this);
        this.text = this.game.add.text(object.x,object.y, "+1 Ammo",{font: "26px Arial", fill: "#ffffff"} );

    }, 
    
    zombieBite: function(player, zombie){
        player.kill();
        
        life -=1;
        if(life>0){
            player.reset(240,350);
            lifetext.text =  'Life:' + life;
            
        }
        if (life === 0){
            lifetext.text =  'Life:' + life;
        }
        
        
        
    },
    
    zombieKill: function(bullet, zombie){
        zombie.kill();
        bullet.kill();
        zombieskilled +=1;
        zombiekilledtext.text = 'Zombies Killed:' + zombieskilled;
    },
    
    

};


game.state.add('main', game_state.main);
game.state.start('main');
