(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("initialize.js", function(exports, require, module) {
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // do your setup here
  console.log('Initialized app');
});

window.addEventListener('load', function () {

  var elements = document.querySelectorAll("input[type=button]");
  [].forEach.call(elements, function (el) {

    el.setAttribute("draggable", true);

    el.addEventListener("dragstart", function (evt) {
      console.log("Drag started On: " + evt.target.id);
      evt.dataTransfer.setData("text", evt.target.id);
    });

    el.addEventListener("dragover", function (evt) {
      evt.preventDefault();
      console.log("Drag Over On: " + evt.target.id);
    });

    el.addEventListener("drop", function (evt) {
      evt.preventDefault();
      var data = evt.dataTransfer.getData("text");
      console.log("DATA " + data);
      if (data == evt.target.id) return; // Kendi üzerine taş drop etme
      if (evt.target.value != "") return; // Sadece boş hücrelere taş taşı
      var el = document.getElementById(data);
      console.log("Drop to: " + evt.target.id);
      evt.target.value = el.value;
      el.value = null;
    });

    el.addEventListener('click', function (e) {
      console.log(board.getCell(this.id));
    });
  });
});
});

require.register("models/board/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var COLOR = {
  White: Symbol('White'),
  Black: Symbol('Black')
};

var ICON = {
  White: {
    King: '♔',
    Rook: '♖',
    Queen: '♕',
    Pawn: '♙',
    Knight: '♘',
    Bishop: '♗'
  },

  Black: {
    King: '♚',
    Rook: '♜',
    Queen: '♛',
    Pawn: '♟',
    Knight: '♞',
    Bishop: '♝'
  }
};

var PIECE = {
  King: Symbol('King'),
  Rook: Symbol('Rook'),
  Queen: Symbol('Queen'),
  Pawn: Symbol('Pawn'),
  Knight: Symbol('Knight'),
  Bishop: Symbol('Bishop')
};

var Piece = exports.Piece = function Piece(args) {
  _classCallCheck(this, Piece);

  this.piece = args.piece;
  this.color = args.color;
  this.icon = args.icon;
};

var Set = exports.Set = {
  White: {
    King: new Piece({
      color: COLOR.White,
      piece: PIECE.King,
      icon: ICON.White.King
    }),
    Rook: new Piece({
      color: COLOR.White,
      piece: PIECE.Rook,
      icon: ICON.White.Rook
    }),

    Queen: new Piece({
      color: COLOR.White,
      piece: PIECE.Queen,
      icon: ICON.White.Queen
    }),
    Pawn: new Piece({
      color: COLOR.White,
      piece: PIECE.Pawn,
      icon: ICON.White.Pawn
    }),
    Knight: new Piece({
      color: COLOR.White,
      piece: PIECE.Knight,
      icon: ICON.White.Knight
    }),
    Bishop: new Piece({
      color: COLOR.White,
      piece: PIECE.Bishop,
      icon: ICON.White.Bishop
    })
  },
  Black: {
    King: new Piece({
      color: COLOR.Black,
      piece: PIECE.King,
      icon: ICON.Black.King
    }),
    Rook: new Piece({
      color: COLOR.Black,
      piece: PIECE.Rook,
      icon: ICON.Black.Rook
    }),

    Queen: new Piece({
      color: COLOR.Black,
      piece: PIECE.Queen,
      icon: ICON.Black.Queen
    }),
    Pawn: new Piece({
      color: COLOR.Black,
      piece: PIECE.Pawn,
      icon: ICON.Black.Pawn
    }),
    Knight: new Piece({
      color: COLOR.Black,
      piece: PIECE.Knight,
      icon: ICON.Black.Knight
    }),
    Bishop: new Piece({
      color: COLOR.Black,
      piece: PIECE.Bishop,
      icon: ICON.Black.Bishop
    })
  }
};

var Cell = exports.Cell = function () {
  function Cell(args) {
    _classCallCheck(this, Cell);

    this.rows = ROWS;
    this.cols = COLUMNS;
    this.i = parseInt(args.i);
    this.j = parseInt(args.j);
    this.piece = args.piece;
  }

  _createClass(Cell, [{
    key: 'getCoord',
    value: function getCoord() {
      return this.cols[this.j] + this.rows[this.i];
    }
  }, {
    key: 'getDom',
    value: function getDom() {
      return document.getElementById(this.getCoord());
    }
  }, {
    key: 'setPiece',
    value: function setPiece(piece) {
      this.piece = piece;
      this.getDom().setAttribute('value', piece.icon);
    }
  }]);

  return Cell;
}();

var ROWS = exports.ROWS = [1, 2, 3, 4, 5, 6, 7, 8];

var COLUMNS = exports.COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

var LAYOUT = exports.LAYOUT = {
  Pawn: {
    White: ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
    Black: ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"]
  },
  Rook: {
    White: ["a1", "h1"],
    Black: ["a8", "h8"]
  },
  King: {
    White: ["e1"],
    Black: ["e8"]
  },
  Queen: {
    White: ["d1"],
    Black: ["d8"]
  },

  Knight: {
    White: ["b1", "g1"],
    Black: ["b8", "g8"]
  },
  Bishop: {
    White: ["c1", "f1"],
    Black: ["c8", "f8"]
  }

};

