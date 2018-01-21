import { GameState, PieceType } from 'shared';

export default class Engine {
  constructor(moveMaker) {
    if (null == moveMaker) throw new Error("Argument 'moveMaker' cannot be null.");

    this.moveMaker = moveMaker;
  }

  dumpBoard = (pieces) => {
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

  makeBestMove = (depth) => {
    let negate = 1;
    if (0 == depth)
    {
      // purposefully lose
      depth = 8;
      negate = -1;
    }
    let bestMove = -1;
    let bestScore = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < this.moveMaker.totalLocations; ++i)
    {
      const result = this.moveMaker.tryMakeMoveAt(i);
      if (!result.pieces) continue;

      const color = ((PieceType.O === result.pieces[i]) ? -1 : 1) * negate;
      const score = -this.findBestMove(result, i, depth-1, -color);
      if (score > bestScore)
      {
        bestMove = i;
        bestScore = score;
      }
      this.moveMaker.undoLastMove();
    }
    return this.moveMaker.tryMakeMoveAt(bestMove);
  };

  findBestMove = (lastResult, lastMove, depth, color) => {
    if (lastResult.gameState === GameState.TIC_TAC_TOE)
    {
      return color * ((lastResult.pieces[lastMove] === PieceType.X) ? 9999 : -9999);
    }
    if (depth === 0 || lastResult.gameState === GameState.DRAW)
    {
      return 0;
    }
    let bestScore = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < this.moveMaker.totalLocations; ++i)
    {
      const result = this.moveMaker.tryMakeMoveAt(i);
      if (!result.pieces) continue;

      const score = -this.findBestMove(result, i, depth-1, -color);
      this.moveMaker.undoLastMove();
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  };
}
