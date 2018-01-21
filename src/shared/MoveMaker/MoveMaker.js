import _ from 'lodash';
import { GameState, MoveValidator, PieceType } from 'shared';

export default class MoveMaker {
  constructor(pieces, ticTacToeFinder) {
    if (null == pieces) throw new Error("Argument 'pieces' cannot be null.");
    if (null == ticTacToeFinder) throw new Error("Argument 'ticTacToeFinder' cannot be null.");

    this.ticTacToeFinder = ticTacToeFinder;
    this.pieces = _.clone(pieces);
    this.sideToMove = PieceType.X;
    this.history = [];
  }

  get totalLocations() { return this.pieces.length; }

  tryMakeMoveAt = (location) => {
    if (!MoveValidator.isValid(this.pieces, location)) return { pieces: null };

    this.pieces[location] = this.sideToMove;
    this.history.push(location);
    this.switchSides();
    return { pieces: _.clone(this.pieces), gameState: this.getGameState(location) };
  };

  getGameState = (lastMove) => {
    if (this.ticTacToeFinder.isTicTacToe(this.pieces, lastMove)) return GameState.TIC_TAC_TOE;
    if (this.pieces.indexOf(PieceType.Empty) === -1) return GameState.DRAW;

    return GameState.NORMAL;
  };

  undoLastMove = () => {
    if (this.history.length === 0) return;

    this.pieces[this.history.pop()] = PieceType.Empty;
    this.switchSides();
  };

  switchSides = () => {
    this.sideToMove = (this.sideToMove === PieceType.X) ? PieceType.O : PieceType.X;
  };
}
