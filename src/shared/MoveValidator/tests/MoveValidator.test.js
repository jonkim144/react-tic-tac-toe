import chai from 'chai';
import { expect } from 'chai';
import { MoveValidator, PieceType } from 'shared';

describe('MoveValidator', () => {
  let pieces = undefined;

  beforeEach(() => {
    pieces = [
      PieceType.Empty, PieceType.Empty, PieceType.Empty,
      PieceType.Empty, PieceType.Empty, PieceType.Empty,
      PieceType.Empty, PieceType.Empty, PieceType.Empty,
    ];
  });

  describe('isValid()', () => {
    it('returns true if valid location', () => {
      for (let i = 0; i < pieces.length; ++i) {
        expect(MoveValidator.isValid(pieces, i)).to.be.true;
      }
    });
    it('returns false if location out of range', () => {
      expect(MoveValidator.isValid(pieces, -1)).to.be.false;
      expect(MoveValidator.isValid(pieces, 9)).to.be.false;
    });
    it('returns false if location is occupied', () => {
      pieces[1] = PieceType.X;
      expect(MoveValidator.isValid(pieces, 1)).to.be.false;
    });
  });
});
