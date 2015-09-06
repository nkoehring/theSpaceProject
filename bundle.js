(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Game = (function () {
  function Game(width, height) {
    _classCallCheck(this, Game);

    this.game = new Phaser.Game(width, height, Phaser.AUTO, 'fancy pancy', { preload: this.preload, create: this.create, update: this.update });
  }

  _createClass(Game, [{
    key: 'preload',
    value: function preload() {
      this.game.stage.backgroundColor = "#F5F0F2";
      this.game.load.image('player', 'assets/ship02.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.player = this.game.add.sprite(100, 100, 'player');
      this.player.width = 64;
      this.player.height = 64;
      this.game.physics.arcade.enable(this.player);
      this.cursors = this.game.input.keyboard.createCursorKeys();
    }
  }, {
    key: 'update',
    value: function update() {
      var player = this.player,
          velocity = player.body.velocity,
          cursors = this.cursors;

      if (velocity.x < 0) velocity.x += 10;else if (velocity.x > 0) velocity.x -= 10;

      if (velocity.y < 0) velocity.y += 10;else if (velocity.y > 0) velocity.y -= 10;

      if (cursors.left.isDown) velocity.x = -200;else if (cursors.right.isDown) velocity.x = 200;

      if (cursors.up.isDown) velocity.y = -200;else if (cursors.down.isDown) velocity.y = 200;
    }
  }]);

  return Game;
})();

new Game(800, 600);

},{}]},{},[1]);
