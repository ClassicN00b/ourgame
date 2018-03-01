game_state.story = function(){};

game_state.story.prototype = {
    preload: function(){
        
        this.game.load.image("bg2", "assets/bg2.png");
        this.game.load.image("player", "assets/allanPaskel.png");        

        

    },
   
    create: function(){
        
        
        this.game.add.tileSprite(0, 0, 1024, 612, "bg2");
        
        
        var storyStyle = {font: "30pt bold Courier", fill: "#FFFF33", wordWrap: true, wordWrapWidth: 1024};
        
        
        
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        
        this.game.add.image(465, 200, "player");
        
        
        var firstText = this.game.add.text(40, 420, "Boofy, you must fulfill your destiny and destroy these bombies.", storyStyle);
        var isFirstTextDone = false;
        
        
        game.time.events.add(Phaser.Timer.SECOND * 3, fadeFirstText, this);
        
        
        
  
        function fadeFirstText() {

            game.add.tween(firstText).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            isFirstTextDone = true;
            
            
        } 
 
        
        if (isFirstTextDone == true){
            
            var secondText = this.game.add.text(40, 420, "Use the UP key to jump, the DOWN key to crouch, and SPACEBAR to shoot bullets.", storyStyle);
            
            
        }
        
        

    },

 

   
        
    
    update:function(){
        
        
        if(this.space.isDown){
            
            
            game.state.start('main');
    
    
       }
    
    
    
    },
    
    
}


game.state.add('story',game_state.story);
//game.state.start('story');