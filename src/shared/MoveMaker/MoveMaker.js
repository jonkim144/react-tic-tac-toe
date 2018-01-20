import _ from 'lodash';
import { MoveValidator, PieceType } from 'shared';

export default class MoveMaker {
  constructor(pieces) {
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
    return { pieces: _.clone(this.pieces) };
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
