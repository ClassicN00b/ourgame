game_state.story = function(){};

game_state.story.prototype = {
    preload: function(){
        this.game.load.image('background', 'assets/graveyard.jpg')
        game.load.image('zombie', 'assets/zombie.png');
        game.load.image('bullet','assets/bullet.1.png');
        game.load.spritesheet('player', 'assets/player.png', 96, 144);

        

    },
   
    create: function(){
        
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        game.add.tileSprite(0, 0, 1024, 512, 'background');
        
         this.text = game.add.text(0, 0, "Long ago when humans rule the world ...", {font: "26px Times", fill: "#ffffff"})
         game.time.events.add(2000, function() {    game.add.tween(this.text).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    game.add.tween(this.text).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);

        this.game.time.events.add(2000,function(){
            this.text = this.game.add.text(0,30, "A scientist by the name of Bob Dujrektoken wanted to create eternal life ",{font: "26px Times", fill: "#ffffff"} )
             game.time.events.add(3000, function() {    game.add.tween(this.text).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    game.add.tween(this.text).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
        })

            game.time.events.add(6000, function(){
                this.text = this.game.add.text(0,30, "He experimented over and over again until finally he was able to sustain  \n  life without food or water ",{font: "26px Times", fill: "#ffffff"} )
                game.time.events.add(3000, function() {    game.add.tween(this.text).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    game.add.tween(this.text).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
        }) 
            game.time.events.add(11000, function(){
                this.text = this.game.add.text(0,30, " Now he's come back to fix his mistake... ",{font: "26px Times", fill: "#ffffff"} )
                game.time.events.add(3000, function() {    game.add.tween(this.text).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    game.add.tween(this.text).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
        })


        game.time.events.add(14000, function(){
        
            this.brainstext = this.game.add.text(420,300,"BRAINS!!!",{font: "26px Times", fill: "#ffffff"} )
            game.time.events.add(1500, function() {
                this.brainstext.destroy();
                this.nottoday = this.game.add.text(180, 305,"Not Today", {font:"26px Times", fill: "#ffffff"})
                game.time.events.add(1500,function(){
                    this.nottoday.destroy();
                    this.space = this.game.add.text(220,300,"PRESS SPACEBAR")
                    game.time.events.add(1000,function(){
                        space.destroy();
                    })
                })
                
            });
        });
        
        
        game.physics.startSystem(Phaser.Physics.Arcade);

        this.zombie = game.add.sprite(500, 350, 'zombie')
        this.player = game.add.sprite(100, 340, 'player')
    
        
        game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        this.player.body.immovable = true;
        this.space1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.zombie = game.add.group();
        this.bullets = game.add.group();
        this.zombie.enableBody = true;
        this.bullets.enableBody = true;
        
    },

   
        
    
    update:function(){
    if(this.space.isDown){
        
        
        this.bullet = this.bullets.create(this.player.body.x+30, this.player.body.y, "bullet");
                this.bullet.body.velocity.x = 200
                game.time.events.add(1600,function(){
                    game.state.start('main')
                    });
        
    
    }
    
    game.physics.arcade.overlap(this.bullet, this.zombie, this.zombieKill, null, this);
    
    },
     zombieKill: function(bullet, zombie){
        zombie.kill();
        bullet.kill();
    },
    
}
game.state.add('story',game_state.story);
game.state.start('story');