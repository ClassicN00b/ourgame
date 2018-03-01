/*global Phaser*/
/*global game*/


this.game_state.death = function(){};

this.game_state.death.prototype ={
    
    preload: function(){
        
        
        
        
        
        
        
        
    },
    
    
    create: function(){
        
        game.stage.backgroundColor = "#FFFF33";
        
        
        var deathStyle = {font: 'bold 40pt Arial', align:'left', wordWrap: true, wordWrapWidth: 800};
        
        this.game.add.text(40, 200, "You died, press R to restart the game.", deathStyle);
        

        
        
        this.r = game.input.keyboard.addKey(Phaser.Keyboard.R);
        
    },
    
    
    
    
    update:function(){
        
         if (this.r.isDown){
            
            game.state.start('menu');
            
            
        }
        
        
        
        
    },
    
    
    
    
    
    
    
};

game.state.add('death', game_state.death);
//game.state.start('death');