var Board = exports.Board = function () {
  /*   
     a   b   c   d   e   f   g   h
  +-------------------------------+
  | ♜ | ♞ | ♝ | ♛ | ♚ | ♝ | ♞ | ♜ | 8
  +-------------------------------+
  | ♟ | ♟ | ♟ | ♟ | ♟ | ♟ | ♟ | ♟ | 7
  +-------------------------------+
  |   |   |   |   |   |   |   |   | 6
  +-------------------------------+
  |   |   |   |   |   |   |   |   | 5
  +-------------------------------+
  |   |   |   |   |   |   |   |   | 4
  +-------------------------------+
  |   |   |   |   |   |   |   |   | 3
  +-------------------------------+
  | ♙ | ♙ | ♙ | ♙ | ♙ | ♙ | ♙ | ♙ | 2
  +-------------------------------+
  | ♖ | ♘ | ♗ | ♕ | ♔ | ♗ | ♘ | ♖ | 1
  +-------------------------------+
    a   b   c   d   e   f   g   h
      a   b   c   d   e   f   g   h
  +-------------------------------+
  |   |   |   |   |   |   |   |   | 8
  +-------------------------------+
  |   |   |   |   |   |   |   |   | 7
  +-------------------------------+
  |   |   |   |   |   |   |   |   | 6
  +-------------------------------+
  |   |   |   |   |   |   |   |   | 5
  +-------------------------------+
  |   |   |   |   |   |   |   |   | 4
  +-------------------------------+
  |   |   |   |   |   |   |   |   | 3
  +-------------------------------+
  |   |   |   |   |   |   |   |   | 2
  +-------------------------------+
  |   |   |   |   |   |   |   |   | 1
  +-------------------------------+
    a   b   c   d   e   f   g   h
  */

  function Board(args) {
    _classCallCheck(this, Board);

    this.grid = {};
    this.createGrid();
    this.layoutPieces();
  }

  _createClass(Board, [{
    key: 'getCell',
    value: function getCell(name) {
      var s = name.split('');
      return this.grid[s[0]][s[1]];
    }
  }, {
    key: 'getRow',
    value: function getRow(index) {
      var cells = [];
      for (var i = 0; i < this.cols.length; i++) {
        var col = this.cols[i];
        var coord = col + index;
        cells.push(this.getCell(coord));
      };
      return cells;
    }
  }, {
    key: 'setPieceCoord',
    value: function setPieceCoord(piece, coord) {
      this.getCell(coord).setPiece(piece);
    }
  }, {
    key: 'setPieceCell',
    value: function setPieceCell(piece, cell) {
      cell.setPiece(piece);
    }
  }, {
    key: 'createGrid',
    value: function createGrid() {
      for (var j in COLUMNS) {
        this.grid[COLUMNS[j]] = {};
        for (var i in ROWS) {

          var cell = new Cell({
            i: i,
            j: j,
            piece: null
          });

          this.grid[COLUMNS[j]][ROWS[i]] = cell;
        }
      }
    }
  }, {
    key: 'layoutPieces',
    value: function layoutPieces() {
      // Pawns
      for (var color in COLOR) {
        // White, Black
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = LAYOUT['Pawn'][color][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var coord = _step.value;

            var piece = Object.assign({}, Set[color]['Pawn']);
            this.setPieceCoord(piece, coord);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      // Other pieces
      for (var p in PIECE) {
        for (var _color in COLOR) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = LAYOUT[p][_color][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _coord = _step2.value;

              var piece = Object.assign({}, Set[_color][p]);
              this.setPieceCoord(piece, _coord);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }
    }
  }]);

  return Board;
}();
});

;require.register("models/index.js", function(exports, require, module) {
"use strict";

var _pieces = require("./pieces");

var pieces = _interopRequireWildcard(_pieces);

var _board = require("./board");

var board = _interopRequireWildcard(_board);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = {
	pieces: pieces,
	board: board
};
});

;require.register("models/pieces/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Bishop = exports.Knight = exports.Pawn = exports.Queen = exports.Rook = exports.King = undefined;

var _board = require("../board");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var King = exports.King = function (_Piece) {
	_inherits(King, _Piece);

	function King(args) {
		_classCallCheck(this, King);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(King).call(this, args));
	}

	return King;
}(_board.Piece);

var Rook = exports.Rook = function (_Piece2) {
	_inherits(Rook, _Piece2);

	function Rook(args) {
		_classCallCheck(this, Rook);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Rook).call(this, args));
	}

	return Rook;
}(_board.Piece);

var Queen = exports.Queen = function (_Piece3) {
	_inherits(Queen, _Piece3);

	function Queen(args) {
		_classCallCheck(this, Queen);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Queen).call(this, args));
	}

	return Queen;
}(_board.Piece);

var Pawn = exports.Pawn = function (_Piece4) {
	_inherits(Pawn, _Piece4);

	function Pawn(args) {
		_classCallCheck(this, Pawn);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Pawn).call(this, args));
	}

	return Pawn;
}(_board.Piece);

var Knight = exports.Knight = function (_Piece5) {
	_inherits(Knight, _Piece5);

	function Knight(args) {
		_classCallCheck(this, Knight);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Knight).call(this, args));
	}

	return Knight;
}(_board.Piece);

var Bishop = exports.Bishop = function (_Piece6) {
	_inherits(Bishop, _Piece6);

	function Bishop(args) {
		_classCallCheck(this, Bishop);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Bishop).call(this, args));
	}

	return Bishop;
}(_board.Piece);
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map