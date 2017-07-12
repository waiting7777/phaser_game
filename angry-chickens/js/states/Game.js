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

        this.box = this.add.sprite(100, 100, 'box')
        this.blocks.add(this.box)

        this.box.body.setCollisionGroup(this.blocksCollisionGroup)
        this.box.body.collides(this.blocksCollisionGroup)

        var box2 = this.add.sprite(120, 200, 'box')
        this.blocks.add(box2)

        box2.body.setCollisionGroup(this.blocksCollisionGroup)
        box2.body.collides(this.blocksCollisionGroup)

    },
    update: function(){

    },
    gameOver: function(){
        this.game.state.start('Game', true, false, this.currentLevel)
    }

}