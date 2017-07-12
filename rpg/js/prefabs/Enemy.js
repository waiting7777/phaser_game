var RPG = RPG || {}

RPG.Enemy = function(state, x, y, key, data){

    Phaser.Sprite.call(this, state.game, x, y, key)

    this.state = state
    this.game = state.game
    this.data = data
    this.anchor.setTo(0.5)

    this.data.attack = +this.data.attack
    this.data.defense = +this.data.defense
    this.data.health = +this.data.health

    this.game.physics.arcade.enable(this)

}

RPG.Enemy.prototype = Object.create(Phaser.Sprite.prototype)
RPG.Enemy.prototype.constructor = RPG.Enemy