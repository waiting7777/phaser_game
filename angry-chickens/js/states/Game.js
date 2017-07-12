Achicken.GameState = {

    init: function(currentLevel){

        this.MAX_DISTANCE_SHOOT = 190
        this.MAX_SPEED_SHOOT = 1000
        this.SHOOT_FACTOR = 12

        this.currentLevel = currentLevel ? currentLevel : 'level1'

        this.game.physics.p2.gravity.y = 1000

    },
    create: function(){

        this.sky = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height)
        this.game.world.sendToBack(this.sky)

        this.blocks = this.add.group()
        this.blocks.enableBody = true
        this.blocks.physicsBodyType = Phaser.Physics.P2JS

    },
    update: function(){

    },
    gameOver: function(){
        this.game.state.start('Game', true, false, this.currentLevel)
    }

}