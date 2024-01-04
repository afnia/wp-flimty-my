"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/******/
(function () {
  // webpackBootstrap

  /******/
  var __webpack_modules__ = {
    /***/
    3159:
    /***/
    function _(module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

      (function (factory) {
        if (true) {
          !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else {}
      })(function () {
        'use strict';

        var scheduleStart, throttleDelay, lazytimer, lazyraf;
        var root = typeof window != 'undefined' ? window : _typeof(__webpack_require__.g) != undefined ? __webpack_require__.g : this || {};
        var requestAnimationFrame = root.cancelRequestAnimationFrame && root.requestAnimationFrame || setTimeout;
        var cancelRequestAnimationFrame = root.cancelRequestAnimationFrame || clearTimeout;
        var tasks = [];
        var runAttempts = 0;
        var isRunning = false;
        var remainingTime = 7;
        var minThrottle = 35;
        var throttle = 125;
        var index = 0;
        var taskStart = 0;
        var tasklength = 0;
        var IdleDeadline = {
          get didTimeout() {
            return false;
          },

          timeRemaining: function timeRemaining() {
            var timeRemaining = remainingTime - (Date.now() - taskStart);
            return timeRemaining < 0 ? 0 : timeRemaining;
          }
        };
        var setInactive = debounce(function () {
          remainingTime = 22;
          throttle = 66;
          minThrottle = 0;
        });

        function debounce(fn) {
          var id, timestamp;
          var wait = 99;

          var check = function check() {
            var last = Date.now() - timestamp;

            if (last < wait) {
              id = setTimeout(check, wait - last);
            } else {
              id = null;
              fn();
            }
          };

          return function () {
            timestamp = Date.now();

            if (!id) {
              id = setTimeout(check, wait);
            }
          };
        }

        function abortRunning() {
          if (isRunning) {
            if (lazyraf) {
              cancelRequestAnimationFrame(lazyraf);
            }

            if (lazytimer) {
              clearTimeout(lazytimer);
            }

            isRunning = false;
          }
        }

        function onInputorMutation() {
          if (throttle != 125) {
            remainingTime = 7;
            throttle = 125;
            minThrottle = 35;

            if (isRunning) {
              abortRunning();
              scheduleLazy();
            }
          }

          setInactive();
        }

        function scheduleAfterRaf() {
          lazyraf = null;
          lazytimer = setTimeout(runTasks, 0);
        }

        function scheduleRaf() {
          lazytimer = null;
          requestAnimationFrame(scheduleAfterRaf);
        }

        function scheduleLazy() {
          if (isRunning) {
            return;
          }

          throttleDelay = throttle - (Date.now() - taskStart);
          scheduleStart = Date.now();
          isRunning = true;

          if (minThrottle && throttleDelay < minThrottle) {
            throttleDelay = minThrottle;
          }

          if (throttleDelay > 9) {
            lazytimer = setTimeout(scheduleRaf, throttleDelay);
          } else {
            throttleDelay = 0;
            scheduleRaf();
          }
        }

        function runTasks() {
          var task, i, len;
          var timeThreshold = remainingTime > 9 ? 9 : 1;
          taskStart = Date.now();
          isRunning = false;
          lazytimer = null;

          if (runAttempts > 2 || taskStart - throttleDelay - 50 < scheduleStart) {
            for (i = 0, len = tasks.length; i < len && IdleDeadline.timeRemaining() > timeThreshold; i++) {
              task = tasks.shift();
              tasklength++;

              if (task) {
                task(IdleDeadline);
              }
            }
          }

          if (tasks.length) {
            scheduleLazy();
          } else {
            runAttempts = 0;
          }
        }

        function requestIdleCallbackShim(task) {
          index++;
          tasks.push(task);
          scheduleLazy();
          return index;
        }

        function cancelIdleCallbackShim(id) {
          var index = id - 1 - tasklength;

          if (tasks[index]) {
            tasks[index] = null;
          }
        }

        if (!root.requestIdleCallback || !root.cancelIdleCallback) {
          root.requestIdleCallback = requestIdleCallbackShim;
          root.cancelIdleCallback = cancelIdleCallbackShim;

          if (root.document && document.addEventListener) {
            root.addEventListener('scroll', onInputorMutation, true);
            root.addEventListener('resize', onInputorMutation);
            document.addEventListener('focus', onInputorMutation, true);
            document.addEventListener('mouseover', onInputorMutation, true);
            ['click', 'keypress', 'touchstart', 'mousedown'].forEach(function (name) {
              document.addEventListener(name, onInputorMutation, {
                capture: true,
                passive: true
              });
            });

            if (root.MutationObserver) {
              new MutationObserver(onInputorMutation).observe(document.documentElement, {
                childList: true,
                subtree: true,
                attributes: true
              });
            }
          }
        } else {
          try {
            root.requestIdleCallback(function () {}, {
              timeout: 0
            });
          } catch (e) {
            (function (rIC) {
              var timeRemainingProto, timeRemaining;

              root.requestIdleCallback = function (fn, timeout) {
                if (timeout && typeof timeout.timeout == 'number') {
                  return rIC(fn, timeout.timeout);
                }

                return rIC(fn);
              };

              if (root.IdleCallbackDeadline && (timeRemainingProto = IdleCallbackDeadline.prototype)) {
                timeRemaining = Object.getOwnPropertyDescriptor(timeRemainingProto, 'timeRemaining');

                if (!timeRemaining || !timeRemaining.configurable || !timeRemaining.get) {
                  return;
                }

                Object.defineProperty(timeRemainingProto, 'timeRemaining', {
                  value: function value() {
                    return timeRemaining.get.call(this);
                  },
                  enumerable: true,
                  configurable: true
                });
              }
            })(root.requestIdleCallback);
          }
        }

        return {
          request: requestIdleCallbackShim,
          cancel: cancelIdleCallbackShim
        };
      });
      /***/

    }
    /******/

  };
  /************************************************************************/

  /******/
  // The module cache

  /******/

  var __webpack_module_cache__ = {};
  /******/

  /******/
  // The require function

  /******/

  function __webpack_require__(moduleId) {
    /******/
    // Check if module is in cache

    /******/
    var cachedModule = __webpack_module_cache__[moduleId];
    /******/

    if (cachedModule !== undefined) {
      /******/
      return cachedModule.exports;
      /******/
    }
    /******/
    // Create a new module (and put it into the cache)

    /******/


    var module = __webpack_module_cache__[moduleId] = {
      /******/
      // no module.id needed

      /******/
      // no module.loaded needed

      /******/
      exports: {}
      /******/

    };
    /******/

    /******/
    // Execute the module function

    /******/

    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/

    /******/
    // Return the exports of the module

    /******/


    return module.exports;
    /******/
  }
  /******/

  /************************************************************************/

  /******/

  /* webpack/runtime/define property getters */

  /******/


  !function () {
    /******/
    // define getter functions for harmony exports

    /******/
    __webpack_require__.d = function (exports, definition) {
      /******/
      for (var key in definition) {
        /******/
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/

      }
      /******/

    };
    /******/

  }();
  /******/

  /******/

  /* webpack/runtime/global */

  /******/

  !function () {
    /******/
    __webpack_require__.g = function () {
      /******/
      if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') return globalThis;
      /******/

      try {
        /******/
        return this || new Function('return this')();
        /******/
      } catch (e) {
        /******/
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') return window;
        /******/
      }
      /******/

    }();
    /******/

  }();
  /******/

  /******/

  /* webpack/runtime/hasOwnProperty shorthand */

  /******/

  !function () {
    /******/
    __webpack_require__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    /******/

  }();
  /******/

  /******/

  /* webpack/runtime/make namespace object */

  /******/

  !function () {
    /******/
    // define __esModule on exports

    /******/
    __webpack_require__.r = function (exports) {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/


      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/

  }();
  /******/

  /************************************************************************/

  var __webpack_exports__ = {}; // This entry need to be wrapped in an IIFE because it need to be in strict mode.

  !function () {
    "use strict"; // ESM COMPAT FLAG

    __webpack_require__.r(__webpack_exports__); // EXPORTS


    __webpack_require__.d(__webpack_exports__, {
      createQueue: function createQueue() {
        return (
          /* binding */
          _createQueue
        );
      }
    }); // EXTERNAL MODULE: ./node_modules/requestidlecallback/index.js


    var requestidlecallback = __webpack_require__(3159);

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/priority-queue/build-module/request-idle-callback.js

    /**
     * External dependencies
     */

    /**
     * @typedef {( timeOrDeadline: IdleDeadline | number ) => void} Callback
     */

    /**
     * @return {(callback: Callback) => void} RequestIdleCallback
     */

    function createRequestIdleCallback() {
      if (typeof window === 'undefined') {
        return function (callback) {
          setTimeout(function () {
            return callback(Date.now());
          }, 0);
        };
      }

      return window.requestIdleCallback;
    }
    /* harmony default export */


    var request_idle_callback = createRequestIdleCallback();
    ; // CONCATENATED MODULE: ./node_modules/@wordpress/priority-queue/build-module/index.js

    /**
     * Internal dependencies
     */

    /**
     * Enqueued callback to invoke once idle time permits.
     *
     * @typedef {()=>void} WPPriorityQueueCallback
     */

    /**
     * An object used to associate callbacks in a particular context grouping.
     *
     * @typedef {{}} WPPriorityQueueContext
     */

    /**
     * Function to add callback to priority queue.
     *
     * @typedef {(element:WPPriorityQueueContext,item:WPPriorityQueueCallback)=>void} WPPriorityQueueAdd
     */

    /**
     * Function to flush callbacks from priority queue.
     *
     * @typedef {(element:WPPriorityQueueContext)=>boolean} WPPriorityQueueFlush
     */

    /**
     * Reset the queue.
     *
     * @typedef {()=>void} WPPriorityQueueReset
     */

    /**
     * Priority queue instance.
     *
     * @typedef {Object} WPPriorityQueue
     *
     * @property {WPPriorityQueueAdd}   add    Add callback to queue for context.
     * @property {WPPriorityQueueFlush} flush  Flush queue for context.
     * @property {WPPriorityQueueFlush} cancel Clear queue for context.
     * @property {WPPriorityQueueReset} reset  Reset queue.
     */

    /**
     * Creates a context-aware queue that only executes
     * the last task of a given context.
     *
     * @example
     *```js
     * import { createQueue } from '@wordpress/priority-queue';
     *
     * const queue = createQueue();
     *
     * // Context objects.
     * const ctx1 = {};
     * const ctx2 = {};
     *
     * // For a given context in the queue, only the last callback is executed.
     * queue.add( ctx1, () => console.log( 'This will be printed first' ) );
     * queue.add( ctx2, () => console.log( 'This won\'t be printed' ) );
     * queue.add( ctx2, () => console.log( 'This will be printed second' ) );
     *```
     *
     * @return {WPPriorityQueue} Queue object with `add`, `flush` and `reset` methods.
     */

    var _createQueue = function _createQueue() {
      /** @type {Map<WPPriorityQueueContext, WPPriorityQueueCallback>} */
      var waitingList = new Map();
      var isRunning = false;
      /**
       * Callback to process as much queue as time permits.
       *
       * Map Iteration follows the original insertion order. This means that here
       * we can iterate the queue and know that the first contexts which were
       * added will be run first. On the other hand, if anyone adds a new callback
       * for an existing context it will supplant the previously-set callback for
       * that context because we reassigned that map key's value.
       *
       * In the case that a callback adds a new callback to its own context then
       * the callback it adds will appear at the end of the iteration and will be
       * run only after all other existing contexts have finished executing.
       *
       * @param {IdleDeadline|number} deadline Idle callback deadline object, or
       *                                       animation frame timestamp.
       */

      var runWaitingList = function runWaitingList(deadline) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = waitingList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                nextElement = _step$value[0],
                callback = _step$value[1];

            waitingList["delete"](nextElement);
            callback();

            if ('number' === typeof deadline || deadline.timeRemaining() <= 0) {
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (waitingList.size === 0) {
          isRunning = false;
          return;
        }

        request_idle_callback(runWaitingList);
      };
      /**
       * Add a callback to the queue for a given context.
       *
       * If errors with undefined callbacks are encountered double check that
       * all of your useSelect calls have the right dependencies set correctly
       * in their second parameter. Missing dependencies can cause unexpected
       * loops and race conditions in the queue.
       *
       * @type {WPPriorityQueueAdd}
       *
       * @param {WPPriorityQueueContext}  element Context object.
       * @param {WPPriorityQueueCallback} item    Callback function.
       */


      var add = function add(element, item) {
        waitingList.set(element, item);

        if (!isRunning) {
          isRunning = true;
          request_idle_callback(runWaitingList);
        }
      };
      /**
       * Flushes queue for a given context, returning true if the flush was
       * performed, or false if there is no queue for the given context.
       *
       * @type {WPPriorityQueueFlush}
       *
       * @param {WPPriorityQueueContext} element Context object.
       *
       * @return {boolean} Whether flush was performed.
       */


      var flush = function flush(element) {
        var callback = waitingList.get(element);

        if (undefined === callback) {
          return false;
        }

        waitingList["delete"](element);
        callback();
        return true;
      };
      /**
       * Clears the queue for a given context, cancelling the callbacks without
       * executing them. Returns `true` if there were scheduled callbacks to cancel,
       * or `false` if there was is no queue for the given context.
       *
       * @type {WPPriorityQueueFlush}
       *
       * @param {WPPriorityQueueContext} element Context object.
       *
       * @return {boolean} Whether any callbacks got cancelled.
       */


      var cancel = function cancel(element) {
        return waitingList["delete"](element);
      };
      /**
       * Reset the queue without running the pending callbacks.
       *
       * @type {WPPriorityQueueReset}
       */


      var reset = function reset() {
        waitingList.clear();
        isRunning = false;
      };

      return {
        add: add,
        flush: flush,
        cancel: cancel,
        reset: reset
      };
    };
  }();
  (window.wp = window.wp || {}).priorityQueue = __webpack_exports__;
  /******/
})();