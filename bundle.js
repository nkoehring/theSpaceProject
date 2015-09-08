(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var isNative = require('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":6}],2:[function(require,module,exports){
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],3:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],4:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":1,"../internal/isLength":2,"../internal/isObjectLike":3}],5:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 which returns 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

module.exports = isFunction;

},{"./isObject":8}],6:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObjectLike = require('../internal/isObjectLike');

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isNative;

},{"../internal/isObjectLike":3,"./isFunction":5}],7:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
 * as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isNumber(8.4);
 * // => true
 *
 * _.isNumber(NaN);
 * // => true
 *
 * _.isNumber('8.4');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
}

module.exports = isNumber;

},{"../internal/isObjectLike":3}],8:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],9:[function(require,module,exports){
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
      var MessageQueue = require('./core/messageQueue');
      var Movement = require("./modules/movement");
      var player = this.game.add.sprite(100, 100, 'player');

      player.width = 64;
      player.height = 64;

      this.mq = new MessageQueue();
      this.movement = new Movement(player);

      console.log("after movement…", this.mq._listeners);
    }
  }, {
    key: 'update',
    value: function update() {
      this.mq.send("phaser.update");
    }
  }]);

  return Game;
})();

new Game(800, 600);

},{"./core/messageQueue":10,"./modules/movement":11}],10:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var isArray = require('lodash/lang/isArray'),
    isFunction = require('lodash/lang/isFunction'),
    isNumber = require('lodash/lang/isNumber'),
    DEFAULT_PRIORITY = 1000,
    instance;

/**
 * General purpose prioritised message handler stack.
 */

var MessageQueue = (function () {
  function MessageQueue() {
    _classCallCheck(this, MessageQueue);

    if (!instance) instance = this; // singleton ftw!

    this._listeners = {};

    return instance;
  }

  _createClass(MessageQueue, [{
    key: '_getListeners',
    value: function _getListeners(msg) {
      var listeners = this._listeners[msg];
      if (!listeners) this._listeners[msg] = listeners = [];

      return listeners;
    }
  }, {
    key: '_addListener',
    value: function _addListener(msg, newListener) {
      var listeners = this._getListeners(msg),
          existingListener,
          i;

      for (i = 0; !!(existingListener = listeners[i]); i++) {
        if (existingListener.priority < newListener.priority) {
          listeners.splice(i, 0, newListener);
          return;
        }
      }

      // for/else would be super useful here
      // this only happens if there was no existing listener to be prepended
      listeners.push(newListener);
    }
  }, {
    key: 'on',
    value: function on(msgs, priority, callback) {
      var _this = this;

      msgs = isArray(msgs) ? msgs : [msgs];

      // make it possible to omit priority argument
      if (isFunction(priority) && callback === undefined) {
        callback = priority;
        priority = DEFAULT_PRIORITY;
      }
      if (!isNumber(priority)) {
        priority = DEFAULT_PRIORITY;
        console.err("Priority needs to be a number. Default substituted.");
      }

      callback.__priority = priority;
      msgs.forEach(function (msg) {
        return _this._addListener(msg, callback);
      });
    }
  }, {
    key: 'once',
    value: function once(msg, priority, callback) {
      //TODO: wrap a selfdeleting function around the callback
    }
  }, {
    key: 'off',
    value: function off(msg, callback) {
      var listeners = this._getListeners(msg),
          listener,
          i;

      if (isFunction(callback)) {

        // step backwards through the list and remove listeners
        // (backwards because we would kill our index with splice otherwise)
        for (i = listeners.length - 1; !!(listener = listeners[i]); i--) {
          if (listener === callback) listeners.splice(i, 1);
        }
      } else if (!callback) {

        listeners.length = 0;
      } else {
        console.err("callback should be either a function or something falsy");
      }
    }

    /**
     * Calls listeners for a message (a.k.a. fires an event)
     *
     * @example
     * message.send("foo.bar.baz", add, as_much, data, as_you_like)
     *
     * @param {String} message the message to send
     * @param {...Object} additional arguments to be passed to message callback
     */
  }, {
    key: 'send',
    value: function send(msg) {
      var listeners = this._getListeners(msg),
          args = Array.prototype.slice.call(arguments, 1),
          listener,
          i;

      // No listeners for this message? nothing to do!
      if (listeners.length === 0) {
        console.warn("No listeners for \"" + msg + "\" specified.");
      }

      //TODO: stopPropagation and preventDefault?
      for (i = 0; !!(listener = listeners[i]); i++) {
        listener.apply(null, args);
      }
    }
  }]);

  return MessageQueue;
})();

module.exports = MessageQueue;

},{"lodash/lang/isArray":4,"lodash/lang/isFunction":5,"lodash/lang/isNumber":7}],11:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageQueue = require('../core/messageQueue');

var Movement = function Movement(player) {
  _classCallCheck(this, Movement);

  var mq = new MessageQueue(),
      game = Phaser.GAMES[0],
      cursors = game.input.keyboard.createCursorKeys(),
      velocity;

  game.physics.arcade.enable(player);
  velocity = player.body.velocity;

  mq.on("phaser.update", function () {

    if (velocity.x < 0) velocity.x += 10;else if (velocity.x > 0) velocity.x -= 10;

    if (velocity.y < 0) velocity.y += 10;else if (velocity.y > 0) velocity.y -= 10;

    if (cursors.left.isDown) velocity.x = -200;else if (cursors.right.isDown) velocity.x = 200;

    if (cursors.up.isDown) velocity.y = -200;else if (cursors.down.isDown) velocity.y = 200;
  });

  console.log("I am movement!", mq._listeners);
};

module.exports = Movement;

},{"../core/messageQueue":10}]},{},[9]);
