var MessageQueue = require('../core/messageQueue')

class Movement {
  constructor(player) {
    var mq = new MessageQueue,
        game = Phaser.GAMES[0],
        cursors = game.input.keyboard.createCursorKeys(),
        velocity

    game.physics.arcade.enable(player)
    velocity = player.body.velocity

    mq.on("phaser.update", () => {

      if(velocity.x < 0) velocity.x += 10
      else if(velocity.x > 0) velocity.x -= 10

      if(velocity.y < 0) velocity.y += 10
      else if(velocity.y > 0) velocity.y -= 10

      if(cursors.left.isDown) velocity.x = -200
      else if(cursors.right.isDown) velocity.x = 200

      if(cursors.up.isDown) velocity.y = -200
      else if(cursors.down.isDown) velocity.y = 200
    })

    console.log("I am movement!", mq._listeners)
  }
}

module.exports = Movement
