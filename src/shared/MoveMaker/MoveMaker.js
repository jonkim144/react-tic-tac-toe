import _ from 'lodash';
import { MoveValidator, PieceType } from 'shared';

export default class MoveMaker {
  constructor(pieces) {
    this.pieces = _.clone(pieces);
    this.sideToMove = PieceType.X;
  }

  tryMakeMoveAt = (location) => {
    if (!MoveValidator.isValid(this.pieces, location)) return null;

    this.pieces[location] = this.sideToMove;
    this.sideToMove = (this.sideToMove === PieceType.X) ? PieceType.O : PieceType.X;
    return _.clone(this.pieces);
  };
}
