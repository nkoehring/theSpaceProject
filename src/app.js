require("browserify-shader").extensions = ["frag", "vert", "c"]

function Game() {

  var game, filter

  var WIDTH = 800
  var HEIGHT = 600

  var fragment = require('./shaders/lightwave.frag')

  function create() {
    var sprite = game.add.sprite()

    filter = new Phaser.Filter(game, null, fragment())
    filter.setResolution(WIDTH, HEIGHT)

    sprite.width = WIDTH
    sprite.height = HEIGHT
    sprite.filters = [filter]
  }


  function update() {
    filter.update()
  }


  function Game() {

    game = new Phaser.Game(
      WIDTH,
      HEIGHT,
      Phaser.AUTO,
      'lightwave shader example',
      { create: create, update: update }
    );

    return game
  }

  return Game()
}

new Game
