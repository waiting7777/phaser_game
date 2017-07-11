var RPG = RPG || {}

RPG.BootState = {
    init: function(){
        this.game.stage.backgroundColor = '#fff'

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

        this.scale.pageAlignHorizontally = true
        this.scale.pageAlignVertically = true

        this.game.physics.startSystem(Phaser.Physics.ARCADE)
    },
    preload: function(){
        this.load.image('bar', 'assets/images/preloader-bar.png')
    },
    create: function(){
        this.state.start('Preload')
    }
}