class Game {

  constructor(width, height) {
    this.game = new Phaser.Game(
      width,
      height,
      Phaser.AUTO,
      'fancy pancy',
      { preload: this.preload, create: this.create, update: this.update }
    )
  }

  preload() {
    this.game.stage.backgroundColor = "#F5F0F2"
    this.game.load.image('player', 'assets/ship02.png')
  }

  create() {
    var MessageQueue = require('./core/messageQueue')
    var Movement = require("./modules/movement")
    var player = this.game.add.sprite(100, 100, 'player')

    player.width = 64
    player.height = 64

    this.mq = new MessageQueue
    this.movement = new Movement(player)

    console.log("after movement…", this.mq._listeners)
  }

  update() {
    this.mq.send("phaser.update")
  }

}

new Game(800, 600)
