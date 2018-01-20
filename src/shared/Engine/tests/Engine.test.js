import chai from 'chai';
import { expect } from 'chai';
import { Engine, MoveMaker, PieceType } from 'shared';

describe('Engine', () => {
  let engine = undefined;
  let moveMaker = undefined;
  let pieces = undefined;

  beforeEach(() => {
    pieces = [
      PieceType.Empty, PieceType.Empty, PieceType.Empty,
      PieceType.Empty, PieceType.Empty, PieceType.Empty,
      PieceType.Empty, PieceType.Empty, PieceType.Empty,
    ];
    moveMaker = new MoveMaker(pieces);
    engine = new Engine(moveMaker);
  });

  describe('makeBestMove()', () => {
    const formatPieces = (pieces) => {
      let rows = [];
      const size = Math.sqrt(pieces.length);
      for (let row = 0; row < size; ++row)
      {
        let columns = [];
        for (let column = 0; column < size; ++column)
        {
           columns.push(pieces[row * size + column].toString());
        }
        rows.push(columns.join(","));
      }
      return "\n" + rows.join("\n");
    };

    describe('playing as X', () => {
      it('finds tic-tac-toe move', () => {
        moveMaker.tryMakeMoveAt(0);
        moveMaker.tryMakeMoveAt(1);
        moveMaker.tryMakeMoveAt(3);
        moveMaker.tryMakeMoveAt(2);
        // [X][O][O]
        // [X][ ][ ]
        // [ ][ ][ ]
        const { pieces } = engine.makeBestMove();
        expect(pieces, formatPieces(pieces)).to.eql([
          PieceType.X, PieceType.O, PieceType.O,
          PieceType.X, PieceType.Empty, PieceType.Empty,
          PieceType.X, PieceType.Empty, PieceType.Empty,
        ]);
      });

      it('defends opponent tic-tac-toe move', () => {
        moveMaker.tryMakeMoveAt(0);
        moveMaker.tryMakeMoveAt(1);
        moveMaker.tryMakeMoveAt(2);
        moveMaker.tryMakeMoveAt(4);
        // [X][O][X]
        // [ ][O][ ]
        // [ ][ ][ ]
        const { pieces } = engine.makeBestMove();
        expect(pieces, formatPieces(pieces)).to.eql([
          PieceType.X, PieceType.O, PieceType.Empty,
          PieceType.X, PieceType.O, PieceType.Empty,
          PieceType.Empty, PieceType.X, PieceType.Empty,
        ]);
      });
    });

    describe('playing as O', () => {
      it('finds tic-tac-toe move', () => {
        moveMaker.tryMakeMoveAt(0);
        moveMaker.tryMakeMoveAt(6);
        moveMaker.tryMakeMoveAt(1);
        moveMaker.tryMakeMoveAt(7);
        moveMaker.tryMakeMoveAt(3);
        // [X][X][ ]
        // [X][ ][ ]
        // [O][O][ ]
        const { pieces } = engine.makeBestMove();
        expect(pieces, formatPieces(pieces)).to.eql([
          PieceType.X, PieceType.X, PieceType.Empty,
          PieceType.X, PieceType.Empty, PieceType.Empty,
          PieceType.O, PieceType.O, PieceType.O,
        ]);
      });

      it('defends opponent tic-tac-toe move', () => {
        moveMaker.tryMakeMoveAt(0);
        moveMaker.tryMakeMoveAt(8);
        moveMaker.tryMakeMoveAt(1);
        // [X][X][ ]
        // [ ][ ][ ]
        // [ ][ ][O]
        const { pieces } = engine.makeBestMove();
        expect(pieces, formatPieces(pieces)).to.eql([
          PieceType.X, PieceType.X, PieceType.O,
          PieceType.Empty, PieceType.Empty, PieceType.Empty,
          PieceType.Empty, PieceType.Empty, PieceType.O,
        ]);
      });
    });
  });
});
