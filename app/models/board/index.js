const COLOR = {
  White: Symbol('White'),
  Black: Symbol('Black')
}

const ICON = {
  White: {
    King: '♔',
    Rook: '♖',
    Queen: '♕',
    Pawn: '♙',
    Knight: '♘',
    Bishop: '♗',
  },

  Black: {
    King: '♚',
    Rook: '♜',
    Queen: '♛',
    Pawn: '♟',
    Knight: '♞',
    Bishop: '♝'
  }
}


const PIECE = {
  King: Symbol('King'),
  Rook: Symbol('Rook'),
  Queen: Symbol('Queen'),
  Pawn: Symbol('Pawn'),
  Knight: Symbol('Knight'),
  Bishop: Symbol('Bishop')
}



export
class Piece {
  constructor(args) {
    this.piece = args.piece;
    this.color = args.color;
    this.icon = args.icon;
  }
}

export
const Set = {
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
    }),
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
    }),
  }
}

export
class Cell {
  constructor(args) {
    this.rows = ROWS;
    this.cols = COLUMNS;
    this.i = parseInt(args.i);
    this.j = parseInt(args.j);
    this.piece = args.piece;

  }

  getCoord() {
    return this.cols[this.j] + this.rows[this.i];
  }

  getDom() {
    return document.getElementById(this.getCoord());
  }

  setPiece(piece) {
    this.piece = piece;
    this.getDom().setAttribute('value', piece.icon);
  }

}

export
const ROWS = [1, 2, 3, 4, 5, 6, 7, 8];

export
const COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export
const LAYOUT = {
  Pawn: {
    White: ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
    Black: ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
  },
  Rook: {
    White: ["a1", "h1"],
    Black: ["a8", "h8"],
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
  },

};

export
class Board {
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
  constructor(args) {
    this.grid = {};
    this.createGrid();
    this.layoutPieces();
  }

  getCell(name) {
    var s = name.split('');
    return this.grid[s[0]][s[1]];
  }

  getRow(index) {
    var cells = [];
    for (let i = 0; i < this.cols.length; i++) {
      var col = this.cols[i];
      var coord = col + index
      cells.push(this.getCell(coord));
    };
    return cells;
  }

  setPieceCoord(piece, coord) {
    this.getCell(coord).setPiece(piece);
  }

  setPieceCell(piece, cell) {
    cell.setPiece(piece);
  }

  createGrid() {
    for (let j in COLUMNS) {
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

  layoutPieces() {
    // Pawns
    for (let color in COLOR) { // White, Black
      for (let coord of LAYOUT['Pawn'][color]) {
        var piece = Object.assign({}, Set[color]['Pawn']);
        this.setPieceCoord(piece, coord);
      }
    }

    // Other pieces
    for (let p in PIECE) {
      for (let color in COLOR) {
        for (let coord of LAYOUT[p][color]) {
          var piece = Object.assign({}, Set[color][p]);
          this.setPieceCoord(piece, coord);
        }
      }
    }

  };
}