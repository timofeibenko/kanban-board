// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/clamp.js":[function(require,module,exports) {
/*!
* Clamp.js 0.5.1
*
* Copyright 2011-2013, Joseph Schmitt http://joe.sh
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*/
(function () {
  /**
   * Clamps a text node.
   * @param {HTMLElement} element. Element containing the text node to clamp.
   * @param {Object} options. Options to pass to the clamper.
   */
  function clamp(element, options) {
    options = options || {};
    var self = this,
        win = window,
        opt = {
      clamp: options.clamp || 2,
      useNativeClamp: typeof options.useNativeClamp != 'undefined' ? options.useNativeClamp : true,
      splitOnChars: options.splitOnChars || ['.', '-', '–', '—', ' '],
      //Split on sentences (periods), hypens, en-dashes, em-dashes, and words (spaces).
      animate: options.animate || false,
      truncationChar: options.truncationChar || '…',
      truncationHTML: options.truncationHTML
    },
        sty = element.style,
        originalText = element.innerHTML,
        supportsNativeClamp = typeof element.style.webkitLineClamp != 'undefined',
        clampValue = opt.clamp,
        isCSSValue = clampValue.indexOf && (clampValue.indexOf('px') > -1 || clampValue.indexOf('em') > -1),
        truncationHTMLContainer;

    if (opt.truncationHTML) {
      truncationHTMLContainer = document.createElement('span');
      truncationHTMLContainer.innerHTML = opt.truncationHTML;
    } // UTILITY FUNCTIONS __________________________________________________________

    /**
     * Return the current style for an element.
     * @param {HTMLElement} elem The element to compute.
     * @param {string} prop The style property.
     * @returns {number}
     */


    function computeStyle(elem, prop) {
      if (!win.getComputedStyle) {
        win.getComputedStyle = function (el, pseudo) {
          this.el = el;

          this.getPropertyValue = function (prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';

            if (re.test(prop)) {
              prop = prop.replace(re, function () {
                return arguments[2].toUpperCase();
              });
            }

            return el.currentStyle && el.currentStyle[prop] ? el.currentStyle[prop] : null;
          };

          return this;
        };
      }

      return win.getComputedStyle(elem, null).getPropertyValue(prop);
    }
    /**
     * Returns the maximum number of lines of text that should be rendered based
     * on the current height of the element and the line-height of the text.
     */


    function getMaxLines(height) {
      var availHeight = height || element.clientHeight,
          lineHeight = getLineHeight(element);
      return Math.max(Math.floor(availHeight / lineHeight), 0);
    }
    /**
     * Returns the maximum height a given element should have based on the line-
     * height of the text and the given clamp value.
     */


    function getMaxHeight(clmp) {
      var lineHeight = getLineHeight(element);
      return lineHeight * clmp;
    }
    /**
     * Returns the line-height of an element as an integer.
     */


    function getLineHeight(elem) {
      var lh = computeStyle(elem, 'line-height');

      if (lh == 'normal') {
        // Normal line heights vary from browser to browser. The spec recommends
        // a value between 1.0 and 1.2 of the font size. Using 1.1 to split the diff.
        lh = parseInt(computeStyle(elem, 'font-size')) * 1.2;
      }

      return parseInt(lh);
    } // MEAT AND POTATOES (MMMM, POTATOES...) ______________________________________


    var splitOnChars = opt.splitOnChars.slice(0),
        splitChar = splitOnChars[0],
        chunks,
        lastChunk;
    /**
     * Gets an element's last child. That may be another node or a node's contents.
     */

    function getLastChild(elem) {
      //Current element has children, need to go deeper and get last child as a text node
      if (elem.lastChild.children && elem.lastChild.children.length > 0) {
        return getLastChild(Array.prototype.slice.call(elem.children).pop());
      } //This is the absolute last child, a text node, but something's wrong with it. Remove it and keep trying
      else if (!elem.lastChild || !elem.lastChild.nodeValue || elem.lastChild.nodeValue == '' || elem.lastChild.nodeValue == opt.truncationChar) {
          elem.lastChild.parentNode.removeChild(elem.lastChild);
          return getLastChild(element);
        } //This is the last child we want, return it
        else {
            return elem.lastChild;
          }
    }
    /**
     * Removes one character at a time from the text until its width or
     * height is beneath the passed-in max param.
     */


    function truncate(target, maxHeight) {
      if (!maxHeight) {
        return;
      }
      /**
       * Resets global variables.
       */


      function reset() {
        splitOnChars = opt.splitOnChars.slice(0);
        splitChar = splitOnChars[0];
        chunks = null;
        lastChunk = null;
      }

      var nodeValue = target.nodeValue.replace(opt.truncationChar, ''); //Grab the next chunks

      if (!chunks) {
        //If there are more characters to try, grab the next one
        if (splitOnChars.length > 0) {
          splitChar = splitOnChars.shift();
        } //No characters to chunk by. Go character-by-character
        else {
            splitChar = '';
          }

        chunks = nodeValue.split(splitChar);
      } //If there are chunks left to remove, remove the last one and see if
      // the nodeValue fits.


      if (chunks.length > 1) {
        // console.log('chunks', chunks);
        lastChunk = chunks.pop(); // console.log('lastChunk', lastChunk);

        applyEllipsis(target, chunks.join(splitChar));
      } //No more chunks can be removed using this character
      else {
          chunks = null;
        } //Insert the custom HTML before the truncation character


      if (truncationHTMLContainer) {
        target.nodeValue = target.nodeValue.replace(opt.truncationChar, '');
        element.innerHTML = target.nodeValue + ' ' + truncationHTMLContainer.innerHTML + opt.truncationChar;
      } //Search produced valid chunks


      if (chunks) {
        //It fits
        if (element.clientHeight <= maxHeight) {
          //There's still more characters to try splitting on, not quite done yet
          if (splitOnChars.length >= 0 && splitChar != '') {
            applyEllipsis(target, chunks.join(splitChar) + splitChar + lastChunk);
            chunks = null;
          } //Finished!
          else {
              return element.innerHTML;
            }
        }
      } //No valid chunks produced
      else {
          //No valid chunks even when splitting by letter, time to move
          //on to the next node
          if (splitChar == '') {
            applyEllipsis(target, '');
            target = getLastChild(element);
            reset();
          }
        } //If you get here it means still too big, let's keep truncating


      if (opt.animate) {
        setTimeout(function () {
          truncate(target, maxHeight);
        }, opt.animate === true ? 10 : opt.animate);
      } else {
        return truncate(target, maxHeight);
      }
    }

    function applyEllipsis(elem, str) {
      elem.nodeValue = str + opt.truncationChar;
    } // CONSTRUCTOR ________________________________________________________________


    if (clampValue == 'auto') {
      clampValue = getMaxLines();
    } else if (isCSSValue) {
      clampValue = getMaxLines(parseInt(clampValue));
    }

    var clampedText;

    if (supportsNativeClamp && opt.useNativeClamp) {
      sty.overflow = 'hidden';
      sty.textOverflow = 'ellipsis';
      sty.webkitBoxOrient = 'vertical';
      sty.display = '-webkit-box';
      sty.webkitLineClamp = clampValue;

      if (isCSSValue) {
        sty.height = opt.clamp + 'px';
      }
    } else {
      var height = getMaxHeight(clampValue);

      if (height <= element.clientHeight) {
        clampedText = truncate(getLastChild(element), height);
      }
    }

    return {
      'original': originalText,
      'clamped': clampedText
    };
  }

  window.$clamp = clamp;
})();
},{}],"js/variables.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.variables = void 0;
var removeIcon = '<svg height="511.99998pt" viewBox="1 1 511.99998 511.99998" width="511.99998pt" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.386719 0-256 114.613281-256 256s114.613281 256 256 256 256-114.613281 256-256c-.167969-141.316406-114.683594-255.832031-256-256zm0 480c-123.710938 0-224-100.289062-224-224s100.289062-224 224-224 224 100.289062 224 224c-.132812 123.65625-100.34375 223.867188-224 224zm0 0"/><path d="m380.449219 131.550781c-6.25-6.246093-16.378907-6.246093-22.625 0l-101.824219 101.824219-101.824219-101.824219c-6.140625-6.355469-16.269531-6.53125-22.625-.390625-6.355469 6.136719-6.53125 16.265625-.390625 22.621094.128906.132812.257813.265625.390625.394531l101.824219 101.824219-101.824219 101.824219c-6.355469 6.136719-6.53125 16.265625-.390625 22.625 6.136719 6.355469 16.265625 6.53125 22.621094.390625.132812-.128906.265625-.257813.394531-.390625l101.824219-101.824219 101.824219 101.824219c6.355469 6.136719 16.484375 5.960937 22.621093-.394531 5.988282-6.199219 5.988282-16.03125 0-22.230469l-101.820312-101.824219 101.824219-101.824219c6.246093-6.246093 6.246093-16.375 0-22.625zm0 0"/></svg>';
var moveIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 612 612\"><defs/>\n<path d=\"M431.001 289.189l-108.19-108.19c-7.478-7.478-19.583-7.478-27.042 0-7.478 7.478-7.478 19.584 0 27.043l78.814 78.833H172.125C161.568 286.875 153 295.443 153 306s8.568 19.125 19.125 19.125h202.457l-78.814 78.814c-7.478 7.478-7.478 19.584 0 27.042 7.478 7.479 19.584 7.479 27.042 0L431 322.792c4.59-4.59 6.005-10.863 4.973-16.811 1.033-5.91-.401-12.202-4.972-16.792zM306 0C136.992 0 0 136.992 0 306s136.992 306 306 306 306-137.012 306-306S475.008 0 306 0zm0 573.75C158.125 573.75 38.25 453.875 38.25 306S158.125 38.25 306 38.25 573.75 158.125 573.75 306 453.875 573.75 306 573.75z\"/>\n</svg>";
var variables = {
  removeIcon: removeIcon,
  moveIcon: moveIcon,
  getCard: function getCard(cardObject) {
    return "<div class=\"board__card\" data-card=\"card\" data-card_id=".concat(cardObject.id, ">\n                    <h3 class=\"board__card-title\">").concat(cardObject.title, "</h3>\n                    <p class=\"board__card-copy\">").concat(cardObject.description, "</p>\n                    <div class=\"board__card-footer\">\n                        <p class=\"board__card-date\">").concat(cardObject.date, "</p>\n                        <button class=\"board__card-move-btn\">").concat(this.moveIcon, "</button>\n                        <button class=\"board__card-remove-btn\">").concat(this.removeIcon, "</button>\n                    </div>\n                </div>");
  }
};
exports.variables = variables;
},{}],"js/methods.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Methods = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Methods = /*#__PURE__*/function () {
  function Methods() {
    _classCallCheck(this, Methods);

    _defineProperty(this, "showErrorMessage", function () {
      for (var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++) {
        inputs[_key] = arguments[_key];
      }

      return inputs.forEach(function (input) {
        input.nextElementSibling.classList.add('active');
      });
    });

    _defineProperty(this, "hideErrorMessage", function () {
      for (var _len2 = arguments.length, inputs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        inputs[_key2] = arguments[_key2];
      }

      return inputs.forEach(function (input) {
        input.nextElementSibling.classList.remove('active');
      });
    });
  }

  _createClass(Methods, [{
    key: "toggle",
    value: function toggle(el) {
      el.classList.toggle('active');
    }
  }, {
    key: "getCards",
    value: function getCards(column) {
      if (column === 'toDo') {
        return document.body.querySelector('div[data-column="toDo"]').querySelectorAll('.board__card');
      } else if (column === 'inProgress') {
        return document.body.querySelector('div[data-column="inProgress"]').querySelectorAll('.board__card');
      } else if (column === 'done') {
        return document.body.querySelector('div[data-column="done"]').querySelectorAll('.board__card');
      }
    }
  }, {
    key: "countCards",
    value: function countCards() {
      var columns = document.body.querySelectorAll('.board__cards-container[data-column]');

      for (var i = 0; i < columns.length; i++) {
        var cards = this.getCards(columns[i].dataset.column),
            counter = document.body.querySelector("div[data-counter=\"".concat(columns[i].dataset.column, "\"]")),
            cardNumber = void 0;
        cards ? cardNumber = cards.length : cardNumber = 0;
        counter.innerHTML = cardNumber;
      }
    }
  }, {
    key: "deleteCard",
    value: function deleteCard(card) {
      var column = event.target.closest('div[data-column]').dataset.column;
      this.removeFromLocalStorage(column, card.dataset.card_id);
      card.remove();
      this.countCards();
    }
  }, {
    key: "deleteAllCards",
    value: function deleteAllCards(column) {
      if (column === 'toDo') {
        var cards = this.getCards('toDo');

        for (var i = 0; i < cards.length; i++) {
          this.removeFromLocalStorage('toDo', cards[i].dataset.card_id);
        }

        var cardContainer = document.body.querySelector('div[data-column="toDo"]');
        cardContainer.innerHTML = '';
      }

      this.countCards();
    }
  }, {
    key: "clampText",
    value: function clampText() {
      var cardBodies = document.body.querySelectorAll('.board__card-copy');

      for (var i = 0; i < cardBodies.length; i++) {
        $clamp(cardBodies[i], {
          clamp: 2
        });
      }
    }
  }, {
    key: "clearInput",
    value: function clearInput(modal) {
      if (modal) {
        // else browser will throw an error cause it is unable to run qs on null
        var inputs = [modal.querySelector('textarea[data-input_type="description"]'), modal.querySelector('input[data-input_type="title"]')];
        inputs.forEach(function (input) {
          return input.value = '';
        });
      }
    }
  }, {
    key: "getDate",
    value: function getDate() {
      return new Date(Date.now()).toLocaleDateString();
    }
  }, {
    key: "generateID",
    value: function generateID() {
      var cardNumber = document.body.querySelectorAll('.board__card').length;
      return cardNumber ? "c_".concat(cardNumber + 1) : "c_1"; // the card id is the number of already existing cards + 1
    }
  }, {
    key: "putInLocalStorage",
    value: function putInLocalStorage(cardObject, column) {
      if (column === 'toDo') {
        var toDoStorage = JSON.parse(localStorage.getItem('toDo'));
        toDoStorage.push(cardObject);
        localStorage.setItem('toDo', JSON.stringify(toDoStorage));
      }
    }
  }, {
    key: "removeFromLocalStorage",
    value: function removeFromLocalStorage(column, id) {
      if (column === 'toDo') {
        var toDoStorage = JSON.parse(localStorage.getItem('toDo'));
        toDoStorage.forEach(function (card) {
          if (card.id === id) {
            toDoStorage.splice(toDoStorage.indexOf(card), 1);
          }
        });
        localStorage.setItem('toDo', JSON.stringify(toDoStorage));
      }
    }
  }, {
    key: "checkIfEmpty",
    value: function checkIfEmpty() {
      var isEmpty = false;

      for (var _len3 = arguments.length, inputs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        inputs[_key3] = arguments[_key3];
      }

      inputs.forEach(function (input) {
        if (!input.value) {
          methods.showErrorMessage(input);
          return isEmpty = true;
        }
      });
      return isEmpty;
    }
  }]);

  return Methods;
}();

