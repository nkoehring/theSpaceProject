var isArray = require('lodash/lang/isArray'),
    isFunction = require('lodash/lang/isFunction'),
    isNumber = require('lodash/lang/isNumber'),
    DEFAULT_PRIORITY = 1000,
    instance

/**
 * General purpose prioritised message handler stack.
 */
class MessageQueue {

  constructor() {
    if(!instance) instance = this // singleton ftw!

    this._listeners = {}

    return instance
  }


  _getListeners(msg) {
    var listeners = this._listeners[msg]
    if(!listeners) this._listeners[msg] = listeners = []

    return listeners
  }


  _addListener(msg, newListener) {
    var listeners = this._getListeners(msg),
        existingListener, i

    for(i = 0; !!(existingListener = listeners[i]); i++) {
      if(existingListener.priority < newListener.priority) {
        listeners.splice(i, 0, newListener)
        return
      }
    }

    // for/else would be super useful here
    // this only happens if there was no existing listener to be prepended
    listeners.push(newListener)
  }


  on(msgs, priority, callback) {

    msgs = isArray(msgs) ? msgs : [ msgs ]

    // make it possible to omit priority argument
    if( isFunction(priority) && callback === undefined ) {
      callback = priority
      priority = DEFAULT_PRIORITY
    }
    if( !isNumber(priority) ) {
      priority = DEFAULT_PRIORITY
      console.err("Priority needs to be a number. Default substituted.")
    }

    callback.__priority = priority
    msgs.forEach( (msg) => this._addListener(msg, callback) )

  }


  once(msg, priority, callback) {
    //TODO: wrap a selfdeleting function around the callback
  }


  off(msg, callback) {
    var listeners = this._getListeners(msg),
        listener, i

    if(isFunction(callback)) {

      // step backwards through the list and remove listeners
      // (backwards because we would kill our index with splice otherwise)
      for(i = listeners.length - 1; !!(listener = listeners[i]); i--) {
        if(listener === callback) listeners.splice(i, 1)
      }

    } else if(!callback) {

      listeners.length = 0

    } else {
      console.err("callback should be either a function or something falsy")
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
  send(msg) {
    var listeners = this._getListeners(msg),
        args = Array.prototype.slice.call(arguments, 1),
        listener, i

    // No listeners for this message? nothing to do!
    if(listeners.length === 0) {
      console.warn("No listeners for \"" + msg + "\" specified.")
    }

    //TODO: stopPropagation and preventDefault?
    for(i = 0; !!(listener = listeners[i]); i++) {
      listener.apply(null, args)
    }
  }

}

module.exports = MessageQueue
