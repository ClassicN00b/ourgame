

this.game_state.menu = function(){};

this.game_state.menu.prototype = {
    preload: function(){
        
        this.game.load.image("bg2", "assets/bg2.png");
        this.game.load.image("player", "assets/allanPaskel.png");
        this.game.load.image("boofy","assets/Boofy.png");
        this.game.load.image("return","assets/return.png");
        this.game.load.image("space",'assets/pressspace.png');


    },
   
    create: function(){
        
        
        var style1 = {font: "bold 30px Arial", fill: "#FFFF33"};
       
        this.game.add.tileSprite(0, 0, 1024, 612, "bg2"); 
        
        
        var boofy = game.add.sprite(520, 50, 'boofy');
        boofy.anchor.setTo(0.5, 0.5);
        boofy.alpha = 0;
        game.add.tween(boofy).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        
        var second = game.add.sprite(520, 130, 'return');
        second.anchor.setTo(0.5, 0.5);
        second.alpha = 0;
        game.add.tween(second).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        
        var space = game.add.sprite(520, 500, 'space');
        space.anchor.setTo(0.5, 0.5);
        space.alpha = 0;
        game.add.tween(space).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        
        
       // this.boofy = game.add.sprite(350,10,'boofy');
      //  this.return = game.add.sprite(170,100,'return')
       // this.space = game.add.sprite(190,500,"space")
        
        this.game.add.image(465, 200, "player");


        
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
    },

   

    
    update:function(){
    
        
        if (this.space.isDown) {
            
            game.state.start("story");
            

            
        }
        
        
        
   
    },
    
};


game.state.add('menu',game_state.menu);
game.state.start('menu');