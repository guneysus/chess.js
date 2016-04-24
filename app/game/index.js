import * as board from "models/board";
import * as pieces from "models/pieces";
import {
	COLOR, PIECE, ICON, Board, Piece
}
from "models/board";

export
var White = board.White;
export
var Black = board.Black;


export
class Set {
	constructor(args) {
		this.White = [
			Object.assign({}, board.White.Pawn),
			Object.assign({}, board.White.Pawn),
			Object.assign({}, board.White.Pawn),
			Object.assign({}, board.White.Pawn),
			Object.assign({}, board.White.Pawn),
			Object.assign({}, board.White.Pawn),
			Object.assign({}, board.White.Pawn),
			Object.assign({}, board.White.Pawn),
			Object.assign({}, board.White.King),
			Object.assign({}, board.White.Rook),
			Object.assign({}, board.White.Rook),
			Object.assign({}, board.White.Queen),
			Object.assign({}, board.White.Knight),
			Object.assign({}, board.White.Knight),
			Object.assign({}, board.White.Bishop),
			Object.assign({}, board.White.Bishop),
		]

		this.Black = [
			Object.assign({}, board.Black.Pawn),
			Object.assign({}, board.Black.Pawn),
			Object.assign({}, board.Black.Pawn),
			Object.assign({}, board.Black.Pawn),
			Object.assign({}, board.Black.Pawn),
			Object.assign({}, board.Black.Pawn),
			Object.assign({}, board.Black.Pawn),
			Object.assign({}, board.Black.Pawn),
			Object.assign({}, board.Black.King),
			Object.assign({}, board.Black.Rook),
			Object.assign({}, board.Black.Rook),
			Object.assign({}, board.Black.Queen),
			Object.assign({}, board.Black.Knight),
			Object.assign({}, board.Black.Knight),
			Object.assign({}, board.Black.Bishop),
			Object.assign({}, board.Black.Bishop),
		]
	}
}

console.table(White);
console.table(Black);