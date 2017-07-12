var Achicken = Achicken || {}

Achicken.GameState = {

    init: function(currentLevel){

        this.MAX_DISTANCE_SHOOT = 190
        this.MAX_SPEED_SHOOT = 1000
        this.SHOOT_FACTOR = 12

        this.currentLevel = currentLevel ? currentLevel : 'level1'

        this.game.physics.p2.gravity.y = 1000

        this.blocksCollisionGroup = this.game.physics.p2.createCollisionGroup()
        this.enemiesCollisionGroup = this.game.physics.p2.createCollisionGroup()
        this.chickensCollisionGroup = this.game.physics.p2.createCollisionGroup()

    },
    create: function(){

        this.sky = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sky')
        this.game.world.sendToBack(this.sky)

        this.blocks = this.add.group()
        this.blocks.enableBody = true
        this.blocks.physicsBodyType = Phaser.Physics.P2JS

        this.floor = this.add.tileSprite(this.game.world.width/2, this.game.world.height - 24, this.game.world.width, 48, 'floor')
        this.blocks.add(this.floor)

        this.floor.body.setCollisionGroup(this.blocksCollisionGroup)
        this.floor.body.collides([this.blocksCollisionGroup, this.enemiesCollisionGroup])
        this.floor.body.static = true

        this.loadLevel()

    },
    update: function(){

    },
    gameOver: function(){
        this.game.state.start('Game', true, false, this.currentLevel)
    },
    loadLevel: function(){
        this.levelData = JSON.parse(this.game.cache.getText(this.currentLevel))

        this.levelData.blocks.forEach(function(block){
            this.createBlock(block)
        }, this)
    },
    createBlock: function(data){
        var block = new Phaser.Sprite(this.game, data.x, data.y, data.asset)
        this.blocks.add(block)

        block.body.mass = data.mass

        block.body.setCollisionGroup(this.blocksCollisionGroup)

        block.body.collides([this.blocksCollisionGroup, this.enemiesCollisionGroup])

        return block
    }

}