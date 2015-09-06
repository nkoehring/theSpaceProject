class Game {

  constructor(width, height) {
    this.game = new Phaser.Game(
      width,
      height,
      Phaser.AUTO,
      'fancy pancy',
      { create: this.create, update: this.update }
    )
  }

  create() {
    var fs = require('./shaders/lightwave.frag')()

    this.sprite = this.game.add.sprite()
    this.filter = new Phaser.Filter(this.game, null, fs)
    this.filter.setResolution(this.game.width, this.game.height)

    this.sprite.width = this.game.width
    this.sprite.height = this.game.height
    this.sprite.filters = [this.filter]
  }

  update() {
    this.filter.update()
  }

}

new Game(800, 600)
