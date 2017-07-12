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

        this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this)

        this.game.physics.arcade.collide(this.player, this.enemies, this.attack, null, this)

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
            quests: [
                {
                    name: 'Find the Magic Scroll',
                    code: 'magic-scroll',
                    isCompleted: false
                },
                {
                    name: 'Find the Helmet of the Gods',
                    code: 'gods-helmet',
                    isCompleted: false
                }
            ]
        }

        this.player = new RPG.Player(this, 100, 100, playerData)

        this.add.existing(this.player)

        this.items = this.add.group()

        this.loadItems()

        this.enemies = this.add.group()
        
        this.enemy = new RPG.Enemy(this, 200, 60, 'monster', {attack: 10, health: 20, defense: 5})
        this.enemies.add(this.enemy)

        this.battle = new RPG.Battle(this.game)

        this.game.camera.follow(this.player)

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

        this.showPlayerIcons()
    },
    collect: function(player, item){
        this.player.collectItem(item)
    },
    showPlayerIcons: function(){

        var style = { font: '14px Arial', fill: '#fff' }

        this.goldIcon = this.add.sprite(10, 10, 'coin')
        this.goldIcon.fixedToCamera = true
        this.goldLabel = this.add.text(30, 10, '0', style)
        this.goldLabel.fixedToCamera = true

        this.attackIcon = this.add.sprite(70, 10, 'sword')
        this.attackIcon.fixedToCamera = true
        this.attackLabel = this.add.text(90, 10, '0', style)
        this.attackLabel.fixedToCamera = true

        this.shieldIcon = this.add.sprite(130, 10, 'shield')
        this.shieldIcon.fixedToCamera = true
        this.shieldLabel = this.add.text(150, 10, '0', style)
        this.shieldLabel.fixedToCamera = true

        this.refreshStats()

    },
    refreshStats: function(){
        this.goldLabel.text = this.player.data.gold
        this.attackLabel.text = this.player.data.attack
        this.shieldLabel.text = this.player.data.defense
    },
    findObjectsByType: function(targetType, tilemap, layer){

        var result = []

        tilemap.objects[layer].forEach(function(element){
            if(element.properties.type == targetType){
                element.y -= tilemap.tileHeight / 2
                element.x += tilemap.tileHeight / 2
                result.push(element)
            }
        }, this)

        return result

    },
    loadItems: function(){
        var elementsArr = this.findObjectsByType('item', this.map, 'objectsLayer')
        var elementObj

        elementsArr.forEach(function(element){
            elementObj = new RPG.Item(this, element.x, element.y, element.properties.asset, element.properties)
            this.items.add(elementObj)
        }, this)
    },
    attack: function(player, enemy){

        this.battle.attack(player, enemy)
        this.battle.attack(enemy, player)

        if(player.body.touching.up){
            player.y += 20
        }
        if(player.body.touching.down){
            player.y -= 20
        }
        if(player.body.touching.left){
            player.x += 20
        }
        if(player.body.touching.right){
            player.x -= 20
        }

    }

}