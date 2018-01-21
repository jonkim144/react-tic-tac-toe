import chai from 'chai';
import { expect } from 'chai';
import { Engine, GameState, MoveMaker, PieceType, TicTacToeFinder } from 'shared';

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
    const ticTacToeFinder = new TicTacToeFinder(pieces.length);
    moveMaker = new MoveMaker(pieces, ticTacToeFinder);
    engine = new Engine(moveMaker, ticTacToeFinder);
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

    it('game is over if last location filled', () => {
      moveMaker.tryMakeMoveAt(0);
      moveMaker.tryMakeMoveAt(1);
      moveMaker.tryMakeMoveAt(2);
      moveMaker.tryMakeMoveAt(3);
      moveMaker.tryMakeMoveAt(5);
      moveMaker.tryMakeMoveAt(4);
      moveMaker.tryMakeMoveAt(7);
      moveMaker.tryMakeMoveAt(8);
      const { gameState } = moveMaker.tryMakeMoveAt(6);
      expect(gameState).to.equal(GameState.DRAW);
    });

    describe('playing as X', () => {
      it('finds tic-tac-toe move', () => {
        moveMaker.tryMakeMoveAt(0);
        moveMaker.tryMakeMoveAt(1);
        moveMaker.tryMakeMoveAt(3);
        moveMaker.tryMakeMoveAt(2);
        // [X][O][O]
        // [X][ ][ ]
        // [ ][ ][ ]
        const { pieces, gameState } = engine.makeBestMove(1);
        expect(pieces, formatPieces(pieces)).to.eql([
          PieceType.X, PieceType.O, PieceType.O,
          PieceType.X, PieceType.Empty, PieceType.Empty,
          PieceType.X, PieceType.Empty, PieceType.Empty,
        ]);
        expect(gameState).to.equal(GameState.TIC_TAC_TOE);
      });

      it('defends opponent tic-tac-toe move', () => {
        moveMaker.tryMakeMoveAt(0);
        moveMaker.tryMakeMoveAt(1);
        moveMaker.tryMakeMoveAt(2);
        moveMaker.tryMakeMoveAt(4);
        // [X][O][X]
        // [ ][O][ ]
        // [ ][ ][ ]
        const { pieces, gameState } = engine.makeBestMove(2);
        expect(pieces, formatPieces(pieces)).to.eql([
          PieceType.X, PieceType.O, PieceType.X,
          PieceType.Empty, PieceType.O, PieceType.Empty,
          PieceType.Empty, PieceType.X, PieceType.Empty,
        ]);
        expect(gameState).to.equal(GameState.NORMAL);
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
        const { pieces, gameState } = engine.makeBestMove(1);
        expect(pieces, formatPieces(pieces)).to.eql([
          PieceType.X, PieceType.X, PieceType.Empty,
          PieceType.X, PieceType.Empty, PieceType.Empty,
          PieceType.O, PieceType.O, PieceType.O,
        ]);
        expect(gameState).to.equal(GameState.TIC_TAC_TOE);
      });

      it('defends opponent tic-tac-toe move - horizontal', () => {
        moveMaker.tryMakeMoveAt(0);
        moveMaker.tryMakeMoveAt(8);
        moveMaker.tryMakeMoveAt(1);
        // [X][X][ ]
        // [ ][ ][ ]
        // [ ][ ][O]
        const { pieces, gameState } = engine.makeBestMove(2);
        expect(pieces, formatPieces(pieces)).to.eql([
          PieceType.X, PieceType.X, PieceType.O,
          PieceType.Empty, PieceType.Empty, PieceType.Empty,
          PieceType.Empty, PieceType.Empty, PieceType.O,
        ]);
        expect(gameState).to.equal(GameState.NORMAL);
      });

      it('defends opponent tic-tac-toe move - vertical', () => {
        moveMaker.tryMakeMoveAt(0);
        moveMaker.tryMakeMoveAt(1);
        moveMaker.tryMakeMoveAt(3);
        // [X][O][ ]
        // [X][ ][ ]
        // [ ][ ][ ]
        const { pieces, gameState } = engine.makeBestMove(2);
        expect(pieces, formatPieces(pieces)).to.eql([
          PieceType.X, PieceType.O, PieceType.Empty,
          PieceType.X, PieceType.Empty, PieceType.Empty,
          PieceType.O, PieceType.Empty, PieceType.Empty,
        ]);
        expect(gameState).to.equal(GameState.NORMAL);
      });
    });
  });
});