exports.Methods = Methods;
},{}],"js/addCard.js":[function(require,module,exports) {
'use strict'; // Variables

var _variables = require("./variables.js");

var _methods = require("./methods.js");

var addCardBtn = document.body.querySelector('.board__add-new-btn'),
    toDoColumn = document.body.querySelector('div[data-column="toDo"]'),
    modal = document.body.querySelector('.add-card-modal'),
    titleInput = modal.querySelector('input[data-input_type="title"]'),
    descriptionInput = modal.querySelector('textarea[data-input_type="description"]'); // Methods

var methods = new _methods.Methods(); // Listeners
// opens the modal window

addCardBtn.addEventListener('click', function () {
  return methods.toggle(modal);
}); // listens to events in modal window

modal.addEventListener('click', function (event) {
  if (event.target.classList.contains('add-card-modal__close-btn')) {
    methods.toggle(modal); // closes the modal

    setTimeout(function () {
      methods.clearInput(modal);
      methods.hideErrorMessage(titleInput, descriptionInput);
    }, 500); // clears inputs so that there are no previously entered values and hide error messages if they
    // were shown
    // timeout is needed so that the clearing of values weren't visible during window fade out
  }

  if (event.target.classList.contains('add-card-modal__save-btn')) {
    // makes the necessary checks, shows error if empty, else adds a card
    if (methods.checkIfEmpty(titleInput, descriptionInput)) {} else {
      var cardObject = {
        id: methods.generateID(),
        title: titleInput.value,
        description: descriptionInput.value,
        date: methods.getDate()
      };
      methods.putInLocalStorage(cardObject, 'toDo');
      toDoColumn.innerHTML += _variables.variables.getCard(cardObject);
      setTimeout(function () {
        return methods.clearInput(modal);
      }, 500);
      methods.countCards();
      methods.clampText();
      methods.toggle(modal);
    }
  }
});
modal.addEventListener('keyup', function (event) {
  // removes error message when user starts to type into the input
  if (event.target.classList.contains('add-card-modal__title-input') || event.target.classList.contains('add-card-modal__description-input')) {
    methods.hideErrorMessage(event.target);
  }
});
},{"./variables.js":"js/variables.js","./methods.js":"js/methods.js"}],"js/deleteCards.js":[function(require,module,exports) {
'use strict';

var _methods = require("./methods.js");

var methods = new _methods.Methods();
var clearBtns = document.body.querySelectorAll('.board__header-clear-btn svg');
var cards = document.body.querySelectorAll('div[data-column]');

for (var i = 0; i < clearBtns.length; i++) {
  clearBtns[i].addEventListener('click', function (event) {
    var column = event.target.closest('button[data-column]').dataset.column;
    methods.deleteAllCards(column);
  });
}

for (var _i = 0; _i < cards.length; _i++) {
  cards[_i].addEventListener('click', function (event) {
    if (event.target.classList.contains('board__card-remove-btn') || event.target.closest('.board__card-remove-btn')) {
      var card = event.target.closest('.board__card');
      methods.deleteCard(card);
    }
  });
}
},{"./methods.js":"js/methods.js"}],"js/pageLoad.js":[function(require,module,exports) {
'use strict';

var _variables = require("./variables.js");

var _methods = require("./methods.js");

var methods = new _methods.Methods();
window.addEventListener('load', function () {
  // creates local storage structure on first page load or after LS was cleared
  // then it renders the cards if there are any
  if (!localStorage.getItem('toDo')) {
    localStorage.setItem('toDo', JSON.stringify([]));
  } else {
    var toDoStorage = JSON.parse(localStorage.getItem('toDo'));
    toDoStorage.forEach(function (cardObject) {
      document.querySelector('div[data-column="toDo"]').innerHTML += _variables.variables.getCard(cardObject);
    });
  }

  if (!localStorage.getItem('inProgress')) {
    localStorage.setItem('inProgress', JSON.stringify([]));
  }

  if (!localStorage.getItem('done')) {
    localStorage.setItem('done', JSON.stringify([]));
  }

  methods.countCards();
});
},{"./variables.js":"js/variables.js","./methods.js":"js/methods.js"}],"js/main.js":[function(require,module,exports) {
'use strict';

require("./clamp.js");

require("./addCard.js");

require("./deleteCards.js");

require("./pageLoad.js");
},{"./clamp.js":"js/clamp.js","./addCard.js":"js/addCard.js","./deleteCards.js":"js/deleteCards.js","./pageLoad.js":"js/pageLoad.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58070" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map