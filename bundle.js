(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Game = (function () {
  function Game(width, height) {
    _classCallCheck(this, Game);

    this.game = new Phaser.Game(width, height, Phaser.AUTO, 'fancy pancy', { create: this.create, update: this.update });
  }

  _createClass(Game, [{
    key: 'create',
    value: function create() {
      var fs = require('./shaders/lightwave.frag')();

      this.sprite = this.game.add.sprite();
      this.filter = new Phaser.Filter(this.game, null, fs);
      this.filter.setResolution(this.game.width, this.game.height);

      this.sprite.width = this.game.width;
      this.sprite.height = this.game.height;
      this.sprite.filters = [this.filter];
    }
  }, {
    key: 'update',
    value: function update() {
      this.filter.update();
    }
  }]);

  return Game;
})();

new Game(800, 600);

},{"./shaders/lightwave.frag":2}],2:[function(require,module,exports){
module.exports = function parse(params){
      var template = "precision mediump float; \n" +
" \n" +
"uniform float time; \n" +
"uniform vec2  resolution; \n" +
" \n" +
"#define PI 3.1415926535897932384626433832795 \n" +
" \n" +
"const float position = 0.0; \n" +
"const float scale = 1.0; \n" +
"const float intensity = 1.0; \n" +
" \n" +
"// varying vec2 surfacePosition; \n" +
"// vec2 pos; \n" +
" \n" +
"float band(vec2 pos, float amplitude, float frequency) { \n" +
"   float wave = scale * amplitude * sin(1.0 * PI * frequency * pos.x + time) / 2.05; \n" +
"   float light = clamp(amplitude * frequency * 0.02, 0.001 + 0.001 / scale, 5.0) * scale / abs(wave - pos.y); \n" +
"   return light; \n" +
"} \n" +
" \n" +
"void main() { \n" +
" \n" +
"   vec3 color = vec3(1.5, 0.5, 10.0); \n" +
"   color = color == vec3(0.0)? vec3(10.5, 0.5, 1.0) : color; \n" +
"   vec2 pos = (gl_FragCoord.xy / resolution.xy); \n" +
"   pos.y += - 0.5; \n" +
"   float spectrum = 0.0; \n" +
"   const float lim = 28.0; \n" +
"   #define time time*0.037 + pos.x*10. \n" +
"   for(float i = 0.0; i < lim; i++){ \n" +
"      spectrum += band(pos, 1.0*sin(time*0.1/PI), 1.0*sin(time*i/lim))/pow(lim, 0.25); \n" +
"   } \n" +
" \n" +
"   spectrum += band(pos, cos(10.7), 2.5); \n" +
"   spectrum += band(pos, 0.4, sin(2.0)); \n" +
"   spectrum += band(pos, 0.05, 4.5); \n" +
"   spectrum += band(pos, 0.1, 7.0); \n" +
"   spectrum += band(pos, 0.1, 1.0); \n" +
" \n" +
"   gl_FragColor = vec4(color * spectrum, spectrum); \n" +
" \n" +
"} \n" +
" \n" 
      params = params || {}
      for(var key in params) {
        var matcher = new RegExp("{{"+key+"}}","g")
        template = template.replace(matcher, params[key])
      }
      return template
    };

},{}]},{},[1]);
