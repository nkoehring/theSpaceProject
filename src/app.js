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
    this.player = this.game.add.sprite(100, 100, 'player')
    this.player.width = 64
    this.player.height = 64
    this.game.physics.arcade.enable(this.player)
    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  update() {
    var player = this.player,
        velocity = player.body.velocity,
        cursors = this.cursors

    if(velocity.x < 0) velocity.x += 10
    else if(velocity.x > 0) velocity.x -= 10

    if(velocity.y < 0) velocity.y += 10
    else if(velocity.y > 0) velocity.y -= 10

    if(cursors.left.isDown) velocity.x = -200
    else if(cursors.right.isDown) velocity.x = 200

    if(cursors.up.isDown) velocity.y = -200
    else if(cursors.down.isDown) velocity.y = 200
  }

}

new Game(800, 600)
