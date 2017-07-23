var HexGame = HexGame || {}

HexGame.Unit = function(state, data){
    
    var position = state.board.getXYFromRowCol(data.row, data.col)
    
    Phaser.Sprite.call(this, state.game, position.x, position.y, data.asset)
    
    this.game = state.game
    this.state = state
    this.board = state.board
    this.row = data.row
    this.col = data.col
    this.data = data

    this.anchor.setTo(-0.1, -0.25)
    
}

HexGame.Unit.prototype = Object.create(Phaser.Sprite.prototype)
HexGame.Unit.prototype.constructor = HexGame.Unit

HexGame.Unit.prototype.showMovementOptions = function(){
    if(this.state.uiBlocked){
        return
    }

    var currTile = this.board.getFromRowCol(this.row, this.col)

    var adjacentCells = this.board.getAdjacent(currTile, true)

    adjacentCells.forEach(function(tile){
        
        tile.alpha = 0.7

        tile.events.onInputDown.add(this.moveUnit, this)
    }, this)
}

HexGame.Unit.prototype.moveUnit = function(){
    console.log('move unit')
}