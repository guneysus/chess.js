export
class Piece {
  constructor(args) {
    this.piece = args.piece;
    this.color = args.color;
    this.icon = args.icon;
  }
}

export
const COLOR = {
  White: Symbol('White'),
  Black: Symbol('Black')
}


export
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

export
const PIECE = {
  King: Symbol('King'),
  Rook: Symbol('Rook'),
  Queen: Symbol('Queen'),
  Pawn: Symbol('Pawn'),
  Knight: Symbol('Knight'),
  Bishop: Symbol('Bishop')
}

export
const White = {
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
}



export
const Black = {
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
    // code
  }
}