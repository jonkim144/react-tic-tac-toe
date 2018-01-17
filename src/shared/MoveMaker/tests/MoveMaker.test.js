import _ from 'lodash';
import chai from 'chai';
import { expect } from 'chai';
import { MoveMaker, PieceType } from 'shared';

describe('MoveMaker', () => {
  let moveMaker = undefined;
  let pieces = undefined;

  beforeEach(() => {
    pieces = [
      PieceType.Empty, PieceType.Empty, PieceType.Empty,
      PieceType.Empty, PieceType.Empty, PieceType.Empty,
      PieceType.Empty, PieceType.Empty, PieceType.Empty,
    ];
    moveMaker = new MoveMaker(pieces);
  });

  describe('tryMakeMoveAt()', () => {
    it('does not modify input', () => {
      const expected = _.clone(pieces);
      moveMaker.tryMakeMoveAt(0);
      expect(pieces).to.eql(expected);
    });

    it('returns null location is already occupied', () => {
      expect(moveMaker.tryMakeMoveAt(0)).to.eql([
        PieceType.X, PieceType.Empty, PieceType.Empty,
        PieceType.Empty, PieceType.Empty, PieceType.Empty,
        PieceType.Empty, PieceType.Empty, PieceType.Empty,
      ]);
      expect(moveMaker.tryMakeMoveAt(0)).to.eql(null);
    });

    it('switches side to move after placing piece', () => {
      expect(moveMaker.tryMakeMoveAt(0)).to.eql([
        PieceType.X, PieceType.Empty, PieceType.Empty,
        PieceType.Empty, PieceType.Empty, PieceType.Empty,
        PieceType.Empty, PieceType.Empty, PieceType.Empty,
      ]);
      expect(moveMaker.tryMakeMoveAt(1)).to.eql([
        PieceType.X, PieceType.O, PieceType.Empty,
        PieceType.Empty, PieceType.Empty, PieceType.Empty,
        PieceType.Empty, PieceType.Empty, PieceType.Empty,
      ]);
    });
  });
});
