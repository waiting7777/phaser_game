var RPG = RPG || {}

RPG.GameState = {

    init: function(currentLevel){

        this.currentLevel = currentLevel ? currentLevel : 'map1'

        this.PLAYER_SPEED = 90

        this.game.physics.arcade.gravity.y = 0

        this.cursors = this.game.input.keyboard.createCursorKeys()

    },
    create: function(){

        this.game.onscreenControls = this.game.plugins.add(Phaser.Plugin.OnscreenControls)

        this.loadLevel()
    },
    update: function(){

        this.game.physics.arcade.collide(this.player, this.collisionLayer)

        this.physics.arcade.overlap(this.player, this.items, this.collect, null, this)

        this.player.body.velocity.x = 0
        this.player.body.velocity.y = 0

        if(this.cursors.left.isDown || this.player.btnsPressed.left || this.player.btnsPressed.upleft || this.player.btnsPressed.downleft){
            this.player.body.velocity.x = -this.PLAYER_SPEED
            this.player.scale.setTo(1, 1)
        }

        if(this.cursors.right.isDown || this.player.btnsPressed.right || this.player.btnsPressed.upright || this.player.btnsPressed.downright){
            this.player.body.velocity.x = this.PLAYER_SPEED
            this.player.scale.setTo(-1, 1)
        }
        if(this.cursors.up.isDown || this.player.btnsPressed.up || this.player.btnsPressed.upright || this.player.btnsPressed.upleft){
            this.player.body.velocity.y = -this.PLAYER_SPEED
        }
        if(this.cursors.down.isDown || this.player.btnsPressed.down || this.player.btnsPressed.downright || this.player.btnsPressed.downleft){
            this.player.body.velocity.y = this.PLAYER_SPEED
        }

        if(this.game.input.activePointer.isUp){
            this.game.onscreenControls.stopMovement()
        }

        if(this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0){
            this.player.play('walk')
        }
        else{
            this.player.animations.stop()
            this.player.frame = 0
        }

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

        this.items = this.add.group()

        var potion = new RPG.Item(this, 100, 150, 'potion', { health: 10 })
        this.items.add(potion)

        var sword = new RPG.Item(this, 100, 180, 'sword', { attack: 2 })
        this.items.add(sword)

        var shield = new RPG.Item(this, 100, 210, 'shield', { defense: 2 })
        this.items.add(shield)

        var chest = new RPG.Item(this, 100, 240, 'chest', { gold: 100 })
        this.items.add(chest)

        var quest = new RPG.Item(this, 100, 270, 'quest', { isQuest: true, questCode: 'magic-scroll' })
        this.items.add(quest)

        this.initGUI()

    },
    gameOver: function(){
        this.game.state.start('Game', true, false, this.currentLevel)
    },
    initGUI: function(){
        this.game.onscreenControls.setup(this.player, {
            left: true,
            right: true,
            up: true,
            down: true,
            upleft: true,
            downleft: true,
            upright: true,
            downright: true,
            action: true
        })
    },
    collect: function(player, item){
        this.player.collectItem(item)
    }

}