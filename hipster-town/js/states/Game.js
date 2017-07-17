var HTown = HTown || {}

HTown.GameState = {

    init: function(){

        this.STEP = 2

        this.game.physics.arcade.gravity.y = 0

    },
    create: function(){

        this.background = this.add.tileSprite(0, 0, 1200, 800, 'grass')
        this.game.world.setBounds(0, 0, 1200, 800)

        this.buildings = this.add.group()

        var house = new HTown.Building(this, 100, 100, {asset: 'house', housing: 100})
        this.buildings.add(house)

        var farm = new HTown.Building(this, 200, 200, {asset: 'crops', food: 100})
        this.buildings.add(farm)

        var factory = new HTown.Building(this, 200, 300, {asset: 'factory', jobs: 20})
        this.buildings.add(factory)

        this.town = new HTown.TownModel({}, {population: 100, food: 200, money: 100}, this.buildings)

        this.simulationTimer = this.game.time.events.loop(Phaser.Timer.SECOND * this.STEP, this.simulationStep, this)

        console.log(5)

    },
    update: function(){

    },
    simulationStep: function(){
        this.town.step()
    }

}