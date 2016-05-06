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


const ROWS = [1, 2, 3, 4, 5, 6, 7, 8];
const COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

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
    this.rows = ROWS;
    this.cols = COLUMNS;
    this.colors = ['White', 'Black'];
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
    for (let j in this.cols) {
      this.grid[this.cols[j]] = {};
      for (var i in this.rows) {

        var cell = new Cell({
          i: i,
          j: j,
          piece: null
        });

        this.grid[this.cols[j]][this.rows[i]] = cell;
      }

    }
  }

  layoutPieces() {
    // Pawns
    for (let i = 0; i < 2; i++) {
      for (var ci in this.cols) {
        var rows = ['2', '7'];
        var coord = this.cols[ci] + rows[i];
        var piece = Object.assign({}, Set[this.colors[i]]['Pawn']);
        this.setPieceCoord(piece, coord);
      }
    }

    // Rooks
    for (let i = 0; i < 2; i++) {
      var rows = ['1', '8'];
      var cols = ['a', 'h'];

      for (let ci in cols) {
        var coord = cols[ci] + rows[i];
        var piece = Object.assign({}, Set[this.colors[i]]['Rook']);
        this.setPieceCoord(piece, coord);
      }
    }

    // Knights
    for (let i = 0; i < 2; i++) {
      var rows = ['1', '8'];
      var cols = ['b', 'g'];

      for (let ci in cols) {
        var coord = cols[ci] + rows[i];
        var piece = Object.assign({}, Set[this.colors[i]]['Knight']);
        this.setPieceCoord(piece, coord);
      }
    }


    // Bishops
    for (let i = 0; i < 2; i++) {
      var rows = ['1', '8'];
      var cols = ['c', 'f'];

      for (let ci in cols) {
        var coord = cols[ci] + rows[i];
        var piece = Object.assign({}, Set[this.colors[i]]['Bishop']);
        this.setPieceCoord(piece, coord);
      }
    }


    // Queens
    for (let i = 0; i < 2; i++) {
      var rows = ['1', '8'];
      var cols = ['d'];

      for (var ci in cols) {
        var coord = cols[ci] + rows[i];
        var piece = Object.assign({}, Set[this.colors[i]]['Queen']);
        this.setPieceCoord(piece, coord);
      }
    }


    // King
    for (let i = 0; i < 2; i++) {
      var rows = ['1', '8'];
      var cols = ['e'];

      for (var ci in cols) {
        var coord = cols[ci] + rows[i];
        var piece = Object.assign({}, Set[this.colors[i]]['King']);
        this.setPieceCoord(piece, coord);
      }
    }
  };
}