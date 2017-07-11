var RPG = RPG || {}

RPG.GameState = {

    init: function(currentLevel){

        this.currentLevel = currentLevel ? currentLevel : 'map1'

        this.PLAYER_SPEED = 90

        this.game.physics.arcade.gravity.y = 0

        this.cursors = this.game.input.keyboard.createCursorKeys()

    },
    create: function(){
        this.loadLevel()
    },
    update: function(){

    },
    loadLevel: function(){
        
        this.map = this.add.tilemap(this.currentLevel)

        this.map.addTilesetImage('terrains', 'tilesheet')

        this.backgrondLayer = this.map.createLayer('backgroundLayer')
        this.collisionLayer = this.map.createLayer('collisionLayer')

        this.game.world.sendToBack(this.backgrondLayer)

        this.map.setCollisionBetween(1, 16, true, 'collisionLayer')

        this.collisionLayer.resizeWorld()

        //create player
        var playerData = {
            //list of items
            items: [],
            
            //player stats
            health: 25,
            attack: 12,
            defense: 8,
            gold: 100,

            //quest
            quests: []
        }

        this.player = new RPG.Player(this, 100, 100, playerData)

        this.add.existing(this.player)

    },
    gameOver: function(){
        this.game.state.start('Game', true, false, this.currentLevel)
    }

}