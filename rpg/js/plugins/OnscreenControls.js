Phaser.Plugin.OnscreenControls = function(game, parent){

    Phaser.Plugin.call(this, game, parent)

    this.game = game
    console.log('plugin')

}

Phaser.Plugin.OnscreenControls.prototype = Object.create(Phaser.Plugin.prototype)
Phaser.Plugin.OnscreenControls.prototype.constructor = Phaser.Plugin.OnscreenControls