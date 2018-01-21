import _ from 'lodash';
import chai from 'chai';
import { expect } from 'chai';
import { MoveMaker, PieceType, TicTacToeFinder } from 'shared';

describe('MoveMaker', () => {
  let moveMaker = undefined;
  let pieces = undefined;

  beforeEach(() => {
    pieces = [
      PieceType.Empty, PieceType.Empty, PieceType.Empty,
      PieceType.Empty, PieceType.Empty, PieceType.Empty,
      PieceType.Empty, PieceType.Empty, PieceType.Empty,
    ];
    moveMaker = new MoveMaker(pieces, new TicTacToeFinder(pieces.length));
  });

  describe('get boardSize()', () => {
    it('total possible piece locations', () => {
      expect(moveMaker.totalLocations).to.equal(pieces.length);
    });
  });

  describe('tryMakeMoveAt()', () => {
    it('does not modify input', () => {
      const expected = _.clone(pieces);
      moveMaker.tryMakeMoveAt(0);
      expect(pieces).to.eql(expected);
    });

    it('returns null if location is already occupied', () => {
      expect(moveMaker.tryMakeMoveAt(0).pieces).to.eql([
        PieceType.X, PieceType.Empty, PieceType.Empty,
        PieceType.Empty, PieceType.Empty, PieceType.Empty,
        PieceType.Empty, PieceType.Empty, PieceType.Empty,
      ]);
      expect(moveMaker.tryMakeMoveAt(0).pieces).to.eql(null);
    });

    it('switches side to move after placing piece', () => {
      expect(moveMaker.tryMakeMoveAt(0).pieces).to.eql([
        PieceType.X, PieceType.Empty, PieceType.Empty,
        PieceType.Empty, PieceType.Empty, PieceType.Empty,
        PieceType.Empty, PieceType.Empty, PieceType.Empty,
      ]);
      expect(moveMaker.tryMakeMoveAt(1).pieces).to.eql([
        PieceType.X, PieceType.O, PieceType.Empty,
        PieceType.Empty, PieceType.Empty, PieceType.Empty,
        PieceType.Empty, PieceType.Empty, PieceType.Empty,
      ]);
    });
  });
});
